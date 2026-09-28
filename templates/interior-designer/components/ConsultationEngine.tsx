'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Compass, ShieldCheck } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface ConsultationEngineProps {
  content: InteriorDesignerContent;
}

export function ConsultationEngine({ content }: ConsultationEngineProps) {
  const { consultation_intake, contact } = content;

  const [selectedTypology, setSelectedTypology] = useState<string>(consultation_intake.typologies[0]);
  const [selectedFootprint, setSelectedFootprint] = useState<string>(consultation_intake.spatial_footprints[1]);
  const [selectedInvestment, setSelectedInvestment] = useState<string>(consultation_intake.investment_tiers[1]);
  const [selectedStage, setSelectedStage] = useState<string>(consultation_intake.readiness_stages[2]);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vastu & Arche Studio, I am interested in scheduling an architectural consultation for a ${selectedTypology} (${selectedFootprint}) in ${siteLocation || 'Pune/Mumbai'}. Budget range: ${selectedInvestment}.`
  );

  return (
    <section id="commission-brief" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#E2DDD3]/40 border-t border-[#151618]/15">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#151618]/15 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-space-grotesk text-xs font-semibold tracking-[0.22em] uppercase text-[#0F38D9] block mb-2">
                {consultation_intake.subtitle}
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618]">
                {consultation_intake.title}
              </h2>
            </div>

            <p className="font-inter-tight text-sm sm:text-base text-[#151618]/80 max-w-xl leading-relaxed">
              {consultation_intake.description}
            </p>
          </div>
        </div>

        {/* 2-Column Commission Engine: Left Form / Right Concierge & Coordinates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Brief Intake Terminal */}
          <div className="lg:col-span-8 bg-[#F3F0EA] border border-[#151618]/15 p-8 sm:p-12 shadow-sm">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-6 animate-fadeIn">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F38D9] text-[#F3F0EA]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-space-grotesk text-2xl sm:text-3xl font-medium text-[#151618]">
                  Project Inquiry Received
                </h3>
                <p className="font-inter-tight text-base text-[#151618]/80 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#151618]">{clientName || 'Client'}</strong>. Your brief for a <strong className="text-[#151618]">{selectedTypology}</strong> has been received by our studio. Our principal architects will contact you within 24 hours.
                </p>
                <div className="font-mono text-xs text-[#0F38D9] pt-4">
                  INQUIRY REFERENCE: #VASTU-2026-{Math.floor(1000 + Math.random() * 9000)}
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-[#151618] text-[#F3F0EA] font-space-grotesk text-xs uppercase tracking-wider hover:bg-[#0F38D9] transition-colors"
                >
                  Edit or Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* Step 01: Typology Selector */}
                <div>
                  <label className="block font-space-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#151618] mb-3">
                    1. PROJECT TYPE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {consultation_intake.typologies.map((item) => {
                      const isSelected = selectedTypology === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedTypology(item)}
                          className={`p-3 text-left font-space-grotesk text-xs uppercase tracking-wider border transition-all ${
                            isSelected
                              ? 'bg-[#151618] text-[#F3F0EA] border-[#151618] shadow-sm'
                              : 'bg-[#E2DDD3]/50 text-[#151618]/80 border-[#151618]/10 hover:bg-[#E2DDD3]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 02: Spatial Footprint */}
                <div>
                  <label className="block font-space-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#151618] mb-3">
                    2. ESTIMATED AREA (SQ. FT.)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {consultation_intake.spatial_footprints.map((item) => {
                      const isSelected = selectedFootprint === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedFootprint(item)}
                          className={`p-3 text-center font-space-grotesk text-xs uppercase tracking-wider border transition-all ${
                            isSelected
                              ? 'bg-[#151618] text-[#F3F0EA] border-[#151618] shadow-sm'
                              : 'bg-[#E2DDD3]/50 text-[#151618]/80 border-[#151618]/10 hover:bg-[#E2DDD3]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 03: Estimated Construction & Design Investment */}
                <div>
                  <label className="block font-space-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#151618] mb-3">
                    3. ESTIMATED PROJECT BUDGET
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {consultation_intake.investment_tiers.map((item) => {
                      const isSelected = selectedInvestment === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedInvestment(item)}
                          className={`p-3 text-left font-space-grotesk text-xs uppercase tracking-wider border transition-all ${
                            isSelected
                              ? 'bg-[#0F38D9] text-[#F3F0EA] border-[#0F38D9] shadow-sm'
                              : 'bg-[#E2DDD3]/50 text-[#151618]/80 border-[#151618]/10 hover:bg-[#E2DDD3]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 04: Project Readiness Stage */}
                <div>
                  <label className="block font-space-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#151618] mb-3">
                    4. CURRENT PROJECT STAGE
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {consultation_intake.readiness_stages.map((item) => {
                      const isSelected = selectedStage === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSelectedStage(item)}
                          className={`p-3 text-left font-inter-tight text-xs border transition-all ${
                            isSelected
                              ? 'bg-[#151618] text-[#F3F0EA] border-[#151618]'
                              : 'bg-[#E2DDD3]/50 text-[#151618]/80 border-[#151618]/10 hover:bg-[#E2DDD3]'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact & Site Inputs */}
                <div className="pt-6 border-t border-[#151618]/15 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Rajesh Patil"
                        className="w-full bg-[#E2DDD3]/40 border border-[#151618]/15 px-4 py-3 font-inter-tight text-sm text-[#151618] placeholder-[#151618]/40 focus:outline-none focus:border-[#0F38D9] focus:bg-[#F3F0EA]"
                      />
                    </div>

                    <div>
                      <label className="block font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="e.g. rajesh.patil@example.com"
                        className="w-full bg-[#E2DDD3]/40 border border-[#151618]/15 px-4 py-3 font-inter-tight text-sm text-[#151618] placeholder-[#151618]/40 focus:outline-none focus:border-[#0F38D9] focus:bg-[#F3F0EA]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618] mb-2">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 98220 12345"
                        className="w-full bg-[#E2DDD3]/40 border border-[#151618]/15 px-4 py-3 font-inter-tight text-sm text-[#151618] placeholder-[#151618]/40 focus:outline-none focus:border-[#0F38D9] focus:bg-[#F3F0EA]"
                      />
                    </div>

                    <div>
                      <label className="block font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618] mb-2">
                        Project Location (Pune / Mumbai / Other)
                      </label>
                      <input
                        type="text"
                        value={siteLocation}
                        onChange={(e) => setSiteLocation(e.target.value)}
                        placeholder="e.g. Kalyani Nagar, Pune or Bandra, Mumbai"
                        className="w-full bg-[#E2DDD3]/40 border border-[#151618]/15 px-4 py-3 font-inter-tight text-sm text-[#151618] placeholder-[#151618]/40 focus:outline-none focus:border-[#0F38D9] focus:bg-[#F3F0EA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618] mb-2">
                      Project Details & Vision
                    </label>
                    <textarea
                      rows={3}
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      placeholder="Describe your site, spatial requirements, preferred materials (e.g. Makrana marble, teak wood), and target timeline..."
                      className="w-full bg-[#E2DDD3]/40 border border-[#151618]/15 px-4 py-3 font-inter-tight text-sm text-[#151618] placeholder-[#151618]/40 focus:outline-none focus:border-[#0F38D9] focus:bg-[#F3F0EA]"
                    />
                  </div>
                </div>

                {/* Submit Action Trigger */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-xs font-inter-tight text-[#151618]/60">
                    <ShieldCheck className="h-4 w-4 text-[#0F38D9]" />
                    <span>{consultation_intake.disclaimer}</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-[#151618] hover:bg-[#0F38D9] px-8 py-4 font-space-grotesk text-xs uppercase tracking-[0.16em] text-[#F3F0EA] transition-all duration-300 shadow-lg"
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Direct Atelier Coordinates & WhatsApp Concierge */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Direct WhatsApp Concierge Card */}
            <div className="border border-[#151618]/15 bg-[#F3F0EA] p-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-space-grotesk uppercase tracking-wider text-[#0F38D9]">
                <MessageCircle className="h-4 w-4" />
                <span>DIRECT WHATSAPP INQUIRY</span>
              </div>
              <h3 className="font-space-grotesk text-xl font-medium text-[#151618]">
                Direct WhatsApp Chat
              </h3>
              <p className="font-inter-tight text-xs sm:text-sm text-[#151618]/70 leading-relaxed">
                Connect directly with our studio team for immediate project inquiries, site feasibility, or consultation bookings.
              </p>
              <a
                href={`https://wa.me/${contact.whatsapp_number}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#0F38D9] hover:bg-[#151618] text-white p-3.5 font-space-grotesk text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Atelier Studio Coordinates */}
            <div className="border border-[#151618]/15 bg-[#E2DDD3]/50 p-8 space-y-6 font-inter-tight text-xs text-[#151618]">
              <div>
                <div className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#0F38D9] mb-1">
                  PUNE HEAD STUDIO
                </div>
                <div className="font-medium">{contact.headquarters_address}</div>
                <div className="font-mono text-[11px] text-[#151618]/60 mt-0.5">{contact.headquarters_coords}</div>
              </div>

              <div className="pt-4 border-t border-[#151618]/10">
                <div className="font-space-grotesk text-xs font-bold uppercase tracking-wider text-[#0F38D9] mb-1">
                  MUMBAI DESIGN OFFICE
                </div>
                <div className="font-medium">{contact.european_address}</div>
                <div className="font-mono text-[11px] text-[#151618]/60 mt-0.5">{contact.european_coords}</div>
              </div>

              <div className="pt-4 border-t border-[#151618]/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#0F38D9]" />
                  <a href={`tel:${contact.phone}`} className="hover:text-[#0F38D9] font-medium">
                    {contact.phone_display}
                  </a>
                </div>
                <div>
                  <span className="opacity-60">Email: </span>
                  <a href={`mailto:${contact.email}`} className="hover:text-[#0F38D9] font-medium">
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
