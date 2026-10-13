import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { applyEvent, initLearner } from "@/lib/learner/model";
import { DAY } from "@/lib/learner/srs";
import type { LearnerState } from "@/lib/learner/types";
import { openLevels } from "@/lib/learner/__tests__/helpers";
import { levelGap, nextCards, seededRandom, type FeedPick, type SessionEntry } from "../engine";

const T0 = Date.UTC(2026, 0, 1);
const learner = (level: "hangul" | "beginner" | "intermediate" = "beginner") =>
  initLearner({ selfLevel: level, goals: ["conversation"], casualComfort: 1 }, catalog, T0);

/** Simulate a user scrolling: each picked card is viewed, then the next is picked. */
function scroll(state: LearnerState, n: number, seed = 1, at = T0) {
  const rng = seededRandom(seed);
  const session: SessionEntry[] = [];
  const picks: FeedPick[] = [];
  for (let i = 0; i < n; i++) {
    const [pick] = nextCards({ catalog, learner: state, now: at, session, rng }, 1);
    if (!pick) break;
    picks.push(pick);
    session.push({ cardId: pick.cardId, bucket: pick.bucket });
    state = applyEvent(state, { type: "lesson_viewed", cardId: pick.cardId, at, dwellMs: 6000 }, catalog).state;
  }
  return { picks, state };
}

describe("feed engine", () => {
  it("is reproducible for the same seed", () => {
    expect(scroll(learner(), 15, 7).picks).toEqual(scroll(learner(), 15, 7).picks);
  });

  it("never repeats a card within a session", () => {
    const { picks } = scroll(learner(), 60);
    expect(new Set(picks.map((p) => p.cardId)).size).toBe(picks.length);
  });

  it("keeps an absolute beginner away from content far above their level", () => {
    const s = learner("hangul");
    const { picks } = scroll(s, 25);
    for (const p of picks) expect(levelGap(catalog.cards.get(p.cardId)!, { learner: s })).toBeLessThanOrEqual(1.6);
  });

  it("never serves three new-concept cards in a row", () => {
    const { picks } = scroll(learner(), 60, 3);
    for (let i = 2; i < picks.length; i++) {
      expect([picks[i - 2], picks[i - 1], picks[i]].every((p) => p.bucket === "new")).toBe(false);
    }
  });

  it("mixes several card types early in the feed", () => {
    const { picks } = scroll(learner(), 12);
    const types = new Set(picks.map((p) => catalog.cards.get(p.cardId)!.type));
    expect(types.size).toBeGreaterThanOrEqual(5);
  });

  it("never uses an exercise to introduce a concept", () => {
    let state = learner("hangul");
    const rng = seededRandom(2);
    const session: SessionEntry[] = [];
    const practice = ["SPEAKING", "TRANSFORM", "FILL_BLANK", "MULTIPLE_CHOICE", "MISTAKE", "LISTENING"];
    for (let i = 0; i < 40; i++) {
      const [pick] = nextCards({ catalog, learner: state, now: T0, session, rng }, 1);
      const card = catalog.cards.get(pick.cardId)!;
      if (practice.includes(card.type)) {
        for (const c of card.concepts.filter((c) => c.role === "TEACH")) {
          expect(state.concepts[c.id], `${card.id} practises ${c.id} before it was introduced`).toBeDefined();
        }
      }
      session.push({ cardId: pick.cardId, bucket: pick.bucket });
      state = applyEvent(state, { type: "lesson_viewed", cardId: pick.cardId, at: T0, dwellMs: 6000 }, catalog).state;
    }
  });

  it("surfaces a due concept as a review", () => {
    let s = learner();
    s = applyEvent(s, { type: "answer_incorrect", cardId: "k.fill-eseo", at: T0 - 2 * DAY, mode: "quiz" }, catalog).state;
    const { picks } = scroll(s, 12);
    const review = picks.find((p) => p.bucket === "review" && catalog.cards.get(p.cardId)!.concepts.some((c) => c.id === "g.place-eseo"));
    expect(review?.reason).toMatch(/Review/);
  });

  it("brings a too-hard card back as a review after its cooldown", () => {
    let s = learner();
    s = applyEvent(s, { type: "marked_difficult", cardId: "k.today-doing", at: T0 - 2 * DAY }, catalog).state;
    for (const seed of [1, 2, 3, 4, 5]) {
      const { picks } = scroll(s, 15, seed);
      expect(picks.find((p) => p.cardId === "k.today-doing")?.reason, `seed ${seed}`).toBe("To learn");
    }
  });

  it("does not show cards marked as known", () => {
    let s = learner();
    s = applyEvent(s, { type: "marked_known", cardId: "k.today-doing", at: T0 - DAY }, catalog).state;
    const { picks } = scroll(s, 60);
    expect(picks.map((p) => p.cardId)).not.toContain("k.today-doing");
  });

  it("serves harder cards after repeated 'too easy'", () => {
    const avgLevel = (picks: FeedPick[]) => picks.reduce((a, p) => a + catalog.cards.get(p.cardId)!.levelValue, 0) / picks.length;
    const base = openLevels(learner(), 3);
    let easy = base;
    for (let i = 0; i < 4; i++) easy = applyEvent(easy, { type: "marked_easy", cardId: "k.study-cafe", at: T0 }, catalog).state;
    expect(avgLevel(scroll(easy, 20).picks)).toBeGreaterThan(avgLevel(scroll(base, 20).picks));
  });

  it("continues a story right after its previous part", () => {
    const s = openLevels(learner("intermediate"), 3);
    const { picks } = scroll(s, 80, 5);
    const ids = picks.map((p) => p.cardId);
    const p1 = ids.indexOf("k.story-bd-1");
    expect(p1).toBeGreaterThanOrEqual(0);
    expect(ids[p1 + 1]).toBe("k.story-bd-2");
  });
});
