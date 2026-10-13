"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { levelByNumber, type Level } from "@/content/path";
import { LEVEL_TEST_SIZE, QUIZ_PASS, isLevelUnlocked, levelTest, levelTestId } from "@/lib/learner/path";
import { useLearner } from "@/components/providers/LearnerProvider";
import { NotFound, unique } from "./ChapterView";
import { DrawnQuiz, type QuizResult } from "./Quiz";

export function LevelTestPage() {
  const level = levelByNumber(Number(useSearchParams().get("level")));
  if (!level || !levelByNumber(level.number + 1)) return <NotFound text="There's no test for that level." />;
  return <LevelTestView key={level.id} level={level} />;
}

/** Test out of a level: pass it and the next level opens, with this level's chapters marked tested out. */
function LevelTestView({ level }: { level: Level }) {
  const { learner, track } = useLearner();
  const [attempt, setAttempt] = useState<number | null>(null);
  const next = levelByNumber(level.number + 1)!;
  const unlocked = isLevelUnlocked(level.number, learner);

  const finish = (r: QuizResult) =>
    track({
      type: "quiz_finished",
      cardId: levelTestId(level.number),
      correct: r.correct,
      total: r.total,
      passed: r.passed,
      missed: unique(r.missed.map((q) => q.source)),
      right: unique(r.right.map((q) => q.source)),
      conceptIds: unique(level.chapters.flatMap((c) => c.conceptIds)),
      chapterIds: level.chapters.map((c) => c.id),
    });

  return (
    <article className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-32">
      <div className="py-3">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Learn
        </Link>
      </div>
      <p className="mt-2 text-xs font-semibold tracking-wider text-accent uppercase">Level test</p>
      <h1 className="mt-1 text-3xl leading-tight font-bold">Test out of Level {level.number}</h1>

      {!unlocked ? (
        <p className="mt-4 text-muted">Level {level.number} isn&apos;t open yet. Open it first, then you can test out of it.</p>
      ) : attempt === null ? (
        <div className="mt-4 space-y-4">
          <p className="text-[15px] leading-relaxed text-muted">
            {LEVEL_TEST_SIZE} questions from across {level.title}. Score {Math.round(QUIZ_PASS * 100)}% and Level {next.number},{" "}
            {next.title}, opens.
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            The chapters you skip are marked &ldquo;tested out&rdquo;. They stay open, so you can still study any of them.
          </p>
          <button
            onClick={() => setAttempt(0)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-accent-ink"
          >
            Start the test <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <DrawnQuiz
            key={attempt}
            draw={(seed) => levelTest(level, seed)}
            itemId={levelTestId(level.number)}
            onFinish={finish}
            onRetake={() => setAttempt(attempt + 1)}
            done={(r) =>
              r.passed ? (
                <Link href="/" className="block w-full rounded-2xl bg-accent py-4 font-semibold text-accent-ink">
                  Level {next.number} is open. Go to it
                </Link>
              ) : (
                <Link href="/" className="block w-full rounded-2xl bg-white/6 py-4 font-semibold">
                  Study Level {level.number} instead
                </Link>
              )
            }
          />
        </div>
      )}
    </article>
  );
}
