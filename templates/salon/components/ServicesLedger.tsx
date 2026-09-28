'use client';

import React, { useState } from 'react';
import { SalonContent, SalonServiceItem } from '../types';
import { Plus, Minus, Clock, Sparkles, CheckCircle2, PackageCheck, ArrowRight } from 'lucide-react';

interface ServicesLedgerProps {
  content: SalonContent;
}

export const ServicesLedger: React.FC<ServicesLedgerProps> = ({ content }) => {
  const { services_ledger } = content;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const filteredServices = activeCategory === 'all'
    ? services_ledger.services
    : services_ledger.services.filter(s => s.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedServiceId(prev => (prev === id ? null : id));
  };

  return (
    <section id="services" className="relative bg-[#F7F4EE] border-b border-[#1C1815]/10 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-humanist text-xs uppercase tracking-[0.25em] text-[#B86B4F] font-semibold">
            {services_ledger.section_code}
          </span>
          <h2 className="mt-3 font-editorial text-3xl sm:text-5xl font-normal text-[#1C1815] tracking-tight">
            {services_ledger.section_title}
          </h2>
          <p className="mt-4 font-humanist text-base font-light text-[#5E5750] leading-relaxed">
            {services_ledger.description}
          </p>
        </div>

        {/* Ambient Atelier Protocol Banner */}
        <div className="mb-10 rounded-lg border border-[#1C1815]/10 bg-[#EDE8E0] px-5 py-3.5 flex items-center gap-3">
          <Sparkles className="h-4 w-4 text-[#B86B4F] shrink-0" />
          <span className="font-humanist text-xs text-[#5E5750] tracking-wide">
            {services_ledger.note_banner}
          </span>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 pb-8 mb-4 border-b border-[#1C1815]/10">
          {services_ledger.categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-5 py-2 font-humanist text-xs uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1815] text-[#F7F4EE] shadow-xs'
                    : 'bg-[#EDE8E0]/70 text-[#6E665E] hover:bg-[#EDE8E0] hover:text-[#1C1815]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Ledger Service Rows */}
        <div className="divide-y divide-[#1C1815]/10 border-b border-[#1C1815]/10">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                className="group transition-colors duration-200 hover:bg-[#EDE8E0]/30"
              >
                {/* Main Row Bar */}
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="flex flex-col md:flex-row md:items-center justify-between py-6 cursor-pointer gap-4"
                >
                  {/* Left: Name & Tag */}
                  <div className="md:w-5/12">
                    <div className="flex items-center gap-3">
                      <span className="font-editorial text-2xl text-[#1C1815] group-hover:text-[#B86B4F] transition-colors">
                        {service.name}
                      </span>
                      <span className="rounded-full border border-[#1C1815]/15 bg-[#EDE8E0] px-2.5 py-0.5 font-humanist text-[10px] uppercase tracking-wider text-[#6E665E]">
                        {service.tag}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs font-humanist text-[#7A7067]">
                      <Clock className="h-3 w-3 text-[#B86B4F]" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Center: Brief Excerpt */}
                  <div className="hidden lg:block md:w-4/12">
                    <p className="font-humanist text-xs font-light text-[#5E5750] line-clamp-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Right: Tiered Price & Expand Toggle */}
                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-3/12">
                    <div className="text-right">
                      <div className="font-editorial text-xl font-medium text-[#1C1815]">
                        {service.price_display}
                      </div>
                      <div className="font-humanist text-[10px] text-[#7A7067] tracking-wider uppercase">
                        Senior: {service.price_senior} • Master: {service.price_master}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="#booking"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-full border border-[#B86B4F] bg-[#B86B4F] px-4 py-1.5 font-humanist text-[11px] uppercase tracking-wider text-white hover:bg-[#A3593E] transition-colors"
                      >
                        Book
                      </a>
                      <button
                        type="button"
                        aria-label={isExpanded ? 'Collapse ritual details' : 'Expand ritual details'}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1C1815]/15 bg-[#F7F4EE] text-[#1C1815] transition-transform duration-200"
                      >
                        {isExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Reveal */}
                {isExpanded && (
                  <div className="pb-8 pt-2 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 rounded-xl border border-[#1C1815]/10 bg-[#EDE8E0]/60 p-6 sm:p-8">
                      
                      {/* Left: Detailed Protocol */}
                      <div className="md:col-span-7">
                        <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#B86B4F] mb-3">
                          Ritual Architecture & Inclusions
                        </h4>
                        <p className="font-humanist text-sm font-light text-[#5E5750] leading-relaxed mb-4">
                          {service.description}
                        </p>
                        <ul className="space-y-2.5">
                          {service.includes.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs font-humanist text-[#1C1815]">
                              <CheckCircle2 className="h-4 w-4 text-[#B86B4F] shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right: Tiered Pricing Details & Take-Home Apothecary */}
                      <div className="md:col-span-5 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#1C1815]/10 md:pl-8 pt-4 md:pt-0">
                        <div>
                          <h4 className="font-humanist text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1815] mb-3">
                            Artisan Tier Pricing
                          </h4>
                          <div className="space-y-2 border-b border-[#1C1815]/10 pb-4">
                            <div className="flex justify-between text-xs font-humanist">
                              <span className="text-[#6E665E]">Senior Stylist</span>
                              <span className="font-medium text-[#1C1815]">{service.price_senior}</span>
                            </div>
                            <div className="flex justify-between text-xs font-humanist">
                              <span className="text-[#6E665E]">Master Creative Director</span>
                              <span className="font-medium text-[#1C1815]">{service.price_master}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex items-center gap-2 font-humanist text-xs font-semibold text-[#B86B4F]">
                              <PackageCheck className="h-4 w-4 text-[#B86B4F]" />
                              <span>Prescribed Take-Home Apothecary:</span>
                            </div>
                            <p className="mt-1 font-editorial text-base italic text-[#1C1815]">
                              {service.take_home_recommendation}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4">
                          <a
                            href="#booking"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#B86B4F] bg-[#B86B4F] px-6 py-2.5 font-humanist text-xs uppercase tracking-[0.16em] text-white hover:bg-[#A3593E] transition-colors"
                          >
                            <span>Reserve This Ritual</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
