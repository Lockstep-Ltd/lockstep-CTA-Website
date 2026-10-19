// Frequently asked questions, shown on /faq/ and described to search engines (FAQPage JSON-LD).
//
// Requested by Andrew on 2026-10-19, who confirmed that Lockstep is free and that the community
// is moderated. The answers were drafted from wording already published on the site and in the
// legal pages (product.ts, how-it-works, the community guidelines, privacy policy, terms and
// affiliate disclosure). They add no new claims.
// TODO: Andrew to approve the FAQ wording before launch.
//
// Answers are trusted HTML written here (links only). Keep each answer short: two to four sentences.

import { site } from './site';
import { status } from './product';
import { supportServices } from './support';

const helpline = supportServices.find((s) => s.phone)!;

export type FaqItem = { id: string; question: string; answer: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    items: [
      {
        id: 'what-is-lockstep',
        question: 'What is Lockstep?',
        answer: `<p>Lockstep is a UK-based mobile app that helps people reduce gambling by redirecting impulses towards healthier, real-world alternatives.</p>
<p>It brings together practical tools for the moments urges build, small daily actions, and support meetings with a community of people navigating similar challenges. <a href="/how-it-works/">See how it works</a>.</p>`,
      },
      {
        id: 'is-it-free',
        question: 'Is Lockstep free to use?',
        answer: `<p>Yes. Lockstep is free to download and free to use. There are no ads, and we never sell your data.</p>`,
      },
      {
        id: 'how-is-it-funded',
        question: 'If Lockstep is free, how does it make money?',
        answer: `<p>Some links in the app are affiliate links, such as tickets for events you find through Swap the Night. If you buy through one, Lockstep may receive a commission from the provider.</p>
<p>This never changes the price you pay, and it never affects what we recommend. Suggestions are based on what's relevant to you, not on commercial arrangements. <a href="/affiliate_disclosure/">Read our Affiliate Disclosure</a>.</p>`,
      },
      {
        id: 'who-is-it-for',
        question: 'Who is Lockstep for?',
        answer: `<p>Anyone who wants to reduce gambling. Gambling exists on a spectrum, and different people need different levels of structure at different times. Lockstep meets you where you are.</p>`,
      },
      {
        id: 'do-i-have-to-stop',
        question: 'Do I have to stop gambling completely?',
        answer: `<p>No. Lockstep doesn't tell you what control should look like. You decide your own goals.</p>
<p>Rather than pushing abstinence, Lockstep focuses on practical support: helping you redirect urges, maintain balance and keep your priorities aligned with what you value most.</p>`,
      },
      {
        id: 'devices',
        question: 'Which phones can I use Lockstep on?',
        answer: `<p>Lockstep is available now on iPhone, from the <a href="${site.appStoreUrl}">App Store</a>.</p>
<p>${status.android}</p>
<p>${status.note}</p>`,
      },
    ],
  },
  {
    id: 'community',
    title: 'Community and safety',
    items: [
      {
        id: 'is-it-moderated',
        question: 'Is the Lockstep community moderated?',
        answer: `<p>Yes. You can report posts, people and behaviour in meetings straight from the app. Every report is reviewed by a member of the Lockstep team, and no automated system makes the final decision.</p>
<p>When someone breaks our <a href="/community_guidelines/">Community Guidelines</a>, we take action, from a warning up to a permanent ban.</p>`,
      },
      {
        id: 'anonymous',
        question: 'Can I use Lockstep anonymously?',
        answer: `<p>Yes. You never have to share your real identity, and you choose what you share with others.</p>
<p>Members must respect each other's anonymity. Trying to identify someone, or sharing anything that could expose them, is against our Community Guidelines.</p>`,
      },
      {
        id: 'meetings',
        question: 'What are Lockstep meetings?',
        answer: `<p>Small, focused group meetings by video with people in a similar situation to you. Lockstep matches meetings to you and your circumstances, so you can find ones that feel relevant.</p>
<p>Meetings are optional, and you can take part in whatever way feels comfortable.</p>`,
      },
      {
        id: 'uncomfortable',
        question: 'What if another member makes me uncomfortable?',
        answer: `<p>You can block them at any time. Blocking is private and doesn't start a formal report.</p>
<p>If someone breaks the rules, report them in the app and our team will review it. If you think a moderation decision was wrong, email <a href="mailto:moderation@lockstep.uk">moderation@lockstep.uk</a>.</p>`,
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy and your data',
    items: [
      {
        id: 'data-selling',
        question: 'Do you sell or share my data?',
        answer: `<p>No. Your data is not sold, shared or used for advertising. Lockstep doesn't run ads and doesn't allow third parties to make money from your activity.</p>
<p>We only collect what we need to run the service and make it more useful to you.</p>`,
      },
      {
        id: 'delete-data',
        question: 'Can I see or delete my data?',
        answer: `<p>Yes. Under UK GDPR you can ask to see, correct or delete the personal data we hold about you. Email <a href="mailto:legal@lockstep.uk">legal@lockstep.uk</a>.</p>
<p>Our <a href="/privacy_policy/">Privacy Policy</a> explains exactly what we collect and why.</p>`,
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'replace-professional-help',
        question: 'Is Lockstep a replacement for professional help?',
        answer: `<p>No. Lockstep offers practical tools and peer support. It doesn't provide therapy, counselling, medical or financial advice.</p>
<p>It can sit alongside professional support. If you'd like to talk to someone, the ${helpline.name} is free and open 24/7 on <a href="tel:${helpline.phone!.replace(/\s/g, '')}">${helpline.phone}</a>. <a href="/contact/#support-heading">See more UK support services</a>.</p>`,
      },
      {
        id: 'partnering',
        question: 'Can my organisation work with Lockstep?',
        answer: `<p>Yes. We work with universities, charities, support services and funders. <a href="/partner/">Find out about partnering with us</a>, or email <a href="mailto:${site.email}">${site.email}</a>.</p>`,
      },
    ],
  },
];

/** FAQPage structured data for search engines: the same questions, with plain-text answers. */
export function faqStructuredData(): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    '@id': `${site.url}/faq/#faq`,
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
        },
      })),
    ),
  };
}
