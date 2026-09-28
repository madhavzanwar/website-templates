import React from 'react'
import { ContactInfo } from '../types'

export default function BookingSection({ contact }: { contact: ContactInfo }) {
  const waLink = `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`
  return (
    <section id="booking" className="py-32 bg-[#0D6E6E] text-center">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        <h2 className="font-playfair text-5xl md:text-7xl text-white mb-8">Ready for a Brighter Smile?</h2>
        <p className="font-dm-sans text-[#E8D5B7] text-lg mb-12">Call us or book directly via WhatsApp.</p>
        
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <a href={`tel:${contact.phone}`} className="bg-white text-[#0D6E6E] px-8 py-4 rounded-full font-dm-sans font-medium text-lg hover:bg-[#E8D5B7] transition-colors">
            {contact.phone}
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-[#E8D5B7] text-[#1A1A1A] px-8 py-4 rounded-full font-dm-sans font-medium text-lg hover:bg-white transition-colors">
            WhatsApp Us
          </a>
        </div>

        <div className="flex flex-col md:flex-row gap-12 justify-center items-center border-t border-white/20 pt-12 text-[#E8D5B7]/80 font-dm-sans text-sm uppercase tracking-widest">
          <div className="flex flex-col gap-2">
            <span className="text-white">Weekdays</span>
            <span>{contact.hours.weekdays}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white">Weekends</span>
            <span>{contact.hours.weekends}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
