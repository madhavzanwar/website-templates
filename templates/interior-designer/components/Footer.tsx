'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Compass, Mail, Phone } from 'lucide-react';
import { InteriorDesignerContent } from '../types';

interface FooterProps {
  content: InteriorDesignerContent;
}

export function Footer({ content }: FooterProps) {
  const { branding, contact, portfolio_projects } = content;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#151618] text-[#F3F0EA] pt-24 pb-16 px-4 sm:px-6 lg:px-12 border-t border-[#151618]">
      <div className="mx-auto max-w-[1720px]">
        
        {/* Massive Architectural Monogram Header */}
        <div className="border-b border-white/10 pb-16 mb-16 overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="font-space-grotesk text-xs uppercase tracking-[0.25em] text-[#0F38D9] font-semibold mb-3">
                ARCHITECTURE & INTERIOR DESIGN • PUNE & MUMBAI
              </div>
              <h2 className="font-space-grotesk text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-[-0.04em] text-[#F3F0EA] leading-none uppercase">
                {branding.monogram}
              </h2>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-space-grotesk uppercase tracking-wider text-[#F3F0EA]/70 hover:text-white transition-colors group self-start lg:self-end"
            >
              <span>Return to Top</span>
              <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1 text-[#0F38D9]" />
            </button>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10 font-inter-tight text-sm">
          
          {/* Col 1: Selected Works Archive */}
          <div>
            <h3 className="font-space-grotesk text-xs uppercase tracking-[0.18em] text-[#0F38D9] font-bold mb-4">
              PORTFOLIO
            </h3>
            <ul className="space-y-2.5 text-[#F3F0EA]/70">
              {portfolio_projects.map((proj) => (
                <li key={proj.id}>
                  <a href="#works" className="hover:text-white transition-colors">
                    {proj.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Studio & Press */}
          <div>
            <h3 className="font-space-grotesk text-xs uppercase tracking-[0.18em] text-[#0F38D9] font-bold mb-4">
              STUDIO & ABOUT
            </h3>
            <ul className="space-y-2.5 text-[#F3F0EA]/70">
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">
                  Design Approach & Philosophy
                </a>
              </li>
              <li>
                <a href="#atelier" className="hover:text-white transition-colors">
                  Architectural Digest India Feature
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-white transition-colors">
                  Before & After Transformations
                </a>
              </li>
              <li>
                <a href="#commission-brief" className="hover:text-white transition-colors">
                  Book an In-Person Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Materials & Regional Craft */}
          <div>
            <h3 className="font-space-grotesk text-xs uppercase tracking-[0.18em] text-[#0F38D9] font-bold mb-4">
              NATURAL MATERIALS
            </h3>
            <ul className="space-y-2.5 text-[#F3F0EA]/70">
              <li>
                <span className="text-white">Makrana Marble</span> — Rajasthan
              </li>
              <li>
                <span className="text-white">Nilambur Teak</span> — Seasoned Wood
              </li>
              <li>
                <span className="text-white">Pune Black Basalt</span> — Sahyadri Stone
              </li>
              <li>
                <span className="text-white">Kota Stone</span> — Natural Lime Slabs
              </li>
              <li>
                <span className="text-white">Handloom Textiles</span> — Maheshwar
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Coordinates & Operating Hours */}
          <div className="space-y-6">
            <div>
              <h3 className="font-space-grotesk text-xs uppercase tracking-[0.18em] text-[#0F38D9] font-bold mb-4">
                STUDIO HOURS & VISITS
              </h3>
              
              {/* Studio Hours Card */}
              <div className="space-y-3 bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-[#0F38D9]" />
                    <span className="font-space-grotesk uppercase">STUDIO HOURS</span>
                  </div>
                  <span className="font-mono text-xs text-white font-medium">
                    10:00 AM – 7:00 PM IST
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Compass className="h-3.5 w-3.5 text-[#0F38D9]" />
                    <span className="font-space-grotesk uppercase">DAYS</span>
                  </div>
                  <span className="font-mono text-xs text-white font-medium">
                    Mon – Sat (By Appt)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#F3F0EA]/70 space-y-1 pt-2">
              <div className="font-medium text-white">Pune Studio:</div>
              <div className="text-[11px] opacity-75">
                {contact.headquarters_address}
              </div>
              <div className="font-medium text-white pt-2">Mumbai Studio:</div>
              <div className="text-[11px] opacity-75">
                {contact.european_address}
              </div>
            </div>
          </div>

        </div>

        {/* Sub-Footer Copyright & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-inter-tight text-xs text-[#F3F0EA]/50">
          <div>
            © {new Date().getFullYear()} {branding.business_name}. All rights reserved. Architectural blueprints and photography are proprietary archives.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy & Discretion Protocol</span>
            <span className="hover:text-white cursor-pointer transition-colors">BIM Specifications</span>
            <a href={`https://instagram.com`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F38D9] transition-colors">
              {contact.instagram_handle}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
