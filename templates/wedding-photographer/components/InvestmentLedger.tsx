'use client';

import React from 'react';
import { ArrowUpRight, BookOpen, Film, Clock, Sparkles } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface InvestmentLedgerProps {
  content: WeddingPhotographerContent;
}

export function InvestmentLedger({ content }: InvestmentLedgerProps) {
  const { investment } = content;

  return (
    <section id="investment" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {investment.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {investment.title}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {investment.title_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {investment.subtitle}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-tenor text-[#9D8469] tracking-wider uppercase bg-[#ECE6DD]/60 px-3.5 py-1.5 rounded-full border border-[#1C1917]/6">
            <Sparkles className="w-3.5 h-3.5 text-[#B87D74]" />
            <span>{investment.note}</span>
          </div>
        </div>

        {/* Editorial 3-Column Atelier Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {investment.packages.map((pkg) => {
            const isFeatured = pkg.is_featured;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#ECE6DD]/80 border-2 border-[#B87D74] shadow-[0_15px_40px_rgba(184,125,116,0.12)]'
                    : 'bg-[#ECE6DD]/40 border border-[#1C1917]/10 hover:border-[#1C1917]/25 shadow-sm'
                }`}
              >
                {/* Featured Badge Stamp */}
                {isFeatured && pkg.featured_badge && (
                  <div className="absolute -top-3.5 left-8 px-3.5 py-1 rounded-full bg-[#B87D74] text-white font-tenor text-[10px] tracking-[0.22em] uppercase font-semibold shadow-sm">
                    {pkg.featured_badge}
                  </div>
                )}

                <div>
                  {/* Ledger Reference Code */}
                  <div className="font-bellefair text-xs tracking-[0.24em] text-[#9D8469] uppercase mb-4">
                    {pkg.ledger_code}
                  </div>

                  {/* Collection Title */}
                  <h3 className="font-newsreader text-2xl sm:text-3xl text-[#1C1917] font-normal leading-tight mb-3">
                    {pkg.name}
                  </h3>

                  {/* Clientele Type */}
                  <p className="font-tenor text-xs text-[#57524E] italic mb-6 leading-relaxed">
                    {pkg.clientele_type}
                  </p>

                  {/* Investment Price Anchor */}
                  <div className="pb-6 mb-6 border-b border-[#1C1917]/10">
                    <span className="font-bellefair text-3xl sm:text-4xl text-[#1C1917] tracking-tight">
                      {pkg.starting_price}
                    </span>
                    <span className="block mt-1 font-tenor text-[11px] text-[#8C827A] uppercase tracking-wider">
                      {pkg.hours}
                    </span>
                  </div>

                  {/* Specifications & Overview */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-2.5 text-xs font-tenor text-[#1C1917]">
                      <Clock className="w-4 h-4 text-[#B87D74] shrink-0 mt-0.5" />
                      <span>{pkg.coverage_details}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs font-tenor text-[#1C1917]">
                      <Film className="w-4 h-4 text-[#9D8469] shrink-0 mt-0.5" />
                      <span>{pkg.film_allowance}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs font-tenor text-[#1C1917]">
                      <BookOpen className="w-4 h-4 text-[#B87D74] shrink-0 mt-0.5" />
                      <span>{pkg.album_spec}</span>
                    </div>
                  </div>

                  {/* Detailed Inclusions Ledger */}
                  <div className="space-y-2.5 pt-6 border-t border-[#1C1917]/8 mb-8">
                    <div className="font-tenor text-[11px] uppercase tracking-widest text-[#9D8469] mb-3 font-semibold">
                      Package Inclusions:
                    </div>
                    {pkg.inclusions.map((inclusion, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-xs font-tenor text-[#57524E] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B87D74] mt-1.5 shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 border-t border-[#1C1917]/10">
                  <div className="text-[11px] font-tenor text-[#8C827A] mb-4">
                    Delivery: {pkg.delivery_timeline}
                  </div>

                  <a
                    href="#inquiry"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-tenor text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                      isFeatured
                        ? 'bg-[#1C1917] text-[#FAF7F2] hover:bg-[#B87D74] shadow-sm'
                        : 'bg-transparent border border-[#1C1917]/25 text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2]'
                    }`}
                  >
                    <span>Book This Package</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bespoke Notice & Currency Disclaimer */}
        <div className="mt-16 p-8 rounded-2xl bg-[#FAF7F2] border border-[#1C1917]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-newsreader text-xl text-[#1C1917] mb-1">
              Custom Packages & Destination Weddings
            </h4>
            <p className="font-tenor text-xs sm:text-sm text-[#57524E] leading-relaxed">
              {investment.bespoke_notice}
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="block font-tenor text-[11px] text-[#8C827A] max-w-xs">
              {investment.currency_disclaimer}
            </span>
            <a
              href="#inquiry"
              className="inline-block mt-2 font-tenor text-xs uppercase tracking-wider text-[#B87D74] hover:underline"
            >
              Request Custom Quote →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
