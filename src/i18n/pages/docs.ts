import type { LocalizedPage } from "../config";

/**
 * Docs section (FR-4): intro copy for the docs index and doc-view pages.
 * The documents themselves are fetched at build time from the engine repo —
 * see scripts/fetch-engine-docs.mjs and engine-docs.manifest.json.
 */
export interface DocsSummary {
  slug: string;
  title: string;
  body: string[];
}

export interface DocsContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  howTitle: string;
  how: string[];
  arNoteTitle: string;
  arNote: string[];
  /** AR-only (FR-7): editorial summaries of the glossary and fiqh basis. */
  summariesTitle?: string;
  summaries?: DocsSummary[];
  readOriginal?: string;
  translatedFromRev?: string;
}

export const docs: LocalizedPage<DocsContent> = {
  en: {
    rev: "2026-08-19.2",
    title: "keel Docs: Glossary, Fiqh Basis, Runbooks",
    description:
      "Glossary, fiqh basis, operator and go-live runbooks, experiment records, and research — fetched at build from CodeGateSoftware/keel, never hand-copied.",
    intro: [
      "These are the keel engine's own documents, rendered here at build time from CodeGateSoftware/keel. Nothing on this page is retyped or summarized by hand: if a pinned document moves or disappears upstream, this site's build fails loudly instead of showing something stale.",
    ],
    howTitle: "How this works",
    how: [
      "A manifest (engine-docs.manifest.json) pins each document's path in the engine repository. At every build — including the hourly rebuild — the fetch script downloads each one, rewrites relative links to point at their GitHub sources, and the build renders them. The build fails on purpose if any pinned path 404s.",
    ],
    arNoteTitle: "",
    arNote: [],
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
    title: "وثائق كيل: المسرد والأساس الفقهي وكتب التشغيل",
    description:
      "المسرد والأساس الفقهي وكتب التشغيل وسجلّا التجارب والبحث — تُجلب وقت البناء من CodeGateSoftware/keel، ولا تُنسخ يدويًّا أبدًا.",
    intro: [
      "هذه مستندات محرّك كيل نفسها، تُعرض هنا وقت البناء من CodeGateSoftware/keel. لا شيء في هذه الصفحة معادٌ كتابتُه أو ملخَّصٌ يدويًّا: إذا انتقل مستندٌ مثبَّتٌ أو اختفى في الأعلى، فشل بناءُ هذا الموقع بصوتٍ عالٍ بدل عرض شيءٍ بالٍ.",
    ],
    howTitle: "كيف يعمل هذا",
    how: [
      "بيانٌ (engine-docs.manifest.json) يثبّت مسار كل مستندٍ في مستودع المحرّك. وفي كل بناء — بما فيه إعادة البناء الساعية — ينزّل سكربتُ الجلب كلَّ مستند، ويعيد كتابة الروابط النسبية لتشير إلى مصادرها على GitHub، ثم يعرضها البناء. ويفشل البناء عمدًا إذا أرجع أي مسارٍ مثبَّتٍ 404.",
    ],
    // AR docs edition: summaries of glossary/fiqh on the index + originals in EN.
    arNoteTitle: "عن الطبعة العربية",
    arNote: [
      "تُنشر وثائق المحرّك بالإنجليزية وهي النص المرجعي. تلخّص الطبعةُ العربية أدناه المسردَ والأساس الفقهي، وتربطك بالمستندات الأصلية كاملةً بلغتها الأولى.",
    ],
    summariesTitle: "ملخّصان بالعربية",
    summaries: [
      {
        slug: "glossary",
        title: "ملخّص المسرد",
        body: [
          "المسرد هو المصدر الوحيد لمصطلحات كيل: كل مصطلحٍ يمكن أن تعرضه واجهةُ كيل النصية معرَّفٌ فيه وحده، وتربط الوثائق به بدل إعادة تعريفٍ قد يتقادم. ويحمل قاعدتَي صدقٍ ورثهما عن الأساس الفقهي: المصطلحات الفقهية مُسنَدةٌ لا مؤلَّفة — تعريفُها اقتباسٌ حرفيٌّ من الأساس الفقهي مع سطرِ مصدرٍ يسمّي المستندَ والقسمَ الدقيقين — وحيث لم ينصّ الأساس على مصطلحٍ (كالغرر)، يقول المسرد ذلك صراحةً بدل ردم الفجوة بصياغةٍ تُشبه الفتوى.",
          "أمّا معاملات القواعد فلا تُعرَّف في المسرد: معنى entry_lookback في turtle_breakout يسكن الصفيفة التي تُعرّفه، ويعرضه نظام المساعدة من هناك — فجدولٌ ثانٍ هنا كان سيتقادم يوم تتغيّر الصفيفة.",
        ],
      },
      {
        slug: "fiqh-basis",
        title: "ملخّص الأساس الفقهي",
        body: [
          "مستند الأساس الفقهي مكتوبٌ لمطوّرٍ مسلمٍ يقرّر أن يأتمن كيلًا على ماله. يبيّن، حكمًا حكمًا، الاستدلالَ الشرعي المُشفَّر في المستودع، وأين يسكن مصدرُ كل حكمٍ داخله — ليكون الأساس قابلًا للتدقيق ممن لا يعرف أين يبحث. إنه علمٌ بالإحالة: كل حكمٍ يحمل استشهادًا بمصدرٍ داخل المستودع، والشيفرةُ المُنفِّذة تحمل الاستشهادات نفسها في تعليقاتها.",
          "وما ليس هو: فتوى، ولا ادّعاءٌ بقدرة كيل على إنتاجها. لم يراجع المستندَ عالمٌ؛ وهل تجري مراجعةٌ كهذه سؤالٌ مفتوحٌ عن قصد (#289)، ولا شيء فيه يُقرأ على أنه حدثت. وحيثما صمتّ مصدرٌ عن شيء، قيل «غير منصوص» — فالفجوةُ لا تُردم أبدًا بصياغةٍ توهم حكمًا.",
        ],
      },
    ],
    readOriginal: "اقرأ المستند الأصلي كاملًا",
  },
};
