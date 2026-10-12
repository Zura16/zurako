import type { Skill } from "@/content/schema";
import type { VoiceId } from "@/lib/audio/voices";

/** All timestamps are epoch milliseconds in memory; the store maps them to timestamptz. */

export type ConceptState = {
  conceptId: string;
  /** Days until recall probability falls to 90%. */
  stability: number;
  exposures: number;
  correct: number;
  incorrect: number;
  lapses: number;
  lookups: number;
  /** Seeded from onboarding, not yet observed. */
  assumed: boolean;
  difficult: boolean;
  avgResponseMs: number | null;
  lastSeenAt: number;
  nextReviewAt: number;
  updatedAt: number;
};

export type CardOutcome = "correct" | "incorrect" | "skipped";

export type CardState = {
  cardId: string;
  views: number;
  completions: number;
  saved: boolean;
  known: boolean;
  lastSeenAt: number | null;
  lastOutcome: CardOutcome | null;
  /** Marked "too hard": listed under To learn until learnt (see TO_LEARN_DAYS). */
  toLearn: boolean;
  toLearnSince: number | null;
  /** Distinct days with a correct answer since the card was marked too hard. */
  recoveries: number;
  lastRecoveryAt: number | null;
  updatedAt: number;
};

/** Ability on the content level scale: 0 Beginner … 6 Native nuance. */
export type SkillState = { skill: Skill; ability: number; evidence: number; updatedAt: number };

export const GOALS = ["conversation", "listening", "grammar", "vocabulary", "media", "travel", "work", "topik"] as const;
export type Goal = (typeof GOALS)[number];

export const SELF_LEVELS = ["hangul", "beginner", "elementary", "intermediate", "advanced"] as const;
export type SelfLevel = (typeof SELF_LEVELS)[number];

export type Profile = {
  selfLevel: SelfLevel;
  goals: Goal[];
  /** 0 = not comfortable with 반말, 1 = somewhat, 2 = comfortable. */
  casualComfort: 0 | 1 | 2;
  /** Audio voice for sentences; dialogues pair it with a voice of the other gender. */
  voice: VoiceId;
  /** Learned from "too easy" / "too hard": shifts the target level. */
  difficultyOffset: number;
  topicAffinity: Record<string, number>;
  typeAffinity: Record<string, number>;
  updatedAt: number;
};

export type LearnerState = {
  profile: Profile | null;
  concepts: Record<string, ConceptState>;
  cards: Record<string, CardState>;
  skills: Partial<Record<Skill, SkillState>>;
};

export const emptyLearner = (): LearnerState => ({ profile: null, concepts: {}, cards: {}, skills: {} });

/** Which records an update touched, so the store syncs only those. */
export type Changes = {
  profile: boolean;
  concepts: Set<string>;
  cards: Set<string>;
  skills: Set<Skill>;
};
