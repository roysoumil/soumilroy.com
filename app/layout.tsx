import type { Metadata, Viewport } from "next";
import { Spline_Sans, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";

// One family in two cuts. Spline Sans Mono sets the headlines and every
// technical detail (dates, tags, layer labels, the email address), so the
// page reads like typed notes clipped to a pad; Spline Sans carries the body
// copy. Neither is the house sans most engineer portfolios ship with.
const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  display: "swap",
});

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://soumilroy.com";

const siteTitle = "Soumil Roy — Software Engineer";
const siteDescription =
  "Software engineer building across the whole stack, from the interface to the platform under it. Full stack, infrastructure and AI. Open to freelance and consulting.";

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
  colorScheme: "light",
  themeColor: "#f5f6f3",
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
        className={`${splineMono.variable} ${splineSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
