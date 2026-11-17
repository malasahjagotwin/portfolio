"use client";

import { Menu, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { navKeys } from "@/lib/site";
import { useDismissable } from "@/lib/use-dismissable";

type MobileNavProps = {
  nav: Dictionary["nav"];
  labels: Dictionary["menu"];
};

export function MobileNav({ nav, labels }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useDismissable(open, setOpen, containerRef, triggerRef);

  return (
    <div ref={containerRef} className="sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? labels.close : labels.open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-input-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
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