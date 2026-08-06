import { describe, it, expect } from "vitest";
import { getCaseStudySlugs, getCaseStudy, getAllCaseStudies } from "@/lib/case-studies";
import { siteConfig, hero, experience, compactProjects, skills, about } from "@/lib/data";

describe("case studies", () => {
  it("finds exactly the four case studies", () => {
    expect(getCaseStudySlugs().sort()).toEqual([
      "case-study-pipeline",
      "header",
      "rag-search",
      "swordfight",
    ]);
  });

  it("every case study has required frontmatter and a substantial body", () => {
    for (const cs of getAllCaseStudies()) {
      expect(cs.frontmatter.title.length).toBeGreaterThan(0);
      expect(cs.frontmatter.tags.length).toBeGreaterThanOrEqual(3);
      expect(cs.frontmatter.hook.length).toBeGreaterThan(20);
      expect(cs.content.length).toBeGreaterThan(500);
    }
  });

  it("orders case studies: header, pipeline, rag, swordfight", () => {
    expect(getAllCaseStudies().map((c) => c.frontmatter.slug)).toEqual([
      "header",
      "case-study-pipeline",
      "rag-search",
      "swordfight",
    ]);
  });

  it("never contains em-dashes or semicolons in rendered copy", () => {
    let text = JSON.stringify({ siteConfig, hero, experience, compactProjects, skills, about });
    for (const cs of getAllCaseStudies()) {
      text += cs.content;
      text += JSON.stringify([
        cs.frontmatter.title,
        cs.frontmatter.hook,
        cs.frontmatter.role,
        cs.frontmatter.badge ?? "",
        cs.frontmatter.tags,
      ]);
    }
    expect(text).not.toContain("—");
    expect(text).not.toContain(";");
  });

  it("never contains banned claims", () => {
    for (const cs of getAllCaseStudies()) {
      let text = cs.content + JSON.stringify(cs.frontmatter);
      text += JSON.stringify({ siteConfig, hero, experience, compactProjects, skills, about });
      for (const banned of ["2% hit", "66%", "80% hit", "sub-100ms", "TTFT", "SSE", "40%"]) {
        expect(text).not.toContain(banned);
      }
    }
  });

  it("throws on unknown slug", () => {
    expect(() => getCaseStudy("nope")).toThrow("Unknown case study");
  });
});
