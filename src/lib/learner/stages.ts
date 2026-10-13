import { catalog as defaultCatalog } from "@/content";
import type { Card, Catalog } from "@/content/catalog";
import { cardStage } from "@/content/path/build";
import { LEVEL_SPECS } from "@/content/path/levels";
import { currentLevel } from "./path";
import type { LearnerState } from "./types";

/**
 * Feed stages, one per path level (stage 0 is Level 1, Foundations). New
 * feed content comes only from open levels; levels open by finishing
 * chapters in the Learn tab (see path.ts).
 */
export const STAGES = LEVEL_SPECS.map((l) => ({
  name: `Level ${l.number} · ${l.title}`,
  short: `Level ${l.number}`,
  maxLevel: l.maxLevel,
}));

export const stageOf = (card: Card, catalog: Catalog = defaultCatalog): number => cardStage(card, catalog);

/** The highest open stage. */
export const currentStage = (learner: LearnerState): number => currentLevel(learner) - 1;

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
