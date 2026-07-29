"use client";

import { useEffect, useState } from "react";

export function useTypewriter(
  text: string,
  opts: { cps?: number; enabled?: boolean } = {}
): { display: string; done: boolean } {
  const { cps = 40, enabled = true } = opts;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animate = enabled && !reduced;

  const [count, setCount] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (!animate) return;
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
  }, [animate, cps, text]);

  return { display: text.slice(0, count), done: count >= text.length };
}
