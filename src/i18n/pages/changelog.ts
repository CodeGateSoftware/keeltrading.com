import type { LocalizedPage } from "../config";

/**
 * #41 — the changelog page. Release notes are fetched from GitHub Releases at
 * build time into the `changelog` content collection (scripts/fetch-release.mjs
 * is the only writer) and stay in English — the canonical wording — on every
 * locale; ar/fr translate the chrome and say so, mirroring the engine-docs
 * policy (FR-7/8).
 *
 * Sonar: fields are flat single strings on purpose — parallel tri-locale
 * blocks trip the duplication gate otherwise (see CONTRIBUTING.md).
 */
export interface ChangelogContent {
  title: string;
  description: string;
  intro: string;
  englishOnly: string;
  tocLabel: string;
  latestLabel: string;
  viewRelease: string;
  empty: string;
}

export const changelog: LocalizedPage<ChangelogContent> = {
  en: {
    rev: "2026-08-20.1",
    title: "Changelog — every keel release, newest first",
    description:
      "Every keel release with its install and configuration notes, newest first, pulled from GitHub Releases at build time.",
    intro:
      "Every version of keel, newest first, exactly as published to GitHub Releases. The build fetches the notes; nobody hand-updates this page.",
    englishOnly: "Release notes are published in English — the text below is the canonical wording.",
    tocLabel: "On this page",
    latestLabel: "latest",
    viewRelease: "View this release on GitHub",
    empty: "The release list could not be fetched for this build.",
  },
  ar: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
    title: "سجلُّ التغييرات — كلُّ إصدارات كيل، من الأحدث إلى الأقدم",
    description:
      "كلُّ إصدارٍ من كيل مع ملاحظات التثبيت والإعداد، من الأحدث إلى الأقدم، مجلوبةٌ وقتَ البناء من GitHub Releases.",
    intro:
      "كلُّ إصدارٍ من كيل، من الأحدث إلى الأقدم، كما نُشر على GitHub Releases تمامًا. البناءُ هو الذي يجلب الملاحظات، ولا أحدَ يُحدِّث هذه الصفحة يدويًّا.",
    englishOnly: "تُنشر ملاحظات الإصدار بالإنجليزية، والنصُّ أدناه هو الصياغة المعتمدة.",
    tocLabel: "في هذه الصفحة",
    latestLabel: "الأحدث",
    viewRelease: "شاهِد هذا الإصدار على GitHub",
    empty: "تعذَّر جلبُ قائمة الإصدارات في هذا البناء.",
  },
  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
    title: "Journal des versions — chaque sortie de keel, de la plus récente à la plus ancienne",
    description:
      "Chaque version de keel avec ses notes d'installation et de configuration, de la plus récente à la plus ancienne, importées de GitHub Releases à la construction.",
    intro:
      "Chaque version de keel, de la plus récente à la plus ancienne, exactement comme publiée sur GitHub Releases. La construction importe les notes ; personne ne met cette page à jour à la main.",
    englishOnly: "Les notes de version sont publiées en anglais ; le texte ci-dessous fait foi.",
    tocLabel: "Sur cette page",
    latestLabel: "la plus récente",
    viewRelease: "Voir cette version sur GitHub",
    empty: "La liste des versions n'a pas pu être importée pour cette construction.",
  },
};
