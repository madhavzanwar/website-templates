"""
Module D: Bounce & Suppression Checker.
Polls Brevo's /v3/smtp/statistics/events endpoint for hard bounces, spam complaints,
and unsubscribes. Maintains a permanent suppression_list.csv checked before every send.
"""

import os
import csv
import datetime
import logging
from typing import Set, Dict, Any, Optional
import requests

from .config import SUPPRESSION_LIST_CSV, BREVO_API_KEY

logger = logging.getLogger("BrevoOutreach.Suppression")

SUPPRESSION_COLUMNS = ["email", "reason", "event_time", "source"]


class SuppressionManager:
    """Manages suppressed emails (hard bounces, complaints, unsubscribes)."""

    def __init__(self, suppression_file: str = SUPPRESSION_LIST_CSV, api_key: str = BREVO_API_KEY):
        self.suppression_file = suppression_file
        self.api_key = api_key
        self._init_csv()
        self.suppressed_emails: Set[str] = self._load_suppressed_emails()

    def _init_csv(self):
        """Creates suppression_list.csv with headers if it doesn't exist."""
        if not os.path.exists(self.suppression_file) or os.path.getsize(self.suppression_file) == 0:
            with open(self.suppression_file, mode="w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=SUPPRESSION_COLUMNS)
                writer.writeheader()

    def _load_suppressed_emails(self) -> Set[str]:
        """Loads all suppressed emails from disk."""
        suppressed = set()
        if not os.path.exists(self.suppression_file):
            return suppressed

        with open(self.suppression_file, mode="r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            for row in reader:
                email = (row.get("email") or "").strip().lower()
                if email:
                    suppressed.add(email)

        logger.info(f"Loaded {len(suppressed)} emails on suppression list.")
        return suppressed

    def is_suppressed(self, email: str) -> bool:
        """Returns True if the email is on the permanent suppression list."""
        return email.strip().lower() in self.suppressed_emails

    def add_to_suppression(self, email: str, reason: str, event_time: str = "", source: str = "brevo_sync"):
        """Adds an email address to the permanent suppression list."""
        clean_email = email.strip().lower()
        if clean_email in self.suppressed_emails:
            return

        now_ts = event_time or datetime.datetime.now().isoformat()
        row = {
            "email": clean_email,
            "reason": reason,
            "event_time": now_ts,
            "source": source
        }

        with open(self.suppression_file, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=SUPPRESSION_COLUMNS)
            writer.writerow(row)
            f.flush()
            try:
                os.fsync(f.fileno())
            except Exception:
                pass

        self.suppressed_emails.add(clean_email)
        logger.warning(f"Suppressed {clean_email} (Reason: {reason})")

    def sync_brevo_events(self, days: int = 30) -> int:
        """
        Polls Brevo's /v3/smtp/statistics/events endpoint for hardBounce, spam, and unsubscribed.
        Returns count of newly suppressed emails.
        """
        if not self.api_key:
            logger.info("BREVO_API_KEY not configured. Skipping event sync.")
            return 0

        url = "https://api.brevo.com/v3/smtp/statistics/events"
        headers = {
            "api-key": self.api_key,
            "accept": "application/json"
        }

        # Event types that mandate permanent suppression
        event_types = ["hardBounce", "spam", "unsubscribed"]
        newly_suppressed = 0

        logger.info("Syncing bounces and complaints from Brevo API...")

        for ev in event_types:
            params = {
                "limit": 100,
                "event": ev,
                "days": days
            }
            try:
                resp = requests.get(url, headers=headers, params=params, timeout=12)
                if resp.status_code == 200:
                    data = resp.json()
                    events = data.get("events", [])
                    for item in events:
                        email = item.get("email", "").strip().lower()
                        event_date = item.get("date", "")
                        if email and email not in self.suppressed_emails:
                            self.add_to_suppression(
                                email=email,
                                reason=f"brevo_{ev}",
                                event_time=event_date,
                                source="brevo_api_poll"
                            )
                            newly_suppressed += 1
                elif resp.status_code == 401:
                    logger.warning("Brevo API key unauthorized when syncing events.")
                    break
                else:
                    logger.debug(f"Brevo events check for {ev} returned status {resp.status_code}")
            except Exception as e:
                logger.warning(f"Error querying Brevo events for {ev}: {e}")

        logger.info(f"Brevo events sync complete. {newly_suppressed} new suppression entries added.")
        return newly_suppressed
