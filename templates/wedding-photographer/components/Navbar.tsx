'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { WeddingPhotographerContent } from '../types';

interface NavbarProps {
  content: WeddingPhotographerContent;
}

export function Navbar({ content }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle ambient audio synthesizer for atmospheric room tone
  const toggleAmbientSound = () => {
    try {
      if (!soundActive) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) {
          setSoundActive(true);
          return;
        }

        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Gentle warm drone (C2/G2 harmonic warmth with gentle tape hiss)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 65.4 Hz (C2) - warm acoustic foundation
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65.4, ctx.currentTime);

        // Very low whisper volume
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setSoundActive(true);
      } else {
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.8);
          setTimeout(() => {
            oscillatorRef.current?.stop();
            audioContextRef.current?.close();
            oscillatorRef.current = null;
            audioContextRef.current = null;
            gainNodeRef.current = null;
          }, 800);
        }
        setSoundActive(false);
      }
    } catch {
      // Fallback state toggle without breaking
      setSoundActive(!soundActive);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Floating Translucent Navigation Pill */}
        <div
          className={`w-full flex items-center justify-between px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border transition-all duration-500 ${
            isScrolled
              ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-[#1C1917]/12 shadow-[0_8px_30px_rgba(28,25,23,0.08)]'
              : 'bg-[#FAF7F2]/80 backdrop-blur-sm border-[#1C1917]/8 shadow-[0_4px_20px_rgba(28,25,23,0.04)]'
          }`}
        >
          {/* Brand Wordmark */}
          <Link
            href="#top"
            className="group flex flex-col items-start focus:outline-none"
            aria-label={content.branding.business_name}
          >
            <span className="font-bellefair text-xl sm:text-2xl tracking-[0.14em] text-[#1C1917] font-normal uppercase group-hover:text-[#B87D74] transition-colors">
              {content.navigation.brand_wordmark}
            </span>
            <span className="font-tenor text-[9px] sm:text-[10px] uppercase tracking-[0.24em] text-[#8C827A] -mt-0.5">
              {content.navigation.brand_subtitle}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {content.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-tenor text-xs uppercase tracking-[0.18em] text-[#1C1917]/80 hover:text-[#B87D74] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B87D74] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: One Clear CTA + Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Primary Action Book Consultation Pill */}
            <a
              href="#inquiry"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#1C1917] text-[#FAF7F2] font-tenor text-xs uppercase tracking-[0.16em] hover:bg-[#B87D74] transition-colors duration-300 shadow-sm"
            >
              <span>{content.navigation.inquire_cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1C1917] hover:text-[#B87D74] transition-colors focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-2 max-w-7xl mx-auto rounded-3xl bg-[#FAF7F2] border border-[#1C1917]/10 p-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]/8">
            <div className="flex items-center gap-2 text-xs font-tenor text-[#8C827A] tracking-widest uppercase">
              <Compass className="w-3.5 h-3.5 text-[#B87D74]" />
              <span>{content.branding.location_base}</span>
            </div>
            <button
              type="button"
              onClick={toggleAmbientSound}
              className="inline-flex items-center gap-1.5 text-xs font-tenor tracking-wider text-[#B87D74]"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundActive ? content.navigation.audio_label_on : content.navigation.audio_label_off}</span>
            </button>
          </div>

          <div className="py-4 space-y-3">
            {content.navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-bellefair text-2xl text-[#1C1917] hover:text-[#B87D74] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1C1917]/8 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-tenor text-[#1C1917] bg-[#ECE6DD]/60 px-3 py-2 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-[#B87D74]" />
              <span>{content.branding.availability_status.season_label}</span>
            </div>

            <a
              href="#inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full bg-[#B87D74] text-white font-tenor text-xs uppercase tracking-widest hover:bg-[#A36B62] transition-colors"
            >
              {content.navigation.inquire_cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
