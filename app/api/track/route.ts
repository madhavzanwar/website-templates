import { NextRequest, NextResponse } from 'next/server';

const BOT_UA_FRAGMENTS = [
  'whatsapp', 'facebookexternalhit', 'twitterbot', 'slackbot',
  'telegrambot', 'linkedinbot', 'bot', 'crawler', 'spider',
];

export async function POST(req: NextRequest) {
  try {
    const ua = (req.headers.get('user-agent') || '').toLowerCase();
    if (BOT_UA_FRAGMENTS.some((f) => ua.includes(f))) {
      return NextResponse.json({ ok: false, reason: 'bot' });
    }

    const body = await req.json();
    const { slug, device } = body;
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ ok: false });
    }

    const safeSlug = slug.slice(0, 200).replace(/[^a-zA-Z0-9_-]/g, '');
    const safeDevice = device === 'mobile' ? 'mobile' : 'desktop';
    const ts = Date.now();

    // Only track if Redis is available — never crash without it
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      // Dev mode — silently succeed
      return NextResponse.json({ ok: true, mode: 'noop' });
    }

    // Upstash REST API: ZADD visits:slug score=timestamp member=ts:device
    const visitKey = `visit:${safeSlug}`;
    await fetch(`${redisUrl}/zadd/${encodeURIComponent(visitKey)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([ts, `${ts}:${safeDevice}`]),
    });

    // Increment total count
    await fetch(`${redisUrl}/incr/count:${encodeURIComponent(safeSlug)}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });

    // Track last-seen timestamp per slug
    await fetch(`${redisUrl}/set/last:${encodeURIComponent(safeSlug)}/${ts}`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Never propagate errors to the demo page
    return NextResponse.json({ ok: false });
  }
}
