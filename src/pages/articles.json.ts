// Article feed for the Lockstep app, generated at build time: /articles.json.
// The app lists these articles and opens `url` on the website to read one.
// This is a fixed URL the app depends on. Keep the format backwards compatible:
// add fields freely, but don't rename or remove them without bumping `version`
// and updating the app in the same release. An article's `id` is its file name,
// so renaming a file makes it look like a new article to the app.
import type { APIRoute } from 'astro';
import { getArticles, articleUrl } from '../lib/articles';
import { site } from '../data/site';

/** YYYY-MM-DD. Frontmatter dates are read as midnight UTC, so this is the date as written. */
const day = (date: Date) => date.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const articles = await getArticles();

  const feed = {
    version: 1,
    articles: articles.map((article) => {
      const { id, data } = article;
      return {
        id,
        url: new URL(articleUrl(article), site.url).href,
        title: data.title,
        description: data.description,
        date: day(data.date),
        ...(data.updated && { updated: day(data.updated) }),
        author: data.author,
        ...(data.authorRole && { authorRole: data.authorRole }),
        readingTime: data.readingTime,
        ...(data.watchUrl && { watchUrl: data.watchUrl }),
        image: new URL(`/og/articles/${id}.png`, site.url).href,
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
