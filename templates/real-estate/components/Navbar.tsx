import React from 'react';
import { NavLink } from '../types';

interface NavbarProps {
  businessName: string;
  mahaReraNumber: string;
  navLinks: NavLink[];
}

export default function Navbar({ businessName, mahaReraNumber, navLinks }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0F172A] text-white py-4 px-6 border-b border-[#C9A84C]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[#C9A84C] font-bold text-xl tracking-wider uppercase" style={{ fontFamily: 'var(--font-libre)' }}>
            {businessName}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-white/70 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#C9A84C] text-xs hidden lg:block" style={{ fontFamily: 'var(--font-outfit)' }}>
            {mahaReraNumber}
          </span>
          <a href="#contact" className="border border-[#C9A84C] text-[#C9A84C] px-4 py-2 hover:bg-[#C9A84C] hover:text-[#0F172A] transition-colors text-sm uppercase tracking-wide" style={{ fontFamily: 'var(--font-outfit)' }}>
            Schedule Visit
          </a>
        </div>
      </div>
    </nav>
  );
}
