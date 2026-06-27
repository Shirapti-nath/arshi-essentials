import type { NextConfig } from "next";

/** GitHub Pages project site — base path only when NEXT_PUBLIC_BASE_PATH is set (production build) */
const repoBase = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
const useCustomDomain = process.env.CUSTOM_DOMAIN === "true";
const needsBasePath = Boolean(repoBase) && !useCustomDomain;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(needsBasePath
    ? { basePath: repoBase, assetPrefix: `${repoBase}/` }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: needsBasePath ? repoBase : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
