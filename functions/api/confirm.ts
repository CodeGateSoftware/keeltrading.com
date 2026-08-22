/** GET /api/confirm?t=… — double opt-in: the click that stores consent. #65. */
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
  const result = await env.DB.prepare(
    "UPDATE subscribers SET verified = 1 WHERE token = ? AND verified = 0",
  )
    .bind(token)
    .run()
    .catch(() => null);

  return result ? resultPage("subscribed", locale, origin) : resultPage("invalidToken", locale, origin);
};
