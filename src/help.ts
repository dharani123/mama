import { COMMANDS } from './commands.js';
import { VERSION } from './generated/version.js';
import { accent, bold, dim } from './utils/colors.js';

/** Minimum gap between the invocation column and its description. */
const GAP = 2;

function usageRows(programName: string): [string, string][] {
  return [
    [programName, 'Random wisdom'],
    ...COMMANDS.map(
      (command): [string, string] => [`${programName} ${command.name}`, command.summary],
    ),
  ];
}

export function renderHelp(programName: string): string {
  const rows = usageRows(programName);
  const options: [string, string][] = [
    ['--help, -h', 'Show this help'],
    ['--version, -v', 'Show version'],
  ];

  // The command name is not fixed - it is "mama" from the Debian package and
  // "dharani-mama" from npm - so the column is measured, not hard-coded.
  const width =
    Math.max(...[...rows, ...options].map(([left]) => left.length)) + GAP;
  const row = ([left, right]: [string, string]) => `  ${left.padEnd(width)}${right}`;

  return [
    accent('MAMA CLI 😎'),
    '',
    'నీ టెర్మినల్ మామా.',
    '',
    bold('Usage:'),
    ...rows.map(row),
    '',
    bold('Options:'),
    ...options.map(row),
    '',
    dim('MAMA ఎప్పుడూ నీ మాట వింటుంది మామా — కానీ ఏ command నీ తరఫున run చేయదు. 🙂'),
  ].join('\n');
}

export function renderVersion(programName: string): string {
  return `${programName} version ${VERSION}`;
}

/** The friendly "I don't know that one yet" reply. */
export function renderUnknown(input: string, programName: string): string {
  return [
    accent('మామా... 🤔'),
    '',
    `"${input}" నాకు ఇంకా తెలియదు.`,
    '',
    'Try:',
    `  ${programName} --help`,
  ].join('\n');
}
