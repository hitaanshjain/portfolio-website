import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Nav() {
  return (
    // Sticky so the Resume button, the site's primary call to action, stays
    // one click away through a six-section homepage instead of scrolling
    // away after the hero. The outer element is full-bleed so the blurred
    // backdrop spans the viewport; the inner div keeps the max-w-5xl
    // measure shared with every other section. Sections carrying anchor
    // ids pair this with scroll-mt-* so their headings don't land
    // underneath the bar. Tighter padding below md keeps the bar near 56px
    // on a phone rather than eating 72px of a short viewport.
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 md:py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/pfp.jpg"
            alt=""
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-display text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/#experience" className="link-underline hidden md:inline">Experience</Link>
          <Link href="/#projects" className="link-underline hidden md:inline">Projects</Link>
          <Link href="/#about" className="link-underline hidden md:inline">About</Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden sm:inline"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hidden sm:inline"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-night px-3 py-1.5 text-paper transition-colors hover:bg-night-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
