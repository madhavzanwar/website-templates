"""
Configuration settings, category mappings, Pune localities,
User-Agents pool, and regex definitions for the Pune SMB Scraper.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env if present
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Output files
DEFAULT_OUTPUT_CSV = str(BASE_DIR / "pune_smb_leads.csv")
DEFAULT_DB_PATH = str(BASE_DIR / "scraper_checkpoint.db")

# Google Places API Keys
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY") or os.getenv("GOOGLE_PLACES_API_KEY", "")

# Rate limiting defaults (seconds)
MIN_DELAY = float(os.getenv("SCRAPER_MIN_DELAY", "2.0"))
MAX_DELAY = float(os.getenv("SCRAPER_MAX_DELAY", "4.0"))

# Request timeouts (seconds)
REQUEST_TIMEOUT = 12

# 14 Target Categories requested by user
CATEGORIES = [
    "gyms",
    "salons",
    "coaching classes/tuition centers",
    "cafes",
    "restaurants",
    "wedding photographers",
    "dentists",
    "beauty studios",
    "real estate agents",
    "boutiques",
    "event planners",
    "yoga studios",
    "physiotherapy clinics",
    "interior designers"
]

# Query keywords per category for search and directory scraping
CATEGORY_KEYWORDS = {
    "gyms": ["gym", "fitness centre", "crossfit gym", "workout club"],
    "salons": ["hair salon", "unisex salon", "beauty salon", "hair stylist"],
    "coaching classes/tuition centers": ["coaching classes", "tuition centre", "classes", "math science coaching", "iit jee classes"],
    "cafes": ["cafe", "coffee shop", "bistro", "art cafe"],
    "restaurants": ["restaurant", "family restaurant", "pure veg restaurant", "dhaba", "fine dining"],
    "wedding photographers": ["wedding photographer", "wedding photography studio", "pre wedding shoot", "candid photographer"],
    "dentists": ["dentist", "dental clinic", "dental hospital", "orthodontist"],
    "beauty studios": ["beauty studio", "makeup artist", "bridal studio", "skin clinic aesthetic"],
    "real estate agents": ["real estate agent", "property consultant", "realtor", "property broker"],
    "boutiques": ["fashion boutique", "designer boutique", "women boutique", "clothing studio"],
    "event planners": ["event planner", "event management company", "wedding planner", "birthday organizer"],
    "yoga studios": ["yoga studio", "yoga center", "yoga classes", "aerial yoga"],
    "physiotherapy clinics": ["physiotherapy clinic", "physiotherapist", "rehab physiotherapy"],
    "interior designers": ["interior designer", "interior design studio", "home interior decorator"]
}

# OpenStreetMap tag mappings per category
OSM_TAG_MAPPINGS = {
    "gyms": [("leisure", "fitness_centre"), ("leisure", "sports_centre")],
    "salons": [("shop", "hairdresser")],
    "coaching classes/tuition centers": [("amenity", "school"), ("office", "educational_institution")],
    "cafes": [("amenity", "cafe")],
    "restaurants": [("amenity", "restaurant")],
    "wedding photographers": [("shop", "photo"), ("craft", "photographer")],
    "dentists": [("amenity", "dentist"), ("healthcare", "dentist")],
    "beauty studios": [("shop", "beauty")],
    "real estate agents": [("office", "estate_agent")],
    "boutiques": [("shop", "boutique"), ("shop", "clothes")],
    "event planners": [("office", "event_management"), ("office", "company")],
    "yoga studios": [("leisure", "fitness_centre"), ("sport", "yoga")],
    "physiotherapy clinics": [("healthcare", "physiotherapist"), ("amenity", "clinic")],
    "interior designers": [("office", "interior_decorator"), ("shop", "interior_decoration")]
}

# Sulekha slug mappings per category
SULEKHA_SLUGS = {
    "gyms": ["gyms"],
    "salons": ["salons", "beauty-parlours"],
    "coaching classes/tuition centers": ["tuition-classes", "coaching-tuitions"],
    "cafes": ["cafes", "restaurants"],
    "restaurants": ["restaurants"],
    "wedding photographers": ["wedding-photographers"],
    "dentists": ["dentists"],
    "beauty studios": ["beauty-parlours", "beauty-spas"],
    "real estate agents": ["real-estate-agents"],
    "boutiques": ["boutiques"],
    "event planners": ["event-organisers"],
    "yoga studios": ["yoga-classes"],
    "physiotherapy clinics": ["physiotherapists"],
    "interior designers": ["interior-designers-decorators"]
}

# Target Localities in Pune & PCMC (Ravet is #1 for testing!)
LOCALITIES = [
    "Ravet",            # TEST START POINT!
    "Wakad",
    "Hinjawadi",
    "Baner",
    "Pimple Saudagar",
    "Pimple Nilakh",
    "Pimple Gurav",
    "Pimpri",
    "Chinchwad",
    "Akurdi",
    "Nigdi",
    "Moshi",
    "Bhosari",
    "Kothrud",
    "Aundh",
    "Viman Nagar",
    "Kalyani Nagar",
    "Koregaon Park",
    "Shivaji Nagar",
    "Hadapsar",
    "Kharadi",
    "Magarpatta",
    "Bavdhan",
    "Camp",
    "Swargate",
    "Katraj",
    "Kondhwa",
    "Bibvewadi",
    "Wagholi",
    "Dhanori",
    "Yerwada",
    "FC Road",
    "Deccan Gymkhana",
    "Wanowrie",
    "Undri",
    "Sinhagad Road",
    "Warje"
]

# Coordinate boxes for OSM Overpass per locality (approx bounding boxes)
LOCALITY_COORDINATES = {
    "Ravet": (18.630, 73.725, 18.675, 73.765),
    "Wakad": (18.580, 73.750, 18.620, 73.785),
    "Hinjawadi": (18.570, 73.690, 18.610, 73.750),
    "Baner": (18.540, 73.765, 18.580, 73.805),
    "Pimple Saudagar": (18.585, 73.785, 18.615, 73.815),
    "Pimpri": (18.610, 73.790, 18.640, 73.830),
    "Chinchwad": (18.625, 73.765, 18.655, 73.805),
    "Kothrud": (18.490, 73.800, 18.520, 73.835),
    "Aundh": (18.545, 73.795, 18.575, 73.825),
    "Viman Nagar": (18.555, 73.905, 18.585, 73.935),
    "Shivaji Nagar": (18.520, 73.840, 18.545, 73.865),
    "Hadapsar": (18.490, 73.910, 18.525, 73.950),
    "Kharadi": (18.540, 73.930, 18.565, 73.970),
    "Koregaon Park": (18.530, 73.880, 18.550, 73.910),
    "Kalyani Nagar": (18.540, 73.895, 18.560, 73.915),
    "Bavdhan": (18.505, 73.760, 18.535, 73.790),
    "Katraj": (18.440, 73.845, 18.470, 73.875),
    "Kondhwa": (18.460, 73.880, 18.495, 73.910),
    "Wagholi": (18.570, 73.965, 18.605, 74.010),
    "Dhanori": (18.580, 73.880, 18.610, 73.910),
    "Nigdi": (18.645, 73.760, 18.675, 73.790),
    "Akurdi": (18.635, 73.765, 18.660, 73.795),
}

# User-Agent pool for rotation
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.4; rv:125.0) Gecko/20100101 Firefox/125.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Mobile/15E148 Safari/604.1"
]

# Strict clean regex for email addresses
EMAIL_REGEX = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

# Filter out false positives (images, fonts, dummy domains, analytics)
IGNORED_EMAIL_EXTENSIONS = (
    ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp",
    ".css", ".js", ".woff", ".woff2", ".ttf", ".eot",
    ".mp4", ".mp3", ".avi", ".pdf"
)

IGNORED_DOMAINS = {
    "example.com", "domain.com", "yourdomain.com", "yoursite.com",
    "email.com", "test.com", "sample.com", "site.com", "company.com",
    "sentry.io", "wixpress.com", "schema.org", "w3.org", "googleapis.com",
    "facebook.com", "instagram.com", "twitter.com", "linkedin.com", "x.com",
    "youtube.com", "google.com", "apple.com", "cloudflare.com",
    "gravatar.com", "wordpress.org", "github.com", "pinterest.com",
    "hotstar.com", "disneyplus.com", "netflix.com", "amazon.com", "amazon.in",
    "primevideo.com", "microsoft.com", "yahoo.com", "quora.com", "reddit.com",
    "medium.com", "wikipedia.org", "timesofindia.indiatimes.com",
    "hindustantimes.com", "ndtv.com", "indiatoday.in", "tripadvisor.com",
    "zara.com", "ajio.com", "myntra.com", "nykaa.com", "meesho.com",
    "flipkart.com", "snapdeal.com", "tatacliq.com", "urbanic.com", "hm.com",
    "geeksforgeeks.org", "dictionary.cambridge.org", "merriam-webster.com",
    "zhihu.com", "toprankers.com", "successcds.net", "topgames.com", "wiktionary.org"
}

IGNORED_USERNAMES = {
    "user", "username", "name", "yourname", "test", "demo",
    "admin_placeholder", "johndoe", "noreply", "no-reply"
}
