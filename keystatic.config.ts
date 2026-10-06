// Keystatic: a browser-based editor for the articles.
// Run `npm run dev`, then open http://localhost:4321/keystatic
// Edits are saved straight to the Markdown files in src/content/articles/,
// which you then commit like any other change. Fields mirror src/content.config.ts.
import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Lockstep' },
  },
  collections: {
    articles: collection({
      label: 'Articles',
      path: 'src/content/articles/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'date'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL', description: 'Becomes /articles/<url>/' },
        }),
        description: fields.text({
          label: 'Summary',
          description: 'One or two sentences shown on article cards and in search results.',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        author: fields.text({ label: 'Author', defaultValue: 'Andrew Brink', validation: { isRequired: true } }),
        authorRole: fields.text({ label: 'Author role', defaultValue: 'Founder, Lockstep' }),
        readingTime: fields.text({
          label: 'Reading time',
          description: 'e.g. "4 min read"',
          validation: { isRequired: true },
        }),
        watchUrl: fields.url({ label: 'Link to original (talks and videos only)' }),
        draft: fields.checkbox({ label: 'Draft', description: 'Hide this article from the site.' }),
        content: fields.markdoc({ label: 'Article', extension: 'md' }),
      },
    }),
  },
});
