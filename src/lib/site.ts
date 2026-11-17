export const siteConfig = {
  url: "https://proxi.cc.cd",
  email: "isalnevada@icloud.com",
  // LinkedIn and X placeholders were removed rather than pointed at
  // "username": those URLs resolve to somebody else's real profiles.
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/malasahjagotwin" },
    { key: "discord", label: "Discord", href: "https://discord.gg/xeApeeRBkB" },
  ],
} as const;

export const navKeys = ["about", "projects", "contact"] as const;
export type NavKey = (typeof navKeys)[number];
