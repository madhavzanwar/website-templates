'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CafeContent } from '../types';
import { Flame, ArrowRight, X, Sparkles, Sliders } from 'lucide-react';

interface StickyOrderBarProps {
  content: CafeContent;
}

export function StickyOrderBar({ content }: StickyOrderBarProps) {
  const { sticky_order_bar } = content;
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down at least 450px
      if (window.scrollY > 450 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 450) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 max-w-5xl mx-auto animate-slideUp">
      <div className="bg-[#231B16] text-[#F7F4EE] border-2 border-[#D99B4B]/40 rounded-sm p-3.5 sm:p-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Seasonal Origin Highlight */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden sm:flex w-9 h-9 rounded-sm bg-[#B85D38] text-white shrink-0 items-center justify-center">
            <Flame className="w-5 h-5 text-[#D99B4B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#D99B4B]/20 text-[#D99B4B] font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs border border-[#D99B4B]/40">
                {sticky_order_bar.origin_badge}
              </span>
            </div>
            <p className="mt-1 font-humanist text-xs sm:text-sm text-[#EDE6DA] font-medium line-clamp-1">
              {sticky_order_bar.lot_announcement}
            </p>
          </div>
        </div>

        {/* Right: Quick Action Triggers */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Link
            href={sticky_order_bar.secondary_cta_href}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#4A3B33] text-[#EDE6DA] font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#2F241F] transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-[#D99B4B]" />
            <span>{sticky_order_bar.secondary_cta_text}</span>
          </Link>

          <Link
            href={sticky_order_bar.cta_href}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#B85D38] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#9E4D2C] transition-colors shadow-sm"
          >
            <span>{sticky_order_bar.cta_text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-[#EDE6DA]/60 hover:text-white transition-colors cursor-pointer rounded-xs"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
