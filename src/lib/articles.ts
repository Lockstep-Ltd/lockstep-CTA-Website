import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** Topics an article can be tagged with (shown on the article page; used for "Keep reading").
 *  Keep in sync with keystatic.config.ts. */
export const topics = ['Research', 'Young people', 'Policy & industry', 'Recovery & support'] as const;

/** Up to `count` other articles, those sharing the most topics first, then the newest. */
export function relatedArticles(article: Article, all: Article[], count = 2): Article[] {
  const mine = new Set(article.data.topics);
  const shared = (a: Article) => a.data.topics.filter((t) => mine.has(t)).length;
  return all
    .filter((a) => a.id !== article.id)
    .map((a, i) => ({ a, score: shared(a), i }))
    .sort((x, y) => y.score - x.score || x.i - y.i)
    .slice(0, count)
    .map(({ a }) => a);
}

/** Published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/London',
});

export const formatDate = (date: Date) => dateFormat.format(date);

export const articleUrl = (article: Article) => `/articles/${article.id}/`;

/** Shown as the author of our own articles on cards and at the top of the page.
 *  The writer's name (e.g. Andrew Brink) appears only at the end of the article. */
export const teamName = 'The Lockstep Team';

/** An external article: our page is a short summary that links to the original (watchUrl). */
export const isExternal = (article: Article) => !!article.data.watchUrl;

/** Shared name so the title morphs between the list and the article page. */
export const titleTransition = (article: Article) => `article-${article.id}`;
