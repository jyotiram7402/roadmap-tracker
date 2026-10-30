# CrackDev — UI PLAN

## Evolve or refresh → **Evolve** (recommended)
Users and the owner already know the brand: dark `#09090b` canvas, the rocket-in-coral logo, "Crack**Dev**". The problems in `AUDIT.md` are consistency, mobile mechanics and token debt — not identity. Evolve keeps the look people recognise and makes it disciplined and native-quality. *(Alternative: a light-first "notebook" refresh — not recommended; it would discard a brand the owner just invested in.)*

## Design direction
**Grounded in the subject:** a developer's study desk — dark editor canvas, monospaced code as the texture, one warm accent (the logo's coral) for "you did this", blue reserved for actions. Quiet chrome; the problem and your notes are the hero.

### Tokens (semantic, light + dark)
| Token | Dark | Light |
|---|---|---|
| `--bg` | `#09090B` | `#FFFFFF` |
| `--surface` | `#18181B` | `#F7F7F8` |
| `--surface-2` | `#1C1C20` | `#EFEFF2` |
| `--border` | `rgba(255,255,255,.08)` | `rgba(9,9,11,.10)` |
| `--fg` | `#FAFAFA` | `#18181B` |
| `--muted-fg` | `#A1A1AA` | `#52525B` |
| `--primary` (actions) | `#3B82F6` | `#2563EB` |
| `--brand` (progress / "done", logo coral) | `#F0654F` | `#D94E39` |
| `--success` | `#22C55E` | `#059669` |
| `--warning` | `#F59E0B` | `#B45309` |
| `--danger` | `#F43F5E` | `#E11D48` |
| `--info` | `#06B6D4` | `#0891B2` |
| Domain: `--diff-easy/medium/hard` | `#34D399 / #FBBF24 / #FB7185` | `#059669 / #B45309 / #E11D48` |

Mapped into Tailwind 3.4 `theme.extend.colors` as `bg-background`, `bg-surface`, `text-fg`, `text-muted`, `border-border`, `bg-primary`, `text-brand`, … so `bg-[#18181b]` → `bg-surface`. The current `html.light` remap layer stays as a safety net until every component is migrated, then is deleted.

### Type
- **UI:** Inter (already self-hosted via `next/font`). Keep — evolve. Body **16px on phones**, 14–15px dense UI on desktop; prose ≤ 80ch.
- **Code:** **JetBrains Mono** via `next/font/google` (self-hosted at build; no new dependency) for real code, IDs and keys only. Gives the "editor" texture that makes CrackDev feel like a dev tool rather than a generic SaaS.
- Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36.

### Shape, depth, motion
- Radius: chips 8, controls 10, surfaces 14, sheets 20.
- Depth: borders + surface tone; dark elevates with lighter surfaces, not shadows (one soft shadow for floating sheets/menus only).
- Motion: 150–250ms ease-out, only in response to actions. **One** orchestrated moment: the hero headline + today's-practice card on first load. Remove `anim-fade-up` from everything else. `prefers-reduced-motion` respected (already in CSS).

### Principles (CrackDev-specific)
1. **The problem is the page.** Chrome recedes; statement, solution and your notes get the width.
2. **Progress you can feel, today.** Every "Mark done" visibly moves a number on the same screen and on the dashboard.
3. **One list, every source.** A problem from Crackify, a sheet or the core catalog looks and behaves identically.
4. **Dark by craft, light by right.** Both themes come from the same tokens — no remap hacks.

### Generic-tells check (§3) — what changed in this plan
- Dropped `→` from button labels; dropped ALL-CAPS eyebrows ("PRACTICE THE STACK…", "AI-POWERED · PREMIUM") → sentence case.
- Replaced `A · B · C` meta strings with real sentences or chips.
- Headline no longer uses a blue→violet gradient word; the rotating role uses the single **brand coral** (ties to the logo) — kept as the landing's one bold moment.
- Hero stats row trimmed to one honest proof line; no "big-number-plus-gradient".
- No identical-card grid: the Hub gets hierarchy (hero → today's practice → quick actions as a compact list).
- `anim-fade-up` limited to the hero; hover-lift only on primary cards.

## Shells (ASCII)
**Phone (≤768)**
```
┌──────────────────────────────┐
│ ◀  Problem title       ☾ ⋮   │  ← compact sticky top bar (safe-area)
├──────────────────────────────┤
│                              │
│   content (single column)    │
│                              │
├──────────────────────────────┤
│ [Mark done]  [Notes]  [★]    │  ← sticky action bar on detail pages
├──────────────────────────────┤
│  ⌂ Home   ‹› DSA   ▮ Progress  ≡ More │ ← bottom tabs (safe-area)
└──────────────────────────────┘
```
"More" opens a bottom sheet listing SQL, Java, Spring, Maven, Company, Roles, Quick, Flashcards, Bookmarks, Switch plan, Prep map, Settings/theme, Sign out. No destination is dropped.

**Desktop (≥1024)** — keep today's persistent sidebar (collapsible to icon rail ✓) + sticky page header; content `max-w-7xl`; problem detail as a two-pane study desk.
```
┌────────┬─────────────────────────────────────────┐
│ ☆ Logo │ ◀ DSA › Two Sum           🔥 3   ☾  ⊡    │
│ Home   ├────────────────────┬────────────────────┤
│ DSA    │ Statement          │ Brute · Better ·   │
│ SQL    │ examples           │ Optimal  (code)    │
│ …      │ companies          │ dry-run table      │
│ Track  ├────────────────────┴────────────────────┤
│ ▾      │ My solution · Master this problem (notes)│
└────────┴─────────────────────────────────────────┘
```

## Component plan
**Primitives** (build in `components/ui/`, reuse existing where present): Button (primary/secondary/ghost/danger; sm/md; loading), IconButton (44px, required `aria-label`), Input/Textarea/Select (16px on phone), FormField (label+hint+error, `aria-describedby`), Chips/ScrollableTabs (one scroll row), ResponsiveDialog (centered ≥md, bottom sheet on phone; trap/Escape/restore), Menu/ActionSheet, Toast (`aria-live`, above bottom nav), Skeleton, EmptyState, ErrorState, Badge (status = icon+label+color), DifficultyChip, Progress/Ring, PageHeader (back · title · actions incl. ThemeToggle), Container, DataList (QuestionTable → generalised), LoadMore.

**Entity families**
- **Problem** — `ProblemRow` (QuestionTable row: status · title · source chips · attempts · bookmark · difficulty), `ProblemCard` (sheet/hub grids), `ProblemDetail` (study desk: statement, approaches, dry-run, MySolution, StudyNotes, sticky actions). Used by Problems, Sheets, Crackify, Logic.
- **Question** — `QuestionRow`, `QuestionDetail` (AnswerBlocks with icon chips). Used by SQL, Java, Spring, Maven, Company, Roles, Bookmarks.
- **PlanItem** — checkable row with progress (Switch plan, Roadmap).
- **Card** (Flashcard) and **QuizOption**.

**Preview:** dev-only `/design-system` (noindex, returns 404 in production) showing every primitive and entity component in each state and theme.

## Phases for this project
| Phase | Scope | Checkpoint |
|---|---|---|
| 0 | Discover, audit, plan (this) | ✅ awaiting approval |
| 1 | **Foundations:** tokens → Tailwind mapping; JetBrains Mono for code; System/Light/Dark; global mobile base (dvh, viewport-fit, safe-area, 16px inputs, hover-capable); primitives; `/design-system` | review on phone |
| 2 | **App shell:** phone bottom tabs + More sheet; PageHeader everywhere (theme toggle on all tools); route `loading/error/not-found`; container pattern | |
| 3 | **DSA (core flow):** Problem family; study-desk detail with sticky actions; Copy always visible; Sheets pagination; chip tabs; difficulty chips | |
| 4 | **Dashboard + Progress:** hierarchy, skeletons, phone-visible streak, simplified charts | |
| 5 | **Q&A studios:** Question family across SQL/Java/Spring/Maven/Company/Roles/Bookmarks | |
| 6 | **Practice:** Quick quiz + Flashcards keyboard & phone; Switch plan; Prep mind-map (dvh, 44px controls) | |
| 7 | **Auth, landing, legal, system, PWA:** show/hide password, autocomplete, errors; landing de-templated; install prompt safe-area; iOS steps | |
| 8 | **Final:** a11y + perf fixes, §12 matrix, `QA.md`, remove decoration that doesn't serve users, add §14 rules to `CLAUDE.md` | |

## New dependencies
**None.** (JetBrains Mono comes through `next/font/google`, already in Next.) If a bottom-sheet library is later wanted, I'll propose it with size/maintenance — default is to build a small ResponsiveDialog ourselves.

## Quick wins (can ship inside Phase 1)
16px inputs · `dvh` · viewport-fit + safe-area · always-visible Copy · theme toggle on every header · Sheets "show more".

## Risks
- **Token migration is large** (211 hex + 725 palette classes). Mitigation: per-component in each phase; keep the `html.light` remap as fallback until Phase 8 removes it.
- **No local build here** (no `node_modules`/`.env.local`): per-phase verification = `node --check` on JS + careful review + **Vercel preview build** as the real gate. If the owner can run `npm run build` locally, we gate on that instead (ask at checkpoint).
- Earlier mass comment-strip corrupted one JSX string; Phase edits will be surgical, never scripted bulk rewrites of JSX.

## Needs backend change
None identified. Auth, middleware, RLS, sync and data fetching stay untouched.
