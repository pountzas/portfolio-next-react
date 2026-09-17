# Task 8 Report — Projects card + dialog

## Status

**PASS** — implementation complete in isolated worktree; `tsc --noEmit` exit 0; Task 8 a11y tests GREEN (14/14).

## Worktree

| Field | Value |
| --- | --- |
| WORKTREE_ID | `feat-wcag-22-aa-task-8-projects` |
| WORKTREE_PATH | `E:\c backup 4 10 25\code\4.Next\portfolio-next-react\.worktrees\feat-wcag-22-aa-task-8-projects` |
| REPO_ROOT | `E:\c backup 4 10 25\code\4.Next\portfolio-next-react` |
| BRANCH | `feat/wcag-22-aa-task-8-projects` |
| HEAD_COMMIT (base) | `04cb7e86fbac77978ec70d32a676db1bc4375e1b` |
| WORKTREE_START_REF | `04cb7e86fbac77978ec70d32a676db1bc4375e1b` |
| Setup | Skipped after checking both `REPO_ROOT` and `WORKTREE_PATH` for `.cursor/worktrees.json` (none). `link-worktree-folders` linked `node_modules` (+ `.next` junctions). |

Merge-back: `/apply-worktree`. Cleanup: `/delete-worktree`.

## TDD

| Phase | Command | Result |
| --- | --- | --- |
| RED | `tdd-run.mjs --file components/ProjectCard.a11y.test.mjs --expect red` | `status: fail` (missing `openDetailsAriaLabel` / contracts) |
| GREEN | same `--expect green` | `status: pass` |

## Test summary

- `components/ProjectCard.a11y.test.mjs`: **14 pass** (helpers + ProjectCard/ProjectModal/Projects/CategorySwitcher source contracts)
- Related regression: `pageHeadings` + `SocialLinks` a11y suites still green (31 pass combined)
- `npx tsc --noEmit`: **exit 0**

## Files changed

**Primary write-set**

- `components/ProjectCard.tsx` — collapsed open `<button absolute inset-0 z-0>`; no `role="button"`; expanded `role="dialog"` + focus trap/Escape/restore; named 44px links; `alt=""` OG images; removed contributor hover overlay
- `components/ProjectModal.tsx` — `motion.button` overlay with `aria-label="Close dialog overlay"` (no `aria-hidden` click target)
- `pages/Projects.tsx` — keep sr-only Projects h1; loading `role="status"` `aria-live="polite"`; document scroll (`min-h-screen pb-16`); drop `React.FC`
- `components/projectCardA11y.mjs` — labels + Tab/Escape helpers
- `components/ProjectCard.a11y.test.mjs` — TDD contracts

**Extra write-set (tabs 24px)**

- `components/ProjectCategorySwitcher.tsx` — `gap-2`, tab `min-h-11 px-4 py-2`; drop `React.FC`

## Spec coverage

- Collapsed: `<article>` without `role="button"`; `<h2>`; open control `aria-label={Open details for …}`; links `relative z-10`
- Links: `GitHub (opens in a new tab)` / `Live demo (opens in a new tab)` + `min-h-11 min-w-11`
- Expanded: dialog + `aria-modal` + `aria-labelledby={titleId}`; close `aria-label="Close"` 44px; trap + initial close focus + Escape + restore opener
- Backdrop: named overlay button
- Page: loading live region; document scroll preferred
- Out of scope: Task 7 / Task 9 not touched

## Done-when note

Source contracts encode the nested-interactive + link-name fixes. Live MCP `/Projects` Axe clear remains a controller/browser verification step.
