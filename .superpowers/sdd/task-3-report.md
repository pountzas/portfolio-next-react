# Task 3 Report — Layout landmarks, skip link, unclip, reduced page transitions

**Status:** DONE  
**Date:** 2026-09-17  
**Worker:** Worktree Worker C

## Worktree

| Field | Value |
| --- | --- |
| WORKTREE_ID | `wcag-t3-a5de6704` |
| WORKTREE_PATH | `C:\Users\nik\.cursor\worktrees\wcag-t3-a5de6704` |
| REPO_ROOT | `E:/c backup 4 10 25/code/4.Next/portfolio-next-react` |
| Branch | `feat/wcag-22-aa-task-3-layout` |
| HEAD_COMMIT (start) | `405f6a59993c08a1037f3f578b05646707dd532b` |
| WORKTREE_START_REF | `HEAD` |
| Setup | Skipped after checking `REPO_ROOT` and `WORKTREE_PATH` for `.cursor/worktrees.json` (neither present). `link-worktree-folders.mjs` linked `node_modules` (+ `.next` junctions). |

## Commits

- `e96a359` — feat(a11y): add Layout skip link, unclip scroll, reduced motion
- `PENDING_GATE_FIX` — test(a11y): run Layout a11y suite under plain node --test

## TDD evidence

Runner:
`npx --yes tsx --test --experimental-test-module-mocks components/Layout.a11y.test.mjs`
via `tdd-run.mjs --expect red|green`.

| Slice | RED | GREEN |
| --- | --- | --- |
| Skip link + `#main-content` | fail: `expected a focusable element` | pass |
| Root `min-h-screen` / no clip | fail: class still included `h-screen` | pass (token-aware class assert) |
| Footer `/` hidden / other shown | existing behavior locked; suite pass | pass |
| Reduced motion → duration `0` | fail: `Expected values to be strictly equal` (was `0.3`) | pass |

Final suite: **5 pass / 0 fail**. `npx tsc --noEmit` exit 0.

## Files changed

- `components/Layout.tsx`
- `components/Layout.a11y.test.mjs`

## Implementation notes

- First focusable: skip link `href="#main-content"` with `sr-only focus:not-sr-only focus:absolute focus:z-[200]` (+ visible-on-focus styles).
- Root wrapper: `min-h-screen bg-tertiary` (removed `h-screen overflow-y-clip scrollbar-hide`).
- `motion.main` keeps `id="main-content"` and `tabIndex={-1}`.
- `useReducedMotion()` from `framer-motion`: page/footer transition `duration = 0` when true.
- `showFooter = router.pathname !== "/"` unchanged.
- Dropped `React.FC` (React 19 plain function component).

## Concerns / MCP

- A11y MCP not run (app not started for this slice; optional after HTML change).
- Header/Footer landmarks (`<header>` / `<footer>` / `<nav>`) remain Task 4–5 territory; Layout still wraps mocked/`div`-based chrome.
- Footer still `fixed` in `Footer.tsx` (locked decision says in-flow later); Task 3 did not change Footer.
- ~~Tests use Node experimental `mock.module` + `tsx`; not part of `package.json` scripts.~~ Fixed — see gate fix below.

## Merge / cleanup

- Merge-back: `/apply-worktree`
- Cleanup: `/delete-worktree`

---

## Verify-gate fix (2026-09-18)

**Problem:** Gate ran plain `node --test components/Layout.a11y.test.mjs` (no `--experimental-test-module-mocks`). Suite crashed with `TypeError: mock.module is not a function`.

**Fix:** Rewrote tests to avoid `mock.module` / RTL. Extracted pure helpers to `components/layoutA11y.mjs`; `Layout.tsx` imports them. Suite covers helper behavior + `Layout.tsx` source contracts (skip link order, `#main-content`, `tabIndex={-1}`, `min-h-screen` / no clip).

### TDD RED / GREEN (gate harness)

Command: `node --test components/Layout.a11y.test.mjs` via `tdd-run.mjs --expect red|green --cmd "..."`.

| Expect | Result |
| --- | --- |
| RED | `fail` — `showFooter("/")` was `true` (expected `false`); `pageTransitionDuration(true)` was `0.3` (expected `0`); Layout not yet wired to helpers |
| GREEN | `pass` — `{"ok":true,"status":"pass","expect":"green","exitCode":0}` — **7 pass / 0 fail** |

Also verified: `npx tsc --noEmit` exit 0; plain `node --test components/Layout.a11y.test.mjs` exit 0.

### Files changed (gate fix)

- `components/Layout.a11y.test.mjs`
- `components/Layout.tsx`
- `components/layoutA11y.mjs`

### Commit SHA

`PENDING_GATE_FIX` (replaced after commit)
