'use client'
import React from 'react'
import { DentistContent } from '../types'

export default function Hero({ content }: { content: DentistContent }) {
  return (
    <section className="relative min-h-screen pt-32 pb-16 bg-[#F8F9FA] overflow-hidden flex flex-col justify-between">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 flex-1 flex flex-col lg:flex-row items-center w-full relative z-10 gap-12">
        <div className="w-full lg:w-[60%] flex flex-col items-start gap-8">
          <h1 className="font-playfair font-medium text-[#1A1A1A] leading-[1.1] tracking-tight" style={{ fontSize: 'clamp(64px, 8vw, 120px)' }}>
            {content.hero.headline}
          </h1>
          <p className="font-dm-sans text-[#1A1A1A]/70 max-w-lg text-lg leading-relaxed">
            {content.hero.subheadline}
          </p>
          <a href="#booking" className="bg-[#0D6E6E] text-[#E8D5B7] px-8 py-4 rounded-full text-lg font-dm-sans hover:bg-[#0a5252] transition-colors inline-flex">
            Book a Consultation
          </a>
          
          <div className="flex gap-8 mt-8 border-t border-[#1A1A1A]/10 pt-8 w-full max-w-lg">
            {content.hero.badges.map((badge, i) => {
              const [val, ...rest] = badge.split(' ')
              return (
                <div key={i} className="flex flex-col">
                  <span className="font-playfair text-2xl text-[#1A1A1A]">{val}</span>
                  <span className="font-dm-sans text-xs text-[#1A1A1A]/60 uppercase tracking-widest">{rest.join(' ')}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="w-full lg:w-[40%] flex justify-center items-center h-[600px]">
          <div className="w-full max-w-[400px] h-full rounded-t-full bg-gradient-to-b from-[#E8D5B7] to-[#E8D5B7]/20 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Tooth CSS Art */}
             <div className="relative w-40 h-48 bg-[#F8F9FA] rounded-3xl flex flex-col justify-between p-4 shadow-lg before:content-[''] before:absolute before:-top-6 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-24 before:bg-[#F8F9FA] before:rounded-full">
                <div className="flex justify-between h-full items-end gap-2 mt-4 z-10">
                   <div className="w-1/2 bg-[#F8F9FA] h-16 rounded-b-full shadow-inner"></div>
                   <div className="w-1/2 bg-[#F8F9FA] h-16 rounded-b-full shadow-inner"></div>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      {/* Ticker Row */}
      <div className="w-full border-y border-[#1A1A1A]/10 py-4 mt-12 whitespace-nowrap overflow-hidden flex">
        <div className="animate-marquee flex gap-12 text-[#1A1A1A] font-dm-sans text-sm uppercase tracking-widest">
          {[...content.services, ...content.services, ...content.services].map((s, i) => (
            <span key={i} className="flex items-center gap-12">
              {s.title} <span className="w-1.5 h-1.5 rounded-full bg-[#0D6E6E]"></span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
