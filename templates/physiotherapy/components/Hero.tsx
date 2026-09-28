'use client';
import React from 'react';
import Link from 'next/link';

export default function Hero({ content }: { content: any }) {
  return (
    <section className="relative min-h-screen bg-[#1B4332] overflow-hidden flex flex-col">
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Left 55% */}
        <div className="w-full md:w-[55%] flex flex-col justify-center px-6 md:px-16 pt-24 md:pt-0">
          <p className="text-[#F5F0E8] font-nunito text-sm tracking-widest uppercase mb-6 opacity-80">
            {content.hero.badge}
          </p>
          <h1 className="font-cormorant text-[#F5F0E8] leading-[1.1] mb-8" style={{ fontSize: 'clamp(52px, 7vw, 108px)' }}>
            {content.hero.headline.split('. ').map((line: string, i: number) => (
              <span key={i} className="block">{line}{i === 0 ? '.' : ''}</span>
            ))}
          </h1>
          <p className="text-[#8A9A86] font-nunito text-lg md:text-xl max-w-xl mb-12">
            {content.hero.subheadline}
          </p>
          <div className="flex items-center gap-6">
            <Link 
              href={content.hero.primaryCta.href}
              className="bg-[#C8A94A] text-[#0F241C] px-8 py-4 font-nunito font-bold text-lg hover:bg-[#F5F0E8] transition-colors"
            >
              {content.hero.primaryCta.text}
            </Link>
            <div className="font-nunito">
              <span className="block text-[#C8A94A] text-2xl font-bold">{content.hero.trustStats[0].value}</span>
              <span className="text-[#F5F0E8] text-sm opacity-80">{content.hero.trustStats[0].label}</span>
            </div>
          </div>
        </div>

        {/* Right 45% Abstract Art */}
        <div className="w-full md:w-[45%] relative flex items-center justify-center p-12 min-h-[50vh]">
          <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
            {/* Concentric layered ellipses simulating a spine cross section */}
            <div className="absolute w-full h-full border-[1px] border-[#C8A94A] opacity-20 rounded-[50%]" />
            <div className="absolute w-[80%] h-[90%] border-[2px] border-[#C8A94A] opacity-40 rounded-[50%] rotate-6" />
            <div className="absolute w-[60%] h-[75%] border-[3px] border-[#C8A94A] opacity-60 rounded-[50%] -rotate-3" />
            <div className="absolute w-[40%] h-[50%] bg-[#C8A94A] opacity-80 rounded-[50%] blur-[2px]" />
            <div className="absolute w-[15%] h-[20%] bg-[#F5F0E8] rounded-[50%]" />
          </div>
        </div>
      </div>

      {/* Bottom dark strip */}
      <div className="bg-[#0F241C] py-6 px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#C8A94A]/20">
        <div className="flex w-full justify-between max-w-4xl font-nunito">
          {content.hero.trustStats.map((stat: any, idx: number) => (
            <div key={idx} className="text-center">
              <div className="text-[#C8A94A] font-bold text-xl">{stat.value}</div>
              <div className="text-[#F5F0E8] text-sm opacity-80">{idx === 2 ? 'Wakad Pune' : stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
