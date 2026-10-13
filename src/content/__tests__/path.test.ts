import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { LESSONS } from "@/content/lessons";
import { PATH, chapterById } from "@/content/path";
import { cardStage } from "@/content/path/build";
import { LEVEL_SPECS } from "@/content/path/levels";
import { applyEvent, initLearner } from "@/lib/learner/model";
import {
  LEVEL_TEST_SIZE,
  QUIZ_SIZE,
  chapterQuiz,
  chapterStatus,
  chaptersToNext,
  currentLevel,
  isLevelUnlocked,
  levelTest,
  pathProgress,
} from "@/lib/learner/path";
import type { LearnerState } from "@/lib/learner/types";

const T0 = Date.UTC(2026, 0, 1);
const fresh = () => initLearner({ selfLevel: "beginner", goals: [], casualComfort: 1 }, catalog, T0);
const allChapters = PATH.flatMap((l) => l.chapters);

function pass(state: LearnerState, chapterId: string, missed: string[] = [], right: string[] = []): LearnerState {
  const c = chapterById(chapterId)!;
  return applyEvent(
    state,
    { type: "quiz_finished", cardId: c.id, at: T0, correct: 9, total: 10, passed: true, missed, right, conceptIds: c.conceptIds },
    catalog,
  ).state;
}

describe("path content", () => {
  it("has five levels that match the feed stages in order", () => {
    expect(PATH.map((l) => l.number)).toEqual([1, 2, 3, 4, 5]);
    expect(PATH.map((l) => l.stage)).toEqual([0, 1, 2, 3, 4]);
  });

  it("gives every chapter a unique id, some points, and enough quiz questions", () => {
    expect(new Set(allChapters.map((c) => c.id)).size).toBe(allChapters.length);
    for (const c of allChapters) {
      expect(c.points.length, c.id).toBeGreaterThan(0);
      expect(c.questions.length, c.id).toBeGreaterThanOrEqual(4);
    }
  });

  it("builds only answerable questions", () => {
    for (const c of allChapters) {
      for (const q of c.questions) {
        const where = `${c.id} ${q.id}`;
        if (q.blank) {
          expect(q.blank.answers.length, where).toBeGreaterThan(0);
          continue;
        }
        expect(q.options.length, where).toBeGreaterThanOrEqual(2);
        expect(q.answer, where).toBeGreaterThanOrEqual(0);
        expect(q.answer, where).toBeLessThan(q.options.length);
        expect(new Set(q.options).size, where).toBe(q.options.length);
      }
    }
  });

  it("puts every Foundations card and every card below Level 5 into exactly one chapter", () => {
    const owner = new Map<string, string>();
    for (const c of allChapters) for (const id of c.cardIds) owner.set(id, c.id);
    const missing = [...catalog.cards.values()].filter((card) => !owner.has(card.id)).map((c) => `${c.id} (${c.topic})`);
    expect(missing).toEqual([]);
    for (const c of allChapters) {
      for (const id of c.cardIds) expect(cardStage(catalog.cards.get(id)!, catalog), `${id} in ${c.id}`).toBe(c.level - 1);
    }
  });

  it("uses every section of every Learn lesson exactly once", () => {
    const used = new Set<string>();
    for (const level of LEVEL_SPECS) {
      for (const ch of level.chapters) {
        for (const s of ch.sources) if (s.kind === "lesson") s.sections.forEach((i) => used.add(`${s.lesson}#${i}`));
      }
    }
    for (const lesson of LESSONS) lesson.sections.forEach((_, i) => expect(used.has(`${lesson.id}#${i}`), `${lesson.id}#${i}`).toBe(true));
  });

  it("starts with honorifics early: chapter 2 of Level 1 covers speech levels", () => {
    expect(PATH[0].chapters[1].title).toMatch(/honorific/i);
  });

  it("keeps every story within a single chapter", () => {
    const byStory = new Map<string, Set<string>>();
    for (const c of allChapters) {
      for (const id of c.cardIds) {
        const story = catalog.cards.get(id)!.story;
        if (story) byStory.set(story.id, (byStory.get(story.id) ?? new Set()).add(c.id));
      }
    }
    for (const [story, chapters] of byStory) expect(chapters.size, story).toBe(1);
  });
});

describe("unlocking", () => {
  it("opens only Level 1 at the start", () => {
    const s = fresh();
    expect(currentLevel(s)).toBe(1);
    expect(isLevelUnlocked(2, s)).toBe(false);
    expect(chapterStatus(PATH[1].chapters[0], s)).toBe("locked");
    expect(chapterStatus(PATH[0].chapters[5], s)).toBe("new");
  });

  it("opens the next level once 80% of chapters are finished", () => {
    let s = fresh();
    const level1 = PATH[0].chapters;
    const needed = chaptersToNext(pathProgress(s)[0]);
    expect(needed).toBe(Math.ceil(level1.length * 0.8));
    for (const c of level1.slice(0, needed - 1)) s = pass(s, c.id);
    expect(isLevelUnlocked(2, s)).toBe(false);
    s = pass(s, level1[needed - 1].id);
    expect(isLevelUnlocked(2, s)).toBe(true);
    expect(currentLevel(s)).toBe(2);
  });

  it("doesn't count a failed quiz", () => {
    const c = PATH[0].chapters[0];
    const s = applyEvent(
      fresh(),
      {
        type: "quiz_finished",
        cardId: c.id,
        at: T0,
        correct: 5,
        total: 10,
        passed: false,
        missed: [],
        right: [],
        conceptIds: c.conceptIds,
      },
      catalog,
    ).state;
    expect(chapterStatus(c, s)).toBe("started");
  });

  it("passing a level test opens the next level and marks unfinished chapters tested out", () => {
    let s = pass(fresh(), PATH[0].chapters[0].id);
    const lv = PATH[0];
    s = applyEvent(
      s,
      {
        type: "quiz_finished",
        cardId: lv.id,
        at: T0,
        correct: 13,
        total: 15,
        passed: true,
        missed: [],
        right: [],
        conceptIds: lv.chapters.flatMap((c) => c.conceptIds),
        chapterIds: lv.chapters.map((c) => c.id),
      },
      catalog,
    ).state;
    expect(isLevelUnlocked(2, s)).toBe(true);
    expect(chapterStatus(lv.chapters[0], s)).toBe("done");
    expect(chapterStatus(lv.chapters[1], s)).toBe("tested-out");
    // What the level teaches now counts as known, so the feed reviews it lightly instead of reteaching it.
    const concept = lv.chapters[2].conceptIds[0];
    expect(s.concepts[concept]?.assumed).toBe(true);
  });

  it("counts lessons finished before the path existed", () => {
    const s = applyEvent(fresh(), { type: "lesson_finished", cardId: "lesson.007", at: T0, conceptIds: [] }, catalog).state;
    const fromLesson = allChapters.filter((c) => c.lessonId === "lesson.007");
    expect(fromLesson.length).toBeGreaterThan(1);
    // Level 3 is still locked, but the chapters themselves are finished.
    expect(pathProgress(s)[2].done).toBe(fromLesson.length);
  });
});

describe("quizzes", () => {
  it("draws up to ten questions, different across attempts", () => {
    const c = PATH[0].chapters[3];
    const a = chapterQuiz(c, 1);
    const b = chapterQuiz(c, 2);
    expect(a.length).toBe(Math.min(QUIZ_SIZE, c.questions.length));
    expect(new Set(a.map((q) => q.id)).size).toBe(a.length);
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
  });

  it("mixes hand-written exercises with meaning checks", () => {
    const c = PATH[0].chapters[0];
    const qs = chapterQuiz(c, 5);
    expect(qs.some((q) => q.authored)).toBe(true);
    expect(qs.some((q) => !q.authored)).toBe(true);
  });

  it("spreads a level test across chapters", () => {
    for (const level of PATH.slice(0, 4)) {
      const qs = levelTest(level, 3);
      expect(qs.length, level.id).toBe(LEVEL_TEST_SIZE);
      expect(new Set(qs.map((q) => q.id)).size).toBe(qs.length);
    }
    const owners = new Set(levelTest(PATH[0], 3).map((q) => PATH[0].chapters.find((c) => c.questions.includes(q))!.id));
    expect(owners.size).toBe(LEVEL_TEST_SIZE);
  });

  it("puts missed cards and words on the To learn list, and right answers on two days clear them", () => {
    const c = PATH[0].chapters[3]; // People words
    const word = c.questions.find((q) => q.source?.startsWith("word."))!.source!;
    const card = PATH[0].chapters[0].cardIds[0];
    let s = pass(fresh(), c.id, [word, card]);
    expect(s.cards[word].toLearn).toBe(true);
    expect(s.cards[card].toLearn).toBe(true);
    s = pass(s, c.id, [], [word]);
    expect(s.cards[word].toLearn).toBe(true);
    s = applyEvent(
      s,
      {
        type: "quiz_finished",
        cardId: c.id,
        at: T0 + 864e5,
        correct: 10,
        total: 10,
        passed: true,
        missed: [],
        right: [word],
        conceptIds: [],
      },
      catalog,
    ).state;
    expect(s.cards[word].toLearn).toBe(false);
  });
});
