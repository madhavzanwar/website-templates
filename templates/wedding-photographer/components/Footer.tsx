'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Compass, ArrowUp, Sparkles } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface FooterProps {
  content: WeddingPhotographerContent;
}

export function Footer({ content }: FooterProps) {
  const { footer, branding } = content;

  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-t border-[#1C1917] relative overflow-hidden">
      
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute right-4 bottom-8 font-bellefair text-[16vw] text-white/[0.02] pointer-events-none select-none">
        {branding.monogram}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Colophon Statement */}
        <div className="pb-16 mb-16 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74] block mb-2">
              About Our Studio & Story
            </span>
            <h2 className="font-bellefair text-3xl sm:text-5xl text-white font-normal tracking-wide uppercase">
              {footer.colophon_heading}
            </h2>
            <p className="mt-4 font-tenor text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
              {footer.colophon_statement}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white font-tenor text-xs uppercase tracking-widest hover:border-[#B87D74] hover:text-[#B87D74] transition-colors"
            >
              <span>Return to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 mb-16 border-b border-white/10 text-xs font-tenor">
          
          {/* Column 1: Certified Artisanal Laboratories */}
          <div className="space-y-4">
            <div className="text-[11px] uppercase tracking-widest text-[#B87D74] font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Fine-Art Print & Album Partners</span>
            </div>
            <div className="space-y-3">
              {footer.lab_credentials.map((lab) => (
                <div key={lab.lab_name} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-white font-medium">{lab.lab_name}</div>
                  <div className="text-stone-400 text-[11px]">{lab.service}</div>
                  <div className="text-stone-500 text-[10px] uppercase tracking-wider mt-1">{lab.city}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Upcoming Destination Tour Coordinates */}
          <div className="space-y-4">
            <div className="text-[11px] uppercase tracking-widest text-[#9D8469] font-semibold flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Wedding Destination Travel</span>
            </div>
            <div className="space-y-3">
              {footer.travel_coordinates.map((coord) => (
                <div key={coord.region} className="p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-white font-medium">{coord.region}</div>
                  <div className="text-stone-400 text-[11px]">{coord.months}</div>
                  <div className="text-[#B87D74] text-[10px] uppercase tracking-wider mt-1">
                    {coord.fee_note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Studio Locations & Channels */}
          <div className="space-y-4">
            <div className="text-[11px] uppercase tracking-widest text-stone-300 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B87D74]" />
              <span>Studio Locations & Social</span>
            </div>
            
            <p className="text-stone-300 leading-relaxed">
              Available worldwide for exclusive destination celebrations, remote elopements, and bespoke editorial commissions.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              {footer.social_links.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-1.5 border-b border-white/5 text-stone-300 hover:text-[#B87D74] transition-colors"
                >
                  <span className="uppercase tracking-wider">{link.platform}</span>
                  <span className="text-stone-400">{link.handle}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Archival Seal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-tenor text-stone-400">
          <div>{footer.copyright}</div>
          <div className="text-center sm:text-right text-[#9D8469] tracking-wider uppercase">
            {footer.archival_seal}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[10px] font-tenor text-stone-500 tracking-wider">
          {footer.curator_note}
        </div>

      </div>
    </footer>
  );
}
