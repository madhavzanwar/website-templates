'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Layers, Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { InteriorDesignerContent, MaterialSpec } from '../types';

interface MaterialityMoodboardProps {
  content: InteriorDesignerContent;
}

export function MaterialityMoodboard({ content }: MaterialityMoodboardProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpec>(content.materials[0]);
  const [activeDrawer, setActiveDrawer] = useState<boolean>(false);

  const materials = content.materials;

  const handleSelectMaterial = (material: MaterialSpec) => {
    setSelectedMaterial(material);
    setActiveDrawer(true);
  };

  return (
    <section id="materiality" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F3F0EA]">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#151618]/15 mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-space-grotesk text-xs font-semibold tracking-[0.22em] uppercase text-[#0F38D9] block mb-2">
                OUR MATERIAL PALETTE & SOURCING
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618]">
                Natural Materials & Regional Craft
              </h2>
            </div>

            <p className="font-inter-tight text-sm sm:text-base text-[#151618]/80 max-w-xl leading-relaxed">
              We reject synthetic laminates and fleeting surface veneers. Our architectural envelopes are crafted exclusively from raw, unsealed minerals, ancient timbers, and living metals that deepen their character with age.
            </p>
          </div>
        </div>

        {/* 6-Tile Physical Material Spec Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((mat) => {
            const isSelected = selectedMaterial?.id === mat.id;

            return (
              <div
                key={mat.id}
                onClick={() => handleSelectMaterial(mat)}
                className={`group cursor-pointer border transition-all duration-300 relative bg-[#E2DDD3]/40 flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'border-[#0F38D9] ring-2 ring-[#0F38D9]/20 shadow-xl'
                    : 'border-[#151618]/15 hover:border-[#151618]/40 hover:bg-[#E2DDD3]'
                }`}
              >
                {/* Macro Material Texture Image with Hover Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#151618]">
                  <Image
                    src={mat.photo}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151618]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Material Tag Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-[#151618]/80 backdrop-blur-md px-3 py-1 font-space-grotesk text-[10px] uppercase tracking-wider text-[#F3F0EA] border border-white/10">
                    {mat.tag}
                  </div>

                  {/* Provenance Stamp */}
                  <div className="absolute bottom-4 left-4 z-10 text-[#F3F0EA] font-inter-tight text-xs font-medium">
                    {mat.provenance}
                  </div>

                  {isSelected && (
                    <div className="absolute top-4 right-4 z-10 h-6 w-6 rounded-full bg-[#0F38D9] text-white flex items-center justify-center shadow-md">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>

                {/* Material Identity & Baseline Specs */}
                <div className="p-6 bg-[#F3F0EA] border-t border-[#151618]/10 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-space-grotesk text-lg font-medium text-[#151618] group-hover:text-[#0F38D9] transition-colors">
                      {mat.name}
                    </h3>
                    <p className="mt-2 font-inter-tight text-xs sm:text-sm text-[#151618]/70 line-clamp-2 leading-relaxed">
                      {mat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#151618]/10 flex items-center justify-between text-xs font-space-grotesk uppercase tracking-wider text-[#151618]/60">
                    <span>{mat.acoustic_nrc}</span>
                    <span className="inline-flex items-center gap-1 text-[#0F38D9] font-medium group-hover:underline">
                      Spec Sheet <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Material Deep Technical Spec Drawer / Panel */}
        {selectedMaterial && (
          <div className="mt-12 border border-[#151618]/20 bg-[#E2DDD3]/30 p-8 sm:p-12 lg:p-16 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#151618]/15 pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#0F38D9]" />
                <span className="font-space-grotesk text-xs uppercase tracking-[0.20em] text-[#0F38D9] font-semibold">
                  MATERIAL SPECIFICATIONS • {selectedMaterial.tag}
                </span>
              </div>
              <span className="font-inter-tight text-xs uppercase tracking-wider text-[#151618]/60">
                PROVENANCE: {selectedMaterial.provenance}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 relative aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] overflow-hidden border border-[#151618]/20">
                <Image
                  src={selectedMaterial.photo}
                  alt={selectedMaterial.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-instrument italic text-3xl sm:text-4xl text-[#151618]">
                    {selectedMaterial.name}
                  </h3>
                  <p className="mt-4 font-inter-tight text-base text-[#151618]/80 leading-relaxed max-w-2xl">
                    {selectedMaterial.description}
                  </p>
                </div>

                {/* 4-Item Spec Matrix */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-[#151618]/15 py-6 font-inter-tight text-xs">
                  <div>
                    <span className="block font-space-grotesk text-[10px] uppercase tracking-wider text-[#151618]/50">
                      ACOUSTIC DENSITY
                    </span>
                    <strong className="text-sm font-space-grotesk text-[#151618]">
                      {selectedMaterial.acoustic_nrc}
                    </strong>
                  </div>

                  <div>
                    <span className="block font-space-grotesk text-[10px] uppercase tracking-wider text-[#151618]/50">
                      THERMAL MASS
                    </span>
                    <strong className="text-sm font-space-grotesk text-[#151618]">
                      {selectedMaterial.thermal_mass}
                    </strong>
                  </div>

                  <div>
                    <span className="block font-space-grotesk text-[10px] uppercase tracking-wider text-[#151618]/50">
                      PATINA CYCLE
                    </span>
                    <strong className="text-xs font-inter-tight text-[#151618]">
                      {selectedMaterial.patina_cycle}
                    </strong>
                  </div>

                  <div>
                    <span className="block font-space-grotesk text-[10px] uppercase tracking-wider text-[#151618]/50">
                      FINISH GRADE
                    </span>
                    <strong className="text-xs font-inter-tight text-[#151618]">
                      {selectedMaterial.finish_spec}
                    </strong>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-inter-tight text-xs text-[#151618]/70">
                  <span>Physical quarry and millwork samples delivered for commissioned projects.</span>
                  <a
                    href="#commission-brief"
                    className="inline-flex items-center gap-1.5 text-[#0F38D9] font-space-grotesk text-xs uppercase tracking-wider font-semibold hover:underline"
                  >
                    Request Physical Sample Box →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
