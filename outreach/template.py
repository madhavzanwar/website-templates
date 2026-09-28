"""
Module B: Template Engine & Subject Variant Selector.
Handles placeholder interpolation for {{business_name}}, {{category}},
{{demo_link}}, and {{owner_name}} (falling back to business_name if owner_name is blank).
Randomly assigns subject line variants from subjects.txt to prevent spam filtering.
"""

import os
import random
import logging
from typing import Dict, Any, List, Tuple

from .config import (
    TEMPLATE_HTML_PATH,
    SUBJECTS_PATH,
    DEFAULT_DEMO_LINK,
    DEFAULT_CATEGORY
)

logger = logging.getLogger("BrevoOutreach.Template")

DEFAULT_SUBJECTS = [
    "Quick question regarding {{business_name}}",
    "Website demo concept for {{business_name}}",
    "Ideas to get more local clients for {{business_name}}",
    "Free preview mockup for {{business_name}} team"
]


class TemplateEngine:
    """Renders personalized emails from HTML template and subject variants."""

    def __init__(self, template_path: str = TEMPLATE_HTML_PATH, subjects_path: str = SUBJECTS_PATH):
        self.template_path = template_path
        self.subjects_path = subjects_path
        self.template_content = self._load_template()
        self.subject_variants = self._load_subjects()

    def _load_template(self) -> str:
        """Loads HTML email template content."""
        if not os.path.exists(self.template_path):
            logger.warning(f"Template file not found at {self.template_path}. Using fallback template.")
            return "<p>Hi {{owner_name}},</p><p>We created a website demo for {{business_name}} in {{category}}.</p><p><a href='{{demo_link}}'>View Demo</a></p>"
        
        with open(self.template_path, mode="r", encoding="utf-8") as f:
            return f.read()

    def _load_subjects(self) -> List[str]:
        """Loads subject line variants from subjects.txt."""
        if not os.path.exists(self.subjects_path):
            logger.warning(f"Subjects file not found at {self.subjects_path}. Using defaults.")
            return DEFAULT_SUBJECTS

        variants = []
        with open(self.subjects_path, mode="r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    variants.append(line)

        return variants if variants else DEFAULT_SUBJECTS

    def get_placeholders(self, lead: Dict[str, Any]) -> Dict[str, str]:
        """Extracts and standardizes placeholder substitutions for a lead."""
        business_name = (lead.get("business_name") or "your business").strip()
        
        # Owner name fallback to business name if blank
        owner_name = (lead.get("owner_name") or "").strip()
        if not owner_name:
            owner_name = business_name

        category = (lead.get("category") or DEFAULT_CATEGORY).strip()
        
        # Personalized demo link fallback
        demo_link = (lead.get("demo_link") or "").strip()
        if not demo_link:
            demo_link = DEFAULT_DEMO_LINK

        return {
            "{{business_name}}": business_name,
            "{{owner_name}}": owner_name,
            "{{category}}": category,
            "{{demo_link}}": demo_link
        }

    def render(self, lead: Dict[str, Any]) -> Tuple[str, str, str]:
        """
        Renders subject and HTML content with placeholders for a specific lead.
        Returns:
            (rendered_subject, rendered_html, raw_subject_template_used)
        """
        placeholders = self.get_placeholders(lead)

        # Pick random subject variant
        chosen_subject_tpl = random.choice(self.subject_variants)
        rendered_subject = chosen_subject_tpl
        for key, val in placeholders.items():
            rendered_subject = rendered_subject.replace(key, val)

        # Render HTML content
        rendered_html = self.template_content
        for key, val in placeholders.items():
            rendered_html = rendered_html.replace(key, val)

        return rendered_subject, rendered_html, chosen_subject_tpl
