-- Learner state for Nunchi.
--
-- Curriculum content (concepts, sentences, cards) ships with the static site
-- and is referenced here by stable text ids. These tables hold only per-user
-- state, and row-level security restricts every row to its owner.

create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  self_level text not null check (self_level in ('hangul', 'beginner', 'elementary', 'intermediate', 'advanced')),
  goals text[] not null default '{}',
  casual_comfort smallint not null check (casual_comfort between 0 and 2),
  difficulty_offset real not null default 0,
  topic_affinity jsonb not null default '{}',
  type_affinity jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ability per skill on the content level scale (0 Beginner … 6 Native nuance).
create table public.skill_states (
  user_id uuid not null references auth.users (id) on delete cascade,
  skill text not null,
  ability real not null,
  evidence integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, skill)
);

-- Spaced-repetition state per concept. Recall R(t) = 0.9^(t / stability);
-- next_review_at = last_seen_at + stability days.
create table public.concept_states (
  user_id uuid not null references auth.users (id) on delete cascade,
  concept_id text not null,
  stability real not null,
  exposures integer not null default 0,
  correct integer not null default 0,
  incorrect integer not null default 0,
  lapses integer not null default 0,
  lookups integer not null default 0,
  assumed boolean not null default false,
  difficult boolean not null default false,
  avg_response_ms integer,
  last_seen_at timestamptz not null,
  next_review_at timestamptz not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, concept_id)
);
create index concept_states_due on public.concept_states (user_id, next_review_at);

create table public.card_states (
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id text not null,
  views integer not null default 0,
  completions integer not null default 0,
  saved boolean not null default false,
  known boolean not null default false,
  last_seen_at timestamptz,
  last_outcome text check (last_outcome in ('correct', 'incorrect', 'skipped')),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);
create index card_states_saved on public.card_states (user_id) where saved;

-- Append-only interaction log: analytics, and raw evidence for tuning the feed.
create table public.events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id text,
  type text not null,
  data jsonb not null default '{}',
  client_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index events_user_time on public.events (user_id, client_at);
create index events_type_time on public.events (type, client_at);

-- Row-level security: each user reads and writes only their own rows.
alter table public.profiles enable row level security;
alter table public.skill_states enable row level security;
alter table public.concept_states enable row level security;
alter table public.card_states enable row level security;
alter table public.events enable row level security;

create policy "own profile" on public.profiles
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own skills" on public.skill_states
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own concepts" on public.concept_states
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own cards" on public.card_states
  for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- Events are append-only from the client: insert and read, never update or delete.
create policy "insert own events" on public.events
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "read own events" on public.events
  for select to authenticated using (user_id = (select auth.uid()));
