#!/usr/bin/env python3
"""
Unit tests for Reply Intent Classifier & Quoted Text Stripper.
Covers 35+ realistic edge cases:
- Bilingual English, Hindi, Marathi responses
- Mixed sentiment and refusal overrides
- Questions and pricing inquiries routing
- Quoted text stripping (email replies)
- Out of office and neutral statements
"""

import unittest
from outreach.reply_handler import classify_intent, strip_quoted_text

class TestReplyIntentClassifier(unittest.TestCase):

    def test_quoted_text_stripping(self):
        # Line starting with >
        text = "Yes please send\n> Were you satisfied with our service?"
        self.assertEqual(strip_quoted_text(text), "Yes please send")

        # Reply header "On ... wrote:"
        text = "Show me\n\nOn Mon, Sep 28, 2026 at 10:00 AM Poonam wrote:\n> Stop replying"
        self.assertEqual(strip_quoted_text(text), "Show me")

        # Original message divider
        text = "Haan dikhao\n\n-----Original Message-----\nFrom: poonam@domain.com\nSent: Monday"
        self.assertEqual(strip_quoted_text(text), "Haan dikhao")

    def test_yes_intent_english(self):
        cases = [
            "Yes please, send the demo",
            "Sure, show me",
            "Ok, send",
            "Interested",
            "Yeah why not, send it over",
            "Please share the link",
            "Send link",
            "Share demo link please",
            "Sure thing, send it"
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "YES")

    def test_yes_intent_hindi_marathi(self):
        cases = [
            "Haan dikhao",
            "Ha pathva",
            "Chalel, link pathva",
            "Ho, pathva link",
            "Dikhao bhai",
            "Haan ji, bhejo"
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "YES")

    def test_no_problem_evaluates_to_yes(self):
        # Requirement: "No problem, send details" must evaluate to YES
        cases = [
            "No problem, send details",
            "No problem",
            "No worries, please share",
            "Not an issue, show me the demo"
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "YES")

    def test_refusal_intent_stop(self):
        cases = [
            "Not interested",
            "Unsubscribe",
            "Stop emailing me",
            "Please remove me from your list",
            "Don't email again",
            "Nahi chahiye",
            "Mat bhejo",
            "Nako",
            "No",
            "No thanks",
            "Not needed",
            "Do not contact us"
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "STOP")

    def test_refusal_overrides_positive_and_questions(self):
        # Explicit refusal phrases must ALWAYS evaluate to STOP
        cases = [
            "Not interested, what is your price anyway?",
            "Please stop. How did you get my email?",
            "Stop emailing! I might be interested later but not now.",
            "Nahi chahiye, why do you keep messaging?",
            "No thanks, don't send anything."
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "STOP")

    def test_pricing_and_question_inquiries(self):
        # Must evaluate to PRICING_INQUIRY without auto-reply
        cases = [
            "How much does it cost?",
            "What is the price?",
            "Charges kitne hai?",
            "Kimat kay aahe?",
            "Can you call me on 9822012345?",
            "What is the timeline for delivery?",
            "Is this really free?",
            "When will it be ready?",
            "Kitne charges astat?",
            "Call me tomorrow on my phone number",
            "What are your rates?"
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "PRICING_INQUIRY")

    def test_quoted_text_in_replies(self):
        # Quoted text containing negative words should not trigger STOP if new text is positive
        c1 = "Yes send it\n\n> Are you looking for a website? Not interested in old emails"
        self.assertEqual(classify_intent(c1), "YES")

        # Quoted text containing positive words should not trigger YES if new text is STOP
        c2 = "Stop\n\n> Yes please send demo link"
        self.assertEqual(classify_intent(c2), "STOP")

    def test_other_unclassified(self):
        cases = [
            "I am out of office until Monday",
            "Received, thank you",
            "Let me check with my business partner first",
            "Forwarded to my manager",
            ""
        ]
        for c in cases:
            with self.subTest(case=c):
                self.assertEqual(classify_intent(c), "OTHER")

if __name__ == "__main__":
    unittest.main()
