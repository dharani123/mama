import type { Message } from './types.js';

/**
 * Weekend mode - `mama friday`.
 *
 * Deliberately independent of the system date: `mama friday` works on a
 * Tuesday, because sometimes you need it most on a Tuesday.
 */
export const friday: readonly Message[] = [
  {
    body: `ఇంకొంచెం ఓపిక మామా...

ఈరోజు Friday.

Weekend నీ కోసం ఎదురుచూస్తుంది.`,
    footer: '😎',
  },
  {
    body: `Friday సాయంత్రం production లోకి deploy వద్దు మామా.

Weekend ని weekend గానే ఉంచు.`,
    emoji: '🙏',
  },
  {
    body: `వారమంతా కష్టపడ్డావు మామా.
ఈ రెండు రోజులు నీవి.`,
  },
  {
    body: `Friday నాటికి అన్నీ పూర్తి కావాలని రూల్ ఏమీ లేదు మామా.
సోమవారం కూడా ఒక రోజే.`,
  },
  {
    body: `Weekend plan ఏంటి మామా?

'Code చేస్తా' అంటే మాత్రం ఒప్పుకోను.`,
  },
  {
    body: `Friday నాడు meeting పెట్టేవాళ్ళకి
ఒక special place ఉంటుంది మామా.`,
    emoji: '😄',
  },
  {
    body: `Laptop మూసేసి బయటకు వెళ్ళు మామా.
Sun అనే ఒక పెద్ద monitor ఉంది — ఒకసారి చూడు.`,
    emoji: '🌞',
  },
  {
    body: `Weekend లో కూడా Slack చూస్తే
అసలు weekend ఎక్కడ మామా?`,
  },
  {
    body: `ఈవారం ఒక్క పని బాగా చేసినా చాలు మామా.
ఆ satisfaction తో ఇంటికి వెళ్ళు.`,
  },
  {
    body: `Friday 5 PM కి deploy చేస్తే
Friday 7 PM కి rollback చేస్తావు మామా.`,
    emoji: '💀',
  },
  {
    body: `సోమవారం నువ్వు మళ్ళీ వస్తావు మామా.
అప్పటివరకు ఈ project నీ గురించే ఆలోచిస్తూ ఉంటుంది.`,
  },
  {
    body: `వారమంతా పరిగెత్తావు మామా.
ఇప్పుడు కొంచెం నెమ్మదిగా నడువు.`,
  },
];
