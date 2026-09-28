'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CafeContent } from '../types';
import { Menu, X, Coffee, ArrowRight } from 'lucide-react';

interface NavbarProps {
  content: CafeContent;
}

export function Navbar({ content }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding, navigation, visit_booking } = content;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Clean Navigation Bar */}
      <nav className="bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#231B16]/10 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo Wordmark */}
          <div className="flex items-center gap-3">
            <Link href="#top" className="group flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-sm bg-[#231B16] text-[#F7F4EE] flex items-center justify-center border border-[#B85D38]/40 shadow-sm group-hover:bg-[#B85D38] transition-colors">
                <Coffee className="w-5 h-5 text-[#D99B4B]" />
              </div>
              <div>
                <span className="font-artisanal text-xl sm:text-2xl font-bold tracking-tight text-[#231B16] block leading-none">
                  {branding.business_name}
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#B85D38] block mt-1">
                  {branding.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 font-humanist text-sm font-medium text-[#231B16]/80">
            {navigation.nav_links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#B85D38] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#B85D38] hover:after:w-full after:transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: One Clear Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#visit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider bg-[#B85D38] text-white hover:bg-[#9E4D2C] transition-all shadow-sm rounded-sm"
            >
              <span>{navigation.reserve_cta}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm border border-[#231B16]/20 text-[#231B16] hover:bg-[#EDE6DA] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F4EE] border-b border-[#231B16]/20 px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            <div className="border-b border-[#231B16]/10 pb-3">
              <span className="font-mono text-[11px] text-[#B85D38] uppercase tracking-widest font-semibold block mb-1">
                {branding.neighborhood}
              </span>
              <p className="font-artisanal text-sm text-[#231B16]/80 italic">
                {branding.tagline}
              </p>
            </div>

            <div className="flex flex-col gap-3 font-humanist text-base font-medium text-[#231B16]">
              {navigation.nav_links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 border-b border-[#231B16]/5 hover:text-[#B85D38]"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#B85D38]" />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="#visit"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 px-4 font-mono text-xs uppercase tracking-wider font-semibold bg-[#B85D38] text-white rounded-sm hover:bg-[#9E4D2C] transition-all"
              >
                {navigation.reserve_cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
