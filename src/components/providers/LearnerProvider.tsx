"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { catalog } from "@/content";
import type { AppEvent, EventInput } from "@/lib/learner/events";
import { applyEvent, initLearner, type OnboardingAnswers } from "@/lib/learner/model";
import { emptyLearner, type LearnerState } from "@/lib/learner/types";
import { LOCAL_ACCOUNT, ensureSession, requestCode, signOut, verifyCode, type Account, type CodeMode } from "@/lib/store/auth";
import { getSupabase } from "@/lib/store/client";
import { LearnerSync } from "@/lib/store/sync";

type Boot = { status: "loading" } | { status: "ready" } | { status: "error"; message: string };

type LearnerContext = {
  boot: Boot;
  learner: LearnerState;
  account: Account;
  /** Record an interaction: updates learner state and queues it for sync. */
  track: (event: EventInput) => void;
  completeOnboarding: (answers: OnboardingAnswers) => void;
  sendCode: (email: string, mode: CodeMode) => Promise<void>;
  confirmCode: (email: string, code: string, mode: CodeMode) => Promise<void>;
  signOutToGuest: () => Promise<void>;
  resetProgress: () => Promise<void>;
  syncError: string | null;
};

const Ctx = createContext<LearnerContext | null>(null);

export function LearnerProvider({ children }: { children: React.ReactNode }) {
  const [boot, setBoot] = useState<Boot>({ status: "loading" });
  const [learner, setLearner] = useState<LearnerState>(emptyLearner);
  const [account, setAccount] = useState<Account>(LOCAL_ACCOUNT);
  const [syncError, setSyncError] = useState<string | null>(null);
  const learnerRef = useRef(learner);
  const syncRef = useRef<LearnerSync | null>(null);

  const start = useCallback(async () => {
    setBoot({ status: "loading" });
    try {
      const client = getSupabase();
      const acct = client ? await ensureSession(client) : LOCAL_ACCOUNT;
      syncRef.current?.dispose();
      const sync = new LearnerSync(client, acct.userId);
      const state = await sync.load();
      syncRef.current = sync;
      learnerRef.current = state;
      setLearner(state);
      setAccount(acct);
      setBoot({ status: "ready" });
    } catch (err) {
      setBoot({ status: "error", message: err instanceof Error ? err.message : "Something went wrong while loading." });
    }
  }, []);

  useEffect(() => {
    void start();
  }, [start]);

  // Send queued writes when the tab is hidden or closed.
  useEffect(() => {
    const flush = () => void syncRef.current?.flush();
    const onVisibility = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    const poll = setInterval(() => setSyncError(syncRef.current?.lastError ?? null), 5000);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      clearInterval(poll);
    };
  }, []);

  const track = useCallback<LearnerContext["track"]>((partial) => {
    const event = { ...partial, at: partial.at ?? Date.now() } as AppEvent;
    const { state, changes } = applyEvent(learnerRef.current, event, catalog);
    learnerRef.current = state;
    setLearner(state);
    syncRef.current?.record(state, changes, event);
  }, []);

  const completeOnboarding = useCallback((answers: OnboardingAnswers) => {
    const state = initLearner(answers, catalog, Date.now());
    learnerRef.current = state;
    setLearner(state);
    syncRef.current?.recordAll(state);
  }, []);

  const sendCode = useCallback(async (email: string, mode: CodeMode) => {
    const client = getSupabase();
    if (!client) throw new Error("Accounts aren't configured in this build.");
    await syncRef.current?.flush();
    await requestCode(client, email, mode);
  }, []);

  const confirmCode = useCallback(
    async (email: string, code: string, mode: CodeMode) => {
      const client = getSupabase();
      if (!client) throw new Error("Accounts aren't configured in this build.");
      const acct = await verifyCode(client, email, code, mode);
      if (mode === "save") setAccount(acct);
      else await start(); // a different account: load its progress
    },
    [start],
  );

  const signOutToGuest = useCallback(async () => {
    const client = getSupabase();
    await syncRef.current?.flush();
    if (client) await signOut(client);
    LearnerSync.clearCache(account.userId);
    await start();
  }, [account.userId, start]);

  const resetProgress = useCallback(async () => {
    const client = getSupabase();
    if (client && account.remote) {
      await syncRef.current?.flush();
      // Row-level security limits these deletes to the signed-in user's rows.
      await Promise.all(
        ["card_states", "concept_states", "skill_states", "profiles"].map((t) => client.from(t).delete().eq("user_id", account.userId)),
      );
    }
    LearnerSync.clearCache(account.userId);
    await start();
  }, [account, start]);

  const value = useMemo(
    () => ({ boot, learner, account, track, completeOnboarding, sendCode, confirmCode, signOutToGuest, resetProgress, syncError }),
    [boot, learner, account, track, completeOnboarding, sendCode, confirmCode, signOutToGuest, resetProgress, syncError],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Renders children with interactions ignored, e.g. on the content preview page. */
export function WithoutTracking({ children }: { children: React.ReactNode }) {
  const ctx = useLearner();
  const value = useMemo(() => ({ ...ctx, track: () => undefined }), [ctx]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLearner(): LearnerContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLearner must be used inside LearnerProvider");
  return ctx;
}
