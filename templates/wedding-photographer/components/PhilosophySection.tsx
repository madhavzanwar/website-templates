'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Sparkles, Feather, ShieldCheck } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface PhilosophySectionProps {
  content: WeddingPhotographerContent;
}

export function PhilosophySection({ content }: PhilosophySectionProps) {
  const { philosophy } = content;

  return (
    <section id="philosophy" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative overflow-hidden">
      
      {/* Background Subtle Watermark Roman Numeral */}
      <div className="absolute right-6 top-12 font-bellefair text-[18vw] text-[#1C1917]/[0.02] pointer-events-none select-none">
        I
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {philosophy.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {philosophy.headline}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {philosophy.headline_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {philosophy.subheading}
          </p>
        </div>

        {/* Narrative & Artisan Profile Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Lead Paragraphs & Hand-Set Quote (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {philosophy.paragraphs.map((para, idx) => (
              <p key={idx} className="font-tenor text-base sm:text-lg text-[#1C1917]/80 leading-relaxed">
                {para}
              </p>
            ))}

            {/* Letterpress Pull Quote Box */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#ECE6DD]/50 border-l-2 border-[#B87D74] border-t border-r border-b border-[#1C1917]/6 relative">
              <Feather className="w-5 h-5 text-[#B87D74] mb-3" />
              <blockquote className="font-newsreader italic text-xl sm:text-2xl text-[#1C1917] leading-snug">
                &ldquo;{philosophy.quote}&rdquo;
              </blockquote>
              <cite className="block mt-4 font-tenor text-xs uppercase tracking-[0.18em] text-[#9D8469] not-italic">
                {philosophy.quote_author}
              </cite>
            </div>
          </div>

          {/* Right Artisan Portrait (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#1C1917]/12 shadow-lg rounded-sm relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE6DD]">
                <Image
                  src={philosophy.artisan_portrait.image}
                  alt={philosophy.artisan_portrait.photographers}
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-center filter grayscale-[0.2] contrast-[1.05]"
                />
              </div>
              <div className="mt-4 pt-3 border-t border-[#1C1917]/8 flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-tenor text-[#1C1917]">
                  <span className="font-semibold uppercase tracking-wider">
                    {philosophy.artisan_portrait.photographers}
                  </span>
                  <span className="text-[#9D8469]">
                    {philosophy.artisan_portrait.experience_years}
                  </span>
                </div>
                <div className="text-[11px] font-tenor text-[#8C827A] italic">
                  {philosophy.artisan_portrait.caption}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {philosophy.pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="p-8 rounded-2xl bg-[#ECE6DD]/40 border border-[#1C1917]/8 flex flex-col justify-between hover:border-[#B87D74]/40 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-bellefair text-3xl text-[#B87D74]">
                    {pillar.number}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#9D8469]" />
                </div>
                <h3 className="font-newsreader text-2xl text-[#1C1917] mb-1">
                  {pillar.title}
                </h3>
                <div className="font-tenor text-xs uppercase tracking-wider text-[#9D8469] mb-4">
                  {pillar.subtitle}
                </div>
                <p className="font-tenor text-sm text-[#57524E] leading-relaxed">
                  {pillar.narrative}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1917]/8 font-tenor text-[11px] text-[#8C827A] tracking-wide">
                <span className="text-[#1C1917] font-medium">Standard: </span>
                {pillar.technical_spec}
              </div>
            </div>
          ))}
        </div>

        {/* The Analog Discipline & Laboratory Certification */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#1C1917] text-[#FAF7F2] border border-[#1C1917] relative overflow-hidden">
          
          {/* Subtle noise grain simulation */}
          <div className="absolute -right-12 -bottom-12 opacity-10">
            <Camera className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-3 text-[#B87D74] font-tenor text-xs uppercase tracking-[0.24em]">
              <Camera className="w-4 h-4" />
              <span>{philosophy.analog_fidelity.title}</span>
            </div>
            
            <p className="font-newsreader text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-relaxed mb-8">
              {philosophy.analog_fidelity.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8 border-b border-white/10">
              {philosophy.analog_fidelity.formats.map((fmt) => (
                <div key={fmt.name} className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-tenor text-[#B87D74] tracking-widest uppercase mb-1">
                    <span>{fmt.medium}</span>
                    <span className="text-stone-400">{fmt.provenance}</span>
                  </div>
                  <h4 className="font-newsreader text-lg text-white mb-2">
                    {fmt.name}
                  </h4>
                  <p className="font-tenor text-xs text-stone-300 leading-relaxed">
                    {fmt.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-tenor text-stone-400 tracking-wider">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B87D74]" />
                <span>{philosophy.analog_fidelity.lab_stamp}</span>
              </div>
              <span className="text-[#9D8469]">CANDID EMOTIONS • TRUE-TO-LIFE COLORS • HANDCRAFTED ALBUMS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
