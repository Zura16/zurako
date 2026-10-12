import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { applyEvent, initLearner } from "@/lib/learner/model";
import { cardFromRow, cardToRow, conceptFromRow, conceptToRow, eventToRow, mergeLearner, profileFromRow, profileToRow } from "../rows";

const T0 = Date.UTC(2026, 0, 1);

describe("row mapping", () => {
  it("round-trips learner records through database rows", () => {
    let s = initLearner({ selfLevel: "elementary", goals: ["travel"], casualComfort: 2 }, catalog, T0);
    s = applyEvent(s, { type: "lesson_saved", cardId: "k.study-cafe", at: T0 + 5 }, catalog).state;
    s = applyEvent(s, { type: "answer_correct", cardId: "k.fill-eseo", at: T0 + 9, mode: "quiz" }, catalog).state;

    expect(profileFromRow(profileToRow("u", s.profile!))).toEqual(s.profile);
    const concept = s.concepts["g.place-eseo"];
    expect(conceptFromRow(conceptToRow("u", concept))).toEqual(concept);
    const card = s.cards["k.study-cafe"];
    expect(cardFromRow(cardToRow("u", card))).toEqual(card);
  });

  it("stores event-specific fields in data", () => {
    const row = eventToRow("u", { type: "word_tapped", cardId: "k.x", at: T0, text: "친구랑", conceptIds: ["v.친구"] });
    expect(row).toEqual({
      user_id: "u",
      card_id: "k.x",
      type: "word_tapped",
      data: { text: "친구랑", conceptIds: ["v.친구"] },
      client_at: "2026-01-01T00:00:00.000Z",
    });
  });
});

describe("mergeLearner", () => {
  it("keeps the newer copy of each record", () => {
    const base = initLearner({ selfLevel: "beginner", goals: [], casualComfort: 1 }, catalog, T0);
    const phone = applyEvent(base, { type: "lesson_saved", cardId: "k.study-cafe", at: T0 + 100 }, catalog).state;
    const laptop = applyEvent(base, { type: "marked_known", cardId: "k.today-doing", at: T0 + 200 }, catalog).state;
    const merged = mergeLearner(phone, laptop);
    expect(merged.cards["k.study-cafe"].saved).toBe(true);
    expect(merged.cards["k.today-doing"].known).toBe(true);
  });
});
