export interface GymContent {
  _comment?: string;
  branding: {
    business_name: string;
    business_short_code: string;
    tagline: string;
    hero_headline_lines: string[];
    hero_subheadline: string;
    primary_color: string;
    secondary_color: string;
    canvas_color: string;
    accent_infrared: string;
    hero_image: string;
    hero_video_poster: string;
  };
  telemetry: {
    live_badge: string;
    compound_status: string;
    current_capacity_percent: number;
    active_athletes: number;
    next_session_countdown: string;
    indoor_temp: string;
    soundtrack_bpm: string;
  };
  navigation: {
    nav_links: Array<{ label: string; href: string }>;
    cta_button_text: string;
    cta_button_target: string;
  };
  hero_actions: {
    primary_cta: {
      text: string;
      href: string;
      subtext: string;
    };
    secondary_cta: {
      text: string;
      href: string;
      subtext: string;
    };
    telemetry_card: {
      discipline: string;
      coach: string;
      zone: string;
      soundtrack: string;
    };
  };
  about: {
    section_code: string;
    section_title: string;
    lead_statement: string;
    body_paragraphs: string[];
    specifications: Array<{
      value: string;
      unit: string;
      label: string;
    }>;
  };
  services: Array<{
    id: string;
    code: string;
    name: string;
    price: string;
    description: string;
    intensity_level: string;
    class_cap: string;
    duration: string;
    equipment: string;
    image: string;
  }>;
  schedule: {
    section_code: string;
    section_title: string;
    days: Array<{
      id: string;
      day: string;
      date: string;
      active: boolean;
    }>;
    sessions: Array<{
      id: string;
      time: string;
      title: string;
      category: string;
      coach: string;
      coach_role: string;
      total_slots: number;
      booked_slots: number;
      is_urgent: boolean;
      intensity: string;
    }>;
  };
  gallery: {
    section_code: string;
    section_title: string;
    subtitle: string;
    gallery_images: Array<{
      url: string;
      title: string;
      caption: string;
      tag: string;
      span: string;
    }>;
  };
  coaches: Array<{
    name: string;
    role: string;
    credentials: string;
    specialty: string;
    image: string;
  }>;
  membership_tiers: Array<{
    id: string;
    name: string;
    badge: string;
    price: string;
    billing_period: string;
    description: string;
    features: string[];
    cta_text: string;
    is_featured: boolean;
  }>;
  testimonials: Array<{
    athlete: string;
    discipline: string;
    achievement: string;
    quote: string;
  }>;
  contact: {
    section_code: string;
    section_title: string;
    lead_text: string;
    phone: string;
    whatsapp_number: string;
    whatsapp_message: string;
    email: string;
    address: string;
    instagram_handle: string;
    instagram_url: string;
    opening_hours: Array<{
      days: string;
      hours: string;
    }>;
    parking_transit: string;
    booking_form: {
      title: string;
      description: string;
      submit_text: string;
      disclaimer: string;
    };
  };
  sticky_conversion_dock: {
    headline: string;
    badge: string;
    cta_text: string;
    cta_target: string;
  };
  footer: {
    copyright: string;
    subtext: string;
    legal_links: Array<{
      label: string;
      href: string;
    }>;
  };
}
