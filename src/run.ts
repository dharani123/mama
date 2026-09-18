import { DEFAULT_CATEGORY, findCommand, renderCategory } from './commands.js';
import { renderHelp, renderUnknown, renderVersion } from './help.js';
import { transliterate } from './utils/transliterate.js';

/** What a run of the CLI produced. */
export interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

/** Which script MAMA speaks in. */
export type Script = 'roman' | 'telugu';

const HELP_FLAGS = new Set(['--help', '-h', 'help']);
const VERSION_FLAGS = new Set(['--version', '-v', '-V', 'version']);

/** Script flags are global: they may appear before or after the command. */
const SCRIPT_FLAGS: Record<string, Script> = {
  '--telugu': 'telugu',
  '--roman': 'roman',
};

/** The name to print in help and error text when nothing else is known. */
export const DEFAULT_PROGRAM_NAME = 'mama';

/**
 * Latin by default: most terminals cannot shape Telugu, and a message you
 * cannot read is worse than one in the wrong script. See utils/transliterate.
 */
export const DEFAULT_SCRIPT: Script = 'roman';

/**
 * Route arguments to output.
 *
 * Returns the text instead of printing it, which is what makes every command
 * testable without spawning a process.
 *
 * `programName` is what the user actually typed: the Debian package installs
 * this as `mama`, npm installs it as `dharani-mama`, and help text has to
 * match whichever one they used.
 */
export function run(
  argv: readonly string[],
  programName: string = DEFAULT_PROGRAM_NAME,
  defaultScript: Script = DEFAULT_SCRIPT,
): CliResult {
  let script = defaultScript;
  const rest: string[] = [];
  for (const arg of argv) {
    const flagged = SCRIPT_FLAGS[arg];
    if (flagged === undefined) rest.push(arg);
    else script = flagged;
  }

  const result = route(rest, programName);
  if (script === 'telugu') return result;

  // Transliterating the finished screen - heading, quote and sign-off at once
  // - means no part of the output can be left behind in a script the terminal
  // cannot draw.
  return {
    stdout: transliterate(result.stdout),
    stderr: transliterate(result.stderr),
    exitCode: result.exitCode,
  };
}

function route(argv: readonly string[], programName: string): CliResult {
  const [first, ...rest] = argv;

  if (first === undefined) {
    return ok(renderCategory(DEFAULT_CATEGORY));
  }
  if (HELP_FLAGS.has(first)) {
    return ok(renderHelp(programName));
  }
  if (VERSION_FLAGS.has(first)) {
    return ok(renderVersion(programName));
  }

  const command = findCommand(first);
  if (command === undefined) {
    return fail(renderUnknown(first, programName));
  }

  // `mama code please` is almost certainly a slip, not a request. Say so
  // rather than quietly ignoring the extra word.
  const extra = rest[0];
  if (extra !== undefined) {
    return fail(renderUnknown(extra, programName));
  }

  return ok(renderCategory(command.category));
}

function ok(stdout: string): CliResult {
  return { stdout, stderr: '', exitCode: 0 };
}

function fail(stderr: string): CliResult {
  return { stdout: '', stderr, exitCode: 1 };
}
