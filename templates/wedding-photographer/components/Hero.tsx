'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, Film, Sparkles, MapPin } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface HeroProps {
  content: WeddingPhotographerContent;
}

export function Hero({ content }: HeroProps) {
  const { hero, branding } = content;

  return (
    <section className="relative min-h-screen pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] overflow-hidden flex flex-col justify-between">
      
      {/* Subtle Analog Film Grain Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply z-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Museum Passepartout Mount Container */}
        <div className="relative mx-auto w-full p-[2vw] sm:p-[3vw] lg:p-[3.5vw] bg-[#FAF7F2] border border-[#1C1917]/10 shadow-[0_20px_60px_-15px_rgba(28,25,23,0.07)] rounded-sm">
          
          {/* Inner Hairline Passepartout Bevel */}
          <div className="relative border border-[#1C1917]/12 p-3 sm:p-5 lg:p-6 bg-[#FAF7F2]/60">
            
            {/* Top Curatorial Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-[#1C1917]/8 text-[#8C827A] font-tenor text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              <div className="flex items-center gap-2">
                <Film className="w-3.5 h-3.5 text-[#B87D74]" />
                <span>{hero.film_stock_badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9D8469]" />
                <span>{hero.location_stamp}</span>
              </div>
              <div className="hidden md:block">
                <span>{hero.aspect_ratio_label}</span>
              </div>
            </div>

            {/* Asymmetric Monograph Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Editorial Narrative & Headings (Cols 1-7) */}
              <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6 order-2 lg:order-1">
                
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="w-6 h-[1px] bg-[#B87D74]" />
                  <span className="font-tenor text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#B87D74]">
                    {hero.eyebrow}
                  </span>
                </div>

                {/* Primary Poetic Headline in Newsreader */}
                <h1 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-[1.08] tracking-tight">
                  {hero.headline_main}{' '}
                  <span className="italic font-light text-[#B87D74] block sm:inline">
                    {hero.headline_italic}
                  </span>
                </h1>

                {/* Subheadline in Tenor Sans */}
                <p className="mt-6 sm:mt-8 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed max-w-xl">
                  {hero.subheadline}
                </p>

                {/* Secondary Narrative Pill */}
                <div className="mt-6 p-4 rounded-xl bg-[#ECE6DD]/60 border border-[#1C1917]/6 text-xs font-tenor text-[#57524E] leading-relaxed max-w-lg">
                  <div className="flex items-center gap-2 text-[#9D8469] font-medium uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Candid & Fine-Art Storytelling</span>
                  </div>
                  <span>{branding.camera_gear_specs}</span>
                </div>

                {/* Dual CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
                  <a
                    href={hero.primary_cta.href}
                    className="px-6 sm:px-8 py-3.5 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-[0.18em] hover:bg-[#B87D74] transition-all duration-300 shadow-sm"
                  >
                    {hero.primary_cta.label}
                  </a>
                  <a
                    href={hero.secondary_cta.href}
                    className="px-6 sm:px-8 py-3.5 rounded-full bg-transparent border border-[#1C1917]/25 text-[#1C1917] font-tenor text-xs uppercase tracking-[0.18em] hover:border-[#B87D74] hover:text-[#B87D74] transition-all duration-300"
                  >
                    {hero.secondary_cta.label}
                  </a>
                </div>

                {/* Availability Notice */}
                <div className="mt-8 flex items-center gap-3 text-xs font-tenor text-[#8C827A]">
                  <span className="w-2 h-2 rounded-full bg-[#B87D74]" />
                  <span>
                    Accepting limited wedding commissions. {branding.availability_status.season_label}.
                  </span>
                </div>
              </div>

              {/* Right Vertical Framed Fine-Art Photograph (Cols 8-12) */}
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative group mx-auto max-w-md lg:max-w-none">
                  
                  {/* Outer Archival Border Mat */}
                  <div className="p-3 sm:p-4 bg-[#FAF7F2] border border-[#1C1917]/15 shadow-xl transition-transform duration-700 ease-out group-hover:scale-[1.01]">
                    
                    {/* Inner 4:5 Vertical Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE6DD]">
                      <Image
                        src={branding.hero_image}
                        alt={branding.tagline}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                        className="object-cover object-center filter contrast-[1.02] brightness-[0.98] transition-transform duration-1000 group-hover:scale-105"
                      />

                      {/* Film Grain & Light Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/40 via-transparent to-transparent pointer-events-none" />

                      {/* Bottom Edge Archival Label */}
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded bg-[#FAF7F2]/90 backdrop-blur-sm border border-[#1C1917]/10 flex items-center justify-between text-[10px] font-tenor text-[#1C1917] tracking-wider uppercase">
                        <span className="truncate">{branding.hero_location_stamp}</span>
                        <span className="text-[#9D8469] font-medium ml-2 shrink-0">FINE-ART</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent Hairlines simulating museum mat mounting pins */}
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#B87D74]/60 pointer-events-none" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#B87D74]/60 pointer-events-none" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#B87D74]/60 pointer-events-none" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#B87D74]/60 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Bottom Monograph Footer Bar */}
            <div className="mt-8 pt-4 border-t border-[#1C1917]/8 flex flex-wrap items-center justify-between text-[11px] font-tenor text-[#8C827A] tracking-widest uppercase">
              <span>{branding.business_name}</span>
              <div className="flex items-center gap-2">
                <span>{hero.scroll_hint}</span>
                <ArrowDown className="w-3 h-3 text-[#B87D74] animate-bounce" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
