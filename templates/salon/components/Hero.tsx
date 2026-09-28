'use client';

import React from 'react';
import { SalonContent } from '../types';
import { ArrowRight, Sparkles, Star, Compass } from 'lucide-react';

interface HeroProps {
  content: SalonContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative overflow-hidden bg-[#F7F4EE] border-b border-[#1C1815]/10 pt-10 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
      {/* Subtle Tactile Organic Texture / Background Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#1C1815 1px, transparent 1px), linear-gradient(90deg, #1C1815 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* 55/45 Asymmetric Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (55% = 7 cols on lg screen): The Poetic Hook & Dual Reservation CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Display Headline with Cormorant Garamond & Italic Accents */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-[4.75rem] font-normal leading-[1.08] tracking-[-0.02em] text-[#1C1815]">
              <span className="block">{content.branding.hero_headline.line1}</span>
              <span className="block italic text-[#B86B4F] font-light">
                {content.branding.hero_headline.line2_italic}
              </span>
            </h1>

            {/* Supporting Editorial Prose */}
            <p className="mt-6 max-w-xl font-humanist text-base sm:text-lg font-light leading-relaxed text-[#5E5750]">
              {content.branding.hero_subheadline}
            </p>

            {/* Dual Architectural Action Clusters */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary Action Button */}
              <a
                href={content.branding.hero_ctas.primary.href}
                className="group flex items-center justify-between sm:justify-center gap-4 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-8 py-4 text-left shadow-sm transition-all duration-300 hover:bg-[#A3593E] hover:border-[#A3593E]"
              >
                <div>
                  <div className="font-humanist text-xs uppercase tracking-[0.18em] font-semibold text-white">
                    {content.branding.hero_ctas.primary.text}
                  </div>
                  <div className="font-humanist text-[10px] text-white/80">
                    {content.branding.hero_ctas.primary.subtext}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Secondary Action Ghost Outline Button */}
              <a
                href={content.branding.hero_ctas.secondary.href}
                className="group flex items-center justify-between sm:justify-center gap-4 rounded-full border border-[#1C1815]/20 bg-transparent px-8 py-4 text-left transition-all duration-300 hover:border-[#1C1815] hover:bg-[#EDE8E0]/70"
              >
                <div>
                  <div className="font-humanist text-xs uppercase tracking-[0.18em] font-medium text-[#1C1815]">
                    {content.branding.hero_ctas.secondary.text}
                  </div>
                  <div className="font-humanist text-[10px] text-[#7A7067]">
                    {content.branding.hero_ctas.secondary.subtext}
                  </div>
                </div>
                <Compass className="h-4 w-4 text-[#7A7067] transition-transform duration-300 group-hover:rotate-45 group-hover:text-[#1C1815]" />
              </a>
            </div>

            {/* Architectural Trust Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-[#1C1815]/10 grid grid-cols-3 gap-6">
              {content.branding.hero_metrics.map((metric, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-editorial text-2xl sm:text-3xl font-medium text-[#1C1815] tracking-tight">
                    {metric.value}
                  </span>
                  <span className="font-humanist text-[11px] font-semibold uppercase tracking-wider text-[#B86B4F] mt-0.5">
                    {metric.label}
                  </span>
                  <span className="font-humanist text-[10px] text-[#7A7067] mt-0.5 hidden sm:block">
                    {metric.description}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column (45% = 5 cols on lg screen): Arched Architectural Portrait & Floating Frosted Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Tall Arched Daylight Architectural Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[140px] sm:rounded-t-[200px] border border-[#1C1815]/15 bg-[#EDE8E0] shadow-[0_20px_50px_rgba(28,24,21,0.08)]">
                <img
                  src={content.branding.hero_image}
                  alt={`${content.branding.business_name} Haute Coiffure Artistry`}
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Chiaroscuro Natural Light Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Frosted Glass Accolade Badge */}
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-white/75 p-5 backdrop-blur-xl shadow-lg transition-transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between border-b border-[#1C1815]/10 pb-2 mb-2">
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-[#1C1815]">
                      {content.branding.hero_accolade.publication}
                    </span>
                    {/* Burnished Bronze Star Rating */}
                    <div className="flex items-center gap-0.5 text-[#C4A47C]">
                      {Array.from({ length: content.branding.hero_accolade.stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#C4A47C]" />
                      ))}
                    </div>
                  </div>

                  <div className="font-editorial text-lg font-medium text-[#1C1815] leading-snug">
                    {content.branding.hero_accolade.badge_text}
                  </div>

                  <div className="mt-1 font-humanist text-[11px] tracking-wide text-[#6E665E]">
                    {content.branding.hero_accolade.rating_label}
                  </div>
                </div>

              </div>

              {/* Decorative Subtle Corner Line Accents */}
              <div className="absolute -bottom-3 -right-3 hidden h-8 w-8 border-r border-b border-[#B86B4F]/40 lg:block" />
              <div className="absolute -top-3 -left-3 hidden h-8 w-8 border-l border-t border-[#1C1815]/30 lg:block" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
