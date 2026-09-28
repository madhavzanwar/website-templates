"""
Module C1: Deduplication Engine
Deduplicates business leads by:
1. Normalized phone number (10-digit standard Indian phone).
2. Fuzzy business name similarity (difflib SequenceMatcher >= 0.85).
3. Exact website root domain matching.
"""

import re
import difflib
import urllib.parse
from typing import Dict, Any, Set, List

class LeadDeduper:
    """Manages deduplication state across scraping sessions."""

    GENERIC_WORDS = {
        "pvt", "ltd", "private", "limited", "company", "co", "enterprise",
        "enterprises", "services", "center", "centre", "hub", "studio",
        "pune", "ravet", "branch", "the", "and", "&", "club"
    }

    def __init__(self):
        self.seen_phones: Set[str] = set()
        self.seen_domains: Set[str] = set()
        # Mapping category -> list of (normalized_name, original_name)
        self.seen_names_by_category: Dict[str, List[str]] = {}

    @staticmethod
    def normalize_phone(phone: str) -> str:
        """Normalizes Indian phone numbers to 10-digit canonical form."""
        if not phone:
            return ""
        digits = re.sub(r"\D", "", phone)
        # Strip Indian country code 91 if 12 digits
        if len(digits) == 12 and digits.startswith("91"):
            digits = digits[2:]
        # Strip leading 0 if 11 digits
        elif len(digits) == 11 and digits.startswith("0"):
            digits = digits[1:]
        return digits if len(digits) >= 8 else ""

    @classmethod
    def clean_name(cls, name: str) -> str:
        """Cleans name for fuzzy matching by removing punctuation and generic suffixes."""
        if not name:
            return ""
        tokens = re.findall(r"[a-z0-9]+", name.lower())
        meaningful = [t for t in tokens if t not in cls.GENERIC_WORDS]
        return " ".join(meaningful) if meaningful else " ".join(tokens)

    @staticmethod
    def extract_domain(website: str) -> str:
        """Extracts cleaned base domain from website URL."""
        if not website:
            return ""
        try:
            parsed = urllib.parse.urlparse(website if "://" in website else "http://" + website)
            domain = parsed.netloc.lower()
            if domain.startswith("www."):
                domain = domain[4:]
            return domain
        except Exception:
            return ""

    def is_duplicate(self, business: Dict[str, Any]) -> bool:
        """
        Evaluates whether a lead is a duplicate.
        Returns True if duplicate, False if unique.
        If unique, stores lead attributes to prevent future duplicates.
        """
        category = business.get("category", "").lower()
        name = business.get("business_name", "")
        phone = self.normalize_phone(business.get("phone", ""))
        website = business.get("website", "")
        domain = self.extract_domain(website)

        # 1. Phone Match
        if phone:
            if phone in self.seen_phones:
                return True

        # 2. Domain Match (if valid custom domain)
        if domain and len(domain) > 4 and domain not in ["justdial.com", "indiamart.com", "sulekha.com", "facebook.com", "instagram.com"]:
            if domain in self.seen_domains:
                return True

        # 3. Fuzzy Name Match within Category
        cleaned_name = self.clean_name(name)
        if cleaned_name and len(cleaned_name) >= 3:
            existing_names = self.seen_names_by_category.setdefault(category, [])
            for existing in existing_names:
                # Fast length heuristic
                if abs(len(cleaned_name) - len(existing)) > max(len(cleaned_name), len(existing)) * 0.4:
                    continue
                similarity = difflib.SequenceMatcher(None, cleaned_name, existing).ratio()
                if similarity >= 0.85:
                    return True

        # Lead is unique -> record in state
        if phone:
            self.seen_phones.add(phone)
        if domain and domain not in ["justdial.com", "indiamart.com", "sulekha.com", "facebook.com", "instagram.com"]:
            self.seen_domains.add(domain)
        if cleaned_name:
            self.seen_names_by_category.setdefault(category, []).append(cleaned_name)

        return False
