'use client';

import React from 'react';
import { GymContent } from '../types';
import { Award, Target } from 'lucide-react';

interface CoachesSectionProps {
  content: GymContent;
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ content }) => {
  return (
    <section id="coaches" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              CERTIFIED TEAM
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              MEET OUR TRAINERS
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            QUALIFIED COACHES ON FLOOR AT ALL TIMES
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.coaches.map((coach, idx) => (
            <div 
              key={idx}
              className="group border border-white/15 bg-[#14161B] overflow-hidden transition-all hover:border-[#D4FF00]"
            >
              {/* Coach Portrait */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-900 relative">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="h-full w-full object-cover grayscale contrast-125 brightness-95 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14161B] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 border border-white/20 bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
                  COACH_0{idx + 1}
                </div>
              </div>

              {/* Coach Details */}
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
                  {coach.name}
                </h3>
                <div className="font-mono text-xs text-[#D4FF00] uppercase tracking-wider mt-1">
                  {coach.role}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-start gap-2">
                    <Award className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span className="font-mono text-[11px] text-zinc-300">{coach.credentials}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span className="font-mono text-[11px] text-zinc-400">FOCUS: {coach.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
