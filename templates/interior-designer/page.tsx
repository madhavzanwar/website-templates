'use client';

import React from 'react';
import defaultContent from './content.json';
import { InteriorDesignerContent } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { MethodologySection } from './components/MethodologySection';
import { MaterialityMoodboard } from './components/MaterialityMoodboard';
import { AtelierSection } from './components/AtelierSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ConsultationEngine } from './components/ConsultationEngine';
import { StickyBlueprintDock } from './components/StickyBlueprintDock';
import { Footer } from './components/Footer';

interface InteriorDesignerPageProps {
  customContent?: Partial<InteriorDesignerContent>;
}

export default function InteriorDesignerPage({ customContent }: InteriorDesignerPageProps = {}) {
  // Support content overriding via prop while defaulting entirely to decoupled content.json
  const content = (customContent ? { ...defaultContent, ...customContent } : defaultContent) as InteriorDesignerContent;

  return (
    <main
      id="top"
      className="min-h-screen bg-[#F3F0EA] text-[#151618] font-inter-tight selection:bg-[#0F38D9] selection:text-[#F3F0EA]"
    >
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --color-spatial-primary: ${content.branding.primary_color || '#0F38D9'};
          --color-spatial-slate: ${content.branding.slate_color || '#151618'};
          --color-spatial-stone: ${content.branding.stone_color || '#E2DDD3'};
          --color-spatial-canvas: ${content.branding.canvas_color || '#F3F0EA'};
        }
      `}</style>

      {/* 1. Minimalist Architectural Navigation with Live Commissions Pill */}
      <Navbar content={content} />

      {/* 2. Monumental 100vh Spatial Frame with Blueprint Metadata Stamp & Dual CTAs */}
      <Hero content={content} />

      {/* 3. Asymmetric Museum-Scale Portfolio Grid with Filter Tabs & CAD Inspection */}
      <FeaturedProjects content={content} />

      {/* 4. Flagship Interactive Feature: Draggable Before/After Renovation Split Slider */}
      <BeforeAfterSlider content={content} />

      {/* 5. 4-Phase Architectural Milestone Ledger (Spatial Diagnosis to Turnkey Oversight) */}
      <MethodologySection content={content} />

      {/* 6. Interactive 6-Tile Physical Material Spec Matrix with Provenance & Technical Dossier */}
      <MaterialityMoodboard content={content} />

      {/* 7. Studio Atelier & Principal Philosophy Manifesto */}
      <AtelierSection content={content} />

      {/* 8. Institutional AD100 Citations & Private Residential Client Testimonials */}
      <TestimonialsSection content={content} />

      {/* 9. Architect-Grade Project Commission Brief Intake Engine + WhatsApp Concierge */}
      <ConsultationEngine content={content} />

      {/* 10. Floating Real-Time Commissions Status Dock */}
      <StickyBlueprintDock content={content} />

      {/* 11. Deep Basalt Slate Anchor Footer with Monumental Monogram & Dual Timezone Clocks */}
      <Footer content={content} />
    </main>
  );
}
