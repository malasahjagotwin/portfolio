import { ArrowRight, Sparkles } from "lucide-react";
import { SocialLinks } from "@/components/social-links";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type HeroProps = {
  dict: Dictionary;
};

export function Hero({ dict }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent)]"
      />

      <div className="container-page flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          {dict.hero.availability}
        </span>

        <p className="mt-6 text-lg text-muted">{dict.hero.greeting}</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {dict.hero.name}
        </h1>
        <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
          {dict.hero.role}
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          {dict.hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {dict.hero.ctaProjects}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {dict.hero.ctaContact}
          </a>
        </div>

        <SocialLinks className="mt-10" newTabLabel={dict.a11y.newTab} />
      </div>
    </section>
  );
}
