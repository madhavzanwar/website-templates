'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, BookOpen, X, Sparkles, MapPin, Film } from 'lucide-react';
import { WeddingPhotographerContent, LoveStory } from '../types';

interface FeaturedStoriesProps {
  content: WeddingPhotographerContent;
}

export function FeaturedStories({ content }: FeaturedStoriesProps) {
  const { featured_stories } = content;
  const [activeStoryModal, setActiveStoryModal] = useState<LoveStory | null>(null);

  return (
    <section id="stories" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {featured_stories.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {featured_stories.headline}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {featured_stories.headline_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {featured_stories.subheadline}
          </p>
        </div>

        {/* Stories Chapter List */}
        <div className="space-y-32 sm:space-y-40">
          {featured_stories.stories.map((story) => {
            const isFlipped = story.layout_orientation === 'right';

            return (
              <article
                key={story.id}
                className="relative border-b border-[#1C1917]/8 pb-24 sm:pb-32 last:border-b-0 last:pb-0"
              >
                {/* Chapter Watermark Number */}
                <div className="text-right font-bellefair text-xs tracking-[0.28em] text-[#9D8469] uppercase mb-6">
                  {story.chapter_number}
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isFlipped ? 'lg:flex-row-reverse' : ''
                }`}>
                  
                  {/* Text Column (5 Cols) */}
                  <div className={`lg:col-span-5 ${isFlipped ? 'lg:order-2' : 'lg:order-1'}`}>
                    
                    {/* Location Coordinates */}
                    <div className="flex items-center gap-2 text-xs font-tenor text-[#9D8469] tracking-wider uppercase mb-3">
                      <Compass className="w-3.5 h-3.5 text-[#B87D74]" />
                      <span>{story.coordinates}</span>
                    </div>

                    {/* Setting */}
                    <div className="text-xs font-tenor text-[#8C827A] tracking-wider uppercase mb-2">
                      {story.setting}
                    </div>

                    {/* Couple Names */}
                    <h3 className="font-newsreader text-4xl sm:text-5xl text-[#1C1917] font-normal leading-tight mb-6">
                      {story.couple_names}
                    </h3>

                    {/* Narrative Excerpt */}
                    <p className="font-tenor text-base text-[#57524E] leading-relaxed mb-6">
                      {story.narrative}
                    </p>

                    {/* Coverage Summary Pill */}
                    <div className="p-3.5 rounded-xl bg-[#ECE6DD]/60 border border-[#1C1917]/6 text-xs font-tenor text-[#1C1917] tracking-wide mb-8">
                      <span className="text-[#9D8469] font-medium mr-1.5">Event Details:</span>
                      {story.coverage_summary}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-[#ECE6DD]/70 text-[11px] font-tenor text-[#57524E] tracking-wider"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read Full Story Button */}
                    <button
                      type="button"
                      onClick={() => setActiveStoryModal(story)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1C1917]/20 text-[#1C1917] font-tenor text-xs uppercase tracking-[0.16em] hover:bg-[#1C1917] hover:text-[#FAF7F2] transition-all duration-300 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#B87D74]" />
                      <span>{story.read_story_cta}</span>
                    </button>
                  </div>

                  {/* Diptych Visual Composition (7 Cols) */}
                  <div className={`lg:col-span-7 relative ${isFlipped ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative w-full max-w-2xl mx-auto">
                      
                      {/* Primary Large 4:5 Vertical Portrait */}
                      <div className="relative w-4/5 ml-0 p-3 sm:p-4 bg-[#FAF7F2] border border-[#1C1917]/12 shadow-xl rounded-sm">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE6DD]">
                          <Image
                            src={story.primary_photo.url}
                            alt={story.primary_photo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-cover object-center filter contrast-[1.02] hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        {/* Film Stock Stamp */}
                        {story.primary_photo.film_stock && (
                          <div className="mt-2.5 pt-2 border-t border-[#1C1917]/8 flex items-center justify-between text-[10px] font-tenor text-[#8C827A] tracking-wider uppercase">
                            <span className="truncate">{story.primary_photo.caption}</span>
                            <span className="text-[#9D8469] font-medium shrink-0 ml-2">
                              {story.primary_photo.film_stock}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Secondary Offset Overlapping 1:1 Macro Crop */}
                      <div className="absolute -bottom-10 right-0 sm:right-4 w-2/5 p-2 sm:p-3 bg-[#FAF7F2] border border-[#1C1917]/15 shadow-2xl rounded-sm z-10 transition-transform duration-500 hover:-translate-y-2">
                        <div className="relative aspect-square w-full overflow-hidden bg-[#ECE6DD]">
                          <Image
                            src={story.secondary_macro_photo.url}
                            alt={story.secondary_macro_photo.alt}
                            fill
                            sizes="(max-width: 768px) 50vw, 300px"
                            className="object-cover object-center filter contrast-[1.05]"
                          />
                        </div>

                        <div className="mt-2 text-[9px] font-tenor text-[#8C827A] tracking-wider uppercase truncate">
                          {story.secondary_macro_photo.camera_spec || story.secondary_macro_photo.caption}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Interactive Story Monograph Modal */}
      {activeStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1C1917]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div className="bg-[#FAF7F2] max-w-3xl w-full rounded-2xl border border-[#1C1917]/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1C1917]/10 flex items-center justify-between bg-[#ECE6DD]/50">
              <div>
                <div className="font-bellefair text-xs tracking-widest text-[#9D8469] uppercase">
                  {activeStoryModal.chapter_number}
                </div>
                <h4 className="font-newsreader text-2xl text-[#1C1917]">
                  {activeStoryModal.couple_names}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveStoryModal(null)}
                className="p-2 rounded-full hover:bg-[#1C1917]/10 text-[#1C1917] transition-colors"
                aria-label="Close story modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-tenor text-[#8C827A] pb-4 border-b border-[#1C1917]/8">
                <div className="flex items-center gap-1.5 text-[#B87D74]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeStoryModal.setting}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#9D8469]" />
                  <span>{activeStoryModal.coverage_summary}</span>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] rounded overflow-hidden">
                  <Image
                    src={activeStoryModal.primary_photo.url}
                    alt={activeStoryModal.primary_photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded overflow-hidden">
                  <Image
                    src={activeStoryModal.secondary_macro_photo.url}
                    alt={activeStoryModal.secondary_macro_photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Story Narrative */}
              <div className="space-y-4 pt-4">
                <p className="font-newsreader italic text-xl text-[#1C1917] leading-relaxed">
                  &ldquo;{activeStoryModal.narrative}&rdquo;
                </p>
                <p className="font-tenor text-sm text-[#57524E] leading-relaxed">
                  {activeStoryModal.extended_story}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#ECE6DD]/60 border border-[#1C1917]/8 text-xs font-tenor text-[#57524E]">
                <div className="font-semibold uppercase tracking-wider text-[#9D8469] mb-1">
                  Photography Details
                </div>
                <div>{activeStoryModal.primary_photo.film_stock}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#1C1917]/10 bg-[#ECE6DD]/30 flex items-center justify-between">
              <span className="text-xs font-tenor text-[#8C827A]">
                {activeStoryModal.coordinates}
              </span>
              <a
                href="#inquiry"
                onClick={() => setActiveStoryModal(null)}
                className="px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-wider hover:bg-[#B87D74] transition-colors"
              >
                Inquire For Similar Setting
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
