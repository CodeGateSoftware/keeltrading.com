/**
 * POST /api/dispatch-send — called by the hourly deploy after success
 * (X-Admin-Token guarded). Reads the same Announcements REST feed the site
 * builds from, emails items newer than the last_sent marker to verified
 * subscribers in their locale, then advances the marker. First run records
 * the current maximum without sending — nobody gets a backlog blast.
 * Free-tier guard: Resend allows 100/day; past ~90 recipients the run
 * degrades to the newest item only and says so. #65.
 */
import {
  announceEmail,
  ensureSchema,
  originOf,
  sendEmail,
  type Env,
  type Locale,
  type PagesFunctionHandler,
} from "./_lib";

interface Discussion {
  number: number;
  title: string;
  html_url: string;
  body: string | null;
  category?: { slug?: string };
}

interface Subscriber {
  email: string;
  locale: Locale;
  token: string;
}

const API =
  "https://api.github.com/repos/CodeGateSoftware/keel/discussions?per_page=30&state=open";

export const onRequestPost: PagesFunctionHandler<Env> = async ({ request, env }) => {
  if (!env.ADMIN_TOKEN || request.headers.get("x-admin-token") !== env.ADMIN_TOKEN) {
    return Response.json({ ok: false, reason: "unauthorized" }, { status: 401 });
  }
  if (env.SUBSCRIPTIONS_ENABLED !== "true" || !env.DB || !env.RESEND_API_KEY) {
    return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  await ensureSchema(env.DB);
  const origin = originOf(request);

  const feedResponse = await fetch(API, {
    headers: { accept: "application/vnd.github+json", "user-agent": "keeltrading.com" },
  });
  if (!feedResponse.ok) {
    return Response.json({ ok: false, reason: `github-${feedResponse.status}` }, { status: 502 });
  }
  const announcements = ((await feedResponse.json()) as Discussion[])
    .filter((discussion) => discussion.category?.slug === "announcements")
    .sort((a, b) => a.number - b.number);

  const state = await env.DB.prepare("SELECT value FROM state WHERE key = 'last_sent'")
    .first<{ value: string }>();
  const lastSent = state ? Number(state.value) : null;

  const newest = announcements.at(-1)?.number ?? null;
  if (newest === null) {
    return Response.json({ ok: true, sent: 0, note: "empty-feed" });
  }
  if (lastSent === null) {
    await env.DB.prepare("INSERT OR REPLACE INTO state (key, value) VALUES ('last_sent', ?)")
      .bind(String(newest))
      .run();
    return Response.json({ ok: true, sent: 0, note: "backlog-guard: marker initialized" });
  }

  let fresh = announcements.filter((item) => item.number > lastSent);
  if (fresh.length === 0) {
    return Response.json({ ok: true, sent: 0, note: "up-to-date" });
  }

  const subscribers: Subscriber[] = (
    await env.DB.prepare("SELECT email, locale, token FROM subscribers WHERE verified = 1").all<Subscriber>()
  ).results;

  if (subscribers.length === 0) {
    await env.DB.prepare("INSERT OR REPLACE INTO state (key, value) VALUES ('last_sent', ?)")
      .bind(String(newest))
      .run();
    return Response.json({ ok: true, sent: 0, note: "no-subscribers" });
  }

  // Free-tier ceiling: 100 emails/day. Keep headroom, newest item wins.
  let degraded = false;
  if (subscribers.length * fresh.length > 90) {
    fresh = fresh.slice(-1);
    degraded = true;
  }

  let sent = 0;
  let failures = 0;
  for (const item of fresh) {
    for (const subscriber of subscribers) {
      const unsub = `${origin}/api/unsubscribe?t=${subscriber.token}`;
      const mail = announceEmail(
        subscriber.locale,
        item.title,
        (item.body ?? "").slice(0, 400).trim(),
        item.html_url,
        unsub,
      );
      if (await sendEmail(env.RESEND_API_KEY, subscriber.email, mail.subject, mail.text)) sent++;
      else failures++;
    }
  }

  await env.DB.prepare("INSERT OR REPLACE INTO state (key, value) VALUES ('last_sent', ?)")
    .bind(String(newest))
    .run();

  return Response.json({ ok: failures === 0, sent, failures, degraded, items: fresh.length });
};
