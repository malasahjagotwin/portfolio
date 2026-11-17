import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className ?? ""}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
