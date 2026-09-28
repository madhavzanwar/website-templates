"""
Brevo Transactional Email API client and Deliverability Health Monitor.
Endpoints:
- POST /v3/smtp/email (Send transactional email)
- GET /v3/smtp/statistics/events (Monitor bounces, complaints, unsubscribes)
"""

import time
import requests
from typing import Dict, Any, Optional, Tuple, List
from datetime import datetime, timezone, timedelta

from outreach import config
from outreach.state_manager import OutreachStateManager

BREVO_API_BASE = "https://api.brevo.com/v3"

class BrevoClient:
    def __init__(self, api_key: str = config.BREVO_API_KEY):
        self.api_key = api_key
        self.headers = {
            "api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def is_configured(self) -> bool:
        return bool(self.api_key and not self.api_key.startswith("xkeysib-your_brevo"))

    def send_email(
        self,
        to_email: str,
        to_name: str,
        subject: str,
        text_content: str,
        html_content: str,
        reply_to_email: str = config.REPLY_TO_EMAIL,
        sender_email: str = config.SENDER_EMAIL,
        sender_name: str = config.SENDER_NAME,
        tags: Optional[List[str]] = None
    ) -> Tuple[bool, str, Optional[str]]:
        """
        Send an email via POST /v3/smtp/email.
        Returns:
            (success: bool, message_or_error: str, brevo_message_id: Optional[str])
        """
        if not self.is_configured():
            return False, "BREVO_API_KEY is not configured or is a placeholder.", None

        if not sender_email:
            return False, "SENDER_EMAIL is not configured.", None

        url = f"{BREVO_API_BASE}/smtp/email"
        payload = {
            "sender": {
                "name": sender_name,
                "email": sender_email
            },
            "to": [
                {
                    "email": to_email,
                    "name": to_name or to_email
                }
            ],
            "replyTo": {
                "email": reply_to_email or sender_email,
                "name": sender_name
            },
            "subject": subject,
            "textContent": text_content,
            "htmlContent": html_content,
            "headers": {
                "List-Unsubscribe": f"<mailto:{reply_to_email or sender_email}?subject=unsubscribe>"
            }
        }

        if tags:
            payload["tags"] = tags

        try:
            resp = requests.post(url, headers=self.headers, json=payload, timeout=15)
            if resp.status_code in [200, 201]:
                data = resp.json()
                msg_id = data.get("messageId", "sent_unknown_id")
                return True, "Email sent successfully", msg_id
            else:
                err_msg = resp.text
                try:
                    err_json = resp.json()
                    err_msg = err_json.get("message", err_msg)
                except Exception:
                    pass
                return False, f"Brevo API error ({resp.status_code}): {err_msg}", None

        except requests.exceptions.RequestException as e:
            return False, f"Network exception calling Brevo API: {str(e)}", None

    def fetch_recent_events(self, limit: int = 100) -> Tuple[bool, List[Dict[str, Any]], str]:
        """
        Fetch recent transactional delivery events (hardBounces, spam, unsubscribed).
        GET /v3/smtp/statistics/events
        """
        if not self.is_configured():
            return False, [], "API key not configured."

        url = f"{BREVO_API_BASE}/smtp/statistics/events"
        params = {
            "limit": limit,
            "sort": "desc"
        }

        try:
            resp = requests.get(url, headers=self.headers, params=params, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                events = data.get("events", [])
                return True, events, "OK"
            else:
                return False, [], f"Brevo API error ({resp.status_code}): {resp.text}"
        except Exception as e:
            return False, [], f"Request error: {str(e)}"

class HealthMonitor:
    def __init__(
        self,
        brevo_client: BrevoClient,
        state_mgr: OutreachStateManager,
        suppression_file: str = config.SUPPRESSION_LIST_CSV
    ):
        self.brevo = brevo_client
        self.state_mgr = state_mgr
        self.suppression_file = suppression_file

    def sync_events_and_check_health(self) -> Dict[str, Any]:
        """
        Polls Brevo events, adds negative signals to suppression_list.csv,
        and applies safety gates (cut cap by half or auto-pause).
        """
        report = {
            "checked": False,
            "new_suppressions": 0,
            "hard_bounce_rate": 0.0,
            "spam_complaint_rate": 0.0,
            "action_taken": "none",
            "message": "OK"
        }

        if not self.brevo.is_configured():
            report["message"] = "Brevo API key not configured (Skipping live health check)."
            return report

        success, events, msg = self.brevo.fetch_recent_events(limit=100)
        if not success:
            report["message"] = f"Failed to fetch Brevo events: {msg}"
            return report

        report["checked"] = True
        total_delivered = 0
        hard_bounces = 0
        spam_complaints = 0

        new_suppressed = []

        for ev in events:
            ev_type = ev.get("event")
            email = (ev.get("email") or "").strip().lower()

            if ev_type in ["delivered", "request", "first_opening", "opened"]:
                total_delivered += 1
            elif ev_type == "hard_bounce":
                hard_bounces += 1
                if email:
                    new_suppressed.append((email, "hard_bounce"))
            elif ev_type == "spam":
                spam_complaints += 1
                if email:
                    new_suppressed.append((email, "spam_complaint"))
            elif ev_type in ["unsubscribe", "unsubscribed"]:
                if email:
                    new_suppressed.append((email, "unsubscribe"))

        # Add new suppressions
        if new_suppressed:
            from outreach.logger import AppendManager
            supp_mgr = AppendManager(self.suppression_file)
            report["new_suppressions"] = supp_mgr.add_suppressions(new_suppressed)

        total_sample = max(len(events), 1)
        hb_rate = (hard_bounces / total_sample) * 100.0
        sc_rate = (spam_complaints / total_sample) * 100.0

        report["hard_bounce_rate"] = hb_rate
        report["spam_complaint_rate"] = sc_rate

        # Store in state
        self.state_mgr.state["yesterday_hard_bounce_rate"] = hb_rate
        self.state_mgr.state["yesterday_spam_complaint_rate"] = sc_rate
        self.state_mgr.save_state()

        # Threshold rules for aggressive mode
        th = config.HEALTH_THRESHOLDS
        pause_bounce_th = th.get("hard_bounce_pause_pct", 5.0)
        pause_bounce_min_sends = th.get("hard_bounce_pause_min_sends", 100)
        pause_spam_th = th.get("spam_complaint_pause_pct", 0.2)
        pause_spam_min_sends = th.get("spam_complaint_pause_min_sends", 500)
        cut_cap_bounce_th = th.get("hard_bounce_cut_cap_pct", 2.0)

        total_sends = self.state_mgr.state.get("total_sent_all_time", 0)

        # 1. Hard bounce rate > 5% on 100+ sends -> PAUSE immediately
        if total_sends >= pause_bounce_min_sends and hb_rate > pause_bounce_th:
            reason = f"Hard bounce rate ({hb_rate:.1f}%) exceeds safety threshold of {pause_bounce_th}% on {total_sends} sends."
            self.state_mgr.auto_pause(reason)
            report["action_taken"] = "auto_pause"
            report["message"] = reason
        # 2. Spam complaint rate > 0.2% on 500+ sends -> PAUSE immediately
        elif total_sends >= pause_spam_min_sends and sc_rate > pause_spam_th:
            reason = f"Spam complaint rate ({sc_rate:.2f}%) exceeds safety threshold of {pause_spam_th}% on {total_sends} sends."
            self.state_mgr.auto_pause(reason)
            report["action_taken"] = "auto_pause"
            report["message"] = reason
        # 3. Hard bounce rate between 2-5% -> CUT daily cap by half for next day, log warning, keep sending
        elif hb_rate >= cut_cap_bounce_th and hb_rate <= pause_bounce_th:
            reason = f"Elevated hard bounce rate ({hb_rate:.1f}% between {cut_cap_bounce_th}% and {pause_bounce_th}%)."
            self.state_mgr.cut_cap_in_half(reason)
            report["action_taken"] = "cut_cap"
            report["message"] = reason

        return report
