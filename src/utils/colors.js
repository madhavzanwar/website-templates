// ANSI color helpers for clean console output without external dependencies
const enabled = process.stdout.isTTY !== false;

const code = (open, close) => (str) => (enabled ? `\x1b[${open}m${str}\x1b[${close}m` : String(str));

const colors = {
  reset: code(0, 0),
  bold: code(1, 22),
  dim: code(2, 22),
  italic: code(3, 23),
  underline: code(4, 24),
  
  red: code(31, 39),
  green: code(32, 39),
  yellow: code(33, 39),
  blue: code(34, 39),
  magenta: code(35, 39),
  cyan: code(36, 39),
  white: code(37, 39),
  gray: code(90, 39),

  bgBlue: code(44, 49),
  bgGreen: code(42, 49),
  bgYellow: code(43, 49),
  bgRed: code(41, 49),
};

module.exports = colors;
