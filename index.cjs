#!/usr/bin/env node

const colors = require('./src/utils/colors');
const { loadConfig } = require('./src/config');
const CampaignRunner = require('./src/campaignRunner');
const OptOutService = require('./src/services/optOutService');

function printHelp() {
  console.log(`
${colors.bold('WhatsApp Business Outreach Tool')}
${colors.dim('Automated, personalized, rate-limited outreach for local businesses.')}

${colors.bold('Usage:')}
  node index.js [options]

${colors.bold('Options:')}
  ${colors.green('--dry-run, -d')}          Simulate the campaign without launching WhatsApp or sending messages
  ${colors.green('--status, -s')}           Display the current progress and count of remaining contacts
  ${colors.green('--test, -t <phone>')}     Send a single test message to verify template & connection
  ${colors.green('--opt-out <phone>')}      Manually add a phone number to the opt-out list
  ${colors.green('--config, -c <path>')}    Specify a custom config JSON file (default: config.json)
  ${colors.green('--help, -h')}             Show this help screen

${colors.bold('Examples:')}
  node index.js --dry-run
  node index.js --test 919876543210
  node index.js
  node index.js --opt-out 919876543210
  node index.js --status
`);
}

async function main() {
  const args = process.argv.slice(2);

  // Check help
  if (args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  // Check config path
  let configPath = null;
  const configIdx = args.findIndex(a => a === '--config' || a === '-c');
  if (configIdx !== -1 && args[configIdx + 1]) {
    configPath = args[configIdx + 1];
  }

  const config = loadConfig(configPath);
  const runner = new CampaignRunner(config);

  // Status check
  if (args.includes('--status') || args.includes('-s')) {
    await runner.printStatus();
    process.exit(0);
  }

  // Dry run
  if (args.includes('--dry-run') || args.includes('-d')) {
    await runner.dryRun();
    process.exit(0);
  }

  // Manual opt-out
  const optOutIdx = args.findIndex(a => a === '--opt-out');
  if (optOutIdx !== -1 && args[optOutIdx + 1]) {
    const phoneToOptOut = args[optOutIdx + 1];
    const optOutService = new OptOutService(config);
    await optOutService.init();
    const added = optOutService.addOptOut(phoneToOptOut, 'Manual CLI opt-out');
    if (added) {
      console.log(colors.green(`✓ Phone number ${phoneToOptOut} added to opt-out registry (${config.files.optOutsCsv}).`));
    } else {
      console.log(colors.yellow(`ℹ Phone number ${phoneToOptOut} is already in the opt-out registry.`));
    }
    process.exit(0);
  }

  // Test send
  const testIdx = args.findIndex(a => a === '--test' || a === '-t');
  if (testIdx !== -1 && args[testIdx + 1]) {
    const testPhone = args[testIdx + 1];
    await runner.sendTestMessage(testPhone);
    process.exit(0);
  }

  // Normal run
  try {
    await runner.run();
  } catch (err) {
    console.error(colors.red('\nFatal error running campaign:'), err);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(colors.red('Unhandled error:'), err);
  process.exit(1);
});
