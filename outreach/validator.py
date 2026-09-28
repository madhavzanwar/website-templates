"""
Module A: CSV Loader & Email Validator.
Reads pune_smb_leads.csv, filters rows with valid email addresses,
and logs missing/malformed emails to invalid_emails.csv instead of crashing.
"""

import os
import csv
import re
import datetime
import logging
from typing import List, Dict, Tuple, Any

from .config import LEADS_CSV, INVALID_EMAILS_CSV

logger = logging.getLogger("BrevoOutreach.Validator")

EMAIL_REGEX = re.compile(
    r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
)

IGNORED_EMAIL_EXTENSIONS = (
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
    ".css", ".js", ".woff", ".woff2", ".ttf", ".pdf"
)

IGNORED_DOMAINS = {
    "example.com", "domain.com", "yourdomain.com", "email.com",
    "test.com", "sample.com", "sentry.io", "wixpress.com"
}

INVALID_CSV_COLUMNS = ["business_name", "email", "category", "reason", "timestamp"]


class LeadValidator:
    """Loads leads from CSV, validates email format, and logs invalid entries."""

    def __init__(self, leads_file: str = LEADS_CSV, invalid_file: str = INVALID_EMAILS_CSV):
        self.leads_file = leads_file
        self.invalid_file = invalid_file
        self._init_invalid_csv()

    def _init_invalid_csv(self):
        """Ensures invalid_emails.csv exists with headers."""
        if not os.path.exists(self.invalid_file) or os.path.getsize(self.invalid_file) == 0:
            with open(self.invalid_file, mode="w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=INVALID_CSV_COLUMNS)
                writer.writeheader()

    def log_invalid_row(self, row: Dict[str, str], reason: str):
        """Appends a skipped/invalid row to invalid_emails.csv."""
        with open(self.invalid_file, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=INVALID_CSV_COLUMNS)
            writer.writerow({
                "business_name": (row.get("business_name") or "").strip(),
                "email": (row.get("email") or "").strip(),
                "category": (row.get("category") or "").strip(),
                "reason": reason,
                "timestamp": datetime.datetime.now().isoformat()
            })

    def validate_email(self, email: str) -> Tuple[bool, str]:
        """
        Validates email string against standard RFC pattern and domain checks.
        Returns (is_valid, reason_if_invalid).
        """
        if not email:
            return False, "missing_email"

        cleaned = email.strip().lower()
        if not EMAIL_REGEX.match(cleaned):
            return False, "invalid_regex_format"

        if any(cleaned.endswith(ext) for ext in IGNORED_EMAIL_EXTENSIONS):
            return False, "media_extension_in_email"

        parts = cleaned.split("@")
        if len(parts) != 2:
            return False, "malformed_at_symbol"

        domain = parts[1]
        if domain in IGNORED_DOMAINS or any(domain.endswith("." + d) for d in IGNORED_DOMAINS):
            return False, "placeholder_domain"

        if "." not in domain or len(domain.split(".")[-1]) < 2:
            return False, "invalid_tld"

        return True, "valid"

    def load_valid_leads(self) -> Tuple[List[Dict[str, Any]], int, int]:
        """
        Reads leads_file and returns:
        (valid_leads, total_rows_read, invalid_count)
        """
        if not os.path.exists(self.leads_file):
            logger.error(f"Leads CSV file not found: {self.leads_file}")
            return [], 0, 0

        valid_leads: List[Dict[str, Any]] = []
        total_rows = 0
        invalid_count = 0

        with open(self.leads_file, mode="r", encoding="utf-8", errors="replace") as f:
            reader = csv.DictReader(f)
            for row in reader:
                total_rows += 1
                email = (row.get("email") or "").strip()
                is_valid, reason = self.validate_email(email)

                if is_valid:
                    # Clean and standardize fields
                    row["email"] = email.strip().lower()
                    row["business_name"] = (row.get("business_name") or "Local Business").strip()
                    row["category"] = (row.get("category") or "business").strip()
                    valid_leads.append(row)
                else:
                    invalid_count += 1
                    self.log_invalid_row(row, reason)

        logger.info(f"Loaded {total_rows} total rows: {len(valid_leads)} valid emails, {invalid_count} invalid/skipped.")
        return valid_leads, total_rows, invalid_count
