import type { LocalizedPage } from "../config";

/**
 * News (FR-5): intro copy; the items themselves come from
 * data/discussions.json (Announcements category) and data/show-and-tell.json
 * (Show and tell category), read via the public REST endpoint and refreshed
 * by the hourly rebuild. Bodies stay in their original language — the site
 * never translates user-generated content (non-goal).
 */
export interface NewsContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  secondaryTitle: string;
  secondaryBody: string;
  translatedFromRev?: string;
}

export const news: LocalizedPage<NewsContent> = {
  en: {
    rev: "2026-08-21.1",
    title: "keel News — Announcements & Research Notes",
    description:
      "keel's announcements, read from GitHub Discussions and refreshed hourly. Reading and replying happen on GitHub; bodies stay in their original language.",
    intro: [
      "The project announces itself on GitHub Discussions — releases, compliance write-ups, research notes, and honest results. This page reads the Announcements category and deep-links every item to GitHub, where reading and replying actually happen.",
      "The feed refreshes on the hourly rebuild. Items appear in their original language; this site does not translate them.",
    ],
    secondaryTitle: "Show and tell",
    secondaryBody:
      "What the community builds with keel has its own category. The latest posts appear below in their original language; reading and replying happen on GitHub, not here.",
  },

  ar: {
    rev: "2026-08-21.1",
    translatedFromRev: "2026-08-21.1",
    title: "أخبار كيل — إعلانات ومذكّرات بحث",
    description:
      "إعلانات كيل تُقرأ من نقاشات GitHub وتتجدّد كل ساعة. والقراءة والردّ يجريان على GitHub؛ وتبقى النصوص بلغتها الأصلية.",
    intro: [
      "يُعلن المشروع عن نفسه في نقاشات GitHub — الإصدارات، وكتابات الامتثال، ومذكّرات البحث، والنتائج الصادقة. وتقرأ هذه الصفحة فئة الإعلانات وتربط كلَّ بندٍ بـ GitHub، حيث تجري القراءة والردّ فعلًا.",
      "وتتجدّد الخلاصة مع إعادة البناء الساعية. وتظهر البنود بلغتها الأصلية؛ وهذا الموقع لا يترجمها.",
    ],
    secondaryTitle: "‏Show and tell",
    secondaryBody:
      "ما يبنيه المجتمع بكيل له فئةٌ خاصة. وتظهر آخر المشاركات أدناه بلغتها الأصلية؛ أمّا القراءة والردّ فيحدثان على GitHub لا هنا.",
  },

  fr: {
    rev: "2026-08-21.1",
    translatedFromRev: "2026-08-21.1",
    title: "Actualités keel — annonces et notes de recherche",
    description:
      "Les annonces de keel, lues depuis les Discussions GitHub et actualisées toutes les heures. Lecture et réponses sur GitHub ; les textes restent dans leur langue d'origine.",
    intro: [
      "Le projet publie ses annonces dans les Discussions GitHub : versions, billets sur la conformité, notes de recherche et résultats honnêtes. Cette page lit la catégorie Announcements et renvoie chaque élément vers GitHub, où la lecture et les réponses ont réellement lieu.",
      "Le flux est actualisé à chaque reconstruction horaire. Les éléments apparaissent dans leur langue d'origine : ce site ne les traduit pas.",
    ],
    secondaryTitle: "Show and tell",
    secondaryBody:
      "Ce que la communauté construit avec keel a sa propre catégorie. Les dernières présentations s'affichent ci-dessous dans leur langue d'origine ; la lecture et les réponses se passent sur GitHub, pas ici.",
  },
};
