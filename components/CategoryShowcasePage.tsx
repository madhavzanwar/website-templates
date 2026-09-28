'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Phone, Mail, MapPin, 
  MessageSquare, Clock, ArrowRight, Star, ChevronRight
} from 'lucide-react';

interface CategoryShowcasePageProps {
  content: any;
}

export default function CategoryShowcasePage({ content }: CategoryShowcasePageProps) {
  const { 
    branding, about, services, gallery, pricing_tiers, 
    testimonials, contact, footer, category_label 
  } = content;

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = (contact?.whatsapp_number || contact?.phone || '').replace(/\D/g, '');
  const waNumber = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! I would like to enquire about services at ${branding?.business_name}. My name is ${formName}, Phone: ${formPhone}. Note: ${formMsg || 'Interested in consultation'}`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    setSubmitted(true);
    window.open(url, '_blank');
  };

  const primaryColor = branding?.primary_color || '#2563EB';

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --color-brand-primary: ${primaryColor};
        }
      `}</style>

      {/* Top Banner */}
      <div 
        className="text-white px-4 py-2 text-center text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
        style={{ backgroundColor: primaryColor }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>{branding?.badge || `PREMIER ${category_label || 'LOCAL'} SERVICE IN PUNE`}</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-xl text-white flex items-center justify-center font-bold text-lg shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              {(branding?.business_name || 'B').charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                {branding?.business_name}
              </div>
              <div className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
                {category_label || branding?.tagline}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition">About</a>
            <a href="#services" className="hover:text-slate-900 transition">Services</a>
            <a href="#gallery" className="hover:text-slate-900 transition">Gallery</a>
            {pricing_tiers && <a href="#pricing" className="hover:text-slate-900 transition">Packages</a>}
            <a href="#contact" className="hover:text-slate-900 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(contact?.whatsapp_message || 'Hello!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp Us
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-xs sm:text-sm font-bold shadow-md transition"
              style={{ backgroundColor: primaryColor }}
            >
              Get Quote
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                {branding?.tagline || "Verified Professional Services in Pune"}
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                {branding?.hero_headline || branding?.business_name}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {branding?.hero_subheadline || about?.lead_statement || "Exceptional quality, verified client satisfaction, and dedicated local customer support in Pune."}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-xl text-white font-bold text-sm sm:text-base shadow-lg transition flex items-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#services"
                  className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 transition"
                >
                  View Services & Rates
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={branding?.hero_image}
                  alt={branding?.business_name}
                  className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">{category_label}</div>
                    <div className="text-lg font-bold">{branding?.business_name}</div>
                    <div className="text-xs text-slate-300">{contact?.address}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      {services && services.length > 0 && (
        <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span 
                className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: primaryColor, backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
              >
                SERVICES & SPECIALTIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Our Signature Offerings & Packages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Tailored solutions designed with premium standards and clear, transparent pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((item: any, sidx: number) => (
                <div 
                  key={sidx}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:shadow-xl transition duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      {item.tag && (
                        <span 
                          className="text-xs font-bold px-2.5 py-1 rounded-md"
                          style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                        >
                          {item.tag}
                        </span>
                      )}
                      <span className="text-sm font-extrabold text-slate-900 ml-auto">
                        {item.price}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href="#contact"
                      className="text-xs font-bold inline-flex items-center gap-1 hover:underline"
                      style={{ color: primaryColor }}
                    >
                      Enquire Details <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {about && (
        <section id="about" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span 
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-md"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  ABOUT OUR BUSINESS
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {about.title}
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {about.paragraphs && about.paragraphs.map((p: string, pidx: number) => (
                    <p key={pidx}>{p}</p>
                  ))}
                </div>

                {about.highlights && (
                  <div className="space-y-3 pt-2">
                    {about.highlights.map((h: string, hidx: number) => (
                      <div key={hidx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                        <span className="text-sm font-semibold text-slate-800">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Mini Grid */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-2 gap-4">
                  {gallery && gallery.slice(0, 4).map((g: any, gidx: number) => (
                    <div key={gidx} className="rounded-xl overflow-hidden shadow-sm group">
                      <img
                        src={g.url}
                        alt={g.title || 'Gallery'}
                        className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Pricing Tiers Section */}
      {pricing_tiers && pricing_tiers.length > 0 && (
        <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span 
                className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: primaryColor, backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
              >
                PACKAGES & PRICING
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Transparent Rates, Zero Hidden Costs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricing_tiers.map((tier: any, tidx: number) => (
                <div
                  key={tidx}
                  className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col justify-between hover:shadow-xl transition"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">{tier.price}</span>
                      <span className="text-xs font-semibold text-slate-500">{tier.billing}</span>
                    </div>

                    {tier.features && (
                      <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                        {tier.features.map((f: string, fidx: number) => (
                          <div key={fidx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href="#contact"
                    className="mt-8 w-full py-3 rounded-xl text-center font-bold text-xs sm:text-sm text-white shadow-sm transition block"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Select Package
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                VERIFIED PATRON REVIEWS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                What Pune Clients Say About Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((t: any, tidx: number) => (
                <div key={tidx} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="pt-2 border-t border-slate-200 font-bold text-slate-900">
                    {t.author || t.client_name || "Verified Client"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking / Contact Form */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                {contact?.inquiry_form?.title || `Connect With ${branding?.business_name}`}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {contact?.inquiry_form?.description || "Reach out directly for consultation, availability, and customized package quotes in Pune."}
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{contact?.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>{contact?.phone}</span>
                </div>
                {contact?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>{contact?.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-400 shrink-0" />
                  <span>Mon – Sat: 10:00 AM – 08:00 PM</span>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-white text-slate-900 p-8 shadow-2xl">
                <h3 className="text-xl font-extrabold mb-2">Request Information / Quote</h3>
                <p className="text-xs text-slate-500 mb-6">Send an inquiry directly to our desk on WhatsApp.</p>

                {submitted ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                    <div className="font-bold text-emerald-900 text-lg">Inquiry Sent via WhatsApp!</div>
                    <div className="text-xs text-emerald-700">We will respond with full details shortly.</div>
                  </div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Vikram Joshi"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. 98220 12345"
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Requirements / Notes
                      </label>
                      <textarea
                        rows={3}
                        value={formMsg}
                        onChange={(e) => setFormMsg(e.target.value)}
                        placeholder="Tell us what you are looking for..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 mt-4"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Send Inquiry on WhatsApp →
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>{footer?.copyright || `© 2026 ${branding?.business_name}. All Rights Reserved.`}</div>
          <div className="text-slate-500">
            {branding?.business_name} · Pune, Maharashtra · Verified Business
          </div>
        </div>
      </footer>
    </main>
  );
}
