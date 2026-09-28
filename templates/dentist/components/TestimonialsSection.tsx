'use client'
import React, { useState } from 'react'
import { Testimonial } from '../types'

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="py-32 bg-[#1A1A1A] min-h-[80vh] flex items-center relative overflow-hidden">
      <div className="absolute top-10 left-10 text-[300px] font-playfair leading-none text-[#0D6E6E]/20 select-none">"</div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <p className="font-playfair italic text-4xl md:text-5xl lg:text-6xl text-[#F8F9FA] leading-snug mb-16 transition-opacity duration-500">
          {testimonials[active].review}
        </p>
        
        <div className="flex flex-col gap-2">
          <span className="font-dm-sans text-[#E8D5B7] text-xl tracking-wide">{testimonials[active].patientName}</span>
          <span className="font-dm-sans text-[#F8F9FA]/50 text-sm uppercase tracking-widest">{testimonials[active].treatment}</span>
        </div>

        <div className="flex gap-4 mt-16">
          <button 
            onClick={() => setActive(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
            className="w-12 h-12 rounded-full border border-[#F8F9FA]/20 flex items-center justify-center text-[#F8F9FA] hover:bg-[#F8F9FA] hover:text-[#1A1A1A] transition-all"
          >
            ←
          </button>
          <button 
            onClick={() => setActive(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
            className="w-12 h-12 rounded-full border border-[#F8F9FA]/20 flex items-center justify-center text-[#F8F9FA] hover:bg-[#F8F9FA] hover:text-[#1A1A1A] transition-all"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
