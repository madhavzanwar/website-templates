import React from 'react';
import { FooterData } from '../types';
import { Building2, MapPin, Phone, Mail, Globe, MessageCircle } from 'lucide-react';

export default function Footer({ disclaimer, mahaReraText, mahaReraNumber, reraPortalUrl, quickLinks, puneMicroMarkets, copyright }: FooterData) {
  return (
    <footer className="bg-[#0F172A] text-white pt-24 pb-12 border-t border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16" style={{ fontFamily: 'var(--font-outfit)' }}>
          <div className="lg:col-span-2">
            <h3 className="text-[#C9A84C] text-2xl mb-6 uppercase tracking-widest font-bold" style={{ fontFamily: 'var(--font-libre)' }}>
              Shubh Properties
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
              {disclaimer}
            </p>
            <div className="bg-white/5 border border-white/10 p-4 rounded text-sm text-white/80 flex flex-col gap-2 max-w-md">
              <span className="font-semibold text-white">{mahaReraNumber}</span>
              <span>{mahaReraText}</span>
              <a href={reraPortalUrl} target="_blank" rel="noreferrer" className="text-[#C9A84C] hover:underline">Verify on MahaRERA Portal &rarr;</a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-lg mb-6 font-medium">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/70 hover:text-[#C9A84C] transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg mb-6 font-medium">Pune Micro-Markets</h4>
            <ul className="space-y-4">
              {puneMicroMarkets.map(market => (
                <li key={market} className="text-white/70">{market}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6" style={{ fontFamily: 'var(--font-outfit)' }}>
          <div className="text-white/50 text-sm">
            {copyright}
          </div>
          <div className="flex gap-6 text-white/50">
            <a href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><MapPin size={18} /> Location</a>
            <a href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><Phone size={18} /> Call</a>
            <a href="#contact" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={18} /> Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
