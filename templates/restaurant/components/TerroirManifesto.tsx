'use client';

import React from 'react';
import { RestaurantContent } from '../types';
import { Award, Compass, Flame, Leaf, Wine, ShieldCheck } from 'lucide-react';

interface TerroirManifestoProps {
  content: RestaurantContent;
}

export function TerroirManifesto({ content }: TerroirManifestoProps) {
  const { terroir_manifesto } = content;

  // Icon mapping helper for the 3 pillars
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Leaf className="w-5 h-5 text-[#D4A359]" />;
      case 1:
        return <Wine className="w-5 h-5 text-[#D4A359]" />;
      case 2:
      default:
        return <Flame className="w-5 h-5 text-[#D4A359]" />;
    }
  };

  return (
    <section id="terroir" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {terroir_manifesto.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-6">
            {terroir_manifesto.heading}
          </h2>

          <p className="font-italiana text-xl sm:text-2xl text-[#D4A359] italic mb-6">
            {terroir_manifesto.subheading}
          </p>

          <p className="font-manrope text-base text-[#F5EFEB]/75 leading-relaxed font-light">
            {terroir_manifesto.lead_paragraph}
          </p>
        </div>

        {/* Tri-Pillar Terroir Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {terroir_manifesto.pillars.map((pillar, idx) => (
            <div
              key={pillar.pillar_number}
              className="group relative bg-[#221619] border border-[#D4A359]/20 hover:border-[#D4A359]/60 p-8 rounded-sm transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1"
            >
              {/* Corner Accent Hairline */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4A359]/10 rotate-45 transform origin-top-right group-hover:bg-[#D4A359]/20 transition-colors" />
              </div>

              <div>
                {/* Pillar Header & Stamp */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D4A359]/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#14080E] border border-[#D4A359]/30 flex items-center justify-center">
                      {getPillarIcon(idx)}
                    </div>
                    <span className="font-dm-mono text-sm tracking-widest text-[#D4A359]">
                      PILLAR {pillar.pillar_number}
                    </span>
                  </div>
                </div>

                <h3 className="font-marcellus text-xl sm:text-2xl text-[#F5EFEB] mb-2 group-hover:text-[#D4A359] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs font-dm-mono uppercase tracking-wider text-[#D4A359]/80 mb-4">
                  {pillar.subtitle}
                </p>

                <p className="font-manrope text-sm text-[#F5EFEB]/70 leading-relaxed font-light mb-8">
                  {pillar.narrative}
                </p>
              </div>

              {/* Bottom Metric & Artisan Focus */}
              <div className="pt-6 border-t border-[#D4A359]/15">
                <div className="mb-3">
                  <span className="block font-dm-mono text-2xl font-bold text-[#D4A359] tracking-tight">
                    {pillar.metric_value}
                  </span>
                  <span className="text-[11px] font-manrope text-[#F5EFEB]/60 uppercase tracking-wider">
                    {pillar.metric_label}
                  </span>
                </div>
                <div className="text-[11px] font-dm-mono text-[#F5EFEB]/50">
                  <span className="text-[#D4A359]/60">Guild: </span>
                  {pillar.artisan_focus}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin & Guild Accreditations Strip */}
        <div className="pt-12 border-t border-[#D4A359]/20">
          <div className="text-center mb-8">
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              Certified Provenance & Accreditations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {terroir_manifesto.credentials.map((cred) => (
              <div
                key={cred.title}
                className="bg-[#14080E] border border-[#D4A359]/25 p-6 rounded-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#4A1525]/60 border border-[#D4A359]/40 flex items-center justify-center shrink-0 text-[#D4A359]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-dm-mono text-[#D4A359] px-1.5 py-0.5 bg-[#221619] rounded">
                      {cred.year}
                    </span>
                    <span className="font-marcellus text-base text-[#F5EFEB]">
                      {cred.title}
                    </span>
                  </div>
                  <span className="block text-xs font-dm-mono text-[#F5EFEB]/60 mb-2">
                    {cred.organization}
                  </span>
                  <p className="text-xs font-manrope text-[#F5EFEB]/70 italic font-light">
                    "{cred.inscription}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
