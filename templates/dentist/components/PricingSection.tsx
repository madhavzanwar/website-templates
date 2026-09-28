import React from 'react'
import { PricingItem } from '../types'

export default function PricingSection({ pricing }: { pricing: PricingItem[] }) {
  return (
    <section id="pricing" className="py-32 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-playfair text-5xl text-[#1A1A1A] text-center mb-16">Transparent Pricing <br/><span className="text-[#0D6E6E] italic">— No Surprises</span></h2>
        
        <div className="flex flex-col gap-6">
          {pricing.map((item) => (
            <div key={item.id} className="flex items-end gap-4 group">
              <span className="font-playfair text-xl text-[#1A1A1A] whitespace-nowrap">{item.service}</span>
              <div className="flex-1 border-b-2 border-dotted border-[#1A1A1A]/20 mb-2 group-hover:border-[#0D6E6E]/50 transition-colors"></div>
              <span className="font-dm-sans text-lg text-[#0D6E6E] whitespace-nowrap">{item.price}</span>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center font-dm-sans text-[#1A1A1A]/50 text-sm">
          * EMI options available. We partner with major health insurance providers. Prices may vary based on complexity.
        </p>
      </div>
    </section>
  )
}
