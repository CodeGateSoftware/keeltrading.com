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
      news: "News",
      community: "Community",
      compliance: "Compliance",
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
    tracks: {
      plainLabel: "Plain English",
      operatorsLabel: "For operators",
      operatorsHint:
        "Technical? This is the same project from the operator's seat: runbooks, CLI references, and the engine source.",
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
      fetchedFrom: (repo: string, ref: string) =>
        `Fetched at build time from ${repo}@${ref}. If a document moves, the build fails — this site never renders stale docs.`,
      backToDocs: "All documents",
      fetchedAt: (date: string) => `Last fetched ${date}.`,
      originalLanguageNote:
        "Engine documents are published in English. The Arabic edition summarizes them; the originals remain the authoritative text.",
      notTranslated: "This document is not translated. It is shown in English in its original form.",
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
        "Alpaca, Coinbase, and Robinhood are trademarks of their respective owners. keel has no affiliation with, endorsement from, or sponsorship from any of them. Venue names appear solely to identify what the code talks to.",
      keelsh:
        "Not affiliated with the Kubernetes project also named Keel (keel.sh).",
      license:
        "Engine: Apache-2.0 (CodeGateSoftware/keel). This site's code: MIT. Site content: © CodeGate Software — quoting with attribution is welcome.",
      honesty: "The honest result, stated first",
    },
    localeSwitcher: {
      label: "Language",
      other: { en: "العربية", ar: "English" } as Record<Locale, string>,
    },
    notFound: {
      title: "Page not found",
      body: "This page does not exist. The site lives in two editions:",
    },
  },

  ar: {
    skip: "تخطَّ إلى المحتوى",
    nav: {
      home: "الرئيسية",
      features: "الخصائص",
      install: "التثبيت",
      docs: "الوثائق",
      news: "الأخبار",
      community: "المجتمع",
      compliance: "الامتثال",
      about: "حول",
    },
    actions: {
      install: "ثبّته",
      readDocs: "اقرأ الوثائق",
      viewOnGitHub: "المشروع على GitHub",
      readOnGitHub: "اقرأ على GitHub",
      viewSource: "المصدر على GitHub",
      seeReleases: "الإصدارات على GitHub",
      discussOnGitHub: "ناقش على GitHub",
    },
    tracks: {
      plainLabel: "بالعربية المبسّطة",
      operatorsLabel: "للمشغّلين",
      operatorsHint:
        "أنت تقني؟ هذا المشروع نفسه من مقعد المشغّل: كتب التشغيل، ومراجع سطر الأوامر، وشيفرة المحرّك.",
    },
    banner: {
      staleTitle: "قد تكون هذه الترجمة متأخّرة عن الأصل الإنجليزي",
      staleBody:
        "تغيّرت الصفحة الإنجليزية منذ مراجعة هذه الترجمة. للصياغة الحالية اقرأ الأصل الإنجليزي.",
      staleLink: "اقرأ الصفحة الإنجليزية",
    },
    marker: {
      translatedAgainst: (rev: string) => `آخر ترجمة عن المراجعة الإنجليزية ${rev}.`,
      untranslatedOriginal: "مستند أصلي — يُعرض بالإنجليزية",
    },
    docs: {
      fetchedFrom: (repo: string, ref: string) =>
        `يُجلَب وقت البناء من ${repo}@${ref}. إن انتقل مستند فشل البناء — هذا الموقع لا يعرض وثائق بالية أبدًا.`,
      backToDocs: "كل المستندات",
      fetchedAt: (date: string) => `آخر جلب ${date}.`,
      originalLanguageNote:
        "تُنشر وثائق المحرّك بالإنجليزية. يلخّصها الموقع العربي، وتبقى النصوص الأصلية هي المرجع.",
      notTranslated: "هذا المستند غير مترجم؛ يُعرض بالإنجليزية بصيغته الأصلية.",
    },
    news: {
      from: "إعلانات من نقاشات GitHub",
      fetchedAt: (date: string) => `آخر تحديث للخلاصة ${date} (إعادة بناء كل ساعة).`,
      empty: "لا إعلانات مجلوبة بعد. اقرأها مباشرةً على GitHub — تمتلئ الخلاصة في إعادة البناء القادمة.",
      interactOnGitHub: "تُعرض النصوص بلغتها الأصلية؛ والقراءة والردّ تحدث على GitHub لا هنا.",
      comments: (n: number) => (n === 1 ? "تعليق واحد" : `${n} تعليقًا`),
      secondary: "Show and tell — ما يبنيه المجتمع بكيل",
    },
    install: {
      latest: (tag: string) => `أحدث إصدار: ${tag}`,
      unknown: "تعذّر معرفة أحدث إصدار الآن — افتح صفحة الإصدارات على GitHub",
      neverMirrored: "تنزل التحميلات مباشرةً من أصول GitHub. هذا الموقع لا ينسخ الملفات التنفيذية أبدًا.",
      copiedAtBuild: (date: string) => `بيانات الإصدار مجلوبة من GitHub وقت البناء، ${date}.`,
    },
    footer: {
      disclaimerTitle: "تنبيهات دائمة",
      disclaimer:
        "كيل أداة شخصية — ليست نصيحة مالية، وليست فتوى ولا نصيحة شرعية. استشر مستشارًا ماليًا مؤهّلًا وعالمًا شرعيًا قبل التداول. أنت وحدك المسؤول عن قراراتك في التداول وعن توثيقاتك الخاصّة.",
      trademark:
        "Alpaca وCoinbase وRobinhood علامات تجارية لأصحابها. لا انتماء لكيل مع أيٍّ منها، ولا تصريح منها، ولا رعاية. لا تظهر أسماء المنصّات إلا لتحديد ما تتحدث إليه الشيفرة.",
      keelsh: "غير منتسبٍ إلى مشروع Kubernetes المسمّى أيضًا Keel‏ (keel.sh).",
      license:
        "المحرّك: Apache-2.0‏ (CodeGateSoftware/keel). شيفرة هذا الموقع: MIT. محتوى الموقع: © CodeGate Software — الاقتباس مع الإسناد مرحّب به.",
      honesty: "النتيجة الصادقة، نقولها أولًا",
    },
    localeSwitcher: {
      label: "اللغة",
      other: { en: "العربية", ar: "English" } as Record<Locale, string>,
    },
    notFound: {
      title: "الصفحة غير موجودة",
      body: "هذه الصفحة غير موجودة. للموقع طبعتان:",
    },
  },
} as const;

export type Ui = (typeof ui)["en"];

export function t(locale: Locale): Ui {
  return ui[locale] as Ui;
}
