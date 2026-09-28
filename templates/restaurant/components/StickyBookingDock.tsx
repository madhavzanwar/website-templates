'use client';

import React, { useState, useEffect } from 'react';
import { RestaurantContent } from '../types';
import { Calendar, Phone, Sparkles, X } from 'lucide-react';

interface StickyBookingDockProps {
  content: RestaurantContent;
}

export function StickyBookingDock({ content }: StickyBookingDockProps) {
  const { sticky_booking_dock } = content;
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 400px
      const shouldShow = window.scrollY > 400;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <aside aria-label="Quick Booking Dock" className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-40 transition-all duration-300 animate-slideUp">
      <div className="bg-[#221619]/95 backdrop-blur-md border border-[#D4A359]/40 p-4 rounded-sm shadow-2xl shadow-black/90 flex items-center justify-between gap-4">
        
        {/* Left Side: Live Table Alert */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-dm-mono uppercase tracking-widest text-[#D4A359] truncate">
            <span>{sticky_booking_dock.service_active}</span>
          </div>
          <span className="text-xs font-marcellus text-[#F5EFEB] truncate">
            {sticky_booking_dock.table_alert}
          </span>
        </div>

        {/* Right Side: CTA Button & Phone link */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={`tel:${sticky_booking_dock.concierge_phone.replace(/\s+/g, '')}`}
            className="p-2.5 rounded-sm bg-[#14080E] text-[#D4A359] hover:bg-[#4A1525] border border-[#D4A359]/30 transition-colors"
            title={`Call Concierge: ${sticky_booking_dock.concierge_phone}`}
          >
            <Phone className="w-3.5 h-3.5" />
          </a>

          <a
            href={`#${sticky_booking_dock.target_section_id}`}
            className="px-4 py-2.5 bg-[#D4A359] hover:bg-[#E2B873] active:bg-[#B8863D] text-[#14080E] text-xs font-dm-mono uppercase tracking-wider font-bold rounded-sm flex items-center gap-1.5 transition-colors shadow-md shadow-[#D4A359]/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{sticky_booking_dock.cta_label}</span>
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-[#F5EFEB]/40 hover:text-[#F5EFEB] transition-colors focus:outline-none"
            aria-label="Dismiss quick booking dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
}
