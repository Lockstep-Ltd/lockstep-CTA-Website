// RSS feed of every published article, newest first: /rss.xml.
// For feed readers and news apps. The Lockstep app uses /articles.json instead, which this doesn't affect.
// Built at build time from the same article list, so a new article appears in both automatically.
import type { APIRoute } from 'astro';
import { getArticles, articleUrl, isExternal, teamName } from '../lib/articles';
import { site } from '../data/site';

const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const feedUrl = new URL('/rss.xml', site.url).href;

  const items = articles.map((article) => {
    const { data } = article;
    const url = new URL(articleUrl(article), site.url).href;
    // Same bylines as the article cards
    const creator = isExternal(article) ? `${teamName} (summary of an article by ${data.author})` : teamName;
    return `    <item>
      <title>${escape(data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${data.date.toUTCString()}</pubDate>
      <dc:creator>${escape(creator)}</dc:creator>
      <description>${escape(data.description)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(site.name)}: Articles &amp; insights</title>
    <link>${site.url}/articles/</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Practical ideas, research and stories around gambling, habits and regaining control.</description>
    <language>en-GB</language>
    ${articles[0] ? `<lastBuildDate>${articles[0].data.date.toUTCString()}</lastBuildDate>` : ''}
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
