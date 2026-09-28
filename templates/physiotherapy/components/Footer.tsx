import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, MessageCircle } from 'lucide-react';

export default function Footer({ content }: { content: any }) {
  return (
    <footer className="bg-[#1B4332] pt-20 pb-10 px-6 md:px-16 text-[#F5F0E8] border-t border-[#C8A94A]/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        
        <div className="w-full md:w-2/5">
          <Link href="/" className="font-cormorant italic text-4xl mb-6 block text-[#C8A94A]">
            {content.businessName}
          </Link>
          <p className="font-nunito text-[#8A9A86] leading-relaxed pr-8">
            {content.footer.aboutText}
          </p>
        </div>
        
        <div className="w-full md:w-1/5 font-nunito">
          <h4 className="text-xl font-bold mb-6 text-[#C8A94A]">Quick Links</h4>
          <ul className="space-y-4">
            {content.navLinks.map((link: any, idx: number) => (
              <li key={idx}>
                <Link href={link.href} className="hover:text-[#C8A94A] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="w-full md:w-2/5 font-nunito">
          <h4 className="text-xl font-bold mb-6 text-[#C8A94A]">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-[#C8A94A]" /> {content.contact.phone}
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="text-[#C8A94A]" /> {content.contact.whatsappDisplay} (WhatsApp)
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-[#C8A94A]" /> {content.contact.email}
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#C8A94A] mt-1 flex-shrink-0" /> 
              <span>{content.location.fullAddress}</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={18} className="text-[#C8A94A]" /> {content.location.nearBy}
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-[#F5F0E8]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-nunito text-xs text-[#8A9A86]">
        <p>{content.footer.copyrightText}</p>
        <p className="max-w-xl text-center md:text-right">{content.footer.medicalDisclaimer}</p>
      </div>
    </footer>
  );
}
