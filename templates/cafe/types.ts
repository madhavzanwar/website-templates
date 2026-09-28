export interface CafeContent {
  branding: {
    business_name: string;
    tagline: string;
    established_year: string;
    neighborhood: string;
    hero_headline: {
      line1: string;
      line2_italic: string;
      line3: string;
    };
    hero_subheadline: string;
    primary_color: string;
    secondary_color: string;
    canvas_color: string;
    brass_color: string;
    olive_color: string;
    hero_image: string;
    hero_origin_stamp: {
      origin: string;
      estate: string;
      masl: string;
      varietal: string;
      process: string;
      notes: string[];
      lot_number: string;
    };
    rotating_stamp_badge: string;
  };
  ticker: {
    announcement: string;
    highlight_text: string;
    hours_summary: string;
  };
  navigation: {
    nav_links: Array<{
      label: string;
      href: string;
    }>;
    reserve_cta: string;
    order_cta: string;
  };
  hero_actions: {
    primary_cta: {
      text: string;
      href: string;
    };
    secondary_cta: {
      text: string;
      href: string;
    };
    status_pill: string;
    quick_stats: Array<{
      label: string;
      value: string;
    }>;
  };
  roasting_manifesto: {
    badge: string;
    title: string;
    subtitle: string;
    body_paragraphs: string[];
    harvest_cycle_badge: string;
    pillars: Array<{
      number: string;
      title: string;
      description: string;
      metric: string;
      metric_label: string;
    }>;
    direct_trade_stats: Array<{
      value: string;
      label: string;
      subtext: string;
    }>;
  };
  menu: {
    badge: string;
    title: string;
    subtitle: string;
    tabs: Array<{
      id: string;
      label: string;
    }>;
    items: Array<{
      id: string;
      category: string;
      name: string;
      price: string;
      description: string;
      notes?: string[];
      origin?: string;
      masl?: string;
      process?: string;
      roast_profile?: string;
      bag_weight?: string;
      tags: string[];
      is_signature?: boolean;
      image?: string;
    }>;
  };
  brew_calculator: {
    badge: string;
    title: string;
    subtitle: string;
    methods: Array<{
      id: string;
      name: string;
      default_ratio: number;
      ratio_display: string;
      grind_size: string;
      water_temp: string;
      brew_time: string;
      grind_microns: string;
      description: string;
      steps: Array<{
        time: string;
        action: string;
        water_pct: number;
        tip: string;
      }>;
    }>;
    default_method: string;
    default_coffee_grams: number;
    min_grams: number;
    max_grams: number;
    step_grams: number;
    tips: string[];
  };
  atmosphere_gallery: {
    badge: string;
    title: string;
    subtitle: string;
    ambience_audio_label: string;
    images: Array<{
      url: string;
      title: string;
      subtitle: string;
      aspect: string;
      tag: string;
    }>;
  };
  cupping_events: {
    badge: string;
    title: string;
    subtitle: string;
    events: Array<{
      id: string;
      title: string;
      date: string;
      time: string;
      host: string;
      seats_total: number;
      seats_left: number;
      price: string;
      description: string;
      flight_origins: string[];
      includes: string[];
      is_sold_out: boolean;
    }>;
    rsvp_cta_text: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    reviews: Array<{
      author: string;
      role: string;
      publication?: string;
      quote: string;
      rating: number;
      favorite_order: string;
    }>;
  };
  visit_booking: {
    badge: string;
    title: string;
    subtitle: string;
    address: string;
    neighborhood: string;
    transit_notes: string;
    opening_hours: Array<{
      days: string;
      hours: string;
      notes?: string;
    }>;
    amenities: Array<{
      icon: string;
      label: string;
    }>;
    phone: string;
    email: string;
    whatsapp_number: string;
    whatsapp_message_prefix: string;
    instagram_handle: string;
    instagram_url: string;
    booking_form: {
      title: string;
      description: string;
      occasions: string[];
      submit_text: string;
      disclaimer: string;
    };
  };
  sticky_order_bar: {
    lot_announcement: string;
    origin_badge: string;
    cta_text: string;
    cta_href: string;
    secondary_cta_text: string;
    secondary_cta_href: string;
  };
  footer: {
    brand_bio: string;
    newsletter: {
      title: string;
      subtitle: string;
      placeholder: string;
      button_text: string;
      success_text: string;
    };
    navigation_columns: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    roast_registry_stamp: string;
    copyright: string;
  };
}
