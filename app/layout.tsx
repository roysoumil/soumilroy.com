import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soumil Roy",
  url: siteUrl,
  jobTitle: "Software Engineer",
  description: siteDescription,
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
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
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
