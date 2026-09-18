/**
 * Minimal ANSI colouring.
 *
 * Only accent hues that stay readable on both light and dark terminal
 * backgrounds are used - no background fills, no hard-coded white or black.
 * Colour is dropped entirely when stdout is not a TTY (pipes, CI) or when
 * NO_COLOR is set, so `mama | cat` stays clean.
 */

const ESC = '[';

function colorEnabled(): boolean {
  const env = process.env;
  if (env['NO_COLOR'] !== undefined) return false;
  if (env['MAMA_NO_COLOR'] !== undefined) return false;
  if (env['FORCE_COLOR'] !== undefined && env['FORCE_COLOR'] !== '0') return true;
  if (env['TERM'] === 'dumb') return false;
  return Boolean(process.stdout.isTTY);
}

function wrap(open: number, close: number) {
  return (text: string): string =>
    colorEnabled() ? `${ESC}${open}m${text}${ESC}${close}m` : text;
}

/** Category headings - cyan reads well on light and dark backgrounds alike. */
export const accent = wrap(36, 39);
/** Punchlines and sign-offs. */
export const highlight = wrap(33, 39);
/** Secondary text such as the footer. */
export const dim = wrap(2, 22);
/** Emphasis inside the quote body. */
export const bold = wrap(1, 22);

export const isColorEnabled = colorEnabled;
