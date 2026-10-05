export const siteConfig = {
  name: "Hitaansh Jain",
  url: "https://hitaansh.dev",
  email: "hitaansh1912@gmail.com",
  github: "https://github.com/hitaanshjain",
  linkedin: "https://www.linkedin.com/in/hitaanshjain/",
  // Named rather than "resume.pdf" so it lands in a recruiter's downloads
  // folder already labelled. next.config.ts redirects the old path.
  resumePath: "/Hitaansh_Jain_Resume.pdf",
};

export const hero = {
  typedLine: "CS @ NYU '27. Full-stack and AI engineer.",
  // Two rows: identity first, availability second. One row of five
  // dot-separated items wraps into an unreadable block on narrow screens.
  statusLines: [
    ["Prev. SWE Intern @ Header", "Prev. SWE Intern, AI @ MathGPT", "3.93 GPA"],
    ["Open to new grad SWE opportunities starting Summer 2027", "New York-based, open to relocation"],
  ],
};

export type ExperienceEntry = {
  company: string;
  url?: string;
  role: string;
  timeframe: string;
  bullets: string[];
  compact?: boolean;
  detail?: string;
  caseStudySlug?: string;
};

// STALENESS CHECK (last reviewed 2026-10-02, both repos reconned 2026-09-15).
// 2026-10-02: Follow-ups is named publicly by the author's decision, matching
// the resume, although Header had not announced it on any public surface.
// Both roles end at Aug 2026 here. MathGPT work did continue into September on
// a contract extension, but the site closes both roles in August by decision.
// Do not "correct" that. Fall new-grad recruiting peaks Sept–Nov.
//
// Re-verified 2026-09-15, leave alone: Header 700+ tests (756 on mainline),
// 100+ endpoints (157 route handlers), three-stage pipeline, six providers,
// dozens of migrations (54). MathGPT five stages, three artifacts, 45 sections
// and 195 learning objectives, nine-table schema, the 247-line parser.
//
// Corrections applied the same day. Do not restore any from memory, re-check
// the source repo first:
//   - Header "3 major features owned" became "built". The LB formats were
//     later replaced by a teammate's design, and the lifecycle design spec and
//     the original feature were teammates' work.
//   - Header: the layout flag is confirmed ON, re-verified 2026-09-16 from
//     public briefing mirrors dated Sept 10-16 that carry the flag-on section
//     order. The env var itself was never read, so keep the wording about
//     observed output rather than about the variable.
//   - Header: Link Bankruptcy was renamed Clear Tabs in the app on 2026-08-28.
//     The old name is gone from public copy but survives as the API path.
//   - Header: the LB formats paragraph is past tense now. That design was
//     superseded and the custom format is hidden in the web app.
//   - MathGPT "headed to production on mathgpt.ai" became content handed to
//     their engineering team. No integration code exists in the repo. Swap to
//     "live at MathGPT.ai" only when students can actually reach it.
//   - MathGPT: the zod-contract, critic-whitelist, cached-walkthrough and
//     fixed-LaTeX-template sentences were scoped down to what the code does.
// rag-search.mdx is dated "July 2025 – Present" because that project is still
// worked on, intermittently (last burst Sept 2026, 27 commits in five days).
// If a year passes with no commits to local-rag-search-engine, close the
// range rather than leaving "Present" to rot.
export const experience: ExperienceEntry[] = [
  {
    company: "Header",
    url: "https://joinheader.com",
    role: "Software Engineer Intern",
    timeframe: "May 2026 – Aug 2026",
    caseStudySlug: "header",
    bullets: [
      "Built the Follow-ups feature, letting users capture ideas from their briefings and follow them through to a recorded verdict: a 6-state lifecycle, 9 REST endpoints, 3 migrations, email reminders, and a React Native web UI, shipped to production over three weeks.",
      "Shipped full-stack briefing customization to production, letting users reorder, toggle, and set the detail level of each section, by refactoring a hardcoded prompt into blocks assembled from a JSONB layout model, and cut TLDR length by 45% with an A/B-tested word budget.",
      "Delivered the briefing formats and history view for Clear Tabs: a submit-time format picker with validated user-written sections, plus a React Native history screen on an authenticated, paginated FastAPI endpoint.",
      "Engineered an API that lets AI coding agents drive Follow-ups concurrently with their users: row-locked, forward-only sync with an audit event per change, credential-derived verdict authority, per-key approval gating, and a compare-and-set fix for a delete race.",
      "Directed and reviewed Claude Code daily under hooks that blocked test rewrites and untested pushes, writing 750+ tests across an LLM pipeline, FastAPI/PostgreSQL backend, and React Native/Expo frontend, with every merge through senior review.",
    ],
  },
  {
    company: "MathGPT",
    url: "https://mathgpt.ai",
    role: "Software Engineer Intern, AI (Part-Time)",
    timeframe: "May 2026 – Aug 2026",
    caseStudySlug: "case-study-pipeline",
    bullets: [
      "Designed and built a five-stage TypeScript/Next.js pipeline that turns a calculus textbook problem into three verified study artifacts: a compiled LaTeX case study, concept flashcards, and a step-by-step solution walkthrough, deployed for internal review with the content handed to MathGPT's engineering team for integration.",
      "Designed a generator/critic LLM architecture where the critic re-solves each problem before the generator's drafts even exist, and halts the pipeline on mismatch.",
      "Imported 1,985 production templates from 3 textbooks into MySQL by writing HTML-to-LaTeX and AsciiMath-to-LaTeX converters (98% of answers converted), making linear algebra templates usable.",
      "Generated 900+ concept and problem flashcards, batching 622 problem decks through the Claude Batch API at about $0.04 each, behind Zod and answer-checking gates that sent 15% back for retry before human review.",
      "Owned the corpus extraction system, stage validation contracts, and MySQL flashcard cache, covered by 1,000+ automated tests including negative controls, working on a three-intern Agile team with weekly project-lead syncs.",
    ],
  },
  {
    company: "Vardhman Infotech",
    role: "Software Engineer Intern (Part-Time)",
    timeframe: "Dec 2024 – May 2025",
    compact: true,
    bullets: [
      "Migrated a Python inventory system serving 1,500+ retail locations from MySQL to Access to meet the client's offline, zero-infrastructure requirement: a 394-column schema across 19 tables, and 700+ queries rewritten across 43 files.",
    ],
    detail:
      "Refactored a 73-function MySQL database layer into a metadata-driven Access architecture, implementing a configuration-driven schema provisioner that dynamically issued CREATE TABLE and ALTER TABLE operations across 7 .accdb files.",
  },
];

export const compactProjects = [
  {
    name: "Stock Analyzer",
    line: "3-tier stock analysis platform: Dockerized Flask + MongoDB, an 8-worker parallel pipeline, and an 80% coverage gate enforced in CI.",
    github: "https://github.com/hitaanshjain/StockAnalyzer",
  },
  {
    name: "VocabLearn",
    line: "JWT-authenticated vocabulary app with an AI reverse-dictionary. Led backend on a 5-person Agile team.",
    github: "https://github.com/hitaanshjain/VocabLearn",
  },
  {
    name: "ExpenseSplitter",
    line: "Real-time expense splitting over Socket.io with live sync across connected clients.",
    github: "https://github.com/hitaanshjain/ExpenseSplitter",
  },
];

export type SkillItem = { name: string; usedAt?: string };

export const skills: { group: string; items: SkillItem[] }[] = [
  {
    group: "Languages",
    items: [
      { name: "Python", usedAt: "Header · RAG search · Stock Analyzer" },
      { name: "TypeScript", usedAt: "Header · MathGPT" },
      { name: "JavaScript", usedAt: "VocabLearn · ExpenseSplitter" },
      { name: "Java", usedAt: "NYU coursework" },
      { name: "C", usedAt: "NYU coursework" },
      { name: "SQL", usedAt: "Header · MathGPT · Vardhman" },
      { name: "C#", usedAt: "Swordfight" },
    ],
  },
  {
    group: "Backend & Data",
    items: [
      { name: "FastAPI", usedAt: "Header · RAG search" },
      { name: "Flask", usedAt: "Stock Analyzer" },
      { name: "Node.js", usedAt: "VocabLearn · ExpenseSplitter" },
      { name: "Express", usedAt: "VocabLearn · ExpenseSplitter" },
      { name: "PostgreSQL", usedAt: "Header" },
      { name: "MySQL", usedAt: "MathGPT · Vardhman" },
      { name: "MongoDB", usedAt: "Stock Analyzer" },
      { name: "REST APIs", usedAt: "Header · VocabLearn" },
      { name: "JWT/session auth", usedAt: "VocabLearn · Stock Analyzer" },
      { name: "Schema migrations", usedAt: "Header" },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "React", usedAt: "MathGPT · RAG search" },
      { name: "Next.js", usedAt: "MathGPT" },
      { name: "React Native/Expo", usedAt: "Header" },
    ],
  },
  {
    group: "AI & Data Engineering",
    items: [
      { name: "LLMs (OpenAI, Anthropic, Gemini, Ollama APIs)", usedAt: "Header · MathGPT · RAG search · VocabLearn" },
      { name: "RAG", usedAt: "RAG search platform" },
      { name: "LangChain", usedAt: "RAG search" },
      { name: "ChromaDB", usedAt: "RAG search" },
      { name: "Pandas", usedAt: "NYU coursework" },
      { name: "NumPy", usedAt: "NYU coursework" },
    ],
  },
  {
    group: "Testing & DevOps",
    items: [
      { name: "Pytest", usedAt: "Header" },
      { name: "Vitest", usedAt: "ExpenseSplitter" },
      { name: "Mocha", usedAt: "VocabLearn" },
      { name: "Docker", usedAt: "Stock Analyzer" },
      { name: "Git", usedAt: "every project" },
      { name: "GitHub Actions", usedAt: "Stock Analyzer · this site" },
      { name: "CI/CD", usedAt: "Stock Analyzer · this site" },
      { name: "Render", usedAt: "VocabLearn" },
      { name: "Agile/Scrum", usedAt: "MathGPT · VocabLearn" },
      { name: "AI-assisted development (Claude Code)", usedAt: "Header · MathGPT · this site" },
    ],
  },
];

export const about = {
  paragraphs: [
    "I'm a CS major with a math minor at NYU (3.93 GPA), graduating in Spring 2027. I spent this summer interning at [Header](https://joinheader.com) and building an AI case-study pipeline at [MathGPT](https://mathgpt.ai).",
    "The projects I've enjoyed most had awkward constraints: an inventory system that had to run with no infrastructure at all, math help for struggling students where the AI isn't allowed to be wrong, and a ten-person game team sharing files that don't merge. Figuring out how to build quality software around such blockers and constraints is the part I like.",
    "I'm looking for new grad software engineering roles starting Summer 2027. If you're building something in that space, I'd love to talk.",
  ],
};
