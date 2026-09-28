import React from 'react';
import { Agent } from '../types';

interface AgentSectionProps {
  title: string;
  subtitle: string;
  team: Agent[];
}

export default function AgentSection({ title, subtitle, team }: AgentSectionProps) {
  return (
    <section id="team" className="py-24 bg-[#0F172A] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl text-white mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
          <p className="text-white/70 text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
        </div>

        <div className="flex flex-col gap-16">
          {team.map(agent => (
            <div key={agent.id} className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-white/10 pb-16 last:border-0 last:pb-0">
              <div className="flex-1">
                <h3 className="text-4xl text-[#C9A84C] mb-2" style={{ fontFamily: 'var(--font-libre)' }}>{agent.name}</h3>
                <div className="text-white/90 text-lg mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>{agent.role}</div>
                <div className="text-white/50 text-sm mb-6 flex gap-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                  <span>{agent.experience}</span>
                  <span>•</span>
                  <span>{agent.languages.join(' • ')}</span>
                </div>
                <p className="text-white/70 max-w-xl leading-relaxed" style={{ fontFamily: 'var(--font-outfit)' }}>{agent.bio}</p>
              </div>
              
              <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                <div className="text-xs text-white/50 uppercase tracking-widest">{agent.reraNumber}</div>
                <div className="flex gap-3">
                  <a href={`tel:${agent.phone.replace(/ /g, '')}`} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 text-sm">
                    Call Direct
                  </a>
                  <a href={`https://wa.me/${agent.phone.replace(/[\s+]/g, '')}`} className="bg-[#25D366] text-white px-6 py-3 rounded-full hover:bg-[#20b858] transition-colors flex items-center gap-2 text-sm font-medium">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
