'use client';

import React from 'react';
import defaultContent from './content.json';
import { RestaurantContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TerroirManifesto } from './components/TerroirManifesto';
import { MenuSections } from './components/MenuSections';
import { TastingMenuScrubber } from './components/TastingMenuScrubber';
import { ChefStorySection } from './components/ChefStorySection';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReservationSection } from './components/ReservationSection';
import { StickyBookingDock } from './components/StickyBookingDock';
import { Footer } from './components/Footer';

interface RestaurantPageProps {
  customContent?: Partial<RestaurantContent>;
}

export default function RestaurantPage({ customContent }: RestaurantPageProps = {}) {
  // Support content overriding via prop while defaulting entirely to content.json
  const content = (customContent ? { ...defaultContent, ...customContent } : defaultContent) as RestaurantContent;

  return (
    <main
      id="top"
      className="min-h-screen bg-[#14080E] text-[#F5EFEB] font-manrope selection:bg-[#D4A359] selection:text-[#14080E]"
    >
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${content.branding.primary_color || '#D4A359'};
          --color-canvas-nocturnal: ${content.branding.nocturnal_canvas || '#14080E'};
          --color-canvas-truffle: ${content.branding.container_truffle || '#221619'};
          --color-text-bone: ${content.branding.smoked_bone || '#F5EFEB'};
          --color-burgundy-cellar: ${content.branding.cellar_burgundy || '#4A1525'};
        }
      `}</style>

      {/* 1. Monolithic Luxury Header with Live Table Status */}
      <Navbar content={content} />

      {/* 2. 55/45 Theatrical Asymmetric Split Hero with Integrated Booking Dock */}
      <Hero content={content} />

      {/* 3. Terroir Manifesto: Garden, Subterranean Cellar & Open Hearth */}
      <TerroirManifesto content={content} />

      {/* 4. Tabbed Artisanal A La Carte Menu with Dotted Leaders & Dietary Tags */}
      <MenuSections content={content} />

      {/* 5. 5-Act Degustation Scrubber with Grand Cru & Botanical Pairings */}
      <TastingMenuScrubber content={content} />

      {/* 6. Chef de Cuisine Narrative & Open Hearth Brigade Philosophy */}
      <ChefStorySection content={content} />

      {/* 7. 5-Frame Chiaroscuro Candlelight Dining Gallery */}
      <AtmosphereGallery content={content} />

      {/* 8. Michelin Guide 2026 Inspections & Global Gastronomic Acclaim */}
      <TestimonialsSection content={content} />

      {/* 9. Interactive Table Reservation Terminal & WhatsApp Concierge */}
      <ReservationSection content={content} />

      {/* 10. Floating Table Booking Dock */}
      <StickyBookingDock content={content} />

      {/* 11. Refined Nocturnal Burgundy Footer with Dress Code & Valet Advisory */}
      <Footer content={content} />
    </main>
  );
}
