'use client';

import React, { useState } from 'react';
import { CafeContent } from '../types';
import { Sliders, Droplets, Thermometer, Clock, Scale, Lightbulb, Compass, Sparkles } from 'lucide-react';

interface BrewCalculatorSectionProps {
  content: CafeContent;
}

export function BrewCalculatorSection({ content }: BrewCalculatorSectionProps) {
  const { brew_calculator } = content;
  const [selectedMethodId, setSelectedMethodId] = useState<string>(brew_calculator.default_method);
  const [coffeeGrams, setCoffeeGrams] = useState<number>(brew_calculator.default_coffee_grams);

  const currentMethod =
    brew_calculator.methods.find((m) => m.id === selectedMethodId) ||
    brew_calculator.methods[0];

  // Calculate total water weight
  const waterWeightGrams = Math.round(coffeeGrams * currentMethod.default_ratio);
  
  // Calculate yield (approx 2g absorbed per gram of dry coffee)
  const beverageYieldGrams = Math.max(0, waterWeightGrams - Math.round(coffeeGrams * 2.1));
  const cupsEstimate = (beverageYieldGrams / 180).toFixed(1);

  return (
    <section id="calculator" className="bg-[#FAF7F2] py-20 lg:py-28 border-b border-[#231B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D99B4B]/15 border border-[#D99B4B]/40 text-[#231B16] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
            <Sliders className="w-3.5 h-3.5 text-[#B85D38]" />
            <span>{brew_calculator.badge}</span>
          </div>

          <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-tight">
            {brew_calculator.title}
          </h2>

          <p className="mt-4 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
            {brew_calculator.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="mt-14 bg-[#FFFDF9] border-2 border-[#231B16]/15 rounded-md p-6 sm:p-10 shadow-lg">
          
          {/* 1. Select Brewing Device */}
          <div>
            <label className="font-mono text-xs uppercase tracking-wider text-[#231B16]/60 font-bold block mb-3">
              Step 1: Choose Your Brewing Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {brew_calculator.methods.map((method) => {
                const isSelected = selectedMethodId === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethodId(method.id)}
                    className={`p-4 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#B85D38] bg-[#EDE6DA] shadow-sm'
                        : 'border-[#231B16]/15 bg-white hover:border-[#231B16]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-artisanal text-base sm:text-lg font-bold text-[#231B16]">
                          {method.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#B85D38]"></span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-semibold text-[#B85D38]">
                        Ratio {method.ratio_display}
                      </span>
                    </div>
                    <span className="font-humanist text-xs text-[#231B16]/60 mt-3 line-clamp-1">
                      {method.grind_size}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Dry Coffee Dose Slider */}
          <div className="mt-10 pt-8 border-t border-[#231B16]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-[#231B16]/60 font-bold block">
                  Step 2: Choose Coffee Amount (Grams)
                </label>
                <p className="font-humanist text-xs text-[#231B16]/70 mt-0.5">
                  Adjust based on single cup, shared carafe, or brewer capacity.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCoffeeGrams((prev) => Math.max(brew_calculator.min_grams, prev - 1))}
                  className="w-8 h-8 rounded-sm border border-[#231B16]/20 bg-[#EDE6DA] font-mono font-bold text-[#231B16] hover:bg-[#231B16] hover:text-white transition-colors"
                >
                  -
                </button>
                <div className="font-mono text-2xl font-bold text-[#231B16] min-w-16 text-center">
                  {coffeeGrams}g
                </div>
                <button
                  onClick={() => setCoffeeGrams((prev) => Math.min(brew_calculator.max_grams, prev + 1))}
                  className="w-8 h-8 rounded-sm border border-[#231B16]/20 bg-[#EDE6DA] font-mono font-bold text-[#231B16] hover:bg-[#231B16] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Range Slider */}
            <div className="relative py-2">
              <input
                type="range"
                min={brew_calculator.min_grams}
                max={brew_calculator.max_grams}
                step={brew_calculator.step_grams}
                value={coffeeGrams}
                onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                className="w-full h-2 bg-[#EDE6DA] rounded-lg appearance-none cursor-pointer accent-[#B85D38]"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#231B16]/50 mt-2">
                <span>Min: {brew_calculator.min_grams}g (Solo Cup)</span>
                <span>Standard: 18g</span>
                <span>Max: {brew_calculator.max_grams}g (Big Batch)</span>
              </div>
            </div>
          </div>

          {/* 3. Your Brewing Recipe */}
          <div className="mt-10 bg-[#231B16] text-[#F7F4EE] rounded-sm p-6 sm:p-8 border border-[#3D3028]">
            <div className="font-mono text-xs text-[#D99B4B] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
              <Scale className="w-4 h-4" />
              <span>YOUR BREWING RECIPE</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Metric 1: Water Required */}
              <div className="border-l-2 border-[#B85D38] pl-4">
                <div className="flex items-center gap-1.5 font-humanist text-xs text-[#EDE6DA]/70">
                  <Droplets className="w-3.5 h-3.5 text-[#D99B4B]" />
                  <span>Total Water</span>
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
                  {waterWeightGrams}g
                </div>
                <div className="font-mono text-[10px] text-[#EDE6DA]/50 mt-0.5">
                  (~{waterWeightGrams} ml / {cupsEstimate} cups)
                </div>
              </div>

              {/* Metric 2: Water Temperature */}
              <div className="border-l-2 border-[#D99B4B] pl-4">
                <div className="flex items-center gap-1.5 font-humanist text-xs text-[#EDE6DA]/70">
                  <Thermometer className="w-3.5 h-3.5 text-[#D99B4B]" />
                  <span>Kettle Temp</span>
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
                  {currentMethod.water_temp.split(' ')[0]}
                </div>
                <div className="font-mono text-[10px] text-[#EDE6DA]/50 mt-0.5">
                  {currentMethod.water_temp.split(' ')[1] || 'Target Temp'}
                </div>
              </div>

              {/* Metric 3: Grind Size */}
              <div className="border-l-2 border-[#4A5844] pl-4">
                <div className="flex items-center gap-1.5 font-humanist text-xs text-[#EDE6DA]/70">
                  <Sliders className="w-3.5 h-3.5 text-[#D99B4B]" />
                  <span>Grind Size</span>
                </div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentMethod.grind_size}
                </div>
                <div className="font-mono text-[10px] text-[#EDE6DA]/50 mt-0.5">
                  {currentMethod.grind_microns}
                </div>
              </div>

              {/* Metric 4: Brew Time */}
              <div className="border-l-2 border-[#EDE6DA]/40 pl-4">
                <div className="flex items-center gap-1.5 font-humanist text-xs text-[#EDE6DA]/70">
                  <Clock className="w-3.5 h-3.5 text-[#D99B4B]" />
                  <span>Total Time</span>
                </div>
                <div className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
                  {currentMethod.brew_time}
                </div>
                <div className="font-mono text-[10px] text-[#EDE6DA]/50 mt-0.5">
                  Drawdown Target
                </div>
              </div>

            </div>
          </div>

          {/* 4. Step-By-Step Pour Breakdown Stages */}
          <div className="mt-8">
            <h3 className="font-artisanal text-lg font-bold text-[#231B16] mb-4">
              Step-By-Step Pour Progression
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentMethod.steps.map((step, idx) => {
                const stageWaterGrams = step.water_pct > 0 ? Math.round((waterWeightGrams * step.water_pct) / 100) : null;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#EDE6DA]/40 border border-[#231B16]/10 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                        <span className="text-[#B85D38]">{step.time}</span>
                        {stageWaterGrams && (
                          <span className="px-2 py-0.5 bg-[#FFFDF9] rounded-xs border border-[#231B16]/10 text-[#231B16]">
                            +{stageWaterGrams}g
                          </span>
                        )}
                      </div>
                      <div className="font-artisanal font-bold text-base text-[#231B16]">
                        {step.action}
                      </div>
                      <p className="mt-2 font-humanist text-xs text-[#231B16]/75 leading-relaxed">
                        {step.tip}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pro Tips Footer */}
          <div className="mt-8 pt-6 border-t border-[#231B16]/10 bg-[#EDE6DA]/30 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-2 rounded-sm bg-[#B85D38] text-white shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="text-xs font-humanist text-[#231B16]/80 space-y-1">
              {brew_calculator.tips.map((tip, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="text-[#B85D38] font-mono font-bold">✦</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
