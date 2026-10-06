// Social sharing images (1200×630 PNG), generated at build time.
// /og/default.png is the site-wide image; each article gets /og/articles/<slug>.png.
import { OGImageRoute } from 'astro-og-canvas';
import { getArticles } from '../../lib/articles';
import { site } from '../../data/site';
import { tagline } from '../../data/product';

const articles = await getArticles();

type OGPage = { title: string; description: string };

const pages: Record<string, OGPage> = {
  default: { title: tagline.headline, description: tagline.summary },
  ...Object.fromEntries(
    articles.map((a) => [`articles/${a.id}`, { title: a.data.title, description: `${a.data.author}  /  ${site.name}` }]),
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
    logo: { path: './src/assets/og-mark.png', size: [62] },
    bgGradient: [green, emerald],
    border: { color: cream, width: 12, side: 'inline-start' },
    padding: 80,
    font: {
      title: { families: ['Bricolage Grotesque'], weight: 'SemiBold', size: 76, lineHeight: 1.05, color: cream },
      description: { families: ['Instrument Sans'], weight: 'Normal', size: 34, lineHeight: 1.4, color: [214, 218, 205] },
    },
    fonts: [
      './node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff',
      './node_modules/@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff',
    ],
  }),
});
