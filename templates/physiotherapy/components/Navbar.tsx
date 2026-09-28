import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function Navbar({ content }: { content: any }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1B4332] py-4 px-6 md:px-12 flex justify-between items-center border-b border-[#C8A94A]/20">
      <Link href="/" className="font-cormorant italic text-3xl text-[#F5F0E8]">
        {content.businessName}
      </Link>
      <div className="hidden md:flex items-center gap-8 font-nunito text-sm tracking-wide text-[#F5F0E8]">
        {content.navLinks.map((link: any, idx: number) => (
          <Link key={idx} href={link.href} className="hover:text-[#C8A94A] transition-colors">
            {link.label}
          </Link>
        ))}
        <Link 
          href="#book" 
          className="bg-[#C8A94A] text-[#0F241C] px-6 py-2 rounded font-semibold flex items-center gap-2 hover:bg-[#F5F0E8] transition-colors"
        >
          <Phone size={16} /> Book Session
        </Link>
      </div>
    </nav>
  );
}
