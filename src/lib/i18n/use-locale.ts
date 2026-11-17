"use client";

import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/*
 * For client boundaries that render inside app/[lang]/ but receive no params —
 * route-level error and not-found UIs. The locale has to come back out of the
 * pathname, since the segment it was passed as is no longer in scope.
 */
export function useLocaleFromPathname(): Locale {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  return isLocale(segment) ? segment : defaultLocale;
}
