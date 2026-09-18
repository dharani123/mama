import type { Message } from './types.js';

/**
 * Git humour - `mama git`.
 *
 * Every git command here is plain text. MAMA prints it and nothing else;
 * no quote is ever handed to a shell.
 */
export const git: readonly Message[] = [
  {
    body: `Commit cheyakunda code maarchukuntu pothe
okaroju nuvve yem cheshavo marchipothavu mama. 😂`,
    footer: 'git commit -m "mama said so"',
  },
  {
    body: `git push --force ni main meedha vese mundhu
okasari team vaipu choodu mama.
vaalla mukhale chepthayi.`,
    emoji: '😨',
  },
  {
    body: `Merge conflict vachchindha mama?
bhayapadaku.
Git ninnu nammi decision neeku vadhilesindhi.`,
  },
  {
    body: `Commit message 'fix' ani raasthe
aaru nelala tharvatha neeke artham kaadhu mama.`,
  },
  {
    body: `Branch peru 'test2-final-new' ayithe
nee project kooda alage untundhi mama.`,
    emoji: '😄',
  },
  {
    body: `git pull cheyakunda pani modhalupettava mama?
saayanthram conflict dhaggara kaludhdham.`,
  },
  {
    body: `Rebase arthamaindha mama?

leka bhayapadatam maaneshava?
rendu okati kaadhu.`,
  },
  {
    body: `Stash lo pettina code ni marchipoku mama.
adhi akkade opigga yedhuruchusthu untundhi.`,
  },
  {
    body: `chinna chinna commit lu cheyyi mama.
pedhdha commit ni review cheyadam yevariki ishtam undadhu.`,
  },
  {
    body: `git reset --hard vese mundhu
okka kshanam aagu mama.
adhi venakki raadhu.`,
    emoji: '💀',
  },
  {
    body: `PR lo 400 files unte
yevaru review cheyaru mama.
'LGTM' ani raasestharu.`,
    emoji: '😂',
  },
  {
    body: `Git history ante nee project katha mama.
shubhranga raayi.`,
  },
  {
    body: `main branch loki neruga commit chesthunnava mama?
dhairyavanthudivi.`,
    emoji: '💀',
  },
  {
    body: `Git lo yedhaina thappu cheshava mama?
bhayapadaku — reflog undhi.
Git nee kante yekkuva gurthupettukuntundhi.`,
    emoji: '🙏',
  },
  {
    body: `Conflict resolve chesetappudu rendu vaipula chadhuvu mama.
'accept theirs' yeppudu sulabhamaina dhaari kaadhu.`,
  },
  {
    body: `'ee branch yendhuku undhi?' ani adigithe
yevariki theliyadhu mama.
ayina yevaru delete cheyaru.`,
  },
];
