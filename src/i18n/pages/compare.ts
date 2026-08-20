import type { LocalizedPage } from "../config";

/**
 * "How keel compares" — a single factual differences page (the SEO plan's
 * explicit alternative to per-competitor /vs/ pages). Structural facts only,
 * sourced from each project's public repository, with the honest framing
 * FR-9 requires: these are good tools; the comparison names what keel has
 * that they do not, and what they have that keel does not.
 */
export interface CompareRow {
  label: string;
  values: [string, string, string, string]; // keel, Freqtrade, Jesse, Hummingbot
}

export interface CompareContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  tableTitle: string;
  footnote: string;
  readingTitle: string;
  reading: string[];
  paidTitle: string;
  paidBody: string[];
  venuesTitle: string;
  venuesBody: string[];
  catchLink: string;
  wontDoTitle: string;
  wontDo: string[];
  translatedFromRev?: string;
}

export const compareColumns = [
  { name: "keel", href: "https://github.com/CodeGateSoftware/keel" },
  { name: "Freqtrade", href: "https://github.com/freqtrade/freqtrade" },
  { name: "Jesse", href: "https://github.com/jesse-ai/jesse" },
  { name: "Hummingbot", href: "https://github.com/hummingbot/hummingbot" },
] as const;

export const compare: LocalizedPage<CompareContent> = {
  en: {
    rev: "2026-08-20.5",
    title: "How keel Compares to Other Trading Bots",
    description:
      "keel compared with Freqtrade, Jesse and Hummingbot: license, focus, strategy gates, and the compliance machinery none of them carry.",
    intro: [
      "Freqtrade, Jesse, and Hummingbot are established, capable open-source trading bots — far more mature than keel, with communities orders of magnitude larger. If you want general algorithmic trading with the widest exchange coverage, they are the better answer.",
      "This page states, factually and from public repositories, where keel differs: keel is not a better trading bot — it is a different thing, an enforcement engine for Shariah compliance you supply.",
    ],
    tableTitle: "Structural comparison",
    footnote:
      "Facts from each project's public repository, August 2026. Community scale, measured in GitHub stars on the same date: Freqtrade about 53,000, Hummingbot about 19,500, Jesse about 8,300. keel has just launched. The Cost row was verified from each project's own site on 2026-08-20; Jesse's plugin pricing changes often, so re-check it at jesse.trade/pricing. Freqtrade, Jesse, Hummingbot and QuantCrawler are projects of their maintainers, and their names appear here solely to identify them. Alpaca is a brokerage, not a bot: keel ships a broker adapter for it under the venue port.",
    readingTitle: "How to read this",
    reading: [
      "Every project here backtests strategies and can trade crypto. The differences that matter are structural: what the engine refuses to do, what it requires before a rule may trade live money, and whether compliance is machinery or nothing at all.",
      "None of the comparison cells are value judgments. Freqtrade's breadth, Jesse's research workflow, and Hummingbot's market-making depth are real strengths — keel has none of them, by design.",
    ],
    paidTitle: "What about paid services?",
    paidBody: [
      "QuantCrawler is the kind of paid service many retail traders meet first: $9.99 a month after a 30-day free trial (verified 2026-08-20). It relays TradingView webhook alerts to your broker and copies trades across accounts — ten broker integrations, Coinbase among them, with a futures and prop-firm focus. It is closed-source and cloud-hosted: you connect your broker credentials to their platform, and execution runs on their servers.",
      "keel is the opposite trade-off. Nothing hosted, nothing closed: the engine runs on your machine, your keys never leave it, and no rule may touch live money before clearing the promotion gate. What keel does not have is QuantCrawler's broker breadth or its TradingView-first workflow — if that is what you need, theirs is the fitting answer, at the price of entrusting a service with your credentials. Like the bots above, it carries no compliance machinery; that difference is keel's reason to exist.",
    ],
    venuesTitle: "Which venues, and why",
    venuesBody: [
      "keel's Coinbase adapter is the live-proven reference: attested spot screening, real orders, the whole gauntlet run in production. Alpaca is wired for deployment on the equities side — the same enforcement, paper-first, with session-aware market clocks. The Robinhood adapter ships in the repository as an optional dev venue, deliberately outside deployments until its live-path prerequisites close.",
      "What keel declines categorically: futures, margin, shorting, and derivatives of any kind — long-only spot is the whole surface, by fiqh posture and by design. We deliberately do not chase venue breadth. Every new venue is an adapter decision, taken once its capabilities are verified, and never a growth metric.",
    ],
    catchLink: "Why is keel free when the others charge subscriptions? The honest answer is on the About page.",
    wontDoTitle: "What keel will not do",
    wontDo: [
      "Chase exchange coverage: Coinbase is the live-proven reference and Alpaca is wired for equities paper; the Robinhood adapter ships optional/dev, deliberately outside deployments.",
      "Trade anything but long-only spot: no leverage, no shorting, no derivatives.",
      "Promote a rule on backtest brilliance alone: the overfitting check (PBO/CSCV) can veto it.",
      "Promise profit: no shipped rule family is net positive at the taker fee actually paid, and the site says so on its front page.",
    ],
  },

  ar: {
    rev: "2026-08-20.5",
    translatedFromRev: "2026-08-20.5",
    title: "مقارنة كيل ببوتات التداول الأخرى",
    description:
      "مقارنة كيل بـ Freqtrade وJesse وHummingbot: الترخيص والغرض وبوابات الترقية وآلياتُ الامتثال التي لا يحملها أيٌّ منها — وقائعُ بنيويةٌ من المستودعات العمومية.",
    intro: [
      "‏Freqtrade وJesse وHummingbot بوتاتُ تداولٍ مفتوحةُ المصدر، راسخةٌ وقادرة — وأنضجُ من كيل بكثير، ومجتمعاتُها أكبر بمراتب. فإن أردت تداولًا خوارزميًّا عامًّا بأوسع تغطيةٍ للمنصّات فهي الجواب الأفضل.",
      "وتذكر هذه الصفحة، بالوقائع ومن المستودعات العمومية، أين يختلف كيل: فكيل ليس بوتَ تداولٍ أفضل — بل شيءٌ آخر: محرّكُ إنفاذٍ لامتثالٍ شرعيٍّ أنت من يزوّده به.",
    ],
    tableTitle: "مقارنة بنيوية",
    footnote:
      "وقائعُ من المستودع العمومي لكلّ مشروع، أغسطس 2026. حجم المجتمع (نجوم GitHub، في التاريخ نفسه): Freqtrade نحو 53 ألفًا، وHummingbot نحو 19.5 ألفًا، وJesse نحو 8.3 آلاف — وكيل بدأ للتوّ. وقد جرى التحقّق من صفّ التكلفة من موقع كلّ مشروعٍ بتاريخ 2026-08-20؛ وتسعيرُ إضافة Jesse يتغيّر كثيرًا — فراجعه على jesse.trade/pricing. و‏Freqtrade وJesse وHummingbot وQuantCrawler مشاريعُ القائمين عليها؛ ولا تظهر أسماؤها هنا إلا للتعريف بها. أمّا Alpaca فشركةُ وساطةٍ لا بوتَ تداول — ويُسلّم كيل محوّلًا لها ضمن منفذ المنصّات.",
    readingTitle: "كيف تقرأ هذا",
    reading: [
      "كلُّ مشروعٍ هنا يختبر الاستراتيجيات اختبارًا رجعيًّا ويستطيع تداول العملات المشفّرة. والفروق التي تهمّ فروقٌ بنيوية: ما يرفض المحرّك فعلَه، وما يشترطه قبل أن تتداول قاعدةٌ مالًا حقيقيًّا، وهل الامتثال آلياتٌ قائمةٌ أم لا شيء البتّة.",
      "وليست أيٌّ من خانات المقارنة حكمَ قيمة. فاتّساعُ Freqtrade، وسيرُ عمل البحث في Jesse، وعمقُ صناعة السوق في Hummingbot نقاطُ قوّةٍ حقيقية — ولا يملك كيل أيًّا منها، عن قصد.",
    ],
    paidTitle: "ماذا عن الخدمات المدفوعة؟",
    paidBody: [
      "‏QuantCrawler نموذجُ الخدمة المدفوعة الذي يقابله كثيرٌ من المتداولين الأفراد أولًا: 9.99 دولارًا شهريًّا بعد تجربةٍ مجانيةٍ مدّتها ثلاثون يومًا (تحقّقنا منها بتاريخ 2026-08-20). وهو يُمرّر تنبيهات TradingView إلى وسيطك وينسخ الصفقات بين الحسابات — عشرةُ تكاملاتٍ مع وسطاء، منها Coinbase، مع تركيزٍ على العقود المستقبلية وحسابات شركات التمويل. وهو مغلقُ المصدر ومستضافٌ في السحابة: تربط بيانات اعتماد وسيطك بمنصّتهم، ويجري التنفيذ على خوادمهم.",
      "وكيل هو المقايضة المعاكسة: لا استضافةَ ولا انغلاق. فالمحرّك يعمل على جهازك، ومفاتيحك لا تغادره، ولا يمكن لأيّ قاعدةٍ أن تمسّ مالًا حقيقيًّا قبل اجتياز بوابة الترقية. وما لا يملكه كيل هو اتّساعُ الوسطاء لدى QuantCrawler وسيرُ عمله القائم على TradingView أولًا — فإن كان ذلك ما تحتاجه فخدمتُهم هي الجواب المناسب، بثمنِ أن تأتمن خدمةً على بيانات اعتمادك. وهو مثل البوتات أعلاه لا يحمل أيَّ آليات امتثال؛ وهذا الفرق هو سببُ وجود كيل كلُّه.",
    ],
    venuesTitle: "أيُّ المنصّات، ولماذا",
    venuesBody: [
      "محوّل Coinbase في كيل هو المرجعُ المُثبَت في التشغيل الحيّ: فرزٌ موثَّق للتداول الفوري، وأوامرُ حقيقية، والمسارُ كاملًا يُختبر في بيئة الإنتاج. و‏Alpaca موصولٌ للنشر في جانب الأسهم — بالإنفاذ نفسه، وبالتداول التجريبي أولًا، مع مواقيتِ سوقٍ تراعي جلسات التداول. أمّا محوّل Robinhood فيُسلَّم في المستودع منصّةَ تطويرٍ اختيارية، خارج عمليات النشر عمدًا حتى تُستوفى متطلباتُ مساره الحيّ.",
      "وما يرفضه كيل رفضًا قاطعًا: العقود المستقبلية، والهامش، والبيع على المكشوف، وكلُّ المشتقّات — فالشراء الفوري وحده هو كاملُ نطاق العمل، بناءً على الموقف الفقهي وعلى التصميم. ولا نسعى عمدًا إلى توسيع تغطية المنصّات؛ فكلُّ منصّةٍ جديدةٍ قرارٌ يقوم على التحقّق من قدرات محوّلها، لا مؤشّرَ نموّ.",
    ],
    catchLink: "لماذا كيل مجّانيٌّ بينما يتقاضى غيره اشتراكات؟ الجواب الصادق في صفحة «حول المشروع».",
    wontDoTitle: "ما لن يفعله كيل",
    wontDo: [
      "أن يطارد تغطية المنصّات: فـCoinbase هو المحوّل المرجعي المُثبَت في التشغيل الحيّ، وAlpaca موصولٌ للأسهم في التداول التجريبي؛ ومحوّل Robinhood اختياريٌّ وتطويري، خارج عمليات النشر عمدًا.",
      "أن يتداول شيئًا غير الشراء الفوري: لا رافعةَ مالية، ولا بيعَ على المكشوف، ولا مشتقّات.",
      "أن يُرقّي قاعدةً على بريق اختبارٍ رجعيٍّ وحده: فحصُ الإفراط في المُلاءمة (PBO/CSCV) يستطيع نقضَها.",
      "أن يَعِد بربح: لا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ الفعلية، والموقع يقول ذلك في صفحته الأولى.",
    ],
  },

  fr: {
    rev: "2026-08-20.5",
    translatedFromRev: "2026-08-20.5",
    title: "Comparer keel aux autres bots de trading",
    description:
      "keel face à Freqtrade, Jesse et Hummingbot : licence, finalité, verrous de promotion et la machinerie de conformité qu'aucun d'eux n'embarque — des faits structurels tirés des dépôts publics.",
    intro: [
      "Freqtrade, Jesse et Hummingbot sont des bots de trading open-source solides et éprouvés — bien plus mûrs que keel, avec des communautés sans commune mesure avec la sienne. Si vous cherchez du trading algorithmique généraliste avec la plus large couverture de plateformes, ils constituent la meilleure réponse.",
      "Cette page dit, faits à l'appui et dépôts publics en main, où keel diffère : keel n'est pas un meilleur bot de trading — c'est autre chose, un moteur qui applique une conformité Shariah que vous lui fournissez.",
    ],
    tableTitle: "Comparaison structurelle",
    footnote:
      "Faits tirés du dépôt public de chaque projet, août 2026. Taille des communautés (étoiles GitHub, à la même date) : Freqtrade ~53 k, Hummingbot ~19,5 k, Jesse ~8,3 k — keel vient tout juste d'être lancé. La ligne Coût a été vérifiée sur le site de chaque projet le 20 août 2026 ; le tarif du plugin de Jesse change souvent — à revérifier sur jesse.trade/pricing. Freqtrade, Jesse, Hummingbot et QuantCrawler appartiennent à leurs mainteneurs ; leurs noms n'apparaissent ici que pour les identifier. Alpaca est un courtier, pas un bot — keel livre pour lui un adaptateur courtier via le port plateformes.",
    readingTitle: "Comment lire ce tableau",
    reading: [
      "Chacun de ces projets sait backtester des stratégies et négocier des cryptomonnaies. Les différences qui comptent sont structurelles : ce que le moteur refuse de faire, ce qu'il exige avant qu'une règle puisse engager de l'argent réel, et si la conformité y est une machinerie ou n'existe pas du tout.",
      "Aucune case de ce tableau n'est un jugement de valeur. L'ampleur de Freqtrade, le confort de recherche de Jesse et la profondeur de Hummingbot en tenue de marché sont de vraies forces — keel n'en possède aucune, et c'est voulu.",
    ],
    paidTitle: "Et les services payants ?",
    paidBody: [
      "QuantCrawler est le type de service payant que beaucoup de particuliers croisent en premier : 9,99 $ par mois après trente jours d'essai gratuit (vérifié le 20 août 2026). Il relaie les alertes webhook de TradingView vers votre courtier et recopie les transactions d'un compte à l'autre — dix intégrations de courtiers, dont Coinbase, avec un accent sur les contrats à terme et les comptes de prop trading. C'est un service en ligne au code fermé : vous connectez vos identifiants de courtier à leur plateforme, et l'exécution a lieu sur leurs serveurs.",
      "keel fait le choix inverse : rien d'hébergé, rien de fermé. Le moteur tourne sur votre machine, vos clés ne la quittent jamais, et aucune règle ne peut toucher de l'argent réel avant d'avoir franchi le verrou de promotion. Ce que keel n'a pas : l'étendue de courtiers de QuantCrawler, ni sa logique centrée sur TradingView — si c'est ce qu'il vous faut, leur réponse est la bonne, au prix de confier vos identifiants à un service. Comme les bots ci-dessus, il n'embarque aucune machinerie de conformité — et c'est toute la raison d'être de keel.",
    ],
    venuesTitle: "Quelles plateformes, et pourquoi",
    venuesBody: [
      "L'adaptateur Coinbase de keel est la référence, éprouvée en conditions réelles : filtrage attesté au comptant, ordres réels, tout le parcours exercé en production. Alpaca est intégré pour un déploiement côté actions — la même application, en papier d'abord, avec des horloges de marché qui tiennent compte des séances. L'adaptateur Robinhood est livré dans le dépôt comme plateforme de développement optionnelle, délibérément écartée des déploiements tant que ses prérequis de passage en réel ne sont pas remplis.",
      "Ce que keel refuse catégoriquement : les contrats à terme, la marge, la vente à découvert et tout produit dérivé — le comptant à l'achat constitue toute la surface d'exposition, par posture fiqh autant que par conception. L'élargissement du nombre de plateformes n'est pas un objectif : chaque nouvelle plateforme est une décision d'adaptateur aux capacités vérifiées, pas un indicateur de croissance.",
    ],
    catchLink: "Pourquoi keel est-il gratuit quand les autres facturent un abonnement ? La réponse honnête est sur la page À propos.",
    wontDoTitle: "Ce que keel ne fera pas",
    wontDo: [
      "Courir après la couverture de plateformes : Coinbase est l'adaptateur de référence, éprouvé en réel, et Alpaca est intégré pour les actions en papier ; l'adaptateur Robinhood reste optionnel et réservé au développement, délibérément écarté des déploiements.",
      "Négocier autre chose que du comptant à l'achat : pas de levier, pas de vente à découvert, pas de produits dérivés.",
      "Promouvoir une règle sur le seul éclat d'un backtest : le contrôle de surapprentissage (PBO/CSCV) peut y opposer son veto.",
      "Promettre du gain : aucune famille de règles livrée ne dégage un résultat net positif aux frais de preneur réellement payés, et le site le dit dès sa page d'accueil.",
    ],
  },
};

export const compareRows = (locale: "en" | "ar" | "fr"): CompareRow[] => {
  if (locale === "fr") {
    return [
      { label: "Licence", values: ["Apache-2.0", "GPL-3.0", "MIT", "Apache-2.0"] },
      {
        label: "Coût",
        values: [
          "Gratuit — open-source, auto-hébergé ; vous ne payez que votre infrastructure et les frais de la plateforme",
          "Gratuit — open-source, auto-hébergé ; aucune offre payante officielle",
          "Le cœur est gratuit (MIT) ; le plugin de trading réel est payant — licence à vie à partir de 899 $ (remises fréquentes ; passage à l'abonnement annoncé)",
          "Gratuit — Apache-2.0, auto-hébergé ; aucun service payant sur leur site",
        ],
      },
      { label: "Langage", values: ["Python", "Python", "Python", "Python"] },
      {
        label: "Finalité",
        values: [
          "Appliquer, au comptant, une conformité Shariah que vous fournissez",
          "Développement généraliste de bots de trading",
          "Recherche de stratégies et trading",
          "Tenue de marché et stratégies à haute fréquence",
        ],
      },
      {
        label: "Adaptateurs de plateformes",
        values: [
          "Coinbase (référence éprouvée en réel) + Alpaca (intégré, actions en papier) ; adaptateur Robinhood optionnel, réservé au développement",
          "De nombreuses grandes plateformes",
          "Plusieurs plateformes",
          "De nombreuses plateformes centralisées et décentralisées",
        ],
      },
      {
        label: "Backtesting",
        values: ["Fidèle à la production, glissement calibré sur la liquidité", "Oui", "Oui", "Oui"],
      },
      {
        label: "Verrou obligatoire avant le passage en réel",
        values: [
          "En deux volets : seuils de performance + contrôle de surapprentissage (PBO/CSCV), minimum de 100 transactions",
          "Non",
          "Non",
          "Non",
        ],
      },
      {
        label: "Machinerie de conformité Shariah",
        values: [
          "Filtrage attesté qui bloque par défaut + 18 garde-fous incontournables (dont le qabd)",
          "Non intégrée",
          "Non intégrée",
          "Non intégrée",
        ],
      },
      {
        label: "Résultat honnête publié sur ses propres règles",
        values: ["Oui — dès la page d'accueil", "Non publié", "Non publié", "Non publié"],
      },
    ];
  }
  if (locale === "ar") {
    return [
      {
        label: "الترخيص",
        values: ["Apache-2.0", "GPL-3.0", "MIT", "Apache-2.0"],
      },
      {
        label: "التكلفة",
        values: [
          "مجّاني — مفتوح المصدر وتستضيفه بنفسك؛ ولا تدفع إلا بنيتك التحتية ورسوم المنصّة",
          "مجّاني — مفتوح المصدر وتستضيفه بنفسك؛ ولا باقةَ مدفوعةً رسمية",
          "النواة مجّانية (MIT)؛ أمّا إضافة التداول الحيّ فمنتجٌ مدفوع — تراخيصُ دائمة تبدأ من 899 دولارًا (خصوماتٌ متكرّرة، وأُعلن نموذجُ اشتراك)",
          "مجّاني — Apache-2.0 وتستضيفه بنفسك؛ ولا خدماتٍ مدفوعةً على موقعهم",
        ],
      },
      {
        label: "اللغة",
        values: ["Python", "Python", "Python", "Python"],
      },
      {
        label: "الغرض",
        values: [
          "إنفاذُ امتثالٍ شرعيٍّ تزوّده أنت، في التداول الفوري",
          "تطويرُ بوتات تداولٍ عامّة",
          "بحثُ الاستراتيجيات وتداولها",
          "صناعةُ السوق والاستراتيجيات عالية التواتر",
        ],
      },
      {
        label: "محوّلات المنصّات",
        values: [
          "‏Coinbase (المرجع المُثبَت في التشغيل الحيّ) + Alpaca (موصول، للأسهم في التداول التجريبي)؛ ومحوّل Robinhood اختياريٌّ وتطويري",
          "منصّاتٌ كبرى عديدة",
          "عدّةُ منصّات",
          "منصّاتٌ مركزية ولا مركزية عديدة",
        ],
      },
      {
        label: "الاختبار الرجعي",
        values: [
          "مطابقٌ للإنتاج، بانزلاقٍ مُدرَّجٍ حسب السيولة",
          "نعم",
          "نعم",
          "نعم",
        ],
      },
      {
        label: "بوابةٌ إلزامية قبل التداول الحيّ",
        values: [
          "شقّان: حدودٌ دنيا للأداء + فحصُ الإفراط في المُلاءمة (PBO/CSCV)، وحدٌّ أدنى قدره 100 صفقة",
          "لا",
          "لا",
          "لا",
        ],
      },
      {
        label: "آليات امتثال شرعي",
        values: [
          "فرزٌ موثَّق يرفض عند الفشل + 18 سكةَ أمانٍ لا تُتجاوَز (منها القبض الحُكمي)",
          "غير مدمجة",
          "غير مدمجة",
          "غير مدمجة",
        ],
      },
      {
        label: "إعلانُ نتيجةٍ صادقةٍ عن قواعده",
        values: ["نعم — في الصفحة الأولى", "غير منشورة", "غير منشورة", "غير منشورة"],
      },
    ];
  }
  return [
    {
      label: "License",
      values: ["Apache-2.0", "GPL-3.0", "MIT", "Apache-2.0"],
    },
    {
      label: "Cost",
      values: [
        "Free — open-source, self-hosted; you pay only your own infrastructure and venue fees",
        "Free — open-source, self-hosted; no official paid tier",
        "Core free (MIT); the live-trading plugin is a paid product — lifetime from $899 (discounts common; subscription model announced)",
        "Free — Apache-2.0, self-hosted; no paid services on their site",
      ],
    },
    {
      label: "Language",
      values: ["Python", "Python", "Python", "Python"],
    },
    {
      label: "Purpose",
      values: [
        "Enforcing Shariah compliance you supply, on spot trading",
        "General trading bot development",
        "Strategy research and trading",
        "Market making / high-frequency strategies",
      ],
    },
    {
      label: "Venue adapters",
      values: [
        "Coinbase (live-proven reference) + Alpaca (wired, equities paper); Robinhood adapter ships optional/dev",
        "Many major exchanges",
        "Several exchanges",
        "Many CEXs and DEXs",
      ],
    },
    {
      label: "Backtesting",
      values: [
        "Production-faithful, liquidity-scaled slippage",
        "Yes",
        "Yes",
        "Yes",
      ],
    },
    {
      label: "Mandatory gate before live trading",
      values: [
        "Two-part: performance floors + overfitting check (PBO/CSCV), 100-trade floor",
        "No",
        "No",
        "No",
      ],
    },
    {
      label: "Shariah compliance machinery",
      values: [
        "Attested screening that fails closed + 18 rails no order can skip (including qabd)",
        "Not built in",
        "Not built in",
        "Not built in",
      ],
    },
    {
      label: "Honest result stated about own rules",
      values: ["Yes — on the front page", "Not published", "Not published", "Not published"],
    },
  ];
};
