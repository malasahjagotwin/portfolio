import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

/*
 * Evaluated once when this metadata route is generated at build time, which is
 * the honest meaning of lastModified for statically-built pages.
 */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "id" ? 1 : 0.9,
    alternates: {
      languages: {
        id: `${siteConfig.url}/id`,
        en: `${siteConfig.url}/en`,
        "x-default": `${siteConfig.url}/id`,
      },
    },
  }));
}
