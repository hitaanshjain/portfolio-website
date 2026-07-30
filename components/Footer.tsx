import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-xs text-ink-muted">
        <p>© 2026 {siteConfig.name} · Built with Next.js</p>
        <p className="flex gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="link-underline">Email</a>
        </p>
      </div>
    </footer>
  );
}
