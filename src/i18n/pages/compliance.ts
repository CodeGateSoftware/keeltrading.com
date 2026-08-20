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
    title: "منهجية الامتثال الشرعي بلغة مبسّطة",
    description:
      "كيف يعمل الامتثال الشرعي في كيل: فرزٌ موثَّق يفشل مغلقًا، ونموذج توثيق لكل (منصّة، منتج)، وفحص القبض — وما ليس هو كيل.",
    intro:
      "صُمّم الامتثال في كيل بحيث يكون كل حكمٍ يُنفّذه مكتوبًا وموثّقًا ومزوَّدًا منك — أنت المشغّل. لا يُستنبط شيءٌ شرعي، ولا يُفترض، ولا يُخفى في الشيفرة. تشرح هذه الصفحة النموذج بلغةٍ مبسّطة؛ ومستند الأساس الفقهي هو البيان المرجعي، حكمًا حكمًا.",
    sections: [
      {
        title: "وقائع محسوبة مقابل تصنيفات موثَّقة",
        body: [
          "بعضُ ما يخصّ الأصل معرفتُه من السوق، فيُحسب ببساطة. لكن: هل الغرض الأساسي للرمز قطاعٌ محرَّم، وهل هو عينٌ 'ayn مدعومة بأصلٍ أم دَين dayn، وهل يوزّع عائدًا شبيهًا بالربا — هذه أسئلةُ واقعٍ وعلمٍ في العالم. لا وحدةٍ في المستودع تستنبطها من بيانات الشموع، ولا تتظاهر بذلك. إنسانٌ يسجّلها، بمصدرٍ واسمٍ منسوب؛ وكيل ينفّذ السجلّ حتميًّا ويرفض كلَّ ما ليس موثَّقًا.",
        ],
      },
      {
        title: "نموذج التوثيق لكل (منصّة، منتج)",
        body: [
          "التوثيق مُقيَّد النطاق: يسمّي المنصّة والمنتج، ويحمل مصدرًا، ويُنسب إلى اسم. مُشغّلان يتبعان مذهبين مختلفين قد يحملان توثيقين مختلفين فيحصلان على إجابتين مختلفتين من الشيفرة نفسها — بتصميمٍ مقصود، لأن الحكم يسكن توثيقك لا الشيفرة.",
          "النموذج نفسه يغطّي المنصّة ذاتها: السكة 14 ترفض شراءً حيًّا حتى يوثّق المشغّل اشتراكه في المنصّة، والسكة 17 تُشفّر القبض الحُكمي §65.4 — فالأصل الذي لا يمكن سحبه قد لا يكون مملوكًا قبضًا صحيحًا، لذا تُوثَّق قابليةُ السحب وتُنفَّذ، ولا تُفترض.",
        ],
      },
      {
        title: "التنقية وشكل الفوري الصافي",
        body: [
          "كيل فوريٌّ طويلٌ فقط: لا رافعة، لا بيعًا على المكشوف، لا مشتقّات؛ والتحجيم بالنقد الفعلي، فلا يدخل الربا من الجهة ذاتها. وحيث تعذّر الإنفاذ بالشيفرة، يُصرَّح به بدل تجاهله: الالتزامات على مستوى الحساب التي لا تراها أي سكة — تعطيل مكافآت USDC على الأرصدة الخاملة أساسًا — على المشغّل التحقق منها، وكتاب تشغيل المشغّل يسردُها.",
        ],
      },
    ],
    doesNot: {
      title: "ما لا يفعله كيل",
      items: [
        "ليس فتوى ولا يستطيع إنتاجها. كيل لا يستنبط تصنيفًا شرعيًّا من بيانات السوق أبدًا؛ بل ينفّذ الحكم الذي تزوّده به.",
        "ليس نصيحة مالية وليست نصيحةً شرعية.",
        "لم تَجرِ أي مراجعة علمية شرعية للأساس الفقهي. الأساس قراءةٌ موثّقة المصادر لمُشغّل واحد، نُشر ليُدقَّق ويُعترَض عليه؛ وما لم تَجرِ المراجعة، فالحالة: غير مُراجَع.",
        "التوثيق فعلُ المشغّل ومسؤوليتُه. كيل آليةُ إنفاذ، لا مرجعية.",
        "لا يَعِد بربح — لا عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ الفعلية، والمقياس المرجعي هو الشراء الدوري المنتظم (DCA).",
      ],
    },
    attest: {
      title: "الأمر الأهم",
      body: [
        "أمرٌ واحد يسجّل تصنيفًا بمصدره واسمٍ منسوبٍ إليه. وكل ما ينفّذه كيل لاحقًا عن ذلك الأصل يعود إلى هذا السجلّ.",
      ],
      command: "keel assets attest",
      commandNote: "سجّل تصنيفًا شرعيًّا — بمصدرٍ واسمٍ منسوب — لينفّذه كيل بعدها حتميًّا.",
    },
    links: {
      title: "المصادر الأولية",
      items: [
        {
          label: "الأساس الفقهي (docs/fiqh-basis.md)",
          note: "الاستدلال الفقهي الذي يُشفّره كيل، حكمًا حكمًا، مع مصدره داخل المستودع.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md",
        },
        {
          label: "حالة المراجعة العلمية",
          note: "ما ستغطّيه مراجعةٌ علمية وماذا تعني ولا تعني — والحالة القائمة: غير مُراجَع.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md#scholarly-review-status",
        },
        {
          label: "النتيجة الصادقة — سجلّ التجربة",
          note: "لا عائلة قواعد مُصدَّرة تحقق ربحًا صافيًا عند رسوم الآخذ الفعلية؛ كل الأرقام مذكورة.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-13-restated-under-a-production-faithful-engine.md",
        },
        {
          label: "المسرد (docs/glossary.md)",
          note: "المصدر الوحيد للمصطلحات — المصطلحات الفقهية مُسنَدة، لا مؤلَّفة.",
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
      "Comment fonctionne la conformité Shariah de keel : filtrage attesté à échec fermé, le modèle d'attestation par (plateforme, produit), le contrôle qabd — et ce que keel n'est pas : pas une fatwa, pas un conseil financier, non revu par des savants.",
    intro:
      "La conformité de keel est conçue pour que chaque règle qu'il applique soit écrite, sourcée et fournie par vous — l'opérateur. Rien de religieux n'est déduit, imposé par défaut ou caché dans le code. Cette page explique ce modèle en langage simple ; le document de base fiqh en est l'énoncé de référence, règle par règle.",
    sections: [
      {
        title: "Faits calculés contre classifications attestées",
        body: [
          "Certaines choses sur un actif se connaissent depuis le marché et se calculent simplement. Mais : le cœur du token est-il un secteur interdit, est-ce un 'ayn adossé à un actif ou une créance dayn, verse-t-il un rendement assimilable au riba — ce sont des questions de fait-plus-érudition sur le monde. Aucun module du dépôt ne les déduit des chandeliers, et aucun ne fait semblant. Un humain les enregistre, avec une source et un nom attribué ; keel applique l'enregistrement de façon déterministe et refuse tout ce qui n'est pas attesté.",
        ],
      },
      {
        title: "Le modèle d'attestation par (plateforme, produit)",
        body: [
          "Une attestation est bornée : elle nomme la plateforme et le produit, porte une source et est attribuée à un nom. Deux opérateurs suivant des écoles différentes peuvent détenir des attestations différentes et obtenir des réponses différentes du même code — par conception, parce que la règle vit dans votre attestation, pas dans le code.",
          "Le même modèle couvre la plateforme elle-même : le rail 14 refuse les BUY réels tant que l'opérateur n'a pas attesté l'abonnement, et le rail 17 encode le qabd §65.4 — un actif qu'on ne peut pas retirer n'a peut-être jamais été possédé valablement, donc la capacité de retrait est attestée et appliquée, jamais supposée.",
        ],
      },
      {
        title: "Purification et la forme spot uniquement",
        body: [
          "keel est du spot long uniquement, sans levier, sans vente à découvert, sans produits dérivés ; le dimensionnement utilise du cash réel, donc pas de riba par la position elle-même. Là où une obligation ne peut pas être appliquée par le code, elle est énoncée plutôt que balayée : les devoirs au niveau du compte qu'aucun rail ne voit — désactiver les récompenses USDC sur les soldes oisifs, principalement — restent à vérifier par l'opérateur, listés dans le runbook opérateur.",
        ],
      },
    ],
    doesNot: {
      title: "Ce que keel ne fait pas",
      items: [
        "Ce n'est pas une fatwa et il ne peut pas en produire. keel ne déduit jamais une classification Shariah des données de marché ; il applique la règle que vous fournissez.",
        "Ce n'est pas un conseil financier et pas un conseil religieux (Shariah).",
        "Aucune revue savante de la base fiqh de keel n'a eu lieu. La base est la lecture sourcée d'un opérateur, publiée pour être auditée et contestée ; tant qu'une revue n'a pas lieu, le statut est : non revue.",
        "L'attestation est l'acte et la responsabilité de l'opérateur. keel est la machinerie d'application, pas l'autorité.",
        "Il ne promet pas de profit — aucune famille de règles livrée n'est nette-positive aux frais preneur réellement payés, et le repère est le simple DCA.",
      ],
    },
    attest: {
      title: "La commande qui compte",
      body: [
        "Une seule commande enregistre une classification avec sa source et un nom attribué. Tout ce que keel applique ensuite à cet actif remonte à cet enregistrement.",
      ],
      command: "keel assets attest",
      commandNote: "Enregistrez une classification Shariah — avec une source et un nom attribué — que keel appliquera ensuite de façon déterministe.",
    },
    links: {
      title: "Sources premières",
      items: [
        {
          label: "La base fiqh (docs/fiqh-basis.md)",
          note: "Le raisonnement Shariah que keel encode, règle par règle, avec sa source dans le dépôt.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md",
        },
        {
          label: "Statut de la revue savante",
          note: "Ce qu'une revue savante couvrirait, ce qu'elle signifierait ou non — et le statut actuel : non revue.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/fiqh-basis.md#scholarly-review-status",
        },
        {
          label: "Le résultat honnête — compte rendu de l'expérience",
          note: "Aucune famille de règles livrée n'est nette-positive aux frais preneur réellement payés ; tous les chiffres sont énoncés.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/experiments/2026-08-13-restated-under-a-production-faithful-engine.md",
        },
        {
          label: "Le glossaire (docs/glossary.md)",
          note: "L'unique source du vocabulaire — les termes fiqh sont ancrés, jamais inventés.",
          href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/glossary.md",
        },
      ],
    },
  },
};
