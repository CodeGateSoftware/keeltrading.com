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
    rev: "2026-08-20.3",
    title: "Keel: Open-Source Shariah Compliance Engine for Crypto",
    description:
      "The open-source engine that enforces Shariah compliance on spot crypto: attested screening that fails closed and rails no order can skip. Not a fatwa engine.",
    hero: {
      eyebrow: "Open source · Apache-2.0 · by CodeGate Software",
      heading: "Shariah compliance you can audit, not just trust",
      sub: "keel is an open-source engine for spot crypto trading. Before any order is placed, it passes through safety rails no code can override and an asset screen that refuses what is not attested. Everything it enforces is written down — ruling by ruling, with sources — so you can check it yourself.",
    },
    honest: {
      title: "The honest result, stated first",
      body: [
        "No shipped rule family is net-positive at the taker fee actually paid on Coinbase (~1.2% per leg) — 0 of 90 configurations in one measurement matrix, 0 of 82 in another. We cross-verified a stochastic modelling note — re-derived its mathematics against keel's real numbers — and it sharpened the why: the taker fee is the entire result. Inside the venue's fee-free monthly allowance the reconstructed rules sit indistinguishably at break-even (a 14.9% win rate against a 14.88% break-even); one step outside it, break-even jumps to 29% and the same rules are decisively negative. The allowance rail is not a budget cap — it is the profitability boundary.",
        "The point of this project is the enforcement machinery and the honest measurement of what runs through it — not a claim of profit. Every result is compared against a simple buy-every-period (DCA) benchmark, and the reference rules currently do not beat it after fees. We would rather you know that on the front page than discover it yourself. And we are working hard to improve the algorithms' and strategies' results — we will keep you updated with our progress.",
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
        body: "Spend caps, drawdown breakers, exposure limits, no-martingale, feed-staleness checks, a fail-closed kill-switch — plus the fiqh-derived ones: the venue subscription attestation and the constructive-possession (qabd) check that an asset which cannot be withdrawn may not have been validly possessed.",
      },
      {
        title: "Gates that refuse to flatter",
        body: "A rule walks candidate → paper → live. Promotion clears performance floors and an overfitting check (PBO/CSCV) — a rule that looks brilliant on one in-sample parameter set is exactly what the second gate exists to be suspicious of.",
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
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
    title: "كيل: محرّك امتثال شرعي مفتوح المصدر للعملات المشفّرة",
    description:
      "محرّك مفتوح المصدر يُنفّذ الامتثال الشرعي في التداول الفوري للعملات المشفّرة: فرزٌ موثَّق يرفض عند غياب الدليل، وسكك أمان لا تُتجاوز، وقياسٌ صادق. ليس محرّك فتاوى.",
    hero: {
      eyebrow: "مفتوح المصدر · Apache-2.0 · من CodeGate Software",
      heading: "امتثال شرعي يمكنك تدقيقُه، لا مجرّد ثقةٍ به",
      sub: "كيل محرّك مفتوح المصدر لتداول العملات المشفّرة الفوري (Spot). قبل تنفيذ أي أمر تداول يمرّ عبر سكك أمان لا تستطيع الشيفرة تجاوزها، وفرزِ أصولٍ يرفض كلَّ ما ليس موثَّقًا. وكل ما يُنفّده مكتوبٌ — حكمًا حكمًا مع المصادر — لتفحصه بنفسك.",
    },
    honest: {
      title: "النتيجة الصادقة، نقولها نحن أولًا",
      body: [
        "لا توجد عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ المدفوعة فعليًا على Coinbase‏ (~1.2٪ للاتجاه الواحد) — صفرٌ من 90 تكوينًا في مصفوفة قياس، وصفرٌ من 82 في أخرى. تحقّقنا مرجعيًّا من مذكرة نمذجةٍ عشوائية — أعدنا اشتقاق رياضياتها على أرقام كيل الحقيقية — فحدّدت السبب بدقّة: رسوم الآخذ هي النتيجة كلها. داخل بدل الحجم الشهري الخالي من الرسوم في المنصّة تجلس القواعد المُعاد بناؤها عند التعادل تمامًا (معدل فوز 14.9٪ مقابل نقطة تعادل 14.88٪)؛ وبخطوةٍ خارجه تقفز نقطة التعادل إلى 29٪ فتصبح القواعد نفسها سالبةً بوضوح. سكة البدل ليست سقفَ ميزانية — إنما هي حدُّ الربحية.",
        "جوهر هذا المشروع هو آليات الإنفاذ والقياس الصادق لما يمرّ عبرها — لا ادّعاء ربح. تُقارَن كل نتيجة بمقياس الشراء الدوري المنتظم (DCA)، والقواعد المرجعية لا تتغلب عليه بعد الرسوم. نفضّل أن تعرف ذلك من الصفحة الأولى على أن تكتشفه بنفسك. ونعمل بجدٍّ على تحسين نتائج الخوارزميات والاستراتيجيات — وسنوافيكم بتقدّمنا أولًا بأول.",
      ],
      experimentLabel: "اقرأ سجلّ التجربة",
      announcementLabel: "اقرأ الإعلان",
    },
    cards: [
      {
        title: "فرزٌ يفشل مغلقًا",
        body: "الوقائع السوقية تُحسَب؛ أمّا التصنيفات الشرعية فيوثّقها إنسان — بمصدرٍ واسمٍ منسوب — ولا تُستنبَط من بيانات الأسعار أبدًا. الأصل بلا توثيقٍ يُرفَض، ولا يُقبَل افتراضيًا.",
      },
      {
        title: "ثمانية عشر سكة أمان لا يتخطّاها أمرٌ واحد",
        body: "سقوف إنفاق، وقواطع سحب، وحدود تعرّض، ومنع مضاعفة الخسارة (المارتينغال)، وفحوص قِدَم البيانات، ومفتاح إيقاف يفشل مغلقًا — إضافةً إلى ما اشتُقّ من الفقه: توثيقُ اشتراك المنصّة، وفحصُ القبض الحُكمي (§65.4): الأصل الذي لا يمكن سحبُه قد لا يكون مملوكًا قبضًا صحيحًا.",
      },
      {
        title: "بواباتٌ لا تجامِل",
        body: "القاعدة تسير مرشّحًا ← تجريبيًا (paper) ← حيًّا. والترقية تتجاوز أرضيات أداء وفحصَ فرطِ مواءمة (PBO/CSCV) — فالقاعدة التي تبدو عبقرية على مجموعة معاملاتٍ واحدة داخل العيّنة هي بالضبط ما وُجدت البوابة الثانية للاشتباه به.",
      },
    ],
    fatwa: {
      quote: "كيل ليس محرّك فتاوى؛ إنه محرّك إنفاذٍ لحكمٍ شرعيٍّ أنت من يزوّده.",
      body: [
        "كيل لا يستنبط تصنيفًا شرعيًّا من بيانات السوق أبدًا. أنت تسجّل التصنيف — بمصدرٍ واسمٍ منسوبٍ إليه — وكيل ينفّذه حتميًّا. الحكم يسكن توثيقك لا الشيفرة، ولذلك يحصل مُشغّلان يتبعان مذهبين مختلفين على إجابتين مختلفتين من الشيفرة نفسها، بتصميمٍ مقصود.",
        "لم تَجرِ أي مراجعة علمية شرعية للأساس الفقهي لكيل. الأساس قراءةٌ موثّقة المصادر لمُشغّل واحد، نُشر مستندًا تحديدًا ليُدقَّق ويُعترَض عليه — وكل مشغّل مسؤول عن توثيقاته الخاصة.",
      ],
      more: "كيف يعمل الامتثال، بلغة مبسّطة",
    },
    review: {
      title: "المراجعة العلمية: غير مُراجَع — سؤال مفتوح عن قصد",
      body: [
        "يصرّح الأساس الفقهي بما ستغطّيه مراجعةٌ علمية وماذا تعني ولا تعني. وما لم يمشِ أحدٌ هذا الطريق، فالحالة: غير مُراجَع.",
      ],
      more: "اقرأ الأساس الفقهي",
    },
    next: {
      title: "إلى أين الآن؟",
      items: [
        { title: "التثبيت", body: "جرّبه في خمس دقائق، للقراءة فقط ومن جهة التداول الافتراضي. لا تتحرك أموال." },
        { title: "الامتثال بلغة مبسّطة", body: "ما يُنفّذه كيل، وما يرفض أن يقرّره، وحيث تبدأ مسؤوليتك." },
        { title: "المجتمع", body: "الأسئلة والأفكار ونقاش التصنيف تجري في نقاشات GitHub." },
      ],
    },
  },

  fr: {
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
    title: "Keel : le moteur open-source de conformité Shariah pour les cryptomonnaies",
    description:
      "Le moteur open-source qui applique la conformité Shariah au trading de crypto au comptant : un filtrage attesté qui bloque par défaut, des garde-fous qu'aucun ordre ne contourne. Pas un moteur de fatwas.",
    hero: {
      eyebrow: "Open source · Apache-2.0 · par CodeGate Software",
      heading: "Une conformité Shariah que vous pouvez auditer, pas seulement croire sur parole",
      sub: "keel est un moteur open-source pour le trading de crypto au comptant (spot). Avant qu'un ordre parte, il traverse des garde-fous qu'aucun code ne peut désactiver et un filtre d'actifs qui refuse tout ce qui n'est pas attesté. Tout ce qu'il applique est écrit — règle par règle, sources à l'appui — pour que vous puissiez le vérifier vous-même.",
    },
    honest: {
      title: "Le résultat honnête, annoncé d'emblée",
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
        body: "Une règle passe par trois états : candidate, papier, réel. Pour être promue, elle doit franchir des seuils de performance et un contrôle de surapprentissage (PBO/CSCV) — car une règle qui brille sur un seul jeu de paramètres, à l'intérieur de l'échantillon, est précisément ce dont le second verrou est là pour se méfier.",
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
