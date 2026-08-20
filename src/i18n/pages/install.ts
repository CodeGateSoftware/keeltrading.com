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
  translatedFromRev?: string;
}

export const install: LocalizedPage<InstallContent> = {
  en: {
    rev: "2026-08-20.2",
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
  },

  ar: {
    rev: "2026-08-20.2",
    translatedFromRev: "2026-08-20.2",
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
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.2",
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
  },
};
