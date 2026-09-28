'use client';

import React, { useState } from 'react';
import { SalonContent } from '../types';
import { ArrowRight, Check, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  content: SalonContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  const { footer, branding, booking_concierge } = content;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative bg-[#1C1815] text-[#F7F4EE] pt-20 pb-12 border-t border-[#1C1815]">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Grand Atelier Ledger Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 mb-16">
          <div>
            <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.16em] uppercase text-[#F7F4EE]">
              {branding.business_name}
            </span>
            <div className="mt-1 font-humanist text-xs uppercase tracking-[0.25em] text-[#C4A47C]">
              {branding.subtitle} • {branding.location_short}
            </div>
          </div>

          <p className="max-w-md font-humanist text-sm font-light text-[#EDE8E0]/70 leading-relaxed">
            {footer.atelier_tagline}
          </p>
        </div>

        {/* 4-Column Directory Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Column 1: Contact & Location Coordinates */}
          <div>
            <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#C4A47C] mb-4">
              {footer.col_concierge_title}
            </h4>
            <div className="space-y-3 font-humanist text-xs text-[#EDE8E0]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#B86B4F] shrink-0 mt-0.5" />
                <span>{booking_concierge.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-[#B86B4F] shrink-0" />
                <a href={`tel:${content.navigation.phone_tel}`} className="hover:text-white transition-colors">
                  {booking_concierge.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#B86B4F] shrink-0" />
                <a href={`mailto:${booking_concierge.email}`} className="hover:text-white transition-colors">
                  {booking_concierge.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <svg className="h-3.5 w-3.5 text-[#B86B4F] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <a
                  href={booking_concierge.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {booking_concierge.instagram_handle}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Hours of Stillness */}
          <div>
            <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#C4A47C] mb-4">
              {footer.col_hours_title}
            </h4>
            <div className="space-y-2.5 font-humanist text-xs text-[#EDE8E0]/80">
              {booking_concierge.opening_hours.map((schedule, idx) => (
                <div key={idx} className="border-b border-white/5 pb-2">
                  <div className="flex justify-between">
                    <span className="text-white/60">{schedule.days}</span>
                    <span className="text-[#F7F4EE]">{schedule.hours}</span>
                  </div>
                  {schedule.note && (
                    <div className="text-[10px] text-[#C4A47C] mt-0.5">{schedule.note}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Atelier Protocols */}
          <div>
            <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#C4A47C] mb-4">
              {footer.col_legal_title}
            </h4>
            <ul className="space-y-2.5 font-humanist text-xs text-[#EDE8E0]/80">
              {footer.legal_links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-white hover:underline transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Seasonal Journal & Newsletter Subscription */}
          <div>
            <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#C4A47C] mb-4">
              {footer.newsletter_title}
            </h4>
            <p className="font-humanist text-xs text-[#EDE8E0]/70 mb-4 leading-relaxed">
              {footer.newsletter_notice}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 rounded-lg border border-[#B86B4F]/40 bg-white/5 p-3 text-xs text-[#C4A47C]">
                <Check className="h-4 w-4 text-[#B86B4F]" />
                <span>You have been added to our private ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={footer.newsletter_placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 pr-10 font-humanist text-xs text-white placeholder-white/40 focus:border-[#B86B4F] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Submit email for seasonal journal"
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#B86B4F] text-white hover:bg-[#A3593E] transition-colors"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Designer Colophon */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-humanist text-xs text-white/50">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-4">
            <span className="text-[#C4A47C]">Architectural High-Craft Website Architecture</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
