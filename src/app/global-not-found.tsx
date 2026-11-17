import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

/*
 * This file bypasses app/[lang]/layout.tsx, so next-themes never runs and the
 * OS color scheme is the only signal available. Apply the stored theme here
 * before paint, or a dark-mode visitor gets a light page.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light"}catch(e){}})()`;

export default function GlobalNotFound() {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-accent">404</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-muted">
            Halaman yang kamu cari tidak ada.
          </p>
          <p className="mt-1 text-sm text-muted" lang="en">
            The page you are looking for does not exist.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/id"
              className="inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Kembali ke beranda
            </Link>
            <Link
              href="/en"
              lang="en"
              className="inline-flex rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              English home
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted">
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
