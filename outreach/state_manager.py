"""
State and warmup tracker for Pune SMB Cold Outreach Engine.
Maintains state.json across restarts, enforces aggressive warmup schedule,
daily plan limits, IST schedule windows, health pauses, and recovery.
"""

import os
import json
import datetime
from typing import Dict, Any, Tuple
from zoneinfo import ZoneInfo

from outreach import config

class OutreachStateManager:
    def __init__(self, state_file: str = config.STATE_FILE_PATH):
        self.state_file = state_file
        self.state: Dict[str, Any] = self.load_state()

    def get_ist_now(self) -> datetime.datetime:
        """Return current datetime in Asia/Kolkata timezone."""
        try:
            return datetime.datetime.now(ZoneInfo("Asia/Kolkata"))
        except Exception:
            # Fallback for systems without tzdata
            utc_now = datetime.datetime.now(datetime.timezone.utc)
            ist_offset = datetime.timedelta(hours=5, minutes=30)
            return (utc_now + ist_offset).replace(tzinfo=None)

    def load_state(self) -> Dict[str, Any]:
        default_state = {
            "first_send_date": None,
            "current_day_number": 1,
            "current_date": self.get_ist_now().strftime("%Y-%m-%d"),
            "today_sent_count": 0,
            "today_cap": config.WARMUP_SCHEDULE[0] if config.WARMUP_SCHEDULE else 100,
            "yesterday_hard_bounce_rate": 0.0,
            "yesterday_spam_complaint_rate": 0.0,
            "is_paused": False,
            "pause_reason": None,
            "consecutive_api_failures": 0,
            "total_sent_all_time": 0,
            "last_send_timestamp": None,
            "last_health_check_sent_count": 0,
            "last_imap_check_timestamp": None
        }

        if os.path.exists(self.state_file):
            try:
                with open(self.state_file, 'r', encoding='utf-8') as f:
                    loaded = json.load(f)
                    default_state.update(loaded)
            except Exception as e:
                print(f"Warning: Failed to load {self.state_file}: {e}")

        # Ensure today's cap does not exceed effective maximum
        default_state["today_cap"] = min(default_state["today_cap"], config.EFFECTIVE_DAILY_MAX)
        return default_state

    def save_state(self):
        try:
            with open(self.state_file, 'w', encoding='utf-8') as f:
                json.dump(self.state, f, indent=2)
        except Exception as e:
            print(f"Error saving {self.state_file}: {e}")

    def rollover_day_if_needed(self):
        """Check if date has advanced in IST and roll over warmup caps."""
        now_ist = self.get_ist_now()
        today_str = now_ist.strftime("%Y-%m-%d")

        if self.state["current_date"] != today_str:
            # Date rollover!
            prev_sent = self.state["today_sent_count"]
            prev_cap = self.state["today_cap"]
            curr_day = self.state["current_day_number"]

            if self.state["first_send_date"] is None and prev_sent > 0:
                self.state["first_send_date"] = self.state["current_date"]

            # Only advance day number if we actually sent emails or have started
            if self.state["first_send_date"] is not None:
                new_day_num = curr_day + 1
            else:
                new_day_num = 1

            self.state["current_day_number"] = new_day_num
            self.state["current_date"] = today_str
            self.state["today_sent_count"] = 0
            self.state["consecutive_api_failures"] = 0

            # Calculate new daily cap according to health
            # Ramp only moves up if yesterday hard bounce < 2% and spam complaint < 0.1%
            y_bounce = self.state.get("yesterday_hard_bounce_rate", 0.0)
            y_complaint = self.state.get("yesterday_spam_complaint_rate", 0.0)

            schedule = config.WARMUP_SCHEDULE
            target_idx = min(new_day_num - 1, len(schedule) - 1)
            target_cap = schedule[target_idx]

            if y_bounce >= 3.0 or y_complaint >= 0.1:
                # Very bad health: drop back to half
                new_cap = max(25, int(prev_cap / 2))
                print(f"[WARMUP] Health critical yesterday ({y_bounce:.1f}% bounce). Cutting cap to {new_cap}.")
            elif y_bounce >= 2.0:
                # Mild health issues: stay at same level
                new_cap = prev_cap
                print(f"[WARMUP] Moderate bounce rate ({y_bounce:.1f}%). Holding cap at {new_cap}.")
            else:
                # Good health: advance to next ramp step
                new_cap = target_cap
                print(f"[WARMUP] Good health. Advancing to Day {new_day_num} cap: {new_cap}.")

            self.state["today_cap"] = min(new_cap, config.EFFECTIVE_DAILY_MAX)
            self.save_state()

    def is_within_send_window(self) -> Tuple[bool, str]:
        """
        Check if current time is within Monday-Saturday 09:00-19:00 IST.
        """
        now = self.get_ist_now()
        weekday = now.weekday() # Monday=0, Sunday=6
        hour = now.hour

        allowed_days = config.SEND_WINDOW.get("send_days", [0, 1, 2, 3, 4, 5])
        start_hour = config.SEND_WINDOW.get("start_hour", 9)
        end_hour = config.SEND_WINDOW.get("end_hour", 19)

        if weekday not in allowed_days:
            day_name = now.strftime("%A")
            return False, f"Today is {day_name} (Sunday/Non-sending day). Sending operates Monday-Saturday."

        if hour < start_hour or hour >= end_hour:
            return False, f"Current IST time is {now.strftime('%H:%M:%S')}. Sending operates between {start_hour:02d}:00 and {end_hour:02d}:00 IST."

        return True, "Within sending window"

    def can_send(self) -> Tuple[bool, str]:
        """Check all sending gates: pause flag, daily cap, and time window."""
        self.rollover_day_if_needed()

        if self.state.get("is_paused", False):
            reason = self.state.get("pause_reason", "Safety monitor pause")
            return False, f"Campaign is AUTO-PAUSED: {reason}. Review issues and run with --resume-after-review."

        if self.state["today_sent_count"] >= self.state["today_cap"]:
            return False, f"Today's cap reached ({self.state['today_sent_count']}/{self.state['today_cap']}). Next batch will resume tomorrow."

        in_window, win_msg = self.is_within_send_window()
        if not in_window:
            return False, win_msg

        return True, "Ready to send"

    def record_send(self):
        self.rollover_day_if_needed()
        if self.state["first_send_date"] is None:
            self.state["first_send_date"] = self.state["current_date"]
        self.state["today_sent_count"] += 1
        self.state["total_sent_all_time"] += 1
        self.state["last_send_timestamp"] = self.get_ist_now().isoformat()
        self.state["consecutive_api_failures"] = 0
        self.save_state()

    def record_api_failure(self):
        failures = self.state.get("consecutive_api_failures", 0) + 1
        self.state["consecutive_api_failures"] = failures
        max_allowed = config.HEALTH_THRESHOLDS.get("max_consecutive_api_failures", 5)

        if failures >= max_allowed:
            self.auto_pause(f"{failures} consecutive Brevo API failures detected.")
        else:
            self.save_state()

    def auto_pause(self, reason: str):
        self.state["is_paused"] = True
        self.state["pause_reason"] = reason
        self.save_state()
        print(f"\n🚨 [CRITICAL ALERT] OUTREACH CAMPAIGN AUTO-PAUSED!\nReason: {reason}\nRun with --resume-after-review once addressed.\n")

    def cut_cap_in_half(self, reason: str):
        current = self.state.get("today_cap", 100)
        new_cap = max(25, int(current / 2))
        self.state["today_cap"] = new_cap
        self.save_state()
        print(f"\n⚠️ [HEALTH WARNING] {reason}. Cap reduced by 50% to {new_cap}/day.")

    def resume_after_review(self):
        self.state["is_paused"] = False
        self.state["pause_reason"] = None
        self.state["consecutive_api_failures"] = 0
        self.save_state()
        print("\n✅ Campaign resumed after review. Safety pauses cleared.")
