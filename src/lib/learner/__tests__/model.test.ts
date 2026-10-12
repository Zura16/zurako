import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { applyEvent, initLearner } from "../model";
import { DAY } from "../srs";
import type { AppEvent } from "../events";

const T0 = Date.UTC(2026, 0, 1);
const fresh = () => initLearner({ selfLevel: "beginner", goals: ["conversation"], casualComfort: 1 }, catalog, T0);
const apply = (state: ReturnType<typeof fresh>, e: AppEvent) => applyEvent(state, e, catalog).state;

describe("initLearner", () => {
  it("assumes the basics for an elementary learner, but nothing at their level", () => {
    const s = initLearner({ selfLevel: "elementary", goals: [], casualComfort: 1 }, catalog, T0);
    expect(s.concepts["v.오늘"]?.assumed).toBe(true);
    expect(s.concepts["g.progressive"]).toBeUndefined();
  });

  it("starts a self-described beginner from scratch in Foundations", () => {
    const s = fresh();
    expect(Object.values(s.concepts).filter((c) => c.assumed)).toHaveLength(0);
  });

  it("assumes nothing for someone who only reads Hangul", () => {
    const s = initLearner({ selfLevel: "hangul", goals: [], casualComfort: 0 }, catalog, T0);
    expect(Object.keys(s.concepts)).toHaveLength(0);
  });

  it("lowers slang ability for learners uncomfortable with casual Korean", () => {
    const shy = initLearner({ selfLevel: "elementary", goals: [], casualComfort: 0 }, catalog, T0);
    const comfy = initLearner({ selfLevel: "elementary", goals: [], casualComfort: 2 }, catalog, T0);
    expect(shy.skills.slang!.ability).toBeLessThan(comfy.skills.slang!.ability);
  });
});

describe("applyEvent", () => {
  it("a wrong answer makes the taught concept due sooner and lowers skill", () => {
    let s = fresh();
    s = apply(s, { type: "answer_correct", cardId: "k.fill-eseo", at: T0, responseMs: 5000, mode: "quiz" });
    const afterRight = s.concepts["g.place-eseo"];
    expect(afterRight.stability).toBe(1);
    const grammarBefore = s.skills.grammar!.ability;

    s = apply(s, { type: "answer_incorrect", cardId: "k.fill-eseo", at: T0 + DAY, mode: "quiz" });
    expect(s.concepts["g.place-eseo"].stability).toBeLessThan(1);
    expect(s.concepts["g.place-eseo"].incorrect).toBe(1);
    expect(s.cards["k.fill-eseo"].lastOutcome).toBe("incorrect");
    expect(s.skills.grammar!.ability).toBeLessThan(grammarBefore);
  });

  it("'I know this' pushes the concept out at least a month and hides the card", () => {
    const s = apply(fresh(), { type: "marked_known", cardId: "k.grammar-progressive", at: T0 });
    expect(s.concepts["g.progressive"].nextReviewAt).toBeGreaterThanOrEqual(T0 + 30 * DAY);
    expect(s.cards["k.grammar-progressive"].known).toBe(true);
  });

  it("'too hard' lowers the difficulty offset and flags the concept", () => {
    const s = apply(fresh(), { type: "marked_difficult", cardId: "k.grammar-progressive", at: T0 });
    expect(s.profile!.difficultyOffset).toBeCloseTo(-0.3);
    expect(s.concepts["g.progressive"].difficult).toBe(true);
  });

  it("tapping a word you've learned shortens its interval", () => {
    let s = apply(fresh(), { type: "answer_correct", cardId: "k.grammar-progressive", at: T0, mode: "quiz" });
    const before = s.concepts["g.progressive"].stability;
    s = apply(s, { type: "word_tapped", cardId: "k.grammar-progressive", at: T0 + 1000, text: "하고 있어", conceptIds: ["g.progressive"] });
    expect(s.concepts["g.progressive"].stability).toBeLessThan(before);
    expect(s.concepts["g.progressive"].lookups).toBe(1);
  });

  it("viewing a sentence teaches its taught concept and words, not every grammar form in it", () => {
    const s = apply(initLearner({ selfLevel: "hangul", goals: [], casualComfort: 0 }, catalog, T0), {
      type: "lesson_viewed",
      cardId: "k.study-cafe",
      at: T0,
      dwellMs: 5000,
    });
    expect(s.concepts["g.place-eseo"]).toBeDefined(); // taught
    expect(s.concepts["v.카페"]).toBeDefined(); // word met in context
    expect(s.concepts["g.past"]).toBeUndefined(); // merely used
  });

  it("a quick swipe lowers affinity for that topic", () => {
    const s = apply(fresh(), { type: "lesson_swiped", cardId: "k.study-cafe", at: T0, dwellMs: 400 });
    expect(s.profile!.topicAffinity["Daily life"]).toBeLessThan(0);
  });

  it("keeps a too-hard card on the To learn list until it's answered right on two different days", () => {
    const card = "k.fill-eseo";
    let s = apply(fresh(), { type: "marked_difficult", cardId: card, at: T0 });
    expect(s.cards[card].toLearn).toBe(true);

    s = apply(s, { type: "answer_correct", cardId: card, at: T0 + 1000, mode: "quiz" });
    s = apply(s, { type: "answer_correct", cardId: card, at: T0 + 2000, mode: "quiz" });
    expect(s.cards[card]).toMatchObject({ toLearn: true, recoveries: 1 }); // same day counts once

    s = apply(s, { type: "answer_incorrect", cardId: card, at: T0 + 2 * DAY, mode: "quiz" });
    expect(s.cards[card]).toMatchObject({ toLearn: true, recoveries: 0 }); // a miss resets progress

    s = apply(s, { type: "answer_correct", cardId: card, at: T0 + 3 * DAY, mode: "quiz" });
    s = apply(s, { type: "answer_correct", cardId: card, at: T0 + 5 * DAY, mode: "quiz" });
    expect(s.cards[card].toLearn).toBe(false);
  });

  it("'I know this' takes a card off the To learn list", () => {
    let s = apply(fresh(), { type: "marked_difficult", cardId: "k.today-doing", at: T0 });
    s = apply(s, { type: "marked_known", cardId: "k.today-doing", at: T0 + 1000 });
    expect(s.cards["k.today-doing"]).toMatchObject({ toLearn: false, known: true });
  });

  it("finishing a lesson introduces its concepts for review", () => {
    const s = apply(fresh(), { type: "lesson_finished", cardId: "lesson.007", at: T0, conceptIds: ["g.hon-subject", "g.nope"] });
    expect(s.cards["lesson.007"].completions).toBe(1);
    expect(s.concepts["g.hon-subject"].nextReviewAt).toBe(T0 + 0.5 * DAY);
    expect(s.concepts["g.nope"]).toBeUndefined();
  });

  it("tracks learned word-bank words", () => {
    let s = apply(fresh(), { type: "word_learned", cardId: "word.행복해요", at: T0 });
    expect(s.cards["word.행복해요"].known).toBe(true);
    s = apply(s, { type: "word_unlearned", cardId: "word.행복해요", at: T0 + 1 });
    expect(s.cards["word.행복해요"].known).toBe(false);
  });

  it("ignores events for unknown cards", () => {
    const s0 = fresh();
    const { state, changes } = applyEvent(s0, { type: "lesson_saved", cardId: "k.nope", at: T0 }, catalog);
    expect(state).toBe(s0);
    expect(changes.cards.size).toBe(0);
  });
});
