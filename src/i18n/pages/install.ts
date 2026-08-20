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

export interface InstallContent {
  rev: string;
  title: string;
  description: string;
  downloadTitle: string;
  versionPrefix: string;
  requirements: string;
  otherPlatforms: string;
  cards: PlatformCardCopy[];
  thenTitle: string;
  allFilesTitle: string;
  getStarted: { title: string; body: string; link: string };
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
    rev: "2026-08-20.3",
    title: "Download keel — macOS & Windows",
    description:
      "Download keel for macOS or Windows. Version and links come from GitHub Releases at build time; the five-minute source path is here too.",
    downloadTitle: "Download keel",
    versionPrefix: "Latest release",
    requirements: "Requires Python 3.11 or later · downloaded from GitHub Releases — never mirrored here",
    otherPlatforms: "Linux and everything else: same wheels from the release page.",
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
    getStarted: {
      title: "New here? Start with the Get Started guide",
      body: "A step-by-step walkthrough — first simulation, the paper profile, the operator console — with screenshots of every screen.",
      link: "Open Get Started",
    },
    fromSource: {
      title: "From source — try it in five minutes",
      lead: "Everything in this path is read-only and paper-side: no funds, and nothing here can place an order. You need uv and a free, read-only Coinbase Developer Platform (CDP) API key — candle history is fetched through the authenticated client, so keel fetch without a key fails with an AuthenticationError. Said upfront so step four is not a surprise.",
      requirements: ["uv (the Python package manager)", "Any Python 3.11+ (the repo develops on 3.14)", "A free, read-only CDP API key — market data only"],
      expectTitle: "What you should expect",
      expect: "keel simulate replays the real rules deterministically over the fetched history, compares against a DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report. On the default rules it will very likely tell you TRAIN MORE and name the gates that fail — that is the engine working, not broken; the honesty is the feature.",
      next: "The next steps — promoting a rule through the gate, running the paper agent, a supervised first live order — are in the go-live runbook.",
    },
    fromReleaseWarning:
      "Never install by bare name. The distribution is keel-trader; the name keel on PyPI belongs to an unrelated project, so pip install keel fetches someone else's package. A build reporting DIRTY or [checkout] is not a release and must not be run against live funds.",
    unsigned: {
      title: "Your computer will warn you about this download",
      lead: "The macOS and Windows builds are not code-signed, so your operating system will refuse the first open and tell you it cannot verify the developer. Nothing is broken, and nothing was detected — your computer simply does not know who wrote the program.",
      reason:
        "Code signing is a paid certificate. Apple's costs $99 per year, every year, and keel cannot currently afford it. There is no cheaper tier and no free option for open-source projects, and a certificate we made ourselves would do nothing at all, because macOS trusts only certificates Apple issued.",
      macosTitle: "macOS",
      macosSteps: [
        "Double-click keel. macOS refuses, saying it cannot verify the developer.",
        "Open System Settings → Privacy & Security.",
        "Scroll to the message about keel and click Open Anyway.",
        "You only do this once.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "Run the installer. SmartScreen says \"Windows protected your PC\".",
        "Click More info, then Run anyway.",
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
      avoidTitle: "Or skip the warning entirely",
      avoidBody:
        "The five-minute source path below installs the same engine with no installer and no warning, because nothing is downloaded as an application — pip and uv fetch the published wheels directly. It needs a terminal and Python 3.11+, which is exactly the friction the desktop app exists to remove; but if you already have both, it is the shorter road.",
      avoidLink: "Try it in five minutes",
      more: "Full explanation, including how to verify what you downloaded",
    },
  },

  ar: {
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
    title: "تنزيل كيل — macOS وWindows",
    description:
      "نزّل كيل لـ macOS أو Windows. الإصدار والروابط من GitHub Releases وقت البناء؛ ومسار المصدر في خمس دقائق هنا أيضًا.",
    downloadTitle: "تنزيل كيل",
    versionPrefix: "أحدث إصدار",
    requirements: "يتطلب Python 3.11 أو أحدث · التنزيل من GitHub Releases — ولا يُنسخ أبدًا هنا",
    otherPlatforms: "لينكس وغيره: العجلات نفسها من صفحة الإصدار.",
    cards: [
      {
        name: "macOS",
        button: "التنزيل لـ macOS",
        shell: "Terminal",
        codeComment: "# بعد تنزيل العجلات إلى هذا المجلد",
      },
      {
        name: "Windows",
        button: "التنزيل لـ Windows",
        shell: "PowerShell",
        codeComment: "# بعد تنزيل العجلات إلى هذا المجلد",
      },
    ],
    thenTitle: "ثم ثبّت العجلات",
    allFilesTitle: "كل ملفات الإصدار",
    getStarted: {
      title: "جديد هنا؟ ابدأ بدليل البداية",
      body: "شرحٌ خطوةً بخطوة — أول محاكاة، والنمط الافتراضي، ووحدة تحكّم المشغّل — بلقطات شاشة لكل شاشة.",
      link: "افتح دليل البداية",
    },
    fromSource: {
      title: "من المصدر — جرّبه في خمس دقائق",
      lead: "كلُّ ما في هذا المسار للقراءة فقط ومن جهة التداول الافتراضي: لا أموال، ولا شيء هنا يستطيع تقديم أمر تداول. تحتاج uv ومفتاح API لمنصّة Coinbase Developer Platform‏ (CDP) مجانيًّا للقراءة فقط — تُجلب بيانات الشموع عبر العميل المُصادَق، لذا يفشل keel fetch من دون مفتاحٍ بخطأ AuthenticationError؛ نقولها مقدمًا كي لا تكون مفاجأةً في الخطوة الرابعة.",
      requirements: ["‏uv (مدير حزم Python)", "أي Python من 3.11 فما فوق (المستودع يُطوَّر على 3.14)", "مفتاح CDP مجاني للقراءة فقط — لبيانات السوق حصرًا"],
      expectTitle: "ما يجب أن تتوقّع",
      expect: "يعيد keel simulate تشغيل القواعد الحقيقية حتميًّا فوق التاريخ المجلوب، ويقارنها بمقياس DCA، ويكتب تقرير GO-LIVE أو TRAIN-MORE. وعلى القواعد الافتراضية سيخبرك على الأرجح TRAIN MORE ويسمّي البوابات الفاشلة — فهذا المحرّك يعمل، لا أنه معطّل؛ الصدق هو الخصيصة.",
      next: "الخطوات التالية — ترقية قاعدةٍ عبر البوابة، وتشغيل الوكيل الافتراضي، وأول أمرٍ حيٍّ خاضعٍ لإشراف بشري — في كتاب الانتقال إلى الحيّ (go-live runbook).",
    },
    fromReleaseWarning:
      "لا تثبّت بالاسم المجرد أبدًا. التوزيعة اسمها keel-trader؛ أما اسم keel على PyPI فلمشروعٍ آخر لا علاقة له بنا، فأمر pip install keel يجلب حزمة غيرنا. والبنية التي تُظهر DIRTY أو [checkout] ليست إصدارًا ويُمنع تشغيلها على أموالٍ حيّة.",
    unsigned: {
      title: "سيحذّرك جهازك من هذا التنزيل",
      lead: "بِنى macOS وWindows غير موقّعة رقميًّا، لذا سيرفض نظامك فتحها أول مرّة ويقول إنه لا يستطيع التحقّق من المطوّر. لا شيء معطّل، ولم يُكتشف شيء — جهازك ببساطة لا يعرف من كتب البرنامج.",
      reason:
        "التوقيع الرقمي شهادةٌ مدفوعة. شهادة Apple تكلّف 99 دولارًا سنويًّا، كلّ سنة، وكيل لا يقدر عليها حاليًّا. ولا توجد فئة أرخص ولا خيارٌ مجانيٌّ لمشاريع المصدر المفتوح، وشهادةٌ نصنعها بأنفسنا لا تفيد شيئًا البتّة، لأن macOS لا يثق إلا بالشهادات الصادرة عن Apple.",
      macosTitle: "macOS",
      macosSteps: [
        "انقر كيل نقرًا مزدوجًا. سيرفض macOS قائلًا إنه لا يستطيع التحقّق من المطوّر.",
        "افتح ‏System Settings ← Privacy & Security.",
        "انزل إلى الرسالة الخاصّة بكيل واضغط ‏Open Anyway.",
        "تفعل هذا مرّةً واحدة فقط.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "شغّل المثبّت. سيقول ‏SmartScreen‏: «‏Windows protected your PC‏».",
        "اضغط ‏More info ثم ‏Run anyway.",
      ],
      verifyTitle: "من فضلك تحقّق ممّا نزّلته أولًا",
      verifyLead:
        "لا نحبّ أن نطلب منك مجرّد تجاوز تحذيرٍ أمني — فكيل برنامجٌ قد تعطيه مفاتيح API لمنصّة تداول. كلّ إصدارٍ يحمل إثباتًا لمصدر ملفّاته، وهو يجيب عن السؤال نفسه الذي تجيب عنه الشهادة: هل بُني هذا من مصدر كيل نفسه، عبر خطّ إصدار كيل نفسه؟ ويُرفق بكلّ إصدارٍ ملفّ SHA256SUMS.txt أيضًا.",
      verifyFail:
        "إن فشل أيٌّ من الفحصين فلا تفتح الملفّ. الفشل يعني أنه ليس الملفّ الذي بنيناه، ولن يجعله الضغط على ‏Open Anyway آمنًا.",
      notMeaningTitle: "ما لا يعنيه هذا التحذير",
      notMeaning: [
        "لا يعني أن التنزيل تالف.",
        "لا يعني أن جهازك وجد خطبًا ما. لم يُفحص شيء ولم يُكتشف شيء.",
        "لا يعني أن التطبيق يسلك سلوكًا مختلفًا. البنية الموقّعة وغير الموقّعة من الإصدار نفسه هما البرنامج نفسه.",
      ],
      avoidTitle: "أو تجاوز التحذير من أصله",
      avoidBody:
        "مسار المصدر في خمس دقائق أدناه يثبّت المحرّك نفسه بلا مثبّت وبلا تحذير، لأنه لا يُنزَّل شيءٌ بوصفه تطبيقًا — بل يجلب pip وuv العجلات المنشورة مباشرةً. يحتاج طرفيّةً وPython 3.11 فأحدث، وهو بالضبط الاحتكاك الذي وُجد تطبيق سطح المكتب ليزيله؛ لكن إن كان كلاهما عندك أصلًا فهو الطريق الأقصر.",
      avoidLink: "جرّبه في خمس دقائق",
      more: "الشرح الكامل، وكيف تتحقّق ممّا نزّلته",
    },
  },

  fr: {
    rev: "2026-08-20.3",
    translatedFromRev: "2026-08-20.3",
    title: "Télécharger keel — macOS et Windows",
    description:
      "Téléchargez keel pour macOS ou Windows. Version et liens viennent de GitHub Releases au build ; le parcours en cinq minutes depuis les sources est là aussi.",
    downloadTitle: "Télécharger keel",
    versionPrefix: "Dernière version",
    requirements: "Nécessite Python 3.11 ou plus · téléchargé depuis GitHub Releases — jamais copié ici",
    otherPlatforms: "Linux et le reste : les mêmes wheels depuis la page des versions.",
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
    thenTitle: "Puis installez les wheels",
    allFilesTitle: "Tous les fichiers de la version",
    getStarted: {
      title: "Nouveau ici ? Commencez par le guide Premiers pas",
      body: "Un parcours pas à pas — première simulation, profil papier, console opérateur — avec des captures d'écran de chaque écran.",
      link: "Ouvrir Premiers pas",
    },
    fromSource: {
      title: "Depuis les sources — essayez-le en cinq minutes",
      lead: "Tout dans ce parcours est en lecture seule et côté papier : aucun fonds, et rien ici ne peut passer d'ordre. Il vous faut uv et une clé API Coinbase Developer Platform (CDP) gratuite en lecture seule — l'historique de chandeliers passe par le client authentifié, donc keel fetch sans clé échoue avec une AuthenticationError ; dit d'avance pour que l'étape 4 ne soit pas une surprise.",
      requirements: ["uv (le gestionnaire de paquets Python)", "Python 3.11 ou plus (le dépôt se développe sur 3.14)", "Une clé CDP gratuite en lecture seule — données de marché uniquement"],
      expectTitle: "À quoi vous attendre",
      expect: "keel simulate rejoue les règles réelles de façon déterministe sur l'historique récupéré, compare au repère DCA et écrit un rapport GO-LIVE / TRAIN-MORE. Sur les règles par défaut, il vous dira très probablement TRAIN MORE en nommant les portes qui échouent — c'est le moteur qui fonctionne, pas une panne ; l'honnêteté est la fonctionnalité.",
      next: "Les étapes suivantes — promouvoir une règle par la porte, lancer l'agent papier, un premier ordre réel supervisé — sont dans le runbook de mise en production.",
    },
    fromReleaseWarning:
      "N'installez jamais par nom nu. La distribution s'appelle keel-trader ; le nom keel sur PyPI appartient à un projet sans rapport, donc pip install keel récupère le paquet de quelqu'un d'autre. Un build qui affiche DIRTY ou [checkout] n'est pas une version et ne doit jamais tourner sur des fonds réels.",
    unsigned: {
      title: "Votre ordinateur va vous avertir à propos de ce téléchargement",
      lead: "Les builds macOS et Windows ne sont pas signés, donc votre système refusera la première ouverture en disant qu'il ne peut pas vérifier le développeur. Rien n'est cassé et rien n'a été détecté — votre ordinateur ne sait simplement pas qui a écrit le programme.",
      reason:
        "La signature de code est un certificat payant. Celui d'Apple coûte 99 $ par an, chaque année, et keel n'en a pas les moyens aujourd'hui. Il n'existe ni offre moins chère ni option gratuite pour les projets open source, et un certificat que nous fabriquerions nous-mêmes ne servirait à rien : macOS ne fait confiance qu'aux certificats émis par Apple.",
      macosTitle: "macOS",
      macosSteps: [
        "Double-cliquez sur keel. macOS refuse, en disant qu'il ne peut pas vérifier le développeur.",
        "Ouvrez Réglages Système → Confidentialité et sécurité.",
        "Descendez jusqu'au message concernant keel et cliquez sur Ouvrir quand même.",
        "Vous ne le faites qu'une seule fois.",
      ],
      windowsTitle: "Windows",
      windowsSteps: [
        "Lancez l'installeur. SmartScreen affiche « Windows a protégé votre ordinateur ».",
        "Cliquez sur Informations complémentaires, puis Exécuter quand même.",
      ],
      verifyTitle: "Vérifiez d'abord ce que vous avez téléchargé",
      verifyLead:
        "Nous préférons ne pas vous demander simplement de passer outre un avertissement de sécurité — keel est un programme auquel vous confierez peut-être des clés API d'exchange. Chaque version porte une preuve de l'origine de ses fichiers, qui répond à la même question qu'un certificat : ceci a-t-il été construit depuis les sources de keel, par le pipeline de publication de keel ? Un fichier SHA256SUMS.txt est également joint à chaque version.",
      verifyFail:
        "Si l'une des deux vérifications échoue, n'ouvrez pas le fichier. Un échec signifie que ce n'est pas le fichier que nous avons construit, et aucun « Ouvrir quand même » ne rendra cela sûr.",
      notMeaningTitle: "Ce que cela ne signifie pas",
      notMeaning: [
        "Cela ne signifie pas que le téléchargement est endommagé.",
        "Cela ne signifie pas que votre ordinateur a trouvé un problème. Rien n'a été analysé et rien n'a été détecté.",
        "Cela ne signifie pas que l'application se comporte différemment. Un build signé et un build non signé de la même version sont le même programme.",
      ],
      avoidTitle: "Ou évitez complètement l'avertissement",
      avoidBody:
        "Le parcours en cinq minutes depuis les sources, ci-dessous, installe le même moteur sans installeur et sans avertissement, parce que rien n'est téléchargé en tant qu'application — pip et uv récupèrent directement les wheels publiées. Il faut un terminal et Python 3.11+, ce qui est précisément la friction que l'application de bureau existe pour supprimer ; mais si vous avez déjà les deux, c'est le chemin le plus court.",
      avoidLink: "Essayez-le en cinq minutes",
      more: "Explication complète, et comment vérifier ce que vous avez téléchargé",
    },
  },
};
