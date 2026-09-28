'use client';

import React from 'react';
import { GymContent } from '../types';
import { ArrowRight, ChevronRight, Activity, Flame } from 'lucide-react';

interface HeroProps {
  content: GymContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative overflow-hidden bg-[#090A0C] border-b border-white/10 pt-8 pb-20 md:pt-16 md:pb-28">
      {/* Background Subtle Grid Texture (Hardware Precision, Not a Blob) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#F4F5F7 1px, transparent 1px), linear-gradient(90deg, #F4F5F7 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Asymmetric 7/5 Grid Architecture */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column (7 cols): Monolithic Typography & Tactical CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Monolithic Stacked Display Headline */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold uppercase leading-[0.92] tracking-tighter text-white">
              {content.branding.hero_headline_lines.map((line, idx) => (
                <span key={idx} className="block">
                  {idx === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                      {line}
                    </span>
                  ) : idx === 2 ? (
                    <span className="inline-flex items-baseline gap-3">
                      <span>{line}</span>
                      <span className="h-3 w-3 sm:h-4 sm:w-4 rounded-none bg-[#D4FF00] inline-block mb-1"></span>
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Raw Concrete Subheadline */}
            <p className="mt-8 max-w-xl font-body text-base sm:text-lg leading-relaxed text-zinc-300">
              {content.branding.hero_subheadline}
            </p>

            {/* Dual Tactical Action Triggers */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={content.hero_actions.primary_cta.href}
                className="group flex items-center justify-between sm:justify-center gap-4 border border-[#D4FF00] bg-[#D4FF00] px-7 py-4 text-left transition-all hover:bg-black hover:text-[#D4FF00]"
              >
                <div>
                  <div className="font-display text-sm font-black tracking-wider uppercase text-black group-hover:text-[#D4FF00]">
                    {content.hero_actions.primary_cta.text}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-800 group-hover:text-zinc-400">
                    {content.hero_actions.primary_cta.subtext}
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-black transition-transform group-hover:translate-x-1 group-hover:text-[#D4FF00]" />
              </a>

              <a
                href={content.hero_actions.secondary_cta.href}
                className="group flex items-center justify-between sm:justify-center gap-4 border border-white/20 bg-[#14161B] px-7 py-4 text-left transition-all hover:border-white/50 hover:bg-[#1C1F27]"
              >
                <div>
                  <div className="font-display text-sm font-bold tracking-wider uppercase text-white">
                    {content.hero_actions.secondary_cta.text}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400">
                    {content.hero_actions.secondary_cta.subtext}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </a>
            </div>

            {/* Quick Metrics Bar Under CTAs */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <div className="font-mono text-2xl font-bold text-white tracking-tight">14K</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-1">SQ FT COMPOUND</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-[#D4FF00] tracking-tight">12 CAP</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-1">ATHLETES / CLASS</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white tracking-tight">38°F</div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mt-1">ICE HYDROTHERAPY</div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): 4:5 Monolithic Athletic Media Frame with Floating HUD */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Media Container with 1px Hairline Steel Border & Corner Accents */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/20 bg-[#14161B]">
                {/* Authentic High-Shutter Action Photography */}
                <img
                  src={content.branding.hero_image}
                  alt={`${content.branding.business_name} Compound Training`}
                  className="h-full w-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />

                {/* Subtle Directional Shadow Gradient (Atmospheric Vignette, not Pastel Blob) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Featured Program Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 border border-white/20 bg-[#090A0C]/90 p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                      FEATURED PROGRAM
                    </span>
                    <span className="font-mono text-[10px] text-[#D4FF00]">
                      {content.hero_actions.telemetry_card.zone}
                    </span>
                  </div>

                  <div className="font-display text-base font-bold uppercase tracking-tight text-white">
                    {content.hero_actions.telemetry_card.discipline}
                  </div>

                  <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                    <span>HEAD TRAINER: <strong className="text-zinc-200">{content.hero_actions.telemetry_card.coach}</strong></span>
                  </div>
                </div>

              </div>

              {/* Decorative Industrial Stencil Frame Marker */}
              <div className="absolute -bottom-3 -right-3 hidden h-6 w-6 border-r-2 border-b-2 border-[#D4FF00] sm:block" />
              <div className="absolute -top-3 -left-3 hidden h-6 w-6 border-l-2 border-t-2 border-white/40 sm:block" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
