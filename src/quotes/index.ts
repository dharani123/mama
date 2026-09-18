import { calm } from './calm.js';
import { code } from './code.js';
import { coffee } from './coffee.js';
import { friday } from './friday.js';
import { general } from './general.js';
import { git } from './git.js';
import { morning } from './morning.js';
import { motivate } from './motivate.js';
import { night } from './night.js';
import { roast } from './roast.js';
import type { Category, CategoryStyle, Message } from './types.js';

/** Every message MAMA knows, grouped by category. */
export const QUOTES: Readonly<Record<Category, readonly Message[]>> = {
  general,
  motivate,
  calm,
  morning,
  night,
  code,
  git,
  roast,
  coffee,
  friday,
};

/**
 * Heading and default sign-off per category.
 *
 * Categories without a `footer` let each message bring its own punchline (or
 * none) - that is what keeps `mama code` and `mama roast` from feeling
 * formulaic.
 */
export const STYLES: Readonly<Record<Category, CategoryStyle>> = {
  general: { heading: 'mama', emoji: '❤️', footer: '— ni terminal mama 😎' },
  motivate: { heading: 'mama', emoji: '🔥', footer: 'lechi pani modalupettu ra. 💪' },
  calm: { heading: 'mama', emoji: '🧘', footer: 'nemmadiga vellu. ❤️' },
  morning: { heading: 'shubhodayam mama', emoji: '☀️', footer: 'Have a great day mama! 💪' },
  night: { heading: 'mama', emoji: '🌙', footer: 'shubharatri ❤️' },
  code: { heading: 'mama', emoji: '👨‍💻' },
  git: { heading: 'mama', emoji: '🌿' },
  roast: { heading: 'mama', emoji: '🔥' },
  coffee: { heading: 'mama', emoji: '☕' },
  friday: { heading: 'mama', emoji: '🎉' },
};

export type { Category, CategoryStyle, Message };
