export const siteConfig = {
  name: "Hitaansh Jain",
  url: "https://hitaanshjain.vercel.app",
  email: "hitaansh1912@gmail.com",
  github: "https://github.com/hitaanshjain",
  linkedin: "https://www.linkedin.com/in/hitaanshjain/",
  resumePath: "/resume.pdf",
};

export const hero = {
  prompt: "$ whoami",
  typedLine: "CS @ NYU '27. Full-stack and AI engineer.",
  // Two rows: identity first, availability second. One row of five
  // dot-separated items wraps into an unreadable block on narrow screens.
  statusLines: [
    ["SWE Intern @ Header", "AI Intern @ MathGPT", "3.93 GPA"],
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

// STALENESS CHECK (last reviewed 2026-08-05). When either internship ends,
// update all of the following together:
//   1. the `timeframe` on that entry below ("… – Present" → an end month)
//   2. the matching item in hero.statusLines[0] ("SWE Intern @ Header" etc.)
//   3. present-tense bullets on that entry ("Building …" → "Built …")
// Add the outcome at the same time ("shipped X before the internship ended").
// Fall new-grad recruiting peaks Sept–Nov, so this needs to be right by then.
// Also: case-study-pipeline.mdx says the pipeline "is going to be deployed to
// MathGPT.ai production soon" (written Aug 2026, expected within the month).
// Swap to "deployed at MathGPT.ai" the day it ships.
export const experience: ExperienceEntry[] = [
  {
    company: "Header",
    url: "https://joinheader.com",
    role: "Software Engineer Intern",
    timeframe: "May 2026 – Present",
    caseStudySlug: "header",
    bullets: [
      "Shipped full-stack customization for AI-generated briefings (per-section reorder, toggles, and detail control) to production, refactoring generation from a hardcoded prompt to dynamically assembled sections backed by a JSONB section model.",
      "Owned a briefing history feature end to end: a paginated authenticated FastAPI endpoint, a React Native history screen, and metadata denormalized ahead of an automated cleanup job that would otherwise erase it.",
      "Wrote 400+ automated tests on a test-per-feature workflow across a multi-provider LLM pipeline, FastAPI/PostgreSQL backend, and React Native/Expo frontend.",
    ],
  },
  {
    company: "MathGPT",
    url: "https://mathgpt.ai",
    role: "AI Intern (Part-Time)",
    timeframe: "May 2026 – Present",
    caseStudySlug: "case-study-pipeline",
    bullets: [
      "Building a five-stage TypeScript/Next.js pipeline that turns a calculus textbook problem into three verified study artifacts: a compiled LaTeX case study, concept flashcards, and a step-by-step solution walkthrough.",
      "Designed a generator/critic LLM architecture where the critic re-solves each problem before the generator's drafts even exist, and halts the pipeline on mismatch.",
      "Own the corpus extraction system, stage validation contracts, and MySQL flashcard cache, covered by 210 automated tests including negative controls.",
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

export const skills = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "C#"],
  },
  {
    group: "Backend & Data",
    items: ["FastAPI", "Flask", "Node.js", "Express", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "React Native/Expo"],
  },
  {
    group: "AI & Data Engineering",
    items: ["LLMs (OpenAI API, Ollama)", "RAG", "LangChain", "ChromaDB", "Pandas", "NumPy"],
  },
  {
    group: "Testing & DevOps",
    items: [
      "Pytest",
      "Vitest",
      "Mocha",
      "Docker",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Render",
      "Agile/Scrum",
      "AI-assisted development (Claude Code)",
    ],
  },
];

export const about = {
  paragraphs: [
    "I'm a CS major with a math minor at NYU (3.93 GPA), graduating in Spring 2027. I'm spending this summer interning at [Header](https://joinheader.com) and building an AI case-study pipeline at [MathGPT](https://mathgpt.ai).",
    "The projects I've enjoyed most had awkward constraints: an inventory system that had to run with no infrastructure at all, math help for struggling students where the AI isn't allowed to be wrong, and a ten-person game team sharing files that don't merge. Figuring out how to build quality software around such blockers and constraints is the part I like.",
    "I'm looking for new grad software engineering roles starting Summer 2027. If you're building something in that space, I'd love to talk.",
  ],
};
