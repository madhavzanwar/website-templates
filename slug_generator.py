import os
import re
import csv
from typing import Dict, Tuple, Set

COMMON_SUFFIXES = [
    r'\bprivate\s+limited\b',
    r'\bpvt\.?\s*ltd\.?\b',
    r'\bllp\b',
    r'\bltd\.?\b',
    r'\binc\.?\b',
    r'\bco\.?\b',
    r'\b&\s*co\b',
    r'\(opc\)\s*pvt\.?\s*ltd\.?',
    r'\(opc\)\s*private\s*limited',
    r'\(p\)\s*ltd\.?',
]

PUNE_LOCALITIES = [
    'kothrud', 'baner', 'wakad', 'viman nagar', 'kalyani nagar', 'hadapsar', 
    'aundh', 'koregaon park', 'shivajinagar', 'pimple saudagar', 'pimple gurav', 
    'ravet', 'nigdi', 'chinchwad', 'pimpri', 'magarpatta', 'katraj', 'warje', 
    'bavdhan', 'kondhwa', 'camp', 'deccan', 'sinhagad road', 'kharadi', 
    'dhanori', 'tingre nagar', 'moshi', 'akurdi', 'dapodi', 'bhosari', 
    'vishrantwadi', 'swargate', 'fc road', 'jm road', 'paud road', 
    'karve nagar', 'balewadi', 'prabhat road', 'model colony', 'senapati bapat road',
    'fatima nagar', 'wanowrie', 'undri', 'pisoli', 'ambegaon', 'narhe', 'dhankawadi'
]

def clean_text_for_slug(text: str) -> str:
    """Lowercase, strip non-alphanumeric (except hyphens/spaces), collapse spaces to single hyphen."""
    if not text:
        return ""
    text = text.lower()
    # Remove accents/unusual chars, keep alphanumeric and spaces
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    # Replace spaces & underscores with hyphens
    text = re.sub(r'[\s_]+', '-', text)
    # Collapse multiple hyphens
    text = re.sub(r'-+', '-', text)
    return text.strip('-')

def extract_locality(address: str) -> str:
    """Attempt to extract recognized Pune locality or reasonable address token."""
    if not address or not isinstance(address, str):
        return ""
    addr_lower = address.lower()
    
    # 1. Match known Pune localities
    for loc in PUNE_LOCALITIES:
        if loc in addr_lower:
            return clean_text_for_slug(loc)
            
    # 2. Heuristic from address parts
    parts = [p.strip() for p in address.split(',')]
    for part in parts:
        cleaned = clean_text_for_slug(part)
        if cleaned and cleaned not in ['pune', 'maharashtra', 'india', 'near', 'opp', 'opposite']:
            # Check not just pin code
            if not re.match(r'^\d{4,6}$', cleaned):
                return cleaned
                
    return ""

def generate_base_slug(business_name: str) -> str:
    """Generate a clean base slug from business name, stripping unwieldy corporate suffixes."""
    if not business_name or not isinstance(business_name, str):
        return "business"
    
    name = business_name.strip()
    # Strip suffixes
    for pattern in COMMON_SUFFIXES:
        name = re.sub(pattern, '', name, flags=re.IGNORECASE)
    
    slug = clean_text_for_slug(name)
    return slug if slug else "business"

class SlugManager:
    def __init__(self, slugs_csv_path: str = "slugs.csv"):
        self.slugs_csv_path = slugs_csv_path
        # Mapping: (normalized_business_name, normalized_address) -> slug
        self.existing_mapping: Dict[Tuple[str, str], str] = {}
        # Set of all currently claimed slugs
        self.used_slugs: Set[str] = set()
        self.load()

    def _normalize_key(self, business_name: str, address: str) -> Tuple[str, str]:
        b = (business_name or "").strip().lower()
        a = (address or "").strip().lower()
        return (b, a)

    def load(self):
        """Load existing slugs from CSV to guarantee persistent idempotence."""
        if not os.path.exists(self.slugs_csv_path):
            return
        
        with open(self.slugs_csv_path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            for row in reader:
                b_name = row.get('business_name', '')
                addr = row.get('address', '')
                slug = row.get('slug', '').strip()
                if slug:
                    key = self._normalize_key(b_name, addr)
                    self.existing_mapping[key] = slug
                    self.used_slugs.add(slug)

    def save(self):
        """Save all mappings to CSV."""
        with open(self.slugs_csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['business_name', 'address', 'slug'])
            writer.writeheader()
            for (b_name, addr), slug in self.existing_mapping.items():
                writer.writerow({
                    'business_name': b_name,
                    'address': addr,
                    'slug': slug
                })

    def get_or_create_slug(self, business_name: str, address: str) -> str:
        """
        Return the persistent slug if already exists for this business+address.
        Otherwise create a new unique slug, resolving collisions with locality and/or numeric suffix.
        """
        key = self._normalize_key(business_name, address)
        if key in self.existing_mapping:
            return self.existing_mapping[key]
        
        base_slug = generate_base_slug(business_name)
        candidate = base_slug
        
        # Check collision
        if candidate in self.used_slugs:
            locality = extract_locality(address)
            if locality:
                loc_candidate = f"{base_slug}-{locality}"
                if loc_candidate not in self.used_slugs:
                    candidate = loc_candidate
                else:
                    # Append number to locality candidate
                    idx = 2
                    while f"{loc_candidate}-{idx}" in self.used_slugs:
                        idx += 1
                    candidate = f"{loc_candidate}-{idx}"
            else:
                # Append number to base candidate
                idx = 2
                while f"{base_slug}-{idx}" in self.used_slugs:
                    idx += 1
                candidate = f"{base_slug}-{idx}"

        # Assign and register
        self.existing_mapping[key] = candidate
        self.used_slugs.add(candidate)
        return candidate
