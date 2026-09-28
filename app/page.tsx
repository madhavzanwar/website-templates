import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Website Templates Showcase',
  description: 'Explore premium business website templates and customized client demo pages.',
};

interface TemplateInfo {
  title: string;
  category: string;
  slug: string;
  description: string;
  features: string[];
  gradient: string;
  tag: string;
}

const MASTER_TEMPLATES: TemplateInfo[] = [
  {
    title: 'Smile Studio Dental Clinic',
    category: 'Dentist & Healthcare',
    slug: '/dentist',
    description: 'Editorial-first dental practice layout featuring treatment catalog, doctor team, transparent pricing, and instant booking.',
    features: ['Teal & Sand Editorial Theme', 'Interactive Service Selection', 'Transparent Pricing Table', 'WhatsApp Direct Booking'],
    gradient: 'from-teal-900/40 via-emerald-900/20 to-zinc-900',
    tag: 'Healthcare',
  },
  {
    title: 'Aarogya PhysioWell',
    category: 'Physiotherapy & Rehab',
    slug: '/physiotherapy',
    description: 'Kinetic, data-driven physiotherapy layout with anatomical CSS visuals, condition matrix, and session package tiers.',
    features: ['Forest Green & Gold Theme', 'Anatomical Visual Art', 'Condition Recovery Matrix', 'Package Pricing Tiers'],
    gradient: 'from-emerald-950/50 via-teal-900/20 to-zinc-900',
    tag: 'Wellness',
  },
  {
    title: 'Shubh Properties',
    category: 'Real Estate & Living',
    slug: '/real-estate',
    description: 'Magazine-quality real estate broker template with search dock, MahaRERA badges, property cards, and live EMI calculator.',
    features: ['Navy & Gold Luxury Theme', 'Interactive EMI Calculator', 'MahaRERA Registration Badges', 'Filterable Property Showcase'],
    gradient: 'from-amber-950/40 via-slate-900/30 to-zinc-900',
    tag: 'Real Estate',
  },
  {
    title: 'Apex Gym & Fitness',
    category: 'Gym & Fitness',
    slug: '/gym',
    description: 'High-energy fitness club template with workout programs, trainer roster, class schedules, and membership tiers.',
    features: ['High Contrast Cyber Theme', 'Trainer Profiles', 'Membership Tier Cards', 'Class Timetable'],
    gradient: 'from-red-950/40 via-rose-900/20 to-zinc-900',
    tag: 'Fitness',
  },
  {
    title: 'Artisan Cafe & Bakery',
    category: 'Cafe & Bakery',
    slug: '/cafe',
    description: 'Warm, artisanal cafe layout showcasing special roasts, daily fresh bakes, cozy ambience, and online menu.',
    features: ['Warm Amber & Espresso Theme', 'Interactive Menu Tabs', 'Fresh Roast Highlights', 'Location & Hours'],
    gradient: 'from-amber-900/40 via-orange-950/20 to-zinc-900',
    tag: 'Food & Beverage',
  },
  {
    title: 'Luxe Salon & Spa',
    category: 'Salon & Beauty',
    slug: '/salon',
    description: 'Elegant beauty salon layout with styling services menu, expert stylists, package rates, and appointment booking.',
    features: ['Rose Gold & Charcoal Theme', 'Service Price List', 'Stylist Roster', 'Package Booking'],
    gradient: 'from-pink-950/40 via-purple-900/20 to-zinc-900',
    tag: 'Beauty',
  },
  {
    title: 'Maison Gourmet Restaurant',
    category: 'Fine Dining Restaurant',
    slug: '/restaurant',
    description: 'Sophisticated culinary template featuring chef signature dishes, wine pairings, ambience gallery, and reservation CTA.',
    features: ['Deep Wine & Gold Theme', 'Chef Signature Menu', 'Table Reservation CTA', 'Ambience Showcase'],
    gradient: 'from-purple-950/40 via-rose-950/20 to-zinc-900',
    tag: 'Dining',
  },
  {
    title: 'Studio Spatial Interior Design',
    category: 'Interior Design',
    slug: '/interior-designer',
    description: 'Minimalist spatial design portfolio showcasing luxury residential & commercial projects with material palettes.',
    features: ['Architectural Dark Theme', 'Project Portfolio Grid', 'Material & Texture Palette', 'Consultation Request'],
    gradient: 'from-blue-950/40 via-slate-900/30 to-zinc-900',
    tag: 'Design',
  },
  {
    title: 'Lumière Wedding Photography',
    category: 'Wedding Photography',
    slug: '/wedding-photographer',
    description: 'Couture wedding photography showcase featuring storybook galleries, client testimonials, and package details.',
    features: ['Editorial Monochrome Theme', 'Storybook Gallery', 'Client Love Stories', 'Package Inquiries'],
    gradient: 'from-indigo-950/40 via-slate-900/30 to-zinc-900',
    tag: 'Photography',
  },
];

function getGeneratedDemoSlugs(): string[] {
  try {
    const genDir = path.join(process.cwd(), 'generated');
    if (fs.existsSync(genDir)) {
      return fs.readdirSync(genDir).filter((name) => {
        const full = path.join(genDir, name);
        return fs.statSync(full).isDirectory();
      });
    }
  } catch (e) {
    // fallback if directory read fails
  }
  return [];
}

export default function Home() {
  const generatedSlugs = getGeneratedDemoSlugs();

  return (
    <main style={{ minHeight: '100vh', background: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '0.35rem 1rem', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)', color: '#60a5fa', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Live Website Templates
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem 0', background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Website Template Showcase
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#a1a1aa', maxWidth: '650px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
            Explore our premium business website templates and browse generated client demo pages. Click any template to view live preview.
          </p>
        </header>

        {/* Master Templates Section */}
        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#ffffff' }}>
              🎨 Master Business Templates ({MASTER_TEMPLATES.length})
            </h2>
            <span style={{ fontSize: '0.875rem', color: '#71717a' }}>Click any card to preview full template</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {MASTER_TEMPLATES.map((tpl) => (
              <Link
                key={tpl.slug}
                href={tpl.slug}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  background: '#121215',
                  border: '1px solid #27272a',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: '6px', background: '#27272a', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {tpl.tag}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Live Demo &rarr;
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                    {tpl.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: '1.5', margin: '0 0 1rem 0' }}>
                    {tpl.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                    {tpl.features.map((feat, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)', color: '#d4d4d8' }}>
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #1f1f23', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', color: '#71717a' }}>Route: {tpl.slug}</span>
                  <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>Open Template</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Generated Client Demos Section */}
        {generatedSlugs.length > 0 && (
          <section style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid #27272a' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#ffffff' }}>
                📁 Generated Client Demo Pages ({generatedSlugs.length})
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#a1a1aa', margin: 0 }}>
                Individual client pages generated with Pune SMB business data. Click any client to view their personalized page.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {generatedSlugs.slice(0, 60).map((slug) => (
                <Link
                  key={slug}
                  href={`/demo/${slug}`}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: '#18181b',
                    border: '1px solid #27272a',
                    color: '#e4e4e7',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  🌐 {slug}
                </Link>
              ))}
            </div>
            {generatedSlugs.length > 60 && (
              <p style={{ fontSize: '0.85rem', color: '#71717a', marginTop: '1rem', textAlign: 'center' }}>
                Showing 60 of {generatedSlugs.length} total client demo pages. All pages accessible via <code style={{ background: '#27272a', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>/demo/[slug]</code>.
              </p>
            )}
          </section>
        )}

        {/* Footer */}
        <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#52525b', fontSize: '0.85rem', borderTop: '1px solid #18181b', paddingTop: '2rem' }}>
          Website Templates Showcase • Antigravity Powered
        </footer>

      </div>
    </main>
  );
}
