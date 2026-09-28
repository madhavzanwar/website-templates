export interface LocationInfo {
  locality: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  fullAddress: string;
  nearBy: string;
  parking: string;
}

export interface ContactInfo {
  phone: string;
  alternatePhone: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  whatsappPrefillMessage: string;
  email: string;
  emergencyPhone: string;
}

export interface HoursInfo {
  weekdays: string;
  sunday: string;
  note: string;
}

export interface PaymentInfo {
  methods: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TrustStat {
  value: string;
  label: string;
  sublabel: string;
}

export interface HeroInfo {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  trustStats: TrustStat[];
  highlights: string[];
}

export interface ConditionItem {
  id: string;
  category: string;
  title: string;
  tag: string;
  icon: string;
  summary: string;
  commonCauses: string[];
  treatmentFocus: string;
  timeline: string;
}

export interface ConditionsSectionInfo {
  title: string;
  subtitle: string;
  categories: string[];
  conditions: ConditionItem[];
}

export interface TreatmentStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  duration: string;
}

export interface TreatmentApproachInfo {
  title: string;
  subtitle: string;
  steps: TreatmentStep[];
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experienceYears: string;
  bio: string;
  specialties: string[];
  languages: string;
  initials: string;
}

export interface TherapistSectionInfo {
  title: string;
  subtitle: string;
  team: Therapist[];
}

export interface EquipmentModal {
  id: string;
  name: string;
  clinicalPurpose: string;
  description: string;
  benefits: string[];
  icon: string;
}

export interface EquipmentSectionInfo {
  title: string;
  subtitle: string;
  equipment: EquipmentModal[];
}

export interface PatientStory {
  id: string;
  patientName: string;
  profession: string;
  location: string;
  condition: string;
  therapist: string;
  recoveryTimeline: string;
  story: string;
  quote: string;
  rating: number;
}

export interface PatientStoriesInfo {
  title: string;
  subtitle: string;
  stories: PatientStory[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  perSessionRate?: string;
  savingsBadge?: string;
  isPopular?: boolean;
  idealFor: string;
  features: string[];
  validity: string;
  ctaText: string;
}

export interface SessionPackagesInfo {
  title: string;
  subtitle: string;
  notice: string;
  tiers: PricingTier[];
}

export interface BookingInfo {
  title: string;
  subtitle: string;
  directWhatsappLabel: string;
  directCallLabel: string;
  formTitle: string;
  slots: string[];
  parkingNotice: string;
}

export interface FooterInfo {
  aboutText: string;
  medicalDisclaimer: string;
  copyrightText: string;
}

export interface PhysiotherapyContent {
  businessName: string;
  tagline: string;
  location: LocationInfo;
  contact: ContactInfo;
  hours: HoursInfo;
  payment: PaymentInfo;
  navLinks: NavLink[];
  hero: HeroInfo;
  conditionsSection: ConditionsSectionInfo;
  treatmentApproach: TreatmentApproachInfo;
  therapistSection: TherapistSectionInfo;
  equipmentSection: EquipmentSectionInfo;
  patientStories: PatientStoriesInfo;
  sessionPackages: SessionPackagesInfo;
  bookingSection: BookingInfo;
  footer: FooterInfo;
}
