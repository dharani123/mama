import { DEFAULT_CATEGORY, findCommand, renderCategory } from './commands.js';
import { renderHelp, renderUnknown, renderVersion } from './help.js';

/** What a run of the CLI produced. */
export interface CliResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

const HELP_FLAGS = new Set(['--help', '-h', 'help']);
const VERSION_FLAGS = new Set(['--version', '-v', '-V', 'version']);

/** The name to print in help and error text when nothing else is known. */
export const DEFAULT_PROGRAM_NAME = 'mama';

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
): CliResult {
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
