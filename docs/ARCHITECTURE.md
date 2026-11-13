# CrackDev architecture

Read this before changing data shapes, Supabase tables, localStorage keys, auth, or adding a feature area. `CLAUDE.md` has the short version.

## Runtime picture

```
Browser (Next.js client components)
  ├─ content ........ data/** bundled with the app, split per phase/level/track via import()
  ├─ progress ....... Supabase Postgres through lib/supabase.js (anon key + session cookie, RLS)
  ├─ local state .... localStorage, mirrored to table user_kv by lib/cloud-sync.js
  └─ screenshots .... Supabase Storage bucket "solutions" (components/MySolution.js)

Vercel (server)
  ├─ middleware.js ................. session refresh + signed-out redirect to /login
  └─ app/auth/confirm/actions.js ... server action: verifyOtp for email links
```

There are no API routes. Every page except `app/auth/confirm/page.js` is a client component.

## Routes

| Route | Main pieces | Data and storage |
|---|---|---|
| `/` | `Logo`, `RotatingRoles`, `ThemeToggle`, `BrandFooter` (links to legal pages) | `data/tracks.js`, `data/roles.js` |
| `/login` | email + password form | `signInWithPassword`, shows `?error=link_expired\|invalid_link` notices |
| `/signup` | form | `signUp` with `emailRedirectTo` = `<origin>/auth/confirm` |
| `/forgot-password` | form | `resetPasswordForEmail` with `redirectTo` = `<origin>/auth/reset` |
| `/auth/confirm` | `page.js` (server) → `ConfirmClient.js` → `actions.js` | Continue button → `verifyOtp`; old `?code=` links handled client-side |
| `/auth/reset` | new-password form | `updateUser({ password })` |
| `/dashboard` | sidebar, `Hub`, `StudyMaterial`, `StageTOC`, `FilterChips`, `ExportMenu`, `TrackSwitcher`, `TrackChooser`, `ProgressView`, `DsaActivityCard` | tables `progress`, `notes`, `custom_items`, `qa_progress`, `bookmarks`, `daily_activity`; keys `roadmap.activeTrack`, `crackdev.sidebarCollapsed` |
| `/dsa` | tabs: `DsaStudio`, `SheetBrowser`, `CrackifyStudio`, `LogicStudio` | `data/dsa-problems.js`, `data/dsa/details-*.js`, `data/dsa-sheets.js`, `data/crackify.js`, `data/logic-building/` |
| `/sql` | `SqlStudio` | `data/sql-problems.js`, `data/sql/details-*.js` |
| `/java-qa`, `/springboot-qa` | `QaStudio` | `data/java-qa.js` + `data/java-qa/`, `data/springboot-qa.js` + `data/springboot-qa/` |
| `/maven` | notes + interview tabs, `MySolution` | `data/maven/notes.js`, `data/maven/interview.js` |
| `/company-qa` | company picker, `MySolution` | `data/company-qa.js` |
| `/roles` | role picker, `StudyMaterial`, `FilterChips` | `data/roles.js` + `data/roles/*.json`; tables `qa_progress`, `bookmarks`, `daily_activity`; key `roadmap.activeRole` |
| `/quick` | MCQ quiz | `data/quiz.js`; key `crackify.quiz.stats` |
| `/flashcards` | flip cards, keyboard shortcuts | track study data; table `qa_progress` |
| `/bookmarks` | saved Q&A list | table `bookmarks`; track and role data to render answers |
| `/switch` | paid AI plan pitch (mailto) + checklist plan | `data/switch-plan.js`; key `crackdev.switch.<planId>` |
| `/prep-roadmap` | `RoadmapMap` mind-map | `data/prep-roadmap.js` |
| `/privacy`, `/terms`, `/refund` | `LegalPage` | none |

## Content modules (`data/`)

| Area | Index / loader | Content files |
|---|---|---|
| Career tracks | `data/tracks.js`: `TRACKS`, `DEFAULT_TRACK`, `loadTrackData`, `trackIdForStage`, `itemKey`, `qaKey` | Java: `data/roadmap.js` + `data/study-material.json`. Others: `data/tracks/<id>.roadmap.js` + `<id>.study.json` (shape: `data/tracks/_SCHEMA.md`) |
| DSA catalog | `data/dsa-problems.js`: `RAW`, `PHASES`, `DSA_PROBLEMS`, `SOLUTION_INDEX`, `loadPhaseDetails`, `loadSolutionBySlug` | `data/dsa/details-<phase>.js` exporting `DETAILS` keyed by slug |
| DSA sheets | `data/dsa-sheets.js`: `SHEETS` (`apna-375`, `arsh-280`, `babbar-450`, `siddharth-450`, `chocolate-candy`) | inline |
| Crackify | `data/crackify.js`: `CRACKIFY`, `CRACKIFY_TYPES`, `CRACKIFY_PATTERNS` | inline |
| Logic building | `data/logic-building/index.js`: `LOGIC_PHASES` | `phase1.js` … `phase8.js` |
| SQL | `data/sql-problems.js`: `RAW` by level, `SQL_PROBLEMS`, `loadLevelDetails` | `data/sql/details-{l1,l2,l3,fav}.js` |
| Java Q&A | `data/java-qa.js`: `JAVA_QA_CATEGORIES`, `loadJavaQa` | `data/java-qa/{core,java8,oops}.js` |
| Spring Q&A | `data/springboot-qa.js`: `SPRINGBOOT_QA_CATEGORIES`, `loadSpringbootQa` | `data/springboot-qa/{core,ops,web}.js` |
| Maven | imported directly by `app/maven/page.js` | `data/maven/{notes,interview}.js` |
| Role banks | `data/roles.js`: `ROLES`, `ROLE_LEVELS`, `loadRoleData`, `roleStageId` (`role-<id>`) | `data/roles/<id>.json` (shape: `data/roles/_SCHEMA.md`) |
| Company Q&A | `data/company-qa.js`: `COMPANIES` | inline |
| Quiz | `data/quiz.js`: `QUIZ_SUBJECTS`, `QUIZ`, `buildQuizPool` | inline |
| Switch plan | `data/switch-plan.js`: `AI_PLAN`, `SWITCH_PLANS`, `planItemCount` | inline |
| Prep mind-map | `data/prep-roadmap.js`: `PREP_ROADMAP`, `PREP_NOTES` | inline, drawn by `components/RoadmapMap.js` |

The `/dsa` Problems tab (`components/DsaStudio.js`) merges the catalog, every sheet and Crackify into one list and tags each problem with its source (`SOURCE_LABEL`, `SOURCE_ORDER`). Detail views load solutions with `loadSolutionBySlug(slug, lcSlug)`.

Track Q&A block kinds: `text`, `subheader`, `code` (`lines[]`), `mermaid` (`lines[]`), `diagram`. `qNum` must be unique within a section because it is part of `qaKey`.

## Supabase schema

All tables have RLS on, with policies that allow a row only when `auth.uid() = user_id`. SQL lives in `supabase-setup.sql`, `supabase-setup-user-kv.sql` and `supabase-setup-solutions.sql`.

| Table | Primary key | Other columns | Used by |
|---|---|---|---|
| `progress` | `(user_id, item_key)` | `done`, `updated_at` | dashboard checklist |
| `notes` | `(user_id, item_key, scope)` | `scope` = `item` or `stage`, `content`, `updated_at` | dashboard notes |
| `custom_items` | `id` (uuid) | `user_id`, `stage_id`, `section_id`, `text`, `done`, `created_at` | dashboard "add your own item" |
| `qa_progress` | `(user_id, qa_key)` | `known`, `confidence` (0–2), `updated_at` | dashboard, roles, flashcards |
| `bookmarks` | `(user_id, qa_key)` | `stage_id`, `section_idx`, `q_num`, `q_text`, `created_at` | dashboard, roles, `/bookmarks` |
| `daily_activity` | `(user_id, activity_date)` | `events_count` | dashboard and roles streaks |
| `user_kv` | `(user_id, k)` | `v` (jsonb), `updated_at` | `lib/cloud-sync.js` |

Storage: private bucket `solutions`. Files live at `{user_id}/{problem-slug}/{timestamp}.jpg`; policies let a user read, insert and delete only inside their own folder. The bucket itself is created by hand in the dashboard.

## Browser storage keys

| Key | Written by | Synced to `user_kv` |
|---|---|---|
| `crackdev-theme` | `ThemeToggle`, read by the inline script in `app/layout.js` | no |
| `roadmap.activeTrack` | dashboard (flashcards reads it) | no |
| `roadmap.activeRole` | `/roles` | no |
| `crackdev.sidebarCollapsed` | dashboard | no |
| `crackany.activity.days`, `crackany.activity.items` | `lib/activity.js` | yes, merged (`mergeDays`, `mergeItems`) |
| `crackdev.studynotes.<slug>` | `components/StudyNotes.js` | yes, newest `updated_at` wins |
| `dsa-solution:<slug>`, `dsa-solution-code:<slug>` | `components/MySolution.js` | yes, newest wins |
| `crackdev.switch.<planId>` | `app/switch/page.js` | yes, newest wins |
| `crackify.quiz.stats` | `lib/quiz-stats.js` | yes, newest wins |
| `crackdev.sync.meta` | `lib/cloud-sync.js` bookkeeping | no |
| `pwa-install-dismissed` (sessionStorage) | `components/PwaInstaller.js` | no |

`SyncManager` (mounted in `app/layout.js`) starts `initSync` when a user is signed in. It pulls `user_kv`, merges into localStorage, and pushes local changes with `upsert(..., { onConflict: "user_id,k" })`. Writers fire a window `activity-change` event so live cards refresh.

## Auth flows

- **Sign up:** `signUp` → "Confirm signup" email → `/auth/confirm?token_hash=…&type=email&next=/dashboard` → Continue → `verifyOtp` in the server action → redirect to `next`.
- **Forgot password:** `resetPasswordForEmail` → "Reset password" email → `/auth/confirm?token_hash=…&type=recovery` → Continue → `verifyOtp` sets the session cookies → `/auth/reset` → `updateUser({ password })`.
- **Failures:** recovery errors go to `/forgot-password?error=link_expired`, others to `/login?error=link_expired` or `invalid_link`. Both pages show a notice.
- **Session:** cookies from `@supabase/ssr`. `middleware.js` refreshes them on non-public paths. Pages also guard themselves client-side with `supabase.auth.getUser()` and redirect to `/login`.
- The email templates in the Supabase dashboard must use the `token_hash` links above; see `docs/setup/supabase-auth-emails.md`.

## Theme and PWA

- The inline script in `app/layout.js` adds `class="light"` to `<html>` before paint when `crackdev-theme` is `light`. `app/globals.css` then remaps the hard-coded dark classes with `html.light …` rules.
- `public/manifest.webmanifest` and the rocket icons in `public/` make the app installable. `public/sw.js` has an empty fetch handler and caches nothing.
- `app/layout.js` captures `beforeinstallprompt` early (script `pwa-bip-capture`); `components/PwaInstaller.js` registers `/sw.js` and shows the install banner on screens 820 px wide or less, with manual steps for iOS.
