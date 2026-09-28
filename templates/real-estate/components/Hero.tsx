'use client';
import React, { useState } from 'react';
import { TrustStat } from '../types';

interface HeroProps {
  headline: string;
  subheadline: string;
  localityOptions: string[];
  budgetOptions: string[];
  bhkOptions: string[];
  propertyTypeOptions: string[];
  stats: TrustStat[];
}

export default function Hero({ headline, subheadline, localityOptions, budgetOptions, bhkOptions, propertyTypeOptions, stats }: HeroProps) {
  const [locality, setLocality] = useState(localityOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [bhk, setBhk] = useState(bhkOptions[0]);
  const [type, setType] = useState(propertyTypeOptions[0]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-[#0F172A] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(201,168,76,0.04) 0px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, transparent 1px, transparent 80px)'
      }} />
      
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 max-w-5xl mx-auto">
        <span className="text-[#C9A84C] tracking-widest text-sm uppercase mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
          MAHARERA REG. A52100028471 • HADAPSAR, PUNE
        </span>
        <h1 className="text-white font-normal mb-8 leading-tight max-w-4xl" style={{ fontFamily: 'var(--font-libre)', fontSize: 'clamp(52px, 7vw, 100px)' }}>
          {headline}
        </h1>
        
        {/* Search Dock */}
        <div className="mt-12 bg-[#1E293B] p-2 rounded-full flex flex-col md:flex-row items-center gap-2 max-w-full shadow-2xl border border-white/10">
          <select value={locality} onChange={e => setLocality(e.target.value)} className="bg-transparent text-white/90 border-none outline-none py-3 px-6 appearance-none cursor-pointer" style={{ fontFamily: 'var(--font-outfit)' }}>
            {localityOptions.map(opt => <option key={opt} value={opt} className="bg-[#1E293B] text-white">{opt}</option>)}
          </select>
          <div className="w-px h-8 bg-white/20 hidden md:block" />
          <select value={budget} onChange={e => setBudget(e.target.value)} className="bg-transparent text-white/90 border-none outline-none py-3 px-6 appearance-none cursor-pointer" style={{ fontFamily: 'var(--font-outfit)' }}>
            {budgetOptions.map(opt => <option key={opt} value={opt} className="bg-[#1E293B] text-white">{opt}</option>)}
          </select>
          <div className="w-px h-8 bg-white/20 hidden md:block" />
          <select value={bhk} onChange={e => setBhk(e.target.value)} className="bg-transparent text-white/90 border-none outline-none py-3 px-6 appearance-none cursor-pointer" style={{ fontFamily: 'var(--font-outfit)' }}>
            {bhkOptions.map(opt => <option key={opt} value={opt} className="bg-[#1E293B] text-white">{opt}</option>)}
          </select>
          <div className="w-px h-8 bg-white/20 hidden md:block" />
          <select value={type} onChange={e => setType(e.target.value)} className="bg-transparent text-white/90 border-none outline-none py-3 px-6 appearance-none cursor-pointer" style={{ fontFamily: 'var(--font-outfit)' }}>
            {propertyTypeOptions.map(opt => <option key={opt} value={opt} className="bg-[#1E293B] text-white">{opt}</option>)}
          </select>
          <button className="bg-[#C9A84C] text-[#0F172A] px-8 py-3 rounded-full font-medium hover:bg-[#b5953e] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
            Search
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="relative z-10 border-t border-white/10 bg-[#0F172A]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 text-center">
              <div className="text-white text-2xl mb-1 font-mono">{stat.value}</div>
              <div className="text-white/60 text-xs tracking-wider uppercase mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
