-- ============================================================================
-- Crack Any Job — "My Solution" cross-device image sync
-- ----------------------------------------------------------------------------
-- Storage Row-Level-Security policies for a PRIVATE bucket named "solutions".
-- Files are stored at path:  {user_id}/{problem-slug}/{timestamp}.jpg
-- so each user can only ever read/write inside their own {user_id} folder.
--
-- SETUP (one time):
--   1) Supabase Dashboard → Storage → "New bucket"
--        name:   solutions
--        Public: OFF  (keep it private)
--   2) Supabase Dashboard → SQL Editor → paste + run everything below.
--      (RLS is already enabled on storage.objects by default — no need to
--       enable it, just add the policies.)
-- ============================================================================

-- Read / list only your own solution images
create policy "solutions_select_own"
on storage.objects for select to authenticated
using (
  bucket_id = 'solutions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Upload only into your own folder
create policy "solutions_insert_own"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'solutions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Delete only your own files
create policy "solutions_delete_own"
on storage.objects for delete to authenticated
using (
  bucket_id = 'solutions'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Optional: if you ever re-run this and hit "policy already exists", drop first:
--   drop policy if exists "solutions_select_own" on storage.objects;
--   drop policy if exists "solutions_insert_own" on storage.objects;
--   drop policy if exists "solutions_delete_own" on storage.objects;
