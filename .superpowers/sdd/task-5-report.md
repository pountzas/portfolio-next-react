# Task 5 Report — Named socials + footer sitemap

**Status:** DONE  
**Branch:** `feat/wcag-22-aa-task-5-socials-footer`  
**Base:** `6daf34f` (`feat/wcag-22-aa`)  
**Worktree:** `E:\c backup 4 10 25\code\4.Next\portfolio-next-react\.worktrees\feat-wcag-22-aa-task-5-socials-footer`

## What shipped

- Created `components/SocialLinks.tsx` mapping `Socials` to Next.js `Link` with:
  - `target="_blank"` + `rel="noopener noreferrer"`
  - `aria-label={socialProfileAriaLabel(name)}` → `Visit my ${name} profile`
  - `className` via `SOCIAL_LINK_CLASS_NAME` (`inline-flex min-h-11 min-w-11 items-center justify-center`)
  - icons wrapped in `aria-hidden="true"`
- Rebuilt `components/Footer.tsx` as in-flow `<footer>` (no `fixed` / `bottom-0`) with:
  - sitemap nav (`FOOTER_SITE_LINKS`: Home, About, Projects, Skills, Contact — PascalCase)
  - `SocialLinks`
  - copyright / credit
- `HomeAnimations.tsx` reuses `SocialLinks` in the body; no `Socials.map` duplicate; Layout still hides footer on `/`
- Helpers in `components/socialLinksA11y.mjs` for plain `node --test` (no `mock.module`)

## TDD evidence

### RED

1. `socialProfileAriaLabel` stub returned `""` → AssertionError expected `Visit my Github profile`
2. `FOOTER_SITE_LINKS` was `[]` → deepEqual failure vs Home/About/Projects/Skills/Contact
3. Source contracts failed before components existed / Footer still `fixed bottom-0` / Home still mapped Socials inline — 3 failing suites (`SocialLinks`, `Footer`, `HomeAnimations`)

### GREEN

- `node --test components/SocialLinks.a11y.test.mjs` → **5/5 pass**
- Full suite (`SocialLinks` + Layout + `_document` + globals-css) → pass
- `npx tsc --noEmit` → exit 0

## Files changed

| File | Action |
|------|--------|
| `components/SocialLinks.tsx` | create |
| `components/socialLinksA11y.mjs` | create |
| `components/SocialLinks.a11y.test.mjs` | create |
| `components/Footer.tsx` | modify |
| `components/animations/HomeAnimations.tsx` | modify |

## Out of scope (intentional)

- Task 4 nav / Header landmarks
- Task 6 headings
- Task 8 project card `link-name`

## Setup notes

- Worktree setup: `.cursor/worktrees.json` absent in REPO_ROOT and WORKTREE_PATH → setup skipped after check
- `link-worktree-folders.mjs` linked `node_modules` (and `.next` junctions) from primary repo
- No `package.json` / lockfile changes
