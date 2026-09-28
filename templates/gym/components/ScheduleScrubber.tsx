'use client';

import React, { useState } from 'react';
import { GymContent } from '../types';
import { Clock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ScheduleScrubberProps {
  content: GymContent;
}

export const ScheduleScrubber: React.FC<ScheduleScrubberProps> = ({ content }) => {
  const [selectedDayId, setSelectedDayId] = useState(content.schedule.days[0].id);

  return (
    <section id="schedule" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              {content.schedule.section_code}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              {content.schedule.section_title}
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            LIMITED TO 12 MEMBERS PER BATCH FOR PERSONAL ATTENTION
          </div>
        </div>

        {/* Day Scrubber Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
          {content.schedule.days.map((dayItem) => {
            const isSelected = selectedDayId === dayItem.id;
            return (
              <button
                key={dayItem.id}
                onClick={() => setSelectedDayId(dayItem.id)}
                className={`flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] py-3 px-4 border transition-all ${
                  isSelected
                    ? 'border-[#D4FF00] bg-[#D4FF00] text-black font-black'
                    : 'border-white/10 bg-[#14161B] text-zinc-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <span className="font-display text-lg tracking-tight uppercase">
                  {dayItem.day}
                </span>
                <span className={`font-mono text-[11px] ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                  {dayItem.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sessions Roster Grid */}
        <div className="mt-8 space-y-3">
          {content.schedule.sessions.map((session) => {
            const percentFilled = Math.round((session.booked_slots / session.total_slots) * 100);
            const remaining = session.total_slots - session.booked_slots;

            return (
              <div
                key={session.id}
                className="group flex flex-col md:flex-row md:items-center justify-between border border-white/10 bg-[#14161B] p-5 sm:p-6 transition-all hover:border-white/30 hover:bg-[#1A1D24] gap-4"
              >
                {/* Left: Time and Title */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-zinc-300 min-w-[130px]">
                    <Clock className="h-3.5 w-3.5 text-[#D4FF00]" />
                    {session.time}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-zinc-200">
                        {session.title}
                      </span>
                      {session.is_urgent && (
                        <span className="hidden sm:inline-flex items-center gap-1 border border-red-500/40 bg-red-950/40 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-red-400">
                          <AlertCircle className="h-2.5 w-2.5" />
                          LAST {remaining} {remaining === 1 ? 'SPOT' : 'SPOTS'}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-4 font-mono text-[11px] text-zinc-400">
                      <span className="text-[#D4FF00]">{session.category}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-zinc-400" />
                        Coach {session.coach}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Capacity Telemetry & Action Trigger */}
                <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                  {/* Capacity Bar Visualizer */}
                  <div className="flex flex-col items-end min-w-[120px]">
                    <div className="flex items-center justify-between w-full font-mono text-[10px] uppercase text-zinc-400 mb-1">
                      <span>CAPACITY</span>
                      <span className={session.is_urgent ? 'text-red-400 font-bold' : 'text-zinc-300'}>
                        {session.booked_slots} / {session.total_slots}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          session.is_urgent ? 'bg-red-500' : 'bg-[#D4FF00]'
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Booking Trigger Button */}
                  <a
                    href="#booking"
                    className={`shrink-0 px-4 py-2 font-mono text-xs font-bold uppercase transition-all ${
                      session.is_urgent
                        ? 'border border-red-500 bg-red-500/10 text-red-300 hover:bg-red-500 hover:text-white'
                        : 'border border-white/20 bg-white/5 text-white hover:border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black'
                    }`}
                  >
                    {session.is_urgent ? `CLAIM SPOT [${remaining}]` : 'BOOK SESSION'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
