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
    rev: "2026-08-22.1",
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
          lead: "You don't need to use your real name.",
          rest: "GitHub lets you pick any username you like — curious-reader, gardenshed99, anything. There's no real-name policy, and your email address stays private and is never shown on the page. If you'd rather nobody connect the question to you, that's completely fine and nothing about it looks odd.",
        },
        {
          lead: "It's just a website with a comment box.",
          rest: "Nothing installs on your computer, nothing runs, you can't break anything. If you post and hate it, there's a delete button.",
        },
      ],
      steps: [
        {
          before: "Go to ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: ". Enter an email, a password, and a username (whatever you want it to be).",
        },
        {
          before: "They'll email you a code — type it in. There's usually a little puzzle to prove you're human. That's the account done, about two minutes.",
          after: "",
        },
        {
          before: "Then click this link, which drops you straight onto the form with the right category already selected: ",
          link: { label: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification", href: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification" },
          after: "",
        },
        {
          before: "Put your question in the title box, the longer version in the big box, and click “Start discussion”.",
          after: "",
        },
      ],
      categoryGuide:
        "That's it — no navigating, no hunting for the right place. Not sure which category? Compliance & classification for “should X be treated this way”, Q&A for running or configuring keel, General for anything else. Picking the wrong one is not a problem — it can be moved.",
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
    rev: "2026-08-22.1",
    translatedFromRev: "2026-08-22.1",
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
          lead: "لست مضطرًّا لاستخدام اسمك الحقيقي.",
          rest: "يترك لك GitHub اختيارَ أيِّ اسمِ مستخدمٍ تشاء — curious-reader أو gardenshed99 أو أيّ شيء. لا سياسةَ للاسم الحقيقي، وبريدُك الإلكتروني يبقى خاصًّا ولا يُعرض في الصفحة أبدًا. وإن كنت تفضّل ألّا يربط أحدٌ السؤالَ بك فذلك مقبولٌ تمامًا ولا شيءَ غريبٍ فيه.",
        },
        {
          lead: "إنها صفحةُ ويبٍ فيها صندوقُ تعليقات، فحسب.",
          rest: "لا شيءَ يُثبَّت على حاسوبك، ولا شيءَ يعمل، ولا يمكنك تعطيل أيّ شيء. فإن نشرتَ وندمت فثمّة زرُّ حذف.",
        },
      ],
      steps: [
        {
          before: "اذهب إلى ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: ". أدخِل بريدًا إلكترونيًّا وكلمةَ سرٍّ واسمَ مستخدمٍ (أيًّا كان ما تريده).",
        },
        {
          before: "سيُرسلون إليك رمزًا بالبريد — اكتبه. وعادةً ثمّة لغزٌ صغيرٌ لإثبات أنك إنسان. بهذا يكتمل الحساب، في نحو دقيقتين.",
          after: "",
        },
        {
          before: "ثم انقر هذا الرابط الذي يضعك مباشرةً على النموذج والفئةُ الصحيحةُ محدَّدةٌ سلفًا: ",
          link: { label: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification", href: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification" },
          after: "",
        },
        {
          before: "ضع سؤالك في خانة العنوان، والصياغةَ الأطول في الصندوق الكبير، ثم انقر «Start discussion».",
          after: "",
        },
      ],
      categoryGuide:
        "هذا كلّ شيء — لا تنقّلَ ولا بحثَ عن المكان الصحيح. ولست متأكّدًا من الفئة؟ «الامتثال والتصنيف» لأسئلة «هل يُعامل هذا كذا»، و«الأسئلة والأجوبة» لتشغيل كيل وضبطه، و«عام» لما سوى ذلك. والخطأ في الاختيار ليس مشكلة — يمكن نقل المنشور.",
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
    rev: "2026-08-22.1",
    translatedFromRev: "2026-08-22.1",
    title: "La communauté keel — sur GitHub, par choix",
    description:
      "Questions, idées, sondages et débats de classification ont lieu dans les Discussions GitHub de keel. Ce site se contente de lire et de renvoyer : l'échange reste là où vit le projet.",
    intro: [
      "Tout ce qui relève de la communauté se passe dans les Discussions GitHub — publier, voter, sonder, répondre. Ce site n'offre délibérément aucune de ces fonctions : il lit et il renvoie, parce que le projet, son histoire et sa modération vivent déjà là-bas.",
    ],
    note: "Une catégorie mérite une mention particulière : Conformité et classification. « X doit-il être traité ainsi ? » est une question, pas un bug — et elle a son espace dédié.",
    howToPost: {
      title: "Nouveau ici ? Comment publier",
      facts: [
        {
          lead: "Il faut un compte GitHub gratuit pour publier",
          rest: "— la lecture, elle, reste ouverte à tous.",
        },
        {
          lead: "Vous n'avez pas besoin d'utiliser votre vrai nom.",
          rest: "GitHub vous laisse choisir n'importe quel identifiant — curious-reader, gardenshed99, n'importe quoi. Il n'y a aucune politique du nom réel, et votre adresse courriel reste privée, jamais affichée sur la page. Si vous préférez que personne ne rattache la question à vous, c'est parfaitement normal et il n'y a rien d'étrange à cela.",
        },
        {
          lead: "C'est juste une page web avec une zone de commentaire.",
          rest: "Rien ne s'installe sur votre ordinateur, rien ne s'exécute, vous ne pouvez rien casser. Si vous publiez et le regrettez, il y a un bouton supprimer.",
        },
      ],
      steps: [
        {
          before: "Allez sur ",
          link: { label: "github.com/signup", href: "https://github.com/signup" },
          after: ". Entrez un courriel, un mot de passe et un identifiant (ce que vous voulez).",
        },
        {
          before: "Ils vous enverront un code par courriel — saisissez-le. Il y a généralement un petit casse-tête pour prouver que vous êtes humain. Le compte est fait : environ deux minutes.",
          after: "",
        },
        {
          before: "Puis cliquez sur ce lien, qui vous dépose directement sur le formulaire avec la bonne catégorie déjà sélectionnée : ",
          link: { label: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification", href: "https://github.com/CodeGateSoftware/keel/discussions/new?category=compliance-classification" },
          after: "",
        },
        {
          before: "Mettez votre question dans la case du titre, la version longue dans la grande case, puis cliquez « Start discussion ».",
          after: "",
        },
      ],
      categoryGuide:
        "C'est tout : pas de navigation, pas de chasse au bon endroit. Pas sûr de la catégorie ? « Compliance & classification » pour « X devrait-il être traité ainsi », « Q&A » pour l'utilisation et la configuration de keel, « General » pour le reste. Se tromper n'est pas un problème — un fil peut être déplacé.",
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
