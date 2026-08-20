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
    rev: "2026-08-20.1",
    title: "How keel Compares to Other Trading Bots",
    description:
      "keel compared with Freqtrade, Jesse, and Hummingbot: license, focus, strategy gates, and the compliance machinery none of them carry — structural facts from public repositories.",
    intro: [
      "Freqtrade, Jesse, and Hummingbot are established, capable open-source trading bots — far more mature than keel, with communities orders of magnitude larger. If you want general algorithmic trading with the widest exchange coverage, they are the better answer.",
      "This page states, factually and from public repositories, where keel differs: keel is not a better trading bot — it is a different thing, an enforcement engine for Shariah compliance you supply.",
    ],
    tableTitle: "Structural comparison",
    footnote:
      "Facts from each project's public repository, August 2026. Community scale (GitHub stars, same date): Freqtrade ~53k, Hummingbot ~19.5k, Jesse ~8.3k — keel just launched. Freqtrade, Jesse, and Hummingbot are projects of their maintainers; their names appear here solely to identify them.",
    readingTitle: "How to read this",
    reading: [
      "Every project here backtests strategies and can trade crypto. The differences that matter are structural: what the engine refuses to do, what it requires before a rule may trade live money, and whether compliance is machinery or nothing at all.",
      "None of the comparison cells are value judgments. Freqtrade's breadth, Jesse's research workflow, and Hummingbot's market-making depth are real strengths — keel has none of them, by design.",
    ],
    catchLink: "Why is keel free when the others charge subscriptions? The honest answer is on the About page.",
    wontDoTitle: "What keel will not do",
    wontDo: [
      "Chase exchange coverage: Coinbase is the wired reference adapter; Robinhood and Alpaca adapters ship deliberately unwired.",
      "Trade anything but long-only spot: no leverage, no shorting, no derivatives.",
      "Promote a rule on backtest brilliance alone: the overfitting check (PBO/CSCV) can veto it.",
      "Promise profit: no shipped rule family is net-positive at the taker fee actually paid, and the site says so on its front page.",
    ],
  },

  ar: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
    title: "مقارنة كيل ببوتات التداول الأخرى",
    description:
      "مقارنة كيل بـ Freqtrade وJesse وHummingbot: الترخيص والتوجه وبوابات الترقية وآليات الامتثال التي لا يحملها أيٌّ منها — وقائع بنيوية من المستودعات العمومية.",
    intro: [
      "‏Freqtrade وJesse وHummingbot بوتات تداول مفتوحة المصدر، راسخة وقادرة — أنضج بكثير من كيل، ومجتمعاتها أكبر بأضعاف مضاعفة. إن أردت تداولًا خوارزميًّا عامًّا بأوسع تغطية للمنصّات فهي الجواب الأفضل.",
      "تذكر هذه الصفحة، وقائعيًّا ومن المستودعات العمومية، حيث يختلف كيل: كيل ليس بوت تداول أفضل — بل شيءٌ آخر: محرّك إنفاذٍ لامتثالٍ شرعيٍّ أنت من يزوّده.",
    ],
    tableTitle: "مقارنة بنيوية",
    footnote:
      "وقائع من المستودع العمومي لكل مشروع، أغسطس 2026. حجم المجتمع (نجوم GitHub، التاريخ نفسه): Freqtrade نحو 53 ألفًا، Hummingbot نحو 19.5 ألفًا، Jesse نحو 8.3 آلاف — وكيل بدأ للتو. Freqtrade وJesse وHummingbot مشاريع مشرفيها؛ ولا تظهر أسماؤها هنا إلا لتعريفها.",
    readingTitle: "كيف تقرأ هذا",
    reading: [
      "كلُّ مشروعٍ هنا يختبر القواعد رجعيًّا ويستطيع تداول العملات المشفّرة. الفروق التي تهم بنيوية: ما يرفض المحرّك فعله، وما يشترطه قبل أن تتداول قاعدةٌ مالًا حقيقيًّا، وهل الامتثال آلياتٌ أم لا شيء.",
      "لا خانةَ في المقارنة حكمُ قيمة. اتساع Freqtrade، وتدفّق بحث Jesse، وعمق صناعة السوق في Hummingbot نقاطُ قوة حقيقية — ولا يملك كيل أيًّا منها، عن قصد.",
    ],
    catchLink: "لماذا كيل مجانيٌّ بينما يتقاضى الآخرون اشتراكات؟ الجواب الصادق في صفحة «حول».",
    wontDoTitle: "ما لن يفعله كيل",
    wontDo: [
      "مطاردة تغطية المنصّات: Coinbase هو المحوّل المرجعي الموصول؛ ومحوّلا Robinhood وAlpaca يُسلَّمان غير موصولَين عمدًا.",
      "تداول أي شيءٍ غير الفوري الطويل: لا رافعة، لا بيعًا على المكشوف، لا مشتقّات.",
      "ترقية قاعدةٍ على بريق اختبارٍ رجعيٍّ وحده: فحص فرط المواءمة (PBO/CSCV) يستطيع نقضها.",
      "الوعد بربح: لا عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ الفعلية، والموقع يقول ذلك في صفحته الأولى.",
    ],
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
    title: "Comparer keel aux autres bots de trading",
    description:
      "keel comparé à Freqtrade, Jesse et Hummingbot : licence, finalité, portes de promotion, et la machinerie de conformité qu'aucun d'eux n'emporte — des faits structurels tirés des dépôts publics.",
    intro: [
      "Freqtrade, Jesse et Hummingbot sont des bots de trading open-source établis et capables — bien plus mûrs que keel, avec des communautés ordres de grandeur plus grandes. Si vous voulez du trading algorithmique généraliste avec la couverture d'exchanges la plus large, ils sont la meilleure réponse.",
      "Cette page énonce, factuellement et depuis les dépôts publics, où keel diffère : keel n'est pas un meilleur bot de trading — c'est une autre chose, un moteur d'application d'une conformité Shariah que vous fournissez.",
    ],
    tableTitle: "Comparaison structurelle",
    footnote:
      "Faits tirés du dépôt public de chaque projet, août 2026. Taille de communauté (étoiles GitHub, même date) : Freqtrade ~53k, Hummingbot ~19,5k, Jesse ~8,3k — keel vient de lancer. Freqtrade, Jesse et Hummingbot appartiennent à leurs mainteneurs ; leurs noms n'apparaissent ici que pour les identifier.",
    readingTitle: "Comment lire ceci",
    reading: [
      "Chaque projet ici fait du backtest de stratégies et peut trader de la crypto. Les différences qui comptent sont structurelles : ce que le moteur refuse de faire, ce qu'il exige avant qu'une règle puisse trader de l'argent réel, et si la conformité est une machinerie ou rien du tout.",
      "Aucune case de ce tableau n'est un jugement de valeur. L'ampleur de Freqtrade, le flux de recherche de Jesse et la profondeur de market-making de Hummingbot sont de vraies forces — keel n'en a aucune, par design.",
    ],
    catchLink: "Pourquoi keel est-il gratuit quand les autres facturent des abonnements ? La réponse honnête est sur la page À propos.",
    wontDoTitle: "Ce que keel ne fera pas",
    wontDo: [
      "Courir après la couverture d'exchanges : Coinbase est l'adaptateur de référence câblé ; les adaptateurs Robinhood et Alpaca sont livrés délibérément non câblés.",
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
          "Coinbase (référence) ; Robinhood & Alpaca livrés non câblés",
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
        label: "اللغة",
        values: ["Python", "Python", "Python", "Python"],
      },
      {
        label: "الغرض",
        values: [
          "إنفاذ امتثالٍ شرعيٍّ تزوّده أنت، على التداول الفوري",
          "تطوير بوت تداول عامّ",
          "بحث استراتيجيات التداول وتنفيذها",
          "صناعة السوق والتداول عالي التواتر",
        ],
      },
      {
        label: "محوّلات المنصّات",
        values: [
          "‏Coinbase (مرجعي)؛ ومحوّلا Robinhood وAlpaca غير موصولَين",
          "منصّات كبرى عديدة",
          "عدة منصّات",
          "منصّات مركزية ولا مركزية عديدة",
        ],
      },
      {
        label: "الاختبار الرجعي",
        values: [
          "مطابقٌ للإنتاج، بانزلاقٍ مُقيَّد بالسيولة",
          "متوفّر",
          "متوفّر",
          "متوفّر",
        ],
      },
      {
        label: "بوابة ترقية إلزامية للحيّ",
        values: [
          "شقّان: أرضيات أداء + فحص فرط مواءمة (PBO/CSCV) وأرضية 100 صفقة",
          "لا",
          "لا",
          "لا",
        ],
      },
      {
        label: "آليات امتثال شرعي",
        values: [
          "فرزٌ موثَّق يفشل مغلقًا + 18 سكة أمان لا تُتجاوز (منها القبض الحُكمي)",
          "غير مدمجة",
          "غير مدمجة",
          "غير مدمجة",
        ],
      },
      {
        label: "إعلان نتيجة صادقة عن قواعده",
        values: ["نعم — في الصفحة الأولى", "غير منشور", "غير منشور", "غير منشور"],
      },
    ];
  }
  return [
    {
      label: "License",
      values: ["Apache-2.0", "GPL-3.0", "MIT", "Apache-2.0"],
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
        "Coinbase (reference); Robinhood & Alpaca ship unwired",
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
