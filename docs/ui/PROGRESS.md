# CrackDev — UI overhaul PROGRESS

**Mode:** Full (default) — confirm at Phase 0 checkpoint.
**Branch:** `ui-overhaul` (from `main`). Commits at the end of each phase; no push/merge/deploy unless asked.
**Verification per phase:** `node --check` on changed JS; manual review; **Vercel preview build** is the real gate (no local `node_modules`/`.env.local` in this environment — see Open questions).

## Phase 0 — Discover, audit, plan
- [x] Learn project (Next 15.5, React 19, JS, Tailwind 3.4, Supabase, PWA, Inter via next/font, Lucide inline icons, dark + light remap)
- [x] `PROJECT.md`
- [x] Screen look: public pages live (landing/login/signup at ~800px & 375px); gated screens code-audited (Playwright cert-blocked; app can't run locally)
- [x] `AUDIT.md`
- [x] `PLAN.md`
- [x] `PROGRESS.md`
- [x] **CHECKPOINT** — owner said "start each phase one by one" → defaults adopted (see Decisions)

## Phase 1 — Foundations (2026-10-30)
- [x] Semantic tokens (light + dark) in `globals.css` (`--surface/-2, --fg, --muted-fg, --primary, --brand, --success/warning/danger/info, --diff-*`) → `tailwind.config.mjs` `theme.extend.colors` (`bg-surface`, `text-fg`, `text-muted`, `border-border`, `bg-primary`, `text-primary-fg`, `text-diff-easy`…), radii (`rounded-chip/control/surface/sheet`), z-index scale (`z-sticky/nav/overlay/modal/toast`)
- [x] JetBrains Mono via `next/font/google` (`--font-mono`, `font-mono`) — code only
- [x] Theme: System / Light / Dark cycle in `ThemeToggle`; no-flash script honours `system`; unset = dark; `theme-color` meta updated live; light/dark `themeColor` in viewport
- [x] Global mobile base: `viewport-fit=cover`; all `h-screen`/`min-h-screen` → `dvh` (26 tokens / 20 files) and arbitrary `[..vh]` → `dvh` (8); `.safe-top/.safe-bottom/.pb-safe`; 16px inputs < 768px; `touch-action: manipulation`; `scroll-margin-top`; `future.hoverOnlyWhenSupported`; reduced-motion guard for fade animations
- [x] Primitives in `components/ui/`: Button (+Spinner), IconButton, Input, Textarea, Select, FormField, Badge, DifficultyChip, Skeleton(+Text/Rows), EmptyState, ErrorState, Progress, Container, LoadMore, ScrollableTabs, PageHeader, ResponsiveDialog, `cx`, barrel `index.js`. Menu/Toast deferred until a screen needs them.
- [x] `/design-system` dev-only preview (`notFound()` in production, `robots: noindex`)
- [x] Quick wins: CodeBlock Copy always visible (44px, `aria-live`), language chip readable in light mode (`.code-tools`); Sheets paginate 60 + "Show more"; the three remaining hover-only controls (note 📝 / delete ✕ / screenshot ✕) are now visible at rest (needed because `hoverOnlyWhenSupported` would otherwise hide them on touch). Theme toggle on every header lands with `PageHeader` adoption in Phase 2.
- [x] Verify: bracket-balance tripwire on all touched JSX ✓, `node --check` on pure JS ✓, CSS braces balanced ✓, icon exports unique ✓. **Not verified locally:** `next build` (no `node_modules`) — gate on the Vercel preview of the `ui-overhaul` branch.
- [x] Commit → **CHECKPOINT**

### Phase 1 CHECKPOINT — what to check on the preview
1. Dark and light both render; toggle cycles Dark → Light → System (icon changes), no flash on reload.
2. Phone: inputs no longer zoom on focus; pages fill the screen with the URL bar collapsing (`dvh`); install banner clears the home indicator.
3. Code blocks: Copy button always visible and tappable; language chip readable in light mode.
4. Sheets: a 450-problem sheet shows 60 rows + "Show 60 more".
5. `/design-system` renders in `npm run dev` (404 in production).

## Phase 2 — App shell
- [ ] Phone bottom tabs (Home · DSA · Progress · More) + More sheet
- [ ] PageHeader on all routes; container pattern
- [ ] `app/loading.js`, `app/error.js`, `app/not-found.js`
- [ ] Verify + commit → CHECKPOINT

## Phase 3 — DSA (core flow)
- [ ] Problem entity family (row / card / detail) used by Problems, Sheets, Crackify, Logic
- [ ] Study-desk detail; sticky phone action bar; single-column on phone (no `vh` panes)
- [ ] CodeBlock: visible Copy (44px), language chip, JetBrains Mono, mobile scroll
- [ ] Sheets pagination; chip tabs; difficulty chips (icon+label)
- [ ] Verify + commit → CHECKPOINT

## Phase 4 — Dashboard + Progress
- [ ] Hub hierarchy; skeletons for live cards; streak visible on phone; simplified charts
- [ ] Verify + commit → CHECKPOINT

## Phase 5 — Q&A studios
- [ ] Question entity family across SQL / Java / Spring / Maven / Company / Roles / Bookmarks; AnswerBlock icon chips
- [ ] Verify + commit → CHECKPOINT

## Phase 6 — Practice
- [ ] Quick quiz + Flashcards: keyboard, phone, states
- [ ] Switch plan: tokens, sentence case
- [ ] Prep mind-map: `dvh`, 44px controls, pinch hint
- [ ] Verify + commit → CHECKPOINT

## Phase 7 — Auth, landing, legal, system, PWA
- [ ] Auth: show/hide password, `autocomplete`, friendly errors, 16px
- [ ] Landing: remove template tells (arrows, caps eyebrows, meta strings, gradient word, fade-up everywhere); brand-coral rotating role; one proof line
- [ ] Install prompt safe-area; iOS steps; status-bar meta
- [ ] Verify + commit → CHECKPOINT

## Phase 8 — Final
- [ ] A11y pass (skip link, dialogs trap/Escape, contrast per token), perf pass
- [ ] §12 test matrix; `QA.md`; remove non-serving decoration; delete light remap layer; add §14 rules to `CLAUDE.md`
- [ ] Verify + commit → CHECKPOINT

## Decisions
- Owner approved proceeding phase by phase without answering the Phase 0 questions → defaults: **Full** mode, **Evolve**, **Inter + JetBrains Mono**, **keep light mode** (tokenised), **bottom tabs** in Phase 2, Lucide icons replace header emojis as screens are touched.
- No new npm dependencies (JetBrains Mono comes through `next/font/google`, already a dependency).
- Tinted badges/states use `color-mix()` on the token so one variable drives text, background and border in both themes.
- The old `html.light` remap layer stays as a fallback until Phase 8; new primitives use tokens only and avoid `text-white` (the remap darkens it) via `text-primary-fg`.
- `hoverOnlyWhenSupported` is on; any control that was hover-revealed must be visible at rest.

## Open questions (for the owner)
1. Can you run the app locally (`.env.local` + `npm install`)? If yes, I'll gate each phase on `npm run build`/lint locally; if not, each phase is gated on a Vercel preview you review on your phone.
2. Mode: **Full** (all screens) vs **Mobile-only** (phone experience, desktop unchanged)?
3. **Evolve** (keep dark + rocket + coral) — OK?
4. Phone nav: replace drawer-only with **bottom tabs (Home · DSA · Progress · More)** — OK?
5. Fonts: keep **Inter**; add **JetBrains Mono** for code only — OK?
6. Landing: remove the template tells (→ in buttons, ALL-CAPS eyebrow, A·B·C meta, gradient word) — OK?
7. Replace header **emojis** with the Lucide icon set for consistency — OK?
8. Keep **light mode** as a first-class theme (tokenised properly), or go dark-only?

## Needs backend change
- None.
