import Image from "next/image";
import { about, siteConfig } from "@/lib/data";
import { RichText } from "./RichText";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16">
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
            className="mt-2 inline-block rounded-md bg-night px-4 py-2 text-sm text-paper transition-colors hover:bg-night-deep"
          >
            Get in touch
          </a>
        </div>
        <Image
          src="/images/headshot.jpg"
          alt="Hitaansh Jain in front of the lower Manhattan skyline at night"
          width={640}
          height={853}
          className="rounded-lg"
        />
      </div>
    </section>
  );
}
