# CrackDev — PROJECT

## Product
CrackDev is a dark-themed, installable (PWA) web app that helps software engineers prepare for technical interviews and career switches. It bundles career roadmaps, a unified library of 1,300+ DSA problems with worked solutions and personal notes, SQL / Java / Spring Q&A banks, quizzes, flashcards, company-wise questions, a switch-plan tracker and a visual prep mind-map, with progress synced across devices.

**Tagline:** Crack the interview. Crack the switch.

## Who uses it, on what
- Solo engineers (1–8 yrs) prepping daily, often one DSA problem a day. *(From the owner's own usage.)*
- **Phone** for reading solutions, marking progress, flashcards, quizzes on the go — the owner installs it as a PWA. *(Guess: ~50%+ of sessions on phone.)*
- **Laptop/desktop** for deep study: reading Brute→Optimal, writing notes, pasting code.

## Core loop
Open a DSA problem → read statement → study Brute→Better→Optimal → paste own solution/notes → **Mark as done** → see today's count and streak move on the dashboard. Repeat daily.

## Signature moment
The **problem "study desk"**: statement + layered solutions + your own notes/screenshots side by side, then marking it done and watching *Today's DSA practice* light up. Everything else is support.

## Core entities
- **Problem** (DSA): title, difficulty, topic, sources (core / Crackify / sheets), solution (approaches, code, dry-run), user state (done, visits, bookmark, notes, snippets, screenshots).
- **Question** (SQL / Java / Spring / Maven / Company / Roles): question + structured answer blocks (text, code, example, note), user done/notes.
- **Plan item** (Switch plan, Roadmap stage/topic): checkable step with progress.
- **Quiz item** / **Flashcard**.

## Screen inventory
| Route | Purpose | Primary action | Auth |
|---|---|---|---|
| `/` | Landing / marketing | Get started → signup | Public |
| `/login`, `/signup` | Auth | Sign in / Create account | Public |
| `/forgot-password`, `/auth/reset`, `/auth/confirm` | Password reset / email confirm | Submit | Public |
| `/dashboard` | Hub: greeting, stats, today's DSA card, section cards; views: roadmap, progress | Open a section / mark roadmap item | Gated |
| `/dsa` | Tabs: Problems (unified 1,333), Sheets, Crackify, Logic Building → problem detail | Open problem → Mark done | Gated |
| `/sql` | SQL Q&A table → detail + notes | Open question | Gated |
| `/java-qa`, `/springboot-qa` | Q&A studios (categories) | Open question | Gated |
| `/maven` | Notes + interview Qs (tabs) | Read | Gated |
| `/company-qa` | Company → role set → question | Open question | Gated |
| `/roles` | Role-specific banks | Open role | Gated |
| `/quick` | MCQ quiz | Answer → next | Gated |
| `/flashcards` | Flip-card revision | Flip / next | Gated |
| `/bookmarks` | Saved Q&A | Open | Gated |
| `/switch` | AI switch-plan pitch + checkbox plan | Request plan / tick items | Gated |
| `/prep-roadmap` | Mind-map of prep roadmap | Expand / zoom / pan | Gated |
| `/terms`, `/privacy`, `/refund` | Legal | Read | Public |

## Key flows (regression-test after every phase)
1. Landing → Sign up → confirm → Dashboard loads; new user sees Track chooser → picks track.
2. Login → Dashboard → DSA → search "two sum" → open → read solution → copy code → Mark as done → Dashboard "Today's DSA practice" shows it.
3. DSA Sheets → open sheet → open problem → notes (Master this problem) save/edit/delete, survive refresh.
4. SQL → open question → notes workspace works.
5. Quick Practice → answer 5 → score updates; Flashcards flip/next.
6. Switch plan: tick items → progress bar; Prep mind-map expand/zoom/pan.
7. Theme toggle dark↔light persists; no flash on reload.
8. Mobile: sidebar drawer opens/closes; install banner appears only on phones.
9. Sign out → gated routes redirect to login.

## Brand assets found
- **Logo:** `components/Logo.js` — rocket in maroon→coral gradient tile (`#7a1f5c → #f0654f`) + "Crack**Dev**" (Dev in coral). Favicon `app/icon.svg`, PWA icons in `public/`.
- **Colors in use:** bg `#09090b`, surfaces `#18181b / #1c1c20 / #141417`, blue `#3b82f6` primary, coral `#f0654f` brand accent, Tailwind palette accents.
- **Type:** Inter via `next/font/google` (self-hosted by Next). Code: generic `font-mono`.
- **Icons:** inline Lucide set (`components/icons.js`) + `react-icons` brand logos on landing + many emojis in headers.
- **Theme:** dark default; light mode is a CSS override layer (`html.light` in `globals.css`), toggle in `components/ThemeToggle.js`, no-flash init in `app/layout.js`.
- Design tokens partially exist as CSS vars in `globals.css` (`--bg, --card, --border, --text …`) but most components use raw hex / palette classes.

## Do-not-touch (per skill §1)
`middleware.js`, `lib/supabase.js`, `lib/cloud-sync.js` (sync logic), Supabase SQL / RLS, auth flows (`login/signup/forgot/reset/confirm` *logic*), `public/sw.js`, `public/manifest.webmanifest` caching, env vars, data fetching in `lib/activity.js`. UI around these may be restyled; behaviour must not change.

## Open questions
See CHECKPOINT list in `PROGRESS.md`.
