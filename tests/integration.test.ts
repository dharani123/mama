import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

import { COMMANDS } from '../src/commands.js';

const CLI = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'cli.js');

function mama(args: string[], env: NodeJS.ProcessEnv = {}) {
  const result = spawnSync(process.execPath, [CLI, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
  return {
    stdout: result.stdout,
    stderr: result.stderr,
    status: result.status,
  };
}

describe('the real binary', () => {
  it('exits 0 for the bare command', () => {
    const result = mama([]);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /మామా/);
  });

  for (const command of COMMANDS) {
    it(`exits 0 for \`mama ${command.name}\``, () => {
      const result = mama([command.name]);
      assert.equal(result.status, 0);
      assert.ok(result.stdout.trim().length > 0);
      assert.equal(result.stderr, '');
    });
  }

  it('exits non-zero for an unknown command and writes to stderr', () => {
    const result = mama(['something']);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /"something"/);
  });

  it('prints the version in the documented format', () => {
    const result = mama(['--version']);
    assert.equal(result.status, 0);
    assert.match(result.stdout.trim(), /^mama version \d+\.\d+\.\d+$/);
  });
});

describe('MAMA_SEED', () => {
  it('makes output reproducible across processes', () => {
    const first = mama(['motivate'], { MAMA_SEED: '42' });
    const second = mama(['motivate'], { MAMA_SEED: '42' });
    assert.equal(first.stdout, second.stdout);
  });

  it('gives different output for different seeds', () => {
    // Two seeds can collide on one command, so check several: if none of them
    // differ, the seed is being ignored.
    const argvs = [[], ['motivate'], ['code'], ['roast']];
    const differs = argvs.some(
      (argv) =>
        mama(argv, { MAMA_SEED: '1' }).stdout !== mama(argv, { MAMA_SEED: '99999' }).stdout,
    );
    assert.ok(differs, 'seed had no effect');
  });
});

describe('colour handling', () => {
  it('stays plain when piped', () => {
    assert.doesNotMatch(mama([]).stdout, /\[/);
  });

  it('stays plain when NO_COLOR is set even with FORCE_COLOR', () => {
    const result = mama([], { NO_COLOR: '1', FORCE_COLOR: '1' });
    assert.doesNotMatch(result.stdout, /\[/);
  });

  it('colours output when FORCE_COLOR is set', () => {
    const result = mama([], { FORCE_COLOR: '1' });
    assert.match(result.stdout, /\[36m/);
  });
});

describe('safety', () => {
  it('leaves no git repository behind after `mama git`', () => {
    // Quotes contain text like `git commit -m "mama said so"`. Nothing runs.
    const before = spawnSync('git', ['rev-parse', '--git-dir'], { encoding: 'utf8' });
    mama(['git']);
    const after = spawnSync('git', ['rev-parse', '--git-dir'], { encoding: 'utf8' });
    assert.equal(before.status, after.status);
    assert.equal(before.stdout, after.stdout);
  });
});
