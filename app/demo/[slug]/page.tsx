import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import GymPage from '@/templates/gym/page';
import CafePage from '@/templates/cafe/page';
import SalonPage from '@/templates/salon/page';
import RestaurantPage from '@/templates/restaurant/page';
import WeddingPhotographerPage from '@/templates/wedding-photographer/page';
import InteriorDesignerPage from '@/templates/interior-designer/page';
import DentistPage from '@/templates/dentist/page';
import PhysiotherapyPage from '@/templates/physiotherapy/page';
import RealEstatePage from '@/templates/real-estate/page';
import CategoryShowcasePage from '@/components/CategoryShowcasePage';
import TrackVisit from '@/components/TrackVisit';

// Generate static params for all 584 slugs at build time
export async function generateStaticParams() {
  const generatedDir = path.join(process.cwd(), 'generated');
  try {
    const slugs = fs.readdirSync(generatedDir).filter((name) => {
      const contentPath = path.join(generatedDir, name, 'content.json');
      return fs.existsSync(contentPath);
    });
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// Allow unknown slugs to 404 gracefully (don't crash build)
export const dynamicParams = false;

function getContent(slug: string): any | null {
  const contentPath = path.join(process.cwd(), 'generated', slug, 'content.json');
  if (!fs.existsSync(contentPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = getContent(slug);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://website-templates-xi.vercel.app';

  if (content) {
    const name = content.branding?.business_name || slug;
    const tagline = content.branding?.tagline || 'Official Preview';
    const description =
      content.branding?.hero_subheadline ||
      content.about?.lead_statement ||
      `Official preview website for ${name} in Pune, Maharashtra.`;

    return {
      metadataBase: new URL(baseUrl),
      title: `${name} — ${tagline}`,
      description,
      robots: { index: false, follow: false },
      openGraph: {
        title: `${name} — ${tagline}`,
        description,
        url: `${baseUrl}/demo/${slug}`,
        siteName: name,
      },
    };
  }

  return {
    title: `Preview | ${slug}`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getContent(slug);

  if (!content) {
    notFound();
  }

  // Determine which template to render
  const cat = (
    content.category_id ||
    content.category ||
    content.template ||
    ''
  ).toLowerCase();

  let TemplatePage;
  if (cat.includes('gym') || cat.includes('fitness')) {
    TemplatePage = <GymPage customContent={content} />;
  } else if (cat.includes('cafe') || cat.includes('coffee')) {
    TemplatePage = <CafePage customContent={content} />;
  } else if (cat.includes('salon') || cat.includes('beauty') || cat.includes('spa')) {
    TemplatePage = <SalonPage customContent={content} />;
  } else if (cat.includes('restaurant') || cat.includes('dining') || cat.includes('food')) {
    TemplatePage = <RestaurantPage customContent={content} />;
  } else if (cat.includes('wedding') || cat.includes('photographer') || cat.includes('photography')) {
    TemplatePage = <WeddingPhotographerPage customContent={content} />;
  } else if (cat.includes('interior') || cat.includes('architect') || cat.includes('spatial')) {
    TemplatePage = <InteriorDesignerPage customContent={content} />;
  } else if (cat.includes('dentist') || cat.includes('dental')) {
    TemplatePage = <DentistPage customContent={content} />;
  } else if (cat.includes('physio') || cat.includes('rehab')) {
    TemplatePage = <PhysiotherapyPage customContent={content} />;
  } else if (cat.includes('real_estate') || cat.includes('property') || cat.includes('realty')) {
    TemplatePage = <RealEstatePage customContent={content} />;
  } else {
    // Universal showcase for all other categories
    TemplatePage = <CategoryShowcasePage content={content} />;
  }

  return (
    <>
      {TemplatePage}
      {/* Fire-and-forget visit tracking — never blocks page render */}
      <TrackVisit slug={slug} />
    </>
  );
}
