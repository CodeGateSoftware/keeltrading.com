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
  openSourceTitle: string;
  openSourceFaq: FaqItem[];
  translatedFromRev?: string;
}

export const about: LocalizedPage<AboutContent> = {
  en: {
    rev: "2026-08-20.1",
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
    openSourceTitle: "Open source — and the catch",
    openSourceFaq: [
      {
        question: "What does “open source” actually mean?",
        answer: [
          "It means the source code — the actual instructions the program runs — is published where anyone can read it, use it, check what it really does, and change it. keel carries the Apache-2.0 license, one of the most standard open-source licenses in the world: you may run it for any purpose, study it, modify it, and even build a business on it.",
          "For a tool that makes religious and financial claims, that is the whole point. You do not have to take our word for what keel does. You can read every line yourself, or have someone you trust read it — every rail, every gate, every number on this site traces back to code you can open.",
        ],
      },
      {
        question: "Why is keel open source — and free?",
        answer: [
          "Because keel's entire value is auditability. A compliance engine you cannot inspect is exactly the “trust me” model keel exists to replace: closed screening tools ask you to believe their verdicts; keel publishes the machinery and the rulings it enforces, with sources. Openness is not a marketing choice bolted on — it is the product.",
          "And to be precise about “free”: the engine is free by license, not by trial. Apache-2.0 cannot be un-free'd — that copy of the license ships with every version.",
        ],
      },
      {
        question: "What's the catch? Competitors charge subscriptions — why doesn't keel?",
        answer: [
          "Screening services charge because the verdict is their product: they compute or author classifications and sell you access to them. keel deliberately does not sell verdicts — it enforces yours, and its own honest result says the reference rules don't beat their fees. There is nothing here to upsell you on performance, and we won't pretend otherwise.",
          "The honest part of the answer: keel is also young and small, with no company behind it yet. Free is partly what an honest, early-stage project looks like. Running keel is not free, though — your time, a trading venue, and market-data access all cost real money, and we would rather say that than call trading free.",
          "One deliberate detail: this website's prose and branding are copyrighted (© CodeGate Software), unlike the engine's code. That boundary is the extent of the current commercial thinking.",
        ],
      },
      {
        question: "When will keel charge money, and for what?",
        answer: [
          "There is no date, no price list, and no decided plan — inventing one would be exactly the kind of claim this project refuses to make. If paid services ever come, they will be services built around the engine — not the engine itself. You will read about it here and in GitHub Discussions first, with the same honesty as everything else: the announcement will say plainly what it is, what it costs, and why.",
          "What can be promised today: the engine you can download now is licensed Apache-2.0, and that cannot be revoked or retracted. Any future paid offering would have to be worth paying for on top of a free engine — which is exactly the standard a project like this should hold itself to.",
        ],
      },
    ],
  },

  ar: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
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
    openSourceTitle: "المصدر المفتوح — وأين الحيلة",
    openSourceFaq: [
      {
        question: "ماذا يعني «مفتوح المصدر» فعلًا؟",
        answer: [
          "يعني أن الشيفرة المصدرية — التعليمات الفعلية التي يُنفّذها البرنامج — منشورةٌ حيث يستطيع أيٌّ كان قراءتها واستخدامها والتحقّق مما تفعل فعلًا وتغييرها. ويحمل كيل ترخيص Apache-2.0، أحد أكثر تراخيص المصادر المفتوحة اعتياديًّا في العالم: لك أن تشغّله لأي غرض، وتدرسه، وتعدّله، بل وتبني عليه عملًا تجاريًّا.",
          "لأداةٍ تقدّم دعاوى دينية ومالية، هذا هو بيت القصيد. لست مضطرًّا لأخذ كلامنا على محمل التصديق: يمكنك قراءة كل سطرٍ بنفسك، أو تكليف من تثق به بقراءته — كل سكةٍ وكل بوابةٍ وكل رقمٍ في هذا الموقع يعود إلى شيفرةٍ يمكنك فتحها.",
        ],
      },
      {
        question: "لماذا كيل مفتوح المصدر — ومجاني؟",
        answer: [
          "لأن قيمة كيل كلَّها في قابلية التدقيق. محرّكُ امتثالٍ لا تستطيع فحصَه هو بالضبط نموذجُ «ثِق بي» الذي وُجد كيل ليحلّ محله: أدوات الفرز المغلقة تطلب منك تصديق أحكامها؛ وكيل ينشر الآليات والأحكامَ التي يُنفّذها، بمصادرها. الانفتاح ليس قرارَ تسويقٍ مُلحقًا — بل هو المنتج.",
          "ولتكون الدقة في «المجاني»: المحرّك مجاني بالترخيص لا بالتجربة. ترخيص Apache-2.0 لا يمكن إلغاؤه — نسخةُ الترخيص ترافق كلَّ إصدار.",
        ],
      },
      {
        question: "أين الحيلة؟ المنافسون يأخذون اشتراكات — فلماذا لا يأخذها كيل؟",
        answer: [
          "خدمات الفرز تتقاضى المال لأن الحكمَ منتجُها: هي تحسب التصنيفات أو تصوغها ثم تبيعك الوصول إليها. كيل عمدًا لا يبيع أحكامًا — بل ينفّذ أحكامك أنت، ونتيجته الصادقة تقول إن قواعده المرجعية لا تتغلب على رسومها. لا شيء هنا يُمكن الترفيع عليك بالأداء، ولن نتظاهر بغير ذلك.",
          "والجزء الصادق من الجواب: كيل أيضًا فتيّ وصغير، ولا شركة خلفه بعد. المجانية جزءٌ من شكل أي مشروعٍ نزيهٍ في بدايته. على أن تشغيل كيل ليس مجانيًّا — وقتُك، ومنصّةُ تداول، ووصولُ بيانات السوق، كلّها تكلف مالًا حقيقيًّا، ونفضّل قول ذلك على تسمية التداول مجانيًّا.",
          "وتفصيلٌ مقصود: نصوصُ هذا الموقع وهويّته محفوظة الحقوق (© CodeGate Software)، بخلاف شيفرة المحرّك. هذا الحدُّ هو مدى التفكير التجاري الحالي.",
        ],
      },
      {
        question: "متى سيتقاضى كيل مالًا، ومقابل أي خدمات؟",
        answer: [
          "لا موعد، ولا قائمة أسعار، ولا خطةً مقرّرة — اختلاقُها سيكون بالضبط نوع الدعوى التي يرفض هذا المشروع تقديمها. إن جاءت خدماتٌ مدفوعة يومًا فستكون خدماتٍ حول المحرّك — لا المحرّك نفسه. وستقرأ عنها هنا وفي نقاشات GitHub أولًا، بالصدق نفسه الذي في كل شيء هنا: الإعلان سيقول بوضوح ما هي، وكم تكلّف، ولماذا.",
          "وما يمكن الوعدُ به اليوم: المحرّك الذي تنزّله الآن مرخّص Apache-2.0، ولا يمكن سحب ذلك. أي عرضٍ مدفوعٍ مستقبليٍّ سيكون عليه أن يستحق الدفع فوق محرّكٍ مجاني — وهذا بالضبط المعيار الذي ينبغي لمشروعٍ كهذا أن يحاسب نفسه عليه.",
        ],
      },
    ],
  },

  fr: {
    rev: "2026-08-20.1",
    translatedFromRev: "2026-08-20.1",
    title: "À propos de keel — nom, licence et FAQ keel.sh & KEEL",
    description:
      "Qui édite keeltrading.com, les licences, et la FAQ de la marque — pourquoi ce keel n'est ni le Keel de Kubernetes (keel.sh) ni Keel Infrastructure (KEEL).",
    intro: [
      "keeltrading.com est le site public de keel, le moteur open-source de conformité Shariah pour le trading de cryptomonnaies au comptant, maintenu par CodeGate Software. Le site est une couche en lecture seule posée sur GitHub : la documentation affiche des documents récupérés dans le dépôt du moteur au moment du build, le fil d'actualité lit les Discussions GitHub, et les boutons de téléchargement pointent vers GitHub Releases. Rien d'interactif ne se passe ici : publier, voter, poser des questions, tout cela a lieu sur GitHub.",
      "Le site lui-même est open source ; sa chaîne de build est conçue pour qu'il ne puisse jamais contredire le dépôt qu'il présente.",
    ],
    licenses: {
      title: "Licences",
      body: [
        "Le moteur keel est publié sous licence Apache-2.0 dans son propre dépôt (CodeGateSoftware/keel).",
        "Le code de ce site est sous licence MIT. Le contenu du site — textes, traductions, identité visuelle — est © CodeGate Software ; la citation avec attribution est bienvenue (voir CONTENT-LICENSE.md).",
      ],
    },
    faqTitle: "FAQ de la marque",
    faq: [
      {
        question: "Est-ce le projet Kubernetes appelé Keel ?",
        answer: [
          "Non. Il existe un outil Kubernetes bien établi, Keel, sur keel.sh, qui monopolise aujourd'hui les résultats de recherche sur le seul mot « keel ». Ce projet — keel, de CodeGate Software — n'a aucun lien avec lui : ni code, ni histoire, ni personnes en commun. Nous écrivons « keel trading » partout où l'ambiguïté pourrait induire en erreur, et ce site existe en partie pour rendre cette distinction facile à trouver.",
        ],
      },
      {
        question: "Est-ce Keel Infrastructure, l'action KEEL ?",
        answer: [
          "Non. Une société de minage de bitcoin cotée au Nasdaq (ex-Bitfarms) est cotée sous le symbole KEEL : une recherche sur « keel trading » ou « keel crypto » peut donc faire remonter son cours de Bourse. Elle n'a aucun lien avec ce projet. Ce keel-ci est un moteur de conformité open-source signé CodeGate Software — si vous êtes arrivé sur keeltrading.com, vous êtes au bon endroit.",
        ],
      },
      {
        question: "Pourquoi ce nom, keel ?",
        answer: [
          "La quille (keel) est la colonne vertébrale d'un navire — la pièce qui maintient l'ensemble d'aplomb et détermine le comportement de la coque. Le nom dit ce qu'est le moteur : ni les voiles, ni le vent, mais la pièce dont le rôle est de tenir le trading sur une ligne droite et vérifiable.",
        ],
      },
      {
        question: "Quel est le lien entre keeltrading.com et le dépôt du moteur ?",
        answer: [
          "Ce site vit dans un dépôt distinct (CodeGateSoftware/keeltrading.com) dont le build va chercher ses données dans celui du moteur : les Releases pour les numéros de version et les liens de fichiers, les Discussions pour l'actualité, et des documents épinglés pour la documentation. Si le moteur déplace un document, le build de ce site échoue exprès, plutôt que d'afficher un contenu périmé.",
        ],
      },
      {
        question: "Qu'est-ce que CodeGate Software ?",
        answer: [
          "CodeGate Software est l'organisation qui maintient le projet. keel a commencé comme un outil personnel ; il est publié en open source pour que ses affirmations de conformité soient auditées, plutôt que crues sur parole.",
        ],
      },
    ],
    openSourceTitle: "Open source — et où est le piège",
    openSourceFaq: [
      {
        question: "Que veut dire « open source », concrètement ?",
        answer: [
          "Que le code source — les instructions que le programme exécute réellement — est publié là où chacun peut le lire, l'utiliser, vérifier ce qu'il fait vraiment et le modifier. keel porte la licence Apache-2.0, l'une des licences open source les plus répandues au monde : vous pouvez l'exécuter pour n'importe quel usage, l'étudier, le modifier et même bâtir une entreprise dessus.",
          "Pour un outil qui avance des affirmations religieuses et financières, c'est tout l'enjeu. Vous n'avez pas à nous croire sur parole : vous pouvez lire chaque ligne vous-même, ou la faire lire à quelqu'un en qui vous avez confiance — chaque garde-fou, chaque verrou, chaque chiffre de ce site remonte à du code que vous pouvez ouvrir.",
        ],
      },
      {
        question: "Pourquoi keel est-il open source — et gratuit ?",
        answer: [
          "Parce que toute la valeur de keel tient dans sa vérifiabilité. Un moteur de conformité que vous ne pouvez pas inspecter, c'est exactement le modèle « faites-nous confiance » que keel entend remplacer : les outils fermés vous demandent de croire leurs verdicts ; keel publie sa machinerie et les règles qu'il applique, sources comprises. L'ouverture n'est pas un argument marketing plaqué par-dessus — c'est le produit.",
          "Et pour être précis sur le mot « gratuit » : le moteur est gratuit par licence, pas par période d'essai. La licence Apache-2.0 est irrévocable — une copie l'accompagne à chaque version.",
        ],
      },
      {
        question: "Où est le piège ? Les concurrents facturent un abonnement — pourquoi pas keel ?",
        answer: [
          "Les services de filtrage facturent parce que le verdict est leur produit : ils calculent ou rédigent des classifications et vous en vendent l'accès. keel, lui, ne vend délibérément aucun verdict — il applique les vôtres, et son propre résultat honnête dit que les règles de référence ne couvrent pas leurs frais. Il n'y a ici aucune performance à vous vendre, et nous ne ferons pas semblant du contraire.",
          "La part honnête de la réponse : keel est aussi jeune et petit, et aucune entreprise ne le porte pour l'instant. La gratuité est aussi, pour partie, le visage d'un projet honnête à ses débuts. Faire tourner keel n'est pas gratuit pour autant : votre temps, une plateforme de trading et l'accès aux données de marché coûtent de l'argent réel, et nous préférons le dire plutôt que de parler de trading gratuit.",
          "Un détail délibéré : les textes et l'identité visuelle de ce site sont protégés par le droit d'auteur (© CodeGate Software), contrairement au code du moteur. Cette frontière résume à elle seule la réflexion commerciale du moment.",
        ],
      },
      {
        question: "Quand keel deviendra-t-il payant, et pour quels services ?",
        answer: [
          "Il n'y a ni date, ni grille tarifaire, ni plan arrêté — en inventer un relèverait précisément du genre d'affirmation que ce projet refuse de faire. Si des services payants voient le jour, ce seront des services autour du moteur, pas le moteur lui-même. Vous l'apprendrez ici et dans les Discussions GitHub en premier, avec la même honnêteté que pour le reste : l'annonce dira clairement de quoi il s'agit, ce que cela coûte, et pourquoi.",
          "Ce que l'on peut promettre aujourd'hui : le moteur que vous téléchargez maintenant est sous Apache-2.0, et cela ne peut pas être révoqué. Toute offre payante à venir devra justifier son prix face à un moteur gratuit — c'est exactement l'exigence qu'un projet comme celui-ci doit s'imposer.",
        ],
      },
    ],
  },
};
