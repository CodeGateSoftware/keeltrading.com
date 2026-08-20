import type { LocalizedPage } from "../config";

/**
 * Install (FR-2/FR-6): the version number, asset links, and snippet versions
 * come from data/release.json (fetched at build from the GitHub Releases REST
 * endpoint). The page template interpolates them — copy-paste commands must
 * never show a stale version.
 *
 * Both install paths are quoted from the engine repo: the five-minute paper
 * path from its README, the wheels path from its release notes (v0.10.0),
 * including the never-pip-install-keel PyPI collision warning.
 */
export interface InstallContent {
  rev: string;
  title: string;
  description: string;
  fromSource: {
    title: string;
    lead: string;
    requirements: string[];
    expectTitle: string;
    expect: string;
    next: string;
  };
  fromRelease: {
    title: string;
    lead: string;
    steps: { title: string; body: string }[];
    warning: string;
  };
  translatedFromRev?: string;
}

export const install: LocalizedPage<InstallContent> = {
  en: {
    rev: "2026-08-19.2",
    title: "Install keel — From Source or GitHub Releases",
    description:
      "Two ways to get keel: a five-minute read-only trial from source, or a release's wheels. Versions and links come from GitHub Releases at build time.",
    fromSource: {
      title: "Try it in five minutes — from source",
      lead: "Everything in this path is read-only and paper-side: no funds, and nothing here can place an order. You need uv and a free, read-only Coinbase Developer Platform (CDP) API key — candle history is fetched through the authenticated client, so keel fetch without a key fails with an AuthenticationError. Said upfront so step four is not a surprise.",
      requirements: ["uv (the Python package manager)", "Any Python 3.11+ (the repo develops on 3.14)", "A free, read-only CDP API key — market data only"],
      expectTitle: "What you should expect",
      expect: "keel simulate replays the real rules deterministically over the fetched history, compares against a DCA benchmark, and writes a GO-LIVE / TRAIN-MORE report. On the default rules it will very likely tell you TRAIN MORE and name the gates that fail — that is the engine working, not broken; the honesty is the feature.",
      next: "The next steps — promoting a rule through the gate, running the paper agent, a supervised first live order — are in the go-live runbook.",
    },
    fromRelease: {
      title: "Install a release",
      lead: "Releases ship as wheel sets on GitHub Releases. The buttons below link directly to GitHub — this site never mirrors binaries.",
      steps: [
        {
          title: "Download all wheels into one directory",
          body: "Grab every wheel from the latest release page into a single directory (the buttons below link there — never a mirror).",
        },
        {
          title: "Install keel_trader by path",
          body: "pip install --find-links . ./keel_trader-<version>-py3-none-any.whl — the exact command for the current release is in the panel above.",
        },
        {
          title: "Check with keel versions — not --version",
          body: "keel versions reports every keel distribution in the venv and exits non-zero if a sibling was left behind at an older version, which --version cannot see.",
        },
      ],
      warning: "Never install by bare name. The distribution is keel-trader; the name keel on PyPI belongs to an unrelated project, so pip install keel fetches someone else's package. A build reporting DIRTY or [checkout] is not a release and must not be run against live funds.",
    },
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
    title: "تثبيت كيل — من المصدر أو من إصدارات GitHub",
    description:
      "طريقتان للحصول على كيل: تجربةٌ في خمس دقائق من المصدر للقراءة فقط، أو تثبيت عجلات إصدار. الإصدارات والروابط من GitHub Releases وقت البناء.",
    fromSource: {
      title: "جرّبه في خمس دقائق — من المصدر",
      lead: "كلُّ ما في هذا المسار للقراءة فقط ومن جهة التداول الافتراضي (paper): لا أموال، ولا شيء هنا يستطيع تقديم أمر تداول. تحتاج uv ومفتاح API لمنصّة Coinbase Developer Platform‏ (CDP) مجانيًّا للقراءة فقط — تُجلب بيانات الشموع عبر العميل المُصادَق، لذا يفشل keel fetch من دون مفتاحٍ بخطأ AuthenticationError؛ نقولها مقدمًا كي لا تكون مفاجأةً في الخطوة الرابعة.",
      requirements: ["‏uv (مدير حزم Python)", "أي Python من 3.11 فما فوق (المستودع يُطوَّر على 3.14)", "مفتاح CDP مجاني للقراءة فقط — لبيانات السوق حصرًا"],
      expectTitle: "ما يجب أن تتوقّع",
      expect: "يعيد keel simulate تشغيل القواعد الحقيقية حتميًّا فوق التاريخ المجلوب، ويقارنها بمقياس DCA، ويكتب تقرير GO-LIVE أو TRAIN-MORE. وعلى القواعد الافتراضية سيخبرك على الأرجح TRAIN MORE ويسمّي البوابات الفاشلة — فهذا المحرّك يعمل، لا أنه معطّل؛ الصدق هو الخصيصة.",
      next: "الخطوات التالية — ترقية قاعدةٍ عبر البوابة، وتشغيل الوكيل الافتراضي، وأول أمرٍ حيٍّ خاضعٍ لإشراف بشري — في كتاب الانتقال إلى الحيّ (go-live runbook).",
    },
    fromRelease: {
      title: "تثبيت إصدار",
      lead: "تُسلَّم الإصدارات مجموعاتِ عجلاتٍ على GitHub Releases. الأزرار أدناه تربط مباشرةً ب GitHub — وهذا الموقع لا ينسخ الملفات التنفيذية أبدًا.",
      steps: [
        {
          title: "نزّل كل العجلات إلى مجلدٍ واحد",
          body: "خذ كل عجلةٍ من صفحة أحدث إصدار إلى مجلدٍ واحد (الأزرار أدناه تربط بها — لا بنسخةٍ معكوسة أبدًا).",
        },
        {
          title: "ثبّت keel_trader بالمسار",
          body: "‏pip install --find-links . ./keel_trader-<الإصدار>-py3-none-any.whl — الأمر الدقيق للإصدار الحالي في اللوحة أعلاه.",
        },
        {
          title: "تحقّق بـ keel versions — لا بـ --version",
          body: "يعرض keel versions كل توزيعات كيل في البيئة الافتراضية ويخرج بخطأٍ إن بقيت توزيعةٌ شقيقةٌ على إصدارٍ أقدم — وهو ما لا يراه --version.",
        },
      ],
      warning: "لا تثبّت بالاسم المجرد أبدًا. التوزيعة اسمها keel-trader؛ أما اسم keel على PyPI فلمشروعٍ آخر لا علاقة له بنا، فأمر pip install keel يجلب حزمة غيرنا. والبنية التي تُظهر DIRTY أو [checkout] ليست إصدارًا ويُمنع تشغيلها على أموالٍ حيّة.",
    },
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-19.2",
    title: "Installer keel — depuis les sources ou les versions GitHub",
    description:
      "Deux façons d'obtenir keel : l'essayer en cinq minutes depuis les sources (lecture seule, côté papier), ou installer les wheels d'une version. Numéros de version et liens viennent de GitHub Releases au build.",
    fromSource: {
      title: "Essayez-le en cinq minutes — depuis les sources",
      lead: "Tout dans ce parcours est en lecture seule et côté papier : aucun fonds, et rien ici ne peut passer d'ordre. Il vous faut uv et une clé API Coinbase Developer Platform (CDP) gratuite en lecture seule — l'historique de chandeliers passe par le client authentifié, donc keel fetch sans clé échoue avec une AuthenticationError ; dit d'avance pour que l'étape 4 ne soit pas une surprise.",
      requirements: ["uv (le gestionnaire de paquets Python)", "Python 3.11 ou plus (le dépôt se développe sur 3.14)", "Une clé CDP gratuite en lecture seule — données de marché uniquement"],
      expectTitle: "À quoi vous attendre",
      expect: "keel simulate rejoue les règles réelles de façon déterministe sur l'historique récupéré, compare au repère DCA et écrit un rapport GO-LIVE / TRAIN-MORE. Sur les règles par défaut, il vous dira très probablement TRAIN MORE en nommant les portes qui échouent — c'est le moteur qui fonctionne, pas une panne ; l'honnêteté est la fonctionnalité.",
      next: "Les étapes suivantes — promouvoir une règle par la porte, lancer l'agent papier, un premier ordre réel supervisé — sont dans le runbook de mise en production.",
    },
    fromRelease: {
      title: "Installer une version",
      lead: "Les versions sont livrées en jeux de wheels sur GitHub Releases. Les boutons ci-dessous pointent directement vers GitHub — ce site ne copie jamais les binaires.",
      steps: [
        {
          title: "Télécharger toutes les wheels dans un répertoire",
          body: "Prenez chaque wheel de la page de la dernière version dans un seul répertoire (les boutons ci-dessous y mènent — jamais un miroir).",
        },
        {
          title: "Installer keel_trader par chemin",
          body: "pip install --find-links . ./keel_trader-<version>-py3-none-any.whl — la commande exacte pour la version en cours est dans le panneau ci-dessus.",
        },
        {
          title: "Vérifier avec keel versions — pas --version",
          body: "keel versions rapporte chaque distribution keel du venv et échoue si une distribution sœur est restée à une version plus ancienne — ce que --version ne voit pas.",
        },
      ],
      warning: "N'installez jamais par nom nu. La distribution s'appelle keel-trader ; le nom keel sur PyPI appartient à un projet sans rapport, donc pip install keel récupère le paquet de quelqu'un d'autre. Un build qui affiche DIRTY ou [checkout] n'est pas une version et ne doit jamais tourner sur des fonds réels.",
    },
  },
};
