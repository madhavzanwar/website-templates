'use client';

import React, { useState } from 'react';
import { RestaurantContent } from '../types';
import { Calendar, Users, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  content: RestaurantContent;
}

export function Hero({ content }: HeroProps) {
  const [selectedDate, setSelectedDate] = useState(content.hero_booking_search.dates[0]);
  const [selectedParty, setSelectedParty] = useState(content.hero_booking_search.party_options[0]);
  const [selectedService, setSelectedService] = useState(content.hero_booking_search.services[0]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      const reservationEl = document.getElementById('reservation');
      if (reservationEl) {
        reservationEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  return (
    <section className="relative w-full bg-[#14080E] text-[#F5EFEB] overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-[#D4A359]/20">
      {/* Ambient Chiaroscuro Gradient Mesh */}
      <div 
        className="absolute top-0 right-0 w-3/4 h-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, #4A1525 0%, #14080E 70%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-1/2 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle at 10% 90%, #D4A359 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 55/45 Theatrical Asymmetric Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: 55% Width (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Stamp */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="text-[#D4A359] text-xs font-dm-mono tracking-[0.2em] uppercase px-3 py-1 bg-[#221619] border border-[#D4A359]/30 rounded-sm">
                [ {content.branding.hero_eyebrow} ]
              </span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-italiana text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-[#F5EFEB] mb-6">
              <span>{content.branding.hero_headline.line1} </span>
              <br className="hidden sm:inline" />
              <span className="font-marcellus italic text-[#D4A359] font-normal">
                {content.branding.hero_headline.line2_italic}
              </span>
            </h1>

            {/* Narrative Prose */}
            <p className="font-manrope text-base sm:text-lg text-[#F5EFEB]/80 leading-relaxed max-w-2xl mb-8 font-light">
              {content.branding.hero_narrative}
            </p>

            {/* Integrated Fixed Table Booking Search Bar */}
            <div className="w-full max-w-xl bg-[#221619] border border-[#D4A359]/30 p-4 sm:p-5 rounded-sm shadow-2xl shadow-black/80">
              <div className="text-[11px] font-dm-mono text-[#D4A359] uppercase tracking-widest mb-3 flex items-center justify-between">
                <span>Reserve a Table</span>
                <span className="text-[#F5EFEB]/50">Instant Confirmation</span>
              </div>

              <form onSubmit={handleBookingSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Step 1: Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-dm-mono uppercase tracking-wider text-[#F5EFEB]/60 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#D4A359]" />
                    {content.hero_booking_search.date_label}
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#14080E] border border-[#D4A359]/25 text-[#F5EFEB] text-xs font-manrope py-2 px-2.5 rounded-sm focus:outline-none focus:border-[#D4A359] transition-colors"
                  >
                    {content.hero_booking_search.dates.map((d) => (
                      <option key={d} value={d} className="bg-[#14080E] text-[#F5EFEB]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 2: Party Size */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-dm-mono uppercase tracking-wider text-[#F5EFEB]/60 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#D4A359]" />
                    {content.hero_booking_search.covers_label}
                  </label>
                  <select
                    value={selectedParty}
                    onChange={(e) => setSelectedParty(e.target.value)}
                    className="w-full bg-[#14080E] border border-[#D4A359]/25 text-[#F5EFEB] text-xs font-manrope py-2 px-2.5 rounded-sm focus:outline-none focus:border-[#D4A359] transition-colors"
                  >
                    {content.hero_booking_search.party_options.map((p) => (
                      <option key={p} value={p} className="bg-[#14080E] text-[#F5EFEB]">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 3: Service */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-dm-mono uppercase tracking-wider text-[#F5EFEB]/60 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#D4A359]" />
                    {content.hero_booking_search.service_label}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-[#14080E] border border-[#D4A359]/25 text-[#F5EFEB] text-xs font-manrope py-2 px-2.5 rounded-sm focus:outline-none focus:border-[#D4A359] transition-colors"
                  >
                    {content.hero_booking_search.services.map((s) => (
                      <option key={s} value={s} className="bg-[#14080E] text-[#F5EFEB]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Booking Button */}
                <div className="sm:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#D4A359] hover:bg-[#E2B873] active:bg-[#B8863D] text-[#14080E] text-xs font-dm-mono uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-[#D4A359]/20"
                  >
                    {bookingConfirmed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-[#14080E]" />
                        <span>Confirming Table...</span>
                      </>
                    ) : (
                      <>
                        <span>{content.hero_booking_search.action_cta}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: 45% Width (lg:col-span-5) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Primary Plating Image with Arched Framing Mask */}
              <div className="relative w-full aspect-[4/5] rounded-t-[140px] rounded-b-sm overflow-hidden border-2 border-[#D4A359]/40 shadow-2xl shadow-black">
                <img
                  src={content.branding.hero_primary_image}
                  alt={content.branding.business_name}
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14080E] via-transparent to-black/30 pointer-events-none" />

                {/* Bottom Frame Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#221619]/90 backdrop-blur-sm border border-[#D4A359]/30 p-3 rounded-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-dm-mono text-[#D4A359] uppercase tracking-widest">
                      Live Hearth Fire
                    </span>
                    <span className="text-xs font-marcellus text-[#F5EFEB]">
                      Charcoal Hearth & Tandoor
                    </span>
                  </div>
                  <span className="text-[11px] font-dm-mono text-[#D4A359] px-2 py-0.5 bg-[#14080E] border border-[#D4A359]/30 rounded">
                    Wood-Fired
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Micro-Vignette */}
              <div className="absolute -bottom-8 -left-4 sm:-bottom-10 sm:-left-8 w-36 h-36 sm:w-44 sm:h-44 rounded-sm overflow-hidden border-2 border-[#D4A359] shadow-2xl shadow-black z-20 hidden xs:block">
                <img
                  src={content.branding.hero_vignette_image}
                  alt="Beverage pairing"
                  className="w-full h-full object-cover object-center filter contrast-110"
                />
                <div className="absolute inset-0 bg-[#4A1525]/20 mix-blend-multiply pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#14080E]/90 text-[9px] font-dm-mono text-[#F5EFEB] px-2 py-0.5 border border-[#D4A359]/30 text-center tracking-wider uppercase">
                  Artisanal Beverages
                </div>
              </div>

              {/* Circular Rotating SVG Seal in Antique Gilt */}
              <div className="absolute -top-6 -right-4 sm:-top-8 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#14080E] border-2 border-[#D4A359] shadow-xl flex items-center justify-center z-20 group">
                {/* SVG circular path text */}
                <svg
                  className="w-full h-full animate-[spin_24s_linear_infinite]"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="sealCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] font-dm-mono uppercase fill-[#D4A359] tracking-[0.22em]">
                    <textPath href="#sealCirclePath" startOffset="0%">
                      {content.branding.hero_seal_text}
                    </textPath>
                  </text>
                </svg>

                {/* Center Star Emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#4A1525] border border-[#D4A359]/60 flex items-center justify-center text-[#D4A359]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
