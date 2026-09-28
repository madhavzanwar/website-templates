'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, X, Maximize2, Aperture, Sliders, Film, MapPin } from 'lucide-react';
import { WeddingPhotographerContent, ArchiveImage } from '../types';

interface CuratedArchiveProps {
  content: WeddingPhotographerContent;
}

export function CuratedArchive({ content }: CuratedArchiveProps) {
  const { curated_archive } = content;
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [activeLightbox, setActiveLightbox] = useState<ArchiveImage | null>(null);

  // Filter images based on selected mood
  const filteredImages = selectedMood === 'all'
    ? curated_archive.gallery_images
    : curated_archive.gallery_images.filter((img) => img.mood === selectedMood);

  return (
    <section id="archive" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {curated_archive.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {curated_archive.headline}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {curated_archive.headline_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {curated_archive.subheadline}
          </p>
        </div>

        {/* Multi-Mood Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-8 mb-12 border-b border-[#1C1917]/8">
          {curated_archive.mood_filters.map((filter) => {
            const isActive = selectedMood === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedMood(filter.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-tenor uppercase tracking-[0.16em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1917] text-[#FAF7F2] shadow-sm'
                    : 'bg-[#ECE6DD]/60 text-[#1C1917]/70 hover:bg-[#ECE6DD] hover:text-[#1C1917]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Curated Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((image) => {
            const aspectClass =
              image.aspect_ratio === 'vertical'
                ? 'aspect-[4/5]'
                : image.aspect_ratio === 'square'
                ? 'aspect-square'
                : 'aspect-[16/10]';

            return (
              <div
                key={image.id}
                className="group relative p-3 sm:p-4 bg-[#FAF7F2] border border-[#1C1917]/10 rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image Container with Inner Matting */}
                <div
                  className={`relative ${aspectClass} w-full overflow-hidden bg-[#ECE6DD] cursor-pointer`}
                  onClick={() => setActiveLightbox(image)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Darkroom Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Clean Hover Details Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 pointer-events-none">
                    <div className="p-3 rounded-lg bg-[#FAF7F2]/95 backdrop-blur-md border border-[#1C1917]/12 text-[#1C1917] shadow-lg flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-tenor font-medium truncate">
                          {image.title}
                        </div>
                        <div className="text-[10px] font-tenor text-[#8C827A] truncate">
                          {image.hud.location}
                        </div>
                      </div>
                      <Maximize2 className="w-3.5 h-3.5 text-[#B87D74] shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Caption Bar Underneath */}
                <div className="mt-3 flex items-center justify-between text-xs font-tenor text-[#1C1917] px-1">
                  <span className="truncate font-medium">{image.title}</span>
                  <span className="text-[10px] text-[#8C827A] tracking-wider uppercase ml-2 shrink-0">
                    {image.hud.location.split(',')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal with Full Photo Preview */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#141211]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <div className="w-full flex items-center justify-between pb-4 text-[#FAF7F2]">
              <div className="flex items-center gap-3">
                <Camera className="w-4 h-4 text-[#B87D74]" />
                <span className="font-tenor text-xs tracking-widest uppercase">
                  {curated_archive.hud_label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] max-h-[70vh] rounded overflow-hidden bg-[#1C1917] border border-white/10 shadow-2xl">
              <Image
                src={activeLightbox.url}
                alt={activeLightbox.alt}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Bottom Photo Details Bar */}
            <div className="mt-4 w-full p-4 rounded-xl bg-[#1C1917] border border-white/10 text-[#FAF7F2] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-tenor">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">
                  Photograph Title
                </div>
                <div className="text-white font-medium">
                  {activeLightbox.title}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">
                  Location & Setting
                </div>
                <div className="text-white font-medium truncate">
                  {activeLightbox.hud.location}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">
                  Visual Style
                </div>
                <div className="text-white font-medium truncate">
                  {activeLightbox.hud.film_emulsion}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
