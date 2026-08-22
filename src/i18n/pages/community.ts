import type { LocalizedPage } from "../config";

/**
 * Community (FR-2): curated links into the Discussions categories that exist
 * on the engine repo (verified slugs: announcements, compliance-classification,
 * general, ideas, polls, q-a, show-and-tell), each with one plain paragraph.
 * The site only reads and links — posting/voting happen on GitHub (non-goal).
 *
 * `howToPost` (#48) is the reader-facing exception to that silence: it explains
 * how to reach the place where interaction happens. It says an account is
 * required and a real name is not — never that a pseudonym is anonymity.
 */
export interface CommunityCategory {
  name: string;
  slug: string;
  description: string;
}

export interface HowToFact {
  /** The bolded lead — the rule or promise, in one sentence. */
  lead: string;
  /** The rest of the fact, on the same line. */
  rest: string;
}

export interface HowToStep {
  /** Text before the embedded link (the whole step when there is no link). */
  before: string;
  /** Rendered as a link between `before` and `after`. */
  link?: { label: string; href: string };
  /** Text after the link (may be empty). */
  after: string;
}

export interface HowToPostContent {
  title: string;
  facts: HowToFact[];
  steps: HowToStep[];
  /** One-sentence category guidance, closing the section. */
  categoryGuide: string;
  /** Label for the composer link on each open category card. */
  startLabel: string;
}

export interface CommunityContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  note: string;
  howToPost: HowToPostContent;
  categories: CommunityCategory[];
  translatedFromRev?: string;
}

const SLUG_BASE = "https://github.com/CodeGateSoftware/keel/discussions/categories";
const NEW_BASE = "https://github.com/CodeGateSoftware/keel/discussions/new";

/**
 * GitHub's composer with a category preselected — …/discussions/new?category=<slug>
 * (verified working for compliance-classification on 2026-08-21).
 */
export const composerUrl = (slug: string) => `${NEW_BASE}?category=${slug}`;

/**
 * Announcement-type categories only let maintainers open discussions, so those
 * cards get no composer link — a link that ends in a permission wall would not
 * be honest (#48's own rule).
 */
export const maintainerOnlySlugs = new Set(["announcements"]);

export const community: LocalizedPage<CommunityContent> = {
  en: {
    rev: "2026-08-21.1",
    title: "keel Community on GitHub Discussions",
    description:
      "Questions, ideas, polls, and classification debate happen on GitHub Discussions. The site only reads and links — interaction stays where the project lives.",
    intro: [
      "Everything community-shaped happens on GitHub Discussions — posting, voting, polling, answering. This website deliberately has none of that: it reads and links, because that is where the project, its history, and its moderation already live.",
    ],
    note: "One category deserves a special mention: Compliance & classification. “Should X be treated this way?” is a question, not a bug — and there is a place for it.",
    howToPost: {
      title: "New here? How to post",
      facts: [
        {
          lead: "You need a free GitHub account to post",
          rest: "— reading is open to everyone.",
        },
        {
          lead: "You do not need to use your real name.",
          rest: "Pick any username you like. Your email address stays private and is never shown.",
        },
        {
          lead: "It is just a web page with a comment box.",
          rest: "Nothing installs on your computer, and you can edit or delete anything you post.",
        },
      ],
      steps: [
        {
          before: "Sign up at ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: " — an email, a password, a username of your choosing.",
        },
        {
          before: "Enter the code they email you, and complete the “are you human” check. Around two minutes.",
          after: "",
        },
        {
          before: "Use a “Start a discussion” button below — it opens the form with the category already chosen.",
          after: "",
        },
        {
          before: "Title, then your question, then “Start discussion”.",
          after: "",
        },
      ],
      categoryGuide:
        "Not sure which category? Compliance & classification for “should X be treated this way”, Q&A for running or configuring keel, General for anything else. Picking the wrong one is not a problem — it can be moved.",
      startLabel: "Start a discussion",
    },
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
    rev: "2026-08-21.1",
    translatedFromRev: "2026-08-21.1",
    title: "مجتمع كيل على نقاشات GitHub",
    description:
      "الأسئلة والأفكار واستطلاعات الرأي ونقاش التصنيف تجري في نقاشات GitHub. وهذا الموقع يقرأ ويربط فقط — ويبقى التفاعل حيث يعيش المشروع.",
    intro: [
      "كلُّ ما هو مجتمعيٌّ يحدث في نقاشات GitHub — النشر والتصويت واستطلاع الرأي والإجابة. وهذا الموقع لا يملك شيئًا من ذلك عن قصد: فهو يقرأ ويربط، لأن المشروع وتاريخه وإدارته موجودةٌ هناك أصلًا.",
    ],
    note: "وثمّة فئةٌ تستحق ذكرًا خاصًّا: «الامتثال والتصنيف». فسؤال «هل ينبغي أن يُعامَل X بهذه الطريقة؟» سؤالٌ لا بلاغُ خلل — وله مكانٌ مخصّص.",
    howToPost: {
      title: "جديدٌ هنا؟ كيف تنشر",
      facts: [
        {
          lead: "تحتاج إلى حساب GitHub مجاني لتنشر",
          rest: "— أمّا القراءة فمفتوحةٌ للجميع.",
        },
        {
          lead: "لستَ مضطرًّا لاستخدام اسمك الحقيقي.",
          rest: "اختر أيَّ اسمِ مستخدمٍ شئت. بريدك الإلكتروني يبقى خاصًّا ولا يُعرَض أبدًا.",
        },
        {
          lead: "إنها مجردُ صفحةِ ويبٍ فيها صندوقُ تعليق.",
          rest: "لا شيء يُثبَّت على حاسوبك، ويمكنك تعديل كلِّ ما تنشره أو حذفه.",
        },
      ],
      steps: [
        {
          before: "أنشئ حسابًا على ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: " — بريدٌ إلكتروني، وكلمةُ سرٍّ، واسمُ مستخدمٍ من اختيارك.",
        },
        {
          before: "أدخِل الرمزَ الذي يصلك بالبريد، ثم أكمِل فحص «هل أنت إنسان». نحو دقيقتين.",
          after: "",
        },
        {
          before: "استخدم زرَّ «ابدأ نقاشًا» في الأسفل — يفتح الاستمارة والفئةُ محدَّدةٌ سلفًا.",
          after: "",
        },
        {
          before: "العنوان أولًا، ثم سؤالك، ثم «ابدأ نقاشًا».",
          after: "",
        },
      ],
      categoryGuide:
        "مترددٌ في اختيار الفئة؟ «الامتثال والتصنيف» لأسئلة «هل يُعامَل X بهذه الطريقة؟»، و«الأسئلة والأجوبة» لتشغيل كيل وإعداده، و«عام» لأيِّ شيءٍ آخر. اختيارُ الفئة الخطأ ليس مشكلة — يمكن نقل النقاش.",
      startLabel: "ابدأ نقاشًا",
    },
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
    rev: "2026-08-21.1",
    translatedFromRev: "2026-08-21.1",
    title: "La communauté keel — sur GitHub, par choix",
    description:
      "Questions, idées, sondages et débats de classification ont lieu dans les Discussions GitHub de keel. Ce site se contente de lire et de renvoyer : l'échange reste là où vit le projet.",
    intro: [
      "Tout ce qui relève de la communauté se passe dans les Discussions GitHub — publier, voter, sonder, répondre. Ce site n'offre délibérément aucune de ces fonctions : il lit et il renvoie, parce que le projet, son histoire et sa modération vivent déjà là-bas.",
    ],
    note: "Une catégorie mérite une mention particulière : Conformité et classification. « X doit-il être traité ainsi ? » est une question, pas un bug — et elle a son espace dédié.",
    howToPost: {
      title: "Nouveau ici ? Comment publier",
      facts: [
        {
          lead: "Il faut un compte GitHub gratuit pour publier",
          rest: "— la lecture, elle, reste ouverte à tous.",
        },
        {
          lead: "Votre vrai nom n'est pas nécessaire.",
          rest: "Choisissez l'identifiant qu'il vous plaît. Votre adresse e-mail reste privée et n'est jamais affichée.",
        },
        {
          lead: "C'est juste une page web avec une zone de commentaire.",
          rest: "Rien ne s'installe sur votre ordinateur, et vous pouvez modifier ou supprimer tout ce que vous publiez.",
        },
      ],
      steps: [
        {
          before: "Inscrivez-vous sur ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: " — une adresse e-mail, un mot de passe, un identifiant de votre choix.",
        },
        {
          before: "Saisissez le code reçu par e-mail, puis passez la vérification « êtes-vous humain ». Deux minutes, à peu près.",
          after: "",
        },
        {
          before: "Servez-vous d'un bouton « Lancer une discussion » ci-dessous — il ouvre le formulaire avec la catégorie déjà choisie.",
          after: "",
        },
        {
          before: "Un titre, puis votre question, puis « Lancer la discussion ».",
          after: "",
        },
      ],
      categoryGuide:
        "Pas sûr de la catégorie ? « Conformité et classification » pour « X doit-il être traité ainsi ? », « Questions et réponses » pour utiliser ou configurer keel, « Général » pour tout le reste. Se tromper de catégorie n'est pas un problème — une discussion peut être déplacée.",
      startLabel: "Lancer une discussion",
    },
    categories: [
      {
        name: "Announcements",
        slug: "announcements",
        description: "Les mises à jour des mainteneurs — le flux même qui alimente la page Actualités de ce site.",
      },
      {
        name: "Compliance & classification",
        slug: "compliance-classification",
        description: "Les échanges du type « X doit-il être traité ainsi ? ». Le débat de classification est une question, pas un bug : il ne doit pas être trié comme tel.",
      },
      {
        name: "Ideas",
        slug: "ideas",
        description: "Les propositions sur ce que keel devrait faire ensuite. Les meilleures idées arrivent avec le problème qu'elles résolvent, énoncé noir sur blanc.",
      },
      {
        name: "Polls",
        slug: "polls",
        description: "L'endroit où le projet demande à la communauté de trancher entre des options définies.",
      },
      {
        name: "Q&A",
        slug: "q-a",
        description: "Les questions sur l'exécution, la configuration ou le fonctionnement de keel — traitées en public, pour que la personne suivante trouve la réponse.",
      },
      {
        name: "Show and tell",
        slug: "show-and-tell",
        description: "Ce que les gens construisent avec keel et autour de keel. (Prévu comme flux secondaire sur la page Actualités.)",
      },
      {
        name: "General",
        slug: "general",
        description: "Tout ce qui n'entre dans aucune des catégories ci-dessus.",
      },
    ],
  },
};

export const categoryUrl = (slug: string) => `${SLUG_BASE}/${slug}`;
