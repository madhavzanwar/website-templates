'use client';

import React, { useState } from 'react';
import { Send, MessageCircle, MapPin, Mail, Phone, Calendar, Clock, CheckCircle2, Shield, Heart } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface InquirySectionProps {
  content: WeddingPhotographerContent;
}

export function InquirySection({ content }: InquirySectionProps) {
  const { inquiry } = content;
  const { form, concierge_contacts, calendar_status } = inquiry;

  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [season, setSeason] = useState(form.season_options[2] || '');
  const [location, setLocation] = useState('');
  const [guestCount, setGuestCount] = useState(form.guest_options[1] || '');
  const [budget, setBudget] = useState(form.investment_tiers[1] || '');
  const [vision, setVision] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Formulate WhatsApp Concierge URL with prefilled inquiry message
  const generateWhatsAppUrl = () => {
    const rawNumber = concierge_contacts.whatsapp_number.replace(/\D/g, '');
    const message = `Hello Aarav & Maya,\n\nWe would love to check availability for our wedding photography!\n\nCouple Names: ${names || '[Not specified yet]'}\nEmail: ${email || '[Not specified yet]'}\nPhone: ${whatsapp || '[Not specified yet]'}\nWedding Season / Date: ${season}\nVenue / City: ${location || '[To be decided]'}\nGuest Count: ${guestCount}\nPlanned Budget: ${budget}\n\nOur Vision:\n${vision || 'We love your candid and fine-art photography style.'}`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#1C1917]/8 relative">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-[#B87D74]" />
            <span className="font-tenor text-xs uppercase tracking-[0.24em] text-[#B87D74]">
              {inquiry.badge}
            </span>
          </div>
          <h2 className="font-newsreader text-3xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal leading-tight">
            {inquiry.headline}{' '}
            <span className="italic text-[#B87D74] block sm:inline">
              {inquiry.headline_italic}
            </span>
          </h2>
          <p className="mt-6 font-tenor text-base sm:text-lg text-[#57524E] leading-relaxed">
            {inquiry.narrative}
          </p>
        </div>

        {/* 2-Column Warm Parchment Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Studio Coordinates, Calendar Status & WhatsApp Concierge (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Live Availability Status Card */}
            <div className="p-8 rounded-2xl bg-[#ECE6DD]/80 border border-[#1C1917]/10 space-y-4">
              <div className="flex items-center gap-2 text-xs font-tenor uppercase tracking-widest text-[#B87D74]">
                <Calendar className="w-4 h-4" />
                <span>{calendar_status.booking_state}</span>
              </div>

              <div className="font-newsreader text-2xl text-[#1C1917]">
                {calendar_status.season}:{' '}
                <span className="italic text-[#B87D74]">{calendar_status.dates_left}</span>
              </div>

              <p className="font-tenor text-xs text-[#57524E] leading-relaxed">
                {inquiry.availability_note}
              </p>

              <div className="pt-3 border-t border-[#1C1917]/10 flex items-center gap-2 text-[11px] font-tenor text-[#9D8469] uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>{calendar_status.intake_limit}</span>
              </div>
            </div>

            {/* Direct Studio Coordinates */}
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#1C1917]/10 space-y-6">
              <div className="font-tenor text-xs uppercase tracking-widest text-[#9D8469]">
                Studio Contact Information
              </div>

              <div className="space-y-4 text-xs font-tenor text-[#1C1917]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B87D74] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#8C827A] uppercase tracking-wider">Email Address</div>
                    <a href={`mailto:${concierge_contacts.email}`} className="font-medium hover:text-[#B87D74] transition-colors">
                      {concierge_contacts.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B87D74] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#8C827A] uppercase tracking-wider">Phone / Mobile</div>
                    <a href={`tel:${concierge_contacts.phone}`} className="font-medium hover:text-[#B87D74] transition-colors">
                      {concierge_contacts.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B87D74] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-[#8C827A] uppercase tracking-wider">Studio Locations</div>
                    {concierge_contacts.studio_locations.map((loc, idx) => (
                      <div key={idx} className="text-[#57524E]">{loc}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge CTA Card */}
              <div className="pt-4 border-t border-[#1C1917]/8">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-wider hover:bg-[#25D366] hover:text-black transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Directly on WhatsApp</span>
                </a>
                <div className="mt-2 text-center text-[10px] font-tenor text-[#8C827A]">
                  {concierge_contacts.response_time}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-tenor text-[#8C827A] px-2">
              <Shield className="w-4 h-4 text-[#9D8469]" />
              <span>{form.confidentiality_note}</span>
            </div>

          </div>

          {/* Right Column: Emotional Story Inquiry Form (Cols 6-12) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#ECE6DD]/50 border border-[#1C1917]/10 shadow-sm">
              
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#B87D74]/20 flex items-center justify-center text-[#B87D74]">
                    <Heart className="w-8 h-8 fill-[#B87D74]" />
                  </div>
                  <h3 className="font-newsreader text-3xl sm:text-4xl text-[#1C1917]">
                    {form.success_heading}
                  </h3>
                  <p className="font-tenor text-sm sm:text-base text-[#57524E] max-w-md mx-auto leading-relaxed">
                    {form.success_message}
                  </p>

                  <div className="pt-6 border-t border-[#1C1917]/10">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-black font-tenor text-xs uppercase tracking-wider hover:bg-[#1EBE5D] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{form.direct_whatsapp_cta}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Couple Names */}
                  <div>
                    <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                      {form.name_label} *
                    </label>
                    <input
                      type="text"
                      required
                      value={names}
                      onChange={(e) => setNames(e.target.value)}
                      placeholder={form.name_placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                    />
                  </div>

                  {/* Email & WhatsApp Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.email_label} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={form.email_placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.whatsapp_label} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder={form.whatsapp_placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Season Datepicker Dropdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.date_label} *
                      </label>
                      <select
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      >
                        {form.season_options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.location_label} *
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={form.location_placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Guest Count & Investment Budget Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.guest_count_label}
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      >
                        {form.guest_options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                        {form.investment_label}
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors"
                      >
                        {form.investment_tiers.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Vision Note */}
                  <div>
                    <label className="block text-xs font-tenor uppercase tracking-wider text-[#1C1917] mb-2">
                      {form.vision_label} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      placeholder={form.vision_placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1917]/15 text-[#1C1917] font-tenor text-sm focus:outline-none focus:border-[#B87D74] transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 px-8 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-[0.2em] hover:bg-[#B87D74] transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{form.submit_button}</span>
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-tenor text-[#9D8469] hover:text-[#B87D74] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{form.direct_whatsapp_cta}</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
