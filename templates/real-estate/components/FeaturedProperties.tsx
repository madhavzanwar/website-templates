'use client';
import React, { useState } from 'react';
import { Property } from '../types';

interface FeaturedPropertiesProps {
  title: string;
  subtitle: string;
  filterCategories: string[];
  properties: Property[];
}

export default function FeaturedProperties({ title, subtitle, filterCategories, properties }: FeaturedPropertiesProps) {
  const [activeFilter, setActiveFilter] = useState(filterCategories[0]);

  const filteredProperties = properties.filter(prop => {
    if (activeFilter === 'All Properties') return true;
    if (activeFilter === 'Under ₹1 Crore') return prop.priceInLakhs < 100;
    if (activeFilter === '₹1 Cr – ₹2 Cr') return prop.priceInLakhs >= 100 && prop.priceInLakhs <= 200;
    if (activeFilter === 'Luxury ₹2 Cr+') return prop.priceInLakhs > 200;
    return true;
  });

  const heroProperty = filteredProperties[0];
  const gridProperties = filteredProperties.slice(1, 6);

  return (
    <section id="properties" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-[#0F172A] text-4xl mb-4" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
            <p className="text-[#64748B] text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {filterCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-sm transition-colors border ${activeFilter === cat ? 'border-[#0F172A] bg-[#0F172A] text-white' : 'border-gray-200 text-gray-600 hover:border-[#0F172A]'}`}
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {heroProperty && (
          <div className="flex flex-col lg:flex-row border border-gray-200 mb-12">
            <div className="w-full lg:w-[55%] min-h-[400px] relative bg-[#0F172A] overflow-hidden flex items-center justify-center p-8">
               <div className="absolute inset-0 opacity-20" style={{
                 backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
               }} />
               <div className="border border-[#C9A84C]/40 p-12 relative z-10 w-full h-full max-w-md mx-auto flex flex-col items-center justify-center">
                 <div className="w-full h-px bg-[#C9A84C]/40 mb-8" />
                 <div className="w-px h-full bg-[#C9A84C]/40 absolute top-0 left-1/2" />
               </div>
            </div>
            <div className="w-full lg:w-[45%] p-10 flex flex-col justify-center bg-gray-50">
              <span className="text-sm font-semibold tracking-wider text-[#C9A84C] uppercase mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>{heroProperty.locality}</span>
              <h3 className="text-4xl text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{heroProperty.title}</h3>
              <div className="text-5xl text-[#C9A84C] mb-8" style={{ fontFamily: 'var(--font-libre)' }}>{heroProperty.price}</div>
              
              <div className="space-y-4 mb-10" style={{ fontFamily: 'var(--font-outfit)' }}>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-[#64748B]">Configuration</span>
                  <span className="text-[#0F172A] font-medium">{heroProperty.bhk}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-[#64748B]">Carpet Area</span>
                  <span className="text-[#0F172A] font-medium">{heroProperty.carpetArea}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-[#64748B]">Compliance</span>
                  <span className="text-[#0F172A] font-medium">{heroProperty.reraId}</span>
                </div>
              </div>

              <a href="#contact" className="inline-block text-center bg-[#0F172A] text-white px-6 py-4 hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm" style={{ fontFamily: 'var(--font-outfit)' }}>
                Schedule Visit
              </a>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridProperties.map(prop => (
            <div key={prop.id} className="border border-gray-200 group hover:shadow-xl transition-shadow flex flex-col aspect-[3/4]">
              <div className="h-1/2 bg-gradient-to-br from-[#0F172A] to-[#64748B] relative p-6 flex items-end">
                 <div className="absolute top-4 left-4 bg-white/10 backdrop-blur text-white text-xs px-2 py-1 uppercase tracking-wide border border-white/20" style={{ fontFamily: 'var(--font-outfit)' }}>
                   {prop.badge}
                 </div>
              </div>
              <div className="h-1/2 p-6 flex flex-col bg-white">
                <span className="text-xs text-[#64748B] uppercase tracking-wide mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>{prop.locality}</span>
                <h4 className="text-xl text-[#0F172A] mb-2" style={{ fontFamily: 'var(--font-libre)' }}>{prop.title}</h4>
                <div className="text-xl text-[#C9A84C] mb-auto" style={{ fontFamily: 'var(--font-libre)' }}>{prop.price}</div>
                
                <div className="text-sm text-[#64748B] flex items-center justify-between border-t border-gray-100 pt-4 mt-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                  <span>{prop.bhk}</span>
                  <span className="text-green-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    RERA
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
