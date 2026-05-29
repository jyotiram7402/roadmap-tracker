-- =============================================================
-- RUN THIS ONCE IN SUPABASE SQL EDITOR
-- Dashboard -> SQL Editor -> New Query -> Paste this -> RUN
-- =============================================================

-- 1) Progress table - which items have been checked
create table if not exists progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  done boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_key)
);

-- 2) Notes table - both item-level and stage-level notes
create table if not exists notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  scope text not null default 'item',  -- 'item' or 'stage'
  content text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, item_key, scope)
);

-- 3) Custom items - user-added checklist items
create table if not exists custom_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stage_id text not null,
  section_id text not null,
  text text not null,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_custom_items_user on custom_items(user_id, stage_id, section_id);

-- 4) Q&A progress - "I can answer this" tracker for interview questions
create table if not exists qa_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  qa_key text not null,             -- format: stage-X::sectionIdx::qNum
  known boolean not null default false,
  confidence smallint not null default 0,  -- 0=not yet, 1=so-so, 2=solid
  updated_at timestamptz not null default now(),
  primary key (user_id, qa_key)
);

-- 5) Bookmarks - star important Q&A
create table if not exists bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  qa_key text not null,
  stage_id text not null,           -- denormalized for cross-stage list view
  section_idx smallint not null,
  q_num smallint not null,
  q_text text not null,             -- denormalized so bookmark list works without joining JSON
  created_at timestamptz not null default now(),
  primary key (user_id, qa_key)
);

-- 6) Daily activity - for streak tracking
create table if not exists daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_date date not null,
  events_count int not null default 1,
  primary key (user_id, activity_date)
);

create index if not exists idx_bookmarks_user_stage on bookmarks(user_id, stage_id);
create index if not exists idx_daily_activity_user on daily_activity(user_id, activity_date desc);

-- =============================================================
-- ROW LEVEL SECURITY - critical! Each user sees only their data
-- =============================================================

alter table progress enable row level security;
alter table notes enable row level security;
alter table custom_items enable row level security;
alter table qa_progress enable row level security;
alter table bookmarks enable row level security;
alter table daily_activity enable row level security;

-- Progress policies
drop policy if exists "users can read own progress" on progress;
create policy "users can read own progress"
  on progress for select using (auth.uid() = user_id);

drop policy if exists "users can write own progress" on progress;
create policy "users can write own progress"
  on progress for insert with check (auth.uid() = user_id);

drop policy if exists "users can update own progress" on progress;
create policy "users can update own progress"
  on progress for update using (auth.uid() = user_id);

drop policy if exists "users can delete own progress" on progress;
create policy "users can delete own progress"
  on progress for delete using (auth.uid() = user_id);

-- Notes policies
drop policy if exists "users can read own notes" on notes;
create policy "users can read own notes"
  on notes for select using (auth.uid() = user_id);

drop policy if exists "users can write own notes" on notes;
create policy "users can write own notes"
  on notes for insert with check (auth.uid() = user_id);

drop policy if exists "users can update own notes" on notes;
create policy "users can update own notes"
  on notes for update using (auth.uid() = user_id);

drop policy if exists "users can delete own notes" on notes;
create policy "users can delete own notes"
  on notes for delete using (auth.uid() = user_id);

-- Custom items policies
drop policy if exists "users can read own custom items" on custom_items;
create policy "users can read own custom items"
  on custom_items for select using (auth.uid() = user_id);

drop policy if exists "users can write own custom items" on custom_items;
create policy "users can write own custom items"
  on custom_items for insert with check (auth.uid() = user_id);

drop policy if exists "users can update own custom items" on custom_items;
create policy "users can update own custom items"
  on custom_items for update using (auth.uid() = user_id);

drop policy if exists "users can delete own custom items" on custom_items;
create policy "users can delete own custom items"
  on custom_items for delete using (auth.uid() = user_id);

-- Q&A progress policies
drop policy if exists "users can read own qa_progress" on qa_progress;
create policy "users can read own qa_progress"
  on qa_progress for select using (auth.uid() = user_id);
drop policy if exists "users can write own qa_progress" on qa_progress;
create policy "users can write own qa_progress"
  on qa_progress for insert with check (auth.uid() = user_id);
drop policy if exists "users can update own qa_progress" on qa_progress;
create policy "users can update own qa_progress"
  on qa_progress for update using (auth.uid() = user_id);
drop policy if exists "users can delete own qa_progress" on qa_progress;
create policy "users can delete own qa_progress"
  on qa_progress for delete using (auth.uid() = user_id);

-- Bookmarks policies
drop policy if exists "users can read own bookmarks" on bookmarks;
create policy "users can read own bookmarks"
  on bookmarks for select using (auth.uid() = user_id);
drop policy if exists "users can write own bookmarks" on bookmarks;
create policy "users can write own bookmarks"
  on bookmarks for insert with check (auth.uid() = user_id);
drop policy if exists "users can update own bookmarks" on bookmarks;
create policy "users can update own bookmarks"
  on bookmarks for update using (auth.uid() = user_id);
drop policy if exists "users can delete own bookmarks" on bookmarks;
create policy "users can delete own bookmarks"
  on bookmarks for delete using (auth.uid() = user_id);

-- Daily activity policies
drop policy if exists "users can read own daily_activity" on daily_activity;
create policy "users can read own daily_activity"
  on daily_activity for select using (auth.uid() = user_id);
drop policy if exists "users can write own daily_activity" on daily_activity;
create policy "users can write own daily_activity"
  on daily_activity for insert with check (auth.uid() = user_id);
drop policy if exists "users can update own daily_activity" on daily_activity;
create policy "users can update own daily_activity"
  on daily_activity for update using (auth.uid() = user_id);
