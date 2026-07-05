import { ImageResponse } from "next/og";

// `output: "export"` requires metadata routes to opt into static rendering.
export const dynamic = "force-static";

// Static OG image, generated at build time (works with `output: "export"`).
// Next auto-emits the og:image / og:image:width / og:image:alt meta tags from
// this file, so they don't need to be set in metadata.openGraph. English-only
// copy: next/og's default font has no CJK glyphs, so Chinese would render as
// tofu boxes.
export const alt = "Fei Liu — AI builder & writer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#f4efe6",
          backgroundImage:
            "linear-gradient(to right, rgba(26,23,20,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,23,20,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "3px",
              backgroundColor: "#f0652e",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "8px",
              color: "#f0652e",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {"AI builder × build in public"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "104px",
            fontWeight: 700,
            color: "#1a1714",
            lineHeight: 1,
            letterSpacing: "-3px",
          }}
        >
          Fei Liu
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "38px",
            color: "#3a342d",
            marginTop: "18px",
          }}
        >
          {"AI builder & writer"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "44px",
            fontSize: "24px",
            color: "#7d756a",
          }}
        >
          {"Exploring AI's edges, shipping small things in public."}
        </div>
      </div>
    ),
    size
  );
}
