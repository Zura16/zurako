import type { ConceptState } from "./types";

/**
 * Spaced repetition on an exponential forgetting curve.
 *
 *   R(t) = 0.9 ^ (t / S)
 *
 * S (stability, days) is the interval at which recall drops to 90%, so a
 * concept is due exactly S days after it was last reviewed. Successful recall
 * grows S, and grows it more when recall was harder (lower R): reviewing just
 * before forgetting is the most valuable review. This is a simplified form of
 * the model behind FSRS, without the per-user fitted parameters.
 */

export const DAY = 24 * 60 * 60 * 1000;
export type Grade = "again" | "hard" | "good" | "easy";

const INITIAL_STABILITY: Record<Grade, number> = { again: 0.1, hard: 0.5, good: 1, easy: 4 };
const MAX_STABILITY = 365;
const MASTERED_STABILITY = 21;

export function recall(state: Pick<ConceptState, "stability" | "lastSeenAt"> | undefined, now: number): number {
  if (!state) return 0;
  const days = Math.max(0, now - state.lastSeenAt) / DAY;
  return Math.pow(0.9, days / Math.max(state.stability, 0.01));
}

export function nextStability(prev: ConceptState | undefined, grade: Grade, now: number): number {
  if (!prev || prev.assumed) {
    // An assumed concept answered correctly keeps its onboarding stability.
    if (prev?.assumed && grade !== "again") return Math.max(prev.stability, INITIAL_STABILITY[grade]);
    return INITIAL_STABILITY[grade];
  }
  const S = prev.stability;
  const R = recall(prev, now);
  const growth = 1.2 + 6 * (1 - R);
  const next =
    grade === "again" ? Math.max(0.1, S * 0.3) : grade === "hard" ? S * 1.2 : grade === "good" ? S * growth : Math.max(4, S * growth * 1.6);
  return Math.min(MAX_STABILITY, next);
}

/** Grade a concept: returns the new scheduling fields. */
export function review(prev: ConceptState | undefined, grade: Grade, now: number) {
  const stability = nextStability(prev, grade, now);
  return {
    stability,
    lastSeenAt: now,
    nextReviewAt: now + stability * DAY,
    lapses: (prev?.lapses ?? 0) + (grade === "again" && prev && !prev.assumed ? 1 : 0),
  };
}

export type ConceptStatus = "new" | "assumed" | "weak" | "due" | "learning" | "mastered";

export function conceptStatus(state: ConceptState | undefined, now: number): ConceptStatus {
  if (!state) return "new";
  if (state.assumed) return "assumed";
  if (state.difficult || recall(state, now) < 0.5 || (state.lapses >= 2 && state.stability < 3)) return "weak";
  if (state.stability >= MASTERED_STABILITY) return now >= state.nextReviewAt ? "due" : "mastered";
  if (now >= state.nextReviewAt) return "due";
  return "learning";
}

/**
 * 0–1 strength for display: how established a concept is (stability on a log
 * scale, 60 days ≈ full) times how well it's remembered right now.
 */
export function mastery(state: ConceptState | undefined, now: number): number {
  if (!state) return 0;
  const strength = Math.min(1, Math.log1p(state.stability) / Math.log1p(60));
  return strength * recall(state, now);
}
