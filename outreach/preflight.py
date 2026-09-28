"""
Preflight Deliverability & Credential Verification Suite.
Checks environment variables, Brevo API connectivity & sending quota,
SPF/DMARC DNS records, verified sender status, and IMAP inbox connectivity.
"""

import os
import re
import sys
import subprocess
import requests
import imaplib
from typing import Dict, Any, List, Tuple, Optional

from outreach import config

# Optional dnspython support with nslookup fallback
try:
    import dns.resolver
    HAS_DNSPYTHON = True
except ImportError:
    HAS_DNSPYTHON = False

# ANSI Color formatting
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
RESET = "\033[0m"

class PreflightChecker:
    def __init__(self):
        self.results: List[Dict[str, str]] = []
        self.has_failure = False

    def add_result(self, check: str, status: str, details: str, action: str = ""):
        self.results.append({
            "check": check,
            "status": status,
            "details": details,
            "action": action
        })
        if status == "FAIL":
            self.has_failure = True

    def check_environment_variables(self):
        """Verify all required environment variables are set and not placeholder defaults."""
        env_path = config.BASE_DIR / ".env"
        if not env_path.exists():
            self.add_result(
                "Environment File",
                "FAIL",
                ".env file does not exist in workspace root",
                "Copy .env.example to .env and fill in real credentials"
            )
            return

        checks = [
            ("BREVO_API_KEY", config.BREVO_API_KEY, ["xkeysib-your_brevo", "your_api_key"]),
            ("SENDER_EMAIL", config.SENDER_EMAIL, ["poonam@yourdomain.com", "example.com"]),
            ("SENDER_NAME", config.SENDER_NAME, []),
            ("REPLY_TO_EMAIL", config.REPLY_TO_EMAIL, ["poonam@yourdomain.com", "example.com"]),
            ("SENDER_ADDRESS", config.SENDER_ADDRESS, []),
            ("SENDER_PHONE", config.SENDER_PHONE, [])
        ]

        if not config.SKIP_IMAP:
            checks.extend([
                ("IMAP_HOST", config.IMAP_HOST, []),
                ("IMAP_USER", config.IMAP_USER, ["poonam@yourdomain.com", "example.com"]),
                ("IMAP_APP_PASSWORD", config.IMAP_APP_PASSWORD, ["your_app_password_here"])
            ])

        missing = []
        placeholders = []

        for var_name, val, forbidden_phrases in checks:
            if not val:
                missing.append(var_name)
            elif any(p in val.lower() for p in forbidden_phrases):
                placeholders.append(var_name)

        if missing:
            self.add_result(
                "Environment Variables",
                "FAIL",
                f"Missing variables in .env: {', '.join(missing)}",
                "Set all required variables in .env"
            )
        elif placeholders:
            self.add_result(
                "Environment Variables",
                "FAIL",
                f"Default placeholder values detected: {', '.join(placeholders)}",
                "Replace placeholder values with real production credentials in .env"
            )
        else:
            masked_key = config.mask_secret(config.BREVO_API_KEY)
            self.add_result(
                "Environment Variables",
                "PASS",
                f"All required secrets loaded (.env present, Brevo key {masked_key})",
                ""
            )

    def check_brevo_account_and_quota(self) -> Optional[Dict[str, Any]]:
        """Verify Brevo API key, fetch account info, credits, and daily quota."""
        if not config.BREVO_API_KEY or "your_brevo" in config.BREVO_API_KEY:
            self.add_result(
                "Brevo API Connectivity",
                "FAIL",
                "BREVO_API_KEY is not configured or is a placeholder",
                "Add your real Brevo API key (xkeysib-...) to .env"
            )
            return None

        url = "https://api.brevo.com/v3/account"
        headers = {
            "api-key": config.BREVO_API_KEY,
            "Accept": "application/json"
        }

        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                data = resp.json()
                acct_email = data.get("email", "unknown")
                plans = data.get("plan", [])
                
                plan_types = [p.get("type", "") for p in plans]
                total_credits = sum(p.get("credits", 0) for p in plans)

                today_ramp = config.WARMUP_SCHEDULE[0] if config.WARMUP_SCHEDULE else 100
                plan_desc = ", ".join(plan_types) if plan_types else "Free"

                # Check credits and quota
                if total_credits == 0 and "free" in plan_types:
                    self.add_result(
                        "Brevo API Connectivity",
                        "WARN",
                        f"Connected: {acct_email} (Plan: {plan_desc}, Credits: {total_credits})",
                        f"Free plan has 300/day limit. Plan credits show 0. Verify sending quota in Brevo dashboard."
                    )
                elif total_credits > 0 and total_credits < today_ramp:
                    self.add_result(
                        "Brevo API Connectivity",
                        "WARN",
                        f"Connected: {acct_email} (Plan: {plan_desc}, Remaining Credits: {total_credits})",
                        f"Credits ({total_credits}) lower than Day 1 ramp target ({today_ramp}). Upgrade plan or purchase credits."
                    )
                else:
                    self.add_result(
                        "Brevo API Connectivity",
                        "PASS",
                        f"Account: {acct_email} | Plan: {plan_desc} | Credits: {total_credits}",
                        ""
                    )
                return data
            elif resp.status_code == 401:
                self.add_result(
                    "Brevo API Connectivity",
                    "FAIL",
                    "Brevo API 401 Unauthorized (Invalid API key)",
                    "Generate a new transactional API key in Brevo -> SMTP & API -> API Keys"
                )
            else:
                self.add_result(
                    "Brevo API Connectivity",
                    "FAIL",
                    f"Brevo API HTTP {resp.status_code}: {resp.text[:120]}",
                    "Verify Brevo account status and API permissions"
                )
        except requests.exceptions.RequestException as e:
            self.add_result(
                "Brevo API Connectivity",
                "FAIL",
                f"Network error connecting to Brevo API: {str(e)}",
                "Check internet connection and firewall settings"
            )
        return None

    def query_dns_txt(self, domain_name: str) -> List[str]:
        """Query TXT records for a domain using dnspython or nslookup fallback."""
        records = []
        if HAS_DNSPYTHON:
            try:
                answers = dns.resolver.resolve(domain_name, 'TXT')
                for rdata in answers:
                    records.append(rdata.to_text().strip('"'))
                return records
            except Exception:
                pass

        # Fallback to nslookup
        try:
            cmd = ["nslookup", "-type=TXT", domain_name]
            out = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
            for line in out.stdout.splitlines():
                if "text =" in line:
                    parts = line.split("text =")
                    if len(parts) > 1:
                        txt_val = parts[1].strip().strip('"')
                        records.append(txt_val)
        except Exception:
            pass

        return records

    def check_domain_dns_and_auth(self):
        """Check SPF and DMARC DNS records for SENDER_EMAIL domain."""
        sender_email = config.SENDER_EMAIL
        if not sender_email or "@" not in sender_email or "yourdomain.com" in sender_email:
            self.add_result(
                "Domain DNS Authentication",
                "FAIL",
                f"Invalid or placeholder sender email: '{sender_email}'",
                "Configure a real sender email from your owned domain in SENDER_EMAIL"
            )
            return

        domain = sender_email.split("@")[1].strip().lower()

        # Webmail domains (e.g. gmail.com) cannot have custom SPF/DMARC records configured by users
        if domain in ["gmail.com", "googlemail.com", "yahoo.com", "outlook.com", "hotmail.com"]:
            self.add_result(
                "SPF DNS Record",
                "INFO",
                f"Webmail domain '{domain}' cannot host custom SPF records; Brevo verified sender relays are used.",
                ""
            )
            self.add_result(
                "DMARC DNS Record",
                "INFO",
                f"Webmail domain '{domain}' uses provider-level DMARC.",
                ""
            )
            return

        # 1. SPF Check
        txt_records = self.query_dns_txt(domain)
        spf_records = [r for r in txt_records if r.lower().startswith("v=spf1")]

        if not spf_records:
            self.add_result(
                "SPF DNS Record",
                "FAIL",
                f"No SPF (v=spf1) TXT record found for domain '{domain}'",
                f"Add TXT record at '{domain}': 'v=spf1 include:spf.brevo.com ~all'"
            )
        else:
            spf = spf_records[0]
            if "brevo.com" in spf.lower() or "sendinblue.com" in spf.lower():
                self.add_result(
                    "SPF DNS Record",
                    "PASS",
                    f"Valid SPF record includes Brevo: '{spf[:60]}...'",
                    ""
                )
            else:
                self.add_result(
                    "SPF DNS Record",
                    "WARN",
                    f"SPF record found but missing Brevo: '{spf[:60]}...'",
                    "Add 'include:spf.brevo.com' into your existing SPF record"
                )

        # 2. DMARC Check
        dmarc_domain = f"_dmarc.{domain}"
        dmarc_txt = self.query_dns_txt(dmarc_domain)
        dmarc_records = [r for r in dmarc_txt if "v=dmarc1" in r.lower()]

        if not dmarc_records:
            self.add_result(
                "DMARC DNS Record",
                "WARN",
                f"No DMARC TXT record found at '{dmarc_domain}'",
                f"Add TXT record at '{dmarc_domain}': 'v=DMARC1; p=none; sp=none;'"
            )
        else:
            self.add_result(
                "DMARC DNS Record",
                "PASS",
                f"Valid DMARC record found: '{dmarc_records[0][:60]}'",
                ""
            )

    def check_verified_sender(self):
        """Check if SENDER_EMAIL is in Brevo's verified senders list."""
        if not config.BREVO_API_KEY or "your_brevo" in config.BREVO_API_KEY:
            return

        url = "https://api.brevo.com/v3/senders"
        headers = {
            "api-key": config.BREVO_API_KEY,
            "Accept": "application/json"
        }

        try:
            resp = requests.get(url, headers=headers, timeout=10)
            if resp.status_code == 200:
                senders = resp.json().get("senders", [])
                target = config.SENDER_EMAIL.lower().strip()
                matched = next((s for s in senders if s.get("email", "").lower().strip() == target), None)

                if matched:
                    if matched.get("active", False):
                        self.add_result(
                            "Verified Brevo Sender",
                            "PASS",
                            f"'{target}' is verified and active (Sender ID: {matched.get('id')})",
                            ""
                        )
                    else:
                        self.add_result(
                            "Verified Brevo Sender",
                            "FAIL",
                            f"'{target}' exists in Brevo senders but is not active/verified",
                            "Open the confirmation email from Brevo and click the verification link"
                        )
                else:
                    self.add_result(
                        "Verified Brevo Sender",
                        "FAIL",
                        f"'{target}' is not registered in Brevo senders list",
                        "Add and verify sender email in Brevo Dashboard -> Senders & IP -> Senders"
                    )
            else:
                self.add_result(
                    "Verified Brevo Sender",
                    "WARN",
                    f"Could not query Brevo senders (HTTP {resp.status_code})",
                    "Verify Brevo API permissions for senders endpoint"
                )
        except Exception as e:
            self.add_result(
                "Verified Brevo Sender",
                "WARN",
                f"Error querying Brevo senders: {str(e)}",
                ""
            )

    def check_imap_inbox(self):
        """Test IMAP authentication and INBOX read access."""
        if config.SKIP_IMAP:
            self.add_result(
                "IMAP Inbox Connectivity",
                "SKIP",
                "IMAP monitoring disabled via SKIP_IMAP=true (manual reply handling mode)",
                ""
            )
            return

        host = config.IMAP_HOST
        user = config.IMAP_USER
        pwd = config.IMAP_APP_PASSWORD

        if not host or not user or not pwd or "your_app" in pwd or "yourdomain" in user:
            self.add_result(
                "IMAP Inbox Connectivity",
                "FAIL",
                "IMAP credentials missing or default placeholder in .env",
                "Configure IMAP_HOST, IMAP_USER, and IMAP_APP_PASSWORD in .env"
            )
            return

        try:
            mail = imaplib.IMAP4_SSL(host, timeout=10)
            mail.login(user, pwd)
            status, data = mail.select("INBOX", readonly=True)
            if status == "OK":
                msg_count = data[0].decode() if data and data[0] else "0"
                self.add_result(
                    "IMAP Inbox Connectivity",
                    "PASS",
                    f"Connected to {host} as {user} (INBOX has {msg_count} total messages)",
                    ""
                )
            else:
                self.add_result(
                    "IMAP Inbox Connectivity",
                    "FAIL",
                    f"Connected to {host} but could not select INBOX: {status}",
                    "Ensure email account has IMAP access enabled"
                )
            mail.logout()
        except imaplib.IMAP4.error as ie:
            self.add_result(
                "IMAP Inbox Connectivity",
                "FAIL",
                f"IMAP authentication failed: {str(ie)}",
                "Use an App Password (not your primary password) for Gmail/Google Workspace"
            )
        except Exception as e:
            self.add_result(
                "IMAP Inbox Connectivity",
                "FAIL",
                f"IMAP connection failed: {str(e)}",
                "Check IMAP_HOST, port (993 SSL), and network connectivity"
            )

    def run_all(self) -> Tuple[bool, List[Dict[str, str]]]:
        """Execute all preflight checks and return (all_passed_or_warned, results)."""
        self.results = []
        self.has_failure = False

        self.check_environment_variables()
        self.check_brevo_account_and_quota()
        self.check_domain_dns_and_auth()
        self.check_verified_sender()

        return not self.has_failure, self.results

    def print_table(self):
        """Render a clean, color-coded terminal table."""
        col_check = 26
        col_status = 8
        col_details = 50
        col_action = 45

        sep = "+" + "-" * (col_check + 2) + "+" + "-" * (col_status + 2) + "+" + "-" * (col_details + 2) + "+" + "-" * (col_action + 2) + "+"
        header = f"| {'Check':<{col_check}} | {'Status':<{col_status}} | {'Details':<{col_details}} | {'Action Needed':<{col_action}} |"

        print("\n" + "=" * 135)
        print("                         BREVO COLD EMAIL OUTREACH - PREFLIGHT VERIFICATION")
        print("=" * 135)
        print(sep)
        print(header)
        print(sep)

        for r in self.results:
            c = r["check"][:col_check]
            st = r["status"]
            det = r["details"][:col_details]
            act = r["action"][:col_action]

            if st == "PASS":
                colored_st = f"{GREEN}{st:<{col_status}}{RESET}"
            elif st == "WARN":
                colored_st = f"{YELLOW}{st:<{col_status}}{RESET}"
            else:
                colored_st = f"{RED}{st:<{col_status}}{RESET}"

            print(f"| {c:<{col_check}} | {colored_st} | {det:<{col_details}} | {act:<{col_action}} |")

        print(sep)
        if self.has_failure:
            print(f"\n{RED}{BOLD}PREFLIGHT CHECK FAILED{RESET}: One or more required checks failed. Live sending is blocked until resolved.\n")
        else:
            print(f"\n{GREEN}{BOLD}PREFLIGHT CHECK PASSED{RESET}: All systems ready for outreach!\n")
