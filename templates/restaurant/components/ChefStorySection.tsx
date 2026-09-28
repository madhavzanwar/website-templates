'use client';

import React from 'react';
import { RestaurantContent } from '../types';
import { Flame, Compass, Sparkles } from 'lucide-react';

interface ChefStorySectionProps {
  content: RestaurantContent;
}

export function ChefStorySection({ content }: ChefStorySectionProps) {
  const { chef_story } = content;

  return (
    <section id="chef" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric 2-Column Editorial Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Kitchen Brigade & Hearth Candid (lg:col-span-5) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#D4A359]/30 shadow-2xl shadow-black">
              <img
                src={chef_story.kitchen_photo}
                alt="Head Chef and kitchen team"
                className="w-full h-full object-cover object-center filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-[#14080E]/20 mix-blend-multiply pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#221619]/95 backdrop-blur-md border border-[#D4A359]/30 p-3.5 rounded-sm">
                <div className="flex items-center justify-between text-xs font-dm-mono text-[#D4A359] uppercase tracking-wider mb-1">
                  <span>Pre-Service Preparation</span>
                  <span>Daily Briefing</span>
                </div>
                <p className="text-xs font-manrope text-[#F5EFEB]/75 font-light">
                  Inspecting fresh local ingredients and preparing charcoal tandoor hearths.
                </p>
              </div>
            </div>

            {/* Corner Accent Box: Hearth Fire Philosophy */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 bg-[#221619] border-2 border-[#D4A359] p-4 rounded-sm shadow-xl max-w-[220px]">
              <div className="flex items-center gap-2 text-xs font-dm-mono text-[#D4A359] uppercase tracking-wider mb-1.5">
                <Flame className="w-3.5 h-3.5 text-[#D4A359]" />
                <span>Zero Gas Cooking</span>
              </div>
              <p className="text-[11px] font-manrope text-[#F5EFEB]/70 leading-snug">
                {chef_story.firewood_philosophy.fuel_type} • {chef_story.firewood_philosophy.temperature_celsius}
              </p>
            </div>
          </div>

          {/* Right Column: Narrative & Chef Profile (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-[#D4A359]"></span>
              <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
                {chef_story.badge}
              </span>
            </div>

            <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-3">
              {chef_story.heading}
            </h2>

            <p className="text-sm font-dm-mono uppercase tracking-wider text-[#D4A359] mb-8">
              {chef_story.subheading}
            </p>

            {/* Lead Direct Quote */}
            <blockquote className="border-l-2 border-[#D4A359] pl-6 py-2 mb-8 bg-[#221619]/40 rounded-r-sm">
              <p className="font-italiana text-2xl sm:text-3xl text-[#F5EFEB] leading-snug italic">
                "{chef_story.lead_quote}"
              </p>
            </blockquote>

            {/* Body Paragraphs */}
            <div className="space-y-4 font-manrope text-sm sm:text-base text-[#F5EFEB]/80 leading-relaxed font-light mb-10">
              {chef_story.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Chef Profile Badge & Hand-Signed Crest */}
            <div className="pt-8 border-t border-[#D4A359]/20 flex flex-wrap items-center justify-between gap-6">
              <div>
                <h3 className="font-marcellus text-xl text-[#F5EFEB]">
                  {chef_story.chef_profile.name}
                </h3>
                <p className="text-xs font-dm-mono text-[#D4A359] uppercase tracking-wider mb-1">
                  {chef_story.chef_profile.role}
                </p>
                <p className="text-xs font-manrope text-[#F5EFEB]/60 font-light">
                  {chef_story.chef_profile.accolades}
                </p>
              </div>

              {/* Hand-Signed Crest Simulation */}
              <div className="flex flex-col items-center">
                <span className="font-italiana italic text-2xl sm:text-3xl text-[#D4A359] tracking-widest font-normal">
                  {chef_story.chef_profile.signature_stamp}
                </span>
                <span className="w-24 h-[1px] bg-[#D4A359]/40 mt-1" />
                <span className="text-[9px] font-dm-mono uppercase tracking-widest text-[#F5EFEB]/40 mt-1">
                  Co-Owner & Hearth Director
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
