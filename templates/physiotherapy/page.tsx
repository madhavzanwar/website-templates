import React from 'react';
import fs from 'fs';
import path from 'path';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConditionsTreated from './components/ConditionsTreated';
import RecoveryProcess from './components/RecoveryProcess';
import TherapistSection from './components/TherapistSection';
import PatientStories from './components/PatientStories';
import PricingSection from './components/PricingSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

interface PhysiotherapyPageProps {
  customContent?: Record<string, any>;
}

function getDefaultContent(): Record<string, any> {
  try {
    const filePath = path.join(process.cwd(), 'templates', 'physiotherapy', 'content.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    const fallbackPath = path.join(process.cwd(), 'templates', 'physiotherapy', 'fallback_content.json');
    return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'));
  }
}

export default function PhysiotherapyTemplate({ customContent }: PhysiotherapyPageProps = {}) {
  const defaultContent = getDefaultContent();
  const content = customContent ? { ...defaultContent, ...customContent } : defaultContent;

  return (
    <div className="font-nunito bg-[#F5F0E8] text-[#0F241C] min-h-screen">
      <Navbar content={content} />
      <Hero content={content} />
      <ConditionsTreated content={content} />
      <RecoveryProcess content={content} />
      <TherapistSection content={content} />
      <PatientStories content={content} />
      <PricingSection content={content} />
      <BookingSection content={content} />
      <Footer content={content} />
    </div>
  );
}
