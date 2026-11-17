"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleFromPathname } from "@/lib/i18n/use-locale";

/*
 * not-found.tsx receives no params, so the locale comes back out of the
 * pathname. That makes this a Client Component; the dictionaries are a couple
 * of kilobytes, which is an acceptable trade for translated copy here.
 */
export default function LocaleNotFound() {
  const locale = useLocaleFromPathname();
  const dict = getDictionary(locale);

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {dict.notFound.description}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        {dict.notFound.back}
      </Link>
    </section>
  );
}
