import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Section, SectionHeading } from "@/components/section";
import { SocialLinks } from "@/components/social-links";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

type ContactProps = {
  dict: Dictionary;
};

export function Contact({ dict }: ContactProps) {
  return (
    <Section id="contact" className="border-t border-border/60">
      <SectionHeading
        title={dict.contact.title}
        description={dict.contact.subtitle}
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm strings={dict.contact} />

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted">{dict.contact.emailMe}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-flex items-center gap-2 text-base font-medium text-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
          </div>

          <SocialLinks />
        </div>
      </div>
    </Section>
  );
}
