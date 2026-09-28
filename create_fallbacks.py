import os
import json

def get_gym_fallback():
    return {
        "category_id": "gyms",
        "category_label": "Gyms & Fitness Centers",
        "branding": {
            "business_name": "ProActive Fitness & Strength Studio",
            "business_short_code": "PRO-FIT",
            "tagline": "Transform Your Body, Mind & Strength",
            "hero_headline_lines": [
                "FORGE",
                "YOUR TRUE",
                "STRENGTH."
            ],
            "hero_subheadline": "Pune's premier strength & athletic conditioning facility. Certified coaches, Olympic-grade equipment, and personalized nutritional guidance.",
            "primary_color": "#D4FF00",
            "secondary_color": "#14161B",
            "canvas_color": "#090A0C",
            "accent_infrared": "#FF3B30",
            "hero_image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
            "hero_video_poster": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop"
        },
        "telemetry": {
            "live_badge": "LIVE FACILITY STATUS",
            "compound_status": "OPEN // REGULAR HOURS",
            "current_capacity_percent": 55,
            "active_athletes": 34,
            "next_session_countdown": "15 MIN",
            "indoor_temp": "22°C (71.6°F)",
            "soundtrack_bpm": "128 BPM"
        },
        "navigation": {
            "nav_links": [
                { "label": "DISCIPLINES", "href": "#disciplines" },
                { "label": "SCHEDULE", "href": "#schedule" },
                { "label": "FACILITY", "href": "#compound" },
                { "label": "MEMBERSHIPS", "href": "#rates" },
                { "label": "TRAINERS", "href": "#coaches" }
            ],
            "cta_button_text": "BOOK FREE TRIAL PASS",
            "cta_button_target": "#booking"
        },
        "hero_actions": {
            "primary_cta": {
                "text": "CLAIM 1-DAY FREE TRIAL",
                "href": "#booking",
                "subtext": "Zero commitment · Instant floor access"
            },
            "secondary_cta": {
                "text": "VIEW PROGRAMS",
                "href": "#disciplines",
                "subtext": "Functional, cardio & weight training"
            },
            "telemetry_card": {
                "discipline": "FUNCTIONAL STRENGTH",
                "coach": "Head Coach & Fitness Director",
                "zone": "ZONE 1 // MAIN RIG",
                "soundtrack": "High Energy Workout Mix"
            }
        },
        "about": {
            "section_code": "01 // OUR PHILOSOPHY",
            "section_title": "ENGINEERED FOR REAL TRANSFORMATION",
            "lead_statement": "We believe fitness should be sustainable, science-backed, and community-driven.",
            "body_paragraphs": [
                "Founded with a mission to deliver world-class training standards to fitness enthusiasts in Pune, our facility features commercial-grade selectorized machines, free weights, and dedicated functional turf.",
                "Whether your goal is fat loss, muscle hypertrophy, athletic conditioning, or rehabilitation, our certified trainers design tailored protocols that deliver tangible results."
            ],
            "specifications": [
                { "value": "8,000", "unit": "SQ FT", "label": "Air-Conditioned Training Area" },
                { "value": "12+", "unit": "TRAINERS", "label": "Certified Personal Coaches" },
                { "value": "100+", "unit": "EQUIPMENT", "label": "Imported Biomechanical Machines" },
                { "value": "100%", "unit": "CLEAN", "label": "Sanitized & Maintained Hourly" }
            ]
        },
        "services": [
            {
                "id": "discipline-01",
                "code": "TRACK 01",
                "name": "STRENGTH & HYPERTROPHY",
                "price": "₹2,499 / mo",
                "description": "Progressive overload barbell and dumbbell training targeting strength gains and lean muscle development with strict form correction.",
                "intensity_level": "4 / 5",
                "class_cap": "Open Floor",
                "duration": "60-75 MIN",
                "equipment": "Olympic barbells, power racks, dumbbell racks up to 50kg",
                "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
            },
            {
                "id": "discipline-02",
                "code": "TRACK 02",
                "name": "HIIT & FUNCTIONAL CIRCUIT",
                "price": "₹2,999 / mo",
                "description": "Metabolic conditioning circuits combining battle ropes, plyometrics, kettlebells, and sprints to burn calories and build stamina.",
                "intensity_level": "5 / 5",
                "class_cap": "15 Members",
                "duration": "45 MIN",
                "equipment": "Battle ropes, plyo boxes, sled track, rowing machines",
                "image": "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop"
            },
            {
                "id": "discipline-03",
                "code": "TRACK 03",
                "name": "PERSONAL COACHING 1-ON-1",
                "price": "₹6,000 / mo",
                "description": "Dedicated one-on-one personal guidance, body composition tracking, and custom weekly nutrition and workout blueprints.",
                "intensity_level": "ADAPTIVE",
                "class_cap": "1-on-1",
                "duration": "60 MIN",
                "equipment": "Full facility access + private assessment tools",
                "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop"
            },
            {
                "id": "discipline-04",
                "code": "TRACK 04",
                "name": "WEIGHT LOSS & FAT BURN",
                "price": "₹2,199 / mo",
                "description": "Science-backed cardiovascular intervals, steady-state fat burning routines, and calorie deficit dietary management.",
                "intensity_level": "3.5 / 5",
                "class_cap": "Open Floor",
                "duration": "60 MIN",
                "equipment": "Commercial treadmills, cross trainers, spin bikes",
                "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop"
            }
        ],
        "schedule": {
            "section_code": "02 // LIVE AVAILABILITY",
            "section_title": "BATCH SCHEDULE & TIMINGS",
            "days": [
                { "id": "mon", "day": "MON", "date": "TODAY", "active": True },
                { "id": "tue", "day": "TUE", "date": "TOMORROW", "active": False },
                { "id": "wed", "day": "WED", "date": "DAY 3", "active": False },
                { "id": "thu", "day": "THU", "date": "DAY 4", "active": False },
                { "id": "fri", "day": "FRI", "date": "DAY 5", "active": False },
                { "id": "sat", "day": "SAT", "date": "DAY 6", "active": False }
            ],
            "sessions": [
                {
                    "id": "s-01",
                    "time": "06:00 AM — 07:00 AM",
                    "title": "MORNING HIIT & BOOTCAMP",
                    "category": "FUNCTIONAL CIRCUIT",
                    "coach": "Senior Trainer",
                    "coach_role": "Head Fitness Coach",
                    "total_slots": 15,
                    "booked_slots": 12,
                    "is_urgent": True,
                    "intensity": "ZONE 4"
                },
                {
                    "id": "s-02",
                    "time": "07:30 AM — 08:30 AM",
                    "title": "STRENGTH & FORM ESSENTIALS",
                    "category": "STRENGTH",
                    "coach": "Strength Coach",
                    "coach_role": "Powerlifting Specialist",
                    "total_slots": 12,
                    "booked_slots": 8,
                    "is_urgent": False,
                    "intensity": "ZONE 3"
                },
                {
                    "id": "s-03",
                    "time": "06:30 PM — 07:30 PM",
                    "title": "EVENING CROSS-FIT & CALISTHENICS",
                    "category": "FUNCTIONAL",
                    "coach": "Conditioning Coach",
                    "coach_role": "Mobility Coach",
                    "total_slots": 15,
                    "booked_slots": 14,
                    "is_urgent": True,
                    "intensity": "ZONE 5"
                },
                {
                    "id": "s-04",
                    "time": "08:00 PM — 09:00 PM",
                    "title": "CARDIO BURNOUT & MOBILITY",
                    "category": "CARDIO",
                    "coach": "Floor Coach",
                    "coach_role": "Cardio Specialist",
                    "total_slots": 16,
                    "booked_slots": 10,
                    "is_urgent": False,
                    "intensity": "ZONE 3"
                }
            ]
        },
        "gallery": {
            "section_code": "03 // FACILITY TOUR",
            "section_title": "INSIDE OUR FACILITY",
            "subtitle": "Spacious floor plans, hygienic changing rooms, and modern equipment curated for ultimate focus.",
            "gallery_images": [
                {
                    "url": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop",
                    "title": "MAIN WEIGHT FLOOR",
                    "caption": "Multi-station racks, rubberized flooring, and calibrated Olympic bumper plates.",
                    "tag": "ZONE 01 // STRENGTH",
                    "span": "col-span-12 md:col-span-8"
                },
                {
                    "url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop",
                    "title": "FREE WEIGHTS SECTION",
                    "caption": "Hexagonal dumbbells from 2.5kg to 50kg with ergonomic flat and incline benches.",
                    "tag": "FREE WEIGHTS",
                    "span": "col-span-12 md:col-span-4"
                },
                {
                    "url": "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=1470&auto=format&fit=crop",
                    "title": "CARDIO & AGILITY DECK",
                    "caption": "Commercial treadmills with touch displays, air bikes, and turf sprint track.",
                    "tag": "ZONE 02 // CARDIO",
                    "span": "col-span-12 md:col-span-5"
                },
                {
                    "url": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop",
                    "title": "PERSONAL TRAINING BAY",
                    "caption": "Dedicated space for functional assessments, mobility drills, and client check-ins.",
                    "tag": "ZONE 03 // 1-ON-1",
                    "span": "col-span-12 md:col-span-7"
                }
            ]
        },
        "coaches": {
            "section_code": "04 // COACHING TEAM",
            "section_title": "CERTIFIED FITNESS FACULTY",
            "subtitle": "K11, ACSM, and ACE certified coaches passionate about your fitness progress.",
            "faculty": [
                {
                    "id": "coach-01",
                    "name": "Rajesh Sharma",
                    "role": "Head Coach & Founder",
                    "specialty": "Hypertrophy & Biomechanics",
                    "experience": "10+ Years Exp",
                    "bio": "Certified strength coach with expertise in posture rehabilitation, powerlifting mechanics, and natural body transformation.",
                    "image": "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "coach-02",
                    "name": "Pooja Kulkarni",
                    "role": "Senior Functional Trainer",
                    "specialty": "Fat Loss & HIIT Circuits",
                    "experience": "6+ Years Exp",
                    "bio": "Specializes in female fitness, prenatal/postnatal conditioning, and high-intensity interval metabolic programming.",
                    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                }
            ]
        },
        "rates": [
            {
                "id": "tier-quarterly",
                "name": "3 MONTHS MEMBERSHIP",
                "badge": "MOST POPULAR",
                "price": "₹5,499",
                "billing_period": "for 3 months",
                "description": "The ideal commitment to see noticeable physical changes and build lasting habits.",
                "features": [
                    "Full gym floor & cardio access",
                    "Free personalized workout chart",
                    "Bi-weekly body composition analysis",
                    "Locker & shower facilities",
                    "Access to morning & evening batches"
                ],
                "cta_text": "JOIN FOR 3 MONTHS",
                "is_featured": True
            },
            {
                "id": "tier-annual",
                "name": "ANNUAL VIP PASS",
                "badge": "BEST VALUE",
                "price": "₹14,999",
                "billing_period": "for 12 months",
                "description": "Complete year-round transformation package with complimentary personal training sessions.",
                "features": [
                    "Unlimited 365-day facility access",
                    "4 complimentary 1-on-1 PT sessions",
                    "Personalized diet & nutrition guidance",
                    "Free freeze period up to 30 days",
                    "2 Guest day-passes per month"
                ],
                "cta_text": "CLAIM ANNUAL PASS",
                "is_featured": False
            },
            {
                "id": "tier-monthly",
                "name": "MONTHLY FLEXIBLE",
                "badge": "NO LOCK-IN",
                "price": "₹2,199",
                "billing_period": "per month",
                "description": "Flexible monthly pass for consistent fitness routines without long contracts.",
                "features": [
                    "Full gym access during all hours",
                    "General trainer guidance on floor",
                    "Steam & shower access",
                    "Standard locker usage"
                ],
                "cta_text": "START MONTHLY PASS",
                "is_featured": False
            }
        ],
        "testimonials": [
            {
                "athlete": "Amitabh Joshi",
                "discipline": "Member (1.5 Years)",
                "achievement": "Lost 14 kg & Built Core Strength",
                "quote": "The trainers here actually pay attention to your form rather than trying to sell useless supplements. Extremely clean gym, great music, and friendly crowd."
            },
            {
                "athlete": "Sneha Deshmukh",
                "discipline": "Member (8 Months)",
                "achievement": "Marathon Conditioning",
                "quote": "Best fitness center in the area! The equipment is top notch and the early morning functional batches keep my energy high all day long."
            }
        ],
        "contact": {
            "section_code": "05 // LOCATION & TIMINGS",
            "section_title": "VISIT OUR FITNESS FACILITY",
            "lead_text": "Walk in for a complimentary tour, body composition check, and 1-day free trial session.",
            "phone": "+91 98220 12345",
            "whatsapp_number": "919822012345",
            "whatsapp_message": "Hello, I want to book a free trial session at the gym.",
            "email": "contact@pune-gym.in",
            "address": "Opposite City Mall, Main Road, Pune, Maharashtra 411001",
            "instagram_handle": "@fitnesspune",
            "instagram_url": "https://instagram.com",
            "opening_hours": [
                { "days": "MONDAY — SATURDAY", "hours": "06:00 AM — 10:00 PM" },
                { "days": "SUNDAY", "hours": "07:00 AM — 01:00 PM" }
            ],
            "parking_transit": "Dedicated 2-wheeler and 4-wheeler parking space available",
            "booking_form": {
                "title": "CLAIM YOUR FREE 1-DAY TRIAL",
                "description": "Fill in your details below and our team will confirm your workout slot immediately.",
                "submit_text": "CONFIRM FREE TRIAL →",
                "disclaimer": "Free trial pass valid for first-time visitors only."
            }
        },
        "sticky_conversion_dock": {
            "headline": "SPECIAL SEASON DISCOUNT: SAVE 25% ON ANNUAL PLANS",
            "badge": "LIMITED PASSES",
            "cta_text": "CLAIM FREE TRIAL PASS →",
            "cta_target": "#booking"
        },
        "footer": {
            "copyright": "© 2026 PROACTIVE FITNESS. ALL RIGHTS RESERVED.",
            "subtext": "BUILT FOR PUNE'S ATHLETIC & FITNESS COMMUNITY.",
            "legal_links": [
                { "label": "TERMS & CONDITIONS", "href": "#" },
                { "label": "SAFETY GUIDELINES", "href": "#" },
                { "label": "PRIVACY POLICY", "href": "#" }
            ]
        }
    }

def get_cafe_fallback():
    return {
        "category_id": "cafes",
        "category_label": "Artisanal Cafes & Roasteries",
        "branding": {
            "business_name": "The Daily Roast & Bistro",
            "tagline": "Specialty Coffee, Fresh Bakes & Conversations",
            "established_year": "2021",
            "neighborhood": "Pune, Maharashtra",
            "hero_headline": {
                "line1": "Freshly Roasted,",
                "line2_italic": "Brewed With Quiet",
                "line3": "Perfection."
            },
            "hero_subheadline": "Single-estate Arabica beans sourced directly from Chikmagalur and Coorg micro-lots. Freshly baked sourdough, artisan pour-overs, and a tranquil work-friendly atmosphere.",
            "primary_color": "#B85D38",
            "secondary_color": "#231B16",
            "canvas_color": "#F7F4EE",
            "brass_color": "#D99B4B",
            "olive_color": "#4A5844",
            "hero_image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
            "hero_origin_stamp": {
                "origin": "Chikmagalur, Western Ghats",
                "estate": "Bhadra Estate Lot",
                "masl": "1,450 MASL",
                "varietal": "Selection 795 Arabica",
                "process": "Washed Sun-Dried",
                "notes": ["Roasted Hazelnut", "Dark Cocoa", "Caramelized Orange"],
                "lot_number": "LOT-IND-2026"
            },
            "rotating_stamp_badge": "FRESH SPECIALTY ROAST • ARABICA BEANS • PUNE • "
        },
        "ticker": {
            "announcement": "NOW BREWING: COORG ESTATE ESTATE LOT",
            "highlight_text": "HONEYCOMB & SWEET TANGERINE",
            "hours_summary": "CAFE & ESPRESSO BAR OPEN DAILY 08:00 AM – 11:00 PM"
        },
        "navigation": {
            "nav_links": [
                { "label": "Our Story", "href": "#manifesto" },
                { "label": "Menu", "href": "#menu" },
                { "label": "Brew Guide", "href": "#calculator" },
                { "label": "Ambiance", "href": "#gallery" },
                { "label": "Reserve Table", "href": "#visit" }
            ],
            "reserve_cta": "Book a Table",
            "order_cta": "Order On WhatsApp"
        },
        "hero_actions": {
            "primary_cta": {
                "text": "Explore Artisanal Menu",
                "href": "#menu"
            },
            "secondary_cta": {
                "text": "Reserve Table / Visit Us",
                "href": "#visit"
            },
            "status_pill": "Open Today: 8:00 AM – 11:00 PM",
            "quick_stats": [
                { "label": "Origin Sourcing", "value": "100% Indian Estate" },
                { "label": "Brewing Styles", "value": "Espresso & Pour-Over" },
                { "label": "WiFi & Workspace", "value": "High-Speed Fibre" }
            ]
        },
        "roasting_manifesto": {
            "badge": "OUR COFFEE PHILOSOPHY",
            "title": "From High-Altitude Western Ghats to Your Cup in 7 Days.",
            "subtitle": "We celebrate the incredible terroir of Indian specialty coffee. Every batch is freshly ground to order and balanced with precision temperature water.",
            "body_paragraphs": [
                "Indian coffee beans from the shade-grown hills of Karnataka and Kerala are world-renowned for their low acidity, full-bodied chocolate notes, and spice undertones.",
                "Whether you enjoy a velvet flat white, a crisp iced Americano, or a slow manual Chemex brew, our baristas craft each beverage with care."
            ],
            "harvest_cycle_badge": "SHADE-GROWN • SINGLE-ORIGIN TRACEABILITY",
            "pillars": [
                {
                    "number": "01",
                    "title": "Direct Estate Sourcing",
                    "description": "We partner directly with sustainable coffee planters in Chikmagalur and Coorg, ensuring fair compensation and eco-friendly farming practices.",
                    "metric": "100%",
                    "metric_label": "Direct Plantation Partnerships"
                },
                {
                    "number": "02",
                    "title": "Artisanal Small-Batch Roasting",
                    "description": "Roasting in precise 10kg drums allows us to highlight delicate caramel and fruit notes without over-roasting the beans.",
                    "metric": "10kg",
                    "metric_label": "Micro-Batch Drum Size"
                },
                {
                    "number": "03",
                    "title": "Calibrated Precision Pouring",
                    "description": "Water filtered to 120 TDS, extracted at 93°C, and paired with creamy whole milk or oat milk.",
                    "metric": "93°C",
                    "metric_label": "Brew Temp Calibration"
                }
            ],
            "direct_trade_stats": [
                { "value": "100%", "label": "Single-Estate Arabica", "subtext": "Direct from Chikmagalur & Coorg" },
                { "value": "86+", "label": "SCA Cupping Score", "subtext": "Top tier specialty grade" },
                { "value": "7 Days", "label": "Fresh Roast Cycle", "subtext": "Never served stale or shelf-stored" },
                { "value": "Free", "label": "High-Speed WiFi", "subtext": "Ideal for co-working & meetings" }
            ]
        },
        "menu": {
            "badge": "THE ARTISANAL MENU",
            "title": "Craft Brews, Sourdough & Bakery Delights",
            "subtitle": "Thoughtfully crafted beverages and gourmet European bakery items made fresh every morning.",
            "tabs": [
                { "id": "specialty-coffee", "label": "Specialty Coffee" },
                { "id": "cold-brews", "label": "Cold Brews & Iced" },
                { "id": "bakery-food", "label": "Sourdough & Bites" }
            ],
            "items": [
                {
                    "id": "c-01",
                    "category": "specialty-coffee",
                    "name": "Single-Estate Flat White",
                    "price": "₹220",
                    "description": "Double ristretto of Chikmagalur Arabica with silky micro-foam steamed milk in an 8oz ceramic cup.",
                    "tags": ["Bestseller", "Hot"],
                    "is_signature": True,
                    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "c-02",
                    "category": "specialty-coffee",
                    "name": "Pour-Over V60 / Aeropress",
                    "price": "₹240",
                    "description": "Clean, aromatic single-origin brew highlighting notes of floral jasmine and sweet citrus.",
                    "tags": ["Specialty", "Manual Brew"],
                    "is_signature": False,
                    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "c-03",
                    "category": "cold-brews",
                    "name": "18-Hour Cascara Cold Brew",
                    "price": "₹260",
                    "description": "Slow-steeped coarse grounds served over clear ice block with a twist of candied orange peel.",
                    "tags": ["Cold", "Signature"],
                    "is_signature": True,
                    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "c-04",
                    "category": "cold-brews",
                    "name": "Vietnamese Iced Coffee",
                    "price": "₹230",
                    "description": "Bold dark roast dripped over sweetened condensed milk and served over crushed ice.",
                    "tags": ["Sweet", "Cold"],
                    "is_signature": False,
                    "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "c-05",
                    "category": "bakery-food",
                    "name": "Avocado & Feta Sourdough Toast",
                    "price": "₹340",
                    "description": "Crushed Hass avocado, crumbled feta cheese, cherry tomatoes, and microgreens on toasted house sourdough.",
                    "tags": ["Healthy", "Breakfast"],
                    "is_signature": True,
                    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "id": "c-06",
                    "category": "bakery-food",
                    "name": "Almond Butter Croissant",
                    "price": "₹190",
                    "description": "Flaky French butter croissant filled with homemade almond frangipane and topped with toasted almonds.",
                    "tags": ["Bakery", "Fresh"],
                    "is_signature": False,
                    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
                }
            ]
        },
        "brew_calculator": {
            "badge": "BARISTA CALCULATOR",
            "title": "Dial-In Your Perfect Brew Ratio",
            "subtitle": "Select your brewing method to calculate exact bean weight and water proportions.",
            "methods": [
                {
                    "id": "v60",
                    "name": "Hario V60 Pour-Over",
                    "default_ratio": 16,
                    "ratio_display": "1:16",
                    "grind_size": "Medium-Fine",
                    "water_temp": "93°C",
                    "brew_time": "3:00 min",
                    "grind_microns": "600µm",
                    "description": "Accentuates delicate floral aromas and sparkling acidity.",
                    "steps": [
                        { "time": "0:00", "action": "Bloom with 50g water", "water_pct": 16, "tip": "Swirl gently" },
                        { "time": "0:45", "action": "Main center pour to 200g", "water_pct": 60, "tip": "Gentle spiral pour" },
                        { "time": "1:45", "action": "Final pour to target weight", "water_pct": 100, "tip": "Drawdown finishes at 3:00" }
                    ]
                },
                {
                    "id": "french-press",
                    "name": "French Press (Immersion)",
                    "default_ratio": 14,
                    "ratio_display": "1:14",
                    "grind_size": "Coarse",
                    "water_temp": "94°C",
                    "brew_time": "4:30 min",
                    "grind_microns": "900µm",
                    "description": "Rich, heavy-bodied brew with deep chocolate and caramel tones.",
                    "steps": [
                        { "time": "0:00", "action": "Pour all water rapidly", "water_pct": 100, "tip": "Ensure grounds are submerged" },
                        { "time": "4:00", "action": "Break the crust with spoon", "water_pct": 100, "tip": "Skim surface foam" },
                        { "time": "4:30", "action": "Gently press filter down", "water_pct": 100, "tip": "Pour immediately into cups" }
                    ]
                }
            ],
            "default_method": "v60",
            "default_coffee_grams": 18,
            "min_grams": 12,
            "max_grams": 40,
            "step_grams": 2,
            "tips": [
                "Always use fresh, filtered drinking water.",
                "Rinse your paper filter with hot water before adding ground coffee.",
                "Pour slowly in concentric circles, avoiding the paper walls."
            ]
        },
        "atmosphere_gallery": {
            "badge": "CAFE AMBIANCE",
            "title": "A Sanctuary For Coffee & Creativity",
            "subtitle": "Sun-drenched corners, indoor greens, power outlets at every desk, and soft jazz vinyl records.",
            "ambience_audio_label": "NOW PLAYING: VINTAGE BOSSA NOVA",
            "images": [
                {
                    "url": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
                    "title": "Cozy Seating Corner",
                    "subtitle": "Ideal for afternoon reading and deep conversations",
                    "aspect": "aspect-square",
                    "tag": "SANCTUARY"
                },
                {
                    "url": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
                    "title": "Live Espresso Bar",
                    "subtitle": "Watch our baristas dial in fresh roasts",
                    "aspect": "aspect-[4/3]",
                    "tag": "ESPRESSO"
                },
                {
                    "url": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800&auto=format&fit=crop",
                    "title": "Outdoor Green Courtyard",
                    "subtitle": "Breezy shaded open-air seating",
                    "aspect": "aspect-square",
                    "tag": "OUTDOOR"
                },
                {
                    "url": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800&auto=format&fit=crop",
                    "title": "Bakery & Sourdough Display",
                    "subtitle": "Fresh batches pulled hot at 8:00 AM daily",
                    "aspect": "aspect-[4/3]",
                    "tag": "BAKERY"
                }
            ]
        },
        "cupping_events": {
            "badge": "WEEKEND SESSIONS",
            "title": "Public Coffee Cuppings & Workshops",
            "subtitle": "Join our head roaster to taste, evaluate, and learn about specialty bean varieties.",
            "events": [
                {
                    "id": "event-01",
                    "title": "Indian Specialty Coffee Tasting Flight",
                    "date": "Every Saturday",
                    "time": "11:00 AM — 12:30 PM",
                    "host": "Head Barista",
                    "seats_total": 8,
                    "seats_left": 4,
                    "price": "₹499 / person",
                    "description": "Blind tasting of 5 distinct single-origin Indian coffees. Learn flavor wheels, aroma identification, and extraction nuances.",
                    "flight_origins": ["Chikmagalur", "Coorg", "Araku Valley", "Wayanad"],
                    "includes": ["5-Cup Tasting Flight", "Sensory Aroma Wheel Card", "Complimentary Sourdough Croissant"],
                    "is_sold_out": False
                }
            ],
            "rsvp_cta_text": "Reserve Tasting Seat"
        },
        "testimonials": {
            "badge": "GUEST WORDS",
            "title": "Loved By Coffee Lovers & Remote Professionals",
            "subtitle": "What our daily regulars and specialty coffee enthusiasts have to say.",
            "reviews": [
                {
                    "author": "Rohan Deshpande",
                    "role": "Software Architect & Daily Regular",
                    "quote": "Easily the best flat white in Pune. Fantastic high-speed WiFi, plenty of charging sockets, and staff who genuinely care about the coffee they serve.",
                    "rating": 5,
                    "favorite_order": "Oat Flat White & Cinnamon Roll"
                },
                {
                    "author": "Ananya Sen",
                    "role": "Food & Lifestyle Writer",
                    "quote": "A hidden gem! The sourdough avocado toast is top notch and the cold brew is silky smooth without any harsh bitterness.",
                    "rating": 5,
                    "favorite_order": "Cascara Cold Brew & Almond Croissant"
                }
            ]
        },
        "visit_booking": {
            "badge": "VISIT & RESERVATIONS",
            "title": "Find Us & Reserve Your Table",
            "subtitle": "Walk in anytime or book ahead for weekend brunches, meetings, or quiet work sessions.",
            "address": "Lane 5, Koregaon Park, Pune, Maharashtra 411001",
            "neighborhood": "Koregaon Park / Pune",
            "transit_notes": "Valet parking available · 2 min walk from North Main Road",
            "opening_hours": [
                { "days": "MONDAY — FRIDAY", "hours": "08:00 AM — 11:00 PM" },
                { "days": "SATURDAY — SUNDAY", "hours": "08:00 AM — 11:30 PM" }
            ],
            "amenities": [
                { "icon": "Wifi", "label": "High-Speed WiFi (300 Mbps)" },
                { "icon": "Zap", "label": "Power Outlets At Tables" },
                { "icon": "Coffee", "label": "Dairy-Free Oat & Almond Milk" },
                { "icon": "Car", "label": "Valet & 2-Wheeler Parking" }
            ],
            "phone": "+91 98220 54321",
            "email": "hello@punecafe.in",
            "whatsapp_number": "919822054321",
            "whatsapp_message_prefix": "Hello! I would like to reserve a table at the cafe.",
            "instagram_handle": "@artisancafepune",
            "instagram_url": "https://instagram.com",
            "booking_form": {
                "title": "RESERVE A TABLE",
                "description": "Let us know your preferred date, time, and party size. We'll hold your spot.",
                "occasions": [
                    "Casual Coffee & Work",
                    "Breakfast / Brunch Date",
                    "Business / Team Meeting",
                    "Special Celebration"
                ],
                "submit_text": "Confirm Reservation via WhatsApp →",
                "disclaimer": "Reservations are held for 15 minutes past scheduled time."
            }
        },
        "sticky_order_bar": {
            "lot_announcement": "FRESHLY ROASTED CHIKMAGALUR BEANS AVAILABLE IN-STORE & ONLINE",
            "origin_badge": "SPECIALTY ROAST",
            "cta_text": "ORDER BEANS VIA WHATSAPP →",
            "cta_href": "#visit",
            "secondary_cta_text": "VIEW MENU",
            "secondary_cta_href": "#menu"
        },
        "footer": {
            "brand_bio": "An artisanal specialty coffee roastery and bistro dedicated to transparent single-origin Indian coffees and wholesome bakery craft.",
            "newsletter": {
                "title": "Join Our Coffee Circle",
                "subtitle": "Receive invitations to weekly cupping workshops and fresh batch roast releases.",
                "placeholder": "Enter your email address",
                "button_text": "Subscribe",
                "success_text": "Welcome to the coffee circle!"
            },
            "navigation_columns": [
                {
                    "title": "EXPLORE",
                    "links": [
                        { "label": "Specialty Menu", "href": "#menu" },
                        { "label": "Brewing Ratios", "href": "#calculator" },
                        { "label": "Ambiance Tour", "href": "#gallery" }
                    ]
                },
                {
                    "title": "CONNECT",
                    "links": [
                        { "label": "Table Reservations", "href": "#visit" },
                        { "label": "Order On WhatsApp", "href": "#visit" },
                        { "label": "Instagram", "href": "https://instagram.com" }
                    ]
                }
            ],
            "roast_registry_stamp": "ROASTED WEEKLY IN PUNE, MH",
            "copyright": "© 2026 THE DAILY ROAST & BISTRO. ALL RIGHTS RESERVED."
        }
    }

def get_salon_fallback():
    return {
        "category_id": "salons",
        "category_label": "Hair Salons & Styling Ateliers",
        "branding": {
            "business_name": "Luxe Hair Atelier & Spa",
            "subtitle": "Haute Coiffure & Luxury Hair Treatments",
            "tagline": "Precision Cuts, Bespoke Balayage & Botanical Care",
            "established_year": "2019",
            "location_short": "Pune, Maharashtra",
            "primary_color": "#B86B4F",
            "secondary_color": "#EDE8E0",
            "canvas_color": "#F7F4EE",
            "text_color": "#1C1815",
            "bronze_color": "#C4A47C",
            "hero_headline": {
                "line1": "Effortless Elegance,",
                "line2_italic": "Sculpted With Precision."
            },
            "hero_subheadline": "Pune's premier hair destination for customized balayage, corrective color, keratin smoothing, and relaxing scalp therapy in an intimate, aesthetic sanctuary.",
            "hero_image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
            "hero_accolade": {
                "publication": "Vogue Beauty & Lifestyle",
                "badge_text": "BEST LUXURY SALON EXPERIENCE",
                "rating_label": "Top Rated Atelier in Pune",
                "stars": 5
            },
            "hero_live_status": {
                "indicator": "OPEN TODAY",
                "available_slot": "Next Available Appointment: Today at 3:30 PM"
            },
            "hero_ctas": {
                "primary": {
                    "text": "Book Appointment Online",
                    "href": "#booking",
                    "subtext": "Instant slot reservation via WhatsApp"
                },
                "secondary": {
                    "text": "Explore Services & Rates",
                    "href": "#services",
                    "subtext": "Haircut, color, keratin & treatments"
                }
            },
            "hero_metrics": [
                { "value": "12,000+", "label": "Client Transformations", "description": "Over 5 years of trusted craftsmanship" },
                { "value": "100%", "label": "Ammonia-Free Colors", "description": "L'Oréal Professionnel & Olaplex certified" },
                { "value": "4.9 ★", "label": "Google Reviews Rating", "description": "From 1,200+ verified Pune clients" }
            ]
        },
        "navigation": {
            "nav_links": [
                { "label": "Atelier Manifesto", "href": "#manifesto" },
                { "label": "Services Ledger", "href": "#services" },
                { "label": "Lookbook", "href": "#lookbook" },
                { "label": "Master Stylists", "href": "#masters" },
                { "label": "Client Reviews", "href": "#reviews" },
                { "label": "Book Appointment", "href": "#booking" }
            ],
            "cta_button_text": "RESERVE APPOINTMENT",
            "cta_button_target": "#booking",
            "phone_display": "+91 98230 98765",
            "phone_tel": "tel:+919823098765"
        },
        "manifesto": {
            "badge": "THE ATELIER PHILOSOPHY",
            "title": "Hair Architecture Engineered Around Your Natural Texture & Face Shape.",
            "lead": "We reject rushed, assembly-line haircuts. Every appointment begins with an in-depth 15-minute consultation to understand your lifestyle, hair porosity, and daily routine.",
            "body": "Using gentle sulfate-free washes, precision British cutting techniques, and customized Parisian balayage blends, we enhance your natural beauty rather than fighting against it.",
            "pillars": [
                {
                    "id": "p-01",
                    "roman_num": "I",
                    "title": "Consultative Diagnosis",
                    "description": "Thorough assessment of hair density, scalp health, and facial contours before shears touch your hair."
                },
                {
                    "id": "p-02",
                    "roman_num": "II",
                    "title": "Bond-Protecting Chemistry",
                    "description": "Every lightening and coloring session is infused with Olaplex to preserve cuticle strength and shine."
                },
                {
                    "id": "p-03",
                    "roman_num": "III",
                    "title": "Acoustic Tranquility",
                    "description": "A calm, clutter-free studio environment designed for sensory relaxation with gourmet tea and coffee."
                }
            ]
        },
        "services_ledger": {
            "badge": "SERVICES & MENU",
            "title": "Editorial Hair & Scalp Services",
            "subtitle": "Transparent tiered pricing based on stylist experience and hair length.",
            "categories": [
                {
                    "id": "cuts-styling",
                    "name": "Cuts & Blowouts",
                    "items": [
                        { "name": "Signature Precision Haircut & Styling", "description": "Includes sensory wash, scalp massage, tailored haircut, and bouncy blowout.", "duration": "60 min", "price": "₹1,200", "tag": "Popular" },
                        { "name": "Director's Bespoke Restyle", "description": "Complete transformation haircut with our Creative Director.", "duration": "75 min", "price": "₹2,000", "tag": "Signature" },
                        { "name": "Glamour Blowout & Tong Waves", "description": "Volumizing wash, blast dry, and Hollywood/beach waves.", "duration": "45 min", "price": "₹800", "tag": "Event Ready" }
                    ]
                },
                {
                    "id": "color-balayage",
                    "name": "Bespoke Color & Balayage",
                    "items": [
                        { "name": "French Sun-Kissed Balayage", "description": "Hand-painted dimensional highlights, toner gloss, and Olaplex treatment.", "duration": "180 min", "price": "₹6,500", "tag": "Signature" },
                        { "name": "Global Color & Ammonia-Free Gloss", "description": "Full coverage rich tonal coloring with high-shine seal.", "duration": "90 min", "price": "₹3,500", "tag": "Essential" },
                        { "name": "Root Touch-Up & Tone Refresh", "description": "Seamless gray blending and root color re-growth maintenance.", "duration": "60 min", "price": "₹1,800", "tag": "Maintenance" }
                    ]
                },
                {
                    "id": "treatments-spa",
                    "name": "Hair Spa & Texture Treatments",
                    "items": [
                        { "name": "Brazilian Keratin Smoothing Therapy", "description": "Eliminates frizz, restores protein structure, and cuts blow-dry time by 70%.", "duration": "150 min", "price": "₹5,999", "tag": "Frizz-Free" },
                        { "name": "Deep Hydration Kérastase Caviar Spa", "description": "Intense moisture infusion with micro-mist steam and neck massage.", "duration": "60 min", "price": "₹2,400", "tag": "Relaxation" }
                    ]
                }
            ]
        },
        "lookbook_gallery": {
            "badge": "OUR PORTFOLIO",
            "title": "Curated Lookbook Masonry",
            "subtitle": "Recent client transformations captured in natural studio daylight.",
            "images": [
                {
                    "url": "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
                    "title": "Studio Interior & Styling Bays",
                    "tag": "SANCTUARY",
                    "stylist": "Main Floor"
                },
                {
                    "url": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
                    "title": "Relaxing Hair Spa Station",
                    "tag": "SPA LOUNGE",
                    "stylist": "Scalp Therapy"
                },
                {
                    "url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop",
                    "title": "Caramel Dimension Balayage",
                    "tag": "BALAYAGE",
                    "stylist": "Senior Colorist"
                },
                {
                    "url": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop",
                    "title": "Textured Bob & Blowout",
                    "tag": "PRECISION CUT",
                    "stylist": "Creative Director"
                }
            ]
        },
        "masters": {
            "badge": "OUR ARTISANS",
            "title": "Master Stylists & Colorists",
            "subtitle": "Trained across Vidal Sassoon and L'Oréal academies with extensive editorial experience.",
            "stylists": [
                {
                    "name": "Sameer Khan",
                    "role": "Creative Director & Cut Specialist",
                    "experience": "12 Years Experience",
                    "specialty": "Short Hair Architectures & Precision Bobs",
                    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                },
                {
                    "name": "Priyanka Roy",
                    "role": "Lead Master Colorist",
                    "experience": "8 Years Experience",
                    "specialty": "French Balayage & Complex Color Correction",
                    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
                }
            ]
        },
        "testimonials": {
            "badge": "CLIENT REVIEWS",
            "title": "Words From Our Valued Patrons",
            "subtitle": "Over 1,200 5-star ratings across Google and Instagram.",
            "reviews": [
                {
                    "client_name": "Rhea Kapoor",
                    "service_rendered": "Bespoke Balayage & Olaplex Spa",
                    "quote": "I have had bad color experiences elsewhere, but Priyanka took the time to understand exactly what I wanted. My hair has never felt so healthy and the color blend is stunning!",
                    "rating": 5
                },
                {
                    "client_name": "Aditya Varma",
                    "service_rendered": "Director's Haircut & Beard Trim",
                    "quote": "Hands down the best salon in Pune. Precise scissor work, zero rushing, and a very relaxing ambiance. Highly recommended!",
                    "rating": 5
                }
            ]
        },
        "booking_concierge": {
            "badge": "APPOINTMENTS",
            "title": "Reserve Your Atelier Chair",
            "subtitle": "Book online or message our front desk concierge directly via WhatsApp.",
            "address": "Level 1, Phoenix Marketcity Area, Viman Nagar, Pune, Maharashtra 411014",
            "phone": "+91 98230 98765",
            "whatsapp_number": "919823098765",
            "whatsapp_message_prefix": "Hello! I would like to book a salon appointment.",
            "email": "concierge@luxesalon.in",
            "instagram_handle": "@luxesalonpune",
            "instagram_url": "https://instagram.com",
            "opening_hours": [
                { "days": "TUESDAY — SUNDAY", "hours": "10:00 AM — 08:30 PM" },
                { "days": "MONDAY", "hours": "CLOSED FOR TRAINING" }
            ],
            "booking_form": {
                "title": "REQUEST APPOINTMENT",
                "description": "Choose your desired service and preferred slot. We will confirm via WhatsApp within 30 minutes.",
                "services": [
                    "Precision Haircut & Blowout",
                    "Custom Balayage / Global Color",
                    "Keratin Smoothing Treatment",
                    "Hydrating Hair Spa & Scalp Detox"
                ],
                "submit_text": "Confirm on WhatsApp →"
            }
        },
        "sticky_concierge_bar": {
            "headline": "COMPLIMENTARY OLAPLEX TREATMENT WITH EVERY BALAYAGE THIS MONTH",
            "badge": "LIMITED OFFERS",
            "cta_text": "BOOK ON WHATSAPP →",
            "cta_href": "#booking"
        },
        "footer": {
            "brand_bio": "Luxe Hair Atelier is dedicated to the art of bespoke hair sculpting, non-damaging color, and serene personal care in Pune.",
            "copyright": "© 2026 LUXE HAIR ATELIER. ALL RIGHTS RESERVED."
        }
    }

def get_coaching_fallback():
    return {
        "category_id": "coaching classes/tuition centers",
        "category_label": "Coaching Classes & Tuition Centers",
        "branding": {
            "business_name": "Apex Academy & Tutoring Institute",
            "tagline": "Concept Clarity, Rigorous Practice, Proven Ranks",
            "hero_headline": "Empowering Pune's Brightest Minds For Board & Competitive Excellence",
            "hero_subheadline": "Top-tier coaching for 8th to 12th Standard, CBSE, ICSE, State Board, JEE Main & NEET. Small batch sizes, experienced faculty, and weekly performance analytics.",
            "primary_color": "#1E40AF",
            "secondary_color": "#0F172A",
            "canvas_color": "#F8FAFC",
            "accent_color": "#F59E0B",
            "hero_image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
            "badge": "ADMISSIONS OPEN FOR 2026-27 ACADEMIC YEAR"
        },
        "stats": [
            { "value": "98.4%", "label": "Board Pass Rate" },
            { "value": "15:1", "label": "Student-Faculty Ratio" },
            { "value": "500+", "label": "JEE & NEET Selections" },
            { "value": "12+ Yrs", "label": "Excellence in Pune" }
        ],
        "about": {
            "title": "Why Pune's Top Students Choose Apex Academy",
            "subtitle": "Education that bridges the gap between rote memorization and true conceptual mastery.",
            "paragraphs": [
                "Founded by dedicated educators from premier Indian institutes, Apex Academy provides a disciplined yet encouraging environment where every student receives individual attention.",
                "Our scientifically designed curriculum includes topic-wise concept lectures, daily practice problem sheets (DPPs), bi-weekly simulated mock exams, and dedicated one-on-one doubt resolution hours."
            ],
            "features": [
                "Small Batches Capped at 20 Students",
                "Weekly Chapter-Wise Unit Tests & Report Cards",
                "Regular Parent-Teacher Progress Meetings",
                "AC Smart Classrooms with Digital Concept Boards",
                "Comprehensive Printed Study Modules Included"
            ]
        },
        "courses": [
            {
                "id": "c-01",
                "title": "Class 11 & 12: JEE Main + Advanced + Board",
                "category": "Engineering Entrance",
                "grade": "11th & 12th Science",
                "duration": "2 Years Intensive",
                "fee": "₹65,000 / year",
                "description": "Comprehensive Physics, Chemistry, and Mathematics training covering both 100% Board syllabus and rigorous JEE problem solving.",
                "highlights": ["300+ Hours Live Lectures", "50+ Full-Length All-India Mock Tests", "Daily Doubt Solving Sessions"],
                "image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
            },
            {
                "id": "c-02",
                "title": "Class 11 & 12: NEET Medical Prep + Board",
                "category": "Medical Entrance",
                "grade": "11th & 12th Science",
                "duration": "2 Years Intensive",
                "fee": "₹70,000 / year",
                "description": "Deep NCERT-focused Biology, Physics, and Chemistry mentoring with speed-enhancement test techniques for top government medical seats.",
                "highlights": ["100% NCERT Line-by-Line Mastery", "OMR Pattern Practice Tests", "Personal Mentor Assigned"],
                "image": "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
            },
            {
                "id": "c-03",
                "title": "Class 8th, 9th & 10th: Foundation & Board Excellence",
                "category": "School Board Foundation",
                "grade": "8th to 10th (CBSE / ICSE / SSC)",
                "duration": "1 Year Academic Program",
                "fee": "₹35,000 / year",
                "description": "Strong foundational grounding in Science, Mathematics, and English to secure 95%+ in Board examinations and Olympiads.",
                "highlights": ["Concept-First Methodology", "Previous 10 Years Board Papers Solving", "Periodic Revision Bootcamps"],
                "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
            },
            {
                "id": "c-04",
                "title": "Class 11 & 12: Commerce & CA Foundation",
                "category": "Commerce Stream",
                "grade": "11th & 12th Commerce",
                "duration": "1 or 2 Year Program",
                "fee": "₹45,000 / year",
                "description": "Accounts, Economics, Business Studies, and Applied Math taught by practicing Chartered Accountants and subject toppers.",
                "highlights": ["Practical Financial Case Studies", "CA Foundation Integrated Prep", "Answer Writing Technique Workshops"],
                "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop"
            }
        ],
        "gallery": [
            { "url": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop", "title": "Interactive Lecture Hall", "tag": "Classroom" },
            { "url": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop", "title": "Quiet Reading & Study Library", "tag": "Library" },
            { "url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop", "title": "Digital Smart Board Technology", "tag": "Technology" },
            { "url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop", "title": "Peer Discussion & Doubt Circles", "tag": "Mentorship" },
            { "url": "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop", "title": "1-on-1 Faculty Mentorship", "tag": "Faculty" },
            { "url": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop", "title": "Comprehensive Study Materials", "tag": "Curriculum" }
        ],
        "faculty": [
            { "name": "Prof. S. R. Kulkarni", "degree": "M.Tech, IIT Bombay", "subject": "Physics HOD", "experience": "14 Yrs Experience" },
            { "name": "Dr. Meera Nambiar", "degree": "Ph.D. Organic Chemistry", "subject": "Chemistry Faculty", "experience": "11 Yrs Experience" },
            { "name": "Prof. Vikas Deshmukh", "degree": "M.Sc. Mathematics (Gold Medalist)", "subject": "Mathematics Lead", "experience": "12 Yrs Experience" }
        ],
        "testimonials": [
            {
                "student": "Aryan Patil",
                "achievement": "Scored 99.2 Percentile in JEE Main",
                "quote": "The doubt sessions at Apex made all the difference. The teachers are approachable and never hesitate to explain difficult concepts multiple times until you understand."
            },
            {
                "student": "Tanvi Joshi",
                "achievement": "96.4% in CBSE Class 10 Board",
                "quote": "Joining in 9th grade gave me tremendous confidence in Math and Science. The test series helped eliminate all exam fear before the actual boards."
            }
        ],
        "contact": {
            "phone": "+91 98900 11223",
            "whatsapp_number": "919890011223",
            "whatsapp_message": "Hello! I want to enquire about batch timings and scholarship admission test.",
            "email": "admissions@apexacademy.in",
            "address": "2nd Floor, Knowledge Point, Paud Road, Kothrud, Pune, Maharashtra 411038",
            "opening_hours": [
                { "days": "Monday – Saturday", "hours": "08:00 AM – 08:30 PM" },
                { "days": "Sunday", "hours": "09:00 AM – 02:00 PM (Test Sessions)" }
            ],
            "inquiry_form": {
                "title": "Book a Free Demo Lecture & Diagnostic Test",
                "description": "Experience our teaching firsthand. Attend any ongoing subject class for free.",
                "submit_text": "Register For Free Demo Class →"
            }
        },
        "footer": {
            "copyright": "© 2026 APEX ACADEMY PUNE. ALL RIGHTS RESERVED."
        }
    }

def get_generic_category_fallback(cat_id, label, tagline, headline, subheadline, color, hero_img, services, gallery, tiers, reviews, address_lead):
    return {
        "category_id": cat_id,
        "category_label": label,
        "branding": {
            "business_name": f"Elite {label} Studio",
            "tagline": tagline,
            "hero_headline": headline,
            "hero_subheadline": subheadline,
            "primary_color": color,
            "secondary_color": "#1E293B",
            "canvas_color": "#FFFFFF",
            "hero_image": hero_img,
            "badge": f"PREMIER {label.upper()} IN PUNE"
        },
        "about": {
            "title": f"Dedicated To Excellence in {label}",
            "subtitle": "Combining years of expertise, premium quality standards, and personalized client attention.",
            "paragraphs": [
                f"We are one of Pune's most trusted destinations for {label.lower()}, committed to delivering exceptional craftsmanship and unmatched service satisfaction.",
                "Our team focuses on your unique requirements, using industry-leading methodologies and transparent communication from consultation to completion."
            ],
            "highlights": [
                "Proven Track Record & Verified Client Satisfaction",
                "Transparent Pricing With Zero Hidden Charges",
                "Experienced Team of Industry Professionals",
                "Convenient Location & Prompt Customer Support"
            ]
        },
        "services": services,
        "gallery": gallery,
        "pricing_tiers": tiers,
        "testimonials": reviews,
        "contact": {
            "phone": "+91 98220 99887",
            "whatsapp_number": "919822099887",
            "whatsapp_message": f"Hello, I would like to enquire about your {label.lower()} services.",
            "email": f"info@{cat_id.replace(' ', '').replace('/', '')}.in",
            "address": f"{address_lead}, Pune, Maharashtra 411001",
            "opening_hours": [
                { "days": "Monday – Saturday", "hours": "10:00 AM – 08:00 PM" },
                { "days": "Sunday", "hours": "11:00 AM – 05:00 PM" }
            ],
            "inquiry_form": {
                "title": "Request a Free Consultation / Quote",
                "description": "Send us your requirement and our team will get in touch within 2 hours.",
                "submit_text": "Send Inquiry via WhatsApp →"
            }
        },
        "footer": {
            "copyright": f"© 2026 ELITE {label.upper()}. ALL RIGHTS RESERVED."
        }
    }

def main():
    # 1. Gym
    with open('templates/gym/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(get_gym_fallback(), f, indent=2)
    print("Created templates/gym/fallback_content.json")

    # 2. Cafe
    with open('templates/cafe/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(get_cafe_fallback(), f, indent=2)
    print("Created templates/cafe/fallback_content.json")

    # 3. Salon
    with open('templates/salon/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(get_salon_fallback(), f, indent=2)
    print("Created templates/salon/fallback_content.json")

    # 4. Coaching
    with open('templates/coaching/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(get_coaching_fallback(), f, indent=2)
    print("Created templates/coaching/fallback_content.json")

    # 5. Restaurant
    rest = get_generic_category_fallback(
        "restaurants", "Fine Dining & Family Restaurant",
        "Authentic Regional Flavors, Warm Hospitality & Memorable Evenings",
        "A Symphony of Authentic Flavors & Warm Indian Hospitality",
        "Experience traditional recipes cooked with freshly ground spices, slow dum cooking, and warm family ambiance in the heart of Pune.",
        "#B91C1C", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Dum Handi Murgh / Mutton Biryani", "description": "Slow-cooked fragrant basmati rice layered with tender meat, saffron, and fried onions.", "price": "₹380 - ₹460", "tag": "Chef Special" },
            { "name": "Paneer Butter Masala & Dal Makhani", "description": "Rich tomato butter gravy simmered overnight over slow charcoal with warm garlic naan.", "price": "₹320 - ₹340", "tag": "Vegetarian Classic" },
            { "name": "Tandoori Chicken & Kebab Platter", "description": "Smoky char-grilled chicken marinated in hung curd, Kashmiri chili, and roasted kasuri methi.", "price": "₹420", "tag": "Tandoor" },
            { "name": "Signature Kulfi & Gulab Jamun Sundae", "description": "Warm rabdi with traditional saffron kulfi and roasted pistachio crunch.", "price": "₹180", "tag": "Dessert" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", "title": "Elegant Dining Hall", "tag": "Ambiance" },
            { "url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", "title": "Fine Dining Table Setting", "tag": "Interior" },
            { "url": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop", "title": "Dum Biryani Handi", "tag": "Specialty" },
            { "url": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop", "title": "Tandoori Platter & Naan", "tag": "Starters" },
            { "url": "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop", "title": "Master Chef Plating", "tag": "Kitchen" },
            { "url": "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=800&auto=format&fit=crop", "title": "Handcrafted Mocktail Bar", "tag": "Beverages" }
        ],
        [
            { "name": "Lunch Express Thali", "price": "₹280", "billing": "per person", "features": ["3 Curries", "Dal", "Rotis", "Rice", "Dessert"] },
            { "name": "Grand Royal Family Feast", "price": "₹1,899", "billing": "serves 4-5", "features": ["Assorted Starters", "2 Gravies", "Biryani Handi", "Breads & Desserts"] },
            { "name": "Weekend Buffet Experience", "price": "₹699", "billing": "per adult", "features": ["Unlimited Starters", "12 Main Courses", "Live Chaat & Dessert Counter"] }
        ],
        [
            { "author": "Vikram Malhotra", "quote": "The mutton biryani here is phenomenal. Authentic taste, generous portions, and courteous service.", "rating": 5 },
            { "author": "Neha Sharma", "quote": "Hosted a family get-together of 25 people. Everyone raved about the paneer tikka and dal makhani!", "rating": 5 }
        ],
        "FC Road, Shivajinagar"
    )
    with open('templates/restaurant/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(rest, f, indent=2)
    print("Created templates/restaurant/fallback_content.json")

    # 6. Wedding Photographers
    wp = get_generic_category_fallback(
        "wedding photographers", "Wedding & Candid Photography",
        "Capturing Timeless Love Stories & Raw Candid Emotions",
        "Frames That Turn Your Wedding Memories Into Timeless Art",
        "We specialize in heartfelt candid moments, royal bridal portraits, and cinematic wedding films that let you relive your special day forever.",
        "#BE185D", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Candid Wedding Photography", "description": "Unobtrusive capture of spontaneous emotions, tears of joy, and laughter throughout all ceremonies.", "price": "From ₹45,000 / day", "tag": "Core" },
            { "name": "Cinematic Wedding Film & Teaser", "description": "4K cinematic highlight film, drone aerial shots, and personalized narrative storytelling.", "price": "From ₹60,000 / day", "tag": "Cinematic" },
            { "name": "Pre-Wedding Couple Shoot", "description": "Styled outdoor couple photoshoot at picturesque locations in and around Pune & Lonavala.", "price": "₹25,000", "tag": "Pre-Wedding" },
            { "name": "Traditional Rituals & Family Formals", "description": "Complete stage coverage, family group portraits, and cultural ceremony documentation.", "price": "From ₹30,000 / day", "tag": "Complete" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", "title": "Couple Sunset Portrait", "tag": "Couple" },
            { "url": "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop", "title": "Mehndi Ceremony Details", "tag": "Mehndi" },
            { "url": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", "title": "Mandap & Sacred Vows", "tag": "Ceremony" },
            { "url": "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop", "title": "Varmala Garland Exchange", "tag": "Ritual" },
            { "url": "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop", "title": "Outdoor Pre-Wedding", "tag": "Pre-Wedding" },
            { "url": "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=800&auto=format&fit=crop", "title": "Emotional Candid Moments", "tag": "Candid" }
        ],
        [
            { "name": "Silver Package (1 Day)", "price": "₹75,000", "billing": "Single Day", "features": ["1 Candid Photographer", "1 Traditional Photographer", "Edited High-Res Gallery", "30-Page Premium Album"] },
            { "name": "Gold 2-Day Package", "price": "₹1,50,000", "billing": "2 Days Coverage", "features": ["2 Candid Photographers", "Cinematographer + Drone", "3-5 Min Highlight Film", "2 Luxury Leather Photo Books"] },
            { "name": "Platinum Royal Package", "price": "₹2,40,000", "billing": "3 Days + Pre-Wedding", "features": ["Complete 3-Day Crew", "Pre-Wedding Shoot Included", "Same-Day Edit Reel", "3 Luxury Heirloom Albums"] }
        ],
        [
            { "author": "Siddharth & Shruti", "quote": "They captured our wedding so naturally without forcing awkward poses. The video teaser brought tears to our eyes!", "rating": 5 },
            { "author": "Karan & Megha", "quote": "Extremely professional team, arrived on time for all events, and delivered our edited albums well before the promised date.", "rating": 5 }
        ],
        "Koregaon Park"
    )
    with open('templates/wedding_photographer/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(wp, f, indent=2)
    print("Created templates/wedding_photographer/fallback_content.json")

    # 7. Dentist
    dent = get_generic_category_fallback(
        "dentists", "Dental Clinic & Implant Center",
        "Gentle Dental Care, Invisible Aligners & Lasting Healthy Smiles",
        "Advanced Painless Dentistry With Modern Digital Precision",
        "From routine cleanings to painless root canals, dental implants, and clear aligners, our multispecialty clinic ensures you smile with confidence.",
        "#0284C7", "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Painless Single-Sitting Root Canal (RCT)", "description": "Rotary endodontic technology with digital apex locator for zero discomfort and quick recovery.", "price": "₹3,500 - ₹5,500", "tag": "Restorative" },
            { "name": "Clear Aligners & Invisible Braces", "description": "Custom 3D scanned invisible aligners to straighten teeth discreetly without metal wires.", "price": "From ₹45,000", "tag": "Orthodontics" },
            { "name": "Dental Implants & Fixed Teeth", "description": "Titanium implants with biocompatible zirconia crowns designed to last a lifetime.", "price": "₹25,000 / implant", "tag": "Implantology" },
            { "name": "Teeth Whitening & Ultrasonic Scaling", "description": "Deep stain removal, plaque scaling, and laser teeth whitening for an instantly brighter smile.", "price": "₹1,500 - ₹6,000", "tag": "Cosmetic" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop", "title": "Modern Dental Operatory", "tag": "Clinic" },
            { "url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop", "title": "Precision Dental Instruments", "tag": "Technology" },
            { "url": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop", "title": "Gentle Patient Consultation", "tag": "Care" },
            { "url": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop", "title": "Clear Aligner Checkup", "tag": "Aligners" },
            { "url": "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800&auto=format&fit=crop", "title": "Hospital-Grade Sterilization", "tag": "Hygiene" },
            { "url": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop", "title": "Confident Healthy Smile", "tag": "Outcome" }
        ],
        [
            { "name": "Preventive Dental Checkup", "price": "₹500", "billing": "One-time", "features": ["Full Mouth Digital X-Ray", "Cavity & Gum Inspection", "Custom Treatment Plan"] },
            { "name": "Smile Makeover Package", "price": "₹12,000", "billing": "Complete", "features": ["Full Scaling & Polishing", "In-Clinic Laser Whitening", "Fluoride Protective Seal"] },
            { "name": "Family Dental Health Plan", "price": "₹2,500", "billing": "Annual (4 members)", "features": ["2 Free Checkups Per Member", "Free Scaling & Polishing", "15% Off All Procedures"] }
        ],
        [
            { "author": "Rajiv Nene", "quote": "I was terrified of root canals, but the doctor made the entire procedure completely painless. Truly grateful!", "rating": 5 },
            { "author": "Pooja Mehta", "quote": "Got clear aligners done here. In 7 months my teeth are completely straight without any metal braces showing.", "rating": 5 }
        ],
        "Baner Road, Baner"
    )
    with open('templates/dentist/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(dent, f, indent=2)
    print("Created templates/dentist/fallback_content.json")

    # 8. Beauty Studio
    beauty = get_generic_category_fallback(
        "beauty studios", "Bridal Makeup & Beauty Studio",
        "HD Bridal Glam, Rejuvenating Facials & Luxury Skin Therapy",
        "Flawless Bridal Artistry & Rejuvenating Skin Therapies",
        "Pune's premier beauty studio for airbrush bridal makeup, customized skincare facials, microblading, and pre-bridal pampering.",
        "#E11D48", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "HD & Airbrush Bridal Makeup", "description": "Long-wearing sweat-proof bridal makeup using high-end brands (MAC, Huda, Charlotte Tilbury) including hair styling and draping.", "price": "₹15,000 - ₹25,000", "tag": "Bridal Special" },
            { "name": "Hydra-Facial & Glow Therapy", "description": "Deep suction pore extraction, hyaluronic acid serum infusion, and oxygen peel for glowing skin.", "price": "₹3,500", "tag": "Skincare" },
            { "name": "Party & Engagement Makeup", "description": "Soft glam makeup with natural lashes, contouring, and elegant modern hairstyle.", "price": "₹4,500", "tag": "Party Glam" },
            { "name": "Microblading & Lash Extensions", "description": "Semi-permanent feather stroke eyebrow tattooing and classic Korean eyelash extensions.", "price": "₹6,000 - ₹12,000", "tag": "Lash & Brow" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop", "title": "Makeup Artistry in Action", "tag": "Bridal" },
            { "url": "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", "title": "Luxury Makeup Vanity", "tag": "Studio" },
            { "url": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop", "title": "Deep Hydrating Facial", "tag": "Skincare" },
            { "url": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop", "title": "Bridal Transformation", "tag": "Glam" },
            { "url": "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800&auto=format&fit=crop", "title": "Lash & Brow Studio", "tag": "Enhancements" },
            { "url": "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?q=80&w=800&auto=format&fit=crop", "title": "Radiant Skin Portrait", "tag": "Glow" }
        ],
        [
            { "name": "Pre-Bridal Glow Package", "price": "₹8,500", "billing": "Complete Ritual", "features": ["Hydra Facial", "Full Body Polishing", "Aroma Pedicure & Manicure", "Hair Spa Treatment"] },
            { "name": "Signature Bridal Package", "price": "₹22,000", "billing": "Wedding Day", "features": ["Airbrush HD Makeup", "Lashes & Lenses", "Designer Hair Styling", "Saree/Lehenga Draping"] },
            { "name": "Sangeet / Reception Glam", "price": "₹6,000", "billing": "Per Function", "features": ["HD Party Makeup", "Textured Hair Styling", "Touchup Kit Provided"] }
        ],
        [
            { "author": "Radhika Patel", "quote": "Booked them for my wedding and reception. The makeup stayed intact even after 8 hours of dancing! Got endless compliments.", "rating": 5 },
            { "author": "Shalini Nair", "quote": "The hydra-facial did wonders for my dull skin before my sister's wedding. Clean, aesthetic studio and sweet staff.", "rating": 5 }
        ],
        "Aundh, Pune"
    )
    with open('templates/beauty_studio/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(beauty, f, indent=2)
    print("Created templates/beauty_studio/fallback_content.json")

    # 9. Real Estate
    re = get_generic_category_fallback(
        "real estate agents", "Real Estate Consultants & Property Advisory",
        "Verified Premium Residential & Commercial Properties Across Pune",
        "Find Your Dream Home With Zero Brokerage Hassles & Complete Title Clarity",
        "Specializing in luxury 2, 3 & 4 BHK apartments, gated villa communities, and commercial investments across Baner, Wakad, Kharadi, and Koregaon Park.",
        "#0F766E", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Luxury Gated 2 & 3 BHK Apartments", "description": "RERA-registered high-rise residences with clubhouse, swimming pool, and excellent IT park connectivity.", "price": "₹75 Lakhs - ₹1.8 Cr", "tag": "Residential" },
            { "name": "Exclusive Private Villas & Row Houses", "description": "Independent living with private gardens, solar power, and 24/7 security in suburban Pune.", "price": "₹1.9 Cr - ₹4.5 Cr", "tag": "Luxury" },
            { "name": "Grade-A Commercial Office & Retail Spaces", "description": "Pre-leased high rental yield office spaces and high-street retail showrooms in booming hubs.", "price": "₹1.2 Cr onwards", "tag": "Commercial" },
            { "name": "Home Loan Assistance & Legal Title Due Diligence", "description": "End-to-end documentation assistance, lowest bank loan rates, and property registration support.", "price": "Free Service For Buyers", "tag": "Advisory" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop", "title": "Modern Luxury Villa", "tag": "Villas" },
            { "url": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", "title": "Designer Living Spaces", "tag": "Apartments" },
            { "url": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop", "title": "High-Rise Gated Community", "tag": "Architecture" },
            { "url": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", "title": "Modular German Kitchen", "tag": "Interiors" },
            { "url": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop", "title": "Consultation & Key Handover", "tag": "Trust" },
            { "url": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop", "title": "On-Site Property Inspection", "tag": "Verification" }
        ],
        [
            { "name": "First-Time Homebuyer Assistance", "price": "Zero Brokerage", "billing": "New Builder Bookings", "features": ["Free Site Visits via Cab", "Price Negotiation With Builder", "Bank Loan Approval Support"] },
            { "name": "Resale & Rental Brokerage", "price": "Standard 1%", "billing": "On Deal Closing", "features": ["Verified Buyer Sourcing", "Agreement & Stamp Duty Filing", "Key Handover Coordination"] },
            { "name": "Commercial Investor Advisory", "price": "Bespoke", "billing": "Custom Retainer", "features": ["High Yield Pre-Leased Assets", "Tenant Due Diligence", "Capital Growth Analysis"] }
        ],
        [
            { "author": "Gaurav Shinde", "quote": "Helped us find a fantastic 3 BHK in Wakad within our budget. Transparent dealings with zero pressure tactics.", "rating": 5 },
            { "author": "Meenakshi Rao", "quote": "Extremely knowledgeable about legal documentation and RERA approvals in Pune. Saved us immense time!", "rating": 5 }
        ],
        "Hinjewadi / Wakad"
    )
    with open('templates/real_estate/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(re, f, indent=2)
    print("Created templates/real_estate/fallback_content.json")

    # 10. Boutiques
    boutique = get_generic_category_fallback(
        "boutiques", "Designer Fashion & Ethnic Couture Boutique",
        "Handcrafted Sarees, Indo-Western Silhouettes & Bespoke Tailoring",
        "Timeless Elegance & Contemporary Craftsmanship For Every Occasion",
        "Explore curated collections of pure Paithani and Banarasi silk sarees, designer lehengas, fusion kurtas, and custom-tailored trousseau wear.",
        "#7C2D12", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Designer Bridal & Festive Lehengas", "description": "Intricate hand zardozi, gota patti, and resham thread embroidery on pure raw silk and organza.", "price": "₹25,000 - ₹95,000", "tag": "Bridal" },
            { "name": "Pure Handloom Silk Sarees (Paithani & Banarasi)", "description": "Authentic weave certified heritage sarees with golden zari pallus and traditional motifs.", "price": "₹8,500 - ₹45,000", "tag": "Heritage" },
            { "name": "Indo-Western Fusion Dresses & Co-ord Sets", "description": "Modern drape pants, structured blazers, and printed cape sets crafted for festive parties.", "price": "₹4,200 - ₹12,000", "tag": "Fusion" },
            { "name": "Custom Tailoring & Blouse Designing", "description": "Master artisan pattern drafting, bridal blouse maggam work, and perfect made-to-measure fitting.", "price": "From ₹1,500", "tag": "Tailoring" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop", "title": "Boutique Showroom Interior", "tag": "Boutique" },
            { "url": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", "title": "Ethnic Designer Wear", "tag": "Festive" },
            { "url": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop", "title": "Silk Sarees Collection", "tag": "Handloom" },
            { "url": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop", "title": "Premium Fabric Textures", "tag": "Fabrics" },
            { "url": "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop", "title": "Curated Apparel Racks", "tag": "Collection" },
            { "url": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop", "title": "Custom Fitting & Styling", "tag": "Bespoke" }
        ],
        [
            { "name": "Bespoke Blouse & Dupatta Set", "price": "₹3,500", "billing": "Made to order", "features": ["Custom Neckline Design", "Hand Embroidery Embellishment", "Perfect Body Fitting Guarantee"] },
            { "name": "Festive Fusion Wardrobe", "price": "₹14,000", "billing": "Complete Look", "features": ["Designer Co-ord or Anarkali", "Matching Accessories", "Free Alteration Services"] },
            { "name": "Bridal Trousseau Curation", "price": "Bespoke", "billing": "Custom Package", "features": ["Personal Designer Consultation", "Complete 5-Outfit Wedding Wardrobe", "Priority Handloom Sourcing"] }
        ],
        [
            { "author": "Smita Kadam", "quote": "Got my wedding reception lehenga customized here. The embroidery and fitting were absolutely immaculate!", "rating": 5 },
            { "author": "Tanvi Bhagat", "quote": "Love their collection of modern handloom sarees. Very tasteful designs and courteous staff.", "rating": 5 }
        ],
        "Prabhat Road, Deccan"
    )
    with open('templates/boutique/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(boutique, f, indent=2)
    print("Created templates/boutique/fallback_content.json")

    # 11. Event Planner
    ep = get_generic_category_fallback(
        "event planners", "Wedding & Corporate Event Management",
        "Flawless Execution, Breathtaking Décor & Unforgettable Celebrations",
        "Turning Your Vision Into Seamless, Magical Celebrations",
        "Full-service wedding planning, luxury thematic decor, birthday galas, and corporate product launches planned with military precision and creative flair.",
        "#7E22CE", "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "End-to-End Wedding Planning", "description": "Venue management, vendor coordination, hospitality, guest logistics, and entertainment.", "price": "From ₹1,20,000", "tag": "Weddings" },
            { "name": "Theme Décor & Floral Architecture", "description": "Stunning mandap designs, fairy-light canopies, exotic flower arrangements, and photobooths.", "price": "From ₹80,000", "tag": "Décor" },
            { "name": "Corporate Conferences & Product Launches", "description": "Audio-visual production, stage fabrication, LED walls, and delegate registration logistics.", "price": "From ₹65,000", "tag": "Corporate" },
            { "name": "Milestone Birthdays & Anniversary Galas", "description": "Intimate luxury setups, bespoke entertainment, catering curation, and personalized gifting.", "price": "From ₹40,000", "tag": "Social" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop", "title": "Grand Banquet Setup", "tag": "Banquet" },
            { "url": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=800&auto=format&fit=crop", "title": "Fairylight Evening Lawn", "tag": "Outdoor" },
            { "url": "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop", "title": "Floral Entrance Arch", "tag": "Floral" },
            { "url": "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop", "title": "Cocktail Night Lounge", "tag": "Entertainment" },
            { "url": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop", "title": "Corporate Conference Stage", "tag": "Corporate" },
            { "url": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop", "title": "Private Dinner Celebration", "tag": "Private" }
        ],
        [
            { "name": "Décor Only Package", "price": "₹1,50,000", "billing": "Per Function", "features": ["Thematic Mandap/Stage", "Entrance Archway & Pathway", "Ambient Mood Lighting", "Fresh Floral Table Settings"] },
            { "name": "Complete Wedding Coordination", "price": "₹3,50,000", "billing": "Full 2-Day Event", "features": ["Complete Vendor Management", "Guest RSVP & Hospitality Desk", "Live Artist & DJ Coordination", "Dedicated Event Manager On-Site"] },
            { "name": "Bespoke Corporate Gala", "price": "₹1,80,000", "billing": "Full Day", "features": ["Stage & Sound Setup", "MC & Live Performance", "Photography & Videography", "Branded Event Assets"] }
        ],
        [
            { "author": "Kunal & Ritu", "quote": "They made our 3-day wedding completely stress-free! The decor looked straight out of Pinterest and every timeline was met.", "rating": 5 },
            { "author": "Anand Kulkarni (VP, TechCorp)", "quote": "Seamlessly managed our 400-person annual corporate summit. Highly professional execution.", "rating": 5 }
        ],
        "Kalyani Nagar"
    )
    with open('templates/event_planner/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(ep, f, indent=2)
    print("Created templates/event_planner/fallback_content.json")

    # 12. Yoga Studio
    yoga = get_generic_category_fallback(
        "yoga studios", "Holistic Yoga & Wellness Sanctuary",
        "Traditional Hatha, Dynamic Vinyasa Flow & Pranayama Mindfulness",
        "Rebalance Body, Mind & Breath In A Peaceful Urban Sanctuary",
        "Daily group batches, sound healing therapy, certified prenatal yoga, and posture alignment classes guided by experienced yogic practitioners.",
        "#15803D", "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Traditional Hatha & Iyengar Alignment", "description": "Focus on anatomical alignment, deep breathing, and holding asanas with props to build core stability.", "price": "₹2,500 / month", "tag": "Foundation" },
            { "name": "Vinyasa Flow & Power Yoga", "description": "Breath-synchronized dynamic sequences designed to build heat, cardiovascular stamina, and flexibility.", "price": "₹2,800 / month", "tag": "Dynamic" },
            { "name": "Pranayama & Tibetan Sound Bath", "description": "Meditative breath control techniques paired with singing bowl frequencies to soothe the nervous system.", "price": "₹1,800 / month", "tag": "Mindfulness" },
            { "name": "Prenatal & Postnatal Gentle Yoga", "description": "Doctor-approved gentle stretching, pelvic floor strengthening, and relaxation for expecting mothers.", "price": "₹3,200 / month", "tag": "Specialized" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop", "title": "Asana Alignment Practice", "tag": "Asanas" },
            { "url": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop", "title": "Mindful Meditation Space", "tag": "Meditation" },
            { "url": "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop", "title": "Group Morning Flow", "tag": "Classes" },
            { "url": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop", "title": "Breathwork & Pranayama", "tag": "Breath" },
            { "url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", "title": "Zen Wooden Studio Floor", "tag": "Sanctuary" },
            { "url": "https://images.unsplash.com/photo-1588286840104-8957b019727f?q=80&w=800&auto=format&fit=crop", "title": "Sun Salutation Ritual", "tag": "Tradition" }
        ],
        [
            { "name": "Monthly Unlimited Pass", "price": "₹2,500", "billing": "Per Month", "features": ["Attend Any 5 Days/Week Batch", "Access to Morning & Evening Slots", "Mats & Props Provided"] },
            { "name": "Quarterly Commitment", "price": "₹6,500", "billing": "3 Months", "features": ["Save 15%", "1 Free Weekend Sound Bath Session", "Personal Flexibility Assessment"] },
            { "name": "1-on-1 Therapeutic Yoga", "price": "₹6,000", "billing": "10 Private Sessions", "features": ["Back Pain & Posture Correction", "Bespoke Home Practice Routine", "Dietary Lifestyle Advice"] }
        ],
        [
            { "author": "Deepa Iyer", "quote": "The most calming yoga studio in Pune. My chronic back pain has reduced by 90% after three months of regular practice.", "rating": 5 },
            { "author": "Sunil Bansal", "quote": "The 6:30 AM morning Vinyasa class completely transformed my daily energy and focus. Great teachers!", "rating": 5 }
        ],
        "Bavdhan / Kothrud"
    )
    with open('templates/yoga/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(yoga, f, indent=2)
    print("Created templates/yoga/fallback_content.json")

    # 13. Physiotherapy
    physio = get_generic_category_fallback(
        "physiotherapy clinics", "Advanced Physiotherapy & Spine Rehab Clinic",
        "Evidence-Based Pain Relief, Sports Injury Rehab & Mobility Recovery",
        "Restore Movement, Relieve Chronic Pain & Reclaim Your Active Life",
        "Specialized musculoskeletal rehabilitation, post-surgical recovery, robotic decompression, dry needling, and ergonomic posture correction.",
        "#0369A1", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Spine & Slip Disc Non-Surgical Rehab", "description": "Targeted mechanical traction, core decompression exercises, and manual therapy to relieve sciatica and lumbar pain.", "price": "₹800 / session", "tag": "Spine Care" },
            { "name": "Sports Injury & Ligament Recovery (ACL / Meniscus)", "description": "Functional return-to-sport protocols, proprioception training, and kinesio taping for athletic performance.", "price": "₹1,000 / session", "tag": "Sports Rehab" },
            { "name": "Dry Needling & Myofascial Release", "description": "Trigger point dry needling to release stubborn muscle knots, frozen shoulders, and tension headaches.", "price": "₹900 / session", "tag": "Pain Relief" },
            { "name": "Post-Operative Knee & Hip Replacement Rehab", "description": "Early gait training, joint mobilization, swelling reduction, and strength building for full independence.", "price": "₹850 / session", "tag": "Post-Op" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop", "title": "Spine Assessment & Manual Therapy", "tag": "Assessment" },
            { "url": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", "title": "Mobility Exercise Guidance", "tag": "Exercises" },
            { "url": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop", "title": "Sports Injury Functional Rehab", "tag": "Sports" },
            { "url": "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop", "title": "Modern Electrotherapy Suite", "tag": "Equipment" },
            { "url": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop", "title": "Gait & Posture Analysis", "tag": "Biomechanics" },
            { "url": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop", "title": "Personalized Patient Care", "tag": "Care" }
        ],
        [
            { "name": "Initial Comprehensive Assessment", "price": "₹600", "billing": "First Visit", "features": ["Detailed Posture & Range Analysis", "Pain Cause Identification", "Bespoke Treatment Plan"] },
            { "name": "10-Session Rehab Protocol", "price": "₹7,200", "billing": "Package (Save 15%)", "features": ["10 Tailored Treatment Sessions", "Electrotherapy & Ultrasound Included", "Home Exercise Video App Access"] },
            { "name": "Home Visit Physiotherapy", "price": "₹1,200", "billing": "Per Visit", "features": ["Treatment in the Comfort of Home", "Ideal for Elderly & Post-Surgery Patients", "Dedicated Mobile Equipment"] }
        ],
        [
            { "author": "Mohan Kulkarni (62)", "quote": "After my knee replacement surgery, their physiotherapist helped me walk independently without a cane in just 4 weeks.", "rating": 5 },
            { "author": "Pranav Sen", "quote": "Recovered from a painful shoulder rotator cuff tear without needing surgery. Clear explanations and effective exercises!", "rating": 5 }
        ],
        "Model Colony, Shivajinagar"
    )
    with open('templates/physiotherapy/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(physio, f, indent=2)
    print("Created templates/physiotherapy/fallback_content.json")

    # 14. Interior Designer
    interior = get_generic_category_fallback(
        "interior designers", "Architecture & Interior Design Studio",
        "Modern Residential Interiors, Luxury Modular Spaces & Turnkey Execution",
        "Crafting Soulful, Functional & Timeless Spaces You Love Coming Home To",
        "Specializing in luxury 2-4 BHK residential renovations, bespoke villas, modular kitchen craftsmanship, and turnkey 3D design-to-handover solutions in Pune.",
        "#4338CA", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
        [
            { "name": "Full Turnkey Residential Interiors (2 & 3 BHK)", "description": "Complete design, civil changes, electrical, false ceiling, modular woodwork, and final styling with 10-year warranty.", "price": "From ₹8.5 Lakhs", "tag": "Turnkey" },
            { "name": "Luxury Modular Kitchen & Wardrobe Systems", "description": "Hafele / Hettich hardware, anti-scratch acrylic shutters, hydraulic lift-ups, and quartz countertops.", "price": "From ₹2.5 Lakhs", "tag": "Modular" },
            { "name": "3D Photorealistic Design & Material Consultation", "description": "Virtual 3D renders of every room, lighting layout, moodboards, and material selection assistance.", "price": "₹35 / sq.ft.", "tag": "Design Only" },
            { "name": "Commercial Office & Boutique Styling", "description": "Aesthetic workspaces, acoustic paneling, ergonomic layouts, and branding-aligned reception lobbies.", "price": "Bespoke Quote", "tag": "Commercial" }
        ],
        [
            { "url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop", "title": "Minimalist Contemporary Living", "tag": "Living" },
            { "url": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop", "title": "Warm Japandi Wood Interiors", "tag": "Aesthetic" },
            { "url": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop", "title": "Open Modular Island Kitchen", "tag": "Kitchen" },
            { "url": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop", "title": "Concealed Warm Lighting Detail", "tag": "Lighting" },
            { "url": "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=800&auto=format&fit=crop", "title": "Master Bedroom Suite", "tag": "Bedroom" },
            { "url": "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=800&auto=format&fit=crop", "title": "Material & Palette Moodboard", "tag": "Materials" }
        ],
        [
            { "name": "2 BHK Turnkey Design Package", "price": "₹8,50,000", "billing": "All-Inclusive", "features": ["Living Room TV Unit & Ceiling", "Full Modular Kitchen with Baskets", "Master Bedroom Wardrobe & Bed", "Quality Plywood & 10-Yr Warranty"] },
            { "name": "3 BHK Premium Turnkey Package", "price": "₹13,50,000", "billing": "All-Inclusive", "features": ["Complete 3 Bedrooms + Living + Dining", "Acrylic Finish Modular Kitchen", "Designer Wall Paneling & Paint", "Curated Soft Furnishings Assistance"] },
            { "name": "Villa / Penthouse Luxury Bespoke", "price": "Custom", "billing": "Per Sq.Ft.", "features": ["Imported Italian Marble Flooring", "Smart Home Automation Integration", "Custom Metal & Fluted Glasswork"] }
        ],
        [
            { "author": "Abhishek & Neha Agarwal", "quote": "Delivered our 3 BHK in Baner on the exact promised date! High quality finish and transparent cost breakdown without surprises.", "rating": 5 },
            { "author": "Shweta Phadke", "quote": "Their 3D design renders looked identical to the finished home. The modular kitchen is both gorgeous and super functional.", "rating": 5 }
        ],
        "Balewadi High Street"
    )
    with open('templates/interior_designer/fallback_content.json', 'w', encoding='utf-8') as f:
        json.dump(interior, f, indent=2)
    print("Created templates/interior_designer/fallback_content.json")

    print("\nALL 14 FALLBACK CONTENT FILES SUCCESSFULLY CREATED!")

if __name__ == '__main__':
    main()
