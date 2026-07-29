import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Nav() {
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/images/avatar.jpg"
          alt="Hitaansh Jain"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-display text-lg">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <a href={siteConfig.github} className="link-underline hidden sm:inline">GitHub</a>
        <a href={siteConfig.linkedin} className="link-underline hidden sm:inline">LinkedIn</a>
        <a
          href={siteConfig.resumePath}
          className="rounded-md bg-night px-3 py-1.5 text-paper transition-colors hover:bg-night-deep"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
