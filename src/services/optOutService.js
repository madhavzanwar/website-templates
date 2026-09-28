const colors = require('../utils/colors');
const { loadOptOuts, saveOptOut } = require('../utils/csvHandler');
const { extractNumberFromChatId, normalizePhoneNumber } = require('../utils/phone');

class OptOutService {
  /**
   * @param {object} config
   */
  constructor(config) {
    this.config = config;
    this.optOutFile = config.files.optOutsCsv;
    this.optOutNumbers = new Set();
    this.keywords = (config.optOut?.keywords || ['STOP', 'UNSUBSCRIBE', 'CANCEL', 'OPT OUT', 'OPTOUT'])
      .map(k => k.trim().toUpperCase());
    this.autoReplyEnabled = config.optOut?.autoReplyEnabled ?? true;
    this.autoReplyMessage = config.optOut?.autoReplyMessage || 
      'You have been unsubscribed and will not receive any further messages. Thank you.';
  }

  /**
   * Initialize opt-out list from CSV file
   */
  async init() {
    this.optOutNumbers = await loadOptOuts(this.optOutFile);
    return this.optOutNumbers;
  }

  /**
   * Check if a phone number is opted out
   * @param {string} phoneNumber 
   * @returns {boolean}
   */
  isOptedOut(phoneNumber) {
    if (!phoneNumber) return false;
    const digits = String(phoneNumber).replace(/[^\d]/g, '');
    if (this.optOutNumbers.has(digits)) return true;

    // Also check last 10 digits in case country code was stored differently
    if (digits.length >= 10) {
      const last10 = digits.slice(-10);
      for (const optOut of this.optOutNumbers) {
        if (optOut.endsWith(last10)) return true;
      }
    }
    return false;
  }

  /**
   * Manually record an opt out
   * @param {string} rawPhone 
   * @param {string} reason 
   */
  addOptOut(rawPhone, reason = 'Manual opt-out') {
    const norm = normalizePhoneNumber(rawPhone, this.config.defaultCountryCode);
    const digits = norm.valid ? norm.normalized : String(rawPhone).replace(/[^\d]/g, '');
    if (!digits) return false;

    if (!this.optOutNumbers.has(digits)) {
      this.optOutNumbers.add(digits);
      saveOptOut(this.optOutFile, digits, reason);
      return true;
    }
    return false;
  }

  /**
   * Attach message listener to WhatsApp client to automatically detect STOP replies.
   * @param {import('whatsapp-web.js').Client} client 
   */
  attachMessageListener(client) {
    client.on('message', async (msg) => {
      try {
        // Only inspect messages sent from other contacts
        if (msg.fromMe || !msg.body) return;

        const bodyClean = msg.body.trim().toUpperCase();
        const isOptOutReply = this.keywords.some(kw => {
          return bodyClean === kw || bodyClean.startsWith(kw + ' ') || bodyClean.endsWith(' ' + kw);
        });

        if (isOptOutReply) {
          const senderPhone = extractNumberFromChatId(msg.from);
          const wasNew = this.addOptOut(senderPhone, `User replied "${msg.body.trim()}"`);

          console.log(`\n${colors.bgRed(colors.white(' 🛑 OPT-OUT RECEIVED '))} ${colors.yellow('+' + senderPhone)} replied: "${colors.bold(msg.body.trim())}"`);
          if (wasNew) {
            console.log(`   ${colors.green('✓')} Number added to opt-out registry (${this.optOutFile}).`);
          }

          // Send confirmation auto-reply if enabled
          if (this.autoReplyEnabled && this.autoReplyMessage) {
            try {
              await msg.reply(this.autoReplyMessage);
              console.log(`   ${colors.cyan('→')} Sent unsubscribe confirmation to +${senderPhone}.`);
            } catch (replyErr) {
              console.error(`   ${colors.red('✗')} Could not send opt-out confirmation:`, replyErr.message);
            }
          }
        }
      } catch (err) {
        console.error('Error in opt-out message listener:', err.message);
      }
    });
  }
}

module.exports = OptOutService;
