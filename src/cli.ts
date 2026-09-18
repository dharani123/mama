#!/usr/bin/env node
import { run } from './run.js';

/** Entry point. Keeps stack traces away from people who just wanted a joke. */
function main(): void {
  try {
    const result = run(process.argv.slice(2));
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
