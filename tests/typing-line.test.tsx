import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import { TypingLine } from "@/components/TypingLine";
import { mediaState } from "./setup";

const TEXT = "CS @ NYU '27. Full-stack and AI engineer.";

// How many times the full string appears in the rendered markup. The line is
// duplicated on purpose while typing (sizing copy + screen-reader copy +
// visible overlay), but every settled state must deliver it exactly once so
// crawlers and copy-paste don't pick up three copies.
function copies(html: string): number {
  return html.split(TEXT).length - 1;
}

describe("TypingLine", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mediaState.reducedMotion = false;
    sessionStorage.clear();
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("collapses from the layered structure to a single copy once typing ends", () => {
    const { container } = render(<TypingLine text={TEXT} />);
    // While typing: the sizing copy and the screen-reader copy both hold the
    // full string, and the overlay holds a growing prefix.
    expect(copies(container.innerHTML)).toBe(2);
    act(() => vi.advanceTimersByTime(5000));
    expect(container.textContent).toBe(TEXT);
    expect(copies(container.innerHTML)).toBe(1);
  });

  it("renders the text once on a repeat visit in the same session", () => {
    render(<TypingLine text={TEXT} />);
    cleanup();
    const { container } = render(<TypingLine text={TEXT} />);
    expect(container.textContent).toBe(TEXT);
    expect(copies(container.innerHTML)).toBe(1);
  });

  it("renders the text once when reduced motion is preferred", () => {
    mediaState.reducedMotion = true;
    const { container } = render(<TypingLine text={TEXT} />);
    expect(container.textContent).toBe(TEXT);
    expect(copies(container.innerHTML)).toBe(1);
  });

  it("keeps duplicate copies out of the accessibility tree while typing", () => {
    const { container } = render(<TypingLine text={TEXT} />);
    act(() => vi.advanceTimersByTime(100));
    const exposed = Array.from(container.querySelectorAll("span")).filter(
      (el) => !el.closest("[aria-hidden='true']")
    );
    expect(exposed.map((el) => el.textContent)).toContain(TEXT);
    expect(exposed.filter((el) => el.textContent === TEXT)).toHaveLength(1);
  });
});
