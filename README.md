# Lockstep website

The public website for [Lockstep](https://lockstep.uk), a UK social venture building preventative digital tools to reduce gambling-related harm among young adults (roughly 18–25).

This is a full rebuild of the current Bubble site. The Bubble site stays live until this one is ready; then the `lockstep.uk` domain switches over.

This README is the source of truth for the project. Keep it updated as things change.

## Audiences

1. **Young adults** who may want to use Lockstep's tools
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

### Typography

System fonts for now: fast, and no third-party font requests. If Lockstep adopts a brand typeface, self-host it and update `--font-body` / `--font-heading`.

### Tone of voice

- Warm, non-judgemental and stigma-free.
- Talk about building healthy habits and staying in control.
- Never glamorise gambling. Never use gambling imagery (chips, cards, slot machines, odds).
- Avoid shaming language such as "addict".
- Don't state facts, figures or claims about the tools (e.g. "free", "private") until they're confirmed. Cite sources for statistics.

## Standards

- **Mobile-first and responsive.** Layouts are designed for phones first.
- **Accessible to WCAG 2.2 AA:** semantic HTML, sufficient contrast, keyboard navigable, visible focus states, a skip link, alt text on all images.
- **Fast:** no client-side JavaScript at present; optimise all images.
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
| Node.js | 22 or newer (see `.nvmrc`) | Required by Astro 7 |

The site is purely informational: no logins, accounts, database or stored form submissions.

## Project structure

```text
.
├── .github/workflows/deploy.yml   # Build check on PRs; deploy to Vercel on push to main
├── public/                        # Files served as-is
│   ├── favicon.svg                # PLACEHOLDER: replace with real logo mark
│   ├── og-default.png             # PLACEHOLDER: social sharing image (1200×630)
│   └── robots.txt
├── scripts/
│   └── check-launch.mjs           # Lists remaining placeholders/TODOs (npm run check:launch)
├── src/
│   ├── components/
│   │   ├── Header.astro           # Logo + main navigation
│   │   ├── Footer.astro           # Support section, footer links, legal line
│   │   ├── SupportSignpost.astro  # "Need support now?" section
│   │   └── PageHero.astro         # Page title + intro block
│   ├── data/
│   │   ├── site.ts                # Site name, contact email, navigation, SEO defaults
│   │   └── support.ts             # UK support services (VERIFY BEFORE LAUNCH)
│   ├── layouts/
│   │   └── BaseLayout.astro       # Shared page shell: <head>, SEO tags, header, footer
│   ├── pages/                     # One file per page; the file name becomes the URL
│   │   ├── index.astro            # /
│   │   ├── about.astro            # /about/
│   │   ├── how-it-works.astro     # /how-it-works/
│   │   ├── partner.astro          # /partner/
│   │   ├── contact.astro          # /contact/
│   │   └── 404.astro              # "Page not found"
│   └── styles/
│       ├── tokens.css             # Design tokens: colours, type scale, spacing
│       └── global.css             # Base styles, layout helpers, buttons
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
```

### Common edits

- **Page text:** edit the files in `src/pages/`.
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
- [ ] Add a privacy notice
- [ ] Review the site with real users and a screen reader
- [ ] Point `lockstep.uk` at Vercel and retire the Bubble site
