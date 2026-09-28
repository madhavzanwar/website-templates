'use client';

import React, { useState, useEffect } from 'react';
import { RestaurantContent } from '../types';
import { Menu, X, ChevronRight, Calendar } from 'lucide-react';

interface NavbarProps {
  content: RestaurantContent;
}

export function Navbar({ content }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Main Clean Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#14080E]/95 backdrop-blur-md shadow-2xl shadow-black/80 border-b border-[#D4A359]/25 py-3'
            : 'bg-[#14080E]/85 backdrop-blur-sm border-b border-[#D4A359]/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Brand Identity / Crest */}
            <div className="flex items-center">
              <a
                href="#top"
                className="group flex flex-col text-left focus:outline-none"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-italiana text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] text-[#F5EFEB] group-hover:text-[#D4A359] transition-colors duration-300">
                    {content.branding.business_name}
                  </span>
                  <span className="text-[10px] font-dm-mono tracking-[0.2em] text-[#D4A359] uppercase hidden sm:inline">
                    • {content.branding.city_district}
                  </span>
                </div>
                <span className="text-[9px] font-dm-mono tracking-[0.25em] text-[#F5EFEB]/50 uppercase mt-0.5">
                  Est. {content.branding.established_year} • Wood-Fired Indian Dining
                </span>
              </a>
            </div>

            {/* Center Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-manrope font-medium tracking-widest text-[#F5EFEB]/80 uppercase">
              {content.navigation.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#D4A359] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4A359] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Action / Reservation Button */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#reservation"
                className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-dm-mono uppercase tracking-wider text-[#14080E] bg-[#D4A359] hover:bg-[#E2B873] active:bg-[#B8863D] transition-all duration-200 rounded-sm font-semibold shadow-md shadow-[#D4A359]/20 hover:shadow-lg hover:shadow-[#D4A359]/30"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{content.navigation.reserve_cta}</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -mr-2 text-[#F5EFEB] hover:text-[#D4A359] transition-colors focus:outline-none"
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-[#14080E]/98 backdrop-blur-xl border-b border-[#D4A359]/25 shadow-2xl transition-all duration-300 animate-fadeIn">
            <div className="max-w-md mx-auto px-6 py-8 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#D4A359]/20">
                <span className="text-xs font-dm-mono uppercase tracking-widest text-[#D4A359]">
                  {content.branding.business_name}
                </span>
                <span className="text-[11px] font-dm-mono text-[#F5EFEB]/60">
                  {content.branding.city_district}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {content.navigation.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-marcellus tracking-wider text-[#F5EFEB] hover:text-[#D4A359] transition-colors py-2 border-b border-white/5"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#D4A359]/60" />
                  </a>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="#reservation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-dm-mono uppercase tracking-widest text-[#14080E] bg-[#D4A359] hover:bg-[#E2B873] font-semibold rounded-sm transition-colors text-center"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{content.navigation.reserve_cta}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
