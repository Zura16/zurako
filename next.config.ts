import type { NextConfig } from "next";

// Static export for GitHub Pages. The site lives under /zurako there, so the
// deploy workflow sets NEXT_PUBLIC_BASE_PATH; local dev serves from the root.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
