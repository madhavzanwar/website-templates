import json

# 1. Update gym fallback
with open('templates/gym/content.json', 'r', encoding='utf-8') as f:
    gym = json.load(f)

gym['branding']['business_name'] = 'ProActive Fitness Studio'
gym['branding']['tagline'] = 'STRENGTH, DISCIPLINE AND TRANSFORMATION'
gym['branding']['hero_subheadline'] = "Pune's premier strength training facility equipped with Olympic barbells, functional turf, and dedicated biomechanics coaching."
gym['contact']['phone'] = '+91 98220 12345'
gym['contact']['whatsapp_number'] = '919822012345'
gym['contact']['email'] = 'contact@fitnesspune.in'
gym['contact']['address'] = 'Main Road, Pune, Maharashtra 411001'

for tier in gym.get('membership_tiers', []):
    if '$' in tier.get('price', ''):
        tier['price'] = tier['price'].replace('$240', '₹2,499').replace('$190', '₹1,999').replace('$35', '₹499')

with open('templates/gym/fallback_content.json', 'w', encoding='utf-8') as f:
    json.dump(gym, f, indent=2)

print('Updated templates/gym/fallback_content.json')

# 2. Update salon fallback
with open('templates/salon/content.json', 'r', encoding='utf-8') as f:
    salon = json.load(f)

salon['branding']['business_name'] = 'Luxe Hair Atelier'
salon['branding']['tagline'] = 'Precision Cuts, Bespoke Balayage and Botanical Care'
salon['branding']['hero_subheadline'] = "Pune's premier hair destination for customized balayage, corrective color, keratin smoothing, and relaxing scalp therapy."
salon['booking_concierge']['phone'] = '+91 98230 98765'
salon['booking_concierge']['whatsapp_number'] = '919823098765'
salon['booking_concierge']['email'] = 'concierge@luxesalon.in'
salon['booking_concierge']['address'] = 'Koregaon Park / Viman Nagar, Pune, Maharashtra 411001'
if 'navigation' in salon:
    salon['navigation']['phone_display'] = '+91 98230 98765'
    salon['navigation']['phone_tel'] = '+919823098765'

with open('templates/salon/fallback_content.json', 'w', encoding='utf-8') as f:
    json.dump(salon, f, indent=2)

print('Updated templates/salon/fallback_content.json')
