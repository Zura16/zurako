import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { nextCards, seededRandom, type SessionEntry } from "@/lib/feed/engine";
import { applyEvent, initLearner } from "../model";
import { STAGE_PASS, currentStage, stageCoreConcepts, stageOf } from "../stages";
import type { LearnerState } from "../types";

const T0 = Date.UTC(2026, 0, 1);
const beginner = () => initLearner({ selfLevel: "hangul", goals: [], casualComfort: 0 }, catalog, T0);

function picks(state: LearnerState, n: number, seed = 1) {
  const rng = seededRandom(seed);
  const session: SessionEntry[] = [];
  const out = [];
  for (let i = 0; i < n; i++) {
    const [p] = nextCards({ catalog, learner: state, now: T0, session, rng }, 1);
    out.push(catalog.cards.get(p.cardId)!);
    session.push({ cardId: p.cardId, bucket: p.bucket });
    state = applyEvent(state, { type: "lesson_viewed", cardId: p.cardId, at: T0, dwellMs: 6000 }, catalog).state;
  }
  return out;
}

/** Answer every core concept of a stage correctly, up to a share of them. */
function learnStage(state: LearnerState, stage: number, share: number): LearnerState {
  const ids = stageCoreConcepts(catalog)[stage];
  const take = Math.ceil(ids.length * share);
  const concepts = { ...state.concepts };
  for (const id of ids.slice(0, take)) {
    concepts[id] = {
      ...(concepts[id] ?? {
        conceptId: id,
        stability: 1,
        exposures: 1,
        incorrect: 0,
        lapses: 0,
        lookups: 0,
        assumed: false,
        difficult: false,
        avgResponseMs: null,
        lastSeenAt: T0,
        nextReviewAt: T0 + 864e5,
        updatedAt: T0,
      }),
      correct: 1,
    };
  }
  return { ...state, concepts };
}

describe("learning path", () => {
  it("starts an absolute beginner in Foundations", () => {
    expect(currentStage(catalog, beginner())).toBe(0);
  });

  it("serves a beginner only Foundations cards at first", () => {
    for (const card of picks(beginner(), 20)) expect(stageOf(card), card.id).toBe(0);
  });

  it("works through Foundations modules in order, at most one module ahead", () => {
    const modules = picks(beginner(), 12).map((c) => c.module ?? 0);
    expect(Math.max(...modules)).toBeLessThanOrEqual(3);
  });

  it("opens the next stage once 70% of the current stage's core concepts are learned", () => {
    expect(currentStage(catalog, learnStage(beginner(), 0, STAGE_PASS - 0.1))).toBe(0);
    const passed = learnStage(beginner(), 0, STAGE_PASS);
    expect(currentStage(catalog, passed)).toBe(1);
    expect(picks(passed, 25).some((c) => stageOf(c) === 1)).toBe(true);
  });

  it("starts an experienced learner further along", () => {
    const s = initLearner({ selfLevel: "intermediate", goals: [], casualComfort: 1 }, catalog, T0);
    expect(currentStage(catalog, s)).toBeGreaterThanOrEqual(2);
  });

  it("skips ahead a stage after three 'too easy' taps", () => {
    let s = beginner();
    for (let i = 0; i < 3; i++) s = applyEvent(s, { type: "marked_easy", cardId: "k.f-hello", at: T0 + i }, catalog).state;
    expect(s.profile!.minStage).toBe(1);
    expect(currentStage(catalog, s)).toBe(1);
  });
});
