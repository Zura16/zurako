import type { z } from "zod";
import type { CardType, Concept, LevelName, PayloadInput, PartSchema, Segment, Sentence, Skill, SpeechLevel } from "./schema";

/**
 * Compact authoring helpers. Content files read close to a bilingual script;
 * these expand it into the full schema shapes. Everything they produce is
 * re-validated by src/content/index.ts.
 */

type PartKind = NonNullable<z.infer<typeof PartSchema>["kind"]>;
type PartTuple = [text: string, gloss: string, kind?: PartKind];

export type SegOpts = {
  base?: string;
  parts?: PartTuple[];
  forms?: [label: string, form: string][];
  note?: string;
  /** Concept ids this chunk exercises, e.g. "g.past", "v.친구". */
  c?: string[];
};

/** One tappable chunk of a sentence. */
export function w(text: string, gloss: string, opts: SegOpts = {}): Segment {
  return {
    text,
    gloss,
    base: opts.base,
    parts: opts.parts?.map(([t, g, kind]) => ({ text: t, gloss: g, kind })),
    forms: opts.forms?.map(([label, form]) => ({ label, form })),
    note: opts.note,
    concepts: opts.c ?? [],
  };
}

type SentenceOpts = {
  level: LevelName;
  sp?: SpeechLevel;
  nat?: Sentence["naturalness"];
  lit?: string;
  ctx?: string;
  group?: string;
  rom?: string;
};

export function s(id: string, korean: string, translation: string, opts: SentenceOpts, segments: Segment[]): Sentence {
  return {
    id: `s.${id}`,
    korean,
    translation,
    literal: opts.lit,
    romanization: opts.rom,
    level: opts.level,
    speechLevel: opts.sp,
    naturalness: opts.nat ?? "NATURAL",
    context: opts.ctx,
    variantGroup: opts.group,
    segments,
  };
}

type ConceptOpts = {
  pre?: string[];
  pattern?: string;
  explanation?: string;
  examples?: [ko: string, en: string][];
  skill?: Skill;
};

function concept(
  kind: Concept["kind"],
  id: string,
  label: string,
  meaning: string,
  level: LevelName,
  category: string,
  defaultSkill: Skill,
  opts: ConceptOpts & Partial<Omit<Concept["details"], "examples">>,
): Concept {
  return {
    id,
    kind,
    label,
    meaning,
    level,
    category,
    skill: opts.skill ?? defaultSkill,
    prerequisites: opts.pre ?? [],
    details: {
      pattern: opts.pattern,
      explanation: opts.explanation,
      dictionaryForm: opts.dictionaryForm,
      partOfSpeech: opts.partOfSpeech,
      frequency: opts.frequency,
      examples: (opts.examples ?? []).map(([ko, en]) => ({ ko, en })),
    },
  };
}

export const grammar = (id: string, label: string, meaning: string, level: LevelName, category: string, opts: ConceptOpts = {}) =>
  concept("GRAMMAR", `g.${id}`, label, meaning, level, category, "grammar", opts);

export const vocab = (
  word: string,
  meaning: string,
  level: LevelName,
  category: string,
  partOfSpeech: NonNullable<Concept["details"]["partOfSpeech"]>,
  opts: ConceptOpts & { frequency?: Concept["details"]["frequency"] } = {},
) =>
  concept("VOCAB", `v.${word}`, word, meaning, level, category, "vocabulary", {
    ...opts,
    dictionaryForm: word,
    partOfSpeech,
  });

export const expression = (id: string, label: string, meaning: string, level: LevelName, category: string, opts: ConceptOpts = {}) =>
  concept("EXPRESSION", `e.${id}`, label, meaning, level, category, "conversation", opts);

export const culture = (id: string, label: string, meaning: string, level: LevelName, opts: ConceptOpts = {}) =>
  concept("CULTURE", `c.${id}`, label, meaning, level, "Culture", "conversation", opts);

type CardInput<T extends CardType> = {
  id: string;
  level: LevelName;
  topic: string;
  skills: Skill[];
  tags?: string[];
  teaches?: string[];
  interest?: number;
  story?: { id: string; part: number };
  payload: PayloadInput<T>;
};

/** Typed card constructor: `card("PHRASE", {...})`. */
export function card<T extends CardType>(type: T, input: CardInput<T>) {
  return {
    ...input,
    id: `k.${input.id}`,
    type,
    tags: input.tags ?? [],
    teaches: input.teaches ?? [],
    interest: input.interest ?? 0.5,
  };
}

export type AuthoredCard = ReturnType<typeof card<CardType>>;
export type Unit = { sentences: Sentence[]; cards: AuthoredCard[] };
