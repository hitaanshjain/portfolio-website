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
