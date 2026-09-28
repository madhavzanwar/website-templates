"""
Pune SMB Web Scraper & Contact Intelligence Engine - Main Runner
Collects contact information for local businesses across Pune & PCMC.
Executes primary listing scrape, deduplication, secondary pass website/social
email extraction, and incremental CSV writing with SQLite checkpointing.
"""

import sys
import time
import argparse
import logging
import urllib3

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Suppress insecure SSL warnings for local business websites with broken SSL certificates
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

from scraper.config import (
    CATEGORIES,
    LOCALITIES,
    DEFAULT_OUTPUT_CSV,
    DEFAULT_DB_PATH,
    GOOGLE_MAPS_API_KEY,
    MIN_DELAY,
    MAX_DELAY
)
from scraper.listing_scraper import UnifiedListingScraper
from scraper.extractor import ContactExtractor
from scraper.deduper import LeadDeduper
from scraper.storage import StorageManager

# Configure clean logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger("PuneScraper.Main")

def print_banner():
    banner = """
========================================================================
       PUNE SMB WEB SCRAPER & CONTACT INTELLIGENCE ENGINE
========================================================================
Target Categories : 14 Local SMB Categories
Localities        : Ravet & 30+ Pune/PCMC Localities
Data Sources      : Google Places API + OSM Overpass + Sulekha + IndiaMART
Rate Limiting     : 2.0 - 4.0s Randomized Delays + Rotating User-Agents
Deduplication     : Phone Normalization + Fuzzy Business Name Matching
Output Format     : Resumable Incremental CSV with Instant Disk Flush
========================================================================
"""
    print(banner)

def run_scraper(
    target_categories=None,
    target_localities=None,
    api_key: str = GOOGLE_MAPS_API_KEY,
    output_csv: str = DEFAULT_OUTPUT_CSV,
    db_path: str = DEFAULT_DB_PATH,
    min_delay: float = MIN_DELAY,
    max_delay: float = MAX_DELAY,
    target_emails: int = 2000,
    reset_checkpoints: bool = False
):
    print_banner()

    categories_to_run = target_categories or CATEGORIES
    localities_to_run = target_localities or LOCALITIES

    # Initialize modules
    storage = StorageManager(csv_path=output_csv, db_path=db_path)
    deduper = LeadDeduper()
    
    # Pre-populate deduper with any existing CSV leads
    storage.load_existing_into_deduper(deduper)

    listing_scraper = UnifiedListingScraper(api_key=api_key, min_delay=min_delay, max_delay=max_delay)
    extractor = ContactExtractor(min_delay=min_delay, max_delay=max_delay)

    logger.info(f"Target goal: {target_emails} verified business email IDs.")
    logger.info(f"Starting state: {storage.total_leads} leads already collected ({storage.total_emails} with email).")
    logger.info(f"Writing leads incrementally to: {output_csv}")

    start_time = time.time()
    total_scanned = 0
    duplicates_skipped = 0

    try:
        for cat_idx, category in enumerate(categories_to_run, 1):
            logger.info(f"\n=======================================================")
            logger.info(f" [CATEGORY {cat_idx}/{len(categories_to_run)}]: {category.upper()}")
            logger.info(f"=======================================================")

            for loc_idx, locality in enumerate(localities_to_run, 1):
                # Check email target
                if storage.total_emails >= target_emails:
                    logger.info(f"\nTARGET REACHED! Collected {storage.total_emails} verified email IDs!")
                    return

                # Check if task already completed in prior run
                if not reset_checkpoints and storage.is_task_completed(category, locality):
                    logger.info(f"Skipping already completed task: [{category}] in [{locality}]")
                    continue

                logger.info(f"\n--> Scanning [{category}] in [{locality}] ({loc_idx}/{len(localities_to_run)})...")
                batch_leads = 0

                for raw_lead in listing_scraper.scrape_category_locality(category, locality):
                    total_scanned += 1
                    raw_name = raw_lead.get("business_name", "Unknown")

                    # Check deduplication
                    if deduper.is_duplicate(raw_lead):
                        duplicates_skipped += 1
                        continue

                    # Secondary pass: crawl website & social bio for verified emails
                    processed_lead = extractor.process_lead(raw_lead)

                    # Save immediately to CSV
                    storage.save_lead(processed_lead)
                    batch_leads += 1

                    # Log progress
                    email_str = processed_lead.get("email") or "None"
                    has_web = processed_lead.get("has_website", "no")
                    source = processed_lead.get("source", "")
                    
                    status_tag = "[EMAIL FOUND]" if processed_lead.get("email") else "[LEAD]"
                    if has_web == "no":
                        status_tag += " [HOT PROSPECT: NO WEBSITE]"

                    safe_name = raw_name.encode('ascii', errors='replace').decode('ascii')
                    safe_source = source.encode('ascii', errors='replace').decode('ascii')
                    print(f"{status_tag} {safe_name[:35]:<35} | Phone: {processed_lead.get('phone', 'N/A')[:14]:<14} | Email: {email_str} | Source: {safe_source}")
                    print(f"   Stats: {storage.total_leads} Total Leads | {storage.total_emails} Emails Found | {storage.no_website_leads} No-Website Leads\n")

                    if storage.total_emails >= target_emails:
                        logger.info(f"Target of {target_emails} emails reached!")
                        storage.mark_task_completed(category, locality)
                        return

                # Mark query as finished in SQLite
                storage.mark_task_completed(category, locality)
                logger.info(f"Completed [{category}] in [{locality}]: {batch_leads} unique leads added.")

            # Sort CSV by category after each category completes
            storage.sort_csv_by_category()

    except KeyboardInterrupt:
        logger.warning("\nExecution paused by user (Ctrl+C). All progress has been safely saved!")

    finally:
        storage.sort_csv_by_category()
        elapsed = time.time() - start_time
        print("\n" + "="*70)
        print("                 SCRAPING SESSION SUMMARY")
        print("="*70)
        print(f"Total Time Elapsed     : {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
        print(f"Total Raw Items Scanned: {total_scanned}")
        print(f"Duplicates Pruned      : {duplicates_skipped}")
        print(f"Total Clean Leads Saved: {storage.total_leads}")
        print(f"Verified Emails Found  : {storage.total_emails}")
        print(f"Hot 'No Website' Leads : {storage.no_website_leads}")
        print(f"Output CSV Location    : {output_csv}")
        print("="*70 + "\n")


def main():
    parser = argparse.ArgumentParser(description="Pune SMB Web Scraper & Contact Intelligence Engine")
    parser.add_argument("--test", action="store_true", help="Run test mode: [gyms] in Ravet only")
    parser.add_argument("--all", action="store_true", help="Scrape all 14 categories across all Pune localities")
    parser.add_argument("--category", type=str, help="Specific category to scrape (e.g. 'gyms')")
    parser.add_argument("--locality", type=str, help="Specific locality to scrape (e.g. 'Ravet')")
    parser.add_argument("--target-emails", type=int, default=2000, help="Stop after reaching this many emails (default: 2000)")
    parser.add_argument("--api-key", type=str, default="", help="Google Places API key")
    parser.add_argument("--output", type=str, default=DEFAULT_OUTPUT_CSV, help="Output CSV path")
    parser.add_argument("--delay-min", type=float, default=MIN_DELAY, help="Minimum delay between requests in seconds")
    parser.add_argument("--delay-max", type=float, default=MAX_DELAY, help="Maximum delay between requests in seconds")
    parser.add_argument("--reset-checkpoints", action="store_true", help="Ignore existing SQLite checkpoint and rescan")

    args = parser.parse_args()

    # Determine categories & localities
    if args.test:
        target_cats = ["gyms"]
        target_locs = ["Ravet"]
    elif args.category and args.locality:
        target_cats = [args.category]
        target_locs = [args.locality]
    elif args.category:
        target_cats = [args.category]
        target_locs = LOCALITIES
    elif args.locality:
        target_cats = CATEGORIES
        target_locs = [args.locality]
    elif args.all:
        target_cats = CATEGORIES
        target_locs = LOCALITIES
    else:
        # Default behavior: Start with gyms in Ravet, then rollout category by category!
        target_cats = CATEGORIES
        target_locs = LOCALITIES

    run_scraper(
        target_categories=target_cats,
        target_localities=target_locs,
        api_key=args.api_key,
        output_csv=args.output,
        min_delay=args.delay_min,
        max_delay=args.delay_max,
        target_emails=args.target_emails,
        reset_checkpoints=args.reset_checkpoints
    )

if __name__ == "__main__":
    main()
