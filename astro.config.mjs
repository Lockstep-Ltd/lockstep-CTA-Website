// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// The Keystatic editor (/keystatic) only runs in local development, so the
// public site stays fully static with no JavaScript sent to visitors.
const isDev = process.argv.includes('dev');

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://lockstep.uk',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/keystatic') }),
    ...(isDev ? [react(), keystatic()] : []),
  ],
});
