import { meter } from '../utils/format.js';
import { randomInt } from '../utils/random.js';
import type { Message } from './types.js';

/**
 * Coffee talk - `mama coffee`.
 *
 * Purely humorous: no coffee API, no network, no timers. The meters are
 * generated locally from the same seedable RNG the rest of the CLI uses.
 */
export const coffee: readonly Message[] = [
  {
    body: `Code artham kavadam leda?

mundu coffee tagu mama.
tarvata code ni malli chuddam.`,
  },
  {
    // Meters, so this one reads differently every run.
    body: () => {
      const caffeine = randomInt(55, 95);
      const productivity = randomInt(10, 100 - caffeine + 25);
      return `Coffee level:
${meter(caffeine)}

Productivity:
${meter(productivity)}

inko coffee avasaram anipistondi mama. 😂`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `Coffee tagakunda code review cheyaku mama.
evaro okaru badhapadataru.`,
    emoji: '😄',
  },
  {
    body: `ni blood lo caffeine kadu mama —
caffeine lo blood.`,
  },
  {
    body: `modati coffee: manishivi avutavu.
rendo coffee: developer avutavu.
mudo coffee: architect avutavu.
nalugo coffee: malli modati nunchi mama.`,
  },
  {
    body: `Coffee challaripoyinda mama?
ante nuvvu nijanga pani chestunnavani artham.`,
  },
  {
    body: `Bug fix kavadam leda mama?
Coffee break tisuko.
sagam bugs kitchen lone fix avutayi.`,
  },
  {
    body: `Coffee machine daggara jarige meetings
conference room kante ekkuva useful mama.`,
    emoji: '😎',
  },
  {
    // A second generated one, with a different joke shape.
    body: () => {
      const cups = randomInt(2, 7);
      const bugs = randomInt(1, 9);
      return `iroju lekka mama:

  Coffee  ${'☕'.repeat(cups)}  (${cups})
  Bugs    ${'🐛'.repeat(bugs)}  (${bugs})

${cups >= bugs ? 'nuvve gelichavu. 😎' : 'Bugs mundunnayi. inko coffee pattu. 😅'}`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `idi ni enno coffee mama?

...lekka pettadam maneshava?
sare, inkokati tagu.`,
  },
  {
    body: `Tea vs Coffee godava vaddu mama.
mukhyam entante — oka break tisuko.`,
  },
  {
    body: `Coffee ayipoyinda mama?

ayite iroju code kuda ayipoyinatte.`,
    emoji: '☕',
  },
];
