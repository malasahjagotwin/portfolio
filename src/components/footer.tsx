import { cacheLife } from "next/cache";
import { SocialLinks } from "@/components/social-links";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type FooterProps = {
  dict: Dictionary;
};

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer({ dict }: FooterProps) {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            {dict.hero.name}
          </p>
          <p className="mt-1 text-xs text-muted">
            © {year} {dict.hero.name}. {dict.footer.rights}
          </p>
          <p className="mt-1 text-xs text-muted">{dict.footer.builtWith}</p>
        </div>

        <SocialLinks />
      </div>
    </footer>
  );
}
