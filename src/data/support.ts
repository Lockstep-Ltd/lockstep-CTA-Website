// UK support services shown in the footer of every page.
//
// VERIFY BEFORE LAUNCH: every name, number and link below is a placeholder.
// They were deliberately NOT written from memory. Check each one against the
// service's official website, fill it in, then set `verified: true`.
// `npm run check:launch` lists anything still unverified.

export type SupportService = {
  name: string;
  description: string;
  phone?: string;
  url: string;
  verified: boolean;
};

export const supportServices: SupportService[] = [
  {
    name: '[National gambling support helpline: VERIFY BEFORE LAUNCH]',
    description: 'Free, confidential advice by phone or online chat.',
    phone: '[Phone number: VERIFY BEFORE LAUNCH]',
    url: '#VERIFY-BEFORE-LAUNCH',
    verified: false,
  },
  {
    name: '[NHS gambling support service: VERIFY BEFORE LAUNCH]',
    description: 'Specialist NHS treatment and support.',
    url: '#VERIFY-BEFORE-LAUNCH',
    verified: false,
  },
  {
    name: '[Self-exclusion and blocking tools: VERIFY BEFORE LAUNCH]',
    description: 'Tools to block gambling websites, apps and payments.',
    url: '#VERIFY-BEFORE-LAUNCH',
    verified: false,
  },
];

// Shown above the list for anyone at immediate risk.
export const urgentHelp = {
  text: '[Urgent help wording and emergency/crisis numbers: VERIFY BEFORE LAUNCH]',
  verified: false,
};
