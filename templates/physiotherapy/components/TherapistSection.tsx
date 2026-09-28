import React from 'react';

export default function TherapistSection({ content }: { content: any }) {
  return (
    <section id="therapists" className="bg-[#F5F0E8] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cormorant text-5xl md:text-7xl text-[#0F241C] mb-16 border-b border-[#1B4332]/20 pb-8">
          The Specialists
        </h2>
        
        <div className="flex flex-col">
          {content.therapistSection.team.map((therapist: any, idx: number) => (
            <div 
              key={idx} 
              className="flex flex-col md:flex-row items-center justify-between py-12 border-b border-[#1B4332]/20"
            >
              <div className="md:w-1/3 mb-6 md:mb-0">
                <h3 className="font-cormorant italic text-5xl md:text-6xl text-[#1B4332]">
                  {therapist.name}
                </h3>
              </div>
              <div className="md:w-1/3 font-nunito text-center md:text-left mb-6 md:mb-0">
                <p className="font-bold text-[#0F241C] text-xl mb-2">{therapist.qualifications}</p>
                <p className="text-[#C8A94A] font-semibold text-sm uppercase tracking-widest mb-4">{therapist.role}</p>
                <p className="text-[#1B4332]/80">{therapist.bio}</p>
              </div>
              <div className="md:w-1/4 flex justify-end">
                {/* Decorative CSS Circle */}
                <div className="w-24 h-24 rounded-full border border-[#C8A94A] flex items-center justify-center relative">
                  <div className="absolute w-20 h-20 rounded-full border border-[#C8A94A]/50 top-1 left-3" />
                  <span className="font-cormorant text-2xl text-[#1B4332] z-10">{therapist.initials}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
