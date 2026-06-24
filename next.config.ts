import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/arshi-essentials";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isGithubPages
    ? { basePath: repoBase, assetPrefix: `${repoBase}/` }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? repoBase : "",
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
