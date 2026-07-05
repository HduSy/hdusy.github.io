import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (HduSy.github.io root).
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
