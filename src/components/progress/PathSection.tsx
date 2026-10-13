"use client";

import Link from "next/link";
import { Check, ChevronRight, Lock } from "lucide-react";
import { LEVEL_PASS, chaptersToNext, currentLevel, pathProgress } from "@/lib/learner/path";
import type { LearnerState } from "@/lib/learner/types";

/** The levels: where the learner is, and how close the next level is. */
export function PathSection({ learner }: { learner: LearnerState }) {
  const current = currentLevel(learner);
  return (
    <section className="mt-6 space-y-2" aria-labelledby="path-h">
      <h2 id="path-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
        Your levels
      </h2>
      <ol className="space-y-2">
        {pathProgress(learner).map((p) => {
          const n = p.level.number;
          const here = n === current;
          const hasNext = n < 5;
          const toNext = chaptersToNext(p);
          return (
            <li
              key={p.level.id}
              aria-current={here ? "step" : undefined}
              className={`rounded-2xl border px-4 py-3 ${here ? "border-accent bg-accent/8" : "border-line"} ${p.unlocked ? "" : "opacity-55"}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    p.passed && hasNext ? "bg-good text-bg" : p.unlocked ? "bg-accent text-accent-ink" : "bg-white/8 text-faint"
                  }`}
                  aria-hidden
                >
                  {p.passed && hasNext ? <Check size={14} strokeWidth={3} /> : p.unlocked ? n : <Lock size={11} />}
                </span>
                <span className="flex-1 font-semibold">
                  Level {n} · {p.level.title}
                </span>
                <span className="text-xs text-muted">
                  {p.done + p.testedOut}/{p.total}
                </span>
              </div>
              {here && (
                <>
                  <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-500"
                      style={{ width: `${p.fraction * 100}%` }}
                    />
                    {hasNext && <div className="absolute inset-y-0 w-0.5 bg-ink/60" style={{ left: `${LEVEL_PASS * 100}%` }} aria-hidden />}
                  </div>
                  <Link href="/" className="mt-1.5 flex items-center gap-1 text-xs text-muted hover:text-ink">
                    {!hasNext
                      ? "The last level. More chapters are on the way."
                      : toNext > 0
                        ? `Finish ${toNext} more ${toNext === 1 ? "chapter" : "chapters"} to open Level ${n + 1}, or test out.`
                        : `Level ${n + 1} is open.`}
                    <ChevronRight size={13} />
                  </Link>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
