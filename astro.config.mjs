// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Used for canonical URLs, Open Graph tags and the sitemap.
  site: 'https://lockstep.uk',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
