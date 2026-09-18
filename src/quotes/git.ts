import type { Message } from './types.js';

/**
 * Git humour - `mama git`.
 *
 * Every git command here is plain text. MAMA prints it and nothing else;
 * no quote is ever handed to a shell.
 */
export const git: readonly Message[] = [
  {
    body: `Commit cheyakunda code marchukuntu pote
okaroju nuvve em cheshavo marchipotavu mama. 😂`,
    footer: 'git commit -m "mama said so"',
  },
  {
    body: `git push --force ni main mida vese mundu
okasari team vaipu chudu mama.
valla mukhale cheptayi.`,
    emoji: '😨',
  },
  {
    body: `Merge conflict vachchinda mama?
bhayapadaku.
Git ninnu nammi decision niku vadilesindi.`,
  },
  {
    body: `Commit message 'fix' ani raste
aru nelala tarvata nike artham kadu mama.`,
  },
  {
    body: `Branch peru 'test2-final-new' ayite
ni project kuda alage untundi mama.`,
    emoji: '😄',
  },
  {
    body: `git pull cheyakunda pani modalupettava mama?
sayantram conflict daggara kaluddam.`,
  },
  {
    body: `Rebase arthamainda mama?

leka bhayapadatam maneshava?
rendu okati kadu.`,
  },
  {
    body: `Stash lo pettina code ni marchipoku mama.
adi akkade opigga eduruchustu untundi.`,
  },
  {
    body: `chinna chinna commit lu cheyyi mama.
pedda commit ni review cheyadam evariki ishtam undadu.`,
  },
  {
    body: `git reset --hard vese mundu
okka kshanam agu mama.
adi venakki radu.`,
    emoji: '💀',
  },
  {
    body: `PR lo 400 files unte
evaru review cheyaru mama.
'LGTM' ani rasestaru.`,
    emoji: '😂',
  },
  {
    body: `Git history ante ni project katha mama.
shubhranga rayi.`,
  },
  {
    body: `main branch loki neruga commit chestunnava mama?
dhairyavantudivi.`,
    emoji: '💀',
  },
  {
    body: `Git lo edaina tappu cheshava mama?
bhayapadaku — reflog undi.
Git ni kante ekkuva gurtupettukuntundi.`,
    emoji: '🙏',
  },
  {
    body: `Conflict resolve chesetappudu rendu vaipula chaduvu mama.
'accept theirs' eppudu sulabhamaina dari kadu.`,
  },
  {
    body: `'i branch enduku undi?' ani adigite
evariki teliyadu mama.
ayina evaru delete cheyaru.`,
  },
];
