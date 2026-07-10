import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import { Grain } from "@/components/visual";
import "./globals.css";

// Smiley Sans (得意黑) self-hosted. Variable font, single woff2.
// preload disabled: CJK glyph set is large, preload would hurt LCP.
// font-display swap shows fallback then swaps in.
const smiley = localFont({
  src: "./fonts/SmileySans-Oblique.woff2",
  variable: "--font-smiley",
  display: "swap",
  preload: false,
});

// Production origin (GitHub Pages, HduSy.github.io root). metadataBase resolves
// every relative URL in metadata (canonical, og:url, og:image) against this.
// Swap for a custom domain if one is configured.
const SITE_URL = "https://hdsy.github.io";

const DESC =
  "Fei Liu's personal blueprint — AI builder & writer. Tracking AI trends and shipping small applications in public.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Fei Liu - AI builder & writer",
  description: DESC,
  alternates: { canonical: "/" },
  verification: {
    google: "_4emdtqWM--l_PWO3d_LgwerZ5Od2pFQQ4szpuvziDo",
    other: { "msvalidate.01": "AB6E5DE3821D6902F37F222AEDC91131" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Fei Liu",
    title: "Fei Liu - AI builder & writer",
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "Fei Liu - AI builder & writer",
    description: DESC,
  },
  icons: {
    icon: [
      { url: "/logos/fei-liu-mark-frame.svg", media: "(prefers-color-scheme: light)" },
      { url: "/logos/fei-liu-mark-frame-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#14110d" },
  ],
};

// Person structured data — ties the name, role, and profiles (sameAs) together
// for entity recognition in name searches. SSR'd verbatim into the HTML (not
// client-injected), so it's visible to crawlers without JS execution.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fei Liu",
  jobTitle: "AI builder & writer",
  url: SITE_URL,
  email: `mailto:${site.email}`,
  sameAs: [site.github, site.twitter],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${smiley.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Duotone SVG filter: grayscale mapped to ink + orange.
            Referenced by .duotone images across the site. */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <filter id="duotone" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"
              />
              <feComponentTransfer colorInterpolationFilters="sRGB">
                <feFuncR type="table" tableValues="0.102 0.941" />
                <feFuncG type="table" tableValues="0.090 0.396" />
                <feFuncB type="table" tableValues="0.078 0.180" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
        {children}
        <Grain />
      </body>
    </html>
  );
}
