import { ImageResponse } from "next/og";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/*
 * Monogram rather than a fixed mark, so replacing the placeholder identity in
 * the dictionary also fixes the tab icon.
 */
export default function Icon() {
  const name = getDictionary(defaultLocale).hero.name.trim();
  const initial = name.charAt(0).toUpperCase() || "•";

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
          fontSize: 19,
          fontWeight: 700,
          borderRadius: 7,
        }}
      >
        {initial}
      </div>
    ),
    size,
  );
}
