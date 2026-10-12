import type { Card } from "@/content/catalog";
import type { CardType } from "@/content/schema";

export const TYPE_LABEL: Record<CardType, string> = {
  PHRASE: "Phrase",
  SPEECH_LEVELS: "Speech levels",
  NATURAL_VS_TEXTBOOK: "Natural vs textbook",
  VOCAB: "Word",
  GRAMMAR: "Pattern",
  EXPRESSION: "Expression",
  CULTURE: "Culture",
  LISTENING: "Listening",
  SPEAKING: "Speaking",
  DIALOGUE: "Dialogue",
  STORY: "Story",
  MULTIPLE_CHOICE: "Which fits?",
  FILL_BLANK: "Fill the gap",
  TRANSFORM: "Rebuild it",
  MISTAKE: "Spot the problem",
  PRONUNCIATION: "Sounds like",
};

/** Card types that test the learner; the breakdown button would spoil them before answering. */
export const QUIZ_TYPES = new Set<CardType>(["LISTENING", "FILL_BLANK", "MULTIPLE_CHOICE", "MISTAKE", "TRANSFORM", "SPEAKING"]);

/** The sentence the X-ray button and autoplay use for a card. */
export function primarySentenceId(card: Card): string | null {
  return card.sentenceIds[0] ?? null;
}
