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
    rev: "2026-08-20.2",
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
        "No shipped rule family is net-positive at the taker fee actually paid on Coinbase (~1.2% per leg) — 0 of 90 configurations in one measurement matrix, 0 of 82 in another. A cross-verified modelling review (Dr. Issam Elhattab's stochastic note, re-derived against keel's real numbers) sharpened the why: the taker fee is the entire result. Inside the venue's fee-free monthly allowance the reconstructed rules sit indistinguishably at break-even (a 14.9% win rate against a 14.88% break-even); one step outside it, break-even jumps to 29% and the same rules are decisively negative. The allowance rail is not a budget cap — it is the profitability boundary.",
        "The point of this project is the enforcement machinery and the honest measurement of what runs through it — not a claim of profit. Every result is compared against a simple buy-every-period (DCA) benchmark, and the reference rules currently do not beat it after fees. We would rather you know that on the front page than discover it yourself.",
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
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
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
        "لا توجد عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ المدفوعة فعليًا على Coinbase‏ (~1.2٪ للاتجاه الواحد) — صفرٌ من 90 تكوينًا في مصفوفة قياس، وصفرٌ من 82 في أخرى. مراجعةُ نمذجةٍ جرى التحقق المرجعي منها (مذكرة النمذجة العشوائية للدكتور عصام الهتّاب، أُعيد اشتقاقها على أرقام كيل الحقيقية) حدّدت السبب بدقّة: رسوم الآخذ هي النتيجة كلها. داخل بدل الحجم الشهري الخالي من الرسوم في المنصّة تجلس القواعد المُعاد بناؤها عند التعادل تمامًا (معدل فوز 14.9٪ مقابل نقطة تعادل 14.88٪)؛ وبخطوةٍ خارجه تقفز نقطة التعادل إلى 29٪ فتصبح القواعد نفسها سالبةً بوضوح. سكة البدل ليست سقفَ ميزانية — إنما هي حدُّ الربحية.",
        "جوهر هذا المشروع هو آليات الإنفاذ والقياس الصادق لما يمرّ عبرها — لا ادّعاء ربح. تُقارَن كل نتيجة بمقياس الشراء الدوري المنتظم (DCA)، والقواعد المرجعية لا تتغلب عليه بعد الرسوم. نفضّل أن تعرف ذلك من الصفحة الأولى على أن تكتشفه بنفسك.",
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
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
    title: "Keel : le moteur open-source de conformité Shariah pour le crypto",
    description:
      "keel est un moteur open-source qui applique la conformité Shariah au trading de crypto en spot : filtrage par attestation à échec fermé, rails incontournables, mesure honnête. Pas un moteur de fatwas.",
    hero: {
      eyebrow: "Open source · Apache-2.0 · par CodeGate Software",
      heading: "Une conformité Shariah que vous pouvez auditer, pas seulement croire",
      sub: "keel est un moteur open-source pour le trading de crypto en spot. Avant tout ordre, il passe par des rails de sécurité qu'aucun code ne peut contourner et un filtre d'actifs qui refuse tout ce qui n'est pas attesté. Tout ce qu'il applique est écrit — règle par règle, avec les sources — pour que vous puissiez le vérifier vous-même.",
    },
    honest: {
      title: "Le résultat honnête, dit d'abord",
      body: [
        "Aucune famille de règles livrée n'est nette-positive aux frais preneur réellement payés sur Coinbase (~1,2 % par jambe) — 0 sur 90 configurations dans une matrice de mesure, 0 sur 82 dans une autre. Une revue de modélisation contre-vérifiée (la note stochastique du Dr Issam Elhattab, redérivée sur les chiffres réels de keel) a précisé le pourquoi : les frais preneur sont tout le résultat. À l'intérieur de l'allocation mensuelle sans frais de la place, les règles reconstruites se tiennent indissociablement au point mort (taux de réussite de 14,9 % contre un seuil de 14,88 %) ; un pas au-dehors, le seuil saute à 29 % et les mêmes règles deviennent nettement négatives. Le rail d'allocation n'est pas un plafond budgétaire — c'est la frontière de rentabilité.",
        "Le but de ce projet est la machinerie d'application et la mesure honnête de ce qui la traverse — pas une promesse de profit. Chaque résultat est comparé à un repère d'achat périodique simple (DCA), et les règles de référence ne le battent pas après frais. Nous préférons que vous le sachiez dès la page d'accueil plutôt que de le découvrir vous-même.",
      ],
      experimentLabel: "Lire le compte rendu de l'expérience",
      announcementLabel: "Lire l'annonce",
    },
    cards: [
      {
        title: "Un filtrage qui échoue fermé",
        body: "Les faits de marché sont calculés ; les classifications Shariah sont attestées par un humain — avec une source et un nom — jamais déduites des prix. Un actif sans attestation est rejeté, jamais accepté par défaut.",
      },
      {
        title: "Dix-huit rails qu'aucun ordre ne saute",
        body: "Plafonds de dépense, disjoncteurs de drawdown, limites d'exposition, pas de martingale, contrôles de fraîcheur des données, un interrupteur d'arrêt à échec fermé — plus ceux dérivés du fiqh : l'attestation d'abonnement à la plateforme et le contrôle de possession constructive (qabd) : un actif qu'on ne peut pas retirer n'a peut-être jamais été possédé valablement.",
      },
      {
        title: "Des portes qui refusent de flatter",
        body: "Une règle parcourt candidate → papier → réel. La promotion franchit des planchers de performance et un contrôle de surapprentissage (PBO/CSCV) — une règle brillante sur un seul jeu de paramètres en échantillon est précisément ce que la seconde porte existe pour soupçonner.",
      },
    ],
    fatwa: {
      quote: "keel n'est pas un moteur de fatwas. C'est un moteur d'application d'une règle que vous fournissez.",
      body: [
        "keel ne déduit jamais une classification Shariah des données de marché. Vous l'enregistrez — avec une source et un nom attribué — et keel l'applique déterministement. La règle vit dans votre attestation, pas dans le code : deux opérateurs suivant des écoles différentes obtiennent des réponses différentes du même code, par conception.",
        "Aucune revue savante de la base fiqh de keel n'a eu lieu. La base est la lecture sourcée d'un opérateur, publiée comme document précisément pour être auditée et contestée — et chaque opérateur est responsable de ses propres attestations.",
      ],
      more: "Comment la conformité fonctionne, en termes simples",
    },
    review: {
      title: "Revue savante : non revue — une question ouverte, par design",
      body: [
        "La base fiqh énonce clairement ce qu'une revue savante couvrirait et ce qu'elle signifierait ou non. Tant que personne ne parcourt ce chemin, le statut est : non revue.",
      ],
      more: "Lire la base fiqh",
    },
    next: {
      title: "Et maintenant ?",
      items: [
        { title: "Installation", body: "Essayez-le en cinq minutes, en lecture seule et côté papier. Aucun fonds ne bouge." },
        { title: "La conformité, en termes simples", body: "Ce que keel applique, ce qu'il refuse de décider, et où commence votre responsabilité." },
        { title: "Communauté", body: "Questions, idées et débats de classification se vivent sur GitHub Discussions." },
      ],
    },
  },
};
