# WCAG 2.2 AA — Task 2 Report

**Task:** Global focus-visible ring, reduced-motion CSS, scroll-padding  
**Branch:** `feat/wcag-22-aa-task-2-global-css`  
**Worktree:** `E:\c backup 4 10 25\code\4.Next\portfolio-next-react\.worktrees\feat-wcag-22-aa-task-2-global-css`  
**Base commit:** `405f6a5` (style: rewrite HomeAnimations as const arrow)

## Summary

Added global accessibility primitives to `styles/globals.css` while preserving existing `@tailwind` layers:

- `html { scroll-padding-top: 4.5rem; }` for sticky header offset (2.4.11 prep)
- `:focus-visible` white 2px outline with 2px offset (2.4.7)
- `@media (prefers-reduced-motion: reduce)` block with thicker focus ring and near-zero animation/transition durations (2.2.2 / motion risk mitigation)
- No `*:focus { outline: none; }` anti-pattern

## TDD evidence

### RED

```text
node tdd-run.mjs --file tests/globals-css.test.mjs --expect red
status: fail
firstFailure: expected html { scroll-padding-top: 4.5rem; }
```

### GREEN

```text
node tdd-run.mjs --file tests/globals-css.test.mjs --expect green
status: pass
summary: Tests passed.
```

## Test summary

| Test | Result |
|------|--------|
| html scroll-padding-top 4.5rem | pass |
| :focus-visible 2px #ffffff + 2px offset | pass |
| no *:focus outline:none kill switch | pass |
| prefers-reduced-motion block + 0.01ms animations | pass |
| @tailwind layers preserved | pass |

**Command:** `node --test tests/globals-css.test.mjs` — 4 tests, 0 failures

## Contrast check (A11y MCP)

- Foreground: `#FFFFFF`
- Background: `#16191B`
- Ratio: **17.66:1** (WCAG 2 AA and AAA pass)

## Files changed

- `styles/globals.css` — added scroll-padding, focus-visible, reduced-motion rules
- `tests/globals-css.test.mjs` — node:test seam reading globals.css

## Worktree setup

- Created project-local worktree at `.worktrees/feat-wcag-22-aa-task-2-global-css`
- Ran `link-worktree-folders.mjs` (linked `node_modules`, `.next/node_modules`)
- No `.cursor/worktrees.json` setup script found (skipped)
- Primary repo `.gitignore` updated locally with `.worktrees/` (not committed — outside Task 2 scope)

## Concerns

- Component-level `focus:outline-none` (Contact, ModalWrapper) still overrides the global ring until later tasks remove or pair them with `focus-visible` replacements.
- Manual keyboard verification on live pages deferred to Task 11.

## Merge-back

Use `/apply-worktree` from the primary checkout. Cleanup: `/delete-worktree`.
