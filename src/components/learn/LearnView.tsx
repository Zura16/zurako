"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, ChevronDown, ChevronRight, ChevronsUp, Lock, X } from "lucide-react";
import { CATEGORY_LABEL, type Category, type Chapter } from "@/content/path";
import { ChromaSpotlight } from "@/components/ui/Chroma";
import { ShapeGrid } from "@/components/ui/ShapeGrid";
import { UNIQUE_WORDS, wordId } from "@/content/wordbank";
import {
  LEVEL_PASS,
  chapterStatus,
  chaptersToNext,
  currentLevel,
  levelTestId,
  pathProgress,
  type ChapterStatus,
  type LevelProgress,
} from "@/lib/learner/path";
import type { LearnerState } from "@/lib/learner/types";
import { useLearner } from "@/components/providers/LearnerProvider";
import { WordOfTheDay } from "./WordOfTheDay";

/** The home tab: word of the day, the word bank, then the five levels and their chapters. */
export function LearnView() {
  const { learner } = useLearner();
  const progress = pathProgress(learner);
  const current = currentLevel(learner);
  const learnedWords = UNIQUE_WORDS.filter((w) => learner.cards[wordId(w)]?.known).length;

  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <ShapeGrid lineColor="#2a2734" fillOpacity={0.15} cellSize={40} speed={0.5} trail={0.6} glow={0.35} strength={0.45} />
      <h1 className="text-2xl font-bold">Learn</h1>
      <p className="mt-1 text-muted">Work through each level&apos;s chapters. The feed gives you practice with whatever is open.</p>

      <SkipSuggestion learner={learner} current={current} />

      <div className="mt-6">
        <WordOfTheDay />
      </div>
      <Link
        href="/learn/words/"
        className="mt-3 flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:bg-white/4"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-polite/12 text-polite">
          <BookOpen size={19} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">Word bank</span>
          <span className="block text-sm text-muted">
            {UNIQUE_WORDS.length} words · {learnedWords} learned
          </span>
        </span>
        <ChevronRight size={18} className="text-faint" />
      </Link>

      <section className="mt-8" aria-labelledby="levels-h">
        <h2 id="levels-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
          Levels
        </h2>
        <ChromaSpotlight>
          <ol className="mt-3 space-y-3">
            {progress.map((p, i) => (
              <LevelCard key={p.level.id} p={p} learner={learner} isCurrent={p.level.number === current} previous={progress[i - 1]} />
            ))}
          </ol>
        </ChromaSpotlight>
      </section>
    </div>
  );
}

function LevelCard({
  p,
  learner,
  isCurrent,
  previous,
}: {
  p: LevelProgress;
  learner: LearnerState;
  isCurrent: boolean;
  previous?: LevelProgress;
}) {
  const [open, setOpen] = useState(isCurrent);
  const { level } = p;
  const complete = p.done + p.testedOut === p.total;
  const hasNext = level.number < 5;
  const toNext = chaptersToNext(p);
  const panel = `level-${level.number}-chapters`;

  let note: string;
  if (!p.unlocked && previous?.unlocked)
    note = `Finish ${chaptersToNext(previous)} more in Level ${level.number - 1}, or test out of it, to open this level.`;
  else if (!p.unlocked) note = `Opens after Level ${level.number - 1}.`;
  else if (!hasNext) note = complete ? "All done. More chapters are on the way." : "The last level. More chapters are on the way.";
  else if (p.passed) note = `Level ${level.number + 1} is open.`;
  else note = `Finish ${toNext} more ${toNext === 1 ? "chapter" : "chapters"} to open Level ${level.number + 1}.`;

  return (
    <li
      className={`rounded-3xl border border-line transition-colors ${p.unlocked ? "has-[>button:hover]:border-accent/60 has-[>button:hover]:bg-white/3" : "opacity-60"}`}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panel}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
            !p.unlocked ? "bg-white/6 text-faint" : p.passed && hasNext ? "bg-good text-bg" : "bg-accent text-accent-ink"
          }`}
          aria-hidden
        >
          {p.unlocked ? level.number : <Lock size={18} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold">
              Level {level.number} · {level.title}
            </span>
            <span lang="ko" className="ko text-sm text-faint">
              {level.korean}
            </span>
          </span>
          <span className="mt-0.5 block text-sm text-muted">{level.blurb}</span>
          <span className="relative mt-3 block h-1.5 overflow-hidden rounded-full bg-white/8" aria-hidden>
            <span
              className="block h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${p.fraction * 100}%` }}
            />
            {hasNext && <span className="absolute inset-y-0 w-0.5 bg-ink/50" style={{ left: `${LEVEL_PASS * 100}%` }} />}
          </span>
          <span className="mt-1.5 block text-xs text-muted">
            {p.done + p.testedOut} of {p.total} chapters · {note}
          </span>
        </span>
        <ChevronDown size={18} className={`mt-1 shrink-0 text-faint transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div id={panel} className="border-t border-line pt-3 pb-4">
          <ChapterShelves chapters={level.chapters} learner={learner} unlocked={p.unlocked} />
          {p.unlocked && hasNext && !p.passed && (
            <Link
              href={`/learn/test/?level=${level.number}`}
              className="mx-4 mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white/6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              <ChevronsUp size={16} /> Already know this? Test out of Level {level.number}
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

/** A level's chapters, one sideways-scrolling shelf of cards per category, in the order the categories first appear. */
function ChapterShelves({ chapters, learner, unlocked }: { chapters: Chapter[]; learner: LearnerState; unlocked: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const categories = [...new Set(chapters.map((c) => c.category))];
  return (
    <div className="space-y-5">
      {categories.map((category) => {
        const shelf = chapters.filter((c) => c.category === category);
        const open = shelf.find((c) => c.id === openId);
        return (
          <section key={category} aria-label={CATEGORY_LABEL[category]}>
            <h3 className="px-4 text-xs font-semibold tracking-wider text-faint uppercase">
              {CATEGORY_LABEL[category]} <span className="font-normal">· {shelf.length}</span>
            </h3>
            <ul className="no-scrollbar mt-2 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pt-1 pb-2">
              {shelf.map((c) => (
                <li key={c.id} className="snap-start">
                  <ChapterCard
                    chapter={c}
                    status={chapterStatus(c, learner, unlocked)}
                    open={c.id === openId}
                    onToggle={() => setOpenId(c.id === openId ? null : c.id)}
                  />
                </li>
              ))}
            </ul>
            {open && <ChapterDetails chapter={open} />}
          </section>
        );
      })}
    </div>
  );
}

/** Each category's color for the chroma effect, from the theme. */
const CATEGORY_COLOR: Record<Category, string> = {
  hangul: "var(--color-casual)",
  grammar: "var(--color-polite)",
  vocabulary: "var(--color-accent)",
  conversation: "var(--color-good)",
  culture: "var(--color-formal)",
};

const STATUS_BADGE: Record<ChapterStatus, { label: string; icon: React.ReactNode; className: string } | null> = {
  new: null,
  started: { label: "In progress", icon: <span className="h-2 w-2 rounded-full bg-accent" />, className: "" },
  done: { label: "Finished", icon: <Check size={13} strokeWidth={3} />, className: "text-good" },
  "tested-out": { label: "Tested out", icon: <ChevronsUp size={14} />, className: "text-muted" },
  locked: { label: "Locked", icon: <Lock size={12} />, className: "text-faint" },
};

/** Every card looks the same; a small corner icon carries the status, and hover, focus or press highlights it. */
function ChapterCard({
  chapter: c,
  status,
  open,
  onToggle,
}: {
  chapter: Chapter;
  status: ChapterStatus;
  open: boolean;
  onToggle: () => void;
}) {
  const locked = status === "locked";
  const badge = STATUS_BADGE[status];
  return (
    <button
      onClick={onToggle}
      disabled={locked}
      aria-expanded={locked ? undefined : open}
      aria-label={`Chapter ${c.number}: ${c.title}${badge ? `, ${badge.label.toLowerCase()}` : ""}`}
      data-chroma
      style={{ "--chroma": CATEGORY_COLOR[c.category] } as React.CSSProperties}
      className={`chroma-card flex h-36 w-[8.5rem] flex-col rounded-2xl border p-3.5 text-left transition duration-150 ${
        open ? "border-accent" : "border-line"
      } ${
        locked
          ? "cursor-not-allowed opacity-60"
          : "hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:outline-none active:-translate-y-0.5 active:border-accent"
      }`}
    >
      <span className="text-xs font-semibold text-faint">{c.number}</span>
      {badge && (
        <span
          className={`absolute top-3 right-3 flex h-5 w-5 items-center justify-center ${badge.className}`}
          aria-hidden
          title={badge.label}
        >
          {badge.icon}
        </span>
      )}
      <span className="ko mt-1.5 line-clamp-3 leading-snug font-semibold">{c.title}</span>
      <span className="mt-auto text-xs text-faint">
        {c.points.length} {c.points.length === 1 ? "point" : "points"}
      </span>
      <span className="chroma-tint" aria-hidden />
    </button>
  );
}

/** The opened card: what the chapter covers, and ways in. */
function ChapterDetails({ chapter: c }: { chapter: Chapter }) {
  const href = `/learn/chapter/?id=${c.id}`;
  return (
    <div className="rise mx-4 mt-1 rounded-2xl border border-accent/40 bg-white/4 p-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <h4 className="text-lg font-semibold">{c.title}</h4>
        {c.korean && (
          <span lang="ko" className="ko text-sm text-faint">
            {c.korean}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">{c.summary}</p>
      <ol className="mt-3 space-y-1 text-sm">
        {c.points.map((pt, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="w-4 shrink-0 text-right text-faint">{i + 1}</span>
            <span className="ko min-w-0 truncate">{pt.title}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-2">
        <Link
          href={`${href}&start=points`}
          className="flex-1 rounded-xl bg-accent py-2.5 text-center text-sm font-semibold text-accent-ink"
        >
          Start
        </Link>
        <Link
          href={`${href}&start=quiz`}
          className="flex-1 rounded-xl bg-white/8 py-2.5 text-center text-sm font-semibold hover:bg-white/12"
        >
          Go to the quiz
        </Link>
      </div>
    </div>
  );
}

const DISMISS_KEY = "nunchi.skip-suggestion-dismissed";

/** Right after onboarding, learners who said they know some Korean are offered the Level 1 test. */
function SkipSuggestion({ learner, current }: { learner: LearnerState; current: number }) {
  const [dismissed, setDismissed] = useState(true);
  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);
  const level = learner.profile?.selfLevel;
  const experienced = level === "elementary" || level === "intermediate" || level === "advanced";
  if (!experienced || dismissed || current > 1 || learner.cards[levelTestId(1)]) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Private mode: it just shows again next time.
    }
  };
  return (
    <aside className="rise mt-5 rounded-3xl border border-accent/40 bg-accent/8 p-5">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-semibold">Already know some Korean?</p>
          <p className="mt-1 text-sm text-muted">
            Take a 15-question test to skip Level 1. If it&apos;s not for you, start with chapter 1.
          </p>
        </div>
        <button onClick={dismiss} aria-label="Dismiss" className="-mt-1 -mr-1 rounded-full p-1.5 text-faint hover:text-ink">
          <X size={16} />
        </button>
      </div>
      <Link
        href="/learn/test/?level=1"
        className="mt-4 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink"
      >
        Take the Level 1 test
      </Link>
    </aside>
  );
}
