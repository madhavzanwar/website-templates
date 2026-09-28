import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface VisitRow {
  slug: string;
  businessName: string;
  visits: number;
  lastVisit: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return NextResponse.json({
      error: 'Redis not configured',
      rows: [],
    });
  }

  try {
    // Get all count:* keys
    const scanRes = await fetch(`${redisUrl}/scan/0/match/count:*/count/1000`, {
      headers: { Authorization: `Bearer ${redisToken}` },
    });
    const scanData = await scanRes.json();
    const countKeys: string[] = scanData.result?.[1] || [];

    const rows: VisitRow[] = [];

    for (const countKey of countKeys) {
      const slug = countKey.replace('count:', '');

      // Get visit count
      const countRes = await fetch(`${redisUrl}/get/${encodeURIComponent(countKey)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
      const countData = await countRes.json();
      const visits = parseInt(countData.result || '0', 10);

      // Get last visit timestamp
      const lastRes = await fetch(`${redisUrl}/get/last:${encodeURIComponent(slug)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
      });
      const lastData = await lastRes.json();
      const lastTs = lastData.result ? parseInt(lastData.result) : 0;
      const lastVisit = lastTs ? new Date(lastTs).toISOString() : 'never';

      // Try to read business name from generated content
      let businessName = slug;
      try {
        const contentPath = path.join(process.cwd(), 'generated', slug, 'content.json');
        if (fs.existsSync(contentPath)) {
          const c = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
          businessName = c.branding?.business_name || slug;
        }
      } catch {
        // use slug as fallback
      }

      rows.push({ slug, businessName, visits, lastVisit });
    }

    rows.sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());

    return NextResponse.json({ total: rows.length, rows });
  } catch (err) {
    return NextResponse.json({ error: 'Redis error', detail: String(err) }, { status: 500 });
  }
}
