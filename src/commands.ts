import { QUOTES, STYLES } from './quotes/index.js';
import type { Category, Message } from './quotes/types.js';
import { formatMessage } from './utils/format.js';
import { pick } from './utils/random.js';

/** One subcommand of `mama`. */
export interface Command {
  /** What the user types after `mama`. */
  readonly name: string;
  /** Which quote collection it draws from. */
  readonly category: Category;
  /** One-line description shown by `mama --help`. */
  readonly summary: string;
}

/**
 * The command table. Adding a command in a future version means adding one
 * entry here plus one quote file - nothing in the CLI needs to change.
 */
export const COMMANDS: readonly Command[] = [
  { name: 'motivate', category: 'motivate', summary: 'Motivation' },
  { name: 'calm', category: 'calm', summary: 'Calm down' },
  { name: 'morning', category: 'morning', summary: 'Morning motivation' },
  { name: 'night', category: 'night', summary: 'Night thoughts' },
  { name: 'code', category: 'code', summary: 'Developer wisdom' },
  { name: 'git', category: 'git', summary: 'Git wisdom' },
  { name: 'roast', category: 'roast', summary: 'Roast my terminal' },
  { name: 'coffee', category: 'coffee', summary: 'Coffee wisdom ☕' },
  { name: 'friday', category: 'friday', summary: 'Friday mode 🎉' },
];

/** The category used when `mama` is run with no arguments. */
export const DEFAULT_CATEGORY: Category = 'general';

export function findCommand(name: string): Command | undefined {
  return COMMANDS.find((command) => command.name === name);
}

/** Pick a random message from a category. Exposed so tests can check origin. */
export function pickMessage(category: Category): Message {
  return pick(QUOTES[category]);
}

/** Pick a random message from a category and render it for the terminal. */
export function renderCategory(category: Category): string {
  return formatMessage(pickMessage(category), STYLES[category]);
}
