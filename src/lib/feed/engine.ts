import type { Card, Catalog } from "@/content/catalog";
import { GOAL_MATCH } from "@/lib/learner/model";
import { DAY, recall } from "@/lib/learner/srs";
import type { CardOutcome, LearnerState } from "@/lib/learner/types";

/**
 * Feed recommender.
 *
 * Each slot is filled in two steps:
 *   1. Pick a bucket by weighted lottery: familiar 40%, new 25%, review 25%,
 *      explore 10%. Weights adapt: empty buckets drop out, two new cards in a
 *      row block a third, recent mistakes shift weight from new to familiar,
 *      and an unfinished story gets priority right after its previous part.
 *   2. Pick the best-scoring card in that bucket. The score combines level
 *      fit, review urgency, goals, learned topic/type affinity, editorial
 *      interest, and variety penalties against the last few cards.
 *
 * Every pick carries a human-readable reason so behaviour is explainable.
 */

export type Bucket = "familiar" | "new" | "review" | "explore" | "story";

export type FeedPick = { cardId: string; bucket: Bucket; reason: string; score: number };

export type SessionEntry = { cardId: string; bucket: Bucket; outcome?: CardOutcome };

export type FeedContext = {
  catalog: Catalog;
  learner: LearnerState;
  now: number;
  /** Cards already shown this session, oldest first. */
  session: SessionEntry[];
  rng: () => number;
};

export const BASE_WEIGHTS: Record<Exclude<Bucket, "story">, number> = {
  familiar: 0.4,
  new: 0.25,
  review: 0.25,
  explore: 0.1,
};

/** Card types that ask the learner to produce or recall, rather than take in. */
const PRACTICE_TYPES = new Set<Card["type"]>(["SPEAKING", "TRANSFORM", "FILL_BLANK", "MULTIPLE_CHOICE", "MISTAKE", "LISTENING"]);

/** Cards above the learner's level by more than this are never shown as new. */
const MAX_STRETCH = 1.6;
/** Don't re-show a card within this window unless it's due for review. */
const COOLDOWN_MS = 30 * 60 * 1000;

type Candidate = {
  card: Card;
  buckets: Map<Bucket, string>; // bucket -> reason
  urgency: number;
};

export function nextCards(ctx: FeedContext, count: number): FeedPick[] {
  const session = [...ctx.session];
  const picks: FeedPick[] = [];
  for (let i = 0; i < count; i++) {
    const pick = pickOne({ ...ctx, session });
    if (!pick) break;
    picks.push(pick);
    session.push({ cardId: pick.cardId, bucket: pick.bucket });
  }
  return picks;
}

function pickOne(ctx: FeedContext): FeedPick | null {
  const candidates = classify(ctx);
  const weights = bucketWeights(ctx, candidates);
  const order = drawBuckets(weights, ctx.rng);

  for (const bucket of order) {
    const pool = candidates.filter((c) => c.buckets.has(bucket));
    const best = bestOf(pool, bucket, ctx);
    if (best) return best;
  }

  // Nothing fresh is eligible: bring back the least recently shown card the
  // learner has already met, so the feed never introduces anything here.
  const recent = new Set(ctx.session.slice(-30).map((e) => e.cardId));
  const met = new Set(ctx.session.map((e) => e.cardId));
  const fallback = [...ctx.catalog.cards.values()]
    .filter((c) => (met.has(c.id) || (ctx.learner.cards[c.id]?.views ?? 0) > 0) && !recent.has(c.id) && !c.story)
    .sort((a, b) => (ctx.learner.cards[a.id]?.lastSeenAt ?? 0) - (ctx.learner.cards[b.id]?.lastSeenAt ?? 0))[0];
  return fallback ? { cardId: fallback.id, bucket: "familiar", reason: "Another look", score: 0 } : null;
}

function classify(ctx: FeedContext): Candidate[] {
  const { catalog, learner, now, session } = ctx;
  const shownThisSession = new Set(session.map((e) => e.cardId));
  const out: Candidate[] = [];

  for (const card of catalog.cards.values()) {
    if (shownThisSession.has(card.id)) continue;
    const cs = learner.cards[card.id];
    const buckets = new Map<Bucket, string>();
    const teach = card.concepts.filter((c) => c.role === "TEACH");
    const gap = levelGap(card, ctx);

    // Review: a taught concept (or a vocab item it uses) is due.
    let urgency = 0;
    let dueLabel = "";
    for (const { id, role } of card.concepts) {
      const st = learner.concepts[id];
      if (!st || now < st.nextReviewAt) continue;
      if (role === "USE" && !id.startsWith("v.")) continue;
      const overdue = (now - st.nextReviewAt) / (Math.max(st.stability, 0.1) * DAY);
      const u = (role === "TEACH" ? 1 : 0.4) * (1 + Math.min(overdue, 2)) * (st.difficult ? 1.3 : 1);
      if (u > urgency) {
        urgency = u;
        dueLabel = catalog.concepts.get(id)?.label ?? id;
      }
    }
    const coolingDown = cs?.lastSeenAt != null && now - cs.lastSeenAt < COOLDOWN_MS;
    const reviewable = urgency > 0 && card.type !== "STORY" && (teach.length > 0 || card.sentenceIds.length > 0);
    if (reviewable && !coolingDown && gap <= MAX_STRETCH + 0.5) buckets.set("review", `Review: ${dueLabel}`);

    const seen = (cs?.views ?? 0) > 0;
    if (!coolingDown && !cs?.known) {
      // Story continuation: the previous part is done and this one isn't.
      if (card.story && card.story.part > 1 && !seen && storyPartSeen(ctx, card.story.id, card.story.part - 1)) {
        buckets.set("story", "Story continues");
      }
      const isLaterPart = card.story !== undefined && card.story.part > 1;
      if (!seen && !isLaterPart && gap <= MAX_STRETCH) {
        const fresh = teach.filter((c) => !learner.concepts[c.id]);
        const ready = fresh.every((c) => prerequisitesMet(ctx, c.id));
        // Exercises practise what was taught; they never introduce a concept.
        if (fresh.length > 0 && ready && !PRACTICE_TYPES.has(card.type)) {
          buckets.set("new", `New: ${catalog.concepts.get(fresh[0].id)?.label ?? "concept"}`);
        } else if (fresh.length === 0) {
          buckets.set("familiar", teach.length ? `Practice: ${catalog.concepts.get(teach[0].id)?.label}` : "Practice");
        }
        const offGoal = !matchesGoals(ctx, card);
        if (card.interest >= 0.8 || (offGoal && card.interest >= 0.6)) buckets.set("explore", "Something different");
      } else if (seen && !card.story && gap <= MAX_STRETCH && cs?.lastOutcome !== "correct") {
        // Seen before but not yet nailed: fair game for consolidation.
        buckets.set("familiar", "Another look");
      }
    }

    if (buckets.size > 0) out.push({ card, buckets, urgency });
  }
  return out;
}

function bucketWeights(ctx: FeedContext, candidates: Candidate[]): Map<Bucket, number> {
  const recent = ctx.session.slice(-3);
  const w = new Map<Bucket, number>(Object.entries(BASE_WEIGHTS) as [Bucket, number][]);

  const lastTwoNew = recent.length >= 2 && recent.slice(-2).every((e) => e.bucket === "new");
  if (lastTwoNew) w.set("new", 0);

  const misses = recent.filter((e) => e.outcome === "incorrect").length;
  if (misses >= 2) {
    w.set("new", (w.get("new") ?? 0) * 0.3);
    w.set("familiar", (w.get("familiar") ?? 0) + 0.15);
  }

  // Curiosity: continue a story right after its previous part.
  const last = ctx.session.at(-1);
  const lastCard = last ? ctx.catalog.cards.get(last.cardId) : undefined;
  w.set("story", lastCard?.story ? 2 : 0.15);

  for (const bucket of w.keys()) {
    if (!candidates.some((c) => c.buckets.has(bucket))) w.set(bucket, 0);
  }
  return w;
}

/** Order buckets by a weighted draw without replacement; zero-weight buckets go last. */
function drawBuckets(weights: Map<Bucket, number>, rng: () => number): Bucket[] {
  const remaining = new Map(weights);
  const order: Bucket[] = [];
  while (remaining.size > 0) {
    const total = [...remaining.values()].reduce((a, b) => a + b, 0);
    let chosen: Bucket | undefined;
    if (total <= 0) {
      chosen = remaining.keys().next().value;
    } else {
      let r = rng() * total;
      for (const [bucket, weight] of remaining) {
        r -= weight;
        if (r <= 0) {
          chosen = bucket;
          break;
        }
      }
      chosen ??= [...remaining.keys()].at(-1);
    }
    order.push(chosen!);
    remaining.delete(chosen!);
  }
  return order;
}

function bestOf(pool: Candidate[], bucket: Bucket, ctx: FeedContext): FeedPick | null {
  let best: FeedPick | null = null;
  for (const c of pool) {
    const score = scoreCard(c, bucket, ctx);
    if (!best || score > best.score) best = { cardId: c.card.id, bucket, reason: c.buckets.get(bucket)!, score };
  }
  return best;
}

export function scoreCard(c: Candidate, bucket: Bucket, ctx: FeedContext): number {
  const { card } = c;
  const profile = ctx.learner.profile;
  let score = 0;

  // Level fit: peaks slightly above current ability (desirable difficulty).
  const gap = levelGap(card, ctx);
  score += Math.exp(-((gap - 0.3) ** 2) / (2 * 0.7 ** 2));

  if (bucket === "review") score += c.urgency;
  if (bucket === "story") score += 1;

  if (matchesGoals(ctx, card)) score += 0.3;
  score += 0.3 * (profile?.topicAffinity[card.topic] ?? 0);
  score += 0.3 * (profile?.typeAffinity[card.type] ?? 0);
  score += 0.4 * card.interest;
  if (ctx.learner.cards[card.id]?.saved && bucket === "review") score += 0.2;

  // Variety: avoid the same card type or topic back to back.
  const recent = ctx.session
    .slice(-3)
    .map((e) => ctx.catalog.cards.get(e.cardId))
    .filter(Boolean) as Card[];
  const last = recent.at(-1);
  if (last?.type === card.type) score -= 0.7;
  if (recent.at(-2)?.type === card.type) score -= 0.3;
  if (last?.topic === card.topic) score -= 0.3;
  if (card.story && last?.story && last.story.id !== card.story.id) score -= 0.5;

  return score + ctx.rng() * 0.15;
}

/** Card level minus the learner's effective ability for the card's main skill. */
export function levelGap(card: Card, ctx: Pick<FeedContext, "learner">): number {
  const { learner } = ctx;
  const ability = learner.skills[card.skills[0]]?.ability ?? 1;
  return card.levelValue - (ability + (learner.profile?.difficultyOffset ?? 0));
}

function matchesGoals(ctx: FeedContext, card: Card): boolean {
  const goals = ctx.learner.profile?.goals ?? [];
  return goals.some((g) => {
    const m = GOAL_MATCH[g];
    return m.topics.includes(card.topic) || m.skills.includes(card.skills[0]);
  });
}

function prerequisitesMet(ctx: FeedContext, conceptId: string): boolean {
  const concept = ctx.catalog.concepts.get(conceptId);
  return (concept?.prerequisites ?? []).every((p) => {
    const st = ctx.learner.concepts[p];
    return st !== undefined && (st.assumed || recall(st, ctx.now) > 0.3);
  });
}

function storyPartSeen(ctx: FeedContext, storyId: string, part: number): boolean {
  for (const card of ctx.catalog.cards.values()) {
    if (card.story?.id === storyId && card.story.part === part) {
      // Viewed, not merely queued: the next part arrives a few cards after
      // the learner has read this one, which keeps some suspense.
      return (ctx.learner.cards[card.id]?.views ?? 0) > 0;
    }
  }
  return false;
}

/** Small seeded PRNG (mulberry32) so feeds are reproducible in tests. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
