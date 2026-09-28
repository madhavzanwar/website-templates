"""
Configuration loader for Pune SMB Brevo Cold Email Outreach Engine.
Loads secrets from .env and settings from config.json.
Secrets are strictly masked and never logged.
"""

import os
import json
from pathlib import Path
from typing import Dict, Any, List

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

BASE_DIR = Path(__file__).resolve().parent.parent

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
SENDER_NAME = os.getenv("SENDER_NAME", "").strip() or "Poonam"
REPLY_TO_EMAIL = os.getenv("REPLY_TO_EMAIL", "").strip() or SENDER_EMAIL
IMAP_HOST = os.getenv("IMAP_HOST", "").strip() or "imap.gmail.com"
IMAP_USER = os.getenv("IMAP_USER", "").strip() or REPLY_TO_EMAIL
IMAP_APP_PASSWORD = os.getenv("IMAP_APP_PASSWORD", "").strip()
SENDER_ADDRESS = os.getenv("SENDER_ADDRESS", "").strip() or "Pune, Maharashtra, India"
SENDER_PHONE = os.getenv("SENDER_PHONE", "").strip() or "+91 98220 12345"

# File paths from config.json
_FILES = _CONFIG_DATA.get("files", {})
LEADS_CSV = str(BASE_DIR / _FILES.get("leads_csv", "pune_smb_leads.csv"))
SENT_LOG_CSV = str(BASE_DIR / _FILES.get("sent_log_csv", "sent_log.csv"))
SKIPPED_LEADS_CSV = str(BASE_DIR / _FILES.get("skipped_leads_csv", "skipped_leads.csv"))
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

SLOTS_LINE_ENABLED: bool = bool(_CONFIG_DATA.get("slots_line_enabled", False))

# Limits & Warm-up schedule
PLAN_DAILY_LIMIT: int = int(_CONFIG_DATA.get("plan_daily_limit", 300))
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
    "max_delay_seconds": 10,
    "batch_min": 25,
    "batch_max": 50,
    "batch_gap_min_seconds": 120,
    "batch_gap_max_seconds": 300
})

HEALTH_THRESHOLDS: Dict[str, Any] = _CONFIG_DATA.get("health_thresholds", {
    "check_interval_sends": 25,
    "hard_bounce_pause_pct": 3.0,
    "hard_bounce_cut_cap_pct": 2.0,
    "spam_complaint_pause_pct": 0.1,
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
