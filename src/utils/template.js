/**
 * Utility for parsing message templates with placeholders, fallbacks, and spintax variation.
 */

/**
 * Resolves spintax syntax in the form of {option1|option2|option3}.
 * Example: "{Hi|Hello|Hey} {{business_name}}" -> "Hello Acme Corp"
 * 
 * @param {string} text 
 * @returns {string}
 */
function resolveSpintax(text) {
  if (!text) return '';
  const spintaxRegex = /\{([^{}]+)\}/g;
  
  return text.replace(spintaxRegex, (match, group) => {
    const choices = group.split('|');
    if (choices.length === 1) return match; // Not a spintax variation
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex].trim();
  });
}

/**
 * Normalizes an object's keys for case-insensitive and relaxed lookup,
 * plus synthesizes helpful smart fields like `first_name` and `recipient_name`.
 * 
 * @param {Record<string, any>} data 
 * @returns {Map<string, string>}
 */
function createNormalizedDataMap(data) {
  const map = new Map();

  for (const [key, value] of Object.entries(data)) {
    const valStr = value !== undefined && value !== null ? String(value).trim() : '';
    const cleanKey = key.trim().toLowerCase();
    
    // Store original lowercase
    map.set(cleanKey, valStr);
    // Store underscore variant
    map.set(cleanKey.replace(/[\s\-_]+/g, '_'), valStr);
    // Store stripped variant
    map.set(cleanKey.replace(/[\s\-_]+/g, ''), valStr);
  }

  // Detect owner / person name from common column variations
  const ownerKeys = ['owner_name', 'owner', 'contact_name', 'contact_person', 'person_name', 'name'];
  let ownerName = '';
  for (const k of ownerKeys) {
    if (map.has(k) && map.get(k)) {
      ownerName = map.get(k);
      break;
    }
  }

  // Detect business name
  const bizKeys = ['business_name', 'business', 'company_name', 'company', 'store_name', 'shop_name'];
  let businessName = '';
  for (const k of bizKeys) {
    if (map.has(k) && map.get(k)) {
      businessName = map.get(k);
      break;
    }
  }

  // Synthesize smart first_name
  if (ownerName && !map.has('first_name')) {
    const firstName = ownerName.split(/[\s,]+/)[0];
    map.set('first_name', firstName);
    map.set('firstname', firstName);
  }

  // Synthesize smart recipient_name: "Rohan" if owner exists, else "Acme Corp team"
  if (!map.has('recipient_name')) {
    if (ownerName) {
      const firstName = ownerName.split(/[\s,]+/)[0];
      map.set('recipient_name', firstName);
    } else if (businessName) {
      map.set('recipient_name', `${businessName} team`);
    } else {
      map.set('recipient_name', 'there');
    }
  }

  // Synthesize smart greeting_name: "Rohan" if owner exists, else "Acme Corp"
  if (!map.has('greeting_name')) {
    if (ownerName) {
      const firstName = ownerName.split(/[\s,]+/)[0];
      map.set('greeting_name', firstName);
    } else if (businessName) {
      map.set('greeting_name', businessName);
    } else {
      map.set('greeting_name', 'there');
    }
  }

  return map;
}

/**
 * Evaluates a single key or fallback expression against the dataMap.
 * Supports syntax like:
 *   {{owner_name | business_name}}
 *   {{first_name | business_name team}}
 * 
 * @param {string} expr 
 * @param {Map<string, string>} dataMap 
 * @returns {string|null}
 */
function evaluateExpression(expr, dataMap) {
  // Check for pipe delimiter: "owner_name | business_name" or "owner_name || business_name"
  const parts = expr.split(/\s*\|\|\s*|\s*\|\s*/);

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    const keyUnder = key.replace(/[\s\-_]+/g, '_');
    const keyStripped = key.replace(/[\s\-_]+/g, '');

    if (dataMap.has(key) && dataMap.get(key)) {
      return dataMap.get(key);
    }
    if (dataMap.has(keyUnder) && dataMap.get(keyUnder)) {
      return dataMap.get(keyUnder);
    }
    if (dataMap.has(keyStripped) && dataMap.get(keyStripped)) {
      return dataMap.get(keyStripped);
    }

    // Check if the part contains a composite like "business_name team"
    // e.g. If part ends with " team" and prefix is in dataMap
    if (trimmed.toLowerCase().endsWith(' team')) {
      const prefix = trimmed.slice(0, -5).trim().toLowerCase();
      const prefixUnder = prefix.replace(/[\s\-_]+/g, '_');
      if (dataMap.has(prefix) && dataMap.get(prefix)) {
        return `${dataMap.get(prefix)} team`;
      }
      if (dataMap.has(prefixUnder) && dataMap.get(prefixUnder)) {
        return `${dataMap.get(prefixUnder)} team`;
      }
    }

    // If it's a quoted literal, e.g. "team" or 'friend'
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
  }

  return null;
}

/**
 * Renders a message template with contact data, fallback handling, and spintax.
 * 
 * @param {string} template - The template string with {{placeholders}}
 * @param {Record<string, any>} contact - The contact record from CSV
 * @returns {{ message: string, missingPlaceholders: string[] }}
 */
function renderTemplate(template, contact = {}) {
  if (!template) {
    return { message: '', missingPlaceholders: [] };
  }

  const dataMap = createNormalizedDataMap(contact);
  const missingPlaceholders = [];

  // Match placeholders like {{owner_name | business_name}} or {{business_name}}
  const placeholderRegex = /\{\{\s*([^}]+?)\s*\}\}/g;

  let rendered = template.replace(placeholderRegex, (match, expression) => {
    const val = evaluateExpression(expression, dataMap);
    if (val !== null) {
      return val;
    }

    missingPlaceholders.push(expression.trim());
    return ''; // Replace unresolved placeholder with empty string
  });

  // Then resolve any Spintax variations: {Hi|Hello|Hey}
  rendered = resolveSpintax(rendered);

  return {
    message: rendered.trim(),
    missingPlaceholders
  };
}

module.exports = {
  renderTemplate,
  resolveSpintax,
  createNormalizedDataMap
};
