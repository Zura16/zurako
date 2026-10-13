import { Suspense } from "react";
import { ChapterPage } from "@/components/learn/ChapterView";

export const metadata = { title: "Chapter · Nunchi" };

export default function Page() {
  return (
    <Suspense>
      <ChapterPage />
    </Suspense>
  );
}
