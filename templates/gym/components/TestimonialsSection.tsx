'use client';

import React from 'react';
import { GymContent } from '../types';
import { Quote, TrendingUp } from 'lucide-react';

interface TestimonialsSectionProps {
  content: GymContent;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ content }) => {
  return (
    <section className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              MEMBER REVIEWS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              WHAT OUR MEMBERS SAY
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            REAL REVIEWS FROM PUNE MEMBERS
          </div>
        </div>

        {/* Testimonials Tiles (Anti-Slop: No fake rounded avatars) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {content.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border border-white/15 bg-[#14161B] p-8 transition-all hover:border-white/30"
            >
              <div>
                {/* Metric Badge */}
                <div className="inline-flex items-center gap-2 border border-[#D4FF00]/40 bg-[#D4FF00]/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#D4FF00] mb-6">
                  <TrendingUp className="h-3 w-3" />
                  {item.achievement}
                </div>

                <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-base font-bold uppercase tracking-tight text-white">
                    {item.athlete}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 mt-0.5">
                    {item.discipline}
                  </div>
                </div>

                <Quote className="h-6 w-6 text-zinc-700" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
