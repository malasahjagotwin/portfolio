"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { navKeys } from "@/lib/site";

type MobileNavProps = {
  nav: Dictionary["nav"];
  labels: Dictionary["menu"];
};

export function MobileNav({ nav, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-16 border-b border-border/70 bg-background/95 backdrop-blur-md"
        >
          <nav className="container-page flex flex-col py-2">
            {navKeys.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                {nav[key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
