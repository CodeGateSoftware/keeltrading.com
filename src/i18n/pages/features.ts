import type { LocalizedPage } from "../config";
import type { EngineSource } from "../../lib/engine-url";

/**
 * Features (FR-2): mapped 1:1 to real engine capabilities. Every section ends
 * with a "verify in the repo" pointer. No capability is described that the
 * engine repo cannot show.
 */
export interface Feature {
  title: string;
  body: string;
  points?: string[];
  /** The "verify in the repo" pointer. Copy carries the repo-relative path,
   *  never a URL: FeaturesPage builds the href at the ref this build resolved,
   *  so the reader lands on the code the release they run actually contains (#91). */
  verify: EngineSource & { label: string };
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
    rev: "2026-09-05.1",
    title: "Shariah Compliance Engine Features — keel",
    description:
      "Attested screening that fails closed, 20 rails no order can skip, gates checked for overfitting, honest measurement against DCA, and execution hardened for correctness — all mapped to source.",
    intro:
      "This page describes only what the engine repository can show. Each section links to the source that proves it — if a claim ever drifts from the code, the link is how you catch us.",
    verifyNote: "Verify in the repository",
    features: [
      {
        title: "Attested asset screening — fails closed",
        body: "Admission to the allowlist is split by what is knowable. Market facts are computed. The Shariah questions are not: whether a token's core purpose is a haram sector, whether it is asset-backed ('ayn) or a claim on a debtor (dayn), and whether it pays a riba-like yield. Those are attested through keel assets attest, never inferred. An absent attestation is a rejection, not a default pass.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "The rails — twenty checks no order can skip",
        body: "Deterministic guards that nothing can override, not even autonomy mode. Twenty of them — numbered 1–14 and 16–21, because rail 15 was retired and its number was never reused:",
        points: [
          "The halal allowlist, per-order and per-day spend caps, exposure and concentration caps",
          "Correlation-aware sizing, a minimum-move floor, no-martingale and no-stop-widening",
          "Total and weekly drawdown breakers, plus a breaker for consecutive losses and edge decay",
          "Feed-staleness and quote-balance checks",
          "Rail 14 — venue subscription/withdrawal attestations: live BUYs are refused until the operator attests",
          "Rail 17 — §65.4 qabd: withdrawal capability is attested and enforced, because an asset that cannot be withdrawn may not have been validly possessed",
          "A maximum-spread entry gate that refuses live BUYs at a spread of 50 basis points or wider, and refuses outright if the order book cannot be read",
          "Rail 20 — trade scope: a credential that reads fine is not evidence it can trade, so every live entry is vetoed until the venue itself has confirmed that credential may place one",
          "Rail 21 — base balance: a SELL is refused when the venue affirmatively reports no holding, and deliberately let through when the balance is merely unknown, because a blocked exit strands a position that wanted out",
          "A rail veto names the rail that fired and the command that clears it",
        ],
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "Trade scope — the venue gets to falsify what the operator attested",
        body: "A credential that reads cleanly is not evidence it can trade. A well-formed key whose every read succeeded still had its first live order refused: You do not have permission to perform this action. So the operator's claim that a venue's key may place live entries is now a record the venue itself can overturn — keel scope attest writes the operator's half, a refusal from the venue overwrites it, and the record is bound to the fingerprint of the credential that earned it, so swapping the key does not inherit the old key's permission. Rail 20 reads that record and vetoes live entries for as long as it says no. Exits are deliberately untouched, because an exit must always be able to leave.",
        verify: { label: "commands/scope.py", path: "keel/commands/scope.py" },
      },
      {
        title: "Strategy gates — candidate → paper → live",
        body: "A rule must walk three stages before it can touch live money. Promotion clears a two-part gate: performance floors, and an overfitting check (PBO/CSCV). The 100-trade sample floor can be met by the rule's own backtest, or pooled across products in paper. Pooling requires at least five products contributing ten trades each, because a pool of correlated samples overstates its own power.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "Honest measurement, against DCA",
        body: "keel simulate replays the real rules over fetched history, compares against a simple DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report naming every gate and its numbers. The backtester prices slippage per product, scaled from each asset's own liquidity — from 5 basis points at the most liquid end up to 183.8, the rate the thinnest name in the measured universe pays — so a result cannot be flattered by a thin order book. Measured across that universe, not one of the 24 assets reaches the 5bp floor. The report states which pass used which rate, because the edge table prices per product while the account pass and the DCA benchmark are still flat. On the default rules it will very likely tell you TRAIN-MORE. That is the engine working, not broken.",
        verify: { label: "the experiment record", path: "docs/experiments", kind: "tree" },
      },
      {
        title: "The order ledger records the book keel was actually filled against",
        body: "The orders table had been written since the beginning with no surface reading it, so \"what did keel buy and sell, and at what price\" was answerable only by opening SQLite by hand. It is a service now: keel orders renders the report, and the local web console projects that same report rather than recomputing it, so the two front ends cannot drift apart. Each order carries the venue's own top of book at the moment of submission, stored as the bid and the ask rather than as a single spread number — a spread computed and then stored loses the two numbers it came from. At this deployment's order sizes the spread is very nearly the whole cost, so it is now recorded as evidence instead of reconstructed afterwards.",
        verify: { label: "commands/orders.py", path: "keel/commands/orders.py" },
      },
      {
        title: "keel research — one front door over thirteen evidence modules",
        body: "The evidence toolkit had thirteen modules and nowhere that said so; six of them were reachable only by reading the source. keel research index now names all thirteen — what each one answers, what it cannot answer, and the command that runs it. It adds no statistics of its own: the five that already had a home under keel trials are registered a second time as the same command objects, never copies, because a front door that reimplements drifts the moment one copy takes a bugfix the other does not. The \"cannot answer\" column is meant to be read as carefully as the other one.",
        verify: { label: "commands/research.py", path: "keel/commands/research.py" },
      },
      {
        title: "Three deployment profiles that share nothing",
        body: "Daily paper, live, and an hourly evidence profile (paper-hourly) — each with its own database and config. The hourly profile exists because the daily clock measures only 2.15 signals per asset-year, which puts a 100-trade review 31 to 84 years away. The same rules on ONE_HOUR bars fire 49.4 signals per asset-year, about 940 entry signals a year once pooled. That moves a forward-evidence review to weeks instead of decades. The hourly profile is measured net negative too: it exists to collect admissible forward evidence, not profit.",
        verify: { label: "operator runbook", path: "docs/operator-runbook.md" },
      },
      {
        title: "A broker port, not a broker lock-in",
        body: "Adapters implement one contract — the keel-broker-api port — and register under the keel.brokers entry point. Coinbase Advanced Trade is the reference adapter; Robinhood ships as an optional, deliberately unwired venue; an Alpaca adapter joined in v0.10.0. A deliberately divergent fake venue keeps the port honest: the conformance suite runs against both, inside a suite of about 5,000 tests.",
        verify: { label: "packages/", path: "packages", kind: "tree" },
      },
      {
        title: "A bracket is one order kind, because two legs race",
        body: "The port that adapters implement gained a bracket as a single order kind — BracketGTC, an exit bracket that closes a held position — not two orders to place and pair client-side. Two separately placed legs race: if one fills and the survivor is never cancelled, a live order remains able to sell a position that is already closed, and two legs each carrying the full quantity commit that position twice. One native order removes both failure modes by construction. This is stage one, port vocabulary: every adapter maps it, the conformance suite pins it, and keel's live path still places the venue's own native bracket directly — moving that call onto the port is the next stage. It is correctness work: nothing here claims the engine trades better, only that there are fewer ways to be wrong.",
        verify: { label: "orders.py — BracketGTC", path: "packages/keel-broker-api/keel_broker_api/orders.py" },
      },
      {
        title: "Order size quantized to the venue's precision — an exit is never blocked",
        body: "A risk-sized order almost never lands on a round number, and a venue rejects a size that carries more decimals than the product's increment — the engine's first risk-sized live order was refused on exactly that: a formatting error, not a rail. Sizes are now quantized down to the increment the venue declares for the product, on both sides of the trade. When the increment is unknown, the two sides fail in opposite directions, deliberately: a BUY is refused — a refused entry costs nothing — while a SELL is sent as-is and logged, because an exit that cannot leave is a worse failure than an entry that cannot start. A size that quantizes down to zero is refused outright.",
        verify: { label: "execution/executor.py", path: "keel/execution/executor.py" },
      },
      {
        title: "Partial fills are a state of their own; an exit releases only what sold",
        body: "A market order that only partly fills is no longer forced to look either pending or filled: 0 < filled < ordered is its own non-terminal state, with the venue-observed quantity recorded beside the ordered one and the venue's running average as the fill price. Everything downstream uses what actually executed — the averaging basis counts a partial BUY at its filled quantity, never at a size that bought nothing. An entry that only partly fills warns loudly, because its exit bracket was sized for the ordered quantity and may exceed what is actually held; resizing it is deliberately an operator action, not an automatic one. An exit that only partly fills books the outcome for the quantity that actually sold and withholds release of the still-held remainder — a tranche closes only when its fill covers it. Which side the warning belongs to is pinned by test.",
        verify: { label: "execution/reconcile.py", path: "keel/execution/reconcile.py" },
      },
      {
        title: "The crash ledger is written before the cancel, so a dead roll is loud",
        body: "Rolling a stop means cancelling the resting bracket and placing its replacement — and a process dying between the two used to leave the position both naked and silent, because reconciliation deliberately stays quiet about rows with no recorded intent, so as not to train the alert to be ignored. The order of operations is now reversed: the unbracketed-intent record — the crash ledger naming the position that lost its protection — is written before the cancel is issued. A roll that dies mid-flight is loud on the very next reconciliation cycle, carrying the numbers needed to re-place the bracket.",
        verify: { label: "execution/executor.py — _roll_stop", path: "keel/execution/executor.py" },
      },
      {
        title: "Robinhood: the venue's own rules checked before an order is sent",
        body: "The Robinhood adapter — still optional, still deliberately unwired — reads the per-pair rules the venue publishes (a minimum order size denominated in quote currency, the size increment, a maximum) and checks every order against them before submission, so a sub-minimum or off-increment order is refused locally instead of discovered at the venue. And its best_bid_ask endpoint is not a book snapshot — the two legs are sampled independently and cross on the most liquid pairs — so the adapter returns a quote only when the venue's own numbers order coherently, and refuses to synthesize one otherwise.",
        verify: { label: "keel-broker-robinhood/adapter.py", path: "packages/keel-broker-robinhood/keel_broker_robinhood/adapter.py" },
      },
      {
        title: "Confirm by default; autonomy changes who is asked",
        body: "keel previews each order and asks you at the terminal. Running headless, with no one to ask, it declines. keel autonomy on changes who is asked, never what is allowed. To stop trading, keel kill — the kill-switch fails closed.",
        verify: { label: "the README, 'How keel works'", path: "README.md", hash: "#how-keel-works" },
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
    rev: "2026-09-05.1",
    translatedFromRev: "2026-09-05.1",
    title: "خصائص محرّك الامتثال الشرعي — كيل",
    description:
      "فرزٌ موثَّق يرفض عند الفشل، و20 سكةَ أمانٍ لا تُتجاوَز، وبواباتُ ترقيةٍ تفحص الإفراط في المُلاءمة، وقياسٌ صادقٌ مقابل مؤشّر DCA، وتنفيذٌ تُحصَّن فيه صحةُ الأوامر — وكلُّ خاصيةٍ تشير إلى مصدرها في الشيفرة.",
    intro:
      "لا تصف هذه الصفحة إلا ما يستطيع مستودعُ المحرّك إظهارَه. وكلُّ قسمٍ يرتبط بالمصدر الذي يُثبته — فإن انحرفت دعوى يومًا عن الشيفرة، فالرابط هو سبيلك إلى الإمساك بنا.",
    verifyNote: "تحقّق في المستودع",
    features: [
      {
        title: "فرزُ أصولٍ موثَّق — يرفض عند الفشل",
        body: "القبولُ في قائمة الأصول المسموح بها مقسومٌ بحسب ما يمكن معرفتُه. فوقائعُ السوق تُحسَب؛ أمّا التصنيفات الشرعية — هل الغرض الأساسي للرمز قطاعٌ محرَّم (§28.4)، وهل هو عينٌ ('ayn) مدعومةٌ بأصلٍ أم دَينٌ (dayn)‏ (§65.5/§67.2)، وهل يوزّع عائدًا شبيهًا بالربا — فتُوثَّق ولا تُستنبَط، عبر الأمر keel assets attest. وغيابُ التوثيق رفضٌ، لا قبولٌ افتراضي.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "سكك الأمان — عشرون فحصًا لا يتجاوزها أيُّ أمر",
        body: "ضوابطُ حتميةٌ لا يتجاوزها شيء، ولا حتى وضعُ الاستقلالية. وهي عشرون، مرقَّمةٌ من 1 إلى 14 ومن 16 إلى 21، إذ أُلغيت السكةُ 15 ولم يُعَد استعمالُ رقمها:",
        points: [
          "قائمةُ الأصول الحلال المسموح بها، وسقوفُ الإنفاق للأمر الواحد ولليوم، وسقوفُ التعرُّض والتركيز",
          "تحجيمٌ يراعي الارتباط، وحدٌّ أدنى لحركة السعر، ومنعُ المارتينغال ومنعُ توسيع وقف الخسارة",
          "قواطعُ التراجُع (drawdown) الكلّي والأسبوعي، وقاطعُ الخسائر المتتالية وتآكُل الأفضلية",
          "فحوصُ تقادُم موجزات البيانات واتّزان عروض الأسعار",
          "السكة 14 — توثيقُ الاشتراك في المنصّة وقابليةِ السحب منها: تُرفض أوامرُ الشراء الحيّة حتى يوثّق المشغّل",
          "السكة 17 — القبض الحُكمي §65.4: تُوثَّق قابليةُ السحب وتُنفَّذ، لأن الأصل الذي لا يمكن سحبُه قد لا يكون قد قُبِض قبضًا صحيحًا",
          "بوابةُ دخولٍ بحدٍّ أقصى لفارق السعر: ترفض الشراء الحيّ عند 50 نقطة أساسٍ أو أكثر، وترفض كذلك عند تعذُّر قراءة دفتر الأوامر",
          "السكة 20 — نطاقُ التداول: نجاحُ القراءة بمفتاحٍ ما ليس دليلًا على أنه يستطيع التداول، فيُرفض كلُّ دخولٍ حيٍّ حتى تؤكّد المنصّةُ نفسُها أنّ هذا المفتاح يجوز له وضعُ أمرِ دخول",
          "السكة 21 — رصيدُ الأصل: يُرفض البيعُ إذا أفادت المنصّةُ صراحةً بعدم وجود رصيد، ويُمرَّر عمدًا إذا كان الرصيدُ مجهولًا لا غير، لأنّ منعَ الخروج يحبس مركزًا أراد الخروج",
          "رفضُ السكة يسمّي نفسه ويسمّي الأمرَ الذي يرفعه",
        ],
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "نطاقُ التداول — المنصّةُ نفسُها تستطيع تكذيبَ ما وثّقه المشغّل",
        body: "نجاحُ القراءة بمفتاحٍ ما ليس دليلًا على أنه يستطيع التداول: مفتاحٌ سليمُ الصياغة نجحت به كلُّ قراءة، ثم رُفض أولُ أمرٍ حيٍّ به بعبارة «ليست لديك صلاحيةُ القيام بهذا الإجراء». فصار ادّعاءُ المشغّل أنّ مفتاح المنصّة يجوز له وضعُ أوامر دخولٍ حيّةٍ سجلًّا تستطيع المنصّةُ نفسُها نقضَه — الأمرُ keel scope attest يكتب نصيبَ المشغّل، ورفضُ المنصّة يمحوه، والسجلُّ مربوطٌ ببصمة المفتاح الذي كسبه، فلا يرث مفتاحٌ جديدٌ إذنَ سابقِه. وتقرأ السكةُ 20 هذا السجلَّ فترفض الدخولَ الحيَّ ما دام يقول لا. أمّا الخروجُ فلا يُمَسّ عمدًا، إذ يجب أن يبقى الخروجُ ممكنًا دائمًا.",
        verify: { label: "commands/scope.py", path: "keel/commands/scope.py" },
      },
      {
        title: "بوابات الاستراتيجية — مرشَّحة ← تجريبية ← حيّة",
        body: "على القاعدة أن تجتاز ثلاث مراحل قبل أن تلمس مالًا حقيقيًّا. ولا تُرقَّى إلا باجتياز بوابةٍ من شقّين: حدودٌ دنيا للأداء، وفحصٌ للإفراط في المُلاءمة (PBO/CSCV). ويجوز بلوغُ الحدّ الأدنى البالغ مائة صفقة بالاختبار الرجعي للقاعدة نفسها، أو بتجميع صفقات الوسائط نفسها عبر منتجاتٍ متعدّدةٍ في التداول التجريبي — بشرط أن يُسهم خمسةُ منتجاتٍ على الأقل بعشر صفقاتٍ لكلٍّ منها، لأن تجميع عيّناتٍ مترابطةٍ يُبالغ في تقدير قوّتها الإحصائية.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "قياسٌ صادق، مقابل الشراء الدوري المنتظم",
        body: "يعيد الأمر keel simulate تشغيلَ القواعد الحقيقية على التاريخ المجلوب، ويقارنها بمؤشّرٍ مرجعيٍّ بسيطٍ هو الشراء الدوري المنتظم (DCA)، ويكتب تقرير GO-LIVE أو TRAIN-MORE مسمّيًا كلَّ بوابةٍ وأرقامَها. ويُسعّر المحرّك الرجعي الانزلاقَ لكلِّ منتجٍ على قدر سيولته هو — من 5 نقاط أساسٍ عند أعلى السيولة إلى 183.8، وهو ما يدفعه أرقُّ الأصول في الكون المقيس — فلا يمكن تجميلُ نتيجةٍ بدفترِ أوامرَ ضعيفِ السيولة. وبالقياس على ذلك الكون، لا يبلغ أرضيةَ الخمس نقاطٍ ولا أصلٌ واحدٌ من الأربعة والعشرين. ويذكر التقريرُ أيَّ تمريرةٍ استعملت أيَّ سعر، لأنّ جدول الأفضلية يُسعَّر لكلِّ منتج بينما تمريرةُ الحساب والمؤشّرُ المرجعي ما يزالان بسعرٍ ثابت. وعلى القواعد الافتراضية سيقول لك على الأرجح TRAIN-MORE — وهذا دليلُ عمل المحرّك لا دليلُ عطبه.",
        verify: { label: "سجلّ التجارب", path: "docs/experiments", kind: "tree" },
      },
      {
        title: "سجلُّ الأوامر يقيّد دفترَ السوق الذي نُفِّذ عليه الأمرُ فعلًا",
        body: "كان جدولُ الأوامر يُكتَب منذ البداية ولا واجهةَ تقرؤه، فكان سؤالُ «ماذا اشترى كيل وباع، وبأيّ سعر» لا يُجاب إلا بفتح قاعدة البيانات يدويًّا. صار الآن خدمةً: الأمرُ keel orders يعرض التقرير، وتعرض لوحةُ الويب المحليّة التقريرَ نفسَه بدل إعادة حسابه، فلا تفترق الواجهتان. ويحمل كلُّ أمرٍ أعلى دفترِ المنصّة لحظةَ الإرسال، محفوظًا عرضًا وطلبًا لا رقمَ فارقٍ واحدًا — فالفارقُ إذا حُسب ثمّ خُزّن ضاع الرقمان اللذان جاء منهما. وعند أحجام هذا النشر يكاد الفارقُ يكون التكلفةَ كلَّها، فسُجّل دليلًا بدل أن يُعاد بناؤه لاحقًا.",
        verify: { label: "commands/orders.py", path: "keel/commands/orders.py" },
      },
      {
        title: "keel research — بابٌ واحدٌ على ثلاث عشرة وحدةَ أدلّة",
        body: "كانت عُدّةُ الأدلّة ثلاثَ عشرة وحدةً بلا موضعٍ واحدٍ يقول ذلك؛ وستٌّ منها لا تُبلَغ إلا بقراءة الشيفرة. والآن يسمّي الأمرُ keel research index الثلاثَ عشرةَ جميعًا — ما تجيب عنه كلُّ وحدة، وما لا تستطيع الإجابةَ عنه، والأمرُ الذي يشغّلها. ولا يضيف إحصاءً من عنده: فالخمسُ التي كان لها موضعٌ تحت keel trials مُسجَّلةٌ مرّةً ثانيةً بوصفها الكائناتِ نفسَها لا نسخًا عنها، لأنّ بابًا يعيد التنفيذَ يفترق عن أصله لحظةَ يُصلَح أحدُ النسختين دون الأخرى. وعمودُ «ما لا تستطيع الإجابةَ عنه» يُقرأ بالعناية نفسِها التي يُقرأ بها الآخر.",
        verify: { label: "commands/research.py", path: "keel/commands/research.py" },
      },
      {
        title: "ثلاثة أنماط نشرٍ لا يتقاسم أيٌّ منها شيئًا",
        body: "نمطٌ يوميٌّ تجريبي، ونمطٌ حيّ، ونمطٌ ساعيٌّ لجمع الأدلة (paper-hourly) — لكلٍّ منها قاعدةُ بياناته وإعداداته. ووُجد النمطُ الساعي لأن المؤقّت اليومي يقيس 2.15 إشارةً لكل أصلٍ في السنة (أي إنّ مراجعة المائة صفقة تبعد ما بين 31 و84 سنة)، بينما تُطلق القواعد نفسها على شموع الساعة 49.4 إشارة — أي نحو 940 إشارة دخولٍ سنويًّا بعد التجميع، فتصير مراجعةُ الأدلة الأمامية على بُعد أسابيع بدل عقود. وهو مقيسٌ بخسارةٍ صافيةٍ أيضًا: فقد وُجد لجمع أدلةٍ أماميةٍ مقبولة، لا للربح.",
        verify: { label: "كتاب تشغيل المشغّل", path: "docs/operator-runbook.md" },
      },
      {
        title: "منفذُ وسطاءٍ، لا ارتهانٌ لوسيط",
        body: "تُنفّذ المحوّلات عقدًا واحدًا — منفذ keel-broker-api — وتُسجَّل تحت نقطة الدخول keel.brokers. ومحوّل Coinbase Advanced Trade هو المحوّل المرجعي؛ ويُسلَّم Robinhood منصّةً اختياريةً غيرَ موصولةٍ عمدًا؛ وانضمّ محوّل Alpaca في الإصدار v0.10.0. وثمّة منصّةٌ وهميةٌ متعمَّدةُ الاختلاف تُبقي المنفذ أمينًا: إذ تعمل حزمةُ اختبارات المطابقة على الاثنتين معًا، ضمن حزمةِ اختباراتٍ تناهز 5,000 اختبار.",
        verify: { label: "packages/", path: "packages", kind: "tree" },
      },
      {
        title: "الأمرُ القَوْسي (bracket) نوعُ أمرٍ واحد — لأنّ ساقَيه تتراهنان",
        body: "أضحى في المنفذ الذي تُنفّذه المحوّلاتُ القوسُ نوعَ أمرٍ واحد — BracketGTC، أمرُ خروجٍ يغلق مركزًا محتفَظًا به — لا أمرَين يُوضَعان ثم يُقترَنان لدى العميل. فساقان تُوضَعان كلٌّ على حدة تتراهنان: إن مُلئت إحداهما ولم تُلغَ الأخرى، بقي أمرٌ حيٌّ قادرٌ على بيعِ مركزٍ أُغلِق فعلًا، كما أنّ ساقين تحمل كلٌّ منهما الكميةَ الكاملة يلتزمان المركزَ مرّتين. أمرٌ أصيلٌ واحد يُزيل الفشلين معًا بحكم البناء. وهذه مرحلةٌ أولى، مفرداتُ منفذٍ فحسب: كلُّ محوّلٍ يرسم خرائطها، وحزمةُ اختبارات المطابقة تثبّتها، في حين أنّ مسار كيل الحيّ ما يزال يضع أمرَ المنصّة القَوْسيَّ الأصيل مباشرةً، ونقلَ هذا الاستدعاء إلى المنفذ هو المرحلةُ التالية. وهو عملُ تصحيحٍ لا أكثر: لا يدّعي شيءٌ هنا أنّ المحرّك يتاجر أفضل، بل أنّ طرقَ الخطأ صارت أقل.",
        verify: { label: "orders.py — BracketGTC", path: "packages/keel-broker-api/keel_broker_api/orders.py" },
      },
      {
        title: "حجمُ الأمر يُقرَّب إلى دقّة المنصّة — ولا يُعطَّل خروجٌ أبدًا",
        body: "قلّما يقعُ أمرٌ محجَّمٌ بالمخاطرة على عددٍ صحيح، والمنصّةُ ترفض حجمًا يحمل خاناتٍ عشريةً أكثر من خطوة الزيادة التي يحدّدها المنتج — وقد رفضت المنصّةُ أولَ أمرٍ حيٍّ محجَّمٍ بالمخاطرة على هذا التحديد بالضبط: خطأُ تنسيقٍ لا سكةُ أمان. والآن يُقرَّب الحجمُ إلى الأسفل إلى مضاعفِ الزيادة التي تعلنها المنصّة للمنتج، على جانبَي الأمر معًا. وإذا كانت الزيادةُ مجهولةً فشِلَ الجانبان في اتجاهين متعاكسين عمدًا: الشراءُ يُرفَض — فالدخولُ المرفوض لا يكلّف شيئًا — أمّا البيعُ فيُرسَل كما هو مع تسجيلِ ذلك، لأنّ خروجًا لا يستطيع المغادرةَ أسوأُ من دخولٍ لا يستطيع البدء. وحجمٌ يتقرّب إلى الصفر يُرفَض رفضًا قاطعًا.",
        verify: { label: "execution/executor.py", path: "keel/execution/executor.py" },
      },
      {
        title: "التنفيذُ الجزئي حالةٌ قائمةٌ بذاتها؛ والخروجُ لا يُطلِق إلا ما بيع فعلًا",
        body: "الأمرُ السوقي الذي لا يمتلئ إلا جزئيًّا لم يعد مجبَرًا على أن يبدو إمّا معلّقًا وإمّا منفَّذًا: فـ«أكبر من صفر وأقلّ من المطلوب» حالةٌ غير نهائيةٍ قائمةٌ بذاتها، تُسجَّل فيها الكميةُ التي رأت المنصّةُ تنفيذَها إلى جوار الكمية المطلوبة، ويُعتمد متوسطُ المنصّة الجاري سعرًا للتنفيذ. وكلُّ ما بعد ذلك يُحسَب على ما نُفّذ فعلًا — فأساسُ احتساب المتوسط تُحتسَب فيه المشترياتُ الجزئية عند كميتها المنفَّذة، لا عند حجمٍ لم يشترِ شيئًا. والدخولُ الذي لا يمتلئ إلا جزئيًّا يُحذَّر عنه بصوتٍ عالٍ، لأنّ أمرَ الحماية القَوْسي وُضع على الكمية المطلوبة وقد يتجاوز ما هو محتفَظٌ به فعلًا؛ وتغييرُ حجمه فعلُ مشغّلٍ عمدًا لا فعلٌ آلي. والخروجُ الذي لا يمتلئ إلا جزئيًّا يقيّد النتيجةَ على الكمية التي بيعت فعلًا ويحبس إطلاقَ ما بقي محتفَظًا به — فالشريحة لا تُغلَق إلا إذا غطّاها تنفيذُها. وأيُّ جانبٍ ينتمي إليه التحذيرُ مثبَّتٌ باختبار.",
        verify: { label: "execution/reconcile.py", path: "keel/execution/reconcile.py" },
      },
      {
        title: "سجلُّ الانهيار يُكتَب قبل الإلغاء، حتى يكون تحريكُ الوقف الميّت صاخبًا",
        body: "تحريكُ الوقف يعني إلغاءَ أمر الحماية القائم ووضعَ بديله — وعمليّةٌ تموت بين الاثنين كانت تترك المركز عاريًا وصامتًا معًا، لأنّ المطابقة تتعمّد السكوتَ عن الصفوف التي لا نيّةَ مسجَّلةً لها، حتى لا يُدرَّب المنبّه على التجاهل. والآن انعكس ترتيبُ العمليّتين: سجلُّ نيّة «غير المحصَّن» (unbracketed) — سجلُّ الانهيار الذي يسمّي المركزَ الذي فقد حمايته — يُكتَب قبل أن يُصدَر الإلغاء. فتحريكُ وقفٍ يموت في منتصف الطريق يُسمَع في دورة المطابقة التالية نفسِها، حاملًا الأرقامَ اللازمة لإعادة وضع أمر الحماية.",
        verify: { label: "execution/executor.py — _roll_stop", path: "keel/execution/executor.py" },
      },
      {
        title: "Robinhood: قواعدُ المنصّة نفسها تُفحَص قبل إرسال أيّ أمر",
        body: "محوّلُ Robinhood — الاختياريُّ غيرِ الموصول عمدًا كما كان — يقرأ الآن قواعدَ كلِّ زوجٍ تنشرها المنصّة (حدٍّ أدنى لحجم الأمر مُقوَّمًا بعملة التسعير، وخطوةَ الزيادة، وحدًّا أقصى) ويفحص كلَّ أمرٍ عليها قبل الإرسال، فما كان دون الحدّ الأدنى أو خارج خطوة الزيادة يُرفَض محليًّا لا عند المنصّة. كما أنّ نقطته best_bid_ask ليست لقطةَ دفترٍ — فساقاها تُعيَّنان كلٌّ على حدة وتتقاطعان على أكثر الأزواج سيولةً — فلا يُعيد المحوّل عرضًا إلا إذا رتّبت أرقامُ المنصّة نفسُها ترتيبًا متّسقًا، ويرفض تلفيقَ عرضٍ خلاف ذلك.",
        verify: { label: "keel-broker-robinhood/adapter.py", path: "packages/keel-broker-robinhood/keel_broker_robinhood/adapter.py" },
      },
      {
        title: "التأكيدُ هو الأصل؛ والاستقلاليةُ تغيّر مَن يُسأل",
        body: "يعاين كيل كلَّ أمرٍ ويسأل عند الطرفية؛ وإن كان يعمل بلا واجهةٍ تفاعلية رفض الأمر. والأمر keel autonomy on يغيّر مَن يُسأل، لا ما يُسمح به. ولإيقاف التداول: keel kill — ومفتاحُ الإيقاف يرفض عند الفشل.",
        verify: { label: "الـREADME، «كيف يعمل كيل»", path: "README.md", hash: "#how-keel-works" },
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
    rev: "2026-09-05.1",
    translatedFromRev: "2026-09-05.1",
    title: "Fonctionnalités du moteur de conformité — keel",
    description:
      "Un filtrage attesté qui bloque par défaut, vingt garde-fous incontournables, des verrous de promotion avec contrôle de surapprentissage, une mesure honnête face au DCA, une exécution durcie pour la justesse — chaque fonctionnalité renvoie à sa source dans le code.",
    intro:
      "Cette page ne décrit que ce que le dépôt du moteur peut montrer. Chaque section renvoie à la source qui l'atteste : si une affirmation s'écartait un jour du code, c'est par ce lien que vous nous prendriez en défaut.",
    verifyNote: "Vérifier dans le dépôt",
    features: [
      {
        title: "Filtrage des actifs par attestation — blocage par défaut",
        body: "L'admission dans la liste blanche est découpée selon ce qu'il est possible de savoir. Les faits de marché se calculent. Les classifications Shariah — l'activité principale du token relève-t-elle d'un secteur interdit (§28.4), s'agit-il d'un 'ayn adossé à un actif ou d'une créance dayn (§65.5/§67.2), le token verse-t-il un rendement assimilable au riba — sont attestées, jamais déduites, au moyen de keel assets attest. Une attestation manquante vaut refus, pas acceptation par défaut.",
        verify: { label: "compliance/screen.py", path: "keel/compliance/screen.py" },
      },
      {
        title: "Les garde-fous (rails) — vingt contrôles qu'aucun ordre ne contourne",
        body: "Des contrôles déterministes que rien ne peut désactiver, pas même le mode autonome. Ils sont vingt, numérotés de 1 à 14 et de 16 à 21 — le garde-fou 15 a été retiré et son numéro jamais réattribué :",
        points: [
          "La liste blanche halal, les plafonds de dépense par ordre et par jour, les plafonds d'exposition et de concentration",
          "Un dimensionnement qui tient compte des corrélations, un seuil de mouvement minimal, l'interdiction de la martingale et de l'élargissement des stops",
          "Des disjoncteurs de perte maximale (drawdown) totale et hebdomadaire, un disjoncteur de pertes consécutives et d'érosion de l'avantage statistique (edge)",
          "Des contrôles de fraîcheur des flux de données et de cohérence des cotations",
          "Garde-fou 14 — attestations d'abonnement et de retrait sur la plateforme : tout achat réel est refusé tant que l'opérateur n'a pas attesté",
          "Garde-fou 17 — qabd §65.4 : la capacité de retrait est attestée puis appliquée, au motif qu'un actif impossible à retirer n'a peut-être jamais été valablement possédé",
          "Un plafond d'écart (spread) à l'entrée, qui refuse tout achat réel à partir de 50 points de base et bloque d'office si le carnet est illisible",
          "Garde-fou 20 — périmètre de négociation : une clé qui lit correctement ne prouve pas qu'elle peut négocier ; toute entrée réelle est refusée tant que la plateforme elle-même n'a pas confirmé que cette clé peut en placer une",
          "Garde-fou 21 — solde de l'actif : une vente est refusée lorsque la plateforme signale explicitement l'absence de solde, et délibérément laissée passer lorsque le solde est simplement inconnu, car bloquer une sortie enferme une position qui voulait sortir",
          "Tout veto d'un garde-fou se nomme et indique la commande qui le lève",
        ],
        verify: { label: "execution/guards.py", path: "keel/execution/guards.py" },
      },
      {
        title: "Périmètre de négociation — c'est la plateforme qui peut démentir l'attestation de l'opérateur",
        body: "Une clé qui lit correctement ne prouve pas qu'elle peut négocier : une clé bien formée, dont toutes les lectures aboutissaient, s'est vu refuser son premier ordre réel — « vous n'avez pas la permission d'effectuer cette action ». L'affirmation de l'opérateur selon laquelle la clé d'une plateforme peut placer des entrées réelles est donc devenue un enregistrement que la plateforme elle-même peut renverser : keel scope attest écrit la moitié de l'opérateur, un refus de la plateforme l'écrase, et l'enregistrement est lié à l'empreinte de la clé qui l'a obtenu — changer de clé n'hérite donc pas de l'autorisation de l'ancienne. Le garde-fou 20 lit cet enregistrement et refuse les entrées réelles tant qu'il dit non. Les sorties restent délibérément intactes, car une sortie doit toujours pouvoir partir.",
        verify: { label: "commands/scope.py", path: "keel/commands/scope.py" },
      },
      {
        title: "Verrous de stratégie — candidate → papier → réel",
        body: "Une règle doit franchir trois étapes avant de toucher de l'argent réel. La promotion passe par un verrou en deux volets : des seuils de performance et un contrôle de surapprentissage (PBO/CSCV). Le seuil de 100 transactions peut être atteint par le backtest de la règle, ou en mutualisant le même jeu de paramètres sur d'autres produits en papier — à condition qu'au moins cinq produits y contribuent pour dix transactions chacun, car un ensemble d'échantillons corrélés surestime sa propre puissance.",
        verify: { label: "agent.py — RULE_REGISTRY", path: "keel/agent.py" },
      },
      {
        title: "Mesure honnête, face au DCA",
        body: "keel simulate rejoue les vraies règles sur l'historique récupéré, les compare à la référence DCA et rédige un rapport GO-LIVE / TRAIN-MORE qui nomme chaque verrou et ses chiffres. Le backtesteur applique à chaque produit un glissement calibré sur sa propre liquidité — de 5 points de base à l'extrémité la plus liquide jusqu'à 183,8, le taux que paie le nom le plus étroit de l'univers mesuré — afin qu'aucun résultat ne puisse être flatté par un carnet d'ordres peu liquide. Sur cet univers, pas un seul des 24 actifs n'atteint le plancher de 5 points de base. Le rapport indique quelle passe emploie quel taux, car le tableau d'avantage est tarifé par produit tandis que la passe de compte et la référence DCA restent à taux fixe. Sur les règles par défaut, il vous répondra très probablement TRAIN-MORE : c'est le moteur qui fonctionne, pas une panne.",
        verify: { label: "le registre des expériences", path: "docs/experiments", kind: "tree" },
      },
      {
        title: "Le registre des ordres consigne le carnet sur lequel keel a réellement été exécuté",
        body: "La table des ordres était écrite depuis le début sans qu'aucune surface ne la lise : « qu'a acheté et vendu keel, et à quel prix » n'avait de réponse qu'en ouvrant SQLite à la main. C'est un service désormais : keel orders affiche le rapport, et la console web locale projette ce même rapport au lieu de le recalculer, de sorte que les deux interfaces ne peuvent pas diverger. Chaque ordre porte le haut du carnet de la plateforme au moment de la soumission, conservé comme la paire achat/vente et non comme un unique chiffre d'écart — un écart calculé puis stocké perd les deux nombres dont il provient. Aux tailles d'ordre de ce déploiement, l'écart constitue presque tout le coût : il est donc consigné comme preuve plutôt que reconstruit après coup.",
        verify: { label: "commands/orders.py", path: "keel/commands/orders.py" },
      },
      {
        title: "keel research — une porte d'entrée unique sur treize modules de preuve",
        body: "La boîte à outils comptait treize modules et aucun endroit ne le disait ; six d'entre eux n'étaient atteignables qu'en lisant le code. keel research index les nomme désormais tous les treize — ce à quoi chacun répond, ce à quoi il ne peut pas répondre, et la commande qui l'exécute. Il n'ajoute aucune statistique propre : les cinq qui avaient déjà leur place sous keel trials y sont enregistrés une seconde fois comme les mêmes objets de commande, jamais des copies, car une porte d'entrée qui réimplémente diverge dès que l'une des copies reçoit un correctif que l'autre n'a pas. La colonne « ne peut pas répondre » est à lire avec autant d'attention que l'autre.",
        verify: { label: "commands/research.py", path: "keel/commands/research.py" },
      },
      {
        title: "Trois profils de déploiement qui ne partagent rien",
        body: "Papier quotidien, réel, et un profil horaire de collecte de preuves (paper-hourly) — chacun avec sa propre base de données et sa propre configuration. Le profil horaire existe parce que l'horloge quotidienne ne mesure que 2,15 signaux par actif et par an : à ce rythme, il faudrait de 31 à 84 ans pour réunir les 100 transactions d'une revue. Les mêmes règles sur des bougies ONE_HOUR en déclenchent 49,4 — environ 940 signaux d'entrée par an une fois mutualisés — ce qui ramène cette revue à quelques semaines au lieu de quelques décennies. Lui aussi est mesuré perdant : il existe pour collecter des preuves recevables, pas du profit.",
        verify: { label: "le runbook opérateur", path: "docs/operator-runbook.md" },
      },
      {
        title: "Un port courtier, pas un enfermement propriétaire",
        body: "Les adaptateurs mettent en œuvre un seul contrat — le port keel-broker-api — et se déclarent sous le point d'entrée keel.brokers. Coinbase Advanced Trade est l'adaptateur de référence ; Robinhood est livré comme plateforme optionnelle, délibérément non raccordée ; un adaptateur Alpaca s'y est ajouté en v0.10.0. Une plateforme factice, volontairement divergente, maintient le port honnête : la suite de conformité s'exécute sur les deux, au sein d'une base d'environ 5 000 tests.",
        verify: { label: "packages/", path: "packages", kind: "tree" },
      },
      {
        title: "Un bracket est un seul type d'ordre, parce que deux jambes font la course",
        body: "Le port qu'implémentent les adaptateurs connaît désormais le bracket comme un type d'ordre unique — BracketGTC, un bracket de sortie qui clôture une position détenue — et non deux ordres à placer puis à apparier côté client. Deux jambes posées séparément font la course : si l'une se remplit et que la survivante n'est jamais annulée, un ordre vivant reste capable de vendre une position déjà close, et deux jambes portant chacune la quantité totale engagent la position deux fois. Un ordre natif unique supprime l'un et l'autre par construction. Ceci est l'étape un, du vocabulaire de port : chaque adaptateur le mappe, la suite de conformité l'épingle, et le chemin live de keel place encore directement le bracket natif de la plateforme — déplacer cet appel vers le port est l'étape suivante. C'est un travail de justesse : rien ici ne prétend que le moteur trade mieux, seulement qu'il y a moins de façons d'avoir tort.",
        verify: { label: "orders.py — BracketGTC", path: "packages/keel-broker-api/keel_broker_api/orders.py" },
      },
      {
        title: "Taille d'ordre quantifiée à la précision de la plateforme — une sortie n'est jamais bloquée",
        body: "Un ordre dimensionné au risque tombe rarement sur un chiffre rond, et une plateforme rejette une taille qui porte plus de décimales que le pas du produit — le premier ordre live dimensionné au risque a été refusé exactement pour cela : une erreur de formatage, pas un garde-fou. Les tailles sont désormais quantifiées à la baisse au pas que la plateforme déclare pour le produit, des deux côtés de l'ordre. Quand le pas est inconnu, les deux côtés échouent dans des directions opposées, délibérément : un achat est refusé — une entrée refusée ne coûte rien — tandis qu'une vente part telle quelle et est journalisée, parce qu'une sortie qui ne peut pas partir est un échec plus grave qu'une entrée qui ne peut pas commencer. Une taille qui se quantifie à zéro est refusée net.",
        verify: { label: "execution/executor.py", path: "keel/execution/executor.py" },
      },
      {
        title: "Les exécutions partielles sont un état à part ; une sortie ne libère que ce qui s'est vendu",
        body: "Un ordre au marché qui ne se remplit que partiellement n'est plus forcé de paraître soit en attente soit exécuté : 0 < rempli < demandé est un état non terminal à part, avec la quantité observée chez la plateforme enregistrée à côté de la quantité demandée, et la moyenne courante de la plateforme comme prix d'exécution. Tout ce qui est en aval calcule sur ce qui s'est réellement exécuté — la base de calcul de la moyenne pondérée compte un achat partiel à sa quantité remplie, jamais à une taille qui n'a rien acheté. Une entrée partiellement remplie alerte fort, car son bracket de sortie a été dimensionné pour la quantité demandée et peut dépasser ce qui est réellement détenu ; le redimensionner est délibérément une action d'opérateur, pas automatique. Une sortie partiellement remplie comptabilise le résultat pour la quantité réellement vendue et retient la libération du reliquat encore détenu — une tranche ne se clôture que lorsque son remplissage la couvre. Le côté auquel l'avertissement appartient est épinglé par un test.",
        verify: { label: "execution/reconcile.py", path: "keel/execution/reconcile.py" },
      },
      {
        title: "Le registre de crash s'écrit avant l'annulation, pour qu'un roll mort soit bruyant",
        body: "Déplacer un stop, c'est annuler le bracket au repos puis placer son remplaçant — et un processus mourant entre les deux laissait la position nue ET silencieuse, parce que la réconciliation reste volontairement discrète sur les lignes sans intention enregistrée, pour ne pas dresser l'opérateur à ignorer l'alerte. L'ordre des opérations est désormais inversé : l'enregistrement d'intention « unbracketed » — le registre de crash qui nomme la position ayant perdu sa protection — s'écrit avant que l'annulation ne parte. Un roll qui meurt en vol est bruyant dès le cycle de réconciliation suivant, avec les chiffres nécessaires pour replacer le bracket.",
        verify: { label: "execution/executor.py — _roll_stop", path: "keel/execution/executor.py" },
      },
      {
        title: "Robinhood : les règles de la plateforme vérifiées avant l'envoi d'un ordre",
        body: "L'adaptateur Robinhood — toujours optionnel, toujours délibérément non raccordé — lit les règles par paire que la plateforme publie (une taille minimale libellée dans la monnaie de cotation, le pas de taille, un maximum) et vérifie chaque ordre contre elles avant soumission : un ordre sous le minimum ou hors pas est refusé localement au lieu d'être découvert chez la plateforme. Et son point de terminaison best_bid_ask n'est pas un instantané de carnet — les deux jambes y sont échantillonnées indépendamment et se croisent sur les paires les plus liquides — donc l'adaptateur ne rend une cotation que lorsque les chiffres de la plateforme s'ordonnent de façon cohérente, et refuse d'en fabriquer une autrement.",
        verify: { label: "keel-broker-robinhood/adapter.py", path: "packages/keel-broker-robinhood/keel_broker_robinhood/adapter.py" },
      },
      {
        title: "Confirmation par défaut ; l'autonomie change l'interlocuteur, pas la règle",
        body: "keel prévisualise chaque ordre et demande confirmation dans le terminal ; sans opérateur, il refuse. keel autonomy on change qui l'on interroge, jamais ce qui est permis. Pour tout arrêter : keel kill — le coupe-circuit se ferme en cas de défaillance.",
        verify: { label: "le README, « How keel works »", path: "README.md", hash: "#how-keel-works" },
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
