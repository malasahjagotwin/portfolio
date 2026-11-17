import { Section, SectionHeading } from "@/components/section";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type AboutProps = {
  dict: Dictionary;
};

export function About({ dict }: AboutProps) {
  return (
    <Section id="about" className="border-t border-border/60">
      <SectionHeading
        title={dict.about.title}
        description={dict.about.subtitle}
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          {dict.about.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="text-base leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}

          <dl className="grid grid-cols-3 gap-6 pt-6">
            {dict.about.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-semibold text-foreground sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-muted">
            {dict.about.skillsTitle}
          </h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {dict.about.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
