'use client';
import React, { useState } from 'react';
import { ContactData } from '../types';

export default function ContactSection({ title, subtitle, officeAddress, phone, email, hours }: ContactData) {
  const [formData, setFormData] = useState({ name: '', phone: '', interest: '', date: '' });

  return (
    <section id="contact" className="py-24 bg-[#C9A84C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl text-[#0F172A] mb-6 leading-tight" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
            <p className="text-[#0F172A]/80 text-lg mb-12" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
            
            <div className="space-y-8" style={{ fontFamily: 'var(--font-outfit)' }}>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-[#0F172A]/60 mb-2 font-bold">Office Address</h4>
                <p className="text-[#0F172A] text-lg">{officeAddress.building}, {officeAddress.area}<br/>{officeAddress.city} - {officeAddress.pincode}</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-[#0F172A]/60 mb-2 font-bold">Contact</h4>
                <p className="text-[#0F172A] text-lg">{phone}<br/>{email}</p>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-widest text-[#0F172A]/60 mb-2 font-bold">Working Hours</h4>
                <p className="text-[#0F172A] text-lg">{hours}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] p-10 md:p-12 rounded-xl text-white shadow-2xl">
            <h3 className="text-3xl text-white mb-8" style={{ fontFamily: 'var(--font-libre)' }}>Request a Consultation</h3>
            <form className="space-y-6" style={{ fontFamily: 'var(--font-outfit)' }} onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm text-white/70 mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C]" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Phone Number (+91)</label>
                <input type="tel" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C]" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Area of Interest</label>
                <select className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] appearance-none" value={formData.interest} onChange={e => setFormData({...formData, interest: e.target.value})}>
                  <option value="" className="text-black">Select Option</option>
                  <option value="buy" className="text-black">Buying a Property</option>
                  <option value="sell" className="text-black">Selling a Property</option>
                  <option value="invest" className="text-black">Investment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Preferred Date</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] [color-scheme:dark]" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <button className="w-full bg-[#C9A84C] text-[#0F172A] py-4 rounded font-bold uppercase tracking-widest mt-4 hover:bg-white transition-colors">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
