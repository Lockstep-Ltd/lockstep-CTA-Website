// Automated accessibility checks. Run after a build: `npm run build && npm run test:a11y`.
// Pages are served straight from dist/client/ inside the browser (see tests/a11y.spec.ts),
// so no web server is needed. Uses the installed Google Chrome.
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    channel: 'chrome',
    baseURL: 'http://lockstep.test',
    // Animations off, so nothing is mid-fade when contrast is checked
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'mobile', use: { viewport: { width: 375, height: 812 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
  ],
});
