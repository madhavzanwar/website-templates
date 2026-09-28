const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { normalizePhoneNumber } = require('./phone');

/**
 * Escapes a single CSV field value per RFC 4180.
 * @param {any} val 
 * @returns {string}
 */
function escapeCsvField(val) {
  if (val === undefined || val === null) return '';
  let str = String(val);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Ensures a directory and CSV file exist with appropriate headers.
 * @param {string} filePath 
 * @param {string[]} headers 
 */
function ensureCsvFileWithHeaders(filePath, headers) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    const headerRow = headers.join(',') + '\n';
    fs.writeFileSync(filePath, headerRow, 'utf8');
  }
}

/**
 * Reads contacts from a CSV file.
 * Automatically identifies business name and phone number columns regardless of casing or formatting.
 * 
 * @param {string} csvPath 
 * @param {string} defaultCountryCode 
 * @returns {Promise<Array<{ raw: Record<string, string>, businessName: string, phoneNumber: string, normalizedPhone: string, chatId: string, isValidPhone: boolean, phoneError?: string }>>}
 */
function loadContacts(csvPath, defaultCountryCode = '91') {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(csvPath)) {
      return reject(new Error(`Contacts file not found at: ${csvPath}`));
    }

    const contacts = [];

    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Strip BOM or whitespace from row keys
        const cleanRow = {};
        for (const [key, value] of Object.entries(row)) {
          const cleanKey = key.trim().replace(/^\uFEFF/, '');
          cleanRow[cleanKey] = (value || '').trim();
        }

        // Identify business_name column
        let businessName = '';
        const nameCandidates = ['business_name', 'business name', 'businessname', 'business', 'company_name', 'company', 'store_name', 'shop_name'];
        for (const candidate of nameCandidates) {
          const foundKey = Object.keys(cleanRow).find(k => k.toLowerCase() === candidate);
          if (foundKey && cleanRow[foundKey]) {
            businessName = cleanRow[foundKey];
            break;
          }
        }

        // Identify owner_name column
        let ownerName = '';
        const ownerCandidates = ['owner_name', 'owner name', 'owner', 'contact_name', 'contact name', 'person_name', 'contact_person', 'full_name'];
        for (const candidate of ownerCandidates) {
          const foundKey = Object.keys(cleanRow).find(k => k.toLowerCase() === candidate);
          if (foundKey && cleanRow[foundKey]) {
            ownerName = cleanRow[foundKey];
            break;
          }
        }

        // If cleanRow has a generic 'name' column, check if it looks like business or person
        if (!ownerName && !businessName && cleanRow['name']) {
          businessName = cleanRow['name'];
        }

        // Identify phone_number column
        let rawPhone = '';
        const phoneCandidates = ['phone_number', 'phone number', 'phonenumber', 'phone', 'mobile_number', 'mobile number', 'mobile', 'whatsapp', 'contact_number', 'contact'];
        for (const candidate of phoneCandidates) {
          const foundKey = Object.keys(cleanRow).find(k => k.toLowerCase() === candidate);
          if (foundKey && cleanRow[foundKey]) {
            rawPhone = cleanRow[foundKey];
            break;
          }
        }

        // If not found by candidate, try first 2 columns as fallback
        const keys = Object.keys(cleanRow);
        if (!businessName && keys.length > 0) {
          businessName = cleanRow[keys[0]];
        }
        if (!rawPhone && keys.length > 1) {
          rawPhone = cleanRow[keys[1]];
        }

        // Skip completely empty lines
        if (!businessName && !rawPhone) {
          return;
        }

        const phoneInfo = normalizePhoneNumber(rawPhone, defaultCountryCode);

        // Inject owner_name back into raw if detected
        if (ownerName && !cleanRow.owner_name) {
          cleanRow.owner_name = ownerName;
        }

        contacts.push({
          raw: cleanRow,
          businessName: businessName || 'Valued Business',
          ownerName: ownerName || '',
          phoneNumber: rawPhone,
          normalizedPhone: phoneInfo.normalized,
          chatId: phoneInfo.chatId,
          isValidPhone: phoneInfo.valid,
          phoneError: phoneInfo.error
        });
      })
      .on('end', () => resolve(contacts))
      .on('error', (err) => reject(err));
  });
}

/**
 * Loads the opt-out numbers from opt_outs.csv into a Set of normalized digits.
 * 
 * @param {string} optOutCsvPath 
 * @returns {Promise<Set<string>>}
 */
function loadOptOuts(optOutCsvPath) {
  return new Promise((resolve) => {
    const optOuts = new Set();

    if (!fs.existsSync(optOutCsvPath)) {
      ensureCsvFileWithHeaders(optOutCsvPath, ['phone_number', 'opt_out_date', 'reason']);
      return resolve(optOuts);
    }

    fs.createReadStream(optOutCsvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        const rawPhone = row.phone_number || row.phone || row.number || Object.values(row)[0];
        if (rawPhone) {
          const digits = String(rawPhone).replace(/[^\d]/g, '');
          if (digits) {
            optOuts.add(digits);
          }
        }
      })
      .on('end', () => resolve(optOuts))
      .on('error', () => resolve(optOuts)); // Fallback gracefully if empty
  });
}

/**
 * Appends a number to the opt-outs CSV file.
 * 
 * @param {string} optOutCsvPath 
 * @param {string} phoneNumber 
 * @param {string} reason 
 */
function saveOptOut(optOutCsvPath, phoneNumber, reason = 'Replied STOP') {
  ensureCsvFileWithHeaders(optOutCsvPath, ['phone_number', 'opt_out_date', 'reason']);
  const digits = String(phoneNumber).replace(/[^\d]/g, '');
  const timestamp = new Date().toISOString();
  const line = `${escapeCsvField(digits)},${escapeCsvField(timestamp)},${escapeCsvField(reason)}\n`;
  fs.appendFileSync(optOutCsvPath, line, 'utf8');
}

/**
 * Loads previous send logs to identify successfully contacted numbers for resume.
 * 
 * @param {string} sendLogsCsvPath 
 * @returns {Promise<{ sentNumbers: Set<string>, allLogs: Array<any> }>}
 */
function loadSendLogs(sendLogsCsvPath) {
  return new Promise((resolve) => {
    const sentNumbers = new Set();
    const allLogs = [];
    let sentTodayCount = 0;
    const todayPrefix = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    if (!fs.existsSync(sendLogsCsvPath)) {
      ensureCsvFileWithHeaders(sendLogsCsvPath, [
        'timestamp',
        'business_name',
        'phone_number',
        'formatted_phone',
        'status',
        'message_id',
        'details'
      ]);
      return resolve({ sentNumbers, allLogs, sentTodayCount: 0 });
    }

    fs.createReadStream(sendLogsCsvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        allLogs.push(row);
        const status = (row.status || '').toUpperCase();
        // If message was successfully sent, record it so we don't duplicate outreach
        if (status === 'SUCCESS') {
          const norm = (row.formatted_phone || row.phone_number || '').replace(/[^\d]/g, '');
          if (norm) {
            sentNumbers.add(norm);
          }

          // Check if message was sent today
          if (row.timestamp) {
            try {
              const logDate = new Date(row.timestamp).toISOString().slice(0, 10);
              if (logDate === todayPrefix) {
                sentTodayCount++;
              }
            } catch {
              // Ignore date parsing error
            }
          }
        }
      })
      .on('end', () => resolve({ sentNumbers, allLogs, sentTodayCount }))
      .on('error', () => resolve({ sentNumbers, allLogs, sentTodayCount: 0 }));
  });
}

/**
 * Logs a send result to send_logs.csv immediately.
 * 
 * @param {string} sendLogsCsvPath 
 * @param {{
 *   businessName: string,
 *   phoneNumber: string,
 *   formattedPhone: string,
 *   status: 'SUCCESS' | 'FAILED' | 'INVALID_NUMBER' | 'NOT_ON_WHATSAPP' | 'SKIPPED_OPT_OUT',
 *   messageId?: string,
 *   details?: string
 * }} logEntry 
 */
function logSendResult(sendLogsCsvPath, logEntry) {
  ensureCsvFileWithHeaders(sendLogsCsvPath, [
    'timestamp',
    'business_name',
    'phone_number',
    'formatted_phone',
    'status',
    'message_id',
    'details'
  ]);

  const timestamp = new Date().toISOString();
  const line = [
    escapeCsvField(timestamp),
    escapeCsvField(logEntry.businessName || ''),
    escapeCsvField(logEntry.phoneNumber || ''),
    escapeCsvField(logEntry.formattedPhone || ''),
    escapeCsvField(logEntry.status || 'UNKNOWN'),
    escapeCsvField(logEntry.messageId || ''),
    escapeCsvField(logEntry.details || '')
  ].join(',') + '\n';

  fs.appendFileSync(sendLogsCsvPath, line, 'utf8');
}

module.exports = {
  loadContacts,
  loadOptOuts,
  saveOptOut,
  loadSendLogs,
  logSendResult
};
