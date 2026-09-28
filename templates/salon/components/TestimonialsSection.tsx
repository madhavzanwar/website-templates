'use client';

import React from 'react';
import { SalonContent } from '../types';
import { Star, Quote, Sparkles } from 'lucide-react';

interface TestimonialsSectionProps {
  content: SalonContent;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content }) => {
  const { testimonials } = content;

  return (
    <section id="reviews" className="relative bg-[#EDE8E0]/40 border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
            {testimonials.section_code}
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
            {testimonials.section_title}
          </h2>
          <p className="mt-3 font-humanist text-base font-light text-[#5E5750] leading-relaxed">
            {testimonials.description}
          </p>
        </div>

        {/* Featured Editorial Press Quotes (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.press_quotes.map((press, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-[#1C1815]/10 bg-[#F7F4EE] p-8 sm:p-10 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#1C1815]/10 pb-4 mb-6">
                  <span className="font-cinzel text-lg font-bold tracking-widest uppercase text-[#1C1815]">
                    {press.publication}
                  </span>
                  <Quote className="h-6 w-6 text-[#C4A47C]" />
                </div>

                <p className="font-editorial text-xl sm:text-2xl font-normal text-[#1C1815] leading-relaxed italic">
                  {press.quote}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#1C1815]/10 flex items-center justify-between">
                <div>
                  <div className="font-humanist text-xs font-semibold uppercase tracking-wider text-[#1C1815]">
                    {press.author}
                  </div>
                  <div className="font-humanist text-[11px] text-[#7A7067]">
                    {press.role}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#C4A47C]">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-humanist text-[10px] uppercase tracking-wider font-semibold">Critic Pick</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Reviews Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.client_reviews.map((client, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-[#1C1815]/10 bg-[#F7F4EE] p-6 sm:p-8 shadow-xs hover:border-[#B86B4F]/30 transition-colors"
            >
              <div>
                {/* 5 Burnished Bronze Stars */}
                <div className="flex items-center gap-1 text-[#C4A47C] mb-4">
                  {Array.from({ length: client.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#C4A47C]" />
                  ))}
                </div>

                <p className="font-humanist text-sm font-light leading-relaxed text-[#5E5750]">
                  “{client.review}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1C1815]/8">
                <div className="font-editorial text-lg font-medium text-[#1C1815]">
                  {client.client_name}
                </div>
                <div className="font-humanist text-[11px] text-[#7A7067]">
                  {client.neighborhood}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-humanist text-[#B86B4F]">
                  <span className="font-medium">{client.service_received}</span>
                  <span className="text-[#7A7067]">with {client.stylist}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
