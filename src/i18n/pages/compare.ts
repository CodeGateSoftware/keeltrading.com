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
    rev: "2026-08-20.4",
    title: "How keel Compares to Other Trading Bots",
    description:
      "keel compared with Freqtrade, Jesse, and Hummingbot: license, focus, strategy gates, and the compliance machinery none of them carry — structural facts from public repositories.",
    intro: [
      "Freqtrade, Jesse, and Hummingbot are established, capable open-source trading bots — far more mature than keel, with communities orders of magnitude larger. If you want general algorithmic trading with the widest exchange coverage, they are the better answer.",
      "This page states, factually and from public repositories, where keel differs: keel is not a better trading bot — it is a different thing, an enforcement engine for Shariah compliance you supply.",
    ],
    tableTitle: "Structural comparison",
    footnote:
      "Facts from each project's public repository, August 2026. Community scale (GitHub stars, same date): Freqtrade ~53k, Hummingbot ~19.5k, Jesse ~8.3k — keel just launched. The Cost row was verified from each project's own site on 2026-08-20; Jesse's plugin pricing changes often — re-check at jesse.trade/pricing. Freqtrade, Jesse, Hummingbot, and QuantCrawler are projects of their maintainers; their names appear here solely to identify them. Alpaca is a brokerage, not a bot — keel ships a broker adapter for it under the venue port.",
    readingTitle: "How to read this",
    reading: [
      "Every project here backtests strategies and can trade crypto. The differences that matter are structural: what the engine refuses to do, what it requires before a rule may trade live money, and whether compliance is machinery or nothing at all.",
      "None of the comparison cells are value judgments. Freqtrade's breadth, Jesse's research workflow, and Hummingbot's market-making depth are real strengths — keel has none of them, by design.",
    ],
    paidTitle: "What about paid services?",
    paidBody: [
      "QuantCrawler is the kind of paid service many retail traders meet first: $9.99/month after a 30-day free trial (verified 2026-08-20). It relays TradingView webhook alerts to your broker and copies trades across accounts — ten broker integrations, Coinbase among them, with a futures and prop-firm focus. It is closed-source and cloud-hosted: you connect your broker credentials to their platform, and execution runs on their servers.",
      "keel is the opposite trade-off. Nothing hosted, nothing closed: the engine runs on your machine, your keys never leave it, and no rule may touch live money before clearing the promotion gate. What keel does not have is QuantCrawler's broker breadth or its TradingView-first workflow — if that is what you need, theirs is the fitting answer, at the price of entrusting a service with your credentials. Like the bots above, it carries no compliance machinery; that difference is keel's reason to exist.",
    ],
    venuesTitle: "Which venues, and why",
    venuesBody: [
      "keel's Coinbase adapter is the live-proven reference: attested spot screening, real orders, the whole gauntlet exercised in production. Alpaca is wired for deployment on the equities side — the same enforcement, paper-first, with session-aware market clocks. The Robinhood adapter ships in the repository as an optional dev venue, deliberately outside deployments until its live-path prerequisites close.",
      "What keel declines categorically: futures, margin, shorting, and derivatives of any kind — long-only spot is the whole surface, by fiqh posture and by design. Venue breadth is deliberately not chased; every new venue is a capability-verified adapter decision, not a growth metric.",
    ],
    catchLink: "Why is keel free when the others charge subscriptions? The honest answer is on the About page.",
    wontDoTitle: "What keel will not do",
    wontDo: [
      "Chase exchange coverage: Coinbase is the live-proven reference and Alpaca is wired for equities paper; the Robinhood adapter ships optional/dev, deliberately outside deployments.",
      "Trade anything but long-only spot: no leverage, no shorting, no derivatives.",
      "Promote a rule on backtest brilliance alone: the overfitting check (PBO/CSCV) can veto it.",
      "Promise profit: no shipped rule family is net-positive at the taker fee actually paid, and the site says so on its front page.",
    ],
  },

  ar: {
    rev: "2026-08-20.4",
    translatedFromRev: "2026-08-20.4",
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
    rev: "2026-08-20.4",
    translatedFromRev: "2026-08-20.4",
    title: "Comparer keel aux autres bots de trading",
    description:
      "keel comparé à Freqtrade, Jesse et Hummingbot : licence, finalité, portes de promotion, et la machinerie de conformité qu'aucun d'eux n'emporte — des faits structurels tirés des dépôts publics.",
    intro: [
      "Freqtrade, Jesse et Hummingbot sont des bots de trading open-source établis et capables — bien plus mûrs que keel, avec des communautés ordres de grandeur plus grandes. Si vous voulez du trading algorithmique généraliste avec la couverture d'exchanges la plus large, ils sont la meilleure réponse.",
      "Cette page énonce, factuellement et depuis les dépôts publics, où keel diffère : keel n'est pas un meilleur bot de trading — c'est une autre chose, un moteur d'application d'une conformité Shariah que vous fournissez.",
    ],
    tableTitle: "Comparaison structurelle",
    footnote:
      "Faits tirés du dépôt public de chaque projet, août 2026. Taille de communauté (étoiles GitHub, même date) : Freqtrade ~53k, Hummingbot ~19,5k, Jesse ~8,3k — keel vient de lancer. La ligne Coût a été vérifiée sur le site de chaque projet le 2026-08-20 ; le prix du plugin Jesse change souvent — revérifiez sur jesse.trade/pricing. Freqtrade, Jesse, Hummingbot et QuantCrawler appartiennent à leurs mainteneurs ; leurs noms n'apparaissent ici que pour les identifier. Alpaca est un courtier, pas un bot — keel livre un adaptateur courtier pour lui via le port venues.",
    readingTitle: "Comment lire ceci",
    reading: [
      "Chaque projet ici fait du backtest de stratégies et peut trader de la crypto. Les différences qui comptent sont structurelles : ce que le moteur refuse de faire, ce qu'il exige avant qu'une règle puisse trader de l'argent réel, et si la conformité est une machinerie ou rien du tout.",
      "Aucune case de ce tableau n'est un jugement de valeur. L'ampleur de Freqtrade, le flux de recherche de Jesse et la profondeur de market-making de Hummingbot sont de vraies forces — keel n'en a aucune, par design.",
    ],
    paidTitle: "Et les services payants ?",
    paidBody: [
      "QuantCrawler est le genre de service payant que beaucoup de particuliers rencontrent d'abord : 9,99 $/mois après un essai gratuit de 30 jours (vérifié le 2026-08-20). Il relaie les alertes webhook TradingView vers votre courtier et copie les trades entre comptes — dix intégrations de courtiers dont Coinbase, avec un accent sur les futures et les comptes prop. C'est un service cloud au code fermé : vous connectez vos identifiants de courtier à leur plateforme, et l'exécution se fait sur leurs serveurs.",
      "keel est le compromis inverse : rien d'hébergé, rien de fermé. Le moteur tourne sur votre machine, vos clés ne la quittent jamais, et aucune règle ne peut toucher de l'argent réel avant de franchir la porte de promotion. Ce que keel n'a pas : l'étendue de courtiers de QuantCrawler ni son flux TradingView d'abord — si c'est ce qu'il vous faut, leur réponse est la bonne, au prix de confier vos identifiants à un service. Comme les bots ci-dessus, il n'emporte aucune machinerie de conformité — et cette différence est toute la raison d'être de keel.",
    ],
    venuesTitle: "Quelles places, et pourquoi",
    venuesBody: [
      "L'adaptateur Coinbase de keel est la référence éprouvée en réel : screening spot attesté, ordres réels, tout le parcours exercé en production. Alpaca est câblé pour le déploiement côté actions — la même application, en papier d'abord, avec horloges de marché conscientes des sessions. L'adaptateur Robinhood est livré dans le dépôt comme place optionnelle de développement, délibérément hors des déploiements jusqu'à la fermeture de ses prérequis de mise en réel.",
      "Ce que keel refuse catégoriquement : futures, marge, vente à découvert et tout produit dérivé — le spot long-only est toute la surface, par posture fiqh et par design. L'élargissement des places n'est pas poursuivi ; chaque nouvelle place est une décision d'adaptateur à capacités vérifiées, pas une métrique de croissance.",
    ],
    catchLink: "Pourquoi keel est-il gratuit quand les autres facturent des abonnements ? La réponse honnête est sur la page À propos.",
    wontDoTitle: "Ce que keel ne fera pas",
    wontDo: [
      "Courir après la couverture d'exchanges : Coinbase est l'adaptateur de référence éprouvé en réel et Alpaca est câblé pour les actions papier ; l'adaptateur Robinhood est optionnel/dev, délibérément hors des déploiements.",
      "Trader autre chose que le spot long : pas de levier, pas de vente à découvert, pas de produits dérivés.",
      "Promouvoir une règle sur la seule brillance d'un backtest : le contrôle de surapprentissage (PBO/CSCV) peut opposer son veto.",
      "Promettre du profit : aucune famille de règles livrée n'est nette-positive aux frais preneur réellement payés, et le site le dit sur sa page d'accueil.",
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
          "Gratuit — open-source, auto-hébergé ; vous ne payez que votre infrastructure et les frais de place",
          "Gratuit — open-source, auto-hébergé ; aucune offre officielle payante",
          "Le cœur est gratuit (MIT) ; le plugin de trading réel est payant — licences à vie dès 899 $ (remises fréquentes ; abonnement annoncé)",
          "Gratuit — Apache-2.0, auto-hébergé ; aucun service payant sur leur site",
        ],
      },
      { label: "Langage", values: ["Python", "Python", "Python", "Python"] },
      {
        label: "Finalité",
        values: [
          "Appliquer la conformité Shariah que vous fournissez, sur le spot",
          "Développement généraliste de bots de trading",
          "Recherche de stratégies et trading",
          "Market making / stratégies haute fréquence",
        ],
      },
      {
        label: "Adaptateurs de plateformes",
        values: [
          "Coinbase (référence éprouvée en réel) + Alpaca (câblé, actions papier) ; adaptateur Robinhood optionnel/dev",
          "Beaucoup de grandes plateformes",
          "Plusieurs plateformes",
          "Beaucoup de CEX et de DEX",
        ],
      },
      {
        label: "Backtesting",
        values: ["Fidèle à la production, glissement à l'échelle de la liquidité", "Oui", "Oui", "Oui"],
      },
      {
        label: "Porte obligatoire avant le réel",
        values: [
          "Deux volets : planchers de performance + contrôle de surapprentissage (PBO/CSCV), plancher de 100 transactions",
          "Non",
          "Non",
          "Non",
        ],
      },
      {
        label: "Machinerie de conformité Shariah",
        values: [
          "Filtrage attesté à échec fermé + 18 rails incontournables (dont qabd)",
          "Intégrée nulle part",
          "Intégrée nulle part",
          "Intégrée nulle part",
        ],
      },
      {
        label: "Résultat honnête énoncé sur ses propres règles",
        values: ["Oui — en page d'accueil", "Non publié", "Non publié", "Non publié"],
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
        "Attested fail-closed screening + 18 un-overridable rails (incl. qabd)",
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
