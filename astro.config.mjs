// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { createHash } from 'node:crypto';
import { globSync, readdirSync, readFileSync } from 'node:fs';
import { satteri } from '@astrojs/markdown-satteri';
import { citationLinks } from './src/lib/citation-links.mjs';

// The Keystatic editor (/keystatic) only runs in local development, so the
// public site stays fully static with no JavaScript sent to visitors.
const isDev = process.argv.includes('dev');

// Article dates for the sitemap's <lastmod>, read from each article's frontmatter
// (the "updated" date if there is one, otherwise the publish date).
// Other pages have no reliable "last changed" date, so they're left without one.
const articleDir = './src/content/articles';
const articleDates = new Map(
  readdirSync(articleDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const text = readFileSync(`${articleDir}/${file}`, 'utf8');
      const date = (text.match(/^updated:\s*["']?([\d-]+)/m) ?? text.match(/^date:\s*["']?([\d-]+)/m))?.[1];
      return [`https://lockstep.uk/articles/${file.replace(/\.md$/, '')}/`, date];
    }),
);

// Hashes of the small inline scripts in src/scripts/ (each is put into its page as written,
// so Astro doesn't hash it). The Content Security Policy below lets these run and nothing
// else, and the hashes are worked out on every build, so editing a script is all it takes.
const inlineScriptHashes = globSync('./src/scripts/*.js').map(
  (file) => /** @type {`sha256-${string}`} */ (`sha256-${createHash('sha256').update(readFileSync(file, 'utf8')).digest('base64')}`),
);

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://lockstep.uk',
  trailingSlash: 'ignore',
  // Pages stay static. Only routes that opt out with `export const prerender = false`
  // (the article suggestion form handler) run as a Vercel serverless function.
  // The form handler never resizes images (every image is built ahead of time),
  // so the 19 MB sharp image library is left out to keep the function small and
  // quick to start. sharp is only loaded lazily by the unused /_image endpoint.
  // excludeFiles needs exact paths, so list the files in both folders.
  adapter: vercel({
    excludeFiles: globSync(['node_modules/sharp/**', 'node_modules/@img/**']).map((file) => `./${file}`),
  }),
  // Put the site's small stylesheet (about 5 KB) straight into each page, so the
  // browser doesn't wait for a separate CSS download before showing anything.
  build: {
    inlineStylesheets: 'always',
  },
  // Content Security Policy: each page gets a <meta> tag listing hashes of its inline
  // scripts (above) and styles, recalculated on every build, so the browser runs nothing
  // else. Everything else is limited to lockstep.uk itself. frame-ancestors can't go in a
  // <meta> tag, so it's sent as a header from vercel.json with the other security headers.
  // Not active in `npm run dev`, only in built pages.
  // In-text citations in articles, e.g. "(Aubin et al., 2012)", link to their entry in the
  // References list. Done at build time (src/lib/citation-links.mjs), so no JavaScript.
  // Sätteri is Astro's default Markdown processor; this only adds the plugin to it.
  markdown: {
    processor: satteri({ hastPlugins: [citationLinks] }),
  },
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        hashes: inlineScriptHashes,
      },
      styleDirective: {
        // The entrance animations stagger with inline style="--i: 1" attributes.
        resources: ["'self'", { resource: "'unsafe-inline'", kind: 'attribute' }],
      },
    },
  },
  env: {
    schema: {
      // Resend API key for sending article suggestions. Secret: read on the server at
      // runtime, never bundled. Without it, `npm run dev` prints suggestions to the terminal.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Where suggestions go, and the sender (must be on a domain verified in Resend).
      SUGGEST_TO_EMAIL: envField.string({ context: 'server', access: 'public', default: 'articles@lockstep.uk' }),
      SUGGEST_FROM_EMAIL: envField.string({
        context: 'server',
        access: 'public',
        default: 'Lockstep website <website@lockstep.uk>',
      }),
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/keystatic') && !/\/articles\/suggest\/(thanks|error)/.test(page),
      serialize(item) {
        const date = articleDates.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
    ...(isDev ? [react(), keystatic()] : []),
  ],
});
