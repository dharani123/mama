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
    body: `Code artham kaavadam ledha?

mundhu coffee thaagu mama.
tharvatha code ni malli choodhdham.`,
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

inko coffee avasaram anipisthondhi mama. 😂`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `Coffee thaagakunda code review cheyaku mama.
yevaro okaru baadhapadatharu.`,
    emoji: '😄',
  },
  {
    body: `nee blood lo caffeine kaadhu mama —
caffeine lo blood.`,
  },
  {
    body: `modhati coffee: manishivi avuthavu.
rendo coffee: developer avuthavu.
moodo coffee: architect avuthavu.
naalugo coffee: malli modhati nunchi mama.`,
  },
  {
    body: `Coffee challaripoyindha mama?
ante nuvvu nijanga pani chesthunnavani artham.`,
  },
  {
    body: `Bug fix kaavadam ledha mama?
Coffee break theesuko.
sagam bugs kitchen lone fix avuthayi.`,
  },
  {
    body: `Coffee machine dhaggara jarige meetings
conference room kante yekkuva useful mama.`,
    emoji: '😎',
  },
  {
    // A second generated one, with a different joke shape.
    body: () => {
      const cups = randomInt(2, 7);
      const bugs = randomInt(1, 9);
      return `eeroju lekka mama:

  Coffee  ${'☕'.repeat(cups)}  (${cups})
  Bugs    ${'🐛'.repeat(bugs)}  (${bugs})

${cups >= bugs ? 'nuvve gelichavu. 😎' : 'Bugs mundhunnayi. inko coffee pattu. 😅'}`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `idhi nee yenno coffee mama?

...lekka pettadam maaneshava?
sare, inkokati thaagu.`,
  },
  {
    body: `Tea vs Coffee godava vadhdhu mama.
mukhyam yentante — oka break theesuko.`,
  },
  {
    body: `Coffee ayipoyindha mama?

ayithe eeroju code kooda ayipoyinatte.`,
    emoji: '☕',
  },
];
