import { Suspense } from "react";
import { LevelTestPage } from "@/components/learn/LevelTestView";

export const metadata = { title: "Level test · Nunchi" };

export default function Page() {
  return (
    <Suspense>
      <LevelTestPage />
    </Suspense>
  );
}
