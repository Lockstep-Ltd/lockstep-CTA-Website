// Runs axe (WCAG 2.2 AA rules) against every page in the built site.
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// The Vercel adapter puts the static pages in dist/client (server code goes elsewhere)
const DIST = 'dist/client';
const ORIGIN = 'http://lockstep.test';

const TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

// Every page listed in the sitemap, plus pages kept out of it on purpose
const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/lockstep\.uk([^<]*)<\/loc>/g)].map((m) => m[1]);
paths.push('/404.html', '/articles/suggest/thanks/', '/articles/suggest/error/');

test.beforeEach(async ({ page }) => {
  // Serve the built files for any request to the fake origin
  await page.route(`${ORIGIN}/**`, async (route) => {
    let file = join(DIST, decodeURIComponent(new URL(route.request().url()).pathname));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (!existsSync(file)) return route.fulfill({ status: 404, body: 'Not found' });
    await route.fulfill({
      body: readFileSync(file),
      contentType: TYPES[extname(file)] ?? 'application/octet-stream',
    });
  });
  // Block anything else: the site must not depend on third parties
  await page.route(/^(?!http:\/\/lockstep\.test)/, (route) => route.abort());
});

for (const path of paths) {
  test(`${path} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
    );
    expect(summary, summary.join('\n\n')).toEqual([]);
  });
}
