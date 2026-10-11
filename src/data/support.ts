// UK support services shown in the footer of every page.
//
// Checked against official sources on 2026-10-08:
// - National Gambling Helpline: nhs.uk gambling addiction page and gamcare.org.uk
// - NHS gambling clinics: nhs.uk/live-well/addiction-support/gambling-addiction/
// - GAMSTOP: gamstop.co.uk
// - Samaritans: samaritans.org
// Re-check these from time to time; numbers and services do change.
// Mark anything that needs re-checking as not verified and
// `npm run check:launch` will list it.

export type SupportService = {
  name: string;
  description: string;
  phone?: string;
  url: string;
  verified: boolean;
};

export const supportServices: SupportService[] = [
  {
    name: 'National Gambling Helpline',
    description:
      'Free, confidential advice and support by phone or live chat, 24 hours a day, every day. Run by GamCare.',
    phone: '0808 8020 133',
    url: 'https://www.gamcare.org.uk/get-support/',
    verified: true,
  },
  {
    name: 'NHS gambling support',
    description:
      'Specialist NHS gambling clinics and other services that can help, listed by the NHS.',
    url: 'https://www.nhs.uk/live-well/addiction-support/gambling-addiction/',
    verified: true,
  },
  {
    name: 'GAMSTOP',
    description:
      'A free service that blocks you from gambling websites and apps licensed in Great Britain.',
    url: 'https://www.gamstop.co.uk/',
    verified: true,
  },
];

// Shown above the list for anyone at immediate risk.
export const urgentHelp = {
  text: "If you're in immediate danger, call 999. If you're struggling to cope, you can call Samaritans free, day or night, on 116 123.",
  verified: true,
};
