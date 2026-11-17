import type { Dictionary } from "../dictionaries";

const id: Dictionary = {
  meta: {
    title: "Nama Kamu — Full-Stack Developer",
    description:
      "Portofolio Nama Kamu, seorang full-stack developer yang membangun produk web cepat, aksesibel, dan skalabel dengan React, Next.js, dan TypeScript.",
    keywords: [
      "full-stack developer",
      "web developer",
      "React",
      "Next.js",
      "TypeScript",
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
  hero: {
    availability: "Terbuka untuk proyek baru",
    greeting: "Hai, saya",
    name: "Nama Kamu",
    role: "Full-Stack Developer",
    tagline:
      "Saya merancang dan membangun produk web yang cepat, aksesibel, dan skalabel — dari antarmuka yang rapi sampai API di baliknya.",
    ctaProjects: "Lihat proyek",
    ctaContact: "Hubungi saya",
  },
  about: {
    title: "Tentang saya",
    subtitle: "Perkenalan singkat",
    paragraphs: [
      "Saya full-stack developer yang fokus membangun produk yang terasa mudah digunakan. Saya peduli pada arsitektur yang bersih, performa, dan detail kecil yang membuat sebuah antarmuka menyenangkan.",
      "Selama beberapa tahun ini saya mengerjakan aplikasi web di bidang fintech, SaaS, dan e-commerce — selalu dekat dengan pengalaman pengguna sekaligus rekayasa di belakangnya.",
    ],
    skillsTitle: "Teknologi yang saya pakai",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS",
      "GraphQL",
    ],
    stats: [
      { value: "5+", label: "Tahun pengalaman" },
      { value: "40+", label: "Proyek diselesaikan" },
      { value: "20+", label: "Klien puas" },
    ],
  },
  projects: {
    title: "Proyek pilihan",
    subtitle: "Beberapa hal yang baru saya bangun",
    viewLabel: "Lihat proyek",
    items: [
      {
        title: "Dashboard Analitik",
        description:
          "Platform analitik real-time dengan grafik kustom, akses berbasis peran, dan performa query di bawah satu detik.",
        tags: ["Next.js", "TypeScript", "PostgreSQL"],
        href: "https://example.com",
        year: "2025",
      },
      {
        title: "Toko Online",
        description:
          "Storefront commerce headless dengan pencarian super cepat, keranjang optimistis, dan alur checkout bertipe penuh.",
        tags: ["React", "Node.js", "Stripe"],
        href: "https://example.com",
        year: "2024",
      },
      {
        title: "Design System",
        description:
          "Pustaka komponen aksesibel dengan theming, dokumentasi, dan pengujian regresi visual otomatis.",
        tags: ["React", "Tailwind CSS", "Storybook"],
        href: "https://example.com",
        year: "2024",
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
