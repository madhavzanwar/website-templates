'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Compass, Sparkles } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface AtelierSectionProps {
  content: InteriorDesignerContent;
}

export function AtelierSection({ content }: AtelierSectionProps) {
  const { studio_philosophy, branding } = content;

  return (
    <section id="atelier" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#E2DDD3]/40 border-t border-[#151618]/15">
      <div className="mx-auto max-w-[1720px]">
        
        {/* Asymmetric 2-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Monochromatic Portrait of Principals / Atelier Drafting Space */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#151618]/20 bg-[#151618]">
              <Image
                src={studio_philosophy.portrait_image}
                alt="Studio Arche Principals"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute inset-0 bg-[#151618]/15 mix-blend-multiply" />
              
              {/* Archival Metadata Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#151618]/85 backdrop-blur-md p-4 text-[#F3F0EA] border border-white/10">
                <div className="font-space-grotesk text-[10px] uppercase tracking-[0.20em] text-[#0F38D9]">
                  STUDIO ARCHITECTURE & INTERIORS
                </div>
                <div className="font-inter-tight text-xs uppercase tracking-wider text-white mt-1">
                  {studio_philosophy.manifesto_author}
                </div>
                <div className="font-inter-tight text-[11px] text-[#F3F0EA]/60 mt-0.5">
                  PUNE HEAD STUDIO & MUMBAI DESIGN OFFICE
                </div>
              </div>
            </div>

            {/* Subtle decorative offset frame */}
            <div className="absolute -top-3 -left-3 -z-10 w-full h-full border border-[#151618]/10 hidden sm:block" />
          </div>

          {/* Right Column: Editorial Philosophy, Manifesto & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-space-grotesk text-xs uppercase tracking-[0.22em] text-[#0F38D9] mb-4">
                <span className="h-1.5 w-1.5 bg-[#0F38D9]" />
                <span>{studio_philosophy.eyebrow}</span>
              </div>

              {/* Monumental Italic Hook */}
              <blockquote className="font-instrument italic text-3xl sm:text-4xl lg:text-5xl text-[#151618] leading-[1.14]">
                &ldquo;{studio_philosophy.manifesto_quote}&rdquo;
              </blockquote>

              <div className="mt-8 space-y-4 font-inter-tight text-base text-[#151618]/80 leading-relaxed">
                {studio_philosophy.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 3 Core Pillars */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#151618]/15">
                {studio_philosophy.core_pillars.map((pillar) => (
                  <div key={pillar.number} className="space-y-1.5">
                    <span className="font-space-grotesk text-xs font-bold text-[#0F38D9]">
                      {pillar.number}.
                    </span>
                    <h4 className="font-space-grotesk text-sm font-semibold text-[#151618]">
                      {pillar.title}
                    </h4>
                    <p className="font-inter-tight text-xs text-[#151618]/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Credentials Ledger */}
            <div className="mt-12 pt-8 border-t border-[#151618]/15">
              <span className="font-space-grotesk text-[11px] font-bold uppercase tracking-[0.18em] text-[#151618]/60 block mb-4">
                AWARDS & RECOGNITION:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {studio_philosophy.credentials.map((cred, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#F3F0EA] border border-[#151618]/10 flex flex-col justify-between"
                  >
                    <span className="font-space-grotesk text-xs font-semibold text-[#151618]">
                      {cred.accolade}
                    </span>
                    <span className="font-inter-tight text-[11px] text-[#151618]/60 mt-2">
                      {cred.year} • {cred.organization}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
