"""
Audit logging manager for Pune SMB Outreach.
Maintains sent_log.csv, skipped_leads.csv, suppression_list.csv, hot_leads.csv, and needs_attention.csv.
"""

import os
import csv
import datetime
from typing import Dict, Any, List, Optional, Tuple

from outreach import config

class SendLogger:
    def __init__(
        self,
        sent_log_path: str = config.SENT_LOG_CSV,
        hot_leads_path: str = config.HOT_LEADS_CSV,
        needs_attention_path: str = config.NEEDS_ATTENTION_CSV,
        suppression_path: str = config.SUPPRESSION_LIST_CSV
    ):
        self.sent_log_path = sent_log_path
        self.hot_leads_path = hot_leads_path
        self.needs_attention_path = needs_attention_path
        self.suppression_path = suppression_path

        self._ensure_files()

    def _ensure_files(self):
        if not os.path.exists(self.sent_log_path):
            with open(self.sent_log_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([
                    'business_name', 'email', 'category', 'variant',
                    'subject_used', 'timestamp', 'status',
                    'brevo_message_id', 'reply_status'
                ])

        if not os.path.exists(self.hot_leads_path):
            with open(self.hot_leads_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([
                    'business_name', 'email', 'category', 'timestamp',
                    'status', 'demo_link', 'reply_snippet'
                ])

        if not os.path.exists(self.needs_attention_path):
            with open(self.needs_attention_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([
                    'business_name', 'email', 'category', 'timestamp',
                    'subject', 'reply_snippet'
                ])

        if not os.path.exists(self.suppression_path):
            with open(self.suppression_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(['email', 'reason', 'timestamp'])

    def log_send(
        self,
        business_name: str,
        email: str,
        category: str,
        variant: str,
        subject: str,
        status: str,
        brevo_message_id: Optional[str] = None,
        reply_status: str = "none"
    ):
        ts = datetime.datetime.now(datetime.timezone.utc).isoformat()
        with open(self.sent_log_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                business_name,
                email.lower().strip(),
                category,
                variant,
                subject,
                ts,
                status,
                brevo_message_id or "",
                reply_status
            ])

    def update_reply_status(self, email: str, new_status: str):
        """Update reply_status in sent_log.csv for a lead."""
        email_clean = email.lower().strip()
        rows = []
        updated = False

        if not os.path.exists(self.sent_log_path):
            return

        with open(self.sent_log_path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            fieldnames = reader.fieldnames or [
                'business_name', 'email', 'category', 'variant',
                'subject_used', 'timestamp', 'status',
                'brevo_message_id', 'reply_status'
            ]
            for r in reader:
                if r.get('email', '').lower().strip() == email_clean:
                    r['reply_status'] = new_status
                    updated = True
                rows.append(r)

        if updated:
            with open(self.sent_log_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(rows)

    def log_hot_lead(
        self,
        business_name: str,
        email: str,
        category: str,
        demo_link: str,
        reply_snippet: str,
        status: str = "demo_sent"
    ):
        ts = datetime.datetime.now(datetime.timezone.utc).isoformat()
        with open(self.hot_leads_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                business_name,
                email.lower().strip(),
                category,
                ts,
                status,
                demo_link,
                reply_snippet.replace('\n', ' ')[:200]
            ])

    def log_needs_attention(
        self,
        business_name: str,
        email: str,
        category: str,
        subject: str,
        reply_snippet: str
    ):
        ts = datetime.datetime.now(datetime.timezone.utc).isoformat()
        with open(self.needs_attention_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                business_name,
                email.lower().strip(),
                category,
                ts,
                subject,
                reply_snippet.replace('\n', ' ')[:300]
            ])

    def add_to_suppression(self, email: str, reason: str):
        email_clean = email.lower().strip()
        ts = datetime.datetime.now(datetime.timezone.utc).isoformat()

        # Check existing
        existing = set()
        if os.path.exists(self.suppression_path):
            with open(self.suppression_path, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for r in reader:
                    em = (r.get('email') or '').strip().lower()
                    if em:
                        existing.add(em)

        if email_clean not in existing:
            with open(self.suppression_path, 'a', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow([email_clean, reason, ts])

class AppendManager:
    """Helper to batch add suppressions."""
    def __init__(self, suppression_path: str = config.SUPPRESSION_LIST_CSV):
        self.suppression_path = suppression_path

    def add_suppressions(self, items: List[Tuple[str, str]]) -> int:
        if not items:
            return 0

        existing = set()
        if os.path.exists(self.suppression_path):
            with open(self.suppression_path, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for r in reader:
                    em = (r.get('email') or '').strip().lower()
                    if em:
                        existing.add(em)

        added = 0
        ts = datetime.datetime.now(datetime.timezone.utc).isoformat()
        with open(self.suppression_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            for em, reason in items:
                em_clean = em.lower().strip()
                if em_clean and em_clean not in existing:
                    writer.writerow([em_clean, reason, ts])
                    existing.add(em_clean)
                    added += 1

        return added
