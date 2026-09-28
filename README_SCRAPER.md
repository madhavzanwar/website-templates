# Pune SMB Contact Intelligence & Lead Scraper

A production-grade Python web scraper built to collect verified contact information for local small-to-medium businesses (SMBs) in Pune and Pimpri-Chinchwad (PCMC) across 14 target categories.

---

## 🚀 Key Features

1. **Multi-Source Engine**:
   - **Google Places API**: Official Google Maps Platform integration (Text Search, Nearby Search, and Place Details) when an API key is provided.
   - **OpenStreetMap (Overpass API)**: High-yield POI queries covering 37+ Pune & PCMC localities with automatic multi-mirror failover.
   - **Direct Web Search Engine**: Searches Bing for localized SMB websites, cleanly decoding base64 redirect links to discover direct business URLs.
   - **Sulekha & IndiaMART Public Listings**: Directory integration for broad category coverage and uncovering offline SMBs.

2. **Contact Extraction (Secondary Pass)**:
   - For every discovered business with a website, crawls the homepage and automatically discovers internal **"Contact Us"**, **"About Us"**, and **"Reach Us"** subpages.
   - Extracts emails using strict RFC-compliant regex.
   - Filters out false positives (image files like `.png`/`.jpg`, fonts, CSS, JS, tracking hashes, and placeholder domains like `example.com` or `domain.com`).
   - Extracts Instagram (`instagram.com/<handle>`) and Facebook page links.
   - Checks public Instagram/Facebook bio texts for listed emails.
   - **Strict Policy**: Never guesses or brute-forces emails (e.g. `info@domain.com`) — only records confirmed, publicly displayed emails.

3. **High-Value Lead Flagging (`has_website`)**:
   - Automatically marks leads with `has_website: no`. These represent local SMBs operating without a modern digital footprint — ideal high-conversion prospects for website design, SEO, and Google Business Profile services.

4. **Deduplication Engine**:
   - Primary: Normalizes phone numbers into canonical 10-digit Indian numbers (`+91`, leading `0`, dashes, and spaces stripped).
   - Secondary: Fuzzy business name matching using `difflib.SequenceMatcher` (threshold $\ge 0.85$) within the same category and locality.
   - Domain: Root domain deduplication across directories.

5. **Crash-Resilient & Resumable**:
   - Every single discovered lead is appended immediately to `pune_smb_leads.csv` with instant disk flush (`os.fsync`).
   - Maintains a SQLite checkpoint database (`scraper_checkpoint.db`) tracking completed `(category, locality)` batches and seen uniqueness keys.
   - If stopped or interrupted (`Ctrl+C`), restarting continues seamlessly from the exact checkpoint without re-scanning or duplicating leads.

6. **Rate Limiting & Anti-Ban Protection**:
   - Random delays between requests (configurable, default 2.0 to 4.0 seconds).
   - Rotating desktop and mobile User-Agent pool (Chrome, Firefox, Safari, Edge across Windows, macOS, Linux, iOS).

---

## 📂 Project Structure

```
sell-wesbsite/
│
├── scraper/
│   ├── __init__.py
│   ├── config.py              # Categories, 37 localities, User-Agents, regexes, settings
│   ├── listing_scraper.py     # Module A: Google Places, OSM, Sulekha, IndiaMART, Web Search
│   ├── extractor.py           # Module B: Secondary pass website/social email extraction
│   ├── deduper.py             # Module C1: Phone normalization and fuzzy name matching
│   └── storage.py             # Module C2: Incremental CSV writer & SQLite checkpoint manager
│
├── main.py                    # Master CLI orchestrator
├── pune_smb_leads.csv         # Output leads CSV (appended in real time)
├── scraper_checkpoint.db      # SQLite state & checkpoint database
├── .env.example               # Environment variables template
└── requirements.txt           # Python dependencies
```

---

## 📋 14 Target Categories

1. `gyms`
2. `salons`
3. `coaching classes/tuition centers`
4. `cafes`
5. `restaurants`
6. `wedding photographers`
7. `dentists`
8. `beauty studios`
9. `real estate agents`
10. `boutiques`
11. `event planners`
12. `yoga studios`
13. `physiotherapy clinics`
14. `interior designers`

---

## 🛠️ Installation & Setup

1. **Activate Python Environment**:
   ```bash
   pip install -r requirements.txt
   ```

2. **(Optional) Configure Google Places API Key**:
   Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
   Add your Google Places API key:
   ```env
   GOOGLE_MAPS_API_KEY=AIzaSy...
   SCRAPER_MIN_DELAY=2.0
   SCRAPER_MAX_DELAY=4.0
   ```
   *(Note: The scraper functions out of the box using OSM, Web Search, Sulekha, and IndiaMART even without a Google API key).*

---

## 💻 Usage Commands

### 1. Test Mode: Start with Gyms in Ravet
Runs the test category (`gyms`) in the test locality (`Ravet`):
```bash
python main.py --test
```

### 2. Full Rollout: Scrape Everything Across Pune
Runs category-by-category rollout across all 14 categories and 37 Pune localities until reaching the target of 2,000 verified email IDs:
```bash
python main.py --all --target-emails 2000
```

### 3. Target a Specific Category or Locality
```bash
# Scrape dentists across all Pune localities
python main.py --category dentists

# Scrape salons in Baner specifically
python main.py --category salons --locality Baner

# Scrape all 14 categories in Kothrud
python main.py --locality Kothrud
```

### 4. Custom Delays & Target
```bash
python main.py --all --target-emails 2000 --delay-min 2.0 --delay-max 3.5
```

---

## 📊 Output Schema (`pune_smb_leads.csv`)

| Column Name | Description | Example |
| :--- | :--- | :--- |
| `business_name` | Name of the business | `Gold's Gym India` |
| `category` | Target category | `gyms` |
| `address` | Full address or locality in Pune | `Ravet, Pune, Maharashtra` |
| `phone` | Phone or mobile number | `+91 9881972424` |
| `website` | Direct website URL | `https://goldsgym.in/` |
| `email` | Confirmed email from website or bio | `customer.care@goldsgym.in` |
| `instagram` | Instagram profile URL | `https://www.instagram.com/goldsgymindia/` |
| `has_website` | Flag for hot prospects (`yes` or `no`) | `yes` |
| `source` | Discovery source | `web_search` / `google_places` / `openstreetmap` |
