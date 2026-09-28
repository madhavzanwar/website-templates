'use client';

import React, { useState } from 'react';
import { GymContent } from '../types';
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BookingContactSectionProps {
  content: GymContent;
}

export const BookingContactSection: React.FC<BookingContactSectionProps> = ({ content }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    discipline: content.services[0].name,
    startDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whatsappHref = `https://wa.me/${content.contact.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(content.contact.whatsapp_message)}`;

  return (
    <section id="booking" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              {content.contact.section_code}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {content.contact.section_title}
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest max-w-sm">
            {content.contact.lead_text}
          </div>
        </div>

        {/* 2-Column Booking HUD: Contact Details + Reservation Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Physical compound specifics, hours & direct WhatsApp */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Direct WhatsApp Callout Card */}
            <div className="border border-[#D4FF00]/40 bg-[#14161B] p-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4FF00]">
                  QUICK ENQUIRY & WHATSAPP
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mt-3">
                TALK TO OUR HEAD COACH
              </h3>
              <p className="font-body text-sm text-zinc-400 mt-2 leading-relaxed">
                Have questions about workout plans, personal training, or timings? Message or call our desk directly.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#D4FF00] bg-[#D4FF00] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-[#D4FF00] transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WHATSAPP US</span>
                </a>

                <a
                  href={`tel:${content.contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-white/50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span>CALL NOW</span>
                </a>
              </div>
            </div>

            {/* Compound Coordinates & Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Address */}
              <div className="border border-white/10 bg-[#14161B] p-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D4FF00] mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>OUR GYM ADDRESS</span>
                </div>
                <div className="font-body text-sm text-zinc-200 leading-snug">
                  {content.contact.address}
                </div>
                <div className="mt-3 font-mono text-[11px] text-zinc-500">
                  {content.contact.parking_transit}
                </div>
                <div className="mt-3 font-mono text-[11px] text-zinc-400">
                  INSTAGRAM: <a href={content.contact.instagram_url} target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-[#D4FF00] underline">{content.contact.instagram_handle}</a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="border border-white/10 bg-[#14161B] p-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D4FF00] mb-3">
                  <Clock className="h-4 w-4" />
                  <span>OPERATIONAL HOURS</span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {content.contact.opening_hours.map((h, idx) => (
                    <div key={idx} className="flex justify-between border-b border-white/5 pb-1.5 text-zinc-300">
                      <span className="text-zinc-500 text-[10px]">{h.days}</span>
                      <span className="text-white text-[11px] font-bold">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Terminal Pass Reservation Form */}
          <div className="lg:col-span-6 border border-white/15 bg-[#14161B] p-8 sm:p-10">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#D4FF00] mb-2">
              BOOK YOUR TRIAL
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              {content.contact.booking_form.title}
            </h3>
            <p className="font-body text-sm text-zinc-400 mt-2">
              {content.contact.booking_form.description}
            </p>

            {formSubmitted ? (
              <div className="mt-8 border border-[#D4FF00] bg-[#D4FF00]/10 p-8 text-center animate-fadeIn">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#D4FF00]" />
                <h4 className="font-display text-2xl font-bold uppercase text-white mt-4">
                  TRIAL PASS CONFIRMED
                </h4>
                <p className="mt-2 font-body text-sm text-zinc-300">
                  Welcome to {content.branding.business_name}, <strong>{formData.fullName}</strong>. We have sent the pass details to <strong>{formData.email}</strong>. Our team will also reach out to you on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    YOUR FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-white/20 bg-[#090A0C] px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    EMAIL CREDENTIAL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. m.thorne@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-white/20 bg-[#090A0C] px-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    PRIMARY DISCIPLINE INTEREST
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="w-full border border-white/20 bg-[#090A0C] px-4 py-3 font-mono text-sm text-white focus:border-[#D4FF00] focus:outline-none"
                  >
                    {content.services.map((svc) => (
                      <option key={svc.id} value={svc.name} className="bg-[#14161B]">
                        {svc.code} // {svc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    TARGET START DATE
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full border border-white/20 bg-[#090A0C] px-4 py-3 font-mono text-sm text-white focus:border-[#D4FF00] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-3 border border-[#D4FF00] bg-[#D4FF00] py-4 font-mono text-xs font-black uppercase tracking-wider text-black hover:bg-black hover:text-[#D4FF00] transition-colors"
                  >
                    <span>{content.contact.booking_form.submit_text}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="font-mono text-[10px] text-zinc-500 leading-tight">
                  {content.contact.booking_form.disclaimer}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 font-mono text-[11px] text-zinc-400">
                  <span className="text-[#D4FF00]">✓</span>
                  <span>UPI, Google Pay, PhonePe, Paytm & Cards accepted at reception desk.</span>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
