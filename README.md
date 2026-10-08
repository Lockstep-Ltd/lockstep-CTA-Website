# Lockstep website

The public website for [Lockstep](https://lockstep.uk), a UK-based mobile app that helps people reduce gambling by redirecting urges towards healthier, real-world alternatives. The app is in early access on the [App Store](https://apps.apple.com/app/id6772143111).

This is a full rebuild of the current Bubble site. The Bubble site stays live until this one is ready; then the `lockstep.uk` domain switches over.

This README is the source of truth for the project. Keep it updated as things change.

## Positioning

The site keeps the live lockstep.uk messaging: an app for anyone who wants to reduce gambling ("Regain control. Redirect the urge."). Decided by Andrew on 2026-10-06, replacing the earlier brief's "preventative tools for 18–25s" framing. Site copy comes from the original site word for word, with three approved tone edits recorded in [src/data/product.ts](src/data/product.ts).

## Audiences

1. **People who want to reduce gambling** and may use the Lockstep app
2. **Partners**: universities, charities and support services
3. **Funders and supporters**, e.g. social enterprise funders such as UnLtd

## Brand

### Colours

| Role | Colour | Hex | CSS variable |
|---|---|---|---|
| Primary | Deep Forest Green | `#1E3D36` | `--color-green` |
| Background | Soft Cream / Beige | `#FBF6E8` | `--color-cream` |
| Secondary green | Muted Emerald | `#2F5C50` | `--color-emerald` |
| Text / neutral | Charcoal Grey | `#374151` | `--color-charcoal` |
| White | White | `#FFFFFF` | `--color-white` |

All text/background pairings used on the site pass WCAG AAA contrast (7:1 or higher). For example, green on cream is 10.95:1. Tokens live in [src/styles/tokens.css](src/styles/tokens.css).

### Logo

The logo (a padlock with steps, plus the "Lockstep" wordmark) and the app icon are Lockstep's original artwork, kept in [src/assets/brand/](src/assets/brand/README.md). **Never redraw, recolour or retype them.** Only resizing is allowed. On dark green areas the logo sits on a cream tile instead of being recoloured. The favicon, Apple touch icon and social sharing images are all resized from the original icon.

### Typography

- **Headings:** Newsreader (serif). **Body and interface text:** Inter. These are Lockstep's brand fonts, carried over from the original site. Both are open-licensed (OFL).
- Self-hosted through `@fontsource-variable` packages, so they're bundled at build time with no third-party font requests.
- Change them via `--font-heading` / `--font-body` in `tokens.css`.

### Motion

- **CSS only.** No JavaScript is involved.
- **Page fades:** the browser's cross-document View Transitions.
- **Scroll effects:** CSS scroll-driven animations for content revealing as you scroll, the staircase growing, the header edge and the article reading-progress bar.
- **Hero:** the stair line draws into the hero logo when the page loads.
- **Reduced motion:** everything is switched off when the visitor asks for reduced motion.
- **Unsupported browsers:** they just show the content.
- **Classes:** use `.enter` (with `--i` for stagger) for load-in and `.reveal` for on-scroll.

### Tone of voice

- Warm, non-judgemental and stigma-free.
- Talk about building healthy habits and staying in control.
- Never glamorise gambling. Never use gambling imagery (chips, cards, slot machines, odds).
- Avoid shaming language such as "addict".
- Don't state facts, figures or claims about the tools (e.g. "free", "private") until they're confirmed. Cite sources for statistics.

## Standards

- **Mobile-first and responsive.** Layouts are designed for phones first.
- **Accessible to WCAG 2.2 AA:** semantic HTML, sufficient contrast, keyboard navigable, visible focus states, a skip link, alt text on all images.
- **Fast:** no client-side JavaScript at present (animations are pure CSS); optimise all images.
- **Privacy:** no analytics, cookies or third-party trackers. If any are added later, they need a UK GDPR-compliant consent banner first.
- **Secrets:** never commit secrets, API keys or personal data. Use environment variables; `.env` files are ignored by Git (see `.env.example`).
- **Support signposting:** every page footer includes "Need support now?" with UK support services. These details must be checked against official sources before launch.

## Tech stack

| Area | Choice | Why |
|---|---|---|
| Framework | [Astro](https://astro.build) 7 | Builds plain, fast HTML pages; no JavaScript is sent to visitors unless we add it |
| Styling | Plain CSS with custom properties (design tokens) | No heavy UI framework; brand values defined in one place |
| Language | TypeScript (for small data files) | Catches mistakes when the site is built |
| SEO | `@astrojs/sitemap`, Open Graph tags, `robots.txt` | Search engines and link previews |
| Hosting | [Vercel](https://vercel.com) | Chosen by the founder. Note: Vercel's free Hobby plan is for non-commercial use, so a Pro plan may be needed for Lockstep Ltd |
| Deployment | GitHub Actions → Vercel | Pushes to `main` deploy automatically; pull requests are build-checked |
| Fonts | Newsreader + Inter via `@fontsource` | Brand fonts, self-hosted (no requests to Google) |
| Content | Astro content collections (Markdown) | Articles and legal pages are plain text files |
| Article editor | [Keystatic](https://keystatic.com) (local only, uses React) | Edit articles in the browser at `/keystatic` during `npm run dev`; never shipped to visitors |
| Social images | `astro-og-canvas` | Sharing images generated at build time |
| Testing | Playwright + axe | WCAG 2.2 AA checks on every page, run on every pull request |
| Node.js | 22 or newer (see `.nvmrc`) | Required by Astro 7 |

The site is purely informational: no logins, accounts, database or stored form submissions. The old site's "Suggest an article" form is replaced by an email link for now.

## Project structure

```text
.
├── .github/workflows/deploy.yml   # Build check on PRs; deploy to Vercel on push to main
├── public/                        # Files served as-is
│   ├── favicon-32.png             # Resized from the original app icon
│   ├── apple-touch-icon.png       # Resized from the original app icon
│   └── robots.txt
├── scripts/
│   └── check-launch.mjs           # Lists remaining placeholders/TODOs (npm run check:launch)
├── src/
│   ├── components/
│   │   ├── Header.astro           # Logo + main navigation
│   │   ├── Footer.astro           # Support section, footer links, legal line
│   │   ├── Staircase.astro        # The four steps, laid out as rising stairs
│   │   ├── ArticleCard.astro      # Article preview (feature or row style)
│   │   ├── Figure.astro           # Image slot: placeholder until a photo is supplied
│   │   ├── SupportSignpost.astro  # "Need support now?" section
│   │   └── PageHero.astro         # Page title + intro block
│   ├── assets/brand/              # Original logo, icon and lock artwork (do not modify)
│   ├── assets/images/             # Photos and screenshots, optimised at build
│   ├── content/articles/          # One Markdown file per article
│   ├── content/legal/             # Privacy policy, terms, community guidelines, affiliate disclosure
│   ├── content.config.ts          # Article fields (title, date, author, ...)
│   ├── lib/articles.ts            # Article sorting, date formatting, URLs
│   ├── data/
│   │   ├── site.ts                # Site name, contact email, navigation, SEO defaults
│   │   ├── product.ts             # App copy: tagline, steps, principles, ethics, status
│   │   └── support.ts             # UK support services (VERIFY BEFORE LAUNCH)
│   ├── layouts/
│   │   └── BaseLayout.astro       # Shared page shell: <head>, SEO tags, header, footer
│   ├── pages/                     # One file per page; the file name becomes the URL
│   │   ├── index.astro            # /
│   │   ├── about.astro            # /about/
│   │   ├── how-it-works.astro     # /how-it-works/
│   │   ├── articles/index.astro   # /articles/
│   │   ├── articles/[slug].astro  # /articles/<file-name>/
│   │   ├── [legal].astro          # /privacy_policy, /terms_of_use, /community_guidelines, /affiliate_disclosure
│   │   ├── og/[...route].ts       # Social sharing images, generated at build (astro-og-canvas)
│   │   ├── partner.astro          # /partner/
│   │   ├── contact.astro          # /contact/
│   │   └── 404.astro              # "Page not found"
│   └── styles/
│       ├── tokens.css             # Design tokens: colours, type scale, spacing
│       └── global.css             # Base styles, layout helpers, buttons
├── tests/a11y.spec.ts             # Automated accessibility checks (axe + Playwright)
├── keystatic.config.ts            # Article editor fields (dev only, /keystatic)
├── playwright.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Working on the site

You need [Node.js](https://nodejs.org) 22 or newer.

```sh
npm install          # first time only: downloads the tools the site needs
npm run dev          # live preview at http://localhost:4321, updates as you edit
npm run build        # checks the code and builds the final site into dist/
npm run preview      # previews the built site
npm run check:launch # lists every placeholder and unverified item still left
npm run test:a11y    # WCAG 2.2 AA checks on every page (run after a build)
```

### Editing articles in the browser (Keystatic)

Run `npm run dev` and open http://localhost:4321/keystatic. You can write, edit and preview articles there. Changes are saved straight to the Markdown files in `src/content/articles/`, ready to commit.

The editor only runs locally, so the live site stays fully static. Putting the editor online (GitHub mode) needs a server adapter and a GitHub app, so it's left for later.

Keystatic rewrites a file's frontmatter when you save it. Any `# TODO` comments in that file will be removed, so note them elsewhere first.

### Legal pages (fixed URLs)

- **Source:** the privacy policy, terms of use, community guidelines and affiliate disclosure are Markdown files in `src/content/legal/`, migrated word for word from the old site.
- **Fixed URLs:** the Lockstep app links to these exact paths, with underscores: `/privacy_policy`, `/terms_of_use`, `/community_guidelines` and `/affiliate_disclosure`. It also links to `/articles`.
- **Before renaming or removing one:** update the app's links in the same release, or add a redirect.

### Old Bubble links

[vercel.json](vercel.json) redirects the old site's addresses so saved and shared links keep working:

- **Home page sections:** `/?section=…` links go to the matching page. `philosophy` goes to `/about/#philosophy` and `status` goes to `/how-it-works/#status`.
- **Old pages:** `/index` and `/mobile_index` go to the home page.
- **Legal pages:** these keep their exact old URLs, so they need no redirects.

These rules only run on Vercel, not with `npm run dev`.

### Images

Put photos and screenshots in `src/assets/images/` and pass them to `<Figure src={...} alt="...">`. It shows a placeholder until an image is supplied, then serves optimised AVIF/WebP at the right size. See `src/assets/images/README.md`.

### Accessibility tests

- `tests/a11y.spec.ts` runs axe against every page in the sitemap, plus the 404 page, at phone and desktop widths.
- It serves the built `dist/` files directly to the browser, so no web server is needed, and it blocks any third-party request.
- It uses your installed Google Chrome.
- It runs on every pull request; a failure lists the rule and the element.

### Common edits

- **Page text:** edit the files in `src/pages/`. App copy shared across pages (steps, principles and so on) lives in `src/data/product.ts`.
- **Articles:** add a Markdown file to `src/content/articles/`. Copy the frontmatter from an existing article. The file name becomes the URL, and the newest article is featured automatically. Set `draft: true` to hide one.
- **Navigation or contact email:** `src/data/site.ts`.
- **Support services:** `src/data/support.ts`. Set `verified: true` once each entry is checked.
- **Colours, fonts, spacing:** `src/styles/tokens.css`.

### Placeholders

Anything not yet supplied is marked `PLACEHOLDER`, `TODO` or `VERIFY BEFORE LAUNCH`. Placeholder text appears on the page with an orange dashed outline so it can't be missed. Run `npm run check:launch` to list them all.

## Workflow

- Work on a branch (e.g. `setup/foundations`), never directly on `main`.
- Make small, logical commits with clear messages (e.g. "Add base layout and navigation").
- Open a pull request into `main`. GitHub checks the site builds before merging.
- Merging into `main` deploys to Vercel automatically.

## Deployment

Deploys run from [.github/workflows/deploy.yml](.github/workflows/deploy.yml). One-time setup:

1. Create a Vercel project for this repo (Framework preset: Astro).
2. In the Vercel project settings, **disable automatic Git deployments**, so the GitHub workflow is the only thing deploying (otherwise every push deploys twice).
3. Run `npx vercel link` locally, then copy `orgId` and `projectId` from `.vercel/project.json` (this folder is ignored by Git).
4. Create a Vercel access token (Vercel → Account Settings → Tokens).
5. In GitHub → repo Settings → Secrets and variables → Actions, add:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

The custom domain (`lockstep.uk`) is **not** configured yet. Do that only when the site is ready to replace the Bubble site.

## Launch checklist

- [ ] Replace all placeholder copy, images, logo, favicon and sharing image (`npm run check:launch` shows 0 items)
- [ ] Verify every support service name, number and link against official sources
- [ ] Confirm contact email, company number and registered address
- [ ] Update the privacy policy once the site is off Bubble: it still says the website runs on Bubble and mentions analytics (Andrew to update at the domain switch)
- [ ] Review the site with real users and a screen reader
- [ ] Point `lockstep.uk` at Vercel and retire the Bubble site
