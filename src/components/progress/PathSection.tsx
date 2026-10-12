"use client";

import { Check, ChevronsUp, Lock } from "lucide-react";
import { catalog } from "@/content";
import { STAGES, STAGE_PASS, currentStage, stageProgress } from "@/lib/learner/stages";
import type { LearnerState } from "@/lib/learner/types";

/** The learning path: each stage, where the learner is, and how close the next stage is. */
export function PathSection({ learner }: { learner: LearnerState }) {
  const current = currentStage(catalog, learner);
  const progress = stageProgress(catalog, learner);
  return (
    <section className="mt-6 space-y-2" aria-labelledby="path-h">
      <h2 id="path-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
        Your path
      </h2>
      <ol className="space-y-2">
        {STAGES.map((stage, i) => {
          const p = progress[i];
          const passed = i < current && p.fraction >= STAGE_PASS;
          const skipped = i < current && !passed;
          const done = passed;
          const here = i === current;
          const toNext = Math.max(0, Math.ceil(p.total * STAGE_PASS) - p.learned);
          return (
            <li
              key={stage.name}
              aria-current={here ? "step" : undefined}
              className={`rounded-2xl border px-4 py-3 ${here ? "border-accent bg-accent/8" : "border-line"} ${i > current ? "opacity-55" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-good text-bg"
                      : here
                        ? "bg-accent text-accent-ink"
                        : skipped
                          ? "bg-white/12 text-muted"
                          : "bg-white/8 text-faint"
                  }`}
                  aria-hidden
                >
                  {done ? (
                    <Check size={14} strokeWidth={3} />
                  ) : skipped ? (
                    <ChevronsUp size={13} />
                  ) : i > current ? (
                    <Lock size={11} />
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="flex-1 font-semibold">{stage.name}</span>
                {skipped && <span className="text-xs text-faint">Skipped</span>}
                <span className="text-xs text-muted">
                  {p.learned}/{p.total}
                </span>
              </div>
              {here && (
                <>
                  <div className="relative mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-accent transition-[width] duration-500"
                      style={{ width: `${p.fraction * 100}%` }}
                    />
                    <div className="absolute inset-y-0 w-0.5 bg-ink/60" style={{ left: `${STAGE_PASS * 100}%` }} aria-hidden />
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {i === STAGES.length - 1
                      ? "The last stage. Keep going for nuance."
                      : toNext > 0
                        ? `Learn ${toNext} more ${toNext === 1 ? "concept" : "concepts"} to open ${STAGES[i + 1].short}. Tap "Too easy" to skip ahead.`
                        : `${STAGES[i + 1].short} is open.`}
                  </p>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
