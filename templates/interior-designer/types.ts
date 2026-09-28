export interface HeroMetadata {
  archive_no: string;
  coordinates: string;
  typology: string;
  sqft: string;
}

export interface Branding {
  business_name: string;
  monogram: string;
  tagline: string;
  hero_headline: string;
  hero_subheadline: string;
  primary_color: string;
  slate_color: string;
  stone_color: string;
  canvas_color: string;
  hero_image: string;
  hero_metadata: HeroMetadata;
  commissions_status: string;
  monograph_download_url: string;
}

export interface Credential {
  accolade: string;
  year: string;
  organization: string;
}

export interface CorePillar {
  number: string;
  title: string;
  description: string;
}

export interface StudioPhilosophy {
  eyebrow: string;
  manifesto_quote: string;
  manifesto_author: string;
  paragraphs: string[];
  portrait_image: string;
  credentials: Credential[];
  core_pillars: CorePillar[];
}

export interface ArchitecturalMilestone {
  id: string;
  phase_code: string;
  phase_title: string;
  duration: string;
  focus: string;
  deliverables: string[];
  technical_standards: string;
}

export interface ProjectImage {
  url: string;
  caption: string;
  aspect?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  typology: string;
  location: string;
  coordinates: string;
  sqft: string;
  completion_year: string;
  lead_architect: string;
  description: string;
  images: ProjectImage[];
  materials_specified: string[];
  cad_elevation_url?: string;
  scope: string;
  highlight_metric: string;
}

export interface InspectionPin {
  id: string;
  x: number;
  y: number;
  title: string;
  detail: string;
  category: string;
}

export interface BeforeAfterRenovation {
  project_title: string;
  subtitle: string;
  location: string;
  year_built: string;
  year_restored: string;
  square_footage: string;
  before_label: string;
  before_image: string;
  after_label: string;
  after_image: string;
  narrative: string;
  pins: InspectionPin[];
}

export interface MaterialSpec {
  id: string;
  name: string;
  provenance: string;
  acoustic_nrc: string;
  patina_cycle: string;
  thermal_mass: string;
  finish_spec: string;
  description: string;
  photo: string;
  tag: string;
}

export interface Testimonial {
  quote: string;
  source: string;
  source_title: string;
  project_reference: string;
  badge: string;
}

export interface ConsultationIntake {
  title: string;
  subtitle: string;
  description: string;
  typologies: string[];
  spatial_footprints: string[];
  investment_tiers: string[];
  readiness_stages: string[];
  disclaimer: string;
}

export interface ContactInfo {
  phone: string;
  phone_display: string;
  whatsapp_number: string;
  email: string;
  headquarters_address: string;
  headquarters_coords: string;
  european_address: string;
  european_coords: string;
  instagram_handle: string;
  journal_handle: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface InteriorDesignerContent {
  branding: Branding;
  studio_philosophy: StudioPhilosophy;
  services: ArchitecturalMilestone[];
  portfolio_projects: PortfolioProject[];
  before_after_renovation: BeforeAfterRenovation;
  materials: MaterialSpec[];
  testimonials: Testimonial[];
  consultation_intake: ConsultationIntake;
  contact: ContactInfo;
  navigation_links: NavLink[];
}
