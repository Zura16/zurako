"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { lessonById } from "@/content/lessons";
import { LessonView } from "./LessonView";

export function LessonPage() {
  const lesson = lessonById(useSearchParams().get("id") ?? "");
  if (!lesson) {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3 px-8 text-center">
        <p className="text-muted">That lesson couldn&apos;t be found.</p>
        <Link href="/" className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
          Back to Learn
        </Link>
      </div>
    );
  }
  return <LessonView key={lesson.id} lesson={lesson} />;
}
