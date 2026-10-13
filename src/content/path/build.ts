import type { Card, Catalog } from "../catalog";
import type { Block, Lesson } from "../lessons/schema";
import { payloadOf } from "../schema";
import { wordId, type Word } from "../wordbank";
import { stageOfLevelValue } from "./levels";
import type { Chapter, ChapterSpec, Level, LevelSpec, Point, Question, Source } from "./types";

/** Card types that become quiz questions instead of reading points. */
const QUESTION_TYPES = new Set<Card["type"]>(["MULTIPLE_CHOICE", "FILL_BLANK", "LISTENING", "MISTAKE"]);
/** Exercise blocks in lessons; they move to the quiz. */
const EXERCISE_BLOCKS = new Set<Block["kind"]>(["choose", "fill", "match"]);
/** Long phrase lists are split so each point stays short. */
const ROWS_PER_POINT = 8;
const WORDS_PER_POINT = 7;
/** About how many lines one point holds before the next block starts a new one. */
const POINT_WEIGHT = 10;

type Inputs = { catalog: Catalog; lessons: Lesson[]; words: Word[] };

/** A Korean line with a known meaning, used to generate "what does this mean?" questions. */
type MeaningItem = { ko: string; en: string; spoken?: string; source?: string; word?: boolean };

const HANGUL = /[가-힣]/;

export function buildLevels(specs: LevelSpec[], inputs: Inputs): Level[] {
  const claimed = new Map<string, string>();
  return specs.map((spec) => {
    const built = spec.chapters.map((c, i) => buildChapter(spec, c, i + 1, inputs, claimed));
    // Distractors can come from anywhere in the level when a chapter is small.
    const levelPool = built.flatMap((b) => b.pool);
    const chapters = built.map((b) => ({
      ...b.chapter,
      questions: [...b.chapter.questions, ...meaningQuestions(b.chapter.id, b.pool, levelPool)],
    }));
    return { ...spec, id: `level.${spec.number}`, chapters };
  });
}

function buildChapter(level: LevelSpec, spec: ChapterSpec, number: number, inputs: Inputs, claimed: Map<string, string>) {
  const id = `chapter.${level.number}-${spec.slug}`;
  const points: Point[] = [];
  const questions: Question[] = [];
  const pool: MeaningItem[] = [];
  const conceptIds = new Set<string>();
  const cardIds: string[] = [];

  for (const source of spec.sources) {
    switch (source.kind) {
      case "cards":
        for (const card of selectCards(source, inputs.catalog)) {
          const owner = claimed.get(card.id);
          if (owner) throw new Error(`${card.id} is in both ${owner} and ${id}`);
          claimed.set(card.id, id);
          cardIds.push(card.id);
          card.concepts.forEach((c) => c.role === "TEACH" && conceptIds.add(c.id));
          if (QUESTION_TYPES.has(card.type)) questions.push(cardQuestion(card, inputs.catalog));
          else points.push({ kind: "card", title: cardTitle(card, inputs.catalog), cardId: card.id });
          const story = storyQuestion(card);
          if (story) questions.push(story);
          pool.push(...cardMeanings(card, inputs.catalog));
        }
        break;
      case "lesson": {
        const lesson = inputs.lessons.find((l) => l.id === source.lesson);
        if (!lesson) throw new Error(`${id}: unknown lesson ${source.lesson}`);
        for (const index of source.sections) {
          const section = lesson.sections[index];
          if (!section) throw new Error(`${id}: ${lesson.id} has no section ${index}`);
          const key = `${lesson.id}#${index}`;
          if (claimed.has(key)) throw new Error(`${key} is in both ${claimed.get(key)} and ${id}`);
          claimed.set(key, id);
          points.push(...sectionPoints(section.title, section.blocks, lesson.id));
          section.blocks.forEach((b, j) => questions.push(...exerciseQuestions(b, `${key}.${j}`)));
          section.blocks.forEach((b) => pool.push(...blockMeanings(b, inputs.catalog)));
          for (const b of section.blocks)
            for (const sid of blockSentenceIds(b)) sentenceConcepts(sid, inputs.catalog).forEach((c) => conceptIds.add(c));
        }
        // The lesson's own list of taught concepts goes with its last section.
        if (source.sections.includes(lesson.sections.length - 1)) lesson.teaches.forEach((c) => conceptIds.add(c));
        break;
      }
      case "words": {
        const list = inputs.words.filter((w) => w.category === source.category).slice(source.from ?? 0, source.to);
        if (list.length === 0) throw new Error(`${id}: no words in ${source.category}`);
        for (let i = 0; i < list.length; i += WORDS_PER_POINT) {
          const chunk = list.slice(i, i + WORDS_PER_POINT);
          points.push({
            kind: "words",
            title: `${source.category} ${i + 1}–${i + chunk.length}`,
            words: chunk.map(({ ko, rom, en }) => ({ ko, rom, en })),
          });
        }
        pool.push(...list.map((w) => ({ ko: w.ko, en: w.en, source: wordId(w), word: true })));
        break;
      }
    }
  }

  const lessons = new Set(spec.sources.map((s) => (s.kind === "lesson" ? s.lesson : null)));
  const chapter: Chapter = {
    id,
    level: level.number,
    number,
    title: spec.title,
    korean: spec.korean,
    category: spec.category,
    summary: spec.summary,
    points,
    questions,
    conceptIds: [...conceptIds].filter((c) => inputs.catalog.concepts.has(c)),
    cardIds,
    lessonId: lessons.size === 1 && !lessons.has(null) ? [...lessons][0]! : undefined,
  };
  return { chapter, pool: dedupe(pool) };
}

const storyStart = new WeakMap<Catalog, Map<string, number>>();

/**
 * The level (as a feed stage index) a card belongs to. A story belongs
 * wholly to the level of its first part, so it never stops at a locked level.
 */
export function cardStage(card: Card, catalog: Catalog): number {
  if (!card.story) return stageOfLevelValue(card.levelValue);
  let starts = storyStart.get(catalog);
  if (!starts) {
    starts = new Map();
    for (const c of catalog.cards.values()) {
      if (c.story) starts.set(c.story.id, Math.min(starts.get(c.story.id) ?? Infinity, c.levelValue));
    }
    storyStart.set(catalog, starts);
  }
  return stageOfLevelValue(starts.get(card.story.id) ?? card.levelValue);
}

function selectCards(source: Extract<Source, { kind: "cards" }>, catalog: Catalog): Card[] {
  const out: Card[] = [];
  for (const card of catalog.cards.values()) {
    if (source.ids) {
      if (source.ids.includes(card.id)) out.push(card);
    } else if (source.module !== undefined) {
      if (card.module === source.module && cardStage(card, catalog) === 0) out.push(card);
    } else if (card.module === undefined && cardStage(card, catalog) === source.stage && source.topics?.includes(card.topic)) {
      out.push(card);
    }
  }
  return out;
}

function cardTitle(card: Card, catalog: Catalog): string {
  const sentence = (id: string) => catalog.sentences.get(id)?.translation ?? "";
  switch (card.type) {
    case "GRAMMAR":
    case "VOCAB":
    case "EXPRESSION":
      return catalog.concepts.get(payloadOf(card.type, card.payload).concept)?.label ?? card.topic;
    case "CULTURE":
      return payloadOf("CULTURE", card.payload).title;
    case "DIALOGUE":
      return payloadOf("DIALOGUE", card.payload).title;
    case "STORY":
      return payloadOf("STORY", card.payload).title;
    case "SPEECH_LEVELS":
      return payloadOf("SPEECH_LEVELS", card.payload).situation;
    case "NATURAL_VS_TEXTBOOK":
      return "Natural vs textbook";
    case "PRONUNCIATION": {
      const p = payloadOf("PRONUNCIATION", card.payload);
      return `${p.written} sounds like ${p.sounds}`;
    }
    case "SPEAKING":
      return "Your turn to speak";
    case "TRANSFORM":
      return "Rebuild it";
    case "PHRASE":
      return sentence(payloadOf("PHRASE", card.payload).sentence);
    default:
      return card.topic;
  }
}

function cardQuestion(card: Card, catalog: Catalog): Question {
  const sentence = (id: string) => catalog.sentences.get(id)!;
  const base = { id: `q:${card.id}`, source: card.id, authored: true };
  switch (card.type) {
    case "MULTIPLE_CHOICE": {
      const p = payloadOf("MULTIPLE_CHOICE", card.payload);
      const s = p.sentence ? sentence(p.sentence) : undefined;
      const options = p.options.map((o) => o.text);
      return {
        ...base,
        prompt: p.prompt,
        context: p.context,
        korean: s ? { ko: s.korean, spoken: s.spoken } : undefined,
        options,
        optionsKorean: options.some((o) => HANGUL.test(o)),
        answer: p.options.findIndex((o) => o.correct),
        why: p.options.find((o) => o.correct)?.why,
      };
    }
    case "FILL_BLANK": {
      const p = payloadOf("FILL_BLANK", card.payload);
      const s = sentence(p.sentence);
      return {
        ...base,
        prompt: s.translation,
        context: p.hint,
        stem: s.korean.replace(p.blank, "＿＿"),
        options: p.options,
        optionsKorean: true,
        answer: p.options.indexOf(p.blank),
      };
    }
    case "LISTENING": {
      const p = payloadOf("LISTENING", card.payload);
      const s = sentence(p.sentence);
      return {
        ...base,
        prompt: p.question,
        korean: { ko: s.korean, spoken: s.spoken },
        listening: true,
        options: p.options,
        optionsKorean: p.options.some((o) => HANGUL.test(o)),
        answer: p.answer,
        why: s.translation,
      };
    }
    case "MISTAKE": {
      const p = payloadOf("MISTAKE", card.payload);
      const options = p.options.map((o) => o.text);
      return {
        ...base,
        prompt: p.question,
        context: p.situation,
        stem: p.learnerSays,
        options,
        optionsKorean: options.some((o) => HANGUL.test(o)),
        answer: p.options.findIndex((o) => o.correct),
        why: `${p.options.find((o) => o.correct)?.why ?? ""} Better: ${sentence(p.better).korean}`.trim(),
      };
    }
    default:
      throw new Error(`${card.id}: ${card.type} is not a question card`);
  }
}

/** A story's comprehension check, when it has one. */
function storyQuestion(card: Card): Question | null {
  if (card.type !== "STORY") return null;
  const check = payloadOf("STORY", card.payload).check;
  if (!check) return null;
  const options = check.options.map((o) => o.text);
  return {
    id: `q:${card.id}`,
    prompt: check.prompt,
    context: `From the story "${payloadOf("STORY", card.payload).title}".`,
    options,
    optionsKorean: options.some((o) => HANGUL.test(o)),
    answer: check.options.findIndex((o) => o.correct),
    why: check.options.find((o) => o.correct)?.why,
    source: card.id,
    authored: true,
  };
}

/** Cards the To learn list can test again (a recall prompt or a question), so a miss can send learners back to them. */
const RETESTABLE = new Set<Card["type"]>(["PHRASE", "EXPRESSION", ...QUESTION_TYPES]);

/** Sentences a reading card shows whose meaning is a fair question. */
function cardMeanings(card: Card, catalog: Catalog): MeaningItem[] {
  if (!["PHRASE", "VOCAB", "GRAMMAR", "EXPRESSION", "DIALOGUE", "CULTURE", "PRONUNCIATION", "STORY"].includes(card.type)) return [];
  return card.sentenceIds.flatMap((sid) => {
    const s = catalog.sentences.get(sid);
    return s ? [{ ko: s.korean, en: s.translation, spoken: s.spoken, source: RETESTABLE.has(card.type) ? card.id : undefined }] : [];
  });
}

/** Rough reading length of a block, in lines. */
function blockWeight(b: Block): number {
  switch (b.kind) {
    case "phrases":
    case "pairs":
      return b.rows.length;
    case "types":
      return b.rows.length * 2;
    case "dialogue":
      return b.lines.length + 1;
    case "speaking":
      return b.prompts.length;
    case "callout":
      return 2 + b.examples.length;
    default:
      return 2;
  }
}

/** A section as one or more short points: long phrase lists split, and blocks grouped up to about ten lines. */
function sectionPoints(title: string, blocks: Block[], itemId: string): Point[] {
  const pieces: Block[] = [];
  for (const b of blocks) {
    if (EXERCISE_BLOCKS.has(b.kind)) continue;
    if (b.kind === "phrases" && b.rows.length > ROWS_PER_POINT) {
      const size = Math.ceil(b.rows.length / Math.ceil(b.rows.length / ROWS_PER_POINT));
      for (let i = 0; i < b.rows.length; i += size) pieces.push({ kind: "phrases", rows: b.rows.slice(i, i + size) });
    } else {
      pieces.push(b);
    }
  }
  const groups: Block[][] = [];
  let weight = Infinity;
  for (const b of pieces) {
    const w = blockWeight(b);
    // A callout stays with the block before it: it usually explains that block.
    if (weight + w > POINT_WEIGHT && !(b.kind === "callout" && groups.length > 0)) {
      groups.push([]);
      weight = 0;
    }
    groups.at(-1)!.push(b);
    weight += w;
  }
  return groups.map((g, i) => ({
    kind: "blocks",
    title: groups.length > 1 ? `${title} (${i + 1} of ${groups.length})` : title,
    blocks: g,
    itemId,
  }));
}

function exerciseQuestions(block: Block, key: string): Question[] {
  switch (block.kind) {
    case "choose":
      return block.items.map((item, i) => ({
        id: `ex:${key}.${i}`,
        prompt: item.en,
        options: item.options,
        optionsKorean: true,
        answer: item.answer,
        authored: true,
      }));
    case "fill":
      return block.items.map((item, i) => ({
        id: `ex:${key}.${i}`,
        prompt: item.en,
        context: item.hint,
        options: [],
        optionsKorean: true,
        answer: -1,
        blank: { before: item.before, after: item.after, answers: item.answers },
        authored: true,
      }));
    default:
      // Match pairs become meaning questions (see blockMeanings).
      return [];
  }
}

function blockMeanings(block: Block, catalog: Catalog): MeaningItem[] {
  const line = (l: { ko: string; en: string; spoken?: string; sid?: string }): MeaningItem => ({
    ko: l.ko,
    en: l.en,
    spoken: l.spoken,
    source: l.sid ? cardWithSentence(l.sid, catalog) : undefined,
  });
  switch (block.kind) {
    case "phrases":
      return block.rows.map(line);
    case "dialogue":
      return block.lines.map(line);
    case "speaking":
      return block.prompts.map(line);
    case "callout":
      return block.examples.map(line);
    case "types":
      return block.rows.flatMap((r) => (r.example ? [line(r.example)] : []));
    case "pairs":
      return block.rows.map((r) => ({ ko: r.to, en: r.en }));
    case "match":
      return block.pairs.map((p) => ({ ko: p.ko, en: p.en, word: true }));
    default:
      return [];
  }
}

function blockSentenceIds(block: Block): string[] {
  const ids = (rows: { sid?: string }[]) => rows.flatMap((r) => (r.sid ? [r.sid] : []));
  switch (block.kind) {
    case "phrases":
      return ids(block.rows);
    case "dialogue":
      return ids(block.lines);
    case "speaking":
      return ids(block.prompts);
    case "callout":
      return ids(block.examples);
    default:
      return [];
  }
}

/** Words and expressions in a sentence: what reading it introduces (grammar waits for a card that teaches it). */
function sentenceConcepts(sid: string, catalog: Catalog): string[] {
  return (catalog.sentences.get(sid)?.segments ?? []).flatMap((s) => s.concepts.filter((c) => c.startsWith("v.") || c.startsWith("e.")));
}

const sentenceCards = new WeakMap<Catalog, Map<string, string>>();
function cardWithSentence(sid: string, catalog: Catalog): string | undefined {
  let index = sentenceCards.get(catalog);
  if (!index) {
    index = new Map();
    for (const card of catalog.cards.values()) {
      if (RETESTABLE.has(card.type)) for (const s of card.sentenceIds) if (!index.has(s)) index.set(s, card.id);
    }
    sentenceCards.set(catalog, index);
  }
  return index.get(sid);
}

/** One item per Korean line, and none whose meaning is shared with another (it couldn't be told apart). */
function dedupe(items: MeaningItem[]): MeaningItem[] {
  const byKo = new Map<string, MeaningItem>();
  for (const it of items) if (!byKo.has(it.ko) && it.en.trim()) byKo.set(it.ko, it);
  const enCount = new Map<string, number>();
  for (const it of byKo.values()) enCount.set(norm(it.en), (enCount.get(norm(it.en)) ?? 0) + 1);
  return [...byKo.values()].filter((it) => enCount.get(norm(it.en)) === 1);
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();

/**
 * "What does this mean?" questions for every line in the chapter, with three
 * wrong meanings drawn from the same chapter first, then the rest of the level.
 * Words also get the reverse question: pick the Korean for an English meaning.
 */
function meaningQuestions(chapterId: string, pool: MeaningItem[], levelPool: MeaningItem[]): Question[] {
  const out: Question[] = [];
  for (const item of pool) {
    const seed = hash(`${chapterId}:${item.ko}`);
    const others = (field: "en" | "ko") => {
      const picked: string[] = [];
      const seen = new Set([norm(item.en), item.ko]);
      for (const list of [pool, levelPool]) {
        for (const o of shuffled(list, seed)) {
          if (picked.length === 3) break;
          if (seen.has(norm(o.en)) || seen.has(o.ko)) continue;
          if (field === "ko" && o.word !== item.word) continue; // a word against a full sentence gives the answer away
          seen.add(norm(o.en)).add(o.ko);
          picked.push(o[field]);
        }
      }
      return picked;
    };

    const wrongEn = others("en");
    if (wrongEn.length === 3) {
      const options = shuffled([item.en, ...wrongEn], seed);
      out.push({
        id: `m:${item.ko}`,
        prompt: "What does this mean?",
        korean: { ko: item.ko, spoken: item.spoken },
        options,
        optionsKorean: false,
        answer: options.indexOf(item.en),
        source: item.source,
        authored: false,
      });
    }
    if (item.word) {
      const wrongKo = others("ko");
      if (wrongKo.length === 3) {
        const options = shuffled([item.ko, ...wrongKo], seed + 1);
        out.push({
          id: `r:${item.ko}`,
          prompt: `How do you say "${item.en}"?`,
          options,
          optionsKorean: true,
          answer: options.indexOf(item.ko),
          source: item.source,
          authored: false,
        });
      }
    }
  }
  return out;
}

export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Deterministic shuffle: the same seed always gives the same order. */
export function shuffled<T>(items: readonly T[], seed: number): T[] {
  const out = [...items];
  let h = seed >>> 0 || 1;
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
