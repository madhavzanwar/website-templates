const assert = require('assert');
const { normalizePhoneNumber, extractNumberFromChatId } = require('./src/utils/phone');
const { renderTemplate, resolveSpintax } = require('./src/utils/template');
const { loadContacts, loadOptOuts, saveOptOut, loadSendLogs, logSendResult } = require('./src/utils/csvHandler');
const fs = require('fs');
const path = require('path');

console.log('Running automated validation tests...\n');

// 1. Test Phone Normalization
console.log('1. Testing Phone Normalization...');
const test1 = normalizePhoneNumber('9876543210', '91');
assert.strictEqual(test1.valid, true);
assert.strictEqual(test1.normalized, '919876543210');
assert.strictEqual(test1.chatId, '919876543210@c.us');

const test2 = normalizePhoneNumber('+91 98765-43210', '91');
assert.strictEqual(test2.valid, true);
assert.strictEqual(test2.normalized, '919876543210');

const test3 = normalizePhoneNumber('09876543210', '91');
assert.strictEqual(test3.valid, true);
assert.strictEqual(test3.normalized, '919876543210');

const test4 = normalizePhoneNumber('12345', '91');
assert.strictEqual(test4.valid, false);

assert.strictEqual(extractNumberFromChatId('919876543210@c.us'), '919876543210');
console.log('✓ Phone tests passed!\n');

// 2. Test Template & Spintax & Fallbacks
console.log('2. Testing Template & Spintax & Fallback Rendering...');
const spintaxResult = resolveSpintax('{Hello|Hi|Greetings} world');
assert(['Hello world', 'Hi world', 'Greetings world'].includes(spintaxResult));

// Test with owner name present
const renderedWithOwner = renderTemplate('Hi {{owner_name | business_name team}}', {
  business_name: 'Apex Dental',
  owner_name: 'Dr. Rohan'
});
assert.strictEqual(renderedWithOwner.message, 'Hi Dr. Rohan');

// Test with owner name absent (fallback to business_name team)
const renderedWithoutOwner = renderTemplate('Hi {{owner_name | business_name team}}', {
  business_name: 'Apex Dental'
});
assert.strictEqual(renderedWithoutOwner.message, 'Hi Apex Dental team');

// Test first_name helper
const renderedFirstName = renderTemplate('Hi {{first_name}}', {
  business_name: 'Apex Dental',
  owner_name: 'Rohan Sharma'
});
assert.strictEqual(renderedFirstName.message, 'Hi Rohan');
console.log('✓ Template & Fallback tests passed!\n');

// 3. Test CSV Handlers & Daily Cap Calculation
console.log('3. Testing CSV Handlers and Resume Logic...');
const tempTestDir = path.join(__dirname, '.temp_test');
if (!fs.existsSync(tempTestDir)) fs.mkdirSync(tempTestDir, { recursive: true });

const testContactsCsv = path.join(tempTestDir, 'test_contacts.csv');
fs.writeFileSync(testContactsCsv, 'business_name,owner_name,phone_number\nTest Alpha,John Doe,919000000001\nTest Beta,,919000000002\n');

loadContacts(testContactsCsv, '91').then(contacts => {
  assert.strictEqual(contacts.length, 2);
  assert.strictEqual(contacts[0].businessName, 'Test Alpha');
  assert.strictEqual(contacts[0].ownerName, 'John Doe');
  assert.strictEqual(contacts[0].normalizedPhone, '919000000001');

  const testOptOutCsv = path.join(tempTestDir, 'test_optouts.csv');
  saveOptOut(testOptOutCsv, '919000000001', 'Replied STOP');
  
  loadOptOuts(testOptOutCsv).then(optOuts => {
    assert(optOuts.has('919000000001'));
    assert(!optOuts.has('919000000002'));

    const testLogsCsv = path.join(tempTestDir, 'test_logs.csv');
    logSendResult(testLogsCsv, {
      businessName: 'Test Beta',
      phoneNumber: '919000000002',
      formattedPhone: '919000000002',
      status: 'SUCCESS',
      messageId: 'MSG123'
    });

    loadSendLogs(testLogsCsv).then(({ sentNumbers, sentTodayCount }) => {
      assert(sentNumbers.has('919000000002'));
      assert(!sentNumbers.has('919000000001'));
      assert.strictEqual(sentTodayCount, 1);

      // Clean up temp test files
      fs.rmSync(tempTestDir, { recursive: true, force: true });

      console.log('✓ CSV, Daily Cap, & Resume tests passed!\n');
      console.log('ALL UNIT & LOGIC TESTS COMPLETED SUCCESSFULLY! 🎉');
    });
  });
});
