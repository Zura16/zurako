"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ChevronsUp, Lock } from "lucide-react";
import { catalog } from "@/content";
import { CATEGORY_LABEL, chapterById, levelByNumber, type Chapter, type Point } from "@/content/path";
import { wordId } from "@/content/wordbank";
import { chapterQuiz, chapterStatus, isLevelUnlocked } from "@/lib/learner/path";
import type { FeedPick } from "@/lib/feed/engine";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings } from "@/components/providers/SettingsProvider";
import { CardBody } from "@/components/cards/CardBody";
import { TYPE_LABEL } from "@/components/feed/cardMeta";
import { AudioButton } from "@/components/ui/AudioButton";
import { Tag } from "@/components/ui/tags";
import { BlockView } from "./blocks";
import { RomanizationToggle } from "./KoreanLine";
import { DrawnQuiz, type QuizResult } from "./Quiz";

export function ChapterPage() {
  const params = useSearchParams();
  const chapter = chapterById(params.get("id") ?? "");
  if (!chapter) return <NotFound text="That chapter couldn't be found." />;
  const start = params.get("start");
  const first: Step =
    start === "quiz" ? { kind: "quiz", attempt: 0 } : start === "points" ? { kind: "point", index: 0 } : { kind: "overview" };
  return <ChapterView key={chapter.id} chapter={chapter} first={first} />;
}

export function NotFound({ text }: { text: string }) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 px-8 text-center">
      <p className="text-muted">{text}</p>
      <Link href="/" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
        Back to Learn
      </Link>
    </div>
  );
}

type Step = { kind: "overview" } | { kind: "point"; index: number } | { kind: "quiz"; attempt: number };

/** A chapter: an overview, its points one screen at a time, then the quiz. */
function ChapterView({ chapter, first }: { chapter: Chapter; first: Step }) {
  const { learner, track } = useLearner();
  const [step, setStep] = useState<Step>(first);
  const unlocked = isLevelUnlocked(chapter.level, learner);
  const status = chapterStatus(chapter, learner, unlocked);
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current || !unlocked) return;
    opened.current = true;
    track({ type: "lesson_viewed", cardId: chapter.id, dwellMs: 0 });
  }, [chapter.id, unlocked, track]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  const level = levelByNumber(chapter.level)!;
  const nextChapter = level.chapters[chapter.number] ?? null;

  if (!unlocked) {
    return (
      <Shell chapter={chapter}>
        <div className="mt-10 space-y-3 rounded-2xl border border-line p-5 text-center">
          <Lock className="mx-auto text-faint" size={22} />
          <p className="font-semibold">Level {chapter.level} is locked</p>
          <p className="text-sm text-muted">Finish more chapters in the level before it, or take its test to skip ahead.</p>
        </div>
      </Shell>
    );
  }

  if (step.kind === "quiz") {
    const finish = (r: QuizResult) =>
      track({
        type: "quiz_finished",
        cardId: chapter.id,
        correct: r.correct,
        total: r.total,
        passed: r.passed,
        missed: unique(r.missed.map((q) => q.source)),
        right: unique(r.right.map((q) => q.source)),
        conceptIds: chapter.conceptIds,
      });
    return (
      <Shell chapter={chapter}>
        <h1 className="mt-2 text-lg font-semibold text-muted">Chapter quiz</h1>
        <div className="mt-4">
          <DrawnQuiz
            key={step.attempt}
            draw={(seed) => chapterQuiz(chapter, seed)}
            itemId={chapter.id}
            onFinish={finish}
            onRetake={() => setStep({ kind: "quiz", attempt: step.attempt + 1 })}
            done={(r) =>
              r.passed ? (
                nextChapter ? (
                  <Link
                    href={`/learn/chapter/?id=${nextChapter.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-accent-ink"
                  >
                    Next: {nextChapter.title} <ArrowRight size={17} />
                  </Link>
                ) : (
                  <Link href="/" className="block w-full rounded-2xl bg-accent py-4 font-semibold text-accent-ink">
                    Back to your levels
                  </Link>
                )
              ) : (
                <button onClick={() => setStep({ kind: "point", index: 0 })} className="w-full rounded-2xl bg-white/6 py-4 font-semibold">
                  Read the chapter again
                </button>
              )
            }
          />
        </div>
      </Shell>
    );
  }

  if (step.kind === "point") {
    const point = chapter.points[step.index];
    const last = step.index === chapter.points.length - 1;
    return (
      <Shell chapter={chapter}>
        <div className="mt-2 flex gap-1" aria-hidden>
          {chapter.points.map((_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full ${i <= step.index ? "bg-accent" : "bg-white/10"}`} />
          ))}
        </div>
        <p className="mt-4 text-xs text-faint">
          Point {step.index + 1} of {chapter.points.length}
        </p>
        {/* A card has its own heading; a label is enough above it. */}
        {point.kind === "card" ? (
          <p className="mt-1 text-xs font-semibold tracking-wider text-accent uppercase">
            {TYPE_LABEL[catalog.cards.get(point.cardId)!.type]}
          </p>
        ) : (
          <h1 className="mt-1 text-2xl leading-tight font-bold">{point.title}</h1>
        )}
        <div className="mt-5">
          <PointView key={step.index} point={point} />
        </div>
        <div className="fixed inset-x-0 bottom-[calc(var(--safe-bottom)+4rem)] z-30 bg-gradient-to-t from-bg via-bg/95 to-transparent pt-6 pb-3">
          <div className="mx-auto flex max-w-xl gap-2 px-5">
            <button
              onClick={() => setStep(step.index === 0 ? { kind: "overview" } : { kind: "point", index: step.index - 1 })}
              className="rounded-2xl bg-white/6 px-5 py-3.5 font-semibold"
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => setStep(last ? { kind: "quiz", attempt: 0 } : { kind: "point", index: step.index + 1 })}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 font-semibold text-accent-ink"
            >
              {last ? "Start the quiz" : "Next"} <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell chapter={chapter}>
      <header className="mt-2 space-y-3">
        <p className="text-xs font-semibold tracking-wider text-accent uppercase">
          Level {chapter.level} · Chapter {chapter.number}
        </p>
        <h1 className="text-3xl leading-tight font-bold">{chapter.title}</h1>
        {chapter.korean && (
          <p lang="ko" className="ko text-muted">
            {chapter.korean}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{CATEGORY_LABEL[chapter.category]}</Tag>
          {status === "done" && <Tag tone="accent">Finished</Tag>}
          {status === "tested-out" && <Tag>Tested out</Tag>}
        </div>
        <p className="text-[15px] leading-relaxed text-muted">{chapter.summary}</p>
      </header>

      <ol className="mt-6 divide-y divide-line rounded-2xl border border-line">
        {chapter.points.map((p, i) => (
          <li key={i}>
            <button
              onClick={() => setStep({ kind: "point", index: i })}
              className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/4"
            >
              <span className="w-5 text-sm font-semibold text-faint">{i + 1}</span>
              <span className="ko min-w-0 flex-1 truncate">{p.title}</span>
            </button>
          </li>
        ))}
        <li className="flex items-center gap-3 px-4 py-3 text-muted">
          <span className="w-5 text-faint">
            <Check size={15} />
          </span>
          <span className="flex-1">Quiz · pass with 80%</span>
        </li>
      </ol>

      <div className="mt-6 space-y-2">
        <button
          onClick={() => setStep({ kind: "point", index: 0 })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-accent-ink"
        >
          {status === "done" ? "Read it again" : "Start"} <ArrowRight size={17} />
        </button>
        <button
          onClick={() => setStep({ kind: "quiz", attempt: 0 })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white/6 py-4 font-semibold"
        >
          {status === "done" ? (
            "Retake the quiz"
          ) : (
            <>
              <ChevronsUp size={17} /> Go straight to the quiz
            </>
          )}
        </button>
      </div>
    </Shell>
  );
}

function Shell({ chapter, children }: { chapter: Chapter; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-44">
      <div className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-bg/90 px-5 py-3 backdrop-blur">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Level {chapter.level}
        </Link>
        <RomanizationToggle />
      </div>
      {children}
    </article>
  );
}

const READING_PICK: FeedPick = { cardId: "", bucket: "new", reason: "", score: 0 };

function PointView({ point }: { point: Point }) {
  const { track } = useLearner();
  const cardId = point.kind === "card" ? point.cardId : null;
  useEffect(() => {
    // Reading a card here counts as seeing it in the feed.
    if (cardId) track({ type: "lesson_viewed", cardId, dwellMs: 0 });
  }, [cardId, track]);

  switch (point.kind) {
    case "card": {
      const card = catalog.cards.get(point.cardId)!;
      return (
        <div className="rounded-3xl border border-line p-5">
          <CardBody card={card} pick={{ ...READING_PICK, cardId: card.id }} active />
        </div>
      );
    }
    case "blocks":
      return (
        <div className="space-y-4">
          {point.blocks.map((b, i) => (
            <BlockView key={i} block={b} itemId={point.itemId} />
          ))}
        </div>
      );
    case "words":
      return <WordList words={point.words} />;
  }
}

function WordList({ words }: { words: Extract<Point, { kind: "words" }>["words"] }) {
  const { learner, track } = useLearner();
  const { settings } = useSettings();
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line">
      {words.map((w) => {
        const id = wordId(w);
        const learned = learner.cards[id]?.known ?? false;
        return (
          <li key={w.ko} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p lang="ko" className="ko text-xl font-semibold">
                {w.ko}
              </p>
              {settings.romanization && <p className="text-xs text-faint">{w.rom}</p>}
              <p className="text-sm text-muted">{w.en}</p>
            </div>
            <AudioButton sentence={{ korean: w.ko }} cardId={id} size="sm" />
            <button
              onClick={() => track({ type: learned ? "word_unlearned" : "word_learned", cardId: id })}
              aria-pressed={learned}
              aria-label={learned ? `${w.ko}: learned` : `Mark ${w.ko} as learned`}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${learned ? "border-good bg-good text-bg" : "border-white/20 text-faint hover:text-ink"}`}
            >
              <Check size={14} strokeWidth={3} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export const unique = (ids: (string | undefined)[]) => [...new Set(ids.filter((x): x is string => !!x))];
