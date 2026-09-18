import { COMMANDS } from './commands.js';
import { VERSION } from './generated/version.js';
import { accent, bold, dim } from './utils/colors.js';

/** Width of the left column in the usage block. */
const COLUMN = 21;

function row(invocation: string, summary: string): string {
  return `  ${invocation.padEnd(COLUMN)}${summary}`;
}

export function renderHelp(): string {
  const lines = [
    accent('MAMA CLI 😎'),
    '',
    'నీ టెర్మినల్ మామా.',
    '',
    bold('Usage:'),
    row('mama', 'Random wisdom'),
    ...COMMANDS.map((command) => row(`mama ${command.name}`, command.summary)),
    '',
    bold('Options:'),
    row('--help, -h', 'Show this help'),
    row('--version, -v', 'Show version'),
    '',
    dim('MAMA ఎప్పుడూ నీ మాట వింటుంది మామా — కానీ ఏ command నీ తరఫున run చేయదు. 🙂'),
  ];
  return lines.join('\n');
}

export function renderVersion(): string {
  return `mama version ${VERSION}`;
}

/** The friendly "I don't know that one yet" reply. */
export function renderUnknown(input: string): string {
  return [
    accent('మామా... 🤔'),
    '',
    `"${input}" నాకు ఇంకా తెలియదు.`,
    '',
    'Try:',
    '  mama --help',
  ].join('\n');
}
