"""
Module C2: CSV Storage & Resumable Checkpoint Manager
Incrementally saves each discovered lead directly to CSV with immediate disk flush.
Maintains a SQLite checkpoint database to ensure crashes never lose progress
and allows the scraper to resume exactly where it stopped.
"""

import os
import csv
import sqlite3
import logging
from typing import Dict, Any, List, Set
from .config import DEFAULT_OUTPUT_CSV, DEFAULT_DB_PATH
from .deduper import LeadDeduper

logger = logging.getLogger("PuneScraper.Storage")

CSV_COLUMNS = [
    "business_name",
    "category",
    "address",
    "phone",
    "website",
    "email",
    "instagram",
    "has_website",
    "source"
]

class StorageManager:
    """Manages incremental CSV writing and resumable SQLite checkpoints."""

    def __init__(self, csv_path: str = DEFAULT_OUTPUT_CSV, db_path: str = DEFAULT_DB_PATH):
        self.csv_path = csv_path
        self.db_path = db_path
        self.total_leads = 0
        self.total_emails = 0
        self.no_website_leads = 0
        
        self._init_sqlite()
        self._init_csv()

    def _init_sqlite(self):
        """Initializes checkpoint SQLite database."""
        with sqlite3.connect(self.db_path) as conn:
            cur = conn.cursor()
            # Track completed category & locality queries
            cur.execute("""
                CREATE TABLE IF NOT EXISTS completed_tasks (
                    category TEXT,
                    locality TEXT,
                    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (category, locality)
                )
            """)
            # Track saved leads
            cur.execute("""
                CREATE TABLE IF NOT EXISTS saved_leads (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    business_name TEXT,
                    category TEXT,
                    address TEXT,
                    phone TEXT,
                    website TEXT,
                    email TEXT,
                    instagram TEXT,
                    has_website TEXT,
                    source TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()

    def _init_csv(self):
        """Creates CSV file with headers if it doesn't already exist."""
        if not os.path.exists(self.csv_path) or os.path.getsize(self.csv_path) == 0:
            with open(self.csv_path, mode="w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
                writer.writeheader()
        else:
            # Count existing leads
            try:
                with open(self.csv_path, mode="r", encoding="utf-8") as f:
                    reader = csv.DictReader(f)
                    for row in reader:
                        self.total_leads += 1
                        if row.get("email"):
                            self.total_emails += 1
                        if row.get("has_website", "").lower() == "no":
                            self.no_website_leads += 1
                logger.info(f"Loaded existing CSV: {self.total_leads} leads ({self.total_emails} with email)")
            except Exception as e:
                logger.warning(f"Error reading existing CSV: {e}")

    def load_existing_into_deduper(self, deduper: LeadDeduper):
        """Pre-populates deduper with leads already stored in CSV to prevent duplicates on resume."""
        if not os.path.exists(self.csv_path):
            return

        try:
            with open(self.csv_path, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                for row in reader:
                    deduper.is_duplicate(row)
            logger.info("Deduper synchronized with existing CSV leads.")
        except Exception as e:
            logger.warning(f"Failed to synchronize deduper with existing CSV: {e}")

    def is_task_completed(self, category: str, locality: str) -> bool:
        """Checks if a (category, locality) query was already completed in a prior run."""
        with sqlite3.connect(self.db_path) as conn:
            cur = conn.cursor()
            cur.execute("SELECT 1 FROM completed_tasks WHERE category = ? AND locality = ?", (category, locality))
            return cur.fetchone() is not None

    def mark_task_completed(self, category: str, locality: str):
        """Marks a (category, locality) pair as finished in SQLite."""
        with sqlite3.connect(self.db_path) as conn:
            cur = conn.cursor()
            cur.execute("""
                INSERT OR REPLACE INTO completed_tasks (category, locality)
                VALUES (?, ?)
            """, (category, locality))
            conn.commit()

    def save_lead(self, business: Dict[str, Any]):
        """
        Appends a lead immediately to the CSV file and updates SQLite checkpoint.
        Flushes directly to disk so crashes preserve 100% of scraped data.
        """
        row = {
            "business_name": (business.get("business_name") or "").strip(),
            "category": (business.get("category") or "").strip(),
            "address": (business.get("address") or "").strip(),
            "phone": (business.get("phone") or "").strip(),
            "website": (business.get("website") or "").strip(),
            "email": (business.get("email") or "").strip(),
            "instagram": (business.get("instagram") or "").strip(),
            "has_website": (business.get("has_website") or "no").strip().lower(),
            "source": (business.get("source") or "").strip()
        }

        # Append to CSV
        with open(self.csv_path, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
            writer.writerow(row)
            f.flush()
            try:
                os.fsync(f.fileno())
            except Exception:
                pass

        # Save to SQLite
        try:
            with sqlite3.connect(self.db_path) as conn:
                cur = conn.cursor()
                cur.execute("""
                    INSERT INTO saved_leads (business_name, category, address, phone, website, email, instagram, has_website, source)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    row["business_name"], row["category"], row["address"],
                    row["phone"], row["website"], row["email"],
                    row["instagram"], row["has_website"], row["source"]
                ))
                conn.commit()
        except Exception as e:
            logger.debug(f"SQLite save warning: {e}")

        # Update metrics
        self.total_leads += 1
        if row["email"]:
            self.total_emails += 1
        if row["has_website"] == "no":
            self.no_website_leads += 1

    def sort_csv_by_category(self):
        """
        Sorts pune_smb_leads.csv by category, placing leads with verified emails first.
        Ensures a clean, organized output CSV.
        """
        if not os.path.exists(self.csv_path):
            return

        try:
            with open(self.csv_path, mode="r", encoding="utf-8", errors="replace") as f:
                reader = list(csv.DictReader(f))

            if not reader:
                return

            # Custom sort: 1. Category, 2. Has Email (True first), 3. Business Name
            sorted_rows = sorted(
                reader,
                key=lambda r: (
                    (r.get("category") or "").strip().lower(),
                    0 if (r.get("email") or "").strip() else 1,
                    (r.get("business_name") or "").strip().lower()
                )
            )

            with open(self.csv_path, mode="w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
                writer.writeheader()
                writer.writerows(sorted_rows)

            logger.info("pune_smb_leads.csv sorted by category and email priority.")
        except Exception as e:
            logger.warning(f"Error sorting CSV: {e}")

