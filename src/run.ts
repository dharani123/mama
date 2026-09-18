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

/**
 * Route arguments to output.
 *
 * Returns the text instead of printing it, which is what makes every command
 * testable without spawning a process.
 */
export function run(argv: readonly string[]): CliResult {
  const [first, ...rest] = argv;

  if (first === undefined) {
    return ok(renderCategory(DEFAULT_CATEGORY));
  }
  if (HELP_FLAGS.has(first)) {
    return ok(renderHelp());
  }
  if (VERSION_FLAGS.has(first)) {
    return ok(renderVersion());
  }

  const command = findCommand(first);
  if (command === undefined) {
    return fail(renderUnknown(first));
  }

  // `mama code please` is almost certainly a slip, not a request. Say so
  // rather than quietly ignoring the extra word.
  const extra = rest[0];
  if (extra !== undefined) {
    return fail(renderUnknown(extra));
  }

  return ok(renderCategory(command.category));
}

function ok(stdout: string): CliResult {
  return { stdout, stderr: '', exitCode: 0 };
}

function fail(stderr: string): CliResult {
  return { stdout: '', stderr, exitCode: 1 };
}
