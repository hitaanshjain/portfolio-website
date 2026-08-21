import Image from "next/image";
import headshot from "@/public/images/headshot.jpg";
import { about, siteConfig } from "@/lib/data";
import { RichText } from "./RichText";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-16 px-6 py-16 md:scroll-mt-20">
      <h2 className="font-mono text-sm uppercase tracking-widest text-ink-muted">About</h2>
      <div className="mt-8 grid items-start gap-10 md:grid-cols-[1fr_minmax(0,320px)]">
        <div className="space-y-4 text-[17px] leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>
              <RichText text={p} />
            </p>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-2 inline-block rounded-md bg-night px-4 py-2 text-sm text-paper transition-colors hover:bg-night-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night"
          >
            Get in touch
          </a>
        </div>
        {/* Statically imported rather than referenced by path so Next can
            derive the intrinsic dimensions and generate the blurDataURL at
            build time. placeholder="blur" only auto-generates for static
            imports; a string src would need the blur data supplied by hand.
            Without it this slot is a blank rectangle on a cold cache until
            the photo arrives, which is the one image on the site big enough
            for that gap to show. */}
        <Image
          src={headshot}
          alt="Hitaansh Jain in front of the lower Manhattan skyline at night"
          placeholder="blur"
          sizes="(min-width: 768px) 320px, 100vw"
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
