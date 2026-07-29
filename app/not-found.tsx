import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-sm text-ink-muted">
        $ curl hitaanshjain.vercel.app <span className="text-night">— 404</span>
      </p>
      <h1 className="font-display text-4xl">This page doesn&apos;t exist.</h1>
      <Link href="/" className="link-underline font-mono text-sm text-night">
        cd ~/
      </Link>
    </main>
  );
}
