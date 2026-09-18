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
    assert.match(result.stderr, /mama/);
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

describe('program name', () => {
  // Installed as `mama` by the Debian package and `dharani-mama` by npm, so
  // help and error text must follow whichever name was invoked.
  it('uses the given name throughout the help output', () => {
    const help = run(['--help'], 'dharani-mama');
    assert.match(help.stdout, /dharani-mama\s+Random wisdom/);
    assert.match(help.stdout, /dharani-mama roast/);
    assert.doesNotMatch(help.stdout, /^\s+mama\s/m);
  });

  it('uses the given name in the version line', () => {
    assert.equal(run(['--version'], 'dharani-mama').stdout, `dharani-mama version ${VERSION}`);
  });

  it('uses the given name when suggesting --help after a bad command', () => {
    assert.match(run(['bogus'], 'dharani-mama').stderr, /dharani-mama --help/);
  });

  it('keeps the description column aligned whatever the name is', () => {
    // The usage column is measured from the longest invocation, so a long
    // name like dharani-mama must not collide with its own description.
    for (const name of ['mama', 'dharani-mama', 'a']) {
      const descriptions: Record<string, string> = {
        'Random wisdom': `  ${name}`,
        Motivation: `  ${name} motivate`,
        'Show this help': '  --help, -h',
      };
      const lines = run(['--help'], name).stdout.split('\n');
      const columns = new Set<number>();

      for (const [description, prefix] of Object.entries(descriptions)) {
        const line = lines.find((l) => l.startsWith(`${prefix} `) && l.endsWith(description));
        assert.ok(line !== undefined, `no "${description}" row for "${name}"`);
        assert.ok(
          line.startsWith(prefix) && line[prefix.length] === ' ',
          `"${name}" row runs into its description: ${line}`,
        );
        columns.add(line.indexOf(description));
      }

      assert.equal(columns.size, 1, `columns not aligned for "${name}": ${[...columns]}`);
    }
  });
});

describe('script', () => {
  const TELUGU = /[\u0C00-\u0C7F]/;

  // MAMA is written in romanised Telugu. Terminals cannot shape Telugu
  // script - conjuncts and vowel marks land wrong even with the fonts
  // installed - so there is no Telugu anywhere, not even in the data.
  it('never emits a Telugu character', () => {
    for (const argv of [[], ['roast'], ['--help'], ['coffee'], ['--version']]) {
      assert.doesNotMatch(run(argv).stdout, TELUGU, `Telugu in: ${argv}`);
    }
    assert.doesNotMatch(run(['bogus']).stderr, TELUGU);
  });

  it('has no Telugu in any shipped message, heading or sign-off', () => {
    for (const category of Object.keys(QUOTES) as (keyof typeof QUOTES)[]) {
      for (const message of QUOTES[category]) {
        const body = typeof message.body === 'function' ? message.body() : message.body;
        assert.doesNotMatch(body, TELUGU, `Telugu in a ${category} message`);
        assert.doesNotMatch(message.footer ?? '', TELUGU, `Telugu in a ${category} footer`);
      }
      assert.doesNotMatch(STYLES[category].heading, TELUGU);
      assert.doesNotMatch(STYLES[category].footer ?? '', TELUGU);
    }
  });

  it('still says mama', () => {
    // The whole point of the thing.
    assert.match(run([]).stdout, /mama/);
  });
});

describe('terminal output', () => {
  it('emits no ANSI escapes when stdout is not a TTY', () => {
    // The test runner's stdout is a pipe, so colour must be off.
    for (const argv of [[], ['roast'], ['--help']]) {
      assert.doesNotMatch(run(argv).stdout, /\[/);
    }
  });


  it('keeps lines narrow enough for an 80-column terminal', () => {
    for (const command of [...COMMANDS.map((c) => c.name), '']) {
      for (let i = 0; i < 40; i += 1) {
        const output = run(command === '' ? [] : [command]).stdout;
        for (const line of output.split('\n')) {
          assert.ok(
            [...line].length <= 76,
            `line too long in "mama ${command}": ${line}`,
          );
        }
      }
    }
  });
});
