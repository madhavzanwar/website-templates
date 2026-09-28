'use client';

import React from 'react';
import { GymContent } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface RatesSectionProps {
  content: GymContent;
}

export const RatesSection: React.FC<RatesSectionProps> = ({ content }) => {
  return (
    <section id="rates" className="relative border-b border-white/10 bg-[#090A0C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16 gap-6">
          <div>
            <div className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D4FF00] mb-2">
              FEES & PRICING
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              MEMBERSHIP PLANS
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            CLEAR PRICING · NO HIDDEN CHARGES · UPI ACCEPTED
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {content.membership_tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-8 border transition-all ${
                tier.is_featured
                  ? 'border-[#D4FF00] bg-[#14161B] relative shadow-[0_0_40px_rgba(212,255,0,0.06)]'
                  : 'border-white/15 bg-[#14161B]/60 hover:border-white/30'
              }`}
            >
              {tier.is_featured && (
                <div className="absolute -top-3.5 left-8 border border-[#D4FF00] bg-[#D4FF00] px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-black">
                  {tier.badge}
                </div>
              )}

              <div>
                {!tier.is_featured && (
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    {tier.badge}
                  </div>
                )}

                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mt-1">
                  {tier.name}
                </h3>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-black tracking-tight text-white">
                    {tier.price}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    {tier.billing_period}
                  </span>
                </div>

                <p className="mt-4 font-body text-sm text-zinc-400 leading-relaxed">
                  {tier.description}
                </p>

                {/* Features List */}
                <ul className="mt-8 space-y-3.5 border-t border-white/10 pt-6">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-none bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="font-mono text-xs text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <a
                  href="#booking"
                  className={`flex w-full items-center justify-center gap-2 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                    tier.is_featured
                      ? 'border border-[#D4FF00] bg-[#D4FF00] text-black hover:bg-black hover:text-[#D4FF00]'
                      : 'border border-white/20 bg-white/5 text-white hover:border-[#D4FF00] hover:bg-[#D4FF00] hover:text-black'
                  }`}
                >
                  <span>{tier.cta_text}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
