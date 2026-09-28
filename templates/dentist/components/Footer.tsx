import React from 'react'
import { DentistContent } from '../types'
import { MapPin, Phone, Mail, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Footer({ content }: { content: DentistContent }) {
  return (
    <footer className="bg-[#1A1A1A] py-16 text-[#F8F9FA]/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-sm flex flex-col gap-6">
          <h4 className="font-playfair text-2xl text-white">{content.businessName}</h4>
          <p className="font-dm-sans text-sm leading-relaxed">{content.tagline}</p>
          <div className="flex flex-col gap-3 mt-4">
            <a href={content.contact.mapLink} target="_blank" rel="noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <span className="font-dm-sans text-sm">{content.contact.address}</span>
            </a>
            <a href={`mailto:${content.contact.email}`} className="flex items-center gap-3 hover:text-white transition-colors">
              <Mail size={18} />
              <span className="font-dm-sans text-sm">{content.contact.email}</span>
            </a>
          </div>
        </div>
        
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <h5 className="font-dm-sans text-white uppercase tracking-widest text-xs">Quick Links</h5>
            {content.navLinks.map((l) => (
              <Link key={l.label} href={l.href} className="font-dm-sans text-sm hover:text-white transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-dm-sans">
        <p>&copy; {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Globe size={14} /> Built for Pune
        </div>
      </div>
    </footer>
  )
}
