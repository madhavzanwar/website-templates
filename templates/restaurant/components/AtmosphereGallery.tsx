'use client';

import React, { useState } from 'react';
import { RestaurantContent } from '../types';
import { Sparkles, Eye } from 'lucide-react';

interface AtmosphereGalleryProps {
  content: RestaurantContent;
}

export function AtmosphereGallery({ content }: AtmosphereGalleryProps) {
  const { atmosphere_gallery } = content;
  const [activeFrameIndex, setActiveFrameIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {atmosphere_gallery.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-4">
            {atmosphere_gallery.title}
          </h2>

          <p className="font-manrope text-base text-[#F5EFEB]/75 font-light">
            {atmosphere_gallery.subtitle}
          </p>
        </div>

        {/* 5-Frame Asymmetric Chiaroscuro Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Frame 1: Large Wide Top Banquette (md:col-span-8) */}
          {atmosphere_gallery.frames[0] && (
            <div 
              className="md:col-span-8 group relative aspect-[16/9] md:aspect-[21/10] rounded-sm overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359]/70 transition-all duration-500 shadow-xl"
              onMouseEnter={() => setActiveFrameIndex(0)}
              onMouseLeave={() => setActiveFrameIndex(null)}
            >
              <img
                src={atmosphere_gallery.frames[0].url}
                alt={atmosphere_gallery.frames[0].title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-[#14080E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 bg-[#221619]/90 border border-[#D4A359]/30 px-3 py-1 text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {atmosphere_gallery.frames[0].sensory_subject}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-marcellus text-xl sm:text-2xl text-[#F5EFEB] mb-1 group-hover:text-[#D4A359] transition-colors">
                  {atmosphere_gallery.frames[0].title}
                </h3>
                <p className="font-manrope text-xs sm:text-sm text-[#F5EFEB]/80 font-light max-w-lg">
                  {atmosphere_gallery.frames[0].caption}
                </p>
              </div>
            </div>
          )}

          {/* Frame 2: Tall Vertical Sommelier Decanting (md:col-span-4) */}
          {atmosphere_gallery.frames[1] && (
            <div 
              className="md:col-span-4 group relative aspect-[4/5] md:aspect-auto rounded-sm overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359]/70 transition-all duration-500 shadow-xl"
              onMouseEnter={() => setActiveFrameIndex(1)}
              onMouseLeave={() => setActiveFrameIndex(null)}
            >
              <img
                src={atmosphere_gallery.frames[1].url}
                alt={atmosphere_gallery.frames[1].title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-115 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-[#14080E]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-4 left-4 bg-[#221619]/90 border border-[#D4A359]/30 px-3 py-1 text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {atmosphere_gallery.frames[1].sensory_subject}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-marcellus text-lg sm:text-xl text-[#F5EFEB] mb-1 group-hover:text-[#D4A359] transition-colors">
                  {atmosphere_gallery.frames[1].title}
                </h3>
                <p className="font-manrope text-xs text-[#F5EFEB]/80 font-light">
                  {atmosphere_gallery.frames[1].caption}
                </p>
              </div>
            </div>
          )}

          {/* Frame 3: Square Hearth Theatre (md:col-span-4) */}
          {atmosphere_gallery.frames[2] && (
            <div 
              className="md:col-span-4 group relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359]/70 transition-all duration-500 shadow-xl"
              onMouseEnter={() => setActiveFrameIndex(2)}
              onMouseLeave={() => setActiveFrameIndex(null)}
            >
              <img
                src={atmosphere_gallery.frames[2].url}
                alt={atmosphere_gallery.frames[2].title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 bg-[#221619]/90 border border-[#D4A359]/30 px-3 py-1 text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {atmosphere_gallery.frames[2].sensory_subject}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-marcellus text-base sm:text-lg text-[#F5EFEB] mb-1">
                  {atmosphere_gallery.frames[2].title}
                </h3>
                <p className="font-manrope text-xs text-[#F5EFEB]/75 font-light">
                  {atmosphere_gallery.frames[2].caption}
                </p>
              </div>
            </div>
          )}

          {/* Frame 4: Plating Geometry & Stoneware (md:col-span-4) */}
          {atmosphere_gallery.frames[3] && (
            <div 
              className="md:col-span-4 group relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359]/70 transition-all duration-500 shadow-xl"
              onMouseEnter={() => setActiveFrameIndex(3)}
              onMouseLeave={() => setActiveFrameIndex(null)}
            >
              <img
                src={atmosphere_gallery.frames[3].url}
                alt={atmosphere_gallery.frames[3].title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 bg-[#221619]/90 border border-[#D4A359]/30 px-3 py-1 text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {atmosphere_gallery.frames[3].sensory_subject}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-marcellus text-base sm:text-lg text-[#F5EFEB] mb-1">
                  {atmosphere_gallery.frames[3].title}
                </h3>
                <p className="font-manrope text-xs text-[#F5EFEB]/75 font-light">
                  {atmosphere_gallery.frames[3].caption}
                </p>
              </div>
            </div>
          )}

          {/* Frame 5: Subterranean Vault (md:col-span-4) */}
          {atmosphere_gallery.frames[4] && (
            <div 
              className="md:col-span-4 group relative aspect-[4/3] rounded-sm overflow-hidden border border-[#D4A359]/25 hover:border-[#D4A359]/70 transition-all duration-500 shadow-xl"
              onMouseEnter={() => setActiveFrameIndex(4)}
              onMouseLeave={() => setActiveFrameIndex(null)}
            >
              <img
                src={atmosphere_gallery.frames[4].url}
                alt={atmosphere_gallery.frames[4].title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4 bg-[#221619]/90 border border-[#D4A359]/30 px-3 py-1 text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-wider">
                {atmosphere_gallery.frames[4].sensory_subject}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-marcellus text-base sm:text-lg text-[#F5EFEB] mb-1">
                  {atmosphere_gallery.frames[4].title}
                </h3>
                <p className="font-manrope text-xs text-[#F5EFEB]/75 font-light">
                  {atmosphere_gallery.frames[4].caption}
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
