/**
 * Telugu to Latin transliteration.
 *
 * Many terminal emulators cannot shape Telugu correctly - conjuncts and vowel
 * marks come out as boxes or land in the wrong place - even when Telugu fonts
 * are installed, because that needs complex-text layout a terminal grid does
 * not do. So MAMA speaks Latin by default and keeps Telugu behind --telugu.
 *
 * The mapping targets how Telugu speakers actually type in Latin script, not
 * a scholarly scheme: no diacritics, and long vowels collapse to their short
 * form, because "baagaa" reads worse than "baga" to the people this is for.
 *
 * Anything that is not Telugu - Latin words, punctuation, emoji - passes
 * through untouched, which is what lets this run over whole rendered screens.
 */

const CONSONANTS: Record<string, string> = {
  క: 'k', ఖ: 'kh', గ: 'g', ఘ: 'gh', ఙ: 'ng',
  చ: 'ch', ఛ: 'chh', జ: 'j', ఝ: 'jh', ఞ: 'ny',
  ట: 't', ఠ: 'th', డ: 'd', ఢ: 'dh', ణ: 'n',
  త: 't', థ: 'th', ద: 'd', ధ: 'dh', న: 'n',
  ప: 'p', ఫ: 'ph', బ: 'b', భ: 'bh', మ: 'm',
  య: 'y', ర: 'r', ల: 'l', వ: 'v', శ: 'sh', ష: 'sh',
  స: 's', హ: 'h', ళ: 'l', ఱ: 'r', ఴ: 'l',
};

const INDEPENDENT_VOWELS: Record<string, string> = {
  అ: 'a', ఆ: 'a', ఇ: 'i', ఈ: 'i', ఉ: 'u', ఊ: 'u',
  ఋ: 'ru', ౠ: 'ru', ఎ: 'e', ఏ: 'e', ఐ: 'ai',
  ఒ: 'o', ఓ: 'o', ఔ: 'au',
};

/** Dependent vowel signs. Long vowels deliberately collapse to the short form. */
const MATRAS: Record<string, string> = {
  'ా': 'a', 'ి': 'i', 'ీ': 'i', 'ు': 'u', 'ూ': 'u', 'ృ': 'ru', 'ౄ': 'ru',
  'ె': 'e', 'ే': 'e', 'ై': 'ai', 'ొ': 'o', 'ో': 'o', 'ౌ': 'au',
};

const VIRAMA = '్';
const ANUSVARA = 'ం';
const VISARGA = 'ః';

const LABIALS = 'పఫబభమ';
const LIQUIDS_AND_FRICATIVES = 'యరలవశషసహళ';

/**
 * Anusvara takes the place of articulation of whatever follows it, so it is
 * "n" before a stop (kante) but "m" before a labial (sambaram) and before
 * liquids and fricatives (jivitamlo). At the end of a word it is "m":
 * cheyadam, never cheyadan.
 */
function anusvaraFor(next: string | undefined): string {
  if (next === undefined) return 'm';
  if (CONSONANTS[next] === undefined) return 'm';
  if (LABIALS.includes(next)) return 'm';
  if (LIQUIDS_AND_FRICATIVES.includes(next)) return 'm';
  return 'n';
}

/** Transliterate any Telugu in `text`, leaving everything else alone. */
export function transliterate(text: string): string {
  const chars = [...text];
  let out = '';

  for (let i = 0; i < chars.length; i += 1) {
    const char = chars[i] as string;

    const vowel = INDEPENDENT_VOWELS[char];
    if (vowel !== undefined) {
      out += vowel;
      continue;
    }

    const consonant = CONSONANTS[char];
    if (consonant !== undefined) {
      out += consonant;
      const next = chars[i + 1];
      if (next === VIRAMA) {
        i += 1; // Half consonant: no vowel follows.
        continue;
      }
      if (next !== undefined && MATRAS[next] !== undefined) {
        out += MATRAS[next];
        i += 1;
        continue;
      }
      out += 'a'; // The inherent vowel every bare consonant carries.
      continue;
    }

    if (char === ANUSVARA) {
      out += anusvaraFor(chars[i + 1]);
      continue;
    }
    if (char === VISARGA) {
      out += 'h';
      continue;
    }
    // A stray mark with no consonant to attach to; drop it rather than emit
    // a character the terminal cannot draw.
    if (char === VIRAMA || MATRAS[char] !== undefined) continue;

    out += char;
  }

  return out;
}
