import type { LocalizedPage } from "../config";

/**
 * Install (FR-2/FR-6): nodejs.org-style download cards. Version, asset links,
 * and the versioned pip command come from data/release.json (fetched at build
 * from the GitHub Releases REST endpoint). Buttons link directly to GitHub —
 * if the engine ever ships platform bundles (mac/win installers), the button
 * targets them automatically; today it targets the release page and each card
 * carries the per-OS install commands. Binaries are never mirrored.
 *
 * The source-bootstrap path (git clone + uv) stays as the second section, and
 * the first Get Started guide picks up where this page leaves off.
 */
export interface PlatformCardCopy {
  name: string;
  button: string;
  shell: string;
  codeComment: string;
}

/**
 * The unsigned-build note. Shown only when a release actually carries a platform bundle
 * (see InstallPage.astro) — until then there is nothing for an OS to warn about.
 *
 * Apple notarisation needs a Developer ID certificate at $99/yr; keel cannot currently afford
 * it, and there is no cheaper tier, no free open-source tier, and no self-signed substitute
 * (macOS trusts only Apple-issued certificates). The page says so in those terms: a visitor told
 * a build is unsigned with no reason assumes carelessness, and this is simply what is true.
 *
 * It also refuses to end on "click Open Anyway". keel is a program a visitor may give exchange
 * API keys to, so the verification step is part of the note, not a footnote to it.
 */
export interface UnsignedNoteCopy {
  title: string;
  lead: string;
  reason: string;
  macosTitle: string;
  macosSteps: string[];
  windowsTitle: string;
  windowsSteps: string[];
  verifyTitle: string;
  verifyLead: string;
  verifyFail: string;
  notMeaningTitle: string;
  notMeaning: string[];
  avoidTitle: string;
  avoidBody: string;
  avoidLink: string;
  more: string;
}

/**
 * The terminal-installer block (#86). keel's scripts/install.sh builds the whole
 * deployment from the latest release's wheels into ~/.keel/.venv, so it belongs
 * ABOVE the wheels-by-hand ceremony: it is the shorter road for anyone who
 * already has a terminal.
 *
 * Two honesty constraints shape this copy and must survive any edit:
 *
 *  1. The script lives on `main` and has never been part of a tagged release.
 *     `branchNote` says so. It must never be described as having shipped in a
 *     version.
 *  2. The script prints each wheel's sha256 as computed LOCALLY. No wheel
 *     checksums are published anywhere, so there is nothing to compare against
 *     and the word “verified” would be false. The script says as much itself.
 *
 * `auditLead` / the audit-first commands are not optional politeness: this site's
 * readers are being asked to hand a program exchange API keys, so `curl … | bash`
 * must never be the only route offered.
 */
export interface TerminalInstallCopy {
  title: string;
  lead: string;
  terms: string;
  requires: string;
  pipeTitle: string;
  auditTitle: string;
  auditLead: string;
  /** Goes inside a code block — straight quotes, and it must stay true of the script. */
  auditComment: string;
  branchNote: string;
  doesTitle: string;
  does: string[];
  updateTitle: string;
  updateBody: string;
}

export interface InstallContent {
  rev: string;
  title: string;
  description: string;
  downloadTitle: string;
  versionPrefix: string;
  requirements: string;
  otherPlatforms: string;
  historyLink: string;
  cards: PlatformCardCopy[];
  thenTitle: string;
  allFilesTitle: string;
  terminal: TerminalInstallCopy;
  getStarted: { title: string; body: string; link: string };
  browserTitle: string;
  browserBody: string;
  paperFirstTitle: string;
  paperFirstBody: string;
  fromSource: {
    title: string;
    lead: string;
    requirements: string[];
    expectTitle: string;
    expect: string;
    next: string;
  };
  fromReleaseWarning: string;
  unsigned: UnsignedNoteCopy;
  translatedFromRev?: string;
}

export const install: LocalizedPage<InstallContent> = {
  en: {
    rev: "2026-08-25.1",
    title: "Download keel — macOS & Windows",
    description:
      "Download keel for macOS or Windows. Version and links come from GitHub Releases at build time; the five-minute source path is here too.",
    downloadTitle: "Download keel",
    versionPrefix: "Latest release",
    requirements: "Requires Python 3.11 or later · downloaded from GitHub Releases — never mirrored here",
    otherPlatforms: "Linux and everything else: same wheels from the release page.",
    historyLink: "Every version, newest first — the full changelog",
    cards: [
      {
        name: "macOS",
        button: "Download for macOS",
        shell: "Terminal",
        codeComment: "# after downloading the wheels into this folder",
      },
      {
        name: "Windows",
        button: "Download for Windows",
        shell: "PowerShell",
        codeComment: "# after downloading the wheels into this folder",
      },
    ],
    thenTitle: "Then install the wheels",
    allFilesTitle: "All release files",
    terminal: {
      title: "Install from the terminal — one command",
      lead: "Collecting wheels by hand is not the only way in. A script on keel's default branch does the whole job. It reads the latest GitHub release, downloads the five production wheels and the default config.yaml, then installs them into a private Python environment under your home folder.",
      terms: "A wheel is a prebuilt Python package. A venv is a folder holding one project's Python and its libraries, kept apart from the rest of your system; this one is created at ~/.keel/.venv.",
      requires: "You need macOS or Linux, a terminal, curl, and Python 3.14 or later. The script refuses every other platform, so Windows readers stay on the wheels path above. Its floor is stricter than the wheels it installs: those still run on Python 3.11, so the manual path above accepts a Python this script will turn away.",
      pipeTitle: "The one-line install",
      auditTitle: "Or read it first, then run what you read",
      auditLead: "keel is a program you may hand exchange API keys to, so piping a script from the internet straight into bash should not be the only option on offer. Download it, read it, then run your own copy.",
      auditComment: "# every step prints what it is about to do, and why, before it runs",
      branchNote: "The script is served from main, keel's default branch. It has never been part of a tagged release, so there is no version of it to name, and it changes when main changes: the Python floor above moved from 3.11 to 3.14 that way. Read the copy you download rather than trusting this description to have kept up. keel runs the script end to end on macOS and Linux against the real release, but only when the script itself changes, so nothing re-proves it on the day you arrive.",
      doesTitle: "What the script does",
      does: [
        "It downloads exactly five wheels, each by its exact name, from the latest release. It never expands a *.whl glob: a release also carries wheels a deployment must not have.",
        "It installs by exact file path, never by package name. The name keel on PyPI belongs to an unrelated project, and installing by path makes that mistake impossible.",
        "It builds the venv with uv when a working uv answers uv --version — a shim that cannot run is treated as absent. Otherwise it uses the Python it found, with pip.",
        "It prints each wheel's sha256 as computed on your own machine. That is an audit trail, not a verification — no wheel checksums are published anywhere, so there is nothing to compare against.",
        "It runs no privileged commands. Downloads land in a temporary folder that is deleted when the script exits, and the installed deployment lives only under your home folder.",
        "It never overwrites an existing ~/.keel/config.yaml or database. Re-running the script upgrades the code in place.",
        "The config.yaml it lands is the release's production config, in auto_trade.mode: confirm. keel previews every order and waits for your typed approval, so it places nothing until you add venue credentials yourself — but this is the live profile behind a gate, not the paper one. For a config that cannot place a live order at all, run ./.venv/bin/keel init-config --force from ~/.keel: without --live it writes the mode: paper template.",
        "It finishes by running keel versions, and fails loudly if that does not come back clean.",
      ],
      updateTitle: "Keeping it current",
      updateBody: "Re-running the installer moves the deployment to the latest release, in place. keel can also update itself from the folder it lives in: keel update --check reports what an update would do and changes nothing, and keel update applies it behind a typed confirmation. One caveat worth knowing before you rely on it — keel update installs through uv and stops with a plain error when uv is absent, so a deployment the script built without uv needs uv added before an update will apply. keel update refuses to touch a source checkout.",
    },
    paperFirstTitle: "Start on paper — free, and nothing at risk",
    paperFirstBody: "For the cautious first step: the paper profile is free and educational, with simulated fills and no real orders. It is built for learning the workflow before any live decision. It needs no funded venue account and no trading credentials; the only key it asks for is a free, read-only market-data key, used to fetch candle history. The live profile is deliberately harder to reach — attestations, the promotion gauntlet and typed human confirmations all stand in the way.",
    getStarted: {
      title: "New here? Start with the Get Started guide",
      body: "A step-by-step walkthrough — first simulation, the paper profile, the operator console — with screenshots of every screen.",
      link: "Open Get Started",
    },
    browserTitle: "Work from the browser — shipped in v0.11.0",
    browserBody: "v0.11.0 ships a double-clickable macOS app that opens keel in your browser: a first-run checklist, credentials kept in your OS keychain, market data fetched as a background job, and attestations and promotions done from a page instead of a terminal. That setup surface cannot arm a rule, release funds or spend anything — it is built not to. The database beneath it runs in WAL mode, so watching a live fetch never again blocks the engine writing it. The desktop builds are unsigned — the note below says exactly what your computer will show — and the changelog lists each version the day it ships.",
    fromSource: {
      title: "From source — try it in five minutes",
      lead: "Everything in this path is read-only and paper-side: no funds, and nothing here can place an order. You need uv and a free, read-only Coinbase Developer Platform (CDP) API key — candle history is fetched through the authenticated client, so keel fetch without a key fails with an AuthenticationError. We say so here rather than let it surprise you at step four.",
      requirements: ["uv (the Python package manager)", "Any Python 3.11+ (the repo develops on 3.14)", "A free, read-only CDP API key — market data only"],
      expectTitle: "What you should expect",
      expect: "keel simulate replays the real rules deterministically over the fetched history, compares against a DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report. On the default rules it will very likely tell you TRAIN-MORE and name the gates that failed. That is the engine working, not broken. The honesty is the feature.",
      next: "The next steps — promoting a rule through the gate, running the paper agent, a supervised first live order — are in the go-live runbook.",
    },
    fromReleaseWarning:
      "Never install by bare name. The distribution is keel-trader; the name keel on PyPI belongs to an unrelated project, so pip install keel fetches someone else's package. A build reporting DIRTY or [checkout] is not a release and must not be run against live funds.",
    unsigned: {
      title: "Your computer will warn you about this download",
      lead: "The macOS and Windows builds are not code-signed, so your operating system will refuse the first open and tell you it cannot verify the developer. Nothing is broken, and nothing was detected — your computer simply does not know who wrote the program.",
      reason:
        "Code signing means a paid certificate, and keel cannot currently afford either platform's. Apple's costs $99 a year. Azure Trusted Signing for Windows costs about $120 a year, more than Apple's. And since 2024 it does not even buy an instant SmartScreen pass, because reputation is earned from download volume over time. There is no cheaper tier and no free open-source option on either platform. A certificate we made ourselves would do nothing at all, because macOS trusts only certificates Apple issued.",
      macosTitle: "macOS",
      macosSteps: [
        "Open the downloaded .dmg, then drag keel.app into your Applications folder.",
        "Eject the disk image.",
        "Open Applications and double-click keel. macOS refuses; click Done.",
        "Open System Settings → Privacy & Security.",
        "Scroll to the Security section. There is a line saying keel was blocked, with an Open Anyway button beside it. Click it.",
        "Authenticate, then click Open Anyway once more in the dialog that follows.",
        "You only do this once. On macOS Sequoia (15) and later, right-clicking the app and choosing Open no longer works as a shortcut — Apple removed that path deliberately.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "Before extracting, right-click the downloaded .zip → Properties.",
        "At the bottom of the General tab, tick Unblock if it is there, then OK. This is the step people miss, and skipping it brings the warning back on a later launch.",
        "Right-click the .zip → Extract All…, into a folder you own — for example C:\\Users\\<you>\\keel. Not Program Files: keel does not need administrator rights and should not be given them.",
        "Open the extracted folder and double-click keel.exe.",
        "If SmartScreen appears — “Windows protected your PC” — click More info, then Run anyway.",
      ],
      verifyTitle: "Please check what you downloaded first",
      verifyLead:
        "We would rather not simply ask you to click past a security warning — keel is a program you may give exchange API keys to. Every release carries proof of where its files came from, which answers the same question a certificate answers: was this built from keel's own source, by keel's own release pipeline? A SHA256SUMS.txt file is attached to every release too.",
      verifyFail:
        "If either check fails, do not open the file. A failing check means it is not the file we built, and no amount of clicking Open Anyway makes that safe.",
      notMeaningTitle: "What this does not mean",
      notMeaning: [
        "It does not mean the download is damaged.",
        "It does not mean your computer found something wrong. Nothing was scanned and nothing was detected.",
        "It does not mean the app behaves differently. A signed and an unsigned build of the same release are the same program.",
      ],
      avoidTitle: "First — you may not need to deal with this at all",
      avoidBody:
        "The five-minute path below installs the same engine with no installer and no warning on any platform. Nothing is downloaded as an application: pip and uv fetch the published wheels directly, and no operating system objects to that. It does need a terminal and Python 3.11 or later — exactly the friction the desktop app exists to remove. But if you already have both, it is the shorter road, and the rest of this note does not apply to you.",
      avoidLink: "Try it in five minutes",
      more: "Full explanation, including how to verify what you downloaded",
    },
  },

  ar: {
    rev: "2026-08-25.1",
    translatedFromRev: "2026-08-25.1",
    title: "تنزيل كيل — macOS وWindows",
    description:
      "نزّل كيل لنظام macOS أو Windows. ويأتي رقمُ الإصدار وروابطه من GitHub Releases وقت البناء؛ ومسارُ التثبيت من المصدر في خمس دقائق هنا أيضًا.",
    downloadTitle: "تنزيل كيل",
    versionPrefix: "أحدث إصدار",
    requirements: "يتطلّب Python 3.11 أو أحدث · التنزيل من GitHub Releases — ولا يُنسخ هنا أبدًا",
    otherPlatforms: "لينكس وغيره: حزم wheel نفسها متاحةٌ في صفحة الإصدار.",
    historyLink: "كلُّ الإصدارات، من الأحدث إلى الأقدم — السجلُّ الكامل للتغييرات",
    cards: [
      {
        name: "macOS",
        button: "التنزيل لـ macOS",
        shell: "Terminal",
        codeComment: "# بعد تنزيل حزم wheel إلى هذا المجلد",
      },
      {
        name: "Windows",
        button: "التنزيل لـ Windows",
        shell: "PowerShell",
        codeComment: "# بعد تنزيل حزم wheel إلى هذا المجلد",
      },
    ],
    thenTitle: "ثم ثبّت حزم wheel",
    allFilesTitle: "كل ملفات الإصدار",
    terminal: {
      title: "التثبيت من الطرفيّة — أمرٌ واحد",
      lead: "جمعُ حزم ‏wheel يدويًّا ليس المدخل الوحيد. فثمّة سكربتٌ على الفرع الافتراضي لمستودع كيل يتولّى المهمّة كاملة: يقرأ أحدث إصدارٍ على ‏GitHub، وينزّل حزم ‏wheel الإنتاجية الخمس وملفَّ ‏config.yaml الافتراضي، ثم يثبّتها في بيئة ‏Python خاصّةٍ داخل مجلّدك الشخصي.",
      terms: "وحزمةُ ‏wheel حزمةُ ‏Python مبنيّةٌ مسبقًا. أمّا الـvenv فمجلّدٌ يضمّ نسخة ‏Python الخاصّة بمشروعٍ واحدٍ ومكتباتِه، معزولًا عن بقيّة النظام؛ وهذا الـvenv يُنشأ في ‎~/.keel/.venv.",
      requires: "تحتاج إلى ‏macOS أو ‏Linux، وإلى طرفيّة، وإلى ‏curl، وإلى ‏Python 3.14 أو أحدث. والسكربت يرفض كلَّ نظامٍ آخر، فيبقى قرّاء ‏Windows على مسار حزم ‏wheel أعلاه. وحدُّه الأدنى أشدُّ من حدِّ حزم ‏wheel التي يثبّتها: فتلك ما تزال تعمل على ‏Python 3.11، ولذلك يقبل المسارُ اليدوي أعلاه نسخةَ ‏Python يردُّها هذا السكربت.",
      pipeTitle: "التثبيت بسطرٍ واحد",
      auditTitle: "أو اقرأه أولًا ثم شغّل ما قرأت",
      auditLead: "كيل برنامجٌ قد تعطيه مفاتيح ‏API لمنصّة تداول، ولذلك لا ينبغي أن يكون تمريرُ سكربتٍ من الإنترنت إلى ‏bash مباشرةً هو الخيار الوحيد المعروض. نزّله، واقرأه، ثم شغّل نسختك أنت.",
      auditComment: "# كلُّ خطوةٍ تطبع ما هي مقبلةٌ على فعله ولماذا، قبل أن تفعله",
      branchNote: "ويُقدَّم السكربتُ من الفرع ‏main، وهو الفرع الافتراضي لمستودع كيل. ولم يكن يومًا جزءًا من إصدارٍ موسوم، فليس له رقمُ إصدارٍ نشير إليه، وهو يتغيّر كلّما تغيّر ‏main: فبهذا الطريق انتقل حدُّ ‏Python أعلاه من 3.11 إلى 3.14. فاقرأ النسخة التي تنزّلها، ولا تفترض أنّ هذا الوصف قد واكب التغيير. ويشغّل كيل السكربتَ من أوّله إلى آخره على ‏macOS و‏Linux على الإصدار الحقيقي، لكن حين يتغيّر السكربت نفسه فحسب، فلا شيء يعيد إثباته يوم وصولك.",
      doesTitle: "ما الذي يفعله السكربت",
      does: [
        "ينزّل خمس حزم ‏wheel بالضبط، كلَّ واحدةٍ باسمها الكامل، من أحدث إصدار. ولا يوسّع النمط ‎*.whl أبدًا: فالإصدار يحمل أيضًا حزمًا لا يجوز أن يضمّها تثبيتٌ تشغيلي.",
        "ويثبّت بمسار الملفّ الكامل، لا باسم الحزمة أبدًا. فاسم ‏keel على ‏PyPI يخصّ مشروعًا لا علاقة له بنا، والتثبيتُ بالمسار يجعل ذلك الخطأ مستحيلًا.",
        "ويبني الـvenv بأداة ‏uv وحدَها متى استجابت نسخةٌ عاملةٌ من ‏uv للأمر ‏uv --version؛ أمّا الغلافُ الصوريُّ الذي يعجز عن العمل فيُعدُّ غيرَ موجود. وفي غير هذه الحال يستعمل نسخةَ ‏Python التي وجدها، مع ‏pip.",
        "ويطبع بصمة ‏sha256 لكلّ حزمة ‏wheel محسوبةً على جهازك أنت. وهذا سجلُّ تدقيقٍ لا تحقُّق — إذ لا تُنشر بصماتٌ لحزم ‏wheel في أيّ مكان، فلا شيء يُقارَن به.",
        "ولا يشغّل أيَّ أمرٍ بصلاحياتٍ مرتفعة. وتنزل الملفّاتُ في مجلّدٍ مؤقّتٍ يُحذف عند انتهاء السكربت، ولا يقيم التثبيتُ نفسه إلا داخل مجلّدك الشخصي.",
        "ولا يستبدل أبدًا ملفَّ ‎~/.keel/config.yaml ولا قاعدةَ بياناتٍ موجودة. وإعادةُ تشغيل السكربت تُحدِّث الشيفرة في مكانها.",
        "وملفُّ ‏config.yaml الذي يضعه هو إعدادُ الإنتاج الخاصُّ بهذا الإصدار، على الوضع ‏auto_trade.mode: confirm. فكيل يعاين كلَّ أمرٍ قبل إرساله وينتظر موافقةً تكتبها بيدك. فهو لا يقدّم شيئًا حتى تضيف أنت بيانات اعتماد المنصّة — لكنّه النمطُ الحيُّ خلف بوّابة، لا نمطُ التداول التجريبي. ولإعدادٍ يعجز عن تقديم أمرٍ حيٍّ البتّة، شغّل ‎./.venv/bin/keel init-config --force من ‎~/.keel: إذ من دون ‎--live يكتب قالبَ ‏mode: paper.",
        "وينتهي بتشغيل الأمر ‏keel versions، ويفشل فشلًا صريحًا إن لم تأتِ نتيجتُه نظيفة.",
      ],
      updateTitle: "إبقاؤه محدَّثًا",
      updateBody: "إعادةُ تشغيل المثبِّت تنقل التثبيت إلى أحدث إصدارٍ في مكانه. ويستطيع كيل أيضًا أن يحدّث نفسه من المجلّد الذي يسكنه: فالأمر ‏keel update --check يعرض ما سيفعله التحديث ولا يغيّر شيئًا، والأمر ‏keel update ينفّذه بعد تأكيدٍ تكتبه بيدك. وثمّة تحفّظٌ يحسن أن تعرفه قبل الاعتماد عليه — فالأمر ‏keel update يثبّت عبر ‏uv ويتوقّف بخطأٍ صريحٍ حين يغيب ‏uv، ولذلك يحتاج التثبيتُ الذي بناه السكربت دون ‏uv إلى إضافة ‏uv قبل أن يسري أيُّ تحديث. أمّا نسخةُ المصدر فيرفض ‏keel update المساسَ بها.",
    },
    paperFirstTitle: "ابدأ بالتداول التجريبي — مجّانًا، ولا شيء في خطر",
    paperFirstBody: "للخطوة الأولى الحذرة: نمطُ التداول التجريبي مجّانيٌّ وتعليمي — تنفيذٌ مُحاكًى ولا أوامرَ حقيقية — بُني لتتعلّم سير العمل قبل أيّ قرارٍ في التشغيل الحيّ. وهو لا يحتاج إلى حسابٍ مموَّلٍ لدى منصّة ولا إلى بيانات اعتمادٍ للتداول؛ والمفتاح الوحيد الذي يطلبه مفتاحُ بيانات سوقٍ مجّانيٌّ للقراءة فقط لجلب تاريخ الشموع. أمّا النمط الحيّ فالوصول إليه أصعبُ عن قصد: إذ تقف في الطريق التوثيقاتُ، ومسارُ بوابة الترقية، والتأكيداتُ البشرية المكتوبة.",
    getStarted: {
      title: "أأنت جديدٌ هنا؟ ابدأ بدليل البداية",
      body: "شرحٌ خطوةً بخطوة — أوّلُ محاكاة، ونمطُ التداول التجريبي، ولوحةُ تحكّم المشغّل — مع لقطة شاشةٍ لكل شاشة.",
      link: "افتح دليل البداية",
    },
    browserTitle: "العمل من المتصفّح — صدر في الإصدار v0.11.0",
    browserBody: "يضمّ الإصدارُ v0.11.0 تطبيق macOS يُفتح بنقرةٍ مزدوجة ويفتح كيل في متصفّحك: قائمةُ تحقّقٍ للتشغيل الأول، وبياناتُ الدخول تُحفظ في سلسلة مفاتيح نظام التشغيل، وبياناتُ السوق تُجلب مهمّةً في الخلفية، وتتمُّ الشهاداتُ والترقيات من صفحةٍ لا من طرفية. سطحُ الإعداد ذاك لا يستطيع تسليحَ قاعدةٍ ولا تحريرَ أموالٍ ولا إنفاقَ شيء — بُني ليعجز عن ذلك عمدًا. وتحته تعمل قاعدةُ البيانات بوضع WAL، فمراقبةُ جلبٍ مباشرٍ لن تُعطّل المحرّك أثناء كتابته بعد الآن. وتُسلَّم حزمتا سطح المكتب دون توقيعٍ رقمي — والملاحظةُ أدناه تقول بالضبط ما سيعرضه حاسوبك — وسجلُّ التغييرات يُدرج كلَّ إصدارٍ يومَ صدوره.",
    fromSource: {
      title: "من المصدر — جرّبه في خمس دقائق",
      lead: "كلُّ ما في هذا المسار بصلاحية القراءة فقط وعلى جانب التداول التجريبي: لا أموال، ولا شيء هنا يستطيع تقديم أمر تداول. وتحتاج إلى uv وإلى مفتاح API مجّانيٍّ للقراءة فقط من منصّة Coinbase Developer Platform‏ (CDP) — إذ تُجلب بيانات الشموع عبر العميل المُصادَق عليه، ولذلك يفشل الأمر keel fetch من دون مفتاحٍ بخطأ AuthenticationError؛ نقولها مقدَّمًا كي لا تكون مفاجأةً في الخطوة الرابعة.",
      requirements: ["‏uv (مدير حزم Python)", "أيُّ إصدارٍ من Python 3.11 فما فوق (يُطوَّر المستودع على 3.14)", "مفتاح CDP مجّاني للقراءة فقط — لبيانات السوق حصرًا"],
      expectTitle: "ما ينبغي أن تتوقّعه",
      expect: "يعيد الأمر keel simulate تشغيلَ القواعد الحقيقية تشغيلًا حتميًّا على التاريخ المجلوب، ويقارنها بمؤشّر الشراء الدوري المنتظم (DCA) المرجعي، ويكتب تقرير GO-LIVE أو TRAIN-MORE. وعلى القواعد الافتراضية سيقول لك على الأرجح TRAIN-MORE ويسمّي البوابات التي أخفقت — وهذا دليلُ عمل المحرّك لا دليلُ عطبه؛ فالصدق نفسه هو الميزة.",
      next: "أمّا الخطوات التالية — ترقيةُ قاعدةٍ عبر البوابة، وتشغيلُ الوكيل في التداول التجريبي، وأوّلُ أمرٍ حيٍّ خاضعٍ لإشرافٍ بشري — فتجدها في كتاب الانتقال إلى التشغيل الحيّ (go-live runbook).",
    },
    fromReleaseWarning:
      "لا تثبّت بالاسم المجرَّد أبدًا. فالتوزيعة اسمها keel-trader؛ أمّا اسم keel على PyPI فلمشروعٍ آخر لا علاقة له بنا، ولذلك يجلب الأمر pip install keel حزمةً ليست لنا. والنسخة المبنيّة التي تُظهر DIRTY أو [checkout] ليست إصدارًا، ويُمنع تشغيلها على أموالٍ حيّة.",
    unsigned: {
      title: "سيحذّرك جهازك من هذا التنزيل",
      lead: "النسخُ المبنيّة لنظامَي macOS وWindows غير موقَّعةٍ رقميًّا، ولذلك سيرفض نظامُك فتحها أوّل مرّة ويقول إنه لا يستطيع التحقّق من المطوّر. فلا شيء معطّل، ولم يُكتشف شيء — جهازك ببساطة لا يعرف مَن كتب البرنامج.",
      reason:
        "التوقيعُ الرقمي يقتضي شهادةً مدفوعة على كلا النظامين، ولا يقدر كيل على أيٍّ منهما حاليًّا: فشهادة Apple بتسعةٍ وتسعين دولارًا سنويًّا، وAzure Trusted Signing لويندوز بنحو مائةٍ وعشرين دولارًا سنويًّا — أي أغلى من Apple، ومنذ عام 2024 لم تعد تمنح حتى تجاوزًا فوريًّا لـSmartScreen، لأنّ السمعة تُكتسب من حجم التنزيلات مع الوقت. ولا فئةَ أرخص، ولا خيارَ مجّانيًّا لمشاريع المصدر المفتوح على أيٍّ من النظامين؛ وشهادةٌ نصنعها بأنفسنا لا تفيد شيئًا البتّة، لأنّ macOS لا يثق إلا بالشهادات الصادرة عن Apple.",
      macosTitle: "macOS",
      macosSteps: [
        "افتح ملفّ ‎.dmg المنزَّل، ثم اسحب ‏keel.app إلى مجلّد ‏Applications.",
        "أخرِج قرص التثبيت (Eject).",
        "افتح ‏Applications وانقر كيل نقرًا مزدوجًا. سيرفض macOS؛ اضغط ‏Done.",
        "افتح ‏System Settings ← Privacy & Security.",
        "انزل إلى قسم ‏Security. ستجد سطرًا يقول إن كيل حُجب، وبجانبه زرّ ‏Open Anyway. اضغطه.",
        "أثبِت هويّتك، ثم اضغط ‏Open Anyway مرّةً أخرى في النافذة التي تظهر.",
        "لن تحتاج إلى فعل هذا إلا مرّةً واحدة. وفي macOS Sequoia‏ (15) فما بعد، لم يعد النقر بالزرّ الأيمن واختيار ‏Open يعمل اختصارًا — فقد أزالت Apple هذا المسار عمدًا.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "قبل فكّ الضغط، انقر بالزرّ الأيمن على ملفّ ‎.zip المنزَّل ← ‏Properties.",
        "في أسفل تبويب ‏General، علّم ‏Unblock إن وُجد ثم ‏OK. هذه هي الخطوة التي يغفلها الناس، وتخطّيها يُعيد التحذير عند تشغيلٍ لاحق.",
        "انقر بالزرّ الأيمن على ‎.zip ← ‏Extract All…‎ إلى مجلّدٍ تملكه — مثلًا ‏C:\\\\Users\\\\<اسمك>\\\\keel. وليس ‏Program Files: كيل لا يحتاج صلاحيات المسؤول ولا ينبغي منحه إيّاها.",
        "افتح المجلّد المستخرَج وانقر ‏keel.exe نقرًا مزدوجًا.",
        "إن ظهر ‏SmartScreen — «‏Windows protected your PC‏» — فاضغط ‏More info ثم ‏Run anyway.",
      ],
      verifyTitle: "من فضلك تحقّق ممّا نزّلته أولًا",
      verifyLead:
        "لا يطيب لنا أن نطلب منك مجرّد تجاوز تحذيرٍ أمني — فكيل برنامجٌ قد تعطيه مفاتيح API لمنصّة تداول. وكلُّ إصدارٍ يحمل إثباتًا لمصدر ملفّاته، وهو يجيب عن السؤال نفسه الذي تجيب عنه الشهادة: هل بُني هذا من مصدر كيل نفسه، وعبر خطّ إصدار كيل نفسه؟ ويُرفق بكلّ إصدارٍ ملفُّ SHA256SUMS.txt أيضًا.",
      verifyFail:
        "إن أخفق أيٌّ من الفحصين فلا تفتح الملفّ. فإخفاقه يعني أنه ليس الملفّ الذي بنيناه، ولن يجعله الضغطُ على ‏Open Anyway آمنًا.",
      notMeaningTitle: "ما لا يعنيه هذا التحذير",
      notMeaning: [
        "لا يعني أن التنزيل تالف.",
        "ولا يعني أن جهازك وجد خطبًا ما؛ فلم يُفحص شيء ولم يُكتشف شيء.",
        "ولا يعني أن التطبيق يسلك سلوكًا مختلفًا. فالنسخة الموقَّعة وغير الموقَّعة من الإصدار نفسه هما البرنامج نفسه.",
      ],
      avoidTitle: "أولًا — قد لا تحتاج إلى التعامل مع هذا أصلًا",
      avoidBody:
        "مسارُ الخمس دقائق أدناه يثبّت المحرّك نفسه بلا مثبِّت وبلا تحذيرٍ على أيّ نظام، لأنه لا يُنزَّل شيءٌ بوصفه تطبيقًا — بل يجلب pip وuv حزم wheel المنشورة مباشرةً، ولا يعترض أيُّ نظام تشغيل على ذلك. وهو يحتاج إلى طرفيّةٍ وإلى Python 3.11 فأحدث، وهذا بالضبط هو الاحتكاك الذي وُجد تطبيقُ سطح المكتب ليزيله؛ لكن إن كانا عندك أصلًا فهو الطريق الأقصر، وبقيّةُ هذه الملاحظة لا تعنيك.",
      avoidLink: "جرّبه في خمس دقائق",
      more: "الشرح الكامل، وكيف تتحقّق ممّا نزّلته",
    },
  },

  fr: {
    rev: "2026-08-25.1",
    translatedFromRev: "2026-08-25.1",
    title: "Télécharger keel — macOS et Windows",
    description:
      "Téléchargez keel pour macOS ou Windows. Le numéro de version et les liens proviennent de GitHub Releases, récupérés au moment du build ; le parcours en cinq minutes depuis les sources figure également ici.",
    downloadTitle: "Télécharger keel",
    versionPrefix: "Dernière version",
    requirements: "Nécessite Python 3.11 ou plus · téléchargé depuis GitHub Releases — jamais recopié ici",
    otherPlatforms: "Linux et le reste : les mêmes wheels, depuis la page des versions.",
    historyLink: "Toutes les versions, de la plus récente à la plus ancienne — le journal complet",
    cards: [
      {
        name: "macOS",
        button: "Télécharger pour macOS",
        shell: "Terminal",
        codeComment: "# après avoir téléchargé les wheels dans ce dossier",
      },
      {
        name: "Windows",
        button: "Télécharger pour Windows",
        shell: "PowerShell",
        codeComment: "# après avoir téléchargé les wheels dans ce dossier",
      },
    ],
    thenTitle: "Installez ensuite les wheels",
    allFilesTitle: "Tous les fichiers de la version",
    terminal: {
      title: "Installer depuis le terminal — une seule commande",
      lead: "Rassembler les wheels à la main n'est pas la seule porte d'entrée. Un script publié sur la branche par défaut de keel fait tout le travail. Il lit la dernière version parue sur GitHub, télécharge les cinq wheels de production et le config.yaml par défaut, puis les installe dans un environnement Python privé, sous votre dossier personnel.",
      terms: "Une wheel est un paquet Python déjà construit. Un venv est un dossier qui contient le Python d'un seul projet et ses bibliothèques, tenu à l'écart du reste du système ; celui-ci est créé dans ~/.keel/.venv.",
      requires: "Il vous faut macOS ou Linux, un terminal, curl et Python 3.14 ou plus. Le script refuse toute autre plateforme : les lecteurs sous Windows restent sur le parcours des wheels ci-dessus. Son seuil est plus strict que celui des wheels qu'il installe : celles-ci tournent toujours sur Python 3.11, si bien que le parcours manuel ci-dessus accepte un Python que ce script, lui, refusera.",
      pipeTitle: "L'installation en une ligne",
      auditTitle: "Ou bien lisez-le d'abord, puis exécutez ce que vous avez lu",
      auditLead: "keel est un programme auquel vous confierez peut-être les clés d'API d'une plateforme d'échange : diriger un script venu d'internet droit dans bash ne doit donc pas être la seule option proposée. Téléchargez-le, lisez-le, puis exécutez votre propre copie.",
      auditComment: "# chaque étape annonce ce qu'elle va faire, et pourquoi, avant de le faire",
      branchNote: "Le script est servi depuis main, la branche par défaut de keel. Il n'a jamais fait partie d'une version publiée, il n'y a donc aucun numéro à citer, et il change quand main change : c'est ainsi que le seuil Python ci-dessus est passé de 3.11 à 3.14. Lisez la copie que vous téléchargez, plutôt que de supposer que cette description a suivi. keel exécute le script de bout en bout sur macOS et Linux contre la vraie version publiée, mais seulement quand le script lui-même change : rien ne le revérifie le jour où vous arrivez.",
      doesTitle: "Ce que fait le script",
      does: [
        "Il télécharge exactement cinq wheels, chacune par son nom exact, dans la dernière version parue. Il n'utilise jamais de motif *.whl : une version publiée embarque aussi des wheels qu'un déploiement ne doit pas recevoir.",
        "Il installe par chemin de fichier exact, jamais par nom de paquet. Sur PyPI, le nom keel appartient à un projet sans rapport, et installer par chemin rend cette erreur impossible.",
        "Il construit le venv avec uv seulement quand un uv fonctionnel répond à uv --version ; un substitut incapable de s'exécuter est considéré comme absent. Sinon, il utilise le Python qu'il a trouvé, avec pip.",
        "Il affiche le sha256 de chaque wheel, calculé sur votre propre machine. C'est une trace d'audit, pas une vérification — aucune empreinte de wheel n'est publiée nulle part, il n'y a donc rien à quoi comparer.",
        "Il n'exécute aucune commande privilégiée. Les téléchargements atterrissent dans un dossier temporaire supprimé à la sortie du script, et l'installation elle-même ne vit que sous votre dossier personnel.",
        "Il n'écrase jamais un ~/.keel/config.yaml ni une base de données existante. Relancer le script met le code à jour sur place.",
        "Le config.yaml qu'il dépose est la configuration de production de la version publiée, en auto_trade.mode: confirm. keel prévisualise chaque ordre et attend une approbation tapée à la main. Il ne passe donc rien tant que vous n'ajoutez pas vous-même les identifiants d'une plateforme — mais c'est le profil réel derrière un verrou, pas le profil papier. Pour une configuration incapable de passer le moindre ordre réel, lancez ./.venv/bin/keel init-config --force depuis ~/.keel : sans --live, c'est le modèle mode: paper qui est écrit.",
        "Il termine en lançant keel versions, et échoue bruyamment si le résultat n'est pas net.",
      ],
      updateTitle: "Le maintenir à jour",
      updateBody: "Relancer l'installeur amène le déploiement à la dernière version parue, sur place. keel sait aussi se mettre à jour depuis le dossier où il habite : keel update --check annonce ce que ferait la mise à jour sans rien modifier, et keel update l'applique après une confirmation tapée à la main. Une réserve mérite d'être connue avant de s'y fier — keel update installe via uv et s'arrête sur une erreur explicite quand uv est absent, si bien qu'un déploiement que le script a construit sans uv réclame l'ajout de uv avant qu'une mise à jour puisse s'appliquer. keel update refuse de toucher à une copie des sources.",
    },
    paperFirstTitle: "Commencez en papier — gratuit, et sans rien risquer",
    paperFirstBody: "Pour un premier pas prudent : le profil papier est gratuit et pédagogique — exécutions simulées, aucun ordre réel — conçu pour apprendre le fonctionnement avant toute décision en réel. Il ne réclame ni compte approvisionné sur une plateforme, ni identifiants de trading ; la seule clé demandée est une clé de données de marché gratuite, en lecture seule, pour récupérer l'historique des bougies. Le profil réel, lui, se mérite délibérément : attestations, parcours de promotion et confirmations tapées à la main se dressent sur la route.",
    getStarted: {
      title: "Nouveau ici ? Commencez par le guide Premiers pas",
      body: "Un parcours pas à pas — première simulation, profil papier, console de l'opérateur — avec une capture de chaque écran.",
      link: "Ouvrir Premiers pas",
    },
    browserTitle: "Travailler depuis le navigateur — livré dans la v0.11.0",
    browserBody: "La v0.11.0 livre une application macOS à double-clic qui ouvre keel dans votre navigateur : liste de contrôle au premier lancement, identifiants gardés dans le trousseau du système, données de marché rapatriées en tâche de fond, attestations et promotions faites depuis une page plutôt qu'un terminal. Cette surface de configuration ne peut armer une règle, libérer des fonds ni rien dépenser — elle est construite pour ne pas le pouvoir. En dessous, la base de données tourne en mode WAL : regarder une récupération en direct ne bloquera plus jamais le moteur qui l'écrit. Les builds bureau ne sont pas signés — la note ci-dessous dit exactement ce que votre ordinateur affichera — et le journal des versions inscrit chaque sortie le jour de sa publication.",
    fromSource: {
      title: "Depuis les sources — essayez keel en cinq minutes",
      lead: "Tout ce parcours est en lecture seule et côté papier : aucun fonds, et rien ici ne peut passer d'ordre. Il vous faut uv et une clé d'API Coinbase Developer Platform (CDP) gratuite, en lecture seule — l'historique des bougies passe par le client authentifié, si bien que keel fetch sans clé échoue sur une AuthenticationError. Autant le dire tout de suite, pour que l'étape 4 ne surprenne personne.",
      requirements: ["uv (le gestionnaire de paquets Python)", "Python 3.11 ou plus (le dépôt se développe sur 3.14)", "Une clé CDP gratuite en lecture seule — données de marché uniquement"],
      expectTitle: "À quoi vous attendre",
      expect: "keel simulate rejoue les vraies règles, de façon déterministe, sur l'historique récupéré, les compare à la référence DCA et rédige un rapport GO-LIVE / TRAIN-MORE. Sur les règles par défaut, il vous répondra très probablement TRAIN-MORE en nommant les verrous qui bloquent : c'est le moteur qui fonctionne, pas une panne — l'honnêteté est la fonctionnalité.",
      next: "Les étapes suivantes — faire franchir le verrou à une règle, lancer l'agent papier, passer un premier ordre réel sous supervision — figurent dans le runbook de mise en production.",
    },
    fromReleaseWarning:
      "N'installez jamais le paquet par son seul nom. La distribution s'appelle keel-trader ; sur PyPI, le nom keel appartient à un projet sans rapport, si bien que pip install keel récupère le paquet de quelqu'un d'autre. Un build qui affiche DIRTY ou [checkout] n'est pas une version publiée et ne doit jamais tourner sur des fonds réels.",
    unsigned: {
      title: "Votre ordinateur va vous mettre en garde au sujet de ce téléchargement",
      lead: "Les builds macOS et Windows ne sont pas signés : à la première ouverture, votre système refusera de les lancer, en expliquant qu'il ne peut pas vérifier le développeur. Rien n'est cassé et rien n'a été détecté — votre ordinateur ignore simplement qui a écrit ce programme.",
      reason:
        "Signer son code suppose un certificat payant, et keel n'a les moyens ni de l'un ni de l'autre : celui d'Apple coûte 99 $ par an, et Azure Trusted Signing, côté Windows, environ 120 $ par an — plus cher qu'Apple, et depuis 2024 il n'ouvre même plus droit à une exemption immédiate auprès de SmartScreen, la réputation se gagnant au volume de téléchargements, dans la durée. Il n'existe ni offre moins chère ni option gratuite pour l'open source sur l'une ou l'autre plateforme, et un certificat que nous fabriquerions nous-mêmes ne servirait à rien : macOS ne fait confiance qu'aux certificats délivrés par Apple.",
      macosTitle: "macOS",
      macosSteps: [
        "Ouvrez le .dmg téléchargé, puis faites glisser keel.app dans votre dossier Applications.",
        "Éjectez l'image disque.",
        "Ouvrez Applications et double-cliquez sur keel. macOS refuse : cliquez sur Terminé.",
        "Ouvrez Réglages Système → Confidentialité et sécurité.",
        "Descendez jusqu'à la section Sécurité : une ligne indique que keel a été bloqué, avec un bouton Ouvrir quand même à côté. Cliquez dessus.",
        "Authentifiez-vous, puis cliquez une seconde fois sur Ouvrir quand même dans la boîte de dialogue suivante.",
        "L'opération n'est à faire qu'une seule fois. Sur macOS Sequoia (15) et versions ultérieures, le clic droit puis Ouvrir ne fait plus office de raccourci : Apple a supprimé ce chemin délibérément.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "Avant d'extraire, faites un clic droit sur le .zip téléchargé → Propriétés.",
        "En bas de l'onglet Général, cochez Débloquer si la case apparaît, puis validez par OK. C'est l'étape que l'on oublie, et la sauter fait réapparaître l'avertissement à un lancement ultérieur.",
        "Clic droit sur le .zip → Extraire tout…, vers un dossier qui vous appartient — par exemple C:\\Users\\<vous>\\keel. Surtout pas Program Files : keel n'a pas besoin des droits administrateur et ne doit pas les recevoir.",
        "Ouvrez le dossier extrait et double-cliquez sur keel.exe.",
        "Si SmartScreen s'affiche — « Windows a protégé votre ordinateur » — cliquez sur Informations complémentaires, puis sur Exécuter quand même.",
      ],
      verifyTitle: "Vérifiez d'abord ce que vous avez téléchargé",
      verifyLead:
        "Nous préférons ne pas nous contenter de vous demander de passer outre un avertissement de sécurité : keel est un programme auquel vous confierez peut-être les clés d'API d'une plateforme d'échange. Chaque version porte une preuve de l'origine de ses fichiers, qui répond à la même question qu'un certificat : ce fichier a-t-il bien été construit à partir des sources de keel, par la chaîne de publication de keel ? Un fichier SHA256SUMS.txt accompagne également chaque version.",
      verifyFail:
        "Si l'une des deux vérifications échoue, n'ouvrez pas le fichier. Un échec signifie que ce n'est pas le fichier que nous avons construit, et aucun « Ouvrir quand même » n'y changera rien.",
      notMeaningTitle: "Ce que cela ne signifie pas",
      notMeaning: [
        "Cela ne veut pas dire que le téléchargement est endommagé.",
        "Cela ne veut pas dire que votre ordinateur a trouvé un problème : rien n'a été analysé, rien n'a été détecté.",
        "Cela ne veut pas dire que l'application se comporte autrement. Un build signé et un build non signé d'une même version sont le même programme.",
      ],
      avoidTitle: "D'abord — vous n'aurez peut-être pas à vous en soucier",
      avoidBody:
        "Le parcours en cinq minutes ci-dessous installe le même moteur sans installeur et sans le moindre avertissement, quelle que soit la plateforme, parce que rien n'est téléchargé sous forme d'application : pip et uv récupèrent directement les wheels publiées, et aucun système d'exploitation n'y trouve à redire. Il faut un terminal et Python 3.11 ou plus — c'est précisément la friction que l'application de bureau doit supprimer ; mais si vous avez déjà les deux, c'est le chemin le plus court, et le reste de cette note ne vous concerne pas.",
      avoidLink: "Essayez keel en cinq minutes",
      more: "L'explication complète, et comment vérifier ce que vous avez téléchargé",
    },
  },
};
