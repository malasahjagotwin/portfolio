import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ProjectsProps = {
  dict: Dictionary;
};

export function Projects({ dict }: ProjectsProps) {
  return (
    <Section id="projects" className="border-t border-border/60">
      <SectionHeading
        title={dict.projects.title}
        description={dict.projects.subtitle}
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.projects.items.map((project) => {
          const body = (
            <>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                {project.href ? (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent"
                  />
                ) : null}
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4">
                <ul className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="text-xs text-muted">{project.year}</span>
              </div>

              {project.href ? (
                <span className="sr-only">
                  {dict.projects.viewLabel} {dict.a11y.newTab}
                </span>
              ) : null}
            </>
          );

          return (
            <li key={project.title}>
              {/*
               * A card is only a link when there is somewhere to go. The
               * placeholder entries have no href, and a card pointing at
               * example.com is a dead end masquerading as a project.
               */}
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
                >
                  {body}
                </a>
              ) : (
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}