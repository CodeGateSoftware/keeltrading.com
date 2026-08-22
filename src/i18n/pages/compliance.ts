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
  framing: { title: string; body: string[] };
  attest: { title: string; body: string[]; command: string; commandNote: string };
  links: { title: string; items: { label: string; note: string; href: string }[] };
  translatedFromRev?: string;
}

export const compliance: LocalizedPage<ComplianceContent> = {
  en: {
    rev: "2026-08-22.1",
    title: "Shariah Compliance Methodology, in Plain Terms",
    description:
      "How keel's Shariah compliance works: fail-closed attested screening, the per-(venue, product) attestation model, the qabd check — and what keel is not.",
    intro:
      "keel's compliance is designed so that every ruling it enforces is written down, sourced, and supplied by you — the operator. Nothing religious is inferred, defaulted, or hidden in code. This page explains that model in plain language; the fiqh basis document is the authoritative statement, ruling by ruling.",
    sections: [
      {
        title: "What the framework asks of money",
        body: [
          "Shariah governance of finance comes down to four prohibitions and one obligation. Riba — interest: money cannot earn money by itself, and a return has to come from bearing real risk in real activity, not from lending at a guaranteed rate. Gharar — excessive uncertainty: contracts must be clear, and you cannot sell what you do not own or have not taken possession of. Maysir — gambling: no zero-sum wagering presented as investment. Prohibited sectors — alcohol, pork, gambling, the adult industry, weapons, conventional interest-based finance. And zakat, an annual levy of about 2.5% on idle wealth — an obligation to redistribute rather than a restriction.",
          "What survives is unremarkable: own real assets, take genuine risk for genuine return. No leverage, no shorting, no derivatives, no selling what you do not hold. In practice this makes keel more conservative than a standard brokerage account, not less — it rules out most of the instruments that failed in 2008.",
        ],
      },
      {
        title: "Computed facts vs attested classifications",
        body: [
          "Some things about an asset are knowable from the market, and those are simply computed. Others are not. Whether a token's core purpose is a haram sector, whether it is asset-backed ('ayn) or a claim on a debtor (dayn), whether it pays a riba-like yield — these are questions of fact and scholarship about the world. No module in the repository derives them from candle data, and none pretends to. A human records them, with a source and an attributed name. keel then enforces that record deterministically and rejects anything unattested.",
        ],
      },
      {
        title: "The per-(venue, product) attestation model",
        body: [
          "An attestation is scoped: it names the venue and the product, carries a source, and is attributed to a name. Two operators following different schools can hold different attestations and get different answers from the same code — by design, because the ruling lives in your attestation, not in the code.",
          "The same model covers the venue itself. Rail 14 refuses live BUYs until the operator attests the venue subscription. Rail 17 encodes §65.4 qabd, the doctrine of constructive possession: an asset that cannot be withdrawn may never have been validly possessed. So withdrawal capability is attested and enforced, not assumed.",
        ],
      },
      {
        title: "Three kinds of rules — and where your bank fits",
        body: [
          "Can you use keel if your bank pays or charges interest? Yes — keel never touches your bank. It operates on one trading account and has no connection to, visibility of, or authority over anything your bank does. The sharper question is where each rule lives, and there are exactly three places:",
          "What you supply: the classifications — is this asset's sector permissible, is it an owned thing ('ayn) or a claim on an issuer (dayn), does it pay a yield. The ruling is an input you record; keel is not a fatwa engine and never derives one.",
          "What the engine enforces mechanically: these are invariants, not opinions. A buy may only spend an already-settled balance already sitting in the trading account — never a linked bank — and a balance the engine cannot read is a trade refused rather than attempted. Silence is not consent to spend.",
          "What it cannot verify, and the remedy: a venue may pay interest inside the account itself — Coinbase's USDC Rewards on idle balances. The trading API exposes no rewards switch, so this cannot be automated, and a config flag claiming \"rewards disabled\" would be a comforting lie, so there isn't one. It is a required manual step in the operator runbook. When interest does accrue, it is counted: the purification ledger reports the amount that must be given away rather than kept. Moving the money is the operator's act, never the software's.",
        ],
      },
      {
        title: "Purification and the spot-only shape",
        body: [
          "keel is long-only spot with no leverage, no shorting, and no derivatives; position sizing uses actual cash, so no riba enters through the position itself. Where an obligation cannot be enforced by code, it is stated rather than waved away. Account-level duties no rail can see — chiefly, disabling USDC rewards on idle balances — are the operator's to verify. The operator runbook lists them.",
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
        "It does not promise profit. No shipped rule family is net positive at the taker fee actually paid, and the reference benchmark is simple DCA.",
      ],
    },
    framing: {
      title: "Is this “Shariah law”?",
      body: [
        "The phrase is used as a scare tactic in some places, and the word doing the damage is law — which implies something imposed on other people. keel is the opposite: one person constraining his own trading, using software that refuses to let him make a convenient exception later. Nobody's conduct is governed but the operator's own.",
        "No ruling is embedded anywhere in the software. Two operators following different schools of thought get different results from identical code, because the ruling is an input you record, not an output you receive. The honest description is a compliance engine that happens to have been built for one ethical framework.",
        "For perspective: the usury prohibition was Christian doctrine for roughly a thousand years — it runs through Aquinas, the Third Lateran Council, and centuries of canon law, and the same rule appears in Deuteronomy. Islam retained a prohibition Europe relaxed for commercial rather than theological reasons. It is not a foreign import; it is a road not taken.",
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
    rev: "2026-08-22.1",
    translatedFromRev: "2026-08-22.1",
    title: "منهجية الامتثال الشرعي بلغةٍ مبسّطة",
    description:
      "كيف يعمل الامتثال الشرعي في كيل: فرزٌ موثَّق يرفض عند الفشل، ونموذجُ توثيقٍ لكل (منصّة، منتج)، وفحصُ القبض — وما لا يزعمه كيل.",
    intro:
      "صُمِّم الامتثال في كيل بحيث يكون كلُّ حكمٍ يُنفّذه مكتوبًا وموثَّق المصدر ومزوَّدًا منك أنت — المشغّل. فلا يُستنبَط شيءٌ شرعي، ولا يُفترض افتراضًا، ولا يُخفى في الشيفرة. وتشرح هذه الصفحة هذا النموذج بلغةٍ مبسّطة؛ ومستندُ الأساس الفقهي هو البيان المرجعي، حكمًا حكمًا.",
    sections: [
      {
        title: "ما يطلبه الإطار من المال",
        body: [
          "تنحصر الحوكمة الشرعية للمال في أربع حظراتٍ وواجبٍ واحد. الربا — الفائدة: لا يكسب المالُ مالًا بنفسه، ويجب أن يأتي العائدُ من تحمّل مخاطرةٍ حقيقيةٍ في نشاطٍ حقيقي، لا من الإقراض بمعدلٍ مضمون. الغرر — الجهالة المفرطة: العقودُ يجب أن تكون واضحة، ولا يجوز بيعُ ما لا تملك أو لم تقبضه. الميسر — القمار: لا رهانٍ بمجموعٍ صفريٍّ يُقدَّم بوصفه استثمارًا. القطاعات المحظورة — الخمور ولحم الخنزير والقمار والصناعة الإباحية والأسلحة والمالية الربوية التقليدية. والزكاة — ضريبةٌ سنويةٌ قدرها نحو 2.5٪ على الخمول من الثروة: واجبُ إعادة توزيعٍ لا قيدٌ على النشاط.",
          "وما يبقى بعد ذلك عاديٌّ لا غرابة فيه: امتلاك أصولٍ حقيقية، وتحمّل مخاطرةٍ حقيقيةٍ مقابل عائدٍ حقيقي. لا رافعةَ ولا بيعَ على المكشوف ولا مشتقّات ولا بيعَ ما لا تملك. وهذا يجعل كيل في العمليّات أكثرَ تحفّظًا من حساب وساطةٍ عادي، لا أقل — فهو يستبعد معظم الأدوات التي انهارت في 2008.",
        ],
      },
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
        title: "ثلاثة أنواع من القواعد — وأين يقع مصرفك منها",
        body: [
          "هل يمكنك استخدام كيل إن كان مصرفك يدفع فائدةً أو يأخذها؟ نعم — فكيل لا يمسّ مصرفك أبدًا: يعمل على حساب تداولٍ واحد، ولا صلةَ له بمصرفك ولا رؤيةَ ولا سلطة. والسؤال الأدقّ هو: أين تعيش كلُّ قاعدة؟ وهناك ثلاثةُ أمكنةٍ بالضبط:",
          "ما تزوّده أنت: التصنيفات — هل قطاع هذا الأصل مباح، وهل هو عينٌ مملوكة أم دَينٌ على مُصدر، وهل يُدفع عليه عائد. الحُكمُ مُدخَلٌ تسجّله أنت؛ وكيل ليس محرّك فتوى ولا يستنبطها أبدًا.",
          "ما يُنفّذه المحرّك آليًّا: هذه خواصُّ ثابتةٌ لا آراء. لا ينفق الشراء إلا رصيدًا مُسوّى موجودًا سلفًا في حساب التداول — لا من مصرفٍ مرتبط أبدًا — والرصيدُ الذي لا يستطيع المحرّك قراءته يعني صفقةً تُرفض لا تُحاول. الصمتُ ليس إذنًا بالإنفاق.",
          "ما لا يستطيع التحقّق منه، والعلاج: قد تدفع المنصّة فائدةً داخل الحساب نفسه — مكافآت USDC على الأرصدة الخاملة لدى Coinbase. وواجهة التداول لا تكشف مفتاحًا للمكافآت، فلا يمكن أتمتة ذلك؛ ورايةُ إعدادٍ تزعم «تعطيل المكافآت» ستكون كذبةً مريحة — ولهذا لا توجد. إنها خطوةٌ يدويةٌ واجبةٌ في دليل التشغيل. وحين تستحقّ فائدةٌ فتُحصى: يُبلّغ سجلُّ التنقية بالمبلغ الذي يجب التخلّص منه لا إمساكه. وتحريك المال فعلُ المشغّل، لا البرمجية أبدًا.",
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
    framing: {
      title: "أهذا «القانون الشريعي»؟",
      body: [
        "يُستخدم هذا التعبير أداةَ تخويفٍ في بعض الأماكن، والكلمةُ الضارّة فيه هي «القانون» — بما يوحي بفرض شيءٍ على الآخرين. وكيل نقيضُ ذلك: شخصٌ واحد يقيّد تداوله هو، ببرمجيةٍ ترفض أن تمنحه استثناءً مريحًا لاحقًا. لا يحكم سلوكَ أحدٍ غير سلوك المشغّل نفسه.",
        "لا حُكمَ مضمّنًا في البرمجية أينما كان. فمشغّلان يتبعان مدرستين مختلفتين يحصلان على نتائج مختلفة من الشيفرة نفسها، لأن الحُكم مُدخَلٌ تسجّله لا مخرجٌ تتلقّاه. والوصفُ الصادق: محرّكُ امتثالٍ صُدِف أن بُني لإطارٍ أخلاقيٍّ واحد.",
        "وللالسياق: كان تحريم الربا عقيدةً مسيحيةً نحو ألف عام — يجري عبر توما الأكويني والمجمع اللاتراني الثالث وقرونٍ من قانون الكنيسة، والقاعدةُ نفسها في سفر التثنية. فالإسلام أبقى على تحريمٍ تراخَت عنه أوروبا لأسبابٍ تجاريةٍ لا لاهوتية. ليس مستوردًا غريبًا؛ بل طريقًا لم يُسلَك.",
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
    rev: "2026-08-22.1",
    translatedFromRev: "2026-08-22.1",
    title: "La méthodologie de conformité, en termes simples",
    description:
      "Comment fonctionne la conformité Shariah de keel : un filtrage attesté qui bloque par défaut, le modèle d'attestation par (plateforme, produit), le contrôle qabd — et ce que keel n'est pas : ni une fatwa, ni un conseil financier, et sans examen par des savants.",
    intro:
      "La conformité de keel est conçue pour que chaque règle appliquée soit écrite, sourcée et fournie par vous, l'opérateur. Rien de religieux n'est déduit, imposé par défaut ni dissimulé dans le code. Cette page expose ce modèle en langage courant ; le document de base fiqh en donne l'énoncé de référence, règle par règle.",
    sections: [
      {
        title: "Ce que le cadre exige de l'argent",
        body: [
          "La gouvernance Shariah de la finance tient en quatre interdits et une obligation. Riba — l'intérêt : l'argent ne peut pas gagner de l'argent par lui-même ; un rendement doit venir du risque réel pris dans une activité réelle, pas d'un prêt à taux garanti. Gharar — l'incertitude excessive : les contrats doivent être clairs, et l'on ne vend pas ce que l'on ne possède pas ou n'a pas reçu. Maysir — le jeu : aucun pari à somme nulle présenté comme un investissement. Secteurs interdits — alcool, porc, jeux, industrie pour adultes, armes, finance conventionnelle à intérêt. Et la zakat, un prélèvement annuel d'environ 2,5 % sur la richesse oisive — une obligation de redistribution, non une restriction.",
          "Ce qui subsiste n'a rien d'extraordinaire : posséder des actifs réels, prendre un risque véritable pour un rendement véritable. Pas de levier, pas de vente à découvert, pas de produits dérivés, pas de vente de ce que l'on ne détient pas. En pratique, cela rend keel plus prudent qu'un compte de courtage classique, pas moins — il exclut la plupart des instruments qui ont failli en 2008.",
        ],
      },
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
        title: "Trois sortes de règles — et la place de votre banque",
        body: [
          "Peut-on utiliser keel si sa banque verse ou facture des intérêts ? Oui — keel ne touche jamais à votre banque. Il opère sur un seul compte de trading et n'a ni lien avec elle, ni visibilité sur elle, ni autorité sur elle. La vraie question est celle de la place de chaque règle, et il y en a exactement trois :",
          "Ce que vous fournissez : les classifications — le secteur de cet actif est-il permissible, est-ce une chose possédée ('ayn) ou une créance sur un émetteur (dayn), verse-t-elle un rendement. Le jugement est une entrée que vous enregistrez ; keel n'est pas une machine à fatwas et n'en produit jamais.",
          "Ce que le moteur applique mécaniquement : ce sont des invariants, pas des opinions. Un achat ne peut dépenser qu'un solde déjà réglé, déjà présent sur le compte de trading — jamais une banque liée — et un solde illisible pour le moteur est un ordre refusé, pas tenté. Le silence n'est pas un consentement à dépenser.",
          "Ce qu'il ne peut pas vérifier, et le remède : une plateforme peut verser de l'intérêt au sein même du compte — les récompenses USDC de Coinbase sur les soldes oisifs. L'API de trading n'expose aucun interrupteur de récompenses, donc rien ne peut être automatisé ; un drapeau de configuration clamant « récompenses désactivées » serait un mensonge rassurant — il n'existe donc pas. C'est une étape manuelle obligatoire du runbook opérateur. Quand des intérêts courent, ils sont comptés : le registre de purification publie le montant à donner plutôt qu'à garder. Déplacer cet argent est l'acte de l'opérateur, jamais celui du logiciel.",
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
    framing: {
      title: "Est-ce « la loi shariah » ?",
      body: [
        "L'expression sert d'épouvantail en certains endroits, et le mot qui blesse est loi — il suggère quelque chose d'imposé aux autres. keel est l'inverse : une personne qui contraint son propre trading, avec un logiciel qui refuse de lui accorder plus tard une exception commode. La conduite de personne d'autre que l'opérateur n'est gouvernée.",
        "Aucun jugement n'est encodé dans le logiciel. Deux opérateurs suivant des écoles différentes obtiennent des résultats différents avec le même code, parce que le jugement est une entrée que vous enregistrez, pas une sortie que vous recevez. La description honnête : un moteur de conformité qu'il est advenu qu'on bâtisse pour un cadre éthique précis.",
        "Pour la perspective : l'interdiction de l'usure fut une doctrine chrétienne durant près de mille ans — elle traverse Thomas d'Aquin, le IIIe concile de Latran et des siècles de droit canon, et la même règle figure dans le Deutéronome. L'islam a conservé une interdiction que l'Europe a relâchée pour des raisons commerciales, non théologiques. Ce n'est pas une importation étrangère ; c'est une route non prise.",
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
