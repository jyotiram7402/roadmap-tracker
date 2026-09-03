-- Cross-device sync for CrackDev's local activity (DSA done/visits, study notes,
-- code snippets, switch-plan checkboxes). Run this once in the Supabase SQL editor.

create table if not exists public.user_kv (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  k          text        not null,
  v          jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, k)
);

alter table public.user_kv enable row level security;

-- Each user can only read/write their own rows.
drop policy if exists "user_kv_select" on public.user_kv;
create policy "user_kv_select" on public.user_kv for select using (auth.uid() = user_id);

drop policy if exists "user_kv_insert" on public.user_kv;
create policy "user_kv_insert" on public.user_kv for insert with check (auth.uid() = user_id);

drop policy if exists "user_kv_update" on public.user_kv;
create policy "user_kv_update" on public.user_kv for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "user_kv_delete" on public.user_kv;
create policy "user_kv_delete" on public.user_kv for delete using (auth.uid() = user_id);

-- Bump updated_at on every update so last-write-wins works.
create or replace function public.set_kv_updated_at()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

drop trigger if exists user_kv_set_updated_at on public.user_kv;
create trigger user_kv_set_updated_at before update on public.user_kv
  for each row execute function public.set_kv_updated_at();
