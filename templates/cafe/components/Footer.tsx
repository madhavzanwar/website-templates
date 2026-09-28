'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CafeContent } from '../types';
import { Coffee, Mail, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  content: CafeContent;
}

export function Footer({ content }: FooterProps) {
  const { branding, footer } = content;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1410] text-[#EDE6DA] border-t border-[#3D3028] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card: "The Roast Ledger" */}
        <div className="bg-[#231B16] border border-[#4A3B33] rounded-sm p-8 sm:p-10 mb-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs font-bold text-[#D99B4B] uppercase tracking-widest block mb-1">
                MEMBERSHIP REGISTRY
              </span>
              <h3 className="font-artisanal text-2xl sm:text-3xl font-bold text-white leading-tight">
                {footer.newsletter.title}
              </h3>
              <p className="mt-2 font-humanist text-sm text-[#EDE6DA]/75 max-w-xl">
                {footer.newsletter.subtitle}
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 bg-[#4A5844]/20 border border-[#4A5844] rounded-sm text-[#FAF6EE] flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#D99B4B] shrink-0" />
                  <span className="font-humanist text-xs">
                    {footer.newsletter.success_text}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder={footer.newsletter.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-sm bg-[#1A1410] border border-[#4A3B33] text-sm font-humanist text-white placeholder-[#EDE6DA]/40 focus:outline-hidden focus:border-[#B85D38]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-sm bg-[#B85D38] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#9E4D2C] transition-colors shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{footer.newsletter.button_text}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#3D3028]">
          
          {/* Brand Bio & Stamp */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#B85D38] text-white flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#D99B4B]" />
              </div>
              <span className="font-artisanal text-2xl font-bold tracking-tight text-white">
                {branding.business_name}
              </span>
            </div>

            <p className="font-humanist text-xs sm:text-sm text-[#EDE6DA]/70 leading-relaxed">
              {footer.brand_bio}
            </p>

            <div className="pt-2 font-mono text-xs text-[#D99B4B]">
              <span>EST. {branding.established_year}</span> • <span>{branding.neighborhood}</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footer.navigation_columns.map((col, idx) => (
              <div key={idx}>
                <h4 className="font-mono text-xs uppercase font-bold tracking-wider text-[#D99B4B] mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 font-humanist text-xs sm:text-sm text-[#EDE6DA]/70">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Roast Registry Stamp & Legal */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="font-mono text-[10px] tracking-wider text-[#EDE6DA]/50 uppercase flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A5844]" />
            <span>{footer.roast_registry_stamp}</span>
          </div>

          <div className="font-mono text-[10px] text-[#EDE6DA]/40 uppercase tracking-widest">
            {footer.copyright}
          </div>
        </div>

      </div>
    </footer>
  );
}
