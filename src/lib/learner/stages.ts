import type { Card, Catalog } from "@/content/catalog";
import type { ConceptState, LearnerState } from "./types";

/**
 * The learning path. New content comes only from the learner's current stage
 * or earlier; the current stage is derived from what they've learned, so it
 * can't drift out of sync with their progress.
 */
export const STAGES = [
  { name: "Foundations", short: "Foundations", maxLevel: 0 },
  { name: "A1 · Everyday basics", short: "A1", maxLevel: 1 },
  { name: "A2 · Getting around", short: "A2", maxLevel: 2 },
  { name: "B1 · Real conversations", short: "B1", maxLevel: 3 },
  { name: "B2 and beyond", short: "B2+", maxLevel: 6 },
] as const;

/** Share of a stage's core concepts to learn before the next stage opens. */
export const STAGE_PASS = 0.7;

export const stageOf = (card: Pick<Card, "levelValue">): number => STAGES.findIndex((s) => card.levelValue <= s.maxLevel);

/** Learned enough to build on: assumed at onboarding, answered right, or met across several cards. */
export function isLearned(st: ConceptState | undefined): boolean {
  if (!st || st.difficult) return false;
  return st.assumed || st.correct >= 1 || st.exposures >= 3;
}

const coreCache = new WeakMap<Catalog, string[][]>();

/** Concepts each stage exists to teach: taught by its cards, and not already taught earlier. */
export function stageCoreConcepts(catalog: Catalog): string[][] {
  const cached = coreCache.get(catalog);
  if (cached) return cached;
  const seen = new Set<string>();
  const core = STAGES.map((_, i) => {
    const ids = new Set<string>();
    for (const card of catalog.cards.values()) {
      if (stageOf(card) !== i) continue;
      for (const c of card.concepts) if (c.role === "TEACH" && !seen.has(c.id)) ids.add(c.id);
    }
    ids.forEach((id) => seen.add(id));
    return [...ids];
  });
  coreCache.set(catalog, core);
  return core;
}

export type StageProgress = { index: number; learned: number; total: number; fraction: number };

export function stageProgress(catalog: Catalog, learner: LearnerState): StageProgress[] {
  return stageCoreConcepts(catalog).map((ids, index) => {
    const learned = ids.filter((id) => isLearned(learner.concepts[id])).length;
    return { index, learned, total: ids.length, fraction: ids.length ? learned / ids.length : 1 };
  });
}

/** First stage not yet passed, never below the learner's skip-ahead floor. */
export function currentStage(catalog: Catalog, learner: LearnerState): number {
  const derived = stageProgress(catalog, learner).findIndex((p) => p.fraction < STAGE_PASS);
  const stage = derived < 0 ? STAGES.length - 1 : derived;
  return Math.max(stage, learner.profile?.minStage ?? 0);
}

/**
 * Within a stage, cards carry a module number (greetings before numbers).
 * The current module is the lowest one with a card the learner hasn't seen.
 */
export function currentModule(catalog: Catalog, learner: LearnerState, stage: number): number | null {
  let lowest: number | null = null;
  for (const card of catalog.cards.values()) {
    if (card.module === undefined || stageOf(card) !== stage) continue;
    if ((learner.cards[card.id]?.views ?? 0) > 0) continue;
    if (lowest === null || card.module < lowest) lowest = card.module;
  }
  return lowest;
}
