import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { RichText } from "@/components/RichText";
import { about } from "@/lib/data";

afterEach(cleanup);

describe("RichText", () => {
  it("renders plain text unchanged when there are no links", () => {
    render(<p>{<RichText text="Just some prose with (parens) and [brackets]." />}</p>);
    expect(screen.getByText("Just some prose with (parens) and [brackets].")).toBeTruthy();
  });

  it("renders a markdown link as an anchor that opens in a new tab", () => {
    render(<p>{<RichText text="I work at [Header](https://joinheader.com) now." />}</p>);
    const link = screen.getByRole("link", { name: "Header" }) as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("https://joinheader.com");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("preserves the text surrounding a link", () => {
    const { container } = render(
      <p>{<RichText text="before [label](https://example.com) after" />}</p>
    );
    expect(container.textContent).toBe("before label after");
  });

  it("renders multiple links in one string", () => {
    render(
      <p>
        {
          <RichText text="[Header](https://joinheader.com) and [MathGPT](https://mathgpt.ai)" />
        }
      </p>
    );
    expect(screen.getByRole("link", { name: "Header" }).getAttribute("href")).toBe(
      "https://joinheader.com"
    );
    expect(screen.getByRole("link", { name: "MathGPT" }).getAttribute("href")).toBe(
      "https://mathgpt.ai"
    );
  });

  it("links both employers somewhere in the About copy", () => {
    render(
      <div>
        {about.paragraphs.map((p) => (
          <p key={p}>
            <RichText text={p} />
          </p>
        ))}
      </div>
    );
    const hrefs = screen
      .getAllByRole("link")
      .map((el) => el.getAttribute("href"));
    expect(hrefs).toContain("https://joinheader.com");
    expect(hrefs).toContain("https://mathgpt.ai");
  });

  it("leaves no unrendered markdown link syntax in the About copy", () => {
    const { container } = render(
      <div>
        {about.paragraphs.map((p) => (
          <p key={p}>
            <RichText text={p} />
          </p>
        ))}
      </div>
    );
    expect(container.textContent).not.toMatch(/\]\(http/);
  });
});
