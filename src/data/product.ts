// Product copy taken from the current lockstep.uk site (October 2026).
// Keep wording in sync with the app; don't add claims that aren't published there.

export const tagline = {
  headline: 'Regain control. Redirect the urge.',
  summary:
    // Original: "Lockstep is a UK based mobile app that helps users reduce gambling, by redirecting
    // impulses towards healthier, real-world alternatives". Punctuation fixed only.
    'Lockstep is a UK-based mobile app that helps users reduce gambling by redirecting impulses towards healthier, real-world alternatives.',
};

// The three points under the hero on the original site.
export const commitments = ['Action oriented', 'User-first transparency', 'No ads. No data selling.'];

// Hero line on the original site was "Actionable support for all gamblers." Reworded
// (2026-10-06, approved by Andrew) to avoid labelling people.
export const heroNote = 'Actionable support for anyone who gambles. No therapy. No judgement.';

// "What is Lockstep" section, word for word from the original site.
export const about = {
  paragraphs: [
    'Lockstep is designed for people who want to stay in control without being told what that control must look like. We recognise that gambling exists on a spectrum, and that different people need different levels of structure at different times.',
    'Rather than pushing abstinence or reflection alone, Lockstep focuses on practical support, helping users redirect urges, maintain balance, and keep their priorities aligned with what they value most in everyday life.',
    'Alongside individual tools, Lockstep offers access to personalised relevant meetings and a community of people navigating similar challenges.',
    'The emphasis is on agency, continuity, and support that fits real life, not on labels or rigid rules.',
  ],
  // Second item reworded from "Turning would be mistakes into lifelong memories" (approved 2026-10-06).
  highlights: [
    'Community relevant to you',
    'Turning money you might have gambled into memories that last',
    'No ads. No data selling. No compromises.',
  ],
};

export const steps = [
  {
    title: 'Interrupt urges',
    text: 'Pause and redirect when triggers escalate.',
  },
  {
    title: 'Grow daily',
    text: 'Build consistency through small daily actions that support long-term change.',
  },
  {
    title: 'Support & connect',
    text: 'Join tailored meetings, share your progress and build likeminded connections.',
  },
  {
    title: 'Refine & maintain',
    text: 'Adapt tools to align with goals and build momentum.',
  },
];

// `text` is the short version (desktop on the original site); `detail` is the longer
// version (mobile on the original site). Both word for word.
export const principles = [
  {
    title: 'Clarity over complexity',
    text: 'We remove the noise so you can focus on what matters.',
    detail:
      'Every feature exists to reduce cognitive load, not add to it. Information is presented to support decisions in real time, without unnecessary depth, noise, or interpretation.',
  },
  {
    title: 'Agency without judgement',
    text: "You\u2019re in control. We meet you where you are, supporting different goals and stages while giving you the freedom to define what control looks like for you.",
    detail:
      'Lockstep does not tell users what control should look like. People engage with the platform at different stages, with different goals, and retain autonomy over how they use the tools provided.',
  },
  {
    title: 'Continuity over intensity',
    text: 'Small consistent steps create lasting change.',
    detail:
      'Change is supported through consistency rather than extremes. Lockstep is designed to remain useful when things are difficult, when they are manageable, and when they are going well.',
  },
  {
    title: 'User-first by design',
    text: 'No ads. No hidden agendas. Just tools that put you first.',
    detail:
      'There are no ads, no hidden incentives, and no selling of user data. Where commercial links exist, they are disclosed clearly and never influence recommendations.',
  },
];

// Word for word from the original site, except the end of "Limitations": "it is ultimately
// up to you to beat the odds (pun intended)" became "stay the course" (approved 2026-10-06).
export const ethics = [
  {
    title: 'Privacy',
    text: "Your data stays yours. That's the bottom line. User data is not sold, shared, or used for advertising purposes. Lockstep does not run ads and does not allow third parties to monetise user activity. Any outbound or affiliate links are disclosed transparently and operate independently of user data within Lockstep.",
  },
  {
    title: 'Data handling',
    text: 'Lockstep only collects information required to operate the service and improve recommendations over time. Data is used to support functionality and relevance, never to influence behaviour or promote gambling. Where engagement data is analysed, it is done to improve the usefulness and accuracy of the tools provided, not to profile users for advertising or third-party targeting.',
  },
  {
    title: 'Limitations',
    text: "Lockstep is a collection of tools designed to offer something for everyone, working carefully to provide a curated base to build yourself up from. However, it does not work miracles and does not fix anything overnight. Life will test your resolve and commitment to reducing gambling's impact, it is ultimately up to you to stay the course.",
  },
];

// "Early access" section reworded (2026-10-13, Andrew's request) now the iPhone app is live.
// Original label "Early access"; original text: "Lockstep is now accepting a limited number of
// early members. Join now to help shape the platform, access new features first, and become part
// of the founding community as we continue to improve the experience."
export const status = {
  label: 'Live on the App Store',
  text: 'Lockstep is now live on the App Store. Download it today to help shape the platform and become part of the founding community as we continue to improve the experience.',
  note: 'The initial release is UK-focused. Broader availability may follow as the product matures and regulatory considerations are addressed.',
  // Added 2026-10-11 at Andrew's request: the Android app is being tested with a small group first.
  // Reworded 2026-10-13 to drop "early access only" now the iPhone app is live.
  android: "Android app coming soon. We're testing it with a small group of users first to make sure it works well.",
  // Shortened for the hero (2026-10-13, Andrew's request).
  androidShort: 'Android app coming soon',
};

// "Inside the app" on the How it works page. Swap the Night and Relevant Meetings are the
// original site cards. The rest is from the App Store description (October 2026), word for
// word apart from capitalisation and dropping "with" / " - " where a feature name became a title.
export const features = {
  cards: [
    {
      title: 'Swap the Night',
      text: "Tell us what you were planning to spend and the kind of night you're after, then swipe through real events and things to do from Skiddle and Ticketmaster that you could spend it on instead.",
    },
    {
      title: 'Relevant Meetings',
      text: 'Find support meetings with people in a similar situation to you. Lockstep matches meetings to you and your circumstances, and shows how relevant each one is as a percentage.',
    },
    {
      title: 'Recovery Toolbox',
      text: 'Personal reminders, future self messages, photos and music links that help users reconnect with their long-term goals.',
    },
    {
      title: 'Hold Your Reward',
      text: 'Reframe gambling spend into tangible rewards, experiences and real-world value.',
    },
  ],
  more: [
    'Daily challenges and intentional habit building',
    'Financial blockers and self-exclusion tools',
    'Gambling impact and true cost calculators',
    'Reflection tools, milestones and progress tracking',
    'Private or public community posting',
    'Relevance-based recommendations tailored to your goals and interests',
  ],
};

// The free Chrome extension (confirmed by Andrew, 2026-10-16; name and link from Andrew).
// Text written by Andrew (2026-10-16), word for word apart from capitalising "Chrome".
export const chromeExtension = {
  // Its full name on the Chrome Web Store. Always use this, not just "Lockstep".
  name: 'Lockstep: Gambling Content Blocker',
  text: "Lockstep's Chrome extension adds a further layer of resistance to temptations, by reducing exposure to gambling via platforms like YouTube, Google Search, Ecosia, Instagram, and known gambling websites, using on-device keyword and domain matching.",
  storeUrl: 'https://chromewebstore.google.com/detail/lockstep-gambling-content/jojaaefjdebldfocnbnkhbdjdhedgkhl',
};
