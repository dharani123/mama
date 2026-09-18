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
    body: `Code అర్థం కావడం లేదా?

ముందు coffee తాగు మామా.
తర్వాత code ని మళ్ళీ చూద్దాం.`,
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

ఇంకో coffee అవసరం అనిపిస్తోంది మామా. 😂`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `Coffee తాగకుండా code review చేయకు మామా.
ఎవరో ఒకరు బాధపడతారు.`,
    emoji: '😄',
  },
  {
    body: `నీ blood లో caffeine కాదు మామా —
caffeine లో blood.`,
  },
  {
    body: `మొదటి coffee: మనిషివి అవుతావు.
రెండో coffee: developer అవుతావు.
మూడో coffee: architect అవుతావు.
నాలుగో coffee: మళ్ళీ మొదటి నుంచి మామా.`,
  },
  {
    body: `Coffee చల్లారిపోయిందా మామా?
అంటే నువ్వు నిజంగా పని చేస్తున్నావని అర్థం.`,
  },
  {
    body: `Bug fix కావడం లేదా మామా?
Coffee break తీసుకో.
సగం bugs kitchen లోనే fix అవుతాయి.`,
  },
  {
    body: `Coffee machine దగ్గర జరిగే meetings
conference room కంటే ఎక్కువ useful మామా.`,
    emoji: '😎',
  },
  {
    // A second generated one, with a different joke shape.
    body: () => {
      const cups = randomInt(2, 7);
      const bugs = randomInt(1, 9);
      return `ఈరోజు లెక్క మామా:

  Coffee  ${'☕'.repeat(cups)}  (${cups})
  Bugs    ${'🐛'.repeat(bugs)}  (${bugs})

${cups >= bugs ? 'నువ్వే గెలిచావు. 😎' : 'Bugs ముందున్నాయి. ఇంకో coffee పట్టు. 😅'}`;
    },
    raw: true,
    footer: null,
  },
  {
    body: `ఇది నీ ఎన్నో coffee మామా?

...లెక్క పెట్టడం మానేశావా?
సరే, ఇంకొకటి తాగు.`,
  },
  {
    body: `Tea vs Coffee గొడవ వద్దు మామా.
ముఖ్యం ఏంటంటే — ఒక break తీసుకో.`,
  },
  {
    body: `Coffee అయిపోయిందా మామా?

అయితే ఈరోజు code కూడా అయిపోయినట్టే.`,
    emoji: '☕',
  },
];
