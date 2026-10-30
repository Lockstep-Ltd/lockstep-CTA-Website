// Structured data (JSON-LD) that tells search engines who publishes the site and
// what each page is. It's data in a <script type="application/ld+json"> tag:
// browsers don't run it, so no JavaScript is sent to visitors.
// Only facts already on the site go here. Test changes at https://search.google.com/test/rich-results
import { site, social } from '../data/site';
import { chromeExtension, features, tagline } from '../data/product';
import type { Article } from './articles';

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const founderId = `${site.url}/#founder`;
const abs = (path: string) => new URL(path, site.url).href;

const founder = {
  '@type': 'Person',
  '@id': founderId,
  name: site.founder.name,
  jobTitle: 'Founder',
  url: abs(site.founder.url),
};

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  legalName: site.company.legalName,
  url: `${site.url}/`,
  // Resized copy of the original app icon (180×180)
  logo: abs('/apple-touch-icon.png'),
  email: site.email,
  founder: { '@id': founderId },
  description: site.defaultDescription,
  // Official profiles of this Lockstep, so search engines and AI assistants don't
  // confuse it with other companies called Lockstep. Add new profiles here as they're set up.
  sameAs: [...site.profiles, ...social.map((s) => s.href)],
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Companies House company number',
    value: site.company.number,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.company.streetAddress,
    addressLocality: site.company.locality,
    postalCode: site.company.postcode,
    addressCountry: 'GB',
  },
};

// The iPhone app. The Android app is still being tested, so it isn't listed yet.
const app = {
  '@type': 'MobileApplication',
  '@id': `${site.url}/#app`,
  name: site.name,
  // The app's name on the App Store
  alternateName: site.appStoreName,
  description: tagline.summary,
  operatingSystem: 'iOS',
  applicationCategory: 'HealthApplication',
  installUrl: site.appStoreUrl,
  url: site.appStoreUrl,
  // Free to download (confirmed by Andrew, 2026-10-16)
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  featureList: [...features.cards.map((card) => card.title), ...features.more],
  publisher: { '@id': orgId },
};

// The free Chrome extension
const extension = {
  '@type': 'SoftwareApplication',
  '@id': `${site.url}/#chrome-extension`,
  name: chromeExtension.name,
  description: chromeExtension.text,
  operatingSystem: 'Chrome',
  applicationCategory: 'BrowserApplication',
  installUrl: chromeExtension.storeUrl,
  url: chromeExtension.storeUrl,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  publisher: { '@id': orgId },
};

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: site.name,
  url: `${site.url}/`,
  inLanguage: 'en-GB',
  publisher: { '@id': orgId },
};

/** The graph for one page: the organisation, website and app, plus anything page-specific. */
export function pageGraph(nodes: Record<string, unknown>[] = []) {
  return { '@context': 'https://schema.org', '@graph': [organization, founder, website, app, extension, ...nodes] };
}

/** An article, with breadcrumbs (Home › Articles › title). */
export function articleNodes(article: Article): Record<string, unknown>[] {
  const { title, description, date, updated, author, authorRole, watchUrl } = article.data;
  const url = abs(`/articles/${article.id}/`);
  return [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title,
      description,
      datePublished: date.toISOString().slice(0, 10),
      ...(updated && { dateModified: updated.toISOString().slice(0, 10) }),
      // The founder's articles point to the founder described above (with a link to the About page)
      // A summary of an external article is written by Lockstep and based on the original
      author: watchUrl
        ? { '@id': orgId }
        : author === site.founder.name
          ? { '@id': founderId }
          : { '@type': 'Person', name: author, ...(authorRole && { jobTitle: authorRole }) },
      ...(watchUrl && {
        isBasedOn: { '@type': 'CreativeWork', url: watchUrl, author: { '@type': 'Organization', name: author } },
      }),
      publisher: { '@id': orgId },
      isPartOf: { '@id': websiteId },
      mainEntityOfPage: url,
      image: abs(`/og/articles/${article.id}.png`),
      inLanguage: 'en-GB',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: abs('/articles/') },
        { '@type': 'ListItem', position: 3, name: title },
      ],
    },
  ];
}
