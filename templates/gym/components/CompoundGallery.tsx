'use client';

import React from 'react';
import { GymContent } from '../types';

interface CompoundGalleryProps {
  content: GymContent;
}

export const CompoundGallery: React.FC<CompoundGalleryProps> = ({ content }) => {
  return (
    <section className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              {content.gallery.section_code}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {content.gallery.section_title}
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest max-w-sm">
            {content.gallery.subtitle}
          </div>
        </div>

        {/* Asymmetric 4-Module Bento Vault (Brutalist 0px Radii) */}
        <div className="grid grid-cols-12 gap-4">
          {content.gallery.gallery_images.map((item, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden border border-white/15 bg-[#14161B] ${item.span} min-h-[300px] sm:min-h-[380px] flex flex-col justify-end p-6 sm:p-8`}
            >
              {/* Image with Contrast Grading */}
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Directional Shading Mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              {/* Tag Marker */}
              <div className="relative z-10 font-mono text-[10px] font-bold tracking-widest text-[#D4FF00] uppercase mb-2">
                {item.tag}
              </div>

              {/* Tile Headline */}
              <h3 className="relative z-10 font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-zinc-200">
                {item.title}
              </h3>

              {/* Architectural Technical Caption */}
              <p className="relative z-10 mt-2 font-mono text-xs text-zinc-400 max-w-lg leading-relaxed">
                {item.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
