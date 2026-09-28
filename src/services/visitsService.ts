import fs from 'fs';
import path from 'path';

export interface VisitRow {
  slug: string;
  businessName: string;
  visits: number;
  lastVisit: string;
}

export interface VisitsResult {
  authorized: boolean;
  configured: boolean;
  total: number;
  rows: VisitRow[];
  error?: string;
}

export async function getVisitsData(key?: string): Promise<VisitsResult> {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || key !== adminKey) {
    return { authorized: false, configured: false, total: 0, rows: [] };
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    return {
      authorized: true,
      configured: false,
      total: 0,
      rows: [],
      error: 'Upstash Redis not connected yet. Add Upstash Redis from Vercel Storage tab.',
    };
  }

  try {
    const scanRes = await fetch(`${redisUrl}/scan/0/match/count:*/count/1000`, {
      headers: { Authorization: `Bearer ${redisToken}` },
      cache: 'no-store',
    });
    const scanData = await scanRes.json();
    const countKeys: string[] = scanData.result?.[1] || [];

    const rows: VisitRow[] = [];

    for (const countKey of countKeys) {
      const slug = countKey.replace('count:', '');

      const countRes = await fetch(`${redisUrl}/get/${encodeURIComponent(countKey)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store',
      });
      const countData = await countRes.json();
      const visits = parseInt(countData.result || '0', 10);

      const lastRes = await fetch(`${redisUrl}/get/last:${encodeURIComponent(slug)}`, {
        headers: { Authorization: `Bearer ${redisToken}` },
        cache: 'no-store',
      });
      const lastData = await lastRes.json();
      const lastTs = lastData.result ? parseInt(lastData.result) : 0;
      const lastVisit = lastTs ? new Date(lastTs).toISOString() : 'never';

      let businessName = slug;
      try {
        const contentPath = path.join(process.cwd(), 'generated', slug, 'content.json');
        if (fs.existsSync(contentPath)) {
          const c = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
          businessName = c.branding?.business_name || slug;
        }
      } catch {
        // fallback
      }

      rows.push({ slug, businessName, visits, lastVisit });
    }

    rows.sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime());

    return {
      authorized: true,
      configured: true,
      total: rows.length,
      rows,
    };
  } catch (err: any) {
    return {
      authorized: true,
      configured: true,
      total: 0,
      rows: [],
      error: err?.message || 'Error communicating with Redis',
    };
  }
}
