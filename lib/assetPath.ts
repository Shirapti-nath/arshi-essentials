const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix local public-folder paths for GitHub Pages (e.g. /arshi-essentials/products/...) */
export function assetPath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalized}` : normalized;
}

export function getBasePath(): string {
  return basePath;
}
