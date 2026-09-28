export interface NavLink {
  label: string;
  href: string;
}

export interface BrandingConfig {
  business_name: string;
  tagline: string;
  monogram: string;
  subtitle: string;
  location_base: string;
  primary_color: string;
  accent_blush: string;
  canvas_ground: string;
  secondary_matting: string;
  structural_ink: string;
  antique_amber: string;
  darkroom_nocturne: string;
  hero_headline: {
    line1: string;
    line2_italic: string;
  };
  hero_subheadline: string;
  hero_image: string;
  hero_location_stamp: string;
  camera_gear_specs: string;
  availability_status: {
    season_label: string;
    badge_text: string;
    secondary_label: string;
    available_dates_count: number;
    year_label: string;
  };
}

export interface NavigationConfig {
  brand_wordmark: string;
  brand_subtitle: string;
  links: NavLink[];
  inquire_cta: string;
  audio_label_on: string;
  audio_label_off: string;
  audio_subtext: string;
}

export interface HeroConfig {
  eyebrow: string;
  headline_main: string;
  headline_italic: string;
  subheadline: string;
  location_stamp: string;
  film_stock_badge: string;
  aspect_ratio_label: string;
  primary_cta: {
    label: string;
    href: string;
  };
  secondary_cta: {
    label: string;
    href: string;
  };
  scroll_hint: string;
}

export interface PhilosophyPillar {
  number: string;
  title: string;
  subtitle: string;
  narrative: string;
  technical_spec: string;
}

export interface AnalogFormat {
  name: string;
  medium: string;
  description: string;
  provenance: string;
}

export interface PhilosophyConfig {
  badge: string;
  headline: string;
  headline_italic: string;
  subheading: string;
  paragraphs: string[];
  quote: string;
  quote_author: string;
  pillars: PhilosophyPillar[];
  analog_fidelity: {
    title: string;
    description: string;
    formats: AnalogFormat[];
    lab_stamp: string;
  };
  artisan_portrait: {
    image: string;
    caption: string;
    photographers: string;
    role: string;
    experience_years: string;
  };
}

export interface LoveStoryPhoto {
  url: string;
  alt: string;
  caption: string;
  film_stock?: string;
  camera_spec?: string;
}

export interface LoveStory {
  id: string;
  chapter_number: string;
  couple_names: string;
  setting: string;
  coordinates: string;
  narrative: string;
  extended_story: string;
  coverage_summary: string;
  primary_photo: LoveStoryPhoto;
  secondary_macro_photo: LoveStoryPhoto;
  layout_orientation: 'left' | 'right';
  read_story_cta: string;
  tags: string[];
}

export interface FeaturedStoriesConfig {
  badge: string;
  headline: string;
  headline_italic: string;
  subheadline: string;
  stories: LoveStory[];
}

export interface CameraHUD {
  frame_number: string;
  shutter_aperture_iso: string;
  camera_lens: string;
  film_emulsion: string;
  location: string;
}

export interface ArchiveImage {
  id: string;
  url: string;
  alt: string;
  title: string;
  mood: string;
  aspect_ratio: 'vertical' | 'landscape' | 'square';
  hud: CameraHUD;
}

export interface MoodFilter {
  id: string;
  label: string;
}

export interface CuratedArchiveConfig {
  badge: string;
  headline: string;
  headline_italic: string;
  subheadline: string;
  mood_filters: MoodFilter[];
  gallery_images: ArchiveImage[];
  hud_label: string;
}

export interface InvestmentPackage {
  id: string;
  ledger_code: string;
  name: string;
  clientele_type: string;
  starting_price: string;
  hours: string;
  coverage_details: string;
  description: string;
  inclusions: string[];
  film_allowance: string;
  album_spec: string;
  delivery_timeline: string;
  is_featured?: boolean;
  featured_badge?: string;
}

export interface InvestmentConfig {
  badge: string;
  title: string;
  title_italic: string;
  subtitle: string;
  note: string;
  packages: InvestmentPackage[];
  bespoke_notice: string;
  currency_disclaimer: string;
}

export interface ClientLetter {
  id: string;
  couple_names: string;
  wedding_date: string;
  wedding_location: string;
  letter_text: string;
  highlight: string;
  film_vignette: string;
}

export interface AlbumSpecification {
  label: string;
  value: string;
}

export interface TestimonialsConfig {
  badge: string;
  title: string;
  title_italic: string;
  subtitle: string;
  letters: ClientLetter[];
  album_lookbook: {
    title: string;
    subtitle: string;
    description: string;
    specifications: AlbumSpecification[];
    lookbook_photos: Array<{
      url: string;
      caption: string;
      subcaption: string;
    }>;
  };
}

export interface ConciergeContacts {
  phone: string;
  whatsapp_number: string;
  email: string;
  studio_locations: string[];
  instagram_handle: string;
  response_time: string;
}

export interface InquiryFormConfig {
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  whatsapp_label: string;
  whatsapp_placeholder: string;
  date_label: string;
  season_options: string[];
  location_label: string;
  location_placeholder: string;
  guest_count_label: string;
  guest_options: string[];
  investment_label: string;
  investment_tiers: string[];
  vision_label: string;
  vision_placeholder: string;
  submit_button: string;
  success_heading: string;
  success_message: string;
  direct_whatsapp_cta: string;
  confidentiality_note: string;
}

export interface InquiryConfig {
  badge: string;
  headline: string;
  headline_italic: string;
  narrative: string;
  availability_note: string;
  calendar_status: {
    season: string;
    dates_left: string;
    booking_state: string;
    intake_limit: string;
  };
  concierge_contacts: ConciergeContacts;
  form: InquiryFormConfig;
}

export interface StickyDockConfig {
  season_text: string;
  status_indicator: string;
  inquire_button_label: string;
  whatsapp_button_label: string;
}

export interface LabCredential {
  lab_name: string;
  service: string;
  city: string;
}

export interface TravelCoordinate {
  region: string;
  months: string;
  fee_note: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  href: string;
}

export interface FooterConfig {
  colophon_heading: string;
  colophon_statement: string;
  lab_credentials: LabCredential[];
  travel_coordinates: TravelCoordinate[];
  social_links: SocialLink[];
  copyright: string;
  archival_seal: string;
  curator_note: string;
}

export interface WeddingPhotographerContent {
  branding: BrandingConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  philosophy: PhilosophyConfig;
  featured_stories: FeaturedStoriesConfig;
  curated_archive: CuratedArchiveConfig;
  investment: InvestmentConfig;
  testimonials: TestimonialsConfig;
  inquiry: InquiryConfig;
  sticky_dock: StickyDockConfig;
  footer: FooterConfig;
}
