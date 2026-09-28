import React from 'react';
import fs from 'fs';
import path from 'path';
import { RealEstateContent } from './types';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import LocalityGuide from './components/LocalityGuide';
import WhyChooseUs from './components/WhyChooseUs';
import AgentSection from './components/AgentSection';
import TestimonialsSection from './components/TestimonialsSection';
import EMICalculator from './components/EMICalculator';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function getContent(): RealEstateContent {
  try {
    const filePath = path.join(process.cwd(), 'templates/real-estate/content.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const fallbackPath = path.join(process.cwd(), 'templates/real-estate/fallback_content.json');
    const data = fs.readFileSync(fallbackPath, 'utf8');
    return JSON.parse(data);
  }
}

interface RealEstatePageProps {
  customContent?: Partial<RealEstateContent>;
}

export default function RealEstateTemplate({ customContent }: RealEstatePageProps = {}) {
  const defaultContent = getContent();
  const content: RealEstateContent = customContent
    ? { ...defaultContent, ...customContent }
    : defaultContent;


  return (
    <main className="min-h-screen bg-white">
      <Navbar businessName={content.businessName} mahaReraNumber={content.mahaReraNumber} navLinks={content.navLinks} />
      <Hero {...content.hero} />
      <FeaturedProperties {...content.featuredProperties} />
      <LocalityGuide {...content.localityGuide} />
      <WhyChooseUs {...content.whyChooseUs} />
      <AgentSection {...content.agents} />
      <TestimonialsSection {...content.testimonials} />
      <EMICalculator {...content.emiCalculator} />
      <ContactSection {...content.contact} />
      <Footer {...content.footer} />
    </main>
  );
}
