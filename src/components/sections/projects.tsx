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
        {dict.projects.items.map((project) => (
          <li key={project.title}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-accent" />
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

              <span className="sr-only">{dict.projects.viewLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
