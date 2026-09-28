"""
IMAP reply monitor and automatic intent classifier.
Polls REPLY_TO inbox, matches senders against sent_log.csv,
classifies YES / STOP / OTHER (with Hindi/Marathi keywords),
auto-sends demo links to hot leads via Brevo, and adds unsubscribes to suppression list.
"""

import os
import re
import csv
import imaplib
import email
from email.header import decode_header
from typing import Dict, Any, List, Optional, Tuple

from outreach import config
from outreach.brevo import BrevoClient
from outreach.logger import SendLogger

STOP_PHRASES = [
    "not interested", "dont email", "don't email", "unsubscribe",
    "stop emailing", "remove me", "please remove", "do not contact"
]

STOP_WORDS = [
    r"\bno\b", r"\bstop\b", r"\bnahi\b", r"\bnako\b", r"\bmat karo\b"
]

YES_PHRASES = [
    "send link", "share demo", "send demo", "share link", "send it", "show me", "no problem"
]

YES_WORDS = [
    r"\byes\b", r"\byeah\b", r"\byep\b", r"\bsure\b", r"\bok\b", r"\bokay\b",
    r"\binterested\b", r"\bsend\b", r"\bshow\b", r"\bhaan\b", r"\bha\b",
    r"\bdikhao\b", r"\bpathva\b", r"\bpathva link\b", r"\bchaleel\b"
]

def clean_subject(raw_subject: str) -> str:
    """Extract clean decoded email subject."""
    if not raw_subject:
        return ""
    decoded_parts = decode_header(raw_subject)
    res = ""
    for part, enc in decoded_parts:
        if isinstance(part, bytes):
            res += part.decode(enc or 'utf-8', errors='ignore')
        else:
            res += str(part)
    return res.strip()

def classify_intent(body_text: str) -> str:
    """
    Classify reply intent into 'YES', 'STOP', or 'OTHER'.
    """
    if not body_text:
        return "OTHER"

    text_lower = body_text.lower()

    # Exclude false positives for 'no' like 'no problem' or 'no worries'
    cleaned_for_stop = text_lower
    for fp in ["no problem", "no worries", "not an issue"]:
        cleaned_for_stop = cleaned_for_stop.replace(fp, " ")

    # Check STOP first
    for phrase in STOP_PHRASES:
        if phrase in cleaned_for_stop:
            return "STOP"

    for pattern in STOP_WORDS:
        if re.search(pattern, cleaned_for_stop):
            return "STOP"

    # Check YES
    for phrase in YES_PHRASES:
        if phrase in text_lower:
            return "YES"

    for pattern in YES_WORDS:
        if re.search(pattern, text_lower):
            return "YES"

    return "OTHER"

class ReplyHandler:
    def __init__(
        self,
        brevo_client: BrevoClient,
        logger: SendLogger,
        imap_host: str = config.IMAP_HOST,
        imap_user: str = config.IMAP_USER,
        imap_password: str = config.IMAP_APP_PASSWORD,
        auto_reply_enabled: bool = config.AUTO_REPLY_ENABLED
    ):
        self.brevo = brevo_client
        self.logger = logger
        self.imap_host = imap_host
        self.imap_user = imap_user
        self.imap_password = imap_password
        self.auto_reply_enabled = auto_reply_enabled

    def is_configured(self) -> bool:
        return bool(self.imap_host and self.imap_user and self.imap_password and not self.imap_password.startswith("your_app"))

    def load_sent_leads_lookup(self) -> Dict[str, Dict[str, Any]]:
        """Map email -> lead details from sent_log.csv."""
        lookup = {}
        if os.path.exists(config.SENT_LOG_CSV):
            with open(config.SENT_LOG_CSV, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for r in reader:
                    em = (r.get('email') or '').strip().lower()
                    if em:
                        lookup[em] = r
        return lookup

    def check_inbox(self) -> Dict[str, Any]:
        """
        Connect to IMAP server, fetch unseen messages, match against sent leads,
        classify, and execute auto-reply / suppression / alert actions.
        """
        report = {
            "connected": False,
            "messages_checked": 0,
            "matched_replies": 0,
            "yes_count": 0,
            "stop_count": 0,
            "other_count": 0,
            "message": "OK"
        }

        if not self.is_configured():
            report["message"] = "IMAP credentials not configured in .env (Skipping reply check)."
            return report

        sent_leads = self.load_sent_leads_lookup()
        if not sent_leads:
            report["message"] = "No sent leads in sent_log.csv yet to match replies against."
            return report

        try:
            mail = imaplib.IMAP4_SSL(self.imap_host)
            mail.login(self.imap_user, self.imap_password)
            mail.select("INBOX")
            report["connected"] = True

            # Search for unread/unseen messages
            status, response = mail.search(None, "UNSEEN")
            if status != "OK":
                report["message"] = f"IMAP search status: {status}"
                mail.logout()
                return report

            msg_ids = response[0].split()
            report["messages_checked"] = len(msg_ids)

            for msg_id in msg_ids:
                status, msg_data = mail.fetch(msg_id, "(RFC822)")
                if status != "OK":
                    continue

                raw_email = msg_data[0][1]
                msg = email.message_from_bytes(raw_email)

                # Sender address
                from_header = msg.get("From", "")
                from_email = email.utils.parseaddr(from_header)[1].lower().strip()
                subject_raw = clean_subject(msg.get("Subject", ""))

                if from_email in sent_leads:
                    report["matched_replies"] += 1
                    lead_info = sent_leads[from_email]

                    # Extract body text
                    body_text = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            ctype = part.get_content_type()
                            cdispo = str(part.get("Content-Disposition"))
                            if ctype == "text/plain" and "attachment" not in cdispo:
                                body_text = part.get_payload(decode=True).decode(errors="ignore")
                                break
                    else:
                        body_text = msg.get_payload(decode=True).decode(errors="ignore")

                    # Classify intent
                    intent = classify_intent(body_text)

                    # Check if already replied
                    prev_status = lead_info.get("reply_status", "none")
                    if prev_status in ["yes", "stop"]:
                        continue

                    b_name = lead_info.get("business_name", "your business")
                    category = lead_info.get("category", "")
                    demo_link = lead_info.get("demo_link", "")

                    # Fallback demo link lookup if missing in sent log
                    if not demo_link and os.path.exists(config.LEADS_CSV):
                        from outreach.filter import LeadFilter
                        # Look up demo link in leads CSV
                        with open(config.LEADS_CSV, 'r', encoding='utf-8', errors='ignore') as lf:
                            for row in csv.DictReader(lf):
                                if (row.get('email') or '').lower().strip() == from_email:
                                    demo_link = row.get('demo_link', '')
                                    break

                    if intent == "YES":
                        report["yes_count"] += 1
                        self.logger.update_reply_status(from_email, "yes")
                        self.logger.log_hot_lead(
                            business_name=b_name,
                            email=from_email,
                            category=category,
                            demo_link=demo_link,
                            reply_snippet=body_text[:200],
                            status="demo_sent"
                        )

                        # Auto-send demo reply via Brevo
                        if self.auto_reply_enabled and self.brevo.is_configured():
                            reply_subj = f"Re: {subject_raw or f'Website demo for {b_name}'}"
                            reply_txt = (
                                f"Thanks there!\n\n"
                                f"Here is the demo I made for {b_name}: {demo_link}\n\n"
                                f"Please open it on your phone too. If you like it, I can make it live with your own details, photos and a .in or .com address. It is a one-time payment. Do you want to talk on a quick call or WhatsApp? My number is {config.SENDER_PHONE}.\n\n"
                                f"Thanks,\n{config.SENDER_NAME}\n{config.SENDER_PHONE}\n\n"
                                f"If you do not want emails from me, reply 'no' and I will not write again.\n{config.SENDER_ADDRESS}"
                            )
                            reply_html = (
                                f"<p>Thanks there!</p>"
                                f"<p>Here is the demo I made for {b_name}: <a href='{demo_link}'>{demo_link}</a></p>"
                                f"<p>Please open it on your phone too. If you like it, I can make it live with your own details, photos and a .in or .com address. It is a one-time payment. Do you want to talk on a quick call or WhatsApp? My number is {config.SENDER_PHONE}.</p>"
                                f"<p>Thanks,<br>{config.SENDER_NAME}<br>{config.SENDER_PHONE}</p>"
                                f"<div style='margin-top:24px; font-size:12px; color:#666; border-top:1px solid #eee; padding-top:8px;'>"
                                f"<p>If you do not want emails from me, reply 'no' and I will not write again.<br>{config.SENDER_ADDRESS}</p>"
                                f"</div>"
                            )
                            self.brevo.send_email(
                                to_email=from_email,
                                to_name=b_name,
                                subject=reply_subj,
                                text_content=reply_txt,
                                html_content=reply_html,
                                tags=["auto_reply_demo"]
                            )

                    elif intent == "STOP":
                        report["stop_count"] += 1
                        self.logger.update_reply_status(from_email, "stop")
                        self.logger.add_to_suppression(from_email, "User opted out via reply")

                    else:
                        report["other_count"] += 1
                        self.logger.update_reply_status(from_email, "other")
                        self.logger.log_needs_attention(
                            business_name=b_name,
                            email=from_email,
                            category=category,
                            subject=subject_raw,
                            reply_snippet=body_text[:300]
                        )

            mail.close()
            mail.logout()

        except Exception as e:
            report["message"] = f"IMAP check error: {str(e)}"

        return report
