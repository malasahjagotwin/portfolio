"use client";

import { Check, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/lib/i18n/config";

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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function hrefFor(target: Locale) {
    const segments = pathname.split("/");
    segments[1] = target;
    const next = segments.join("/");
    return next.length > 1 ? next : `/${target}`;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          {locales.map((item) => (
            <Link
              key={item}
              href={hrefFor(item)}
              role="menuitemradio"
              aria-checked={item === locale}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-background"
            >
              <span className="flex-1">{labels[item]}</span>
              {item === locale ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
