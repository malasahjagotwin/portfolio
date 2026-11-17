import { notFound } from "next/navigation";

/*
 * Without this, /id/anything is an unmatched URL and Next serves the bare
 * global-not-found document, outside the site layout. Routing it through
 * notFound() renders app/[lang]/not-found.tsx inside the layout instead, so
 * the 404 keeps the navbar, theme and language switcher.
 */
export default function CatchAll() {
  notFound();
}
