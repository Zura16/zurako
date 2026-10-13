import { catalog } from "@/content";
import { PATH } from "@/content/path";
import { applyEvent } from "../model";
import type { LearnerState } from "../types";

/** Pass the level tests below `level`, so levels 1 through `level` are open. */
export function openLevels(state: LearnerState, level: number, at = Date.UTC(2026, 0, 1)): LearnerState {
  for (const lv of PATH.slice(0, level - 1)) {
    state = applyEvent(
      state,
      {
        type: "quiz_finished",
        cardId: lv.id,
        at,
        correct: 15,
        total: 15,
        passed: true,
        missed: [],
        right: [],
        conceptIds: lv.chapters.flatMap((c) => c.conceptIds),
        chapterIds: lv.chapters.map((c) => c.id),
      },
      catalog,
    ).state;
  }
  return state;
}
