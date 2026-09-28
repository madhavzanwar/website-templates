#!/usr/bin/env python3
"""
Pune SMB Brevo Cold Email Outreach Engine - CLI Orchestrator.
Sends personalized cold outreach emails via Brevo Transactional Email API (POST /v3/smtp/email)
with warm-up pacing, bounce/complaint auto-pausing, reply handling, and full audit logging.
Safe for new sending domains.
"""

import os
import sys
import time
import random
import argparse
import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

from outreach import config
from outreach.filter import LeadFilter
from outreach.templates import OutreachTemplateEngine
from outreach.brevo import BrevoClient, HealthMonitor
from outreach.state_manager import OutreachStateManager
from outreach.logger import SendLogger
from outreach.reply_handler import ReplyHandler

def print_banner():
    banner = f"""
================================================================================
       PUNE SMB BREVO COLD EMAIL OUTREACH ENGINE
================================================================================
Sender Identity  : {config.SENDER_NAME} <{config.SENDER_EMAIL or '[NOT CONFIGURED IN .env]'}>
Reply-To Inbox   : {config.REPLY_TO_EMAIL or '[NOT CONFIGURED IN .env]'}
API Integration  : Brevo Transactional API (POST /v3/smtp/email)
Warm-Up Schedule : Day 1: 100 | Day 2: 200 | Day 3: 350 | Day 4: 600 | Day 5: 900+
Send Window      : Mon - Sat, 09:00 - 19:00 IST (Asia/Kolkata)
Pacing           : 3 - 10s random delays | Batches of 25-50 | 2-5m pause between batches
Health Monitor   : Auto-pause if hard bounce > 3% or spam > 0.1% | Cap halved if > 2%
Reply Handling   : IMAP polling every 10 min | Auto-demo reply for YES | Auto-suppress STOP
================================================================================
"""
    print(banner)

def run_dry_run(filter_engine: LeadFilter, template_engine: OutreachTemplateEngine, sample_count: int = 10):
    """
    Renders sample emails for inspection into /preview as HTML and summarizes
    which leads were kept vs skipped and why.
    """
    print_banner()
    print(">>> EXECUTING DRY-RUN MODE (Zero emails will be sent)\n")

    valid_queue, skipped_records, stats = filter_engine.process_leads()

    print("================================================================================")
    print("                      LEAD FILTERING & AUDIT SUMMARY")
    print("================================================================================")
    print(f"Total rows scanned in CSV        : {stats['total_rows']}")
    print(f"Valid leads in mixed queue       : {stats['valid_candidates']}")
    print("--------------------------------------------------------------------------------")
    print("Skipped Breakdown:")
    print(f"  - Missing email address        : {stats['missing_email']}")
    print(f"  - Excluded keywords (school/etc): {stats['excluded_keyword']}")
    print(f"  - Invalid email regex format   : {stats['invalid_email_format']}")
    print(f"  - System email (noreply/etc)   : {stats['system_email']}")
    print(f"  - Already in sent_log.csv      : {stats['already_sent']}")
    print(f"  - In suppression_list.csv      : {stats['in_suppression_list']}")
    print(f"  - Duplicates in current file   : {stats['duplicate_in_file']}")
    print(f"  - Missing demo link            : {stats['missing_demo_link']}")
    print(f"\nDetailed skipped records written to: {config.SKIPPED_LEADS_CSV}")
    print("================================================================================\n")

    if not valid_queue:
        print("[!] No valid leads available in queue to preview.")
        return

    # Ensure both Variant A and Variant B are represented in the preview
    no_web_leads = [l for l in valid_queue if not l.get('has_website_bool')]
    has_web_leads = [l for l in valid_queue if l.get('has_website_bool')]

    sample_leads = []
    # Pick balanced samples
    half = sample_count // 2
    sample_leads.extend(no_web_leads[:half])
    sample_leads.extend(has_web_leads[:sample_count - len(sample_leads)])
    if len(sample_leads) < sample_count:
        remaining = [l for l in valid_queue if l not in sample_leads]
        sample_leads.extend(remaining[:sample_count - len(sample_leads)])

    os.makedirs(config.PREVIEW_DIR, exist_ok=True)
    index_html_cards = []

    print(f"Rendering {len(sample_leads)} personalized email previews to: /{os.path.basename(config.PREVIEW_DIR)}/\n")

    for idx, lead in enumerate(sample_leads, start=1):
        subj, txt, html_body, variant, sub_tpl = template_engine.render(lead)

        preview_filename = f"preview_{idx:02d}_{variant}.html"
        preview_filepath = os.path.join(config.PREVIEW_DIR, preview_filename)

        # Header metadata banner inside preview HTML
        variant_badge_color = "#2563eb" if "variant_a" in variant else "#059669"
        variant_label = "Variant A: No Website (Find on Google angle)" if "variant_a" in variant else "Variant B: Has Website (Mobile conversion angle)"

        inspection_banner = f"""
        <!-- DRY RUN INSPECTION BAR -->
        <div style="background:#1e293b; color:#f8fafc; padding:16px 20px; font-family:-apple-system, BlinkMacSystemFont, sans-serif; font-size:13px; line-height:1.6; border-radius:8px; margin-bottom:24px; border:1px solid #334155;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="background:{variant_badge_color}; color:#fff; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:11px; text-transform:uppercase;">{variant_label}</span>
            <span style="color:#94a3b8; font-size:12px;">Preview #{idx:02d} of {len(sample_leads)}</span>
          </div>
          <div><strong>Recipient:</strong> {lead.get('business_name')} &lt;{lead.get('email')}&gt;</div>
          <div><strong>Category & Locality:</strong> {lead.get('category')} · {lead.get('locality')}</div>
          <div><strong>Subject Line:</strong> <span style="color:#38bdf8;">{subj}</span></div>
          <div><strong>Personal Demo Link:</strong> <a href="{lead.get('demo_link')}" target="_blank" style="color:#a7f3d0; text-decoration:underline;">{lead.get('demo_link')}</a></div>
        </div>
        """

        full_html = html_body.replace("<body style=\"", f"<body>\n<div style=\"max-width:680px; margin:24px auto;\">{inspection_banner}\n<div style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:24px; ")
        full_html = full_html.replace("</body>", "</div>\n</div>\n</body>")

        with open(preview_filepath, 'w', encoding='utf-8') as pf:
            pf.write(full_html)

        print(f"[{idx:02d}] {variant.upper()}")
        print(f"     Business : {lead.get('business_name')}")
        print(f"     Email    : {lead.get('email')}")
        print(f"     Subject  : {subj}")
        print(f"     Saved to : {preview_filepath}")
        print()

        index_html_cards.append(f"""
        <div style="border:1px solid #cbd5e1; border-radius:8px; padding:16px; margin-bottom:12px; background:#fff;">
          <div style="font-size:11px; font-weight:bold; color:{variant_badge_color}; text-transform:uppercase;">{variant_label}</div>
          <h3 style="margin:4px 0 8px 0; font-size:16px;"><a href="{preview_filename}" style="color:#0f172a; text-decoration:none;">{lead.get('business_name')} &rarr;</a></h3>
          <div style="font-size:13px; color:#475569; margin-bottom:6px;"><strong>Subject:</strong> {subj}</div>
          <div style="font-size:12px; color:#64748b;"><strong>To:</strong> {lead.get('email')} · <strong>Category:</strong> {lead.get('category')} · <strong>Locality:</strong> {lead.get('locality')}</div>
          <div style="margin-top:10px;"><a href="{preview_filename}" style="display:inline-block; padding:6px 12px; background:#0f172a; color:#fff; text-decoration:none; border-radius:4px; font-size:12px; font-weight:600;">View Rendered Email Preview &rarr;</a></div>
        </div>
        """)

    # Write preview dashboard index.html
    index_html_path = os.path.join(config.PREVIEW_DIR, "index.html")
    with open(index_html_path, 'w', encoding='utf-8') as idf:
        idf.write(f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Pune SMB Cold Outreach - Email Previews</title>
<style>
body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }}
.container {{ max-width: 800px; margin: 0 auto; }}
</style>
</head>
<body>
<div class="container">
  <h1 style="margin-bottom:4px;">Cold Email Outreach Previews</h1>
  <p style="color:#64748b; margin-top:0; margin-bottom:24px;">Rendered sample emails for visual inspection before live sending.</p>
  {"".join(index_html_cards)}
</div>
</body>
</html>""")

    print(f"✨ Interactive Preview Dashboard generated: {index_html_path}")
    print("\nNext step: Spot-check the rendered emails above or open preview/index.html.")
    print("Wait for user approval before sending real emails.")

def run_test_send(test_email: str, template_engine: OutreachTemplateEngine, brevo: BrevoClient):
    """
    Send a single real test email to user's address.
    """
    print_banner()
    print(f">>> SENDING TEST EMAIL TO: {test_email}\n")

    if not brevo.is_configured():
        print(f"❌ Error: BREVO_API_KEY is not configured in .env. Please configure your Brevo API key first.")
        return

    # Create dummy lead
    lead = {
        "business_name": "ProActive Fitness Studio",
        "category": "gyms",
        "locality": "Kothrud",
        "has_website_bool": False,
        "demo_link": f"{os.getenv('DEMO_BASE_URL', 'http://localhost:3000')}/demo/proactive-fitness"
    }

    subj, txt, html_body, variant, _ = template_engine.render(lead)
    subj = f"[TEST] {subj}"

    print(f"Subject: {subj}")
    print(f"Sender : {config.SENDER_NAME} <{config.SENDER_EMAIL}>")
    print(f"To     : {test_email}")
    print("\nSending via Brevo API...")

    success, msg, msg_id = brevo.send_email(
        to_email=test_email,
        to_name="Test Recipient",
        subject=subj,
        text_content=txt,
        html_content=html_body,
        tags=["cli_test_send"]
    )

    if success:
        print(f"✅ TEST EMAIL SENT SUCCESSFULLY!")
        print(f"Brevo Message ID: {msg_id}")
    else:
        print(f"❌ TEST EMAIL FAILED: {msg}")

def print_status(state_mgr: OutreachStateManager, filter_engine: LeadFilter, logger: SendLogger):
    """
    Display comprehensive status dashboard.
    """
    print_banner()
    state = state_mgr.state
    state_mgr.rollover_day_if_needed()

    valid_queue, _, _ = filter_engine.process_leads()

    # Read counts
    hot_leads_count = 0
    if os.path.exists(config.HOT_LEADS_CSV):
        with open(config.HOT_LEADS_CSV, 'r', encoding='utf-8', errors='ignore') as f:
            hot_leads_count = sum(1 for line in f if line.strip()) - 1

    needs_attn_count = 0
    if os.path.exists(config.NEEDS_ATTENTION_CSV):
        with open(config.NEEDS_ATTENTION_CSV, 'r', encoding='utf-8', errors='ignore') as f:
            needs_attn_count = sum(1 for line in f if line.strip()) - 1

    supp_count = len(filter_engine.load_suppressed_emails())
    sent_count = len(filter_engine.load_sent_emails())

    pause_status = "🔴 AUTO-PAUSED" if state.get("is_paused") else "🟢 ACTIVE"

    print("================================================================================")
    print("                       CAMPAIGN HEALTH & STATUS DASHBOARD")
    print("================================================================================")
    print(f"Campaign Status       : {pause_status}")
    if state.get("is_paused"):
        print(f"Pause Reason          : {state.get('pause_reason')}")
        print(f"Recovery Command      : python email_outreach.py --resume-after-review")
    print(f"Current Date (IST)    : {state.get('current_date')}")
    print(f"Warm-Up Day Number    : Day {state.get('current_day_number')}")
    print(f"Today's Progress      : {state.get('today_sent_count')} / {state.get('today_cap')} emails sent")
    print(f"Remaining Today's Cap : {max(0, state.get('today_cap') - state.get('today_sent_count'))} emails")
    print(f"Queue Size (Unsent)   : {len(valid_queue)} leads waiting")
    print(f"Total Sent (All Time) : {sent_count} leads")
    print(f"Yesterday Hard Bounce : {state.get('yesterday_hard_bounce_rate', 0.0):.2f}% (Safety Limit: 3.0%)")
    print(f"Yesterday Spam Rate   : {state.get('yesterday_spam_complaint_rate', 0.0):.3f}% (Safety Limit: 0.1%)")
    print(f"Hot Leads (YES reply) : {max(0, hot_leads_count)} interested leads")
    print(f"Needs Attention       : {max(0, needs_attn_count)} questions/replies")
    print(f"Suppression List Size : {supp_count} suppressed addresses")
    print("================================================================================\n")

def run_sending_batch(
    filter_engine: LeadFilter,
    template_engine: OutreachTemplateEngine,
    state_mgr: OutreachStateManager,
    brevo: BrevoClient,
    logger: SendLogger,
    health_mon: HealthMonitor,
    reply_handler: ReplyHandler,
    daemon_mode: bool = False
):
    """
    Executes sending within daily cap and IST window.
    """
    print_banner()

    if not brevo.is_configured():
        print("❌ Error: BREVO_API_KEY is not configured in .env. Cannot start sending.")
        return

    while True:
        state_mgr.rollover_day_if_needed()

        can_send_now, gate_reason = state_mgr.can_send()
        if not can_send_now:
            print(f"[GATE CLOSED] {gate_reason}")
            if not daemon_mode:
                return
            # In daemon mode, sleep 5 minutes and check again
            print("Daemon mode active. Sleeping 5 minutes before checking time window & cap...\n")
            time.sleep(300)
            continue

        # Get remaining leads in queue
        valid_queue, _, _ = filter_engine.process_leads()
        if not valid_queue:
            print("✅ All leads in queue have been contacted! No unsent leads remaining.")
            if not daemon_mode:
                return
            print("Sleeping 10 minutes in daemon mode to check for replies...\n")
            # Check replies
            reply_handler.check_inbox()
            time.sleep(600)
            continue

        # Calculate batch size
        remaining_cap = state_mgr.state["today_cap"] - state_mgr.state["today_sent_count"]
        batch_size = min(
            random.randint(config.DELAYS["batch_min"], config.DELAYS["batch_max"]),
            remaining_cap,
            len(valid_queue)
        )

        batch_leads = valid_queue[:batch_size]
        print(f"\n================================================================================")
        print(f"STARTING BATCH: {len(batch_leads)} EMAILS (Today's Sent: {state_mgr.state['today_sent_count']}/{state_mgr.state['today_cap']})")
        print(f"================================================================================\n")

        for idx, lead in enumerate(batch_leads, start=1):
            can_send_item, item_gate = state_mgr.can_send()
            if not can_send_item:
                print(f"[!] Stopping batch early: {item_gate}")
                break

            subj, txt, html_body, variant, sub_tpl = template_engine.render(lead)
            recipient_email = lead['email']
            b_name = lead.get('business_name', '')

            print(f"[{idx}/{len(batch_leads)}] Sending to {b_name} <{recipient_email}>...")

            success, msg, msg_id = brevo.send_email(
                to_email=recipient_email,
                to_name=b_name,
                subject=subj,
                text_content=txt,
                html_content=html_body,
                tags=[lead.get('category', 'general'), variant]
            )

            if success:
                print(f"    ✅ Sent! Message ID: {msg_id}")
                logger.log_send(
                    business_name=b_name,
                    email=recipient_email,
                    category=lead.get('category', ''),
                    variant=variant,
                    subject=subj,
                    status="sent",
                    brevo_message_id=msg_id,
                    reply_status="none"
                )
                state_mgr.record_send()
            else:
                print(f"    ❌ Failed: {msg}")
                logger.log_send(
                    business_name=b_name,
                    email=recipient_email,
                    category=lead.get('category', ''),
                    variant=variant,
                    subject=subj,
                    status="failed",
                    brevo_message_id="",
                    reply_status="none"
                )
                state_mgr.record_api_failure()

            # Health check trigger after every 25 sends
            sent_total = state_mgr.state["total_sent_all_time"]
            last_checked = state_mgr.state.get("last_health_check_sent_count", 0)
            if (sent_total - last_checked) >= config.HEALTH_THRESHOLDS.get("check_interval_sends", 25):
                print("\n[HEALTH] Triggering scheduled deliverability health check...")
                h_rep = health_mon.sync_events_and_check_health()
                state_mgr.state["last_health_check_sent_count"] = sent_total
                state_mgr.save_state()
                print(f"         Bounce rate: {h_rep['hard_bounce_rate']:.1f}%, Spam: {h_rep['spam_complaint_rate']:.2f}% (Status: {h_rep['action_taken']})\n")

                if state_mgr.state.get("is_paused"):
                    print("🚨 Auto-pause triggered. Halting batch.")
                    break

            # Delay between sends (3-10s)
            if idx < len(batch_leads):
                delay = random.uniform(config.DELAYS["min_delay_seconds"], config.DELAYS["max_delay_seconds"])
                time.sleep(delay)

        # Batch complete: check IMAP replies
        print("\nChecking IMAP inbox for replies from leads...")
        r_rep = reply_handler.check_inbox()
        if r_rep.get("matched_replies", 0) > 0:
            print(f"📥 New replies processed: {r_rep['matched_replies']} (YES: {r_rep['yes_count']}, STOP: {r_rep['stop_count']}, OTHER: {r_rep['other_count']})")

        if not daemon_mode:
            print("\nBatch finished. Non-daemon mode stopping.")
            return

        # Gap between batches (2-5 minutes)
        gap = random.uniform(config.DELAYS["batch_gap_min_seconds"], config.DELAYS["batch_gap_max_seconds"])
        print(f"\nBatch complete. Pausing {int(gap)} seconds before next batch...")
        time.sleep(gap)

def main():
    parser = argparse.ArgumentParser(description="Pune SMB Brevo Cold Email Outreach Engine")
    parser.add_argument("--dry-run", action="store_true", help="Render sample emails to /preview and display filtering breakdown")
    parser.add_argument("--test", type=str, metavar="EMAIL", help="Send a real test email to specified address")
    parser.add_argument("--status", action="store_true", help="Display warm-up progress, today's cap, bounce rate, and queue size")
    parser.add_argument("--daemon", action="store_true", help="Run continuously in background adhering to IST schedule and warm-up pacing")
    parser.add_argument("--send", action="store_true", help="Execute single day batch up to today's warm-up cap")
    parser.add_argument("--resume-after-review", action="store_true", help="Clear auto-pause flag after reviewing deliverability issues")
    parser.add_argument("--check-replies", action="store_true", help="Poll IMAP inbox once and classify replies")

    args = parser.parse_args()

    # Initialize subsystems
    filter_engine = LeadFilter(
        leads_csv=config.LEADS_CSV,
        sent_log_csv=config.SENT_LOG_CSV,
        suppression_list_csv=config.SUPPRESSION_LIST_CSV,
        skipped_leads_csv=config.SKIPPED_LEADS_CSV,
        exclude_keywords=config.EXCLUDE_KEYWORDS
    )
    template_engine = OutreachTemplateEngine()
    state_mgr = OutreachStateManager(config.STATE_FILE_PATH)
    brevo = BrevoClient()
    logger = SendLogger()
    health_mon = HealthMonitor(brevo, state_mgr)
    reply_handler = ReplyHandler(brevo, logger)

    if args.resume_after_review:
        state_mgr.resume_after_review()

    if args.dry_run:
        run_dry_run(filter_engine, template_engine, sample_count=10)
    elif args.test:
        run_test_send(args.test, template_engine, brevo)
    elif args.status:
        print_status(state_mgr, filter_engine, logger)
    elif args.check_replies:
        print_banner()
        print("Checking IMAP inbox for lead replies...")
        rep = reply_handler.check_inbox()
        print(f"Result: {rep['message']}")
        print(f"Checked {rep.get('messages_checked', 0)} messages. Matched {rep.get('matched_replies', 0)} replies.")
    elif args.daemon:
        run_sending_batch(
            filter_engine, template_engine, state_mgr, brevo,
            logger, health_mon, reply_handler, daemon_mode=True
        )
    elif args.send:
        run_sending_batch(
            filter_engine, template_engine, state_mgr, brevo,
            logger, health_mon, reply_handler, daemon_mode=False
        )
    else:
        # Default help
        parser.print_help()
        print("\nRecommended first step: python email_outreach.py --dry-run")

if __name__ == "__main__":
    main()
