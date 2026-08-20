import type { LocalizedPage } from "../config";

/**
 * Compliance (FR-2): the Shariah methodology in plain terms — what keel
 * enforces, the per-(venue, product) attestation model, purification posture,
 * what keel does NOT do, and links to the fiqh basis and its review-status
 * section (the external-scholarship statement). FR-9 rules apply in full.
 */
export interface ComplianceContent {
  rev: string;
  title: string;
  description: string;
  intro: string;
  sections: { title: string; body: string[] }[];
  doesNot: { title: string; items: string[] };
  attest: { title: string; body: string[]; command: string; commandNote: string };
  links: { title: string; items: { label: string; note: string; href: string }[] };
  translatedFromRev?: string;
}

export const compliance: LocalizedPage<ComplianceContent> = {
  en: {
    rev: "2026-08-19.2",
    title: "Shariah Compliance Methodology, in Plain Terms",
    description:
      "How keel's Shariah compliance works: fail-closed attested screening, the per-(venue, product) attestation model, the qabd check — and what keel is not.",
    intro:
      "keel's compliance is designed so that every ruling it enforces is written down, sourced, and supplied by you — the operator. Nothing religious is inferred, defaulted, or hidden in code. This page explains that model in plain language; the fiqh basis document is the authoritative statement, ruling by ruling.",
    sections: [
      {
        title: "Computed facts vs attested classifications",
        body: [
          "Some things about an asset are knowable from the market and are simply computed. But whether a token's core purpose is a haram sector, whether it is asset-backed 'ayn or a claim dayn, whether it pays a riba-like yield — these are questions of fact-plus-scholarship about the world. No module in the repository derives them from candle data, and none pretends to. A human records them, with a source and an attributed name; keel enforces the record deterministically and rejects anything unattested.",
        ],
      },
      {
        title: "The per-(venue, product) attestation model",
        body: [
          "An attestation is scoped: it names the venue and the product, carries a source, and is attributed to a name. Two operators following different schools can hold different attestations and get different answers from the same code — by design, because the ruling lives in your attestation, not in the code.",
          "The same model covers the venue itself: rail 14 refuses live BUYs until the operator attests the venue subscription, and rail 17 encodes §65.4 qabd — an asset that cannot be withdrawn may not have been validly possessed, so withdrawal capability is attested and enforced, not assumed.",
        ],
      },
      {
        title: "Purification and the spot-only shape",
        body: [
          "keel is long-only spot with no leverage, no shorting, and no derivatives; position sizing uses actual cash, so no riba enters through the position itself. Where an obligation cannot be enforced by code, it is stated rather than waved away: account-level duties no rail can see — disabling USDC rewards on idle balances, chiefly — are the operator's to verify, listed in the operator runbook.",
        ],
      },
    ],
    doesNot: {
      title: "What keel does not do",
      items: [
        "It is not a fatwa and cannot produce one. keel never derives a Shariah classification from market data; it enforces the ruling you supply.",
        "It is not financial advice and not religious (Shariah) advice.",
        "No scholarly review of keel's fiqh basis has occurred. The basis is one operator's sourced reading, published so it can be audited and challenged; until a review happens, the status is: not reviewed.",
        "Attestation is the operator's act and the operator's responsibility. keel is the enforcement machinery, not the authority.",
        "It does not promise profit — no shipped rule family is net-positive at the taker fee actually paid, and the reference benchmark is simple DCA.",
      ],
    },
    attest: {
      title: "The command that matters",
      body: [
        "One command records a classification with its source and an attributed name. Everything keel later enforces about that asset traces back to this record.",
      ],
      command: "keel assets attest",
      commandNote: "Record a Shariah classification — with a source and an attributed name — that keel then enforces deterministically.",
    },
    links: {
      title: "Primary sources",
      items: [
        {
          label: "The fiqh basis (docs/fiqh-basis.md)",
          note: "The Shariah reasoning keel encodes, ruling by ruling, each with its in-repo source.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md",
        },
        {
          label: "Scholarly review status",
          note: "What a scholarly review would cover, what it would and would not signify — and the standing status: not reviewed.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md#scholarly-review-status",
        },
        {
          label: "The honest result — experiment record",
          note: "No shipped rule family is net-positive at the taker fee actually paid; every number stated.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-13-restated-under-a-production-faithful-engine.md",
        },
        {
          label: "The glossary (docs/glossary.md)",
          note: "The single source for the vocabulary — fiqh terms are anchored, never authored.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/glossary.md",
        },
      ],
    },
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
    title: "منهجية الامتثال الشرعي بلغةٍ مبسّطة",
    description:
      "كيف يعمل الامتثال الشرعي في كيل: فرزٌ موثَّق يرفض عند الفشل، ونموذجُ توثيقٍ لكل (منصّة، منتج)، وفحصُ القبض — وما لا يزعمه كيل.",
    intro:
      "صُمِّم الامتثال في كيل بحيث يكون كلُّ حكمٍ يُنفّذه مكتوبًا وموثَّق المصدر ومزوَّدًا منك أنت — المشغّل. فلا يُستنبَط شيءٌ شرعي، ولا يُفترض افتراضًا، ولا يُخفى في الشيفرة. وتشرح هذه الصفحة هذا النموذج بلغةٍ مبسّطة؛ ومستندُ الأساس الفقهي هو البيان المرجعي، حكمًا حكمًا.",
    sections: [
      {
        title: "وقائعُ محسوبة مقابل تصنيفاتٍ موثَّقة",
        body: [
          "بعضُ ما يتعلّق بالأصل يمكن معرفتُه من السوق، فيُحسب حسابًا مباشرًا. لكن: هل الغرض الأساسي للرمز قطاعٌ محرَّم، وهل هو عينٌ ('ayn) مدعومةٌ بأصلٍ أم دَينٌ (dayn)، وهل يوزّع عائدًا شبيهًا بالربا — فهذه أسئلةٌ تجمع بين الواقع والاجتهاد العلمي. ولا وحدةَ في المستودع تستنبطها من بيانات الشموع، ولا تدّعي ذلك. بل يسجّلها إنسانٌ، بمصدرٍ واسمٍ منسوب؛ ثم يُنفّذ كيل السجلَّ تنفيذًا حتميًّا ويرفض كلَّ ما ليس موثَّقًا.",
        ],
      },
      {
        title: "نموذج التوثيق لكل (منصّة، منتج)",
        body: [
          "التوثيق محدّدُ النطاق: يسمّي المنصّة والمنتج، ويحمل مصدرًا، ويُنسب إلى اسم. وقد يحمل مُشغّلان يتبعان مذهبين مختلفين توثيقين مختلفين فيحصلان على إجابتين مختلفتين من الشيفرة نفسها — وهذا مقصودٌ بالتصميم، لأن الحكم يسكن توثيقَك لا الشيفرةَ.",
          "والنموذج نفسه يشمل المنصّة ذاتها: فالسكة 14 ترفض أوامر الشراء الحيّة حتى يوثّق المشغّل اشتراكه في المنصّة، والسكة 17 تُشفّر القبض الحُكمي §65.4 — إذ إنّ الأصل الذي لا يمكن سحبُه قد لا يكون قد قُبِض قبضًا صحيحًا، فتُوثَّق قابليةُ السحب وتُنفَّذ، ولا تُفترض.",
        ],
      },
      {
        title: "التنقية وقصرُ العمل على التداول الفوري",
        body: [
          "العملُ في كيل مقصورٌ على الشراء الفوري: لا رافعةَ مالية، ولا بيعَ على المكشوف، ولا مشتقّات؛ وتحجيمُ المراكز بالنقد الفعلي، فلا يدخل الربا من جهة المركز نفسه. وحيثما تعذّر إنفاذُ التزامٍ بالشيفرة، صُرِّح به بدل تجاهله: فالالتزامات على مستوى الحساب التي لا تراها أيُّ سكة — وأبرزُها تعطيلُ مكافآت USDC على الأرصدة الخاملة — على المشغّل التحقّقُ منها، وهي مسرودةٌ في كتاب تشغيل المشغّل.",
        ],
      },
    ],
    doesNot: {
      title: "ما لا يفعله كيل",
      items: [
        "ليس فتوى ولا يستطيع إنتاجها. فكيل لا يستنبط تصنيفًا شرعيًّا من بيانات السوق أبدًا؛ بل يُنفّذ الحكم الذي تزوّده به.",
        "وليس نصيحةً مالية ولا نصيحةً شرعية.",
        "ولم تَجرِ أيُّ مراجعةٍ علميةٍ شرعية للأساس الفقهي. فالأساس قراءةٌ موثّقةُ المصادر لمُشغّلٍ واحد، نُشرت لتُدقَّق ويُعترَض عليها؛ وما لم تَجرِ المراجعة، فالحالة هي: غير مُراجَع.",
        "والتوثيق فعلُ المشغّل ومسؤوليتُه. فكيل آليةُ إنفاذ، لا مرجعيةٌ شرعية.",
        "ولا يَعِد بربح — إذ لا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ الفعلية، والمؤشّر المرجعي هو الشراء الدوري المنتظم (DCA).",
      ],
    },
    attest: {
      title: "الأمرُ الأهمّ",
      body: [
        "أمرٌ واحدٌ يسجّل تصنيفًا بمصدره وباسمٍ منسوبٍ إليه. وكلُّ ما يُنفّذه كيل لاحقًا بشأن ذلك الأصل يعود إلى هذا السجلّ.",
      ],
      command: "keel assets attest",
      commandNote: "سجّل تصنيفًا شرعيًّا — بمصدرٍ واسمٍ منسوب — لينفّذه كيل بعد ذلك تنفيذًا حتميًّا.",
    },
    links: {
      title: "المصادر الأولية",
      items: [
        {
          label: "الأساس الفقهي (docs/fiqh-basis.md)",
          note: "الاستدلال الشرعي الذي يُشفّره كيل، حكمًا حكمًا، مع مصدر كلِّ حكمٍ داخل المستودع.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md",
        },
        {
          label: "حالة المراجعة العلمية",
          note: "ما ستغطّيه المراجعة العلمية، وما تعنيه وما لا تعنيه — والحالة القائمة: غير مُراجَع.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md#scholarly-review-status",
        },
        {
          label: "النتيجة الصادقة — سجلّ التجربة",
          note: "لا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ الفعلية؛ وكلُّ الأرقام مذكورة.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-13-restated-under-a-production-faithful-engine.md",
        },
        {
          label: "المسرد (docs/glossary.md)",
          note: "المصدر الوحيد للمصطلحات — والمصطلحات الفقهية مُسنَدةٌ إلى مصادرها، لا مؤلَّفة.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/glossary.md",
        },
      ],
    },
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-19.2",
    title: "La méthodologie de conformité, en termes simples",
    description:
      "Comment fonctionne la conformité Shariah de keel : un filtrage attesté qui bloque par défaut, le modèle d'attestation par (plateforme, produit), le contrôle qabd — et ce que keel n'est pas : ni une fatwa, ni un conseil financier, et sans examen par des savants.",
    intro:
      "La conformité de keel est conçue pour que chaque règle appliquée soit écrite, sourcée et fournie par vous, l'opérateur. Rien de religieux n'est déduit, imposé par défaut ni dissimulé dans le code. Cette page expose ce modèle en langage courant ; le document de base fiqh en donne l'énoncé de référence, règle par règle.",
    sections: [
      {
        title: "Ce qui se calcule, ce qui s'atteste",
        body: [
          "Certaines caractéristiques d'un actif se lisent sur le marché et se calculent sans difficulté. Mais savoir si l'activité principale du token relève d'un secteur interdit, s'il s'agit d'un 'ayn adossé à un actif ou d'une créance dayn, ou s'il verse un rendement assimilable au riba, relève à la fois du fait et de l'analyse savante. Aucun module du dépôt ne déduit cela des chandeliers, et aucun ne prétend le faire. Un humain l'enregistre, avec une source et un nom ; keel applique cet enregistrement de façon déterministe et refuse tout ce qui n'est pas attesté.",
        ],
      },
      {
        title: "Le modèle d'attestation par (plateforme, produit)",
        body: [
          "Une attestation a des bornes : elle nomme la plateforme et le produit, s'appuie sur une source et est signée d'un nom. Deux opérateurs qui suivent des écoles différentes peuvent détenir des attestations différentes et obtenir du même code des réponses différentes — c'est voulu, parce que la règle réside dans votre attestation, pas dans le code.",
          "Le même modèle vaut pour la plateforme elle-même : le garde-fou 14 refuse tout achat réel tant que l'opérateur n'a pas attesté l'abonnement, et le garde-fou 17 encode le qabd §65.4 — un actif impossible à retirer n'a peut-être jamais été valablement possédé, si bien que la capacité de retrait est attestée puis appliquée, jamais présumée.",
        ],
      },
      {
        title: "La purification et la forme « comptant uniquement »",
        body: [
          "keel ne traite que du comptant à l'achat : pas de levier, pas de vente à découvert, pas de produits dérivés ; le dimensionnement se fait sur du cash réel, donc sans riba au titre de la position elle-même. Là où une obligation ne peut pas être appliquée par le code, elle est énoncée plutôt que passée sous silence : les devoirs au niveau du compte qu'aucun garde-fou ne peut voir — désactiver la rémunération USDC des soldes dormants, principalement — restent à vérifier par l'opérateur et figurent dans le runbook opérateur.",
        ],
      },
    ],
    doesNot: {
      title: "Ce que keel ne fait pas",
      items: [
        "keel n'est pas une fatwa et ne peut pas en produire. Il ne déduit jamais une classification Shariah des données de marché : il applique la règle que vous lui fournissez.",
        "Ce n'est ni un conseil financier, ni un conseil religieux.",
        "La base fiqh de keel n'a fait l'objet d'aucun examen par des savants. Elle est la lecture sourcée d'un seul opérateur, publiée pour être auditée et contestée ; tant qu'un examen n'a pas eu lieu, le statut reste : non examinée.",
        "L'attestation est l'acte et la responsabilité de l'opérateur. keel est la machinerie d'application, pas l'autorité.",
        "Il ne promet aucun gain : aucune famille de règles livrée ne dégage un résultat net positif aux frais de preneur réellement payés, et la référence est le simple achat périodique (DCA).",
      ],
    },
    attest: {
      title: "La commande qui compte",
      body: [
        "Une seule commande enregistre une classification, avec sa source et le nom de qui l'assume. Tout ce que keel appliquera ensuite à cet actif remonte à cet enregistrement.",
      ],
      command: "keel assets attest",
      commandNote: "Enregistrez une classification Shariah — avec une source et un nom — que keel appliquera ensuite de façon déterministe.",
    },
    links: {
      title: "Sources primaires",
      items: [
        {
          label: "La base fiqh (docs/fiqh-basis.md)",
          note: "Le raisonnement Shariah que keel encode, règle par règle, avec sa source dans le dépôt.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md",
        },
        {
          label: "Le statut de l'examen par des savants",
          note: "Ce que couvrirait un examen par des savants, ce qu'il signifierait ou non — et le statut actuel : non examinée.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md#scholarly-review-status",
        },
        {
          label: "Le résultat honnête — le compte rendu de l'expérience",
          note: "Aucune famille de règles livrée ne dégage un résultat net positif aux frais de preneur réellement payés ; tous les chiffres sont donnés.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-13-restated-under-a-production-faithful-engine.md",
        },
        {
          label: "Le glossaire (docs/glossary.md)",
          note: "L'unique source du vocabulaire — les termes du fiqh y sont ancrés, jamais inventés.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/glossary.md",
        },
      ],
    },
  },
};
