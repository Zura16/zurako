"use client";

import { usePathname } from "next/navigation";
import { useLearner } from "@/components/providers/LearnerProvider";
import { BottomNav } from "./BottomNav";
import { Onboarding } from "./Onboarding";

/** Loading and error states, onboarding for new learners, then the app. */
export function AppGate({ children }: { children: React.ReactNode }) {
  const { boot, learner } = useLearner();
  const path = usePathname();

  if (boot.status === "loading") {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-3" role="status" aria-label="Loading">
        <span lang="ko" className="ko animate-pulse text-4xl font-bold text-accent">
          눈치
        </span>
      </div>
    );
  }
  if (boot.status === "error") {
    return (
      <div className="flex h-dvh flex-col items-center justify-center gap-4 px-8 text-center" role="alert">
        <p className="text-lg font-semibold">Couldn&apos;t load your progress</p>
        <p className="max-w-sm text-muted">{boot.message}</p>
        <button onClick={() => window.location.reload()} className="rounded-full bg-accent px-5 py-2.5 font-semibold text-accent-ink">
          Try again
        </button>
      </div>
    );
  }
  const route = path?.replace(/\/$/, "") ?? "";
  const ungated = route.endsWith("/account") || route.endsWith("/preview");
  if (!learner.profile && !ungated) return <Onboarding />;

  return (
    <>
      <main>{children}</main>
      <BottomNav />
    </>
  );
}
