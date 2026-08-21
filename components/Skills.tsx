import { skills } from "@/lib/data";

// Accent classes must stay as full literal strings so Tailwind's scanner
// picks them up.
const ACCENTS: Record<string, { dot: string; chip: string }> = {
  Languages: { dot: "bg-[#b4562a]", chip: "border-[#b4562a]/30 hover:border-[#b4562a]/60" },
  "Backend & Data": { dot: "bg-[#14245c]", chip: "border-[#14245c]/25 hover:border-[#14245c]/60" },
  Frontend: { dot: "bg-[#1f6f50]", chip: "border-[#1f6f50]/30 hover:border-[#1f6f50]/60" },
  "AI & Data Engineering": { dot: "bg-[#6d4bb0]", chip: "border-[#6d4bb0]/30 hover:border-[#6d4bb0]/60" },
  "Testing & DevOps": { dot: "bg-[#8a6d1f]", chip: "border-[#8a6d1f]/30 hover:border-[#8a6d1f]/60" },
};
const FALLBACK_ACCENT = { dot: "bg-ink/40", chip: "border-ink/10 hover:border-ink/30" };

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-16 md:scroll-mt-20">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">Skills</h2>
      <div className="mt-8 space-y-6">
        {skills.map(({ group, items }) => {
          const accent = ACCENTS[group] ?? FALLBACK_ACCENT;
          return (
            <div key={group}>
              <h3 className="flex items-center gap-2 text-sm font-medium text-ink-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden="true" />
                {group}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {items.map((item, i) => (
                  // The `title` attribute used to sit here alongside the
                  // styled tooltip, which meant a hovering mouse user got
                  // both the native tooltip and this one. Dropped: the
                  // styled tooltip below covers pointers, the sr-only span
                  // covers assistive tech, and `title` never surfaces on
                  // keyboard focus in any browser, so it was never the
                  // thing making this reachable.
                  <li
                    key={item.name}
                    className={`skill-chip relative cursor-default rounded-md border bg-white/40 px-2.5 py-1 font-mono text-xs transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none ${accent.chip} ${
                      i % 2 ? "hover:rotate-1" : "hover:-rotate-1"
                    }`}
                  >
                    {item.name}
                    {item.usedAt && (
                      <>
                        {/* Unconditional for screen readers: where a skill
                            was used is evidence for the claim, so it should
                            not depend on a pointer being present. */}
                        <span className="sr-only"> (used at {item.usedAt})</span>
                        <span aria-hidden="true" className="skill-note">
                          {item.usedAt}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
