'use client';

import React from 'react';
import { SalonContent } from '../types';
import { VolumeX, SunMedium, Sparkles, Check } from 'lucide-react';

interface ManifestoSectionProps {
  content: SalonContent;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ content }) => {
  const { manifesto } = content;

  // Icon mapping for pillars
  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'acoustics':
        return <VolumeX className="h-5 w-5 text-[#B86B4F]" />;
      case 'daylight':
        return <SunMedium className="h-5 w-5 text-[#B86B4F]" />;
      default:
        return <Sparkles className="h-5 w-5 text-[#B86B4F]" />;
    }
  };

  return (
    <section id="philosophy" className="relative bg-[#EDE8E0]/40 border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1815]/10 pb-8 mb-16">
          <div className="max-w-2xl">
            <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
              {manifesto.section_code}
            </span>
            <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
              {manifesto.section_title}
            </h2>
          </div>
          <div className="max-w-md">
            <blockquote className="font-editorial text-xl italic text-[#5E5750] leading-snug">
              “{manifesto.lead_quote}”
            </blockquote>
            <cite className="mt-2 block font-humanist text-xs uppercase tracking-widest text-[#7A7067] not-italic">
              — {manifesto.lead_quote_author}
            </cite>
          </div>
        </div>

        {/* 3 Core Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {manifesto.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative flex flex-col justify-between rounded-xl border border-[#1C1815]/10 bg-[#F7F4EE] p-8 shadow-xs transition-all duration-300 hover:border-[#B86B4F]/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#1C1815]/8 pb-4 mb-6">
                  <span className="font-cinzel text-lg font-bold text-[#C4A47C]">
                    {pillar.roman_num}
                  </span>
                  <div className="flex items-center gap-2">
                    {getPillarIcon(pillar.id)}
                    <span className="font-humanist text-[10px] uppercase tracking-wider text-[#7A7067]">
                      {pillar.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl font-medium text-[#1C1815]">
                  {pillar.title}
                </h3>
                
                <h4 className="mt-1 font-humanist text-xs font-semibold uppercase tracking-wider text-[#B86B4F]">
                  {pillar.subtitle}
                </h4>

                <p className="mt-4 font-humanist text-sm font-light leading-relaxed text-[#5E5750]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1C1815]/8 flex items-center gap-2 text-xs font-humanist text-[#7A7067]">
                <Check className="h-3.5 w-3.5 text-[#B86B4F]" />
                <span>Quality Standard Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spatial Architecture Imagery & Materiality Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl border border-[#1C1815]/10 bg-[#F7F4EE] p-6 sm:p-10">
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image 1: Travertine Washing Basin */}
            <div className="group relative overflow-hidden rounded-lg aspect-[4/3] border border-[#1C1815]/10">
              <img
                src={manifesto.spatial_image_1.url}
                alt={manifesto.spatial_image_1.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-humanist text-[10px] uppercase tracking-wider text-[#C4A47C]">
                  {manifesto.spatial_image_1.tag}
                </span>
                <p className="font-editorial text-sm leading-tight text-white/95 mt-0.5">
                  {manifesto.spatial_image_1.caption}
                </p>
              </div>
            </div>

            {/* Image 2: Botanical Apothecary */}
            <div className="group relative overflow-hidden rounded-lg aspect-[4/3] border border-[#1C1815]/10">
              <img
                src={manifesto.spatial_image_2.url}
                alt={manifesto.spatial_image_2.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-humanist text-[10px] uppercase tracking-wider text-[#C4A47C]">
                  {manifesto.spatial_image_2.tag}
                </span>
                <p className="font-editorial text-sm leading-tight text-white/95 mt-0.5">
                  {manifesto.spatial_image_2.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Spatial Features Right Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
            <div>
              <span className="font-humanist text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B86B4F]">
                {manifesto.section_eyebrow}
              </span>
              <h3 className="mt-2 font-editorial text-2xl sm:text-3xl text-[#1C1815]">
                Comfortable & Relaxing Space
              </h3>
              <p className="mt-3 font-humanist text-sm font-light leading-relaxed text-[#5E5750]">
                Every detail at Ananya Salon is designed for your comfort: spacious styling chairs, soothing lighting, gentle background music, and a peaceful environment free from rush or noise.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1C1815]/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {manifesto.spatial_features.map((feature, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-editorial text-xl font-medium text-[#1C1815]">
                    {feature.value}
                  </span>
                  <span className="font-humanist text-[10px] uppercase tracking-wider text-[#7A7067] mt-0.5">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
