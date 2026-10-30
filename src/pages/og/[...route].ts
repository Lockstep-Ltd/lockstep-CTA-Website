// Social sharing images (1200×630 PNG), generated at build time.
// /og/default.png is the site-wide image; each article gets /og/articles/<slug>.png.
import { OGImageRoute } from 'astro-og-canvas';
import { getArticles, isExternal, teamName } from '../../lib/articles';
import { site } from '../../data/site';
import { tagline } from '../../data/product';

const articles = await getArticles();

type OGPage = { title: string; description: string };

const pages: Record<string, OGPage> = {
  default: { title: tagline.headline, description: tagline.summary },
  ...Object.fromEntries(
    articles.map((a) => [
      `articles/${a.id}`,
      {
        title: a.data.title,
        // Matches the cards: our own articles are by the team; summaries credit the original's author
        description: isExternal(a) ? `Summary  /  Original by ${a.data.author}` : `By ${teamName}  /  ${site.name}`,
      },
    ]),
  ),
};

const green: [number, number, number] = [30, 61, 54];
const emerald: [number, number, number] = [47, 92, 80];
const cream: [number, number, number] = [251, 246, 232];

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: OGPage) => ({
    title: page.title,
    description: page.description,
    logo: { path: './src/assets/brand/lockstep-icon.png', size: [96] },
    bgGradient: [green, emerald],
    border: { color: cream, width: 12, side: 'inline-start' },
    padding: 80,
    font: {
      title: { families: ['Newsreader'], weight: 'SemiBold', size: 76, lineHeight: 1.05, color: cream },
      description: { families: ['Inter'], weight: 'Normal', size: 34, lineHeight: 1.4, color: [214, 218, 205] },
    },
    fonts: [
      './node_modules/@fontsource/newsreader/files/newsreader-latin-600-normal.woff',
      './node_modules/@fontsource/inter/files/inter-latin-400-normal.woff',
    ],
  }),
});
