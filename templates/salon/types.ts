export interface SalonBranding {
  business_name: string;
  subtitle: string;
  tagline: string;
  established_year: string;
  location_short: string;
  primary_color: string;
  secondary_color: string;
  canvas_color: string;
  text_color: string;
  bronze_color: string;
  hero_headline: {
    line1: string;
    line2_italic: string;
  };
  hero_subheadline: string;
  hero_image: string;
  hero_accolade: {
    publication: string;
    badge_text: string;
    rating_label: string;
    stars: number;
  };
  hero_live_status: {
    indicator: string;
    available_slot: string;
  };
  hero_ctas: {
    primary: {
      text: string;
      href: string;
      subtext: string;
    };
    secondary: {
      text: string;
      href: string;
      subtext: string;
    };
  };
  hero_metrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export interface SalonNavigation {
  nav_links: Array<{
    label: string;
    href: string;
  }>;
  cta_button_text: string;
  cta_button_target: string;
  phone_display: string;
  phone_tel: string;
}

export interface SalonManifestoPillar {
  id: string;
  roman_num: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface SalonManifesto {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  lead_quote: string;
  lead_quote_author: string;
  pillars: SalonManifestoPillar[];
  spatial_features: Array<{
    value: string;
    label: string;
  }>;
  spatial_image_1: {
    url: string;
    caption: string;
    tag: string;
  };
  spatial_image_2: {
    url: string;
    caption: string;
    tag: string;
  };
}

export interface SalonServiceItem {
  id: string;
  category: string;
  name: string;
  tag: string;
  duration: string;
  price_senior: string;
  price_master: string;
  price_display: string;
  description: string;
  includes: string[];
  take_home_recommendation: string;
}

export interface SalonServicesLedger {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  description: string;
  note_banner: string;
  categories: Array<{
    id: string;
    label: string;
  }>;
  services: SalonServiceItem[];
}

export interface SalonLookbookItem {
  id: string;
  title: string;
  technique: string;
  stylist: string;
  tag: string;
  span: string;
  aspect: string;
  image_url: string;
}

export interface SalonLookbook {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  description: string;
  filter_tags: string[];
  gallery_images: SalonLookbookItem[];
}

export interface SalonMasterStylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  pedigree: string;
  specialty: string;
  bio: string;
  image_url: string;
  booking_slug: string;
}

export interface SalonMasters {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  description: string;
  stylists: SalonMasterStylist[];
}

export interface SalonPressQuote {
  publication: string;
  quote: string;
  author: string;
  role: string;
}

export interface SalonClientReview {
  client_name: string;
  neighborhood: string;
  service_received: string;
  stylist: string;
  rating: number;
  review: string;
}

export interface SalonTestimonials {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  description: string;
  press_quotes: SalonPressQuote[];
  client_reviews: SalonClientReview[];
}

export interface SalonBookingOpeningHours {
  days: string;
  hours: string;
  note?: string;
}

export interface SalonBookingConcierge {
  section_code: string;
  section_eyebrow: string;
  section_title: string;
  lead_text: string;
  whatsapp_number: string;
  whatsapp_display: string;
  whatsapp_concierge_message: string;
  phone: string;
  email: string;
  address: string;
  address_details: string;
  instagram_handle: string;
  instagram_url: string;
  opening_hours: SalonBookingOpeningHours[];
  amenities: string[];
  form_config: {
    title: string;
    subtitle: string;
    submit_button_text: string;
    confirmation_message: string;
    consultation_notice: string;
  };
}

export interface SalonStickyConcierge {
  headline: string;
  subtext: string;
  badge: string;
  cta_text: string;
  cta_target: string;
  whatsapp_text: string;
}

export interface SalonFooter {
  atelier_tagline: string;
  col_hours_title: string;
  col_concierge_title: string;
  col_legal_title: string;
  newsletter_title: string;
  newsletter_placeholder: string;
  newsletter_button: string;
  newsletter_notice: string;
  copyright: string;
  legal_links: Array<{
    label: string;
    href: string;
  }>;
}

export interface SalonContent {
  branding: SalonBranding;
  navigation: SalonNavigation;
  manifesto: SalonManifesto;
  services_ledger: SalonServicesLedger;
  lookbook: SalonLookbook;
  masters: SalonMasters;
  testimonials: SalonTestimonials;
  booking_concierge: SalonBookingConcierge;
  sticky_concierge: SalonStickyConcierge;
  footer: SalonFooter;
}
