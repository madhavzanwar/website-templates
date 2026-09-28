"""
Configuration loader for Pune SMB Brevo Cold Email Outreach Engine.
Loads secrets from .env and settings from config.json.
Secrets are strictly masked and never logged.
"""

import os
import json
from pathlib import Path
from typing import Dict, Any, List

BASE_DIR = Path(__file__).resolve().parent.parent

try:
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=BASE_DIR / ".env", override=True)
except ImportError:
    pass

# Path to config.json
CONFIG_PATH = BASE_DIR / "config.json"
if not CONFIG_PATH.exists():
    CONFIG_PATH = BASE_DIR / "outreach_config.json"

_CONFIG_DATA: Dict[str, Any] = {}
if CONFIG_PATH.exists():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            _CONFIG_DATA = json.load(f)
    except Exception as e:
        print(f"Warning: Could not parse {CONFIG_PATH}: {e}")
        _CONFIG_DATA = {}

# Secrets from .env (NEVER print or hardcode)
BREVO_API_KEY = os.getenv("BREVO_API_KEY", "").strip()
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "").strip()
SENDER_NAME = os.getenv("SENDER_NAME", "").strip() or "Madhav"
REPLY_TO_EMAIL = os.getenv("REPLY_TO_EMAIL", "").strip() or SENDER_EMAIL
# Outreach replies are handled manually directly in inbox (no IMAP polling)
SKIP_IMAP = True
SENDER_ADDRESS = os.getenv("SENDER_ADDRESS", "").strip() or "Ravet, Pune, Maharashtra, India"
SENDER_PHONE = os.getenv("SENDER_PHONE", "").strip() or "+91 98220 12345"

# Web / Demo URL
BASE_URL = os.getenv("BASE_URL") or os.getenv("DEMO_BASE_URL", "http://localhost:3000")

# File paths from config.json
_FILES = _CONFIG_DATA.get("files", {})
LEADS_CSV = str(BASE_DIR / _FILES.get("leads_csv", "pune_smb_leads.csv"))
SENT_LOG_CSV = str(BASE_DIR / _FILES.get("sent_log_csv", "sent_log.csv"))
SKIPPED_LEADS_CSV = str(BASE_DIR / _FILES.get("skipped_leads_csv", "skipped_leads.csv"))
NEEDS_REVIEW_CSV = str(BASE_DIR / _FILES.get("needs_review_csv", "needs_review.csv"))
SUPPRESSION_LIST_CSV = str(BASE_DIR / _FILES.get("suppression_list_csv", "suppression_list.csv"))
HOT_LEADS_CSV = str(BASE_DIR / _FILES.get("hot_leads_csv", "hot_leads.csv"))
NEEDS_ATTENTION_CSV = str(BASE_DIR / _FILES.get("needs_attention_csv", "needs_attention.csv"))
STATE_FILE_PATH = str(BASE_DIR / _FILES.get("state_file", "state.json"))
PREVIEW_DIR = str(BASE_DIR / _FILES.get("preview_dir", "preview"))

CATEGORY_PLURAL_JSON = str(BASE_DIR / _FILES.get("category_plural_json", "category_plural.json"))
SUBJECTS_NO_WEBSITE = str(BASE_DIR / _FILES.get("subjects_no_website", "subjects_no_website.txt"))
SUBJECTS_HAS_WEBSITE = str(BASE_DIR / _FILES.get("subjects_has_website", "subjects_has_website.txt"))

TEMPLATE_NO_WEBSITE_TXT = str(BASE_DIR / _FILES.get("template_no_website_txt", "templates/email_no_website.txt"))
TEMPLATE_NO_WEBSITE_HTML = str(BASE_DIR / _FILES.get("template_no_website_html", "templates/email_no_website.html"))
TEMPLATE_HAS_WEBSITE_TXT = str(BASE_DIR / _FILES.get("template_has_website_txt", "templates/email_has_website.txt"))
TEMPLATE_HAS_WEBSITE_HTML = str(BASE_DIR / _FILES.get("template_has_website_html", "templates/email_has_website.html"))

# Filtering settings
EXCLUDE_KEYWORDS: List[str] = _CONFIG_DATA.get("exclude_keywords", [
    "school", "vidyalaya", "hostel", "club house", "society",
    "cricket academy", "hospital", "temple", "trust",
    "government", "municipal", "police"
])

INSTITUTIONAL_KEYWORDS: List[str] = _CONFIG_DATA.get("institutional_keywords", [
    "international school", "public school", "institute for", "institute of",
    "research", "foundation", "development society", "centre for", "center for",
    "university", "ngo", "trust", "ministry", "department", "corporation", "council"
])

DISALLOWED_DOMAIN_ENDINGS: List[str] = _CONFIG_DATA.get("disallowed_domain_endings", [
    ".gov.in", ".nic.in", ".gov", ".edu", ".edu.in", ".ac.in", ".res.in"
])

ALLOWED_TLDS: List[str] = _CONFIG_DATA.get("allowed_tlds", [
    ".com", ".in", ".co.in", ".net", ".org", ".co", ".biz", ".info",
    ".online", ".store", ".studio", ".clinic", ".fitness"
])

FREE_EMAIL_PROVIDERS: List[str] = _CONFIG_DATA.get("free_email_providers", [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "ymail.com"
])

CORPORATE_MAILBOX_PREFIXES: List[str] = _CONFIG_DATA.get("corporate_mailbox_prefixes", [
    "support", "customercare", "customer.care", "customerservice", "care", "help",
    "hr", "careers", "jobs", "press", "media", "corporate", "billing", "accounts",
    "webmaster", "admin"
])

MAILBOX_REVIEW_PREFIXES: List[str] = _CONFIG_DATA.get("mailbox_review_prefixes", [
    "admissions", "principal"
])

COACHING_ORG_DOMAIN_REVIEW: bool = bool(_CONFIG_DATA.get("coaching_org_domain_review", True))

ACRONYM_REVIEW: Dict[str, Any] = _CONFIG_DATA.get("acronym_review", {
    "enabled": True, "min_len": 3, "max_len": 6
})

BRANCH_CHAIN_THRESHOLD: int = int(_CONFIG_DATA.get("branch_chain_threshold", 2))

ALLOWED_ROLE_PREFIXES: List[str] = _CONFIG_DATA.get("allowed_role_prefixes", [
    "info", "contact", "hello", "enquiry", "sales", "mail"
])

MAX_BUSINESS_NAME_LENGTH: int = int(_CONFIG_DATA.get("max_business_name_length", 60))
MAX_NON_LATIN_RATIO: float = float(_CONFIG_DATA.get("max_non_latin_ratio", 0.20))
MAX_DOMAIN_OCCURRENCES: int = int(_CONFIG_DATA.get("max_domain_occurrences_across_businesses", 3))
MAX_BUSINESS_NAME_LOCATIONS: int = int(_CONFIG_DATA.get("max_business_name_locations", 3))

BIG_BRANDS: List[str] = _CONFIG_DATA.get("big_brands", [
    "Made Easy", "Allen", "Aakash", "Resonance", "Gold's Gym", "Cult.fit",
    "Lakme", "Jawed Habib", "Kaya", "Starbucks", "McDonald's", "KFC", "Burger King",
    "Dominos", "Pizza Hut", "Subway", "Apollo", "Fortis", "Max Healthcare",
    "Justdial", "Sulekha", "Indiamart", "Urban Company", "MagicBricks", "99acres",
    "Housing.com", "Fitpass", "Motion Kota", "AESL", "BetterUp", "Enrich", "Kidzee",
    "Bakliwal", "Urbounce"
])

CATEGORY_SYNONYMS: Dict[str, List[str]] = _CONFIG_DATA.get("category_synonyms", {})

def is_public_base_url(url: str) -> bool:
    """Return True if url is a valid public https:// URL (not localhost or 127.0.0.1)."""
    if not url:
        return False
    u = url.strip().lower()
    if not u.startswith("https://"):
        return False
    if "localhost" in u or "127.0.0.1" in u:
        return False
    return True

DEMO_LINK_VERIFICATION: Dict[str, Any] = _CONFIG_DATA.get("demo_link_verification", {
    "enabled": True,
    "timeout_seconds": 3,
    "check_body_business_name": True
})

SLOTS_LINE_ENABLED: bool = bool(_CONFIG_DATA.get("slots_line_enabled", False))

# Limits & Aggressive Warm-up schedule
PLAN_DAILY_LIMIT: int = int(_CONFIG_DATA.get("plan_daily_limit", 2000))
DAILY_CAP_MAX: int = int(_CONFIG_DATA.get("daily_cap_max", 2000))
WARMUP_SCHEDULE: List[int] = _CONFIG_DATA.get("warmup_schedule", [100, 200, 350, 600, 900, 1300, 2000])

# Effective daily ceiling cannot exceed plan daily limit
EFFECTIVE_DAILY_MAX: int = min(DAILY_CAP_MAX, PLAN_DAILY_LIMIT)

# Sending window & pacing
SEND_WINDOW: Dict[str, Any] = _CONFIG_DATA.get("send_window", {
    "start_hour": 9,
    "end_hour": 19,
    "timezone": "Asia/Kolkata",
    "send_days": [0, 1, 2, 3, 4, 5]
})

DELAYS: Dict[str, Any] = _CONFIG_DATA.get("delays", {
    "min_delay_seconds": 3,
    "max_delay_seconds": 7,
    "batch_min": 25,
    "batch_max": 50,
    "batch_gap_min_seconds": 60,
    "batch_gap_max_seconds": 180
})

HEALTH_THRESHOLDS: Dict[str, Any] = _CONFIG_DATA.get("health_thresholds", {
    "check_interval_sends": 50,
    "hard_bounce_pause_pct": 5.0,
    "hard_bounce_pause_min_sends": 100,
    "hard_bounce_cut_cap_pct": 2.0,
    "spam_complaint_pause_pct": 0.2,
    "spam_complaint_pause_min_sends": 500,
    "max_consecutive_api_failures": 5
})

AUTO_REPLY_ENABLED: bool = bool(_CONFIG_DATA.get("auto_reply_enabled", True))
IMAP_CHECK_INTERVAL_MINUTES: int = int(_CONFIG_DATA.get("imap_check_interval_minutes", 10))

def mask_secret(val: str) -> str:
    """Mask sensitive string for safe UI status output."""
    if not val:
        return "[NOT SET]"
    if len(val) <= 8:
        return "****"
    return f"{val[:3]}...{val[-4:]}"
