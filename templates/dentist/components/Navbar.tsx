'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { NavLink } from '../types'
import { Phone } from 'lucide-react'

export default function Navbar({ businessName, navLinks, phone }: { businessName: string, navLinks: NavLink[], phone: string }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#F8F9FA]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="#" className="font-playfair text-xl font-bold text-[#1A1A1A]">{businessName}</Link>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href} className="text-[#1A1A1A] text-sm tracking-wide font-dm-sans hover:text-[#0D6E6E] transition-colors">{link.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a href={`tel:${phone}`} className="hidden lg:flex items-center gap-2 text-sm font-dm-sans text-[#1A1A1A]">
            <Phone size={16} /> {phone}
          </a>
          <a href="#booking" className="bg-[#0D6E6E] text-[#E8D5B7] px-5 py-2.5 rounded-full text-sm font-dm-sans hover:bg-[#0a5252] transition-colors">Book Appointment</a>
        </div>
      </div>
    </nav>
  )
}
