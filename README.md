# Nunchi (눈치)

A Korean course in five levels, plus a vertical, swipeable feed for practice. Each card takes 10–30 seconds: a phrase, a casual/polite/formal comparison, a listening check, a speaking prompt, a slice of a story. A curriculum and a spaced-repetition model run underneath and decide what comes next.

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
  lessons/            Learn-tab lessons (schema + one file per lesson)
  path/               the five levels: chapter list (levels.ts) and the builder for points and quizzes
  wordbank.json       word bank data
  schema.ts           Zod schemas for concepts, sentences, segments, 16 card payloads
  concepts.ts         grammar, vocabulary, expressions, culture (287 concepts)
  units/*.ts          sentences and cards by theme (434 sentences, 388 cards)
  catalog.ts          parses everything, derives card↔concept links, integrity checks
src/lib/learner/      events, spaced repetition, learner-state reducer, progress summaries
src/lib/feed/         the recommender
src/lib/speech/       answer evaluation (speaking, typed, tile building) and recognition
src/lib/audio/        voices, spoken-text rules, and playback: recording, then Google clip, then device TTS
scripts/              generate-audio.ts: Google Cloud TTS clips for every sentence and voice
public/audio/         generated clips, public/audio/<voice>/<hash>.mp3
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
- **To learn list**: every card has three buttons at the bottom: "I know this", "Too easy" and "Too hard". "Too hard" puts the card on the To learn list (Saved → To learn), lowers the difficulty offset, and flags the card's concepts as weak. The card leaves the list after correct answers on 2 different days (a miss resets the count), or when the learner taps "I know this". Cards without a question leave only through "I know this".
- **Profile**: onboarding answers, a difficulty offset nudged by "too easy" / "too hard", and topic and card-type affinities learned from saves, long dwell times and quick swipes.

Onboarding marks concepts well below the learner's stated level as "assumed known" and schedules light check-in reviews for them.

### Learn tab and levels

**Learn** is the home tab. It holds five levels, each an ordered list of chapters, modelled on Bunpo (`src/content/path/`):

| Level | Name | Built from |
| --- | --- | --- |
| 1 | Foundations | Foundations modules 1–20, the first two sections of lesson 007, and word-bank vocabulary |
| 2 | Everyday basics | Lessons 001, 002-1, 002-2, 004, 005, the A1 feed cards, and vocabulary |
| 3 | Building up | Lessons 003, 006, the rest of 007, the A2 feed cards, and vocabulary |
| 4 | Real conversations | The B1 feed cards (connectors, slang, work, stories) and vocabulary |
| 5 | Beyond | The B2+ feed cards and sentence frames. Thin for now |

A chapter has a category tag (Hangul and sounds, Grammar, Vocabulary, Conversation, Culture), a few short points read one screen at a time, and a quiz. `levels.ts` lists the chapters and their sources, and `build.ts` assembles them:

- A feed source becomes one reading point per card. Its quiz-type cards (multiple choice, fill the gap, listening, spot the mistake) and story checks become quiz questions.
- A lesson source becomes one point per section, with long phrase lists split up. Its pick-one and fill-in exercises go to the quiz.
- A word source becomes points of 7 words.
- Every Korean line with a meaning also yields a "What does this mean?" question, with wrong answers drawn from the same chapter, then the level. Words also get the reverse question.

Every chapter quiz draws up to 10 questions (`src/lib/learner/path.ts`), at most 60% of them hand-written. 80% passes. Missed feed cards and words go on the To learn list, and getting them right on 2 separate days clears them. Every chapter in an open level is available. The next level opens once 80% of a level's chapters are passed or tested out. A 15-question level test (80% to pass) skips a level: it marks the unfinished chapters "tested out" and their concepts as known. Learners who pick Elementary or higher at onboarding are offered the Level 1 test on the home tab. Chapter and test state live in `card_states` under `chapter.*` and `level.*` ids, so no new tables were needed. Lessons finished before the levels existed count as finished chapters.

Lesson content is typed data, not prose: phrase tables, plain → honorific pairs, grammar tables, callouts, dialogues, a speaking challenge (microphone or typing), and exercises. Full sentences link to catalog sentences, so they're tappable for the word-by-word breakdown. Romanization is hidden by default with a per-device toggle. Each lesson lists the corrections made to its source document. The old lesson pages still work at `/learn/lesson/?id=…`.

The tab also has a searchable **Word bank** of 494 everyday words (`src/content/wordbank.json`, imported with `scripts/import-wordbank.py`) and a **Word of the Day** that's the same for everyone on a given date and cycles through every word before repeating.

Every play button has a slow-motion partner (🐌) that plays at 60% speed.

### Feed and levels

Each level is a feed stage (`src/lib/learner/stages.ts`). The feed serves new cards only from open levels, plus reviews from anywhere. It never spills into a locked level. When everything open has been seen, it brings back cards already met. A story belongs to the level of its first part, so it never stops at a locked level. Inside Level 1, cards carry a module number (greetings before numbers), and the feed stays within one module of the first unfinished one. "Too easy" now only nudges difficulty within the open levels. It no longer skips ahead, and `profiles.min_stage` is unused. Reading a card inside a chapter counts as seeing it in the feed.

### Feed algorithm

`src/lib/feed/engine.ts`. Each slot is filled in two steps.

1. **Pick a bucket** by weighted lottery: familiar 40%, new 25%, review 25%, explore 10%. Empty buckets drop out. Two new-concept cards in a row block a third. Two recent mistakes shift weight from new to familiar. A story whose previous part was just read gets priority.
2. **Pick the best card in the bucket.** The score combines level fit (peaking slightly above current ability), review urgency (how overdue the concept is), goal match, learned topic and type affinity, editorial interest, and variety penalties for repeating the last card's type or topic.

Hard rules: no card repeats within a session; nothing more than 1.6 levels above the learner's ability is introduced; exercises never introduce a concept, only practise one already met; cards marked "I know this" stop appearing outside reviews. Cards on the To learn list come back as top-priority reviews, and reviews get a bigger share of the feed while any are waiting. Every pick carries a reason ("Review: 에서", "New: -고 있다", "Story continues") that the card shows as a small tag.

### Speech levels

Speech level is a first-class field on every sentence and drives a fixed color system: mint for 반말, sky blue for 해요체, lilac for 하십시오체. Speech-level cards show the same idea at each level with when each fits. Natural-vs-textbook cards explain particle dropping, subject dropping and contraction without calling textbook forms wrong. The speaking evaluator detects the speech level of an answer and won't mark a 반말 answer as fully correct when the prompt asked for 해요체.

### Audio

Every sentence is pre-generated with Google Cloud Text-to-Speech in 5 Chirp 3 HD voices (Erinome, Laomedeia, Leda, Alnilam, Achird) and served as static files, so playback is instant and no API key reaches the browser. Learners pick a voice during onboarding and can change it in Me → Settings; the choice is saved to their profile. Dialogues pair the chosen voice with one of the other gender. Clips are named by a hash of the spoken text, so `npm run audio` only generates new or edited sentences and deletes stale clips. A sentence's optional `spoken` field fixes misreadings (`2시` is read `두 시`), and texting shorthand is spoken the way people say it (`ㅋㅋ` as 크크). If a clip is missing, playback falls back to the device's speech engine.

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
- Audio is synthetic speech (Google Chirp 3 HD), not native recordings. A sentence's `audioUrl` takes priority when present.
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
