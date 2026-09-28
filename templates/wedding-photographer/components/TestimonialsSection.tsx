'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, BookOpen, MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface TestimonialsSectionProps {
  content: WeddingPhotographerContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonials } = content;
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const lookbookPhotos = testimonials.album_lookbook.lookbook_photos;

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % lookbookPhotos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + lookbookPhotos.length) % lookbookPhotos.length);
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {testimonials.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {testimonials.title}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {testimonials.title_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {testimonials.subtitle}
          </p>
        </div>

        {/* 3 Intimate Love Letters Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.letters.map((letter) => (
            <div
              key={letter.id}
              className="p-8 sm:p-10 rounded-2xl bg-[#ECE6DD]/40 border border-[#1C1917]/8 flex flex-col justify-between hover:border-[#B87D74]/30 transition-all duration-300 relative"
            >
              <div>
                {/* Film Vignette Stamp */}
                <div className="font-tenor text-[10px] uppercase tracking-widest text-[#9D8469] pb-4 mb-4 border-b border-[#1C1917]/6 flex items-center justify-between">
                  <span>{letter.film_vignette}</span>
                  <Heart className="w-3 h-3 text-[#B87D74]" />
                </div>

                {/* Highlight Pull-Line */}
                <div className="font-newsreader italic text-xl text-[#B87D74] mb-4 leading-snug">
                  &ldquo;{letter.highlight}&rdquo;
                </div>

                {/* Letter Body */}
                <p className="font-tenor text-sm text-[#57524E] leading-relaxed">
                  {letter.letter_text}
                </p>
              </div>

              {/* Attribution */}
              <div className="mt-8 pt-6 border-t border-[#1C1917]/8">
                <div className="font-newsreader text-lg text-[#1C1917] font-normal">
                  {letter.couple_names}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs font-tenor text-[#8C827A]">
                  <MapPin className="w-3 h-3 text-[#B87D74]" />
                  <span className="truncate">{letter.wedding_location}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-tenor text-[#9D8469]">
                  <Calendar className="w-3 h-3 text-[#9D8469]" />
                  <span>{letter.wedding_date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactile Album Lookbook Feature */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-[#ECE6DD]/70 border border-[#1C1917]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Lookbook Story & Specifications (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-tenor uppercase tracking-[0.24em] text-[#B87D74]">
                <BookOpen className="w-4 h-4" />
                <span>{testimonials.album_lookbook.title}</span>
              </div>

              <h3 className="font-newsreader text-3xl sm:text-4xl text-[#1C1917] leading-tight">
                {testimonials.album_lookbook.subtitle}
              </h3>

              <p className="font-tenor text-base text-[#57524E] leading-relaxed">
                {testimonials.album_lookbook.description}
              </p>

              {/* Specifications List */}
              <div className="space-y-3 pt-4 border-t border-[#1C1917]/10">
                {testimonials.album_lookbook.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between text-xs sm:text-sm font-tenor border-b border-[#1C1917]/6 pb-2"
                  >
                    <span className="text-[#8C827A] uppercase tracking-wider">{spec.label}</span>
                    <span className="text-[#1C1917] font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-tenor text-[#9D8469]">
                <Sparkles className="w-4 h-4 text-[#B87D74]" />
                <span>Every full-day commission includes a custom lay-flat master volume.</span>
              </div>
            </div>

            {/* Right Interactive Lookbook Photo Frame (Cols 7-12) */}
            <div className="lg:col-span-6">
              <div className="p-3 sm:p-4 bg-[#FAF7F2] border border-[#1C1917]/12 shadow-xl rounded-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE6DD]">
                  <Image
                    src={lookbookPhotos[activePhotoIdx].url}
                    alt={lookbookPhotos[activePhotoIdx].caption}
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    className="object-cover transition-all duration-700"
                  />

                  {/* Photo Navigation Arrows */}
                  <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="p-2 rounded-full bg-[#FAF7F2]/80 backdrop-blur-sm text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] transition-colors pointer-events-auto"
                      aria-label="Previous album photograph"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="p-2 rounded-full bg-[#FAF7F2]/80 backdrop-blur-sm text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF7F2] transition-colors pointer-events-auto"
                      aria-label="Next album photograph"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lookbook Caption Bar */}
                <div className="mt-3 pt-2 border-t border-[#1C1917]/8 flex items-center justify-between text-xs font-tenor">
                  <div>
                    <div className="text-[#1C1917] font-medium">
                      {lookbookPhotos[activePhotoIdx].caption}
                    </div>
                    <div className="text-[11px] text-[#8C827A]">
                      {lookbookPhotos[activePhotoIdx].subcaption}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#9D8469] font-mono tracking-widest shrink-0 ml-2">
                    {activePhotoIdx + 1} / {lookbookPhotos.length}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
