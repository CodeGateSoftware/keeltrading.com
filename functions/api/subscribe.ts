/**
 * POST /api/subscribe — the News page form posts here (plain HTML, no JS).
 * Stores a pending subscriber and sends the double-opt-in email; already
 * verified addresses get a polite reminder instead. #65.
 */
import {
  asLocale,
  confirmEmail,
  alreadyEmail,
  ensureSchema,
  newToken,
  originOf,
  resultPage,
  sendEmail,
  validEmail,
  type Env,
  type Locale,
  type PagesFunctionHandler,
} from "./_lib";

export const onRequestPost: PagesFunctionHandler<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const locale: Locale = asLocale(form.get("locale"));
  const origin = originOf(request);

  if (env.SUBSCRIPTIONS_ENABLED !== "true" || !env.DB || !env.RESEND_API_KEY) {
    return resultPage("notReady", locale, origin);
  }
  const email = form.get("email");
  if (!validEmail(email)) {
    return resultPage("invalidEmail", locale, origin);
  }
  const address = email.trim().toLowerCase();

  await ensureSchema(env.DB);
  const existing = await env.DB.prepare("SELECT verified, token FROM subscribers WHERE email = ?")
    .bind(address)
    .first<{ verified: number; token: string }>();

  const unsubLink = `${origin}/api/unsubscribe?t=${existing?.token ?? newToken()}`;

  if (existing?.verified) {
    const mail = alreadyEmail(locale, unsubLink);
    await sendEmail(env.RESEND_API_KEY, address, mail.subject, mail.text);
    return resultPage("checkInbox", locale, origin);
  }

  const token = newToken();
  await env.DB.prepare(
    `INSERT INTO subscribers (email, locale, token, verified, created_at)
     VALUES (?, ?, ?, 0, ?)
     ON CONFLICT(email) DO UPDATE SET locale = excluded.locale, token = excluded.token`,
  )
    .bind(address, locale, token, new Date().toISOString())
    .run();

  const mail = confirmEmail(locale, `${origin}/api/confirm?t=${token}`);
  await sendEmail(env.RESEND_API_KEY, address, mail.subject, mail.text);
  return resultPage("checkInbox", locale, origin);
};
