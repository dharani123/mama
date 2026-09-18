import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';

import { QUOTES, STYLES } from '../src/quotes/index.js';
import type { Category, Message } from '../src/quotes/types.js';
import { formatMessage, meter } from '../src/utils/format.js';

/** Minimums from the requirements document. */
const MINIMUMS: Record<Category, number> = {
  general: 20,
  motivate: 20,
  calm: 15,
  morning: 15,
  night: 15,
  code: 20,
  git: 15,
  roast: 20,
  coffee: 10,
  friday: 10,
};

const categories = Object.keys(QUOTES) as Category[];

function bodyOf(message: Message): string {
  return typeof message.body === 'function' ? message.body() : message.body;
}

describe('quote collections', () => {
  for (const category of categories) {
    it(`"${category}" meets its minimum of ${MINIMUMS[category]}`, () => {
      assert.ok(
        QUOTES[category].length >= MINIMUMS[category],
        `"${category}" has ${QUOTES[category].length}`,
      );
    });
  }

  it('ships at least 160 messages in total', () => {
    const total = categories.reduce((sum, c) => sum + QUOTES[c].length, 0);
    assert.ok(total >= 160, `only ${total} messages`);
  });

  it('has a style for every category and a category for every style', () => {
    assert.deepEqual(categories.sort(), Object.keys(STYLES).sort());
  });

  it('never ships an empty message', () => {
    for (const category of categories) {
      for (const message of QUOTES[category]) {
        assert.ok(bodyOf(message).trim().length > 0, `empty body in ${category}`);
      }
    }
  });

  it('contains no duplicate messages anywhere in the corpus', () => {
    const seen = new Map<string, Category>();
    for (const category of categories) {
      for (const message of QUOTES[category]) {
        if (typeof message.body !== 'string') continue;
        const previous = seen.get(message.body);
        assert.equal(
          previous,
          undefined,
          `duplicate message in "${category}" and "${previous}"`,
        );
        seen.set(message.body, category);
      }
    }
  });

  it('says "mama" in every general message', () => {
    for (const message of QUOTES.general) {
      assert.match(bodyOf(message), /\bmama\b/);
    }
  });

  it('says "mama" in at least 80% of all messages', () => {
    const all = categories.flatMap((c) => QUOTES[c]);
    const withMama = all.filter((m) => /\bmama\b/.test(bodyOf(m))).length;
    assert.ok(
      withMama / all.length >= 0.8,
      `only ${withMama}/${all.length} mention mama`,
    );
  });
});

describe('formatting', () => {
  it('renders heading, quoted body and footer', () => {
    const output = formatMessage(
      { body: 'line one\nline two' },
      { heading: 'mama', emoji: '❤️', footer: 'bye' },
    );
    assert.equal(output, 'mama ❤️\n\n"line one\n line two"\n\nbye');
  });

  it('lets a message override the emoji and footer', () => {
    const output = formatMessage(
      { body: 'hi', emoji: '🔥', footer: 'custom' },
      { heading: 'mama', emoji: '❤️', footer: 'default' },
    );
    assert.equal(output, 'mama 🔥\n\n"hi"\n\ncustom');
  });

  it('omits the footer when a message sets it to null', () => {
    const output = formatMessage(
      { body: 'hi', footer: null },
      { heading: 'mama', emoji: '❤️', footer: 'default' },
    );
    assert.equal(output, 'mama ❤️\n\n"hi"');
  });

  it('prints raw bodies without quotation marks', () => {
    const output = formatMessage(
      { body: 'a\nb', raw: true, footer: null },
      { heading: 'mama', emoji: '☕' },
    );
    assert.equal(output, 'mama ☕\n\na\nb');
  });

  it('renders every shipped message without throwing', () => {
    for (const category of categories) {
      for (const message of QUOTES[category]) {
        assert.ok(formatMessage(message, STYLES[category]).length > 0);
      }
    }
  });

  it('draws meters at the requested width and clamps out-of-range values', () => {
    assert.equal(meter(80), '████████░░ 80%');
    assert.equal(meter(0), '░░░░░░░░░░ 0%');
    assert.equal(meter(140), '██████████ 100%');
    assert.equal(meter(-20), '░░░░░░░░░░ 0%');
  });
});

describe('safety', () => {
  const srcDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src');

  function sourceFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(full);
      return entry.name.endsWith('.ts') ? [full] : [];
    });
  }

  it('has no Telugu script anywhere in the source', () => {
    // Messages are Telugu written in Latin letters. Telugu script does not
    // survive a terminal grid, so a quote in it would be unreadable for most
    // people running this - fail the build rather than ship it.
    const telugu = /[\u0C00-\u0C7F]/;
    for (const file of sourceFiles(srcDir)) {
      assert.doesNotMatch(readFileSync(file, 'utf8'), telugu, `${file} contains Telugu script`);
    }
  });

  it('never imports a way to execute shell commands', () => {
    // A quote may contain text like `git commit -m "mama said so"`, so the
    // guarantee that it is only ever printed has to hold at the source level.
    const forbidden = /child_process|node:vm\b|\beval\s*\(|new Function\s*\(/;
    for (const file of sourceFiles(srcDir)) {
      const contents = readFileSync(file, 'utf8');
      assert.doesNotMatch(contents, forbidden, `${file} can execute code`);
    }
  });

  it('never writes to the filesystem or the network', () => {
    const forbidden = /writeFileSync|appendFile|node:https?\b|\bfetch\s*\(/;
    for (const file of sourceFiles(srcDir)) {
      assert.doesNotMatch(readFileSync(file, 'utf8'), forbidden, `${file} does I/O`);
    }
  });
});
