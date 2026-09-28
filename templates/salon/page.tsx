'use client';

import React from 'react';
import defaultContent from './content.json';
import { SalonContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ManifestoSection } from './components/ManifestoSection';
import { ServicesLedger } from './components/ServicesLedger';
import { LookbookGallery } from './components/LookbookGallery';
import { MastersSection } from './components/MastersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingConciergeSection } from './components/BookingConciergeSection';
import { StickyConciergeBar } from './components/StickyConciergeBar';
import { Footer } from './components/Footer';

interface SalonPageProps {
  customContent?: Partial<SalonContent>;
}

export default function SalonPage({ customContent }: SalonPageProps = {}) {
  // Support content overriding via prop while defaulting entirely to decoupled content.json
  const content = (customContent ? { ...defaultContent, ...customContent } : defaultContent) as SalonContent;

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-[#1C1815] font-humanist selection:bg-[#B86B4F] selection:text-white">
      {/* Dynamic Theme Color Injection for client customization */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${content.branding.primary_color || '#B86B4F'};
          --color-brand-secondary: ${content.branding.secondary_color || '#EDE8E0'};
          --color-brand-canvas: ${content.branding.canvas_color || '#F7F4EE'};
          --color-brand-text: ${content.branding.text_color || '#1C1815'};
          --color-brand-bronze: ${content.branding.bronze_color || '#C4A47C'};
        }
      `}</style>

      {/* 1. Atelier Ambient Header & Navbar */}
      <Navbar content={content} />

      {/* 2. 55/45 Asymmetrical Editorial Split Hero with Arched Daylight Mask */}
      <Hero content={content} />

      {/* 3. Spatial Architecture, True-Daylight & Acoustic Tranquility Manifesto */}
      <ManifestoSection content={content} />

      {/* 4. Editorial Service Ledger with Tiered Stylist Pricing */}
      <ServicesLedger content={content} />

      {/* 5. Curated Lookbook Masonry Gallery */}
      <LookbookGallery content={content} />

      {/* 6. Master Artisans & Pedigree Roster */}
      <MastersSection content={content} />

      {/* 7. Press Acclaim & Patron Reviews */}
      <TestimonialsSection content={content} />

      {/* 8. Appointment Reservation Terminal & Direct WhatsApp Concierge */}
      <BookingConciergeSection content={content} />

      {/* 9. Floating Unobtrusive Sticky Appointment Dock */}
      <StickyConciergeBar content={content} />

      {/* 10. Refined Grand Atelier Footer */}
      <Footer content={content} />
    </main>
  );
}
