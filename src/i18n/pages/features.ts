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
    rev: "2026-08-20.3",
    title: "Shariah Compliance Engine Features — keel",
    description:
      "Attested screening that fails closed, 18 rails no order can skip, gates checked for overfitting, and honest measurement against DCA — all mapped to source.",
    intro:
      "This page describes only what the engine repository can show. Each section links to the source that proves it — if a claim ever drifts from the code, the link is how you catch us.",
    verifyNote: "Verify in the repository",
    features: [
      {
        title: "Attested asset screening — fails closed",
        body: "Admission to the allowlist is split by what is knowable. Market facts are computed. The Shariah questions are not: whether a token's core purpose is a haram sector, whether it is asset-backed ('ayn) or a claim on a debtor (dayn), and whether it pays a riba-like yield. Those are attested through keel assets attest, never inferred. An absent attestation is a rejection, not a default pass.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "The rails — eighteen checks no order can skip",
        body: "Deterministic guards that nothing can override, not even autonomy mode:",
        points: [
          "The halal allowlist, per-order and per-day spend caps, exposure and concentration caps",
          "Correlation-aware sizing, a minimum-move floor, no-martingale and no-stop-widening",
          "Total and weekly drawdown breakers, plus a breaker for consecutive losses and edge decay",
          "Feed-staleness and quote-balance checks",
          "Rail 14 — venue subscription/withdrawal attestations: live BUYs are refused until the operator attests",
          "Rail 17 — §65.4 qabd: withdrawal capability is attested and enforced, because an asset that cannot be withdrawn may not have been validly possessed",
          "A maximum-spread entry gate that refuses live BUYs at a spread of 50 basis points or wider, and refuses outright if the order book cannot be read",
          "A rail veto names the rail that fired and the command that clears it",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "Strategy gates — candidate → paper → live",
        body: "A rule must walk three stages before it can touch live money. Promotion clears a two-part gate: performance floors, and an overfitting check (PBO/CSCV). The 100-trade sample floor can be met by the rule's own backtest, or pooled across products in paper. Pooling requires at least five products contributing ten trades each, because a pool of correlated samples overstates its own power.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "Honest measurement, against DCA",
        body: "keel simulate replays the real rules over fetched history, compares against a simple DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report naming every gate and its numbers. The backtester prices per-product slippage scaled from each asset's real liquidity, from 5 to 50 basis points, so results cannot be flattered by thin order books. On the default rules it will very likely tell you TRAIN-MORE. That is the engine working, not broken.",
        verify: { label: "the experiment record", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "Three deployment profiles that share nothing",
        body: "Daily paper, live, and an hourly evidence profile (paper-hourly) — each with its own database and config. The hourly profile exists because the daily clock measures only 2.15 signals per asset-year, which puts a 100-trade review 31 to 84 years away. The same rules on ONE_HOUR bars fire 49.4 signals per asset-year, about 940 entry signals a year once pooled. That moves a forward-evidence review to weeks instead of decades. The hourly profile is measured net negative too: it exists to collect admissible forward evidence, not profit.",
        verify: { label: "operator runbook", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "A broker port, not a broker lock-in",
        body: "Adapters implement one contract — the keel-broker-api port — and register under the keel.brokers entry point. Coinbase Advanced Trade is the reference adapter; Robinhood ships as an optional, deliberately unwired venue; an Alpaca adapter joined in v0.10.0. A deliberately divergent fake venue keeps the port honest: the conformance suite, about 3,000 tests, runs against both.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "Confirm by default; autonomy changes who is asked",
        body: "keel previews each order and asks you at the terminal. Running headless, with no one to ask, it declines. keel autonomy on changes who is asked, never what is allowed. To stop trading, keel kill — the kill-switch fails closed.",
        verify: { label: "the README, 'How keel works'", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "keel ships inert",
      body: [
        "Nothing trades until you promote a rule, attest the venue subscription, fund the account, and — in confirm mode — type y. Long-only spot only: no leverage, no shorting, no derivatives, and sizing uses actual cash, so no riba.",
        "Account-level obligations no rail can see (disabling USDC rewards on idle balances, chiefly) are the operator's to verify — the operator runbook lists them.",
        "And the paper profile is where every rule starts: free, with simulated fills and nothing at risk. It needs no funded venue account and no trading credentials — a free, read-only market-data key is all it asks for. It is not a demo. Paper trades from the same parameter set count toward the promotion gate's minimum, which makes paper evidence the first stage of the gauntlet.",
      ],
    },
  },

  ar: {
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
    title: "خصائص محرّك الامتثال الشرعي — كيل",
    description:
      "فرزٌ موثَّق يرفض عند الفشل، و18 سكةَ أمانٍ لا تُتجاوَز، وبواباتُ ترقيةٍ تفحص الإفراط في المُلاءمة، وقياسٌ صادقٌ مقابل مؤشّر DCA — وكلُّ خاصيةٍ تشير إلى مصدرها في الشيفرة.",
    intro:
      "لا تصف هذه الصفحة إلا ما يستطيع مستودعُ المحرّك إظهارَه. وكلُّ قسمٍ يرتبط بالمصدر الذي يُثبته — فإن انحرفت دعوى يومًا عن الشيفرة، فالرابط هو سبيلك إلى الإمساك بنا.",
    verifyNote: "تحقّق في المستودع",
    features: [
      {
        title: "فرزُ أصولٍ موثَّق — يرفض عند الفشل",
        body: "القبولُ في قائمة الأصول المسموح بها مقسومٌ بحسب ما يمكن معرفتُه. فوقائعُ السوق تُحسَب؛ أمّا التصنيفات الشرعية — هل الغرض الأساسي للرمز قطاعٌ محرَّم (§28.4)، وهل هو عينٌ ('ayn) مدعومةٌ بأصلٍ أم دَينٌ (dayn)‏ (§65.5/§67.2)، وهل يوزّع عائدًا شبيهًا بالربا — فتُوثَّق ولا تُستنبَط، عبر الأمر keel assets attest. وغيابُ التوثيق رفضٌ، لا قبولٌ افتراضي.",
        verify: { label: "compliance/screen.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/compliance/screen.py" },
      },
      {
        title: "سكك الأمان — ثمانية عشر فحصًا لا يتجاوزها أيُّ أمر",
        body: "ضوابطُ حتميةٌ لا يتجاوزها شيء، ولا حتى وضعُ الاستقلالية:",
        points: [
          "قائمةُ الأصول الحلال المسموح بها، وسقوفُ الإنفاق للأمر الواحد ولليوم، وسقوفُ التعرُّض والتركيز",
          "تحجيمٌ يراعي الارتباط، وحدٌّ أدنى لحركة السعر، ومنعُ المارتينغال ومنعُ توسيع وقف الخسارة",
          "قواطعُ التراجُع (drawdown) الكلّي والأسبوعي، وقاطعُ الخسائر المتتالية وتآكُل الأفضلية",
          "فحوصُ تقادُم موجزات البيانات واتّزان عروض الأسعار",
          "السكة 14 — توثيقُ الاشتراك في المنصّة وقابليةِ السحب منها: تُرفض أوامرُ الشراء الحيّة حتى يوثّق المشغّل",
          "السكة 17 — القبض الحُكمي §65.4: تُوثَّق قابليةُ السحب وتُنفَّذ، لأن الأصل الذي لا يمكن سحبُه قد لا يكون قد قُبِض قبضًا صحيحًا",
          "بوابةُ دخولٍ بحدٍّ أقصى لفارق السعر: ترفض الشراء الحيّ عند 50 نقطة أساسٍ أو أكثر، وترفض كذلك عند تعذُّر قراءة دفتر الأوامر",
          "رفضُ السكة يسمّي نفسه ويسمّي الأمرَ الذي يرفعه",
        ],
        verify: { label: "execution/guards.py", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/execution/guards.py" },
      },
      {
        title: "بوابات الاستراتيجية — مرشَّحة ← تجريبية ← حيّة",
        body: "على القاعدة أن تجتاز ثلاث مراحل قبل أن تلمس مالًا حقيقيًّا. ولا تُرقَّى إلا باجتياز بوابةٍ من شقّين: حدودٌ دنيا للأداء، وفحصٌ للإفراط في المُلاءمة (PBO/CSCV). ويجوز بلوغُ الحدّ الأدنى البالغ مائة صفقة بالاختبار الرجعي للقاعدة نفسها، أو بتجميع صفقات الوسائط نفسها عبر منتجاتٍ متعدّدةٍ في التداول التجريبي — بشرط أن يُسهم خمسةُ منتجاتٍ على الأقل بعشر صفقاتٍ لكلٍّ منها، لأن تجميع عيّناتٍ مترابطةٍ يُبالغ في تقدير قوّتها الإحصائية.",
        verify: { label: "agent.py — RULE_REGISTRY", href: "https://github.com/CodeGateSoftware/keel/blob/main/keel/agent.py" },
      },
      {
        title: "قياسٌ صادق، مقابل الشراء الدوري المنتظم",
        body: "يعيد الأمر keel simulate تشغيلَ القواعد الحقيقية على التاريخ المجلوب، ويقارنها بمؤشّرٍ مرجعيٍّ بسيطٍ هو الشراء الدوري المنتظم (DCA)، ويكتب تقرير GO-LIVE أو TRAIN-MORE مسمّيًا كلَّ بوابةٍ وأرقامَها. ويُسعّر المحرّك الرجعي الانزلاقَ لكلِّ منتجٍ على قدر سيولته الفعلية (5–50 نقطة أساس)، فلا يمكن تجميلُ النتائج بدفاترِ أوامرَ ضعيفةِ السيولة. وعلى القواعد الافتراضية سيقول لك على الأرجح TRAIN-MORE — وهذا دليلُ عمل المحرّك لا دليلُ عطبه.",
        verify: { label: "سجلّ التجارب", href: "https://github.com/CodeGateSoftware/keel/tree/main/docs/experiments" },
      },
      {
        title: "ثلاثة أنماط نشرٍ لا يتقاسم أيٌّ منها شيئًا",
        body: "نمطٌ يوميٌّ تجريبي، ونمطٌ حيّ، ونمطٌ ساعيٌّ لجمع الأدلة (paper-hourly) — لكلٍّ منها قاعدةُ بياناته وإعداداته. ووُجد النمطُ الساعي لأن المؤقّت اليومي يقيس 2.15 إشارةً لكل أصلٍ في السنة (أي إنّ مراجعة المائة صفقة تبعد ما بين 31 و84 سنة)، بينما تُطلق القواعد نفسها على شموع الساعة 49.4 إشارة — أي نحو 940 إشارة دخولٍ سنويًّا بعد التجميع، فتصير مراجعةُ الأدلة الأمامية على بُعد أسابيع بدل عقود. وهو مقيسٌ بخسارةٍ صافيةٍ أيضًا: فقد وُجد لجمع أدلةٍ أماميةٍ مقبولة، لا للربح.",
        verify: { label: "كتاب تشغيل المشغّل", href: "https://github.com/CodeGateSoftware/keel/blob/main/docs/operator-runbook.md" },
      },
      {
        title: "منفذُ وسطاءٍ، لا ارتهانٌ لوسيط",
        body: "تُنفّذ المحوّلات عقدًا واحدًا — منفذ keel-broker-api — وتُسجَّل تحت نقطة الدخول keel.brokers. ومحوّل Coinbase Advanced Trade هو المحوّل المرجعي؛ ويُسلَّم Robinhood منصّةً اختياريةً غيرَ موصولةٍ عمدًا؛ وانضمّ محوّل Alpaca في الإصدار v0.10.0. وثمّة منصّةٌ وهميةٌ متعمَّدةُ الاختلاف تُبقي المنفذ أمينًا: إذ تعمل حزمةُ اختبارات المطابقة (نحو 3,000 اختبار) على الاثنتين معًا.",
        verify: { label: "packages/", href: "https://github.com/CodeGateSoftware/keel/tree/main/packages" },
      },
      {
        title: "التأكيدُ هو الأصل؛ والاستقلاليةُ تغيّر مَن يُسأل",
        body: "يعاين كيل كلَّ أمرٍ ويسأل عند الطرفية؛ وإن كان يعمل بلا واجهةٍ تفاعلية رفض الأمر. والأمر keel autonomy on يغيّر مَن يُسأل، لا ما يُسمح به. ولإيقاف التداول: keel kill — ومفتاحُ الإيقاف يرفض عند الفشل.",
        verify: { label: "الـREADME، «كيف يعمل كيل»", href: "https://github.com/CodeGateSoftware/keel#how-keel-works" },
      },
    ],
    inert: {
      title: "يُسلَّم كيل خاملًا",
      body: [
        "لا يجري أيُّ تداولٍ حتى تُرقّي قاعدةً، وتوثّق الاشتراك في المنصّة، وتموّل الحساب، و— في وضع التأكيد — تكتب y. والعملُ مقصورٌ على الشراء الفوري (long-only spot): لا رافعةَ مالية، ولا بيعَ على المكشوف، ولا مشتقّات، والتحجيمُ بالنقد الفعلي، فلا ربا.",
        "أمّا الالتزامات على مستوى الحساب التي لا تراها أيُّ سكة — وأبرزُها تعطيلُ مكافآت USDC على الأرصدة الخاملة — فعلى المشغّل التحقّقُ منها، وكتابُ تشغيل المشغّل يسردها.",
        "ونمطُ التداول التجريبي هو حيث تبدأ كلُّ قاعدة — مجّانيٌّ، بتنفيذٍ مُحاكًى، ولا شيء فيه في خطر، ولا يحتاج إلى حسابٍ مموَّلٍ لدى منصّة ولا إلى بيانات اعتمادٍ للتداول (فمفتاحُ بيانات سوقٍ مجّانيٌّ للقراءة فقط هو كلُّ ما يطلبه). وهو ليس عرضًا تجريبيًّا: فصفقاتُ الوسائط نفسها في التداول التجريبي تُحتسب ضمن الحدّ الأدنى لبوابة الترقية، ومن ثَمّ فدليلُ التداول التجريبي هو المرحلة الأولى من المسار.",
      ],
    },
  },

  fr: {
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
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
        body: "keel simulate rejoue les vraies règles sur l'historique récupéré, les compare à la référence DCA et rédige un rapport GO-LIVE / TRAIN-MORE qui nomme chaque verrou et ses chiffres. Le backtesteur applique à chaque produit un glissement calibré sur sa liquidité réelle (5 à 50 points de base), afin qu'aucun résultat ne puisse être flatté par un carnet d'ordres peu liquide. Sur les règles par défaut, il vous répondra très probablement TRAIN-MORE : c'est le moteur qui fonctionne, pas une panne.",
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
