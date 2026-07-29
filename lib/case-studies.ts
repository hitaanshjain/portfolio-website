import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyLink = { label: string; href: string };

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  timeframe: string;
  role: string;
  tags: string[];
  hook: string;
  order: number;
  badge?: string;
  pixel?: boolean;
  links: CaseStudyLink[];
};

export type CaseStudy = { frontmatter: CaseStudyFrontmatter; content: string };

const REQUIRED = ["title", "slug", "timeframe", "role", "tags", "hook", "order", "links"] as const;

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): CaseStudy {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error(`Unknown case study: ${slug}`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  for (const key of REQUIRED) {
    if (data[key] === undefined) throw new Error(`${slug}.mdx missing frontmatter field: ${key}`);
  }
  if (data.slug !== slug) throw new Error(`${slug}.mdx frontmatter slug does not match filename`);
  return { frontmatter: data as CaseStudyFrontmatter, content };
}

export function getAllCaseStudies(): CaseStudy[] {
  return getCaseStudySlugs()
    .map(getCaseStudy)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}
