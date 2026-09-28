import React from 'react';

export default function PricingSection({ content }: { content: any }) {
  return (
    <section id="packages" className="bg-[#F5F0E8] py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-cormorant text-5xl md:text-6xl text-[#1B4332] mb-4">
            {content.sessionPackages.title}
          </h2>
          <p className="font-nunito text-[#1B4332]/70 text-lg">
            {content.sessionPackages.subtitle}
          </p>
        </div>
        
        <div className="w-full flex flex-col border border-[#1B4332]/20 rounded-lg overflow-hidden bg-white shadow-xl">
          {content.sessionPackages.tiers.map((tier: any, idx: number) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center border-b border-[#1B4332]/10 last:border-b-0 p-8 md:p-10 ${
                tier.isPopular ? 'bg-[#C8A94A]/10 relative' : 'bg-white'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0 bg-[#C8A94A] text-[#0F241C] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                  Recommended
                </div>
              )}
              
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="font-cormorant text-3xl text-[#0F241C] mb-2">{tier.name}</h3>
                <p className="font-nunito text-[#1B4332]/70 text-sm">{tier.idealFor}</p>
              </div>
              
              <div className="w-full md:w-1/2 px-0 md:px-8 mb-6 md:mb-0">
                <ul className="font-nunito text-[#1B4332]/80 text-sm space-y-2">
                  {tier.features.slice(0, 3).map((feat: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C8A94A] mt-1">•</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-1/6 flex md:justify-end items-center md:items-end flex-col">
                <span className="font-cormorant text-4xl text-[#1B4332] font-bold">{tier.price}</span>
                <span className="font-nunito text-[#1B4332]/60 text-xs mt-1">{tier.perSessionRate}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center font-nunito text-[#1B4332]/60 text-sm">
          {content.sessionPackages.notice} • We accept {content.payment.methods}
        </div>
      </div>
    </section>
  );
}
