"use client";

/*
 * Last-resort boundary: this replaces the root layout when that layout itself
 * throws, so it must supply <html> and <body> and cannot rely on either the
 * Tailwind layer or the theme provider having loaded. Styles are inline for
 * that reason, and the colours are hardcoded to the dark palette so it never
 * renders unstyled white-on-white.
 */
export default function GlobalError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          background: "#05070d",
          color: "#e5e7eb",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "#818cf8" }}>
            Error
          </p>
          <h1 style={{ margin: "0.5rem 0 0", fontSize: "1.5rem", fontWeight: 600 }}>
            Terjadi kesalahan
          </h1>
          <p style={{ margin: "0.75rem 0 0", color: "#94a3b8", fontSize: "0.875rem" }}>
            Halaman gagal dimuat.
          </p>
          <p lang="en" style={{ margin: "0.25rem 0 0", color: "#94a3b8", fontSize: "0.875rem" }}>
            The page failed to load.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "999px",
                background: "#818cf8",
                color: "#05070d",
                padding: "0.75rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Coba lagi
            </button>
            <a
              href="/id"
              style={{
                borderRadius: "999px",
                border: "1px solid #1e293b",
                background: "#0d1220",
                color: "#e5e7eb",
                padding: "0.75rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Kembali ke beranda
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}