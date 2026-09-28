'use client';

import React, { useState, useEffect } from 'react';
import { SalonContent } from '../types';
import { MessageSquare, Calendar, ArrowRight } from 'lucide-react';

interface StickyConciergeBarProps {
  content: SalonContent;
}

export const StickyConciergeBar: React.FC<StickyConciergeBarProps> = ({ content }) => {
  const { sticky_concierge, booking_concierge } = content;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky bar after scrolling past 400px
      setVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = `https://wa.me/${booking_concierge.whatsapp_number}?text=${encodeURIComponent(
    booking_concierge.whatsapp_concierge_message
  )}`;

  return (
    <aside
      aria-label="Floating Appointment Concierge"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-4xl transition-all duration-300 animate-slideUp"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-full border border-[#1C1815]/15 bg-[#F7F4EE]/95 px-5 py-3 shadow-[0_12px_40px_rgba(28,24,21,0.12)] backdrop-blur-md">
        
        {/* Left: Branding & Status Badge */}
        <div className="flex items-center gap-3">
          <div>
            <div className="font-editorial text-base sm:text-lg font-medium text-[#1C1815] leading-none">
              {sticky_concierge.headline}
            </div>
            <div className="font-humanist text-[10px] uppercase tracking-wider text-[#7A7067] mt-0.5">
              {sticky_concierge.badge}
            </div>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#1C1815]/15 bg-[#EDE8E0] px-4 py-2 font-humanist text-[11px] uppercase tracking-wider text-[#1C1815] hover:bg-[#1C1815] hover:text-white transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#B86B4F]" />
            <span>{sticky_concierge.whatsapp_text}</span>
          </a>

          <a
            href={sticky_concierge.cta_target}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-5 py-2 font-humanist text-[11px] uppercase tracking-[0.16em] font-semibold text-white shadow-xs hover:bg-[#A3593E] hover:border-[#A3593E] transition-all"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{sticky_concierge.cta_text}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </aside>
  );
};
