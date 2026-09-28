'use client';

import React from 'react';
import { RestaurantContent } from '../types';
import { Award, Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  content: RestaurantContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { testimonials } = content;

  return (
    <section id="critique" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {testimonials.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-4">
            {testimonials.title}
          </h2>

          <p className="font-manrope text-base text-[#F5EFEB]/75 font-light">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Critic Acclaim 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#221619] border border-[#D4A359]/25 hover:border-[#D4A359]/60 p-8 rounded-sm transition-all duration-300 flex flex-col justify-between shadow-2xl relative group"
            >
              {/* Subtle Gilt Corner Accent */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D4A359]/15">
                <div>
                  <h3 className="font-marcellus text-lg text-[#F5EFEB] group-hover:text-[#D4A359] transition-colors">
                    {review.publication}
                  </h3>
                  <span className="text-[11px] font-dm-mono text-[#D4A359]">
                    {review.inspector}
                  </span>
                </div>

                <span className="text-xs font-dm-mono px-2 py-1 bg-[#14080E] text-[#D4A359] border border-[#D4A359]/30 rounded">
                  {review.rating_badge}
                </span>
              </div>

              {/* Quote Body */}
              <div className="mb-8">
                <Quote className="w-6 h-6 text-[#D4A359]/40 mb-3" />
                <p className="font-italiana text-xl text-[#F5EFEB] leading-snug mb-4 italic">
                  "{review.quote}"
                </p>
                <p className="font-manrope text-xs text-[#F5EFEB]/70 leading-relaxed font-light">
                  {review.full_critique}
                </p>
              </div>

              {/* Date stamp */}
              <div className="pt-4 border-t border-[#D4A359]/15 flex items-center justify-between text-[11px] font-dm-mono text-[#F5EFEB]/50">
                <span>Verified Inspection</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
