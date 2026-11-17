export const siteConfig = {
  url: "https://proxi.cc.cd",
  email: "isalnevada@icloud.com",
  // LinkedIn and X placeholders were removed rather than pointed at
  // "username": those URLs resolve to somebody else's real profiles.
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/malasahjagotwin" },
    { key: "telegram", label: "Telegram", href: "https://t.me/tanpoint" },
    // Permanent invite (max_age 0) on the server's #welcome channel. The
    // previous link expired on its 30-day timer, so it 404'd for visitors.
    { key: "discord", label: "Discord", href: "https://discord.gg/wQzgDVpAg5" },
  ],
} as const;

export const navKeys = ["about", "projects", "contact"] as const;
export type NavKey = (typeof navKeys)[number];
