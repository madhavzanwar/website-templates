import React from 'react'
import { Doctor } from '../types'

export default function DoctorSection({ doctors }: { doctors: Doctor[] }) {
  return (
    <section id="team" className="py-32 bg-[#0D6E6E]">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="font-playfair text-[#E8D5B7] text-4xl mb-4">Our Specialists</h2>
        <p className="font-dm-sans text-[#E8D5B7]/70 text-lg">Expert care by experienced MDS professionals.</p>
      </div>
      <div className="w-full">
        {doctors.map((doc) => (
          <div key={doc.id} className="border-t border-white/10 last:border-b hover:bg-white/5 transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <h3 className="font-playfair italic text-5xl md:text-7xl text-white">{doc.name}</h3>
              <div className="flex flex-col text-right">
                <span className="font-dm-sans text-[#E8D5B7] text-xl mb-1">{doc.role}</span>
                <span className="font-dm-sans text-white/60 text-sm tracking-wider uppercase">{doc.qualifications}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
