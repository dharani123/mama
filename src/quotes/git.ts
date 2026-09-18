import type { Message } from './types.js';

/**
 * Git humour - `mama git`.
 *
 * Every git command here is plain text. MAMA prints it and nothing else;
 * no quote is ever handed to a shell.
 */
export const git: readonly Message[] = [
  {
    body: `Commit చేయకుండా code మార్చుకుంటూ పోతే
ఒకరోజు నువ్వే ఏం చేశావో మర్చిపోతావు మామా. 😂`,
    footer: 'git commit -m "mama said so"',
  },
  {
    body: `git push --force ని main మీద వేసే ముందు
ఒకసారి team వైపు చూడు మామా.
వాళ్ళ ముఖాలే చెప్తాయి.`,
    emoji: '😨',
  },
  {
    body: `Merge conflict వచ్చిందా మామా?
భయపడకు.
Git నిన్ను నమ్మి decision నీకు వదిలేసింది.`,
  },
  {
    body: `Commit message 'fix' అని రాస్తే
ఆరు నెలల తర్వాత నీకే అర్థం కాదు మామా.`,
  },
  {
    body: `Branch పేరు 'test2-final-new' అయితే
నీ project కూడా అలాగే ఉంటుంది మామా.`,
    emoji: '😄',
  },
  {
    body: `git pull చేయకుండా పని మొదలుపెట్టావా మామా?
సాయంత్రం conflict దగ్గర కలుద్దాం.`,
  },
  {
    body: `Rebase అర్థమైందా మామా?

లేక భయపడటం మానేశావా?
రెండూ ఒకటి కాదు.`,
  },
  {
    body: `Stash లో పెట్టిన code ని మర్చిపోకు మామా.
అది అక్కడే ఓపిగ్గా ఎదురుచూస్తూ ఉంటుంది.`,
  },
  {
    body: `చిన్న చిన్న commit లు చెయ్యి మామా.
పెద్ద commit ని review చేయడం ఎవరికీ ఇష్టం ఉండదు.`,
  },
  {
    body: `git reset --hard వేసే ముందు
ఒక్క క్షణం ఆగు మామా.
అది వెనక్కి రాదు.`,
    emoji: '💀',
  },
  {
    body: `PR లో 400 files ఉంటే
ఎవరూ review చేయరు మామా.
'LGTM' అని రాసేస్తారు.`,
    emoji: '😂',
  },
  {
    body: `Git history అంటే నీ project కథ మామా.
శుభ్రంగా రాయి.`,
  },
  {
    body: `main branch లోకి నేరుగా commit చేస్తున్నావా మామా?
ధైర్యవంతుడివి.`,
    emoji: '💀',
  },
  {
    body: `Git లో ఏదైనా తప్పు చేశావా మామా?
భయపడకు — reflog ఉంది.
Git నీ కంటే ఎక్కువ గుర్తుపెట్టుకుంటుంది.`,
    emoji: '🙏',
  },
  {
    body: `Conflict resolve చేసేటప్పుడు రెండు వైపులా చదువు మామా.
'accept theirs' ఎప్పుడూ సులభమైన దారి కాదు.`,
  },
  {
    body: `'ఈ branch ఎందుకు ఉంది?' అని అడిగితే
ఎవరికీ తెలియదు మామా.
అయినా ఎవరూ delete చేయరు.`,
  },
];
