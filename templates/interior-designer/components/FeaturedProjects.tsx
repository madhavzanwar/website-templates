'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Compass, Maximize2, X, Eye } from 'lucide-react';
import { InteriorDesignerContent, PortfolioProject } from '../types';

interface FeaturedProjectsProps {
  content: InteriorDesignerContent;
}

export function FeaturedProjects({ content }: FeaturedProjectsProps) {
  const [selectedTypology, setSelectedTypology] = useState<string>('All');
  const [activeCadProject, setActiveCadProject] = useState<PortfolioProject | null>(null);

  const projects = content.portfolio_projects;

  // Extract unique typologies
  const typologies = ['All', ...Array.from(new Set(projects.map((p) => p.typology)))];

  const filteredProjects =
    selectedTypology === 'All'
      ? projects
      : projects.filter((p) => p.typology === selectedTypology);

  return (
    <section id="works" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#F3F0EA] border-t border-[#151618]/15">
      <div className="mx-auto max-w-[1720px]">
        {/* Section Header & Architectural Typology Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#151618]/15">
          <div>
            <div className="inline-flex items-center gap-2 font-space-grotesk text-xs uppercase tracking-[0.22em] text-[#0F38D9] mb-2">
              <span className="h-1.5 w-1.5 bg-[#0F38D9]" />
              <span>PORTFOLIO OF RESIDENTIAL & COMMERCIAL PROJECTS</span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-5xl font-medium tracking-tight text-[#151618]">
              Selected Architectural & Interior Projects
            </h2>
          </div>

          {/* Architectural Drawing Tab Filters */}
          <div className="flex flex-wrap gap-2">
            {typologies.map((typology) => {
              const count =
                typology === 'All'
                  ? projects.length
                  : projects.filter((p) => p.typology === typology).length;
              const isActive = selectedTypology === typology;

              return (
                <button
                  key={typology}
                  onClick={() => setSelectedTypology(typology)}
                  className={`px-4 py-2 font-space-grotesk text-xs uppercase tracking-[0.12em] transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#151618] border-[#151618] text-[#F3F0EA] shadow-md'
                      : 'bg-[#E2DDD3]/50 border-[#151618]/10 text-[#151618]/80 hover:bg-[#E2DDD3] hover:text-[#151618]'
                  }`}
                >
                  {typology} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Museum-Scale Portfolio Grid */}
        <div className="mt-12 space-y-16">
          {filteredProjects.map((project, index) => {
            const isHeroMonolith = index === 0;
            const isAsymmetricSplit = index % 2 === 1;

            if (isHeroMonolith) {
              // Full-Width Monumental Showcase
              return (
                <div
                  key={project.id}
                  className="group relative border border-[#151618]/15 bg-[#E2DDD3]/30 overflow-hidden"
                >
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-[#151618]">
                    <Image
                      src={project.images[0]?.url || content.branding.hero_image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] opacity-95"
                    />
                    
                    {/* CAD Overlay Trigger */}
                    {project.cad_elevation_url && (
                      <button
                        onClick={() => setActiveCadProject(project)}
                        className="absolute top-6 right-6 z-20 inline-flex items-center gap-2 bg-[#151618]/80 hover:bg-[#0F38D9] backdrop-blur-md px-4 py-2 text-xs font-space-grotesk text-[#F3F0EA] uppercase tracking-wider transition-colors border border-white/20"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Architectural Elevation</span>
                      </button>
                    )}

                    <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 bg-[#151618]/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-space-grotesk text-[#F3F0EA] uppercase tracking-wider border border-white/10">
                      <Compass className="h-3 w-3 text-[#0F38D9]" />
                      <span>{project.coordinates}</span>
                    </div>
                  </div>

                  {/* Project Metadata Card */}
                  <div className="p-8 sm:p-12 border-t border-[#151618]/15 bg-[#F3F0EA] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-6">
                      <span className="font-space-grotesk text-xs uppercase tracking-[0.16em] text-[#0F38D9] block mb-1">
                        {project.typology} • COMPLETED {project.completion_year}
                      </span>
                      <h3 className="font-space-grotesk text-2xl sm:text-3xl font-medium text-[#151618]">
                        {project.title}
                      </h3>
                      <p className="mt-3 font-inter-tight text-sm sm:text-base text-[#151618]/80 leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    <div className="lg:col-span-4 space-y-4">
                      <div className="font-inter-tight text-xs uppercase tracking-wider text-[#151618]/60">
                        SPECIFIED MATERIALITY
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.materials_specified.map((mat, i) => (
                          <span
                            key={i}
                            className="bg-[#E2DDD3] border border-[#151618]/10 px-2.5 py-1 font-inter-tight text-xs text-[#151618]"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs font-inter-tight text-[#151618]/70 pt-2 border-t border-[#151618]/10">
                        <strong>Scope:</strong> {project.scope}
                      </div>
                    </div>

                    <div className="lg:col-span-2 lg:text-right flex flex-col justify-between h-full">
                      <div className="font-space-grotesk text-xs uppercase tracking-wider text-[#151618]/70">
                        {project.sqft}
                      </div>
                      <a
                        href="#commission-brief"
                        className="mt-6 inline-flex items-center gap-2 text-xs font-space-grotesk uppercase tracking-wider text-[#0F38D9] hover:underline"
                      >
                        <span>Project Inquiries</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            // Asymmetric Staggered Pairs
            return (
              <div
                key={project.id}
                className="group border border-[#151618]/15 bg-[#E2DDD3]/20 grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              >
                <div
                  className={`lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#151618] ${
                    isAsymmetricSplit ? 'lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={project.images[0]?.url || content.branding.hero_image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                  
                  <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-[#151618]/80 backdrop-blur-md px-3 py-1 text-[11px] font-space-grotesk text-[#F3F0EA] uppercase tracking-wider border border-white/10">
                    <Compass className="h-3 w-3 text-[#0F38D9]" />
                    <span>{project.location}</span>
                  </div>

                  {project.cad_elevation_url && (
                    <button
                      onClick={() => setActiveCadProject(project)}
                      className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 bg-[#151618]/80 hover:bg-[#0F38D9] backdrop-blur-md px-3 py-1.5 text-xs font-space-grotesk text-[#F3F0EA] uppercase tracking-wider transition-colors border border-white/10"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span>Elevation Drawing</span>
                    </button>
                  )}
                </div>

                <div
                  className={`lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#F3F0EA] border-t lg:border-t-0 ${
                    isAsymmetricSplit ? 'lg:border-r border-[#151618]/15 lg:order-1' : 'lg:border-l border-[#151618]/15'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-space-grotesk uppercase tracking-wider text-[#0F38D9] mb-2">
                      <span>{project.typology}</span>
                      <span className="text-[#151618]/50">{project.completion_year}</span>
                    </div>

                    <h3 className="font-space-grotesk text-2xl font-medium text-[#151618] leading-tight">
                      {project.title}
                    </h3>

                    <p className="mt-4 font-inter-tight text-sm text-[#151618]/80 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#151618]/10 space-y-3">
                      <div className="text-[11px] font-space-grotesk uppercase tracking-wider text-[#151618]/60">
                        Primary Material Specifications:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.materials_specified.map((mat, i) => (
                          <span
                            key={i}
                            className="bg-[#E2DDD3] px-2.5 py-1 font-inter-tight text-xs text-[#151618]"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#151618]/10 flex items-center justify-between font-inter-tight text-xs text-[#151618]/70">
                    <span>{project.sqft} • {project.lead_architect}</span>
                    <a
                      href="#commission-brief"
                      className="text-[#0F38D9] font-medium uppercase tracking-wider hover:underline"
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CAD Elevation & Drawing Modal */}
      {activeCadProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#151618]/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn">
          <div className="relative w-full max-w-5xl bg-[#F3F0EA] border border-[#151618]/30 p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#151618]/15 pb-4 mb-6">
              <div>
                <span className="font-space-grotesk text-xs uppercase tracking-[0.20em] text-[#0F38D9]">
                  ARCHITECTURAL ELEVATION & SCHEMATIC
                </span>
                <h3 className="font-space-grotesk text-2xl font-medium text-[#151618] mt-1">
                  {activeCadProject.title}
                </h3>
                <p className="font-inter-tight text-xs text-[#151618]/70 mt-0.5">
                  {activeCadProject.location} • {activeCadProject.coordinates} • {activeCadProject.sqft}
                </p>
              </div>

              <button
                onClick={() => setActiveCadProject(null)}
                className="p-2 text-[#151618] hover:text-[#0F38D9] transition-colors"
                aria-label="Close Schematic"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#151618] border border-[#151618]/20 overflow-hidden mb-6">
              <Image
                src={activeCadProject.cad_elevation_url || activeCadProject.images[0]?.url || content.branding.hero_image}
                alt="Architectural Elevation Drawing"
                fill
                className="object-cover contrast-125"
              />
              <div className="absolute inset-0 bg-[#151618]/20 mix-blend-multiply pointer-events-none" />
              
              {/* Technical Drawing Stamps */}
              <div className="absolute bottom-4 left-4 bg-[#151618]/85 text-[#F3F0EA] p-3 text-[11px] font-space-grotesk space-y-0.5">
                <div>SCALE: 1:50 METRIC</div>
                <div>TOLERANCE: ±2.5MM</div>
                <div>LEAD: {activeCadProject.lead_architect}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#E2DDD3]/50 border border-[#151618]/10 text-xs font-inter-tight">
              <div>
                <span className="font-semibold text-[#151618] block uppercase text-[10px] font-space-grotesk">Scope Of Work:</span>
                <span className="text-[#151618]/80">{activeCadProject.scope}</span>
              </div>
              <div>
                <span className="font-semibold text-[#151618] block uppercase text-[10px] font-space-grotesk">Highlight Metric:</span>
                <span className="text-[#151618]/80">{activeCadProject.highlight_metric}</span>
              </div>
              <div>
                <span className="font-semibold text-[#151618] block uppercase text-[10px] font-space-grotesk">Drawing Reference:</span>
                <span className="text-[#0F38D9] font-mono">DWG-PUNE-{activeCadProject.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveCadProject(null)}
                className="px-6 py-2.5 bg-[#151618] text-[#F3F0EA] font-space-grotesk text-xs uppercase tracking-wider hover:bg-[#0F38D9] transition-colors"
              >
                Close Drawing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
