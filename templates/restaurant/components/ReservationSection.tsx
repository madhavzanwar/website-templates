'use client';

import React, { useState } from 'react';
import { RestaurantContent, DiningExperience } from '../types';
import { Calendar, Users, Clock, Check, MessageSquare, ShieldCheck, Sparkles, Phone, ArrowRight } from 'lucide-react';

interface ReservationSectionProps {
  content: RestaurantContent;
}

export function ReservationSection({ content }: ReservationSectionProps) {
  const { reservation } = content;

  const [selectedExperience, setSelectedExperience] = useState<string>(
    reservation.experiences[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    reservation.available_dates[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    reservation.seating_times[0]
  );
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedDietaries, setSelectedDietaries] = useState<string[]>([]);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleDietary = (id: string) => {
    setSelectedDietaries((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const activeExperienceObj =
    reservation.experiences.find((e) => e.id === selectedExperience) ||
    reservation.experiences[0];

  const whatsappUrl = `https://wa.me/${reservation.whatsapp_concierge.whatsapp_number}?text=${encodeURIComponent(
    reservation.whatsapp_concierge.prefilled_message
  )}`;

  return (
    <section id="reservation" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {reservation.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-4">
            {reservation.title}
          </h2>

          <p className="font-manrope text-base text-[#F5EFEB]/75 font-light">
            {reservation.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Reservation Terminal (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-[#221619] border border-[#D4A359]/30 p-6 sm:p-10 rounded-sm shadow-2xl">
            {isSubmitted ? (
              <div className="py-16 text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#4A1525] border-2 border-[#D4A359] flex items-center justify-center mx-auto mb-6 text-[#D4A359]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-marcellus text-2xl sm:text-3xl text-[#F5EFEB] mb-3">
                  Table Reservation Request Received
                </h3>
                <p className="font-manrope text-sm text-[#F5EFEB]/80 max-w-md mx-auto mb-6 font-light">
                  Thank you, <strong className="text-[#D4A359]">{guestName || 'Guest'}</strong>. Our restaurant team has received your booking request for <strong>{guestCount} guests</strong> on <strong>{selectedDate} ({selectedTime})</strong> in <strong>{activeExperienceObj.title}</strong>.
                </p>
                <div className="p-4 bg-[#14080E] border border-[#D4A359]/20 rounded-sm max-w-sm mx-auto text-xs font-dm-mono text-[#F5EFEB]/70 mb-8">
                  A verification confirmation code has been dispatched to {guestEmail || 'your email'}.
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-[#4A1525] border border-[#D4A359] text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] hover:bg-[#D4A359] hover:text-[#14080E] transition-colors rounded-sm"
                >
                  Adjust Booking Details
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Step 1: Experience Selection */}
                <div>
                  <label className="block text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] mb-3">
                    Stage 1 • Select Dining Experience & Atmosphere
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {reservation.experiences.map((exp) => {
                      const isSelected = selectedExperience === exp.id;
                      return (
                        <div
                          key={exp.id}
                          onClick={() => setSelectedExperience(exp.id)}
                          className={`p-4 rounded-sm cursor-pointer transition-all duration-200 border ${
                            isSelected
                              ? 'bg-[#4A1525] border-[#D4A359] shadow-lg shadow-[#4A1525]/40'
                              : 'bg-[#14080E] border-[#D4A359]/20 hover:border-[#D4A359]/50'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-dm-mono uppercase tracking-wider text-[#D4A359] mb-1">
                            <span>{exp.tag}</span>
                            <span>{exp.covers_range}</span>
                          </div>
                          <h4 className="font-marcellus text-base text-[#F5EFEB] mb-1.5">
                            {exp.title}
                          </h4>
                          <p className="font-manrope text-xs text-[#F5EFEB]/70 font-light leading-snug">
                            {exp.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Date & Seating Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D4A359]" />
                      Stage 2 • Preferred Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#14080E] border border-[#D4A359]/30 text-[#F5EFEB] text-xs font-manrope py-3 px-3 rounded-sm focus:outline-none focus:border-[#D4A359]"
                    >
                      {reservation.available_dates.map((date) => (
                        <option key={date} value={date} className="bg-[#14080E] text-[#F5EFEB]">
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D4A359]" />
                      Stage 3 • Seating Service Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-[#14080E] border border-[#D4A359]/30 text-[#F5EFEB] text-xs font-manrope py-3 px-3 rounded-sm focus:outline-none focus:border-[#D4A359]"
                    >
                      {reservation.seating_times.map((time) => (
                        <option key={time} value={time} className="bg-[#14080E] text-[#F5EFEB]">
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Guest Covers Counter */}
                <div>
                  <label className="block text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D4A359]" />
                    Stage 4 • Number of Guests (Covers)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {reservation.guest_counts.map((count) => {
                      const isCountSelected = guestCount === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setGuestCount(count)}
                          className={`w-11 h-11 rounded-sm text-xs font-dm-mono font-bold transition-all border ${
                            isCountSelected
                              ? 'bg-[#D4A359] text-[#14080E] border-[#D4A359]'
                              : 'bg-[#14080E] text-[#F5EFEB]/70 border-[#D4A359]/20 hover:text-[#F5EFEB] hover:border-[#D4A359]/50'
                          }`}
                        >
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 4: Dietary Preferences */}
                <div>
                  <label className="block text-xs font-dm-mono uppercase tracking-widest text-[#D4A359] mb-3">
                    Dietary Preferences & Special Requests
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {reservation.dietary_options.map((diet) => {
                      const isChecked = selectedDietaries.includes(diet.id);
                      return (
                        <button
                          key={diet.id}
                          type="button"
                          onClick={() => toggleDietary(diet.id)}
                          className={`flex items-center gap-2 p-2.5 rounded-sm text-left text-xs font-manrope transition-all border ${
                            isChecked
                              ? 'bg-[#4A1525] border-[#D4A359] text-[#D4A359] font-medium'
                              : 'bg-[#14080E] border-[#D4A359]/20 text-[#F5EFEB]/60 hover:text-[#F5EFEB]'
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                              isChecked
                                ? 'bg-[#D4A359] border-[#D4A359] text-[#14080E]'
                                : 'border-[#D4A359]/40 bg-transparent'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{diet.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Guest Contact Information Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#D4A359]/20">
                  <div>
                    <label className="block text-[11px] font-dm-mono uppercase text-[#F5EFEB]/70 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Vikram Shinde"
                      className="w-full bg-[#14080E] border border-[#D4A359]/30 text-[#F5EFEB] text-xs font-manrope py-2.5 px-3 rounded-sm focus:outline-none focus:border-[#D4A359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-dm-mono uppercase text-[#F5EFEB]/70 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder="vikram.shinde@gmail.com"
                      className="w-full bg-[#14080E] border border-[#D4A359]/30 text-[#F5EFEB] text-xs font-manrope py-2.5 px-3 rounded-sm focus:outline-none focus:border-[#D4A359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-dm-mono uppercase text-[#F5EFEB]/70 mb-1">
                      Mobile Telephone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="+91 98220 12345"
                      className="w-full bg-[#14080E] border border-[#D4A359]/30 text-[#F5EFEB] text-xs font-manrope py-2.5 px-3 rounded-sm focus:outline-none focus:border-[#D4A359]"
                    />
                  </div>
                </div>

                {/* Policies & Deposit Disclaimer */}
                <div className="bg-[#14080E] border border-[#D4A359]/20 p-4 rounded-sm text-xs font-manrope text-[#F5EFEB]/70 space-y-1.5 font-light">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                    <p>{reservation.deposit_policy}</p>
                  </div>
                  <p className="text-[11px] font-dm-mono text-[#F5EFEB]/50 pl-6">
                    {reservation.cancellation_policy}
                  </p>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4A359] hover:bg-[#E2B873] active:bg-[#B8863D] text-[#14080E] text-xs font-dm-mono uppercase tracking-widest font-bold rounded-sm shadow-xl shadow-[#D4A359]/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>{reservation.submit_button_text}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}
          </div>

          {/* Right Column: Direct WhatsApp Concierge Terminal (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            <div className="bg-[#221619] border border-[#D4A359]/30 p-6 sm:p-8 rounded-sm shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-[11px] font-dm-mono uppercase tracking-widest text-[#D4A359]">
                    WhatsApp Table Booking
                  </span>
                </div>

                <h3 className="font-marcellus text-2xl text-[#F5EFEB] mb-2">
                  {reservation.whatsapp_concierge.title}
                </h3>

                <p className="font-manrope text-xs sm:text-sm text-[#F5EFEB]/75 font-light leading-relaxed mb-6">
                  {reservation.whatsapp_concierge.description}
                </p>

                {/* Sommelier Contact Card */}
                <div className="bg-[#14080E] border border-[#D4A359]/20 p-4 rounded-sm mb-6">
                  <div className="font-marcellus text-base text-[#F5EFEB]">
                    {reservation.whatsapp_concierge.sommelier_name}
                  </div>
                  <div className="text-xs font-dm-mono text-[#D4A359] mb-2">
                    {reservation.whatsapp_concierge.sommelier_role}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-dm-mono text-[#F5EFEB]/80">
                    <Phone className="w-3 h-3 text-[#D4A359]" />
                    <span>{reservation.whatsapp_concierge.phone_display}</span>
                  </div>
                </div>

                {/* Response SLA Note */}
                <div className="text-[11px] font-dm-mono text-[#D4A359] italic mb-6">
                  ✦ {reservation.whatsapp_concierge.instant_reply_window}
                </div>
              </div>

              {/* WhatsApp Trigger Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-dm-mono uppercase tracking-widest font-bold rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Message Concierge via WhatsApp</span>
              </a>
            </div>

            {/* Private Vault / Buyout Card */}
            <div className="bg-[#14080E] border border-[#D4A359]/20 p-6 rounded-sm">
              <h4 className="font-marcellus text-lg text-[#F5EFEB] mb-1">
                Private Dining & Whole Salon Buyouts
              </h4>
              <p className="font-manrope text-xs text-[#F5EFEB]/70 font-light leading-relaxed mb-3">
                For corporate celebrations or bespoke multi-course menus crafted with rare pre-phylloxera cellar pairings, email our private events direct line:
              </p>
              <div className="text-xs font-dm-mono text-[#D4A359]">
                curator@aurelia-hearth.co.uk
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
