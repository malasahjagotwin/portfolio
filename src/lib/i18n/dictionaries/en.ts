/*
 * href is optional on purpose: a card only becomes a link when there is
 * somewhere real to go, so an entry without one renders as a plain card.
 */
type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  href?: string;
};

const en = {
  meta: {
    title: "Isal Nevada — Backend & Network Developer",
    description:
      "Portfolio of Isal Nevada, a backend and network developer building services and network tooling in Go.",
    keywords: [
      "backend developer",
      "network developer",
      "Go",
      "golang",
      "Linux",
      "networking",
      "self-hosted",
      "portfolio",
    ],
  },
  nav: {
    about: "About",
    projects: "Projects",
    contact: "Contact",
  },
  locale: {
    label: "Language",
    id: "Bahasa Indonesia",
    en: "English",
  },
  theme: {
    label: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    toggle: "Toggle theme",
  },
  menu: {
    open: "Open menu",
    close: "Close menu",
  },
  a11y: {
    skipToContent: "Skip to content",
    newTab: "(opens in a new tab)",
  },
  hero: {
    availability: "Available for new projects",
    greeting: "Hi, I'm",
    name: "Isal Nevada",
    role: "Backend & Network Developer",
    tagline:
      "I build backend services and network tooling in Go — single-binary tools, self-hosted infrastructure, and the plumbing that keeps it reachable from outside the LAN.",
    ctaProjects: "View projects",
    ctaContact: "Get in touch",
  },
  about: {
    title: "About me",
    subtitle: "A short introduction",
    paragraphs: [
      "I'm a backend and network developer. Most of what I build is Go: single-binary services and CLI tools that do one job without dragging a runtime along with them.",
      "Outside of application code I spend most of my time on infrastructure — Linux hosts, systemd units, SSH tunnels and reverse proxies — keeping services that sit behind NAT reachable and dependable.",
    ],
    skillsTitle: "Tech I work with",
    skills: [
      "Go",
      "TypeScript",
      "JavaScript",
      "Shell",
      "C",
      "Linux",
      "systemd",
      "Docker",
      "Networking",
      "SSH",
      "Redis",
      "PostgreSQL",
    ],
  },
  projects: {
    title: "Selected projects",
    subtitle: "A few things I've built",
    viewLabel: "View project",
    items: [
      {
        title: "Proxmox Reverse SSH Tunnel",
        description:
          "Exposes Proxmox VE containers and VMs behind NAT through a public VPS using SSH reverse tunnels. systemd units keep the tunnel up and bring it back automatically when the forward fails.",
        tags: ["Shell", "systemd", "SSH", "Networking"],
        year: "2026",
        href: "https://github.com/malasahjagotwin/proxmox-reverse-ssh",
      },
      {
        title: "Bilingual Portfolio",
        description:
          "This site. Next.js 16 App Router with Cache Components and Partial Prefetching, two typed dictionaries that have to stay in sync, and Tailwind CSS v4 with a CSS-first config.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        year: "2026",
        href: "https://github.com/malasahjagotwin/portfolio",
      },
    ] as ProjectItem[],
  },
  contact: {
    title: "Let's work together",
    subtitle:
      "Have a project in mind or just want to say hi? Drop me a message and I'll get back to you soon.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project...",
    submit: "Send message",
    sending: "Sending...",
    success: "Thanks! Your message has been sent.",
    error: "Something went wrong. Please try again.",
    required: "This field is required.",
    invalidEmail: "Please enter a valid email address.",
    emailMe: "Or email me directly at",
  },
  error: {
    title: "Something went wrong",
    description:
      "An unexpected error occurred while loading this page. Try again, or head back home.",
    retry: "Try again",
    back: "Back to home",
  },
  footer: {
    rights: "All rights reserved.",
    builtWith: "Built with Next.js and Tailwind CSS.",
  },
  notFound: {
    title: "Page not found",
    description: "Sorry, the page you are looking for doesn't exist.",
    back: "Back to home",
  },
};

export default en;
