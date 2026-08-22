/**
 * #65 — email announcements. Shared plumbing for the Pages Functions:
 * D1 schema + helpers, Resend sending, and the localized plain-text email
 * templates and minimal result pages (inline styles, site palette, RTL
 * aware). Deliberately plain: no open tracking, no pixels (FR-9 brand);
 * unsubscribe hard-deletes the row.
 */

export type Locale = "en" | "ar" | "fr";

export interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  ADMIN_TOKEN?: string;
  SUBSCRIPTIONS_ENABLED?: string;
}

/** Minimal local typings (runtime shape is what matters; wrangler bundles). */
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<{ results: T[] }>;
  run(): Promise<unknown>;
}
export type PagesFunctionHandler<E = Env> = (context: {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
}) => Promise<Response>;

export const LOCALES: Locale[] = ["en", "ar", "fr"];

export const asLocale = (value: unknown): Locale =>
  LOCALES.includes(value as Locale) ? (value as Locale) : "en";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validEmail = (value: unknown): value is string =>
  typeof value === "string" && EMAIL_RE.test(value.trim()) && value.length < 254;

export const newToken = (): string =>
  [...crypto.getRandomValues(new Uint8Array(32))].map((b) => b.toString(16).padStart(2, "0")).join("");

let schemaReady = false;
export async function ensureSchema(db: D1Database): Promise<void> {
  if (schemaReady) return;
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS subscribers (
         email TEXT PRIMARY KEY,
         locale TEXT NOT NULL,
         token TEXT NOT NULL,
         verified INTEGER NOT NULL DEFAULT 0,
         created_at TEXT NOT NULL
       )`,
    )
    .run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS state (key TEXT PRIMARY KEY, value TEXT NOT NULL)`).run();
  schemaReady = true;
}

export const FROM = "keel announcements <hello@keeltrading.com>";
export const REPLY_TO = "hello@keeltrading.com";

export async function sendEmail(
  apiKey: string,
  to: string,
  subject: string,
  text: string,
): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, reply_to: REPLY_TO, to, subject, text }),
  });
  return response.ok;
}

/**
 * Localized templates. Emails are plain text on purpose — they render
 * identically everywhere, including RTL mail clients.
 */
const copy = {
  confirmSubject: {
    en: "Confirm your keel announcements subscription",
    ar: "أكِّد اشتراكك في إعلانات كيل",
    fr: "Confirmez votre abonnement aux annonces de keel",
  },
  confirmBody: (link: string) => ({
    en: `Someone — hopefully you — asked to receive keel announcements at this address.\n\nConfirm the subscription:\n${link}\n\nIf this wasn't you, ignore this message: nothing is stored until you confirm. No tracking, no pixels; one-click unsubscribe anytime.`,
    ar: `طلب أحدهم — نأمل أن تكون أنت — استلام إعلانات كيل على هذا العنوان.\n\nأكِّد الاشتراك:\n${link}\n\nإن لم تكن أنت فتجاهل هذه الرسالة: لا يُخزَّن شيء قبل التأكيد. لا تتبّع ولا بكسلات؛ وإلغاء الاشتراك بنقرةٍ واحدة في أيّ وقت.`,
    fr: `Quelqu'un — vous, espérons-le — a demandé à recevoir les annonces de keel à cette adresse.\n\nConfirmez l'abonnement :\n${link}\n\nSi ce n'était pas vous, ignorez ce message : rien n'est enregistré avant confirmation. Pas de suivi, pas de pixels ; désinscription en un clic à tout moment.`,
  }),
  alreadySubject: {
    en: "You're already subscribed to keel announcements",
    ar: "أنت مشتركٌ بالفعل في إعلانات كيل",
    fr: "Vous êtes déjà abonné aux annonces de keel",
  },
  alreadyBody: (unsub: string) => ({
    en: `This address is already subscribed and confirmed.\n\nUnsubscribe (removes you immediately):\n${unsub}`,
    ar: `هذا العنوان مشتركٌ ومؤكَّد بالفعل.\n\nإلغاء الاشتراك (يحذفك فورًا):\n${unsub}`,
    fr: `Cette adresse est déjà abonnée et confirmée.\n\nSe désabonner (suppression immédiale) :\n${unsub}`,
  }),
  announceSubject: (title: string) => ({
    en: `keel — ${title}`,
    ar: `كيل — ${title}`,
    fr: `keel — ${title}`,
  }),
  announceBody: (title: string, excerpt: string, url: string, unsub: string) => ({
    en: `${title}\n\n${excerpt}\n\nRead and reply on GitHub:\n${url}\n\n— keel announcements (same content as the site's News feed)\nUnsubscribe in one click:\n${unsub}`,
    ar: `${title}\n\n${excerpt}\n\nاقرأ وردّ على GitHub:\n${url}\n\n— إعلانات كيل (المحتوى نفسه كخلاصة الأخبار في الموقع)\nإلغاء الاشتراك بنقرةٍ واحدة:\n${unsub}`,
    fr: `${title}\n\n${excerpt}\n\nLire et répondre sur GitHub :\n${url}\n\n— annonces keel (le même contenu que le fil Actualités du site)\nDésinscription en un clic :\n${unsub}`,
  }),
} as const;

const pick = <T>(map: Record<Locale, T>, locale: Locale): T => map[locale];

export const confirmEmail = (locale: Locale, link: string) => ({
  subject: pick(copy.confirmSubject, locale),
  text: pick(copy.confirmBody(link), locale),
});

export const alreadyEmail = (locale: Locale, unsub: string) => ({
  subject: pick(copy.alreadySubject, locale),
  text: pick(copy.alreadyBody(unsub), locale),
});

export const announceEmail = (
  locale: Locale,
  title: string,
  excerpt: string,
  url: string,
  unsub: string,
) => ({
  subject: pick(copy.announceSubject(title), locale),
  text: pick(copy.announceBody(title, excerpt, url, unsub), locale),
});

/**
 * Minimal result page: inline styles with the site palette, dark-mode
 * friendly, RTL when Arabic, noindex. Good enough for confirm/unsubscribe
 * and form outcomes — the reader came from the site and will go back.
 */
const pageCopy = {
  subscribed: {
    en: ["Subscribed", "You're on the list. The next announcement lands in your inbox after it's published."],
    ar: ["تمّ الاشتراك", "أنت على القائمة. ستصلك الإعلانات القادمة إلى بريدك بعد نشرها."],
    fr: ["Abonné", "C'est fait. La prochaine annonce arrivera dans votre boîte après sa publication."],
  },
  checkInbox: {
    en: ["Check your inbox", "We sent a confirmation link. Click it to finish subscribing — nothing is stored until you do."],
    ar: ["افتح بريدك", "أرسلنا رابط تأكيد. انقره لإتمام الاشتراك — لا يُخزَّن شيء قبل ذلك."],
    fr: ["Vérifiez votre boîte", "Un lien de confirmation vient de partir. Cliquez-le pour terminer — rien n'est enregistré avant."],
  },
  removed: {
    en: ["Unsubscribed", "Your address was removed immediately. No further emails will arrive."],
    ar: ["أُلغي الاشتراك", "حُذف عنوانك فورًا. لن تصلك رسائلٌ أخرى."],
    fr: ["Désabonné", "Votre adresse a été supprimée immédiatement. Plus aucun courriel ne suivra."],
  },
  invalidToken: {
    en: ["Link expired", "This link isn't valid anymore. Subscribe again from the News page if you still want the announcements."],
    ar: ["انتهت صلاحية الرابط", "لم يعد هذا الرابط صالحًا. اشترك من جديد من صفحة الأخبار إن كنت لا تزال ترغب."],
    fr: ["Lien expiré", "Ce lien n'est plus valide. Réabonnez-vous depuis la page Actualités si vous le souhaitez."],
  },
  invalidEmail: {
    en: ["That address doesn't look right", "Go back and check the spelling, then try again."],
    ar: ["يبدو العنوان غير صحيح", "ارجع وتحقّق من الكتابة ثم حاول مجددًا."],
    fr: ["Cette adresse semble incorrecte", "Retournez vérifier la saisie, puis réessayez."],
  },
  notReady: {
    en: ["Not active yet", "Email subscriptions are being set up. Please try again soon."],
    ar: ["غير مُفعَّلٍ بعد", "الاشتراك البريدي قيد التجهيز. جرّب لاحقًا."],
    fr: ["Pas encore actif", "L'abonnement courriel est en cours de configuration. Réessayez bientôt."],
  },
} as const;

export type PageKey = keyof typeof pageCopy;

export function resultPage(key: PageKey, locale: Locale, siteOrigin: string): Response {
  const [heading, body] = pageCopy[key][locale];
  const rtl = locale === "ar" ? ' dir="rtl"' : "";
  const back = { en: "Back to keel", ar: "عودة إلى كيل", fr: "Retour à keel" }[locale];
  const newsPath = locale === "en" ? "/en/news/" : `/${locale}/news/`;
  const html = `<!doctype html><html lang="${locale}"${rtl}><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><title>${heading}</title>
<style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Kufi Arabic",sans-serif;background:#f8f7f3;color:#1d2833;display:flex;min-height:100vh;align-items:center;justify-content:center}
main{max-width:34rem;padding:2.5rem;margin:1rem;background:#fffefb;border:1px solid #d9d4c8;border-radius:10px;box-shadow:0 1px 3px rgb(29 40 51/.08)}
h1{margin:0 0 .6rem;font-size:1.4rem;color:#0c5d52}p{margin:0 0 1.4rem;line-height:1.7}
a{color:#0c5d52;font-weight:600}
@media(prefers-color-scheme:dark){body{background:#0f171d;color:#e9e7e0}main{background:#162128;border-color:#2b3a44}h1,a{color:#57c5af}}
</style></head><body><main><h1>${heading}</h1><p>${body}</p>
<p><a href="${siteOrigin}${newsPath}">← ${back}</a></p></main></body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}

export const originOf = (request: Request): string => new URL(request.url).origin;
