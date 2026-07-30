import type { ReactNode } from "react";

// Minimal inline-link syntax for prose that lives in lib/data.ts as plain
// strings: [label](https://example.com). Only links are supported, so the
// copy stays readable in the data file. React escapes the text, so there is
// no markup-injection path here.
const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_LINK)) {
    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    nodes.push(
      <a
        key={start}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline text-night"
      >
        {match[1]}
      </a>
    );
    cursor = start + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}
