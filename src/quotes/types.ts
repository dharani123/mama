/** The ten content categories shipped in version 1.0. */
export type Category =
  | 'general'
  | 'motivate'
  | 'calm'
  | 'morning'
  | 'night'
  | 'code'
  | 'git'
  | 'roast'
  | 'coffee'
  | 'friday';

/**
 * One thing MAMA can say.
 *
 * `body` is inert data - it is only ever printed, never evaluated as a shell
 * command, which is why a quote may safely contain text like
 * `git commit -m "mama said so"`.
 *
 * A function body lets a message vary each run (the coffee meters); it must
 * stay pure and must not touch the filesystem or the network.
 */
export interface Message {
  /** The quote itself, or a generator for messages that vary per run. */
  readonly body: string | (() => string);
  /** Overrides the category's default heading emoji. */
  readonly emoji?: string;
  /** Overrides the category's default sign-off. `null` means no sign-off. */
  readonly footer?: string | null;
  /** Print the body verbatim: no quotation marks, no indentation. */
  readonly raw?: boolean;
}

/** How a category dresses its messages. */
export interface CategoryStyle {
  /** Leading word(s) of the heading, before the emoji. */
  readonly heading: string;
  /** Default heading emoji for the category. */
  readonly emoji: string;
  /** Default sign-off printed under the quote. */
  readonly footer?: string;
}
