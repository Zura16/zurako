"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/** Per-device display preferences. Learning progress lives in LearnerProvider. */
/** romanization: shown in Learn lessons and the word bank only; off by default. */
export type Settings = { translations: boolean; autoplay: boolean; slowAudio: boolean; romanization: boolean };
const DEFAULTS: Settings = { translations: true, autoplay: false, slowAudio: false, romanization: false };
const KEY = "nunchi:settings";

type SettingsContext = { settings: Settings; update: (patch: Partial<Settings>) => void };
const Ctx = createContext<SettingsContext | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      // Storage blocked: keep defaults.
    }
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // Not persisted; still applies for this visit.
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ settings, update }), [settings, update]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings(): SettingsContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
