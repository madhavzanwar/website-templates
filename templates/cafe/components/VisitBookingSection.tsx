'use client';

import React, { useState } from 'react';
import { CafeContent } from '../types';
import { MapPin, Clock, Phone, Mail, MessageSquare, Check, Sparkles, Navigation } from 'lucide-react';

interface VisitBookingSectionProps {
  content: CafeContent;
}

export function VisitBookingSection({ content }: VisitBookingSectionProps) {
  const { visit_booking } = content;

  // Form State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [partySize, setPartySize] = useState('2 Guests');
  const [selectedOccasion, setSelectedOccasion] = useState(
    visit_booking.booking_form.occasions[0] || 'Casual Morning Coffee & Bakery'
  );
  const [specialNotes, setSpecialNotes] = useState('');

  const timeOptions = [
    '08:00 AM',
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = [
      `Name: ${guestName || 'A Guest'}`,
      `Date: ${selectedDate || 'Upcoming Date'}`,
      `Time: ${selectedTime}`,
      `Party Size: ${partySize}`,
      `Occasion: ${selectedOccasion}`,
      specialNotes ? `Notes: ${specialNotes}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const whatsappMessage = `${visit_booking.whatsapp_message_prefix}${details}`;
    const cleanPhone = visit_booking.whatsapp_number.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="visit" className="bg-[#231B16] text-[#F7F4EE] py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sanctuary Coordinates & Visiting Information */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B85D38]/20 border border-[#B85D38]/40 text-[#D99B4B] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
                <Navigation className="w-3.5 h-3.5" />
                <span>{visit_booking.badge}</span>
              </div>

              <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
                {visit_booking.title}
              </h2>

              <p className="mt-4 font-humanist text-base sm:text-lg text-[#EDE6DA]/80 leading-relaxed">
                {visit_booking.subtitle}
              </p>
            </div>

            {/* Address & Transit */}
            <div className="p-6 bg-[#2F241F] border border-[#4A3B33] rounded-sm space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B85D38] shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-[#D99B4B] font-bold">
                    CAFE LOCATION
                  </div>
                  <div className="font-artisanal text-lg font-bold text-white mt-0.5">
                    {visit_booking.address}
                  </div>
                  <div className="font-humanist text-xs text-[#EDE6DA]/70 mt-1">
                    {visit_booking.transit_notes}
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="p-6 bg-[#2F241F] border border-[#4A3B33] rounded-sm">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D99B4B] font-bold mb-4">
                <Clock className="w-4 h-4 text-[#B85D38]" />
                <span>ROASTERY & BAR HOURS</span>
              </div>

              <div className="space-y-3 divide-y divide-[#4A3B33]/60 font-humanist">
                {visit_booking.opening_hours.map((schedule, idx) => (
                  <div key={idx} className={`${idx !== 0 ? 'pt-3' : ''} flex flex-col sm:flex-row sm:items-baseline justify-between gap-1`}>
                    <span className="font-bold text-white text-sm">
                      {schedule.days}
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-xs sm:text-sm text-[#D99B4B] font-semibold block">
                        {schedule.hours}
                      </span>
                      {schedule.notes && (
                        <span className="text-[11px] text-[#EDE6DA]/60 block">
                          {schedule.notes}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cafe Policy Badges */}
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#EDE6DA]/60 block mb-3 font-semibold">
                CAFE AMENITIES & RULES
              </span>
              <div className="flex flex-wrap gap-2">
                {visit_booking.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1A1410] border border-[#4A3B33] text-xs font-mono text-[#EDE6DA]"
                  >
                    <Check className="w-3.5 h-3.5 text-[#4A5844]" />
                    <span>{amenity.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Contact Coordinates */}
            <div className="pt-4 border-t border-[#4A3B33] flex flex-wrap items-center gap-6 font-mono text-xs text-[#EDE6DA]/80">
              <a href={`tel:${visit_booking.phone}`} className="flex items-center gap-2 hover:text-[#D99B4B]">
                <Phone className="w-3.5 h-3.5 text-[#B85D38]" />
                <span>{visit_booking.phone}</span>
              </a>
              <a href={`mailto:${visit_booking.email}`} className="flex items-center gap-2 hover:text-[#D99B4B]">
                <Mail className="w-3.5 h-3.5 text-[#B85D38]" />
                <span>{visit_booking.email}</span>
              </a>
              <a
                href={visit_booking.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#D99B4B]"
              >
                <svg className="w-3.5 h-3.5 text-[#B85D38] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>{visit_booking.instagram_handle}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Reservation Terminal */}
          <div className="lg:col-span-6 bg-[#FFFDF9] text-[#231B16] rounded-sm p-8 sm:p-10 border-2 border-[#D99B4B]/30 shadow-2xl">
            <div className="border-b border-[#231B16]/10 pb-5 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#B85D38] block mb-1">
                RESERVE A TABLE
              </span>
              <h3 className="font-artisanal text-2xl sm:text-3xl font-bold text-[#231B16]">
                {visit_booking.booking_form.title}
              </h3>
              <p className="mt-2 font-humanist text-xs sm:text-sm text-[#231B16]/75">
                {visit_booking.booking_form.description}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Joshi"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98220 12345"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                  />
                </div>
              </div>

              {/* Occasion Selection */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                  Occasion or Experience
                </label>
                <select
                  value={selectedOccasion}
                  onChange={(e) => setSelectedOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                >
                  {visit_booking.booking_form.occasions.map((occ, idx) => (
                    <option key={idx} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                  >
                    {timeOptions.map((time, idx) => (
                      <option key={idx} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Party Size */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                  Party Size
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => setPartySize(size)}
                      className={`py-2 text-center rounded-sm font-mono text-xs font-bold transition-all cursor-pointer ${
                        partySize === size
                          ? 'bg-[#231B16] text-[#FAF6EE] shadow-sm'
                          : 'bg-[#EDE6DA] text-[#231B16]/80 hover:bg-[#E5DFC5]'
                      }`}
                    >
                      {size.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#231B16]/70 font-semibold mb-1">
                  Special Notes / Dietary Requirements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oat milk preference, wheelchair access, high-chair"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#231B16]/20 bg-[#F7F4EE] font-humanist text-sm text-[#231B16] focus:outline-hidden focus:border-[#B85D38]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-sm bg-[#B85D38] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#9E4D2C] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-[#D99B4B]" />
                  <span>{visit_booking.booking_form.submit_text}</span>
                </button>
                <p className="mt-2.5 font-humanist text-[11px] text-[#231B16]/60 text-center leading-normal">
                  {visit_booking.booking_form.disclaimer}
                </p>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
