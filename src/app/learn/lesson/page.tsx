import { Suspense } from "react";
import { LessonPage } from "@/components/learn/LessonPage";

export const metadata = { title: "Lesson · Nunchi" };

export default function Page() {
  return (
    <Suspense>
      <LessonPage />
    </Suspense>
  );
}
