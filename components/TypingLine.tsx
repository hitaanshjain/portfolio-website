"use client";

import { useEffect, useState } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";

export function TypingLine({ text }: { text: string }) {
  // Server render + first paint show full text (no-JS fallback, no hydration
  // mismatch). After mount, animate only on the first visit this session.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!sessionStorage.getItem("hj-typed")) {
      sessionStorage.setItem("hj-typed", "1");
      setAnimate(true);
    }
  }, []);
  const { display, done } = useTypewriter(text, { enabled: animate });
  return (
    <span aria-label={text}>
      {animate ? display : text}
      {animate && !done && <span aria-hidden="true">▌</span>}
    </span>
  );
}
