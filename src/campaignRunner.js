const fs = require('fs');
const colors = require('./utils/colors');
const { renderTemplate } = require('./utils/template');
const { normalizePhoneNumber } = require('./utils/phone');
const { loadContacts, loadSendLogs, logSendResult } = require('./utils/csvHandler');
const { getRandomDelay, countdownSleep } = require('./services/delayService');
const WhatsAppService = require('./services/whatsappService');
const OptOutService = require('./services/optOutService');

class CampaignRunner {
  /**
   * @param {object} config 
   */
  constructor(config) {
    this.config = config;
    this.whatsapp = new WhatsAppService(config);
    this.optOutService = new OptOutService(config);
    this.isInterrupted = false;
  }

  /**
   * Reads template file from disk
   * @returns {string}
   */
  readTemplate() {
    const templatePath = this.config.files.templateFile;
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found at: ${templatePath}`);
    }
    return fs.readFileSync(templatePath, 'utf8');
  }

  /**
   * Analyzes contacts and categorizes them into resumed, opted-out, invalid, and pending.
   */
  async prepareQueue() {
    const template = this.readTemplate();
    const contacts = await loadContacts(this.config.files.contactsCsv, this.config.defaultCountryCode);
    await this.optOutService.init();
    const { sentNumbers, allLogs, sentTodayCount } = await loadSendLogs(this.config.files.sendLogsCsv);
    const maxDailyMessages = this.config.limits?.maxDailyMessages ?? 35;
    const remainingAllowedToday = Math.max(0, maxDailyMessages - sentTodayCount);

    const queue = {
      template,
      totalContacts: contacts.length,
      alreadySent: [],
      optedOut: [],
      invalid: [],
      pending: [],
      sentTodayCount,
      maxDailyMessages,
      remainingAllowedToday
    };

    for (const contact of contacts) {
      if (!contact.isValidPhone) {
        queue.invalid.push(contact);
        continue;
      }

      if (this.optOutService.isOptedOut(contact.normalizedPhone)) {
        queue.optedOut.push(contact);
        continue;
      }

      if (sentNumbers.has(contact.normalizedPhone)) {
        queue.alreadySent.push(contact);
        continue;
      }

      queue.pending.push(contact);
    }

    return queue;
  }

  /**
   * Prints the campaign status report from CSV data without sending messages.
   */
  async printStatus() {
    const queue = await this.prepareQueue();
    console.log(colors.cyan('\n========================================'));
    console.log(colors.bold(colors.white('      WHATSAPP CAMPAIGN STATUS          ')));
    console.log(colors.cyan('========================================'));
    console.log(`  ${colors.bold('Total Contacts in CSV:')}   ${queue.totalContacts}`);
    console.log(`  ${colors.green('Already Sent (All-time):')} ${queue.alreadySent.length}`);
    console.log(`  ${colors.yellow('Opted Out (Skipped):')}      ${queue.optedOut.length}`);
    console.log(`  ${colors.red('Invalid Numbers:')}         ${queue.invalid.length}`);
    console.log(`  ${colors.cyan('Pending to Send:')}          ${colors.bold(queue.pending.length.toString())}`);
    console.log(colors.cyan('----------------------------------------'));
    console.log(`  ${colors.bold('Daily Send Limit:')}         ${queue.maxDailyMessages} msgs/day`);
    console.log(`  ${colors.bold('Sent Today:')}               ${queue.sentTodayCount} / ${queue.maxDailyMessages}`);
    console.log(`  ${colors.bold('Remaining Allowed Today:')}  ${queue.remainingAllowedToday > 0 ? colors.green(queue.remainingAllowedToday.toString()) : colors.red('0 (Limit reached)')}`);
    console.log(colors.cyan('========================================\n'));
  }

  /**
   * Dry-run mode: prints preview of messages and validation without sending anything.
   */
  async dryRun() {
    console.log(colors.magenta('\n🔍 RUNNING IN DRY-RUN MODE (No messages will be sent)\n'));
    const queue = await this.prepareQueue();

    this.printStatus();

    if (queue.pending.length === 0) {
      console.log(colors.yellow('ℹ No pending contacts to send to. All contacts are either completed or opted out.'));
      return;
    }

    console.log(colors.cyan(`\nPreviewing first ${Math.min(3, queue.pending.length)} message(s) from pending queue:\n`));

    const sampleBatch = queue.pending.slice(0, 3);
    sampleBatch.forEach((contact, idx) => {
      const { message, missingPlaceholders } = renderTemplate(queue.template, contact.raw);
      console.log(colors.bold(`--- Preview #${idx + 1}: ${contact.businessName} (+${contact.normalizedPhone}) ---`));
      if (missingPlaceholders.length > 0) {
        console.log(colors.yellow(`  ⚠ Note: Missing placeholders found: ${missingPlaceholders.join(', ')}`));
      }
      console.log(colors.dim(message));
      console.log(colors.cyan('--------------------------------------------------\n'));
    });

    console.log(colors.green('✓ Dry-run completed successfully. Run `npm start` to begin actual outreach.'));
  }

  /**
   * Sends a single test message to a specified number to verify template & connection.
   * @param {string} testPhoneNumber 
   */
  async sendTestMessage(testPhoneNumber) {
    console.log(colors.cyan(`\n🧪 Sending test message to: ${testPhoneNumber}`));
    const norm = normalizePhoneNumber(testPhoneNumber, this.config.defaultCountryCode);
    if (!norm.valid) {
      console.error(colors.red(`✗ Invalid test phone number: ${norm.error}`));
      return;
    }

    const template = this.readTemplate();
    const sampleData = {
      business_name: 'Sample Business Ltd',
      phone_number: norm.normalized
    };

    const { message } = renderTemplate(template, sampleData);
    console.log(colors.dim('\nMessage Preview:\n' + message + '\n'));

    await this.whatsapp.init();

    console.log(`Sending test message to ${norm.chatId}...`);
    const result = await this.whatsapp.sendMessage(norm.chatId, message);

    if (result.success) {
      console.log(colors.green(`\n✓ Test message sent successfully! (ID: ${result.messageId})`));
    } else {
      console.error(colors.red(`\n✗ Test send failed: ${result.error}`));
    }

    await this.whatsapp.close();
  }

  /**
   * Runs the full outreach campaign
   */
  async run() {
    const queue = await this.prepareQueue();

    console.log(colors.cyan('\n========================================'));
    console.log(colors.bold(colors.white('   WHATSAPP BUSINESS OUTREACH SENDER    ')));
    console.log(colors.cyan('========================================'));
    console.log(`  Contacts Loaded:    ${queue.totalContacts}`);
    console.log(`  Already Sent:       ${colors.green(queue.alreadySent.length.toString())} (Resuming from previous run)`);
    console.log(`  Opted Out:          ${colors.yellow(queue.optedOut.length.toString())} (Skipped)`);
    console.log(`  Invalid Phone:      ${colors.red(queue.invalid.length.toString())} (Skipped)`);
    console.log(`  Queue to Send:      ${colors.bold(colors.cyan(queue.pending.length.toString()))}`);
    console.log(colors.cyan('----------------------------------------'));
    console.log(`  Delay between sends: ${this.config.delays.minDelaySeconds}s - ${this.config.delays.maxDelaySeconds}s`);
    if (this.config.delays.enableBatchPause) {
      console.log(`  Batch pause:         ${this.config.delays.batchPauseMinutes}m every ${this.config.delays.batchSize} sends`);
    }
    console.log(colors.cyan('----------------------------------------'));
    console.log(`  Daily Send Limit:    ${queue.maxDailyMessages} msgs/day`);
    console.log(`  Sent Today:          ${queue.sentTodayCount} / ${queue.maxDailyMessages}`);
    console.log(`  Remaining Today:     ${queue.remainingAllowedToday > 0 ? colors.green(queue.remainingAllowedToday.toString()) : colors.red('0 (Daily cap reached)')}`);
    console.log(colors.cyan('========================================\n'));

    // Handle invalid numbers by logging them once
    for (const inv of queue.invalid) {
      logSendResult(this.config.files.sendLogsCsv, {
        businessName: inv.businessName,
        phoneNumber: inv.phoneNumber,
        formattedPhone: inv.normalizedPhone,
        status: 'INVALID_NUMBER',
        details: inv.phoneError || 'Invalid phone format'
      });
    }

    if (queue.pending.length === 0) {
      console.log(colors.green('✓ All eligible contacts have already been processed! Nothing to send.'));
      return;
    }

    if (queue.sentTodayCount >= queue.maxDailyMessages) {
      console.log(colors.yellow(`🛑 DAILY CAP REACHED: You have already sent ${queue.sentTodayCount}/${queue.maxDailyMessages} messages today.`));
      console.log(colors.cyan('Halting to protect your WhatsApp account reputation. You can resume tomorrow or adjust limits.maxDailyMessages in config.json.\n'));
      return;
    }

    // Connect to WhatsApp
    await this.whatsapp.init();

    // Hook up real-time STOP responder
    this.optOutService.attachMessageListener(this.whatsapp.client);

    // Setup graceful exit handler
    const handleExit = async () => {
      if (this.isInterrupted) return;
      this.isInterrupted = true;
      console.log(colors.yellow('\n\n⚠ Pause requested (Ctrl+C). Cleaning up...'));
      console.log(colors.cyan('✓ All progress has been safely logged to send_logs.csv.'));
      console.log(colors.cyan('✓ You can run `npm start` at any time to resume from where you stopped.'));
      await this.whatsapp.close();
      process.exit(0);
    };

    process.once('SIGINT', handleExit);
    process.once('SIGTERM', handleExit);

    console.log(colors.green('\n🚀 Starting outreach campaign...\n'));

    let sentCount = 0;
    let failCount = 0;
    let consecutiveFailures = 0;
    let currentSentToday = queue.sentTodayCount;
    const maxConsecutive = this.config.safety.stopOnConsecutiveFailures || 3;

    for (let i = 0; i < queue.pending.length; i++) {
      if (this.isInterrupted) break;

      const contact = queue.pending[i];
      const progressLabel = `[${i + 1}/${queue.pending.length}]`;

      // Double-check opt out status in case someone opted out during the run
      if (this.optOutService.isOptedOut(contact.normalizedPhone)) {
        console.log(`${colors.dim(progressLabel)} ${colors.yellow('Skipping (Opted-Out):')} ${contact.businessName} (${contact.normalizedPhone})`);
        logSendResult(this.config.files.sendLogsCsv, {
          businessName: contact.businessName,
          phoneNumber: contact.phoneNumber,
          formattedPhone: contact.normalizedPhone,
          status: 'SKIPPED_OPT_OUT',
          details: 'Present in opt-outs registry'
        });
        continue;
      }

      // Check if registered on WhatsApp
      if (this.config.safety.verifyWhatsAppRegistration) {
        try {
          const isReg = await this.whatsapp.isRegistered(contact.chatId);
          if (!isReg) {
            console.log(`${colors.dim(progressLabel)} ${colors.red('✗ Not on WhatsApp:')} ${contact.businessName} (+${contact.normalizedPhone})`);
            logSendResult(this.config.files.sendLogsCsv, {
              businessName: contact.businessName,
              phoneNumber: contact.phoneNumber,
              formattedPhone: contact.normalizedPhone,
              status: 'NOT_ON_WHATSAPP',
              details: 'Phone number not registered on WhatsApp'
            });
            continue;
          }
        } catch (regErr) {
          console.warn(colors.yellow(`  Lookup warning: ${regErr.message}`));
        }
      }

      // Render personalized message
      const { message, missingPlaceholders } = renderTemplate(queue.template, contact.raw);
      if (missingPlaceholders.length > 0) {
        console.warn(colors.yellow(`  ⚠ Note: Placeholders not found in row: ${missingPlaceholders.join(', ')}`));
      }

      console.log(`${colors.bold(progressLabel)} Sending to: ${colors.bold(contact.businessName)} (+${contact.normalizedPhone})...`);

      // Send the message
      const sendResult = await this.whatsapp.sendMessage(contact.chatId, message);

      if (sendResult.success) {
        sentCount++;
        currentSentToday++;
        consecutiveFailures = 0;
        console.log(`  ${colors.green('✓ Sent successfully')} (ID: ${sendResult.messageId}) [Today: ${currentSentToday}/${queue.maxDailyMessages}]`);
        
        logSendResult(this.config.files.sendLogsCsv, {
          businessName: contact.businessName,
          phoneNumber: contact.phoneNumber,
          formattedPhone: contact.normalizedPhone,
          status: 'SUCCESS',
          messageId: sendResult.messageId
        });

        // Enforce daily cap
        if (currentSentToday >= queue.maxDailyMessages) {
          console.log(colors.bgYellow(colors.black(`\n 🛑 DAILY LIMIT REACHED `)));
          console.log(colors.yellow(` Reached safe daily cap of ${queue.maxDailyMessages} messages.`));
          console.log(colors.cyan(' Halting campaign safely for today to protect account reputation.'));
          console.log(colors.cyan(' Run `npm start` tomorrow to continue right where you left off!\n'));
          break;
        }
      } else {
        failCount++;
        consecutiveFailures++;
        console.error(`  ${colors.red('✗ Failed to send:')} ${sendResult.error}`);

        logSendResult(this.config.files.sendLogsCsv, {
          businessName: contact.businessName,
          phoneNumber: contact.phoneNumber,
          formattedPhone: contact.normalizedPhone,
          status: 'FAILED',
          details: sendResult.error
        });

        // Safety Circuit Breaker
        if (consecutiveFailures >= maxConsecutive) {
          console.error(colors.bgRed(colors.white(`\n 🛑 SAFETY CIRCUIT BREAKER TRIGGERED `)));
          console.error(colors.red(` ${maxConsecutive} consecutive messages failed. Halting campaign to protect WhatsApp account.`));
          console.error(colors.yellow(' Please check your phone connection or WhatsApp Web session, then run `npm start` to resume.'));
          break;
        }
      }

      // Check if more contacts remain
      const hasMore = i < queue.pending.length - 1;
      if (hasMore && !this.isInterrupted) {
        // Check batch pause
        if (
          this.config.delays.enableBatchPause &&
          sentCount > 0 &&
          sentCount % this.config.delays.batchSize === 0
        ) {
          const pauseSecs = (this.config.delays.batchPauseMinutes || 5) * 60;
          console.log(colors.yellow(`\n☕ Batch limit reached (${sentCount} sent). Taking a ${this.config.delays.batchPauseMinutes}-minute safety break...`));
          await countdownSleep(pauseSecs, 'Batch Safety Pause');
        } else {
          // Standard randomized delay
          const delaySecs = getRandomDelay(
            this.config.delays.minDelaySeconds,
            this.config.delays.maxDelaySeconds
          );
          await countdownSleep(delaySecs, `Delay before contact #${i + 2}`);
        }
      }
    }

    console.log(colors.cyan('\n========================================'));
    console.log(colors.bold(colors.white('         CAMPAIGN SESSION SUMMARY       ')));
    console.log(colors.cyan('========================================'));
    console.log(`  Sent in this session:     ${colors.green(sentCount.toString())}`);
    console.log(`  Total sent today:         ${colors.bold(currentSentToday.toString())} / ${queue.maxDailyMessages}`);
    console.log(`  Failed in this session:   ${colors.red(failCount.toString())}`);
    console.log(`  Logs written to:          ${this.config.files.sendLogsCsv}`);
    console.log(colors.cyan('========================================\n'));

    // Keep the listener alive for 15 seconds in case immediate STOP replies arrive, then cleanly close
    console.log(colors.dim('Listening for incoming replies for 15 seconds before closing...'));
    await countdownSleep(15, 'Waiting for immediate replies');

    await this.whatsapp.close();
    process.exit(0);
  }
}

module.exports = CampaignRunner;
