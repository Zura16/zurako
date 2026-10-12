import { LEVEL_LABELS, type LevelName, type SpeechLevel } from "@/content/schema";

export const SPEECH_META: Record<SpeechLevel, { label: string; korean: string; color: string; bg: string }> = {
  CASUAL: { label: "Casual", korean: "반말", color: "text-casual", bg: "bg-casual" },
  POLITE: { label: "Polite", korean: "해요체", color: "text-polite", bg: "bg-polite" },
  FORMAL: { label: "Formal", korean: "하십시오체", color: "text-formal", bg: "bg-formal" },
};

export function SpeechTag({ level, showKorean = false }: { level: SpeechLevel; showKorean?: boolean }) {
  const m = SPEECH_META[level];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-current/25 px-2.5 py-0.5 text-xs font-medium ${m.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${m.bg}`} aria-hidden />
      {m.label}
      {showKorean && <span className="ko opacity-80">{m.korean}</span>}
    </span>
  );
}

export function Tag({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "accent" | "bad" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        tone === "accent" ? "bg-accent/15 text-accent" : tone === "bad" ? "bg-bad/15 text-bad" : "bg-white/6 text-muted"
      }`}
    >
      {children}
    </span>
  );
}

export const levelLabel = (l: LevelName) => LEVEL_LABELS[l];
