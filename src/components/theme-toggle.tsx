"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

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

  const options = [
    { value: "light", label: labels.light, icon: Sun },
    { value: "dark", label: labels.dark, icon: Moon },
    { value: "system", label: labels.system, icon: Monitor },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={labels.toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <Sun className="h-4 w-4 scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </button>

      {open ? (
        <div
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
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-background"
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{option.label}</span>
                {active ? <Check className="h-3.5 w-3.5 text-accent" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
