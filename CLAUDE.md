# Lockstep website: notes for Claude

The public marketing site for Lockstep, a UK app that helps people reduce gambling. Astro 7, plain CSS, static output on Vercel.
**[README.md](README.md) is the source of truth.** Read it before making changes, and keep it updated when something changes.
This file covers only the rules that are easy to break.

## Hard rules

- **Brand artwork is untouchable.** Never redraw, recolour, retype or trace the logo, icon or lock illustration in `src/assets/brand/`. Only resizing is allowed. On dark backgrounds the logo sits on a cream tile.
- **Copy comes from Andrew.** Site wording is taken from the original lockstep.uk word for word. Don't rewrite, "improve" or invent copy, claims or statistics.
  - Tone edits need Andrew's approval and get recorded with a date in a comment, as in `src/data/product.ts`.
  - Placeholder text must be marked `PLACEHOLDER` or `TODO`.
- **Legal text is verbatim.** Don't edit wording in `src/content/legal/`. Flag problems instead.
- **Fixed URLs.** The Lockstep app links to `/privacy_policy`, `/terms_of_use`, `/community_guidelines`, `/affiliate_disclosure` and `/articles`, with underscores. Never rename or remove them without a redirect in `vercel.json` and telling the user, so the app's links change in the same release.
- **Almost no client-side JavaScript.** The only script is the small inline scroll-reveal observer in `BaseLayout.astro` (approved by Andrew, 2026-10-11). Don't add libraries or other scripts without asking. CSS does all animating, always inside `prefers-reduced-motion: no-preference`. Keystatic and React run in `npm run dev` only (see `astro.config.mjs`). Keep them out of the production build.
- **Privacy.** No analytics, cookies, trackers or third-party requests (fonts are self-hosted). Adding any needs a UK GDPR consent banner first, and the user's sign-off.
- **Tone.** Never glamorise gambling or use gambling imagery. Avoid labelling people (e.g. "addict", "gamblers"). Every page keeps the "Need support now?" footer section.
- **Accessibility.** WCAG 2.2 AA, with tap targets of at least 24px and visible focus states. The brand palette passes AAA on cream, so don't introduce new colours outside `src/styles/tokens.css`.

## Before you say it's done

```sh
npm run build        # runs astro check; must show 0 errors, 0 warnings
npm run test:a11y    # axe on every page, at 375px and 1280px; read the failure list, not just the last line
npm run check:launch # lists remaining PLACEHOLDER/TODO items (not a pass/fail gate yet)
```

For visual changes, use the `playwright-cli` skill to screenshot the affected pages at 375px and 1280px and look at them.

## Workflow

- Branch from `main` and open a pull request. Merging to `main` deploys to production via GitHub Actions. Never push to `main` directly.
- Commit only when the user asks.
- More than one Claude session may work on Lockstep. The app lives in a separate repo (`/Users/andrewb/Projects/LockStep`). Coordinate before changing anything the app depends on (the URLs above).

## Tools in this repo

- **Skills** (`.claude/skills/`):
  - `taste-skill`: design direction. Read its Lockstep overrides block first.
  - `web-design-guidelines`: UI audit.
  - `playwright-cli`: browser automation. Use `video-start`/`video-stop` to record and review animations.
  - `frontend-design`: Anthropic's visual design guidance. The brand rules above win where they differ.
  - `ui-ux-pro-max`: searchable UI/UX, motion and chart guidance (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --domain ux`). Ignore its GSAP/JavaScript snippets and Google Fonts imports: animation here is CSS (plus the one reveal script) and fonts are self-hosted.
- **MCP servers** (`.mcp.json`):
  - `astro-docs`: use it for Astro 7 APIs instead of relying on memory.
  - `vercel`: deployments and build logs; sign in via `/mcp`.
- **Keystatic:** article editor at `localhost:4321/keystatic` during `npm run dev`. Saving an article strips YAML `#` comments from its frontmatter.
