'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Compass, MoveHorizontal, Info, X } from 'lucide-react';
import { InteriorDesignerContent, InspectionPin } from '../types';

interface BeforeAfterSliderProps {
  content: InteriorDesignerContent;
}

export function BeforeAfterSlider({ content }: BeforeAfterSliderProps) {
  const data = content.before_after_renovation;
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePin, setActivePin] = useState<InspectionPin | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="before-after" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#E2DDD3]/30 border-t border-[#151618]/15">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header */}
        <div className="pb-12 border-b border-[#151618]/15 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="font-space-grotesk text-xs font-semibold tracking-[0.22em] uppercase text-[#0F38D9] block mb-2">
                BEFORE & AFTER TRANSFORMATION
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618]">
                {data.project_title}
              </h2>
              <div className="font-inter-tight text-xs uppercase tracking-wider text-[#151618]/60 mt-2">
                {data.subtitle} • {data.location}
              </div>
            </div>

            <p className="font-inter-tight text-sm sm:text-base text-[#151618]/80 max-w-xl leading-relaxed">
              {data.narrative}
            </p>
          </div>
        </div>

        {/* Interactive Split Slider Container */}
        <div className="relative border border-[#151618]/20 bg-[#151618] shadow-2xl select-none overflow-hidden">
          
          <div
            ref={containerRef}
            className="relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden cursor-ew-resize"
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* 1. AFTER — Restored Heritage Interior (right side) */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Warm restored heritage interior — warm plaster walls, teak, natural light */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #C4A882 0%, #E8D5B5 25%, #F5ECD8 45%, #D4B896 60%, #B89A72 80%, #8A6F52 100%)'
              }}>
                {/* Architectural elements layered as CSS */}
                {/* Floor — Kota Stone */}
                <div className="absolute bottom-0 left-0 right-0 h-[28%]" style={{
                  background: 'linear-gradient(180deg, #C8B49A 0%, #B8A286 50%, #A8906E 100%)',
                  borderTop: '1px solid rgba(255,255,255,0.3)'
                }} />
                {/* Floor grout lines */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="absolute bottom-0 h-[28%]" style={{
                    left: `${i * 12.5}%`, width: '1px',
                    background: 'rgba(139,115,90,0.4)'
                  }} />
                ))}
                {/* Wall — warm Makrana plaster */}
                <div className="absolute top-0 left-0 right-0 h-[72%]" style={{
                  background: 'linear-gradient(180deg, #E8D5B5 0%, #DFC9A4 60%, #CDB990 100%)'
                }} />
                {/* Teak dado rail */}
                <div className="absolute left-0 right-0 h-[3px]" style={{
                  bottom: '28%',
                  background: 'linear-gradient(90deg, #8B5E3C, #A67C52, #8B5E3C)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }} />
                {/* Arch window — natural light pour */}
                <div className="absolute top-[8%] left-[15%] w-[24%]" style={{ height: '52%' }}>
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(255,230,160,0.9) 0%, rgba(255,210,120,0.6) 40%, rgba(200,160,80,0.2) 100%)',
                    borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
                    border: '3px solid rgba(139,90,45,0.6)',
                    boxShadow: '0 0 60px rgba(255,200,80,0.4), inset 0 0 40px rgba(255,220,120,0.3)'
                  }} />
                </div>
                {/* Second arch window */}
                <div className="absolute top-[8%] right-[12%] w-[20%]" style={{ height: '46%' }}>
                  <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 100%, rgba(255,230,160,0.7) 0%, rgba(200,170,100,0.3) 70%, transparent 100%)',
                    borderRadius: '50% 50% 0 0 / 60% 60% 0 0',
                    border: '3px solid rgba(139,90,45,0.5)'
                  }} />
                </div>
                {/* Teak door frame */}
                <div className="absolute top-[20%] right-[30%] w-[10%] h-[52%]" style={{
                  background: 'linear-gradient(180deg, #6B4226 0%, #8B5E3C 30%, #7A5030 70%, #5C3D22 100%)',
                  border: '2px solid rgba(90,55,25,0.6)',
                  borderRadius: '4px 4px 0 0'
                }}>
                  <div className="absolute top-[10%] left-[20%] right-[20%] h-[35%] border border-yellow-900/30 rounded-sm" />
                  <div className="absolute bottom-[15%] left-[20%] right-[20%] h-[35%] border border-yellow-900/30 rounded-sm" />
                  <div className="absolute top-1/2 left-[75%] w-[10px] h-[10px] rounded-full" style={{ background: '#C9A84C', transform: 'translateY(-50%)' }} />
                </div>
                {/* Handloom textile wall art */}
                <div className="absolute top-[15%] left-[48%] w-[16%] h-[30%]" style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #CD853F 50%, #8B4513 75%, #6B3410 100%)',
                  border: '4px solid #C9A84C',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute w-full h-[2px]" style={{
                      top: `${i * 16 + 8}%`,
                      background: i % 2 === 0 ? 'rgba(255,200,100,0.4)' : 'rgba(139,80,30,0.4)'
                    }} />
                  ))}
                </div>
                {/* Ambient shadow at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[8%]" style={{
                  background: 'linear-gradient(180deg, transparent, rgba(80,50,20,0.3))'
                }} />
              </div>
              {/* After Label Badge */}
              <div className="absolute top-6 right-6 z-10 bg-[#151618]/80 backdrop-blur-md px-4 py-2 border border-white/20 text-[#F3F0EA] font-space-grotesk text-xs tracking-wider uppercase pointer-events-none">
                <span className="inline-block h-2 w-2 rounded-full bg-[#0F38D9] mr-2" />
                {data.after_label}
              </div>
            </div>

            {/* 2. BEFORE — Dilapidated Original Structure (clipped left side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              {/* Dark, neglected old structure — peeling plaster, cracked floor, bare walls */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, #4A4035 0%, #5C5245 25%, #6B6050 45%, #504540 60%, #3D3530 80%, #2E2820 100%)'
              }}>
                {/* Old cracked floor */}
                <div className="absolute bottom-0 left-0 right-0 h-[28%]" style={{
                  background: 'linear-gradient(180deg, #5C5040 0%, #484035 50%, #3A3028 100%)',
                  borderTop: '1px solid rgba(100,80,60,0.4)'
                }} />
                {/* Crack lines on floor */}
                {[0.2, 0.5, 0.7].map((left, i) => (
                  <div key={i} className="absolute bottom-0 h-[28%] w-[1px]" style={{
                    left: `${left * 100}%`,
                    background: 'rgba(0,0,0,0.5)',
                    transform: `rotate(${(i - 1) * 3}deg)`
                  }} />
                ))}
                {/* Old bare wall */}
                <div className="absolute top-0 left-0 right-0 h-[72%]" style={{
                  background: 'linear-gradient(180deg, #5A5045 0%, #4E4438 50%, #3E342C 100%)'
                }} />
                {/* Peeling plaster patches */}
                <div className="absolute top-[25%] left-[10%] w-[20%] h-[18%] rounded-sm" style={{
                  background: 'rgba(80,65,50,0.6)',
                  border: '1px solid rgba(60,45,30,0.4)'
                }} />
                <div className="absolute top-[40%] left-[55%] w-[15%] h-[12%] rounded-sm" style={{
                  background: 'rgba(70,55,40,0.5)'
                }} />
                {/* Dark cracked window opening */}
                <div className="absolute top-[10%] left-[18%] w-[22%]" style={{ height: '45%' }}>
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(180deg, #1A1510 0%, #2A2018 50%, #1A1510 100%)',
                    borderRadius: '50% 50% 0 0 / 55% 55% 0 0',
                    border: '3px solid rgba(60,45,30,0.6)'
                  }} />
                </div>
                {/* Damp stain on wall */}
                <div className="absolute top-[15%] right-[20%] w-[18%] h-[25%]" style={{
                  background: 'radial-gradient(ellipse, rgba(30,20,10,0.5) 0%, transparent 70%)',
                  borderRadius: '60% 40% 70% 30%'
                }} />
                {/* Broken door frame */}
                <div className="absolute top-[28%] right-[28%] w-[9%] h-[44%]" style={{
                  background: 'linear-gradient(180deg, #2A1F12 0%, #3A2A18 50%, #2A1F12 100%)',
                  border: '2px solid rgba(40,30,20,0.8)'
                }}>
                  <div className="absolute top-[30%] left-[10%] right-[10%] h-[40%]" style={{
                    background: 'rgba(15,10,5,0.4)',
                    border: '1px solid rgba(30,20,10,0.3)'
                  }} />
                </div>
                {/* Ambient darkness */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 30% 30%, transparent 30%, rgba(0,0,0,0.4) 100%)'
                }} />
              </div>
              {/* Before Label Badge */}
              <div className="absolute top-6 left-6 z-10 bg-[#151618]/80 backdrop-blur-md px-4 py-2 border border-white/20 text-[#F3F0EA] font-space-grotesk text-xs tracking-wider uppercase pointer-events-none">
                <span className="inline-block h-2 w-2 rounded-full bg-red-400 mr-2" />
                {data.before_label}
              </div>
            </div>

            {/* 3. Coordinate Inspection Pins */}
            {data.pins.map((pin) => (
              <button
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(activePin?.id === pin.id ? null : pin);
                }}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                aria-label={`Inspect ${pin.title}`}
              >
                <div className="relative flex items-center justify-center">
                  <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#0F38D9] text-[#F3F0EA] border-2 border-white shadow-lg transition-transform group-hover:scale-110">
                    <Info className="h-3.5 w-3.5" />
                  </div>
                </div>
              </button>
            ))}

            {/* 4. Draggable Hairline Divider & Yves Klein Cobalt Circular Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 -translate-x-1/2 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Hairline 1px Vertical Border */}
              <div className="w-[1.5px] h-full bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)]" />

              {/* Cobalt Circular Drag Handle */}
              <div
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-[#0F38D9] text-white border-2 border-white shadow-[0_4px_20px_rgba(15,56,217,0.5)] cursor-grab active:cursor-grabbing pointer-events-auto hover:scale-105 transition-transform"
              >
                <MoveHorizontal className="h-5 w-5" />
              </div>
            </div>

          </div>

          {/* Active Coordinate Inspection Callout Drawer */}
          {activePin && (
            <div className="p-6 bg-[#151618] text-[#F3F0EA] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-[#0F38D9] text-white shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-space-grotesk text-xs uppercase tracking-[0.16em] text-[#0F38D9] font-bold">
                      {activePin.category}
                    </span>
                    <span className="text-[11px] font-mono text-white/50">
                      KEY ARCHITECTURAL DETAIL
                    </span>
                  </div>
                  <h4 className="font-space-grotesk text-lg font-medium text-white mt-0.5">
                    {activePin.title}
                  </h4>
                  <p className="font-inter-tight text-sm text-[#F3F0EA]/80 mt-1 max-w-3xl leading-relaxed">
                    {activePin.detail}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActivePin(null)}
                className="self-end sm:self-center p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close pin inspection"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Bottom Scrub Instructions & Metrics */}
          <div className="px-6 py-4 bg-[#F3F0EA] border-t border-[#151618]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-inter-tight text-[#151618]">
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-semibold uppercase text-[#0F38D9]">
                HOW TO COMPARE:
              </span>
              <span className="text-[#151618]/70">
                Drag the circular cobalt slider horizontally to compare the original raw space with the completed architectural transformation.
              </span>
            </div>

            <div className="flex items-center gap-6 font-space-grotesk text-[11px] uppercase tracking-wider text-[#151618]/70">
              <span>VIEW RATIO: {Math.round(sliderPos)}% / {100 - Math.round(sliderPos)}%</span>
              <button
                onClick={() => setSliderPos(50)}
                className="text-[#0F38D9] hover:underline uppercase font-bold"
              >
                Reset Split (50/50)
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
