"use client";

import type { Card } from "@/content/catalog";
import type { FeedPick } from "@/lib/feed/engine";
import { NaturalCard, PronunciationCard, SpeechLevelsCard } from "./CompareCards";
import { DialogueCard, StoryCard } from "./ConversationCards";
import { ListeningCard } from "./ListeningCard";
import { FillBlankCard, MistakeCard, MultipleChoiceCard, TransformCard } from "./QuizCards";
import { CultureCard, ExpressionCard, GrammarCard, PhraseCard, VocabCard } from "./ReadCards";
import { SpeakingCard } from "./SpeakingCard";

export function CardBody({ card, pick, active }: { card: Card; pick: FeedPick; active: boolean }) {
  switch (card.type) {
    case "PHRASE":
      return <PhraseCard card={card} pick={pick} active={active} />;
    case "SPEECH_LEVELS":
      return <SpeechLevelsCard card={card} />;
    case "NATURAL_VS_TEXTBOOK":
      return <NaturalCard card={card} />;
    case "VOCAB":
      return <VocabCard card={card} />;
    case "GRAMMAR":
      return <GrammarCard card={card} />;
    case "EXPRESSION":
      return <ExpressionCard card={card} pick={pick} active={active} />;
    case "CULTURE":
      return <CultureCard card={card} />;
    case "LISTENING":
      return <ListeningCard card={card} active={active} />;
    case "SPEAKING":
      return <SpeakingCard card={card} />;
    case "DIALOGUE":
      return <DialogueCard card={card} />;
    case "STORY":
      return <StoryCard card={card} />;
    case "MULTIPLE_CHOICE":
      return <MultipleChoiceCard card={card} active={active} />;
    case "FILL_BLANK":
      return <FillBlankCard card={card} active={active} />;
    case "TRANSFORM":
      return <TransformCard card={card} active={active} />;
    case "MISTAKE":
      return <MistakeCard card={card} active={active} />;
    case "PRONUNCIATION":
      return <PronunciationCard card={card} />;
  }
}
