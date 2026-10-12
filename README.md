# Nunchi (눈치)

A vertical, swipeable feed for learning conversational Korean. Each card takes 10–30 seconds: a phrase, a casual/polite/formal comparison, a listening check, a speaking prompt, a slice of a story. A curriculum and a spaced-repetition model run underneath and decide what comes next.

Live: <https://zura16.github.io/zurako/>

> The Korean content is hand-written and passes structural checks, but no native speaker has reviewed it yet. Do that before showing it to real learners. The `/preview/` page lists every card for review.

## Run it

```bash
npm install
cp .env.example .env      # fill in the Supabase URL and anon key, or leave empty
npm run dev               # http://localhost:3000
```

With no Supabase settings, the app runs in device-only mode: progress is kept in `localStorage` and the Me page says so.

| Command                              | What it does                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `npm run dev`                        | Dev server                                                                                            |
| `npm test`                           | Vitest: content integrity, learner model, feed engine, evaluation, sync mapping, generation validator |
| `npm run typecheck` / `npm run lint` | `tsc --noEmit` / ESLint                                                                               |
| `npm run build`                      | Static export to `out/`                                                                               |
| `npm run check`                      | All of the above                                                                                      |
| `supabase db push`                   | Apply `supabase/migrations` to the linked project                                                     |
| `supabase config push`               | Apply auth settings from `supabase/config.toml`                                                       |

Pushing to `main` runs `.github/workflows/deploy.yml`, which tests, builds with `NEXT_PUBLIC_BASE_PATH=/zurako`, and publishes to GitHub Pages. The workflow reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from the repository's Actions variables.

## Architecture

GitHub Pages serves static files only, so the app is a static Next.js export. The browser runs the feed engine and the learner model. Supabase stores accounts and learner state.

```
src/content/          curriculum: typed, validated, shipped with the site
  schema.ts           Zod schemas for concepts, sentences, segments, 16 card payloads
  concepts.ts         grammar, vocabulary, expressions, culture (216 concepts)
  units/*.ts          sentences and cards by theme (234 sentences, 170 cards)
  catalog.ts          parses everything, derives card↔concept links, integrity checks
src/lib/learner/      events, spaced repetition, learner-state reducer, progress summaries
src/lib/feed/         the recommender
src/lib/speech/       answer evaluation (speaking, typed, tile building) and recognition
src/lib/audio/        audio provider: recordings first, browser TTS otherwise
src/lib/store/        Supabase client, auth, row mapping, batched sync with local cache
src/lib/generation/   constrained-generation request, prompt, and validator (not wired to an LLM)
src/components/       feed, cards, sentence X-ray, progress, account
supabase/             migrations and auth config
```

### Content model

Content is structured data, not text blobs.

- **Concept**: a unit of knowledge the learner can master: `g.progressive` (-고 있다), `v.친구`, `e.daebak`, `c.nunchi`. Grammar, vocabulary, expressions and culture share one shape, so learner state and reviews treat them the same.
- **Sentence**: Korean, translation, optional literal translation, level, speech level, naturalness (textbook / natural / colloquial / slang), social context, and a variant group linking casual, polite and formal versions. Each sentence is split into **segments** (tappable chunks). A segment has a gloss, dictionary form, parts (stem, particle, ending), related forms (polite past, honorific, …), a note, and the concept ids it exercises.
- **Card**: a feed item with a type, level, topic, skills, editorial interest score, and a type-specific payload that references sentences by id. Stories are cards with a story id and part number.

`npm test` enforces what the schema can't: segments must rebuild their sentence exactly, every reference must resolve, fill-in blanks must occur exactly once, transform tiles must be able to build each accepted answer, and so on.

### Learner model

Interactions are events (`lesson_viewed`, `lesson_swiped`, `answer_correct`, `word_tapped`, `marked_known`, `speaking_completed`, …). Each event is stored raw for analytics and passed through a pure reducer (`applyEvent`) that updates:

- **Concept state** for spaced repetition. Recall is modelled as `R(t) = 0.9^(t / S)`, so stability `S` (days) is the interval at which recall drops to 90%, and a concept is due `S` days after its last review. A correct answer grows `S`, more so when it was recalled late. A miss shrinks it to 30%. Tapping a word you'd already learned shortens its interval. Passively viewing a card introduces what it teaches but doesn't count as a recall test.
- **Skill ability** per skill (vocabulary, grammar, reading, listening, speaking, honorifics, conversation, slang) on the same 0–6 scale as content levels (Beginner … Native nuance), updated Elo-style. A learner can be B1 in reading and A1 in listening.
- **Profile**: onboarding answers, a difficulty offset nudged by "too easy" / "too hard", and topic and card-type affinities learned from saves, long dwell times and quick swipes.

Onboarding marks concepts well below the learner's stated level as "assumed known" and schedules light check-in reviews for them.

### Feed algorithm

`src/lib/feed/engine.ts`. Each slot is filled in two steps.

1. **Pick a bucket** by weighted lottery: familiar 40%, new 25%, review 25%, explore 10%. Empty buckets drop out. Two new-concept cards in a row block a third. Two recent mistakes shift weight from new to familiar. A story whose previous part was just read gets priority.
2. **Pick the best card in the bucket.** The score combines level fit (peaking slightly above current ability), review urgency (how overdue the concept is), goal match, learned topic and type affinity, editorial interest, and variety penalties for repeating the last card's type or topic.

Hard rules: no card repeats within a session; nothing more than 1.6 levels above the learner's ability is introduced; exercises never introduce a concept, only practise one already met; cards marked "I know this" stop appearing outside reviews. Every pick carries a reason ("Review: 에서", "New: -고 있다", "Story continues") that the card shows as a small tag.

### Speech levels

Speech level is a first-class field on every sentence and drives a fixed color system: mint for 반말, sky blue for 해요체, lilac for 하십시오체. Speech-level cards show the same idea at each level with when each fits. Natural-vs-textbook cards explain particle dropping, subject dropping and contraction without calling textbook forms wrong. The speaking evaluator detects the speech level of an answer and won't mark a 반말 answer as fully correct when the prompt asked for 해요체.

### Speaking

Browser speech recognition (Chrome, Edge, Safari) transcribes the answer, keeping up to 3 alternatives. Each is compared against every accepted answer, and required forms such as past tense 갔 are checked separately. Without recognition, the learner can type the answer or say it aloud and self-rate. Pronunciation is not scored, because a transcript can't measure it.

### Database

Supabase Postgres, with row-level security on every table so each user can only read and write their own rows. Curriculum content is not in the database. It ships with the site and is referenced by stable ids.

| Table            | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `profiles`       | onboarding answers, difficulty offset, learned affinities |
| `skill_states`   | ability and evidence count per skill                      |
| `concept_states` | spaced-repetition state per concept                       |
| `card_states`    | views, completions, saved, known, last outcome            |
| `events`         | append-only interaction log                               |

The client syncs changed rows and new events every 4 seconds, and when the tab is hidden. Failed writes stay queued and retry with backoff. A local cache makes start-up instant. When the local cache and the server disagree, the record with the newer `updated_at` wins.

### Accounts

Every visitor gets an anonymous Supabase account, so progress saves from the first swipe. "Save your progress" attaches an email to that account by sending a confirmation link. "Sign in" sends a link that loads an existing account on another device. Supabase's free plan doesn't allow custom email templates with its built-in sender, so the emails contain links rather than 6-digit codes. Adding a custom SMTP provider would allow codes.

### AI generation

`src/lib/generation/spec.ts` defines how generated content would be constrained: a request names the target grammar, the grammar the learner already knows, the allowed vocabulary frequency bands, the speech level, the topic and a level ceiling. `validateGenerated` rejects output that breaks the schema or integrity checks, invents concepts, uses grammar outside the allowed set, uses rarer vocabulary, has the wrong speech level, or doesn't teach the target. Nothing calls an LLM yet. Generated content would still need human review before joining the curriculum.

## Known limitations

- No native speaker has reviewed the content.
- Audio is the device's text-to-speech. Quality varies by device, and a machine without a Korean voice plays nothing (the app says so). There are no native recordings yet, though `audioUrl` on a sentence takes priority when present.
- Romanization isn't shown. The schema has a field for it, but automatic romanization gets sound changes wrong, and learners are assumed to read Hangul.
- Pronunciation isn't scored.
- Email confirmation uses links. On iOS, a link opened from the Mail app opens Safari, so it confirms the account there rather than in a home-screen web app.
- The feed weights are hand-tuned heuristics. The event log is there to tune them against real data.

## Next steps

1. Native-speaker review of every sentence, using `/preview/`.
2. Native audio recordings for the most common sentences, at normal and slow speed.
3. Wire `generation/spec.ts` to an LLM behind a review queue, to widen the B1+ and slang layers.
4. Tune feed weights and SRS parameters from the `events` table.
5. Custom SMTP so sign-in emails can carry a code.
