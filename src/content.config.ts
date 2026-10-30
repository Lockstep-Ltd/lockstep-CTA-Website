// Content collections. Articles live as Markdown files in src/content/articles/.
// Add a new article by creating a new .md file there with the frontmatter below.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    /** One or two sentences for cards and search results. */
    description: z.string(),
    date: z.coerce.date(),
    /** Optional: when the article was last changed in a meaningful way. Search engines only. */
    updated: z.coerce.date().optional(),
    author: z.string(),
    authorRole: z.string().optional(),
    /** e.g. "4 min read" or "30–35 min watch" */
    readingTime: z.string(),
    /** For summaries of talks or videos: link to the original. */
    watchUrl: z.url().optional(),
    /** Sources cited in the text, listed under "References" at the end of the article. */
    references: z
      .array(z.object({ citation: z.string(), url: z.url().optional() }))
      .default([]),
    /** Topics, from the list in src/lib/articles.ts. Used for "Keep reading" suggestions. */
    topics: z.array(z.enum(['Research', 'Young people', 'Policy & industry', 'Recovery & support'])).default([]),
    draft: z.boolean().default(false),
  }),
});

// Legal pages. File names use underscores to keep the URLs the Lockstep app
// already links to (e.g. /privacy_policy). Don't rename them without updating the app.
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** As shown on the page, e.g. "27/01/2026" */
    updated: z.string(),
  }),
});

export const collections = { articles, legal };
