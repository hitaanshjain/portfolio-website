import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { getCaseStudySlugs } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url },
    ...getCaseStudySlugs().map((slug) => ({ url: `${siteConfig.url}/projects/${slug}` })),
  ];
}
