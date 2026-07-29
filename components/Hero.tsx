import { hero, siteConfig } from "@/lib/data";
import { TypingLine } from "./TypingLine";

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 md:pt-28">
      <p className="font-mono text-sm text-ink-muted">{hero.prompt}</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-7xl">
        {siteConfig.name}
      </h1>
      <p className="mt-5 max-w-2xl font-mono text-base text-ink md:text-lg">
        <TypingLine text={hero.typedLine} />
      </p>
      <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        <span className="status-dot inline-block h-2 w-2 rounded-full bg-status" aria-hidden="true" />
        {hero.statusItems.map((item, i) => (
          <span key={item}>
            {item}
            {i < hero.statusItems.length - 1 && <span className="mx-1 text-ink-muted/50">·</span>}
          </span>
        ))}
      </p>
      <div className="mt-8 flex flex-wrap gap-5 text-sm">
        <a href={siteConfig.github} className="link-underline text-night">GitHub</a>
        <a href={siteConfig.linkedin} className="link-underline text-night">LinkedIn</a>
        <a href={`mailto:${siteConfig.email}`} className="link-underline text-night">
          {siteConfig.email}
        </a>
      </div>
    </section>
  );
}
