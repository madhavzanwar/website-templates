'use client';

import React from 'react';
import { CafeContent } from '../types';
import { Calendar, Clock, User, Users, CheckCircle, MessageSquare, Sparkles } from 'lucide-react';

interface CuppingEventsSectionProps {
  content: CafeContent;
}

export function CuppingEventsSection({ content }: CuppingEventsSectionProps) {
  const { cupping_events, visit_booking } = content;

  const getEventWhatsAppUrl = (eventTitle: string, eventDate: string) => {
    const text = `${visit_booking.whatsapp_message_prefix}I would like to reserve a seat for "${eventTitle}" on ${eventDate}.`;
    return `https://wa.me/${visit_booking.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="cuppings" className="bg-[#FAF7F2] py-20 lg:py-28 border-b border-[#231B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B85D38]/10 border border-[#B85D38]/30 text-[#B85D38] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{cupping_events.badge}</span>
          </div>

          <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-tight">
            {cupping_events.title}
          </h2>

          <p className="mt-4 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
            {cupping_events.subtitle}
          </p>
        </div>

        {/* Cupping Flight Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cupping_events.events.map((event) => (
            <div
              key={event.id}
              className="bg-[#FFFDF9] border-2 border-[#231B16]/15 rounded-sm p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#B85D38]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Date, Time & Availability */}
                <div className="flex items-start justify-between gap-2 pb-4 border-b border-[#231B16]/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#B85D38]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[#231B16]/60">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-xs font-mono text-[10px] uppercase font-bold tracking-wider ${
                      event.is_sold_out
                        ? 'bg-zinc-200 text-zinc-600'
                        : event.seats_left <= 2
                        ? 'bg-[#B85D38] text-white'
                        : 'bg-[#4A5844]/15 text-[#4A5844]'
                    }`}
                  >
                    {event.is_sold_out
                      ? 'SOLD OUT'
                      : `${event.seats_left} OF ${event.seats_total} SEATS LEFT`}
                  </span>
                </div>

                {/* Event Title & Price */}
                <div className="mt-5">
                  <h3 className="font-artisanal text-xl font-bold text-[#231B16] leading-snug">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-[#231B16]">
                      {event.price}
                    </span>
                    <span className="font-humanist text-xs text-[#231B16]/60">
                      (All-Inclusive Flight)
                    </span>
                  </div>
                </div>

                {/* Host */}
                <div className="mt-3 flex items-center gap-1.5 font-humanist text-xs text-[#231B16]/70">
                  <User className="w-3.5 h-3.5 text-[#B85D38]" />
                  <span>Led by {event.host}</span>
                </div>

                {/* Description */}
                <p className="mt-4 font-humanist text-sm text-[#231B16]/80 leading-relaxed">
                  {event.description}
                </p>

                {/* Flight Lineup */}
                <div className="mt-5 p-3 bg-[#EDE6DA]/50 border border-[#231B16]/10 rounded-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#231B16]/60 tracking-wider block mb-2">
                    CUPPING FLIGHT LINEUP:
                  </span>
                  <ul className="space-y-1 font-mono text-xs text-[#231B16]">
                    {event.flight_origins.map((origin, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B85D38]"></span>
                        <span>{origin}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Included Amenities */}
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#231B16]/60 tracking-wider block mb-2">
                    SESSION INCLUDES:
                  </span>
                  <ul className="space-y-1.5 font-humanist text-xs text-[#231B16]/80">
                    {event.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#4A5844] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="mt-8 pt-5 border-t border-[#231B16]/10">
                <a
                  href={getEventWhatsAppUrl(event.title, event.date)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#231B16] text-[#F7F4EE] font-mono text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#B85D38] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#D99B4B]" />
                  <span>{cupping_events.rsvp_cta_text}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
