// Links in-text citations such as "(Aubin et al., 2012)" to the matching entry in the
// article's References list (#ref-1, #ref-2, ...). Runs at build time on article Markdown, as a
// Sätteri hast plugin (see markdown.processor in astro.config.mjs).
//
// A citation segment matches a reference when the reference's first word (usually the first
// author's surname, or an organisation such as "Gambling") appears in it and the years match.
// Anything ambiguous or unmatched is left as plain text, so nothing links to the wrong source.

const YEAR = /\b(?:19|20)\d{2}\b/;
const CITATION = /\(([^()]*\b(?:19|20)\d{2}[a-z]?)\)/g;
const SKIP = new Set(['a', 'h1', 'h2', 'h3', 'h4', 'code', 'pre']);

/** First word and first year of each reference, e.g. { word: "Aubin", year: "2012" }. */
function referenceKeys(references) {
  return references.map((ref) => ({
    word: ref.citation.match(/^[\p{L}’'-]+/u)?.[0],
    year: ref.citation.match(YEAR)?.[0],
  }));
}

function findReference(segment, keys) {
  const year = segment.match(YEAR)?.[0];
  if (!year) return -1;
  const hits = keys.flatMap((key, i) =>
    key.word && key.year === year && new RegExp(`(^|[^\\p{L}])${key.word}([^\\p{L}]|$)`, 'u').test(segment) ? [i] : [],
  );
  return hits.length === 1 ? hits[0] : -1;
}

/** Splits one text node into text and links, or returns null if nothing matched. */
function linkCitations(value, keys) {
  const out = [];
  let last = 0;
  let linked = false;
  for (const match of value.matchAll(CITATION)) {
    const parts = match[1].split(/(;\s*)/);
    const children = [];
    let any = false;
    for (const part of parts) {
      const index = /^;\s*$/.test(part) ? -1 : findReference(part, keys);
      if (index >= 0) {
        any = true;
        children.push({
          type: 'element',
          tagName: 'a',
          properties: { href: `#ref-${index + 1}`, className: ['cite'] },
          children: [{ type: 'text', value: part }],
        });
      } else {
        children.push({ type: 'text', value: part });
      }
    }
    if (!any) continue;
    linked = true;
    out.push({ type: 'text', value: value.slice(last, match.index) + '(' }, ...children, { type: 'text', value: ')' });
    last = match.index + match[0].length;
  }
  if (!linked) return null;
  out.push({ type: 'text', value: value.slice(last) });
  return out.filter((node) => node.type !== 'text' || node.value !== '');
}

/** A Sätteri hast plugin (Astro's default Markdown processor). */
export const citationLinks = {
  name: 'lockstep-citation-links',
  text(node, ctx) {
    const references = ctx.data?.astro?.frontmatter?.references;
    if (!Array.isArray(references) || references.length === 0) return;
    // Leave text alone inside links, headings and code
    for (let p = ctx.parent(node); p; p = ctx.parent(p)) {
      if (p.type === 'element' && SKIP.has(p.tagName)) return;
    }
    const replacement = linkCitations(node.value, referenceKeys(references));
    if (replacement) ctx.replaceNode(node, replacement);
  },
};
