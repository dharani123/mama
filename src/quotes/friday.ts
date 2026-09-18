import type { Message } from './types.js';

/**
 * Weekend mode - `mama friday`.
 *
 * Deliberately independent of the system date: `mama friday` works on a
 * Tuesday, because sometimes you need it most on a Tuesday.
 */
export const friday: readonly Message[] = [
  {
    body: `inkonchem opika mama...

iroju Friday.

Weekend ni kosam eduruchustundi.`,
    footer: '😎',
  },
  {
    body: `Friday sayantram production loki deploy vaddu mama.

Weekend ni weekend gane unchu.`,
    emoji: '🙏',
  },
  {
    body: `varamanta kashtapaddavu mama.
i rendu rojulu nivi.`,
  },
  {
    body: `Friday natiki anni purti kavalani rul emi ledu mama.
somavaram kuda oka roje.`,
  },
  {
    body: `Weekend plan enti mama?

'Code chesta' ante matram oppukonu.`,
  },
  {
    body: `Friday nadu meeting pettevallaki
oka special place untundi mama.`,
    emoji: '😄',
  },
  {
    body: `Laptop musesi bayataku vellu mama.
Sun ane oka pedda monitor undi — okasari chudu.`,
    emoji: '🌞',
  },
  {
    body: `Weekend lo kuda Slack chuste
asalu weekend ekkada mama?`,
  },
  {
    body: `ivaram okka pani baga chesina chalu mama.
a satisfaction to intiki vellu.`,
  },
  {
    body: `Friday 5 PM ki deploy cheste
Friday 7 PM ki rollback chestavu mama.`,
    emoji: '💀',
  },
  {
    body: `somavaram nuvvu malli vastavu mama.
appativaraku i project ni gurinche alochistu untundi.`,
  },
  {
    body: `varamanta parigettavu mama.
ippudu konchem nemmadiga naduvu.`,
  },
];
