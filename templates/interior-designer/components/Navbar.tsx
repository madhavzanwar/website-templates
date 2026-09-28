'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface NavbarProps {
  content: InteriorDesignerContent;
}

export function Navbar({ content }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F3F0EA]/90 backdrop-blur-md border-b border-[#151618]/10 shadow-[0_4px_24px_rgba(21,22,24,0.04)]'
          : 'bg-[#F3F0EA]/70 backdrop-blur-sm border-b border-[#151618]/08'
      }`}
    >
      <div className="mx-auto max-w-[1720px] px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Studio Wordmark & Archival Stamp */}
          <div className="flex items-center gap-6">
            <Link
              href="#top"
              className="group flex flex-col text-left focus:outline-none"
            >
              <span className="font-space-grotesk text-sm sm:text-base font-semibold tracking-[-0.01em] text-[#151618] transition-colors group-hover:text-[#0F38D9]">
                {content.branding.business_name}
              </span>
              <span className="font-inter-tight text-[10px] uppercase tracking-[0.18em] text-[#151618]/60 mt-0.5">
                {content.contact.headquarters_coords}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {content.navigation_links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter-tight text-xs uppercase tracking-[0.14em] text-[#151618]/75 transition-colors hover:text-[#0F38D9] relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#0F38D9] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#commission-brief"
              className="group inline-flex items-center gap-2 rounded-none bg-[#0F38D9] px-5 py-2.5 font-space-grotesk text-xs font-medium uppercase tracking-[0.12em] text-[#F3F0EA] transition-all duration-300 hover:bg-[#151618] shadow-[0_2px_12px_rgba(15,56,217,0.25)]"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-3">
            <a
              href="#commission-brief"
              className="inline-flex items-center rounded-none bg-[#0F38D9] px-3.5 py-2 font-space-grotesk text-[11px] font-medium uppercase tracking-[0.08em] text-[#F3F0EA]"
            >
              Consult
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#151618] hover:text-[#0F38D9] transition-colors focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-[#151618]/15 bg-[#F3F0EA] px-6 py-8 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {content.navigation_links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-space-grotesk text-base uppercase tracking-wider text-[#151618] hover:text-[#0F38D9] transition-colors py-1 border-b border-[#151618]/08"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#151618]/10 flex flex-col gap-3 font-inter-tight text-xs text-[#151618]/70">
            <div className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-[#0F38D9]" />
              <span>{content.contact.headquarters_address}</span>
            </div>
            <a
              href={`tel:${content.contact.phone}`}
              className="text-[#151618] font-medium hover:text-[#0F38D9]"
            >
              Studio Phone: {content.contact.phone_display}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
