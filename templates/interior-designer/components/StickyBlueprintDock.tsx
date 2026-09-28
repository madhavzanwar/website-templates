'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, MessageCircle, X, Compass } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface StickyBlueprintDockProps {
  content: InteriorDesignerContent;
}

export function StickyBlueprintDock({ content }: StickyBlueprintDockProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dock after scrolling past the hero (e.g. 500px)
      if (window.scrollY > 400 && !dismissed) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <aside aria-label="Commissions Status Dock" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-3xl animate-fadeIn">
      <div className="border border-[#151618]/20 bg-[#151618]/90 text-[#F3F0EA] backdrop-blur-md px-5 py-3 sm:px-6 sm:py-3.5 shadow-2xl flex items-center justify-between gap-4">
        {/* Left: Real-time Status Badge */}
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#0F38D9]" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-space-grotesk text-xs uppercase tracking-wider font-semibold text-white">
              {content.branding.commissions_status}
            </span>
            <span className="hidden md:inline text-xs text-[#F3F0EA]/60 font-inter-tight">
              • Direct Principal Oversight
            </span>
          </div>
        </div>

        {/* Right: Quick Triggers */}
        <div className="flex items-center gap-2.5">
          <a
            href={`https://wa.me/${content.contact.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[#F3F0EA] text-xs font-space-grotesk uppercase tracking-wider transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#0F38D9]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#commission-brief"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0F38D9] hover:bg-white hover:text-[#151618] text-[#F3F0EA] text-xs font-space-grotesk uppercase tracking-wider transition-colors font-medium shadow-md"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-[#F3F0EA]/50 hover:text-white transition-colors"
            aria-label="Dismiss status dock"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
