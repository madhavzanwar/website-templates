'use client';

import React from 'react';
import { GymContent } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  content: GymContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="border-t border-white/10 bg-[#060708] py-16 pb-24 md:pb-16 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-[#D4FF00] bg-black font-mono text-xs font-bold text-[#D4FF00]">
                {content.branding.business_short_code}
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                {content.branding.business_name}
              </span>
            </div>

            <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-zinc-500">
              {content.footer.subtext}
            </p>

            <div className="mt-6 font-mono text-xs text-zinc-400">
              <div>{content.contact.address}</div>
              <div className="mt-1 text-zinc-500">{content.contact.phone} · {content.contact.email}</div>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="md:col-span-3">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">
              COMPOUND DIRECTORY
            </div>
            <ul className="space-y-2 font-mono text-xs">
              {content.navigation.nav_links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-zinc-500 hover:text-[#D4FF00] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels (4 cols) */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">
              DIRECT DESK DISPATCH
            </div>
            <div className="space-y-3 font-mono text-xs">
              <a
                href={`https://wa.me/${content.contact.whatsapp_number.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-white/10 p-3 text-zinc-300 hover:border-[#D4FF00] hover:text-white transition-colors"
              >
                <span>WHATSAPP CONCIERGE</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#D4FF00]" />
              </a>

              <a
                href={content.contact.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-white/10 p-3 text-zinc-300 hover:border-[#D4FF00] hover:text-white transition-colors"
              >
                <span>INSTAGRAM ARCHIVE</span>
                <span className="text-[#D4FF00]">{content.contact.instagram_handle}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
          <div>{content.footer.copyright}</div>
          <div className="flex items-center gap-6">
            {content.footer.legal_links.map((item, idx) => (
              <a key={idx} href={item.href} className="hover:text-zinc-400 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
