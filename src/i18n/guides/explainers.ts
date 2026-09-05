/**
 * Deep explainers (#12) — long-form prose articles in the guides lane,
 * beside the Get Started walkthroughs. EN is the source of truth; each AR
 * twin carries an FR-8 rev marker (translatedFromRev). Every fiqh and
 * compliance claim below traces to the engine repo's own documents —
 * docs/fiqh-basis.md and docs/glossary.md, rendered under /docs — and the
 * results posture mirrors the engine's honest result exactly.
 */
export interface ArticleLink {
  label: string;
  href: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleHonestBox {
  title: string;
  paragraphs: string[];
  links: ArticleLink[];
}

export interface ArticleContent {
  title: string;
  /** Meta description (~150 chars). */
  description: string;
  /** Definition-first lede — AI engines quote definitions. */
  lede: string;
  sections: ArticleSection[];
  /** FR-9 honest-context box — required wherever results are touched. */
  honestBox: ArticleHonestBox;
  /** The "not a fatwa / not financial advice" line. */
  footnote: string;
  /** FR-8 — revision marker for this text. */
  rev: string;
  /** AR only: the EN revision this translation tracks. */
  translatedFromRev?: string;
}

export interface Explainer {
  slug: string;
  en: ArticleContent;
  ar: ArticleContent & { translatedFromRev: string };
}

export const explainers: Explainer[] = [
  {
    slug: "how-shariah-crypto-screening-works",
    en: {
      title: "How Shariah crypto screening actually works",
      description:
        "Computed market facts versus attested Shariah classifications: how keel's fail-closed curation screen admits assets, why absence of an attestation is a rejection — and what no machine may decide.",
      lede:
        "Shariah crypto screening is the admission process that decides which assets a trading system may touch at all — not a verdict that any asset is halal. In keel it runs on one dividing line: market facts are computed, Shariah classifications are attested, never inferred. And it fails closed — an asset without an attestation is rejected, not passed by default.",
      sections: [
        {
          heading: "What screening is — and when it runs",
          paragraphs: [
            "Screening, in keel, is a curation gate: the process that decides which assets may enter the allowlist at all. It runs once, at admission — not on every trade. The basis keel cites is explicit that sector and backing are “a listing criterion, checked once when curating the allowlist, not per-trade” (§28.4). What runs per-trade is enforcement: rail 1 passes every order intent — DCA purchases included — through the allowlist, mechanically and un-overridably.",
            "The division of labour is the point. The rail enforces a ruling; it never contains one. The ruling lives in the attestation a human recorded, and the rail simply refuses everything that ruling did not admit.",
          ],
        },
        {
          heading: "What is computed",
          paragraphs: [
            "Some questions about an asset are arithmetic, and the engine answers them itself, from its own candle cache: does the history run deep enough to evaluate a rule, is the book liquid enough to trade, can the pair settle into the operator's configured currencies. History depth, liquidity, and settlement quotability are market facts — recomputed freely whenever the cache changes, carrying no scholarship at all. This half of the screen is ordinary measurement, and it is honest precisely because arithmetic is all it claims to be.",
          ],
        },
        {
          heading: "What is attested — never inferred",
          paragraphs: [
            "The other half is not arithmetic. Whether a token's core purpose serves a prohibited sector, whether it is an owned thing ('ayn) or a debt claim (dayn), whether bare holding pays a riba-like return, and what kind of contract the listing actually is — these are questions of fact-plus-scholarship about the world. No module in keel derives them from candles, and none pretends to. A human records each answer, with a source and a name, and the engine enforces the record deterministically. The screen's four attested axes:",
          ],
          bullets: [
            "Sector (§28.4). A token whose core business is a haram line — gambling, alcohol, riba-based lending, and the rest of the prohibited sectors — is rejected. Aave/Compound-class lending tokens fail here.",
            "Backing (§65.5/§67.2). An 'ayn — an owned thing — passes; a dayn, a debt claim on an issuer, is refused: trading a pure claim is a different contract under different rules. An 'ayn backed by gold or silver draws a warning that the stricter bay' al-sarf regime applies: no deferment, and a 72-hour settlement bound.",
            "pays_yield (§28.4, the riba screen). Rejects an asset that “carries a guaranteed/expected return for holding it, which is riba-like… holding it is not a bare spot position.” The field's semantics are bare holder — what holding the asset without staking or lending earns — and are established by fetching the asset's own documentation, not by assumption. Solana's staking docs, for example, say rewards require delegation, with no rebasing — so bare holding earns nothing, which is exactly what the field asserts.",
            "Instrument (§71.4a). The allowlist is not juristically homogeneous, so admission names the contract, not just the underlying: only spot is admitted. CFD, future, perpetual, option, and leveraged-token listings are refused, recorded via keel assets attest-instrument — and an unattested instrument fails closed, like everything else.",
          ],
        },
        {
          heading: "Fail-closed: unknown is a rejection",
          paragraphs: [
            "When the attestation is absent, the asset is not “probably fine.” It is unknown — and the screen fails closed on unknown. Absence of evidence is treated as absence of the ruling: no attestation, no admission. The same posture runs through the whole engine. Rail 17 refuses to acquire an asset whose withdrawal capability nobody has attested, on the recorded reasoning that “silence is not evidence of possession.” The kill-switch ships engaged. A stale attestation is no better than none.",
            "Fail-closed is not a convenience choice; it is the only honest default for a machine. A screener that passes the unexamined is silently issuing rulings on everything it never looked at — one implied fatwa per unlisted asset. Refusing to decide is the decision, and it puts the burden where it belongs: on the human who supplies the ruling, with a source and a name attached.",
          ],
        },
        {
          heading: "What a waiver can — and cannot — do",
          paragraphs: [
            "A documented exception (keel assets exempt) may waive exactly one criterion today: history. That set is not an accident of configuration. Liquidity, settlement, and the spot instrument shape can never be waived, and no Shariah criterion can be waived at all — nothing in the screen consults a waiver for them. A new asset with a thin price history may be admitted on a documented exception; a haram-sector token has no paperwork that admits it. Expanding the waivable set is a deliberate future decision, never a default.",
          ],
        },
        {
          heading: "Why the machine refuses to decide",
          paragraphs: [
            "Because the decisions are not the machine's to make. Whether a token with no genuine use or benefit, surviving only because holders hope to sell higher, qualifies as Māl — tradable property — at all is “exactly the kind of judgement the screen defers to a human.” The DOGE question is the live example: the source's own lean is recorded, and it remains a deferral, not a decision.",
            "Nor does the engine adjudicate between schools. Where sources diverge — the knowledge base records identical retail FX ruled haram by one jurisdiction and halal by another (§66.6) — keel records both sides and enforces whichever ruling the operator supplies. Two operators following different schools get different answers from the same code, by design. The ruling lives in your attestation, not in the code.",
            "And the engine is honest about its own premise. Every ruling above presupposes that crypto is Shariah-recognised tradable property — and on that, the highest available authority declined to rule: IIFA Resolution 237 (§71.1) convened a dedicated symposium on electronic currencies, debated the matter at its 24th session in November 2019, identified exactly this question as unresolved, and issued no ruling. A withheld ruling is not a prohibition; it is also not a permission. That BTC/ETH-class assets are tradable property is keel's well-supported interpretive position, held on the conservative branch the sources direct to (§29.2) — not a settled ruling the engine can cite as fact.",
          ],
        },
        {
          heading: "Screening in practice",
          paragraphs: [
            "The Compliance menu's screen view lists every allowlisted product with its admission verdict: which axes are attested, which computed checks pass, and exactly what is missing. Recording a classification is one command — keel assets attest --asset --sector --backing --pays-yield --source --attested-by — and the last two flags are required, because an unsourced claim is not evidence. The audit trail records who said what; your deployment follows your ruling; upstream stays neutral.",
          ],
        },
        {
          heading: "What the screen does not even look at",
          paragraphs: [
            "Admission is not the whole of compliance, and the screen is honest about where its jurisdiction ends. Non-compliant income is handled by a separate, report-only mechanism: interest and reward credits are segregated from realised P&L and the equity base, reported as owed to charity, never recognised as profit, and zakat is computed on purified wealth (§65.9, §33.1). The agent never disposes of those funds — it reports.",
            "And some obligations no engine can see at all. The venue pays USDC rewards on idle balances; that interest is riba and accrues with no order placed — so no rail can catch it. Disabling rewards at the account level is the operator's obligation, listed first in the operator runbook. Screening keeps unadmitted assets out; purification reports what came in anyway; the rest is on you, in writing, on purpose.",
          ],
        },
      ],
      honestBox: {
        title: "Screening is not profitability",
        paragraphs: [
          "What screening governs is admission, not results. No shipped rule family is net positive at the taker fee actually paid on Coinbase — about 1.2% on each side of a trade. Every signal rule keel ships has now been measured at its shipped defaults across 24 assets: 0 of 120 configurations cleared, and 0 of 138 counting every matrix run. Fees are not the whole cost either — priced at each asset's own liquidity rather than at a flat floor no asset reaches, the results fall further still.",
          "A perfectly screened asset traded by a losing rule is still a losing trade. Compliance and performance are separate axes: the first is enforced by the engine, the second is reported honestly, first.",
        ],
        links: [
          { label: "The honest result, restated", href: "/en/docs/experiment-honest-result-restated/" },
          { label: "The compliance model", href: "/en/compliance/" },
          { label: "The fiqh basis", href: "/en/docs/fiqh-basis/" },
        ],
      },
      footnote:
        "keel is not a fatwa engine, and this guide is neither a fatwa nor financial advice. The boundary gets its own treatment in Attestation is not a fatwa — and possession gets its own guide, Qabd (constructive possession) in spot crypto.",
      rev: "2026-08-21.1",
    },
    ar: {
      title: "كيف يعمل الفرزُ الشرعي للعملات الرقمية فعلًا",
      description:
        "وقائعُ السوق تُحسَب، والتصنيفاتُ الشرعية تُوثَّق ولا تُستنبَط: كيف يُدخل الفرزُ الرافضُ عند الفشل الأصولَ إلى قائمة السماح، ولماذا كان غيابُ التوثيق رفضًا لا قبولًا — وما لا يجوز لآلةٍ أن تقرّره.",
      lede:
        "الفرزُ الشرعي للعملات الرقمية هو عمليةُ القبول التي تقرّر أيَّ الأصول يجوز لمنظومةِ تداولٍ أن تمسَّه أصلًا — لا حكمٌ بأنّ أيَّ أصلٍ حلالٌ. ويسير الفرزُ في كيل على خطِّ فصلٍ واحد: فوقائعُ السوق تُحسَب، أمّا التصنيفاتُ الشرعية فيوثّقها إنسانٌ ولا تُستنبَط أبدًا. وهو يرفض عند الفشل — فالأصلُ الذي لا توثيقَ له مرفوضٌ، لا مقبولٌ افتراضيًّا.",
      sections: [
        {
          heading: "ما الفرزُ ومتى يجري",
          paragraphs: [
            "الفرزُ في كيل بوابةُ انتقاء: عمليةٌ تقرّر أيَّ الأصول يجوز دخولُها قائمةَ السماح أصلًا. ويجري مرةً واحدةً عند القبول — لا في كلِّ صفقة. فالمصدرُ الذي يستند إليه كيل صريحٌ في أنّ القطاعَ والسندَ «معيارُ إدراجٍ، يُفحص مرةً عند انتقاء القائمة، لا في كلِّ صفقة» (§28.4). أمّا ما يجري في كلِّ صفقةٍ فهو الإنفاذ: السكةُ 1 تُمرِّر كلَّ نيّةِ أمرٍ — وشراءاتُ الاستثمار الدوري المنتظم (DCA) داخلةٌ فيها — عبر قائمة السماح تمريرًا آليًّا لا يتجاوز.",
            "وتقسيمُ العمل هو المقصود: فالسكةُ تُنفّذ حكمًا، ولا تحوي حكمًا قط. الحكمُ يسكن التوثيقَ الذي سجّله إنسان، والسكةُ ترفض كلَّ ما لم يدخلْه ذلك الحكم — فحسب.",
          ],
        },
        {
          heading: "ما يُحسَب",
          paragraphs: [
            "بعضُ الأسئلة عن الأصل حسابيٌّ خالص، يجيب عنه المحرّكُ بنفسه من مخزن الشموع الخاص به: هل العمقُ التاريخي كافٍ لتقييم قاعدة، هل السوقُ سيّالةٌ بما يكفي للتداول، هل يمكن تسوية الزوج إلى عملات التسوية التي ضبطها المشغّل. فعمقُ التاريخ، والسيولة، وقابليةُ التسوية — وقائعُ سوقٍ تُعاد حسبتُها بحرّية كلما تغيّر المخزن، ولا تحمل من الاجتهاد شيئًا. هذا النصفُ من الفرز قياسٌ عادي، وهو صادقٌ تحديدًا لأنه لا يدّعي إلا الحساب.",
          ],
        },
        {
          heading: "ما يُوثَّق — ولا يُستنبَط أبدًا",
          paragraphs: [
            "النصفُ الآخر ليس حسابًا. هل الغرضُ الأساسي للرمز قطاعٌ محرَّم، وهل هو عينٌ ('ayn) مملوكةٌ أم دَينٌ (dayn) بمطالبةٍ على مُصدِر، وهل توزّف حيازتُه المجردةُ عائدًا شبيهًا بالربا، وأيُّ عقدٍ هو العقدُ الذي يمثّله الإدراجُ فعلًا — هذه أسئلةٌ تجمع بين الواقع والاجتهاد العلمي، ولا وحدةَ في كيل تستنبطها من بيانات الشموع، ولا تدّعي ذلك. بل يسجّل إنسانٌ كلَّ جوابٍ بمصدرٍ واسمٍ منسوب، ثم يُنفّذ المحرّكُ السجلَّ تنفيذًا حتميًّا. محاورُ الفرز الأربعة الموثَّقة:",
          ],
          bullets: [
            "القطاع (§28.4). الرمزُ الذي غرضُه الأساسي نشاطٌ محرَّم — قمارٌ، أو خمرٌ، أو إقراضٌ ربوي، وسائر القطاعات المحظورة — يُرفض. ورموزُ الإقراض من طراز Aave/Compound تسقط هنا.",
            "السند (§65.5/§67.2). العينُ — المالُ المملوك — تُقبل؛ أمّا الدَّين، أي المطالبةُ الدائنة على مُصدِر، فيُرفض: فمبادلةُ مطالبةٍ مجردة عقدٌ آخر له أحكامٌ أخرى. والعينُ المسنَدة إلى ذهبٍ أو فضّة يجذب تنبيهًا إلى أن نظامَ «بيع الصرف» الأشدَّ انطباقٌ هنا: لا تأجيل، وحدُّ تسويةٍ لا يتجاوز 72 ساعة.",
            "pays_yield (§28.4، فحصُ الربا). يرفض الأصلَ الذي «يحمل عائدًا مضمونًا أو متوقَّعًا لمجرّد حيازته، وهو شبيهٌ بالربا… فحيازتُه ليست مركزًا فوريًّا مجردًا». ودلالةُ الحقل هي «الحيازةُ المجردة»: ما تجنيه ملكيةُ الأصل دون تحصينٍ أو إقراض — وتُثبَت بجلب وثائق الأصل نفسها لا بالافتراض. فواقعُ تحصين سولانا مثلًا ينصّ على أنّ المكافآت تستلزم تفويضًا ولا إعادةَ حسابٍ للرصيد — فالحيازةُ المجردة لا تكسب شيئًا، وهذا بالضبط ما ينصّ عليه الحقل.",
            "الأداة (§71.4a). قائمةُ السماح ليست متجانسةً فقهيًّا، فللقولب العقدُ عند القبول لا المُسنَدُ وحده: لا يُقبل إلا الفوري (spot). وعروضُ الفرقات CFD والعقود الآجلة والدائمة والخيارات والرموز الرافعة تُرفض، وتُسجَّل عبر keel assets attest-instrument — والأداةُ غير الموثَّقة تُرفض رفضًا عند الفشل، ككلِّ شيء هنا.",
          ],
        },
        {
          heading: "الرفضُ عند الفشل: المجهولُ رفضٌ",
          paragraphs: [
            "حين يغيب التوثيق فالأصلُ ليس «في الغالب سليمًا» — بل مجهولٌ، والفرزُ يرفض عند الفشل في المجهول. فغيابُ الدليل يُعامَل معاملة غياب الحكم: لا توثيق، فلا قبول. والنمطُ نفسه يسري في المحرّك كلِّه: فالسكة 17 تمتنع عن اقتناء أصلٍ لم يوثّق أحدٌ قابليةَ سحبه، تعليلًا مسجَّلًا بأنّ «السكوت ليس دليلًا على القبض». ومفتاحُ الإيقاف يُسلَّم مشدودًا من أول تنصيب. والتوثيقُ المتقادم لا خيرَ فيه من عدمه.",
            "وليس الرفضُ عند الفشل اختيارَ ترفٍ، بل هو الانسجامُ الوحيد الصادق لآلة. فالفرّازُ الذي يُجيز ما لم يفحصه يُصدر ضمنًا أحكامًا على كلِّ ما لم ينظر إليه — فتوى ضمنيةٌ لكلِّ أصلٍ لم يُدرج. والامتناعُ عن القرار هو القرارُ، ويردُّ العبءَ إلى حيث يجب: إلى الإنسان الذي يزوّد الحكمَ، بمصدرٍ واسمٍ منسوب.",
          ],
        },
        {
          heading: "ما تستطيع الإعفاةُ فعلَه وما لا تستطيع",
          paragraphs: [
            "الاستثناءُ الموثَّق (keel assets exempt) يجوز أن يعفي معيارًا واحدًا اليوم: التاريخ. وليس هذا المجموعُ مصادفةَ إعداد. فالسيولة، والتسوية، وشكلُ الأداة الفورية لا يمكن إعفاؤها أبدًا، ولا يمكن إعفاء أيِّ معيارٍ شرعيٍّ أصلًا — لا شيء في الفرز يستشير إعفاءً فيها. فالأصلُ الجديد ذو التاريخ القصير قد يُقبل باستثناءٍ موثَّق؛ أمّا رمزُ القطاع المحرَّم فلا ورقةَ تُقيمه. وتوسيعُ مجموعة القابل للإعفاء قرارٌ مستقبليٌّ مقصود، لا وضعٌ افتراضي.",
          ],
        },
        {
          heading: "لماذا تمتنع الآلةُ عن القرار",
          paragraphs: [
            "لأنّ القرارات ليست لها. فهل رمزٌ لا نفعَ حقيقيًّا له، لا يعيش إلا على أملِ حامليه في البيع بأعلى، يبلغُ أن يكون مالًا — ملكيةً قابلة للتداول — أصلًا؟ هذا «بالضبط نوعُ الحكم الذي يتركه الفرزُ لإنسان». وسؤالُ DOGE مثالُه الحيّ: ميلُ المصدر نفسِه مسجَّل، ويبقى تفويضًا لا قرارًا.",
            "ولا تحكّم الآلةُ بين المذاهب. فحيث تتباين المصادر — يسجل قاعدةُ المعرفة أنّ عقودَ رائد الأجل نفسِها حَكمَت بتحريمها قضاءُ ولايةٍ وبإباحتها آخرُ (§66.6) — يسجّل كيل الجانبين وينفّذ أيَّ حكمٍ يزوّده المشغّل. فمُشغّلان يتبعان مذهبين مختلفين يحصلان على إجابتين مختلفتين من الشيفرة نفسها، وهذا مقصودٌ بالتصميم: الحكمُ يسكن توثيقَك لا الشيفرة.",
            "والآلةُ صادقةٌ عن مقرِّها هي نفسها. فكلُّ حكمٍ آنفًا يفترض أنّ العملات الرقمية مالٌ متاجرٌ به معترَفٌ به شرعًا — وقد امتنع أعلى مرجعٍ متاحٍ عن الحكم في ذلك: فقرارُ مجمع الفقه الإسلامي الدولي رقم 237 (§71.1) عقد ندوةً مخصّصة للعملات الإلكترونية، وناقش المسألةَ في دورته الرابعة والعشرين (نوفمبر 2019)، وسمّى هذا السؤالَ بعينِه موضعَ خلافٍ لم يُحسم، ولم يُصدر حكمًا. والامتناعُ عن الحكم ليس تحريمًا، وليس إباحةً أيضًا. وأن تكون أصولُ طراز BTC/ETH مالًا متاجرًا به موقفٌ اجتهاديٌّ مدعومٌ لدى كيل، يُمسَك على الفرع المتحفّظ الذي تدلّ عليه المصادر (§29.2) — لا حكمٌ محسومٌ تستطيع الآلةُ أن تستشهدَ به بوصفه واقعًا.",
          ],
        },
        {
          heading: "الفرزُ عمليًّا",
          paragraphs: [
            "تعِرض شاشةُ الفرز في قائمة الامتثال كلَّ منتجٍ في قائمة السماح مع حكم قبوله: أيُّ المحاور موثَّق، وأيُّ الفحوص المحسوبة ناجح، وما الذي ينقص بالضبط. وتسجيلُ تصنيفٍ أمرٌ واحد — keel assets attest --asset --sector --backing --pays-yield --source --attested-by — وآخرُ رايتين إلزاميّتان، لأنّ الدعوى بلا مصدر ليست دليلًا. فسجلُّ التدقيق يقيّد من قال ماذا، ونشرتُك تتبع حكمَك، والمستودعُ الأصلي يبقى محيَّدًا.",
          ],
        },
        {
          heading: "ما لا ينظر إليه الفرزُ أصلًا",
          paragraphs: [
            "القبولُ ليس الامتثالَ كلَّه، والفرزُ صادقٌ في بيان حدود سلطانه. فالدخلُ غير الموافق عليه تعالجه آليةٌ منفصلة قاصرة على التقرير: تُعزل أرصدةُ الفوائد والمكافآت من الأرباح المحققة وقاعدة حقوق الملكية، وتُبلَّغ بوصفها دَينًا للصدقة، ولا تُعترف ربحًا أبدًا، ويُحسب الزكاةُ على الثروة المنقّاة (§65.9، §33.1). والوكيلُ لا يتصرف في تلك الأموال — بل يُبلغ عنها.",
            "وبعضُ الالتزامات لا تراها آليةٌ مهما بلغت. فالمنصّة تدفع مكافآت USDC على الأرصدة الخاملة؛ وذلك الفائضُ ربا يتراكم بلا أمرٍ يوضع أصلًا — فلا سكةَ تُدركه. فتعطيلُ المكافآت على مستوى الحساب واجبُ المشغّل، مسرودٌ أولًا في كتاب تشغيل المشغّل. فالفرزُ يمنع دخولَ ما لم يُقبل؛ والتنقيةُ تُبلغ عمّا دخل رغمًا؛ وبقيةُ الحمل عليك — مكتوبةً كذلك، عن قصد.",
          ],
        },
      ],
      honestBox: {
        title: "الفرزُ ليس ربحية",
        paragraphs: [
          "ما يحكمُه الفرزُ هو القبولُ لا النتائج. فلا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ (taker) المدفوعة فعليًّا على منصّة Coinbase — نحو 1.2٪ لكلِّ طرفٍ من الصفقة. وقد قيست الآن كلُّ قاعدةِ إشارةٍ يُصدِّرها كيل عند إعداداتها المُصدَّرة على 24 أصلًا: صفرٌ من 120 تهيئةً اجتازت، وصفرٌ من 138 بعدِّ كلِّ مصفوفةٍ أُجريت. وليست الرسومُ كلَّ التكلفة أيضًا — فبتسعير كلِّ أصلٍ على قدر سيولته هو، لا على أرضيةٍ ثابتةٍ لا يبلغها أصل، تنخفض النتائج أكثر.",
          "فالأصلُ المفروز فرزًا تامًّا إذا تداولته قاعدةٌ خاسرة فقد خسرت. الامتثالُ والأداء محوران مختلفان: الأول يُنفّذه المحرّك، والثاني يُبلَّغ عنه بصدقٍ أولًا.",
        ],
        links: [
          { label: "سجلّ التجربة: النتيجة الصادقة", href: "/en/docs/experiment-honest-result-restated/" },
          { label: "منهجية الامتثال", href: "/ar/compliance/" },
          { label: "الأساس الفقهي", href: "/en/docs/fiqh-basis/" },
        ],
      },
      footnote:
        "كيل ليس محرّك فتاوى، وهذه المقالة ليست فتوى ولا نصيحةً مالية. فالحدُّ الفاصل له مقالُه الخاص «التوثيقُ ليس فتوى» — وللقبض دليلٌ خاصٌّ به: «القبضُ الحُكمي في العملات الفورية».",
      rev: "2026-08-21.1",
      translatedFromRev: "2026-08-21.1",
    },
  },
  {
    slug: "qabd-constructive-possession-spot-crypto",
    en: {
      title: "Qabd (constructive possession) in spot crypto, explained",
      description:
        "Qabd is possession in the fiqh sense — the ability to dispose, not physical custody. The §65.4 test in plain words, why withdrawal capability is enforced rather than assumed, and how keel's rail 17 encodes it.",
      lede:
        "Qabd (قَبْض) is possession in the fiqh sense — and the operative test, on which three sources converge, is that possession is the ability to dispose, not physical custody. In spot crypto there is no physical custody at all, so the test has exactly one practical proxy: can you withdraw the asset whenever you wish? keel encodes that question as rail 17 — enforced, not assumed.",
      sections: [
        {
          heading: "The definition",
          paragraphs: [
            "Classical fiqh does not equate possession with holding a thing in your hands. The test keel's fiqh basis records is tri-sourced — “possession is the ability to dispose, not physical custody (§65.4 Ayub · §67.1 OIC 53/4-6 · §71.5 AAOIFI SS 18 3/5 via SRB)”. The three sources are Muhammad Ayub's Understanding Islamic Finance, Al-Jarhi, Abuzaid & Oweida's Handbook of Islamic Finance (2022) quoting the OIC Fiqh Academy's Resolution 53 (4-6) — which holds electronic constructive possession sufficient — and AAOIFI's Shariah Standard No. 18, as extracted into the knowledge base. Three traditions, one operative wording.",
            "Possession, in other words, is a functional fact about your power over the asset, not a physical fact about its location. That is what makes the concept portable to assets that have no location — and it is why constructive possession (qabd hukmi) is the form of possession spot crypto can offer: real in effect, executed through control rather than touch.",
          ],
        },
        {
          heading: "§65.4 in plain words",
          paragraphs: [
            "Ayub's constructive-possession test, as quoted in keel's fiqh basis, holds that possession is completed when the vendor sets the asset aside and “there is nothing to prevent the buyer from taking physical possession from the vendor whenever he desires.” It reduces to a two-part test: (i) the buyer bears the risk and reward, and (ii) nothing prevents the buyer from taking delivery whenever he wishes.",
            "Read the two parts together and the practical question surfaces immediately. Part one is easy in crypto — a buyer at a spot venue bears price risk from the moment of fill. Part two is the whole game: is there anything standing between you and delivery? If the answer is “I don't know,” the test has not been met on the evidence available — and silence is not evidence of possession.",
          ],
        },
        {
          heading: "Why spot crypto forces the question",
          paragraphs: [
            "A cryptocurrency has no physical form to hand over, so possession in the fiqh sense is constructive or it is nothing. What you control on a venue is a balance withdrawable — or not — to a wallet you alone hold. The second part of §65.4's test therefore has exactly one observable proxy: withdrawal capability. An asset we cannot withdraw is an asset we may not validly possess — so acquiring more of it is the thing to stop.",
            "This is not an exotic corner case. Withdrawals have been suspended, frozen, and delayed on real venues in real years, and a balance that cannot leave the venue is, functionally, a claim on the venue for as long as the freeze lasts — not the dispose-at-will property the possession test asks for.",
          ],
        },
        {
          heading: "Rail 17: the test as code",
          paragraphs: [
            "Rail 17 is one of the two rails, among keel's twenty, that encode a fiqh ruling as an executable check — the other is rail 21, which refuses to sell what the account does not own. Its mechanics are deliberately blunt. The operator attests withdrawal capability per product with keel withdrawals attest. The attestation is live-read on every order intent — not cached from yesterday's session. It expires after seven days, because a stale attestation is no better than none: capability demonstrated last month says nothing about this morning. And when the attestation is missing or expired, acquisition fails closed — refusing to decide is the decision.",
            "And the rail enforces the attestation; it never produces it. Whether possession is valid in your school's reading is your attestation's question. The rail only refuses to let the engine keep buying what nobody has evidenced it can withdraw.",
          ],
        },
        {
          heading: "Entries only: what the rail refuses to do",
          paragraphs: [
            "Rail 17 is an ENTRIES-ONLY rail, like the drawdown and consecutive-loss breakers (rails 11 and 16): it gates what may be acquired, and it never forces a sale of what is already held. The reasoning is recorded with the rail: existing holdings are already ours, and forcing a sale to “fix” a withdrawal freeze would be strictly worse than holding through it — a frozen exit is precisely the wrong moment for a forced exit.",
            "The asymmetry is worth sitting with. A missing attestation stops new buying; it does not liquidate your balance, does not panic-sell into the freeze, and does not pretend the possession question is settled by a machine. The engine's power is deliberately one-directional: it can decline the next order. It cannot confiscate the last one.",
          ],
        },
        {
          heading: "What rail 17 does not claim",
          paragraphs: [
            "Attesting withdrawal capability is not a fatwa that possession has occurred. It is a scoped, dated, named piece of evidence — this product, on this venue, attestable by this operator, re-established weekly — which the engine then enforces. The OIC Fiqh Academy's Res. 53 (4-6) held electronic constructive possession sufficient; keel cites that resolution through its knowledge base, but keel is not the Academy, and citing a source is not wearing its authority.",
            "The deeper caveat is the premise. Every qabd ruling presupposes that the thing can be possessed — that crypto is Shariah-recognised tradable property, Māl. On that foundation question, IIFA Resolution 237 (§71.1) issued no ruling after debating it at its 24th session in November 2019. keel's premise that BTC/ETH-class assets are tradable property is an interpretive position held on the conservative branch (§29.2), published to be audited — not a settled ruling. An honest explainer says so; this one just did.",
          ],
        },
        {
          heading: "Anchored, never authored: how keel's own vocabulary handles qabd",
          paragraphs: [
            "The discipline extends to the smallest unit: the engine's glossary. Its entry for qabd is not a fresh definition but a verbatim line from the fiqh basis — “possession is the ability to dispose, not physical custody” — with a Source line naming the document and section it was quoted from. The glossary's own honesty rules require this: fiqh terms are anchored, never authored, and where the fiqh basis does not state a term (gharar is the recorded example), the entry says so outright rather than papering the gap with a paraphrase that sounds like a ruling.",
            "That is the same boundary as rail 17's, at vocabulary scale. A definition keel wrote itself would be a quiet claim to authority; a definition keel quotes, with its citation visible, is machinery you can check against its source. Small discipline, same shape.",
          ],
        },
        {
          heading: "The other rails, for contrast",
          paragraphs: [
            "Rail 17's uniqueness is easier to see against its neighbours. Of keel's twenty rails (numbered 1–14 and 16–21 — there is no rail 15), two encode a fiqh ruling: rail 17, and rail 21, which refuses a SELL for a base the venue reports the account does not hold — bay' ma la yamlik, the sale of what one does not own. Rail 17 remains the only rail that encodes qabd. Rails 1, 18, and 19 enforce what the screen and the charter admit: the allowlist itself, settlement confined to the operator's configured currencies, and the requirement that every product id be a well-formed spot pair. The rest are prudential — spend caps, drawdown breakers, exposure limits, and rail 20's veto on a venue credential nobody has attested for trading — risk and operational discipline carrying no religious claim.",
            "The fiqh content behind the spot-only charter is real enough: what makes speculation maisir, the basis records from §65.6, is non-ownership, non-delivery, or difference-settlement — not frequency, and not price speculation as such. But the rails that enforce spot-only are the agent's charter, justified by measurement and verified against the venue's actual listings — which is why their justification never has to overreach into doctrine.",
          ],
        },
      ],
      honestBox: {
        title: "Possession is not profitability",
        paragraphs: [
          "Rail 17 protects the validity of acquisition, not the outcome of trading. No shipped rule family is net positive at the taker fee actually paid on Coinbase — about 1.2% on each side of a trade; 0 of 120 configurations cleared across every signal rule keel ships, and 0 of 138 counting every matrix run. A fully qabd-compliant fill on a fully screened asset can still be a losing trade — the two axes are independent, and both are reported.",
          "That is not a caveat bolted onto the compliance story; it is the same honesty applied to numbers instead of rulings. The honest result is linked from the repository's first screen, and it asks for no one's endorsement — the rail and the report are two halves of one posture.",
        ],
        links: [
          { label: "The fiqh basis — rail 17", href: "/en/docs/fiqh-basis/" },
          { label: "The glossary — qabd", href: "/en/docs/glossary/" },
          { label: "The compliance model", href: "/en/compliance/" },
        ],
      },
      footnote:
        "keel is not a fatwa engine, and this guide is neither a fatwa nor financial advice. How screening admits assets at all is the subject of How Shariah crypto screening actually works — and the governance boundary is the subject of Attestation is not a fatwa.",
      rev: "2026-09-02.1",
    },
    ar: {
      title: "القبضُ الحُكمي في العملات الرقمية الفورية: شرح",
      description:
        "القبضُ في الفقه هو القدرةُ على التصرّف لا الحيازةُ المادية. اختبارُ §65.4 بلغةٍ مبسّطة، ولماذا تُنفَّذ قابليةُ السحب ولا تُفترض — وكيف تُشفّرها كيل في السكة 17.",
      lede:
        "القَبْض (qabd) هو الحيازةُ بالمعنى الفقهي — والاختبارُ العملي الذي تجتمع عليه مصادرُ ثلاثة هو أنّ القبضَ قدرةٌ على التصرّف، لا حيازةً مادية. وفي العملات الرقمية الفورية لا حيازةَ مادية على الإطلاق، فيبقى للاختبار مقياسٌ عمليٌّ واحد لا ثانيَ له: أتستطيع سحبَ الأصل متى شئت؟ هذا السؤالُ بعينِه تُشفّره كيل في السكة 17 — تنفيذًا للتوثيق، لا افتراضًا للجواب.",
      sections: [
        {
          heading: "التعريف",
          paragraphs: [
            "لا يُسوّي الفقهُ الكلاسيكي بين القبضِ والإمساكِ بالشيء يدًا. فالاختبارُ الذي يقيّده الأساسُ الفقهي لكيل ثلاثيُّ المصدر: «القبضُ هو القدرةُ على التصرّف، لا الحيازةُ المادية (§65.4 أيوب · §67.1 قرار مجمع الفقه 53/4-6 · §71.5 معيار أيوفي الشرعي رقم 18 (3/5))». والمصادرُ الثلاثة: كتابُ محمد أيوب «فهم التمويل الإسلامي»، و«دليل التمويل الإسلامي» للجارحي وأبو زيد وعويدة (2022) ناقلًا قرارَ مجمع الفقه الإسلامي الدولي رقم 53 (4-6) — الذي يرى القبضَ الإلكتروني الحُكمي كافيًا — ومعيارُ أيوفي الشرعي رقم 18، كما استُخرجت كلُّها في قاعدة المعرفة. ثلاثةُ طرازات من المرجعية، وصياغةٌ عمليةٌ واحدة.",
            "فالقبضُ، بهذا، واقعٌ وظيفيٌّ عن سلطتك على الأصل، لا واقعٌ ماديٌّ عن موقعه. وهذا ما يجعل المفهومَ قابلًا للانتقال إلى أصولٍ لا موقعَ لها — وهو سببُ كونِ القبضِ الحُكمي (constructive possession) صورةَ القبضِ الوحيدة التي تقدّمها العملاتُ الفورية: حقيقيٌّ في أثره، مُنفَّذٌ عبر السيطرة لا اللمس.",
          ],
        },
        {
          heading: "§65.4 بلغةٍ مبسّطة",
          paragraphs: [
            "اختبارُ أيوب للقبض الحُكمي، كما يُقتبس في الأساس الفقهي لكيل، يرى أنّ القبضَ يكتمل متى عزل البائعُ الأصلَ و«لم يبقَ ما يمنع المشتريَ من أخذ الحيازة المادية من البائع متى شاء». وينحصر في اختبارٍ ذي شقّين: (أ) أن يتحمّل المشتري الربحَ والخسارة، و(ب) ألّا يمنعه مانعٌ من تسلّم الأصل متى أراد.",
            "فإذا قُرئ الشقّان معًا طلع السؤالُ العمليُّ فورًا. فالشقُّ الأول يسيرٌ في العملات الرقمية: فمن يشتري من منصّةٍ فورية يتحمّل مخاطرةَ السعر منذ لحظة التنفيذ. أمّا الشقُّ الثاني فهو مربطُ الفرس: هل بينك وبين التسلّم مانعٌ؟ فإن كان الجواب «لا أدري» فلم يتحقق الاختبارُ على الدليل المتاح — والسكوتُ ليس دليلًا على القبض.",
          ],
        },
        {
          heading: "لماذا تفرض العملاتُ الفورية هذا السؤال",
          paragraphs: [
            "لا صورةَ مادية للعملة المشفّرة تُسلَّم يدًا بيد، فالقبضُ بالمعنى الفقهي إمّا حُكميٌّ وإمّا لا شيء. وما تملكه لدى المنصّة رصيدٌ قابلٌ للسحب إلى محفظةٍ تملكها وحدك — أو غير قابل. فلشقّ §65.4 الثاني مقياسٌ عمليٌّ واحد يمكن ملاحظته من الخارج: قابليةُ السحب. فالأصلُ الذي لا نستطيع سحبَه أصلٌ قد لا نكون قبضناه قبضًا صحيحًا — وحينئذٍ فاقتناءُ المزيد منه هو تحديدًا الفعلُ الذي ينبغي أن يتوقف، لا الموجودُ الذي صار من الملك بالفعل.",
            "وليس هذا نادرًا منزوعَ السياق. فقد أُوقفت عملياتُ السحب وجُمّدت وأُجّلت على منصّات حقيقية في سنوات حقيقية، والرصيدُ الذي لا يستطيع مغادرةَ المنصّة مطالبةٌ على المنصّة عمليًّا ما دام التجميدُ قائمًا — لا الملكُ القابل للتصرّف متى شئتَ الذي يسأل عنه اختبارُ القبض.",
          ],
        },
        {
          heading: "السكة 17: الاختبارُ شيفرةً",
          paragraphs: [
            "السكةُ 17 واحدةٌ من سكّتين اثنتين من سكك كيل العشرين تُشفّران حكمًا فقهيًّا فحصًا قابلًا للتنفيذ — والأخرى هي السكةُ 21 التي ترفض بيعَ ما لا يملكه الحساب. وميكانيكا الآلية صريحةٌ عمدًا: يوثّق المشغّل قابليةَ السحب لكلِّ منتجٍ عبر keel withdrawals attest. ويُقرأ التوثيقُ قراءةً حيّةً عند كلِّ نيّةِ أمر — لا من جلسة الأمس. وينقضي بعد سبعة أيام، لأنّ التوثيقَ المتقادم لا خيرَ فيه من عدمه: فقابليةٌ أُثبتت الشهرَ الماضي لا تقول شيئًا عن صباح اليوم. وإذا غاب التوثيقُ أو انقضى، رفض الاقتناءُ رفضًا عند الفشل — فالامتناعُ عن القرار هو القرار.",
            "والسكةُ تُنفّذ التوثيق ولا تُنتجه: فأهو قبضٌ صحيحٌ في قراءة مذهبك؟ سؤالُ توثيقك أنت. السكةُ ترفض فقط أن يواصل المحرّكُ شراءَ ما لم يُثبت أحدٌ القدرةَ على سحبه.",
          ],
        },
        {
          heading: "للدخول فقط: ما ترفض السكةُ فعله",
          paragraphs: [
            "السكةُ 17 من السكك التي تعمل «للدخول فقط»، كسكك قواطع التراجُع والخسارات المتتالية (11 و16): تبوّب ما يجوز اقتناؤه، ولا تُرغم أبدًا على بيعِ ما هو قائمٌ في الملك. والتعليلُ مسجَّلٌ مع السكة: فالموجودُ من الأصول لنا بالفعل، وإرغامُ بيعٍ لـ«إصلاح» تجميدِ سحبٍ شرٌّ صراحةً من الصبر عليه — فتجميدُ المخارج أسوأُ لحظةٍ لإجبارِ خروج.",
            "وهذا اللاتوازنُ جديرٌ بالتأمّل. فغيابُ التوثيق يوقف الشراءَ الجديد؛ لكنه لا يُصفّي رصيدك، ولا يبيعُ بيعَ ذعرٍ داخل التجميد، ولا يتظاهر بأنّ مسألةَ القبض مسألةٌ تحسمها آلة. فسلطةُ المحرّك أحاديةُ الاتجاه عمدًا: يستطيع أن يرفض الأمرَ التالي، ولا يستطيع أن يصادر الأمرَ الأخير. وهذا كلُّ ما تحتاجه حمايةُ صحة الاقتناء من جهةٍ لا تملك الحكم.",
          ],
        },
        {
          heading: "ما لا تدّعيه السكة 17",
          paragraphs: [
            "توثيقُ قابلية السحب ليس فتوى بأنّ القبضَ قد وقع. بل دليلٌ محدودُ النطاق، مؤرَّخ، منسوبٌ إلى اسم: هذا المنتج، على هذه المنصّة، بمقدرة هذا المشغّل، يُعاد إثباتُه أسبوعيًّا — ثم يُنفّذه المحرّك. وقد رأى مجمعُ الفقه الإسلامي الدولي في قراره 53 (4-6) أنّ القبضَ الإلكتروني الحُكمي كافٍ؛ تستشهد كيل بالقرار عبر قاعدة معرفتها، لكن كيل ليست المجمع، والاستشهادُ بمصدرٍ ليس لبسَ سلطانه.",
            "والتحفّظُ الأعمق هو المقرّ ذاته. فكلُّ حكمٍ في القبض يفترض أنّ الشيء قابلٌ للقبض أصلًا — أي أنّ العملات الرقمية مالٌ متاجرٌ به معترَفٌ به شرعًا. وفي هذا السؤال التأسيسي لم يُصدر قرارُ مجمع الفقه الإسلامي الدولي رقم 237 (§71.1) حكمًا بعد مناقشته في دورته الرابعة والعشرين (نوفمبر 2019). وأن تكون أصولُ طراز BTC/ETH مالًا متاجرًا به موقفٌ اجتهاديٌّ تُمسكه كيل على الفرع المتحفّظ (§29.2)، نُشر ليُدقَّق — لا حكمٌ محسوم. والشرحُ الصادق يصرّح بذلك — وقد فعل.",
          ],
        },
        {
          heading: "مُرساةٌ لا مؤلَّفة: كيف يعالج معجمُ كيل لفظَ القبض",
          paragraphs: [
            "يمتدُّ الانضباطُ إلى أصغرِ وحدة: معجمُ المحرّك نفسِه. فمدخلُه للقبض ليس تعريفًا جديدًا بل سطرٌ حرفيٌّ من الأساس الفقهي — «القبضُ هو القدرةُ على التصرّف، لا الحيازةُ المادية» — ومعه سطرُ مصدرٍ يسمّي المستندَ والقسمَ الذي اقتبس منه. وقواعدُ صدق المعجم ذاتُه توجب ذلك: فالمصطلحاتُ الفقهية مُرساةٌ لا مؤلَّفة، وحيث لا ينصُّ الأساسُ الفقهي على مصطلحٍ (والغررُ مثالُه المسجَّل) يقول المدخلُ ذلك صراحةً بدل سدِّ الفراغ بصياغةٍ توهم حكمًا.",
            "وهذا هو حدُّ السكة 17 نفسُه في مقاس المفردات. فالتعريفُ الذي تؤلّفه كيل بنفسها دعوى سلطةٍ خفيضة؛ والتعريفُ الذي تنقله مع إظهار إسناده آليةٌ تستطيع مطابقتها مع مصدرها. انضباطٌ صغير، بالشكل نفسه.",
          ],
        },
        {
          heading: "بقيةُ السكك، للمقارنة",
          paragraphs: [
            "تتّضح فرادةُ السكة 17 بجوار جيرانها. فمن سكك كيل العشرين (المرقَّمة من 1 إلى 14 ومن 16 إلى 21، ولا وجودَ لسكة 15) لا تُشفّر الفقهَ إلا سكّتان: السكةُ 17، والسكةُ 21 التي ترفض بيعَ أصلٍ تُفيد المنصّةُ أنّ الحساب لا يملكه — وهو بيعُ ما لا تملك. وتبقى السكةُ 17 وحدَها ما يُشفّر القبض. أما السكك 1 و18 و19 فتُنفّذ ما يُدخله الفرزُ والميثاق: قائمةَ السماح ذاتها، وحصرَ التسوية في العملات التي ضبطها المشغّل، واشتراطَ أن يكون معرّفُ كلِّ منتجٍ زوجًا فوريًّا سليمَ البنية. وبقيّتُها احترازية — سقوفُ إنفاق، وقواطعُ تراجُع، وحدودُ تعرُّض، ورفضُ السكة 20 لاعتماد منصّةٍ لم يوثّق أحدٌ صلاحيتَه للتداول — انضباطُ مخاطر وتشغيل لا يحمل دعوى دينية.",
            "والمضمونُ الفقهي وراء ميثاق «الفوري فقط» حقيقي: فما يجعل المراهنةَ ميسرًا، كما يقيّد الأساسُ عن §65.6، هو عدمُ الملكية أو عدمُ التسليم أو التسويةُ على الفروق — لا التكرار، ولا المراهنةَ على تغيّر الأسعار ذاتها. لكنّ السكك التي تُنفّذ الاقتصار على الفوري هي ميثاقُ الوكيل، مسوَّغٌ بالقياس ومُتحقَّقٌ منه فعليًّا مقابل إدراجات المنصّة الحقيقية — ولذلك لا يحتاج تسويغُها إلى تجاوزٍ في الدين أصلًا.",
          ],
        },
      ],
      honestBox: {
        title: "القبضُ ليس ربحية",
        paragraphs: [
          "تحمي السكةُ 17 صحةَ الاقتناء، لا مآلَ التداول. فلا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ المدفوعة فعليًّا على منصّة Coinbase — نحو 1.2٪ لكلِّ طرفٍ من الصفقة؛ صفرٌ من 120 تهيئةً اجتازت عبر كلِّ قاعدةِ إشارةٍ يُصدِّرها كيل، وصفرٌ من 138 بعدِّ كلِّ مصفوفةٍ أُجريت. فتنفيذٌ مستوفٍ للقبض على أصلٍ مفروزٍ فرزًا تامًّا قد يظلُّ صفقةً خاسرة — المحوران مستقلّان، وكلاهما يُبلَّغ عنه.",
          "وهذا ليس تنبيهًا لُصق بقصة الامتثال من خارجها؛ بل هو الصدقُ نفسُه مطبَّقًا على الأرقام بدل الأحكام. فالنتيجةُ الصادقة موصولةٌ من أول شاشةٍ في المستودع، ولا تطلب من أحدٍ أن يوافق عليها — السكةُ والتقرير شطران لوضعٍ واحد.",
        ],
        links: [
          { label: "الأساس الفقهي — السكة 17", href: "/en/docs/fiqh-basis/" },
          { label: "المعجم — القبض", href: "/en/docs/glossary/" },
          { label: "منهجية الامتثال", href: "/ar/compliance/" },
        ],
      },
      footnote:
        "كيل ليس محرّك فتاوى، وهذه المقالة ليست فتوى ولا نصيحةً مالية. أمّا كيف يُدخل الفرزُ الأصولَ أصلًا فموضوعُ «كيف يعمل الفرزُ الشرعي للعملات الرقمية فعلًا» — وحدُّ الحوكمة موضوعُ «التوثيقُ ليس فتوى».",
      rev: "2026-09-02.1",
      translatedFromRev: "2026-09-02.1",
    },
  },
  {
    slug: "attestation-is-not-a-fatwa",
    en: {
      title: "Attestation is not a fatwa",
      description:
        "An attestation is a recorded, sourced, named classification a human supplies and a machine enforces; a fatwa is a qualified scholar's ruling. keel deals only in the first — the governance boundary, explained.",
      lede:
        "An attestation is a recorded, sourced, named classification of an asset — scoped to one venue and one product — that a human supplies and a machine enforces. A fatwa is a formal ruling issued by a qualified scholar. keel deals only in the first of these, and says so in the opening lines of its fiqh basis: “keel is not a fatwa engine. It is an enforcement engine for a ruling you supply.”",
      sections: [
        {
          heading: "What an attestation is, precisely",
          paragraphs: [
            "keel's glossary states the model in one line: market facts are computed, Shariah classifications are attested, never inferred. Whether a token's core purpose is a haram sector, whether it is asset-backed 'ayn or a claim dayn, whether it pays a riba-like yield, what kind of contract the listing is — these are questions of fact-plus-scholarship about the world, and a human records each answer, with a source and a name, via keel assets attest.",
            "The command's shape carries the governance: keel assets attest --asset --sector --backing --pays-yield --source --attested-by. The last two flags are required, because an unsourced claim is not evidence. The record is scoped — this product, on this venue — and the same model runs through the rails: the venue subscription (rail 14) and withdrawal capability (rail 17, expiring after seven days) are operator attestations the engine enforces, never judgements the engine makes.",
          ],
        },
        {
          heading: "What a fatwa is",
          paragraphs: [
            "A fatwa, by contrast, is a formal, reasoned ruling issued by a qualified scholar — a mufti — in answer to a question put to them. It carries the issuer's scholarly authority and accountability; councils and academies issue them at scale; and rulings can legitimately differ across schools and jurisdictions without any of them ceasing to be fatwas.",
            "keel's fiqh basis is explicit about which side of this line it stands on. Its second paragraph: “What this document is not: a fatwa, or a claim that keel can produce one.” An attestation carries a recorder's name — that is accountability of authorship, not authority of scholarship. Confusing the two is not a small wording slip; it is the exact misunderstanding the boundary exists to prevent.",
          ],
        },
        {
          heading: "The boundary: where the ruling lives",
          paragraphs: [
            "The ruling lives in the attestation, never in the code. Two operators following different schools supply different attestations and get different answers from the same code — by design, as the repository's governance notes put it: rulings versus machinery. The engine is the machinery; you are the rulings.",
            "This is why keel does not adjudicate. Where sources diverge — the knowledge base records identical retail FX ruled haram by one jurisdiction and halal by another (§66.6) — the disagreement is named, with both sides, never flattened into “scholars say.” Where a school question touches your trading, the answer you record is the one enforced, and the audit trail records exactly who said what.",
          ],
        },
        {
          heading: "The scholarly review that has not happened",
          paragraphs: [
            "The fiqh basis states its own review status plainly: no scholarly review of keel's fiqh basis has occurred — not by a named scholar, not by a council, not by anyone. The basis is one operator's reading of the cited sources — Ayub, the OIC/AAOIFI/IIFA materials, Mufti Faraz Adam's papers — extracted into a public knowledge base and mapped into code, published precisely so the reading can be audited and challenged. Until a review happens, the status is “not reviewed,” and the document says so in those words.",
            "The status has a ratchet: it can move one way only — from not-reviewed to reviewed-with-a-named-scope, never to an approval with no scope attached. A review, should one ever happen, would be recorded as a dated addendum naming the reviewer, the scope, the findings, and what changed — versioned in git like everything else.",
          ],
        },
        {
          heading: "What a review would — and would not — cover",
          paragraphs: [
            "A review would be a review of the mapping from sources to code: whether each screen and rail axis faithfully reflects the section it cites (§28.4 for sector and the riba axis, §65.5/§67.2 for backing, §71.4a for the instrument shape, §65.4 for rail 17's qabd test), and whether the knowledge-base extractions are faithful to the texts they were taken from.",
            "Just as important is what a reviewer would not be endorsing: not the trading strategy or its performance — the honest measured result is linked from the README's first screen and “is nothing anyone is asked to endorse”; not the prudential rails, which are risk discipline carrying no religious claim; not a ruling that crypto is tradable property, since the §71.1 non-ruling stands; not any operator's attestations, which carry their own sources and names; and not an endorsement of trading anything at all.",
          ],
        },
        {
          heading: "Why the boundary is the product",
          paragraphs: [
            "Closed screening tools ask you to trust their verdicts; keel publishes the machinery and the rulings it enforces, with their sources. That is not modesty branding — it is the mechanism. A ruling you can trace is a ruling you can check, challenge, and replace; a verdict you cannot trace is a bill you keep paying.",
            "The boundary holds upstream too. Changing a classification for everyone is a PR of a different kind: the repository's contribution rules require a cited source and discussion before merge — a classification with no source behind it is not mergeable, however confident the author. Governance, not vibes, is what keeps an open compliance engine from becoming a rumor engine.",
          ],
        },
        {
          heading: "What the boundary buys you",
          paragraphs: [
            "Traceability, first. Every classification your deployment enforces resolves to a named record with a source — so when you ask “why did the engine refuse this asset?”, the answer is an audit-trail entry, not a shrug. The same holds in reverse: when your reading changes, you re-attest, and the engine's behaviour changes with your record — the causal arrow always points from your ruling to the machine's action, never the other way.",
            "Neutrality, second. Because the project never issues rulings, keel the software can never become the de-facto mufti of record for your deployment — each operator remains responsible for their own attestations, and the honest weight of that responsibility is part of the design, not a disclaimer bolted on after the fact.",
          ],
        },
        {
          heading: "What the boundary is not",
          paragraphs: [
            "The boundary is not soft enforcement. Everything attested is enforced deterministically: every order intent passes through twenty un-overridable rails, and an asset without an attestation never trades — the machine's neutrality about rulings coexists with total firmness in executing them. Refusing to be the mufti does not make keel a lighter enforcement engine; it makes the enforcement attributable.",
            "Nor is the boundary a hedge bolted on for liability. It is the mechanism that lets the engine be audited at all: because every enforced ruling resolves to a record with a source and a name, disagreement has a place to land — your own database — instead of a black box you can only take or leave. keel's own one-line pitch for reviewers says it plainly: classifications are attested, never inferred, and enforced deterministically. The first two clauses are the boundary; the third is the product.",
          ],
        },
        {
          heading: "How to disagree, honestly",
          paragraphs: [
            "The architecture already provides the route. Attest your own classification — keel assets attest with your --source and --attested-by writes to your database, your deployment follows your ruling, upstream stays neutral, and the audit trail records exactly who said what. Document exceptions where the screen allows them: only the history criterion can be waived today, never a Shariah one. And to change a classification for everyone, bring the source; that is the whole price of admission.",
          ],
        },
      ],
      honestBox: {
        title: "The boundary extends to results",
        paragraphs: [
          "A review would not endorse performance — and nothing on this site asks you to, either. No shipped rule family is net positive at the taker fee actually paid on Coinbase: about 1.2% on each side of a trade, and 0 of 120 configurations cleared across every signal rule keel ships. This site used to add that the rules touch break-even inside the venue's fee-free allowance; that claim was priced at a slippage floor no asset reaches, and it has been withdrawn. Enforcement and honesty are separate products; keel ships both.",
          "The refusal runs in both directions: the engine will not issue your rulings, and it does not ask you to endorse its numbers. One posture, two directions — enforcement of what you attest, honesty about what it measures.",
        ],
        links: [
          { label: "The fiqh basis — review status", href: "/en/docs/fiqh-basis/" },
          { label: "The honest result, restated", href: "/en/docs/experiment-honest-result-restated/" },
          { label: "The compliance model", href: "/en/compliance/" },
        ],
      },
      footnote:
        "keel is not a fatwa engine, and this guide is neither a fatwa nor financial advice. How assets are admitted at all is the subject of How Shariah crypto screening actually works — and possession, of Qabd (constructive possession) in spot crypto.",
      rev: "2026-09-02.1",
    },
    ar: {
      title: "التوثيقُ ليس فتوى",
      description:
        "التوثيقُ تصنيفٌ مسجَّل موثَّقُ المصدر منسوبٌ إلى اسمٍ يزوّده إنسانٌ وتُنفّذه آلة؛ والفتوى حكمُ عالِمٍ مؤهَّل. كيل لا تتعامل إلا بالأول — وهذا حدُّ الحوكمة، مشروحًا.",
      lede:
        "التوثيقُ تصنيفٌ مسجَّلٌ موثَّقُ المصدر منسوبٌ إلى اسم، عن أصلٍ بعينه — محدودُ النطاق بمنصّةٍ واحدة ومنتجٍ واحد — يزوّده إنسانٌ وتُنفّذه آلة. أمّا الفتوى فحكمٌ رسميٌّ مؤصَّل يصدر عن عالِمٍ مؤهَّل. وكيل لا تتعامل إلا بالأول، وتقولها في السطور الأولى من أساسها الفقهي: «كيل ليست محرّك فتاوى؛ بل محرّكُ إنفاذٍ لحكمٍ شرعيٍّ أنت من يزوّده به».",
      sections: [
        {
          heading: "ما التوثيقُ تحديدًا",
          paragraphs: [
            "يقرر معجمُ كيل النموذجَ في سطرٍ واحد: فوقائعُ السوق تُحسَب، أمّا التصنيفاتُ الشرعية فيوثّقها إنسانٌ ولا تُستنبَط أبدًا. فهل غرضُ الرمز الأساسي قطاعٌ محرَّم، وهل هو عينٌ ('ayn) مسندةٌ إلى أصل أم دَينٌ (dayn) بمطالبة، وهل يوزّع عائدًا شبيهًا بالربا، وأيُّ عقدٍ يمثّله الإدراج — أسئلةٌ تجمع بين الواقع والاجتهاد، يسجّل إنسانٌ كلَّ جوابٍ منها بمصدرٍ واسمٍ عبر keel assets attest.",
            "وبنيةُ الأمر تحمل الحوكمةَ في ذاتها: keel assets attest --asset --sector --backing --pays-yield --source --attested-by. فآخرُ رايتين إلزاميّتان، لأنّ الدعوى بلا مصدر ليست دليلًا. والسجلُّ محدودُ النطاق: هذا المنتج، على هذه المنصّة. والنموذجُ نفسُه يسري في السكك: فتوثيقُ الاشتراك في المنصّة (السكة 14) وقابليةِ السحب (السكة 17، تنقضي بعد سبعة أيام) توثيقانِ من المشغّل يُنفّذهما المحرّك — لا حكمانِ تصدرهما الآلة.",
          ],
        },
        {
          heading: "ما الفتوى",
          paragraphs: [
            "أمّا الفتوى فحكمٌ شرعيٌّ مؤصَّل يصدر عن عالِمٍ مؤهَّل — مفتٍ — جوابًا عن سؤالٍ مُوجَّه إليه. تحمل سلطانَ مُصدِرها العلميَّ ومسؤوليّته؛ وتصدرها المجامعُ والمحافل على نطاقٍ واسع؛ وقد تختلف الأحكامُ بين المذاهب والولايات اختلافًا مشروعًا دون أن تخرج أيُّها عن كونها فتوى.",
            "والأساسُ الفقهي لكيل صريحٌ في أيِّ جانبٍ من الخطّ يقف. فالفقرةُ الثانية منه: «ما ليسَه هذا المستند: فتوى، ولا دعوى أنّ كيل تستطيع إنتاجها». فالتوثيقُ يحمل اسمَ مُسجِّله — تلك مسؤوليةُ التوثيق لا سلطانُ العلم. والخلطُ بينهما ليس زلّةَ صياغةٍ صغيرة؛ بل هو سوءُ الفهم بعينِه الذي وُجد الحدُّ لمنعه.",
          ],
        },
        {
          heading: "الحدُّ الفاصل: أين يسكن الحكم",
          paragraphs: [
            "الحكمُ يسكن التوثيقَ، لا الشيفرة قط. فمُشغّلان يتبعان مذهبين مختلفين يزوّدان توثيقين مختلفين فيحصلان على إجابتين مختلفتين من الشيفرة نفسها — مقصودًا بالتصميم، كما تسمّيه حوكمةُ المستودع: أحكامٌ مقابل آليات. فالمحرّكُ آليات؛ وأنت الأحكام.",
            "ولهذا لا تحكّم كيل بين المذاهب. فحيث تتباين المصادر — يسجل قاعدةُ المعرفة أنّ عقودَ الفوركس للأفراد نفسِها حُكم بتحريمها في ولايةٍ وبإباحتها في أخرى (§66.6) — يُسمّى الخلافُ بجانبيه، ولا يُسوّى قطُّ بعبارةِ «العلماء يقولون». وحين يمسُّ خلافُ المذاهب تداولَك، فالجوابُ الذي تسجّله هو الذي يُنفَّذ، وسجلُّ التدقيق يقيّد من قال ماذا بالضبط.",
          ],
        },
        {
          heading: "المراجعةُ العلمية التي لم تَقَع",
          paragraphs: [
            "يصرّح الأساسُ الفقهي بحالةِ مراجعته بلا مواربة: لم تَجرِ أيُّ مراجعةٍ علميةٍ شرعيةٍ للأساس الفقهي لكيل — لا من عالِمٍ بالاسم، ولا من مجمع، ولا من أحد. فالأساسُ قراءةُ مُشغّلٍ واحدٍ للمصادر المُثبتة — أيوب، وموادُّ مجمعي الفقه والمعايير الشرعية ومجمع الفقه الدولي، وأوراقُ المفتي فراز آدم — استُخرجت في قاعدة معرفةٍ عامة ورُسمت في الشيفرة، ونُشرت تحديدًا لتُدقَّق القراءةُ ويُعترَض عليها. فما لم تَقَع المراجعةُ فالحالة «غير مُراجَع»، والمستندُ يقولها بهذه الكلمات.",
            "وللحالة سقّاطةٌ ذات اتجاه: لا تتحرك إلا وجهًا واحد — من «غير مُراجَع» إلى «مُراجَع بنطاقٍ مسمّى»، ولا رجعة إلى «موافقةٍ بلا نطاق». فالمراجعةُ، إن قَدَر لها وقوعٌ يومًا، تُقيَّد ملحقًا مؤرَّخًا يسمّي المراجِعَ والنطاقَ والنتائجَ وما تغيّر — مُدارًا في git ككلِّ شيء.",
          ],
        },
        {
          heading: "ما ستغطّيه المراجعةُ وما لن تغطّه",
          paragraphs: [
            "المراجعةُ مراجعةٌ لرسم الخريطة من المصادر إلى الشيفرة: هل يُخلص كلُّ محورٍ من محاور الفرز والسكك للقسم الذي يستشهد به (§28.4 للقطاع ومحور الربا، §65.5/§67.2 للسند، §71.4a لشكل الأداة، §65.4 لاختبار القبض في السكة 17)؟ وهل وفقت مستخرجاتُ قاعدة المعرفة للنصوص التي أُخذت منها؟",
            "ولا يقلُّ أهميةً ما لن يوافق عليه المراجِع: لا استراتيجيةَ التداول ولا أداؤها — فالنتيجةُ الصادرة بالقياس موصولةٌ من أول شاشةٍ في المستودع «وليست شيئًا يُطلَب من أحدٍ أن يوافق عليه»؛ ولا السككُ الاحترازية، فهي انضباطُ مخاطر لا يحمل دعوى دينية؛ ولا حكمٌ بأنّ العملات الرقمية مالٌ متاجرٌ به، فامتناعُ §71.1 باقٍ؛ ولا توثيقاتُ أيِّ مشغّل، فلكلٍّ منها مصادرُه وأسماؤه؛ ولا تأييدُ تداول أيِّ شيءٍ أصلًا.",
          ],
        },
        {
          heading: "لماذا كان الحدُّ هو المنتج",
          paragraphs: [
            "أدواتُ الفرز المغلقة تطلب منك التصديقَ بأحكامها؛ أمّا كيل فتنشر الآليات والأحكامَ التي تُنفّذها، بمصادرها. وهذه ليست مسوّقةُ تواضع — بل هي الآلية نفسها. فالحكمُ الذي تستطيع تتبّعَه حكمٌ تستطيع فحصه واعتراضَه واستبدالَه؛ والحكمُ الذي لا سبيل إلى تتبّعه فاتورةٌ تُسدَّد أبدًا.",
            "والحدُّ صامدٌ في الأعلى أيضًا. فتغييرُ تصنيفٍ للجميع طلبُ دمجٍ من نوعٍ آخر: قواعدُ الإسهام في المستودع تشترط مصدرًا مُثبتًا ونقاشًا قبل الدمج — فالتصنيفُ الذي لا مصدرَ وراءه غيرُ قابلٍ للدمج، مهما بلغ ثقةُ صاحبه. الحوكمةُ — لا الانطباعات — هي ما يمنع محرّكَ امتثالٍ مفتوحًا من أن يصير محرّكَ شائعات.",
          ],
        },
        {
          heading: "ما يشتريه لك الحدُّ",
          paragraphs: [
            "القابليةُ للتتبّع أولًا. فكلُّ تصنيفٍ تُنفّذه نشرتُك يرجع إلى سجلٍّ مسمّى ذي مصدر — فحين تسأل «لماذا رفض المحرّك هذا الأصل؟» فالجوابُ قيدٌ في سجلّ التدقيق، لا التفاتٌ بالإبهام. ويجري الأمرُ نفسُه في الاتجاه المعاكس: فحين تتغيّر قراءتُك تُعيد التوثيق، ويتغيّر سلوكُ المحرّك مع سجلّك — فالسهمُ السببيّ يشير دائمًا من حكمِك إلى فعلِ الآلة، لا العكس أبدًا.",
            "والحيادُ ثانيًا. فما دام المشروعُ لا يُصدر أحكامًا، فلن تصير برمجيةُ كيل مفتيَ نشرتك بالأمر الواقع — فكلُّ مشغّلٍ يبقى مسؤولًا عن توثيقاته الخاصة، وثقلُ هذه المسؤولية محمولٌ بأمانةٍ جزءًا من التصميم، لا إخلاءُ طرفٍ يُلصق بعد كل شيء. ومن أراد مفتيًا فليطلبه حيث يُطلب أمثالُه؛ أمّا الآلة فمهمّتُها أن تُنفّذ ما استُؤمنت عليه بأمانةٍ لا أن تستقلّ بالفتوى.",
          ],
        },
        {
          heading: "ما ليس هو الحدُّ",
          paragraphs: [
            "الحدُّ ليس تراخيًا في الإنفاذ. فكلُّ ما يُوثَّق يُنفَّذ تنفيذًا حتميًّا: تمرُّ كلُّ نيّةِ أمرٍ عبر عشرين سكةً لا تُتجاوز، والأصلُ الذي لا توثيقَ له لا يتداول أبدًا — فحيادُ الآلة في الأحكام يقترن بصرامتها التامة في تنفيذها. وامتناعُها عن أن تكون مفتيًا لا يجعلها محرّكَ إنفاذٍ أخفّ؛ بل يجعل الإنفاذَ منسوبًا إلى مصدره.",
            "وليس الحدُّ تحفّظًا لُصق لغرض المسؤولية القانونية. هو الآليةُ التي تجعل المحرّك قابلًا للتدقيق أصلًا: فما دام كلُّ حكمٍ منفَّذ يرجع إلى سجلٍّ ذي مصدرٍ واسم، فلكلامُ المعترض موضعٌ يهبط فيه — قاعدةُ بياناتك أنت — بدل صندوقٍ مغلقٍ لا خيار لك فيه إلا القبول أو الترك. وعبارةُ كيل الموجزة التي تعِدُّها لمراجعيها المحتملين تقولها بوضوح: تصنيفاتٌ موثَّقة لا مستنبَطة، ومنفَّذةٌ تنفيذًا حتميًّا. فالشقّان الأولان هما الحدُّ، والثالث هو المنتج — ولا ثالثَ غيره يُوعد به أحد.",
          ],
        },
        {
          heading: "كيف تعترض اعتراضًا أمينًا",
          paragraphs: [
            "الطريقُ مما تهيّئه البنية أصلًا. وثّق تصنيفَك بنفسك — فأمرُ keel assets attest بمصدرِك --source واسمِك --attested-by يكتب في قاعدة بياناتك، وتتبع نشرتُك حكمَك، ويبقى المستودعُ الأصلي محيَّدًا، ويقيّد سجلُّ التدقيق من قال ماذا بالضبط. ووثّق الاستثناءات حيث يسمحها الفرز: لا يُعفى اليوم إلا معيارُ التاريخ، ومعيارٌ شرعيٌّ فلا. ولتغيير تصنيفٍ للجميع، أحضِر المصدر — فهو ثمنُ القبول كله.",
          ],
        },
      ],
      honestBox: {
        title: "الحدُّ يمتدُّ إلى النتائج",
        paragraphs: [
          "لن توافقَ المراجعةُ على الأداء — ولا شيءٌ في هذا الموقع يطلب منك ذلك أصلًا. فلا تحقّق أيُّ عائلةٍ من القواعد المُصدَّرة ربحًا صافيًا عند رسوم الآخذ المدفوعة فعليًّا على منصّة Coinbase: نحو 1.2٪ لكلِّ طرفٍ من الصفقة، وصفرٌ من 120 تهيئةً اجتازت عبر كلِّ قاعدةِ إشارةٍ يُصدِّرها كيل. وكان هذا الموقع يضيف أنّ القواعد تلامس نقطة التعادل داخل الحصّة المعفاة من الرسوم؛ وتلك الدعوى كانت مُسعَّرةً عند أرضيةِ انزلاقٍ لا يبلغها أيُّ أصل، وقد سُحبت. الإنفاذُ والصدق منتجان منفصلان — وكيل تشحنهما معًا.",
          "والامتناعُ يجري في الاتجاهين معًا: فالمحرّك لا يُصدر أحكامَك، ولا يطلب منك أن توافق على أرقامه. وضعٌ واحدٌ باتجاهين اثنين — إنفاذٌ أمينٌ لما توثّقه، وصدقٌ كاملٌ فيما يقيسه.",
        ],
        links: [
          { label: "الأساس الفقهي — حالة المراجعة", href: "/en/docs/fiqh-basis/" },
          { label: "سجلّ التجربة: النتيجة الصادقة", href: "/en/docs/experiment-honest-result-restated/" },
          { label: "منهجية الامتثال", href: "/ar/compliance/" },
        ],
      },
      footnote:
        "كيل ليس محرّك فتاوى، وهذه المقالة ليست فتوى ولا نصيحةً مالية. أمّا كيف تُدخل الأصولُ أصلًا فموضوعُ «كيف يعمل الفرزُ الشرعي للعملات الرقمية فعلًا» — والقبضُ موضوعُ «القبضُ الحُكمي في العملات الرقمية الفورية».",
      rev: "2026-09-02.1",
      translatedFromRev: "2026-09-02.1",
    },
  },
];
