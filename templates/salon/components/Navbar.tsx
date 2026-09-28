'use client';

import React, { useState, useEffect } from 'react';
import { SalonContent } from '../types';
import { Menu, X, Phone, Clock, ArrowRight } from 'lucide-react';

interface NavbarProps {
  content: SalonContent;
}

export const Navbar: React.FC<NavbarProps> = ({ content }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#1C1815]/10 bg-[#F7F4EE]/95 backdrop-blur-md shadow-xs py-3.5'
            : 'border-b border-[#1C1815]/8 bg-[#F7F4EE] py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* Brand Identity / Atelier Monogram */}
          <a href="#" className="group flex flex-col">
            <span className="font-editorial text-2xl sm:text-3xl font-normal tracking-[0.18em] uppercase text-[#1C1815] transition-colors group-hover:text-[#B86B4F]">
              {content.branding.business_name}
            </span>
            <span className="font-humanist text-[10px] tracking-[0.25em] uppercase text-[#7A7067]">
              {content.branding.subtitle}
            </span>
          </a>

          {/* Desktop Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {content.navigation.nav_links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="font-humanist text-xs uppercase tracking-[0.18em] text-[#6E665E] hover:text-[#1C1815] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B86B4F] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Trigger */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={content.navigation.cta_button_target}
              className="group inline-flex items-center gap-2 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-6 py-2.5 font-humanist text-xs uppercase tracking-[0.16em] text-white shadow-xs transition-all duration-300 hover:bg-[#A3593E] hover:border-[#A3593E]"
            >
              <span>{content.navigation.cta_button_text}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-[#1C1815] hover:text-[#B86B4F] lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[96px] z-50 bg-[#F7F4EE] px-6 py-8 border-t border-[#1C1815]/10 lg:hidden overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-6">
            <div className="border-b border-[#1C1815]/10 pb-4">
              <span className="font-cinzel text-xs uppercase tracking-widest text-[#B86B4F]">
                {content.branding.location_short}
              </span>
            </div>

            <nav className="flex flex-col gap-4">
              {content.navigation.nav_links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial text-2xl text-[#1C1815] hover:text-[#B86B4F] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-[#1C1815]/10 space-y-4">
              <a
                href={content.navigation.cta_button_target}
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-6 py-3.5 font-humanist text-xs uppercase tracking-[0.16em] text-white shadow-xs"
              >
                <span>{content.navigation.cta_button_text}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={`tel:${content.navigation.phone_tel}`}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#1C1815]/20 bg-[#EDE8E0] px-6 py-3 font-humanist text-xs uppercase tracking-[0.16em] text-[#1C1815]"
              >
                <Phone className="h-3.5 w-3.5 text-[#B86B4F]" />
                <span>{content.navigation.phone_display}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
