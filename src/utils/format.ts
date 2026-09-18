import type { CategoryStyle, Message } from '../quotes/types.js';
import { accent, dim, highlight } from './colors.js';

/**
 * Lay a message out for the terminal:
 *
 *   heading emoji
 *   (blank)
 *   "quote body, continuation lines aligned under the opening mark"
 *   (blank)
 *   sign-off
 *
 * Kept deliberately narrow so quotes stay readable in an 80-column terminal.
 */
export function formatMessage(message: Message, style: CategoryStyle): string {
  const heading = accent(`${style.heading} ${message.emoji ?? style.emoji}`);
  const body = typeof message.body === 'function' ? message.body() : message.body;
  const footer = message.footer === undefined ? style.footer : message.footer;

  const parts = [heading, '', message.raw === true ? body : quoteBlock(body)];
  if (footer !== null && footer !== undefined && footer !== '') {
    parts.push('', message.footer === undefined ? dim(footer) : highlight(footer));
  }
  return parts.join('\n');
}

/**
 * Wrap the body in quotation marks and indent every continuation line by one
 * space so the text hangs under the opening mark. Blank lines stay blank.
 */
function quoteBlock(body: string): string {
  const lines = body.split('\n');
  return lines
    .map((line, index) => {
      if (index === 0) return `"${line}`;
      if (line === '') return '';
      return ` ${line}`;
    })
    .join('\n')
    .concat('"');
}

/** Render a horizontal meter such as `████████░░ 80%` for the coffee command. */
export function meter(percent: number, width = 10): string {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const filled = Math.round((clamped / 100) * width);
  return `${'█'.repeat(filled)}${'░'.repeat(width - filled)} ${clamped}%`;
}
