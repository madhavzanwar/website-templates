import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

async function getVisits(key: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/admin/visits?key=${encodeURIComponent(key)}`, {
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  return res.json();
}

export default async function AdminVisitsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key = '' } = await searchParams;

  if (!process.env.ADMIN_KEY) notFound();

  const data = await getVisits(key);
  if (!data || data.error === 'Not found') notFound();

  return (
    <main style={{ fontFamily: 'monospace', padding: '2rem', background: '#0a0a0a', color: '#e5e5e5', minHeight: '100vh' }}>
      <h1 style={{ color: '#a3e635', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        Admin: Visit Analytics
      </h1>
      <p style={{ color: '#71717a', marginBottom: '2rem' }}>
        {data.total || 0} slugs tracked
      </p>

      {data.error && data.error !== 'Not found' && (
        <p style={{ color: '#f87171' }}>{data.error}</p>
      )}

      {data.rows?.length === 0 && (
        <p style={{ color: '#71717a' }}>No visits tracked yet. Redis may not be connected.</p>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #27272a', textAlign: 'left' }}>
            <th style={{ padding: '0.5rem 1rem', color: '#a1a1aa' }}>Slug</th>
            <th style={{ padding: '0.5rem 1rem', color: '#a1a1aa' }}>Business Name</th>
            <th style={{ padding: '0.5rem 1rem', color: '#a1a1aa' }}>Visits</th>
            <th style={{ padding: '0.5rem 1rem', color: '#a1a1aa' }}>Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {(data.rows || []).map((row: any) => (
            <tr key={row.slug} style={{ borderBottom: '1px solid #18181b' }}>
              <td style={{ padding: '0.4rem 1rem' }}>
                <a
                  href={`/demo/${row.slug}`}
                  style={{ color: '#60a5fa', textDecoration: 'none' }}
                  target="_blank"
                >
                  {row.slug}
                </a>
              </td>
              <td style={{ padding: '0.4rem 1rem', color: '#e5e5e5' }}>{row.businessName}</td>
              <td style={{ padding: '0.4rem 1rem', color: '#a3e635', fontWeight: 'bold' }}>
                {row.visits}
              </td>
              <td style={{ padding: '0.4rem 1rem', color: '#71717a' }}>{row.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
