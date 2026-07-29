import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { mediaState } from "./setup";

describe("useTypewriter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mediaState.reducedMotion = false;
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns full text immediately when reduced motion is preferred", () => {
    mediaState.reducedMotion = true;
    const { result } = renderHook(() => useTypewriter("hello world"));
    expect(result.current.display).toBe("hello world");
    expect(result.current.done).toBe(true);
  });

  it("returns full text immediately when disabled", () => {
    const { result } = renderHook(() => useTypewriter("hello world", { enabled: false }));
    expect(result.current.display).toBe("hello world");
    expect(result.current.done).toBe(true);
  });

  it("types progressively at the configured speed", () => {
    const { result } = renderHook(() => useTypewriter("abcdefghij", { cps: 10 }));
    expect(result.current.display).toBe("");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.display).toBe("abcde");
    expect(result.current.done).toBe(false);
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.display).toBe("abcdefghij");
    expect(result.current.done).toBe(true);
  });

  it("starts typing when enabled flips from false to true", () => {
    const { result, rerender } = renderHook(
      ({ enabled }) => useTypewriter("abcdefghij", { cps: 10, enabled }),
      { initialProps: { enabled: false } }
    );
    expect(result.current.display).toBe("abcdefghij");
    rerender({ enabled: true });
    expect(result.current.display).toBe("");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.display).toBe("abcde");
  });
});
