"""
Template rendering engine for cold email outreach.
Supports Variant A (no website) and Variant B (has website) with plain text and plain-styled HTML.
Rotates subject lines and resolves dynamic placeholders cleanly without marketing fluff.
"""

import os
import random
import json
from typing import Dict, Any, Tuple, List
from pathlib import Path

from outreach import config

class OutreachTemplateEngine:
    def __init__(self):
        self.category_plurals: Dict[str, str] = {}
        self.load_category_plurals()

        self.subjects_no_website: List[str] = self.load_lines(config.SUBJECTS_NO_WEBSITE)
        self.subjects_has_website: List[str] = self.load_lines(config.SUBJECTS_HAS_WEBSITE)

        self.tpl_no_web_txt = self.load_file(config.TEMPLATE_NO_WEBSITE_TXT)
        self.tpl_no_web_html = self.load_file(config.TEMPLATE_NO_WEBSITE_HTML)
        self.tpl_has_web_txt = self.load_file(config.TEMPLATE_HAS_WEBSITE_TXT)
        self.tpl_has_web_html = self.load_file(config.TEMPLATE_HAS_WEBSITE_HTML)

    def load_category_plurals(self):
        if os.path.exists(config.CATEGORY_PLURAL_JSON):
            try:
                with open(config.CATEGORY_PLURAL_JSON, 'r', encoding='utf-8') as f:
                    self.category_plurals = json.load(f)
            except Exception as e:
                print(f"Warning: Failed loading category_plural.json: {e}")
                self.category_plurals = {}

    def load_lines(self, path: str) -> List[str]:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return [line.strip() for line in f if line.strip()]
        return []

    def load_file(self, path: str) -> str:
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                return f.read()
        return ""

    def get_category_plural(self, category: str) -> str:
        cat_lower = (category or '').strip().lower()
        if cat_lower in self.category_plurals:
            return self.category_plurals[cat_lower]
        # Match partials
        for k, v in self.category_plurals.items():
            if k in cat_lower or cat_lower in k:
                return v
        return "businesses"

    def render(self, lead: Dict[str, Any], subject_override: str = None) -> Tuple[str, str, str, str, str]:
        """
        Render personalized email for a given lead.
        Returns:
            (subject, text_body, html_body, variant_name, subject_template_used)
        """
        has_web = lead.get('has_website_bool', False)
        variant = "variant_b_has_website" if has_web else "variant_a_no_website"

        b_name = lead.get('business_name', 'your business').strip()
        locality = lead.get('locality', 'Pune').strip() or 'Pune'
        cat_plural = self.get_category_plural(lead.get('category', 'business'))

        # Slots line
        if config.SLOTS_LINE_ENABLED:
            slots_line = f"I am making demos for a small number of {cat_plural} in {locality} this week."
        else:
            slots_line = ""

        # Placeholders dictionary
        placeholders = {
            "{{business_name}}": b_name,
            "{{owner_or_team}}": lead.get('owner_name') or "there",
            "{{category_plural}}": cat_plural,
            "{{locality}}": locality,
            "{{slots_line}}": slots_line,
            "{{sender_name}}": config.SENDER_NAME,
            "{{sender_phone}}": config.SENDER_PHONE,
            "{{sender_address}}": config.SENDER_ADDRESS,
            "{{demo_link}}": lead.get('demo_link', '')
        }

        # Select subject line
        subject_pool = self.subjects_has_website if has_web else self.subjects_no_website
        if not subject_pool:
            subject_pool = [f"Quick question about {b_name}"]

        subject_tpl = subject_override or random.choice(subject_pool)
        rendered_subject = subject_tpl
        for k, v in placeholders.items():
            rendered_subject = rendered_subject.replace(k, str(v))

        # Select template text & HTML
        raw_txt = self.tpl_has_web_txt if has_web else self.tpl_no_web_txt
        raw_html = self.tpl_has_web_html if has_web else self.tpl_no_web_html

        # Replace placeholders in text
        rendered_txt = raw_txt
        for k, v in placeholders.items():
            rendered_txt = rendered_txt.replace(k, str(v))

        # Replace placeholders in html
        rendered_html = raw_html
        for k, v in placeholders.items():
            rendered_html = rendered_html.replace(k, str(v))

        # Clean up empty slots line spacing if slots_line is empty
        if not slots_line:
            rendered_txt = rendered_txt.replace("decide anything. \n\nWould you", "decide anything.\n\nWould you")
            rendered_txt = rendered_txt.replace("decide anything.  Would you", "decide anything. Would you")
            rendered_html = rendered_html.replace("decide anything.  </p>", "decide anything.</p>")

        return rendered_subject, rendered_txt, rendered_html, variant, subject_tpl
