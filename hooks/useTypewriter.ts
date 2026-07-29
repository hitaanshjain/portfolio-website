"use client";

import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  opts: { cps?: number; enabled?: boolean } = {}
): { display: string; done: boolean } {
  const { cps = 40, enabled = true } = opts;

  // Server render and first client paint always show the full text; the
  // effect below decides whether to restart from zero and animate.
  const [count, setCount] = useState(text.length);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled || reduced) {
      setCount(text.length);
      return;
    }
    setCount(0);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 1000 / cps);
    return () => clearInterval(interval);
  }, [enabled, cps, text]);

  return { display: text.slice(0, count), done: count >= text.length };
}
