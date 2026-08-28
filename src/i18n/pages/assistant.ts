import type { LocalizedPage } from "../config";
import type { EngineSource } from "../../lib/engine-url";

/**
 * The AI-assistant page (#118): keel's answer to hosted chatbots is "point
 * your own assistant at your own keel" — the read-only MCP server, exposed
 * locally. Every claim here is traceable to the engine repository at the
 * release tag this build resolved: the two verbatim blocks below are copied
 * from docs/mcp-server.md (single-sourced in RUN_COMMAND and CLIENT_CONFIG so
 * a locale cannot drift from the engine's own words), and the full document is
 * fetched and rendered under Docs by scripts/fetch-engine-docs.mjs rather
 * than duplicated here.
 */

/** Verbatim from docs/mcp-server.md, "Running it" — the engine's own command. */
export const RUN_COMMAND = "uv run keel --db keel.db --config config.yaml mcp";

/** Verbatim from docs/mcp-server.md, "Running it" — the client-side config. */
export const CLIENT_CONFIG = `{
  "mcpServers": {
    "keel": {
      "command": "keel",
      "args": ["--db", "keel.db", "--config", "config.yaml", "mcp"]
    }
  }
}`;

/** The eight tools, in the order docs/mcp-server.md's table lists them. */
export interface AssistantTool {
  /** The tool name as the server registers it — code, not copy. */
  name: string;
  what: string;
}

export interface AssistantContent {
  rev: string;
  title: string;
  description: string;
  hero: {
    eyebrow: string;
    heading: string;
    sub: string;
  };
  boundary: {
    title: string;
    body: string[];
  };
  whatIs: {
    title: string;
    sentence: string;
    body: string[];
  };
  connect: {
    title: string;
    intro: string;
    runLabel: string;
    configLabel: string;
    clientsNote: string;
    verifyNote: string;
  };
  tools: {
    title: string;
    intro: string;
    items: AssistantTool[];
    verifyNote: string;
  };
  cannot: {
    title: string;
    intro: string;
    points: string[];
    enforcement: string[];
    verifyNote: string;
  };
  fit: {
    title: string;
    body: string[];
    punchline: string;
  };
  docsNote: string;
  translatedFromRev?: string;
}

/** Verify pointers, locale-neutral by construction (paths, not prose). */
export const assistantVerify: {
  serverDoc: EngineSource & { label: string };
  tools: EngineSource & { label: string };
  readonlyTest: EngineSource & { label: string };
  ledger: EngineSource & { label: string };
} = {
  serverDoc: { label: "docs/mcp-server.md", path: "docs/mcp-server.md" },
  tools: { label: "keel/mcp/tools.py", path: "keel/mcp/tools.py" },
  readonlyTest: {
    label: "tests/mcp/test_readonly.py",
    path: "tests/mcp/test_readonly.py",
  },
  ledger: { label: "keel/research/ledger.py", path: "keel/research/ledger.py" },
};

export const assistant: LocalizedPage<AssistantContent> = {
  en: {
    rev: "2026-08-28.1",
    title: "Point your own assistant at your own keel — keel",
    description:
      "keel ships a read-only MCP server: your own assistant — Claude Desktop, any MCP client — reads your own engine over stdio, on your machine. keel hosts nothing, sees nothing, relays nothing.",
    hero: {
      eyebrow: "No hosted chatbot · no account · no key",
      heading: "Your assistant, pointed at your keel",
      sub: "Some platforms sell a hosted AI that drafts strategies for you, metered against a subscription. keel's answer is smaller and costs nothing to run: keel ships a read-only MCP server, so you point your own assistant at the keel running on your own machine, holding your own keys. The engine has nowhere to send a prompt, so it sends none — keel's side of the exchange never leaves your machine.",
    },
    boundary: {
      title: "The honest boundary",
      body: [
        "keel does not host an assistant, does not see your conversations, and relays nothing. There is no keel cloud to talk to, no account to meter, no key to paste into a website — nothing to log into. The server is a local process speaking stdio to a client on the same machine.",
        "One honest caveat, stated rather than implied: what your assistant's own provider does with the prompts it receives is your arrangement with that provider. keel is not a party to it and cannot see it. keel's half is local; the assistant's half is whatever you chose when you picked a client.",
        "There is nothing to pay keel for on this page. The page is instructions.",
      ],
    },
    whatIs: {
      title: "What an MCP server is, in one sentence",
      sentence:
        "MCP (Model Context Protocol) is an open standard that lets an AI assistant call tools a program exposes: the assistant asks, the program answers from what it can see.",
      body: [
        "keel's server speaks it over stdio — one JSON-RPC 2.0 message per line in, one response per line out, until EOF — hand-rolled over the standard library: no MCP SDK, no pydantic, no asyncio, no new dependency. When a client asks who it is talking to, the server answers keel-read-only. The name is the whole proposition.",
      ],
    },
    connect: {
      title: "Point a client at it",
      intro:
        "Both blocks below are the engine's own, quoted verbatim from its server documentation — adjust the paths to your deployment.",
      runLabel: "Run the server",
      configLabel: "Register it with your client",
      clientsNote:
        "The engine's instruction is one line: point any stdio MCP client at the command — Claude Desktop, Cursor, Codex, VS Code, Zed all consume this same mcpServers shape. Where each client keeps that config is the client's own documentation; keel's side of the bargain is the command and the fence around it.",
      verifyNote: "Verify in the repository",
    },
    tools: {
      title: "What the eight tools let an assistant do",
      intro:
        "Eight tools, each delegating to the same service seams an operator's front-end calls — so an assistant and a terminal cannot be shown two different accounts of one deployment. All lists are bounded; money arrives as strings, never double-rounded by JSON floating point.",
      items: [
        {
          name: "doctor",
          what: "The same findings keel doctor computes — subscription freshness, rail states, allowance headroom, recent vetoes, data health, sizing admissibility — each with the CLI fix that resolves it.",
        },
        {
          name: "capabilities",
          what: "The capability inventory as rows: every action that widens what keel can do without asking again, and the gate covering it.",
        },
        {
          name: "profiles",
          what: "The deployment's config files as structured rows — allowlist, spend caps, DCA budget, granularities. A file that will not load is listed with its error.",
        },
        {
          name: "orders",
          what: "Rows from the orders audit log, filtered by mode, product or status, newest last, bounded.",
        },
        {
          name: "veto_log",
          what: "Parsed rail-veto events from the engine's JSONL log since a timestamp, with each event's rail violations.",
        },
        {
          name: "purification",
          what: "The §65.9 income purification report — what is owed by asset, units from tainted sources, entries awaiting human classification. Report-only, like the CLI.",
        },
        {
          name: "trials",
          what: "The research trials ledger: row and decision counts, hash-chain verification errors, the most recent rows. Experiments only — money has its own ledger.",
        },
        {
          name: "reports",
          what: "The research corpora: list documents, or read one bounded document — a bare name, never a filesystem path.",
        },
      ],
      verifyNote: "Verify in the repository",
    },
    cannot: {
      title: "What it deliberately cannot do",
      intro:
        "The interesting half. The server cannot attest an asset, promote a rule, arm autonomy, or place, halt or release an order — not as a matter of policy but because the write surface does not exist. The engine's own page names the fence, in six walls:",
      points: [
        "A write-verb vocabulary — every tool name and description is scanned against arm, attest, promote, kill, place and the other write verbs. A description may not advertise a write, because a description is what a model reads before choosing a tool.",
        "No gated action is reachable by name — nothing in the server references the capability registry's module.function entries.",
        "An AST write-deny scan — no write-ish call anywhere; the allowlist is empty and pinned empty. One exemption exists: PRAGMA query_only = ON, the engine-level read-only enforcement itself.",
        "The interactive-confirmation gate appears nowhere in the package — a pipe-connected process must not borrow the ceremony that exists for a human at a terminal.",
        "A docs pin — a documented tool that does not exist, or an exposed tool the docs hide, both fail CI.",
        "A closed import surface — the package imports neither the executor nor the agent; the trading paths start unavailable, not merely unused.",
      ],
      enforcement: [
        "The guard is a test — tests/mcp/test_readonly.py — committed before keel/mcp/ existed, so the server was born inside the fence rather than moved into one later. The engine's page is honest about the limit: a static scan cannot close dynamic dispatch.",
        "And at runtime every connection opens with PRAGMA query_only = ON — row writes are impossible at the engine level, by construction rather than by policy. What will never be exposed is named too: credentials, .env contents, anything from the OS keychain.",
      ],
      verifyNote: "Verify in the repository",
    },
    fit: {
      title: "The honest fit: the assistant proposes, the gate decides",
      body: [
        "keel's analysis-feed design note states the pattern in five words — the Analyzer proposes, the gate decides: the feed proposes assets for human attestation, keel's deterministic gate decides, and nothing new touches admission, sizing or order placement. The MCP server inherits the same asymmetry. An assistant reading your reports can explain what your keel did and why a rail fired; nothing it says reaches an order.",
        "That boundary is the feature. A chatbot that could draft a strategy and promote it would route around the candidate → paper → live ladder and its overfitting check in a single sentence. keel's answer is not a better-behaved chatbot; it is a server that cannot, checked by a test that fails if it ever learns how.",
      ],
      punchline: "Assistants propose. keel's gates still decide.",
    },
    docsNote:
      "The complete server reference is fetched from the engine at build time and rendered under Docs — this page summarizes; that page is the document.",
  },

  ar: {
    rev: "2026-08-28.1",
    translatedFromRev: "2026-08-28.1",
    title: "وجِّه مساعدك الذكيَّ إلى كيل الخاصِّ بك — كيل",
    description:
      "يُسلِّم كيل خادمَ MCP للقراءة فقط: مساعدك الذكي — Claude Desktop أو أيّ عميل MCP — يقرأ محرّكك عبر stdio على جهازك. لا يستضيف كيل شيئًا، ولا يرى شيئًا، ولا يُرحِّل شيئًا.",
    hero: {
      eyebrow: "لا روبوت محادثةٍ مستضاف · لا حساب · لا مفتاح",
      heading: "مساعدك، موجَّهٌ إلى كيلك",
      sub: "تبيع بعض المنصّات ذكاءً مستضافًا يصيغ لك الاستراتيجيات، مقيسًا باشتراك. أمّا إجابة كيل فأصغرُ من ذلك ولا تكلّف شيئًا: يُسلِّم كيل خادمَ MCP للقراءة فقط، فتوجّه مساعدك أنت إلى نسخة كيل العاملة على جهازك أنت، وبمفاتيحك أنت. لا يجد المحرّك وجهةً يرسل إليها رسالةً، فهو لا يرسل شيئًا — جانبُ كيل من التبادل لا يغادر جهازك أبدًا.",
    },
    boundary: {
      title: "الحدُّ الصادق",
      body: [
        "لا يستضيف كيل مساعدًا، ولا يرى محادثاتك، ولا يُرحِّل شيئًا. لا سحابةَ لكيل تُخاطبها، ولا حسابَ يُقاس عليه الاستهلاك، ولا مفتاحَ تُلصقه في موقع — لا شيءَ لتسجيل الدخول إليه. فالخادمُ عمليةٌ محليّة تتحدّث عبر stdio إلى عميلٍ على الجهاز نفسه.",
        "وتنبيهٌ صادقٌ يُقال لا يُلَمَّح: ما يفعله مزوِّدُ مساعدك نفسِه بالرسائل التي يتلقّاها هو اتفاقُك أنت مع ذلك المزوِّد. ليس كيل طرفًا فيه ولا يستطيع رؤيتَه. نصفُ كيل محليٌّ؛ ونصفُ المساعد هو ما اخترتَه حين اخترتَ عميلك.",
        "ولا شيءَ تدفعه لكيل مقابل هذه الصفحة. الصفحةُ تعليمات.",
      ],
    },
    whatIs: {
      title: "ما خادمُ MCP، في جملةٍ واحدة",
      sentence:
        "‏MCP (بروتوكول سياق النموذج) معيارٌ مفتوح يتيح للمساعد الذكي استدعاء أدواتٍ يكشفها برنامجٌ ما: يسأل المساعد، فيجيب البرنامج مما يستطيع رؤيته.",
      body: [
        "يتحدّث خادمُ كيل به عبر stdio — رسالةُ JSON-RPC 2.0 واحدةٌ في كلِّ سطرٍ داخلًا، وردٌّ واحدٌ في كلِّ سطرٍ خارجًا حتى نهاية المدخل — مكتوبًا يدويًّا فوق المكتبة القياسية: بلا حزمة MCP، ولا pydantic، ولا asyncio، بلا تبعيةٍ جديدة. وحين يسأل العميلُ مَن يخاطب، يجيب الخادم: keel-read-only. الاسمُ هو الفكرةُ كلُّها.",
      ],
    },
    connect: {
      title: "وجِّه عميلًا إليه",
      intro:
        "الكَتلَتان أدناه هما نصُّ وثائق المحرّك نفسِها، منسوختان حرفيًّا من صفحة الخادم — عدِّل المسارات بما يناسب نشرَك.",
      runLabel: "شغِّل الخادم",
      configLabel: "سجِّله لدى عميلك",
      clientsNote:
        "تعليماتُ المحرّك سطرٌ واحد: وجِّه أيَّ عميل MCP يعمل عبر stdio إلى الأمر — فـClaude Desktop وCursor وCodex وVS Code وZed كلُّها تستهلك الشكلَ نفسَه mcpServers. وأين يحفظ كلُّ عميلٍ إعداده فهو وثائقُ العميل نفسِه؛ أمّا ما يخصُّ كيل فهو الأمر والسياجُ حوله.",
      verifyNote: "تحقّق في المستودع",
    },
    tools: {
      title: "ماذا تتيح الأدواتُ الثماني للمساعد",
      intro:
        "ثماني أدوات، كلٌّ منها تفوّض إلى الفواصل الخدميّة نفسِها التي تناديها واجهةُ المشغّل — فلا يمكن أن يُعرَض على المساعد وعلى الطرفية حسابان مختلفان لنشرٍ واحد. وكلُّ القوائم محدودةُ الطول؛ والمالُ يصل نصًّا، فلا يُقرَّب مرّتين بفاصلة JSON العائمة.",
      items: [
        {
          name: "doctor",
          what: "النتائج نفسُها التي يحسبها keel doctor — حداثة الاشتراك، وحالات السكك، وهامش الحصّة، والرفوضُ الحديثة، وصحة البيانات، وقَبوليّة التحجيم — وكلٌّ منها مع أمر سطر الأوامر الذي يحلّه.",
        },
        {
          name: "capabilities",
          what: "جردُ القدرات صفوفًا: كلُّ فعلٍ يوسّع ما يستطيع كيل فعله دون سؤالٍ مجدّدًا، والبوابةُ التي تغطّيه.",
        },
        {
          name: "profiles",
          what: "ملفاتُ إعدادات النشر صفوفًا منظّمة — قائمةُ الأصول، وسقوفُ الإنفاق، وميزانيةُ الشراء الدوري، والفترات. والملفُ الذي لا يُحمَّل يُدرَج مع خطئه.",
        },
        {
          name: "orders",
          what: "صفوفٌ من سجلّ تدقيق الأوامر، مُرشَّحةً بالنمط أو المنتج أو الحالة، الأحدثُ آخرًا، وبحدٍّ أقصى.",
        },
        {
          name: "veto_log",
          what: "أحداثُ رفض السكك المُحلَّلة من سجلّ JSONL للمحرّك منذ لحظةٍ زمنية، مع مخالفات السكة في كلِّ حدث.",
        },
        {
          name: "purification",
          what: "تقريرُ تطهير الدخول §65.9 — ما يجبُ أداؤه لكلِّ أصل، والوحداتُ من مصادر ملوَّثة، والقيودُ المنتظرة تصنيفًا بشريًّا. للتقرير فقط، كأمر سطر الأوامر.",
        },
        {
          name: "trials",
          what: "سجلُّ تجارب البحث: أعدادُ الصفوف والقرارات، وأخطاءُ التحقّق من سلسلة التلبيد، وأحدثُ الصفوف. للتجارب فقط — فللمال سجلُّه الخاص.",
        },
        {
          name: "reports",
          what: "مصادرُ البحث: عدِّ المستندات، أو اقرأ مستندًا واحدًا محدودًا — اسمًا مجرّدًا، لا مسارًا في نظام الملفات أبدًا.",
        },
      ],
      verifyNote: "تحقّق في المستودع",
    },
    cannot: {
      title: "ما لا يستطيع فعله — عن قصد",
      intro:
        "هذا هو النصفُ المهم. لا يستطيع الخادم توثيقَ أصل، ولا ترقيةَ قاعدة، ولا تسليحَ الاستقلالية، ولا إصدارَ أمرٍ أو إيقافَه أو تحريرَه — لا سياسةً بل لأنّ سطحَ الكتابة غيرَ موجود أصلًا. وصفحةُ المحرّك نفسِها تسمّي السياج بستّةِ جدران:",
      points: [
        "معجمُ أفعال الكتابة — يُفحَص اسمُ كلِّ أداة ووصفُها مقابل arm وattest وpromote وkill وplace وسائرِ أفعال الكتابة. ولا يجوز أن يُعلن وصفٌ عن كتابة، لأنّ الوصفَ هو ما يقرؤه النموذج قبل اختيار الأداة.",
        "لا فعلَ خاضعًا للبوابة يمكن بلوغُه بالاسم — لا شيء في الخادم يشير إلى مداخل module.function في سجلّ القدرات.",
        "فحصُ AST يرفض كلَّ نداءٍ كتابيٍّ — والقائمةُ البيضاء فارغةٌ ومثبَّتةٌ فارغة. وثمّة استثناءٌ واحد: PRAGMA query_only = ON، وهو نفسُه إنفاذُ القراءة-only على مستوى المحرّك.",
        "بوابةُ التأكيد التفاعلي لا تظهر في الحزمة أصلًا — فلا يجوز لعمليةٍ موصولةٍ بأنبوب أن تستعير المراسمَ الموجودة لإنسانٍ عند طرفية.",
        "تثبيتُ الوثائق — أداةٌ موثَّقةٌ لا وجود لها، أو أداةٌ مكشوفةٌ تخفيها الوثائق، كلاهما يُفشل الـCI.",
        "سطحُ استيرادٍ مغلق — لا تستورد الحزمة المنفِّذَ ولا الوكيل؛ فمساراتُ التداول تبدأ غيرَ متاحة، لا غيرَ مستعملةٍ فحسب.",
      ],
      enforcement: [
        "الحارسُ اختبارٌ — tests/mcp/test_readonly.py — سُلِّم قبل أن توجد keel/mcp/ أصلًا، فوُلد الخادم داخل السياج لا نُقل إليه لاحقًا. وصفحةُ المحرّك صادقةٌ في حدّ ذلك: الفحصُ الساكن لا يُغلق الإرسالَ الديناميكي.",
        "وفي زمن التشغيل يفتح كلُّ اتصالٍ بـ PRAGMA query_only = ON — فكتابةُ الصفوف مستحيلةٌ على مستوى المحرّك، بحكم البناء لا بحكم السياسة. وما لن يُكشف أبدًا مسمّىً أيضًا: بياناتُ الاعتماد، ومحتوى .env، وكلُّ ما في سلسلة مفاتيح النظام.",
      ],
      verifyNote: "تحقّق في المستودع",
    },
    fit: {
      title: "الملاءمةُ الصادقة: المساعدُ يقترح، والبوابةُ تقرّر",
      body: [
        "تقول وثيقةُ تصميم تغذية التحليل في كيل النمطَ في خمس كلمات — «المُحلِّل يقترح، والبوابة تقرّر»: تقترح التغذيةُ أصولًا للتوطين البشري، وتقرّر بوابةُ كيل الحتمية، ولا يلمس جديدٌ القبولَ ولا التحجيمَ ولا إصدارَ الأوامر. ويرث خادمُ MCP التباينَ نفسَه. فالمساعدُ الذي يقرأ تقاريرك يستطيع أن يشرح ماذا فعل كيلُك ولماذا أطلقت سكةٌ رفضَها؛ ولا يصلُ ما يقوله إلى أمرٍ أبدًا.",
        "ذلك الحدُّ هو الميزة. فروبوتُ محادثةٍ يستطيع صياغةَ استراتيجيةٍ وترقيتَها يتجاوز سلّم مرشَّحة ← تجريبية ← حيّة وفحصَ الإفراط في المُلاءمة في جملةٍ واحدة. وإجابةُ كيل ليست روبوتًا أشدَّ أدبًا؛ بل خادمٌ لا يستطيع، يحرسه اختبارٌ يفشل إن تعلّم يومًا كيف.",
      ],
      punchline: "المساعدون يقترحون. وبواباتُ كيل ما زالت تقرّر.",
    },
    docsNote:
      "يُجلب المرجعُ الكامل للخادم من المحرّك وقت البناء ويُعرض في الوثائق — هذه الصفحة تلخّص، وتلك الصفحة هي المستند.",
  },

  fr: {
    rev: "2026-08-28.1",
    translatedFromRev: "2026-08-28.1",
    title: "Pointez votre propre assistant sur votre propre keel — keel",
    description:
      "keel livre un serveur MCP en lecture seule : votre propre assistant — Claude Desktop, n'importe quel client MCP — lit votre propre moteur via stdio, sur votre machine. keel n'héberge rien, ne voit rien, ne relaie rien.",
    hero: {
      eyebrow: "Pas de chatbot hébergé · pas de compte · pas de clé",
      heading: "Votre assistant, pointé sur votre keel",
      sub: "Des plateformes vendent une IA hébergée qui rédige des stratégies pour vous, facturée à l'abonnement. La réponse de keel est plus modeste et ne coûte rien à faire tourner : keel livre un serveur MCP en lecture seule, et vous pointez votre propre assistant sur le keel qui tourne sur votre propre machine, avec vos propres clés. Le moteur n'a nulle part où envoyer un prompt, donc il n'en envoie aucun — la part de keel dans l'échange ne quitte jamais votre machine.",
    },
    boundary: {
      title: "La frontière honnête",
      body: [
        "keel n'héberge pas d'assistant, ne voit pas vos conversations et ne relaie rien. Il n'y a pas de cloud keel à qui parler, pas de compte à mesurer, pas de clé à coller dans un site web — rien où se connecter. Le serveur est un processus local qui parle en stdio à un client sur la même machine.",
        "Une réserve honnête, énoncée plutôt que suggérée : ce que le fournisseur de votre assistant fait des prompts qu'il reçoit relève de votre arrangement avec ce fournisseur. keel n'y est partie et ne peut le voir. La moitié de keel est locale ; la moitié de l'assistant est ce que vous avez choisi en choisissant un client.",
        "Il n'y a rien à payer keel sur cette page. La page est un mode d'emploi.",
      ],
    },
    whatIs: {
      title: "Ce qu'est un serveur MCP, en une phrase",
      sentence:
        "MCP (Model Context Protocol) est un standard ouvert qui permet à un assistant IA d'appeler des outils exposés par un programme : l'assistant demande, le programme répond d'après ce qu'il peut voir.",
      body: [
        "Le serveur de keel le parle sur stdio — un message JSON-RPC 2.0 par ligne en entrée, une réponse par ligne en sortie, jusqu'au EOF — écrit à la main sur la bibliothèque standard : pas de SDK MCP, pas de pydantic, pas d'asyncio, aucune nouvelle dépendance. Quand un client demande à qui il parle, le serveur répond keel-read-only. Le nom est toute la proposition.",
      ],
    },
    connect: {
      title: "Pointer un client dessus",
      intro:
        "Les deux blocs ci-dessous sont ceux du moteur, cités verbatim de sa documentation du serveur — adaptez les chemins à votre déploiement.",
      runLabel: "Lancer le serveur",
      configLabel: "L'enregistrer auprès de votre client",
      clientsNote:
        "L'instruction du moteur tient en une ligne : pointez n'importe quel client MCP stdio sur la commande — Claude Desktop, Cursor, Codex, VS Code, Zed consomment tous cette même forme mcpServers. Où chaque client garde cette configuration relève de la documentation du client ; la part de keel, c'est la commande et la clôture autour d'elle.",
      verifyNote: "Vérifier dans le dépôt",
    },
    tools: {
      title: "Ce que les huit outils permettent à un assistant",
      intro:
        "Huit outils, chacun déléguant aux mêmes coutures de service que l'interface d'un opérateur appelle — un assistant et un terminal ne peuvent donc pas se voir raconter deux comptes différents d'un même déploiement. Toutes les listes sont bornées ; l'argent arrive en chaînes de caractères, jamais arrondi deux fois par un flottant JSON.",
      items: [
        {
          name: "doctor",
          what: "Les mêmes constats que calcule keel doctor — fraîcheur de l'abonnement, états des garde-fous, marge du quota, vetos récents, santé des données, admissibilité du dimensionnement — chacun avec la commande qui le résout.",
        },
        {
          name: "capabilities",
          what: "L'inventaire des capacités en lignes : chaque action qui élargit ce que keel peut faire sans redemander, et le verrou qui la couvre.",
        },
        {
          name: "profiles",
          what: "Les fichiers de configuration du déploiement en lignes structurées — liste blanche, plafonds, budget DCA, granularités. Un fichier qui ne charge pas est listé avec son erreur.",
        },
        {
          name: "orders",
          what: "Des lignes du journal d'audit des ordres, filtrées par mode, produit ou statut, les plus récentes en dernier, bornées.",
        },
        {
          name: "veto_log",
          what: "Les événements de veto des garde-fous, extraits du journal JSONL du moteur depuis un horodatage, avec les violations de chaque événement.",
        },
        {
          name: "purification",
          what: "Le rapport de purification des revenus §65.9 — ce qui est dû par actif, unités issues de sources entachées, entrées en attente de classification humaine. Rapport uniquement, comme la CLI.",
        },
        {
          name: "trials",
          what: "Le registre des essais de recherche : nombres de lignes et de décisions, erreurs de vérification de la chaîne de hachage, lignes les plus récentes. Les essais uniquement — l'argent a son propre registre.",
        },
        {
          name: "reports",
          what: "Les corpus de recherche : lister les documents, ou lire un document borné — un nom simple, jamais un chemin de système de fichiers.",
        },
      ],
      verifyNote: "Vérifier dans le dépôt",
    },
    cannot: {
      title: "Ce qu'il ne peut délibérément pas faire",
      intro:
        "La moitié intéressante. Le serveur ne peut ni attester un actif, ni promouvoir une règle, ni armer l'autonomie, ni passer, arrêter ou libérer un ordre — non par politique, mais parce que la surface d'écriture n'existe pas. La page du moteur nomme la clôture, en six murs :",
      points: [
        "Un vocabulaire de verbes d'écriture — chaque nom et chaque description d'outil est scanné contre arm, attest, promote, kill, place et les autres verbes d'écriture. Une description ne peut pas annoncer une écriture, car une description est ce qu'un modèle lit avant de choisir un outil.",
        "Aucune action verrouillée n'est atteignable par son nom — rien dans le serveur ne référence les entrées module.function du registre des capacités.",
        "Un scan AST qui refuse tout appel d'écriture — la liste blanche est vide, et épinglée vide. Une exemption existe : PRAGMA query_only = ON, l'application de la lecture seule au niveau du moteur elle-même.",
        "Le verrou de confirmation interactive n'apparaît nulle part dans le paquet — un processus relié par un tuyau ne doit pas emprunter la cérémonie faite pour un humain à un terminal.",
        "Un épinglage de la documentation — un outil documenté qui n'existe pas, ou un outil exposé que la documentation cache, fait échouer la CI.",
        "Une surface d'imports fermée — le paquet n'importe ni l'exécuteur ni l'agent ; les chemins de trading démarrent indisponibles, pas simplement inutilisés.",
      ],
      enforcement: [
        "Le gardien est un test — tests/mcp/test_readonly.py — livré avant que keel/mcp/ n'existe, si bien que le serveur est né dans la clôture plutôt que déplacé dans une plus tard. La page du moteur est honnête sur la limite : un scan statique ne peut pas fermer la répartition dynamique.",
        "Et à l'exécution, chaque connexion s'ouvre avec PRAGMA query_only = ON — écrire une ligne est impossible au niveau du moteur, par construction et non par politique. Ce qui ne sera jamais exposé est nommé aussi : les identifiants, le contenu du .env, tout ce qui vient du trousseau du système.",
      ],
      verifyNote: "Vérifier dans le dépôt",
    },
    fit: {
      title: "L'ajustement honnête : l'assistant propose, le verrou décide",
      body: [
        "La note de conception du flux d'analyse de keel énonce le motif en cinq mots — l'Analyzer propose, le verrou décide : le flux propose des actifs à l'attestation humaine, le verrou déterministe de keel décide, et rien de nouveau ne touche l'admission, le dimensionnement ou le passage d'ordres. Le serveur MCP hérite de la même asymétrie. Un assistant qui lit vos rapports peut expliquer ce que votre keel a fait et pourquoi un garde-fou a tiré ; rien de ce qu'il dit n'atteint un ordre.",
        "Cette frontière est la fonctionnalité. Un chatbot capable de rédiger une stratégie et de la promouvoir contournerait l'échelle candidate → papier → réel et son contrôle de surapprentissage en une seule phrase. La réponse de keel n'est pas un chatbot mieux élevé ; c'est un serveur qui ne peut pas, gardé par un test qui échoue s'il apprend jamais comment.",
      ],
      punchline: "Les assistants proposent. Les verrous de keel décident toujours.",
    },
    docsNote:
      "La référence complète du serveur est récupérée du moteur au moment du build et rendue dans la Documentation — cette page résume ; cette page-là est le document.",
  },
};
