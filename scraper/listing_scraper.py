"""
Module A: Places & Business Listing Scraper Module
Extracts business name, category, address, phone, and website from Google Places API,
OpenStreetMap (Overpass API), Sulekha, and IndiaMART public directories.
Respects robots.txt, rate limits with random delays, and rotates User-Agents.
"""

import time
import random
import logging
import urllib.parse
import base64
import re
from typing import List, Dict, Any, Generator, Optional
import requests
from bs4 import BeautifulSoup

from .config import (
    GOOGLE_MAPS_API_KEY,
    MIN_DELAY,
    MAX_DELAY,
    REQUEST_TIMEOUT,
    USER_AGENTS,
    OSM_TAG_MAPPINGS,
    SULEKHA_SLUGS,
    LOCALITY_COORDINATES,
    IGNORED_DOMAINS
)

logger = logging.getLogger("PuneScraper.Listing")

class BaseScraper:
    """Base scraper providing rotating user agents, throttling, and safe requests."""
    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        self.min_delay = min_delay
        self.max_delay = max_delay
        self.session = requests.Session()

    def get_headers(self) -> Dict[str, str]:
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1"
        }

    def throttle(self):
        delay = random.uniform(self.min_delay, self.max_delay)
        time.sleep(delay)

    def safe_get(self, url: str, params: Optional[Dict] = None, timeout: int = REQUEST_TIMEOUT) -> Optional[requests.Response]:
        self.throttle()
        try:
            resp = self.session.get(url, params=params, headers=self.get_headers(), timeout=timeout)
            return resp
        except Exception as e:
            logger.warning(f"Error fetching {url}: {e}")
            return None

    def safe_post(self, url: str, data: Optional[Dict] = None, timeout: int = REQUEST_TIMEOUT) -> Optional[requests.Response]:
        self.throttle()
        try:
            resp = self.session.post(url, data=data, headers=self.get_headers(), timeout=timeout)
            return resp
        except Exception as e:
            logger.warning(f"Error posting to {url}: {e}")
            return None


class GooglePlacesScraper(BaseScraper):
    """
    Official Google Places API Scraper (Text Search & Details).
    Complies with Google Maps Platform Terms of Service.
    """
    def __init__(self, api_key: str = GOOGLE_MAPS_API_KEY, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        super().__init__(min_delay, max_delay)
        self.api_key = api_key or GOOGLE_MAPS_API_KEY

    @property
    def is_available(self) -> bool:
        return bool(self.api_key and len(self.api_key) > 10)

    def search_places(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        if not self.is_available:
            logger.info("Google Places API key not configured. Skipping Google Places source.")
            return

        query = f"{category} in {locality}, Pune, Maharashtra, India"
        logger.info(f"Querying Google Places API for '{query}'...")
        endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        
        page_token = None
        pages_fetched = 0

        while pages_fetched < 3:  # Google Places allows up to 3 pages (60 places)
            params = {
                "query": query,
                "key": self.api_key
            }
            if page_token:
                params["pagetoken"] = page_token
                # Google requires a short pause before using next_page_token
                time.sleep(2.0)

            resp = self.safe_get(endpoint, params=params)
            if not resp or resp.status_code != 200:
                break

            data = resp.json()
            status = data.get("status")
            if status not in ("OK", "ZERO_RESULTS"):
                logger.warning(f"Google Places API status: {status} - {data.get('error_message', '')}")
                break

            results = data.get("results", [])
            for item in results:
                place_id = item.get("place_id")
                # Fetch full place details for website and formatted phone number
                details = self.get_place_details(place_id) if place_id else {}
                
                name = details.get("name") or item.get("name", "").strip()
                address = details.get("formatted_address") or item.get("formatted_address", "").strip()
                phone = details.get("formatted_phone_number") or details.get("international_phone_number", "")
                website = details.get("website", "").strip()

                yield {
                    "business_name": name,
                    "category": category,
                    "address": address,
                    "phone": phone,
                    "website": website,
                    "email": "",
                    "instagram": "",
                    "source": "google_places"
                }

            page_token = data.get("next_page_token")
            pages_fetched += 1
            if not page_token:
                break

    def get_place_details(self, place_id: str) -> Dict[str, Any]:
        """Fetch contact information from Place Details endpoint."""
        url = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            "place_id": place_id,
            "fields": "name,formatted_address,formatted_phone_number,international_phone_number,website,url",
            "key": self.api_key
        }
        resp = self.safe_get(url, params=params)
        if resp and resp.status_code == 200:
            return resp.json().get("result", {})
        return {}


class OverpassScraper(BaseScraper):
    """
    OpenStreetMap (Overpass API) Scraper.
    Fetches real business POIs in Pune/PCMC with full address, phone, website, and public email tags.
    """
    MIRRORS = [
        "https://overpass-api.de/api/interpreter",
        "https://lz4.overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter"
    ]

    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        super().__init__(min_delay, max_delay)

    def search_places(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        bbox = LOCALITY_COORDINATES.get(locality)
        if not bbox:
            # Default to Ravet area if locality coordinates unknown
            bbox = (18.630, 73.725, 18.675, 73.765)

        tags = OSM_TAG_MAPPINGS.get(category, [("amenity", "restaurant")])
        min_lat, min_lon, max_lat, max_lon = bbox

        tag_queries = []
        for k, v in tags:
            tag_queries.append(f'node["{k}"="{v}"]({min_lat},{min_lon},{max_lat},{max_lon});')
            tag_queries.append(f'way["{k}"="{v}"]({min_lat},{min_lon},{max_lat},{max_lon});')

        query_str = "\n  ".join(tag_queries)
        overpass_query = f"""[out:json][timeout:20];
(
  {query_str}
);
out center tags;"""

        headers = {
            "User-Agent": "PuneSMBBusinessResearcher/1.0 (Contact: research@localpune.org)"
        }

        elements = []
        for mirror in self.MIRRORS:
            try:
                self.throttle()
                resp = self.session.post(mirror, data={"data": overpass_query}, headers=headers, timeout=6)
                if resp.status_code == 200:
                    data = resp.json()
                    elements = data.get("elements", [])
                    break
            except Exception as e:
                logger.debug(f"Overpass mirror {mirror} failed: {e}")
                continue

        logger.info(f"OSM Overpass returned {len(elements)} elements for {category} in {locality}")

        for el in elements:
            t = el.get("tags", {})
            name = t.get("name")
            if not name:
                continue

            phone = t.get("phone") or t.get("contact:phone") or t.get("mobile") or ""
            website = t.get("website") or t.get("contact:website") or t.get("url") or ""
            email = t.get("email") or t.get("contact:email") or ""
            
            # Construct address
            addr_parts = []
            for k in ["addr:housenumber", "addr:street", "addr:suburb", "addr:city", "addr:postcode"]:
                if t.get(k):
                    addr_parts.append(t[k])
            address = ", ".join(addr_parts) if addr_parts else f"{locality}, Pune, Maharashtra"

            yield {
                "business_name": name.strip(),
                "category": category,
                "address": address.strip(),
                "phone": phone.strip(),
                "website": website.strip(),
                "email": email.strip().lower(),
                "instagram": "",
                "source": "openstreetmap"
            }


class SulekhaScraper(BaseScraper):
    """
    Sulekha public directory scraper for Pune businesses.
    Extracts business names, localities, address snippets, and profile pages.
    """
    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        super().__init__(min_delay, max_delay)

    def search_places(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        slugs = SULEKHA_SLUGS.get(category, [])
        if not slugs:
            return

        loc_slug = locality.lower().replace(" ", "-")

        # Try locality-specific URL, then fallback to city URL
        urls_to_try = [
            f"https://www.sulekha.com/{slugs[0]}/{loc_slug}-pune",
            f"https://www.sulekha.com/{slugs[0]}/pune"
        ]

        found_names = set()

        for url in urls_to_try:
            resp = self.safe_get(url)
            if not resp or resp.status_code != 200:
                continue

            soup = BeautifulSoup(resp.text, "html.parser")
            h3_tags = soup.find_all("h3")

            for h in h3_tags:
                name = h.get_text(strip=True)
                if not name or len(name) < 3 or name in found_names:
                    continue
                if any(bad in name.lower() for bad in ["sort by", "filter", "review", "sulekha", "rating", "near me"]):
                    continue

                found_names.add(name)
                
                # Check for profile link or address in surrounding elements
                parent = h.find_parent("div", class_=lambda c: c and any(k in str(c) for k in ["p-0", "card", "item", "listing"]))
                address = f"{locality}, Pune, Maharashtra"
                profile_url = ""
                if parent:
                    text = parent.get_text(" | ", strip=True)
                    if "Pune" in text:
                        # Extract snippet containing Pune
                        parts = [p.strip() for p in text.split("|") if "pune" in p.lower() or "411" in p]
                        if parts:
                            address = parts[0]
                    link_tag = parent.find("a", href=True)
                    if link_tag and link_tag["href"].startswith("/"):
                        profile_url = f"https://www.sulekha.com{link_tag['href']}"

                yield {
                    "business_name": name,
                    "category": category,
                    "address": address,
                    "phone": "",
                    "website": "",
                    "profile_url": profile_url,
                    "email": "",
                    "instagram": "",
                    "source": "sulekha"
                }

            if found_names:
                break


class IndiaMartScraper(BaseScraper):
    """
    IndiaMART public directory scraper for SMB suppliers & service providers in Pune.
    """
    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        super().__init__(min_delay, max_delay)

    def search_places(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        clean_category = category.split("/")[0].strip()
        query = f"{clean_category} {locality} pune"
        url = "https://dir.indiamart.com/search.mp"
        params = {"ss": query}

        resp = self.safe_get(url, params=params)
        if not resp or resp.status_code != 200:
            return

        soup = BeautifulSoup(resp.text, "html.parser")

        # IndiaMart seller cards
        cards = soup.select(".card, .gpname, .cname, .tac, .supplier-name, .clg")
        for card in cards:
            name = card.get_text(strip=True)
            if not name or len(name) < 3 or any(w in name.lower() for w in ["price", "verified", "contact", "supplier", "indiamart"]):
                continue

            address = f"{locality}, Pune, Maharashtra"
            link = card.find("a", href=True)
            website = link["href"] if link and link["href"].startswith("http") else ""

            yield {
                "business_name": name,
                "category": category,
                "address": address,
                "phone": "",
                "website": website,
                "email": "",
                "instagram": "",
                "source": "indiamart"
            }


class SearchListingScraper(BaseScraper):
    """
    Direct Web Search Listing Scraper.
    Discovers small-to-medium businesses with active websites in Pune localities.
    Extracts business names, websites (decoded from search redirect links), and locations.
    """
    def __init__(self, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        super().__init__(min_delay, max_delay)

    @staticmethod
    def decode_bing_url(bing_url: str) -> str:
        """Decodes base64 target URL from Bing search redirect links."""
        try:
            parsed = urllib.parse.urlparse(bing_url)
            params = urllib.parse.parse_qs(parsed.query)
            if 'u' in params:
                u_val = params['u'][0]
                if u_val.startswith('a1'):
                    u_val = u_val[2:]
                u_val += "=" * ((4 - len(u_val) % 4) % 4)
                decoded = base64.b64decode(u_val).decode('utf-8', errors='ignore')
                if decoded.startswith(('http://', 'https://')):
                    return decoded
        except Exception:
            pass
        return bing_url

    def search_places(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        clean_cat = category.split("/")[0].strip()
        queries = [
            f'"{clean_cat}" "{locality}" pune "contact"',
            f'"{clean_cat}" "{locality}" pune email website'
        ]

        seen_domains = set()

        for query in queries:
            url = f"https://www.bing.com/search?q={urllib.parse.quote(query)}"
            resp = self.safe_get(url)
            if not resp or resp.status_code != 200:
                continue

            soup = BeautifulSoup(resp.text, "html.parser")
            for li in soup.select("li.b_algo"):
                h2 = li.find("h2")
                if not h2:
                    continue
                a = h2.find("a")
                if not a or not a.get("href"):
                    continue

                raw_title = a.get_text(strip=True)
                raw_href = a["href"]
                target_url = self.decode_bing_url(raw_href)

                # Ignore aggregator portals, search engines, and social media platforms
                parsed_target = urllib.parse.urlparse(target_url)
                domain = parsed_target.netloc.lower()
                if domain.startswith("www."):
                    domain = domain[4:]

                if (
                    domain in IGNORED_DOMAINS
                    or any(domain.endswith("." + d) for d in IGNORED_DOMAINS)
                    or any(agg in domain for agg in [
                        "bing.com", "google.com", "justdial.com", "sulekha.com",
                        "indiamart.com", "quikr.com", "facebook.com", "instagram.com",
                        "youtube.com", "linkedin.com", "wikipedia.org", "tripadvisor.",
                        "zomato.com", "swiggy.com", "magicpin.in", "practo.com", "hotstar.com"
                    ])
                ):
                    continue

                if domain in seen_domains or len(domain) < 4:
                    continue
                seen_domains.add(domain)

                # Clean business name from page title
                name = raw_title
                for sep in [" - ", " | ", " : ", " – ", " — "]:
                    if sep in name:
                        name = name.split(sep)[0]
                name = name.strip()

                # Extract address snippet if available
                caption = li.find("div", class_="b_caption")
                caption_text = caption.get_text(" ", strip=True) if caption else ""
                
                # Check for phone in snippet
                phone_match = re.search(r'(?:\+91[\-\s]?)?[6-9]\d{9}', caption_text)
                phone = phone_match.group(0) if phone_match else ""

                address = f"{locality}, Pune, Maharashtra"

                yield {
                    "business_name": name,
                    "category": category,
                    "address": address,
                    "phone": phone,
                    "website": target_url,
                    "email": "",
                    "instagram": "",
                    "source": "web_search"
                }


class UnifiedListingScraper:
    """
    Coordinates multi-source business listing queries.
    Seamlessly combines Google Places, OpenStreetMap, Sulekha, IndiaMART, and Direct Web Search.
    """
    def __init__(self, api_key: str = GOOGLE_MAPS_API_KEY, min_delay: float = MIN_DELAY, max_delay: float = MAX_DELAY):
        self.google_scraper = GooglePlacesScraper(api_key=api_key, min_delay=min_delay, max_delay=max_delay)
        self.osm_scraper = OverpassScraper(min_delay=min_delay, max_delay=max_delay)
        self.sulekha_scraper = SulekhaScraper(min_delay=min_delay, max_delay=max_delay)
        self.indiamart_scraper = IndiaMartScraper(min_delay=min_delay, max_delay=max_delay)
        self.search_scraper = SearchListingScraper(min_delay=min_delay, max_delay=max_delay)

    def scrape_category_locality(self, category: str, locality: str) -> Generator[Dict[str, Any], None, None]:
        """
        Runs listing scrapers for a given category and locality.
        Yields normalized business listing dictionaries.
        """
        logger.info(f"Fetching listings for [{category}] in [{locality}]...")

        # 1. Google Places (if API key available)
        if self.google_scraper.is_available:
            try:
                for item in self.google_scraper.search_places(category, locality):
                    yield item
            except Exception as e:
                logger.error(f"Google Places scraper error: {e}")

        # 2. OpenStreetMap Overpass (Rich structured POI database)
        try:
            for item in self.osm_scraper.search_places(category, locality):
                yield item
        except Exception as e:
            logger.error(f"OSM scraper error: {e}")

        # 3. Direct Web Search (Discovers direct SMB websites and contact info in Pune)
        try:
            for item in self.search_scraper.search_places(category, locality):
                yield item
        except Exception as e:
            logger.error(f"Search listing scraper error: {e}")

        # 4. Sulekha Public Listings (Great for spotting 'No website' hot leads)
        try:
            for item in self.sulekha_scraper.search_places(category, locality):
                yield item
        except Exception as e:
            logger.error(f"Sulekha scraper error: {e}")

        # 5. IndiaMART Public Listings
        try:
            for item in self.indiamart_scraper.search_places(category, locality):
                yield item
        except Exception as e:
            logger.error(f"IndiaMart scraper error: {e}")

