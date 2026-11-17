import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-accent">404</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-muted">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/id"
            className="mt-6 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
