"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, ChevronDown, ChevronRight, ChevronsUp, Lock, X } from "lucide-react";
import { CATEGORY_LABEL } from "@/content/path";
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
        <ol className="mt-3 space-y-3">
          {progress.map((p, i) => (
            <LevelCard key={p.level.id} p={p} learner={learner} isCurrent={p.level.number === current} previous={progress[i - 1]} />
          ))}
        </ol>
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
    <li className={`rounded-3xl border ${isCurrent ? "border-accent/50 bg-accent/5" : "border-line"} ${p.unlocked ? "" : "opacity-60"}`}>
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
        <div id={panel} className="border-t border-line px-2 pt-1 pb-3">
          <ol>
            {level.chapters.map((c) => {
              const status = chapterStatus(c, learner, p.unlocked);
              const row = (
                <>
                  <StatusIcon status={status} number={c.number} />
                  <span className="min-w-0 flex-1">
                    <span className="ko block truncate font-medium">{c.title}</span>
                    <span className="block text-xs text-faint">
                      {CATEGORY_LABEL[c.category]} · {c.points.length} {c.points.length === 1 ? "point" : "points"}
                      {status === "tested-out" ? " · Tested out" : ""}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={c.id}>
                  {status === "locked" ? (
                    <div className="flex items-center gap-3 rounded-2xl px-2 py-2.5" aria-disabled>
                      {row}
                    </div>
                  ) : (
                    <Link href={`/learn/chapter/?id=${c.id}`} className="flex items-center gap-3 rounded-2xl px-2 py-2.5 hover:bg-white/4">
                      {row}
                      <ChevronRight size={16} className="text-faint" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
          {p.unlocked && hasNext && !p.passed && (
            <Link
              href={`/learn/test/?level=${level.number}`}
              className="mx-2 mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white/6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              <ChevronsUp size={16} /> Already know this? Test out of Level {level.number}
            </Link>
          )}
        </div>
      )}
    </li>
  );
}

function StatusIcon({ status, number }: { status: ChapterStatus; number: number }) {
  const base = "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold";
  switch (status) {
    case "done":
      return (
        <span className={`${base} bg-good text-bg`} aria-label="Finished">
          <Check size={16} strokeWidth={3} />
        </span>
      );
    case "tested-out":
      return (
        <span className={`${base} bg-white/12 text-muted`} aria-label="Tested out">
          <ChevronsUp size={16} />
        </span>
      );
    case "locked":
      return (
        <span className={`${base} bg-white/6 text-faint`} aria-label="Locked">
          <Lock size={13} />
        </span>
      );
    case "started":
      return (
        <span className={`${base} border-2 border-accent text-accent`} aria-label="In progress">
          {number}
        </span>
      );
    case "new":
      return (
        <span className={`${base} border border-white/20 text-muted`} aria-label="Not started">
          {number}
        </span>
      );
  }
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
