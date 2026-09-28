'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUpRight, Compass, FileText } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface HeroProps {
  content: InteriorDesignerContent;
}

export function Hero({ content }: HeroProps) {
  const { branding } = content;

  return (
    <section className="relative min-h-screen pt-24 pb-8 lg:pt-28 lg:pb-12 px-4 sm:px-6 lg:px-12 flex flex-col justify-between">
      {/* 1px Outer Tactile Hairline Border Enclosure */}
      <div className="relative w-full flex-1 rounded-none border border-[#151618]/15 bg-[#E2DDD3]/40 overflow-hidden flex flex-col justify-between min-h-[calc(100vh-140px)]">
        
        {/* Background Spatial Imagery with Subtle Zoom Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src={branding.hero_image}
            alt={branding.hero_headline}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.92] contrast-[1.03] transition-transform duration-1000 scale-[1.01]"
          />
          {/* Subtle architectural gradient overlay ensuring 100% typographic legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#151618]/80 via-[#151618]/25 to-[#151618]/20" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-[#151618]/40" />
        </div>

        {/* Top Header Layer: Technical Blueprint Stamp & Geographic Index */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 rounded-none border border-white/20 bg-[#151618]/60 backdrop-blur-md px-4 py-2 font-space-grotesk text-xs tracking-[0.16em] uppercase text-[#F3F0EA]">
            <Compass className="h-3.5 w-3.5 text-[#0F38D9]" />
            <span>{branding.hero_metadata.coordinates}</span>
          </div>

          {/* Off-Grid Technical Blueprint Badge */}
          <div className="border border-white/20 bg-[#151618]/70 backdrop-blur-md p-4 max-w-xs text-right hidden sm:block">
            <div className="font-space-grotesk text-[11px] font-semibold uppercase tracking-[0.20em] text-[#0F38D9]">
              {branding.hero_metadata.archive_no}
            </div>
            <div className="font-inter-tight text-xs text-[#F3F0EA]/90 mt-1 uppercase tracking-wider">
              {branding.hero_metadata.typology}
            </div>
            <div className="font-space-grotesk text-[10px] text-[#F3F0EA]/60 uppercase tracking-[0.15em] mt-0.5">
              {branding.hero_metadata.sqft}
            </div>
          </div>
        </div>

        {/* Center / Lower Overlay: Architectural Typography & Dual Action Triggers */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-12 mt-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Monumental Headline */}
            <div className="lg:col-span-8 max-w-4xl">
              <div className="font-space-grotesk text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#0F38D9] bg-white/90 backdrop-blur-md inline-block px-3 py-1 mb-4 shadow-sm">
                CONTEMPORARY ARCHITECTURE & INTERIORS
              </div>
              
              <h1 className="font-space-grotesk text-4xl sm:text-6xl xl:text-7xl font-medium tracking-[-0.03em] text-[#F3F0EA] leading-[1.02]">
                {branding.hero_headline}
              </h1>

              <p className="mt-4 font-instrument text-2xl sm:text-3xl lg:text-4xl italic text-[#F3F0EA]/90 font-normal leading-[1.18] max-w-2xl">
                {branding.hero_subheadline}
              </p>
            </div>

            {/* Bottom-Right Dual Action Triggers */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 lg:items-end">
              <a
                href="#works"
                className="group inline-flex items-center justify-between gap-4 bg-[#151618] hover:bg-[#0F38D9] border border-white/20 px-6 py-4 font-space-grotesk text-xs font-medium uppercase tracking-[0.14em] text-[#F3F0EA] transition-all duration-300 shadow-xl"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>

              <a
                href="#atelier"
                className="group inline-flex items-center justify-between gap-4 bg-white/90 hover:bg-[#F3F0EA] border border-[#151618]/10 px-6 py-4 font-space-grotesk text-xs font-medium uppercase tracking-[0.14em] text-[#151618] transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[#0F38D9]" />
                  <span>Studio Portfolio</span>
                </div>
                <span className="text-[10px] text-[#0F38D9] font-semibold tracking-wider">Explore Brochure ↓</span>
              </a>
            </div>

          </div>

          {/* Hairline Sub-Footer Bar */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-[#F3F0EA]/70 font-inter-tight text-xs tracking-wider uppercase">
            <div className="flex items-center gap-6">
              <span>PUNE STUDIO (VIMAN NAGAR)</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">MUMBAI STUDIO (BANDRA)</span>
            </div>
            <div className="flex items-center gap-2 text-[#F3F0EA]">
              <span className="h-2 w-2 rounded-full bg-[#0F38D9]" />
              <span>BESPOKE RESIDENTIAL & COMMERCIAL ARCHITECTURE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
