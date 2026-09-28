'use client';

import React from 'react';
import { GymContent } from '../types';
import { ShieldCheck, Dumbbell, Snowflake, Users } from 'lucide-react';

interface AboutSectionProps {
  content: GymContent;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  return (
    <section id="compound" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header with Stencil Code */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              {content.about.section_code}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {content.about.section_title}
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest max-w-xs">
            BUILT FOR PROGRESSIVE OVERLOAD · ZERO SANITIZED COMPROMISE
          </div>
        </div>

        {/* Narrative & Manifesto Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Lead Statement */}
          <div className="lg:col-span-5">
            <blockquote className="border-l-2 border-[#D4FF00] pl-6 font-display text-xl sm:text-2xl font-bold leading-snug text-white uppercase">
              "{content.about.lead_statement}"
            </blockquote>
            
            <div className="mt-8 space-y-4 font-body text-zinc-400 text-sm sm:text-base leading-relaxed">
              {content.about.body_paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Location Stamp */}
            <div className="mt-10 inline-block border border-white/15 bg-[#14161B] p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#D4FF00]">OUR LOCATION</div>
              <div className="mt-1 font-mono text-xs font-semibold text-zinc-200">BANER ROAD // PUNE 411045</div>
              <div className="mt-1 text-[11px] text-zinc-400 font-mono">NEAR JUPITER HOSPITAL · PARKING AVAILABLE</div>
            </div>
          </div>

          {/* Right Column: 4 Technical Specification Tiles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.about.specifications.map((spec, idx) => (
              <div 
                key={idx}
                className="group relative border border-white/10 bg-[#14161B] p-8 transition-all hover:border-[#D4FF00] hover:bg-[#1A1D24]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">
                    SPEC 0{idx + 1}
                  </span>
                  {idx === 0 && <Dumbbell className="h-4 w-4 text-zinc-600 group-hover:text-[#D4FF00]" />}
                  {idx === 1 && <Users className="h-4 w-4 text-zinc-600 group-hover:text-[#D4FF00]" />}
                  {idx === 2 && <Snowflake className="h-4 w-4 text-zinc-600 group-hover:text-[#D4FF00]" />}
                  {idx === 3 && <ShieldCheck className="h-4 w-4 text-zinc-600 group-hover:text-[#D4FF00]" />}
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl sm:text-5xl font-black tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
                    {spec.value}
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {spec.unit}
                  </span>
                </div>

                <div className="mt-3 font-mono text-xs uppercase tracking-wider text-zinc-300">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
