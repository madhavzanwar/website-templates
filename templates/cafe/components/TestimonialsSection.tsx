'use client';

import React from 'react';
import { CafeContent } from '../types';
import { Star, Quote, Coffee } from 'lucide-react';

interface TestimonialsSectionProps {
  content: CafeContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonials } = content;

  return (
    <section className="bg-[#F7F4EE] py-20 lg:py-28 border-b border-[#231B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D99B4B]/15 border border-[#D99B4B]/40 text-[#231B16] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
            <Quote className="w-3.5 h-3.5 text-[#B85D38]" />
            <span>{testimonials.badge}</span>
          </div>

          <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-tight">
            {testimonials.title}
          </h2>

          <p className="mt-4 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] border border-[#231B16]/15 p-7 sm:p-8 rounded-sm shadow-xs hover:shadow-md hover:border-[#B85D38]/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Crema Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-[#D99B4B] text-[#D99B4B]"
                      />
                    ))}
                  </div>

                  {rev.publication && (
                    <span className="font-mono text-[10px] uppercase font-bold text-[#231B16]/50 tracking-wider">
                      {rev.publication}
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <p className="font-artisanal text-lg sm:text-xl text-[#231B16] italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Author Info & Favorite Order Stamp */}
              <div className="mt-6 pt-5 border-t border-[#231B16]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-humanist text-base font-bold text-[#231B16]">
                    {rev.author}
                  </div>
                  <div className="font-humanist text-xs text-[#231B16]/60">
                    {rev.role}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EDE6DA] border border-[#231B16]/10 rounded-xs self-start sm:self-auto">
                  <Coffee className="w-3 h-3 text-[#B85D38]" />
                  <span className="font-mono text-[10px] text-[#231B16] font-semibold">
                    ORDER: {rev.favorite_order}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
