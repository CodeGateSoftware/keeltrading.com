import type { LocalizedPage } from "../config";

/**
 * Features (FR-2): mapped 1:1 to real engine capabilities. Every section ends
 * with a "verify in the repo" pointer. No capability is described that the
 * engine repo cannot show.
 */
export interface Feature {
  title: string;
  body: string;
  points?: string[];
  verify: { label: string; href: string };
}

export interface FeaturesContent {
  rev: string;
  title: string;
  description: string;
  intro: string;
  verifyNote: string;
  features: Feature[];
  inert: { title: string; body: string[] };
  translatedFromRev?: string;
}

export const features: LocalizedPage<FeaturesContent> = {
  en: {
    rev: "2026-08-20.2",
    title: "Shariah Compliance Engine Features — keel",
    description:
      "Attested fail-closed screening, 18 un-overridable rails, overfitting-checked strategy gates, and honest DCA-benchmarked measurement — all mapped to source.",
    intro:
      "This page describes only what the engine repository can show. Each section links to the source that proves it — if a claim ever drifts from the code, the link is how you catch us.",
    verifyNote: "Verify in the repository",
    features: [
      {
        title: "Attested asset screening — fails closed",
        body: "Admission to the allowlist is split by what is knowable. Market facts are computed. Shariah classifications — is the core purpose a haram sector, is the token asset-backed 'ayn or a claim dayn, does it pay a riba-like yield — are attested, never inferred, via keel assets attest. An absent attestation is a rejection, not a default pass.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "The rails — eighteen checks no order can skip",
        body: "Deterministic guards that nothing can override, not even autonomy mode:",
        points: [
          "The halal allowlist, per-order and per-day spend caps, exposure and concentration caps",
          "Correlation-aware sizing, a minimum-move floor, no-martingale and no-stop-widening",
          "Total and weekly drawdown breakers, a consecutive-loss/edge-decay breaker",
          "Feed-staleness and quote-balance checks",
          "Rail 14 — venue subscription/withdrawal attestations: live BUYs are refused until the operator attests",
          "Rail 17 — §65.4 qabd: withdrawal capability is attested and enforced, because an asset that cannot be withdrawn may not have been validly possessed",
          "A max-spread entry gate that refuses live BUYs at or beyond 50bp spread, fail-closed on an unreadable book",
          "A rail veto names itself and the command that clears it",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "Strategy gates — candidate → paper → live",
        body: "A rule must walk three stages before it can touch live money. Promotion clears a two-part gate: performance floors and an overfitting check (PBO/CSCV). The 100-trade sample floor may be met by the rule's own backtest or pooled across products in paper — provided at least five products each contribute ten trades, because a pool of correlated samples overstates its power.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "Honest measurement, against DCA",
        body: "keel simulate replays the real rules over fetched history, compares against a simple DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report naming every gate and its numbers. The backtester prices per-product slippage scaled from each asset's real liquidity (5–50bp), so results cannot be flattered by thin books. On the default rules it will very likely tell you TRAIN MORE — that is the engine working, not broken.",
        verify: { label: "the experiment record", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "Three deployment profiles that share nothing",
        body: "Daily paper, live, and an hourly evidence profile (paper-hourly) — each with its own database and config. The hourly profile exists because the daily clock measures 2.15 signals per asset-year (a 100-trade review 31–84 years away), while the same rules on ONE_HOUR bars fire 49.4 — about 940 entry signals per year pooled, putting forward-evidence review weeks away instead of decades. It is measured net-negative too: it exists to collect admissible forward evidence, not profit.",
        verify: { label: "operator runbook", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "A broker port, not a broker lock-in",
        body: "Adapters implement one contract — the keel-broker-api port — and register under the keel.brokers entry point. Coinbase Advanced Trade is the reference adapter; Robinhood ships as an optional, deliberately unwired venue; an Alpaca adapter joined in v0.10.0. A deliberately divergent fake venue keeps the port honest: the conformance suite (~3,000 tests) runs against both.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "Confirm by default; autonomy changes who is asked",
        body: "keel previews each order and asks at the terminal; headless, it declines. keel autonomy on changes who is asked, never what is allowed. To stop trading, keel kill — the kill-switch fails closed.",
        verify: { label: "the README, 'How keel works'", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "keel ships inert",
      body: [
        "Nothing trades until you promote a rule, attest the venue subscription, fund the account, and — in confirm mode — type y. Long-only spot only: no leverage, no shorting, no derivatives, and sizing uses actual cash, so no riba.",
        "Account-level obligations no rail can see (disabling USDC rewards on idle balances, chiefly) are the operator's to verify — the operator runbook lists them.",
        "And the paper profile is where every rule starts — free, simulated fills, nothing at risk, no funded venue account or trading credentials (a free read-only market-data key is all it asks). It is not a demo: the same parameter set's paper trades count toward the promotion gate's minimum, so paper evidence is the first stage of the gauntlet.",
      ],
    },
  },

  ar: {
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
    title: "خصائص محرّك الامتثال الشرعي — كيل",
    description:
      "فرزٌ موثَّق يفشل مغلقًا، و18 سكة أمان لا تُتجاوز، وبوابات ترقية مع فحص فرط المواءمة، وقياسٌ صادق مقابل DCA — كل خصيصة تشير إلى مصدرها في الشيفرة.",
    intro:
      "لا تصف هذه الصفحة إلا ما يستطيع مستودع المحرّك إظهاره. كل قسمٍ يرتبط بالمصدر الذي يثبته — فإن انحرفت يومًا مزيدةٌ عن الشيفرة، فالرابط هو سبيلك للإمساك بنا.",
    verifyNote: "تحقّق في المستودع",
    features: [
      {
        title: "فرز أصولٍ موثَّق — يفشل مغلقًا",
        body: "القبول في القائمة المسموحة مقسومٌ بحسب ما يمكن معرفته. الوقائع السوقية تُحسب؛ أمّا التصنيفات الشرعية — هل الغرض الأساسي قطاعٌ محرَّم (§28.4)، هل الرمز عينٌ 'ayn مدعومة ب أصل أم دَين dayn (§65.5/§67.2)، هل يوزّع عائدًا شبيهًا بالربا — فموثَّقةٌ لا مستنبطة، عبر keel assets attest. وغياب التوثيق رفضٌ، لا قبولٌ افتراضي.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "سكك الأمان — ثمانية عشر فحصًا لا يتخطّاها أمر",
        body: "ضوابط حتمية لا شيء يتجاوزها، ولا حتى نمط الاستقلالية:",
        points: [
          "القائمة المسموحة الحلال، وسقوف الإنفاق للأمر الواحد ولليوم، وسقوف التعرّض والتركيز",
          "تحجيم واعٍ بالارتباط، وأرضية حركة دنيا، ومنع المارتينغال ومنع توسيع وقف الخسارة",
          "قواطع سحبٍ كليٍّ وأسبوعي، وقاطع خسائر متتالية / تآكل حدّي",
          "فحوص قِدَم التغذية وتوازن الأسعار",
          "السكة 14 — توثيق الاشتراك والسحب في المنصّة: تُرفض أوامر الشراء الحيّة حتى يوثّق المشغّل",
          "السكة 17 — القبض الحُكمي §65.4: قابلية السحب توثَّق وتُنفَّذ، لأن الأصل الذي لا يمكن سحبه قد لا يكون مملوكًا قبضًا صحيحًا",
          "بوابة دخول بفارق سعر أقصى: ترفض شراءً حيًّا عند 50 نقطة أساس أو أكثر، وتفشل مغلقًا عند دفترٍ غير مقروء",
          "رفضُ السكة يسمّي نفسه والأمر الذي يرفعه",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "بوابات الاستراتيجية — مرشّح ← تجريبي ← حيّ",
        body: "على القاعدة أن تجتاز ثلاث مراحل قبل أن تلمس مالًا حقيقيًّا. والترقية تتجاوز بوابةً من شقّين: أرضيات أداء، وفحص فرط مواءمة (PBO/CSCV). ويجوز تلبية أرضية العيّنة البالغة 100 صفقة بتداول القاعدة نفسه رجعيًا، أو بتجميع المعاملات نفسها عبر منتجات أخرى في الافتراضي — بشرط أن يساهم خمسة منتجات على الأقل بعشر صفقاتٍ لكلٍّ منها، لأن تجميع عيّنات مترابطة يضخّم قوّته.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "قياس صادق، مقابل DCA",
        body: "يعيد الأمر keel simulate تشغيل القواعد الحقيقية فوق التاريخ المجلوب، ويقارنها بمقياس الشراء الدوري المنتظم (DCA)، ويكتب تقرير GO-LIVE أو TRAIN-MORE مسمّيًا كل بوابةٍ وأرقامها. ويُسعّر المحرّك الرجعي الانزلاق لكل منتجٍ على أساس سيولتها الفعلية (5–50 نقطة أساس)، فلا يمكن تلميع النتائج بكتبٍ رقيقة. وعلى القواعد الافتراضية سيخبرك على الأرجح TRAIN MORE — فهذا المحرّك يعمل، لا أنه معطّل.",
        verify: { label: "سجلّ التجارب", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "ثلاثة أنماط نشرٍ لا تتقاسم شيئًا",
        body: "يوميٌّ افتراضي، وحيّ، ونمطٌ ساعيٌّ للأدلة (paper-hourly) — لكلٍّ قاعدة بياناته وإعداداته. وُجد النمط الساعي لأن الساعة اليومية تقيس 2.15 إشارة لكل أصل-سنة (فمراجعة 100 صفقة تبعد 31–84 سنة)، بينما القواعد نفسها على شموع الساعة تُطلق 49.4 — نحو 940 إشارة دخول سنويًّا مجمّعةً، فتقترب مراجعة الأدلة الأمامية أسابيعَ بدل عقود. وهو مقيسٌ صافي الخسارة أيضًا: وُجد لجمع أدلةٍ أمامية مقبولة، لا للربح.",
        verify: { label: "كتاب تشغيل المشغّل", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "منفذ وسطاء، لا قيدٌ على وسيط",
        body: "تُنفّذ المحوّلات عقدًا واحدًا — منفذ keel-broker-api — وتتسجّل تحت نقطة الدخول keel.brokers. محوّل Coinbase Advanced Trade هو المرجعي؛ وRobinhood يُسلَّم كمنصّة اختيارية غير موصولة عمدًا؛ وانضمّ محوّل Alpaca في v0.10.0. ومنصّة وهمية متعمدة الاختلاف تُبقي المنفذ أمينًا: حزمة المطابقة (~3,000 اختبار) تعمل عليهما معًا.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "تأكيدٌ افتراضيًا؛ والاستقلالية تغيّر مَن يُسأل",
        body: "يعاين كيل كل أمرٍ ويسأل عند الطرفية؛ وفي وضع بلا مشغّل يرفض. الأمر keel autonomy on يغيّر مَن يُسأل، لا ما يُسمح به أبدًا. ولإيقاف التداول: keel kill — ومفتاح الإيقاف يفشل مغلقًا.",
        verify: { label: "الـREADME، «كيف يعمل كيل»", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "يُسلَّم كيل خاملًا",
      body: [
        "لا شيء يتداول حتى تُرقّي قاعدة، وتوثّق اشتراك المنصّة، وتموّل الحساب، و— في نمط التأكيد — تكتب y. فوريٌّ طويلٌ فقط: لا رافعة، لا بيعًا على المكشوف، لا مشتقّات، والتحجيم بالنقد الفعلي، فلا ربا.",
        "الالتزامات على مستوى الحساب التي لا تراها أي سكة (تعطيل مكافآت USDC على الأرصدة الخاملة أساسًا) على المشغّل التحقق منها — وكتاب تشغيل المشغّل يسردُها.",
        "والملف الورقي هو حيث تبدأ كل قاعدة — مجاني، تنفيذٌ محاكى، لا شيء في خطر، وبلا حساب وسيط ممول أو بيانات تداول (مفتاح بيانات سوقٍ مجاني للقراءة فقط هو كل ما يطلبه). وهو ليس عرضًا تجريبيًّا: صفقات القاعدة نفسها بمعاملاتها نفسها في الورقي تُحتسب ضمن حدّ بوابة الترقية الأدنى، فدليل الورقي هو المرحلة الأولى من البوابة.",
      ],
    },
  },

  fr: {
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
    title: "Fonctionnalités du moteur de conformité — keel",
    description:
      "Un filtrage attesté qui bloque par défaut, dix-huit garde-fous incontournables, des verrous de promotion avec contrôle de surapprentissage, une mesure honnête face au DCA — chaque fonctionnalité renvoie à sa source dans le code.",
    intro:
      "Cette page ne décrit que ce que le dépôt du moteur peut montrer. Chaque section renvoie à la source qui l'atteste : si une affirmation s'écartait un jour du code, c'est par ce lien que vous nous prendriez en défaut.",
    verifyNote: "Vérifier dans le dépôt",
    features: [
      {
        title: "Filtrage des actifs par attestation — blocage par défaut",
        body: "L'admission dans la liste blanche est découpée selon ce qu'il est possible de savoir. Les faits de marché se calculent. Les classifications Shariah — l'activité principale du token relève-t-elle d'un secteur interdit (§28.4), s'agit-il d'un 'ayn adossé à un actif ou d'une créance dayn (§65.5/§67.2), le token verse-t-il un rendement assimilable au riba — sont attestées, jamais déduites, au moyen de keel assets attest. Une attestation manquante vaut refus, pas acceptation par défaut.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "Les garde-fous (rails) — dix-huit contrôles qu'aucun ordre ne contourne",
        body: "Des contrôles déterministes que rien ne peut désactiver, pas même le mode autonome :",
        points: [
          "La liste blanche halal, les plafonds de dépense par ordre et par jour, les plafonds d'exposition et de concentration",
          "Un dimensionnement qui tient compte des corrélations, un seuil de mouvement minimal, l'interdiction de la martingale et de l'élargissement des stops",
          "Des disjoncteurs de perte maximale (drawdown) totale et hebdomadaire, un disjoncteur de pertes consécutives et d'érosion de l'avantage statistique (edge)",
          "Des contrôles de fraîcheur des flux de données et de cohérence des cotations",
          "Garde-fou 14 — attestations d'abonnement et de retrait sur la plateforme : tout achat réel est refusé tant que l'opérateur n'a pas attesté",
          "Garde-fou 17 — qabd §65.4 : la capacité de retrait est attestée puis appliquée, au motif qu'un actif impossible à retirer n'a peut-être jamais été valablement possédé",
          "Un plafond d'écart (spread) à l'entrée, qui refuse tout achat réel à partir de 50 points de base et bloque d'office si le carnet est illisible",
          "Tout veto d'un garde-fou se nomme et indique la commande qui le lève",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "Verrous de stratégie — candidate → papier → réel",
        body: "Une règle doit franchir trois étapes avant de toucher de l'argent réel. La promotion passe par un verrou en deux volets : des seuils de performance et un contrôle de surapprentissage (PBO/CSCV). Le seuil de 100 transactions peut être atteint par le backtest de la règle, ou en mutualisant le même jeu de paramètres sur d'autres produits en papier — à condition qu'au moins cinq produits y contribuent pour dix transactions chacun, car un ensemble d'échantillons corrélés surestime sa propre puissance.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "Mesure honnête, face au DCA",
        body: "keel simulate rejoue les vraies règles sur l'historique récupéré, les compare à la référence DCA et rédige un rapport GO-LIVE / TRAIN-MORE qui nomme chaque verrou et ses chiffres. Le backtesteur applique à chaque produit un glissement calibré sur sa liquidité réelle (5 à 50 points de base), afin qu'aucun résultat ne puisse être flatté par un carnet d'ordres peu liquide. Sur les règles par défaut, il vous répondra très probablement TRAIN MORE : c'est le moteur qui fonctionne, pas une panne.",
        verify: { label: "le registre des expériences", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "Trois profils de déploiement qui ne partagent rien",
        body: "Papier quotidien, réel, et un profil horaire de collecte de preuves (paper-hourly) — chacun avec sa propre base de données et sa propre configuration. Le profil horaire existe parce que l'horloge quotidienne ne mesure que 2,15 signaux par actif et par an : à ce rythme, il faudrait de 31 à 84 ans pour réunir les 100 transactions d'une revue. Les mêmes règles sur des bougies ONE_HOUR en déclenchent 49,4 — environ 940 signaux d'entrée par an une fois mutualisés — ce qui ramène cette revue à quelques semaines au lieu de quelques décennies. Lui aussi est mesuré perdant : il existe pour collecter des preuves recevables, pas du profit.",
        verify: { label: "le runbook opérateur", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "Un port courtier, pas un enfermement propriétaire",
        body: "Les adaptateurs mettent en œuvre un seul contrat — le port keel-broker-api — et se déclarent sous le point d'entrée keel.brokers. Coinbase Advanced Trade est l'adaptateur de référence ; Robinhood est livré comme plateforme optionnelle, délibérément non raccordée ; un adaptateur Alpaca s'y est ajouté en v0.10.0. Une plateforme factice, volontairement divergente, maintient le port honnête : la suite de conformité (~3 000 tests) s'exécute sur les deux.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "Confirmation par défaut ; l'autonomie change l'interlocuteur, pas la règle",
        body: "keel prévisualise chaque ordre et demande confirmation dans le terminal ; sans opérateur, il refuse. keel autonomy on change qui l'on interroge, jamais ce qui est permis. Pour tout arrêter : keel kill — le coupe-circuit se ferme en cas de défaillance.",
        verify: { label: "le README, « How keel works »", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "keel est livré inerte",
      body: [
        "Rien ne se négocie tant que vous n'avez pas promu une règle, attesté l'abonnement à la plateforme, approvisionné le compte et — en mode confirmation — tapé y. Uniquement du comptant à l'achat : pas de levier, pas de vente à découvert, pas de produits dérivés, et le dimensionnement se fait sur du cash réel, donc sans riba.",
        "Les obligations au niveau du compte qu'aucun garde-fou ne peut voir — désactiver la rémunération USDC des soldes dormants, principalement — restent à la charge de l'opérateur ; le runbook opérateur les recense.",
        "Et c'est dans le profil papier que toute règle commence : gratuit, exécutions simulées, rien en jeu, sans compte approvisionné ni identifiants de trading (une clé de données de marché gratuite, en lecture seule, suffit). Ce n'est pas une démonstration : les transactions papier d'un même jeu de paramètres comptent dans le minimum exigé par le verrou de promotion — la preuve papier est la première étape du parcours.",
      ],
    },
  },
};
