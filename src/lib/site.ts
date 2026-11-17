export const siteConfig = {
  url: "https://example.com",
  email: "hello@example.com",
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/username" },
    { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/username" },
    { key: "x", label: "X", href: "https://x.com/username" },
  ],
} as const;

export const navKeys = ["about", "projects", "contact"] as const;
export type NavKey = (typeof navKeys)[number];
