#!/usr/bin/env python3
"""
CLI Lookup Tool for Pune SMB Leads.
Instant typo-tolerant fuzzy lookup for business demo links when a client replies on WhatsApp/Email.
Usage:
    python lookup.py "Gold's Gym"
    python lookup.py "dilip oak"
    python lookup.py (interactive mode)
"""

import sys
import os
import csv
import re
import difflib
from typing import List, Dict, Any, Tuple

# Ensure UTF-8 support on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def normalize_text(text: str) -> str:
    """Normalize text for insensitive token matching."""
    if not text:
        return ""
    return re.sub(r'[^a-z0-9\s]', '', text.lower()).strip()

class LeadLookup:
    def __init__(self, leads_csv: str = "pune_smb_leads.csv"):
        self.leads_csv = leads_csv
        self.leads: List[Dict[str, str]] = []
        self.load_leads()

    def load_leads(self):
        if not os.path.exists(self.leads_csv):
            print(f"Error: {self.leads_csv} not found.")
            return

        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                name = row.get('business_name', '').strip()
                if name:
                    self.leads.append(row)

    def search(self, query: str, limit: int = 5) -> List[Tuple[float, Dict[str, str]]]:
        """
        Fuzzy search for business_name or address with typo tolerance.
        Returns scored results (score, lead_dict).
        """
        q_norm = normalize_text(query)
        if not q_norm:
            return []

        q_tokens = q_norm.split()
        scored_results: List[Tuple[float, Dict[str, str]]] = []

        for lead in self.leads:
            name = lead.get('business_name', '')
            name_norm = normalize_text(name)
            addr = lead.get('address', '')
            addr_norm = normalize_text(addr)

            # 1. Exact match
            if q_norm == name_norm:
                scored_results.append((1.0, lead))
                continue

            # 2. Query is full substring of business name
            if q_norm in name_norm:
                score = 0.9 + (0.09 * (len(q_norm) / max(len(name_norm), 1)))
                scored_results.append((score, lead))
                continue

            # 3. All tokens present in name + address
            combined = f"{name_norm} {addr_norm}"
            tokens_in_name = sum(1 for t in q_tokens if t in name_norm)
            tokens_in_comb = sum(1 for t in q_tokens if t in combined)

            if tokens_in_comb == len(q_tokens):
                score = 0.8 + (0.1 * (tokens_in_name / len(q_tokens)))
                scored_results.append((score, lead))
                continue

            # 4. Fuzzy SequenceMatcher on business name
            ratio = difflib.SequenceMatcher(None, q_norm, name_norm).ratio()
            prefix_ratio = difflib.SequenceMatcher(None, q_norm, name_norm[:len(q_norm) + 4]).ratio()
            best_fuzzy = max(ratio, prefix_ratio * 0.95)

            if best_fuzzy >= 0.55:
                scored_results.append((best_fuzzy, lead))

        # Sort descending by score
        scored_results.sort(key=lambda x: x[0], reverse=True)
        return scored_results[:limit]

    def display_results(self, query: str, results: List[Tuple[float, Dict[str, str]]]):
        if not results:
            print(f"\n[!] No leads found matching '{query}'. Try a shorter or partial name.\n")
            return

        print(f"\n>>> FOUND {len(results)} MATCH(ES) FOR '{query}':")
        print("=" * 70)

        for rank, (score, lead) in enumerate(results, start=1):
            name = lead.get('business_name', 'N/A')
            cat = lead.get('category', 'N/A')
            addr = lead.get('address', 'N/A')
            phone = lead.get('phone', 'N/A')
            email = lead.get('email', 'N/A')
            demo_link = lead.get('demo_link', '').strip()
            if not demo_link:
                demo_link = "Pending generation (Run pipeline to generate link)"

            # Clean phone for WhatsApp quick link
            wa_digits = re.sub(r'\D', '', phone)
            if len(wa_digits) == 10:
                wa_digits = f"91{wa_digits}"
            elif len(wa_digits) == 11 and wa_digits.startswith('0'):
                wa_digits = f"91{wa_digits[1:]}"

            wa_link = f"https://wa.me/{wa_digits}" if wa_digits else "N/A"

            match_pct = int(score * 100)
            print(f"#{rank} [{match_pct}% Match] {name.upper()}")
            print(f"   Category : {cat}")
            print(f"   Demo Link: {demo_link}")
            print(f"   Address  : {addr}")
            print(f"   Phone    : {phone} (WhatsApp: {wa_link})")
            if email and email != 'N/A':
                print(f"   Email    : {email}")
            print("-" * 70)
        print()

def main():
    lookup = LeadLookup()

    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        results = lookup.search(query)
        lookup.display_results(query, results)
    else:
        print("\n=== PUNE SMB LEAD DEMO LINK LOOKUP ===")
        print("Type a business name (or partial name / typo). Press Ctrl+C or Enter empty to exit.\n")
        while True:
            try:
                query = input("Enter business name: ").strip()
                if not query:
                    break
                results = lookup.search(query)
                lookup.display_results(query, results)
            except (KeyboardInterrupt, EOFError):
                print("\nExiting lookup tool.")
                break

if __name__ == "__main__":
    main()
