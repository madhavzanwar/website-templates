'use client';

import React from 'react';
import { SalonContent } from '../types';
import { ArrowRight, Award, Scissors } from 'lucide-react';

interface MastersSectionProps {
  content: SalonContent;
}

export const MastersSection: React.FC<MastersSectionProps> = ({ content }) => {
  const { masters } = content;

  return (
    <section id="masters" className="relative bg-[#F7F4EE] border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1815]/10 pb-8 mb-16">
          <div className="max-w-2xl">
            <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
              {masters.section_code}
            </span>
            <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
              {masters.section_title}
            </h2>
            <p className="mt-3 font-humanist text-base font-light text-[#5E5750] leading-relaxed">
              {masters.description}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#1C1815]/15 bg-[#EDE8E0] px-4 py-2 font-humanist text-xs text-[#1C1815]">
            <Scissors className="h-4 w-4 text-[#B86B4F]" />
            <span>Unhurried Sessions: Dedicated Personal Attention</span>
          </div>
        </div>

        {/* 4 Stylist Vertical Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {masters.stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group relative flex flex-col justify-between rounded-xl border border-[#1C1815]/10 bg-[#EDE8E0]/40 overflow-hidden shadow-xs transition-all duration-300 hover:border-[#B86B4F]/40 hover:shadow-md"
            >
              <div>
                {/* Stylist Portrait Frame with Hover Filter Shift */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1C1815]">
                  <img
                    src={stylist.image_url}
                    alt={stylist.name}
                    className="h-full w-full object-cover grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#1C1815]/80 px-2.5 py-1 backdrop-blur-sm">
                    <span className="font-humanist text-[10px] tracking-wider uppercase text-[#C4A47C]">
                      {stylist.experience}
                    </span>
                  </div>
                </div>

                {/* Stylist Details */}
                <div className="p-6">
                  <h3 className="font-editorial text-2xl font-medium text-[#1C1815]">
                    {stylist.name}
                  </h3>
                  
                  <div className="mt-0.5 font-humanist text-xs uppercase tracking-wider font-semibold text-[#B86B4F]">
                    {stylist.role}
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 font-humanist text-[11px] text-[#7A7067]">
                    <Award className="h-3.5 w-3.5 text-[#C4A47C] shrink-0" />
                    <span className="truncate">{stylist.pedigree}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1C1815]/10">
                    <span className="font-humanist text-[10px] uppercase tracking-wider text-[#7A7067] block mb-1">
                      Specialty:
                    </span>
                    <p className="font-humanist text-xs font-medium text-[#1C1815] leading-snug">
                      {stylist.specialty}
                    </p>
                  </div>

                  <p className="mt-3 font-humanist text-xs font-light text-[#5E5750] leading-relaxed line-clamp-3">
                    {stylist.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Reservation Action */}
              <div className="p-6 pt-0">
                <a
                  href="#booking"
                  className="group/btn flex w-full items-center justify-between rounded-full border border-[#1C1815]/20 bg-transparent px-4 py-2.5 font-humanist text-xs uppercase tracking-wider text-[#1C1815] transition-all hover:bg-[#B86B4F] hover:border-[#B86B4F] hover:text-white"
                >
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
