"""
Lead filtering and queue ordering module for Pune SMB Cold Outreach.
Enforces strict RFC email validation, domain rules, role mailbox exclusions,
institutional keyword filtering, acronym reviews, branch chain detection,
big brand checks, category sanity checks, live demo link verification,
persistent suppression checks, and mixed-queue ordering.
"""

import os
import re
import csv
import html
import urllib.request
from typing import List, Dict, Any, Tuple, Set
from collections import defaultdict, deque

from outreach import config

# Robust email pattern
EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
)

SYSTEM_EMAIL_PREFIXES = (
    "noreply", "no-reply", "donotreply", "do-not-reply",
    "mailer-daemon", "postmaster", "spam", "abuse"
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

def extract_base_business_name(name: str) -> str:
    """
    Strip branch/location suffixes such as:
    ' - Locality', ', Locality Branch', ', Locality', '(Branch)', 'Branch'.
    """
    if not name:
        return ""
    base = re.sub(r'\s*[-–—]\s*.*$', '', name)
    base = re.sub(r',\s*.*$', '', base)
    base = re.sub(r'\s*\(.*?\)', '', base)
    base = re.sub(r'(?i)\s+branch$', '', base)
    return base.strip()

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

    parts = [p.strip() for p in address.split(',')]
    for part in parts:
        cleaned = re.sub(r'[^a-zA-Z\s]', '', part).strip()
        if cleaned and cleaned.lower() not in ['pune', 'maharashtra', 'india', 'near', 'opp', 'opposite']:
            return cleaned.title()

    return "Pune"

class LeadFilter:
    def __init__(
        self,
        leads_csv: str = config.LEADS_CSV,
        sent_log_csv: str = config.SENT_LOG_CSV,
        suppression_list_csv: str = config.SUPPRESSION_LIST_CSV,
        skipped_leads_csv: str = config.SKIPPED_LEADS_CSV,
        needs_review_csv: str = config.NEEDS_REVIEW_CSV,
        exclude_keywords: List[str] = config.EXCLUDE_KEYWORDS,
        institutional_keywords: List[str] = config.INSTITUTIONAL_KEYWORDS,
        disallowed_domain_endings: List[str] = config.DISALLOWED_DOMAIN_ENDINGS,
        allowed_tlds: List[str] = config.ALLOWED_TLDS,
        free_providers: List[str] = config.FREE_EMAIL_PROVIDERS,
        corporate_prefixes: List[str] = config.CORPORATE_MAILBOX_PREFIXES,
        mailbox_review_prefixes: List[str] = config.MAILBOX_REVIEW_PREFIXES,
        coaching_org_domain_review: bool = config.COACHING_ORG_DOMAIN_REVIEW,
        acronym_review: Dict[str, Any] = config.ACRONYM_REVIEW,
        branch_chain_threshold: int = config.BRANCH_CHAIN_THRESHOLD,
        allowed_role_prefixes: List[str] = config.ALLOWED_ROLE_PREFIXES,
        big_brands: List[str] = config.BIG_BRANDS,
        category_synonyms: Dict[str, List[str]] = config.CATEGORY_SYNONYMS,
        demo_verification_cfg: Dict[str, Any] = config.DEMO_LINK_VERIFICATION,
        base_url: str = config.BASE_URL
    ):
        self.leads_csv = leads_csv
        self.sent_log_csv = sent_log_csv
        self.suppression_list_csv = suppression_list_csv
        self.skipped_leads_csv = skipped_leads_csv
        self.needs_review_csv = needs_review_csv
        self.exclude_keywords = [kw.lower().strip() for kw in exclude_keywords if kw.strip()]
        self.institutional_keywords = [kw.lower().strip() for kw in institutional_keywords if kw.strip()]
        self.disallowed_domain_endings = [d.lower().strip() for d in disallowed_domain_endings]
        self.allowed_tlds = [t.lower().strip() for t in allowed_tlds]
        self.free_providers = set(p.lower().strip() for p in free_providers)
        self.corporate_prefixes = [p.lower().strip() for p in corporate_prefixes]
        self.mailbox_review_prefixes = [p.lower().strip() for p in mailbox_review_prefixes]
        self.coaching_org_domain_review = coaching_org_domain_review
        self.acronym_review = acronym_review
        self.branch_chain_threshold = branch_chain_threshold
        self.allowed_role_prefixes = set(p.lower().strip() for p in allowed_role_prefixes)
        self.big_brands = [b.lower().strip() for b in big_brands]
        self.category_synonyms = {k: [w.lower() for w in v] for k, v in category_synonyms.items()}
        self.demo_verification_cfg = demo_verification_cfg
        self.base_url = base_url

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

    def pre_scan_csv(self) -> Tuple[Dict[str, Set[str]], Dict[str, int], Dict[str, int]]:
        """
        Scan leads CSV to find:
        1. Domain -> Set of distinct business names using that domain (for agency/aggregator check)
        2. Exact business name -> Count of locations (for chain detection)
        3. Base business name (suffix stripped) -> Count of locations (for branch chain detection)
        """
        domain_to_businesses = defaultdict(set)
        business_counts = defaultdict(int)
        base_name_counts = defaultdict(int)

        if not os.path.exists(self.leads_csv):
            return domain_to_businesses, business_counts, base_name_counts

        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                bname = (row.get('business_name') or '').strip()
                email = (row.get('email') or '').strip().lower()
                if bname:
                    business_counts[bname.lower()] += 1
                    base_n = extract_base_business_name(bname).lower()
                    if base_n:
                        base_name_counts[base_n] += 1
                if email and '@' in email:
                    domain = email.split('@')[1]
                    if domain not in self.free_providers:
                        domain_to_businesses[domain].add(bname.lower())

        return domain_to_businesses, business_counts, base_name_counts

    def is_corporate_mailbox(self, local_part: str) -> bool:
        """
        Check if mailbox is an unattended corporate/support mailbox.
        Keeps info@, contact@, hello@, enquiry@, sales@, mail@.
        Drops support@, care@, help@, corporate*, etc.
        """
        lp = local_part.lower()
        if lp in self.allowed_role_prefixes:
            return False

        for pref in self.corporate_prefixes:
            if lp == pref:
                return True
            if lp.startswith(pref + ".") or lp.startswith(pref + "-") or lp.startswith(pref + "_"):
                return True
            if pref == "corporate" and lp.startswith("corporate"):
                return True

        return False

    def is_suspicious_free_mailbox(self, local_part: str) -> bool:
        """
        Flag suspicious or random free mailboxes (e.g. a10@gmail.com, xk89z@gmail.com).
        Returns True if < 4 chars or looks like random alphanumerics.
        """
        lp = local_part.lower()
        if len(lp) < 4:
            return True
        if re.match(r'^[a-z]\d{1,3}$', lp):
            return True
        if re.match(r'^[a-z]{1,2}\d{2,4}$', lp):
            return True
        if len(lp) >= 5 and not re.search(r'[aeiou]', lp):
            return True
        return False

    def is_article_or_directory_title(self, name: str) -> Tuple[bool, str]:
        """
        Check if business name is an article title, SEO listicle, or directory heading.
        """
        if not name:
            return False, ""
        nl = name.lower()

        # Starts with number followed by "best" or "top" (e.g. "10 Best Gyms", "3 Best Gym")
        if re.search(r'^\s*\d+\s*(?:best|top)\b', name, re.IGNORECASE):
            return True, "Starts with number + best/top"

        # Starts with "top" or "best" followed by number (e.g. "Top 10 Best...")
        if re.search(r'^\s*(?:top|best)\s*\d+\b', name, re.IGNORECASE):
            return True, "Starts with top/best + number"

        # Contains directory phrases: near me, list of, how to, vs, reviews
        for phrase in ["near me", "near you", "list of", "how to", "reviews", "guide to"]:
            if phrase in nl:
                return True, f"Contains directory keyword '{phrase}'"

        if re.search(r'\bvs\.?\b', name, re.IGNORECASE):
            return True, "Contains 'vs'"

        # Length > 60 characters
        if len(name) > config.MAX_BUSINESS_NAME_LENGTH:
            return True, f"Length {len(name)} exceeds {config.MAX_BUSINESS_NAME_LENGTH} chars"

        # Pipe symbol
        if '|' in name:
            return True, "Contains pipe symbol '|'"

        # Contains URL or domain extension
        if re.search(r'(?:https?://|\.com\b|\.in\b|\.net\b|\.org\b|\.co\b|\.io\b|\.ai\b|www\.)', name, re.IGNORECASE):
            return True, "Contains URL or domain name"

        return False, ""

    def verify_demo_link(self, demo_link: str, business_name: str) -> Tuple[bool, str]:
        """
        Live HTTP verification of demo link:
        1. Confirms link format and accessibility.
        2. Status 200 within timeout.
        3. Page body contains business_name.
        """
        if not self.demo_verification_cfg.get("enabled", True):
            return True, "Verification disabled"

        if not demo_link or not isinstance(demo_link, str):
            return False, "Missing demo link"

        # Check if URL starts with configured BASE_URL or local test URL
        clean_base = self.base_url.rstrip('/') if self.base_url else ""
        is_public = config.is_public_base_url(clean_base)

        target_url = demo_link
        # If public base_url is set, map local URL to public
        if is_public and clean_base:
            if "localhost:3000" in target_url:
                target_url = target_url.replace("http://localhost:3000", clean_base)

        timeout = self.demo_verification_cfg.get("timeout_seconds", 3)
        check_name = self.demo_verification_cfg.get("check_body_business_name", True)

        try:
            req = urllib.request.Request(
                target_url,
                headers={"User-Agent": "PuneOutreachValidator/1.0"}
            )
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                status = resp.getcode()
                if status != 200:
                    return False, f"HTTP status {status}"

                if check_name and business_name:
                    body_bytes = resp.read()
                    body_text = html.unescape(body_bytes.decode('utf-8', errors='ignore')).lower()
                    b_lower = business_name.strip().lower()
                    if b_lower not in body_text:
                        b_words = [w for w in re.sub(r'[^a-zA-Z0-9\s]', '', b_lower).split() if len(w) > 2]
                        if b_words and not all(w in body_text for w in b_words[:2]):
                            return False, f"Page body does not contain business name '{business_name}'"

                return True, "OK"
        except urllib.error.HTTPError as he:
            return False, f"HTTP {he.code}: {he.reason}"
        except urllib.error.URLError as ue:
            return False, f"Network error: {ue.reason}"
        except Exception as e:
            return False, f"Verification error: {str(e)}"

    def process_leads(self) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], Dict[str, int], List[Dict[str, Any]]]:
        """
        Filters all leads from pune_smb_leads.csv applying all hardening rules.
        Returns:
            - valid_queue: Cleaned, enriched, verified leads ready for sending
            - skipped_records: Leads dropped with exact reason
            - stats: Summary counts
            - needs_review_records: Ambiguous leads flagged for manual inspection
        """
        suppressed_emails = self.load_suppressed_emails()
        sent_emails = self.load_sent_emails()
        domain_to_businesses, business_counts, base_name_counts = self.pre_scan_csv()

        valid_queue: List[Dict[str, Any]] = []
        skipped_records: List[Dict[str, Any]] = []
        needs_review_records: List[Dict[str, Any]] = []
        seen_emails_in_batch: Set[str] = set()

        stats = {
            "total_rows": 0,
            "valid_candidates": 0,
            "missing_email": 0,
            "invalid_email_format": 0,
            "system_email": 0,
            "excluded_keyword": 0,
            "institutional_keyword": 0,
            "disallowed_domain": 0,
            "disallowed_tld": 0,
            "aggregator_domain": 0,
            "chain_business": 0,
            "big_brand": 0,
            "corporate_mailbox": 0,
            "article_or_directory": 0,
            "non_latin_script": 0,
            "already_sent": 0,
            "in_suppression_list": 0,
            "duplicate_in_file": 0,
            "needs_review_flagged": 0
        }

        if not os.path.exists(self.leads_csv):
            raise FileNotFoundError(f"Leads CSV not found at {self.leads_csv}")

        all_exclude_keywords = self.exclude_keywords + self.institutional_keywords

        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                stats["total_rows"] += 1
                b_name = (row.get('business_name') or '').strip()
                email_raw = (row.get('email') or '').strip()
                category = (row.get('category') or '').strip()
                address = (row.get('address') or '').strip()
                phone = (row.get('phone') or '').strip()
                website = (row.get('website') or '').strip()
                source = (row.get('source') or '').strip()
                demo_link = (row.get('demo_link') or '').strip()
                has_web = (row.get('has_website') or '').strip().lower()

                base_record = {
                    "business_name": b_name,
                    "email": email_raw,
                    "category": category,
                    "address": address,
                    "phone": phone,
                    "website": website,
                    "source": source,
                    "demo_link": demo_link
                }

                # 1. Missing email
                if not email_raw:
                    stats["missing_email"] += 1
                    skipped_records.append({**base_record, "reason": "Missing email"})
                    continue

                email_clean = email_raw.lower()

                # 2. Invalid RFC email format
                if not is_valid_email(email_clean):
                    stats["invalid_email_format"] += 1
                    skipped_records.append({**base_record, "reason": f"Invalid email format: {email_raw}"})
                    continue

                # 3. System address (noreply, postmaster, etc.)
                if is_system_email(email_clean):
                    stats["system_email"] += 1
                    skipped_records.append({**base_record, "reason": "System/Automated email prefix (noreply/postmaster)"})
                    continue

                local_part, domain = email_clean.split('@')
                b_name_lower = b_name.lower()

                # 4. Excluded and Institutional keywords in business name
                is_excluded_kw = False
                for kw in all_exclude_keywords:
                    if re.search(rf"\b{re.escape(kw)}\b", b_name_lower) or kw in b_name_lower:
                        if kw in self.institutional_keywords:
                            stats["institutional_keyword"] += 1
                            skipped_records.append({**base_record, "reason": f"Institutional keyword matched: '{kw}'"})
                        else:
                            stats["excluded_keyword"] += 1
                            skipped_records.append({**base_record, "reason": f"Excluded keyword matched: '{kw}'"})
                        is_excluded_kw = True
                        break
                if is_excluded_kw:
                    continue

                # 5. Role mailboxes: admissions@ or principal@ -> needs_review.csv
                if local_part in self.mailbox_review_prefixes or any(local_part.startswith(p + ".") for p in self.mailbox_review_prefixes):
                    stats["needs_review_flagged"] += 1
                    needs_review_records.append({**base_record, "reason": f"School/institution mailbox prefix: '{local_part}@'"})
                    continue

                # 6. .org domain in coaching category -> needs_review.csv
                if self.coaching_org_domain_review and domain.endswith(".org") and "coaching" in category.lower():
                    stats["needs_review_flagged"] += 1
                    needs_review_records.append({**base_record, "reason": f".org domain in coaching category (likely institute/NGO): '{domain}'"})
                    continue

                # 7. Acronym review: 3-6 capital letters without category word (like GGIS) -> needs_review.csv
                if self.acronym_review.get("enabled", True):
                    clean_alpha = re.sub(r'[^A-Za-z]', '', b_name)
                    min_l = self.acronym_review.get("min_len", 3)
                    max_l = self.acronym_review.get("max_len", 6)
                    if clean_alpha.isupper() and min_l <= len(clean_alpha) <= max_l:
                        syns = self.category_synonyms.get(category, [])
                        if not any(s in b_name_lower for s in syns):
                            stats["needs_review_flagged"] += 1
                            needs_review_records.append({**base_record, "reason": f"Acronym name '{b_name}' ({len(clean_alpha)} uppercase letters) without category synonym"})
                            continue

                # 8. Branch suffix stripping and chain detection
                base_name = extract_base_business_name(b_name)
                if base_name and base_name.lower() != b_name_lower:
                    base_cnt = base_name_counts.get(base_name.lower(), 0)
                    if base_cnt >= self.branch_chain_threshold:
                        stats["needs_review_flagged"] += 1
                        needs_review_records.append({**base_record, "reason": f"Branch of multi-location business: base name '{base_name}' appears {base_cnt} times in dataset"})
                        continue

                # 9. Disallowed government/education domain endings (.gov.in, .edu.in, .ac.in, etc.)
                is_disallowed_domain = False
                for dis in self.disallowed_domain_endings:
                    if domain.endswith(dis):
                        stats["disallowed_domain"] += 1
                        skipped_records.append({**base_record, "reason": f"Disallowed government/education domain: '{dis}'"})
                        is_disallowed_domain = True
                        break
                if is_disallowed_domain:
                    continue

                # 10. Allowed TLD list / Free providers (drop foreign TLDs like .vn, .cn, .ru, etc.)
                if domain not in self.free_providers:
                    tld_match = any(domain.endswith(t) for t in self.allowed_tlds)
                    if not tld_match:
                        stats["disallowed_tld"] += 1
                        skipped_records.append({**base_record, "reason": f"Disallowed TLD: domain '{domain}' not in approved list"})
                        continue

                # 11. Agency / Aggregator domain check (domain on >= 3 businesses)
                if domain not in self.free_providers:
                    biz_count = len(domain_to_businesses.get(domain, set()))
                    if biz_count >= config.MAX_DOMAIN_OCCURRENCES:
                        stats["aggregator_domain"] += 1
                        skipped_records.append({**base_record, "reason": f"Agency/Aggregator domain (used by {biz_count} businesses): '{domain}'"})
                        continue

                # 12. Chain detection (exact business name appears at >= 3 locations)
                if business_counts.get(b_name_lower, 0) >= config.MAX_BUSINESS_NAME_LOCATIONS:
                    stats["chain_business"] += 1
                    skipped_records.append({**base_record, "reason": f"Chain business with >= 3 locations: '{b_name}'"})
                    continue

                # 13. Big brands and national chains blacklist
                is_big_brand = False
                for brand in self.big_brands:
                    if brand in b_name_lower or (website and brand in website.lower()):
                        stats["big_brand"] += 1
                        skipped_records.append({**base_record, "reason": f"National chain/brand blacklist: '{brand}'"})
                        is_big_brand = True
                        break
                if is_big_brand:
                    continue

                # 14. Role-based & corporate unattended mailboxes (support@, care@, etc.)
                if self.is_corporate_mailbox(local_part):
                    stats["corporate_mailbox"] += 1
                    skipped_records.append({**base_record, "reason": f"Corporate/unattended mailbox prefix: '{local_part}@'"})
                    continue

                # 15. Non-Latin script sanity (> 20%)
                non_latin = sum(1 for c in b_name if ord(c) > 127)
                if len(b_name) > 0 and (non_latin / len(b_name)) > config.MAX_NON_LATIN_RATIO:
                    stats["non_latin_script"] += 1
                    skipped_records.append({**base_record, "reason": f"Non-Latin script ratio ({non_latin}/{len(b_name)}) > {config.MAX_NON_LATIN_RATIO:.0%}"})
                    continue

                # 16. Article / Directory title checks (e.g. "10 Best Gyms", near me, etc.)
                is_article, article_reason = self.is_article_or_directory_title(b_name)
                if is_article:
                    stats["article_or_directory"] += 1
                    skipped_records.append({**base_record, "reason": f"Article/directory title: {article_reason}"})
                    continue

                # 17. Already in suppression list
                if email_clean in suppressed_emails:
                    stats["in_suppression_list"] += 1
                    skipped_records.append({**base_record, "reason": "Address present in suppression_list.csv"})
                    continue

                # 18. Already in sent log
                if email_clean in sent_emails:
                    stats["already_sent"] += 1
                    skipped_records.append({**base_record, "reason": "Already sent in sent_log.csv"})
                    continue

                # 19. Duplicate in current file batch
                if email_clean in seen_emails_in_batch:
                    stats["duplicate_in_file"] += 1
                    skipped_records.append({**base_record, "reason": "Duplicate email in leads CSV"})
                    continue

                # 20. Needs review: Short or random free mailboxes (< 4 chars or random)
                if domain in self.free_providers and self.is_suspicious_free_mailbox(local_part):
                    stats["needs_review_flagged"] += 1
                    needs_review_records.append({**base_record, "reason": f"Suspicious/short free mailbox: '{email_clean}'"})
                    continue

                # 21. Needs review: Category sanity check for web_search or unverified sources
                if source.lower() in ["web_search", "unknown", ""]:
                    syns = self.category_synonyms.get(category, [])
                    combined_text = (b_name + " " + website).lower()
                    if syns and not any(s in combined_text for s in syns):
                        stats["needs_review_flagged"] += 1
                        needs_review_records.append({**base_record, "reason": f"Category sanity check: no synonym for '{category}' found in business name or website"})
                        continue

                # 22. Live Demo Link Verification
                demo_valid, demo_msg = self.verify_demo_link(demo_link, b_name)
                if not demo_valid:
                    stats["needs_review_flagged"] += 1
                    needs_review_records.append({**base_record, "reason": f"demo_link_unreachable: {demo_msg}"})
                    continue

                # Lead is fully qualified!
                seen_emails_in_batch.add(email_clean)
                locality = extract_locality_from_address(address)

                enriched_row = dict(row)
                enriched_row['email'] = email_clean
                enriched_row['locality'] = locality
                enriched_row['has_website_bool'] = (has_web in ['yes', 'true', '1'])
                valid_queue.append(enriched_row)
                stats["valid_candidates"] += 1

        # Write skipped_leads.csv
        self.save_skipped_leads(skipped_records)

        # Write needs_review.csv
        self.save_needs_review(needs_review_records)

        # Order queue round-robin to interleave categories and localities
        mixed_queue = self.mix_queue(valid_queue)

        return mixed_queue, skipped_records, stats, needs_review_records

    def save_skipped_leads(self, skipped: List[Dict[str, Any]]):
        with open(self.skipped_leads_csv, 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['business_name', 'email', 'category', 'address', 'reason']
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
            writer.writeheader()
            for r in skipped:
                writer.writerow(r)

    def save_needs_review(self, needs_review: List[Dict[str, Any]]):
        with open(self.needs_review_csv, 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['business_name', 'email', 'category', 'address', 'phone', 'website', 'demo_link', 'source', 'reason']
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction='ignore')
            writer.writeheader()
            for r in needs_review:
                writer.writerow(r)

    def mix_queue(self, leads: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Round-robin interleaved queue to prevent clustering of the same category or locality.
        """
        if not leads:
            return []

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
