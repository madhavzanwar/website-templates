'use client';

import React from 'react';
import defaultContent from './content.json';
import { GymContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { DisciplinesSection } from './components/DisciplinesSection';
import { ScheduleScrubber } from './components/ScheduleScrubber';
import { CompoundGallery } from './components/CompoundGallery';
import { CoachesSection } from './components/CoachesSection';
import { RatesSection } from './components/RatesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingContactSection } from './components/BookingContactSection';
import { StickyConversionDock } from './components/StickyConversionDock';
import { Footer } from './components/Footer';

interface GymPageProps {
  customContent?: Partial<GymContent>;
}

export default function GymPage({ customContent }: GymPageProps = {}) {
  // Support content overriding via prop while defaulting entirely to content.json
  const content = (customContent ? { ...defaultContent, ...customContent } : defaultContent) as GymContent;

  return (
    <main className="min-h-screen bg-[#090A0C] text-[#F4F5F7] font-body selection:bg-[#D4FF00] selection:text-black">
      {/* Dynamic Theme Color Injection if primary_color is customized in content.json */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${content.branding.primary_color || '#D4FF00'};
          --color-brand-secondary: ${content.branding.secondary_color || '#14161B'};
          --color-brand-canvas: ${content.branding.canvas_color || '#090A0C'};
        }
      `}</style>

      {/* 1. Monolithic Technical Navigation Header */}
      <Navbar content={content} />

      {/* 2. Asymmetric 7/5 Hero with Telemetry HUD */}
      <Hero content={content} />

      {/* 3. Architectural Manifesto & Facility Specifications */}
      <AboutSection content={content} />

      {/* 4. Industrial Disciplines Manifest (Expanding Horizontal Accordion) */}
      <DisciplinesSection content={content} />

      {/* 5. Live Availability & Capacity Scrubber */}
      <ScheduleScrubber content={content} />

      {/* 6. Asymmetric Brutalist Bento Facility Gallery */}
      <CompoundGallery content={content} />

      {/* 7. Master Coaches Faculty */}
      <CoachesSection content={content} />

      {/* 8. Admission Rates & Contract Tiers */}
      <RatesSection content={content} />

      {/* 9. Verified Athlete Outcome Testimonials */}
      <TestimonialsSection content={content} />

      {/* 10. Direct WhatsApp & Pass Reservation Terminal */}
      <BookingContactSection content={content} />

      {/* 11. Sticky Persistent Conversion Dock */}
      <StickyConversionDock content={content} />

      {/* 12. Industrial Directory Footer */}
      <Footer content={content} />
    </main>
  );
}
