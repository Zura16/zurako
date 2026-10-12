"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { Lesson } from "@/content/lessons/schema";
import { LEVEL_LABELS } from "@/content/schema";
import { useLearner } from "@/components/providers/LearnerProvider";
import { Tag } from "@/components/ui/tags";
import { BlockView } from "./blocks";
import { RomanizationToggle } from "./KoreanLine";

/** A Learn-tab lesson, read top to bottom, ending with practice and a finish button. */
export function LessonView({ lesson }: { lesson: Lesson }) {
  const { learner, track } = useLearner();
  const finished = (learner.cards[lesson.id]?.completions ?? 0) > 0;
  const opened = useRef(false);

  useEffect(() => {
    if (opened.current) return;
    opened.current = true;
    track({ type: "lesson_viewed", cardId: lesson.id, dwellMs: 0 });
  }, [lesson.id, track]);

  return (
    <article className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-32">
      <div className="sticky top-0 z-20 -mx-5 flex items-center justify-between bg-bg/90 px-5 py-3 backdrop-blur">
        <Link href="/learn/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          <ArrowLeft size={16} /> Learn
        </Link>
        <RomanizationToggle />
      </div>

      <header className="mt-2 space-y-3">
        <p className="text-xs font-semibold tracking-wider text-accent uppercase">Lesson {lesson.number}</p>
        <h1 className="text-3xl leading-tight font-bold">{lesson.title}</h1>
        <p lang="ko" className="ko text-muted">
          {lesson.korean}
        </p>
        <div className="flex items-center gap-2">
          <Tag>{LEVEL_LABELS[lesson.level]}</Tag>
          {finished && <Tag tone="accent">Finished</Tag>}
        </div>
        <p className="rounded-2xl bg-white/5 px-4 py-3 text-[15px] leading-relaxed">
          <span className="font-semibold text-accent">Goal · </span>
          {lesson.goal}
        </p>
      </header>

      <nav aria-label="Sections" className="mt-6">
        <ol className="flex flex-wrap gap-1.5 text-xs">
          {lesson.sections.map((s, i) => (
            <li key={s.title}>
              <a href={`#section-${i + 1}`} className="inline-block rounded-full bg-white/5 px-2.5 py-1 text-muted hover:text-ink">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {lesson.sections.map((section, i) => (
        <section key={section.title} id={`section-${i + 1}`} className="mt-10 scroll-mt-16 space-y-4">
          <h2 className="flex items-baseline gap-2 text-xl font-bold">
            <span className="text-sm font-semibold text-faint">{i + 1}</span>
            <span>{section.title}</span>
            {section.emoji && <span aria-hidden>{section.emoji}</span>}
          </h2>
          {section.blocks.map((block, j) => (
            <BlockView key={j} block={block} itemId={lesson.id} />
          ))}
        </section>
      ))}

      <div className="mt-12">
        {finished ? (
          <p className="flex items-center justify-center gap-2 rounded-2xl bg-good/10 py-4 font-semibold text-good">
            <Check size={18} /> Lesson finished. Its words and grammar now come up as reviews in your feed.
          </p>
        ) : (
          <button
            onClick={() => track({ type: "lesson_finished", cardId: lesson.id, conceptIds: lesson.teaches })}
            className="w-full rounded-2xl bg-accent py-4 font-semibold text-accent-ink"
          >
            Finish lesson
          </button>
        )}
      </div>
    </article>
  );
}
