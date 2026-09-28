'use client';

import React, { useState } from 'react';
import { RestaurantContent, MenuItem } from '../types';
import { Sparkles, Info, Filter } from 'lucide-react';

interface MenuSectionsProps {
  content: RestaurantContent;
}

export function MenuSections({ content }: MenuSectionsProps) {
  const { menu_sections } = content;
  const [activeTab, setActiveTab] = useState(menu_sections.categories[0].id);
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);

  const activeCategory =
    menu_sections.categories.find((c) => c.id === activeTab) ||
    menu_sections.categories[0];

  const filteredItems = selectedAllergen
    ? activeCategory.items.filter((item) =>
        item.allergens.includes(selectedAllergen)
      )
    : activeCategory.items;

  return (
    <section id="menu" className="relative w-full bg-[#14080E] text-[#F5EFEB] py-24 sm:py-32 border-b border-[#D4A359]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
            <span className="text-xs font-dm-mono uppercase tracking-[0.25em] text-[#D4A359]">
              {menu_sections.badge}
            </span>
            <span className="w-6 h-[1px] bg-[#D4A359]"></span>
          </div>

          <h2 className="font-marcellus text-3xl sm:text-4xl md:text-5xl text-[#F5EFEB] tracking-wide mb-4">
            {menu_sections.title}
          </h2>

          <p className="font-manrope text-base text-[#F5EFEB]/70 font-light mb-4">
            {menu_sections.subtitle}
          </p>

          <p className="text-xs font-dm-mono text-[#D4A359]/80 italic">
            ✦ {menu_sections.seasonal_notice}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {menu_sections.categories.map((category) => {
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveTab(category.id);
                  setSelectedAllergen(null);
                }}
                className={`px-5 py-2.5 rounded-sm text-xs font-dm-mono uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#4A1525] text-[#D4A359] border-[#D4A359] shadow-lg shadow-[#4A1525]/40 font-semibold'
                    : 'bg-[#221619] text-[#F5EFEB]/70 border-[#D4A359]/20 hover:text-[#F5EFEB] hover:border-[#D4A359]/50'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Dietary Filter / Legend Bar */}
        <div className="max-w-4xl mx-auto mb-12 bg-[#221619]/60 border border-[#D4A359]/15 p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-dm-mono text-[#F5EFEB]/70">
            <Filter className="w-3.5 h-3.5 text-[#D4A359]" />
            <span className="uppercase tracking-wider">Filter Dietary Needs:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedAllergen(null)}
              className={`px-2.5 py-1 text-[11px] font-dm-mono rounded transition-colors ${
                selectedAllergen === null
                  ? 'bg-[#D4A359] text-[#14080E] font-bold'
                  : 'bg-[#14080E] text-[#F5EFEB]/60 hover:text-[#F5EFEB] border border-[#D4A359]/20'
              }`}
            >
              All Items
            </button>
            {menu_sections.allergen_legend.map((allergen) => {
              const isSelected = selectedAllergen === allergen.code;
              return (
                <button
                  key={allergen.code}
                  onClick={() =>
                    setSelectedAllergen(isSelected ? null : allergen.code)
                  }
                  className={`px-2.5 py-1 text-[11px] font-dm-mono rounded transition-colors border ${
                    isSelected
                      ? 'bg-[#4A1525] border-[#D4A359] text-[#D4A359] font-bold'
                      : 'bg-[#14080E] border-[#D4A359]/20 text-[#F5EFEB]/60 hover:text-[#D4A359]'
                  }`}
                  title={allergen.label}
                >
                  [{allergen.code}] {allergen.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Board / Folio Container */}
        <div className="max-w-4xl mx-auto bg-[#221619] border border-[#D4A359]/30 p-6 sm:p-10 md:p-12 rounded-sm shadow-2xl relative">
          {/* Subheading of Active Category */}
          <div className="text-center pb-8 mb-8 border-b border-[#D4A359]/20">
            <h3 className="font-marcellus text-2xl text-[#F5EFEB] mb-1">
              {activeCategory.label}
            </h3>
            <p className="text-xs font-dm-mono text-[#D4A359] tracking-wider uppercase">
              {activeCategory.sublabel}
            </p>
          </div>

          {/* Items List with Dotted Leaders */}
          <div className="space-y-10">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-[#F5EFEB]/50 text-sm font-dm-mono">
                No provisions currently match this dietary filter in this category.
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="group">
                  {/* Top Line: Item Name ... Dotted Leader ... Price */}
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 shrink-0">
                      <h4 className="font-marcellus text-lg sm:text-xl text-[#F5EFEB] group-hover:text-[#D4A359] transition-colors">
                        {item.name}
                      </h4>
                      {item.is_signature && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-dm-mono uppercase tracking-wider text-[#D4A359] bg-[#4A1525] px-2 py-0.5 rounded border border-[#D4A359]/40">
                          <Sparkles className="w-2.5 h-2.5" />
                          Signature
                        </span>
                      )}
                    </div>

                    {/* Dotted Leader Line */}
                    <div className="grow border-b border-dotted border-[#D4A359]/30 mx-2 min-w-[24px]" />

                    {/* Minimalist Fine Dining Price */}
                    <span className="font-marcellus text-lg sm:text-xl text-[#D4A359] shrink-0 font-medium">
                      {item.price}
                    </span>
                  </div>

                  {/* Culinary Description */}
                  <p className="font-manrope text-sm text-[#F5EFEB]/75 font-light leading-relaxed mb-2.5">
                    {item.description}
                  </p>

                  {/* Provenance & Allergen Pills */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-dm-mono text-[11px] text-[#D4A359]/70 italic">
                      Provenance: {item.provenance}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.allergens.map((alg) => (
                        <span
                          key={alg}
                          className="px-1.5 py-0.5 text-[10px] font-dm-mono bg-[#14080E] text-[#F5EFEB]/70 border border-[#D4A359]/20 rounded"
                        >
                          {alg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Folio Bottom Note */}
          <div className="mt-12 pt-6 border-t border-[#D4A359]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-dm-mono text-[#F5EFEB]/50">
            <span>Discretionary service charge of 13.5% added to all bills</span>
            <span>All fish & poultry certified British sustainable provenance</span>
          </div>
        </div>

      </div>
    </section>
  );
}
