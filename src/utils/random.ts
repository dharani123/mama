/**
 * Randomness for quote selection.
 *
 * Normally backed by Math.random(). Setting MAMA_SEED makes every pick
 * reproducible, which is what the test-suite uses - no network, no crypto,
 * no measurable startup cost.
 */

/** mulberry32: tiny, fast, good enough for picking a joke. */
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createRandom(): () => number {
  const seed = process.env['MAMA_SEED'];
  if (seed === undefined || seed === '') return Math.random;
  const parsed = Number.parseInt(seed, 10);
  return Number.isNaN(parsed) ? Math.random : seededRandom(parsed);
}

const random = createRandom();

/** Index most recently returned, keyed by the identity of the list. */
const lastPicked = new WeakMap<readonly unknown[], number>();

/**
 * Pick a random item, avoiding an immediate repeat of the previous pick from
 * the same list within this process. Nothing is written to disk.
 */
export function pick<T>(items: readonly T[]): T {
  if (items.length === 0) {
    throw new Error('pick() called with an empty list');
  }
  if (items.length === 1) return items[0] as T;

  const previous = lastPicked.get(items);
  let index = Math.floor(random() * items.length);
  if (index === previous) {
    index = (index + 1 + Math.floor(random() * (items.length - 1))) % items.length;
  }
  lastPicked.set(items, index);
  return items[index] as T;
}

/** Random integer in [min, max] - used by the coffee meters. */
export function randomInt(min: number, max: number): number {
  return min + Math.floor(random() * (max - min + 1));
}
