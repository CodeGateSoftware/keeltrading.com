-- #65 — reference schema for the keel-subscriptions D1 database.
-- Applied lazily by functions/api/_lib.ts ensureSchema(); kept here for
-- dashboard reference and manual inspection (wrangler d1 execute).
CREATE TABLE IF NOT EXISTS subscribers (
  email TEXT PRIMARY KEY,      -- stored lowercased; hard-deleted on unsubscribe
  locale TEXT NOT NULL,        -- en | ar | fr — email language
  token TEXT NOT NULL,         -- random hex: double-opt-in confirm + unsubscribe links
  verified INTEGER NOT NULL DEFAULT 0,  -- 1 only after the confirmation click
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS state (
  key TEXT PRIMARY KEY,        -- 'last_sent' = highest announcement number emailed
  value TEXT NOT NULL
);
