import React from 'react';
import { TrustPillar } from '../types';

interface WhyChooseUsProps {
  title: string;
  subtitle: string;
  pillars: TrustPillar[];
}

export default function WhyChooseUs({ title, subtitle, pillars }: WhyChooseUsProps) {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
          <p className="text-[#64748B] text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {pillars.map((pillar, idx) => (
            <div key={pillar.id} className="border-t border-[#C9A84C]/30 p-12 flex flex-col md:flex-row gap-8 hover:bg-gray-50 transition-colors">
              <div 
                className="text-6xl font-bold text-transparent" 
                style={{ 
                  fontFamily: 'var(--font-outfit)',
                  WebkitTextStroke: '1px #C9A84C',
                  opacity: 0.5
                }}
              >
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div>
                <h3 className="text-2xl text-[#0F172A] mb-4" style={{ fontFamily: 'var(--font-libre)' }}>{pillar.title}</h3>
                <p className="text-[#64748B] leading-relaxed mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>{pillar.description}</p>
                <div className="inline-block border border-[#C9A84C] text-[#C9A84C] px-3 py-1 text-xs uppercase tracking-wider" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {pillar.badge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
