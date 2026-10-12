"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { catalog } from "@/content";
import type { Concept } from "@/content/schema";
import { conceptGroups, overview, skillSummaries, type ConceptGroup } from "@/lib/learner/progress";
import type { ConceptStatus } from "@/lib/learner/srs";
import { useLearner } from "@/components/providers/LearnerProvider";

const SKILL_LABEL: Record<string, string> = {
  vocabulary: "Vocabulary",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
  honorifics: "Honorifics",
  conversation: "Conversation",
  slang: "Slang",
};

const STATUS: Record<ConceptStatus, { label: string; className: string }> = {
  mastered: { label: "Mastered", className: "bg-good/12 text-good" },
  learning: { label: "Learning", className: "bg-polite/12 text-polite" },
  due: { label: "Due", className: "bg-accent/15 text-accent" },
  weak: { label: "Weak", className: "bg-bad/12 text-bad" },
  assumed: { label: "Assumed", className: "bg-white/6 text-muted" },
  new: { label: "Not yet", className: "bg-transparent text-faint" },
};

const TABS: { kind: Concept["kind"]; label: string }[] = [
  { kind: "GRAMMAR", label: "Grammar" },
  { kind: "VOCAB", label: "Words" },
  { kind: "EXPRESSION", label: "Expressions" },
  { kind: "CULTURE", label: "Culture" },
];

export function ProgressView() {
  const { learner } = useLearner();
  const [now] = useState(() => Date.now());
  const [tab, setTab] = useState<Concept["kind"]>("GRAMMAR");
  const stats = useMemo(() => overview(catalog, learner, now), [learner, now]);
  const skills = useMemo(() => skillSummaries(learner), [learner]);
  const groups = useMemo(() => conceptGroups(catalog, learner, tab, now), [learner, tab, now]);

  return (
    <div className="mx-auto max-w-xl px-5 pt-[max(env(safe-area-inset-top),1.5rem)] pb-28">
      <h1 className="text-2xl font-bold">Progress</h1>

      <dl className="mt-5 grid grid-cols-3 gap-2.5">
        <Stat label="Concepts met" value={stats.introduced} />
        <Stat label="Mastered" value={stats.mastered} />
        <Stat label="To review" value={stats.due} accent={stats.due > 0} />
      </dl>
      <p className="mt-3 text-sm text-faint">
        {stats.cardsSeen} of {stats.totalCards} cards seen. Reviews show up in your feed when they&apos;re due.
      </p>

      <section className="mt-8 space-y-4" aria-labelledby="skills-h">
        <h2 id="skills-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
          Skills
        </h2>
        <ul className="space-y-3.5">
          {skills.map((s) => (
            <li key={s.skill}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium">{SKILL_LABEL[s.skill]}</span>
                <span className="text-muted">
                  {s.band}
                  {s.tentative && <span className="text-faint"> · early estimate</span>}
                </span>
              </div>
              <div
                className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8"
                role="img"
                aria-label={`${SKILL_LABEL[s.skill]}: around ${s.band}`}
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${Math.max(3, (s.ability / 6) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-faint">Each bar spans Beginner to native nuance. Estimates firm up as you answer exercises.</p>
      </section>

      <section className="mt-10" aria-labelledby="tree-h">
        <h2 id="tree-h" className="text-xs font-semibold tracking-wider text-faint uppercase">
          Concepts
        </h2>
        <div className="mt-3 flex gap-1.5 overflow-x-auto" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.kind}
              role="tab"
              aria-selected={tab === t.kind}
              onClick={() => setTab(t.kind)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${tab === t.kind ? "bg-accent text-accent-ink" : "bg-white/6 text-muted hover:text-ink"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2.5" role="tabpanel">
          {groups.map((g) => (
            <Group key={g.category} group={g} defaultOpen={tab === "GRAMMAR"} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl bg-white/5 px-3 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`mt-1 text-2xl font-bold ${accent ? "text-accent" : ""}`}>{value}</dd>
    </div>
  );
}

function Group({ group, defaultOpen }: { group: ConceptGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen && group.rows.length <= 8);
  const met = group.rows.length - group.counts.new;
  return (
    <div className="rounded-2xl border border-line">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className="flex-1 font-semibold">{group.category}</span>
        <span className="text-xs text-muted">
          {met}/{group.rows.length}
        </span>
        <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-white/8" aria-hidden>
          <span className="bg-good" style={{ width: `${(group.counts.mastered / group.rows.length) * 100}%` }} />
          <span
            className="bg-polite"
            style={{ width: `${((group.counts.learning + group.counts.due + group.counts.assumed) / group.rows.length) * 100}%` }}
          />
          <span className="bg-bad" style={{ width: `${(group.counts.weak / group.rows.length) * 100}%` }} />
        </span>
        <ChevronDown size={16} className={`text-faint transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="border-t border-line px-2 py-1.5">
          {group.rows.map((r) => (
            <li key={r.concept.id} className="flex items-center gap-3 rounded-xl px-2 py-2">
              <span lang="ko" className={`ko w-28 shrink-0 font-semibold ${r.status === "new" ? "text-faint" : ""}`}>
                {r.concept.label}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-muted">{r.concept.meaning}</span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS[r.status].className}`}>
                {STATUS[r.status].label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
