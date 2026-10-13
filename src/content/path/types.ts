import type { Block, Line } from "../lessons/schema";

/**
 * The learning path: five levels, each an ordered list of chapters. A chapter
 * is a few short points to read, then a quiz. Chapters are assembled from
 * content that already exists (feed cards, Learn lessons, the word bank), so
 * the path adds structure without duplicating material.
 */

export const CATEGORIES = ["hangul", "grammar", "vocabulary", "conversation", "culture"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABEL: Record<Category, string> = {
  hangul: "Hangul and sounds",
  grammar: "Grammar",
  vocabulary: "Vocabulary",
  conversation: "Conversation",
  culture: "Culture",
};

/** Where a chapter's material comes from. */
export type Source =
  /** Feed cards: a Foundations module, or cards picked by level and topic. */
  | { kind: "cards"; module?: number; stage?: number; topics?: string[]; ids?: string[] }
  /** Sections of a Learn lesson, by index. */
  | { kind: "lesson"; lesson: string; sections: number[] }
  /** Word-bank words in one category, optionally a slice of it. */
  | { kind: "words"; category: string; from?: number; to?: number };

export type ChapterSpec = {
  /** Unique within the level; the chapter id becomes `chapter.<level>-<slug>`. */
  slug: string;
  title: string;
  korean?: string;
  category: Category;
  summary: string;
  sources: Source[];
};

export type LevelSpec = {
  number: number;
  title: string;
  korean: string;
  /** Feed stage this level opens (Level 1 is stage 0). */
  stage: number;
  /** Highest content level value (0 Beginner … 6 Native) whose cards belong to this level. */
  maxLevel: number;
  blurb: string;
  chapters: ChapterSpec[];
};

/** One short screen inside a chapter. */
export type Point =
  | { kind: "card"; title: string; cardId: string }
  | { kind: "blocks"; title: string; blocks: Block[]; itemId: string }
  | { kind: "words"; title: string; words: { ko: string; rom: string; en: string }[] };

export type Question = {
  /** Stable id, so a quiz can say which items were missed. */
  id: string;
  prompt: string;
  context?: string;
  /** A Korean line shown with the question (hidden until answered for listening). */
  korean?: Pick<Line, "ko" | "spoken">;
  listening?: boolean;
  /** Korean text shown without audio, e.g. a sentence with a gap or a learner's mistake. */
  stem?: string;
  /** Multiple choice, or a typed blank when `answers` is set. */
  options: string[];
  optionsKorean: boolean;
  answer: number;
  /** Typed blank: text around the gap and every accepted answer. */
  blank?: { before: string; after: string; answers: string[] };
  why?: string;
  /** The tracked item a miss puts on the To learn list (a feed card or word id). */
  source?: string;
  /** Hand-written exercise rather than a generated meaning check. */
  authored: boolean;
};

export type Chapter = {
  id: string;
  level: number;
  /** Position in the level, from 1. */
  number: number;
  title: string;
  korean?: string;
  category: Category;
  summary: string;
  points: Point[];
  questions: Question[];
  /** Concepts a pass introduces into review. */
  conceptIds: string[];
  /** Feed cards drawn into the chapter. */
  cardIds: string[];
  /** Set when every source is one Learn lesson: finishing that lesson counts as finishing this chapter. */
  lessonId?: string;
};

export type Level = Omit<LevelSpec, "chapters"> & { id: string; chapters: Chapter[] };
