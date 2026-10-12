import { Suspense } from "react";
import { PracticeView } from "@/components/PracticeView";

export const metadata = { title: "Practice · Nunchi" };

export default function PracticePage() {
  return (
    <Suspense>
      <PracticeView />
    </Suspense>
  );
}
