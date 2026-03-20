import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const siteUrl = "https://soumilroy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Soumil Roy | Distributed Systems & Full-Stack Engineer",
    template: "%s | Soumil Roy",
  },
  description:
    "Soumil Roy is a software engineer specializing in distributed architectures and full-lifecycle development. Leading infrastructure at empowerreg.ai. Expertise in Azure, Docker, Python, React, TypeScript, and Go.",
  keywords: [
    "Soumil Roy",
    "software engineer",
    "distributed systems",
    "full-stack developer",
    "infrastructure",
    "empowerreg.ai",
    "Azure",
    "Docker",
    "Python",
    "React",
    "TypeScript",
    "Go",
  ],
  authors: [{ name: "Soumil Roy", url: siteUrl }],
  creator: "Soumil Roy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Soumil Roy",
    title: "Soumil Roy | Distributed Systems & Full-Stack Engineer",
    description:
      "Software engineer specializing in distributed architectures and full-lifecycle development. Leading infrastructure at empowerreg.ai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soumil Roy | Distributed Systems & Full-Stack Engineer",
    description:
      "Software engineer specializing in distributed architectures and full-lifecycle development.",
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
  description:
    "Software engineer specializing in distributed architectures and full-lifecycle development. Leading infrastructure initiatives at empowerreg.ai. Expertise in Azure, Docker, Python, React, TypeScript, and Go.",
  sameAs: [
    "https://www.linkedin.com/in/soumilroy/",
    "https://www.instagram.com/soumilroy/",
  ],
  knowsAbout: [
    "Distributed Systems",
    "Infrastructure",
    "Azure",
    "Docker",
    "Python",
    "React",
    "TypeScript",
    "Go",
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
