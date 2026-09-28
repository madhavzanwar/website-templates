'use client';

import React from 'react';
import defaultContent from './content.json';
import { CafeContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoastingManifestoSection } from './components/RoastingManifestoSection';
import { MenuLetterboard } from './components/MenuLetterboard';
import { BrewCalculatorSection } from './components/BrewCalculatorSection';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { CuppingEventsSection } from './components/CuppingEventsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisitBookingSection } from './components/VisitBookingSection';
import { StickyOrderBar } from './components/StickyOrderBar';
import { Footer } from './components/Footer';

interface CafePageProps {
  customContent?: Partial<CafeContent>;
}

export default function CafePage({ customContent }: CafePageProps = {}) {
  // Support content overriding via prop while defaulting entirely to content.json
  const content = (customContent ? { ...defaultContent, ...customContent } : defaultContent) as CafeContent;

  return (
    <main id="top" className="min-h-screen bg-[#F7F4EE] text-[#231B16] font-humanist selection:bg-[#B85D38] selection:text-white">
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${content.branding.primary_color || '#B85D38'};
          --color-brand-secondary: ${content.branding.secondary_color || '#231B16'};
          --color-brand-canvas: ${content.branding.canvas_color || '#F7F4EE'};
          --color-brand-brass: ${content.branding.brass_color || '#D99B4B'};
          --color-brand-olive: ${content.branding.olive_color || '#4A5844'};
        }
      `}</style>

      {/* 1. Tactile Header with Live Batch Ticker */}
      <Navbar content={content} />

      {/* 2. 60/40 Asymmetric Editorial Collage Hero */}
      <Hero content={content} />

      {/* 3. Roasting Discipline & 10-Day Farm-To-Cup Manifesto */}
      <RoastingManifestoSection content={content} />

      {/* 4. Tabbed Tactile Letter-Board Cafe & Retail Menu */}
      <MenuLetterboard content={content} />

      {/* 5. Interactive Dial-In Brew Ratio Calculator */}
      <BrewCalculatorSection content={content} />

      {/* 6. Sensory Atmosphere Editorial Gallery */}
      <AtmosphereGallery content={content} />

      {/* 7. Weekend Public Cupping Sessions & Tasting Flights */}
      <CuppingEventsSection content={content} />

      {/* 8. Coffee Critic & Neighborhood Regular Reviews */}
      <TestimonialsSection content={content} />

      {/* 9. Sanctuary Coordinates & Direct WhatsApp Reservation Terminal */}
      <VisitBookingSection content={content} />

      {/* 10. Floating Seasonal Roast Notification Dock */}
      <StickyOrderBar content={content} />

      {/* 11. Artisanal Kraft Cardboard Footer */}
      <Footer content={content} />
    </main>
  );
}
