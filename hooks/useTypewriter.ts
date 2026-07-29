"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function useTypewriter(
  text: string,
  opts: { cps?: number; enabled?: boolean } = {}
): { display: string; done: boolean } {
  const { cps = 40, enabled = true } = opts;

  // Server render and first client paint always show the full text; the
  // effect below decides whether to restart from zero and animate.
  const [count, setCount] = useState(text.length);

  // useIsomorphicLayoutEffect (not useEffect): when `enabled` flips true, this must
  // reset count to 0 in the same pre-paint pass as TypingLine's own
  // sessionStorage layout effect, so the browser never gets a chance to
  // paint an intermediate "still full text" frame between the two.
  useIsomorphicLayoutEffect(() => {
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
