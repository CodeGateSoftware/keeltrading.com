import type { LocalizedPage } from "../config";

/**
 * Roadmap (#117): intro and section chrome. The milestones themselves come
 * from data/milestones.json (scripts/fetch-milestones.mjs reads the repo's
 * GitHub milestones at build time; the hourly rebuild refreshes them).
 * Milestone and issue text stays in its original language — it is the repo's
 * own wording, never rewritten or translated here.
 *
 * Honesty (#117 / FR-9): an open milestone is an intention, not a
 * commitment; a due date is a target, not a promise; undated milestones say
 * so instead of inventing a date. No voting, no accounts, no subscribe box.
 *
 * Sonar: parallel tri-locale blocks trip the duplication gate otherwise —
 * see CONTRIBUTING.md; fields stay flat single strings / small functions.
 */
export interface RoadmapContent {
  title: string;
  description: string;
  intro: string[];
  /** Section heading above the open milestones. */
  openTitle: string;
  /** Section heading above the recently closed milestones. */
  closedTitle: string;
  /** #129 — the chronological journey, oldest first. */
  journeyTitle: string;
  journeyIntro: string;
  /** Milestone due date, when the repo sets one. */
  dueOn: (date: string) => string;
  /** A milestone with no due date says so — never an invented date. */
  noDate: string;
  /** Closed milestone, with the date GitHub recorded. */
  closedOn: (date: string) => string;
  /** Progress line: N of M items closed, straight from the repo's counts. */
  progress: (closed: number, total: number) => string;
  /** Item state markers. */
  itemOpen: string;
  itemDone: string;
  pullRequest: string;
  /** Overflow beyond the per-milestone item cap. */
  moreOnGitHub: (count: number) => string;
  /** Degraded-state copy (fetch failed and no last-known data). */
  empty: string;
  viewMilestone: string;
  /** The read-of-the-repo / refresh cadence line. */
  refreshedAt: (date: string) => string;
}

export const roadmap: LocalizedPage<RoadmapContent> = {
  en: {
    rev: "2026-08-29.1",
    title: "keel Roadmap — read from the repo, refreshed hourly",
    description:
      "keel's roadmap: the open milestones of CodeGateSoftware/keel and the issues under them, read from GitHub at build time. An open milestone is an intention, not a commitment.",
    intro: [
      "This page is a read of the project's own working plan — the milestones on GitHub and the issues under them, exactly as the repo tracks them. Every item links to its issue, where discussion already happens; nothing here is voted on, and nothing here can be bought ahead of anything else.",
      "An open milestone is an intention, not a commitment, and a date on one is a target, not a promise. Work ships when it is honest to say it shipped — the changelog records what actually landed.",
    ],
    openTitle: "In progress — open milestones",
    journeyTitle: "The journey so far",
    journeyIntro:
      "Every closed milestone, oldest first — the project's history read straight from the repository, dated by GitHub on the day each phase actually finished. No narrative was written after the fact; this is the record.",
    closedTitle: "Recently shipped",
    dueOn: (date) => `Target date: ${date}`,
    noDate: "No date set",
    closedOn: (date) => `Shipped ${date}`,
    progress: (closed, total) => `${closed} of ${total} items closed`,
    itemOpen: "open",
    itemDone: "done",
    pullRequest: "PR",
    moreOnGitHub: (count) => `and ${count} more on GitHub`,
    empty: "The roadmap could not be fetched for this build. Read the milestones directly on GitHub.",
    viewMilestone: "View this milestone on GitHub",
    refreshedAt: (date) =>
      `Read from the repo's GitHub milestones at build time; refreshed hourly — last read ${date}.`,
  },

  ar: {
    rev: "2026-08-29.1",
    translatedFromRev: "2026-08-29.1",
    title: "خارطةُ طريق كيل — تُقرأ من المستودع وتتجدّد كل ساعة",
    description:
      "خارطةُ طريق كيل: المراحلُ المفتوحة في CodeGateSoftware/keel والبنودُ تحتها، تُجلب من GitHub وقت البناء. والمرحلةُ المفتوحة نيّةٌ لا التزام.",
    intro: [
      "هذه الصفحة قراءةٌ لخطة عمل المشروع نفسه — المراحلُ على GitHub والبنودُ تحتها، تمامًا كما يتتبّعها المستودع. ويرتبط كلُّ بندٍ بقضيّته حيث يجري النقاش أصلًا؛ لا تصويتَ هنا، ولا يمكن شراءُ تقدُّمٍ على أحدٍ هنا.",
      "المرحلةُ المفتوحة نيّةٌ لا التزام، والتاريخُ عليها هدفٌ لا وعد. ويُنجَز العمل حين يصحّ قولُ إنه أُنجز — وسجلُّ التغييرات يوثّق ما هبط فعلًا.",
    ],
    openTitle: "قيدُ العمل — مراحلُ مفتوحة",
    journeyTitle: "المسيرةُ حتى الآن",
    journeyIntro:
      "كلُّ المعالم المغلقة، من الأقدم إلى الأحدث — تاريخُ المشروع مقروءًا من المستودع مباشرةً، بتواريخٍ دوّنها GitHub في اليوم الذي اكتملت فيه كلُّ مرحلةٍ فعلًا. لا سردَ كُتب بعد وقوعه؛ هذا هو السجلّ.",
    closedTitle: "أُنجز مؤخّرًا",
    dueOn: (date) => `تاريخٌ مستهدف: ${date}`,
    noDate: "لم يُحدَّد تاريخ",
    closedOn: (date) => `أُنجزت في ${date}`,
    progress: (closed, total) => `أُغلق ${closed} من ${total} بنود`,
    itemOpen: "مفتوح",
    itemDone: "أُنجز",
    pullRequest: "‏PR",
    moreOnGitHub: (count) => `و${count} أخرى على GitHub`,
    empty: "تعذَّر جلبُ خارطة الطريق في هذا البناء. اقرأ المراحل مباشرةً على GitHub.",
    viewMilestone: "شاهِد هذه المرحلة على GitHub",
    refreshedAt: (date) =>
      `تُقرأ خارطةُ الطريق من مراحل GitHub في المستودع وقت البناء؛ وتتجدّد كل ساعة — آخر قراءةٍ ${date}.`,
  },

  fr: {
    rev: "2026-08-29.1",
    translatedFromRev: "2026-08-29.1",
    title: "Feuille de route de keel — lue depuis le dépôt, actualisée toutes les heures",
    description:
      "La feuille de route de keel : les jalons ouverts de CodeGateSoftware/keel et leurs tickets, lus depuis GitHub à la construction. Un jalon ouvert est une intention, pas un engagement.",
    intro: [
      "Cette page est une lecture du plan de travail du projet lui-même — les jalons sur GitHub et les tickets qui s'y rattachent, exactement comme le dépôt les suit. Chaque élément renvoie à son ticket, là où la discussion a déjà lieu ; rien ne se vote ici, et l'on ne peut rien y acheter en passer devant.",
      "Un jalon ouvert est une intention, pas un engagement, et sa date est un objectif, pas une promesse. Le travail est livré quand il est honnête de dire qu'il l'est — le journal des versions consigne ce qui a réellement atterri.",
    ],
    openTitle: "En cours — jalons ouverts",
    journeyTitle: "Le parcours jusqu'ici",
    journeyIntro:
      "Chaque jalon fermé, du plus ancien au plus récent — l'histoire du projet lue directement du dépôt, datée par GitHub au jour où chaque phase s'est réellement achevée. Aucun récit écrit après coup ; ceci est la trace.",
    closedTitle: "Livré récemment",
    dueOn: (date) => `Date cible : ${date}`,
    noDate: "Aucune date fixée",
    closedOn: (date) => `Livré le ${date}`,
    progress: (closed, total) => `${closed} éléments sur ${total} fermés`,
    itemOpen: "ouvert",
    itemDone: "fait",
    pullRequest: "PR",
    moreOnGitHub: (count) => `et ${count} autres sur GitHub`,
    empty: "La feuille de route n'a pas pu être récupérée pour cette construction. Lisez les jalons directement sur GitHub.",
    viewMilestone: "Voir ce jalon sur GitHub",
    refreshedAt: (date) =>
      `Lue depuis les jalons GitHub du dépôt à la construction ; actualisée toutes les heures — dernière lecture ${date}.`,
  },
};
