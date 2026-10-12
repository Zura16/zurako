-- Cards marked "too hard" stay on the learner's To learn list until they
-- answer the card correctly on two different days, or mark it as known.
alter table public.card_states
  add column to_learn boolean not null default false,
  add column to_learn_since timestamptz,
  add column recoveries integer not null default 0,
  add column last_recovery_at timestamptz;

create index card_states_to_learn on public.card_states (user_id) where to_learn;
