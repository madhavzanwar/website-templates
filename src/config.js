const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  defaultCountryCode: '91',
  delays: {
    minDelaySeconds: 60,
    maxDelaySeconds: 150,
    enableBatchPause: true,
    batchSize: 10,
    batchPauseMinutes: 8
  },
  limits: {
    maxDailyMessages: 35
  },
  files: {
    contactsCsv: 'contacts.csv',
    templateFile: 'template.txt',
    sendLogsCsv: 'send_logs.csv',
    optOutsCsv: 'opt_outs.csv'
  },
  optOut: {
    keywords: ['STOP', 'UNSUBSCRIBE', 'CANCEL', 'OPT OUT', 'OPTOUT'],
    autoReplyEnabled: true,
    autoReplyMessage: 'You have been unsubscribed and will not receive any further messages from us. Thank you.'
  },
  safety: {
    verifyWhatsAppRegistration: true,
    typingSimulation: true,
    stopOnConsecutiveFailures: 3
  },
  puppeteer: {
    headless: true,
    executablePath: ''
  }
};

/**
 * Loads configuration from config.json, merging with defaults.
 * Resolves all file paths relative to root directory.
 * 
 * @param {string} customConfigPath 
 * @returns {typeof DEFAULT_CONFIG}
 */
function loadConfig(customConfigPath) {
  const rootDir = process.cwd();
  const configPath = customConfigPath 
    ? path.resolve(rootDir, customConfigPath)
    : path.resolve(rootDir, 'config.json');

  let userConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      const fileData = fs.readFileSync(configPath, 'utf8');
      userConfig = JSON.parse(fileData);
    } catch (e) {
      console.warn(`Warning: Could not parse config file at ${configPath}. Using defaults. Error: ${e.message}`);
    }
  }

  const merged = {
    ...DEFAULT_CONFIG,
    ...userConfig,
    delays: { ...DEFAULT_CONFIG.delays, ...(userConfig.delays || {}) },
    limits: { ...DEFAULT_CONFIG.limits, ...(userConfig.limits || {}) },
    files: { ...DEFAULT_CONFIG.files, ...(userConfig.files || {}) },
    optOut: { ...DEFAULT_CONFIG.optOut, ...(userConfig.optOut || {}) },
    safety: { ...DEFAULT_CONFIG.safety, ...(userConfig.safety || {}) },
    puppeteer: { ...DEFAULT_CONFIG.puppeteer, ...(userConfig.puppeteer || {}) }
  };

  // Resolve absolute paths for files
  merged.files.contactsCsv = path.resolve(rootDir, merged.files.contactsCsv);
  merged.files.templateFile = path.resolve(rootDir, merged.files.templateFile);
  merged.files.sendLogsCsv = path.resolve(rootDir, merged.files.sendLogsCsv);
  merged.files.optOutsCsv = path.resolve(rootDir, merged.files.optOutsCsv);

  return merged;
}

module.exports = {
  loadConfig,
  DEFAULT_CONFIG
};
