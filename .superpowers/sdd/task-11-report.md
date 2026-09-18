# Task 11 — MCP regression + keyboard matrix

**Status:** DONE (verify-gate tsc type fix landed; do not merge/push until controller re-verify)  
**Date:** 2026-09-18  
**Worktree:** `E:\c backup 4 10 25\code\4.Next\portfolio-next-react\.worktrees\feat-wcag-22-aa-task-11-verify`  
**Branch:** `feat/wcag-22-aa-task-11-verify`  
**HEAD:** `1b4181217ec95c0dd75abff787f921de3874fdd4` (pre type-fix; updated after commit)  
**Base:** `feat/wcag-22-aa` @ `9ec4ea2271c3f37166e93e0362f7b256913802d7`

## Port / base URL

- Dev server: `npm run dev -- -p 3000` in the worktree
- Base URL: `http://localhost:3000`
- Setup: `.cursor/worktrees.json` absent in REPO_ROOT and WORKTREE_PATH (setup skipped after check)
- `link-worktree-folders.mjs`: linked `node_modules` (+ `.next` node_modules junctions)
- Required local `.env.local` copy from primary for GitHub GraphQL (Projects `getStaticProps`); without it `/Projects` 500s and Axe falsely reports `document-title`

## Axe matrix (axe-core 4.13.0)

Tags: `wcag2a,wcag2aa,wcag21aa,wcag22aa`

| Route | 1280×800 | 320×568 |
| --- | --- | --- |
| `/` | 0 violations | 0 violations |
| `/Projects` | 0 violations | 0 violations |
| `/Skills` | 0 violations | 0 violations |
| `/Contact` | 0 violations | 0 violations |
| `/About` | 0 violations | 0 violations |

### Frozen rules remaining

**none** — `html-has-lang`, `link-name`, `nested-interactive`, `svg-img-alt`, `scrollable-region-focusable` all 0 on every route × viewport.

### New rules found

| Rule | Where | Verdict |
| --- | --- | --- |
| `document-title` | `/Projects` only, **before** `.env.local` | **Not a product AA failure.** Page returned Next.js 500 (`GitHub GraphQL 401`). After env + cache restore, re-scan = 0 violations. |

No other new Axe violation ids on successful page renders.

Incomplete counts (typically 1) were present on several scans; not treated as blockers (Axe incomplete ≠ fail).

## Keyboard matrix

| Check | Result |
| --- | --- |
| Skip link → `#main-content` | **PASS** (focus + activate moves to `<main id="main-content">`) |
| Primary nav: Home, About, Projects, Skills, Contact | **PASS** (links present; Enter activates route) |
| Projects dialog: Tab stays in dialog | **PASS** (3 focusables: Close, GitHub, Live; wrap to Close at end) |
| Projects dialog: Esc closes | **PASS** |
| Projects dialog: focus restore to opener | **PASS** after fix (see commits); was FAIL when opener unmounted before restore |
| Skills dialog open/close (Esc) | **PASS** (restores to skill button; `aria-expanded` toggles) |
| Contact empty submit | **PASS** (Name focused; all fields `invalid`; error texts shown) |
| `prefers-reduced-motion: reduce` | **PASS** (`useReducedMotion` gates fire hover; CSS kills infinite iterations; no infinite CSS anims observed with dialog open) |
| 320 width reflow (Skills) | **PASS** spot-check (`overflowX: 0`, no two-axis scroll) |

### Concerns (non-blocking for frozen Axe exit)

- Automated `browser_press_key` Tab does not reliably move focus in this harness; Tab trap verified via focusable inventory + edge wrap logic / synthetic edge focus.
- 200% zoom not fully exercised in browser MCP (device metrics used for 320×568 only).
- Skip link uses `focus:not-sr-only`; clip stayed at `rect(0,0,0,0)` in one focus probe — functional skip works; visual reveal on focus may need a follow-up if OS Tab focus styling differs.

## Product commits

1. `1b4181217ec95c0dd75abff787f921de3874fdd4` — `fix(a11y): restore focus to project opener after Esc`  
   - `resolveFocusRestoreTarget` helper  
   - Capture `openButtonRef` before `onOpen` (opener unmounts while dialog open)  
   - Tests in `ProjectCard.a11y.test.mjs` (TDD red/green via `tdd-run.mjs`)

2. `fix(a11y): type focus restore target as focusable`  
   - Controller verify-gate failed `tsc` (`TS2339` on `restoreTarget.focus` in `ProjectCard.tsx`)  
   - JSDoc on `resolveFocusRestoreTarget` widened to `{ focus: () => void; isConnected?: boolean } | null`  
   - TDD: RED/GREEN via `tdd-run.mjs` on source-contract unit for `@returns` including `focus`  
   - Verify: `npx tsc --noEmit` exit 0; `node --test components/ProjectCard.a11y.test.mjs` 23/23 pass  

Not pushed.

## Mapping

```text
e:\c backup 4 10 25\code\4.Next\portfolio-next-react
  -> E:/c backup 4 10 25/code/4.Next/portfolio-next-react
  -> E:\c backup 4 10 25\code\4.Next\portfolio-next-react\.worktrees\feat-wcag-22-aa-task-11-verify
```

Merge-back: `/apply-worktree` · Cleanup: `/delete-worktree`
