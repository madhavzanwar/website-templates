'use client';

import React, { useState } from 'react';
import { SalonContent } from '../types';
import { MessageSquare, Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingConciergeSectionProps {
  content: SalonContent;
}

export const BookingConciergeSection: React.FC<BookingConciergeSectionProps> = ({ content }) => {
  const { booking_concierge, services_ledger, masters } = content;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: services_ledger.services[0]?.name || '',
    stylist: 'Any Master Available',
    timeWindow: 'Morning (09:30 – 13:00)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/${booking_concierge.whatsapp_number}?text=${encodeURIComponent(
    booking_concierge.whatsapp_concierge_message
  )}`;

  return (
    <section id="booking" className="relative bg-[#F7F4EE] border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
            {booking_concierge.section_code}
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
            {booking_concierge.section_title}
          </h2>
          <p className="mt-3 font-humanist text-base font-light text-[#5E5750] leading-relaxed">
            {booking_concierge.lead_text}
          </p>
        </div>

        {/* 2-Column Split: Interactive Booking Form + Atelier Details / WhatsApp Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Digital Appointment Request Form */}
          <div className="lg:col-span-7 rounded-2xl border border-[#1C1815]/10 bg-[#EDE8E0]/50 p-6 sm:p-10 shadow-xs">
            <div className="border-b border-[#1C1815]/10 pb-4 mb-6">
              <h3 className="font-editorial text-2xl font-medium text-[#1C1815]">
                {booking_concierge.form_config.title}
              </h3>
              <p className="font-humanist text-xs text-[#7A7067] mt-1">
                {booking_concierge.form_config.subtitle}
              </p>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-[#B86B4F]/30 bg-[#F7F4EE] p-8 text-center animate-fadeIn">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#B86B4F] mb-4" />
                <h4 className="font-editorial text-2xl font-medium text-[#1C1815]">
                  Reservation Request Received
                </h4>
                <p className="mt-2 font-humanist text-sm font-light text-[#5E5750] max-w-md mx-auto leading-relaxed">
                  {booking_concierge.form_config.confirmation_message}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#1C1815]/20 bg-transparent px-6 py-2.5 font-humanist text-xs uppercase tracking-wider text-[#1C1815] hover:bg-[#1C1815] hover:text-white transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Pooja Deshmukh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] placeholder-[#7A7067]/60 focus:border-[#B86B4F] focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98220 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] placeholder-[#7A7067]/60 focus:border-[#B86B4F] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="pooja.deshmukh@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] placeholder-[#7A7067]/60 focus:border-[#B86B4F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Select Service */}
                  <div>
                    <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                      Select Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] focus:border-[#B86B4F] focus:outline-none"
                    >
                      {services_ledger.services.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} ({srv.price_display})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Stylist */}
                  <div>
                    <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                      Preferred Stylist
                    </label>
                    <select
                      value={formData.stylist}
                      onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                      className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] focus:border-[#B86B4F] focus:outline-none"
                    >
                      <option value="Any Stylist Available">Any Stylist Available</option>
                      {masters.stylists.map((stylist) => (
                        <option key={stylist.id} value={stylist.name}>
                          {stylist.name} ({stylist.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Window */}
                <div>
                  <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={formData.timeWindow}
                    onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                    className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] focus:border-[#B86B4F] focus:outline-none"
                  >
                    <option value="Morning (09:30 – 13:00)">Morning (09:30 – 13:00)</option>
                    <option value="Afternoon (13:00 – 17:00)">Afternoon (13:00 – 17:00)</option>
                    <option value="Evening (17:00 – 19:30)">Evening (17:00 – 19:30)</option>
                    <option value="Flexible / First Available">Flexible / First Available</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-humanist text-xs uppercase tracking-wider text-[#1C1815] font-medium mb-1.5">
                    Hair History / Consultation Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Previous color history, scalp sensitivities, or event timing..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-[#1C1815]/15 bg-[#F7F4EE] px-4 py-3 font-humanist text-sm text-[#1C1815] placeholder-[#7A7067]/60 focus:border-[#B86B4F] focus:outline-none"
                  />
                </div>

                {/* Protocol Note */}
                <p className="font-humanist text-[11px] text-[#7A7067] leading-relaxed">
                  {booking_concierge.form_config.consultation_notice}
                </p>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-8 py-4 font-humanist text-xs uppercase tracking-[0.18em] font-semibold text-white shadow-xs hover:bg-[#A3593E] hover:border-[#A3593E] transition-all cursor-pointer"
                >
                  <span>{booking_concierge.form_config.submit_button_text}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="pt-2 text-center font-humanist text-xs text-[#7A7067]">
                  ✓ UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards & Cash accepted at salon.
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): WhatsApp Direct Concierge + Location & Atelier Hours */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Concierge Card */}
            <div className="rounded-2xl border border-[#B86B4F]/30 bg-[#EDE8E0] p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#B86B4F]">
                  WhatsApp Appointment
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#B86B4F]/10 px-2.5 py-0.5 font-humanist text-[10px] text-[#B86B4F] font-semibold">
                  Quick Reply
                </span>
              </div>

              <h4 className="font-editorial text-2xl font-normal text-[#1C1815]">
                Direct WhatsApp Booking
              </h4>
              <p className="mt-2 font-humanist text-xs font-light text-[#5E5750] leading-relaxed">
                Prefer chatting directly? Message our reception on WhatsApp for appointments, hair consultations, or bridal packages.
              </p>

              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-full border border-[#1C1815] bg-[#1C1815] px-6 py-3.5 font-humanist text-xs uppercase tracking-wider text-[#F7F4EE] hover:bg-[#B86B4F] hover:border-[#B86B4F] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-[#C4A47C]" />
                    <span>WhatsApp Appointment</span>
                  </div>
                  <span className="text-[11px] text-white/70">{booking_concierge.whatsapp_display}</span>
                </a>
              </div>
            </div>

            {/* Salon Address & Contact Coordinates */}
            <div className="rounded-2xl border border-[#1C1815]/10 bg-[#EDE8E0]/40 p-6 sm:p-8 space-y-5">
              <div>
                <span className="font-humanist text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B86B4F] block mb-2">
                  Salon Address
                </span>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-[#B86B4F] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-editorial text-lg text-[#1C1815]">
                      {booking_concierge.address}
                    </div>
                    <div className="font-humanist text-xs text-[#7A7067] mt-0.5">
                      {booking_concierge.address_details}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#1C1815]/8 pt-4 flex flex-col sm:flex-row gap-4 justify-between text-xs font-humanist text-[#5E5750]">
                <a href={`tel:${content.navigation.phone_tel}`} className="flex items-center gap-2 hover:text-[#1C1815]">
                  <Phone className="h-3.5 w-3.5 text-[#B86B4F]" />
                  <span>{booking_concierge.phone}</span>
                </a>
                <a href={`mailto:${booking_concierge.email}`} className="flex items-center gap-2 hover:text-[#1C1815]">
                  <Mail className="h-3.5 w-3.5 text-[#B86B4F]" />
                  <span>{booking_concierge.email}</span>
                </a>
              </div>

              {/* Opening Hours Schedule */}
              <div className="border-t border-[#1C1815]/8 pt-4">
                <span className="font-humanist text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1815] block mb-2">
                  Opening Hours
                </span>
                <div className="space-y-1.5">
                  {booking_concierge.opening_hours.map((schedule, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-humanist">
                      <span className="text-[#6E665E]">{schedule.days}</span>
                      <span className="font-medium text-[#1C1815]">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities List */}
              <div className="border-t border-[#1C1815]/8 pt-4">
                <span className="font-humanist text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1C1815] block mb-2">
                  Salon Amenities
                </span>
                <ul className="space-y-1.5">
                  {booking_concierge.amenities.map((amenity, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] font-humanist text-[#5E5750]">
                      <Sparkles className="h-3 w-3 text-[#C4A47C] shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
