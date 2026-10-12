import { describe, expect, it } from "vitest";
import { catalog } from "@/content";
import { applyEvent, initLearner } from "../model";
import { conceptGroups, overview, skillSummaries } from "../progress";

const T0 = Date.UTC(2026, 0, 1);

describe("progress", () => {
  it("summarizes skills as level bands and flags thin evidence", () => {
    const s = initLearner({ selfLevel: "elementary", goals: [], casualComfort: 1 }, catalog, T0);
    const grammar = skillSummaries(s).find((x) => x.skill === "grammar")!;
    expect(grammar.band).toBe("A2");
    expect(grammar.tentative).toBe(true);
  });

  it("groups grammar into a concept tree with live statuses", () => {
    let s = initLearner({ selfLevel: "hangul", goals: [], casualComfort: 0 }, catalog, T0);
    s = applyEvent(s, { type: "marked_known", cardId: "k.fill-eseo", at: T0 }, catalog).state;
    const particles = conceptGroups(catalog, s, "GRAMMAR", T0 + 1000).find((g) => g.category === "Particles")!;
    expect(particles.rows.find((r) => r.concept.id === "g.place-eseo")!.status).toBe("mastered");
    expect(particles.rows.find((r) => r.concept.id === "g.object")!.status).toBe("new");
    expect(overview(catalog, s, T0 + 1000).mastered).toBe(1);
  });
});
