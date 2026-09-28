'use client';

import React, { useState, useEffect } from 'react';
import { GymContent } from '../types';
import { ArrowRight, X, Flame } from 'lucide-react';

interface StickyConversionDockProps {
  content: GymContent;
}

export const StickyConversionDock: React.FC<StickyConversionDockProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D4FF00]/40 bg-[#090A0C]/95 backdrop-blur-md px-6 py-3 transition-transform animate-slideUp">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            {content.sticky_conversion_dock.headline}
          </span>
          <span className="hidden md:inline-flex text-zinc-600">/</span>
          <span className="hidden md:inline-flex font-mono text-[11px] text-zinc-400">
            {content.sticky_conversion_dock.badge}
          </span>
        </div>

        {/* Right: CTA & Dismiss */}
        <div className="flex items-center gap-4">
          <a
            href={content.sticky_conversion_dock.cta_target}
            className="flex items-center gap-2 border border-[#D4FF00] bg-[#D4FF00] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-[#D4FF00] transition-colors"
          >
            <span>{content.sticky_conversion_dock.cta_text}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-500 hover:text-white p-1"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
