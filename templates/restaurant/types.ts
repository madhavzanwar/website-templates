export interface AllergenTag {
  code: string;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  provenance: string;
  allergens: string[];
  is_signature?: boolean;
  category: string;
}

export interface MenuSection {
  id: string;
  label: string;
  sublabel: string;
  items: MenuItem[];
}

export interface TastingAct {
  act_number: string;
  act_title: string;
  dish_name: string;
  dish_description: string;
  course_ritual: string;
  provenance_note: string;
  image: string;
  sommelier_pairing: {
    vintage: string;
    wine_name: string;
    estate_producer: string;
    region_cru: string;
    sommelier_tasting_note: string;
    abv: string;
  };
  botanical_pairing: {
    infusion_name: string;
    craft_technique: string;
    tasting_note: string;
  };
}

export interface TerroirPillar {
  pillar_number: string;
  title: string;
  subtitle: string;
  narrative: string;
  metric_value: string;
  metric_label: string;
  artisan_focus: string;
}

export interface CredentialBadge {
  year: string;
  title: string;
  organization: string;
  inscription: string;
}

export interface GalleryFrame {
  url: string;
  title: string;
  caption: string;
  sensory_subject: string;
  aspect_ratio: 'tall' | 'square' | 'wide';
}

export interface CriticReview {
  id: string;
  publication: string;
  inspector: string;
  rating_badge: string;
  quote: string;
  full_critique: string;
  date: string;
}

export interface DiningExperience {
  id: string;
  title: string;
  tag: string;
  covers_range: string;
  description: string;
  deposit_note: string;
}

export interface RestaurantContent {
  branding: {
    business_name: string;
    monogram: string;
    tagline: string;
    established_year: string;
    city_district: string;
    primary_color: string;
    nocturnal_canvas: string;
    container_truffle: string;
    smoked_bone: string;
    cellar_burgundy: string;
    gilt_border: string;
    hero_headline: {
      line1: string;
      line2_italic: string;
    };
    hero_eyebrow: string;
    hero_narrative: string;
    hero_primary_image: string;
    hero_vignette_image: string;
    hero_seal_text: string;
    live_service_status: {
      status_label: string;
      current_service: string;
      seats_remaining_label: string;
    };
  };
  ticker: {
    announcement: string;
    cellar_note: string;
    valet_note: string;
  };
  navigation: {
    coordinates: string;
    links: Array<{
      label: string;
      href: string;
    }>;
    reserve_cta: string;
    cellar_archive_cta: string;
  };
  hero_booking_search: {
    date_label: string;
    dates: string[];
    covers_label: string;
    party_options: string[];
    service_label: string;
    services: string[];
    action_cta: string;
  };
  terroir_manifesto: {
    badge: string;
    heading: string;
    subheading: string;
    lead_paragraph: string;
    pillars: TerroirPillar[];
    credentials: CredentialBadge[];
  };
  menu_sections: {
    badge: string;
    title: string;
    subtitle: string;
    seasonal_notice: string;
    allergen_legend: AllergenTag[];
    categories: MenuSection[];
  };
  tasting_menu: {
    badge: string;
    title: string;
    subtitle: string;
    duration_note: string;
    price_per_cover: string;
    wine_pairing_price: string;
    botanical_pairing_price: string;
    sommelier_intro: string;
    acts: TastingAct[];
  };
  chef_story: {
    badge: string;
    heading: string;
    subheading: string;
    lead_quote: string;
    paragraphs: string[];
    chef_profile: {
      name: string;
      role: string;
      accolades: string;
      signature_stamp: string;
    };
    kitchen_photo: string;
    firewood_philosophy: {
      fuel_type: string;
      temperature_celsius: string;
      origin_forest: string;
    };
  };
  atmosphere_gallery: {
    badge: string;
    title: string;
    subtitle: string;
    frames: GalleryFrame[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    reviews: CriticReview[];
  };
  reservation: {
    badge: string;
    title: string;
    subtitle: string;
    experiences: DiningExperience[];
    available_dates: string[];
    seating_times: string[];
    guest_counts: number[];
    dietary_options: Array<{
      id: string;
      label: string;
    }>;
    deposit_policy: string;
    cancellation_policy: string;
    submit_button_text: string;
    whatsapp_concierge: {
      title: string;
      sommelier_name: string;
      sommelier_role: string;
      phone_display: string;
      whatsapp_number: string;
      prefilled_message: string;
      description: string;
      instant_reply_window: string;
    };
  };
  sticky_booking_dock: {
    service_active: string;
    table_alert: string;
    cta_label: string;
    target_section_id: string;
    call_concierge_label: string;
    concierge_phone: string;
  };
  footer: {
    brand_signature: string;
    heritage_summary: string;
    address: {
      street: string;
      district: string;
      postal_code: string;
      city_country: string;
    };
    hours: Array<{
      days: string;
      meal: string;
      time: string;
    }>;
    dress_code: {
      title: string;
      policy: string;
      disclaimer: string;
    };
    arrival_valet: {
      title: string;
      valet_note: string;
      nearest_station: string;
    };
    cellar_archive: {
      title: string;
      total_bins: string;
      allocations_note: string;
    };
    social_links: Array<{
      platform: string;
      handle: string;
      href: string;
    }>;
    copyright: string;
    curator_seal: string;
  };
}
