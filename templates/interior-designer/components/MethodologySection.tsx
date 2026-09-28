'use client';

import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Layers, Ruler, Sparkles, ShieldCheck } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface MethodologySectionProps {
  content: InteriorDesignerContent;
}

export function MethodologySection({ content }: MethodologySectionProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const phases = content.services;
  const currentPhase = phases[activePhaseIndex] || phases[0];

  const phaseIcons = [Ruler, Layers, Sparkles, ShieldCheck];

  return (
    <section id="methodology" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F3F0EA]">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="border-b border-[#151618]/15 pb-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-space-grotesk text-xs font-semibold tracking-[0.22em] uppercase text-[#0F38D9]">
                OUR DESIGN & EXECUTION PROCESS
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618] mt-2">
                Our 4-Stage Architectural Process
              </h2>
            </div>
            <p className="font-inter-tight text-sm sm:text-base text-[#151618]/70 max-w-xl leading-relaxed">
              We replace decorative guesswork with rigorous architectural discipline. Every residential commission follows an uncompromised progression of volumetric analysis, artisan sourcing, and millimeter tolerance auditing.
            </p>
          </div>
        </div>

        {/* Interactive Milestone Ledger: 4 Column Navigation / Selector */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {phases.map((phase, idx) => {
            const Icon = phaseIcons[idx % phaseIcons.length];
            const isActive = idx === activePhaseIndex;

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseIndex(idx)}
                className={`text-left p-6 sm:p-8 transition-all duration-300 relative border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#151618] border-[#151618] text-[#F3F0EA] shadow-xl'
                    : 'bg-[#E2DDD3]/50 border-[#151618]/10 text-[#151618] hover:bg-[#E2DDD3] hover:border-[#151618]/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-space-grotesk text-xs font-bold tracking-[0.16em] uppercase ${
                        isActive ? 'text-[#0F38D9] bg-white/10 px-2.5 py-1' : 'text-[#151618]/60'
                      }`}
                    >
                      {phase.phase_code}
                    </span>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#0F38D9]' : 'text-[#151618]/40'}`} />
                  </div>

                  <h3 className="font-space-grotesk text-base sm:text-lg font-medium leading-snug">
                    {phase.phase_title}
                  </h3>
                </div>

                <div className="mt-8 pt-4 border-t border-current/15 flex items-center justify-between text-xs font-inter-tight">
                  <span className="opacity-80">{phase.duration}</span>
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isActive ? 'rotate-90 text-[#0F38D9]' : 'opacity-40'
                    }`}
                  />
                </div>

                {isActive && (
                  <div className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-[#0F38D9]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Detail Panel */}
        <div className="border border-[#151618]/15 bg-[#E2DDD3]/30 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Scope & Focus */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 font-space-grotesk text-xs uppercase tracking-[0.18em] text-[#0F38D9] mb-3">
                  <span className="h-2 w-2 bg-[#0F38D9]" />
                  <span>STAGE DETAILS • {currentPhase.phase_code}</span>
                </div>

                <h4 className="font-instrument italic text-3xl sm:text-4xl text-[#151618] leading-tight">
                  {currentPhase.phase_title}
                </h4>

                <p className="mt-6 font-inter-tight text-base sm:text-lg text-[#151618]/80 leading-relaxed">
                  {currentPhase.focus}
                </p>
              </div>

              {/* Technical Standards Box */}
              <div className="mt-8 pt-6 border-t border-[#151618]/15">
                <span className="font-space-grotesk text-[11px] font-bold uppercase tracking-[0.15em] text-[#151618]/60 block mb-2">
                  QUALITY ASSURANCE & STANDARDS:
                </span>
                <p className="font-inter-tight text-xs sm:text-sm text-[#151618]/90 font-medium">
                  {currentPhase.technical_standards}
                </p>
              </div>
            </div>

            {/* Right Column: Specific Client Deliverables */}
            <div className="lg:col-span-7 bg-[#F3F0EA] border border-[#151618]/12 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#151618]/10 pb-4 mb-6">
                  <span className="font-space-grotesk text-xs font-semibold uppercase tracking-[0.16em] text-[#151618]">
                    STAGE DELIVERABLES
                  </span>
                  <span className="font-space-grotesk text-xs text-[#0F38D9] font-medium tracking-wider">
                    {currentPhase.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentPhase.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#E2DDD3]/40 border border-[#151618]/08 flex items-start gap-3.5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#0F38D9] shrink-0 mt-0.5" />
                      <span className="font-inter-tight text-sm text-[#151618] font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#151618]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-inter-tight text-xs text-[#151618]/70">
                <span>Direct oversight by Principal Architects Rahul Deshmukh & Priya Joshi</span>
                <a
                  href="#commission-brief"
                  className="text-[#0F38D9] font-medium uppercase tracking-wider hover:underline"
                >
                  Discuss This Stage →
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
