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
