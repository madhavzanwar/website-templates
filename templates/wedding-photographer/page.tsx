'use client';

import React from 'react';
import defaultContent from './content.json';
import { WeddingPhotographerContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhilosophySection } from './components/PhilosophySection';
import { FeaturedStories } from './components/FeaturedStories';
import { CuratedArchive } from './components/CuratedArchive';
import { InvestmentLedger } from './components/InvestmentLedger';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InquirySection } from './components/InquirySection';
import { StickyInquiryDock } from './components/StickyInquiryDock';
import { Footer } from './components/Footer';

interface WeddingPhotographerPageProps {
  customContent?: Partial<WeddingPhotographerContent>;
}

export default function WeddingPhotographerPage({ customContent }: WeddingPhotographerPageProps = {}) {
  // Support content overriding via prop while defaulting entirely to content.json
  const content = (customContent
    ? { ...defaultContent, ...customContent }
    : defaultContent) as unknown as WeddingPhotographerContent;

  return (
    <main
      id="top"
      className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-tenor selection:bg-[#B87D74]/20 selection:text-[#1C1917]"
    >
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --wp-canvas: ${content.branding.canvas_ground || '#FAF7F2'};
          --wp-ink-primary: ${content.branding.structural_ink || '#1C1917'};
          --wp-surface-mat: ${content.branding.secondary_matting || '#ECE6DD'};
          --wp-accent-rosewood: ${content.branding.primary_color || '#B87D74'};
          --wp-accent-amber: ${content.branding.antique_amber || '#9D8469'};
          --wp-surface-dark: ${content.branding.darkroom_nocturne || '#141211'};
        }
      `}</style>

      {/* 1. Header & Whisper Nav: Floating Translucent Pill + Soundscape & Season Status */}
      <Navbar content={content} />

      {/* 2. Hero Monograph: Framed Passepartout Hero + Ambient Film Grain + Poetry */}
      <Hero content={content} />

      {/* 3. Philosophy Essay: The Manifesto of Fleeting Moments (Analog Film Fidelity) */}
      <PhilosophySection content={content} />

      {/* 4. Featured Love Stories: Chapter-Based Diptych Storybook (Vignettes & Locations) */}
      <FeaturedStories content={content} />

      {/* 5. Curated Photo Archive: Responsive Multi-Mood Gallery + Camera Specs HUD */}
      <CuratedArchive content={content} />

      {/* 6. The Investment / Tiers: "Curated Collections" Editorial Ledger (No Tacky Slop) */}
      <InvestmentLedger content={content} />

      {/* 7. Kind Words & Heirlooms: Hand-Penned Client Letters + Linen Album Lookbook */}
      <TestimonialsSection content={content} />

      {/* 8. Date Inquiry Sanctuary: "Tell Me Your Story" Multi-Step Form + WhatsApp Concierge */}
      <InquirySection content={content} />

      {/* 9. Floating Date Availability Ribbon */}
      <StickyInquiryDock content={content} />

      {/* 10. Footer Monograph: Fine-Art Colophon + Lab Stamps + Worldwide Travel Itinerary */}
      <Footer content={content} />
    </main>
  );
}
