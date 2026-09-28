'use client';

import React, { useState } from 'react';
import { RestaurantContent, TastingAct } from '../types';
import { Wine, Coffee, Sparkles, ChevronRight, Clock, Award } from 'lucide-react';

interface TastingMenuScrubberProps {
  content: RestaurantContent;
}

export function TastingMenuScrubber({ content }: TastingMenuScrubberProps) {
  const { tasting_menu } = content;
  const [selectedActIndex, setSelectedActIndex] = useState(0);
  const [pairingMode, setPairingMode] = useState<'wine' | 'botanical'>('wine');

  const currentAct: TastingAct = tasting_menu.acts[selectedActIndex] || tasting_menu.acts[0];

  return (
    <section id="tasting" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20 overflow-hidden">
      {/* Background vinous ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #4A1525 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {tasting_menu.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-4">
            {tasting_menu.title}
          </h2>

          <p className="font-manrope text-base text-[#F5EFEB]/75 font-light mb-6">
            {tasting_menu.subtitle}
          </p>

          {/* Pricing & Duration Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 bg-[#221619] border border-[#D4A359]/30 rounded-sm text-xs font-dm-mono text-[#F5EFEB]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Tasting Menu: <strong className="text-[#D4A359]">{tasting_menu.price_per_cover}</strong></span>
            </div>
            <div className="hidden sm:inline text-white/30">•</div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>{tasting_menu.duration_note}</span>
            </div>
          </div>
        </div>

        {/* 5-Act Interactive Scrubber Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Connecting Track Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#221619] -translate-y-1/2 z-0 hidden sm:block" />
            
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {tasting_menu.acts.map((act, idx) => {
                const isSelected = selectedActIndex === idx;
                return (
                  <button
                    key={act.act_number}
                    onClick={() => setSelectedActIndex(idx)}
                    className={`flex flex-col items-center text-center p-3 rounded-sm transition-all duration-300 border ${
                      isSelected
                        ? 'bg-[#4A1525] border-[#D4A359] shadow-xl shadow-[#4A1525]/60 -translate-y-1'
                        : 'bg-[#221619] border-[#D4A359]/20 hover:border-[#D4A359]/50 text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                    }`}
                  >
                    <span className="text-[10px] font-dm-mono uppercase tracking-widest text-[#D4A359] font-bold mb-1">
                      {act.act_number}
                    </span>
                    <span className="font-marcellus text-xs sm:text-sm truncate w-full text-[#F5EFEB]">
                      {act.act_title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Act Card Showcase: Asymmetric 2-Column Presentation */}
        <div className="max-w-5xl mx-auto bg-[#221619] border border-[#D4A359]/30 rounded-sm overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Visual Plating & Atmosphere (lg:col-span-5) */}
            <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[320px] overflow-hidden">
              <img
                src={currentAct.image}
                alt={currentAct.dish_name}
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#221619] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#221619]" />
              
              <div className="absolute top-4 left-4 bg-[#14080E]/90 px-3 py-1 border border-[#D4A359]/30 text-[11px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {currentAct.act_number} • {currentAct.act_title}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-[#14080E]/90 p-3 border border-[#D4A359]/20 text-[11px] font-dm-mono text-[#F5EFEB]/80">
                <span className="text-[#D4A359] uppercase block mb-0.5">Terrain Origin:</span>
                {currentAct.provenance_note}
              </div>
            </div>

            {/* Right Column: Act Details & Sommelier Pairings (lg:col-span-7) */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Act Stamp */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-dm-mono tracking-[0.2em] text-[#D4A359] uppercase">
                    Stage {selectedActIndex + 1} of 5
                  </span>
                  <span className="text-[11px] font-dm-mono text-[#F5EFEB]/50 uppercase">
                    Degustation Course
                  </span>
                </div>

                <h3 className="font-marcellus text-2xl sm:text-3xl text-[#F5EFEB] mb-3 leading-snug">
                  {currentAct.dish_name}
                </h3>

                <p className="font-manrope text-sm text-[#F5EFEB]/80 leading-relaxed font-light mb-6">
                  {currentAct.dish_description}
                </p>

                {/* Course Ritual */}
                <div className="mb-8 p-3.5 bg-[#14080E] border-l-2 border-[#D4A359] text-xs font-manrope text-[#F5EFEB]/90 italic">
                  <span className="text-[#D4A359] not-italic font-dm-mono text-[10px] uppercase block mb-1">
                    The Service Ritual
                  </span>
                  {currentAct.course_ritual}
                </div>
              </div>

              {/* Pairing Accordion / Selector */}
              <div className="pt-6 border-t border-[#D4A359]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-dm-mono uppercase tracking-wider text-[#D4A359] font-medium">
                    Sommelier Pairing Accompaniment
                  </span>
                  
                  {/* Wine vs Botanical Toggle */}
                  <div className="inline-flex p-0.5 bg-[#14080E] border border-[#D4A359]/30 rounded">
                    <button
                      onClick={() => setPairingMode('wine')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-dm-mono rounded transition-colors ${
                        pairingMode === 'wine'
                          ? 'bg-[#4A1525] text-[#D4A359] font-bold'
                          : 'text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                      }`}
                    >
                      <Wine className="w-3 h-3 text-[#D4A359]" />
                      <span>Grand Cru</span>
                    </button>
                    <button
                      onClick={() => setPairingMode('botanical')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-[11px] font-dm-mono rounded transition-colors ${
                        pairingMode === 'botanical'
                          ? 'bg-[#4A1525] text-[#D4A359] font-bold'
                          : 'text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                      }`}
                    >
                      <Coffee className="w-3 h-3 text-[#D4A359]" />
                      <span>Botanical Tea</span>
                    </button>
                  </div>
                </div>

                {/* Pairing Content Panel */}
                {pairingMode === 'wine' ? (
                  <div className="bg-[#14080E] border border-[#D4A359]/20 p-4 rounded-sm animate-fadeIn">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-dm-mono text-[#D4A359] bg-[#4A1525] px-1.5 py-0.5 rounded">
                          {currentAct.sommelier_pairing.vintage}
                        </span>
                        <h4 className="font-marcellus text-base text-[#F5EFEB]">
                          {currentAct.sommelier_pairing.wine_name}
                        </h4>
                      </div>
                      <span className="text-[10px] font-dm-mono text-[#D4A359]">
                        {currentAct.sommelier_pairing.abv}
                      </span>
                    </div>

                    <p className="text-xs font-dm-mono text-[#F5EFEB]/60 mb-2">
                      {currentAct.sommelier_pairing.estate_producer} • {currentAct.sommelier_pairing.region_cru}
                    </p>

                    <p className="text-xs font-manrope text-[#F5EFEB]/80 italic">
                      "{currentAct.sommelier_pairing.sommelier_tasting_note}"
                    </p>
                  </div>
                ) : (
                  <div className="bg-[#14080E] border border-[#D4A359]/20 p-4 rounded-sm animate-fadeIn">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-dm-mono text-[#D4A359] bg-[#221619] px-1.5 py-0.5 rounded">
                        Infusion
                      </span>
                      <h4 className="font-marcellus text-base text-[#F5EFEB]">
                        {currentAct.botanical_pairing.infusion_name}
                      </h4>
                    </div>

                    <p className="text-xs font-dm-mono text-[#F5EFEB]/60 mb-2">
                      Extraction Technique: {currentAct.botanical_pairing.craft_technique}
                    </p>

                    <p className="text-xs font-manrope text-[#F5EFEB]/80 italic">
                      "{currentAct.botanical_pairing.tasting_note}"
                    </p>
                  </div>
                )}

                {/* Supplement Prices */}
                <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-dm-mono text-[#F5EFEB]/50">
                  <span>Pairing Add-on: {tasting_menu.wine_pairing_price}</span>
                  <span>Non-Alcoholic: {tasting_menu.botanical_pairing_price}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
