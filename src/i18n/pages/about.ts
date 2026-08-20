import type { LocalizedPage } from "../config";

/**
 * About (FR-2): license, trademarks, brand FAQ including the keel.sh
 * disambiguation (the Kubernetes project that owns the bare-"keel" results).
 */
export interface FaqItem {
  question: string;
  answer: string[];
}

export interface AboutContent {
  rev: string;
  title: string;
  description: string;
  intro: string[];
  licenses: { title: string; body: string[] };
  faqTitle: string;
  faq: FaqItem[];
  translatedFromRev?: string;
}

export const about: LocalizedPage<AboutContent> = {
  en: {
    rev: "2026-08-19.2",
    title: "About keel — Name, License, keel.sh & KEEL FAQ",
    description:
      "Who runs keeltrading.com, licensing, and the brand FAQ — why this keel is not Kubernetes Keel (keel.sh) nor Keel Infrastructure (KEEL).",
    intro: [
      "keeltrading.com is the public website of keel, the open-source Shariah-compliance engine for spot crypto trading maintained by CodeGate Software. The site is a read-only layer over GitHub: the docs section renders documents fetched from the engine repository at build time, the news feed reads GitHub Discussions, and download buttons point at GitHub Releases. Nothing interactive happens here — posting, voting, and questions live on GitHub.",
      "The site itself is open source too; its build pipeline is designed so the site can never contradict the repository it presents.",
    ],
    licenses: {
      title: "Licensing",
      body: [
        "The keel engine is licensed Apache-2.0 by its own repository (CodeGateSoftware/keel).",
        "This website's code is MIT. The site's content — prose, translations, branding — is © CodeGate Software; quoting with attribution is welcome (see CONTENT-LICENSE.md).",
      ],
    },
    faqTitle: "Brand FAQ",
    faq: [
      {
        question: "Is this the Kubernetes project called Keel?",
        answer: [
          "No. There is an established Kubernetes deployment tool named Keel at keel.sh, and it currently owns the bare-\"keel\" search results. This project — keel by CodeGate Software — is unrelated to it: no shared code, history, or people. We call the project \"keel trading\" where ambiguity would mislead, and this site exists partly to make that distinction easy to find.",
        ],
      },
      {
        question: "Is this Keel Infrastructure, the KEEL stock?",
        answer: [
          "No. A Nasdaq-listed bitcoin-mining company (formerly Bitfarms) trades under the ticker KEEL, so a search for \"keel trading\" or \"keel crypto\" may show its stock chart near these results. It has no connection to this project. This keel is an open-source compliance engine by CodeGate Software — if you landed on keeltrading.com, you are in the right place.",
        ],
      },
      {
        question: "Why is it called keel?",
        answer: [
          "The keel is the structural spine of a ship — the part that keeps everything upright and determines how the vessel behaves. The name says what the engine is: not the sails, not the wind, but the part whose job is to keep trading on a straight, auditable line.",
        ],
      },
      {
        question: "What is keeltrading.com's relationship to the engine repository?",
        answer: [
          "This site is a separate repository (CodeGateSoftware/keeltrading.com) whose build fetches from the engine repo — releases for version numbers and asset links, Discussions for news, and pinned documents for the docs section. If the engine moves a document, this site's build fails on purpose rather than showing something stale.",
        ],
      },
      {
        question: "Who is CodeGate Software?",
        answer: [
          "CodeGate Software is the project's maintainer organization. keel began as a personal tool and is published open source so that its compliance claims can be audited rather than trusted.",
        ],
      },
    ],
  },

  ar: {
    rev: "2026-08-19.2",
    translatedFromRev: "2026-08-19.2",
    title: "حول كيل — الاسم والترخيص وأسئلة keel.sh وKEEL",
    description:
      "من يُشغّل keeltrading.com، والتراخيص، والأسئلة الشائعة عن الاسم — لماذا لا نحن كيلَ Kubernetes‏ (keel.sh) ولا Keel Infrastructure‏ (KEEL).",
    intro: [
      "‏keeltrading.com هو الموقع العمومي لكيل، محرّك الامتثال الشرعي مفتوح المصدر لتداول العملات المشفّرة الفوري الذي تتولاه CodeGate Software. الموقع طبقةُ قراءةٍ فوق GitHub: قسمُ الوثائق يعرض مستنداتٍ تُجلب من مستودع المحرّك وقت البناء، وخلاصةُ الأخبار تقرأ نقاشات GitHub، وأزرارُ التنزيل تشير إلى GitHub Releases. لا شيء تفاعليًّا يحدث هنا — النشر والتصويت والأسئلة تعيش على GitHub.",
      "والموقع نفسه مفتوح المصدر؛ وبنية بنائه مصمَّمة بألّا يكذب الموقعُ يومًا على المستودع الذي يعرضه.",
    ],
    licenses: {
      title: "التراخيص",
      body: [
        "محرّك كيل مرخّص Apache-2.0 بموجب مستودعه (CodeGateSoftware/keel).",
        "شيفرة هذا الموقع MIT. ومحتوى الموقع — النصوص والترجمات والهوية — © CodeGate Software؛ والاقتباس مع الإسناد مرحّب به (انظر CONTENT-LICENSE.md).",
      ],
    },
    faqTitle: "الأسئلة الشائعة عن الاسم",
    faq: [
      {
        question: "أهذا هو مشروع Kubernetes المسمّى Keel؟",
        answer: [
          "لا. هناك أداة نشرٍ لـ Kubernetes اسمها Keel على keel.sh، وهي تحتكر حاليًّا نتائج البحث عن كلمة «keel» وحدها. هذا المشروع — كيل من CodeGate Software — لا صلة له بها: لا شيفرة مشتركة، ولا تاريخ، ولا أشخاص. ونقول «keel trading» حيث كان اللبس مضلّلًا، وهذا الموقع قائمٌ جزئيًّا ليجعل هذا التمييز سهلَ العثور.",
        ],
      },
      {
        question: "أهذه شركة Keel Infrastructure المسجّلة برمز KEEL؟",
        answer: [
          "لا. هناك شركة تعدين بيتكوين مدرجة في Nasdaq تحت الرمز KEEL‏ (كانت تُعرف سابقًا بـ Bitfarms)، فقد يُظهر البحث عن «keel trading» أو «keel crypto» مخططَ سهمها قرب هذه النتائج. لا صلة لها بهذا المشروع. كيلنا محرّك امتثال مفتوح المصدر من CodeGate Software — فإن كنت قد وصلت إلى keeltrading.com فأنت في المكان الصحيح.",
        ],
      },
      {
        question: "لماذا الاسم «كيل»؟",
        answer: [
          "الكيل (keel) هو العمود الفقري للسفينة — الجزء الذي يُبقي كل شيء منتصبًا ويحدّد سلوكها. الاسم يقول ما هو المحرّك: ليس الأشرعة ولا الريح، بل الجزء الذي وظيفته إبقاء التداول على خطٍّ مستقيم قابلٍ للتدقيق.",
        ],
      },
      {
        question: "ما علاقة keeltrading.com بمستودع المحرّك؟",
        answer: [
          "هذا الموقع مستودعٌ منفصل (CodeGateSoftware/keeltrading.com) يجلب بناؤه من مستودع المحرّك — الإصدارات لأرقام الإصدارات وروابط الأصول، والنقاشات للأخبار، ومستنداتٌ مثبّتة لقسم الوثائق. وإذا نقل المحرّك مستندًا، فشل بناء هذا الموقع عمدًا بدل عرض شيءٍ بالٍ.",
        ],
      },
      {
        question: "ما CodeGate Software؟",
        answer: [
          "‏CodeGate Software هي الجهة المشرفة على المشروع. بدأ كيل أداةً شخصية ونُشر مفتوح المصدر لتُدقَّق دعاواه الامتثالية بدل أن تُؤخَذ على الثقة.",
        ],
      },
    ],
  },
};
