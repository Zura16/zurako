import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppEvent } from "@/lib/learner/events";
import { emptyLearner, type Changes, type LearnerState } from "@/lib/learner/types";
import {
  cardFromRow,
  cardToRow,
  conceptFromRow,
  conceptToRow,
  eventToRow,
  mergeLearner,
  profileFromRow,
  profileToRow,
  skillFromRow,
  skillToRow,
  type CardRow,
  type ConceptRow,
  type ProfileRow,
  type SkillRow,
} from "./rows";

const FLUSH_DELAY_MS = 4000;
const MAX_BACKOFF_MS = 60_000;
const cacheKey = (userId: string) => `nunchi:learner:${userId}`;

/**
 * Persists learner state. Writes go to a local cache immediately (instant
 * start-up next time) and to Supabase in batches every few seconds: only the
 * rows that changed, plus the raw events. Failed writes stay queued and are
 * retried with backoff, so going offline loses nothing.
 */
export class LearnerSync {
  private dirty = { profile: false, concepts: new Set<string>(), cards: new Set<string>(), skills: new Set<string>() };
  private events: AppEvent[] = [];
  private latest: LearnerState = emptyLearner();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private backoff = FLUSH_DELAY_MS;
  private flushing: Promise<void> | null = null;
  lastError: string | null = null;

  constructor(
    private client: SupabaseClient | null,
    private userId: string,
  ) {}

  async load(): Promise<LearnerState> {
    const local = readCache(this.userId);
    if (!this.client) return local ?? emptyLearner();
    const remote = await fetchRemote(this.client, this.userId);
    this.latest = local ? mergeLearner(local, remote) : remote;
    if (local) this.markAllDirtyNewerThanRemote(local, remote);
    return this.latest;
  }

  record(state: LearnerState, changes: Changes, event?: AppEvent) {
    this.latest = state;
    if (changes.profile) this.dirty.profile = true;
    changes.concepts.forEach((id) => this.dirty.concepts.add(id));
    changes.cards.forEach((id) => this.dirty.cards.add(id));
    changes.skills.forEach((id) => this.dirty.skills.add(id));
    if (event) this.events.push(event);
    writeCache(this.userId, state);
    this.schedule(FLUSH_DELAY_MS);
  }

  /** Mark everything for upload, e.g. right after onboarding creates state. */
  recordAll(state: LearnerState) {
    this.latest = state;
    this.dirty.profile = state.profile !== null;
    Object.keys(state.concepts).forEach((id) => this.dirty.concepts.add(id));
    Object.keys(state.cards).forEach((id) => this.dirty.cards.add(id));
    Object.keys(state.skills).forEach((id) => this.dirty.skills.add(id));
    writeCache(this.userId, state);
    this.schedule(0);
  }

  get pendingCount() {
    return this.events.length + this.dirty.concepts.size + this.dirty.cards.size + this.dirty.skills.size + (this.dirty.profile ? 1 : 0);
  }

  flush(): Promise<void> {
    if (!this.client) return Promise.resolve();
    this.flushing ??= this.doFlush().finally(() => (this.flushing = null));
    return this.flushing;
  }

  dispose() {
    if (this.timer) clearTimeout(this.timer);
  }

  static clearCache(userId: string) {
    try {
      localStorage.removeItem(cacheKey(userId));
    } catch {
      // storage unavailable: nothing to clear
    }
  }

  private schedule(delay: number) {
    if (!this.client || this.timer) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      void this.flush();
    }, delay);
  }

  private async doFlush() {
    const client = this.client!;
    const { userId, latest } = this;
    const dirty = this.dirty;
    const events = this.events;
    this.dirty = { profile: false, concepts: new Set(), cards: new Set(), skills: new Set() };
    this.events = [];

    try {
      // Profile first: it's the record other tables' existence is checked against on load.
      if (dirty.profile && latest.profile) await upsert(client, "profiles", [profileToRow(userId, latest.profile)], "user_id");
      const skills = [...dirty.skills].flatMap((k) => (latest.skills[k as keyof typeof latest.skills] ? [skillToRow(userId, latest.skills[k as keyof typeof latest.skills]!)] : []));
      const concepts = [...dirty.concepts].flatMap((id) => (latest.concepts[id] ? [conceptToRow(userId, latest.concepts[id])] : []));
      const cards = [...dirty.cards].flatMap((id) => (latest.cards[id] ? [cardToRow(userId, latest.cards[id])] : []));
      await Promise.all([
        skills.length ? upsert(client, "skill_states", skills, "user_id,skill") : null,
        concepts.length ? upsert(client, "concept_states", concepts, "user_id,concept_id") : null,
        cards.length ? upsert(client, "card_states", cards, "user_id,card_id") : null,
        events.length ? insert(client, "events", events.map((e) => eventToRow(userId, e))) : null,
      ]);
      this.lastError = null;
      this.backoff = FLUSH_DELAY_MS;
    } catch (err) {
      // Put everything back and retry later.
      if (dirty.profile) this.dirty.profile = true;
      dirty.concepts.forEach((id) => this.dirty.concepts.add(id));
      dirty.cards.forEach((id) => this.dirty.cards.add(id));
      dirty.skills.forEach((id) => this.dirty.skills.add(id));
      this.events = [...events, ...this.events];
      this.lastError = err instanceof Error ? err.message : String(err);
      this.backoff = Math.min(this.backoff * 2, MAX_BACKOFF_MS);
      this.schedule(this.backoff);
    }
  }

  private markAllDirtyNewerThanRemote(local: LearnerState, remote: LearnerState) {
    if (local.profile && (!remote.profile || local.profile.updatedAt > remote.profile.updatedAt)) this.dirty.profile = true;
    for (const [id, c] of Object.entries(local.concepts)) if ((remote.concepts[id]?.updatedAt ?? -1) < c.updatedAt) this.dirty.concepts.add(id);
    for (const [id, c] of Object.entries(local.cards)) if ((remote.cards[id]?.updatedAt ?? -1) < c.updatedAt) this.dirty.cards.add(id);
    for (const [id, s] of Object.entries(local.skills)) if (s && (remote.skills[id as keyof typeof remote.skills]?.updatedAt ?? -1) < s.updatedAt) this.dirty.skills.add(id);
    if (this.pendingCount > 0) this.schedule(0);
  }
}

async function upsert(client: SupabaseClient, table: string, rows: object[], onConflict: string) {
  const { error } = await client.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function insert(client: SupabaseClient, table: string, rows: object[]) {
  const { error } = await client.from(table).insert(rows);
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function fetchRemote(client: SupabaseClient, userId: string): Promise<LearnerState> {
  const [profile, skills, concepts, cards] = await Promise.all([
    client.from("profiles").select("*").eq("user_id", userId).maybeSingle<ProfileRow>(),
    client.from("skill_states").select("*").eq("user_id", userId).returns<SkillRow[]>(),
    client.from("concept_states").select("*").eq("user_id", userId).returns<ConceptRow[]>(),
    client.from("card_states").select("*").eq("user_id", userId).returns<CardRow[]>(),
  ]);
  for (const r of [profile, skills, concepts, cards]) if (r.error) throw new Error(r.error.message);

  const state = emptyLearner();
  if (profile.data) state.profile = profileFromRow(profile.data);
  for (const r of skills.data ?? []) state.skills[r.skill] = skillFromRow(r);
  for (const r of concepts.data ?? []) state.concepts[r.concept_id] = conceptFromRow(r);
  for (const r of cards.data ?? []) state.cards[r.card_id] = cardFromRow(r);
  return state;
}

function readCache(userId: string): LearnerState | null {
  try {
    const raw = localStorage.getItem(cacheKey(userId));
    return raw ? (JSON.parse(raw) as LearnerState) : null;
  } catch {
    return null;
  }
}

function writeCache(userId: string, state: LearnerState) {
  try {
    localStorage.setItem(cacheKey(userId), JSON.stringify(state));
  } catch {
    // Storage full or blocked: the remote copy is still authoritative.
  }
}
