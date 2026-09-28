import React from 'react';

export default function RecoveryProcess({ content }: { content: any }) {
  return (
    <section id="process" className="bg-[#1B4332] py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cormorant text-5xl md:text-7xl text-[#F5F0E8] mb-20 text-center">
          {content.treatmentApproach.title}
        </h2>
        
        <div className="relative flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-start">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-[#C8A94A]/30 z-0" />
          
          {content.treatmentApproach.steps.map((step: any, idx: number) => (
            <div key={idx} className="relative z-10 flex flex-col w-full md:w-1/4 px-4 group">
              <div 
                className="font-cormorant text-8xl md:text-[120px] font-bold leading-none mb-6 transition-transform group-hover:-translate-y-4 duration-500"
                style={{ 
                  WebkitTextStroke: '1px #C8A94A', 
                  color: 'transparent' 
                }}
              >
                {step.stepNumber}
              </div>
              <h3 className="font-nunito font-bold text-2xl text-[#F5F0E8] mb-4">
                {step.title}
              </h3>
              <p className="font-nunito text-[#8A9A86] text-lg leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
