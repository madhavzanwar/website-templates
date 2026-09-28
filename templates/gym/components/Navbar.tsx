'use client';

import React, { useState } from 'react';
import { GymContent } from '../types';
import { Activity, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  content: GymContent;
}

export const Navbar: React.FC<NavbarProps> = ({ content }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090A0C]/95 backdrop-blur-md">

      {/* Main Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Lockup */}
        <a href="#" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-white/20 bg-zinc-900 transition-colors group-hover:border-[#D4FF00]">
            <span className="font-mono text-xs font-bold text-[#D4FF00]">
              {content.branding.business_short_code}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-extrabold tracking-tight text-white group-hover:text-zinc-200">
              {content.branding.business_name}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400">
              {content.branding.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {content.navigation.nav_links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="font-mono text-xs tracking-wider uppercase text-zinc-400 transition-colors hover:text-[#D4FF00]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={content.navigation.cta_button_target}
            className="group relative inline-flex items-center gap-2 border border-[#D4FF00] bg-[#D4FF00] px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase text-black transition-all hover:bg-black hover:text-[#D4FF00]"
          >
            <span>{content.navigation.cta_button_text}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-white/10 text-white md:hidden hover:border-white/30"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#090A0C] px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4 font-mono text-sm tracking-wider uppercase">
            {content.navigation.nav_links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-white/5 py-2 text-zinc-300 hover:text-[#D4FF00]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href={content.navigation.cta_button_target}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-[#D4FF00] py-3 text-center font-bold uppercase text-black"
              >
                <span>{content.navigation.cta_button_text}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
