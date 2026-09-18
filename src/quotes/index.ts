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
  general: { heading: 'మామా', emoji: '❤️', footer: '— నీ టెర్మినల్ మామా 😎' },
  motivate: { heading: 'మామా', emoji: '🔥', footer: 'లేచి పని మొదలుపెట్టు రా. 💪' },
  calm: { heading: 'మామా', emoji: '🧘', footer: 'నెమ్మదిగా వెళ్లు. ❤️' },
  morning: { heading: 'శుభోదయం మామా', emoji: '☀️', footer: 'Have a great day మామా! 💪' },
  night: { heading: 'మామా', emoji: '🌙', footer: 'శుభరాత్రి ❤️' },
  code: { heading: 'మామా', emoji: '👨‍💻' },
  git: { heading: 'మామా', emoji: '🌿' },
  roast: { heading: 'మామా', emoji: '🔥' },
  coffee: { heading: 'మామా', emoji: '☕' },
  friday: { heading: 'మామా', emoji: '🎉' },
};

export type { Category, CategoryStyle, Message };
