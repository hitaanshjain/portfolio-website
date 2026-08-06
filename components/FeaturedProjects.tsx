import { getAllCaseStudies } from "@/lib/case-studies";
import { ProjectCard } from "./ProjectCard";

export function FeaturedProjects() {
  const studies = getAllCaseStudies();
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">Selected Work</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {studies.map((s) => (
          <ProjectCard key={s.frontmatter.slug} study={s} />
        ))}
      </div>
    </section>
  );
}
