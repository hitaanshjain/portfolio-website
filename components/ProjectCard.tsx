import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { PixelSword } from "./PixelSword";

export function ProjectCard({ study }: { study: CaseStudy }) {
  const { slug, title, role, hook, tags, pixel, badge } = study.frontmatter;
  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex h-full flex-col rounded-lg border border-ink/10 bg-white/40 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-night/30 hover:shadow-[0_8px_30px_rgba(20,36,92,0.08)] motion-reduce:transition-none motion-reduce:transform-none"
    >
      <div className="flex items-center gap-2">
        {pixel && <PixelSword />}
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      <p className="mt-1 font-mono text-[11px] text-ink-muted">{role}</p>
      {badge && (
        <p className="mt-2 self-start border border-ink/20 bg-paper px-2 py-0.5 font-mono text-[11px] tracking-wide">
          {badge}
        </p>
      )}
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{hook}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-4">
        {tags.map((t) => (
          <li
            key={t}
            className="rounded-md border border-ink/15 bg-paper px-2 py-0.5 font-mono text-[11px] text-ink-muted"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-xs text-night">
        Read more <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none">→</span>
      </p>
    </Link>
  );
}
