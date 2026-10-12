"use client";

import { useState } from "react";
import { AlertTriangle, Sparkles } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf } from "@/content/schema";
import type { FeedPick } from "@/lib/feed/engine";
import { useLearner } from "@/components/providers/LearnerProvider";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { AudioButton } from "@/components/ui/AudioButton";
import { SpeechTag, Tag } from "@/components/ui/tags";
import { Note, Translation } from "./shared";
import { useActiveSince } from "@/components/feed/useActiveSince";

const sentence = (id: string) => catalog.sentences.get(id)!;
const concept = (id: string) => catalog.concepts.get(id)!;

/** A sentence with audio, speech level, and translation: the basic feed unit. */
function SentenceBlock({ id, cardId, size = "xl" }: { id: string; cardId: string; size?: "xl" | "lg" | "md" }) {
  const s = sentence(id);
  return (
    <div className="space-y-3">
      <KoreanSentence sentence={s} cardId={cardId} size={size} />
      <Translation text={s.translation} className={size === "xl" ? "text-lg" : ""} />
      <div className="flex items-center gap-3 pt-1">
        <AudioButton sentence={s} cardId={cardId} />
        {s.speechLevel && <SpeechTag level={s.speechLevel} showKorean />}
      </div>
    </div>
  );
}

export function PhraseCard({ card, pick, active }: { card: Card; pick: FeedPick; active: boolean }) {
  const p = payloadOf("PHRASE", card.payload);
  if (pick.bucket === "review") return <RecallCard card={card} sentenceId={p.sentence} active={active} />;
  return (
    <div className="space-y-6">
      <SentenceBlock id={p.sentence} cardId={card.id} />
      {sentence(p.sentence).context && <p className="text-sm text-faint">{sentence(p.sentence).context}</p>}
      {p.tip && <Note>{p.tip}</Note>}
    </div>
  );
}

/**
 * Review framing for sentence cards: English first, recall the Korean, then
 * self-grade. Review stays inside the feed instead of a separate deck.
 */
function RecallCard({ card, sentenceId, active }: { card: Card; sentenceId: string; active: boolean }) {
  const { track } = useLearner();
  const elapsed = useActiveSince(active);
  const s = sentence(sentenceId);
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<boolean | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-accent">How would you say this?</p>
      <p className="text-2xl leading-snug font-semibold">{s.translation}</p>
      {s.speechLevel && <SpeechTag level={s.speechLevel} showKorean />}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-2xl border border-dashed border-white/25 py-5 text-muted hover:bg-white/5"
        >
          Say it in your head, then tap to check
        </button>
      ) : (
        <div className="rise space-y-4">
          <KoreanSentence sentence={s} cardId={card.id} size="lg" />
          <AudioButton sentence={s} cardId={card.id} />
          {graded === null ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setGraded(false);
                  track({ type: "answer_incorrect", cardId: card.id, mode: "recall", responseMs: elapsed() });
                }}
                className="rounded-2xl bg-white/6 py-3 font-medium hover:bg-white/10"
              >
                Not yet
              </button>
              <button
                onClick={() => {
                  setGraded(true);
                  track({ type: "answer_correct", cardId: card.id, mode: "recall", responseMs: elapsed() });
                }}
                className="rounded-2xl bg-accent py-3 font-semibold text-accent-ink"
              >
                Got it
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted">{graded ? "Nice. This will come back later." : "No problem. It'll come back sooner."}</p>
          )}
        </div>
      )}
    </div>
  );
}

export function ExpressionCard({ card, pick, active }: { card: Card; pick: FeedPick; active: boolean }) {
  const p = payloadOf("EXPRESSION", card.payload);
  if (pick.bucket === "review") return <RecallCard card={card} sentenceId={p.sentence} active={active} />;
  const c = concept(p.concept);
  return (
    <div className="space-y-6">
      <div>
        <p lang="ko" className="ko text-5xl font-bold tracking-tight">
          {c.label}
        </p>
        <p className="mt-2 text-lg text-muted">{c.meaning}</p>
      </div>
      <SentenceBlock id={p.sentence} cardId={card.id} size="lg" />
      <Note>{p.usage}</Note>
      {p.avoid && (
        <Note tone="warn">
          <span className="flex gap-2">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" aria-hidden />
            <span>{p.avoid}</span>
          </span>
        </Note>
      )}
    </div>
  );
}

export function CultureCard({ card }: { card: Card }) {
  const p = payloadOf("CULTURE", card.payload);
  return (
    <div className="space-y-6">
      <h2 lang="ko" className="ko text-3xl leading-tight font-bold">
        {p.title}
      </h2>
      <p className="text-[17px] leading-relaxed text-muted">{p.body}</p>
      {p.sentence && (
        <div className="rounded-3xl border border-line p-5">
          <SentenceBlock id={p.sentence} cardId={card.id} size="md" />
        </div>
      )}
    </div>
  );
}

export function VocabCard({ card }: { card: Card }) {
  const p = payloadOf("VOCAB", card.payload);
  const c = concept(p.concept);
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          {c.details.partOfSpeech && <Tag>{c.details.partOfSpeech}</Tag>}
          {c.details.frequency === "core" && <Tag tone="accent">core word</Tag>}
        </div>
        <p lang="ko" className="ko mt-3 text-6xl font-bold tracking-tight">
          {c.label}
        </p>
        <p className="mt-2 text-lg text-muted">{c.meaning}</p>
      </div>
      {p.memoryHook && (
        <Note tone="accent">
          <span className="flex gap-2">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            <span>{p.memoryHook}</span>
          </span>
        </Note>
      )}
      <ExampleList ids={p.examples} cardId={card.id} />
    </div>
  );
}

export function GrammarCard({ card }: { card: Card }) {
  const p = payloadOf("GRAMMAR", card.payload);
  const c = concept(p.concept);
  return (
    <div className="space-y-6">
      <div>
        <p lang="ko" className="ko text-4xl font-bold tracking-tight text-accent">
          {c.label}
        </p>
        <p className="mt-3 text-lg leading-snug">{p.hook}</p>
      </div>
      {p.formation.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="How it's formed">
          {p.formation.map((f) => (
            <li key={f.base} lang="ko" className="ko rounded-xl bg-white/6 px-3 py-2 text-[15px]">
              <span className="text-muted">{f.base}</span> <span className="text-faint">→</span>{" "}
              <span className="font-semibold">{f.result}</span>
            </li>
          ))}
        </ul>
      )}
      <ExampleList ids={p.examples} cardId={card.id} />
    </div>
  );
}

function ExampleList({ ids, cardId }: { ids: string[]; cardId: string }) {
  return (
    <ul className="space-y-4">
      {ids.map((id) => {
        const s = sentence(id);
        return (
          <li key={id} className="flex items-start gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <KoreanSentence sentence={s} cardId={cardId} size="md" />
              <Translation text={s.translation} className="text-sm" />
            </div>
            <AudioButton sentence={s} cardId={cardId} size="sm" />
          </li>
        );
      })}
    </ul>
  );
}
