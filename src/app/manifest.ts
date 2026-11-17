import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary(defaultLocale);
  return {
    name: dict.meta.title,
    short_name: dict.hero.name,
    description: dict.meta.description,
    start_url: `/${defaultLocale}`,
    // "browser", not "standalone": installable PWAs need 192 and 512 icons,
    // and shipping icons that small would make the claim a lie.
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    lang: defaultLocale,
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
