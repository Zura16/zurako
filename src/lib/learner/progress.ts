import type { Catalog } from "@/content/catalog";
import { LEVEL_LABELS, SKILLS, levelName, type Concept, type Skill } from "@/content/schema";
import { conceptStatus, mastery, type ConceptStatus } from "./srs";
import type { LearnerState } from "./types";

export type SkillSummary = {
  skill: Skill;
  ability: number;
  band: string;
  /** Progress through the current band, 0–1. */
  withinBand: number;
  evidence: number;
  /** Too few graded answers for the estimate to mean much yet. */
  tentative: boolean;
};

export function skillSummaries(learner: LearnerState): SkillSummary[] {
  return SKILLS.map((skill) => {
    const s = learner.skills[skill];
    const ability = s?.ability ?? 0;
    const floor = Math.floor(ability);
    return {
      skill,
      ability,
      band: LEVEL_LABELS[levelName(floor)],
      withinBand: ability - floor,
      evidence: s?.evidence ?? 0,
      tentative: (s?.evidence ?? 0) < 8,
    };
  });
}

export type ConceptRow = { concept: Concept; status: ConceptStatus; mastery: number };
export type ConceptGroup = { category: string; rows: ConceptRow[]; counts: Record<ConceptStatus, number> };

/** Concepts of one kind grouped by category, in curriculum order. */
export function conceptGroups(catalog: Catalog, learner: LearnerState, kind: Concept["kind"], now: number): ConceptGroup[] {
  const groups = new Map<string, ConceptRow[]>();
  for (const concept of catalog.concepts.values()) {
    if (concept.kind !== kind) continue;
    const st = learner.concepts[concept.id];
    const row = { concept, status: conceptStatus(st, now), mastery: mastery(st, now) };
    groups.set(concept.category, [...(groups.get(concept.category) ?? []), row]);
  }
  return [...groups].map(([category, rows]) => ({ category, rows, counts: countStatuses(rows) }));
}

function countStatuses(rows: ConceptRow[]): Record<ConceptStatus, number> {
  const counts: Record<ConceptStatus, number> = { new: 0, assumed: 0, weak: 0, due: 0, learning: 0, mastered: 0 };
  for (const r of rows) counts[r.status]++;
  return counts;
}

export function overview(catalog: Catalog, learner: LearnerState, now: number) {
  let introduced = 0;
  let mastered = 0;
  let due = 0;
  for (const id of catalog.concepts.keys()) {
    const st = learner.concepts[id];
    if (!st || st.assumed) continue;
    introduced++;
    const status = conceptStatus(st, now);
    if (status === "mastered") mastered++;
    if (status === "due" || status === "weak") due++;
  }
  const cardsSeen = Object.values(learner.cards).filter((c) => c.views > 0).length;
  return { introduced, mastered, due, cardsSeen, totalCards: catalog.cards.size };
}
