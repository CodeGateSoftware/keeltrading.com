import type { LocalizedPage } from "../config";

/**
 * Home (FR-2): what keel is in plain English (and plain Arabic), the honest
 * posture first, and the primary CTAs. Copy is grounded in the engine repo's
 * README — nothing here claims more than the repo can show (FR-2 rule).
 */
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
    summaryBadge: string;
    body: string[];
    experimentLabel: string;
    announcementLabel: string;
  };
  cards: { title: string; body: string }[];
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
    rev: "2026-08-20.4",
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
      summaryBadge: "In plain terms: Platform trading fees mean the reference rules currently do not beat simple dollar-cost averaging (DCA). We state this upfront so you evaluate the compliance machinery without false profit expectations.",
      body: [
        "No shipped rule family is net positive at the taker fee actually paid on Coinbase — about 1.2% on each side of a trade. In one measurement matrix, 0 of 90 configurations cleared; in another, 0 of 82. We then cross-verified a stochastic modelling note, re-deriving its mathematics against keel's real numbers, and it sharpened the why: the taker fee is the entire result. Inside the venue's fee-free monthly allowance, the reconstructed rules sit indistinguishably at break-even — a 14.9% win rate against a 14.88% break-even. One step outside it, break-even jumps to 29% and the same rules are decisively negative. The allowance rail is not a budget cap. It is the profitability boundary.",
        "The point of this project is the enforcement machinery and the honest measurement of what runs through it, not a claim of profit. Every result is compared against a simple buy-every-period (DCA) benchmark, and the reference rules currently do not beat it after fees. We would rather you know that on the front page than discover it yourself. And we are working hard to improve the results of the algorithms and the strategies. We will report our progress here.",
      ],
      experimentLabel: "Read the experiment record",
      announcementLabel: "Read the announcement",
    },
    cards: [
      {
        title: "Screening that fails closed",
        body: "Market facts are computed; Shariah classifications are attested by a human — with a source and a name — never inferred from price data. An asset without an attestation is rejected, not passed by default.",
      },
      {
        title: "Eighteen rails no order can skip",
        body: "Spend caps, drawdown breakers, exposure limits, no-martingale, feed-staleness checks, and a kill-switch that fails closed: when something breaks, it refuses rather than allows. Then the fiqh-derived rails — the venue subscription attestation, and the constructive-possession (qabd) check, which holds that an asset you cannot withdraw may never have been validly possessed.",
      },
      {
        title: "Gates that refuse to flatter",
        body: "A rule walks candidate → paper → live. Promotion clears performance floors and an overfitting check: the probability of backtest overfitting, computed by combinatorially symmetric cross-validation (PBO/CSCV). A rule that looks brilliant on a single in-sample parameter set is exactly what that second gate exists to distrust.",
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
    rev: "2026-08-20.4",
    translatedFromRev: "2026-08-20.4",
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
      summaryBadge: "باختصار: رسوم التداول لدى المنصات تجعل القواعد المرجعية حاليًا لا تتفوق على الشراء الدوري المنتظم (DCA). ونحن ننشر هذا أولًا لتفحص آليات الامتثال بلا توقعات أرباح زائفة.",
      body: [
        "لا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ (taker) المدفوعة فعليًّا على منصّة Coinbase‏ (نحو 1.2٪ لكلِّ طرفٍ من الصفقة) — صفرٌ من 90 تهيئةً في إحدى مصفوفات القياس، وصفرٌ من 82 في أخرى. وقد تحقّقنا تحقّقًا مستقلًّا من مذكّرةِ نمذجةٍ عشوائية — إذ أعدنا اشتقاق رياضياتها على أرقام كيل الحقيقية — فجلَّت السبب: رسومُ الآخذ هي النتيجة كلُّها. فداخل الحصّة الشهرية المعفاة من الرسوم لدى المنصّة، تقف القواعد المُعاد بناؤها عند نقطة التعادل بلا فرقٍ يُذكر (نسبةُ ربحٍ 14.9٪ مقابل نقطة تعادلٍ عند 14.88٪)؛ وبخطوةٍ واحدةٍ خارجها تقفز نقطةُ التعادل إلى 29٪ فتصير القواعد نفسها سالبةً بوضوح. فسكةُ الحصّة ليست سقفًا للميزانية — بل هي حدُّ الربحية.",
        "والغاية من هذا المشروع هي آلياتُ الإنفاذ والقياسُ الصادق لما يمرّ عبرها — لا ادّعاءُ الربح. فكلُّ نتيجةٍ تُقارَن بمؤشّرٍ مرجعيٍّ بسيط هو الشراء الدوري المنتظم (DCA)، والقواعد المرجعية لا تتفوّق عليه بعد خصم الرسوم. ونحن نفضّل أن تعرف ذلك من الصفحة الأولى على أن تكتشفه بنفسك. ونعمل جاهدين على تحسين نتائج الخوارزميات والاستراتيجيات — وسنوافيك بما نُحرزه أوّلًا بأوّل.",
      ],
      experimentLabel: "اقرأ سجلّ التجربة",
      announcementLabel: "اقرأ الإعلان",
    },
    cards: [
      {
        title: "فرزٌ يرفض عند الفشل",
        body: "وقائعُ السوق تُحسَب؛ أمّا التصنيفات الشرعية فيوثّقها إنسانٌ — بمصدرٍ واسمٍ منسوب — ولا تُستنبَط من بيانات الأسعار أبدًا. والأصلُ الذي لا توثيق له مرفوضٌ، لا مقبولٌ افتراضيًّا.",
      },
      {
        title: "ثماني عشرة سكةَ أمانٍ لا يتجاوزها أيُّ أمر",
        body: "سقوفُ إنفاق، وقواطعُ تراجُعٍ (drawdown)، وحدودُ تعرُّض، ومنعُ مضاعفة الخسارة (المارتينغال)، وفحوصُ تقادُم موجزات البيانات، ومفتاحُ إيقافٍ يرفض عند الفشل — إضافةً إلى ما اشتُقّ من الفقه: توثيقُ الاشتراك في المنصّة، وفحصُ القبض الحُكمي (qabd) القائمُ على أنّ الأصل الذي لا يمكن سحبُه قد لا يكون قد قُبِض قبضًا صحيحًا.",
      },
      {
        title: "بواباتٌ لا تُجامِل",
        body: "تنتقل القاعدة من مرشَّحةٍ إلى تجريبيةٍ (paper) إلى حيّة. ولا تُرقَّى إلا إذا اجتازت حدودًا دنيا للأداء وفحصًا للإفراط في المُلاءمة — أي احتمالَ إفراط الاختبار الرجعي في المُلاءمة، محسوبًا بالتحقّق المتقاطع المتناظر توفيقيًّا (PBO/CSCV) — فالقاعدة التي تبدو عبقريةً على مجموعةِ وسائطَ واحدةٍ داخل العيّنة هي بالضبط ما وُجدت البوابةُ الثانية للارتياب فيه.",
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
    rev: "2026-08-20.4",
    translatedFromRev: "2026-08-20.4",
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
      summaryBadge: "En résumé : Les frais de plateforme font que les règles de référence ne battent pas le simple achat périodique (DCA). Nous le publions d'emblée pour que vous évaluiez la machinerie de conformité sans fausses promesses de gain.",
      body: [
        "Aucune famille de règles livrée ne dégage un résultat net positif aux frais de preneur (taker) réellement payés sur Coinbase (~1,2 % par sens) — 0 configuration sur 90 dans une matrice de mesure, 0 sur 82 dans une autre. Nous avons recoupé une note de modélisation stochastique — en refaisant ses calculs sur les chiffres réels de keel — et elle a précisé le pourquoi : les frais de preneur font tout le résultat. Dans le quota mensuel sans frais offert par la plateforme, les règles reconstruites se situent au point mort, à l'indiscernable près (14,9 % de trades gagnants pour un seuil d'équilibre de 14,88 %) ; un pas au-delà, ce seuil bondit à 29 % et les mêmes règles deviennent nettement perdantes. Le garde-fou de quota n'est pas un plafond budgétaire : c'est la frontière de la rentabilité.",
        "Ce projet a pour objet la machinerie d'application, et la mesure honnête de ce qui la traverse — pas une promesse de gain. Chaque résultat est comparé à une référence simple, l'achat périodique (DCA), et les règles de référence ne la battent pas une fois les frais déduits. Nous préférons que vous l'appreniez dès la page d'accueil plutôt que de le découvrir par vous-même. Nous nous employons à améliorer les résultats des algorithmes et des stratégies, et nous rendrons compte de nos progrès.",
      ],
      experimentLabel: "Lire le compte rendu de l'expérience",
      announcementLabel: "Lire l'annonce",
    },
    cards: [
      {
        title: "Un filtrage qui bloque par défaut",
        body: "Les faits de marché se calculent ; les classifications Shariah, elles, sont attestées par un humain — avec une source et un nom — jamais déduites des cours. Un actif sans attestation est rejeté, pas admis par défaut.",
      },
      {
        title: "Dix-huit garde-fous qu'aucun ordre ne contourne",
        body: "Plafonds de dépense, disjoncteurs de perte maximale (drawdown), limites d'exposition, interdiction de la martingale, contrôles de fraîcheur des données, un coupe-circuit qui se ferme en cas de défaillance — auxquels s'ajoutent ceux qui découlent du fiqh : l'attestation d'abonnement à la plateforme et le contrôle de prise de possession (qabd), au motif qu'un actif impossible à retirer n'a peut-être jamais été valablement possédé.",
      },
      {
        title: "Des verrous qui ne flattent personne",
        body: "Une règle passe par trois états : candidate, papier, réel. Pour être promue, elle doit franchir des seuils de performance et un contrôle de surapprentissage — la probabilité que le backtest soit surajusté, calculée par validation croisée combinatoirement symétrique (PBO/CSCV) — car une règle qui brille sur un seul jeu de paramètres, à l'intérieur de l'échantillon, est précisément ce dont le second verrou est là pour se méfier.",
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
