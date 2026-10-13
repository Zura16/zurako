import { PATH, type Chapter, type Level, type Question } from "@/content/path";
import { shuffled } from "@/content/path/build";
import type { LearnerState } from "./types";

/**
 * Progress through the levels. Every chapter in an open level can be studied;
 * the next level opens once LEVEL_PASS of this level's chapters are done or
 * tested out. Chapter state lives in the per-item store under the chapter id:
 * completions > 0 means its quiz was passed, known means tested out.
 */

/** Share of a level's chapters to finish before the next level opens. */
export const LEVEL_PASS = 0.8;
/** Score needed to pass a chapter quiz or a level test. */
export const QUIZ_PASS = 0.8;
export const QUIZ_SIZE = 10;
export const LEVEL_TEST_SIZE = 15;
/** At most this many authored exercises in a quiz, so generated meaning checks still get a share. */
const AUTHORED_SHARE = 0.6;

export type ChapterStatus = "locked" | "new" | "started" | "done" | "tested-out";

export const levelTestId = (level: number) => `level.${level}`;

export function chapterDone(chapter: Chapter, learner: LearnerState): boolean {
  if ((learner.cards[chapter.id]?.completions ?? 0) > 0) return true;
  // Lessons finished before the path existed count for the chapters made from them.
  return chapter.lessonId !== undefined && (learner.cards[chapter.lessonId]?.completions ?? 0) > 0;
}

export function chapterStatus(chapter: Chapter, learner: LearnerState, unlocked = isLevelUnlocked(chapter.level, learner)): ChapterStatus {
  if (!unlocked) return "locked";
  if (chapterDone(chapter, learner)) return "done";
  const st = learner.cards[chapter.id];
  if (st?.known) return "tested-out";
  return (st?.views ?? 0) > 0 ? "started" : "new";
}

export type LevelProgress = {
  level: Level;
  unlocked: boolean;
  done: number;
  testedOut: number;
  total: number;
  fraction: number;
  passed: boolean;
};

/** Every level with its progress. Levels open in order. */
export function pathProgress(learner: LearnerState): LevelProgress[] {
  const out: LevelProgress[] = [];
  let unlocked = true;
  for (const level of PATH) {
    let done = 0;
    let testedOut = 0;
    for (const c of level.chapters) {
      if (chapterDone(c, learner)) done++;
      else if (learner.cards[c.id]?.known) testedOut++;
    }
    const total = level.chapters.length;
    const fraction = total ? (done + testedOut) / total : 1;
    const passed: boolean = unlocked && fraction >= LEVEL_PASS - 1e-9;
    out.push({ level, unlocked, done, testedOut, total, fraction, passed });
    unlocked = passed;
  }
  return out;
}

export function isLevelUnlocked(level: number, learner: LearnerState): boolean {
  return pathProgress(learner).find((p) => p.level.number === level)?.unlocked ?? false;
}

/** The highest open level, as a number from 1. */
export function currentLevel(learner: LearnerState): number {
  const open = pathProgress(learner).filter((p) => p.unlocked);
  return open.at(-1)?.level.number ?? 1;
}

/** Chapters needed to open the next level. */
export function chaptersToNext(p: LevelProgress): number {
  return Math.max(0, Math.ceil(p.total * LEVEL_PASS - 1e-9) - p.done - p.testedOut);
}

/**
 * Questions for one attempt. Each attempt gets a new mix: authored exercises
 * first (up to their share), then generated meaning checks, then in a
 * shuffled order.
 */
export function pickQuestions(pool: Question[], size: number, seed: number): Question[] {
  const authored = shuffled(
    pool.filter((q) => q.authored),
    seed,
  );
  const generated = shuffled(
    pool.filter((q) => !q.authored),
    seed + 7,
  );
  const take = Math.min(size, pool.length);
  const fromAuthored = Math.min(authored.length, Math.max(take - generated.length, Math.round(take * AUTHORED_SHARE)));
  const chosen = [...authored.slice(0, fromAuthored), ...generated.slice(0, take - fromAuthored)];
  return shuffled(chosen, seed + 13);
}

export const chapterQuiz = (chapter: Chapter, seed: number) => pickQuestions(chapter.questions, QUIZ_SIZE, seed);

/** A level test: one question from each chapter in turn (in a shuffled order) until the test is full. */
export function levelTest(level: Level, seed: number): Question[] {
  const perChapter = shuffled(level.chapters, seed).map((c, i) => pickQuestions(c.questions, 3, seed + i * 31));
  const out: Question[] = [];
  for (let round = 0; out.length < LEVEL_TEST_SIZE && perChapter.some((q) => q.length > round); round++) {
    for (const qs of perChapter) if (qs[round] && out.length < LEVEL_TEST_SIZE) out.push(qs[round]);
  }
  return out;
}

export const passes = (correct: number, total: number) => total > 0 && correct / total >= QUIZ_PASS - 1e-9;
