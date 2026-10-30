# CrackDev — UI AUDIT (Phase 0)

**Method & limits.** Playwright MCP cannot reach the production domain from this environment (`ERR_CERT_AUTHORITY_INVALID`), and the app cannot run locally (no `node_modules`, no `.env.local`). Live screenshots were therefore possible only for the **public pages** (landing, login, signup) via the in-app browser at ~800px and 375px. All **gated screens were audited from code** using the skill's §13 red-flag list plus a scripted scan. Numbers below are counts from that scan.

Severity: **P0** broken/unusable · **P1** wrong/confusing · **P2** polish.

## Global (affects every screen)
| # | Sev | Issue | Evidence / file | Fix |
|---|---|---|---|---|
| G1 | P1 | Inputs render at 14px (`text-sm`) → iOS zooms on focus | all `<input>`/`<textarea>` in `app/**`, `components/*Studio*.js`, `StudyNotes.js`, auth pages | 16px on phones (`text-base md:text-sm`) via Input primitive |
| G2 | P1 | `h-screen` / `min-h-screen` / `100vh` ×26 → content clipped by mobile browser bars | dashboard sidebar `lg:h-screen`, every page root `min-h-screen` | `min-h-dvh` / `h-dvh` |
| G3 | P1 | No `viewport-fit=cover`, zero `safe-area` usage; 2 fixed-bottom elements | `app/layout.js` viewport; `PwaInstaller.js` banner; mind-map toolbar | add viewport-fit; `pb-[env(safe-area-inset-bottom)]` on fixed bars/sheets |
| G4 | P1 | Hover-only actions (`opacity-0 group-hover`) ×4 — invisible on touch | `CodeBlock.js` **Copy button**; card arrows | always-visible controls; hover only enhances |
| G5 | P1 | No route-level `loading.js` / `error.js` / `not-found.js` (0 found) | `app/` | add branded skeleton loading, error with retry, 404 |
| G6 | P1 | Design tokens not enforced: **211** raw `-[#hex]` + **725** palette classes; light theme is an `!important` remap layer | everywhere; `globals.css` light block | semantic tokens via Tailwind `theme.extend` → migrate per component (Phase 1+) |
| G7 | P2 | Iconography mixes Lucide + `react-icons` + **165** emoji usages (🧩 ⚡ 🧠 📚 …) | tool-page headers, tabs, footers | one Lucide set; emojis only where they are content |
| G8 | P2 | Generic "SaaS card kit": identical rounded cards, same shadow, hover-lift on all | `app/dashboard/page.js` Hub cards, section cards | vary hierarchy; lift only on primary cards |
| G9 | P2 | 3 ad-hoc `z-[…]`; 18 `whitespace-nowrap` (verify none on user content; mind-map labels are intentional) | `PwaInstaller` `z-[120]`, TrackSwitcher `z-[100]`, mm-labels | z-index scale tokens; `min-w-0` + truncate |
| G10 | P2 | `hidden sm:|md:|lg:` ×22 — some hide features on phones instead of adapting (clock OK; check filters/metadata) | headers, QuestionTable attempts column | adapt (stack/sheet) rather than hide where it's data |
| G11 | P2 | Theme has Dark/Light only — no **System** option | `ThemeToggle.js` | System / Light / Dark |
| G12 | P2 | Most tool headers lack the theme toggle (only landing, dashboard, switch, prep-roadmap, company-qa have it) | `/dsa /sql /java-qa /springboot-qa /maven /roles /quick /flashcards /bookmarks` | unified PageHeader primitive |

## Landing `/` (live-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| L1 | P2 | Template tells: `→` appended to CTA text (×5), ALL-CAPS eyebrow "PRACTICE THE STACK…" (12 uppercase-tracking labels app-wide), `A · B · C` meta strings, gradient-colored headline word, `anim-fade-up` on every section (×7) | remove arrows from labels, sentence-case eyebrow, one orchestrated hero motion, brand-coral accent instead of gradient word |
| L2 | P2 | Logo cloud marquee runs forever (motion without purpose); fine but respect reduced-motion (already) | keep, slower; pause on hover |
| L3 | P2 | Stats row "1,600+ / 230+ / 6 / 100%" — big-number hero by default | keep one honest proof line; move counts into the tracks |
| L4 | P1 | Sign-up pill is `bg-white` — on light theme it blends into the nav (patched with a light-mode border) | token-based secondary button |

## Auth `/login /signup /forgot-password /auth/*` (live-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| A1 | P1 | No show/hide password; `autocomplete` not set (`email`, `current-password`, `new-password`) → password managers unreliable | add both |
| A2 | P1 | Inputs 14px → iOS zoom (G1) | 16px |
| A3 | P2 | Error text is generic ("Failed to fetch") — no "how to fix" (e.g. network/retry) | friendlier error + retry |
| A4 | P2 | "Sign up" link font-semibold inline; card uses raw hex | tokens |

## Dashboard `/dashboard` (code-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| D1 | P1 | Phone navigation = hidden drawer only; 12 destinations behind a hamburger; no bottom tabs; create/primary action not within thumb reach | bottom tab bar (Dashboard · DSA · Progress · More) on phones; drawer → "More" sheet |
| D2 | P1 | `DsaActivityCard` / stat cards render **nothing** until mounted → layout shift | content-shaped skeletons |
| D3 | P2 | Hub cards identical (G8); streak chip duplicates header streak | hierarchy: hero → today's practice → quick actions |
| D4 | P2 | Header streak chip hidden on `<lg` (`hidden lg:inline-flex`) — the most motivating number hides on phones | compact chip visible on phone |
| D5 | P2 | Sidebar user block: sign-out is icon-only but has aria-label ✓; avatar is a letter tile (OK) | — |

## DSA `/dsa` (code-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| S1 | P1 | **Sheets** tab renders a whole sheet (400–440 rows) at once | reuse Problems' "show more"/pagination (QuestionTable) |
| S2 | P1 | `CodeBlock` copy button hover-only (G4); language label tiny; no mobile scroll affordance | always-visible Copy, 44px target, label chip |
| S3 | P1 | Problem detail = two `lg:max-h-[75vh] overflow-y-auto` panes → double scrollbars, `vh` on phone | single flow on phone; sticky action bar (Mark done / Notes) |
| S4 | P2 | Tabs row (Problems · Sheets · Crackify · Logic) wraps on narrow phones (`flex-wrap`) | one scrollable chip row |
| S5 | P2 | Four surfaces (Problems/Sheets/Crackify/Logic) render problems with 3 different row/detail components | one **Problem** entity family (row / card / detail) |
| S6 | P2 | Difficulty shown as colored text only in table (color-only status) | icon/label chip |
| S7 | P2 | StudyNotes editor: 9 accordions + MySolution + solution = long page; no sticky "save" on phone | sticky footer on phone; collapse by default (done) |

## Q&A studios `/sql /java-qa /springboot-qa /maven /company-qa /roles /bookmarks` (code-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| Q1 | P2 | Three different list renderers (QaStudio, SqlStudio→QuestionTable, company list) | one **Question** entity family |
| Q2 | P2 | Headers inconsistent (emoji titles, no theme toggle, varying widths `max-w-5xl` vs `7xl`) | PageHeader + container primitive |
| Q3 | P2 | Answer blocks use emoji labels "💡 Real-life example / 📌 Interview note" | icon + label chips |

## Practice `/quick /flashcards /switch /prep-roadmap` (code-audited)
| # | Sev | Issue | Fix |
|---|---|---|---|
| P1 | P1 | Quiz/flashcards: no keyboard support documented (Enter/Space/arrows), options are buttons ✓ | add key handlers + focus ring |
| P2 | P2 | Mind-map toolbar + canvas: `height: min(72vh, 720px)` uses `vh`; zoom buttons 28px (<44px) | `dvh`; 44px controls; pinch hint |
| P3 | P2 | Switch-plan AI pitch uses gradient wash + "AI-POWERED · PREMIUM" caps eyebrow (tell) | sentence case, tokenized surface |

## PWA
| # | Sev | Issue | Fix |
|---|---|---|---|
| W1 | P1 | Install banner fixed bottom with no safe-area; text colors hard-coded light on dark toast (fine) | safe-area padding; dismiss persists per session ✓ |
| W2 | P2 | Manifest OK (id, start_url, standalone, icons any+maskable). No `apple-mobile-web-app-status-bar-style` tuning for dark/light | review in Phase 7 |

## Accessibility (code-level)
- ✓ `focus-visible` ring defined globally; icon buttons have `aria-label` (scan: 0 missing).
- ✗ No skip link; no `lang`-aware landmarks audit; dialogs (TrackSwitcher modal, image lightbox) — focus trap/Escape need verification.
- ✗ Color-only difficulty in table (S6). Contrast: accent 300/400 text on light was patched by darkening; verify AA per token in Phase 1.

## Performance (code-level)
- ✓ Sheets/Crackify/solution data lazy-loaded; Problems list paginated (200 + show more).
- ✗ Sheets tab unpaginated (S1). Prism loads 9 grammars on first code block (acceptable; consider per-language).
- ✗ Every page is a Client Component (`"use client"`), including static legal pages — fine for an app, but landing/legal could be server-rendered. Record only; low priority.

## Top 10 (for the checkpoint)
1. G1 14px inputs (iOS zoom) · 2. G2 `vh`/`h-screen` ×26 · 3. G3 no safe-area/viewport-fit · 4. G4/S2 hover-only Copy · 5. G5 no loading/error/404 routes · 6. G6 token debt + brittle light remap · 7. D1 phone nav is drawer-only · 8. S1 Sheets unpaginated · 9. L1 landing template tells · 10. G7/G8 emoji mix + identical card kit.
