"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf } from "@/content/schema";
import { matchTiles } from "@/lib/speech/evaluate";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useActiveSince } from "@/components/feed/useActiveSince";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { AudioButton } from "@/components/ui/AudioButton";
import { SpeechTag } from "@/components/ui/tags";
import { Choices, Heading, Note, Translation } from "./shared";

const sentence = (id: string) => catalog.sentences.get(id)!;

function useAnswer(card: Card, active: boolean) {
  const { track } = useLearner();
  const elapsed = useActiveSince(active);
  return (correct: boolean) =>
    track({ type: correct ? "answer_correct" : "answer_incorrect", cardId: card.id, mode: "quiz", responseMs: elapsed() });
}

/** Seeded Fisher-Yates shuffle, so option order is stable for a card across renders. */
function shuffled<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    const j = h % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function MultipleChoiceCard({ card, active }: { card: Card; active: boolean }) {
  const p = payloadOf("MULTIPLE_CHOICE", card.payload);
  const answer = useAnswer(card, active);
  const korean = p.options.every((o) => /[가-힣]/.test(o.text));
  return (
    <div className="space-y-6">
      <Heading>{p.prompt}</Heading>
      {p.context && <p className="text-muted">{p.context}</p>}
      {p.sentence && <KoreanSentence sentence={sentence(p.sentence)} cardId={card.id} size="lg" />}
      <Choices options={p.options} korean={korean} onAnswer={(ok) => answer(ok)} />
    </div>
  );
}

export function MistakeCard({ card, active }: { card: Card; active: boolean }) {
  const p = payloadOf("MISTAKE", card.payload);
  const answer = useAnswer(card, active);
  const [done, setDone] = useState(false);
  const better = sentence(p.better);
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">{p.situation}</p>
      <div className="rounded-2xl border border-bad/30 bg-bad/5 px-4 py-3">
        <p className="mb-1 text-xs font-semibold tracking-wider text-bad uppercase">A learner says</p>
        <p lang="ko" className="ko text-2xl font-semibold">
          {p.learnerSays}
        </p>
      </div>
      <Heading>{p.question}</Heading>
      <Choices
        options={p.options}
        onAnswer={(ok) => {
          answer(ok);
          setDone(true);
        }}
      />
      {done && (
        <div className="rise space-y-2 rounded-2xl border border-good/30 bg-good/5 px-4 py-3">
          <p className="text-xs font-semibold tracking-wider text-good uppercase">More natural</p>
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1 space-y-1">
              <KoreanSentence sentence={better} cardId={card.id} size="md" />
              <Translation text={better.translation} className="text-sm" />
            </div>
            <AudioButton sentence={better} cardId={card.id} size="sm" />
          </div>
        </div>
      )}
    </div>
  );
}

export function FillBlankCard({ card, active }: { card: Card; active: boolean }) {
  const p = payloadOf("FILL_BLANK", card.payload);
  const s = sentence(p.sentence);
  const answer = useAnswer(card, active);
  const [picked, setPicked] = useState<string | null>(null);
  const options = useMemo(() => shuffled(p.options, card.id), [p.options, card.id]);
  const [before, after] = s.korean.split(p.blank);
  const right = picked === p.blank;

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-accent">Fill the gap</p>
      {picked === null ? (
        <p lang="ko" className="ko text-3xl leading-snug font-semibold">
          {before}
          <span className="mx-0.5 inline-block min-w-[2.2em] border-b-2 border-accent text-center text-transparent" aria-label="blank">
            {p.blank}
          </span>
          {after}
        </p>
      ) : (
        <div className="rise space-y-3">
          <p lang="ko" className="ko text-3xl leading-snug font-semibold">
            {before}
            <span className={right ? "text-good" : "text-bad line-through decoration-2"}>{picked}</span>
            {!right && <span className="text-good">{p.blank}</span>}
            {after}
          </p>
          <Translation text={s.translation} />
          <div className="flex items-center gap-3">
            <AudioButton sentence={s} cardId={card.id} />
            <span className="text-sm text-faint">Tap a word for the full breakdown:</span>
          </div>
          <KoreanSentence sentence={s} cardId={card.id} size="md" className="text-muted" />
        </div>
      )}
      {picked === null && <Translation text={s.translation} />}
      {p.hint && picked === null && <p className="text-sm text-faint">Hint: {p.hint}</p>}
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <button
            key={o}
            disabled={picked !== null}
            onClick={() => {
              setPicked(o);
              answer(o === p.blank);
            }}
            lang="ko"
            className={`ko min-w-16 rounded-2xl border px-5 py-3 text-xl font-semibold transition-colors ${
              picked === null
                ? "border-line bg-white/5 hover:bg-white/10"
                : o === p.blank
                  ? "border-good/60 bg-good/10"
                  : o === picked
                    ? "border-bad/60 bg-bad/10"
                    : "border-line opacity-50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TransformCard({ card, active }: { card: Card; active: boolean }) {
  const p = payloadOf("TRANSFORM", card.payload);
  const from = sentence(p.from);
  const accepted = p.accepted.map(sentence);
  const answer = useAnswer(card, active);
  const bank = useMemo(() => shuffled(p.tiles, card.id).map((text, id) => ({ id, text })), [p.tiles, card.id]);
  const [built, setBuilt] = useState<number[]>([]);
  const [result, setResult] = useState<"right" | "wrong" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const match = result
    ? matchTiles(
        built.map((i) => bank[i].text),
        accepted,
      )
    : null;

  const check = () => {
    const ok =
      matchTiles(
        built.map((i) => bank[i].text),
        accepted,
      ) !== null;
    setResult(ok ? "right" : "wrong");
    // Only the first attempt is learning evidence; retries are practice.
    if (attempts === 0) answer(ok);
    setAttempts(attempts + 1);
  };

  return (
    <div className="space-y-6">
      <Heading>{p.instruction}</Heading>
      <div className="space-y-2 rounded-2xl bg-white/4 p-4">
        <div className="flex items-center gap-2">{from.speechLevel && <SpeechTag level={from.speechLevel} />}</div>
        <KoreanSentence sentence={from} cardId={card.id} size="md" />
      </div>

      <div
        className={`flex min-h-16 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed px-3 py-3 ${
          result === "right" ? "border-good/60" : result === "wrong" ? "border-bad/60" : "border-white/20"
        }`}
        aria-label="Your answer"
        aria-live="polite"
      >
        {built.length === 0 && <span className="px-1 text-faint">Tap the pieces below</span>}
        {built.map((i) => (
          <button
            key={i}
            disabled={result !== null}
            onClick={() => setBuilt(built.filter((b) => b !== i))}
            lang="ko"
            className="ko rounded-xl bg-accent px-3 py-2 text-lg font-semibold text-accent-ink"
          >
            {bank[i].text}
          </button>
        ))}
      </div>

      {result === null ? (
        <>
          <div className="flex flex-wrap gap-2">
            {bank.map((t) => (
              <button
                key={t.id}
                disabled={built.includes(t.id)}
                onClick={() => setBuilt([...built, t.id])}
                lang="ko"
                className="ko rounded-xl border border-line bg-white/5 px-3 py-2 text-lg font-medium hover:bg-white/10 disabled:opacity-25"
              >
                {t.text}
              </button>
            ))}
          </div>
          <button
            disabled={built.length === 0}
            onClick={check}
            className="w-full rounded-2xl bg-accent py-3.5 font-semibold text-accent-ink disabled:opacity-30"
          >
            Check
          </button>
        </>
      ) : (
        <div className="rise space-y-3">
          <p className={`font-semibold ${result === "right" ? "text-good" : "text-bad"}`}>
            {result === "right" ? "Natural. Nice." : "Not quite."}
          </p>
          <p className="text-sm text-muted">{accepted.length > 1 ? "All of these work:" : "Answer:"}</p>
          <ul className="space-y-2">
            {accepted.map((s) => (
              <li
                key={s.id}
                className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 ${match?.id === s.id ? "bg-good/10" : "bg-white/4"}`}
              >
                <span lang="ko" className="ko flex-1 text-lg font-semibold">
                  {s.korean}
                </span>
                <AudioButton sentence={s} cardId={card.id} size="sm" />
              </li>
            ))}
          </ul>
          {accepted[0].context && <Note>{accepted[0].context}</Note>}
          {result === "wrong" && (
            <button
              onClick={() => {
                setBuilt([]);
                setResult(null);
              }}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
            >
              <RotateCcw size={14} /> Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
