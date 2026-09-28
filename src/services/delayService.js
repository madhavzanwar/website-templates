const colors = require('../utils/colors');

/**
 * Generates a random integer delay between min and max (inclusive)
 * @param {number} minSeconds 
 * @param {number} maxSeconds 
 * @returns {number} Delay in seconds
 */
function getRandomDelay(minSeconds, maxSeconds) {
  const min = Math.max(1, Math.floor(minSeconds));
  const max = Math.max(min, Math.floor(maxSeconds));
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sleep helper with a live updating countdown progress bar in the terminal.
 * 
 * @param {number} seconds - Total seconds to wait
 * @param {string} reason - Optional label for the countdown
 * @returns {Promise<void>}
 */
function countdownSleep(seconds, reason = 'Respecting WhatsApp limits') {
  return new Promise((resolve) => {
    let remaining = Math.max(1, Math.round(seconds));
    const total = remaining;

    const render = () => {
      const elapsed = total - remaining;
      const progressRatio = total > 0 ? elapsed / total : 1;
      const barLength = 20;
      const filled = Math.round(barLength * progressRatio);
      const empty = barLength - filled;
      const bar = '█'.repeat(filled) + '░'.repeat(empty);

      const msg = `  ${colors.cyan('⏳ Delay')} [${colors.green(bar)}] ${colors.bold(remaining + 's')} remaining (${reason})`;
      
      if (process.stdout.isTTY) {
        process.stdout.write(`\r${msg}\x1b[K`);
      } else {
        // Non-interactive fallback
        if (remaining % 10 === 0 || remaining === total) {
          console.log(msg);
        }
      }
    };

    render();

    const interval = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(interval);
        if (process.stdout.isTTY) {
          process.stdout.write('\r\x1b[K'); // Clear line
        }
        resolve();
      } else {
        render();
      }
    }, 1000);
  });
}

/**
 * Simple promise-based sleep in milliseconds
 * @param {number} ms 
 * @returns {Promise<void>}
 */
function sleepMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getRandomDelay,
  countdownSleep,
  sleepMs
};
