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
  typedLine: "CS @ NYU. Full-stack and AI engineer.",
  statusItems: [
    "SWE Intern @ Header",
    "AI Intern @ MathGPT",
    "Open to New Grad Software Engineering Roles starting Summer 2027",
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
};

export const experience: ExperienceEntry[] = [
  {
    company: "Header",
    url: "https://joinheader.com",
    role: "Software Engineer Intern",
    timeframe: "June 2026 – Present",
    bullets: [
      "Shipped full-stack customization for AI-generated briefings (per-section reorder, toggles, and detail control), refactoring the generation pipeline from fixed sections to a dynamically assembled prompt backed by a JSONB section model.",
      "Owned a release-gating recovery feature end to end: a paginated, Clerk-authenticated FastAPI endpoint, a frontend history screen, and metadata persistence designed to survive automated cleanup.",
      "Wrote 130+ automated tests on a test-per-feature workflow across a multi-provider LLM pipeline, FastAPI/PostgreSQL backend, and React Native/Expo frontend.",
    ],
  },
  {
    company: "MathGPT",
    url: "https://mathgpt.ai",
    role: "AI Intern (Part-Time)",
    timeframe: "May 2026 – Present",
    bullets: [
      "Building a spec-driven pipeline that turns a textbook problem into a verified LaTeX case study and concept flashcard deck.",
      "Designed a generator/critic LLM architecture where the critic independently re-solves each problem before seeing any draft, and halts the pipeline on mismatch.",
      "Own the corpus extraction system, package validator, and MySQL flashcard database, covered by 27 automated tests including negative controls.",
    ],
  },
  {
    company: "Vardhman Infotech",
    role: "Software Engineer Intern (Part-Time)",
    timeframe: "Dec 2024 – May 2025",
    compact: true,
    bullets: [
      "Backend CRUD and a full SQL → Microsoft Access migration (394-column schema, 700+ queries rewritten across 43 files) for an inventory system serving 1,500+ retail locations.",
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
    group: "Languages & Frameworks",
    items: ["Python", "FastAPI", "Flask", "Java", "JavaScript", "Node.js", "Express", "React", "SQL", "MongoDB", "Pytest", "Mocha"],
  },
  {
    group: "AI & Data Engineering",
    items: ["LLMs (OpenAI API, Ollama)", "RAG", "LangChain", "ChromaDB", "Pandas", "NumPy"],
  },
  {
    group: "DevOps & Workflow",
    items: ["Claude Code", "Git", "GitHub Actions", "Render", "CI/CD", "Agile/Scrum"],
  },
];

export const about = {
  paragraphs: [
    "I'm a CS major with a math minor at NYU ('27), spending this summer interning at Header and building an AI case-study pipeline at MathGPT.",
    "The through-line in my work is AI systems you can actually trust: outputs verified by an independent second model, provenance that survives the pipeline, and tests that catch silent failures.",
    "I'm looking for new grad software engineering roles starting Summer 2027. If you're building something in that space, I'd love to talk.",
  ],
};
