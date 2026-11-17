import { ImageResponse } from "next/og";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#818cf8",
            fontSize: 26,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#818cf8",
            }}
          />
          {dict.hero.availability}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#e5e7eb", fontSize: 84, fontWeight: 700 }}>
            {dict.hero.name}
          </div>
          <div style={{ color: "#818cf8", fontSize: 44 }}>
            {dict.hero.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#94a3b8",
            fontSize: 28,
          }}
        >
          <span>{dict.meta.title}</span>
          <span>{locale.toUpperCase()}</span>
        </div>
      </div>
    ),
    size,
  );
}
