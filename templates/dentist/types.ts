export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  iconName: string;
}

export interface TrustReason {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualifications: string;
}

export interface Transformation {
  id: string;
  treatmentName: string;
  description: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  review: string;
}

export interface PricingItem {
  id: string;
  service: string;
  price: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapLink: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}

export interface DentistContent {
  businessName: string;
  tagline: string;
  hero: {
    headline: string;
    subheadline: string;
    badges: string[];
  };
  navLinks: NavLink[];
  services: Service[];
  whyChooseUs: TrustReason[];
  doctors: Doctor[];
  transformations: Transformation[];
  testimonials: Testimonial[];
  pricing: PricingItem[];
  contact: ContactInfo;
}
