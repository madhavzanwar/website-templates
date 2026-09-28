'use client';

import React, { useState } from 'react';
import { GymContent } from '../types';
import { ArrowUpRight, Flame, Clock, Users, Wrench } from 'lucide-react';

interface DisciplinesSectionProps {
  content: GymContent;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ content }) => {
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>(content.services[0].id);

  return (
    <section id="disciplines" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              WORKOUT PROGRAMS
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              TRAINING PROGRAMS & WORKOUTS
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            CLICK OR HOVER TO VIEW WORKOUT DETAILS & EQUIPMENT
          </div>
        </div>

        {/* Industrial Expanding Manifest List (Anti-Slop: Not a generic 3-box emoji card grid) */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {content.services.map((service, idx) => {
            const isOpen = activeDisciplineId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveDisciplineId(service.id)}
                className={`group transition-colors duration-300 ${
                  isOpen ? 'bg-[#14161B]' : 'bg-transparent hover:bg-white/[0.02]'
                }`}
              >
                {/* Collapsed Horizontal Row Bar */}
                <div 
                  onClick={() => setActiveDisciplineId(service.id)}
                  className="flex flex-col lg:flex-row lg:items-center justify-between p-6 sm:p-8 cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#D4FF00]">
                      {service.code}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white group-hover:text-zinc-200">
                      {service.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-zinc-400">
                    <span className="hidden sm:inline-flex items-center gap-1.5 text-zinc-300">
                      <Flame className="h-3.5 w-3.5 text-[#D4FF00]" />
                      INTENSITY: <strong className="text-white">{service.intensity_level}</strong>
                    </span>
                    <span className="hidden md:inline-flex text-zinc-600">/</span>
                    <span className="hidden md:inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      {service.duration}
                    </span>
                    <span className="hidden md:inline-flex text-zinc-600">/</span>
                    <span className="hidden lg:inline-flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-zinc-500" />
                      CAP: {service.class_cap}
                    </span>
                    <span className="font-mono text-sm font-bold text-white pl-4">
                      {service.price}
                    </span>
                    <div className={`flex h-8 w-8 items-center justify-center border transition-all ${
                      isOpen 
                        ? 'border-[#D4FF00] bg-[#D4FF00] text-black' 
                        : 'border-white/20 text-white group-hover:border-white/50'
                    }`}>
                      <ArrowUpRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Specifications Drawer */}
                {isOpen && (
                  <div className="px-6 pb-8 sm:px-8 border-t border-white/5 pt-6 animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Left: Authentic Discipline Image */}
                      <div className="lg:col-span-4 aspect-[16/10] overflow-hidden border border-white/20">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover grayscale contrast-125 brightness-95"
                          loading="lazy"
                        />
                      </div>

                      {/* Right: Technical Specifications */}
                      <div className="lg:col-span-8 flex flex-col justify-between h-full">
                        <div>
                          <p className="font-body text-zinc-300 text-sm sm:text-base leading-relaxed">
                            {service.description}
                          </p>

                          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                            <div className="flex items-start gap-3">
                              <Wrench className="h-4 w-4 text-[#D4FF00] shrink-0 mt-0.5" />
                              <div>
                                <div className="font-mono text-[10px] uppercase text-zinc-400">HARDWARE & SETUP</div>
                                <div className="font-mono text-xs text-zinc-200 mt-0.5">{service.equipment}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="h-4 w-4 text-[#D4FF00] shrink-0 mt-0.5" />
                              <div>
                                <div className="font-mono text-[10px] uppercase text-zinc-400">SESSION RATIO</div>
                                <div className="font-mono text-xs text-zinc-200 mt-0.5">{service.class_cap} max / Dedicated Coach</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="font-mono text-xs text-zinc-400">
                            STANDARD INCLUDED IN ATHLETE ALL-ACCESS MEMBERSHIP
                          </span>
                          <a
                            href="#booking"
                            className="inline-flex items-center gap-2 border border-[#D4FF00] bg-[#D4FF00] px-4 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-[#D4FF00] transition-colors"
                          >
                            <span>RESERVE TRIAL SLOT</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
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
