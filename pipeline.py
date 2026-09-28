#!/usr/bin/env python3
"""
Pipeline for Pune SMB Leads -> Personalized Live Demo Websites.
Fulfills Phase 1, Phase 2, Phase 3, Phase 4, Phase 5, Phase 6 requirements.
"""

import os
import sys
import re
import csv
import json
import copy
import random
import argparse
from typing import Dict, Any, List, Optional

from slug_generator import SlugManager

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# Load .env file manually if it exists
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), '.env')
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    k = k.strip()
                    v = v.strip().strip('"\'')
                    if k not in os.environ:
                        os.environ[k] = v

load_env()
BASE_URL_DEFAULT = os.getenv("BASE_URL", os.getenv("DEMO_BASE_URL", "http://localhost:3000"))


def clean_phone_number(raw_phone: str) -> Optional[str]:
    """Extract clean digits and format as Indian phone / WhatsApp number."""
    if not raw_phone or not isinstance(raw_phone, str):
        return None
    digits = re.sub(r'\D', '', raw_phone)
    if not digits:
        return None
    if len(digits) == 10:
        return f"91{digits}"
    if len(digits) == 11 and digits.startswith('0'):
        return f"91{digits[1:]}"
    if len(digits) == 12 and digits.startswith('91'):
        return digits
    return digits

def format_display_phone(raw_phone: str) -> Optional[str]:
    """Format phone for clean readable display."""
    if not raw_phone or not isinstance(raw_phone, str):
        return None
    cleaned = raw_phone.strip()
    return cleaned if cleaned else None

def get_initials(name: str) -> str:
    """Generate 2-3 letter uppercase code from business name."""
    words = [w for w in re.sub(r'[^a-zA-Z\s]', '', name).split() if w]
    if len(words) >= 2:
        return f"{words[0][0]}{words[1][0]}-01".upper()
    elif len(words) == 1:
        return f"{words[0][:2]}-01".upper()
    return "VIP-01"

class DemoPipeline:
    def __init__(
        self,
        leads_csv: str = "pune_smb_leads.csv",
        category_map_path: str = "category_map.json",
        slugs_csv_path: str = "slugs.csv",
        generated_dir: str = "generated",
        merge_errors_csv: str = "merge_errors.csv",
        base_url: str = BASE_URL_DEFAULT,
    ):
        self.leads_csv = leads_csv
        self.category_map_path = category_map_path
        self.slugs_csv_path = slugs_csv_path
        self.generated_dir = generated_dir
        self.merge_errors_csv = merge_errors_csv
        self.base_url = base_url.rstrip('/')

        # 1. Load Category Mapping
        if not os.path.exists(self.category_map_path):
            raise FileNotFoundError(f"Missing {self.category_map_path}")
        with open(self.category_map_path, 'r', encoding='utf-8') as f:
            self.category_map: Dict[str, str] = json.load(f)

        # 2. Preload Fallback Contents
        self.fallback_contents: Dict[str, Dict[str, Any]] = {}
        for cat_name, template_dir in self.category_map.items():
            fallback_file = os.path.join(template_dir, 'fallback_content.json')
            if os.path.exists(fallback_file):
                with open(fallback_file, 'r', encoding='utf-8') as f:
                    self.fallback_contents[cat_name] = json.load(f)
            else:
                print(f"Warning: Fallback file not found for {cat_name}: {fallback_file}")

        # 3. Initialize Slug Manager
        self.slug_manager = SlugManager(self.slugs_csv_path)

        # Ensure output directories exist
        os.makedirs(self.generated_dir, exist_ok=True)

    def merge_lead_content(self, row: Dict[str, str], slug: str) -> Dict[str, Any]:
        """
        Merge scraped lead row into the category's fallback schema.
        Priority: Scraped real data > Fallback content.
        Zero required fields are left blank.
        """
        category = (row.get('category') or '').strip()
        if category not in self.fallback_contents:
            raise ValueError(f"Category '{category}' has no loaded fallback template.")

        fallback = self.fallback_contents[category]
        merged = copy.deepcopy(fallback)

        # Scraped Fields
        b_name = (row.get('business_name') or '').strip()
        addr = (row.get('address') or '').strip()
        phone = (row.get('phone') or '').strip()
        email = (row.get('email') or '').strip()
        website = (row.get('website') or '').strip()
        insta = (row.get('instagram') or '').strip()

        clean_wa = clean_phone_number(phone)
        display_phone = format_display_phone(phone)

        # Metadata
        template_folder = self.category_map.get(category, 'templates/gym')
        template_name = os.path.basename(template_folder)
        merged['slug'] = slug
        merged['category'] = category
        merged['template'] = template_name
        merged['demo_link'] = f"{self.base_url}/demo/{slug}"

        # 1. Update Branding
        if 'branding' in merged and isinstance(merged['branding'], dict):
            if b_name:
                merged['branding']['business_name'] = b_name
                if 'business_short_code' in merged['branding']:
                    merged['branding']['business_short_code'] = get_initials(b_name)
            if insta and not merged['branding'].get('instagram_handle'):
                merged['branding']['instagram_handle'] = insta

        # 2. Category-Specific Contact Mapping
        if template_name == 'gym':
            contact = merged.setdefault('contact', {})
            if display_phone:
                contact['phone'] = display_phone
            if clean_wa:
                contact['whatsapp_number'] = clean_wa
                contact['whatsapp_message'] = f"Hello, I want to book a free trial session at {b_name}."
            if addr:
                contact['address'] = addr
            if email:
                contact['email'] = email
            if website:
                contact['website'] = website
            if insta:
                contact['instagram_handle'] = insta
                contact['instagram_url'] = f"https://instagram.com/{insta.lstrip('@')}"

            # Adapt sticky dock headline
            if 'sticky_conversion_dock' in merged:
                merged['sticky_conversion_dock']['headline'] = f"{b_name.upper()} // FREE PASS"

        elif template_name == 'cafe':
            vb = merged.setdefault('visit_booking', {})
            if addr:
                vb['address'] = addr
            if display_phone:
                vb['phone'] = display_phone
            if clean_wa:
                vb['whatsapp_number'] = clean_wa
                vb['whatsapp_message_prefix'] = f"Hello! I would like to reserve a table at {b_name}."
            if email:
                vb['email'] = email
            if insta:
                vb['instagram_handle'] = insta
                vb['instagram_url'] = f"https://instagram.com/{insta.lstrip('@')}"

        elif template_name == 'salon':
            bc = merged.setdefault('booking_concierge', {})
            if addr:
                bc['address'] = addr
            if display_phone:
                bc['phone'] = display_phone
            if clean_wa:
                bc['whatsapp_number'] = clean_wa
                bc['whatsapp_message_prefix'] = f"Hello! I would like to book a salon appointment at {b_name}."
            if email:
                bc['email'] = email
            if insta:
                bc['instagram_handle'] = insta
                bc['instagram_url'] = f"https://instagram.com/{insta.lstrip('@')}"

            if 'navigation' in merged and isinstance(merged['navigation'], dict) and display_phone:
                merged['navigation']['phone_display'] = display_phone
                merged['navigation']['phone_tel'] = f"tel:{clean_wa or phone}"

        else:
            # Universal / Coaching / Other 11 categories
            contact = merged.setdefault('contact', {})
            if display_phone:
                contact['phone'] = display_phone
            if clean_wa:
                contact['whatsapp_number'] = clean_wa
                contact['whatsapp_message'] = f"Hello! I want to enquire about services at {b_name}."
            if addr:
                contact['address'] = addr
            if email:
                contact['email'] = email
            if website:
                contact['website'] = website
            if insta:
                contact['instagram_handle'] = insta

        return merged

    def run(self, sample_size: Optional[int] = None, random_seed: int = 42) -> List[Dict[str, Any]]:
        """
        Execute the pipeline:
        1. Read pune_smb_leads.csv.
        2. Filter / Sample rows if requested.
        3. Generate slugs with persistence.
        4. Merge fallback content + scraped data.
        5. Save generated/[slug]/content.json.
        6. Write merge_errors.csv for any failures.
        7. Update pune_smb_leads.csv with demo_link column.
        8. Return list of processed lead records.
        """
        # Read all rows from leads CSV
        all_rows: List[Dict[str, str]] = []
        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            fieldnames = list(reader.fieldnames or [])
            for idx, r in enumerate(reader, start=2):
                r['_row_index'] = idx
                all_rows.append(r)

        total_leads = len(all_rows)
        print(f"Total leads in {self.leads_csv}: {total_leads}")

        # Determine which rows to process
        if sample_size and sample_size < total_leads:
            print(f"Running pipeline on balanced SAMPLE of {sample_size} leads...")
            # Sample proportionately across categories if possible
            cat_groups = {}
            for r in all_rows:
                cat_groups.setdefault(r.get('category', 'unknown'), []).append(r)
            
            sampled_rows = []
            random.seed(random_seed)
            # Pick from each category proportionally
            for cat, group in cat_groups.items():
                quota = max(1, round(sample_size * len(group) / total_leads))
                sampled_rows.extend(random.sample(group, min(quota, len(group))))
            
            # Trim or fill to exact sample_size
            if len(sampled_rows) > sample_size:
                sampled_rows = sampled_rows[:sample_size]
            elif len(sampled_rows) < sample_size:
                remaining = [r for r in all_rows if r not in sampled_rows]
                sampled_rows.extend(random.sample(remaining, min(sample_size - len(sampled_rows), len(remaining))))
            
            rows_to_process = sampled_rows
        else:
            print(f"Running pipeline on FULL BATCH of {total_leads} leads...")
            rows_to_process = all_rows

        merge_errors: List[Dict[str, Any]] = []
        processed_results: List[Dict[str, Any]] = []
        slug_to_link: Dict[str, str] = {}

        for row in rows_to_process:
            row_idx = row.get('_row_index')
            b_name = (row.get('business_name') or '').strip()
            category = (row.get('category') or '').strip()
            addr = (row.get('address') or '').strip()

            if not b_name:
                merge_errors.append({
                    'row_index': row_idx,
                    'business_name': b_name,
                    'category': category,
                    'address': addr,
                    'error_reason': 'Missing business_name'
                })
                continue

            if category not in self.category_map:
                merge_errors.append({
                    'row_index': row_idx,
                    'business_name': b_name,
                    'category': category,
                    'address': addr,
                    'error_reason': f"Unmapped category: '{category}'"
                })
                continue

            try:
                # Phase 2: Slug generation with collision handling and persistence
                slug = self.slug_manager.get_or_create_slug(b_name, addr)
                demo_url = f"{self.base_url}/demo/{slug}"
                slug_to_link[slug] = demo_url

                # Phase 3: Content merge
                merged_content = self.merge_lead_content(row, slug)

                # Save /generated/[slug]/content.json
                lead_dir = os.path.join(self.generated_dir, slug)
                os.makedirs(lead_dir, exist_ok=True)
                lead_file = os.path.join(lead_dir, 'content.json')

                with open(lead_file, 'w', encoding='utf-8') as jf:
                    json.dump(merged_content, jf, indent=2, ensure_ascii=False)

                row['demo_link'] = demo_url
                processed_results.append({
                    'row_index': row_idx,
                    'business_name': b_name,
                    'category': category,
                    'address': addr,
                    'slug': slug,
                    'demo_link': demo_url,
                    'phone': row.get('phone', ''),
                    'email': row.get('email', '')
                })

            except Exception as e:
                merge_errors.append({
                    'row_index': row_idx,
                    'business_name': b_name,
                    'category': category,
                    'address': addr,
                    'error_reason': f"Merge Exception: {str(e)}"
                })

        # Save persistent slugs.csv
        self.slug_manager.save()
        print(f"Persistent slugs.csv saved ({len(self.slug_manager.used_slugs)} total slugs registered).")

        # Save merge_errors.csv
        with open(self.merge_errors_csv, 'w', newline='', encoding='utf-8') as ef:
            writer = csv.DictWriter(
                ef, 
                fieldnames=['row_index', 'business_name', 'category', 'address', 'error_reason']
            )
            writer.writeheader()
            writer.writerows(merge_errors)
        print(f"Merge errors written to {self.merge_errors_csv} (Total errors: {len(merge_errors)}).")

        # Phase 5: Update pune_smb_leads.csv with demo_link column
        self.update_csv_with_links(all_rows, fieldnames)

        return processed_results

    def update_csv_with_links(self, all_rows: List[Dict[str, str]], fieldnames: List[str]):
        """Write demo_link column back to pune_smb_leads.csv."""
        if 'demo_link' not in fieldnames:
            fieldnames.append('demo_link')

        for r in all_rows:
            b_name = (r.get('business_name') or '').strip()
            addr = (r.get('address') or '').strip()
            # If slug already in manager, assign demo_link
            norm_key = (b_name.lower(), addr.lower())
            if norm_key in self.slug_manager.existing_mapping:
                slug = self.slug_manager.existing_mapping[norm_key]
                r['demo_link'] = f"{self.base_url}/demo/{slug}"
            elif 'demo_link' not in r:
                r['demo_link'] = ""

            # Remove internal tracking field
            if '_row_index' in r:
                del r['_row_index']

        with open(self.leads_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(all_rows)

        print(f"Updated {self.leads_csv} with demo_link column.")

def main():
    parser = argparse.ArgumentParser(description="Generate live demo websites from SMB leads CSV.")
    parser.add_argument("--sample", type=int, default=None, help="Process only N sample leads (default: None for full run, 15 recommended for spot check)")
    parser.add_argument("--base-url", type=str, default=BASE_URL_DEFAULT, help="Base URL for demo links")
    args = parser.parse_args()

    pipeline = DemoPipeline(base_url=args.base_url)
    results = pipeline.run(sample_size=args.sample)

    print(f"\n==========================================")
    print(f"PIPELINE RUN COMPLETED: {len(results)} LEADS PROCESSED")
    print(f"==========================================\n")

    for idx, res in enumerate(results, start=1):
        print(f"{idx:02d}. [{res['category']}] {res['business_name']}")
        print(f"    Slug: {res['slug']}")
        print(f"    Demo Link: {res['demo_link']}")
        print(f"    Address: {res['address'][:60]}...")
        print()

if __name__ == "__main__":
    main()
