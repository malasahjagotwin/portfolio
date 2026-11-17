import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Projects dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
