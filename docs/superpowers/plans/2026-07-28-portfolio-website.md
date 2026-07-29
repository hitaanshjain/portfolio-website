# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy Hitaansh Jain's portfolio — a one-page Next.js homepage plus three MDX case study pages — to Vercel.

**Architecture:** Statically generated Next.js App Router site. All homepage copy lives as typed constants in `lib/data.ts`; case studies are MDX files in `content/case-studies/` parsed by `lib/case-studies.ts` (gray-matter) and rendered by `next-mdx-remote/rsc` through a shared `CaseStudyLayout`. Featured project cards are derived from case-study frontmatter (DRY). The only client-side JS is the hero typing effect.

**Tech Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · next-mdx-remote v5 + gray-matter · Vitest + @testing-library/react · GitHub Actions · Vercel.

## Global Constraints

- Working directory: `C:\Users\hitaa\Downloads\portfolio website` (note the space — always quote paths). Repo already initialized; spec at `docs/superpowers/specs/2026-07-28-portfolio-website-design.md`.
- Platform: Windows / PowerShell. Use `npm`. Node 22 in CI.
- TypeScript strict; ESLint clean; no animation libraries — CSS only, except the typing hook.
- All animation honors `prefers-reduced-motion` (typing renders static text; dot stops pulsing).
- Palette (exact): paper `#FAF7F0`, ink `#1C1B1A`, ink-muted `#5A554E`, night (accent) `#1E3480`, night-deep `#14245C`, status green `#15803D`. Accent used sparingly: links, status dot, small highlights.
- Fonts (via `next/font/google`, self-hosted at build): **Fraunces** (display/headings), **DM Sans** (body), **JetBrains Mono** (mono accents).
- **BANNED CLAIMS — never let these appear anywhere in the site:** RAG "2% → 66% hit rate", "40% → 80%", "sub-100ms TTFT", "SSE" as a label for the RAG transport (say "streaming fetch"/"token streaming"). RAG may only use: 34% @k=3, 50% @k=5 (keyword baseline), 3,796 chunks, 50MB index, 9 sources, ~700 Python LOC. MathGPT page: only 27 tests, 75 concept cards, 195 objectives, 45 extracted sections, ~900 Python / ~600 SQL / ~2,100 prompt-contract lines. No other metrics may be invented for any project.
- **MathGPT confidentiality (hard rules):** never name the client company or any person; no reverse-engineering analysis, benchmark content, roadmap items (including animated/GIF cards), production integration schema, teammates' work, or textbook corpus contents. Techniques described generically. "MathGPT.ai" as employer name is allowed.
- Commit after every task with the trailer: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

## File Structure

```
app/layout.tsx            Root layout: fonts, Nav, Footer, base metadata
app/page.tsx              Homepage assembling section components
app/globals.css           Tailwind import, @theme tokens, animations, link-underline
app/not-found.tsx         Styled 404
app/sitemap.ts            Sitemap (4 URLs)
app/icon.svg              Pixel-sword favicon
app/opengraph-image.tsx   OG card via next/og
app/projects/[slug]/page.tsx  Case study route (SSG, dynamicParams=false)
components/Nav.tsx, Hero.tsx, TypingLine.tsx, ExperienceTimeline.tsx,
  ProjectCard.tsx, FeaturedProjects.tsx, CompactProjects.tsx, Skills.tsx,
  About.tsx, Footer.tsx, CaseStudyLayout.tsx, PixelSword.tsx
hooks/useTypewriter.ts    Typing effect (client)
lib/data.ts               ALL homepage copy + site config (typed constants)
lib/case-studies.ts       MDX loader: slugs, frontmatter validation, ordering
content/case-studies/case-study-pipeline.mdx, rag-search.mdx, swordfight.mdx
tests/setup.ts, tests/useTypewriter.test.ts, tests/case-studies.test.ts
public/resume.pdf, public/images/headshot.jpg, public/images/avatar.jpg
.github/workflows/ci.yml
```

---

### Task 1: Scaffold Next.js app

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Copy: `Hitaansh_Jain_Resume.pdf` → `public/resume.pdf`; `headshot.jpg` → `public/images/headshot.jpg`

**Interfaces:**
- Produces: CSS tokens (`bg-paper`, `text-ink`, `text-ink-muted`, `text-night`, `bg-night`, `font-display`, `font-body`, `font-mono`) and the `.link-underline` and `.status-dot` classes; layout with font variables. All later components rely on these exact names.

- [ ] **Step 1: Write config files**

`package.json`:

```json
{
  "name": "hitaanshjain-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

`postcss.config.mjs`:

```js
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

`eslint.config.mjs`:

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", "node_modules/**", "docs/**"] },
];

export default eslintConfig;
```

- [ ] **Step 2: Install dependencies**

```powershell
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss@4 "@tailwindcss/postcss@4" "@tailwindcss/typography" eslint eslint-config-next@15 "@eslint/eslintrc"
```

- [ ] **Step 3: Write `app/globals.css`**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-paper: #faf7f0;
  --color-ink: #1c1b1a;
  --color-ink-muted: #5a554e;
  --color-night: #1e3480;
  --color-night-deep: #14245c;
  --color-status: #15803d;
  --font-display: var(--font-fraunces);
  --font-body: var(--font-dm-sans);
  --font-mono: var(--font-jetbrains);
}

::selection {
  background: var(--color-night);
  color: var(--color-paper);
}

.link-underline {
  position: relative;
}
.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 1px;
  width: 100%;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.link-underline:hover::after,
.link-underline:focus-visible::after {
  transform: scaleX(1);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
.status-dot {
  animation: pulse-dot 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .status-dot { animation: none; }
  .link-underline::after { transition: none; }
}
```

- [ ] **Step 4: Write `app/layout.tsx` and placeholder `app/page.tsx`**

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Fraunces, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Hitaansh Jain",
  description: "CS @ NYU. I build AI pipelines — and the systems that keep them honest.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">{children}</body>
    </html>
  );
}
```

`app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-6xl">Hitaansh Jain</h1>
    </main>
  );
}
```

- [ ] **Step 5: Copy assets**

```powershell
New-Item -ItemType Directory -Force public\images
Copy-Item "Hitaansh_Jain_Resume.pdf" "public\resume.pdf"
Copy-Item "headshot.jpg" "public\images\headshot.jpg"
```

- [ ] **Step 6: Verify build, lint, typecheck all pass**

Run: `npm run build`, then `npm run lint`, then `npm run typecheck`
Expected: build succeeds with `/` statically generated; lint and typecheck exit 0.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 app with design tokens"
```

---

### Task 2: Content & data layer (TDD)

**Files:**
- Create: `lib/data.ts`, `lib/case-studies.ts`, `content/case-studies/case-study-pipeline.mdx`, `content/case-studies/rag-search.mdx`, `content/case-studies/swordfight.mdx`, `vitest.config.ts`, `tests/setup.ts`, `tests/case-studies.test.ts`

**Interfaces:**
- Produces (used by every later component task):
  - `lib/data.ts`: `siteConfig: { name; url; email; github; linkedin; resumePath }`, `hero: { prompt; typedLine; statusItems: string[] }`, `experience: ExperienceEntry[]` where `ExperienceEntry = { company: string; url?: string; role: string; timeframe: string; bullets: string[]; compact?: boolean; detail?: string }`, `compactProjects: { name: string; line: string; github: string }[]`, `skills: { group: string; items: string[] }[]`, `about: { paragraphs: string[] }`
  - `lib/case-studies.ts`: `getCaseStudySlugs(): string[]`, `getCaseStudy(slug: string): CaseStudy` (throws `Unknown case study: <slug>` on miss), `getAllCaseStudies(): CaseStudy[]` (sorted by `frontmatter.order`), types `CaseStudy = { frontmatter: CaseStudyFrontmatter; content: string }`, `CaseStudyFrontmatter = { title; slug; timeframe; role; tags: string[]; hook; order: number; badge?: string; pixel?: boolean; links: { label: string; href: string }[] }`

- [ ] **Step 1: Install test tooling and content deps**

```powershell
npm install gray-matter next-mdx-remote@5
npm install -D vitest "@vitejs/plugin-react" "@testing-library/react" jsdom
```

- [ ] **Step 2: Write vitest config and setup**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
  },
  resolve: { alias: { "@": path.resolve(__dirname) } },
});
```

`tests/setup.ts`:

```ts
// Configurable matchMedia mock; tests flip `reducedMotion` as needed.
export const mediaState = { reducedMotion: false };

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion") && mediaState.reducedMotion,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

- [ ] **Step 3: Write the failing test**

`tests/case-studies.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getCaseStudySlugs, getCaseStudy, getAllCaseStudies } from "@/lib/case-studies";

describe("case studies", () => {
  it("finds exactly the three case studies", () => {
    expect(getCaseStudySlugs().sort()).toEqual(["case-study-pipeline", "rag-search", "swordfight"]);
  });

  it("every case study has required frontmatter and a substantial body", () => {
    for (const cs of getAllCaseStudies()) {
      expect(cs.frontmatter.title.length).toBeGreaterThan(0);
      expect(cs.frontmatter.tags.length).toBeGreaterThanOrEqual(3);
      expect(cs.frontmatter.hook.length).toBeGreaterThan(20);
      expect(cs.content.length).toBeGreaterThan(500);
    }
  });

  it("orders case studies: pipeline, rag, swordfight", () => {
    expect(getAllCaseStudies().map((c) => c.frontmatter.slug)).toEqual([
      "case-study-pipeline",
      "rag-search",
      "swordfight",
    ]);
  });

  it("never contains banned claims", () => {
    for (const cs of getAllCaseStudies()) {
      const text = cs.content + JSON.stringify(cs.frontmatter);
      for (const banned of ["2% hit", "66%", "80% hit", "sub-100ms", "TTFT"]) {
        expect(text).not.toContain(banned);
      }
    }
  });

  it("throws on unknown slug", () => {
    expect(() => getCaseStudy("nope")).toThrow("Unknown case study");
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/case-studies`.

- [ ] **Step 5: Write `lib/case-studies.ts`**

```ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyLink = { label: string; href: string };

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  timeframe: string;
  role: string;
  tags: string[];
  hook: string;
  order: number;
  badge?: string;
  pixel?: boolean;
  links: CaseStudyLink[];
};

export type CaseStudy = { frontmatter: CaseStudyFrontmatter; content: string };

const REQUIRED = ["title", "slug", "timeframe", "role", "tags", "hook", "order", "links"] as const;

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): CaseStudy {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error(`Unknown case study: ${slug}`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  for (const key of REQUIRED) {
    if (data[key] === undefined) throw new Error(`${slug}.mdx missing frontmatter field: ${key}`);
  }
  if (data.slug !== slug) throw new Error(`${slug}.mdx frontmatter slug does not match filename`);
  return { frontmatter: data as CaseStudyFrontmatter, content };
}

export function getAllCaseStudies(): CaseStudy[] {
  return getCaseStudySlugs()
    .map(getCaseStudy)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
```

- [ ] **Step 6: Write the three MDX case studies (full content, verbatim)**

`content/case-studies/case-study-pipeline.mdx`:

```mdx
---
title: "AI Case Study Pipeline"
slug: "case-study-pipeline"
timeframe: "2026 – Present"
role: "AI Intern @ MathGPT.ai · 3-intern team"
tags: ["Python", "LLM Orchestration", "MySQL", "LaTeX"]
hook: "A two-phase LLM pipeline that won't show you an answer it can't verify — a second model re-derives every solution before any draft survives."
order: 1
links: []
---

## Context

At MathGPT.ai I'm building a pipeline that turns a single textbook problem into a
complete teaching artifact: a LaTeX case study grounded in real textbook material,
plus a concept flashcard deck, compiled to PDF. I work on a three-intern team with
weekly syncs with the project lead, and I own this pipeline end to end.

The core design constraint: **an LLM's answer can't be trusted just because it
looks right.** Everything downstream follows from that.

## Architecture

The pipeline runs in two spec-driven LLM phases.

**Phase 1** takes one source problem and emits a five-file package: a primary
textbook section extract, two supporting extracts, a JSON learning-objective
mapping (with citations, a confidence rubric, and a gap list), and a fully worked,
verified answer. It runs as two adversarial prompts: a **generator** that solves
the problem, searches a local corpus index, and maps objectives — then a
**critic** in a fresh session that re-solves the problem *before opening any
draft* and halts the pipeline on mismatch.

**Phase 2** consumes those files (three required, two optional) and emits the
LaTeX case study plus the flashcard deck, compiled with Tectonic. A separate
importer loads concept flashcards from slide decks into MySQL — a six-table
relational schema (subject → textbook → chapter → objective → concept →
flashcard) with a uniqueness constraint enforcing one card per type per concept.

The stack is deliberately lean: Python 3.11 standard library only, PowerShell
package validation, MySQL 8.4 in Docker Compose, and versioned prompt contracts.
The LLM stages currently run against those contracts manually; an automated
orchestrator is designed but not yet built. So far, **contracts — not code — are
the product.**

## The hard problem: trusting LLM math

A single model grading its own work rubber-stamps its own mistakes. The fix was
structural, not prompt-level: the critic runs in a fresh session and must
independently re-derive the solution before it is allowed to see the generator's
draft. Agreement is evidence of correctness; disagreement halts the pipeline.
No human ever reviews a package that failed its own verification.

Two more problems shaped the design:

- **Faithful textbook extraction.** Standard PDF text extraction silently drops
  inline math — the failure is invisible until a generated case study cites a
  formula that isn't there. Extraction moved to page rendering plus visual
  verification; every chapter in the corpus was spot-checked against rendered pages.
- **Format archaeology.** The source flashcard decks store formulas as vector
  images mislabeled as bitmaps, with no recoverable LaTeX. The importer reads the
  underlying vector relationship directly and hash-verifies every blob round-trip,
  so nothing is silently corrupted on the way into the database.

## Decisions & trade-offs

- **Specs before orchestration.** Writing ~2,100 lines of versioned prompt
  contracts before automation code means every stage has a testable definition of
  done — and the eventual orchestrator becomes a thin executor of contracts that
  already work.
- **Negative tests as first-class citizens.** The package validator ships with
  fixtures that must *fail* — a validator that never rejects anything is
  indistinguishable from no validator.
- **Determinism checks.** The importer's test suite includes cross-process
  determinism and committed-file drift checks, so a re-run can never quietly
  produce different data.

## Results

Both phases pass full test rounds including negative controls. The corpus
extraction system covers 45 textbook sections with a search index; the database
holds 75 concept cards across 195 learning objectives; 27 automated tests are
green. Scale so far: ~900 lines of Python, ~600 of SQL, ~2,100 of prompt
contracts.

*The repository is private client work, so there's no public link — but I'm
happy to walk through the verification architecture in detail.*
```

`content/case-studies/rag-search.mdx`:

```mdx
---
title: "Local RAG Search Platform"
slug: "rag-search"
timeframe: "July 2025 – Present"
role: "Personal project"
tags: ["FastAPI", "Ollama", "ChromaDB", "React"]
hook: "Fully air-gapped document Q&A on a 1B model — provenance stamped into every chunk, and an honest audit of exactly where hybrid retrieval breaks."
order: 2
links:
  - label: "GitHub"
    href: "https://github.com/hitaanshjain/local-rag-search-engine"
---

## Context

A document Q&A system with one hard constraint: **nothing leaves the machine.**
No cloud APIs, no third-party data exposure — real municipal zoning ordinances,
searched and summarized entirely on local hardware, right-sized to run a 1B-param
model on CPU.

## Architecture

**Ingestion:** PDFs load page-by-page (pypdf), and each chunk gets a
`Source: <file> | Page: <n>` header *prepended into the chunk text itself* — so
provenance survives chunking, embedding, retrieval, and generation no matter what
the pipeline does downstream. Chunks are 800 characters with 150 overlap, embedded
with nomic-embed-text via Ollama into a persistent ChromaDB (HNSW) index.

**Query:** a FastAPI endpoint runs hybrid retrieval — a vector leg (similarity
search over 2k candidates, distance-normalized) fused 50/50 with a keyword leg —
collapsing to the best chunk per source document, top-k of 3. Generation runs on
llama3.2:1b, streamed token-by-token to a React UI over a streaming fetch
(`ReadableStream` + `TextDecoder`), so first tokens appear while the model is
still generating.

Current scale: 3,796 chunks across 9 sources in a 50MB index; ~700 lines of
Python.

## The hard problem: retrieval you can audit

The interesting engineering here wasn't making retrieval work — it was measuring
whether it *actually* works, and being honest about the answer.

I built a 50-query benchmark over the zoning corpus. Key finding: what it
measures is **source-level attribution** (does the right *document* appear in
top-k?), which is not the same as passage-level relevance. The keyword leg,
benchmarked in isolation, hits 34% @k=3 and 50% @k=5. That number isn't
impressive — it's *diagnostic*, and it pointed straight at three concrete design
flaws:

- **Tie collapse.** Substring-count keyword scoring gives hundreds of chunks an
  identical score for a common query — ranking silently falls back to insertion
  order. This is the strongest concrete argument for real BM25/IDF weighting.
- **Ranking granularity vs. corpus shape.** Keeping only the best chunk per
  source means top-3 can never return three passages from the same ordinance —
  the wrong trade for a corpus that is effectively one huge document.
- **O(corpus) keyword scans.** The keyword leg pulls every chunk into Python on
  each request — fine at 3,796 chunks, a wall at 100k.

## Decisions & trade-offs

- **Provenance in-band, not in metadata.** Stamping source/page into the text
  itself is crude and costs tokens — but it's the one place citation info cannot
  be lost, no matter how retrieval or prompting changes.
- **Right-sizing over horsepower.** A 1B model with CPU fallback keeps the
  air-gap promise real on ordinary hardware; the retrieval quality work matters
  more than model size.
- **Honest metrics over impressive ones.** Publishing the diagnostic baseline
  and its failure modes beats quoting a number I can't reproduce.

## Results & next steps

A working single-user prototype with verified provenance on every answer. Next,
in order: BM25/IDF to fix tie collapse, passage-level ground truth so the
benchmark measures relevance rather than attribution, and first-token latency
measurement for the streaming path.
```

`content/case-studies/swordfight.mdx`:

```mdx
---
title: "Swordfight"
slug: "swordfight"
timeframe: "Sept 2023 – May 2024"
role: "Gameplay & Systems Programmer · 10-person team"
tags: ["Unity", "C#", "HFSM AI", "PlasticSCM"]
hook: "A polished top-down fighter shipped to Google Play and itch.io by a 10-person student team — 150k impressions, 4.5★ from 111 ratings."
order: 3
badge: "150k impressions · 4.5★"
pixel: true
links:
  - label: "Play on itch.io"
    href: "https://studio-19.itch.io/swordfight"
---

## Context

Swordfight!! is a top-down fighting game with 14 playable characters, boss
battles, per-character soundtracks, and leaderboards — built by a 10-person
cross-functional student team in Unity and shipped to both the Google Play Store
and itch.io, where it holds 4.5★ across 111 ratings with 150k impressions.

I owned two systems: the weapon architecture and the enemy AI — plus the version
control strategy that kept ten people from destroying each other's work.

## Architecture

**The weapon system** is interface-driven and polymorphic: abstract base classes
define the combat contract (attack lifecycle, hitboxes, damage application), and
each weapon implements only what makes it unique. Adding a new weapon meant
writing one subclass — no copy-pasted combat logic, no regressions in existing
weapons. This is what let the roster grow quickly late in development.

**Enemy AI** runs on a Hierarchical Finite State Machine: top-level states
(patrol, engage, recover) own nested sub-states, which is what makes multi-stage
boss fights tractable — a boss phase change is a top-level transition, and each
phase's attack patterns live in their own sub-machine instead of one giant
switch statement.

## The hard problem: ten people, one Unity project

Unity scene files are effectively unmergeable — two people editing the same scene
produces conflicts that can't be resolved line-by-line. With a 10-person team of
artists, designers, and programmers all committing, this was the biggest threat
to shipping.

I managed branch strategy and version control via PlasticSCM: feature branches
with defined merge protocols, scene ownership rules so no two people had the same
scene open for edit, and coordinated integration windows for release builds. The
process work was as load-bearing as any code — the final release builds went out
on schedule.

## Decisions & trade-offs

- **Abstraction early, content late.** Building the weapon contract before the
  full roster existed was a bet that paid off — content creation became cheap
  exactly when the team needed to scale it.
- **HFSM over behavior trees.** For deterministic, designer-tunable boss
  patterns, nested state machines were simpler to reason about and debug than a
  behavior-tree framework would have been.
- **Process as a deliverable.** On a student team, version-control discipline
  isn't overhead — it's the difference between shipping and not.

## Results

Shipped on Google Play and itch.io. 150k impressions, 4.5★ from 111 ratings,
14 characters, and a community that still leaves comments calling it a hidden gem.
```

- [ ] **Step 7: Write `lib/data.ts` (full content, verbatim)**

```ts
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
  typedLine: "CS @ NYU. I build AI pipelines — and the systems that keep them honest.",
  statusItems: [
    "SWE Intern @ Header",
    "AI Intern @ MathGPT.ai",
    "Open to Summer 2027 internships",
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
      "Shipped full-stack customization for AI-generated briefings — per-section reorder, toggles, and detail control — refactoring the generation pipeline from fixed sections to a dynamically assembled prompt backed by a JSONB section model.",
      "Owned a release-gating recovery feature end to end: a paginated, Clerk-authenticated FastAPI endpoint, a frontend history screen, and metadata persistence designed to survive automated cleanup.",
      "Wrote 130+ automated tests on a test-per-feature workflow across a multi-provider LLM pipeline, FastAPI/PostgreSQL backend, and React Native/Expo frontend.",
    ],
  },
  {
    company: "MathGPT.ai",
    role: "AI Intern",
    timeframe: "2026 – Present",
    bullets: [
      "Building a spec-driven pipeline that turns a textbook problem into a verified LaTeX case study and concept flashcard deck.",
      "Designed a generator/critic LLM architecture where the critic independently re-solves each problem before seeing any draft — and halts the pipeline on mismatch.",
      "Own the corpus extraction system, package validator, and MySQL flashcard database — 27 automated tests including negative controls.",
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
    line: "3-tier stock analysis platform — Dockerized Flask + MongoDB, an 8-worker parallel pipeline, and an 80% coverage gate enforced in CI.",
    github: "https://github.com/hitaanshjain/StockAnalyzer",
  },
  {
    name: "VocabLearn",
    line: "JWT-authenticated vocabulary app with an AI reverse-dictionary — led backend on a 5-person Agile team.",
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
    "I'm a CS major with a math minor at NYU ('27), spending this summer interning at Header and building an AI case-study pipeline at MathGPT.ai.",
    "The through-line in my work is AI systems you can actually trust: outputs verified by an independent second model, provenance that survives the pipeline, and tests that catch silent failures.",
    "I'm looking for Summer 2027 internships — if you're building something in that space, I'd love to talk.",
  ],
};
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — 5 tests green.

- [ ] **Step 9: Verify typecheck and lint still pass, then commit**

Run: `npm run typecheck`, `npm run lint`
Expected: exit 0 both.

```powershell
git add -A
git commit -m "feat: add content layer - site data, case study MDX, tested loader"
```

---

### Task 3: CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: npm scripts `lint`, `typecheck`, `test`, `build` from Tasks 1–2.

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

- [ ] **Step 2: Verify the same gate passes locally**

Run: `npm run lint; npm run typecheck; npm test; npm run build`
Expected: all exit 0.

- [ ] **Step 3: Commit**

```powershell
git add .github
git commit -m "ci: lint, typecheck, test, build on every push"
```

---

### Task 4: useTypewriter hook (TDD)

**Files:**
- Create: `hooks/useTypewriter.ts`, `tests/useTypewriter.test.ts`

**Interfaces:**
- Produces: `useTypewriter(text: string, opts?: { cps?: number; enabled?: boolean }): { display: string; done: boolean }`. Rules: if `enabled === false` OR `prefers-reduced-motion` matches → `display` is the full text immediately and `done` is true. Otherwise types at `cps` chars/sec (default 40) via a single interval, cleaned up on unmount.

- [ ] **Step 1: Write the failing test**

`tests/useTypewriter.test.ts`:

```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { mediaState } from "./setup";

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mediaState.reducedMotion = false;
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns full text immediately when reduced motion is preferred", () => {
    mediaState.reducedMotion = true;
    const { result } = renderHook(() => useTypewriter("hello world"));
    expect(result.current.display).toBe("hello world");
    expect(result.current.done).toBe(true);
  });

  it("returns full text immediately when disabled", () => {
    const { result } = renderHook(() => useTypewriter("hello world", { enabled: false }));
    expect(result.current.display).toBe("hello world");
    expect(result.current.done).toBe(true);
  });

  it("types progressively at the configured speed", () => {
    const { result } = renderHook(() => useTypewriter("abcdefghij", { cps: 10 }));
    expect(result.current.display).toBe("");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.display).toBe("abcde");
    expect(result.current.done).toBe(false);
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.display).toBe("abcdefghij");
    expect(result.current.done).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/hooks/useTypewriter`.

- [ ] **Step 3: Write `hooks/useTypewriter.ts`**

```ts
"use client";

import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  opts: { cps?: number; enabled?: boolean } = {}
): { display: string; done: boolean } {
  const { cps = 40, enabled = true } = opts;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = enabled && !reduced;

  const [count, setCount] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 1000 / cps);
    return () => clearInterval(interval);
  }, [animate, cps, text]);

  return { display: text.slice(0, count), done: count >= text.length };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all 8 tests green.

- [ ] **Step 5: Commit**

```powershell
git add hooks tests
git commit -m "feat: useTypewriter hook with reduced-motion and disabled fallbacks"
```

---

### Task 5: Nav + Hero (typing moment, status dot, avatar crop)

**Files:**
- Create: `components/Nav.tsx`, `components/Hero.tsx`, `components/TypingLine.tsx`, `public/images/avatar.jpg`
- Modify: `app/layout.tsx` (add Nav), `app/page.tsx` (render Hero)

**Interfaces:**
- Consumes: `siteConfig`, `hero` from `@/lib/data`; `useTypewriter` from `@/hooks/useTypewriter`.
- Produces: `<Nav />`, `<Hero />` (no props). Homepage section ids used by Nav anchors: `#projects`, `#experience`, `#about` (sections added in Tasks 6–8; Nav links may 404-scroll harmlessly until then).

- [ ] **Step 1: Generate the square avatar crop**

Run this PowerShell (System.Drawing). The crop rectangle targets head + shoulders in the 2160×2880 original:

```powershell
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$PWD\headshot.jpg")
if ($src.Width -gt $src.Height) { $src.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
$crop = New-Object System.Drawing.Rectangle 480, 830, 720, 720
$bmp = New-Object System.Drawing.Bitmap 512, 512
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, 512, 512), $crop, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("$PWD\public\images\avatar.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose(); $bmp.Dispose(); $src.Dispose()
```

- [ ] **Step 2: Visually verify the crop**

Read `public/images/avatar.jpg` with the Read tool. Expected: face centered, head + shoulders visible. If the face is off-center, adjust the crop rectangle's x/y (first two numbers) by ±100 and re-run until centered.

- [ ] **Step 3: Write `components/TypingLine.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

export function TypingLine({ text }: { text: string }) {
  // Server render + first paint show full text (no-JS fallback, no hydration
  // mismatch). After mount, animate only on the first visit this session.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!sessionStorage.getItem("hj-typed")) {
      sessionStorage.setItem("hj-typed", "1");
      setAnimate(true);
    }
  }, []);
  const { display, done } = useTypewriter(text, { enabled: animate });
  return (
    <span aria-label={text}>
      {animate ? display : text}
      {animate && !done && <span aria-hidden="true">▌</span>}
    </span>
  );
}
```

- [ ] **Step 4: Write `components/Nav.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Nav() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/avatar.jpg"
          alt="Hitaansh Jain"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-display text-lg">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <a href={siteConfig.github} className="link-underline hidden sm:inline">GitHub</a>
        <a href={siteConfig.linkedin} className="link-underline hidden sm:inline">LinkedIn</a>
        <a
          href={siteConfig.resumePath}
          className="rounded-md bg-night px-3 py-1.5 text-paper transition-colors hover:bg-night-deep"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 5: Write `components/Hero.tsx`**

```tsx
import { hero, siteConfig } from "@/lib/data";
import { TypingLine } from "./TypingLine";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 md:pt-28">
      <p className="font-mono text-sm text-ink-muted">{hero.prompt}</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-5 max-w-2xl font-mono text-base text-ink md:text-lg">
        <TypingLine text={hero.typedLine} />
      </p>
      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        <span className="status-dot inline-block h-2 w-2 rounded-full bg-status" aria-hidden="true" />
        {hero.statusItems.map((item, i) => (
          <span key={item}>
            {item}
            {i < hero.statusItems.length - 1 && <span className="mx-1 text-ink-muted/50">·</span>}
          </span>
        ))}
      </p>
      <div className="mt-8 flex flex-wrap gap-5 text-sm">
        <a href={siteConfig.github} className="link-underline text-night">GitHub</a>
        <a href={siteConfig.linkedin} className="link-underline text-night">LinkedIn</a>
        <a href={`mailto:${siteConfig.email}`} className="link-underline text-night">
          {siteConfig.email}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Wire into layout and page**

In `app/layout.tsx`, replace the `<body>` line with:

```tsx
      <body className="bg-paper text-ink font-body antialiased">
        <Nav />
        {children}
      </body>
```

and add `import { Nav } from "@/components/Nav";` at the top.

Replace `app/page.tsx` entirely:

```tsx
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm test; npm run lint; npm run typecheck; npm run build`
Expected: all pass. Optionally `npm run dev` and eyeball http://localhost:3000 — typing effect runs once, status dot pulses.

- [ ] **Step 8: Commit**

```powershell
git add -A
git commit -m "feat: nav and hero with typing moment, status dot, avatar"
```

---

### Task 6: Experience + Skills sections

**Files:**
- Create: `components/ExperienceTimeline.tsx`, `components/Skills.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `experience`, `skills` from `@/lib/data`.
- Produces: `<ExperienceTimeline />` (renders `<section id="experience">`), `<Skills />` (renders `<section id="skills">`). Shared section-heading pattern used by all remaining sections: `<h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">`.

- [ ] **Step 1: Write `components/ExperienceTimeline.tsx`**

```tsx
import { experience } from "@/lib/data";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">Experience</h2>
      <div className="mt-8 space-y-12 border-l border-ink/10 pl-6 md:pl-10">
        {experience.map((job) => (
          <article key={job.company} className="relative">
            <span
              className="absolute -left-[31px] top-2 h-2 w-2 rounded-full bg-night md:-left-[47px]"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-display text-2xl">
                {job.url ? (
                  <a href={job.url} className="link-underline">{job.company}</a>
                ) : (
                  job.company
                )}
              </h3>
              <p className="font-mono text-xs text-ink-muted">{job.timeframe}</p>
            </div>
            <p className="mt-1 text-sm text-ink-muted">{job.role}</p>
            <ul className="mt-4 space-y-2 text-[15px] leading-relaxed">
              {job.bullets.map((b) => (
                <li key={b.slice(0, 40)} className="flex gap-3">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink/40" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {job.detail && (
              <details className="mt-3 text-[15px] leading-relaxed">
                <summary className="cursor-pointer font-mono text-xs text-night">more detail</summary>
                <p className="mt-2 text-ink-muted">{job.detail}</p>
              </details>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/Skills.tsx`**

```tsx
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">Skills</h2>
      <div className="mt-8 space-y-6">
        {skills.map(({ group, items }) => (
          <div key={group}>
            <h3 className="text-sm font-medium text-ink-muted">{group}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-ink/10 bg-white/40 px-2.5 py-1 font-mono text-xs"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add both to `app/page.tsx`** (after `<Hero />`):

```tsx
import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 4: Verify** — `npm run lint; npm run typecheck; npm run build` all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: experience timeline and skills sections"
```

---

### Task 7: Featured + compact projects (PixelSword)

**Files:**
- Create: `components/PixelSword.tsx`, `components/ProjectCard.tsx`, `components/FeaturedProjects.tsx`, `components/CompactProjects.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `getAllCaseStudies()` from `@/lib/case-studies` (server component — fs is fine); `compactProjects` from `@/lib/data`.
- Produces: `<FeaturedProjects />` (renders `<section id="projects">`), `<CompactProjects />`; `ProjectCard` takes `{ study: CaseStudy }`; `PixelSword` takes `{ size?: number }` (default 20).

- [ ] **Step 1: Write `components/PixelSword.tsx`** — 16×16 pixel-art sword as SVG rects:

```tsx
export function PixelSword({ size = 20 }: { size?: number }) {
  // 16x16 pixel-art sword, drawn blade-up-right. Palette: steel, light edge, gold guard, brown grip.
  const px = (x: number, y: number, fill: string) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
  );
  const steel = "#8B96A8";
  const edge = "#DDE3EC";
  const gold = "#C9A227";
  const grip = "#7A4A21";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      {px(12, 1, edge)}
      {px(11, 2, edge)} {px(12, 2, steel)}
      {px(10, 3, edge)} {px(11, 3, steel)}
      {px(9, 4, edge)} {px(10, 4, steel)}
      {px(8, 5, edge)} {px(9, 5, steel)}
      {px(7, 6, edge)} {px(8, 6, steel)}
      {px(6, 7, edge)} {px(7, 7, steel)}
      {px(4, 7, gold)} {px(5, 8, gold)} {px(6, 8, steel)}
      {px(4, 9, gold)} {px(5, 9, gold)} {px(6, 9, gold)}
      {px(3, 10, gold)} {px(4, 10, gold)}
      {px(3, 11, grip)}
      {px(2, 12, grip)}
      {px(1, 13, gold)}
    </svg>
  );
}
```

- [ ] **Step 2: Write `components/ProjectCard.tsx`**

```tsx
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { PixelSword } from "./PixelSword";

export function ProjectCard({ study }: { study: CaseStudy }) {
  const { slug, title, hook, tags, pixel, badge } = study.frontmatter;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-lg border border-ink/10 bg-white/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-night/30 hover:shadow-[0_8px_30px_rgba(20,36,92,0.08)]"
    >
      <div className="flex items-center gap-2">
        {pixel && <PixelSword />}
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      {badge && (
        <p className="mt-2 inline-block border border-ink/20 bg-paper px-2 py-0.5 font-mono text-[11px] tracking-wide">
          {badge}
        </p>
      )}
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{hook}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="font-mono text-xs text-ink-muted">{t}</li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-xs text-night">
        Read case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </Link>
  );
}
```

- [ ] **Step 3: Write `components/FeaturedProjects.tsx` and `components/CompactProjects.tsx`**

```tsx
import { getAllCaseStudies } from "@/lib/case-studies";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const studies = getAllCaseStudies();
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">Featured Projects</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {studies.map((s) => (
          <ProjectCard key={s.frontmatter.slug} study={s} />
        ))}
      </div>
    </section>
  );
}
```

```tsx
import { compactProjects } from "@/lib/data";

export function CompactProjects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">More Projects</h2>
      <ul className="mt-6 divide-y divide-ink/10">
        {compactProjects.map((p) => (
          <li key={p.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
            <div className="max-w-xl">
              <h3 className="inline font-medium">{p.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{p.line}</p>
            </div>
            <a href={p.github} className="link-underline font-mono text-xs text-night">GitHub →</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Add to `app/page.tsx`** between `<ExperienceTimeline />` and `<Skills />`: `<FeaturedProjects />` then `<CompactProjects />` (with imports).

- [ ] **Step 5: Verify** — `npm run lint; npm run typecheck; npm run build` all pass. Build output must show `/` as static.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "feat: featured project cards from case-study frontmatter, compact projects, pixel sword"
```

---

### Task 8: About + Footer + final homepage assembly

**Files:**
- Create: `components/About.tsx`, `components/Footer.tsx`
- Modify: `app/page.tsx`, `app/layout.tsx` (Footer after children)

**Interfaces:**
- Consumes: `about`, `siteConfig` from `@/lib/data`.
- Produces: `<About />` (renders `<section id="about">`), `<Footer />`. Final homepage order: Hero → ExperienceTimeline → FeaturedProjects → CompactProjects → Skills → About.

- [ ] **Step 1: Write `components/About.tsx`**

```tsx
import Image from "next/image";
import { about, siteConfig } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">About</h2>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[1fr_minmax(0,320px)]">
        <div className="space-y-4 text-[17px] leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 inline-block rounded-md bg-night px-4 py-2 text-sm text-paper transition-colors hover:bg-night-deep"
          >
            Get in touch
          </a>
        </div>
        <Image
          src="/images/headshot.jpg"
          alt="Hitaansh Jain in front of the lower Manhattan skyline at night"
          width={640}
          height={853}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/Footer.tsx`**

```tsx
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink-muted">
        <p>© 2026 {siteConfig.name} · Built with Next.js</p>
        <p className="flex gap-4">
          <a href={siteConfig.github} className="link-underline">GitHub</a>
          <a href={siteConfig.linkedin} className="link-underline">LinkedIn</a>
          <a href={`mailto:${siteConfig.email}`} className="link-underline">Email</a>
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Final `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { CompactProjects } from "@/components/CompactProjects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <FeaturedProjects />
      <CompactProjects />
      <Skills />
      <About />
    </main>
  );
}
```

Add `<Footer />` after `{children}` in `app/layout.tsx` (with import).

- [ ] **Step 4: Verify** — `npm test; npm run lint; npm run typecheck; npm run build` all pass.

- [ ] **Step 5: Commit**

```powershell
git add -A
git commit -m "feat: about section with photo, footer, complete homepage assembly"
```

---

### Task 9: Case study pages

**Files:**
- Create: `app/projects/[slug]/page.tsx`, `components/CaseStudyLayout.tsx`

**Interfaces:**
- Consumes: `getCaseStudy`, `getCaseStudySlugs` from `@/lib/case-studies`; `MDXRemote` from `next-mdx-remote/rsc`; `PixelSword`.
- Produces: statically generated routes `/projects/case-study-pipeline`, `/projects/rag-search`, `/projects/swordfight` with per-page metadata; `CaseStudyLayout` takes `{ frontmatter: CaseStudyFrontmatter; children: React.ReactNode }`.

- [ ] **Step 1: Write `components/CaseStudyLayout.tsx`**

```tsx
import Link from "next/link";
import type { CaseStudyFrontmatter } from "@/lib/case-studies";
import { PixelSword } from "./PixelSword";

export function CaseStudyLayout({
  frontmatter,
  children,
}: {
  frontmatter: CaseStudyFrontmatter;
  children: React.ReactNode;
}) {
  const { title, role, timeframe, tags, badge, pixel, links } = frontmatter;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link href="/#projects" className="link-underline font-mono text-xs text-night">
        ← All projects
      </Link>
      <div className="mt-8 flex items-center gap-3">
        {pixel && <PixelSword size={28} />}
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">{title}</h1>
      </div>
      <p className="mt-3 text-sm text-ink-muted">
        {role} · {timeframe}
      </p>
      {badge && (
        <p className="mt-3 inline-block border border-ink/20 bg-white/40 px-2 py-0.5 font-mono text-[11px] tracking-wide">
          {badge}
        </p>
      )}
      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <li key={t} className="rounded-md border border-ink/10 bg-white/40 px-2.5 py-1 font-mono text-xs">
            {t}
          </li>
        ))}
      </ul>
      {links.length > 0 && (
        <p className="mt-4 flex gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="link-underline font-mono text-sm text-night">
              {l.label} →
            </a>
          ))}
        </p>
      )}
      <article className="prose prose-stone mt-10 max-w-none prose-headings:font-display prose-a:text-night prose-strong:text-ink">
        {children}
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Write `app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getCaseStudy(slug);
  return {
    title: `${frontmatter.title} — Hitaansh Jain`,
    description: frontmatter.hook,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let study;
  try {
    study = getCaseStudy(slug);
  } catch {
    notFound();
  }
  return (
    <CaseStudyLayout frontmatter={study.frontmatter}>
      <MDXRemote source={study.content} />
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 3: Verify** — `npm run build`. Expected: build output lists all three `/projects/<slug>` routes as SSG (`●`). Then `npm run lint; npm run typecheck; npm test` all pass.

- [ ] **Step 4: Commit**

```powershell
git add -A
git commit -m "feat: MDX case study pages with shared layout, SSG, per-page metadata"
```

---

### Task 10: Metadata, OG image, favicon, sitemap, 404

**Files:**
- Create: `app/opengraph-image.tsx`, `app/icon.svg`, `app/sitemap.ts`, `app/not-found.tsx`
- Modify: `app/layout.tsx` (metadataBase, richer metadata)

**Interfaces:**
- Consumes: `siteConfig` from `@/lib/data`, `getCaseStudySlugs` from `@/lib/case-studies`.

- [ ] **Step 1: Enrich `app/layout.tsx` metadata** — replace the `metadata` export with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://hitaanshjain.vercel.app"),
  title: {
    default: "Hitaansh Jain — CS @ NYU",
    template: "%s",
  },
  description: "CS @ NYU. I build AI pipelines — and the systems that keep them honest.",
  openGraph: {
    title: "Hitaansh Jain — CS @ NYU",
    description: "CS @ NYU. I build AI pipelines — and the systems that keep them honest.",
    url: "/",
    siteName: "Hitaansh Jain",
    type: "website",
  },
};
```

- [ ] **Step 2: Write `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const alt = "Hitaansh Jain — CS @ NYU";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FAF7F0",
          color: "#1C1B1A",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 630, backgroundColor: "#1E3480" }} />
        <div style={{ fontSize: 28, color: "#5A554E" }}>$ whoami</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 12 }}>Hitaansh Jain</div>
        <div style={{ fontSize: 34, marginTop: 16, color: "#1E3480" }}>
          I build AI pipelines — and the systems that keep them honest.
        </div>
      </div>
    ),
    size
  );
}
```

- [ ] **Step 3: Write `app/icon.svg`** — pixel sword favicon on night-blue:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <rect width="16" height="16" rx="3" fill="#1E3480"/>
  <rect x="12" y="1" width="1" height="1" fill="#DDE3EC"/>
  <rect x="11" y="2" width="1" height="1" fill="#DDE3EC"/><rect x="12" y="2" width="1" height="1" fill="#8B96A8"/>
  <rect x="10" y="3" width="1" height="1" fill="#DDE3EC"/><rect x="11" y="3" width="1" height="1" fill="#8B96A8"/>
  <rect x="9" y="4" width="1" height="1" fill="#DDE3EC"/><rect x="10" y="4" width="1" height="1" fill="#8B96A8"/>
  <rect x="8" y="5" width="1" height="1" fill="#DDE3EC"/><rect x="9" y="5" width="1" height="1" fill="#8B96A8"/>
  <rect x="7" y="6" width="1" height="1" fill="#DDE3EC"/><rect x="8" y="6" width="1" height="1" fill="#8B96A8"/>
  <rect x="6" y="7" width="1" height="1" fill="#DDE3EC"/><rect x="7" y="7" width="1" height="1" fill="#8B96A8"/>
  <rect x="4" y="7" width="1" height="1" fill="#C9A227"/>
  <rect x="5" y="8" width="1" height="1" fill="#C9A227"/><rect x="6" y="8" width="1" height="1" fill="#8B96A8"/>
  <rect x="4" y="9" width="1" height="1" fill="#C9A227"/><rect x="5" y="9" width="1" height="1" fill="#C9A227"/><rect x="6" y="9" width="1" height="1" fill="#C9A227"/>
  <rect x="3" y="10" width="1" height="1" fill="#C9A227"/><rect x="4" y="10" width="1" height="1" fill="#C9A227"/>
  <rect x="3" y="11" width="1" height="1" fill="#7A4A21"/>
  <rect x="2" y="12" width="1" height="1" fill="#7A4A21"/>
  <rect x="1" y="13" width="1" height="1" fill="#C9A227"/>
</svg>
```

- [ ] **Step 4: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { getCaseStudySlugs } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...getCaseStudySlugs().map((slug) => ({ url: `${siteConfig.url}/projects/${slug}` })),
  ];
}
```

- [ ] **Step 5: Write `app/not-found.tsx`**

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-ink-muted">
        $ curl hitaanshjain.vercel.app <span className="text-night">— 404</span>
      </p>
      <h1 className="font-display text-4xl">This page doesn&apos;t exist.</h1>
      <Link href="/" className="link-underline font-mono text-sm text-night">
        cd ~/
      </Link>
    </main>
  );
}
```

- [ ] **Step 6: Verify** — `npm run build` shows `/opengraph-image`, `/icon.svg`, `/sitemap.xml` in output; lint/typecheck/test pass. Visit a bogus route in dev to see the 404.

- [ ] **Step 7: Commit**

```powershell
git add -A
git commit -m "feat: OG image, pixel-sword favicon, sitemap, styled 404, rich metadata"
```

---

### Task 11: Visual verification, accessibility, README

**Files:**
- Create: `README.md`
- Modify: any files needing fixes found during verification

- [ ] **Step 1: Full-page visual check** — Start `npm run dev` (background). Using browser tools (or the `run` skill), screenshot http://localhost:3000 at widths 375, 768, and 1440, plus all three `/projects/<slug>` pages. Verify: typing effect runs once then stays static on reload (sessionStorage); status dot pulses; card hover lifts; no horizontal scroll at 375px; photo not stretched; pixel sword renders crisply.

- [ ] **Step 2: Accessibility pass** — verify with the page open: every image has meaningful alt text; all interactive elements reachable by keyboard with visible focus (`link-underline` shows on `:focus-visible`); heading order h1→h2→h3 with no skips; contrast — ink `#1C1B1A` and night `#1E3480` on paper `#FAF7F0` both exceed WCAG AA (night on paper ≈ 9.7:1); with OS reduced-motion emulated, typing renders statically and the dot doesn't pulse.

- [ ] **Step 3: Lighthouse** — Run Lighthouse in Chrome DevTools against the production build (`npm run build; npm run start`). Target: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on desktop. Fix regressions found (common: missing image `sizes`, render-blocking font weight variants).

- [ ] **Step 4: Write `README.md`**

```markdown
# hitaanshjain.dev — portfolio

Personal portfolio: one-page home + MDX case studies.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-mdx-remote · Vitest

## Develop

npm install
npm run dev

## Quality gates

npm run lint && npm run typecheck && npm test && npm run build

## Content

- Homepage copy: `lib/data.ts`
- Case studies: `content/case-studies/*.mdx` (frontmatter validated by `lib/case-studies.ts`)
- Resume: `public/resume.pdf`
```

- [ ] **Step 5: Verify all gates one final time** — `npm run lint; npm run typecheck; npm test; npm run build` all exit 0.

- [ ] **Step 6: Commit**

```powershell
git add -A
git commit -m "docs: README; polish from visual and accessibility verification"
```

---

### Task 12: Deploy — GitHub + Vercel

**Files:**
- Modify: `lib/data.ts` (only if the production URL differs from `https://hitaanshjain.vercel.app`), `app/layout.tsx` (same condition, `metadataBase`)

- [ ] **Step 1: Push to GitHub**

```powershell
gh auth status
gh repo create portfolio --public --source . --remote origin --push
```

If `gh` is not authenticated, ask the user to run `! gh auth login` first.

- [ ] **Step 2: Verify CI is green** — `gh run watch` (or `gh run list --limit 1`). Expected: the CI workflow from Task 3 passes on the pushed commit. Do not proceed until green.

- [ ] **Step 3: Connect Vercel** — Vercel auth is interactive; ask the user to run `! npx vercel login` (browser auth). Then:

```powershell
npx vercel link --yes
npx vercel --prod
```

If the user prefers the dashboard: instruct them to visit vercel.com/new, import the `portfolio` GitHub repo, and accept the auto-detected Next.js defaults. Either path yields a production URL.

- [ ] **Step 4: Reconcile the production URL** — If the deployed URL differs from `https://hitaanshjain.vercel.app`, update `siteConfig.url` in `lib/data.ts` and `metadataBase` in `app/layout.tsx` to the real URL, commit (`fix: set production URL`), and push (auto-redeploys).

- [ ] **Step 5: Verify production** — WebFetch the production URL: homepage renders with name, experience, projects. Fetch `<url>/projects/rag-search` and `<url>/resume.pdf` (expect 200s). Check `<url>/sitemap.xml` lists 4 URLs.

- [ ] **Step 6: Final commit & report** — Ensure the working tree is clean and pushed. Report the live URL to the user, with a note on how to update content (edit `lib/data.ts` / MDX, push, auto-deploy).

---

## Self-Review (completed)

1. **Spec coverage:** Hero/typing/status ✓ (T4–5), experience with compact Vardhman ✓ (T6), 3 featured cards from frontmatter + compact row ✓ (T7), skills/about/footer ✓ (T6, T8), case studies with exact verified content and constraints ✓ (T2, T9), palette/fonts/personality touches ✓ (T1, T5, T7), reduced-motion + no-JS fallback ✓ (T4–5), 404/OG/sitemap/favicon ✓ (T10), CI + unit tests ✓ (T2–4), browser + Lighthouse verification ✓ (T11), GitHub + Vercel deploy ✓ (T12). Konami egg, blog, dark mode: correctly absent (out of scope).
2. **Placeholder scan:** none — all copy, code, and MDX bodies are complete and verbatim.
3. **Type consistency:** `CaseStudyFrontmatter` fields match across lib (T2), cards (T7), layout (T9); `useTypewriter` signature matches TypingLine's usage; section heading class identical across T6–T8 components; `siteConfig` keys consistent everywhere.
