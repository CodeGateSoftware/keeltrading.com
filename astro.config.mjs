// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// D4: i18n in the architecture from day one, phased in content.
// `fr` and `es` are reserved in routing but ship no pages until their phase.
// D7 / FR-1: static-first — no adapter, zero client JS by default.
export default defineConfig({
  site: "https://keeltrading.com",
  output: "static",
  redirects: {
    "/": "/en/",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ar", "fr", "es"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", ar: "ar" },
      },
    }),
  ],
});
