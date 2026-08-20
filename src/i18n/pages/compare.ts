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
    wontDoTitle: "ما لن يفعله كيل",
    wontDo: [
      "مطاردة تغطية المنصّات: Coinbase هو المحوّل المرجعي الموصول؛ ومحوّلا Robinhood وAlpaca يُسلَّمان غير موصولَين عمدًا.",
      "تداول أي شيءٍ غير الفوري الطويل: لا رافعة، لا بيعًا على المكشوف، لا مشتقّات.",
      "ترقية قاعدةٍ على بريق اختبارٍ رجعيٍّ وحده: فحص فرط المواءمة (PBO/CSCV) يستطيع نقضها.",
      "الوعد بربح: لا عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ الفعلية، والموقع يقول ذلك في صفحته الأولى.",
    ],
  },
};

export const compareRows = (locale: "en" | "ar"): CompareRow[] => {
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
