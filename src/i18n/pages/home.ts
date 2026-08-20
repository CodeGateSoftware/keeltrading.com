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
    title: "keel : le moteur open-source de conformité Shariah pour le crypto",
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
        "Aucune famille de règles livrée n'est nette-positive aux frais preneur réellement payés sur Coinbase (~1,2 % par jambe) — 0 sur 90 configurations dans une matrice de mesure, 0 sur 82 dans une autre. Nous avons contre-vérifié une note de modélisation stochastique — redérivée sur les chiffres réels de keel — et elle a précisé le pourquoi : les frais preneur sont tout le résultat. À l'intérieur de l'allocation mensuelle sans frais de la place, les règles reconstruites se tiennent indissociablement au point mort (taux de réussite de 14,9 % contre un seuil de 14,88 %) ; un pas au-dehors, le seuil saute à 29 % et les mêmes règles deviennent nettement négatives. Le rail d'allocation n'est pas un plafond budgétaire — c'est la frontière de rentabilité.",
        "Le but de ce projet est la machinerie d'application et la mesure honnête de ce qui la traverse — pas une promesse de profit. Chaque résultat est comparé à un repère d'achat périodique simple (DCA), et les règles de référence ne le battent pas après frais. Nous préférons que vous le sachiez dès la page d'accueil plutôt que de le découvrir vous-même. Et nous travaillons dur pour améliorer les résultats des algorithmes et des stratégies — nous vous tiendrons informés de nos progrès.",
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
        body: "Une règle parcourt candidate → papier → réel. La promotion franchit des planchers de performance et un contrôle de surapprentissage — la probabilité que le backtest soit surajusté, calculée par validation croisée combinatoirement symétrique (PBO/CSCV) — une règle brillante sur un seul jeu de paramètres en échantillon est précisément ce que la seconde porte existe pour soupçonner.",
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
