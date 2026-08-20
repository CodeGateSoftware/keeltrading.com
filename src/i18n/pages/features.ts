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
    rev: "2026-08-19.2",
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
      ],
    },
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
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
      ],
    },
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-19.2",
    title: "Fonctionnalités du moteur de conformité — keel",
    description:
      "Filtrage par attestation à échec fermé, dix-huit rails incontournables, portes de promotion avec contrôle de surapprentissage, mesure honnête contre DCA — chaque fonctionnalité renvoie à sa source dans le code.",
    intro:
      "Cette page ne décrit que ce que le dépôt du moteur peut montrer. Chaque section renvoie à la source qui le prouve — si une affirmation s'écarte un jour du code, le lien est là pour nous prendre la main.",
    verifyNote: "Vérifier dans le dépôt",
    features: [
      {
        title: "Filtrage d'actifs par attestation — échec fermé",
        body: "L'admission sur la liste autorisée est scindée selon ce qui est connaissable. Les faits de marché sont calculés. Les classifications Shariah — le cœur du token est-il un secteur interdit (§28.4), est-ce un 'ayn adossé à un actif ou une créance dayn (§65.5/§67.2), verse-t-il un rendement assimilable au riba — sont attestées, jamais déduites, via keel assets attest. Une attestation absente est un rejet, pas une acceptation par défaut.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "Les rails — dix-huit contrôles qu'aucun ordre ne saute",
        body: "Des gardes déterministes que rien ne peut contourner, pas même le mode autonomie :",
        points: [
          "La liste autorisée halal, les plafonds de dépense par ordre et par jour, les plafonds d'exposition et de concentration",
          "Dimensionnement sensible à la corrélation, plancher de mouvement minimal, pas de martingale ni d'élargissement de stop",
          "Disjoncteurs de drawdown total et hebdomadaire, disjoncteur de pertes consécutives / d'érosion d'edge",
          "Contrôles de fraîcheur des données et d'équilibre des cotations",
          "Rail 14 — attestations d'abonnement/retrait de la plateforme : les BUY réels sont refusés tant que l'opérateur n'a pas attesté",
          "Rail 17 — qabd §65.4 : la capacité de retrait est attestée et appliquée, car un actif qu'on ne peut pas retirer n'a peut-être jamais été possédé valablement",
          "Une porte d'entrée à spread maximal qui refuse les BUY réels à 50 points de base ou plus, à échec fermé sur un carnet illisible",
          "Un veto de rail se nomme lui-même et nomme la commande qui le lève",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "Portes de stratégie — candidate → papier → réel",
        body: "Une règle doit franchir trois étapes avant de toucher de l'argent réel. La promotion passe une porte en deux volets : planchers de performance et contrôle de surapprentissage (PBO/CSCV). Le plancher de 100 transactions peut être atteint par le backtest de la règle ou par le pool des mêmes paramètres sur d'autres produits en papier — à condition qu'au moins cinq produits contribuent chacun dix transactions, car un pool d'échantillons corrélées surestime sa puissance.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "Mesure honnête, contre DCA",
        body: "keel simulate rejoue les règles réelles sur l'historique récupéré, compare au repère DCA, et écrit un rapport GO-LIVE / TRAIN-MORE nommant chaque porte et ses chiffres. Le backtesteur tarife un glissement par produit à l'échelle de sa liquidité réelle (5–50 pb), pour que les résultats ne puissent pas être flatteurs sur des carnets fins. Sur les règles par défaut, il vous dira très probablement TRAIN MORE — c'est le moteur qui travaille, pas une panne.",
        verify: { label: "le registre des expériences", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "Trois profils de déploiement qui ne partagent rien",
        body: "Papier quotidien, réel, et un profil horaire de collecte de preuves (paper-hourly) — chacun avec sa base de données et sa configuration. Le profil horaire existe parce que l'horloge quotidienne mesure 2,15 signaux par actif-année (une revue à 100 transactions dans 31 à 84 ans), quand les mêmes règles sur bougies ONE_HOUR en déclenchent 49,4 — environ 940 signaux d'entrée par an en pool, rapprochant la revue de preuves à des semaines au lieu de décennies. Lui aussi est mesuré net-négatif : il existe pour collecter des preuves admissibles, pas du profit.",
        verify: { label: "le runbook opérateur", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "Un port courtier, pas un enfermement",
        body: "Les adaptateurs implémentent un seul contrat — le port keel-broker-api — et s'enregistrent sous le point d'entrée keel.brokers. Coinbase Advanced Trade est l'adaptateur de référence ; Robinhood est livré comme plateforme optionnelle délibérément non câblée ; un adaptateur Alpaca a rejoint en v0.10.0. Une plateforme factive délibérément divergente garde le port honnête : la suite de conformité (~3 000 tests) tourne sur les deux.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "Confirmation par défaut ; l'autonomie change qui on interroge",
        body: "keel prévisualise chaque ordre et demande au terminal ; sans opérateur, il décline. keel autonomy on change qui on interroge, jamais ce qui est permis. Pour arrêter de trader : keel kill — l'interrupteur échoue fermé.",
        verify: { label: "le README, « How keel works »", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "keel est livré inerte",
      body: [
        "Rien ne trade tant que vous n'avez pas promu une règle, attesté l'abonnement à la plateforme, alimenté le compte et — en mode confirmation — tapé y. Spot long uniquement : pas de levier, pas de vente à découvert, pas de produits dérivés, et le dimensionnement utilise du cash réel, donc pas de riba.",
        "Les obligations au niveau du compte qu'aucun rail ne voit (désactiver les récompenses USDC sur les soldes oisifs, principalement) restent à vérifier par l'opérateur — le runbook opérateur les liste.",
      ],
    },
  },
};
