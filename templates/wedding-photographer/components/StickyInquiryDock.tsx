'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ArrowUpRight, MessageCircle, X } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface StickyInquiryDockProps {
  content: WeddingPhotographerContent;
}

export function StickyInquiryDock({ content }: StickyInquiryDockProps) {
  const { sticky_dock, branding, inquiry } = content;
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling down 400px
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  const rawNumber = inquiry.concierge_contacts.whatsapp_number.replace(/\D/g, '');
  const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(
    'Hello Aarav & Maya, I would like to check availability for our wedding date.'
  )}`;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 pointer-events-none animate-slideUp">
      <div className="max-w-3xl mx-auto bg-[#FAF7F2]/95 backdrop-blur-md border border-[#1C1917]/15 rounded-full p-2 sm:p-2.5 pl-4 sm:pl-6 shadow-[0_10px_35px_rgba(28,25,23,0.15)] pointer-events-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B87D74] shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-tenor text-[#1C1917] truncate font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#9D8469] hidden sm:block shrink-0" />
              <span className="truncate">{sticky_dock.season_text}</span>
            </div>
            <div className="text-[10px] font-tenor text-[#8C827A] truncate hidden md:block">
              {branding.availability_status.secondary_label}
            </div>
          </div>
        </div>

        {/* Right Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Direct WhatsApp Pill */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#1C1917]/15 text-[#1C1917] hover:border-[#25D366] hover:text-[#25D366] font-tenor text-[11px] uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{sticky_dock.whatsapp_button_label}</span>
          </a>

          {/* Primary Inquire Button */}
          <a
            href="#inquiry"
            className="inline-flex items-center gap-1 px-4 sm:px-5 py-2 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-[0.16em] hover:bg-[#B87D74] transition-colors shadow-sm"
          >
            <span>{sticky_dock.inquire_button_label}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-full hover:bg-[#1C1917]/10 text-[#8C827A] hover:text-[#1C1917] transition-colors"
            aria-label="Dismiss availability dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
