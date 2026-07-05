import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fei Liu — AI builder & writer",
    short_name: "Fei Liu",
    description: "Fei Liu's personal blueprint — AI builder & writer.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe6",
    theme_color: "#f0652e",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
