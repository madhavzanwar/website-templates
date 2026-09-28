'use client';

import React from 'react';
import { RestaurantContent } from '../types';
import { MapPin, Clock, ShieldAlert, Car, Wine, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  content: RestaurantContent;
}

export function Footer({ content }: FooterProps) {
  const { footer, branding } = content;

  return (
    <footer className="w-full bg-[#14080E] text-[#F5EFEB] border-t-2 border-[#D4A359]/30 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Heritage Block & Brand Monogram */}
        <div className="pb-16 mb-16 border-b border-[#D4A359]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-dm-mono uppercase tracking-[0.3em] text-[#D4A359] block mb-2">
              {branding.monogram} • ESTABLISHED {branding.established_year}
            </span>
            <h2 className="font-italiana text-3xl sm:text-4xl text-[#F5EFEB] tracking-wide mb-4">
              {footer.brand_signature}
            </h2>
            <p className="font-manrope text-sm text-[#F5EFEB]/70 font-light leading-relaxed max-w-md">
              {footer.heritage_summary}
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center justify-start lg:justify-end gap-3 sm:gap-6">
            {footer.social_links.map((link) => (
              <a
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#221619] border border-[#D4A359]/25 hover:border-[#D4A359] text-xs font-dm-mono uppercase tracking-wider text-[#F5EFEB]/80 hover:text-[#D4A359] transition-colors rounded-sm flex items-center gap-1.5"
              >
                <span>{link.platform}</span>
                <span className="text-[#D4A359] text-[10px]">({link.handle})</span>
                <ExternalLink className="w-3 h-3 text-[#D4A359]/70" />
              </a>
            ))}
          </div>
        </div>

        {/* 4 Advisory & Concierge Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Column 1: Coordinates & Valet */}
          <div>
            <div className="flex items-center gap-2 text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] mb-4">
              <MapPin className="w-4 h-4 text-[#D4A359]" />
              <span>Location & Valet</span>
            </div>
            <address className="not-italic font-manrope text-sm text-[#F5EFEB]/80 leading-relaxed mb-4 font-light">
              {footer.address.street}
              <br />
              {footer.address.district}, {footer.address.postal_code}
              <br />
              {footer.address.city_country}
            </address>
            <div className="space-y-1 text-xs font-dm-mono text-[#F5EFEB]/60">
              <p>✦ {footer.arrival_valet.valet_note}</p>
              <p className="text-[11px] text-[#D4A359]/80">
                {footer.arrival_valet.nearest_station}
              </p>
            </div>
          </div>

          {/* Column 2: Hours of Hospitality */}
          <div>
            <div className="flex items-center gap-2 text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] mb-4">
              <Clock className="w-4 h-4 text-[#D4A359]" />
              <span>Hours of Hospitality</span>
            </div>
            <div className="space-y-3 font-manrope text-xs text-[#F5EFEB]/80">
              {footer.hours.map((h, i) => (
                <div key={i} className="border-b border-white/5 pb-2">
                  <div className="font-marcellus text-sm text-[#F5EFEB]">
                    {h.meal}
                  </div>
                  <div className="flex justify-between text-xs font-dm-mono text-[#D4A359]">
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Dress Code Advisory */}
          <div>
            <div className="flex items-center gap-2 text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] mb-4">
              <ShieldAlert className="w-4 h-4 text-[#D4A359]" />
              <span>{footer.dress_code.title}</span>
            </div>
            <p className="font-manrope text-xs text-[#F5EFEB]/80 leading-relaxed font-light mb-3">
              {footer.dress_code.policy}
            </p>
            <p className="font-dm-mono text-[11px] text-[#D4A359]/80 leading-relaxed bg-[#221619] p-2.5 border border-[#D4A359]/20 rounded-sm">
              {footer.dress_code.disclaimer}
            </p>
          </div>

          {/* Column 4: Sommelier Cellar Vault */}
          <div>
            <div className="flex items-center gap-2 text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] mb-4">
              <Wine className="w-4 h-4 text-[#D4A359]" />
              <span>{footer.cellar_archive.title}</span>
            </div>
            <div className="font-marcellus text-lg text-[#F5EFEB] mb-1">
              {footer.cellar_archive.total_bins}
            </div>
            <p className="font-manrope text-xs text-[#F5EFEB]/70 font-light leading-relaxed mb-4">
              {footer.cellar_archive.allocations_note}
            </p>
            <a
              href="#tasting"
              className="inline-flex items-center gap-1.5 text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] hover:underline"
            >
              <span>Explore Degustation Crus →</span>
            </a>
          </div>

        </div>

        {/* Curator Seal Ribbon */}
        <div className="py-6 border-y border-[#D4A359]/20 text-center">
          <span className="font-dm-mono text-xs uppercase tracking-[0.25em] text-[#D4A359] font-medium">
            ✦ {footer.curator_seal} ✦
          </span>
        </div>

        {/* Bottom Copyright & Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-dm-mono text-[#F5EFEB]/50">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-6">
            <a href="#top" className="hover:text-[#D4A359] transition-colors">
              Ascend to Top ↑
            </a>
            <span className="text-white/20">•</span>
            <span>Mayfair Salon Sanctuary</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
