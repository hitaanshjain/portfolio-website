# Portfolio Website — Design Spec

**Date:** 2026-07-28
**Owner:** Hitaansh Jain
**Status:** Approved pending final user review

## Purpose & Audience

A personal portfolio at a Vercel-hosted URL (later optionally a custom domain) serving two audiences in layers:

1. **Recruiters / hiring managers** — the homepage answers "who is this, what have they done, how do I reach them" in a 30-second scroll. Target: Summer 2027 internships and May 2027 new-grad roles.
2. **Engineers / interviewers** — each featured project links to a dedicated case study page with architecture, hard problems, decisions, and real results.

Success criteria: homepage scannable in under 30 seconds; each case study substantial enough that an interviewer learns something they'd ask about; site loads fast and looks deliberate on desktop and mobile.

## Site Structure

One-page homepage plus three case study pages (Approach B, user-approved).

```
/                          Homepage (single scroll)
/projects/case-study-pipeline   AI Case Study Pipeline (MathGPT.ai)
/projects/rag-search            Local RAG Search Platform
/projects/swordfight            Swordfight
/404                       Styled not-found page
```

## Homepage Content Map (in order)

1. **Hero** — Name large; positioning line (draft copy, final wording tuned during implementation): "CS @ NYU building AI pipelines and the systems around them." Terminal typing moment: a monospace line types `$ whoami` then the positioning line once on first load (~1.5s, respects `prefers-reduced-motion`, static text as fallback/no-JS). Status line with soft-pulsing green dot: "Currently: SWE intern @ Header · AI intern @ MathGPT · open to Summer 2027." Links: GitHub, LinkedIn (https://www.linkedin.com/in/hitaanshjain/), email (hitaansh1912@gmail.com), Resume download button (`/resume.pdf`).
2. **Experience** — Timeline, three entries:
   - **Header (joinheader.com)** — SWE Intern, June 2026–Present. 2–3 bullets distilled from resume (briefing customization + JSONB section model, release-gating recovery feature, 130+ tests across FastAPI/PostgreSQL + React Native/Expo + multi-provider LLM pipeline). No dedicated case study page — it's an employer's product; depth lives in the bullets.
   - **MathGPT.ai** — AI Intern, current. 2–3 bullets (spec-driven two-phase LLM pipeline, generator/critic verification, corpus extraction + flashcard database). Links to its case study page.
   - **Vardhman Infotech** — SWE Intern (Part-Time), Dec 2024–May 2025. Compact: one line with expandable detail (inventory system for 1,500+ retail locations; 394-column SQL-to-Access migration).
3. **Featured projects** — Three cards, each: one-sentence hook, 3–4 tech tags, "Read case study →":
   - AI Case Study Pipeline (MathGPT.ai)
   - Local RAG Search Platform
   - Swordfight (pixel-sword icon; positioned last as the personality piece)
4. **More projects** — Compact row, one line + GitHub link each: Stock Analyzer, VocabLearn, ExpenseSplitter.
5. **Skills** — Quiet tag groups mirroring resume: Languages & Frameworks / AI & Data Engineering / DevOps & Workflow. No progress bars.
6. **About + contact** — Skyline photo at generous size, 2–3 sentences, email CTA.

## Case Study Pages

Shared skeleton: **Context → Architecture → The hard problem → Decisions & trade-offs → Results → Links.**

Content sources and constraints per page:

- **AI Case Study Pipeline** — Source: user's description + repo summary (provided). Headline: the generator/critic verification architecture (critic independently re-solves before seeing any draft; halts on mismatch). Hard problems: trusting LLM math, faithful textbook extraction (page rendering vs. silent inline-math loss), format archaeology (SVG-mislabeled blobs, hash-verified round-trips). Real numbers only: 27 tests, 75 concept cards, 195 objectives, 45 extracted sections, ~900 LOC Python / ~600 SQL / ~2,100 lines of prompt contracts. **Hard constraints:** describe techniques generically; never name the client company or any person; no reverse-engineering analysis, benchmark content, unreleased roadmap items (including animated/GIF cards), production integration schema, teammates' work, or textbook corpus contents. MathGPT.ai named as employer (user-stated). No invented metrics.
- **Local RAG Search Platform** — Source: resume bullets + repo summary (user is running the extraction prompt; if it never arrives, resume bullets alone suffice). Headline: the 2%→66% hit-rate benchmark story over 1,070 pages of zoning ordinances; hybrid vector+keyword retrieval; SSE streaming with sub-100ms TTFT.
- **Swordfight** — Source: resume bullet image + itch.io page. Headline: interface-driven polymorphic weapon system in C#; HFSM enemy AI; PlasticSCM branch strategy for a 10-person team; 150k impressions, 4.5★ (111 ratings), Google Play + itch.io.

## Visual Design

- **Palette:** warm off-white background (paper, not stark white), near-black ink, one accent: deep night-blue drawn from the skyline photo. Accent used sparingly (links, status dot, small highlights). Same palette across all pages.
- **Typography:** distinctive editorial face for name/headings (not default Inter), clean sans for body, monospace for terminal moment/tech tags/code. Exact faces chosen at implementation via `next/font` (self-hosted). Big hero type; calm elsewhere.
- **Personality touches (exactly these three):** (1) terminal typing hero moment, (2) pixel 16-bit sword icon + pixel-styled "150k impressions · 4.5★" badge on Swordfight card and page, (3) pulsing status dot + hover micro-interactions (cards lift slightly, links get animated underlines). No tilt/bounce. Konami-code easter egg explicitly out of scope.
- **Photo:** skyline shot large in About; tight square face crop as small nav avatar. Crops produced during implementation from `headshot.jpg`.

## Technical Architecture

- **Stack:** Next.js (App Router) + TypeScript (strict) + Tailwind CSS. All pages statically generated; no server code.
- **Case studies:** MDX files in `content/case-studies/*.mdx`, rendered via shared `CaseStudyLayout`. Adding a case study = adding one MDX file.
- **Components:** `Hero` (typing effect as a hook honoring `prefers-reduced-motion`), `ExperienceTimeline`, `ProjectCard`, `CompactProjects`, `Skills`, `About`, `Footer`, `CaseStudyLayout`.
- **Assets:** fonts via `next/font`; images via `next/image`; resume served from `public/resume.pdf`; favicon (monogram or pixel sword).
- **SEO/meta:** per-page metadata + Open Graph tags, sitemap, styled 404.
- **Animation:** CSS-only except the typing hook. No animation library.

## Error Handling

- Styled 404 consistent with site design.
- No-JS/reduced-motion: all content readable; typing moment renders as static text.
- Broken image fallback: standard `next/image` behavior; alt text everywhere.

## Testing & Verification

- **CI (GitHub Actions):** ESLint + `tsc --noEmit` (strict) + production build on every push.
- **Unit tests (Vitest):** typing hook, any content-loading/parsing utilities.
- **Manual verification before done:** rendered site checked in a real browser at desktop and mobile widths; all links, resume download, and case study routes exercised; Lighthouse pass for performance/accessibility.

## Deployment

New git repo in this directory (`.agents/` skill assets excluded via `.gitignore`), pushed to the user's GitHub (`hitaanshjain`), connected to Vercel. Default URL `hitaanshjain.vercel.app` (or Vercel-assigned variant). Custom domain attachable later with no code changes.

## Out of Scope

Blog/writing section, Konami easter egg, analytics, custom domain purchase, contact form (email link instead), dark mode toggle (single light theme).
