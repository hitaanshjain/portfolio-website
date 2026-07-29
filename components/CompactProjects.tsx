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
