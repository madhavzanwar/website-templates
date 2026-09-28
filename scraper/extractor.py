"""
Module B: Website & Social Email Extractor Module
Performs a secondary pass on business websites and social media profiles:
1. Fetches homepage and discovers 'Contact'/'About' subpages.
2. Extracts public emails using strict RFC regex, rejecting media files, placeholders, and dummy domains.
3. Extracts Instagram and Facebook handles/links.
4. Checks Instagram/Facebook bio texts for publicly listed emails.
5. Flags 'has_website' as 'yes' or 'no'.
6. Strictly adheres to requirement: NO email guessing or brute-forcing.
"""

import re
import time
import random
import logging
import urllib.parse
from typing import Dict, Any, List, Set, Optional, Tuple
import requests
from bs4 import BeautifulSoup

from .config import (
    MIN_DELAY,
    MAX_DELAY,
    REQUEST_TIMEOUT,
    USER_AGENTS,
    EMAIL_REGEX,
    IGNORED_EMAIL_EXTENSIONS,
    IGNORED_DOMAINS,
    IGNORED_USERNAMES
)

logger = logging.getLogger("PuneScraper.Extractor")

class ContactExtractor:
    """Extracts contact intelligence (emails, socials, website status) via secondary pass."""
    
    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.session = requests.Session()
        self.email_pattern = re.compile(EMAIL_REGEX, re.IGNORECASE)

    def get_headers(self) -> Dict[str, str]:
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive"
        }

    def throttle(self):
        delay = random.uniform(self.min_delay, self.max_delay)
        time.sleep(delay)

    def safe_get(self, url: str, timeout: int = REQUEST_TIMEOUT) -> Optional[requests.Response]:
        self.throttle()
        try:
            resp = self.session.get(
                url,
                headers=self.get_headers(),
                timeout=timeout,
                allow_redirects=True,
                verify=False  # Avoid failing on self-signed local SMB SSL certs
            )
            return resp
        except Exception as e:
            logger.debug(f"Failed to fetch {url}: {e}")
            return None

    def clean_emails(self, raw_emails: List[str]) -> List[str]:
        """Filters out dummy emails, image filenames, tracking hashes, and invalid domains."""
        valid_emails = set()
        for raw in raw_emails:
            email = raw.strip().lower().rstrip(".,;:!?)\"'>")
            if email.startswith("mailto:"):
                email = email[7:].strip()

            # Must match pattern
            if not self.email_pattern.match(email):
                continue

            # Must not end with image/media extension
            if any(email.endswith(ext) for ext in IGNORED_EMAIL_EXTENSIONS):
                continue

            parts = email.split("@")
            if len(parts) != 2:
                continue

            username, domain = parts[0], parts[1]

            # Domain checks
            if domain in IGNORED_DOMAINS or any(domain.endswith("." + d) for d in IGNORED_DOMAINS):
                continue
            if "." not in domain or len(domain.split(".")[-1]) < 2:
                continue

            # Username checks
            if username in IGNORED_USERNAMES or len(username) < 2:
                continue

            # Filter out sha256 or random hex hash email addresses (like error reporting)
            if re.match(r'^[a-f0-9]{20,}@', username):
                continue

            valid_emails.add(email)

        return sorted(list(valid_emails))

    def extract_social_links(self, soup: BeautifulSoup, base_url: str) -> Dict[str, str]:
        """Extracts Instagram and Facebook handles/URLs from page links."""
        socials = {"instagram": "", "facebook": ""}
        
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            
            # Instagram
            if not socials["instagram"] and "instagram.com/" in href:
                clean_link = href.split("?")[0].rstrip("/")
                # Avoid generic share links or explore links
                if not any(x in clean_link for x in ["/p/", "/reel/", "/explore/", "/stories/", "/direct/", "instagram.com/accounts"]):
                    match = re.search(r'instagram\.com/([a-zA-Z0-9_.-]+)', clean_link)
                    if match and match.group(1).lower() not in ["home", "about", "legal", "terms"]:
                        socials["instagram"] = f"https://www.instagram.com/{match.group(1)}/"

            # Facebook
            if not socials["facebook"] and "facebook.com/" in href:
                clean_link = href.split("?")[0].rstrip("/")
                if not any(x in clean_link for x in ["/sharer", "/share", "/tr/", "/dialog/", "facebook.com/login"]):
                    socials["facebook"] = clean_link

        return socials

    def discover_contact_links(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Finds internal contact, about, and reach-us pages."""
        contact_links = []
        base_netloc = urllib.parse.urlparse(base_url).netloc.lower()

        keywords = ["contact", "about", "reach", "connect", "get-in-touch", "location", "support"]

        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            text = a.get_text(" ", strip=True).lower()
            href_lower = href.lower()

            if any(k in text for k in keywords) or any(k in href_lower for k in keywords):
                full_url = urllib.parse.urljoin(base_url, href)
                parsed = urllib.parse.urlparse(full_url)
                
                # Must be HTTP(S) and same domain
                if parsed.scheme in ["http", "https"] and parsed.netloc.lower() == base_netloc:
                    # Avoid mailto, tel, javascript
                    if full_url not in contact_links and not any(full_url.endswith(ext) for ext in [".pdf", ".jpg", ".png"]):
                        contact_links.append(full_url)

        return contact_links[:3]  # Scan up to 3 candidate pages

    def extract_from_website(self, website_url: str) -> Tuple[List[str], Dict[str, str]]:
        """
        Visits website homepage and contact subpages.
        Extracts verified emails and social links.
        """
        if not website_url.startswith(("http://", "https://")):
            website_url = "https://" + website_url

        found_emails = set()
        socials = {"instagram": "", "facebook": ""}

        logger.info(f"Crawling website: {website_url}")
        resp = self.safe_get(website_url)
        if not resp or resp.status_code >= 400:
            # Retry with http if https failed
            if website_url.startswith("https://"):
                http_url = "http://" + website_url[8:]
                resp = self.safe_get(http_url)

        if not resp or not resp.text:
            return [], socials

        soup = BeautifulSoup(resp.text, "html.parser")

        # 1. Extract from homepage text and mailto links
        homepage_emails = self.email_pattern.findall(resp.text)
        for a in soup.find_all("a", href=True):
            if a["href"].startswith("mailto:"):
                homepage_emails.append(a["href"][7:].split("?")[0])

        found_emails.update(self.clean_emails(homepage_emails))

        # 2. Extract social links from homepage
        socials = self.extract_social_links(soup, website_url)

        # 3. Discover and crawl Contact / About pages
        contact_pages = self.discover_contact_links(soup, website_url)
        for c_url in contact_pages:
            logger.debug(f"Crawling contact subpage: {c_url}")
            c_resp = self.safe_get(c_url)
            if c_resp and c_resp.text:
                c_soup = BeautifulSoup(c_resp.text, "html.parser")
                c_emails = self.email_pattern.findall(c_resp.text)
                for a in c_soup.find_all("a", href=True):
                    if a["href"].startswith("mailto:"):
                        c_emails.append(a["href"][7:].split("?")[0])
                found_emails.update(self.clean_emails(c_emails))
                
                # Check for socials if not found yet
                if not socials["instagram"] or not socials["facebook"]:
                    sub_socials = self.extract_social_links(c_soup, c_url)
                    if not socials["instagram"]:
                        socials["instagram"] = sub_socials["instagram"]
                    if not socials["facebook"]:
                        socials["facebook"] = sub_socials["facebook"]

        return sorted(list(found_emails)), socials

    def check_social_bio_for_email(self, social_url: str) -> Optional[str]:
        """
        Checks public Instagram or Facebook page bio/snippet for contact email.
        """
        if not social_url:
            return None

        resp = self.safe_get(social_url)
        if not resp or resp.status_code >= 400:
            return None

        # Look in meta description or page body
        soup = BeautifulSoup(resp.text, "html.parser")
        meta_desc = ""
        meta = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
        if meta and meta.get("content"):
            meta_desc = meta["content"]

        all_text = meta_desc + " " + resp.text[:3000]
        extracted = self.clean_emails(self.email_pattern.findall(all_text))
        return extracted[0] if extracted else None

    def process_lead(self, business: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes secondary pass for a raw business listing.
        Populates email, instagram, and has_website ('yes' or 'no').
        """
        name = business.get("business_name", "")
        website = business.get("website", "").strip()
        existing_email = business.get("email", "").strip()
        existing_insta = business.get("instagram", "").strip()

        # Flag has_website
        has_website = "yes" if bool(website and len(website) > 4) else "no"
        emails = [existing_email] if existing_email else []
        instagram = existing_insta

        # If website is present, crawl it for emails and socials
        if has_website == "yes":
            site_emails, socials = self.extract_from_website(website)
            emails.extend(site_emails)
            if not instagram and socials.get("instagram"):
                instagram = socials["instagram"]

        # If still no email, but we have Instagram, check bio text
        if not emails and instagram:
            bio_email = self.check_social_bio_for_email(instagram)
            if bio_email:
                emails.append(bio_email)

        # Clean final email list
        final_emails = self.clean_emails(emails)
        primary_email = final_emails[0] if final_emails else ""

        # Update business dictionary
        business["email"] = primary_email
        business["instagram"] = instagram
        business["has_website"] = has_website

        return business
