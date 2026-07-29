import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = getCaseStudy(slug);
  return {
    title: `${frontmatter.title} — Hitaansh Jain`,
    description: frontmatter.hook,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let study;
  try {
    study = getCaseStudy(slug);
  } catch {
    notFound();
  }
  return (
    <CaseStudyLayout frontmatter={study.frontmatter}>
      <MDXRemote source={study.content} />
    </CaseStudyLayout>
  );
}
