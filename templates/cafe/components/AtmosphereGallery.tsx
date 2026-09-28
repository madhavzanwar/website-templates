'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CafeContent } from '../types';
import { Volume2, VolumeX, Sparkles, Camera, Play, Pause } from 'lucide-react';

interface AtmosphereGalleryProps {
  content: CafeContent;
}

export function AtmosphereGallery({ content }: AtmosphereGalleryProps) {
  const { atmosphere_gallery } = content;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Soft ambient coffeehouse frequency synthesizer via Web Audio API (safe, no external mp3 needed)
  const toggleAmbientAudio = () => {
    if (isPlayingAudio) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Create warm low-frequency ambient room tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm harmonic

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;

        setIsPlayingAudio(true);
      } catch (err) {
        console.warn('AudioContext not allowed or not supported yet', err);
        setIsPlayingAudio(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="gallery" className="bg-[#F7F4EE] py-20 lg:py-28 border-b border-[#231B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Ambience Audio Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A5844]/10 border border-[#4A5844]/30 text-[#4A5844] font-mono text-[11px] uppercase tracking-widest rounded-sm mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>{atmosphere_gallery.badge}</span>
            </div>

            <h2 className="font-artisanal text-3xl sm:text-5xl font-bold text-[#231B16] tracking-tight leading-tight">
              {atmosphere_gallery.title}
            </h2>

            <p className="mt-4 font-humanist text-base sm:text-lg text-[#231B16]/80 leading-relaxed">
              {atmosphere_gallery.subtitle}
            </p>
          </div>

          {/* Micro-Delight: Ambient Sound Pill */}
          <div className="self-start md:self-auto">
            <button
              onClick={toggleAmbientAudio}
              className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all cursor-pointer shadow-sm ${
                isPlayingAudio
                  ? 'bg-[#231B16] text-[#D99B4B] border-[#D99B4B]'
                  : 'bg-[#EDE6DA] text-[#231B16] border-[#231B16]/20 hover:bg-[#E5DFC5]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#D99B4B] animate-pulse" />
                  <span className="font-mono text-xs font-semibold">
                    Playing: 42 dB Room Ambience
                  </span>
                  {/* Mini animated equalizer bars */}
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-[#D99B4B] animate-pulse"></span>
                    <span className="w-0.5 h-2 bg-[#D99B4B] animate-pulse delay-75"></span>
                    <span className="w-0.5 h-3 bg-[#D99B4B] animate-pulse delay-150"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#B85D38]" />
                  <span className="font-mono text-xs font-semibold">
                    {atmosphere_gallery.ambience_audio_label}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editorial Masonry / Polaroid Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {atmosphere_gallery.images.map((item, idx) => (
            <div
              key={idx}
              className={`group bg-[#FFFDF9] border border-[#231B16]/15 p-3 sm:p-4 rounded-sm shadow-sm hover:shadow-xl hover:border-[#B85D38]/40 transition-all flex flex-col justify-between ${
                idx === 0 || idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Photo Area */}
              <div className="relative overflow-hidden rounded-xs bg-[#231B16] aspect-4/3 sm:aspect-square">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Micro Tag Overlay */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#231B16]/75 backdrop-blur-xs text-[#F7F4EE] font-mono text-[9px] uppercase tracking-wider font-semibold rounded-xs">
                  {item.tag}
                </div>
              </div>

              {/* Polaroid-Style Handwritten / Editorial Caption */}
              <div className="mt-4 px-1 pb-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-artisanal text-base sm:text-lg font-bold text-[#231B16]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1 font-humanist text-xs text-[#231B16]/75 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
