'use client';

import React from 'react';
import Link from 'next/link';
import { CafeContent } from '../types';
import { ArrowUpRight, Compass, Sparkles, Flame, Check } from 'lucide-react';

interface HeroProps {
  content: CafeContent;
}

export function Hero({ content }: HeroProps) {
  const { branding, hero_actions } = content;
  const stamp = branding.hero_origin_stamp;

  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] border-b border-[#231B16]/10 pt-10 pb-16 lg:py-20">
      {/* Background subtle noise & radial warmth */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#231B16 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (60% equivalent: 7 cols in 12-col grid) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 self-start border border-[#B85D38]/30 bg-[#EDE6DA] px-3.5 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-widest text-[#231B16] mb-6 shadow-xs">
              <span>EST. {branding.established_year}</span>
              <span className="text-[#231B16]/30">•</span>
              <span className="text-[#B85D38] font-semibold">{branding.tagline}</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-artisanal text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#231B16] leading-[1.08]">
              {branding.hero_headline.line1}{' '}
              <span className="italic font-normal text-[#B85D38] underline decoration-[#D99B4B]/40 decoration-wavy decoration-1 underline-offset-8">
                {branding.hero_headline.line2_italic}
              </span>{' '}
              {branding.hero_headline.line3}
            </h1>

            {/* Narrative Subcopy */}
            <p className="mt-6 max-w-2xl font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
              {branding.hero_subheadline}
            </p>

            {/* Dual CTA Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={hero_actions.primary_cta.href}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#B85D38] text-[#F7F4EE] font-mono text-xs uppercase tracking-wider font-bold rounded-sm shadow-md hover:bg-[#9E4D2C] hover:shadow-lg transition-all transform active:scale-98"
              >
                <span>{hero_actions.primary_cta.text}</span>
                <ArrowUpRight className="w-4 h-4 text-[#F7F4EE]" />
              </Link>

              <Link
                href={hero_actions.secondary_cta.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#231B16]/30 bg-transparent text-[#231B16] font-mono text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#EDE6DA] transition-all"
              >
                <Compass className="w-4 h-4 text-[#B85D38]" />
                <span>{hero_actions.secondary_cta.text}</span>
              </Link>
            </div>

            {/* Quick Micro-Stats Bar */}
            <div className="mt-12 pt-8 border-t border-[#231B16]/10 grid grid-cols-3 gap-4">
              {hero_actions.quick_stats.map((stat, idx) => (
                <div key={idx} className="border-l-2 border-[#B85D38]/40 pl-3">
                  <div className="font-mono text-xs sm:text-sm font-bold text-[#231B16] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-humanist text-[11px] sm:text-xs text-[#231B16]/60 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (40% equivalent: 5 cols in 12-col grid) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Layer 1: Anchor Photography with Warm Passepartout Frame */}
              <div className="relative overflow-hidden rounded-md border-2 border-[#231B16]/20 bg-[#EDE6DA] p-3 shadow-2xl">
                <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-[#231B16]">
                  <img
                    src={branding.hero_image}
                    alt={branding.business_name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Atmospheric warm morning gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231B16]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Micro caption on bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 font-mono text-[10px] tracking-wider uppercase bg-[#231B16]/60 backdrop-blur-xs px-2.5 py-1.5 rounded-sm">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-[#D99B4B]" />
                      Fresh Specialty Coffee
                    </span>
                    <span>Single-Estate Origin</span>
                  </div>
                </div>
              </div>

              {/* Layer 2: Tactile Colombian Coffee Origin Postal Stamp Card (Overlapping) */}
              <div className="absolute -bottom-8 -left-4 sm:-left-8 max-w-[280px] sm:max-w-[310px] bg-[#FFFDF9] border border-[#231B16]/20 p-4 rounded-sm shadow-xl z-20 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                {/* Stamp Perforation Border styling */}
                <div className="border border-dashed border-[#B85D38]/50 p-3 bg-[#F7F4EE]/60">
                  <div className="flex items-center justify-between border-b border-[#231B16]/10 pb-2 mb-2.5">
                    <div className="flex items-center gap-1 text-[#B85D38] font-mono text-[10px] font-bold tracking-widest uppercase">
                      <Sparkles className="w-3 h-3 text-[#D99B4B]" />
                      DIRECT ORIGIN LOT
                    </div>
                    <span className="font-mono text-[9px] text-[#231B16]/50 uppercase font-semibold">
                      {stamp.lot_number}
                    </span>
                  </div>

                  <div className="font-artisanal text-lg font-bold text-[#231B16] leading-tight">
                    {stamp.estate}
                  </div>
                  <div className="font-mono text-xs text-[#B85D38] font-semibold mt-0.5">
                    {stamp.origin}
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-mono text-[#231B16]/80 bg-[#EDE6DA]/40 p-2 rounded-xs">
                    <div>
                      <span className="text-[#231B16]/50 block">ELEVATION</span>
                      <strong className="text-[#231B16]">{stamp.masl}</strong>
                    </div>
                    <div>
                      <span className="text-[#231B16]/50 block">VARIETAL</span>
                      <strong className="text-[#231B16]">{stamp.varietal}</strong>
                    </div>
                  </div>

                  {/* Cupping Notes Pills */}
                  <div className="mt-2.5 pt-2 border-t border-[#231B16]/10">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#231B16]/60 block mb-1">
                      CUPPING FLAVOR NOTES
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stamp.notes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 bg-[#B85D38]/10 text-[#B85D38] font-mono text-[10px] font-semibold rounded-xs border border-[#B85D38]/20"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 3: Rotating Vintage Circular Roastery Seal */}
              <div className="absolute -top-6 -right-4 sm:-right-6 w-24 h-24 rounded-full bg-[#231B16] text-[#D99B4B] p-1 flex items-center justify-center shadow-xl border-2 border-[#D99B4B]/40 z-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full animate-[spin_24s_linear_infinite]" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fontSize="8.5" fill="#FAF6EE" fontFamily="var(--font-mono)" letterSpacing="2">
                      <textPath href="#circlePath" startOffset="0%">
                        {branding.rotating_stamp_badge}
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-[#D99B4B]" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
