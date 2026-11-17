import { ImageResponse } from "next/og";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/*
 * iOS composites its own corner mask and does not honour transparency, so this
 * one is a full-bleed square with no border radius.
 */
export default function AppleIcon() {
  const dict = getDictionary(defaultLocale);
  const initial = dict.hero.name.trim().charAt(0).toUpperCase() || "•";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05070d",
          color: "#818cf8",
          fontSize: 92,
          fontWeight: 700,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
