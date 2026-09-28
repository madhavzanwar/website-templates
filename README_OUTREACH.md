# Brevo Cold Email Outreach Engine

A production-grade Python tool that sends personalized cold outreach emails via the **Brevo Transactional Email API (POST /v3/smtp/email)** using verified leads from `pune_smb_leads.csv`.

Engineered with domain reputation protection, automatic 3-stage warm-up pacing, bounce/complaint suppression, subject line variation, and crash-resilient audit logging.

---

## 🚀 Key Features

1. **Brevo Transactional Email API (v3)**:
   - Authenticates securely via `BREVO_API_KEY` stored in `.env`.
   - Sends transactional emails via `POST https://api.brevo.com/v3/smtp/email`.
   - Captures and logs `messageId` for every successful send.

2. **Domain & Account Reputation Protection (Sending Pace)**:
   - **Automatic Warm-Up Schedule**:
     - **Days 1–3**: Capped at **25 emails/day**
     - **Days 4–7**: Capped at **75 emails/day**
     - **Day 8+**: Full configured plan limit (default **300 emails/day** on Brevo free tier)
   - **Persistent State Tracking**: Tracks days since first send and daily counters in `outreach_state.json` with automatic midnight resets.
   - **Human Pacing Delay**: Randomized **5.0 to 15.0 seconds** pause between individual API calls to prevent bursty patterns.

3. **Bounce & Complaint Suppression (`suppression_list.csv`)**:
   - Polls Brevo's `/v3/smtp/statistics/events` endpoint for `hardBounce`, `spam`, and `unsubscribed` events.
   - Maintains a permanent `suppression_list.csv` checked before every single send.
   - Suppressed addresses are never emailed again across all future runs.

4. **Zero-Duplicate Guarantee (`sent_log.csv`)**:
   - Maintains `sent_log.csv` as the single source of truth for all outreach attempts.
   - Automatically loads previously contacted addresses on startup and skips them, even after process restart or machine reboot.

5. **Personalization & Template Engine**:
   - Built from an HTML template (`template.html`) supporting placeholders:
     - `{{business_name}}`: Cleaned company name
     - `{{category}}`: Business category (e.g. gyms, dentists, salons)
     - `{{demo_link}}`: Personalized demo URL from the CSV's `demo_link` column (with customizable fallback)
     - `{{owner_name}}`: Falls back to `business_name` if `owner_name` is blank
   - Subject line variants from `subjects.txt`: Randomly assigned per email to avoid identical subject lines triggering spam filters.

6. **Input Validation (`invalid_emails.csv`)**:
   - Validates email formats using strict RFC regex.
   - Rows with missing or malformed emails are isolated and logged to `invalid_emails.csv` with specific failure reasons rather than crashing.

7. **Dry-Run & Inspection Mode**:
   - `--dry-run` renders 5 sample personalized emails to `dry_run_output/` with top inspection metadata banners for visual verification before going live.

---

## 📂 Project Structure

```
sell-wesbsite/
│
├── outreach/
│   ├── __init__.py
│   ├── config.py              # Configuration loader (.env + outreach_config.json)
│   ├── validator.py           # Module A: CSV loader, email regex, invalid_emails.csv
│   ├── template.py            # Module B: Template engine & subject-variant logic
│   ├── sender.py              # Module C: Brevo API client, warm-up manager, 5-15s delay
│   ├── suppression.py         # Module D: Bounce/complaint poller & suppression list
│   └── logger.py              # Module E: Persistent sent_log.csv manager
│
├── email_outreach.py          # Master CLI orchestrator
├── template.html              # Customizable responsive HTML email template
├── subjects.txt               # Subject line variants
├── outreach_config.json       # Configurable limits, delays, and fallbacks
├── outreach_state.json        # Persistent warm-up tracking state
│
├── pune_smb_leads.csv         # Input leads from scraper
├── sent_log.csv               # Single source of truth for sent history
├── suppression_list.csv       # Permanent bounce/complaint suppression list
├── invalid_emails.csv         # Skipped rows with invalid/missing emails
└── dry_run_output/            # Visual HTML previews from --dry-run
```

---

## 🛠️ Configuration & Credentials

1. **Set Environment Variables in `.env`**:
   Add your Brevo API key and verified sender address to `.env`:
   ```env
   # Brevo Transactional Email API Key
   BREVO_API_KEY=xkeysib-your_brevo_api_key_here

   # Sender Email (Must be verified in your Brevo account)
   SENDER_EMAIL=poonam@yourdomain.com

   # Sender Display Name
   SENDER_NAME=Poonam | Web Growth
   ```

2. **Adjust Sending Pace in `outreach_config.json` (Optional)**:
   ```json
   {
     "sendingPace": {
       "minDelaySeconds": 5.0,
       "maxDelaySeconds": 15.0,
       "planDailyLimit": 300,
       "warmup": {
         "enabled": true,
         "stage1Days": 3,
         "stage1DailyLimit": 25,
         "stage2Days": 7,
         "stage2DailyLimit": 75
       }
     }
   }
   ```

---

## 💻 CLI Commands & Workflow

### 1. Visual Dry-Run (Always Start Here)
Renders 5 sample personalized HTML emails to `dry_run_output/` without sending anything:
```bash
python email_outreach.py --dry-run
```
Open `dry_run_output/email_1.html` in your browser to inspect layout, placeholders, and subject variants.

---

### 2. Check Warm-Up & Queue Status
Displays your current warm-up stage, daily sends done/remaining, total sent, suppression count, and eligible queue:
```bash
python email_outreach.py --status
```

---

### 3. Send a Real Test Batch to Your Own Inboxes
Before emailing real business leads, test the full API send cycle to 1 or more of your own test email addresses:
```bash
python email_outreach.py --test-recipients "your_email1@gmail.com,your_email2@outlook.com"
```
*(This pulls real lead data from `pune_smb_leads.csv` but routes the emails directly to your test inboxes so you can verify inbox placement, formatting, and responsiveness on mobile/desktop).*

---

### 4. Run Live Outreach
Sends to the next eligible leads in `pune_smb_leads.csv`, automatically stopping when today's warm-up cap is reached:
```bash
python email_outreach.py
```

To limit sending to a smaller batch (e.g. max 5 emails):
```bash
python email_outreach.py --limit 5
```

---

### 5. Sync Bounces & Spam Complaints from Brevo
Queries Brevo's events endpoint to pull any hard bounces or spam complaints into `suppression_list.csv`:
```bash
python email_outreach.py --sync-bounces
```
*(Note: Live outreach runs this sync automatically before starting each batch).*

---

## 📋 Data Formats

### `sent_log.csv` (Audit Log & Deduplication Source of Truth)
| Column | Description | Example |
| :--- | :--- | :--- |
| `business_name` | Name of the business | `Gold's Gym India` |
| `email` | Contact email | `customer.care@goldsgym.in` |
| `category` | Business category | `gyms` |
| `subject_used` | Rendered subject line | `Quick question regarding Gold's Gym India` |
| `timestamp` | ISO 8601 timestamp | `2026-09-25T14:30:00.123456` |
| `status` | Send status | `sent` / `failed` / `bounced` |
| `brevo_message_id` | Brevo message ID | `<202609251430.12345678@smtp-relay.brevo.com>` |

### `suppression_list.csv` (Permanent Suppression)
| Column | Description | Example |
| :--- | :--- | :--- |
| `email` | Suppressed email | `invalid@defunctdomain.com` |
| `reason` | Reason for suppression | `brevo_hardBounce` / `brevo_spam` / `unsubscribe` |
| `event_time` | Timestamp of event | `2026-09-25T12:00:00.000Z` |
| `source` | Event origin | `brevo_api_poll` / `manual` |

### `invalid_emails.csv` (Skipped Leads)
| Column | Description | Example |
| :--- | :--- | :--- |
| `business_name` | Name of business | `Local Fitness Club` |
| `email` | Empty or malformed string | `null` |
| `category` | Category | `gyms` |
| `reason` | Why it was skipped | `missing_email` / `invalid_regex_format` |
| `timestamp` | Timestamp | `2026-09-25T14:30:00.123456` |
