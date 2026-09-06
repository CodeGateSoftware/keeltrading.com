import type { LocalizedPage } from "../config";
import type { EngineSource } from "../../lib/engine-url";

/**
 * Home (FR-2): what keel is in plain English (and plain Arabic), the honest
 * posture first, and the primary CTAs. Copy is grounded in the engine repo's
 * README — nothing here claims more than the repo can show (FR-2 rule).
 *
 * #119 — the cards also carry the evidence stack and the read-only MCP
 * server, each with the same "verify in the repository" pointer the Features
 * page uses (#91: the path, never a URL; HomePage pins it to the resolved
 * release tag).
 */
export interface HomeCard {
  title: string;
  body: string;
  /** The "verify in the repository" pointer, as the Features page carries it:
   *  a repo-relative path — HomePage builds the href at the ref this build
   *  resolved, so the reader lands on the code the release they run contains. */
  verify: EngineSource & { label: string };
  /** When set, the card links into that site page (#119: the MCP card pairs
   *  with the AI-assistant page #118, so the capability has a front door). */
  page?: "assistant";
}

export interface HomeContent {
  rev: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    heading: string;
    sub: string;
  };
  honest: {
    title: string;
    summaryBadge?: string;
    summaryBadgeAr?: string;
    summaryBadgeFr?: string;
    body: string[];
    experimentLabel: string;
    /** The per-product cost restatement — the record behind the slippage paragraph. */
    costLabel: string;
    announcementLabel: string;
  };
  verifyNote: string;
  cards: HomeCard[];
  fatwa: {
    quote: string;
    body: string[];
    more: string;
  };
  review: { title: string; body: string[]; more: string };
  next: { title: string; items: { title: string; body: string }[] };
  translatedFromRev?: string;
}

export const home: LocalizedPage<HomeContent> = {
  en: {
    rev: "2026-09-05.1",
    title: "keel: the open-source Shariah compliance engine for crypto",
    description:
      "The open-source engine that enforces Shariah compliance on spot crypto: attested screening that fails closed and rails no order can skip. Not a fatwa engine.",
    hero: {
      eyebrow: "Open source · Apache-2.0 · by CodeGate Software",
      heading: "Shariah compliance you can audit, not just trust",
      sub: "keel is an open-source engine for spot crypto trading. Before any order is placed, it passes through safety rails no code can override and an asset screen that refuses what is not attested. Everything it enforces is written down — ruling by ruling, with sources — so you can check it yourself.",
    },
    honest: {
      title: "The honest result, stated first",
      summaryBadge:
        "In plain words: after the fees and the spreads actually paid, none of keel's shipped rules is profitable and none beats simple dollar-cost averaging (DCA) — including inside the venue's fee-free allowance, where this page used to say they touched break-even.",
      body: [
        "No shipped rule family is net positive at the taker fee actually paid on Coinbase — about 1.2% on each side of a trade. Every signal rule keel ships has now been measured at its shipped defaults across 24 assets: 0 of 120 configurations cleared. Counting every matrix we have run, it is 0 of 138.",
        "Fees are not the whole cost, and we had been understating the rest. keel prices each asset's spread from its own liquidity — and when we finally measured that against the universe, not one of the 24 assets trades at the 5 basis points our earlier numbers assumed. The range is 1.1 to 36.8 times that floor, with a median near ten times it. Charged honestly, the median result across the matrix drops by 0.09 and the one configuration that had looked positive disappears. The error in our own cost model was larger than the best genuine improvement any rule change of ours has produced.",
        "That correction reaches a claim this page used to make, so we are withdrawing it here rather than quietly editing it. We said the rules sit at break-even inside the venue's fee-free monthly allowance — a 14.9% win rate against a 14.88% break-even. That 14.88% was computed at the 5 basis points nothing actually trades at; the same note's own sensitivity check fails the claim at twice that, and the measured median is ten times it. The allowance is still the single largest term in the result, worth around 14 points of break-even — more than any change we have made to a rule. It is the boundary between decisively negative and clearly negative, not between negative and profitable.",
        "The point of this project is the enforcement machinery and the honest measurement of what runs through it, not a claim of profit. Every result is compared against a simple buy-every-period (DCA) benchmark, and the reference rules currently do not beat it after fees. We would rather you know that on the front page than discover it yourself. And we are working hard to improve the results of the algorithms and the strategies. We will report our progress here.",
      ],
      experimentLabel: "Read the experiment record",
      costLabel: "How execution is priced",
      announcementLabel: "Read the announcement",
    },
    verifyNote: "Verify in the repository",
    cards: [
      {
        title: "Screening that fails closed",
        body: "Market facts are computed; Shariah classifications are attested by a human — with a source and a name — never inferred from price data. An asset without an attestation is rejected, not passed by default.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "Twenty rails no order can skip",
        body: "Spend caps, drawdown breakers, exposure limits, no-martingale, feed-staleness checks, and a kill-switch that fails closed: when something breaks, it refuses rather than allows. Then the fiqh-derived rails — the venue subscription attestation, the constructive-possession (qabd) check, which holds that an asset you cannot withdraw may never have been validly possessed, and a refusal to sell a base the venue reports the account does not hold, because selling what you do not own is bay' ma la yamlik.",
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "Gates that refuse to flatter",
        body: "A rule walks candidate → paper → live. Promotion clears performance floors and an overfitting check: the probability of backtest overfitting, computed by combinatorially symmetric cross-validation (PBO/CSCV). A rule that looks brilliant on a single in-sample parameter set is exactly what that second gate exists to distrust.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "An evidence stack that can say no",
        body: "Every backtest trial is appended to a hash-chained trials ledger — keel trials verify walks the chain and reports any break. Around it, research modules that answer the honest questions: rule-family significance tested against break-even priced at the fee actually paid, probability of backtest overfitting (PBO/CSCV), Deflated Sharpe and Minimum Backtest Length, Monte Carlo and candle-bootstrap resampling, rolling-origin walk-forward. All report-only, under one rule — the Strathern rail: a score may report, and may gate, but may never be a ranking key.",
        verify: { label: "keel/research/", path: "keel/research", kind: "tree" },
      },
      {
        title: "A read-only MCP server for your assistant",
        body: "Point your own assistant at your own keel: keel mcp serves eight read-only tools over stdio — doctor findings, the capability inventory, profiles, orders, the veto log, the purification report, the trials ledger, the research corpora. It cannot place, halt, attest, promote or arm anything: the write surface does not exist, and PRAGMA query_only = ON enforces read-only at the engine level. No hosted chatbot, no account — the server is a local process on your machine.",
        verify: { label: "keel/mcp/tools.py", path: "keel/mcp/tools.py" },
        page: "assistant",
      },
    ],
    fatwa: {
      quote: "keel is not a fatwa engine. It is an enforcement engine for a ruling you supply.",
      body: [
        "keel never derives a Shariah classification from market data. You record one — with a source and an attributed name — and keel enforces it deterministically. The ruling lives in your attestation, not in the code, so two operators following different schools get different answers from the same code, by design.",
        "No scholarly review of keel's fiqh basis has occurred. The basis is one operator's sourced reading, published as a document precisely so it can be audited and challenged — and each operator is responsible for their own attestations.",
      ],
      more: "How compliance works, in plain terms",
    },
    review: {
      title: "Scholarly review: not reviewed — an open question, by design",
      body: [
        "The fiqh basis states plainly what a scholarly review would cover and what it would and would not signify. Until someone walks that path, the status is: not reviewed.",
      ],
      more: "Read the fiqh basis",
    },
    next: {
      title: "Where next?",
      items: [
        {
          title: "Install",
          body: "Try it in five minutes, read-only and paper-side. No funds move.",
        },
        {
          title: "Compliance, in plain terms",
          body: "What keel enforces, what it refuses to decide, and where your responsibility starts.",
        },
        {
          title: "Community",
          body: "Questions, ideas, and classification debate happen on GitHub Discussions.",
        },
      ],
    },
  },

  ar: {
    rev: "2026-09-05.1",
    translatedFromRev: "2026-09-05.1",
    title: "كيل: محرّك امتثال شرعي مفتوح المصدر للعملات المشفّرة",
    description:
      "المحرّك مفتوح المصدر الذي يُنفِّذ الامتثال الشرعي في التداول الفوري للعملات المشفّرة: فرزٌ موثَّق يرفض عند الفشل، وسككُ أمانٍ لا يتجاوزها أيُّ أمر. وليس محرّك فتاوى.",
    hero: {
      eyebrow: "مفتوح المصدر · Apache-2.0 · من CodeGate Software",
      heading: "امتثالٌ شرعيٌّ يمكنك تدقيقُه، لا مجرّدُ الوثوق به",
      sub: "كيل محرّكٌ مفتوح المصدر لتداول العملات المشفّرة الفوري (spot). فقبل تنفيذ أيِّ أمرِ تداولٍ يمرّ الأمر عبر سككِ أمانٍ لا تستطيع أيُّ شيفرةٍ تجاوزَها، وعبر فرزِ أصولٍ يرفض كلَّ ما ليس موثَّقًا. وكلُّ ما يُنفِّذه مكتوبٌ — حكمًا حكمًا مع مصادره — لتفحصه بنفسك.",
    },
    honest: {
      title: "النتيجة الصادقة، نقولها أولًا",
      summaryBadgeAr:
        "بلغةٍ مبسّطة: بعد خصم الرسوم وفوارقِ الأسعار المدفوعة فعليًّا، لا تحقّق أيُّ قاعدةٍ من قواعد كيل المُصدَّرة ربحًا ولا تتفوّق على الشراء الدوري المنتظم (DCA) — حتى داخل الحصّة الشهرية المعفاة من الرسوم، حيث كانت هذه الصفحة تقول إنّها تلامس نقطة التعادل.",
      body: [
        "لا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ (taker) المدفوعة فعليًّا على منصّة Coinbase‏ (نحو 1.2٪ لكلِّ طرفٍ من الصفقة). وقد قيست الآن كلُّ قاعدةِ إشارةٍ يُصدِّرها كيل عند إعداداتها المُصدَّرة على 24 أصلًا: صفرٌ من 120 تهيئةً اجتازت. وبعدِّ كلِّ مصفوفةٍ أجريناها: صفرٌ من 138.",
        "وليست الرسومُ كلَّ التكلفة، وقد كنّا نبخس ما بقي منها. فكيل يُسعّر فارقَ سعر كلِّ أصلٍ من سيولته هو — ولمّا قِسنا ذلك أخيرًا على الكون كلِّه، لم يتداول ولا أصلٌ واحدٌ من الأربعة والعشرين عند نقاط الأساس الخمس التي افترضتها أرقامُنا السابقة. بل يمتدّ المدى من 1.1 إلى 36.8 ضعفَ تلك الأرضية، ووسيطُه قرابةَ عشرة أضعافها. وبالتسعير الأمين ينخفض وسيطُ النتيجة عبر المصفوفة بمقدار 0.09، وتختفي التهيئةُ الوحيدة التي بدت موجبة. فقد كان الخطأ في نموذج تكلفتنا نحن أكبرَ من أفضل تحسينٍ حقيقيٍّ أنتجه أيُّ تعديلٍ أجريناه على قاعدة.",
        "وهذا التصحيح يطال دعوى كانت هذه الصفحة تقولها، فنحن نسحبها هنا جهارًا بدل تعديلها في صمت. قلنا إنّ القواعد تقف عند نقطة التعادل داخل الحصّة الشهرية المعفاة من الرسوم — نسبةُ ربحٍ 14.9٪ مقابل تعادلٍ عند 14.88٪. وتلك الـ14.88٪ حُسبت عند نقاط الأساس الخمس التي لا يتداول عندها شيء؛ بل إنّ فحص الحساسية في المذكّرة نفسِها يُسقط الدعوى عند ضعفَي ذلك، والوسيطُ المقيس عشرةُ أضعافه. وتبقى الحصّةُ أكبرَ حدٍّ منفردٍ في النتيجة، إذ تساوي نحو 14 نقطةً من التعادل — أكثرَ من أيّ تغييرٍ أدخلناه على قاعدة. لكنّها حدٌّ بين السالب القاطع والسالب الواضح، لا بين السالب والرابح.",
        "والغاية من هذا المشروع هي آلياتُ الإنفاذ والقياسُ الصادق لما يمرّ عبرها — لا ادّعاءُ الربح. فكلُّ نتيجةٍ تُقارَن بمؤشّرٍ مرجعيٍّ بسيط هو الشراء الدوري المنتظم (DCA)، والقواعد المرجعية لا تتفوّق عليه بعد خصم الرسوم. ونحن نفضّل أن تعرف ذلك من الصفحة الأولى على أن تكتشفه بنفسك. ونعمل جاهدين على تحسين نتائج الخوارزميات والاستراتيجيات — وسنوافيك بما نُحرزه أوّلًا بأوّل.",
      ],
      experimentLabel: "اقرأ سجلّ التجربة",
      costLabel: "كيف يُسعَّر التنفيذ",
      announcementLabel: "اقرأ الإعلان",
    },
    verifyNote: "تحقّق في المستودع",
    cards: [
      {
        title: "فرزٌ يرفض عند الفشل",
        body: "وقائعُ السوق تُحسَب؛ أمّا التصنيفات الشرعية فيوثّقها إنسانٌ — بمصدرٍ واسمٍ منسوب — ولا تُستنبَط من بيانات الأسعار أبدًا. والأصلُ الذي لا توثيق له مرفوضٌ، لا مقبولٌ افتراضيًّا.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "عشرون سكةَ أمانٍ لا يتجاوزها أيُّ أمر",
        body: "سقوفُ إنفاق، وقواطعُ تراجُعٍ (drawdown)، وحدودُ تعرُّض، ومنعُ مضاعفة الخسارة (المارتينغال)، وفحوصُ تقادُم موجزات البيانات، ومفتاحُ إيقافٍ يرفض عند الفشل — إضافةً إلى ما اشتُقّ من الفقه: توثيقُ الاشتراك في المنصّة، وفحصُ القبض الحُكمي (qabd) القائمُ على أنّ الأصل الذي لا يمكن سحبُه قد لا يكون قد قُبِض قبضًا صحيحًا، ورفضُ بيعِ أصلٍ تُفيد المنصّةُ أنّ الحساب لا يملكه، لأنّ بيعَ ما لا تملك غيرُ جائز.",
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "بواباتٌ لا تُجامِل",
        body: "تنتقل القاعدة من مرشَّحةٍ إلى تجريبيةٍ (paper) إلى حيّة. ولا تُرقَّى إلا إذا اجتازت حدودًا دنيا للأداء وفحصًا للإفراط في المُلاءمة — أي احتمالَ إفراط الاختبار الرجعي في المُلاءمة، محسوبًا بالتحقّق المتقاطع المتناظر توفيقيًّا (PBO/CSCV) — فالقاعدة التي تبدو عبقريةً على مجموعةِ وسائطَ واحدةٍ داخل العيّنة هي بالضبط ما وُجدت البوابةُ الثانية للارتياب فيه.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "كومةُ أدلّةٍ تستطيع قولَ «لا»",
        body: "كلُّ تجربةِ اختبارٍ رجعيٍّ تُضاف إلى سجلِّ تجاربَ مُسلسَلٍ بالتلبيد — والأمر keel trials verify يمشي على السلسلة ويُبلغ عن أيّ انكسار. وحول السجلِّ وحداتُ بحثٍ تجيب عن الأسئلة الصادقة: أهمّيّةُ عائلة القواعد مقيسةً مقابل نقطة التعادل المسعَّرة بالرسوم المدفوعة فعلًا، واحتمالُ الإفراط في المُلاءمة بالاختبار الرجعي (PBO/CSCV)، ونسبةُ شارب المُفرَّغة (Deflated Sharpe) والحدُّ الأدنى لطول الاختبار، ومحاكاةُ مونت كارلو وإعادةُ المعاينة بالشموع، والتحقّقُ المتقدِّم متعدِّد النوافذ (walk-forward). وكلُّها للتقرير فقط، تحت قاعدةٍ واحدة — سكةُ Strathern: الدرجةُ قد تُخبِر وقد تحبس، أمّا أن تكون مفتاحَ ترتيبٍ فلا أبدًا.",
        verify: { label: "keel/research/", path: "keel/research", kind: "tree" },
      },
      {
        title: "خادمُ MCP للقراءة فقط، لمساعدك الذكي",
        body: "وجِّه مساعدك الذكيَّ إلى كيلِك أنت: الأمر keel mcp يقدّم ثماني أدواتٍ للقراءة فقط عبر stdio — نتائجُ الفحص، وجردُ القدرات، والملفاتُ، والأوامر، وسجلُّ الرفض، وتقريرُ التطهير، وسجلُّ التجارب، ومصادرُ البحث. ولا يستطيع إصدارَ أمرًا أو إيقافَه أو توثيقَ شيءٍ أو ترقيتَه أو تسليحَه: فسطحُ الكتابة غير موجودٍ أصلًا، وPRAGMA query_only = ON يفرض القراءةَ فقط على مستوى المحرّك. لا روبوتَ محادثةٍ مستضاف ولا حساب — الخادمُ عمليةٌ محليّةٌ على جهازك.",
        verify: { label: "keel/mcp/tools.py", path: "keel/mcp/tools.py" },
        page: "assistant",
      },
    ],
    fatwa: {
      quote: "كيل ليس محرّك فتاوى؛ بل محرّكُ إنفاذٍ لحكمٍ شرعيٍّ أنت من يزوّده به.",
      body: [
        "لا يستنبط كيل تصنيفًا شرعيًّا من بيانات السوق أبدًا. أنت تسجّل التصنيف — بمصدرٍ واسمٍ منسوبٍ إليه — وكيل ينفّذه تنفيذًا حتميًّا. فالحكم يسكن توثيقَك لا الشيفرةَ، ولذلك يحصل مُشغّلان يتبعان مذهبين مختلفين على إجابتين مختلفتين من الشيفرة نفسها، وهذا مقصودٌ بالتصميم.",
        "ولم تَجرِ أيُّ مراجعةٍ علميةٍ شرعيةٍ للأساس الفقهي لكيل. فالأساس قراءةٌ موثّقةُ المصادر لمُشغّلٍ واحد، نُشرت مستندًا تحديدًا لتُدقَّق ويُعترَض عليها — وكلُّ مشغّلٍ مسؤولٌ عن توثيقاته الخاصة.",
      ],
      more: "كيف يعمل الامتثال، بلغةٍ مبسّطة",
    },
    review: {
      title: "المراجعة العلمية: غير مُراجَع — سؤالٌ مفتوحٌ عن قصد",
      body: [
        "يبيّن الأساس الفقهي صراحةً ما ستغطّيه المراجعة العلمية، وما تعنيه وما لا تعنيه. وما لم يسلك أحدٌ هذا الطريق، فالحالة هي: غير مُراجَع.",
      ],
      more: "اقرأ الأساس الفقهي",
    },
    next: {
      title: "إلى أين بعد ذلك؟",
      items: [
        { title: "التثبيت", body: "جرّبه في خمس دقائق، بصلاحية القراءة فقط وعلى جانب التداول التجريبي. ولا تتحرّك أيُّ أموال." },
        { title: "الامتثال بلغةٍ مبسّطة", body: "ما يُنفّذه كيل، وما يرفض أن يقرّره، وأين تبدأ مسؤوليتك." },
        { title: "المجتمع", body: "الأسئلة والأفكار ونقاش التصنيف تجري في نقاشات GitHub." },
      ],
    },
  },

  fr: {
    rev: "2026-09-05.1",
    translatedFromRev: "2026-09-05.1",
    title: "keel : le moteur open-source de conformité Shariah pour les cryptomonnaies",
    description:
      "Le moteur open-source qui applique la conformité Shariah au trading de crypto au comptant : un filtrage attesté qui bloque par défaut, des garde-fous qu'aucun ordre ne contourne. Pas un moteur de fatwas.",
    hero: {
      eyebrow: "Open source · Apache-2.0 · par CodeGate Software",
      heading: "Une conformité Shariah que vous pouvez auditer, pas seulement croire sur parole",
      sub: "keel est un moteur open-source pour le trading de crypto au comptant (spot). Avant qu'un ordre parte, il traverse des garde-fous qu'aucun code ne peut désactiver et un filtre d'actifs qui refuse tout ce qui n'est pas attesté. Tout ce qu'il applique est écrit — règle par règle, sources à l'appui — pour que vous puissiez le vérifier vous-même.",
    },
    honest: {
      title: "Le résultat honnête, annoncé d'emblée",
      summaryBadgeFr: "En clair : une fois les frais et les écarts de cotation réellement payés déduits, aucune règle livrée de keel n'est rentable et aucune ne bat le simple achat périodique (DCA) — y compris dans le quota mensuel sans frais, où cette page affirmait qu'elles touchaient le point mort.",
      body: [
        "Aucune famille de règles livrée ne dégage un résultat net positif aux frais de preneur (taker) réellement payés sur Coinbase (~1,2 % par sens). Chaque règle de signal que keel livre a désormais été mesurée à ses réglages livrés sur 24 actifs : 0 configuration sur 120 n'a franchi le seuil. Toutes matrices confondues, c'est 0 sur 138.",
        "Les frais ne sont pas tout le coût, et nous sous-estimions le reste. keel calcule l'écart de cotation de chaque actif à partir de sa propre liquidité — et lorsque nous l'avons enfin mesuré sur l'ensemble de l'univers, pas un seul des 24 actifs ne se négocie aux 5 points de base que supposaient nos chiffres antérieurs. L'éventail va de 1,1 à 36,8 fois ce plancher, avec une médiane proche de dix fois. Facturé honnêtement, le résultat médian de la matrice recule de 0,09 et la seule configuration qui paraissait positive disparaît. L'erreur de notre propre modèle de coûts était plus grande que la meilleure amélioration réelle qu'aucune de nos modifications de règle ait produite.",
        "Cette correction atteint une affirmation que portait cette page ; nous la retirons donc ici, plutôt que de la corriger en silence. Nous disions que les règles se situent au point mort dans le quota mensuel sans frais — 14,9 % de trades gagnants pour un seuil d'équilibre de 14,88 %. Ce 14,88 % était calculé aux 5 points de base auxquels rien ne se négocie ; le propre test de sensibilité de la note fait tomber l'affirmation au double de ce chiffre, et la médiane mesurée en vaut dix fois. Le quota reste le terme le plus lourd du résultat — environ 14 points de seuil d'équilibre, davantage que toute modification que nous ayons apportée à une règle. Mais c'est la frontière entre nettement perdant et clairement perdant, non entre perdant et rentable.",
        "Ce projet a pour objet la machinerie d'application, et la mesure honnête de ce qui la traverse — pas une promesse de gain. Chaque résultat est comparé à une référence simple, l'achat périodique (DCA), et les règles de référence ne la battent pas une fois les frais déduits. Nous préférons que vous l'appreniez dès la page d'accueil plutôt que de le découvrir par vous-même. Nous nous employons à améliorer les résultats des algorithmes et des stratégies, et nous rendrons compte de nos progrès.",
      ],
      experimentLabel: "Lire le compte rendu de l'expérience",
      costLabel: "Comment l'exécution est tarifée",
      announcementLabel: "Lire l'annonce",
    },
    verifyNote: "Vérifier dans le dépôt",
    cards: [
      {
        title: "Un filtrage qui bloque par défaut",
        body: "Les faits de marché se calculent ; les classifications Shariah, elles, sont attestées par un humain — avec une source et un nom — jamais déduites des cours. Un actif sans attestation est rejeté, pas admis par défaut.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "Vingt garde-fous qu'aucun ordre ne contourne",
        body: "Plafonds de dépense, disjoncteurs de perte maximale (drawdown), limites d'exposition, interdiction de la martingale, contrôles de fraîcheur des données, un coupe-circuit qui se ferme en cas de défaillance — auxquels s'ajoutent ceux qui découlent du fiqh : l'attestation d'abonnement à la plateforme, le contrôle de prise de possession (qabd), au motif qu'un actif impossible à retirer n'a peut-être jamais été valablement possédé, et le refus de vendre un actif que la plateforme déclare absent du compte, car vendre ce qu'on ne possède pas est bay' ma la yamlik.",
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "Des verrous qui ne flattent personne",
        body: "Une règle passe par trois états : candidate, papier, réel. Pour être promue, elle doit franchir des seuils de performance et un contrôle de surapprentissage — la probabilité que le backtest soit surajusté, calculée par validation croisée combinatoirement symétrique (PBO/CSCV) — car une règle qui brille sur un seul jeu de paramètres, à l'intérieur de l'échantillon, est précisément ce dont le second verrou est là pour se méfier.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "Une pile de preuves capable de dire non",
        body: "Chaque essai de backtest est ajouté à un registre d'essais chaîné par hachage — keel trials verify parcourt la chaîne et signale toute rupture. Autour de lui, des modules de recherche qui répondent aux questions honnêtes : significativité de la famille de règles testée contre le point mort aux frais réellement payés, probabilité de surapprentissage du backtest (PBO/CSCV), ratio de Sharpe dégonflé et longueur minimale de backtest, Monte Carlo et rééchantillonnage par bougies, validation walk-forward à origine glissante. Tous en mode rapport uniquement, sous une seule règle — le rail Strathern : un score peut informer et peut verrouiller, mais ne peut jamais servir de clé de classement.",
        verify: { label: "keel/research/", path: "keel/research", kind: "tree" },
      },
      {
        title: "Un serveur MCP en lecture seule pour votre assistant",
        body: "Pointez votre propre assistant sur votre propre keel : keel mcp sert huit outils en lecture seule via stdio — constats du doctor, inventaire des capacités, profils, ordres, journal des vetos, rapport de purification, registre des essais, corpus de recherche. Il ne peut ni passer, ni arrêter, ni attester, ni promouvoir, ni armer quoi que ce soit : la surface d'écriture n'existe pas, et PRAGMA query_only = ON impose la lecture seule au niveau du moteur. Pas de chatbot hébergé, pas de compte — le serveur est un processus local sur votre machine.",
        verify: { label: "keel/mcp/tools.py", path: "keel/mcp/tools.py" },
        page: "assistant",
      },
    ],
    fatwa: {
      quote: "keel n'est pas un moteur de fatwas : c'est un moteur qui applique une règle que vous lui fournissez.",
      body: [
        "keel ne déduit jamais une classification Shariah des données de marché. C'est vous qui l'enregistrez — avec une source et un nom — et keel l'applique de façon déterministe. La règle réside dans votre attestation, pas dans le code : deux opérateurs qui suivent des écoles différentes obtiennent, du même code, des réponses différentes. C'est voulu.",
        "La base fiqh de keel n'a fait l'objet d'aucun examen par des savants. Elle est la lecture sourcée d'un seul opérateur, publiée sous forme de document précisément pour être auditée et contestée — et chaque opérateur répond de ses propres attestations.",
      ],
      more: "Comment fonctionne la conformité, en termes simples",
    },
    review: {
      title: "Examen par des savants : aucun à ce jour — une question ouverte, par conception",
      body: [
        "La base fiqh dit clairement ce que couvrirait un examen par des savants, et ce qu'il signifierait ou non. Tant que personne n'a fait ce chemin, le statut reste : non examinée.",
      ],
      more: "Lire la base fiqh",
    },
    next: {
      title: "Et maintenant ?",
      items: [
        { title: "Installation", body: "Essayez keel en cinq minutes, en lecture seule et côté papier. Aucun mouvement de fonds." },
        { title: "La conformité, en termes simples", body: "Ce que keel applique, ce qu'il refuse de trancher, et où commence votre responsabilité." },
        { title: "Communauté", body: "Les questions, les idées et les débats de classification ont lieu dans les Discussions GitHub." },
      ],
    },
  },
};
