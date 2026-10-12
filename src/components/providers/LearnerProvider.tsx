"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { catalog } from "@/content";
import type { AppEvent, EventInput } from "@/lib/learner/events";
import { applyEvent, initLearner, noChanges, type OnboardingAnswers } from "@/lib/learner/model";
import type { VoiceId } from "@/lib/audio/voices";
import { emptyLearner, type LearnerState } from "@/lib/learner/types";
import { LOCAL_ACCOUNT, ensureSession, sendEmailLink, signOut, toAccount, type Account, type LinkMode } from "@/lib/store/auth";
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
  setVoice: (voice: VoiceId) => void;
  sendLink: (email: string, mode: LinkMode) => Promise<void>;
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
  const accountRef = useRef<Account>(LOCAL_ACCOUNT);
  const starting = useRef(false);

  const start = useCallback(async () => {
    starting.current = true;
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
      accountRef.current = acct;
      setAccount(acct);
      setBoot({ status: "ready" });
    } catch (err) {
      setBoot({ status: "error", message: err instanceof Error ? err.message : "Something went wrong while loading." });
    } finally {
      starting.current = false;
    }
  }, []);

  // An email link can confirm a guest's email (same user, now with an email)
  // or sign in a different account (load that account's progress).
  useEffect(() => {
    const client = getSupabase();
    if (!client) return;
    const { data } = client.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      if (!user || starting.current || accountRef.current.userId === "local") return;
      if (user.id === accountRef.current.userId) {
        accountRef.current = toAccount(user);
        setAccount(accountRef.current);
      } else if (event === "SIGNED_IN") {
        void start();
      }
    });
    return () => data.subscription.unsubscribe();
  }, [start]);

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

  const setVoice = useCallback((voice: VoiceId) => {
    const prev = learnerRef.current;
    if (!prev.profile) return;
    const state = { ...prev, profile: { ...prev.profile, voice, updatedAt: Date.now() } };
    learnerRef.current = state;
    setLearner(state);
    syncRef.current?.record(state, { ...noChanges(), profile: true });
  }, []);

  const sendLink = useCallback(async (email: string, mode: LinkMode) => {
    const client = getSupabase();
    if (!client) throw new Error("Accounts aren't configured in this build.");
    await syncRef.current?.flush();
    await sendEmailLink(client, email, mode);
  }, []);

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
    () => ({ boot, learner, account, track, completeOnboarding, setVoice, sendLink, signOutToGuest, resetProgress, syncError }),
    [boot, learner, account, track, completeOnboarding, setVoice, sendLink, signOutToGuest, resetProgress, syncError],
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
