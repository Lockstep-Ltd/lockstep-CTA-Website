// Receives the "Suggest an article" form and emails it to SUGGEST_TO_EMAIL via Resend.
// Nothing is stored by the website. Works without JavaScript: the form posts here and
// the visitor is redirected to a thank-you or error page.
import type { APIRoute } from 'astro';
import { RESEND_API_KEY, SUGGEST_FROM_EMAIL, SUGGEST_TO_EMAIL } from 'astro:env/server';

// Runs on demand as a Vercel serverless function; every other page stays static.
export const prerender = false;

const THANKS = '/articles/suggest/thanks/';
const ERROR = '/articles/suggest/error/';

const LIMITS = { title: 300, url: 2000, email: 320, note: 2000 };

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

// Deliberately simple: the browser already checks the format, and replies prove it works.
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Collapse whitespace and newlines so nothing can spill into the email subject.
const oneLine = (value: string) => value.replace(/\s+/g, ' ').trim();

export const POST: APIRoute = async ({ request, redirect }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect(ERROR, 303);
  }

  const field = (name: string) => String(form.get(name) ?? '').trim();

  // Honeypot: hidden from people, so anything in it came from a bot. Pretend it worked.
  if (field('website')) return redirect(THANKS, 303);

  const title = oneLine(field('title'));
  const url = field('url');
  const email = field('email');
  const note = field('note');

  const valid =
    title.length > 0 &&
    title.length <= LIMITS.title &&
    url.length <= LIMITS.url &&
    isHttpUrl(url) &&
    email.length <= LIMITS.email &&
    looksLikeEmail(email) &&
    note.length <= LIMITS.note;

  if (!valid) return redirect(ERROR, 303);

  const subject = `Article suggestion: ${title}`.slice(0, 200);
  const text = [
    'A new article was suggested on lockstep.uk.',
    '',
    `Title: ${title}`,
    `Link: ${url}`,
    `Suggested by: ${email}`,
    '',
    'Note:',
    note || '(none)',
    '',
    'Reply to this email to let them know your decision.',
  ].join('\n');

  if (!RESEND_API_KEY) {
    if (import.meta.env.DEV) {
      // Local development without a key: show the email instead of sending it.
      console.info(`\n[suggest-article] Would email ${SUGGEST_TO_EMAIL}:\nSubject: ${subject}\n\n${text}\n`);
      return redirect(THANKS, 303);
    }
    console.error('[suggest-article] RESEND_API_KEY is not set; suggestion not sent.');
    return redirect(ERROR, 303);
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: SUGGEST_FROM_EMAIL,
        to: [SUGGEST_TO_EMAIL],
        reply_to: email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Log the status only: the response body could echo the visitor's details.
      console.error(`[suggest-article] Resend returned ${response.status}`);
      return redirect(ERROR, 303);
    }
  } catch (error) {
    console.error('[suggest-article] Sending failed:', error instanceof Error ? error.name : 'unknown error');
    return redirect(ERROR, 303);
  }

  return redirect(THANKS, 303);
};

// Someone opening the address directly gets the form instead of an error.
export const GET: APIRoute = ({ redirect }) => redirect('/articles/suggest/', 303);
