"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Sheet } from "@/components/ui/Sheet";
import { ExplainView } from "@/components/korean/ExplainView";
import { XRayView } from "@/components/korean/XRayView";

type Open = { kind: "xray"; cardId: string; sentenceId: string; focus: number | null } | { kind: "explain"; cardId: string } | null;

type SheetContext = {
  openXRay: (cardId: string, sentenceId: string, focus?: number) => void;
  openExplain: (cardId: string) => void;
  close: () => void;
};

const Ctx = createContext<SheetContext | null>(null);

/** One sheet at a time: sentence X-ray or concept explanations. */
export function SheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<Open>(null);
  const close = useCallback(() => setOpen(null), []);
  const openXRay = useCallback(
    (cardId: string, sentenceId: string, focus?: number) => setOpen({ kind: "xray", cardId, sentenceId, focus: focus ?? null }),
    [],
  );
  const openExplain = useCallback((cardId: string) => setOpen({ kind: "explain", cardId }), []);
  const value = useMemo(() => ({ openXRay, openExplain, close }), [openXRay, openExplain, close]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Sheet open={open !== null} onClose={close} title={open?.kind === "explain" ? "Explain" : "Sentence X-ray"}>
        {open?.kind === "xray" && (
          <XRayView key={`${open.sentenceId}:${open.focus}`} cardId={open.cardId} sentenceId={open.sentenceId} focus={open.focus} />
        )}
        {open?.kind === "explain" && <ExplainView cardId={open.cardId} />}
      </Sheet>
    </Ctx.Provider>
  );
}

export function useSheets(): SheetContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSheets must be used inside SheetProvider");
  return ctx;
}
