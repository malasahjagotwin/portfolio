"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useId, useRef, useState } from "react";
import { useDismissable } from "@/lib/use-dismissable";

type ThemeToggleProps = {
  labels: {
    light: string;
    dark: string;
    system: string;
    toggle: string;
  };
};

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useDismissable(open, setOpen, containerRef, triggerRef);

  const options = [
    { value: "light", label: labels.light, icon: Sun },
    { value: "dark", label: labels.dark, icon: Moon },
    { value: "system", label: labels.system, icon: Monitor },
  ];

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={labels.toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-input-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Sun
          aria-hidden="true"
          className="h-4 w-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90"
        />
        <Moon
          aria-hidden="true"
          className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0"
        />
      </button>

      {open ? (
        <div
          id={panelId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          {options.map((option) => {
            const Icon = option.icon;
            const active = theme === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                <span className="flex-1 text-left">{option.label}</span>
                {active ? (
                  <Check aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
