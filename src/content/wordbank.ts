import raw from "./wordbank.json";

/** Everyday vocabulary from the reference sheet (see scripts/import-wordbank.py). */
export type Word = { ko: string; rom: string; en: string; category: string; part: string };

export const WORDS: Word[] = raw as Word[];

/** Stable item id for tracking a word in learner state. */
export const wordId = (w: Pick<Word, "ko">) => `word.${w.ko}`;

/** Unique words (some appear in two categories), in sheet order. */
export const UNIQUE_WORDS: Word[] = WORDS.filter((w, i) => WORDS.findIndex((x) => x.ko === w.ko) === i);

/**
 * Word of the day: the same word for everyone on a given local date, cycling
 * through the list in a shuffled but fixed order.
 */
export function wordOfTheDay(date: Date): Word {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
  const n = UNIQUE_WORDS.length;
  // 211 is prime and coprime with the list length, so this visits every word once per cycle.
  return UNIQUE_WORDS[(day * 211) % n];
}
