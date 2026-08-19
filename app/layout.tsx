import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

// Headings only. Body and UI text run on the platform UI font (see
// globals.css) so the page carries one voice of its own rather than
// the house sans every other engineer portfolio ships with.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://soumilroy.com";

const siteTitle = "Soumil Roy — Software Engineer";
const siteDescription =
  "Software engineer building end-to-end — from the interface down to the infrastructure. Currently at empowerreg.ai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Soumil Roy",
  },
  description: siteDescription,
  authors: [{ name: "Soumil Roy", url: siteUrl }],
  creator: "Soumil Roy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Soumil Roy",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soumil Roy",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description: siteDescription,
  image: `${siteUrl}/opengraph-image`,
  sameAs: [
    "https://www.linkedin.com/in/soumilroy/",
    "https://github.com/roysoumil",
  ],
  knowsAbout: [
    "Backend Infrastructure",
    "Distributed Systems",
    "Full Stack Development",
    "Azure",
    "Go",
    "Next.js",
    "PostgreSQL",
    "Python",
    "React",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${plexMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Runs before the body paints, so a stored choice never flashes the
            other theme. Falls through to the CSS media query when unset. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);var c=t==='dark'?'#0a0a0b':'#fafafa';document.querySelectorAll('meta[name=theme-color]').forEach(function(m){m.setAttribute('content',c)})}catch(e){}",
          }}
        />
        <ThemeToggle />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
