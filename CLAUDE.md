# CLAUDE.md — CrackDev

## Overview
- CrackDev is an interview-prep web app and installable PWA for software engineers: career-track roadmaps (checklist + Q&A), DSA problems and sheets with worked Java solutions, SQL, Java/Spring/Maven Q&A, role and company question banks, quiz, flashcards and streaks.
- Anyone can sign up with email + password (Supabase Auth). Each user sees only their own progress (Postgres RLS). Built and used by the repo owner.
- Production: https://roadmap-tracker-five.vercel.app. Vercel auto-deploys every push to `main`. Repo: `jyotiram7402/roadmap-tracker`.

## Tech stack
- Next.js `^15.5` App Router, React `^19`, **JavaScript only** (no TypeScript). Import alias `@/*` → repo root (`jsconfig.json`).
- Tailwind CSS `^3.4` + PostCSS/autoprefixer. All global CSS, including the light-theme layer, is in `app/globals.css`.
- Supabase: `@supabase/ssr` `^0.5`, `@supabase/supabase-js` `^2.46`. Used for Auth, Postgres tables and the private Storage bucket `solutions`.
- `prismjs` (code highlighting) and `mermaid` `^11` (diagrams), both lazy-loaded. `react-icons` is used only in `app/page.js` and `components/BrandFooter.js`; every other icon is an inline SVG in `components/icons.js`.
- Inter font via `next/font/google` in `app/layout.js`.
- No lockfile is committed, so each Vercel build installs the newest versions the `^` ranges allow.

## Setup on a fresh machine
1. Install Node 18.18 or newer (the old laptop had Node 24.22.1 and npm 11.19.1) and git.
2. `git clone https://github.com/jyotiram7402/roadmap-tracker.git` then `cd roadmap-tracker`.
3. `npm install`
4. Copy `.env.example` to `.env.local` and fill both values from Supabase → Project Settings → API.
5. `npm run dev` and open http://localhost:3000. Data comes from the live Supabase project, so existing accounts work.
- On the old laptop npm could not run at all (no `node_modules`), so the app was never built locally; Vercel was the only build. Whether npm works on the new laptop: (unverified).
- Brand-new Supabase project only: run `supabase-setup.sql` and `supabase-setup-user-kv.sql` in the SQL Editor; create a **private** Storage bucket named `solutions`, then run `supabase-setup-solutions.sql`; then follow `docs/setup/supabase-auth-emails.md`.

## Commands
| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Build, then run the build | `npm run build` then `npm start` |
| Lint | `npm run lint` runs `next lint`. No ESLint config or packages are committed, so it asks to set one up (unverified). |
| Tests | None. There is no test runner and there are no test files. |
| Database changes | Manual: paste a `supabase-*.sql` file into Supabase → SQL Editor → Run. |
| Deploy | `git push origin main`. Vercel builds and deploys. Other branches get preview URLs (unverified). |
| Syntax check without npm | `node --check path/to/file.js` (only for files without JSX). |

## Project map
- `app/` — App Router routes. Every page is `"use client"` except `app/auth/confirm/page.js`, which is a server component.
  - Public: `/` (`app/page.js`), `/login`, `/signup`, `/forgot-password`, `/auth/confirm`, `/auth/reset`.
  - Signed-in: `/dashboard` (hub, track roadmap, progress view), `/dsa`, `/sql`, `/java-qa`, `/springboot-qa`, `/maven`, `/company-qa`, `/roles`, `/quick`, `/flashcards`, `/bookmarks`, `/switch`, `/prep-roadmap`.
  - Legal templates: `/privacy`, `/terms`, `/refund`, all rendered by `components/LegalPage.js`.
  - `app/layout.js` adds to every page: the no-flash theme script, `PwaInstaller`, `ActivityTracker` and `SyncManager`.
- `middleware.js` refreshes the Supabase session and sends signed-out users to `/login`, except on public paths. Its `getUser()` call has a 2.5 s timeout and fails open.
- `app/auth/confirm/actions.js` is the only server-side app logic: a server action that verifies email links with `verifyOtp`.
- `lib/`: `supabase.js` (browser client, returns `null` on the server), `supabase-server.js` (cookie-based server client), `activity.js` (local streak, visits, active time), `cloud-sync.js` (mirrors chosen localStorage keys to the `user_kv` table), `quiz-stats.js`, `study-helpers.js` (`qaKey`, `itemKey`, `todayLocalDate`, `computeStreak`, `stageToMarkdown`).
- `components/`: feature screens `DsaStudio`, `SheetBrowser`, `CrackifyStudio`, `LogicStudio`, `SqlStudio`, `QaStudio`, `StudyMaterial`, `QuestionTable`, `StudyNotes`, `MySolution`, `RoadmapMap`, `ProgressView`; shared pieces `CodeBlock`, `MermaidDiagram`, `MarkdownNote`, `ThemeToggle`, `icons.js`.
- `data/` — all content as JS/JSON, loaded per area with dynamic `import()`. The database holds only per-user progress, never content.
- `public/` — PWA manifest, icons, `sw.js`. `supabase-*.sql` — schema and RLS policies. `docs/setup/` — setup guides.
- Data flow: the browser talks to Supabase directly with the anon key and the user's session cookie. RLS (`auth.uid() = user_id`) enforces ownership. There are **no API routes**.
- Read `docs/ARCHITECTURE.md` before changing data shapes, Supabase tables, localStorage keys or auth. It has the route-by-route map, data modules, schema and storage keys.

## Where to start for common tasks
- **Add a DSA problem:** add the title under its phase and difficulty in `RAW` in `data/dsa-problems.js`. Add the worked solution in `DETAILS` in `data/dsa/details-<phase>.js`, keyed by slug (title lowercased, non-alphanumerics → `-`). Copy the `"plus-one"` entry in `data/dsa/details-arrays.js`.
- **Add a DSA sheet:** append to `SHEETS` in `data/dsa-sheets.js`, then add its `SHEET_STYLE` entry in `components/SheetBrowser.js` and its `SOURCE_LABEL` and `SOURCE_ORDER` entries in `components/DsaStudio.js`.
- **Add a career track:** in `data/tracks.js` add a `TRACKS` entry, a `loadTrackData` case and a new stage-id prefix in `trackIdForStage`. Create `data/tracks/<id>.roadmap.js` and `data/tracks/<id>.study.json` using `data/tracks/_SCHEMA.md`.
- **Add a role bank:** add to `ROLES` in `data/roles.js` and create `data/roles/<id>.json` (shape in `data/roles/_SCHEMA.md`).
- **Add SQL questions:** `RAW` in `data/sql-problems.js` plus answers in `data/sql/details-<level>.js`.
- **Add Java or Spring Q&A:** categories in `data/java-qa.js` or `data/springboot-qa.js`; content in `data/java-qa/` or `data/springboot-qa/`.
- **Add a page:** create `app/<route>/page.js` with `"use client"` and copy the auth guard from `app/bookmarks/page.js`. Link it from the `SideLink` list and the `cards` array in `Hub`, both in `app/dashboard/page.js`.
- **Sync new per-user UI state across devices:** save it in localStorage under a prefix listed in `PREFIX` or `EXACT` in `lib/cloud-sync.js`.
- **Add a table:** write `supabase-setup-<name>.sql` with RLS policies `auth.uid() = user_id` for each operation. The owner runs it in the Supabase SQL Editor.

## Conventions
- Pages call Supabase inline: `const supabase = useMemo(() => createClient(), [])`, check `supabase.auth.getUser()` in `useEffect`, update local state first, then `upsert(row, { onConflict: "user_id,<key>" })`.
- State is plain `useState`/`useEffect`. There is no global store and no data-fetching library.
- Progress keys: `itemKey` = `stageId::sectionId::idx` and `qaKey` = `stageId::sectionIdx::qNum`, defined in both `data/tracks.js` and `lib/study-helpers.js`. Stage IDs are globally unique by prefix: `stage-N` (Java), `mern-`, `genai-`, `fde-`, `de-`, `pyb-`, `ip-` (interview prep), `role-<id>` (role banks). A new track needs a new prefix and no database change.
- Styling is dark-first Tailwind with arbitrary hex classes (`bg-[#09090b]`, `bg-[#18181b]`, `border-white/[0.06]`). Light mode is a layer of `html.light` override rules in `app/globals.css`. A new hard-coded color may need a matching override. The theme is stored in localStorage `crackdev-theme`.
- New localStorage keys use the `crackdev.` prefix. Older names stay as they are: `crackany.activity.*`, `roadmap.*`, `dsa-solution:*`, `dsa-solution-code:*`, `crackify.quiz.stats`.
- Large content stays in `data/` and loads with `import()` per phase, level or track, so first page loads stay small.
- Comments are kept minimal on purpose; the codebase was stripped of non-essential comments.
- Commit messages are short and imperative, often `fix(scope): …` or `feat(scope): …`.

## Env variables & external services
| Name | Used for | Where to get the value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL for the browser client, middleware and server action | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key. Safe in the browser because RLS protects every row | Supabase → Project Settings → API → `anon` `public` key |
- Locally they go in `.env.local` (gitignored). In production they are set in Vercel → Project → Settings → Environment Variables.
- No service-role key is used anywhere. Never add one to client code.
- `JWT_SECRET`, `PORT`, `ACCESS_SECRET` and `REFRESH_SECRET` under `data/roles/` and in `data/tracks/mern.study.json` are sample code inside Q&A answers, not app config.
- Services: Supabase (Auth, Postgres, Storage), Vercel (builds and hosting), GitHub. Auth emails can be sent through Gmail SMTP, configured only in the Supabase dashboard (`docs/setup/supabase-auth-emails.md`).

## Gotchas
- **Never change stage IDs, the `itemKey`/`qaKey` formats or existing localStorage keys.** They are the primary keys of every user's saved progress.
- **Keep the middleware's public-path skip and its 2.5 s `getUser()` timeout.** Without them a slow or paused Supabase caused site-wide `504 MIDDLEWARE_INVOCATION_TIMEOUT` errors.
- **Supabase email templates must link to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=…`.** The default `{{ .ConfirmationURL }}` links fail as "link expired" or "PKCE code verifier not found" when a mail scanner or another device opens them first. Deploy code before changing templates.
- **Never bulk-rewrite JSX with regex scripts.** A comment-stripping script cut a `//` inside a JSX string and broke the Vercel build (fixed in `720a4d1`).
- `components/MarkdownNote.js` must always advance its line index. A line starting with three backticks once caused an infinite loop that froze the page (`98e0587`).
- Code blocks stay dark in both themes (`bg-[#0c0d12]`); `app/globals.css` forces light text on them in light mode.
- `hasSolution(slug)` in `data/dsa-problems.js` is true for every catalog slug, not only slugs with a `DETAILS` entry. `loadSolutionBySlug` returns `null` when no worked solution exists.
- "Failed to fetch" on login usually means Supabase is unreachable: the free project is paused or the Vercel env vars are wrong.
- `public/sw.js` exists only to make the app installable and caches nothing. The install banner only shows on screens 820 px wide or less (`components/PwaInstaller.js`).
- `createClient()` in `lib/supabase.js` returns `null` during server rendering, so callers must check for it.

## Current status (2026-11-13)
- `main` is production and fully pushed. Latest work: email links are verified on the server via `/auth/confirm` (`c4a0085`, `27446b8`).
- Owner to-dos in the Supabase dashboard, not confirmed done: Site URL and Redirect URLs, Reset and Confirm email templates switched to `token_hash` links, optional Gmail SMTP, and running `supabase-setup-user-kv.sql` (cross-device sync needs the `user_kv` table).
- Branch `ui-overhaul` (not merged): a phased UI redesign that follows the owner's ui-overhaul skill. Phases 0–2 are done: semantic color tokens, primitives in `components/ui/`, phone bottom tabs, `PageHeader` on every tool page, and route loading, error and 404 pages. Phases 3–8 are pending. The plan and checklist are `docs/ui/PLAN.md` and `docs/ui/PROGRESS.md` on that branch. The Phase 1 and 2 checkpoints still need the owner's review on a preview.
- Known bug, found by reading the code and not yet tested: `middleware.js` treats only `/`, `/login`, `/signup`, `/auth…` and `/forgot-password` as public, and its matcher skips only images. Signed-out visitors who open `/terms`, `/privacy` or `/refund` from the landing-page footer, or request `/sw.js` or `/manifest.webmanifest`, get redirected to `/login`.
- Stubs: "Generate with AI" in `components/StudyNotes.js` only says the feature is under development. The paid AI plan on `/switch` is a `mailto:` request.
- Legal pages are unreviewed templates; `components/LegalPage.js` shows a warning banner.
- `README.md` is the original from-scratch deploy guide. Its 6-track table is outdated; there are 7 tracks now, including `interview-prep`.
- There are no TODO or FIXME markers in the code.

When you change commands, structure, env vars or conventions, update this file in the same commit.
