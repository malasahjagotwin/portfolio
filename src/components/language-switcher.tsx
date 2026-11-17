"use client";

import { Check, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { locales, type Locale } from "@/lib/i18n/config";
import { useDismissable } from "@/lib/use-dismissable";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  labels: Record<Locale, string>;
};

export function LanguageSwitcher({
  locale,
  label,
  labels,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useDismissable(open, setOpen, containerRef, triggerRef);

  /*
   * usePathname() drops the fragment, so a reader parked on #projects would be
   * sent to the top of the page on a locale switch. Read it after mount to keep
   * the first client render identical to the server one.
   */
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    const next = segments.join("/");
    return (next.length > 1 ? next : `/${target}`) + hash;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-input-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {/* Plain disclosure of language links — see the note in theme-toggle. */}
      {open ? (
        <div
          id={panelId}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          {locales.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              aria-current={item === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background"
            >
              <span className="flex-1">{labels[item]}</span>
              {item === locale ? (
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}