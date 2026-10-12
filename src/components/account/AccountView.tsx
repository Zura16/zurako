"use client";

import { useState } from "react";
import Link from "next/link";
import { Cloud, CloudOff, Mail } from "lucide-react";
import { getSupabase } from "@/lib/store/client";
import type { CodeMode } from "@/lib/store/auth";
import { useLearner } from "@/components/providers/LearnerProvider";
import { useSettings, type Settings } from "@/components/providers/SettingsProvider";
import { useAudio } from "@/components/providers/AudioProvider";

export function AccountView() {
  const { account, learner, signOutToGuest, resetProgress, syncError } = useLearner();
  const remoteConfigured = getSupabase() !== null;

  return (
    <div className="mx-auto max-w-xl space-y-8 px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <h1 className="text-2xl font-bold">Me</h1>

      <section className="space-y-4 rounded-3xl border border-line p-5" aria-labelledby="acct-h">
        <div className="flex items-center gap-3">
          {account.remote ? <Cloud className="text-accent" size={22} /> : <CloudOff className="text-faint" size={22} />}
          <div>
            <h2 id="acct-h" className="font-semibold">
              {!remoteConfigured ? "Saved on this device" : account.isGuest ? "Guest" : account.email}
            </h2>
            <p className="text-sm text-muted">
              {!remoteConfigured
                ? "This build has no account server, so progress stays in this browser."
                : account.isGuest
                  ? "Your progress is saved to a guest account. Add your email to keep it across devices."
                  : "Signed in. Progress syncs across your devices."}
            </p>
          </div>
        </div>
        {syncError && (
          <p className="text-sm text-bad" role="alert">
            Sync is retrying: {syncError}
          </p>
        )}
        {remoteConfigured && account.isGuest && (
          <>
            <CodeFlow mode="save" title="Save your progress" cta="Email me a code" />
            <details className="text-sm">
              <summary className="cursor-pointer text-muted hover:text-ink">Already saved on another device? Sign in</summary>
              <div className="mt-3 space-y-2">
                <p className="text-faint">Signing in loads that account&apos;s progress. This guest progress won&apos;t carry over.</p>
                <CodeFlow mode="signin" title="Sign in" cta="Email me a sign-in code" />
              </div>
            </details>
          </>
        )}
        {remoteConfigured && !account.isGuest && (
          <button onClick={() => void signOutToGuest()} className="text-sm text-muted underline underline-offset-4 hover:text-ink">
            Sign out
          </button>
        )}
      </section>

      {learner.profile && <SettingsSection />}

      {learner.profile && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-wider text-faint uppercase">Start over</h2>
          <ResetButton onReset={resetProgress} />
        </section>
      )}

      {!learner.profile && (
        <Link href="/" className="block text-center text-sm text-muted underline underline-offset-4">
          Back to setup
        </Link>
      )}

      <p className="text-xs leading-relaxed text-faint">
        Nunchi&apos;s Korean content is hand-written and checked for structure, but it hasn&apos;t been reviewed by a native speaker yet.
        Audio uses your device&apos;s built-in Korean voice.
      </p>
    </div>
  );
}

function CodeFlow({ mode, title, cta }: { mode: CodeMode; title: string; cta: string }) {
  const { sendCode, confirmCode } = useLearner();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code" | "done">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  if (stage === "done") return <p className="text-sm text-good">Done. Your progress is tied to {email}.</p>;

  return (
    <form
      className="space-y-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        if (stage === "email")
          void run(async () => {
            await sendCode(email.trim(), mode);
            setStage("code");
          });
        else
          void run(async () => {
            await confirmCode(email.trim(), code.trim(), mode);
            setStage("done");
          });
      }}
    >
      <p className="text-sm font-medium">{title}</p>
      {stage === "email" ? (
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email"
          className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 outline-none focus:border-accent"
        />
      ) : (
        <>
          <p className="text-sm text-muted">
            <Mail size={14} className="mr-1 inline" /> We sent a 6-digit code to {email}. You can also tap the link in that email.
          </p>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            pattern="[0-9]{6}"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="123456"
            aria-label="6-digit code"
            className="w-full rounded-2xl border border-line bg-white/5 px-4 py-3 text-center text-2xl tracking-[0.4em] outline-none focus:border-accent"
          />
        </>
      )}
      {error && (
        <p className="text-sm text-bad" role="alert">
          {error}
        </p>
      )}
      <button disabled={busy} className="w-full rounded-2xl bg-accent py-3 font-semibold text-accent-ink disabled:opacity-50">
        {busy ? "Working…" : stage === "email" ? cta : "Confirm code"}
      </button>
    </form>
  );
}

function SettingsSection() {
  const { settings, update } = useSettings();
  const { status } = useAudio();
  const rows: { key: keyof Settings; label: string; hint: string }[] = [
    { key: "translations", label: "Show translations", hint: "Off: tap to reveal English" },
    { key: "autoplay", label: "Autoplay audio", hint: "Play each sentence when its card appears" },
    { key: "slowAudio", label: "Slower audio", hint: "Default playback at 75% speed" },
  ];
  return (
    <section className="space-y-2" aria-labelledby="settings-h">
      <h2 id="settings-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
        Settings
      </h2>
      <ul className="divide-y divide-line rounded-3xl border border-line">
        {rows.map((r) => (
          <li key={r.key}>
            <label className="flex cursor-pointer items-center gap-4 px-5 py-3.5">
              <span className="flex-1">
                <span className="block font-medium">{r.label}</span>
                <span className="block text-sm text-muted">{r.hint}</span>
              </span>
              <input
                type="checkbox"
                checked={settings[r.key]}
                onChange={(e) => update({ [r.key]: e.target.checked })}
                className="h-5 w-5 accent-[#fdbe02]"
              />
            </label>
          </li>
        ))}
      </ul>
      {status !== "ready" && (
        <p className="text-sm text-bad">
          {status === "unsupported"
            ? "This browser can't play speech."
            : "No Korean voice found. On a Mac: System Settings → Accessibility → Spoken Content → System voice → Manage Voices → Korean."}
        </p>
      )}
    </section>
  );
}

function ResetButton({ onReset }: { onReset: () => Promise<void> }) {
  const [confirming, setConfirming] = useState(false);
  if (!confirming) {
    return (
      <button onClick={() => setConfirming(true)} className="text-sm text-muted underline underline-offset-4 hover:text-bad">
        Reset all progress
      </button>
    );
  }
  return (
    <div className="space-y-2 rounded-2xl border border-bad/40 p-4">
      <p className="text-sm">This deletes your learner profile, reviews and saved cards. It can&apos;t be undone.</p>
      <div className="flex gap-2">
        <button onClick={() => void onReset()} className="rounded-full bg-bad px-4 py-2 text-sm font-semibold text-bg">
          Delete my progress
        </button>
        <button onClick={() => setConfirming(false)} className="rounded-full bg-white/6 px-4 py-2 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
