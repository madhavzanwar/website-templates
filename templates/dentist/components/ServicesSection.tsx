'use client'
import React, { useState } from 'react'
import { Service } from '../types'

export default function ServicesSection({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="py-32 bg-[#E8D5B7]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col border-t border-[#1A1A1A]/20">
          {services.map((s, i) => (
            <button 
              key={s.id}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`text-left py-8 border-b border-[#1A1A1A]/20 transition-all duration-300 flex items-baseline gap-8 group ${active === i ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <span className="font-dm-sans text-sm">{String(i+1).padStart(2, '0')}</span>
              <span className="font-playfair italic text-4xl lg:text-5xl group-hover:pl-4 transition-all">{s.title}</span>
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="sticky top-32 flex flex-col gap-6 bg-[#F8F9FA] p-12 rounded-2xl shadow-xl transition-all duration-500">
            <h3 className="font-playfair text-3xl text-[#1A1A1A] mb-4">{services[active].title}</h3>
            <p className="font-dm-sans text-lg text-[#1A1A1A]/70 leading-relaxed">
              {services[active].description}
            </p>
            <div className="mt-8 pt-8 border-t border-[#1A1A1A]/10 flex justify-between items-center">
              <span className="font-dm-sans text-sm uppercase tracking-widest text-[#1A1A1A]/50">Estimated Cost</span>
              <span className="font-dm-sans text-xl font-medium text-[#0D6E6E]">{services[active].priceRange}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
