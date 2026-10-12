import { describe, expect, it } from "vitest";
import { catalog, UNITS } from "@/content";
import { CONCEPTS } from "@/content/concepts";
import { buildPrompt, validateGenerated, type GenerationRequest } from "../spec";

const request: GenerationRequest = {
  targetLevel: "A2",
  targetGrammar: "g.intent-euryeogo",
  knownGrammar: ["g.topic", "g.subject", "g.object", "g.past", "g.haeyo", "g.drop-particle", "g.place-e"],
  vocabularyBands: ["core", "common"],
  speechLevel: "POLITE",
  topic: "meeting a friend",
  cardTypes: ["PHRASE"],
  count: 1,
};
const canonical = { concepts: CONCEPTS, units: UNITS };

const sentence = (overrides: Record<string, unknown> = {}) => ({
  id: "s.gen-meet",
  korean: "친구 만나려고 카페에 갔어요.",
  translation: "I went to a café to meet a friend.",
  level: "A2",
  speechLevel: "POLITE",
  segments: [
    { text: "친구", gloss: "friend", concepts: ["v.친구", "g.drop-particle"] },
    { text: "만나려고", gloss: "in order to meet", concepts: ["v.만나다", "g.intent-euryeogo"] },
    { text: "카페에", gloss: "to a café", concepts: ["v.카페", "g.place-e"] },
    { text: "갔어요", gloss: "went", concepts: ["v.가다", "g.past"] },
  ],
  ...overrides,
});
const card = {
  id: "k.gen-meet",
  type: "PHRASE",
  level: "A2",
  topic: "Friends",
  skills: ["grammar"],
  teaches: ["g.intent-euryeogo"],
  payload: { sentence: "s.gen-meet" },
};

describe("constrained generation", () => {
  it("builds a prompt that states the constraints", () => {
    const prompt = buildPrompt(request, catalog);
    expect(prompt).toContain("-(으)려고");
    expect(prompt).toContain("해요체");
    expect(prompt).toContain("v.친구");
  });

  it("accepts content that stays inside the constraints", () => {
    expect(validateGenerated({ sentences: [sentence()], cards: [card] }, request, canonical)).toEqual({ ok: true, problems: [] });
  });

  it("rejects grammar the learner hasn't met", () => {
    const s = sentence({
      korean: "피곤해서 친구 만나려고 갔어요.",
      segments: [
        { text: "피곤해서", gloss: "because tired", concepts: ["v.피곤하다", "g.because-aseo"] },
        { text: "친구", gloss: "friend", concepts: ["v.친구"] },
        { text: "만나려고", gloss: "to meet", concepts: ["g.intent-euryeogo"] },
        { text: "갔어요", gloss: "went", concepts: ["g.past"] },
      ],
    });
    const r = validateGenerated({ sentences: [s], cards: [card] }, request, canonical);
    expect(r.problems).toContain("s.gen-meet: uses grammar g.because-aseo the learner hasn't met");
  });

  it("rejects the wrong speech level, invented concepts, and broken segments", () => {
    const casual = validateGenerated(
      { sentences: [sentence({ korean: "친구 만나려고 카페에 갔어.", speechLevel: "CASUAL" })], cards: [card] },
      request,
      canonical,
    );
    expect(casual.problems.some((p) => p.includes("expected 해요체"))).toBe(true);

    const invented = sentence();
    (invented.segments as { concepts: string[] }[])[0].concepts = ["v.절친"];
    expect(
      validateGenerated({ sentences: [invented], cards: [card] }, request, canonical).problems.some((p) =>
        p.includes("unknown concept v.절친"),
      ),
    ).toBe(true);

    const broken = validateGenerated(
      { sentences: [sentence({ korean: "친구를 만나려고 카페에 갔어요." })], cards: [card] },
      request,
      canonical,
    );
    expect(broken.problems.some((p) => p.includes("do not rebuild"))).toBe(true);
  });

  it("requires cards to teach the target", () => {
    const r = validateGenerated({ sentences: [sentence()], cards: [{ ...card, teaches: [] }] }, request, canonical);
    expect(r.problems).toContain("k.gen-meet: must teach g.intent-euryeogo");
  });
});
