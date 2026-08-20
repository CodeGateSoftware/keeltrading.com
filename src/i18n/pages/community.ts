import type { LocalizedPage } from "../config";

/**
 * Community (FR-2): curated links into the Discussions categories that exist
 * on the engine repo (verified slugs: announcements, compliance-classification,
 * general, ideas, polls, q-a, show-and-tell), each with one plain paragraph.
 * The site only reads and links — posting/voting happen on GitHub (non-goal).
 */
export interface CommunityCategory {
  name: string;
  slug: string;
  description: string;
}

export interface CommunityContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  note: string;
  categories: CommunityCategory[];
  translatedFromRev?: string;
}

const SLUG_BASE = "https://github.com/CodeGateSoftware/keel/discussions/categories";

export const community: LocalizedPage<CommunityContent> = {
  en: {
    rev: "2026-08-20.2",
    title: "keel Community on GitHub Discussions",
    description:
      "Questions, ideas, polls, and classification debate happen on GitHub Discussions. The site only reads and links — interaction stays where the project lives.",
    intro: [
      "Everything community-shaped happens on GitHub Discussions — posting, voting, polling, answering. This website deliberately has none of that: it reads and links, because that is where the project, its history, and its moderation already live.",
    ],
    note: "One category deserves a special mention: Compliance & classification. “Should X be treated this way?” is a question, not a bug — and there is a place for it.",
    categories: [
      {
        name: "Announcements",
        slug: "announcements",
        description: "Updates from maintainers — the same feed that powers this site's News page.",
      },
      {
        name: "Compliance & classification",
        slug: "compliance-classification",
        description: "The “should X be treated this way” conversations — classification discussion is a question, not a bug, and must not be triaged as one.",
      },
      {
        name: "Ideas",
        slug: "ideas",
        description: "Proposals for what keel should do next. The best ideas arrive with the problem they solve written down.",
      },
      {
        name: "Polls",
        slug: "polls",
        description: "Where the project asks the community to choose between defined options.",
      },
      {
        name: "Q&A",
        slug: "q-a",
        description: "Questions about running, configuring, or understanding keel — answered in public so the next person finds the answer.",
      },
      {
        name: "Show and tell",
        slug: "show-and-tell",
        description: "What people build with and around keel. (Planned as a secondary feed on this site's News page.)",
      },
      {
        name: "General",
        slug: "general",
        description: "Everything that does not fit a category above.",
      },
    ],
  },

  ar: {
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
    title: "مجتمع كيل على نقاشات GitHub",
    description:
      "الأسئلة والأفكار واستطلاعات الرأي ونقاش التصنيف تجري في نقاشات GitHub. وهذا الموقع يقرأ ويربط فقط — ويبقى التفاعل حيث يعيش المشروع.",
    intro: [
      "كلُّ ما هو مجتمعيٌّ يحدث في نقاشات GitHub — النشر والتصويت واستطلاع الرأي والإجابة. وهذا الموقع لا يملك شيئًا من ذلك عن قصد: فهو يقرأ ويربط، لأن المشروع وتاريخه وإدارته موجودةٌ هناك أصلًا.",
    ],
    note: "وثمّة فئةٌ تستحق ذكرًا خاصًّا: «الامتثال والتصنيف». فسؤال «هل ينبغي أن يُعامَل X بهذه الطريقة؟» سؤالٌ لا بلاغُ خلل — وله مكانٌ مخصّص.",
    categories: [
      {
        name: "Announcements",
        slug: "announcements",
        description: "تحديثاتُ القائمين على المشروع — وهي الخلاصة نفسها التي تُغذّي صفحة الأخبار في هذا الموقع.",
      },
      {
        name: "Compliance & classification",
        slug: "compliance-classification",
        description: "حواراتُ «هل يُعامَل X بهذه الطريقة؟» — فنقاشُ التصنيف سؤالٌ لا بلاغُ خلل، ولا يجوز فرزه على أنه كذلك.",
      },
      {
        name: "Ideas",
        slug: "ideas",
        description: "مقترحاتُ ما ينبغي أن يفعله كيل تاليًا. وأفضلُ الأفكار تصل ومعها المشكلةُ التي تحلّها مكتوبةً.",
      },
      {
        name: "Polls",
        slug: "polls",
        description: "حيث يطلب المشروع من المجتمع أن يختار بين خياراتٍ محدّدة.",
      },
      {
        name: "Q&A",
        slug: "q-a",
        description: "أسئلةُ تشغيل كيل وإعداده وفهمه — يُجاب عنها علنًا ليجد السائلُ التالي الجواب.",
      },
      {
        name: "Show and tell",
        slug: "show-and-tell",
        description: "ما يبنيه الناس بكيل وحوله. (ومن المخطَّط أن يكون خلاصةً ثانوية في صفحة الأخبار بهذا الموقع.)",
      },
      {
        name: "General",
        slug: "general",
        description: "كلُّ ما لا يدخل في الفئات أعلاه.",
      },
    ],
  },

  fr: {
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
    title: "La communauté keel — sur GitHub, par design",
    description:
      "Questions, idées, sondages et débats de classification se vivent dans les Discussions GitHub de keel. Ce site ne fait que lire et lier — l'interaction reste là où vit le projet.",
    intro: [
      "Tout ce qui a une dimension communautaire se passe sur GitHub Discussions — publier, voter, sonder, répondre. Ce site n'en a délibérément aucune : il lit et il lie, parce que le projet, son histoire et sa modération vivent déjà là-bas.",
    ],
    note: "Une catégorie mérite une mention particulière : Conformité & classification. « X devrait-il être traité ainsi ? » est une question, pas un bug — et elle a sa place dédiée.",
    categories: [
      {
        name: "Announcements",
        slug: "announcements",
        description: "Les mises à jour des mainteneurs — le même flux qui alimente la page Actualités de ce site.",
      },
      {
        name: "Compliance & classification",
        slug: "compliance-classification",
        description: "Les conversations « X devrait-il être traité ainsi ? » — le débat de classification est une question, pas un bug, et ne doit pas être trié comme tel.",
      },
      {
        name: "Ideas",
        slug: "ideas",
        description: "Les propositions de ce que keel devrait faire ensuite. Les meilleures idées arrivent avec le problème qu'elles résolvent, écrit noir sur blanc.",
      },
      {
        name: "Polls",
        slug: "polls",
        description: "Là où le projet demande à la communauté de trancher entre des options définies.",
      },
      {
        name: "Q&A",
        slug: "q-a",
        description: "Les questions d'exécution, de configuration ou de compréhension de keel — répondues en public pour que le suivant trouve la réponse.",
      },
      {
        name: "Show and tell",
        slug: "show-and-tell",
        description: "Ce que les gens construisent avec et autour de keel. (Prévu comme flux secondaire sur la page Actualités.)",
      },
      {
        name: "General",
        slug: "general",
        description: "Tout ce qui ne rentre pas dans les catégories ci-dessus.",
      },
    ],
  },
};

export const categoryUrl = (slug: string) => `${SLUG_BASE}/${slug}`;
