import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect on the client; useEffect during SSR so React's
// "useLayoutEffect does nothing on the server" dev warning never fires.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
