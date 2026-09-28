export interface NavLink {
  label: string;
  href: string;
}

export interface TrustStat {
  value: string;
  label: string;
  detail: string;
}

export interface Property {
  id: string;
  title: string;
  locality: string;
  bhk: string;
  price: string;
  priceInLakhs: number;
  carpetArea: string;
  possession: string;
  reraId: string;
  propertyType: string;
  highlights: string[];
  badge: string;
  gradientTheme: string;
}

export interface Locality {
  id: string;
  name: string;
  tagline: string;
  averagePriceSqFt: string;
  commuteHighlights: string;
  description: string;
  lifestyleTags: string[];
}

export interface TrustPillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  experience: string;
  reraNumber: string;
  speciality: string;
  languages: string[];
  phone: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrCompany: string;
  propertyPurchased: string;
  locality: string;
  quote: string;
  rating: number;
  verifiedBadge: string;
}

export interface BankPartner {
  name: string;
  rateFrom: string;
}

export interface EMICalculatorData {
  title: string;
  subtitle: string;
  defaultAmount: number;
  defaultTenure: number;
  defaultRate: number;
  bankPartners: BankPartner[];
  advisoryNote: string;
}

export interface OfficeAddress {
  building: string;
  area: string;
  city: string;
  pincode: string;
  landmark: string;
}

export interface ContactData {
  title: string;
  subtitle: string;
  officeAddress: OfficeAddress;
  phone: string;
  secondaryPhone: string;
  whatsapp: string;
  email: string;
  hours: string;
  bookingTokenNote: string;
}

export interface FooterData {
  disclaimer: string;
  mahaReraText: string;
  mahaReraNumber: string;
  reraPortalUrl: string;
  quickLinks: NavLink[];
  puneMicroMarkets: string[];
  copyright: string;
}

export interface RealEstateContent {
  businessName: string;
  tagline: string;
  mahaReraNumber: string;
  navLinks: NavLink[];
  hero: {
    headline: string;
    subheadline: string;
    localityOptions: string[];
    budgetOptions: string[];
    bhkOptions: string[];
    propertyTypeOptions: string[];
    stats: TrustStat[];
  };
  featuredProperties: {
    title: string;
    subtitle: string;
    filterCategories: string[];
    properties: Property[];
  };
  localityGuide: {
    title: string;
    subtitle: string;
    localities: Locality[];
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    pillars: TrustPillar[];
  };
  agents: {
    title: string;
    subtitle: string;
    team: Agent[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  emiCalculator: EMICalculatorData;
  contact: ContactData;
  footer: FooterData;
}
