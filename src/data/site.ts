// Site-wide settings used by the layout, header, footer and SEO tags.

export const site = {
  name: 'Lockstep',
  url: 'https://lockstep.uk',
  // TODO: confirm the public contact address before launch.
  email: 'hello@lockstep.uk',
  defaultDescription:
    'Lockstep builds preventative digital tools that help young adults in the UK build healthy habits and stay in control of gambling.',
  // Default social sharing image (1200×630). TODO: replace with a branded image.
  ogImage: '/og-default.png',
  ogImageAlt: 'Lockstep logo on a cream background',
  locale: 'en_GB',
};

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'How it works', href: '/how-it-works/' },
  { label: 'Partner with us', href: '/partner/' },
  { label: 'Contact', href: '/contact/' },
];
