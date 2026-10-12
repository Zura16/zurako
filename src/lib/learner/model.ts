import type { Card, Catalog } from "@/content/catalog";
import { SKILLS, levelValue, type Skill } from "@/content/schema";
import { DEFAULT_VOICE } from "@/lib/audio/voices";
import { QUICK_SWIPE_MS, type AppEvent, type SpeakingGrade } from "./events";
import { DAY, review, type Grade } from "./srs";
import type { CardState, Changes, ConceptState, Goal, LearnerState, Profile, SelfLevel, SkillState } from "./types";

/** Starting ability for each onboarding answer, on the 0–6 level scale. */
const SELF_LEVEL_ABILITY: Record<SelfLevel, number> = {
  hangul: 0.3,
  beginner: 1,
  elementary: 2,
  intermediate: 3,
  advanced: 4.3,
};

/** How onboarding goals map onto card skills and topics, for feed boosts. */
export const GOAL_MATCH: Record<Goal, { skills: Skill[]; topics: string[] }> = {
  conversation: { skills: ["conversation", "speaking"], topics: ["Friends", "Social", "Reactions", "Natural speech"] },
  listening: { skills: ["listening"], topics: ["Pronunciation"] },
  grammar: { skills: ["grammar"], topics: ["Particles", "Tense & aspect", "Connectors"] },
  vocabulary: { skills: ["vocabulary"], topics: [] },
  media: { skills: ["slang", "listening"], topics: ["Slang", "Texting", "Korean media", "Dating"] },
  travel: { skills: ["conversation"], topics: ["Transport", "Travel", "Café", "Restaurant", "Food"] },
  work: { skills: ["honorifics"], topics: ["Work", "Honorifics"] },
  topik: { skills: ["grammar", "reading", "vocabulary"], topics: ["Particles", "Connectors"] },
};

export type OnboardingAnswers = Pick<Profile, "selfLevel" | "goals" | "casualComfort"> & { voice?: Profile["voice"] };

/**
 * Initial learner state from onboarding. Per-skill abilities start from the
 * self-reported level, and concepts clearly below that level are marked
 * "assumed known" so the feed doesn't open with trivia. Assumed concepts get a
 * light review later, which verifies the assumption.
 */
export function initLearner(answers: OnboardingAnswers, catalog: Catalog, now: number): LearnerState {
  const base = SELF_LEVEL_ABILITY[answers.selfLevel];
  const skills: LearnerState["skills"] = {};
  for (const skill of SKILLS) {
    let ability = base;
    if (skill === "listening" || skill === "speaking") ability -= 0.3; // usually lag reading
    if (skill === "slang") ability += (answers.casualComfort - 1) * 0.6;
    if (skill === "honorifics") ability += (answers.casualComfort - 1) * 0.2;
    skills[skill] = { skill, ability: Math.max(0, ability), evidence: 0, updatedAt: now };
  }

  const concepts: Record<string, ConceptState> = {};
  for (const concept of catalog.concepts.values()) {
    if (levelValue(concept.level) <= base - 1) {
      concepts[concept.id] = {
        ...blankConcept(concept.id, now),
        assumed: true,
        stability: 14,
        nextReviewAt: now + 14 * DAY * (0.5 + hash01(concept.id)), // stagger verification reviews
      };
    }
  }

  return {
    profile: {
      ...answers,
      voice: answers.voice ?? DEFAULT_VOICE,
      difficultyOffset: 0,
      topicAffinity: {},
      typeAffinity: {},
      updatedAt: now,
    },
    concepts,
    cards: {},
    skills,
  };
}

/** Correct answers on this many different days take a card off the To learn list. */
export const TO_LEARN_DAYS = 2;

const sameDay = (a: number, b: number) => new Date(a).toDateString() === new Date(b).toDateString();

export const noChanges = (): Changes => ({ profile: false, concepts: new Set(), cards: new Set(), skills: new Set() });

/**
 * Apply one interaction to the learner state. Pure: returns a new state and
 * the set of records that changed. Unknown cards are ignored.
 */
export function applyEvent(state: LearnerState, event: AppEvent, catalog: Catalog): { state: LearnerState; changes: Changes } {
  const card = catalog.cards.get(event.cardId);
  const changes = noChanges();
  if (!card) return { state, changes };

  const next: LearnerState = {
    profile: state.profile,
    concepts: { ...state.concepts },
    cards: { ...state.cards },
    skills: { ...state.skills },
  };
  const now = event.at;
  const teach = card.concepts.filter((c) => c.role === "TEACH").map((c) => c.id);
  const all = card.concepts.map((c) => c.id);

  const touchCard = (patch: Partial<CardState>) => {
    const prev = next.cards[card.id] ?? blankCard(card.id);
    next.cards[card.id] = { ...prev, ...patch, updatedAt: now };
    changes.cards.add(card.id);
  };
  const touchConcept = (id: string, patch: (prev: ConceptState | undefined) => Partial<ConceptState>) => {
    const prev = next.concepts[id];
    next.concepts[id] = { ...(prev ?? blankConcept(id, now)), ...patch(prev), updatedAt: now };
    changes.concepts.add(id);
  };
  const grade = (ids: string[], g: Grade, responseMs?: number) => {
    for (const id of ids) {
      touchConcept(id, (prev) => ({
        ...review(prev, g, now),
        assumed: false,
        exposures: (prev?.exposures ?? 0) + 1,
        correct: (prev?.correct ?? 0) + (g === "again" ? 0 : 1),
        incorrect: (prev?.incorrect ?? 0) + (g === "again" ? 1 : 0),
        difficult: g === "again" ? (prev?.difficult ?? false) : false,
        avgResponseMs: responseMs
          ? runningAvg(prev?.avgResponseMs ?? null, responseMs, prev?.exposures ?? 0)
          : (prev?.avgResponseMs ?? null),
      }));
    }
  };
  const nudgeProfile = (patch: (p: Profile) => Partial<Profile>) => {
    if (!next.profile) return;
    next.profile = { ...next.profile, ...patch(next.profile), updatedAt: now };
    changes.profile = true;
  };
  const affinity = (delta: number) =>
    nudgeProfile((p) => ({
      topicAffinity: bump(p.topicAffinity, card.topic, delta),
      typeAffinity: bump(p.typeAffinity, card.type, delta),
    }));

  /** Progress on the To learn list: correct answers on separate days clear it, a miss resets it. */
  const toLearnOutcome = (ok: boolean) => {
    const cs = next.cards[card.id];
    if (!cs?.toLearn) return;
    if (!ok) return touchCard({ recoveries: 0, lastRecoveryAt: null });
    if (cs.lastRecoveryAt !== null && sameDay(cs.lastRecoveryAt, now)) return;
    const recoveries = cs.recoveries + 1;
    touchCard(recoveries >= TO_LEARN_DAYS ? { toLearn: false, recoveries: 0, lastRecoveryAt: null } : { recoveries, lastRecoveryAt: now });
  };

  switch (event.type) {
    case "lesson_viewed": {
      touchCard({ views: (next.cards[card.id]?.views ?? 0) + 1, lastSeenAt: now });
      // Passive exposure introduces what the card teaches, plus words and
      // expressions met in context. Grammar that merely appears in a sentence
      // is not "taught" by it, so it stays new until a card teaches it.
      // Exposure is not a recall test, so it never moves the review clock.
      for (const { id, role } of card.concepts) {
        const introduces = role === "TEACH" || id.startsWith("v.") || id.startsWith("e.");
        const prev = next.concepts[id];
        if (prev) touchConcept(id, () => ({ exposures: prev.exposures + 1 }));
        else if (introduces) touchConcept(id, () => ({ stability: 0.3, lastSeenAt: now, nextReviewAt: now + 0.3 * DAY, exposures: 1 }));
      }
      if (event.dwellMs > 8000) affinity(0.05);
      break;
    }
    case "lesson_swiped":
      touchCard({ views: (next.cards[card.id]?.views ?? 0) + 1, lastSeenAt: now, lastOutcome: "skipped" });
      if (event.dwellMs < QUICK_SWIPE_MS) affinity(-0.08);
      break;
    case "lesson_completed":
      touchCard({ completions: (next.cards[card.id]?.completions ?? 0) + 1, lastSeenAt: now });
      break;
    case "answer_correct":
    case "answer_incorrect": {
      const ok = event.type === "answer_correct";
      const g: Grade = ok ? (event.responseMs !== undefined && event.responseMs < 2500 ? "easy" : "good") : "again";
      grade(teach.length ? teach : all, g, event.responseMs);
      touchCard({ completions: (next.cards[card.id]?.completions ?? 0) + 1, lastSeenAt: now, lastOutcome: ok ? "correct" : "incorrect" });
      toLearnOutcome(ok);
      updateSkills(next, card, ok ? 1 : 0, now, changes);
      break;
    }
    case "speaking_completed": {
      const outcome = SPEAKING_OUTCOME[event.grade];
      grade(teach.length ? teach : all, outcome.grade);
      touchCard({
        completions: (next.cards[card.id]?.completions ?? 0) + 1,
        lastSeenAt: now,
        lastOutcome: event.grade === "miss" ? "incorrect" : "correct",
      });
      if (event.grade !== "close") toLearnOutcome(event.grade === "good");
      updateSkills(next, card, outcome.score, now, changes);
      break;
    }
    case "marked_known": {
      for (const id of teach) {
        touchConcept(id, (prev) => {
          const stability = Math.max(30, (prev?.stability ?? 0) * 3);
          return {
            stability,
            lastSeenAt: now,
            nextReviewAt: now + stability * DAY,
            assumed: false,
            difficult: false,
            exposures: (prev?.exposures ?? 0) + 1,
          };
        });
      }
      touchCard({ known: true, lastSeenAt: now, toLearn: false, recoveries: 0, lastRecoveryAt: null });
      updateSkills(next, card, 1, now, changes, 0.5);
      break;
    }
    case "marked_easy":
      nudgeProfile((p) => ({ difficultyOffset: clamp(p.difficultyOffset + 0.3, -1.5, 1.5) }));
      for (const id of teach) {
        touchConcept(id, (prev) => {
          const stability = Math.max(10, prev?.stability ?? 0);
          return { stability, lastSeenAt: now, nextReviewAt: now + stability * DAY, assumed: false };
        });
      }
      shiftSkill(next, card.skills[0], 0.25, now, changes);
      affinity(-0.05);
      break;
    case "marked_difficult":
      nudgeProfile((p) => ({ difficultyOffset: clamp(p.difficultyOffset - 0.3, -1.5, 1.5) }));
      grade(teach, "hard");
      for (const id of teach) touchConcept(id, () => ({ difficult: true }));
      touchCard({
        toLearn: true,
        toLearnSince: next.cards[card.id]?.toLearnSince ?? now,
        known: false,
        recoveries: 0,
        lastRecoveryAt: null,
      });
      shiftSkill(next, card.skills[0], -0.25, now, changes);
      break;
    case "word_tapped":
      // Looking a word up is evidence it wasn't known: shorten its interval.
      for (const id of event.conceptIds) {
        touchConcept(id, (prev) =>
          prev && !prev.assumed
            ? {
                lookups: prev.lookups + 1,
                stability: Math.max(0.2, prev.stability * 0.7),
                nextReviewAt: Math.min(prev.nextReviewAt, now + prev.stability * 0.7 * DAY),
              }
            : { lookups: (prev?.lookups ?? 0) + 1, assumed: false, stability: 0.3, lastSeenAt: now, nextReviewAt: now + 0.3 * DAY },
        );
      }
      break;
    case "lesson_saved":
      touchCard({ saved: true });
      affinity(0.15);
      break;
    case "lesson_unsaved":
      touchCard({ saved: false });
      break;
    case "breakdown_opened":
    case "explanation_opened":
    case "audio_played":
    case "audio_replayed":
    case "speaking_started":
      // Analytics only: engagement signals, no learning evidence.
      break;
  }

  return { state: next, changes };
}

const SPEAKING_OUTCOME: Record<SpeakingGrade, { grade: Grade; score: number }> = {
  good: { grade: "good", score: 1 },
  close: { grade: "hard", score: 0.6 },
  miss: { grade: "again", score: 0 },
};

/**
 * Elo-style ability update. Expected success is calibrated so a learner whose
 * ability equals the card level succeeds about 75% of the time.
 */
function updateSkills(state: LearnerState, card: Card, outcome: number, now: number, changes: Changes, weight = 1) {
  card.skills.forEach((skill, i) => {
    const prev = state.skills[skill] ?? { skill, ability: 1, evidence: 0, updatedAt: now };
    const expected = 1 / (1 + Math.exp(-(prev.ability - card.levelValue + 1) * 1.1));
    const k = (0.35 / (1 + prev.evidence / 15)) * (i === 0 ? 1 : 0.5) * weight;
    state.skills[skill] = {
      skill,
      ability: clamp(prev.ability + k * (outcome - expected), 0, 6),
      evidence: prev.evidence + 1,
      updatedAt: now,
    };
    changes.skills.add(skill);
  });
}

function shiftSkill(state: LearnerState, skill: Skill, delta: number, now: number, changes: Changes) {
  const prev: SkillState = state.skills[skill] ?? { skill, ability: 1, evidence: 0, updatedAt: now };
  state.skills[skill] = { ...prev, ability: clamp(prev.ability + delta, 0, 6), updatedAt: now };
  changes.skills.add(skill);
}

export function blankConcept(conceptId: string, now: number): ConceptState {
  return {
    conceptId,
    stability: 0.3,
    exposures: 0,
    correct: 0,
    incorrect: 0,
    lapses: 0,
    lookups: 0,
    assumed: false,
    difficult: false,
    avgResponseMs: null,
    lastSeenAt: now,
    nextReviewAt: now + 0.3 * DAY,
    updatedAt: now,
  };
}

export function blankCard(cardId: string): CardState {
  return {
    cardId,
    views: 0,
    completions: 0,
    saved: false,
    known: false,
    lastSeenAt: null,
    lastOutcome: null,
    toLearn: false,
    toLearnSince: null,
    recoveries: 0,
    lastRecoveryAt: null,
    updatedAt: 0,
  };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const bump = (map: Record<string, number>, key: string, delta: number) => ({ ...map, [key]: clamp((map[key] ?? 0) + delta, -1, 1) });
const runningAvg = (prev: number | null, value: number, n: number) => (prev === null ? value : Math.round((prev * n + value) / (n + 1)));

/** Deterministic 0–1 from a string, for staggering without randomness. */
function hash01(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}
