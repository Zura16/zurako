"use client";

import Link from "next/link";
import { BookOpen, Check, ChevronRight } from "lucide-react";
import { LESSONS } from "@/content/lessons";
import { LEVEL_LABELS } from "@/content/schema";
import { UNIQUE_WORDS, wordId } from "@/content/wordbank";
import { useLearner } from "@/components/providers/LearnerProvider";
import { WordOfTheDay } from "./WordOfTheDay";

/** The Learn tab: structured lessons on how Korean works, plus vocabulary. */
export function LearnView() {
  const { learner } = useLearner();
  const learnedWords = UNIQUE_WORDS.filter((w) => learner.cards[wordId(w)]?.known).length;
  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <h1 className="text-2xl font-bold">Learn</h1>
      <p className="mt-1 text-muted">Short chapters that explain how Korean works. Your feed then helps you practise it.</p>

      <div className="mt-6">
        <WordOfTheDay />
      </div>

      <section className="mt-8" aria-labelledby="lessons-h">
        <h2 id="lessons-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
          Lessons
        </h2>
        <ol className="mt-3 space-y-2.5">
          {LESSONS.map((lesson) => {
            const done = (learner.cards[lesson.id]?.completions ?? 0) > 0;
            const started = (learner.cards[lesson.id]?.views ?? 0) > 0;
            return (
              <li key={lesson.id}>
                <Link
                  href={`/learn/lesson/?id=${lesson.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:bg-white/4"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${done ? "bg-good text-bg" : "bg-accent/12 text-accent"}`}
                  >
                    {done ? <Check size={18} strokeWidth={3} /> : lesson.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{lesson.title}</span>
                    <span lang="ko" className="ko block truncate text-sm text-muted">
                      {lesson.korean}
                    </span>
                    <span className="mt-0.5 block text-xs text-faint">
                      {LEVEL_LABELS[lesson.level]} · {done ? "Finished" : started ? "In progress" : "Not started"}
                    </span>
                  </span>
                  <ChevronRight size={18} className="text-faint" />
                </Link>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-xs text-faint">More lessons are on the way.</p>
      </section>

      <section className="mt-8" aria-labelledby="words-h">
        <h2 id="words-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
          Vocabulary
        </h2>
        <Link
          href="/learn/words/"
          className="mt-3 flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:bg-white/4"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-polite/12 text-polite">
            <BookOpen size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold">Word bank</span>
            <span className="block text-sm text-muted">
              {UNIQUE_WORDS.length} everyday words · {learnedWords} learned
            </span>
          </span>
          <ChevronRight size={18} className="text-faint" />
        </Link>
      </section>
    </div>
  );
}
