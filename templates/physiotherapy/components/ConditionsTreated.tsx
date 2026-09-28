import React from 'react';

export default function ConditionsTreated({ content }: { content: any }) {
  return (
    <section id="conditions" className="bg-[#F5F0E8] py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cormorant text-6xl md:text-8xl text-[#0F241C] mb-16 border-b border-[#1B4332]/20 pb-8">
          What We Treat
        </h2>
        
        <div className="flex flex-col">
          {content.conditionsSection.conditions.map((condition: any, idx: number) => (
            <div 
              key={idx} 
              className="group flex flex-col md:flex-row justify-between py-8 border-b border-[#1B4332]/20 hover:bg-[#1B4332]/5 transition-colors px-4 -mx-4"
            >
              <div className="md:w-1/3 flex items-start gap-4 mb-4 md:mb-0">
                <span className="w-2 h-2 rounded-full bg-[#C8A94A] mt-2.5 flex-shrink-0" />
                <h3 className="font-nunito font-bold text-2xl text-[#1B4332]">
                  {condition.title}
                </h3>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center font-nunito">
                <div className="text-[#C8A94A] font-bold text-sm tracking-wider uppercase mb-2">
                  {condition.timeline}
                </div>
                <p className="text-[#1B4332]/80 text-lg">
                  {condition.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
