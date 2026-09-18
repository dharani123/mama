import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { COMMANDS, DEFAULT_CATEGORY, pickMessage } from '../src/commands.js';
import { VERSION } from '../src/generated/version.js';
import { QUOTES, STYLES } from '../src/quotes/index.js';
import { run } from '../src/run.js';

describe('command routing', () => {
  it('returns general wisdom when run with no arguments', () => {
    const result = run([]);
    assert.equal(result.exitCode, 0);
    assert.equal(result.stderr, '');
    assert.ok(result.stdout.startsWith(STYLES[DEFAULT_CATEGORY].heading));
  });

  for (const command of COMMANDS) {
    it(`\`mama ${command.name}\` prints a ${command.category} message`, () => {
      const result = run([command.name]);
      assert.equal(result.exitCode, 0);
      assert.equal(result.stderr, '');
      assert.ok(result.stdout.length > 0);
      assert.ok(
        result.stdout.startsWith(STYLES[command.category].heading),
        `expected heading for category ${command.category}`,
      );
    });
  }
});

describe('random selection stays inside the requested category', () => {
  for (const category of Object.keys(QUOTES) as (keyof typeof QUOTES)[]) {
    it(`every pick from "${category}" comes from that category`, () => {
      const pool = QUOTES[category];
      const seen = new Set<unknown>();
      for (let i = 0; i < 300; i += 1) {
        const message = pickMessage(category);
        assert.ok(pool.includes(message), `pick escaped the "${category}" pool`);
        seen.add(message);
      }
      // 300 draws should reach most of a pool this size - guards against a
      // selector that always returns the same entry.
      assert.ok(seen.size > 1, `"${category}" only ever returned one message`);
    });
  }
});

describe('mama --help', () => {
  const help = run(['--help']);

  it('exits successfully', () => {
    assert.equal(help.exitCode, 0);
    assert.equal(help.stderr, '');
  });

  it('lists every command', () => {
    for (const command of COMMANDS) {
      assert.match(help.stdout, new RegExp(`mama ${command.name}\\b`));
    }
  });

  it('documents the bare command and both options', () => {
    assert.match(help.stdout, /Usage:/);
    assert.match(help.stdout, /Options:/);
    assert.match(help.stdout, /--help/);
    assert.match(help.stdout, /--version/);
  });

  it('is also reachable via -h and help', () => {
    assert.equal(run(['-h']).stdout, help.stdout);
    assert.equal(run(['help']).stdout, help.stdout);
  });
});

describe('mama --version', () => {
  it('prints the version from package.json', () => {
    const result = run(['--version']);
    assert.equal(result.exitCode, 0);
    assert.equal(result.stdout, `mama version ${VERSION}`);
    assert.match(result.stdout, /^mama version \d+\.\d+\.\d+$/);
  });

  it('is also reachable via -v', () => {
    assert.equal(run(['-v']).stdout, `mama version ${VERSION}`);
  });
});

describe('invalid input', () => {
  it('fails friendly on an unknown command', () => {
    const result = run(['something']);
    assert.equal(result.exitCode, 1);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, /మామా/);
    assert.match(result.stderr, /"something"/);
    assert.match(result.stderr, /mama --help/);
  });

  it('does not leak a stack trace', () => {
    assert.doesNotMatch(run(['nope']).stderr, /at .*\.js:\d+/);
  });

  it('rejects an unexpected extra argument', () => {
    const result = run(['code', 'please']);
    assert.equal(result.exitCode, 1);
    assert.match(result.stderr, /"please"/);
  });

  it('rejects an unknown flag', () => {
    assert.equal(run(['--verbose']).exitCode, 1);
  });
});

describe('terminal output', () => {
  it('emits no ANSI escapes when stdout is not a TTY', () => {
    // The test runner's stdout is a pipe, so colour must be off.
    for (const argv of [[], ['roast'], ['--help']]) {
      assert.doesNotMatch(run(argv).stdout, /\[/);
    }
  });

  it('emits Telugu characters', () => {
    assert.match(run([]).stdout, /[ఀ-౿]/);
  });

  it('keeps lines narrow enough for an 80-column terminal', () => {
    for (const command of [...COMMANDS.map((c) => c.name), '']) {
      for (let i = 0; i < 40; i += 1) {
        const output = run(command === '' ? [] : [command]).stdout;
        for (const line of output.split('\n')) {
          assert.ok(
            [...line].length <= 72,
            `line too long in "mama ${command}": ${line}`,
          );
        }
      }
    }
  });
});
