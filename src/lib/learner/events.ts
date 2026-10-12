/**
 * Interaction events. They are both the analytics stream (stored raw) and the
 * evidence the learner model updates from (see applyEvent in model.ts).
 */

type Base = { cardId: string; at: number };

export type AppEvent =
  | (Base & { type: "lesson_viewed"; dwellMs: number })
  | (Base & { type: "lesson_swiped"; dwellMs: number })
  | (Base & { type: "lesson_completed" })
  | (Base & { type: "answer_correct" | "answer_incorrect"; responseMs?: number; mode: "quiz" | "listening" | "recall" | "story" })
  | (Base & {
      type:
        | "marked_known"
        | "marked_difficult"
        | "marked_easy"
        | "lesson_saved"
        | "lesson_unsaved"
        | "breakdown_opened"
        | "explanation_opened"
        | "speaking_started";
    })
  | (Base & { type: "word_tapped"; text: string; conceptIds: string[] })
  | (Base & { type: "audio_played" | "audio_replayed"; rate: number })
  | (Base & { type: "speaking_completed"; grade: SpeakingGrade; method: "recognition" | "typed" | "self" })
  /** A Learn-tab lesson read to the end (cardId is the lesson id, e.g. "lesson.007"). */
  | (Base & { type: "lesson_finished"; conceptIds: string[] })
  /** A word-bank word marked as learned (cardId is the word id, e.g. "word.좋아요"). */
  | (Base & { type: "word_learned" | "word_unlearned" });

export type SpeakingGrade = "good" | "close" | "miss";
export type EventType = AppEvent["type"];

/** Swipes faster than this count as "swiped away" rather than "viewed". */
export const QUICK_SWIPE_MS = 1500;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
/** An event as callers create it; the timestamp defaults to now. */
export type EventInput = DistributiveOmit<AppEvent, "at"> & { at?: number };
