// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import { readdirSync, readFileSync } from 'node:fs';

// The Keystatic editor (/keystatic) only runs in local development, so the
// public site stays fully static with no JavaScript sent to visitors.
const isDev = process.argv.includes('dev');

// Article dates for the sitemap's <lastmod>, read from each article's frontmatter.
// Other pages have no reliable "last changed" date, so they're left without one.
const articleDir = './src/content/articles';
const articleDates = new Map(
  readdirSync(articleDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const date = readFileSync(`${articleDir}/${file}`, 'utf8').match(/^date:\s*["']?([\d-]+)/m)?.[1];
      return [`https://lockstep.uk/articles/${file.replace(/\.md$/, '')}/`, date];
    }),
);

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://lockstep.uk',
  trailingSlash: 'ignore',
  // Pages stay static. Only routes that opt out with `export const prerender = false`
  // (the article suggestion form handler) run as a Vercel serverless function.
  adapter: vercel(),
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
