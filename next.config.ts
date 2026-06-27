import type { NextConfig } from "next";

/** GitHub Pages project site — always served under /arshi-essentials */
const repoBase = "/arshi-essentials";
const useCustomDomain = process.env.CUSTOM_DOMAIN === "true";
const needsBasePath = !useCustomDomain;

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
