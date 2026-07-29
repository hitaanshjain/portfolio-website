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
