'use client';

import React from 'react';
import { CafeContent } from '../types';
import { Leaf, Flame, Gauge, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface RoastingManifestoSectionProps {
  content: CafeContent;
}

export function RoastingManifestoSection({ content }: RoastingManifestoSectionProps) {
  const { roasting_manifesto } = content;

  const pillarIcons = [
    <Leaf key="leaf" className="w-6 h-6 text-[#4A5844]" />,
    <Flame key="flame" className="w-6 h-6 text-[#B85D38]" />,
    <Gauge key="gauge" className="w-6 h-6 text-[#D99B4B]" />,
  ];

  return (
    <section id="manifesto" className="bg-[#FAF7F2] py-20 lg:py-28 border-b border-[#231B16]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A5844]/10 border border-[#4A5844]/30 text-[#4A5844] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#4A5844]"></span>
            <span>{roasting_manifesto.badge}</span>
          </div>

          <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-[1.15]">
            {roasting_manifesto.title}
          </h2>

          <p className="mt-5 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
            {roasting_manifesto.subtitle}
          </p>
        </div>

        {/* Editorial Body Grid with Harvest Stamp */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {roasting_manifesto.body_paragraphs.map((para, idx) => (
              <p key={idx} className="font-humanist text-[#231B16]/85 text-base sm:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="lg:col-span-4 bg-[#EDE6DA] border border-[#231B16]/15 p-6 rounded-sm shadow-sm">
            <div className="flex items-center gap-2 text-[#B85D38] font-mono text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>TRACEABILITY CERTIFICATION</span>
            </div>
            <div className="font-mono text-xs text-[#231B16]/80 leading-relaxed border-t border-[#231B16]/10 pt-3">
              {roasting_manifesto.harvest_cycle_badge}
            </div>
            <div className="mt-4 pt-3 border-t border-[#231B16]/10 flex items-center justify-between text-[11px] font-mono text-[#231B16]/60">
              <span>SCA ROASTER ALLIANCE</span>
              <span className="text-[#4A5844] font-bold">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Craft */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {roasting_manifesto.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="group relative bg-[#FFFDF9] border border-[#231B16]/15 p-7 rounded-sm shadow-xs hover:border-[#B85D38]/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#B85D38] px-2.5 py-1 bg-[#B85D38]/10 rounded-xs border border-[#B85D38]/20">
                    PILLAR {pillar.number}
                  </span>
                  <div className="p-2 rounded-sm bg-[#F7F4EE] border border-[#231B16]/10">
                    {pillarIcons[idx % pillarIcons.length]}
                  </div>
                </div>

                <h3 className="font-artisanal text-xl font-bold text-[#231B16] leading-snug">
                  {pillar.title}
                </h3>

                <p className="mt-3 font-humanist text-sm text-[#231B16]/75 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#231B16]/10 flex items-baseline justify-between">
                <div>
                  <div className="font-mono text-2xl font-bold text-[#231B16] tracking-tight">
                    {pillar.metric}
                  </div>
                  <div className="font-humanist text-xs text-[#231B16]/60 mt-0.5">
                    {pillar.metric_label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Trade Metrics Strip */}
        <div className="mt-16 bg-[#231B16] text-[#F7F4EE] rounded-sm p-8 sm:p-10 border border-[#3D3028] shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#3D3028]">
            {roasting_manifesto.direct_trade_stats.map((stat, idx) => (
              <div key={idx} className={`${idx !== 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-[#D99B4B] tracking-tight">
                  {stat.value}
                </div>
                <div className="font-artisanal text-base text-[#EDE6DA] font-semibold mt-1">
                  {stat.label}
                </div>
                <div className="font-humanist text-xs text-[#EDE6DA]/60 mt-1">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
