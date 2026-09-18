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

eeroju Friday.

Weekend nee kosam yedhuruchusthundhi.`,
    footer: '😎',
  },
  {
    body: `Friday saayanthram production loki deploy vadhdhu mama.

Weekend ni weekend gaane unchu.`,
    emoji: '🙏',
  },
  {
    body: `vaaramantha kashtapaddavu mama.
ee rendu rojulu neevi.`,
  },
  {
    body: `Friday naatiki anni poorthi kaavalani rule yemi ledhu mama.
somavaram kooda oka roje.`,
  },
  {
    body: `Weekend plan yenti mama?

'Code chestha' ante maathram oppukonu.`,
  },
  {
    body: `Friday naadu meeting pettevallaki
oka special place untundhi mama.`,
    emoji: '😄',
  },
  {
    body: `Laptop moosesi bayataku vellu mama.
Sun ane oka pedhdha monitor undhi — okasari choodu.`,
    emoji: '🌞',
  },
  {
    body: `Weekend lo kooda Slack choosthe
asalu weekend yekkada mama?`,
  },
  {
    body: `eevaram okka pani baaga chesina chaalu mama.
aa satisfaction tho intiki vellu.`,
  },
  {
    body: `Friday 5 PM ki deploy chesthe
Friday 7 PM ki rollback chesthavu mama.`,
    emoji: '💀',
  },
  {
    body: `somavaram nuvvu malli vasthavu mama.
appativaraku ee project nee gurinche aalochisthu untundhi.`,
  },
  {
    body: `vaaramantha parigeththavu mama.
ippudu konchem nemmadhiga naduvu.`,
  },
];
