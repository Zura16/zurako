import { z } from "zod";

/**
 * Content schema: the single contract for every piece of Korean content,
 * whether hand-authored (src/content/units) or machine-generated
 * (src/lib/generation). The seed script and the generation validator both
 * parse through these schemas, so nothing unstructured reaches the database.
 */

export const LEVELS = ["BEGINNER", "A1", "A2", "B1", "B2", "ADVANCED", "NATIVE"] as const;
export type LevelName = (typeof LEVELS)[number];
export const LEVEL_LABELS: Record<LevelName, string> = {
  BEGINNER: "Beginner",
  A1: "A1",
  A2: "A2",
  B1: "B1",
  B2: "B2",
  ADVANCED: "Advanced",
  NATIVE: "Native nuance",
};
/** Rough TOPIK mapping, shown as secondary metadata only. */
export const TOPIK_FOR_LEVEL: Record<LevelName, string | null> = {
  BEGINNER: null,
  A1: "TOPIK 1",
  A2: "TOPIK 2",
  B1: "TOPIK 3",
  B2: "TOPIK 4",
  ADVANCED: "TOPIK 5–6",
  NATIVE: null,
};
export const levelValue = (l: LevelName): number => LEVELS.indexOf(l);
export const levelName = (v: number): LevelName => LEVELS[Math.max(0, Math.min(LEVELS.length - 1, Math.round(v)))];

export const SPEECH_LEVELS = ["CASUAL", "POLITE", "FORMAL"] as const;
export type SpeechLevel = (typeof SPEECH_LEVELS)[number];

export const NATURALNESS = ["TEXTBOOK", "NATURAL", "COLLOQUIAL", "SLANG"] as const;

export const SKILLS = ["vocabulary", "grammar", "reading", "listening", "speaking", "honorifics", "conversation", "slang"] as const;
export type Skill = (typeof SKILLS)[number];

export const CONCEPT_KINDS = ["GRAMMAR", "VOCAB", "EXPRESSION", "CULTURE"] as const;

const Level = z.enum(LEVELS);
const id = z.string().min(1);

// ---------------------------------------------------------------- concepts

export const ConceptSchema = z.object({
  id: z.string().regex(/^[gvec]\./, "concept ids are prefixed g./v./e./c."),
  kind: z.enum(CONCEPT_KINDS),
  label: z.string(),
  meaning: z.string(),
  level: Level,
  category: z.string(),
  skill: z.enum(SKILLS),
  prerequisites: z.array(id).default([]),
  /** Grammar: pattern + short explanation. Vocab: dictionary form + POS. */
  details: z
    .object({
      pattern: z.string().optional(),
      explanation: z.string().optional(),
      dictionaryForm: z.string().optional(),
      /** Vocab: rough frequency band (core ≈ top 500, common ≈ top 2,000). */
      frequency: z.enum(["core", "common", "less-common"]).optional(),
      partOfSpeech: z
        .enum(["noun", "verb", "adjective", "adverb", "pronoun", "particle", "expression", "counter", "interjection"])
        .optional(),
      examples: z.array(z.object({ ko: z.string(), en: z.string() })).default([]),
    })
    .default({}),
});
export type Concept = z.infer<typeof ConceptSchema>;

// --------------------------------------------------------------- sentences

export const PartSchema = z.object({
  text: z.string(),
  gloss: z.string(),
  kind: z.enum(["stem", "particle", "ending", "infix", "word", "contraction"]).optional(),
});

/**
 * A tappable chunk of a sentence (roughly an eojeol, sometimes a verb phrase
 * like "하고 있어"). Segments joined with spaces must reproduce the sentence
 * without punctuation; tests enforce this.
 */
export const SegmentSchema = z.object({
  text: z.string(),
  gloss: z.string(),
  /** Dictionary form for conjugated words, e.g. 공부했어요 → 공부하다. */
  base: z.string().optional(),
  parts: z.array(PartSchema).optional(),
  /** Related forms to show conjugation, e.g. [{label:"Polite past", form:"공부했어요"}]. */
  forms: z.array(z.object({ label: z.string(), form: z.string() })).optional(),
  note: z.string().optional(),
  concepts: z.array(id).default([]),
});
export type Segment = z.infer<typeof SegmentSchema>;

export const SentenceSchema = z.object({
  id: z.string().regex(/^s\./),
  korean: z.string(),
  translation: z.string(),
  literal: z.string().optional(),
  romanization: z.string().optional(),
  level: Level,
  speechLevel: z.enum(SPEECH_LEVELS).optional(),
  naturalness: z.enum(NATURALNESS).default("NATURAL"),
  context: z.string().optional(),
  variantGroup: z.string().optional(),
  segments: z.array(SegmentSchema).min(1),
  /** What text-to-speech should read when it differs from the written form, e.g. "2시" read as "두 시". */
  spoken: z.string().optional(),
  audioUrl: z.string().optional(),
});
export type Sentence = z.infer<typeof SentenceSchema>;

// ------------------------------------------------------------------- cards

const sentenceRef = z.string().regex(/^s\./);
const Choice = z.object({ text: z.string(), correct: z.boolean().default(false), why: z.string().optional() });

export const PayloadSchemas = {
  PHRASE: z.object({ sentence: sentenceRef, tip: z.string().optional() }),
  SPEECH_LEVELS: z.object({
    situation: z.string(),
    variants: z.array(z.object({ level: z.enum(SPEECH_LEVELS), sentence: sentenceRef, when: z.string() })).min(2),
    takeaway: z.string(),
  }),
  NATURAL_VS_TEXTBOOK: z.object({
    rows: z.array(z.object({ label: z.string(), sentence: sentenceRef, note: z.string() })).min(2),
    points: z.array(z.string()).min(1),
  }),
  VOCAB: z.object({ concept: id, examples: z.array(sentenceRef).min(1), memoryHook: z.string().optional() }),
  GRAMMAR: z.object({
    concept: id,
    hook: z.string(),
    formation: z.array(z.object({ base: z.string(), result: z.string() })).default([]),
    examples: z.array(sentenceRef).min(1),
  }),
  EXPRESSION: z.object({
    concept: id,
    sentence: sentenceRef,
    usage: z.string(),
    avoid: z.string().optional(),
  }),
  CULTURE: z.object({ title: z.string(), body: z.string(), sentence: sentenceRef.optional() }),
  LISTENING: z.object({
    sentence: sentenceRef,
    question: z.string(),
    options: z.array(z.string()).min(2).max(4),
    answer: z.number().int().min(0),
  }),
  SPEAKING: z.object({
    prompt: z.string(),
    context: z.string().optional(),
    /** Every natural answer we accept. The first is the model answer. */
    accepted: z.array(sentenceRef).min(1),
    /** Forms the answer must contain to be grammatically on target. */
    checks: z.array(z.object({ label: z.string(), anyOf: z.array(z.string()).min(1) })).default([]),
  }),
  DIALOGUE: z.object({
    title: z.string(),
    setting: z.string(),
    speakers: z.record(z.string(), z.string()),
    lines: z.array(z.object({ speaker: z.string(), sentence: sentenceRef })).min(2),
  }),
  STORY: z.object({
    title: z.string(),
    lines: z.array(z.object({ speaker: z.string().optional(), sentence: sentenceRef })).min(2),
    cliffhanger: z.string().optional(),
    check: z.object({ prompt: z.string(), options: z.array(Choice).min(2) }).optional(),
  }),
  MULTIPLE_CHOICE: z.object({
    prompt: z.string(),
    context: z.string().optional(),
    sentence: sentenceRef.optional(),
    options: z.array(Choice).min(2).max(4),
  }),
  FILL_BLANK: z.object({
    sentence: sentenceRef,
    /** The exact substring of the sentence that is blanked out. */
    blank: z.string(),
    options: z.array(z.string()).min(2).max(4),
    hint: z.string().optional(),
  }),
  TRANSFORM: z.object({
    instruction: z.string(),
    from: sentenceRef,
    tiles: z.array(z.string()).min(2),
    /** Accepted answers; each must be buildable from the tiles. */
    accepted: z.array(sentenceRef).min(1),
  }),
  MISTAKE: z.object({
    situation: z.string(),
    learnerSays: z.string(),
    question: z.string(),
    options: z.array(Choice).min(2).max(4),
    better: sentenceRef,
  }),
  PRONUNCIATION: z.object({
    sentence: sentenceRef,
    written: z.string(),
    sounds: z.string(),
    rule: z.string(),
    more: z.array(z.object({ written: z.string(), sounds: z.string() })).default([]),
  }),
} as const;

export type CardType = keyof typeof PayloadSchemas;
export const CARD_TYPES = Object.keys(PayloadSchemas) as CardType[];
export type Payload<T extends CardType> = z.infer<(typeof PayloadSchemas)[T]>;
/** What authors write: fields with schema defaults are optional. */
export type PayloadInput<T extends CardType> = z.input<(typeof PayloadSchemas)[T]>;

const CardBaseSchema = z.object({
  id: z.string().regex(/^k\./),
  type: z.enum(CARD_TYPES as [CardType, ...CardType[]]),
  level: Level,
  topic: z.string(),
  skills: z.array(z.enum(SKILLS)).min(1),
  tags: z.array(z.string()).default([]),
  /** Concepts this card exists to teach (others are derived from its sentences). */
  teaches: z.array(id).default([]),
  interest: z.number().min(0).max(1).default(0.5),
  story: z.object({ id: z.string(), part: z.number().int().positive() }).optional(),
  /** Order within a stage's path, e.g. Foundations module 1 (greetings) before module 12 (numbers). */
  module: z.number().int().positive().optional(),
  payload: z.unknown(),
});
type CardBase = Omit<z.infer<typeof CardBaseSchema>, "type" | "payload">;

export type CardDef = {
  [T in CardType]: CardBase & { type: T; payload: Payload<T> };
}[CardType];

/** Parse an untrusted card: base fields, then the payload for its type. */
export function parseCard(raw: unknown): CardDef {
  const base = CardBaseSchema.parse(raw);
  const payload = PayloadSchemas[base.type].parse(base.payload);
  return { ...base, payload } as CardDef;
}

/** Narrow a payload to its card type (for renderers given a known type). */
export function payloadOf<T extends CardType>(_type: T, payload: unknown): Payload<T> {
  return payload as Payload<T>;
}

/** Strip punctuation so segments can be compared with the sentence text. */
export function stripPunctuation(text: string): string {
  return text
    .replace(/[?.!…~"“”]/g, "")
    .replace(/(?<!\d),|,(?!\d)/g, "") // keep digit-group commas: 4,500
    .replace(/\s+/g, " ")
    .trim();
}

/** Every sentence id a card payload references, in display order. */
export function sentenceRefs(card: CardDef): string[] {
  const p = card.payload as Record<string, unknown>;
  const refs: string[] = [];
  const visit = (v: unknown) => {
    if (typeof v === "string" && v.startsWith("s.")) refs.push(v);
    else if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") Object.values(v).forEach(visit);
  };
  visit(p);
  return [...new Set(refs)];
}

/**
 * Lay segments back onto the original sentence so punctuation survives:
 * each segment gets the punctuation that follows it (e.g. the comma in
 * "아니요, 괜찮아요."), and anything before the first segment is kept too.
 */
export function layoutSegments(sentence: Pick<Sentence, "korean" | "segments">): { segment: Segment; before: string; after: string }[] {
  const text = sentence.korean;
  let cursor = 0;
  const placed = sentence.segments.map((segment) => {
    const at = text.indexOf(segment.text, cursor);
    const start = at < 0 ? cursor : at;
    const gap = text.slice(cursor, start);
    cursor = at < 0 ? cursor : start + segment.text.length;
    return { segment, gap };
  });
  const tail = text.slice(cursor);
  return placed.map(({ segment, gap }, i) => ({
    segment,
    before: i === 0 ? gap.trim() : "",
    after: (i + 1 < placed.length ? placed[i + 1].gap : tail).trim(),
  }));
}
