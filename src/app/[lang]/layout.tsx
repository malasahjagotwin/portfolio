import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar locale={lang} dict={dict} />
            <main className="flex-1">{props.children}</main>
            <Footer dict={dict} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
