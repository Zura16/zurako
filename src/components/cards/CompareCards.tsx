"use client";

import { ArrowRight, Lightbulb } from "lucide-react";
import { catalog } from "@/content";
import type { Card } from "@/content/catalog";
import { payloadOf } from "@/content/schema";
import { KoreanSentence } from "@/components/korean/KoreanSentence";
import { AudioButton } from "@/components/ui/AudioButton";
import { SPEECH_META } from "@/components/ui/tags";
import { Note, Translation } from "./shared";

const sentence = (id: string) => catalog.sentences.get(id)!;
const BORDER = { CASUAL: "border-casual", POLITE: "border-polite", FORMAL: "border-formal" } as const;

export function SpeechLevelsCard({ card }: { card: Card }) {
  const p = payloadOf("SPEECH_LEVELS", card.payload);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-muted">{p.situation}</h2>
      <ol className="space-y-3">
        {p.variants.map((v, i) => {
          const s = sentence(v.sentence);
          const m = SPEECH_META[v.level];
          return (
            <li
              key={v.sentence}
              className={`rise rounded-r-2xl border-l-[3px] ${BORDER[v.level]} bg-white/4 py-3 pr-3 pl-4`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className={`text-xs font-semibold tracking-wider uppercase ${m.color}`}>
                    {m.label} <span className="ko font-medium normal-case opacity-80">{m.korean}</span>
                  </p>
                  <KoreanSentence sentence={s} cardId={card.id} size="md" />
                  <p className="text-sm leading-snug text-muted">{v.when}</p>
                </div>
                <AudioButton sentence={s} cardId={card.id} size="sm" />
              </div>
            </li>
          );
        })}
      </ol>
      <Translation text={`All three: "${sentence(p.variants[0].sentence).translation}"`} className="text-sm" />
      <Note tone="accent">
        <span className="flex gap-2">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <span>{p.takeaway}</span>
        </span>
      </Note>
    </div>
  );
}

export function NaturalCard({ card }: { card: Card }) {
  const p = payloadOf("NATURAL_VS_TEXTBOOK", card.payload);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold text-muted">&ldquo;{sentence(p.rows[0].sentence).translation}&rdquo;</h2>
      <ol className="space-y-3">
        {p.rows.map((row, i) => {
          const s = sentence(row.sentence);
          const color = s.speechLevel ? SPEECH_META[s.speechLevel].color : "text-muted";
          return (
            <li key={row.sentence} className="rise rounded-2xl bg-white/4 p-4" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className={`text-xs font-semibold tracking-wider uppercase ${row.label === "Textbook" ? "text-faint" : color}`}>
                    {row.label}
                  </p>
                  <KoreanSentence sentence={s} cardId={card.id} size="md" className={row.label === "Textbook" ? "text-muted" : ""} />
                  <p className="text-sm leading-snug text-muted">{row.note}</p>
                </div>
                <AudioButton sentence={s} cardId={card.id} size="sm" />
              </div>
            </li>
          );
        })}
      </ol>
      <ul className="space-y-1.5 text-[15px] text-muted">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-2">
            <span className="text-accent" aria-hidden>
              •
            </span>
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PronunciationCard({ card }: { card: Card }) {
  const p = payloadOf("PRONUNCIATION", card.payload);
  const s = sentence(p.sentence);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-4 py-2" aria-label={`${p.written} is pronounced ${p.sounds}`}>
        <span lang="ko" className="ko text-5xl font-bold">
          {p.written}
        </span>
        <ArrowRight className="text-faint" aria-hidden />
        <span lang="ko" className="ko text-5xl font-bold text-accent">
          {p.sounds}
        </span>
      </div>
      <p className="text-[17px] leading-relaxed">{p.rule}</p>
      <div className="flex items-start gap-3 rounded-2xl bg-white/4 p-4">
        <div className="min-w-0 flex-1 space-y-1">
          <KoreanSentence sentence={s} cardId={card.id} size="md" />
          <Translation text={s.translation} className="text-sm" />
        </div>
        <AudioButton sentence={s} cardId={card.id} />
      </div>
      {p.more.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="More examples">
          {p.more.map((m) => (
            <li key={m.written} lang="ko" className="ko rounded-xl border border-line px-3 py-2 text-center">
              <span className="font-semibold">{m.written}</span> <span className="text-accent">{m.sounds}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
