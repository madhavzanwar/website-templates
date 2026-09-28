'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface TestimonialsSectionProps {
  content: InteriorDesignerContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const testimonials = content.testimonials;

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F3F0EA] border-t border-[#151618]/15">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#151618]/15 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-space-grotesk text-xs font-semibold tracking-[0.22em] uppercase text-[#0F38D9] block mb-2">
                CRITICAL ACCLAIM & ARCHITECTURAL PATRONAGE
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618]">
                Institutional Citations & Client Testimonials
              </h2>
            </div>
            <p className="font-inter-tight text-sm sm:text-base text-[#151618]/70 max-w-md leading-relaxed">
              From AD100 jury reviews to private estate commissioners, our work is recognized for its uncompromising spatial integrity and quiet permanence.
            </p>
          </div>
        </div>

        {/* 2x2 Editorial Quote Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="border border-[#151618]/15 bg-[#E2DDD3]/30 p-8 sm:p-12 flex flex-col justify-between transition-colors hover:border-[#151618]/35"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-space-grotesk text-[10px] uppercase tracking-[0.20em] bg-[#151618] text-[#F3F0EA] px-2.5 py-1">
                    {item.badge}
                  </span>
                  <Quote className="h-5 w-5 text-[#0F38D9]" />
                </div>

                <blockquote className="font-instrument italic text-2xl sm:text-3xl text-[#151618] leading-[1.22]">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-[#151618]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="font-space-grotesk text-sm font-semibold text-[#151618]">
                    {item.source}
                  </div>
                  <div className="font-inter-tight text-xs text-[#151618]/60 mt-0.5">
                    {item.source_title}
                  </div>
                </div>

                <div className="font-space-grotesk text-[11px] text-[#0F38D9] uppercase tracking-wider">
                  REF: {item.project_reference}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
