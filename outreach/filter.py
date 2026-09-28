"""
Lead filtering and queue ordering module for Pune SMB Cold Outreach.
Enforces RFC email validation, keyword exclusion, system email skipping,
deduplication, persistent suppression checks, and mixed-queue ordering.
"""

import os
import re
import csv
from typing import List, Dict, Any, Tuple, Set
from collections import defaultdict, deque

SYSTEM_EMAIL_PREFIXES = (
    "noreply", "no-reply", "donotreply", "do-not-reply",
    "mailer-daemon", "postmaster", "spam", "abuse"
)

# Robust email pattern
EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
)

def is_valid_email(email: str) -> bool:
    if not email or not isinstance(email, str):
        return False
    email = email.strip()
    if len(email) < 5 or len(email) > 254:
        return False
    return bool(EMAIL_REGEX.match(email))

def is_system_email(email: str) -> bool:
    if not email:
        return False
    local_part = email.split('@')[0].lower()
    return any(local_part == prefix or local_part.startswith(prefix + "+") for prefix in SYSTEM_EMAIL_PREFIXES)

def extract_locality_from_address(address: str) -> str:
    """Extract recognized Pune locality from address, fallback to 'Pune'."""
    if not address or not isinstance(address, str):
        return "Pune"
    
    known_localities = [
        'Kothrud', 'Baner', 'Wakad', 'Viman Nagar', 'Kalyani Nagar', 'Hadapsar',
        'Aundh', 'Koregaon Park', 'Shivajinagar', 'Pimple Saudagar', 'Pimple Gurav',
        'Ravet', 'Nigdi', 'Chinchwad', 'Pimpri', 'Magarpatta', 'Katraj', 'Warje',
        'Bavdhan', 'Kondhwa', 'Camp', 'Deccan', 'Sinhagad Road', 'Kharadi',
        'Dhanori', 'Tingre Nagar', 'Moshi', 'Akurdi', 'Dapodi', 'Bhosari',
        'Vishrantwadi', 'Swargate', 'FC Road', 'JM Road', 'Paud Road',
        'Karve Nagar', 'Balewadi', 'Prabhat Road', 'Model Colony', 'Balewadi High Street',
        'Hinjewadi', 'Hinjawadi', 'Wanowrie', 'Fatima Nagar'
    ]
    addr_lower = address.lower()
    for loc in known_localities:
        if loc.lower() in addr_lower:
            return loc
    
    # Try comma part
    parts = [p.strip() for p in address.split(',')]
    for part in parts:
        cleaned = re.sub(r'[^a-zA-Z\s]', '', part).strip()
        if cleaned and cleaned.lower() not in ['pune', 'maharashtra', 'india', 'near', 'opp', 'opposite']:
            return cleaned.title()

    return "Pune"

class LeadFilter:
    def __init__(
        self,
        leads_csv: str,
        sent_log_csv: str,
        suppression_list_csv: str,
        skipped_leads_csv: str,
        exclude_keywords: List[str]
    ):
        self.leads_csv = leads_csv
        self.sent_log_csv = sent_log_csv
        self.suppression_list_csv = suppression_list_csv
        self.skipped_leads_csv = skipped_leads_csv
        self.exclude_keywords = [kw.lower().strip() for kw in exclude_keywords if kw.strip()]

    def load_suppressed_emails(self) -> Set[str]:
        suppressed = set()
        if os.path.exists(self.suppression_list_csv):
            with open(self.suppression_list_csv, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    em = (row.get('email') or '').strip().lower()
                    if em:
                        suppressed.add(em)
        return suppressed

    def load_sent_emails(self) -> Set[str]:
        sent = set()
        if os.path.exists(self.sent_log_csv):
            with open(self.sent_log_csv, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    em = (row.get('email') or '').strip().lower()
                    if em:
                        sent.add(em)
        return sent

    def matches_excluded_keyword(self, business_name: str) -> Tuple[bool, str]:
        if not business_name:
            return False, ""
        name_lower = business_name.lower()
        for kw in self.exclude_keywords:
            # Word boundary or substring matching
            pattern = rf"\b{re.escape(kw)}\b"
            if re.search(pattern, name_lower) or kw in name_lower:
                return True, kw
        return False, ""

    def process_leads(self) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], Dict[str, int]]:
        """
        Filters all leads from pune_smb_leads.csv.
        Returns:
            - valid_queue: List of cleaned, enriched leads ready for sending
            - skipped_records: List of all skipped leads with reasons
            - stats: Summary statistics dictionary
        """
        suppressed_emails = self.load_suppressed_emails()
        sent_emails = self.load_sent_emails()

        valid_queue: List[Dict[str, Any]] = []
        skipped_records: List[Dict[str, Any]] = []
        seen_emails_in_batch: Set[str] = set()

        stats = {
            "total_rows": 0,
            "valid_candidates": 0,
            "missing_email": 0,
            "invalid_email_format": 0,
            "system_email": 0,
            "missing_demo_link": 0,
            "excluded_keyword": 0,
            "already_sent": 0,
            "in_suppression_list": 0,
            "duplicate_in_file": 0
        }

        if not os.path.exists(self.leads_csv):
            raise FileNotFoundError(f"Leads CSV not found at {self.leads_csv}")

        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                stats["total_rows"] += 1
                b_name = (row.get('business_name') or '').strip()
                email_raw = (row.get('email') or '').strip()
                category = (row.get('category') or '').strip()
                address = (row.get('address') or '').strip()
                demo_link = (row.get('demo_link') or '').strip()
                has_web = (row.get('has_website') or '').strip().lower()

                # 1. Missing email
                if not email_raw:
                    stats["missing_email"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": "",
                        "category": category,
                        "address": address,
                        "reason": "Missing email"
                    })
                    continue

                email_clean = email_raw.lower()

                # 2. Invalid email format
                if not is_valid_email(email_clean):
                    stats["invalid_email_format"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_raw,
                        "category": category,
                        "address": address,
                        "reason": f"Invalid email format: {email_raw}"
                    })
                    continue

                # 3. System address
                if is_system_email(email_clean):
                    stats["system_email"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": "System/Automated email prefix (noreply/postmaster)"
                    })
                    continue

                # 4. Missing demo_link
                if not demo_link or not demo_link.startswith("http"):
                    stats["missing_demo_link"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": "Missing demo_link"
                    })
                    continue

                # 5. Excluded keyword in business_name
                is_excluded, matched_kw = self.matches_excluded_keyword(b_name)
                if is_excluded:
                    stats["excluded_keyword"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": f"Excluded keyword matched: '{matched_kw}'"
                    })
                    continue

                # 6. Already in suppression list
                if email_clean in suppressed_emails:
                    stats["in_suppression_list"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": "Address present in suppression_list.csv"
                    })
                    continue

                # 7. Already in sent_log
                if email_clean in sent_emails:
                    stats["already_sent"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": "Already sent in sent_log.csv"
                    })
                    continue

                # 8. Duplicate in current leads file
                if email_clean in seen_emails_in_batch:
                    stats["duplicate_in_file"] += 1
                    skipped_records.append({
                        "business_name": b_name,
                        "email": email_clean,
                        "category": category,
                        "address": address,
                        "reason": "Duplicate email in leads CSV"
                    })
                    continue

                seen_emails_in_batch.add(email_clean)

                # Parse locality
                locality = extract_locality_from_address(address)

                # Add enriched record
                enriched_row = dict(row)
                enriched_row['email'] = email_clean
                enriched_row['locality'] = locality
                enriched_row['has_website_bool'] = (has_web in ['yes', 'true', '1'])
                valid_queue.append(enriched_row)
                stats["valid_candidates"] += 1

        # Write skipped_leads.csv
        self.save_skipped_leads(skipped_records)

        # Order queue so categories and localities are mixed
        mixed_queue = self.mix_queue(valid_queue)

        return mixed_queue, skipped_records, stats

    def save_skipped_leads(self, skipped: List[Dict[str, Any]]):
        with open(self.skipped_leads_csv, 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['business_name', 'email', 'category', 'address', 'reason']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            for r in skipped:
                writer.writerow(r)

    def mix_queue(self, leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Round-robin interleaved queue to prevent clustering of the same category or locality.
        """
        if not leads:
            return []

        # Group by category
        by_category = defaultdict(deque)
        for lead in leads:
            cat = lead.get('category') or 'general'
            by_category[cat].append(lead)

        mixed = []
        categories = list(by_category.keys())
        active_cats = list(categories)

        while active_cats:
            for cat in list(active_cats):
                q = by_category[cat]
                if q:
                    mixed.append(q.popleft())
                else:
                    active_cats.remove(cat)

        return mixed
