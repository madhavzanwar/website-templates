import fs from 'fs'
import path from 'path'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import DoctorSection from './components/DoctorSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import BookingSection from './components/BookingSection'
import Footer from './components/Footer'
import { DentistContent } from './types'

interface DentistPageProps {
  customContent?: Partial<DentistContent>;
}

function getDefaultContent(): DentistContent {
  try {
    const filePath = path.join(process.cwd(), 'templates', 'dentist', 'content.json')
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch {
    const fallbackPath = path.join(process.cwd(), 'templates', 'dentist', 'fallback_content.json')
    return JSON.parse(fs.readFileSync(fallbackPath, 'utf8'))
  }
}

export default function DentistTemplate({ customContent }: DentistPageProps = {}) {
  const defaultContent = getDefaultContent()
  const content: DentistContent = customContent
    ? { ...defaultContent, ...customContent }
    : defaultContent

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar businessName={content.businessName} navLinks={content.navLinks} phone={content.contact.phone} />
      <main>
        <Hero content={content} />
        <ServicesSection services={content.services} />
        <DoctorSection doctors={content.doctors} />
        <TestimonialsSection testimonials={content.testimonials} />
        <PricingSection pricing={content.pricing} />
        <BookingSection contact={content.contact} />
      </main>
      <Footer content={content} />
    </div>
  )
}
