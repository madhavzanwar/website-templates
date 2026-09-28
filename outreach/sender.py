"""
Module C: Brevo Transactional Email Sender with Warm-Up Pacing.
Implements:
1. Warm-up pace manager (Days 1-3: 25/day; Days 4-7: 75/day; Day 8+: 300/day).
2. Random 5-15s delay between individual API calls.
3. Transactional email sending via Brevo API (POST /v3/smtp/email).
"""

import os
import json
import time
import random
import datetime
import logging
from typing import Dict, Any, Tuple, Optional
import requests

from .config import (
    BREVO_API_KEY,
    SENDER_EMAIL,
    SENDER_NAME,
    MIN_DELAY_SECONDS,
    MAX_DELAY_SECONDS,
    PLAN_DAILY_LIMIT,
    WARMUP_ENABLED,
    STAGE_1_DAYS,
    STAGE_1_LIMIT,
    STAGE_2_DAYS,
    STAGE_2_LIMIT,
    STATE_FILE_PATH
)

logger = logging.getLogger("BrevoOutreach.Sender")


class WarmupTracker:
    """Tracks sending days and enforces daily warm-up limits."""

    def __init__(self, state_file: str = STATE_FILE_PATH):
        self.state_file = state_file
        self.state = self._load_state()
        self._check_midnight_reset()

    def _load_state(self) -> Dict[str, Any]:
        """Loads state from outreach_state.json or initializes default state."""
        if os.path.exists(self.state_file):
            try:
                with open(self.state_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.warning(f"Error reading state file {self.state_file}: {e}")

        return {
            "first_send_date": None,
            "last_send_date": None,
            "sends_today": 0,
            "total_sends": 0
        }

    def _save_state(self):
        """Saves current state to outreach_state.json."""
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(self.state, f, indent=2)

    def _check_midnight_reset(self):
        """Resets sends_today counter if the date has changed."""
        today_str = datetime.date.today().isoformat()
        last_date = self.state.get("last_send_date")

        if last_date != today_str:
            self.state["last_send_date"] = today_str
            self.state["sends_today"] = 0
            self._save_state()

    def get_days_active(self) -> int:
        """Calculates days since the first send began (Day 1-indexed)."""
        first_send = self.state.get("first_send_date")
        if not first_send:
            return 1
        try:
            first_dt = datetime.date.fromisoformat(first_send)
            today = datetime.date.today()
            diff = (today - first_dt).days
            return max(1, diff + 1)
        except Exception:
            return 1

    def get_stage_info(self) -> Dict[str, Any]:
        """Calculates current warm-up stage, daily limit, and days until full capacity."""
        days_active = self.get_days_active()

        if not WARMUP_ENABLED:
            return {
                "stage_name": "Full (Warm-up Disabled)",
                "days_active": days_active,
                "daily_limit": PLAN_DAILY_LIMIT,
                "days_until_full": 0,
                "sends_today": self.state.get("sends_today", 0),
                "remaining_today": max(0, PLAN_DAILY_LIMIT - self.state.get("sends_today", 0))
            }

        if days_active <= STAGE_1_DAYS:
            daily_limit = STAGE_1_LIMIT
            stage_name = f"Stage 1 (Days 1-{STAGE_1_DAYS})"
            days_until_full = (STAGE_2_DAYS - days_active) + 1
        elif days_active <= STAGE_2_DAYS:
            daily_limit = STAGE_2_LIMIT
            stage_name = f"Stage 2 (Days {STAGE_1_DAYS + 1}-{STAGE_2_DAYS})"
            days_until_full = (STAGE_2_DAYS - days_active) + 1
        else:
            daily_limit = PLAN_DAILY_LIMIT
            stage_name = "Full Capacity (Day 8+)"
            days_until_full = 0

        sends_today = self.state.get("sends_today", 0)
        remaining = max(0, daily_limit - sends_today)

        return {
            "stage_name": stage_name,
            "days_active": days_active,
            "daily_limit": daily_limit,
            "days_until_full": days_until_full,
            "sends_today": sends_today,
            "remaining_today": remaining
        }

    def can_send(self) -> Tuple[bool, str]:
        """Checks if sends_today is within daily warm-up/plan limit."""
        info = self.get_stage_info()
        if info["remaining_today"] <= 0:
            return False, f"Daily limit reached ({info['daily_limit']}/day for {info['stage_name']})"
        return True, "ok"

    def record_send_success(self):
        """Increments send counter and establishes first_send_date if new."""
        today_str = datetime.date.today().isoformat()
        if not self.state.get("first_send_date"):
            self.state["first_send_date"] = today_str

        self.state["last_send_date"] = today_str
        self.state["sends_today"] = self.state.get("sends_today", 0) + 1
        self.state["total_sends"] = self.state.get("total_sends", 0) + 1
        self._save_state()


class BrevoEmailSender:
    """Manages Brevo Transactional Email API calls with polite pacing."""

    API_URL = "https://api.brevo.com/v3/smtp/email"

    def __init__(
        self,
        api_key: str = BREVO_API_KEY,
        sender_email: str = SENDER_EMAIL,
        sender_name: str = SENDER_NAME,
        min_delay: float = MIN_DELAY_SECONDS,
        max_delay: float = MAX_DELAY_SECONDS
    ):
        self.api_key = api_key
        self.sender_email = sender_email
        self.sender_name = sender_name or "Poonam"
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.warmup_tracker = WarmupTracker()

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key and self.sender_email)

    def throttle(self):
        """Pauses 5-15 seconds between individual sends to maintain steady sending rhythm."""
        delay = random.uniform(self.min_delay, self.max_delay)
        logger.debug(f"Pacing delay: waiting {delay:.1f}s before next send...")
        time.sleep(delay)

    def send_email(
        self,
        recipient_email: str,
        recipient_name: str,
        subject: str,
        html_content: str,
        apply_throttle: bool = True
    ) -> Tuple[bool, str, str]:
        """
        Sends a single email via Brevo Transactional Email API.
        Returns:
            (success: bool, status: str, message_id_or_error: str)
        """
        if not self.api_key:
            return False, "failed", "BREVO_API_KEY is not set in .env"
        if not self.sender_email:
            return False, "failed", "SENDER_EMAIL is not set in .env or config"

        if apply_throttle:
            self.throttle()

        headers = {
            "api-key": self.api_key,
            "accept": "application/json",
            "content-type": "application/json"
        }

        payload = {
            "sender": {
                "name": self.sender_name,
                "email": self.sender_email
            },
            "to": [
                {
                    "email": recipient_email.strip().lower(),
                    "name": recipient_name.strip()
                }
            ],
            "subject": subject.strip(),
            "htmlContent": html_content
        }

        try:
            resp = requests.post(self.API_URL, headers=headers, json=payload, timeout=20)
            
            if resp.status_code == 201:
                data = resp.json()
                msg_id = data.get("messageId", "")
                self.warmup_tracker.record_send_success()
                return True, "sent", msg_id
            
            error_text = resp.text
            try:
                err_json = resp.json()
                error_text = err_json.get("message") or err_json.get("code") or error_text
            except Exception:
                pass

            logger.error(f"Brevo API error ({resp.status_code}): {error_text}")
            return False, "failed", f"HTTP_{resp.status_code}: {error_text}"

        except requests.exceptions.RequestException as e:
            logger.error(f"Network error sending to {recipient_email}: {e}")
            return False, "failed", f"NetworkError: {str(e)}"
