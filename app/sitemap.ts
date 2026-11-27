import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.siteUrl}${p}`;
  return [
    { url: u("/"), changeFrequency: "weekly", priority: 1 },
    { url: u("/confidentialitate/"), changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cookies/"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
