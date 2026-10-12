-- Stage the learner skipped ahead to with "Too easy"; their path never drops below it.
alter table public.profiles add column min_stage smallint not null default 0;
