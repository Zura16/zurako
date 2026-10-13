import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { nextCards, seededRandom, type SessionEntry } from "@/lib/feed/engine";
import { applyEvent, initLearner } from "../model";
import { currentStage, stageOf } from "../stages";
import type { LearnerState } from "../types";
import { openLevels } from "./helpers";

const T0 = Date.UTC(2026, 0, 1);
const beginner = () => initLearner({ selfLevel: "hangul", goals: [], casualComfort: 0 }, catalog, T0);

function picks(state: LearnerState, n: number, seed = 1) {
  const rng = seededRandom(seed);
  const session: SessionEntry[] = [];
  const out = [];
  for (let i = 0; i < n; i++) {
    const [p] = nextCards({ catalog, learner: state, now: T0, session, rng }, 1);
    if (!p) break;
    out.push(catalog.cards.get(p.cardId)!);
    session.push({ cardId: p.cardId, bucket: p.bucket });
    state = applyEvent(state, { type: "lesson_viewed", cardId: p.cardId, at: T0, dwellMs: 6000 }, catalog).state;
  }
  return out;
}

describe("learning path in the feed", () => {
  it("starts every learner in Level 1, whatever they said at onboarding", () => {
    expect(currentStage(beginner())).toBe(0);
    expect(currentStage(initLearner({ selfLevel: "intermediate", goals: [], casualComfort: 1 }, catalog, T0))).toBe(0);
  });

  it("serves a beginner only Foundations cards", () => {
    for (const card of picks(beginner(), 40)) expect(stageOf(card), card.id).toBe(0);
  });

  it("works through Foundations modules in order, at most one module ahead", () => {
    const modules = picks(beginner(), 12).map((c) => c.module ?? 0);
    expect(Math.max(...modules)).toBeLessThanOrEqual(3);
  });

  it("never spills into a locked level, even after every open card is seen", () => {
    const seen = picks(beginner(), 300);
    for (const card of seen) expect(stageOf(card), card.id).toBe(0);
  });

  it("serves Level 2 cards once Level 2 opens", () => {
    const s = openLevels(beginner(), 2);
    expect(currentStage(s)).toBe(1);
    expect(picks(s, 30).some((c) => stageOf(c) === 1)).toBe(true);
  });

  it("no longer skips ahead on 'too easy' taps", () => {
    let s = beginner();
    for (let i = 0; i < 5; i++) s = applyEvent(s, { type: "marked_easy", cardId: "k.f-hello", at: T0 + i }, catalog).state;
    expect(currentStage(s)).toBe(0);
  });
});
