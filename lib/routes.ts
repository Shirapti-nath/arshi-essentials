import { getBasePath } from "@/lib/assetPath";

/** Path for Next.js Link / router (basePath is added automatically by Next.js) */
export function appPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

/** Full path for <a href> and window.location (includes GitHub Pages base) */
export function href(path: string): string {
  const base = getBasePath();
  const normalized = appPath(path);
  if (!base) return normalized;
  if (normalized === "/") return `${base}/`;
  return `${base}${normalized}`;
}
