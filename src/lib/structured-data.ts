// Structured data (JSON-LD) that tells search engines who publishes the site and
// what each page is. It's data in a <script type="application/ld+json"> tag:
// browsers don't run it, so no JavaScript is sent to visitors.
// Only facts already on the site go here. Test changes at https://search.google.com/test/rich-results
import { site } from '../data/site';
import { tagline } from '../data/product';
import type { Article } from './articles';

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;
const abs = (path: string) => new URL(path, site.url).href;

const organization = {
  '@type': 'Organization',
  '@id': orgId,
  name: site.name,
  legalName: site.company.legalName,
  url: `${site.url}/`,
  // Resized copy of the original app icon (180×180)
  logo: abs('/apple-touch-icon.png'),
  email: site.email,
  description: site.defaultDescription,
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
  description: tagline.summary,
  operatingSystem: 'iOS',
  applicationCategory: 'HealthApplication',
  installUrl: site.appStoreUrl,
  url: site.appStoreUrl,
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
  return { '@context': 'https://schema.org', '@graph': [organization, website, app, ...nodes] };
}

/** An article, with breadcrumbs (Home › Articles › title). */
export function articleNodes(article: Article): Record<string, unknown>[] {
  const { title, description, date, author, authorRole } = article.data;
  const url = abs(`/articles/${article.id}/`);
  return [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title,
      description,
      datePublished: date.toISOString().slice(0, 10),
      author: { '@type': 'Person', name: author, ...(authorRole && { jobTitle: authorRole }) },
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
