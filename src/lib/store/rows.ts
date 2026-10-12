import type { Skill } from "@/content/schema";
import type { AppEvent } from "@/lib/learner/events";
import type { CardState, ConceptState, LearnerState, Profile, SkillState } from "@/lib/learner/types";

/** Mapping between in-memory learner state (epoch ms) and database rows (ISO timestamps). */

const iso = (ms: number) => new Date(ms).toISOString();
const ms = (s: string) => Date.parse(s);

export type ProfileRow = {
  user_id: string;
  self_level: Profile["selfLevel"];
  goals: Profile["goals"];
  casual_comfort: Profile["casualComfort"];
  difficulty_offset: number;
  topic_affinity: Record<string, number>;
  type_affinity: Record<string, number>;
  updated_at: string;
};
export type SkillRow = { user_id: string; skill: Skill; ability: number; evidence: number; updated_at: string };
export type ConceptRow = {
  user_id: string;
  concept_id: string;
  stability: number;
  exposures: number;
  correct: number;
  incorrect: number;
  lapses: number;
  lookups: number;
  assumed: boolean;
  difficult: boolean;
  avg_response_ms: number | null;
  last_seen_at: string;
  next_review_at: string;
  updated_at: string;
};
export type CardRow = {
  user_id: string;
  card_id: string;
  views: number;
  completions: number;
  saved: boolean;
  known: boolean;
  last_seen_at: string | null;
  last_outcome: CardState["lastOutcome"];
  to_learn: boolean;
  to_learn_since: string | null;
  recoveries: number;
  last_recovery_at: string | null;
  updated_at: string;
};
export type EventRow = { user_id: string; card_id: string; type: string; data: Record<string, unknown>; client_at: string };

export const profileToRow = (userId: string, p: Profile): ProfileRow => ({
  user_id: userId,
  self_level: p.selfLevel,
  goals: p.goals,
  casual_comfort: p.casualComfort,
  difficulty_offset: p.difficultyOffset,
  topic_affinity: p.topicAffinity,
  type_affinity: p.typeAffinity,
  updated_at: iso(p.updatedAt),
});
export const profileFromRow = (r: ProfileRow): Profile => ({
  selfLevel: r.self_level,
  goals: r.goals,
  casualComfort: r.casual_comfort,
  difficultyOffset: r.difficulty_offset,
  topicAffinity: r.topic_affinity ?? {},
  typeAffinity: r.type_affinity ?? {},
  updatedAt: ms(r.updated_at),
});

export const skillToRow = (userId: string, s: SkillState): SkillRow => ({
  user_id: userId,
  skill: s.skill,
  ability: s.ability,
  evidence: s.evidence,
  updated_at: iso(s.updatedAt),
});
export const skillFromRow = (r: SkillRow): SkillState => ({
  skill: r.skill,
  ability: r.ability,
  evidence: r.evidence,
  updatedAt: ms(r.updated_at),
});

export const conceptToRow = (userId: string, c: ConceptState): ConceptRow => ({
  user_id: userId,
  concept_id: c.conceptId,
  stability: c.stability,
  exposures: c.exposures,
  correct: c.correct,
  incorrect: c.incorrect,
  lapses: c.lapses,
  lookups: c.lookups,
  assumed: c.assumed,
  difficult: c.difficult,
  avg_response_ms: c.avgResponseMs,
  last_seen_at: iso(c.lastSeenAt),
  next_review_at: iso(c.nextReviewAt),
  updated_at: iso(c.updatedAt),
});
export const conceptFromRow = (r: ConceptRow): ConceptState => ({
  conceptId: r.concept_id,
  stability: r.stability,
  exposures: r.exposures,
  correct: r.correct,
  incorrect: r.incorrect,
  lapses: r.lapses,
  lookups: r.lookups,
  assumed: r.assumed,
  difficult: r.difficult,
  avgResponseMs: r.avg_response_ms,
  lastSeenAt: ms(r.last_seen_at),
  nextReviewAt: ms(r.next_review_at),
  updatedAt: ms(r.updated_at),
});

export const cardToRow = (userId: string, c: CardState): CardRow => ({
  user_id: userId,
  card_id: c.cardId,
  views: c.views,
  completions: c.completions,
  saved: c.saved,
  known: c.known,
  last_seen_at: c.lastSeenAt === null ? null : iso(c.lastSeenAt),
  last_outcome: c.lastOutcome,
  to_learn: c.toLearn,
  to_learn_since: c.toLearnSince === null ? null : iso(c.toLearnSince),
  recoveries: c.recoveries,
  last_recovery_at: c.lastRecoveryAt === null ? null : iso(c.lastRecoveryAt),
  updated_at: iso(c.updatedAt),
});
export const cardFromRow = (r: CardRow): CardState => ({
  cardId: r.card_id,
  views: r.views,
  completions: r.completions,
  saved: r.saved,
  known: r.known,
  lastSeenAt: r.last_seen_at === null ? null : ms(r.last_seen_at),
  lastOutcome: r.last_outcome,
  toLearn: r.to_learn ?? false,
  toLearnSince: r.to_learn_since ? ms(r.to_learn_since) : null,
  recoveries: r.recoveries ?? 0,
  lastRecoveryAt: r.last_recovery_at ? ms(r.last_recovery_at) : null,
  updatedAt: ms(r.updated_at),
});

export function eventToRow(userId: string, e: AppEvent): EventRow {
  const { type, cardId, at, ...data } = e;
  return { user_id: userId, card_id: cardId, type, data, client_at: iso(at) };
}

/**
 * Merge two copies of learner state (e.g. local cache and server) record by
 * record, keeping whichever was updated more recently.
 */
export function mergeLearner(a: LearnerState, b: LearnerState): LearnerState {
  const pick = <T extends { updatedAt: number }>(x: T | undefined, y: T | undefined) =>
    !x ? y : !y ? x : x.updatedAt >= y.updatedAt ? x : y;
  const mergeMap = <T extends { updatedAt: number }>(x: Record<string, T>, y: Record<string, T>) => {
    const out: Record<string, T> = { ...x };
    for (const [k, v] of Object.entries(y)) out[k] = pick(out[k], v)!;
    return out;
  };
  return {
    profile: pick(a.profile ?? undefined, b.profile ?? undefined) ?? null,
    concepts: mergeMap(a.concepts, b.concepts),
    cards: mergeMap(a.cards, b.cards),
    skills: mergeMap(a.skills as Record<string, SkillState>, b.skills as Record<string, SkillState>),
  };
}
