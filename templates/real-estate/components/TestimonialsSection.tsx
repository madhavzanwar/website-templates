'use client';
import React, { useState } from 'react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

export default function TestimonialsSection({ title, subtitle, items }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section id="reviews" className="py-24 bg-[#0F172A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 -left-10 text-9xl text-[#C9A84C] opacity-20 font-serif leading-none">“</div>
          
          <div className="text-center relative z-10 px-4 md:px-16 min-h-[300px] flex flex-col justify-center">
            <p className="text-2xl md:text-3xl text-white italic leading-relaxed mb-10" style={{ fontFamily: 'var(--font-libre)' }}>
              "{items[activeIndex].quote}"
            </p>
            <div style={{ fontFamily: 'var(--font-outfit)' }}>
              <div className="text-xl text-[#C9A84C] mb-2">{items[activeIndex].clientName}</div>
              <div className="text-white/70 mb-1">{items[activeIndex].roleOrCompany}</div>
              <div className="text-white/50 text-sm">{items[activeIndex].propertyPurchased}</div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0F172A] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
