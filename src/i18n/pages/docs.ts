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
  editionNoteTitle: string;
  editionNote: string[];
  /** Non-EN editions (FR-7): editorial summaries of the glossary and fiqh basis. */
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
    editionNoteTitle: "",
    editionNote: [],
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
    title: "وثائق كيل: المسرد والأساس الفقهي وكتب التشغيل",
    description:
      "المسرد والأساس الفقهي وكتب التشغيل وسجلّا التجارب والبحث — تُجلب وقت البناء من CodeGateSoftware/keel، ولا تُنسخ يدويًّا أبدًا.",
    intro: [
      "هذه مستندات محرّك كيل نفسها، تُعرض هنا وقت البناء من CodeGateSoftware/keel. لا شيء في هذه الصفحة معادٌ كتابتُه أو ملخَّصٌ يدويًّا: إذا انتقل مستندٌ مثبَّتٌ أو اختفى في الأعلى، فشل بناءُ هذا الموقع فشلًا صريحًا بدل عرض محتوًى متقادم.",
    ],
    howTitle: "كيف يعمل هذا",
    how: [
      "ملفُّ بيانٍ (engine-docs.manifest.json) يثبّت مسار كل مستندٍ في مستودع المحرّك. وفي كل بناء — بما فيه إعادة البناء الساعية — ينزّل سكربتُ الجلب كلَّ مستند، ويعيد كتابة الروابط النسبية لتشير إلى مصادرها على GitHub، ثم يعرضها البناء. ويفشل البناء عمدًا إذا أرجع أيُّ مسارٍ مثبَّتٍ الخطأ 404.",
    ],
    // AR docs edition: summaries of glossary/fiqh on the index + originals in EN.
    editionNoteTitle: "عن الطبعة العربية",
    editionNote: [
      "تُنشر وثائق المحرّك بالإنجليزية، وهي النصّ المرجعي. وتُلخّص الطبعةُ العربية أدناه المسردَ والأساس الفقهي، وتربطك بالمستندات الأصلية كاملةً بلغتها الأولى.",
    ],
    summariesTitle: "ملخّصان بالعربية",
    summaries: [
      {
        slug: "glossary",
        title: "ملخّص المسرد",
        body: [
          "المسرد هو المصدر الوحيد لمصطلحات كيل: فكلُّ مصطلحٍ يمكن أن تعرضه واجهةُ كيل النصية معرَّفٌ فيه وحده، وتُحيل إليه الوثائقُ بدل إعادة تعريفٍ قد يتقادم. وهو يحمل قاعدتَي صدقٍ ورثهما عن الأساس الفقهي: فالمصطلحات الفقهية مُسنَدةٌ إلى مصادرها لا مؤلَّفة — إذ تعريفُها اقتباسٌ حرفيٌّ من الأساس الفقهي مع سطرِ مصدرٍ يسمّي المستندَ والقسمَ بدقّة — وحيثما لم ينصّ الأساس على مصطلحٍ (كالغرر)، قال المسرد ذلك صراحةً بدل ردم الفجوة بصياغةٍ تُشبه الفتوى.",
          "أمّا وسائط القواعد فلا تُعرَّف في المسرد: فمعنى entry_lookback في turtle_breakout يسكن في صنف القاعدة الذي يُعرّفه، ويعرضه نظام المساعدة من هناك — إذ إنّ جدولًا ثانيًا هنا كان سيتقادم يوم يتغيّر ذلك الصنف.",
        ],
      },
      {
        slug: "fiqh-basis",
        title: "ملخّص الأساس الفقهي",
        body: [
          "مستندُ الأساس الفقهي مكتوبٌ لمطوّرٍ مسلمٍ يقرّر أن يأتمن كيلًا على ماله. وهو يبيّن، حكمًا حكمًا، الاستدلالَ الشرعي المُشفَّر في المستودع، وأين يسكن مصدرُ كلِّ حكمٍ داخله — ليكون الأساس قابلًا للتدقيق ممّن لا يعرف أين يبحث. وهو علمٌ بالإحالة: فكلُّ حكمٍ يحمل استشهادًا بمصدرٍ داخل المستودع، والشيفرةُ المُنفِّذة تحمل الاستشهادات نفسها في تعليقاتها.",
          "وما ليس عليه: فليس فتوى، ولا ادّعاءً بقدرة كيل على إنتاجها. ولم يراجع المستندَ عالمٌ؛ وهل تجري مراجعةٌ كهذه سؤالٌ مفتوحٌ عن قصد (#289)، وليس في المستند ما يُقرأ على أنها قد حدثت. وحيثما سكت مصدرٌ عن شيء، قيل «غير منصوص عليه» — فالفجوةُ لا تُردم أبدًا بصياغةٍ توهم حكمًا.",
        ],
      },
    ],
    readOriginal: "اقرأ المستند الأصلي كاملًا",
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-19.2",
    title: "Documentation keel : glossaire, base fiqh, runbooks",
    description:
      "Glossaire, base fiqh, runbooks opérateur et mise en production, comptes rendus d'expériences et recherche — récupérés au build depuis CodeGateSoftware/keel, jamais copiés à la main.",
    intro: [
      "Ce sont les documents du moteur keel eux-mêmes, affichés ici au moment du build depuis CodeGateSoftware/keel. Rien dans cette page n'est ressaisi ni résumé à la main : si un document épinglé est déplacé ou disparaît en amont, le build de ce site échoue bruyamment plutôt que d'afficher quelque chose de périmé.",
    ],
    howTitle: "Comment ça marche",
    how: [
      "Un manifeste (engine-docs.manifest.json) épingle le chemin de chaque document dans le dépôt du moteur. À chaque build — y compris la reconstruction horaire — le script de récupération télécharge chacun, réécrit les liens relatifs pour pointer vers leurs sources GitHub, puis le build les affiche. Le build échoue volontairement si un chemin épinglé renvoie 404.",
    ],
    editionNoteTitle: "À propos de l'édition française",
    editionNote: [
      "Les documents du moteur sont publiés en anglais et constituent le texte de référence. L'édition française ci-dessous résume le glossaire et la base fiqh, et renvoie aux documents originaux complets dans leur langue d'origine.",
    ],
    summariesTitle: "Deux résumés en français",
    summaries: [
      {
        slug: "glossary",
        title: "Résumé du glossaire",
        body: [
          "Le glossaire est l'unique source du vocabulaire de keel : chaque terme qu'une interface de keel peut afficher y est défini, et nulle part ailleurs — la documentation pointe vers lui plutôt que de redéfinir et risquer la dérive. Il hérite deux règles d'honnêteté de la base fiqh : les termes fiqh sont ancrés, jamais inventés — leur définition est une citation littérale de la base fiqh, avec une ligne de source nommant le document et la section exacte — et là où la base ne statue pas sur un terme (comme le gharar), le glossaire le dit explicitement au lieu de combler le vide d'une paraphrase ressemblant à un avis juridique.",
          "Les paramètres des règles n'y sont pas définis : ce que signifie entry_lookback dans turtle_breakout vit dans la classe qui le définit, affiché par introspection — un second tableau ici dériverait dès qu'une classe changerait.",
        ],
      },
      {
        slug: "fiqh-basis",
        title: "Résumé de la base fiqh",
        body: [
          "La base fiqh est écrite pour une développeuse ou un développeur musulman qui décide de confier de l'argent à keel. Elle énonce, règle par règle, le raisonnement Shariah encodé dans le dépôt, et où vit la source de chaque règle — pour que la base soit auditable par qui ne sait pas déjà où chercher. C'est de l'érudition par référence : chaque règle porte une citation vers une source du dépôt, et le code d'application porte les mêmes citations dans ses commentaires.",
          "Ce qu'elle n'est pas : une fatwa, ni la prétention que keel puisse en produire. Aucun savant n'a revu ce document ; l'éventualité d'une telle revue est une question délibérément ouverte (#289), et rien ici ne doit être lu comme si elle avait eu lieu. Quand une source se tait sur un point, on écrit « non statué » — le vide n'est jamais comblé par une formulation qui ressemblerait à un avis.",
        ],
      },
    ],
    readOriginal: "Lire le document original en entier",
  },
};
