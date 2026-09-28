'use client';
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PatientStories({ content }: { content: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stories = content.patientStories.stories;

  const next = () => setActiveIndex((prev) => (prev + 1) % stories.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section id="stories" className="bg-[#0F241C] py-32 px-6 md:px-16 flex items-center min-h-[80vh]">
      <div className="max-w-5xl mx-auto w-full relative">
        <div className="absolute top-0 left-0 text-[#C8A94A] opacity-20 font-cormorant text-[200px] leading-none -mt-20 -ml-10">
          "
        </div>
        
        <div className="relative z-10 min-h-[300px] flex flex-col justify-center">
          <p className="font-cormorant italic text-4xl md:text-6xl text-[#F5F0E8] leading-tight mb-12">
            {stories[activeIndex].quote}
          </p>
          
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center">
            <div className="font-nunito mb-8 md:mb-0">
              <p className="text-[#C8A94A] text-2xl font-bold mb-1">{stories[activeIndex].patientName}</p>
              <p className="text-[#8A9A86] text-lg">{stories[activeIndex].condition}</p>
              <p className="text-[#F5F0E8]/50 text-sm mt-2 uppercase tracking-widest">{stories[activeIndex].location}</p>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-16 h-16 rounded-full border border-[#C8A94A]/30 flex items-center justify-center text-[#C8A94A] hover:bg-[#C8A94A] hover:text-[#0F241C] transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={next}
                className="w-16 h-16 rounded-full border border-[#C8A94A]/30 flex items-center justify-center text-[#C8A94A] hover:bg-[#C8A94A] hover:text-[#0F241C] transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
