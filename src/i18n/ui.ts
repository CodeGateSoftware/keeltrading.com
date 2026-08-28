import type { Locale } from "./config";

/**
 * Site chrome strings (nav, footer, shared labels). Page prose lives in
 * src/i18n/pages/*.ts. Arabic terminology follows the engine repo's own
 * README.ar.md so both projects speak one language.
 */
export const ui = {
  en: {
    skip: "Skip to content",
    nav: {
      home: "Home",
      features: "Features",
      install: "Install",
      docs: "Docs",
      assistant: "AI assistant",
      news: "News",
      changelog: "Changelog",
      community: "Community",
      compliance: "Compliance",
      compare: "Compare",
      about: "About",
    },
    actions: {
      install: "Install",
      readDocs: "Read the docs",
      viewOnGitHub: "View on GitHub",
      readOnGitHub: "Read on GitHub",
      viewSource: "View source on GitHub",
      seeReleases: "See releases on GitHub",
      discussOnGitHub: "Discuss on GitHub",
    },
    code: {
      copy: "Copy",
      copied: "Copied ✓",
      copyAria: "Copy the command to the clipboard",
    },
    tracks: {
      plainLabel: "Plain English",
      operatorsLabel: "For operators",
      operatorsHint:
        "Technically minded? Here is the same project from the operator's seat: runbooks, CLI references and the engine source.",
    },
    banner: {
      staleTitle: "This translation may be behind the English original",
      staleBody:
        "The English page has changed since this translation was reviewed. Read the English original for the current wording.",
      staleLink: "Read the English page",
    },
    marker: {
      translatedAgainst: (rev: string) =>
        `Last translated against English revision ${rev}.`,
      untranslatedOriginal: "Original document — shown in English",
    },
    docs: {
      /**
       * `repo at ref`, never `repo@ref` (#93). Cloudflare's Email Address
       * Obfuscation matched `keel@v0.11.2` as an address and replaced the
       * version with an obfuscated mailto link in production — deleting the
       * exact fact #85 added this line to show. `main` survived only because
       * it has no dot after the `@`.
       */
      fetchedFrom: (repo: string, ref: string) =>
        `Fetched at build time from ${repo} at ${ref}. If a document moves, the build fails — this site never renders stale docs.`,
      backToDocs: "All documents",
      fetchedAt: (date: string) => `Last fetched ${date}.`,
      originalLanguageNote:
        "Engine documents are published in English. The Arabic edition summarizes them; the originals remain the authoritative text.",
      notTranslated: "This document is not translated. It is shown in English in its original form.",
      /** #85 — shown only when keel's ?v= differs from the tag the docs were built from. */
      versionSkewTitle: "These pages describe a different keel version",
      versionSkew: (running: string, built: string) =>
        `You're running keel ${running}. These pages describe ${built}.`,
      versionSkewLink: "See what changed",
    },
    news: {
      from: "Announcements from GitHub Discussions",
      fetchedAt: (date: string) => `Feed last refreshed ${date} (hourly rebuild).`,
      empty:
        "No announcements fetched yet. Read them directly on GitHub — the feed fills in on the next rebuild.",
      interactOnGitHub:
        "Bodies render in their original language; reading and replying happen on GitHub, not here.",
      comments: (n: number) => (n === 1 ? "1 comment" : `${n} comments`),
      secondary: "Show and tell — what the community builds with keel",
      secondaryEmpty:
        "No show-and-tell posts fetched yet. Browse the category on GitHub — items fill in on the next rebuild.",
    },
    install: {
      latest: (tag: string) => `Latest release: ${tag}`,
      unknown: "Latest release unknown right now — open the releases page on GitHub",
      neverMirrored:
        "Downloads link directly to GitHub assets. This site never mirrors binaries.",
      copiedAtBuild: (date: string) => `Version data fetched from GitHub at build time, ${date}.`,
    },
    footer: {
      disclaimerTitle: "Standing disclaimers",
      disclaimer:
        "keel is a personal tool — not financial advice, and not a fatwa or religious advice. Consult a qualified financial advisor and a knowledgeable scholar before trading. You are solely responsible for your trading decisions and for your own attestations.",
      trademark:
        "Alpaca, Coinbase and Robinhood are trademarks of their respective owners. keel is not affiliated with, endorsed by, or sponsored by any of them. Venue names appear solely to identify what the code talks to.",
      keelsh:
        "Not affiliated with the Kubernetes project also named Keel (keel.sh).",
      license:
        "Engine: Apache-2.0 (CodeGateSoftware/keel). This site's code: MIT. Site content: © CodeGate Software — quoting with attribution is welcome.",
      honesty: "The honest result, stated first",
    },
    localeSwitcher: {
      label: "Language",
    },
    notFound: {
      title: "Page not found",
      body: "This page does not exist. The site is published in these editions:",
    },
  },

  ar: {
    skip: "انتقل إلى المحتوى",
    nav: {
      home: "الرئيسية",
      features: "الخصائص",
      install: "التثبيت",
      docs: "الوثائق",
      assistant: "المساعد الذكي",
      news: "الأخبار",
      changelog: "سجلُّ التغييرات",
      community: "المجتمع",
      compliance: "الامتثال",
      compare: "مقارنة",
      about: "حول المشروع",
    },
    actions: {
      install: "ثبّت كيل",
      readDocs: "اقرأ الوثائق",
      viewOnGitHub: "اعرضه على GitHub",
      readOnGitHub: "اقرأه على GitHub",
      viewSource: "اعرض الشيفرة المصدرية على GitHub",
      seeReleases: "اطّلع على الإصدارات في GitHub",
      discussOnGitHub: "ناقِش على GitHub",
    },
    code: {
      copy: "نسخ",
      copied: "تم النسخ ✓",
      copyAria: "انسخ الأمر إلى الحافظة",
    },
    tracks: {
      plainLabel: "بلغةٍ مبسّطة",
      operatorsLabel: "للمشغّلين",
      operatorsHint:
        "إن كنت تقنيًّا فهذا هو المشروع نفسه من مقعد المشغّل: كتب التشغيل، ومراجع سطر الأوامر، وشيفرة المحرّك.",
    },
    banner: {
      staleTitle: "قد تكون هذه الترجمة متأخّرة عن الأصل الإنجليزي",
      staleBody:
        "تغيّرت الصفحة الإنجليزية بعد مراجعة هذه الترجمة. اقرأ الأصل الإنجليزي للاطّلاع على الصياغة الحالية.",
      staleLink: "اقرأ الصفحة الإنجليزية",
    },
    marker: {
      translatedAgainst: (rev: string) => `تُرجمت هذه الصفحة عن المراجعة الإنجليزية ${rev}.`,
      untranslatedOriginal: "مستندٌ أصلي — يُعرض بالإنجليزية",
    },
    docs: {
      fetchedFrom: (repo: string, ref: string) =>
        `جُلب وقت البناء من ${repo} عند ${ref}. وإن نُقل مستندٌ من موضعه فشل البناء — فهذا الموقع لا يعرض وثائق متقادمة أبدًا.`,
      backToDocs: "كل المستندات",
      fetchedAt: (date: string) => `آخر جلبٍ في ${date}.`,
      originalLanguageNote:
        "تُنشر وثائق المحرّك بالإنجليزية. وتُلخّصها النسخة العربية، وتبقى النصوص الأصلية هي المرجع المعتمد.",
      notTranslated: "هذا المستند غير مترجم؛ يُعرض بالإنجليزية بصيغته الأصلية.",
      versionSkewTitle: "تصف هذه الصفحات إصدارًا آخر من كيل",
      versionSkew: (running: string, built: string) =>
        `أنت تشغّل كيل ${running}. وتصف هذه الصفحات ${built}.`,
      versionSkewLink: "اطّلع على ما تغيّر",
    },
    news: {
      from: "إعلاناتٌ من نقاشات GitHub",
      fetchedAt: (date: string) => `آخر تحديثٍ للخلاصة في ${date} (إعادة بناءٍ كل ساعة).`,
      empty:
        "لم تُجلب أي إعلانات بعد. اقرأها مباشرةً على GitHub — وستمتلئ الخلاصة عند إعادة البناء القادمة.",
      interactOnGitHub: "تُعرض النصوص بلغتها الأصلية؛ أمّا القراءة والردّ فيحدثان على GitHub لا هنا.",
      comments: (n: number) =>
        n === 0
          ? "لا تعليقات"
          : n === 1
            ? "تعليقٌ واحد"
            : n === 2
              ? "تعليقان"
              : n % 100 >= 3 && n % 100 <= 10
                ? `${n} تعليقات`
                : `${n} تعليقًا`,
      secondary: "‏Show and tell — ما يبنيه المجتمع بكيل",
      secondaryEmpty:
        "لم تُجلب أي مشاركات في «Show and tell» بعد. تصفَّح الفئة على GitHub — وستمتلئ الخلاصة عند إعادة البناء القادمة.",
    },
    install: {
      latest: (tag: string) => `أحدث إصدار: ${tag}`,
      unknown: "تعذّرت معرفة أحدث إصدارٍ الآن — افتح صفحة الإصدارات على GitHub",
      neverMirrored:
        "تشير روابط التنزيل مباشرةً إلى ملفات GitHub. وهذا الموقع لا ينسخ الملفات التنفيذية أبدًا.",
      copiedAtBuild: (date: string) => `جُلبت بيانات الإصدار من GitHub وقت البناء، في ${date}.`,
    },
    footer: {
      disclaimerTitle: "تنبيهاتٌ دائمة",
      disclaimer:
        "كيل أداةٌ شخصية — وليس نصيحةً مالية، ولا فتوى، ولا نصيحةً شرعية. استشر مستشارًا ماليًّا مؤهّلًا وعالمًا شرعيًّا قبل التداول. وأنت وحدك المسؤول عن قراراتك في التداول وعن توثيقاتك الخاصة.",
      trademark:
        "‏Alpaca وCoinbase وRobinhood علاماتٌ تجارية لأصحابها. ولا صلة لكيل بأيٍّ منها، ولا تأييد منها له، ولا رعاية. ولا تظهر أسماء المنصّات إلا لتحديد ما تتعامل معه الشيفرة.",
      keelsh: "لا صلة لنا بمشروع Kubernetes المسمّى أيضًا Keel‏ (keel.sh).",
      license:
        "المحرّك: Apache-2.0‏ (CodeGateSoftware/keel). شيفرة هذا الموقع: MIT. محتوى الموقع: © CodeGate Software — والاقتباس مع الإسناد مرحّبٌ به.",
      honesty: "النتيجة الصادقة، نقولها أولًا",
    },
    localeSwitcher: {
      label: "اللغة",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      body: "هذه الصفحة غير موجودة. ويتوفّر الموقع بالطبعات التالية:",
    },
  },

  fr: {
    skip: "Aller au contenu",
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      install: "Installation",
      docs: "Documentation",
      assistant: "Assistant IA",
      news: "Actualités",
      changelog: "Journal des versions",
      community: "Communauté",
      compliance: "Conformité",
      compare: "Comparatif",
      about: "À propos",
    },
    actions: {
      install: "Installer",
      readDocs: "Lire la documentation",
      viewOnGitHub: "Voir sur GitHub",
      readOnGitHub: "Lire sur GitHub",
      viewSource: "Voir le code source sur GitHub",
      seeReleases: "Voir les versions sur GitHub",
      discussOnGitHub: "En discuter sur GitHub",
    },
    code: {
      copy: "Copier",
      copied: "Copié ✓",
      copyAria: "Copier la commande dans le presse-papiers",
    },
    tracks: {
      plainLabel: "En clair",
      operatorsLabel: "Pour les opérateurs",
      operatorsHint:
        "Profil technique ? Voici le même projet vu du poste de l'opérateur : runbooks, références de la ligne de commande et code source du moteur.",
    },
    banner: {
      staleTitle: "Cette traduction a peut-être pris du retard sur l'original anglais",
      staleBody:
        "La page anglaise a changé depuis la relecture de cette traduction. Pour la formulation en vigueur, reportez-vous à l'original.",
      staleLink: "Lire la page en anglais",
    },
    marker: {
      translatedAgainst: (rev: string) =>
        `Traduit d'après la révision anglaise ${rev}.`,
      untranslatedOriginal: "Document original — affiché en anglais",
    },
    docs: {
      fetchedFrom: (repo: string, ref: string) =>
        `Récupéré au moment du build depuis ${repo} à ${ref}. Si un document change de place, le build échoue : ce site n'affiche jamais de documentation périmée.`,
      backToDocs: "Tous les documents",
      fetchedAt: (date: string) => `Dernière récupération : ${date}.`,
      originalLanguageNote:
        "Les documents du moteur paraissent en anglais. L'édition française les résume ; les originaux font foi.",
      notTranslated: "Ce document n'est pas traduit : il est affiché en anglais, dans sa forme d'origine.",
      versionSkewTitle: "Ces pages décrivent une autre version de keel",
      versionSkew: (running: string, built: string) =>
        `Vous utilisez keel ${running}. Ces pages décrivent ${built}.`,
      versionSkewLink: "Voir ce qui a changé",
    },
    news: {
      from: "Annonces publiées dans les Discussions GitHub",
      fetchedAt: (date: string) => `Flux actualisé le ${date} (reconstruction toutes les heures).`,
      empty:
        "Aucune annonce récupérée pour l'instant. Lisez-les directement sur GitHub : le flux se remplira à la prochaine reconstruction.",
      interactOnGitHub:
        "Les textes s'affichent dans leur langue d'origine ; la lecture et les réponses se passent sur GitHub, pas ici.",
      comments: (n: number) =>
        n === 0 ? "Aucun commentaire" : n === 1 ? "1 commentaire" : `${n} commentaires`,
      secondary: "Show and tell — ce que la communauté construit avec keel",
      secondaryEmpty:
        "Aucune présentation « show and tell » récupérée pour l'instant. Parcourez la catégorie sur GitHub : le flux se remplira à la prochaine reconstruction.",
    },
    install: {
      latest: (tag: string) => `Dernière version : ${tag}`,
      unknown: "Dernière version indisponible pour l'instant — ouvrez la page des versions sur GitHub",
      neverMirrored:
        "Les téléchargements pointent directement vers les fichiers hébergés par GitHub. Ce site n'héberge aucun binaire.",
      copiedAtBuild: (date: string) => `Données de version récupérées depuis GitHub au moment du build, le ${date}.`,
    },
    footer: {
      disclaimerTitle: "Avertissements permanents",
      disclaimer:
        "keel est un outil personnel : ni conseil financier, ni fatwa, ni conseil religieux. Consultez un conseiller financier qualifié et un savant compétent avant de trader. Vous restez seul responsable de vos décisions de trading et de vos propres attestations.",
      trademark:
        "Alpaca, Coinbase et Robinhood sont des marques déposées par leurs propriétaires respectifs. keel n'a aucun lien avec elles et ne bénéficie ni de leur aval ni de leur parrainage. Leurs noms n'apparaissent ici que pour désigner ce à quoi le code se connecte.",
      keelsh:
        "Sans lien avec le projet Kubernetes qui porte lui aussi le nom Keel (keel.sh).",
      license:
        "Moteur : Apache-2.0 (CodeGateSoftware/keel). Code de ce site : MIT. Contenu du site : © CodeGate Software — la citation avec attribution est bienvenue.",
      honesty: "Le résultat honnête, annoncé d'emblée",
    },
    localeSwitcher: {
      label: "Langue",
    },
    notFound: {
      title: "Page introuvable",
      body: "Cette page n'existe pas. Le site est publié dans les éditions suivantes :",
    },
  },
} as const;

/** Native names, shown in the header's language pills. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
};

export type Ui = (typeof ui)["en"];

export function t(locale: Locale): Ui {
  return ui[locale] as Ui;
}
