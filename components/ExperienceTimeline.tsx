import Link from "next/link";
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
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    {job.company}
                  </a>
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
            {job.caseStudySlug && (
              <Link
                href={`/projects/${job.caseStudySlug}`}
                className="group mt-4 inline-block font-mono text-xs text-night link-underline"
              >
                Read more{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
                  →
                </span>
              </Link>
            )}
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
