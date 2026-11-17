import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { navKeys } from "@/lib/site";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {dict.hero.name}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navKeys.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {dict.nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher
            locale={locale}
            label={dict.locale.label}
            labels={{ id: dict.locale.id, en: dict.locale.en }}
          />
          <ThemeToggle labels={dict.theme} />
        </div>
      </div>
    </header>
  );
}
