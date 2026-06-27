import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const useCustomDomain = process.env.CUSTOM_DOMAIN === "true";
const repoBase = "/arshi-essentials";
const needsBasePath = isGithubPages && !useCustomDomain;

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
