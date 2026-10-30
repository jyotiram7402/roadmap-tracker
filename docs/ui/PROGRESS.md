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
- [ ] **CHECKPOINT** — awaiting owner

## Phase 1 — Foundations
- [ ] Semantic tokens (light + dark) in `globals.css` → `tailwind.config.mjs` `theme.extend`
- [ ] JetBrains Mono via `next/font/google` for code only
- [ ] Theme: System / Light / Dark, no flash
- [ ] Global mobile base: `viewport-fit=cover`, `dvh`, safe-area utilities, 16px inputs, `future.hoverOnlyWhenSupported`
- [ ] Primitives in `components/ui/` (Button, IconButton, Input, Textarea, Select, FormField, Chips/ScrollableTabs, ResponsiveDialog, Menu, Toast, Skeleton, EmptyState, ErrorState, Badge, DifficultyChip, Progress, PageHeader, Container, LoadMore)
- [ ] `/design-system` dev-only preview
- [ ] Quick wins: always-visible Copy, theme toggle on every header, Sheets show-more
- [ ] Verify + commit → CHECKPOINT

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
- Evolve, not refresh (pending approval).
- No new npm dependencies planned.

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
