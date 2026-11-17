import type { Dictionary } from "../dictionaries";

const id: Dictionary = {
  meta: {
    title: "Isal Nevada — Backend & Network Developer",
    description:
      "Portofolio Isal Nevada, backend dan network developer yang membangun layanan dan tooling jaringan dengan Go.",
    keywords: [
      "backend developer",
      "network developer",
      "Go",
      "golang",
      "Linux",
      "jaringan",
      "self-hosted",
      "portofolio",
    ],
  },
  nav: {
    about: "Tentang",
    projects: "Proyek",
    contact: "Kontak",
  },
  locale: {
    label: "Bahasa",
    id: "Bahasa Indonesia",
    en: "English",
  },
  theme: {
    label: "Tema",
    light: "Terang",
    dark: "Gelap",
    system: "Sistem",
    toggle: "Ganti tema",
  },
  menu: {
    open: "Buka menu",
    close: "Tutup menu",
  },
  a11y: {
    skipToContent: "Lompat ke konten",
    newTab: "(buka di tab baru)",
  },
  hero: {
    availability: "Terbuka untuk proyek baru",
    greeting: "Hai, saya",
    name: "Isal Nevada",
    role: "Backend & Network Developer",
    tagline:
      "Saya membangun layanan backend dan tooling jaringan dengan Go — tool binary tunggal, infrastruktur self-hosted, dan pipa yang membuat semuanya tetap bisa dijangkau dari luar LAN.",
    ctaProjects: "Lihat proyek",
    ctaContact: "Hubungi saya",
  },
  about: {
    title: "Tentang saya",
    subtitle: "Perkenalan singkat",
    paragraphs: [
      "Saya backend dan network developer. Sebagian besar yang saya bangun pakai Go: layanan binary tunggal dan CLI tool yang mengerjakan satu hal tanpa harus ikut membawa runtime.",
      "Di luar kode aplikasi, saya banyak berkutat di infrastruktur — host Linux, unit systemd, tunnel SSH, dan reverse proxy — supaya layanan yang berada di belakang NAT tetap bisa dijangkau dan andal.",
    ],
    skillsTitle: "Teknologi yang saya pakai",
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
    title: "Proyek pilihan",
    subtitle: "Beberapa hal yang saya bangun",
    viewLabel: "Lihat proyek",
    items: [
      {
        title: "Proxmox Reverse SSH Tunnel",
        description:
          "Menjangkau container dan VM Proxmox VE di belakang NAT lewat VPS publik memakai SSH reverse tunnel. Unit systemd menjaga tunnel tetap hidup dan menyambung ulang sendiri saat forward-nya gagal.",
        tags: ["Shell", "systemd", "SSH", "Networking"],
        year: "2026",
        href: "https://github.com/malasahjagotwin/proxmox-reverse-ssh",
      },
      {
        title: "Portofolio Dua Bahasa",
        description:
          "Situs ini. Next.js 16 App Router dengan Cache Components dan Partial Prefetching, dua kamus bertipe yang harus tetap sinkron, serta Tailwind CSS v4 dengan konfigurasi CSS-first.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        year: "2026",
        href: "https://github.com/malasahjagotwin/portfolio",
      },
    ],
  },
  contact: {
    title: "Mari bekerja sama",
    subtitle:
      "Punya proyek atau sekadar ingin menyapa? Kirim pesan dan saya akan segera membalasnya.",
    nameLabel: "Nama",
    namePlaceholder: "Nama kamu",
    emailLabel: "Email",
    emailPlaceholder: "kamu@example.com",
    messageLabel: "Pesan",
    messagePlaceholder: "Ceritakan tentang proyek kamu...",
    submit: "Kirim pesan",
    sending: "Mengirim...",
    success: "Terima kasih! Pesan kamu sudah terkirim.",
    error: "Terjadi kesalahan. Silakan coba lagi.",
    required: "Kolom ini wajib diisi.",
    invalidEmail: "Masukkan alamat email yang valid.",
    emailMe: "Atau email langsung ke",
  },
  error: {
    title: "Terjadi kesalahan",
    description:
      "Ada error tak terduga saat memuat halaman ini. Coba lagi, atau kembali ke beranda.",
    retry: "Coba lagi",
    back: "Kembali ke beranda",
  },
  footer: {
    rights: "Seluruh hak cipta dilindungi.",
    builtWith: "Dibangun dengan Next.js dan Tailwind CSS.",
  },
  notFound: {
    title: "Halaman tidak ditemukan",
    description: "Maaf, halaman yang kamu cari tidak ada.",
    back: "Kembali ke beranda",
  },
};

export default id;
