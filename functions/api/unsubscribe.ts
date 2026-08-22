/** GET /api/unsubscribe?t=… — hard delete, immediately, no questions. #65. */
import {
  asLocale,
  ensureSchema,
  originOf,
  resultPage,
  type Env,
  type PagesFunctionHandler,
} from "./_lib";

export const onRequestGet: PagesFunctionHandler<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("t") ?? "";
  const locale = asLocale(url.searchParams.get("l"));
  const origin = url.origin || originOf(request);

  if (env.SUBSCRIPTIONS_ENABLED !== "true" || !env.DB || !token) {
    return resultPage("invalidToken", locale, origin);
  }
  await ensureSchema(env.DB);
  const deleted = await env.DB.prepare("DELETE FROM subscribers WHERE token = ?")
    .bind(token)
    .run()
    .then(() => true)
    .catch(() => false);

  return deleted ? resultPage("removed", locale, origin) : resultPage("invalidToken", locale, origin);
};
