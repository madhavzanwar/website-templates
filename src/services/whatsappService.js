const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const colors = require('../utils/colors');
const { sleepMs } = require('./delayService');

class WhatsAppService {
  /**
   * @param {object} config 
   */
  constructor(config) {
    this.config = config;
    this.client = null;
    this.isReady = false;
    this.authStrategyPath = path.resolve(process.cwd(), config.sessionDir || '.wwebjs_auth');
  }

  /**
   * Initializes the WhatsApp Web client and connects.
   * @returns {Promise<WhatsAppService>}
   */
  init() {
    return new Promise((resolve, reject) => {
      console.log(colors.cyan('\n📱 Initializing WhatsApp Web Client...'));

      const puppeteerOptions = {
        headless: this.config.puppeteer?.headless ?? true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      };

      if (this.config.puppeteer?.executablePath) {
        puppeteerOptions.executablePath = this.config.puppeteer.executablePath;
      }

      this.client = new Client({
        authStrategy: new LocalAuth({
          dataPath: this.authStrategyPath
        }),
        puppeteer: puppeteerOptions
      });

      this.client.on('qr', (qr) => {
        console.log(colors.yellow('\n⚡ Scan this QR Code with your WhatsApp (Linked Devices):'));
        qrcode.generate(qr, { small: true });
        console.log(colors.dim('Open WhatsApp > Settings > Linked Devices > Link a Device\n'));
      });

      this.client.on('authenticated', () => {
        console.log(colors.green('✓ Session authenticated successfully. Session stored locally.'));
      });

      this.client.on('auth_failure', (msg) => {
        console.error(colors.red('✗ Authentication failed:'), msg);
        reject(new Error(`Authentication failed: ${msg}`));
      });

      this.client.on('ready', () => {
        this.isReady = true;
        console.log(colors.green('✓ WhatsApp Web Client is READY!'));
        resolve(this);
      });

      this.client.on('disconnected', (reason) => {
        this.isReady = false;
        console.log(colors.yellow(`\n⚠ WhatsApp Web Client disconnected: ${reason}`));
      });

      this.client.initialize().catch((err) => {
        console.error(colors.red('✗ Failed to initialize WhatsApp client:'), err.message);
        reject(err);
      });
    });
  }

  /**
   * Check if a contact number is registered on WhatsApp
   * @param {string} chatId - e.g. "919876543210@c.us"
   * @returns {Promise<boolean>}
   */
  async isRegistered(chatId) {
    if (!this.client || !this.isReady) {
      throw new Error('WhatsApp client is not ready');
    }

    try {
      return await this.client.isRegisteredUser(chatId);
    } catch (err) {
      // If error occurs during lookup, fallback to true or log warning
      console.warn(colors.yellow(`  ⚠ Lookup warning for ${chatId}: ${err.message}`));
      return true;
    }
  }

  /**
   * Sends a message to a WhatsApp chat ID with human-like typing simulation.
   * 
   * @param {string} chatId - e.g. "919876543210@c.us"
   * @param {string} message - Message text
   * @returns {Promise<{ success: boolean, messageId?: string, error?: string }>}
   */
  async sendMessage(chatId, message) {
    if (!this.client || !this.isReady) {
      return { success: false, error: 'Client is not connected' };
    }

    try {
      // Simulate natural typing state if configured
      if (this.config.safety?.typingSimulation !== false) {
        try {
          const chat = await this.client.getChatById(chatId);
          await chat.sendStateTyping();
          // Simulate typing for 1.2 to 2.5 seconds depending on message length
          const typingDuration = Math.min(3000, Math.max(1200, message.length * 15));
          await sleepMs(typingDuration);
          await chat.clearState();
        } catch {
          // Ignore typing simulation error if chat doesn't exist yet
        }
      }

      const sentMsg = await this.client.sendMessage(chatId, message);
      return {
        success: true,
        messageId: sentMsg?.id?._serialized || 'UNKNOWN_ID'
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Unknown WhatsApp send error'
      };
    }
  }

  /**
   * Gracefully close client session
   */
  async close() {
    if (this.client) {
      try {
        console.log(colors.dim('Closing WhatsApp Web session...'));
        await this.client.destroy();
        this.isReady = false;
        console.log(colors.dim('WhatsApp session closed.'));
      } catch (err) {
        console.error('Error closing client:', err.message);
      }
    }
  }
}

module.exports = WhatsAppService;
