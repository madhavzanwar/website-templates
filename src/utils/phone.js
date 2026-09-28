/**
 * Utility functions for sanitizing, formatting, and validating phone numbers.
 */

/**
 * Normalizes a raw phone number to digits only, applying default country code if needed.
 * 
 * @param {string|number} rawNumber - The raw phone number input
 * @param {string} defaultCountryCode - Country code without '+' (e.g. "91" or "1")
 * @returns {{ valid: boolean, normalized: string, chatId: string, error?: string }}
 */
function normalizePhoneNumber(rawNumber, defaultCountryCode = '91') {
  if (rawNumber === undefined || rawNumber === null) {
    return { valid: false, normalized: '', chatId: '', error: 'Empty phone number' };
  }

  // Convert to string and strip non-digit characters
  let str = String(rawNumber).trim();
  
  // Remove spaces, parentheses, dashes, plus sign, dots
  let digits = str.replace(/[^\d]/g, '');

  if (!digits) {
    return { valid: false, normalized: '', chatId: '', error: 'No digits found in phone number' };
  }

  // Clean default country code
  const cleanCC = String(defaultCountryCode).replace(/[^\d]/g, '');

  // Handle leading zeros (e.g., 09876543210 -> 9876543210)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.substring(1);
  }

  // If digits length is standard national 10-digit number (common in India, US, etc.)
  if (digits.length === 10 && cleanCC) {
    digits = `${cleanCC}${digits}`;
  }

  // If already starts with country code or is between 11 and 15 digits (ITU-T E.164)
  if (digits.length < 10 || digits.length > 15) {
    return {
      valid: false,
      normalized: digits,
      chatId: '',
      error: `Invalid phone number length (${digits.length} digits). Expected 10-15 digits.`
    };
  }

  const chatId = `${digits}@c.us`;

  return {
    valid: true,
    normalized: digits,
    chatId: chatId,
    error: null
  };
}

/**
 * Extracts a normalized phone number from a WhatsApp chat ID (e.g. "919876543210@c.us" -> "919876543210")
 * @param {string} chatId 
 * @returns {string}
 */
function extractNumberFromChatId(chatId) {
  if (!chatId) return '';
  return chatId.split('@')[0].replace(/[^\d]/g, '');
}

module.exports = {
  normalizePhoneNumber,
  extractNumberFromChatId
};
