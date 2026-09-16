# hitaansh.dev

Personal portfolio: a one-page home plus MDX case studies.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-mdx-remote · Vitest

## Develop

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

## Where things live

- Homepage copy and experience bullets: `lib/data.ts`
- Case studies: `content/case-studies/*.mdx` (frontmatter validated by `lib/case-studies.ts`)
- Resume: `public/Hitaansh_Jain_Resume.pdf` (the old `/resume.pdf` URL redirects here)
- Images: `public/images/`
