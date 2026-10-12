"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Bottom sheet dialog. Escape and the backdrop close it; focus moves into the
 * sheet on open and back to the trigger on close.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="presentation">
      <button aria-label="Close" className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} tabIndex={-1} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="rise relative flex max-h-[86dvh] w-full max-w-lg flex-col rounded-t-3xl border border-line bg-bg-2 pb-[var(--safe-bottom)] shadow-2xl outline-none sm:rounded-3xl"
      >
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="mx-auto h-1 w-10 rounded-full bg-white/15 sm:hidden" aria-hidden />
        </div>
        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 text-muted hover:bg-white/5 hover:text-ink" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="no-scrollbar overflow-y-auto px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}
