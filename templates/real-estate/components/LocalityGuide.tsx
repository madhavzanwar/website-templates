'use client';
import React, { useState } from 'react';
import { Locality } from '../types';

interface LocalityGuideProps {
  title: string;
  subtitle: string;
  localities: Locality[];
}

export default function LocalityGuide({ title, subtitle, localities }: LocalityGuideProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="localities" className="py-24 bg-[#0F172A] text-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
          <p className="text-white/70 text-lg max-w-2xl" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
        </div>

        <div className="flex flex-col">
          {localities.map((loc, idx) => (
            <div key={loc.id} className="border-t border-white/10 last:border-b">
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className={`w-full text-left py-8 flex flex-col md:flex-row justify-between md:items-center group transition-all ${activeIndex === idx ? 'border-b-2 border-[#C9A84C]' : ''}`}
              >
                <div className="mb-4 md:mb-0">
                  <h3 className={`text-3xl md:text-4xl transition-colors ${activeIndex === idx ? 'text-[#C9A84C]' : 'text-white group-hover:text-white/80'}`} style={{ fontFamily: 'var(--font-libre)' }}>
                    {loc.name}
                  </h3>
                </div>
                <div className="text-left md:text-right" style={{ fontFamily: 'var(--font-outfit)' }}>
                  <div className="text-xl font-medium">{loc.averagePriceSqFt}</div>
                  <div className="text-sm text-white/50">{loc.commuteHighlights.includes('Metro') ? 'Metro Connected' : 'Premium Connectivity'}</div>
                </div>
              </button>
              
              {activeIndex === idx && (
                <div className="py-8 animate-in slide-in-from-top-4 fade-in duration-300">
                  <p className="text-white/80 mb-6 text-lg leading-relaxed max-w-3xl" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {loc.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {loc.lifestyleTags.map(tag => (
                      <span key={tag} className="px-4 py-2 border border-white/20 text-sm text-white/70 rounded-full" style={{ fontFamily: 'var(--font-outfit)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
