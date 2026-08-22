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
  /** Email announcements (#65) — the same feed, mirrored to inboxes. */
  /** Community discussions window (#73) — newest threads from any category. */
  communityTitle: string;
  communityBody: string;
  /** Pagination (#73). */
  prevPage: string;
  nextPage: string;
  subscribeTitle: string;
  subscribeBody: string;
  subscribePlaceholder: string;
  subscribeButton: string;
  subscribePrivacy: string;
  title: string;
  description: string;
  intro: string[];
  secondaryTitle: string;
  secondaryBody: string;
  translatedFromRev?: string;
}

export const news: LocalizedPage<NewsContent> = {
  en: {
    rev: "2026-08-22.1",
    communityTitle: "From the community discussions",
    communityBody:
      "Questions, classification requests, and ideas from keel's Discussions — the newest threads from every category, in their original language. Reading is open; join in on GitHub.",
    prevPage: "Newer",
    nextPage: "Older",

    subscribeTitle: "Announcements by email",
    subscribeBody:
      "The same announcements, delivered to your inbox when they're published — before you think to check. Double opt-in, no tracking, no pixels, unsubscribe in one click.",
    subscribePlaceholder: "you@example.com",
    subscribeButton: "Subscribe",
    subscribePrivacy:
      "We store your email address and your language — nothing else. No open tracking, no pixels, no sharing. Unsubscribing removes you immediately.",
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
    rev: "2026-08-22.1",
    communityTitle: "من نقاشات المجتمع",
    communityBody:
      "أسئلةُ وطلباتُ تصنيفٍ وأفكارٌ من نقاشات كيل — أحدثُ الخيوط من كلّ الفئات، بلغتها الأصلية. القراءةُ مفتوحة؛ والمشاركة على GitHub.",
    prevPage: "الأحدث",
    nextPage: "الأقدم",

    translatedFromRev: "2026-08-22.1",
    subscribeTitle: "الإعلانات بالبريد",
    subscribeBody:
      "الإعلانات نفسها تصلك إلى بريدك فور نشرها — قبل أن تتذكّر التحقّق. تأكيدٌ مزدوج، ولا تتبّع ولا بكسلات، وإلغاء الاشتراك بنقرةٍ واحدة.",
    subscribePlaceholder: "you@example.com",
    subscribeButton: "اشترك",
    subscribePrivacy:
      "نخزّن بريدك الإلكتروني ولغتك فقط — لا شيء غير ذلك. لا تتبّع للفتح، ولا بكسلات، ولا مشاركة. وإلغاء الاشتراك يحذفك فورًا.",
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
    rev: "2026-08-22.1",
    communityTitle: "Des discussions de la communauté",
    communityBody:
      "Questions, demandes de classification et idées tirées des Discussions de keel — les fils les plus récents de toutes les catégories, dans leur langue d'origine. La lecture est ouverte ; rejoignez-la sur GitHub.",
    prevPage: "Plus récents",
    nextPage: "Plus anciens",

    translatedFromRev: "2026-08-22.1",
    subscribeTitle: "Les annonces par courriel",
    subscribeBody:
      "Les mêmes annonces, dans votre boîte dès leur publication — avant d'y penser. Double opt-in, aucun suivi, aucun pixel, désinscription en un clic.",
    subscribePlaceholder: "vous@exemple.com",
    subscribeButton: "S'abonner",
    subscribePrivacy:
      "Nous conservons votre adresse et votre langue — rien d'autre. Pas de suivi d'ouverture, pas de pixels, aucun partage. Se désabonner vous supprime immédiatement.",
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
