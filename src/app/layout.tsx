import type { Metadata } from "next";
import localFont from "next/font/local";
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

export const metadata: Metadata = {
  title: "Fei Liu - AI builder & writer",
  description:
    "Fei Liu's personal blueprint. Exploring AI edges, shipping small things in public.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${smiley.variable} antialiased`}>
      <body>
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
      </body>
    </html>
  );
}
