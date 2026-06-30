const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

function detectBasePath(): string {
  if (basePath) return basePath;
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    if (pathname.startsWith("/arshi-essentials")) return "/arshi-essentials";
  }
  return "";
}

/** Prefix local public-folder paths for GitHub Pages (e.g. /arshi-essentials/products/...) */
export function assetPath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const base = detectBasePath();
  return base ? `${base}${normalized}` : normalized;
}

export function getBasePath(): string {
  return detectBasePath();
}
