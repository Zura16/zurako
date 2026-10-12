"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { catalog } from "@/content";
import { layoutSegments, type Segment, type Sentence } from "@/content/schema";
import { AudioButton } from "@/components/ui/AudioButton";
import { SpeechTag, Tag } from "@/components/ui/tags";

const PART_KIND: Record<string, string> = {
  stem: "stem",
  particle: "particle",
  ending: "ending",
  infix: "inside",
  word: "word",
  contraction: "short form",
};

/** Full breakdown of one sentence: every chunk, its parts, forms, and related variants. */
export function XRayView({ cardId, sentenceId, focus }: { cardId: string; sentenceId: string; focus: number | null }) {
  const sentence = catalog.sentences.get(sentenceId);
  const [open, setOpen] = useState<number | null>(focus);
  const focusRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    focusRef.current?.scrollIntoView({ block: "nearest" });
  }, []);

  if (!sentence) return <p className="text-muted">This sentence couldn&apos;t be found.</p>;
  const variants = sentence.variantGroup ? (catalog.variants.get(sentence.variantGroup) ?? []).filter((v) => v.id !== sentence.id) : [];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {sentence.speechLevel && <SpeechTag level={sentence.speechLevel} showKorean />}
          {sentence.naturalness !== "NATURAL" && <Tag>{sentence.naturalness.toLowerCase()}</Tag>}
        </div>
        <p lang="ko" className="ko text-2xl leading-snug font-semibold">
          {layoutSegments(sentence).map(({ segment: seg, before, after }, i) => (
            <Fragment key={i}>
              <span className="whitespace-nowrap">
                {before}
                <button
                  onClick={() => setOpen(i)}
                  aria-pressed={open === i}
                  className={`rounded-md px-0.5 transition-colors ${open === i ? "bg-accent text-accent-ink" : "hover:bg-white/8"}`}
                >
                  {seg.text}
                </button>
                {after}
              </span>{" "}
            </Fragment>
          ))}
        </p>
        <p className="text-muted">{sentence.translation}</p>
        {sentence.literal && <p className="text-sm text-faint">Literally: {sentence.literal}</p>}
        <div className="flex items-center gap-2">
          <AudioButton sentence={sentence} cardId={cardId} />
        </div>
        {sentence.context && <p className="rounded-xl bg-white/4 px-3 py-2 text-sm text-muted">{sentence.context}</p>}
      </div>

      <ol className="space-y-2" aria-label="Sentence chunks">
        {sentence.segments.map((seg, i) => (
          <li key={i} ref={i === focus ? focusRef : undefined}>
            <SegmentRow seg={seg} expanded={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          </li>
        ))}
      </ol>

      {variants.length > 0 && <Variants sentence={sentence} variants={variants} cardId={cardId} />}
    </div>
  );
}

function SegmentRow({ seg, expanded, onToggle }: { seg: Segment; expanded: boolean; onToggle: () => void }) {
  return (
    <div className={`rounded-2xl border transition-colors ${expanded ? "border-accent/40 bg-white/5" : "border-line"}`}>
      <button onClick={onToggle} aria-expanded={expanded} className="flex w-full items-baseline justify-between gap-3 px-4 py-3 text-left">
        <span lang="ko" className="ko text-lg font-semibold">
          {seg.text}
        </span>
        <span className="text-right text-sm text-muted">{seg.gloss}</span>
      </button>
      {expanded && (
        <div className="space-y-3 px-4 pb-4 text-sm">
          {seg.base && seg.base !== seg.text && (
            <p className="text-muted">
              Dictionary form{" "}
              <span lang="ko" className="ko ml-1 font-semibold text-ink">
                {seg.base}
              </span>
            </p>
          )}
          {seg.parts && (
            <div className="flex flex-wrap gap-2">
              {seg.parts.map((p, j) => (
                <div key={j} className="rounded-xl bg-bg px-3 py-2">
                  <div lang="ko" className="ko font-semibold">
                    {p.text}
                  </div>
                  <div className="text-xs text-muted">{p.gloss}</div>
                  {p.kind && <div className="mt-0.5 text-[10px] tracking-wider text-faint uppercase">{PART_KIND[p.kind]}</div>}
                </div>
              ))}
            </div>
          )}
          {seg.forms && (
            <table className="w-full text-left">
              <tbody>
                {seg.forms.map((f) => (
                  <tr key={f.label} className="border-t border-line first:border-0">
                    <td className="py-1.5 pr-3 text-muted">{f.label}</td>
                    <td lang="ko" className={`ko py-1.5 font-semibold ${f.form === seg.text ? "text-accent" : ""}`}>
                      {f.form}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {seg.note && <p className="text-muted">{seg.note}</p>}
          <ConceptChips ids={seg.concepts} />
        </div>
      )}
    </div>
  );
}

function ConceptChips({ ids }: { ids: string[] }) {
  const [shown, setShown] = useState<string | null>(null);
  const concepts = ids.map((id) => catalog.concepts.get(id)).filter((c) => c && c.kind !== "VOCAB");
  if (concepts.length === 0) return null;
  const active = shown ? catalog.concepts.get(shown) : null;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {concepts.map((c) => (
          <button
            key={c!.id}
            onClick={() => setShown(shown === c!.id ? null : c!.id)}
            aria-expanded={shown === c!.id}
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${shown === c!.id ? "bg-accent text-accent-ink" : "bg-accent/12 text-accent"}`}
          >
            <span lang="ko" className="ko">
              {c!.label}
            </span>
          </button>
        ))}
      </div>
      {active && (
        <p className="rounded-xl bg-bg px-3 py-2 text-muted">
          <span className="text-ink">{active.meaning}.</span> {active.details.explanation}
        </p>
      )}
    </div>
  );
}

function Variants({ sentence, variants, cardId }: { sentence: Sentence; variants: Sentence[]; cardId: string }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold tracking-wider text-faint uppercase">Same idea, other ways</h3>
      {variants.map((v) => (
        <div key={v.id} className="flex items-center gap-3 rounded-2xl border border-line px-4 py-3">
          <div className="min-w-0 flex-1 space-y-1">
            <p lang="ko" className="ko font-semibold">
              {v.korean}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {v.speechLevel && <SpeechTag level={v.speechLevel} />}
              {v.naturalness === "TEXTBOOK" && <Tag>textbook</Tag>}
            </div>
          </div>
          <AudioButton sentence={v} cardId={cardId} size="sm" />
        </div>
      ))}
      {sentence.naturalness === "TEXTBOOK" && (
        <p className="text-xs text-faint">Textbook forms are correct. They fit formal settings more than conversation.</p>
      )}
    </section>
  );
}
