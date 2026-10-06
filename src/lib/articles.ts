import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

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

/** Shared name so the title morphs between the list and the article page. */
export const titleTransition = (article: Article) => `article-${article.id}`;
