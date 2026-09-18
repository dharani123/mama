#!/usr/bin/env node
import { DEFAULT_PROGRAM_NAME, run } from './run.js';

/**
 * Work out what the user actually typed.
 *
 * The same code is installed under two names - `mama` from the Debian
 * package, `dharani-mama` from npm - and help text has to match. argv[1] is
 * the path as invoked, symlink and all, so its basename is that name. When
 * the compiled entry point is run directly (development, tests) there is no
 * meaningful name, so fall back to the default.
 */
function programName(): string {
  const invoked = process.argv[1];
  if (invoked === undefined) return DEFAULT_PROGRAM_NAME;
  const base = invoked.slice(invoked.lastIndexOf('/') + 1);
  return base === '' || base === 'cli.js' ? DEFAULT_PROGRAM_NAME : base;
}

/** Entry point. Keeps stack traces away from people who just wanted a joke. */
function main(): void {
  try {
    const result = run(process.argv.slice(2), programName());
    if (result.stdout !== '') process.stdout.write(`${result.stdout}\n`);
    if (result.stderr !== '') process.stderr.write(`${result.stderr}\n`);
    process.exitCode = result.exitCode;
  } catch (error) {
    // MAMA_DEBUG=1 gives developers the real error; everyone else gets Telugu.
    if (process.env['MAMA_DEBUG'] !== undefined) {
      throw error;
    }
    process.stderr.write('మామా... ఏదో తేడా కొట్టింది. 😅\nMAMA_DEBUG=1 పెట్టి మళ్ళీ try చెయ్యి.\n');
    process.exitCode = 1;
  }
}

main();
