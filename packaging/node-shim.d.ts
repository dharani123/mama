/**
 * Minimal ambient declarations for the Node globals that src/ actually uses.
 *
 * Launchpad and Debian builders have no network access, so `npm ci` cannot
 * run and @types/node is not available as a distribution package. Everything
 * under src/ touches exactly one Node global - `process` - and imports no
 * `node:` modules at all, so declaring that much by hand is enough to compile
 * the real TypeScript sources with nothing but node-typescript installed.
 *
 * This file is used only by tsconfig.debian.json. Normal development still
 * compiles against the full @types/node, which is stricter; if these two ever
 * disagree, @types/node is right and this file is wrong.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
  }

  interface WriteStream {
    isTTY?: boolean;
    write(chunk: string): boolean;
  }

  interface Process {
    argv: string[];
    env: ProcessEnv;
    exitCode: number | undefined;
    stdout: WriteStream;
    stderr: WriteStream;
  }
}

declare const process: NodeJS.Process;
