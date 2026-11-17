import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono was loaded but nothing used font-mono, so it was a wasted
// download. globals.css falls back to a system mono stack instead.

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
};

const ogLocale: Record<string, string> = {
  id: "id_ID",
  en: "en_US",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.hero.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: dict.hero.name }],
    creator: dict.hero.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: dict.hero.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: ogLocale[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout(
  props: LayoutProps<"/[lang]">,
) {
  const { lang } = await props.params;

  if (!isLocale(lang)) {
    redirect(`/${defaultLocale}`);
  }

  const dict = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: dict.hero.name,
        jobTitle: dict.hero.role,
        description: dict.meta.description,
        url: `${siteConfig.url}/${lang}`,
        email: `mailto:${siteConfig.email}`,
        knowsAbout: dict.about.skills,
        image: `${siteConfig.url}/apple-icon`,
        // A Discord invite is not a profile URL: sameAs should point at places
        // that identify the person, not at a door into a server.
        sameAs: siteConfig.socials
          .filter((social) => social.key !== "discord")
          .map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: `${siteConfig.url}/${lang}`,
        name: dict.hero.name,
        description: dict.meta.description,
        inLanguage: lang,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
            >
              {dict.a11y.skipToContent}
            </a>
            <Navbar locale={lang} dict={dict} />
            <main id="main" tabIndex={-1} className="flex-1">
              {props.children}
            </main>
            <Footer dict={dict} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
