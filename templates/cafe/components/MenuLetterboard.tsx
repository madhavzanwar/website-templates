'use client';

import React, { useState } from 'react';
import { CafeContent } from '../types';
import { Sparkles, MessageSquare, Coffee, Flame, Check, ArrowRight } from 'lucide-react';

interface MenuLetterboardProps {
  content: CafeContent;
}

export function MenuLetterboard({ content }: MenuLetterboardProps) {
  const { menu, visit_booking } = content;
  const [activeTab, setActiveTab] = useState<string>(menu.tabs[0]?.id || 'espresso');

  const filteredItems = menu.items.filter((item) => item.category === activeTab);

  const getWhatsAppBeanOrderUrl = (itemName: string, price: string) => {
    const text = `${visit_booking.whatsapp_message_prefix}I would like to order a 250g bag of "${itemName}" (${price}).`;
    return `https://wa.me/${visit_booking.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="menu" className="bg-[#F7F4EE] py-20 lg:py-28 border-b border-[#231B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B85D38]/10 border border-[#B85D38]/30 text-[#B85D38] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
            <Coffee className="w-3.5 h-3.5" />
            <span>{menu.badge}</span>
          </div>

          <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-tight">
            {menu.title}
          </h2>

          <p className="mt-4 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
            {menu.subtitle}
          </p>
        </div>

        {/* Tab Selection Bar (Tactile Letter-Board Slats) */}
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-[#EDE6DA] border border-[#231B16]/15 rounded-md shadow-inner">
            {menu.tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-sm font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#231B16] text-[#FAF6EE] shadow-md'
                      : 'text-[#231B16]/70 hover:text-[#231B16] hover:bg-[#F7F4EE]/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Items Container */}
        <div className="mt-12">
          {activeTab === 'retail_beans' ? (
            /* Retail Whole Bean Bags Cards Layout */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFFDF9] border-2 border-[#231B16]/15 p-6 rounded-sm shadow-sm hover:shadow-lg hover:border-[#B85D38]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header if available */}
                    {item.image && (
                      <div className="relative aspect-4/3 overflow-hidden rounded-sm mb-5 bg-[#231B16]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#231B16]/80 text-[#D99B4B] font-mono text-[10px] uppercase font-bold tracking-wider rounded-xs backdrop-blur-xs">
                          {item.bag_weight || '250G WHOLE BEAN'}
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-artisanal text-xl font-bold text-[#231B16]">
                        {item.name}
                      </h3>
                      <span className="font-mono text-lg font-bold text-[#B85D38]">
                        {item.price}
                      </span>
                    </div>

                    {item.origin && (
                      <div className="mt-1 font-mono text-xs font-semibold text-[#4A5844] flex items-center gap-1.5">
                        <span>{item.origin}</span>
                        {item.masl && <span>• {item.masl}</span>}
                      </div>
                    )}

                    <p className="mt-3 font-humanist text-sm text-[#231B16]/75 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Roast & Process Specs */}
                    <div className="mt-4 p-3 bg-[#EDE6DA]/50 rounded-xs border border-[#231B16]/10 space-y-1.5 text-xs font-mono">
                      {item.process && (
                        <div className="flex justify-between text-[#231B16]/80">
                          <span className="text-[#231B16]/50">PROCESS:</span>
                          <span className="font-semibold">{item.process}</span>
                        </div>
                      )}
                      {item.roast_profile && (
                        <div className="flex justify-between text-[#231B16]/80">
                          <span className="text-[#231B16]/50">PROFILE:</span>
                          <span className="font-semibold text-[#B85D38]">{item.roast_profile}</span>
                        </div>
                      )}
                    </div>

                    {/* Cupping Notes */}
                    {item.notes && item.notes.length > 0 && (
                      <div className="mt-4">
                        <span className="font-mono text-[10px] uppercase text-[#231B16]/50 tracking-wider block mb-1.5">
                          CUPPING NOTES:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.notes.map((note, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-[#B85D38]/10 text-[#B85D38] font-mono text-xs font-semibold rounded-xs border border-[#B85D38]/20"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct WhatsApp Ordering */}
                  <div className="mt-6 pt-5 border-t border-[#231B16]/10">
                    <a
                      href={getWhatsAppBeanOrderUrl(item.name, item.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#B85D38] text-white font-mono text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-[#9E4D2C] transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>ORDER VIA WHATSAPP</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Classic Letterboard Menu Grid with Dotted Leader Lines */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 bg-[#FFFDF9] border border-[#231B16]/15 p-6 sm:p-10 rounded-sm shadow-sm">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative pb-6 border-b border-[#231B16]/10 last:border-b-0 lg:last:border-b-0 hover:bg-[#F7F4EE]/50 p-3 rounded-sm transition-colors"
                >
                  {/* Title, Dotted Leader, Price */}
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-artisanal text-lg sm:text-xl font-bold text-[#231B16] group-hover:text-[#B85D38] transition-colors">
                        {item.name}
                      </h3>
                      {item.is_signature && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#D99B4B]/20 text-[#231B16] font-mono text-[9px] uppercase font-bold rounded-xs border border-[#D99B4B]/40">
                          <Sparkles className="w-2.5 h-2.5 text-[#B85D38]" />
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Dotted Leader Line */}
                    <div className="flex-1 border-b border-dotted border-[#231B16]/30 mx-2 hidden sm:block" />

                    {/* Price */}
                    <span className="font-mono text-base sm:text-lg font-bold text-[#B85D38] whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>

                  {/* Origin / MASL for Slow Bar */}
                  {item.origin && (
                    <div className="mt-1 font-mono text-xs text-[#4A5844] font-semibold">
                      {item.origin} {item.masl ? `• ${item.masl}` : ''} {item.process ? `• ${item.process}` : ''}
                    </div>
                  )}

                  {/* Description */}
                  <p className="mt-1.5 font-humanist text-sm text-[#231B16]/75 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Cupping Notes and Dietary / Sourcing Tags */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {item.notes && item.notes.length > 0 && (
                      <div className="flex items-center gap-1 font-mono text-xs text-[#B85D38]">
                        <span className="text-[#231B16]/40 text-[10px] uppercase font-bold">NOTES:</span>
                        <span className="font-semibold">{item.notes.join(' • ')}</span>
                      </div>
                    )}

                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#EDE6DA] text-[#231B16]/80 font-mono text-[10px] uppercase font-semibold rounded-xs border border-[#231B16]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note on Menu */}
        <div className="mt-8 text-center font-mono text-xs text-[#231B16]/60">
          ✦ Alternative plant milks (Minor Figures Oat, Coconut) served with zero surcharge. Decaf available via Swiss Water Process.
        </div>

      </div>
    </section>
  );
}
