'use client';

import { useEffect } from 'react';

const BOT_PATTERNS = [
  'whatsapp', 'facebookexternalhit', 'twitterbot', 'slackbot',
  'telegrambot', 'linkedinbot', 'bot', 'crawler', 'spider', 'preview',
];

export default function TrackVisit({ slug }: { slug: string }) {
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isBot = BOT_PATTERNS.some((p) => ua.includes(p));
    if (isBot) return;

    // Fire and forget — never await, never block render
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug,
        device: /mobile|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop',
      }),
    }).catch(() => {
      // Silently ignore — Redis may not be connected in dev
    });
  }, [slug]);

  return null;
}
