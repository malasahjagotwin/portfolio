import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === "id" ? 1 : 0.9,
    alternates: {
      languages: {
        id: `${siteConfig.url}/id`,
        en: `${siteConfig.url}/en`,
      },
    },
  }));
}
