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
    ["Prev. SWE Intern @ Header", "Prev. AI Intern @ MathGPT", "3.93 GPA"],
    ["Open to new grad SWE opportunities starting Summer 2027", "Seattle-based, open to relocation"],
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

// STALENESS CHECK (last reviewed 2026-09-16, both repos reconned 2026-09-15).
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
export const experience: ExperienceEntry[] = [
  {
    company: "Header",
    url: "https://joinheader.com",
    role: "Software Engineer Intern",
    timeframe: "May 2026 – Aug 2026",
    caseStudySlug: "header",
    bullets: [
      "Shipped full-stack customization for AI-generated briefings (per-section reorder, toggles, and detail control) to production, refactoring generation from a hardcoded prompt to dynamically assembled sections backed by a JSONB section model.",
      "Built Link Bankruptcy (bulk-closes a user's open tabs and returns a briefing summarizing them) formatting end-to-end: built a paginated, authenticated FastAPI history endpoint with a React Native screen, a submit-time format picker with user-written sections, and preserved submission metadata a scheduled cleanup job would otherwise have deleted.",
      // Unannounced surface with no public UI. Keep this at the shape of the
      // work. Do not add specifics.
      "Built a multi-phase backend lifecycle system across five stacked PRs, covering schema design, a state machine, the write API, email delivery, and agent-facing parity, plus the web UI in the final PR.",
      "Wrote 700+ automated tests on a test-per-feature workflow across a multi-provider LLM pipeline, FastAPI/PostgreSQL backend, and React Native/Expo frontend, with every change merged through a senior engineer's code review.",
    ],
  },
  {
    company: "MathGPT",
    url: "https://mathgpt.ai",
    role: "AI Intern (Part-Time)",
    timeframe: "May 2026 – Aug 2026",
    caseStudySlug: "case-study-pipeline",
    bullets: [
      "Built a five-stage TypeScript/Next.js pipeline that turns a calculus textbook problem into three verified study artifacts: a compiled LaTeX case study, concept flashcards, and a step-by-step solution walkthrough, deployed for internal review with the content handed to MathGPT's engineering team for integration.",
      "Designed a generator/critic LLM architecture where the critic re-solves each problem before the generator's drafts even exist, and halts the pipeline on mismatch.",
      "Owned the corpus extraction system, stage validation contracts, and MySQL flashcard cache, covered by 1,000+ automated tests including negative controls, working on a three-intern Agile team with weekly project-lead syncs.",
    ],
  },
  {
    company: "Vardhman Infotech",
    role: "Software Engineer Intern (Part-Time)",
    timeframe: "Dec 2024 – May 2025",
    compact: true,
    bullets: [
      "Backend CRUD and a full MySQL → Microsoft Access migration for an inventory system serving 1,500+ retail locations, moved to Access to meet the client's offline, zero-infrastructure deployment constraint (394-column schema, 700+ queries rewritten across 43 files).",
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
      { name: "LLMs (OpenAI API, Ollama)", usedAt: "Header · MathGPT · RAG search" },
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
