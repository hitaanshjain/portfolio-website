"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useTypewriter } from "@/hooks/useTypewriter";

export function TypingLine({ text }: { text: string }) {
  // Server render + first paint show full text (no-JS fallback, no hydration
  // mismatch). After mount, animate only on the first visit this session.
  // useIsomorphicLayoutEffect (not useEffect) here and in useTypewriter so the
  // sessionStorage check and the count-reset land in the same pre-paint
  // flush: the browser's first visible change after hydration is a single
  // cut straight from "full text" to "blank, typing", with no extra frame
  // in between where React has merely re-confirmed the full text is still
  // there. (A pre-hydration inline-script approach that hides the fallback
  // text before any paint was prototyped and rejected: see TypingLine
  // notes in the Task 11 report: it raced with HTML chunk delivery on this
  // page in ~1/5 runs and could paint visible text before the hide applied,
  // which is worse than this reliable, if not flash-free, approach.)
  const [animate, setAnimate] = useState(false);
  useIsomorphicLayoutEffect(() => {
    // sessionStorage throws SecurityError in browsers/settings that block
    // storage access (e.g. Safari private mode with stricter settings,
    // some hardened/locked-down configurations). Since this runs in a
    // layout effect, an uncaught throw here unmounts the whole tree,
    // so any failure must degrade to static text (animate left false).
    try {
      if (!sessionStorage.getItem("hj-typed")) {
        sessionStorage.setItem("hj-typed", "1");
        setAnimate(true);
      }
    } catch {
      /* storage blocked: leave animate false */
    }
  }, []);
  const { display, done } = useTypewriter(text, { enabled: animate });
  return (
    // Outer wrapper is sized by an invisible copy of the FULL text (normal
    // flow, always wraps to its final line count), while the visible/typed
    // text is an absolutely-positioned overlay that doesn't affect that
    // size. Without this, the line reflows from 1 line to 2 as the
    // animation crosses the wrap point, shoving the rest of the page down
    // mid-animation (measured ~0.17 CLS), a real, visible "page jump" for
    // every first-time visitor.
    <span className="relative block">
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="absolute inset-0">
        {animate ? display : text}
        {animate && !done && <span>▌</span>}
      </span>
    </span>
  );
}
