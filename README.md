# Website Templates — Pune SMB Demo Portfolio

Personalized demo websites for local businesses in Pune, Maharashtra. Each business gets a private preview link with their real name, location, phone number and services — built on 9 distinct award-quality templates.

> **This repo is private.** The `/generated` folder contains real business names and phone numbers scraped from public listings. Keep it private.

---

## Live Site

**Vercel:** https://website-templates-xi.vercel.app

Demo pages are at `/demo/<slug>` — only reachable by direct link (home page shows no list).

---

## Templates (9 categories)

| Route | Category |
|---|---|
| `/gym` | Gyms & Fitness |
| `/salon` | Salons & Beauty |
| `/cafe` | Cafes & Coffee Shops |
| `/restaurant` | Restaurants |
| `/wedding-photographer` | Wedding Photography |
| `/interior-designer` | Interior Design & Architecture |
| `/dentist` | Dental Clinics |
| `/physiotherapy` | Physiotherapy |
| `/real-estate` | Real Estate Agents |

---

## Run Locally

```bash
# Install dependencies
npm install

# Development server (hot reload)
npm run dev
# → http://localhost:3000

# Production build + start
npm run build
npm run start
```

Demo pages: `http://localhost:3000/demo/<slug>`  
Admin visits: `http://localhost:3000/admin/visits?key=<ADMIN_KEY>`

---

## Folder Layout

```
/app                    Next.js routes
  /demo/[slug]          Dynamic demo page (static at build time)
  /api/track            Visit tracking (Upstash Redis)
  /api/admin/visits     Admin API (ADMIN_KEY protected)
  /admin/visits         Admin UI

/templates              9 template categories
  /gym, /salon, /cafe, /restaurant, /wedding-photographer,
  /interior-designer, /dentist, /physiotherapy, /real-estate
    components/         React components
    content.json        Default Indian demo content
    fallback_content.json  Fallback if content.json missing
    types.ts            TypeScript types
    page.tsx            Template entry point

/generated              584 slug folders (public business data)
  /<slug>/content.json  Merged content for that business

/components             Shared React components (TrackVisit, etc.)
/research               Design research docs
/public                 Static assets

pipeline.py             Generate /generated from pune_smb_leads.csv
slug_generator.py       Slug uniqueness logic
lookup.py               Look up a lead by phone / slug
category_map.json       Category → template mapping
```

---

## Generate Demo Pages

**To add new leads or regenerate all demo content:**

```bash
# 1. Add new leads to pune_smb_leads.csv (or use the scraper)
# 2. Run the pipeline
python pipeline.py

# 3. Commit and push the updated /generated folder
git add generated/
git commit -m "Add new demo pages: <business names>"
git push

# Vercel auto-deploys — the new /demo/<slug> links go live in ~2 minutes.
```

**To look up a specific business:**
```bash
python lookup.py "Deccan Coffee"
python lookup.py +917890123456
```

---

## Environment Variables

Set these in Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Required | Description |
|---|---|---|
| `UPSTASH_REDIS_REST_URL` | For tracking | Upstash Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | For tracking | Upstash Redis token |
| `ADMIN_KEY` | For admin | Random secret for `/admin/visits` |
| `NEXT_PUBLIC_BASE_URL` | For OG tags | Full Vercel URL e.g. `https://website-templates-xi.vercel.app` |
| `DEMO_BASE_URL` | For pipeline.py | Same URL as above |

For local dev, copy `.env.example` to `.env` and fill in fake values.

---

## Visit Tracking

- Each demo page fires `POST /api/track` once after load
- Bots (WhatsApp, Facebook, Telegram, etc.) are ignored automatically  
- No IP addresses stored
- Data stored in Upstash Redis
- Admin panel: `/admin/visits?key=<ADMIN_KEY>` — shows slug, business name, visit count, last visit

---

## Deployment

Vercel auto-deploys on every push to `main`.  
Node version: 20.x  
Build command: `npm run build`  
Output directory: `.next`

---

## Adding a New Template Category

1. Create `templates/<category>/` with `types.ts`, `content.json`, `fallback_content.json`, `components/`, `page.tsx`
2. Add the category matcher in `app/demo/[slug]/page.tsx`
3. Add the route in `app/<category>/page.tsx` and `layout.tsx`
4. Update `category_map.json`
