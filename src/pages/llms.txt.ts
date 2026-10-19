// /llms.txt: a plain-text guide to the site for AI assistants (https://llmstxt.org),
// generated at build time so new articles appear automatically.
// Only wording already on the site goes here; don't add claims or new copy.
import type { APIRoute } from 'astro';
import { getArticles, articleUrl } from '../lib/articles';
import { legalLinks, site } from '../data/site';
import { about, chromeExtension, features, heroNote, status, steps, tagline } from '../data/product';
import { supportServices, urgentHelp } from '../data/support';

const abs = (path: string) => new URL(path, site.url).href;
const helpline = supportServices.find((s) => s.phone)!;

// Same descriptions as each page's <meta name="description">.
const pages = [
  { name: 'How it works', path: '/how-it-works/', description: 'How Lockstep helps you reduce gambling: interrupt urges, grow daily, connect with others and keep your progress going.' },
  { name: 'About', path: '/about/', description: 'Lockstep is designed for people who want to stay in control of gambling without being told what that control must look like.' },
  { name: 'Articles & insights', path: '/articles/', description: 'Practical ideas, research and stories around gambling, habits and regaining control, from the Lockstep team.' },
  { name: 'Partner with us', path: '/partner/', description: 'Universities, charities, support services and funders: work with Lockstep to help people reduce gambling and stay in control.' },
  { name: 'FAQs', path: '/faq/', description: "Answers to common questions about Lockstep: what it costs, who it's for, how the community is moderated and how your data is handled." },
  { name: 'Contact', path: '/contact/', description: 'Email the Lockstep team at contact@lockstep.uk with questions, feedback or partnership ideas.' },
];

export const GET: APIRoute = async () => {
  const articles = await getArticles();

  const text = `# ${site.name}

> ${tagline.summary}

${heroNote}

- Made by: ${site.company.legalName}, a UK company (Companies House ${site.company.number})
- Website: ${site.url}/
- iPhone app (free): ${site.appStoreUrl}
- ${status.androidShort}
- Contact: ${site.email}

Need support now? ${helpline.name}: ${helpline.phone}, free, 24/7. ${urgentHelp.brief} More support services: ${abs('/contact/#support-heading')}

## About

${about.paragraphs.join('\n\n')}

## Inside the app

${features.cards.map((card) => `- ${card.title}: ${card.text}`).join('\n')}
${features.more.map((item) => `- ${item}`).join('\n')}

## ${chromeExtension.name} (Chrome extension)

${chromeExtension.text}

- Chrome extension (free): ${chromeExtension.storeUrl}

## How it works

${steps.map((step) => `- ${step.title}: ${step.text}`).join('\n')}

## Pages

${pages.map((page) => `- [${page.name}](${abs(page.path)}): ${page.description}`).join('\n')}

## Articles

${articles.map((article) => `- [${article.data.title}](${abs(articleUrl(article))}): ${article.data.description}`).join('\n')}

## Optional

${legalLinks.map((link) => `- [${link.label}](${abs(link.href)})`).join('\n')}
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
