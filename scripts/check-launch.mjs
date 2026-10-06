// Lists everything that still needs attention before launch:
// placeholders, unverified support details and TODOs.
// Run with: npm run check:launch
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MARKERS = /PLACEHOLDER|VERIFY BEFORE LAUNCH|VERIFY-BEFORE-LAUNCH|TODO|verified: false/;
const ROOTS = ['src', 'public'];
const TEXT_FILES = /\.(astro|ts|js|mjs|css|svg|txt|md)$/;

const hits = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (TEXT_FILES.test(name)) {
      readFileSync(path, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (MARKERS.test(line)) hits.push(`${path}:${i + 1}  ${line.trim()}`);
        });
    }
  }
};
ROOTS.forEach(walk);

// Exclude the shared placeholder styles, which are meant to stay.
const remaining = hits.filter((h) => !h.startsWith(join('src', 'styles')));

if (remaining.length === 0) {
  console.log('✓ No placeholders or unverified items left.');
} else {
  console.log(`${remaining.length} item(s) to resolve before launch:\n`);
  console.log(remaining.join('\n'));
  process.exitCode = 1;
}
