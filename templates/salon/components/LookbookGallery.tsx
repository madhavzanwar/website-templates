'use client';

import React, { useState } from 'react';
import { SalonContent } from '../types';
import { ArrowUpRight, Camera } from 'lucide-react';

interface LookbookGalleryProps {
  content: SalonContent;
}

export const LookbookGallery: React.FC<LookbookGalleryProps> = ({ content }) => {
  const { lookbook } = content;
  const [activeTag, setActiveTag] = useState<string>('All Looks');

  const filteredImages = activeTag === 'All Looks'
    ? lookbook.gallery_images
    : lookbook.gallery_images.filter(img => img.tag === activeTag || img.tag.includes(activeTag));

  return (
    <section id="lookbook" className="relative bg-[#EDE8E0]/40 border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1C1815]/10 pb-8 mb-12">
          <div className="max-w-2xl">
            <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
              {lookbook.section_code}
            </span>
            <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
              {lookbook.section_title}
            </h2>
            <p className="mt-3 font-humanist text-sm sm:text-base font-light text-[#5E5750] leading-relaxed">
              {lookbook.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-humanist uppercase tracking-widest text-[#7A7067]">
            <Camera className="h-4 w-4 text-[#B86B4F]" />
            <span>Real Photos From Our Salon</span>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8 mb-8 border-b border-[#1C1815]/10">
          {lookbook.filter_tags.map((tag, idx) => {
            const isActive = activeTag === tag;
            return (
              <button
                key={idx}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-5 py-2 font-humanist text-xs uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1815] text-[#F7F4EE] shadow-xs'
                    : 'bg-[#F7F4EE] text-[#6E665E] border border-[#1C1815]/10 hover:border-[#1C1815]/30 hover:text-[#1C1815]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className={`group relative overflow-hidden rounded-xl border border-[#1C1815]/10 bg-[#EDE8E0] shadow-xs transition-all duration-500 hover:shadow-lg ${img.span}`}
            >
              {/* Image Frame */}
              <div className={`relative w-full ${img.aspect} overflow-hidden`}>
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Chiaroscuro Gradient Curtain */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1815]/90 via-[#1C1815]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Corner Technique Tag */}
                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#1C1815]/60 px-3 py-1 backdrop-blur-md">
                  <span className="font-humanist text-[10px] uppercase tracking-wider text-white">
                    {img.tag}
                  </span>
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-editorial text-xl sm:text-2xl font-normal leading-snug text-white">
                    {img.title}
                  </h3>
                  
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/20 pt-2 font-humanist text-xs text-white/80">
                    <div>
                      <span className="text-[#C4A47C]">{img.technique}</span>
                      <span className="mx-2 hidden sm:inline">•</span>
                      <span className="block sm:inline">{img.stylist}</span>
                    </div>

                    <a
                      href="#booking"
                      className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 font-humanist text-[10px] uppercase tracking-wider text-white backdrop-blur-sm hover:bg-[#B86B4F] hover:text-white transition-colors"
                    >
                      <span>Book This Look</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
