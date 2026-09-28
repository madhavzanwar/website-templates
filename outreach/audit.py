"""
Contact Audit Engine for Pune SMB Leads.
Analyzes pune_smb_leads.csv for email and Indian mobile phone readiness:
- Valid email count
- Valid Indian mobile count (10 digits starting 6-9, handling +91/0 prefixes)
- Both email and mobile
- Neither email nor mobile
- Full category-by-category breakdown
Saves output to audit_report.txt.
"""

import os
import re
import csv
from typing import Dict, Any, List, Tuple
from collections import defaultdict

from outreach import config

EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
)

def is_valid_email_audit(email: str) -> bool:
    if not email or not isinstance(email, str):
        return False
    em = email.strip()
    return len(em) >= 5 and bool(EMAIL_REGEX.match(em))

def extract_valid_indian_mobile(phone_raw: str) -> List[str]:
    """
    Extract all valid 10-digit Indian mobile numbers starting with 6, 7, 8, or 9.
    Handles prefixes +91, 91, 0, 910, spaces, dashes, and delimiters (; , /).
    """
    if not phone_raw or not isinstance(phone_raw, str):
        return []

    valid_mobiles = []
    candidates = re.split(r'[;/,\n|]', phone_raw)

    for cand in candidates:
        digits = re.sub(r'\D', '', cand)
        if not digits:
            continue

        mobile = None
        if len(digits) == 10 and digits[0] in '6789':
            mobile = digits
        elif len(digits) == 11 and digits.startswith('0') and digits[1] in '6789':
            mobile = digits[1:]
        elif len(digits) == 12 and digits.startswith('91') and digits[2] in '6789':
            mobile = digits[2:]
        elif len(digits) == 13 and digits.startswith('910') and digits[3] in '6789':
            mobile = digits[3:]

        if mobile and mobile not in valid_mobiles:
            valid_mobiles.append(mobile)

    return valid_mobiles

def has_valid_indian_mobile(phone_raw: str) -> bool:
    return len(extract_valid_indian_mobile(phone_raw)) > 0

class ContactAuditor:
    def __init__(self, leads_csv: str = config.LEADS_CSV, output_file: str = "audit_report.txt"):
        self.leads_csv = leads_csv
        self.output_file = output_file

    def run_audit(self) -> Dict[str, Any]:
        if not os.path.exists(self.leads_csv):
            raise FileNotFoundError(f"Leads CSV not found at {self.leads_csv}")

        total_leads = 0
        valid_email_count = 0
        valid_mobile_count = 0
        both_count = 0
        neither_count = 0

        category_data = defaultdict(lambda: {
            "total": 0,
            "email": 0,
            "mobile": 0,
            "both": 0,
            "neither": 0
        })

        with open(self.leads_csv, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                total_leads += 1
                cat = (row.get('category') or 'Uncategorized').strip()
                email = (row.get('email') or '').strip()
                phone = (row.get('phone') or '').strip()

                has_email = is_valid_email_audit(email)
                has_mobile = has_valid_indian_mobile(phone)

                category_data[cat]["total"] += 1

                if has_email:
                    valid_email_count += 1
                    category_data[cat]["email"] += 1

                if has_mobile:
                    valid_mobile_count += 1
                    category_data[cat]["mobile"] += 1

                if has_email and has_mobile:
                    both_count += 1
                    category_data[cat]["both"] += 1

                if not has_email and not has_mobile:
                    neither_count += 1
                    category_data[cat]["neither"] += 1

        results = {
            "total_leads": total_leads,
            "valid_email": valid_email_count,
            "valid_mobile": valid_mobile_count,
            "both": both_count,
            "neither": neither_count,
            "category_data": dict(category_data)
        }

        # Generate report text
        report_text = self.format_report(results)

        # Save to audit_report.txt
        with open(self.output_file, 'w', encoding='utf-8') as out_f:
            out_f.write(report_text)

        return results

    def format_report(self, results: Dict[str, Any]) -> str:
        tot = results["total_leads"]
        ve = results["valid_email"]
        vm = results["valid_mobile"]
        bo = results["both"]
        ne = results["neither"]

        lines = []
        lines.append("=" * 95)
        lines.append("            PUNE SMB LEADS — CONTACT CHANNEL READINESS AUDIT REPORT")
        lines.append("=" * 95)
        lines.append(f"Source Leads File          : {os.path.basename(self.leads_csv)} ({tot} total records)")
        lines.append(f"Leads with Valid Email     : {ve:<5} ({ve/tot*100:.1f}%) — Ready for Brevo cold email campaigns")
        lines.append(f"Leads with Indian Mobile   : {vm:<5} ({vm/tot*100:.1f}%) — Ready for WhatsApp campaigns (10-digit 6-9)")
        lines.append(f"Leads with BOTH Channels   : {bo:<5} ({bo/tot*100:.1f}%) — High-value multi-channel targets")
        lines.append(f"Leads with NEITHER Channel : {ne:<5} ({ne/tot*100:.1f}%) — Physical address only (requires enrichment)")
        lines.append("=" * 95)
        lines.append("")
        lines.append("CATEGORY BREAKDOWN:")
        lines.append("-" * 95)

        col_cat = 32
        col_tot = 8
        col_em = 14
        col_mob = 15
        col_both = 8
        col_none = 9

        sep = "+" + "-"*(col_cat+2) + "+" + "-"*(col_tot+2) + "+" + "-"*(col_em+2) + "+" + "-"*(col_mob+2) + "+" + "-"*(col_both+2) + "+" + "-"*(col_none+2) + "+"
        hdr = f"| {'Category':<{col_cat}} | {'Total':<{col_tot}} | {'Valid Email':<{col_em}} | {'Valid Mobile':<{col_mob}} | {'Both':<{col_both}} | {'Neither':<{col_none}} |"

        lines.append(sep)
        lines.append(hdr)
        lines.append(sep)

        for cat, d in sorted(results["category_data"].items(), key=lambda x: x[0]):
            c_name = cat[:col_cat]
            lines.append(f"| {c_name:<{col_cat}} | {d['total']:<{col_tot}} | {d['email']:<{col_em}} | {d['mobile']:<{col_mob}} | {d['both']:<{col_both}} | {d['neither']:<{col_none}} |")

        lines.append(sep)
        lines.append(f"| {'TOTAL':<{col_cat}} | {tot:<{col_tot}} | {ve:<{col_em}} | {vm:<{col_mob}} | {bo:<{col_both}} | {ne:<{col_none}} |")
        lines.append(sep)
        lines.append("")
        lines.append("OUTREACH PLANNING RECOMMENDATIONS:")
        lines.append(f"1. Email Campaign Audience: {ve} leads have verified email addresses.")
        lines.append(f"2. WhatsApp Campaign Audience: {vm} leads have verified 10-digit Indian mobile numbers.")
        lines.append(f"3. Dual Reach: {bo} leads can receive an introductory email followed by WhatsApp follow-up.")
        lines.append("=" * 95)

        return "\n".join(lines)
