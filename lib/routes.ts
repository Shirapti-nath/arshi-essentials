import { getBasePath } from "@/lib/assetPath";

/** Internal app route with GitHub Pages / custom domain base path */
export function href(path: string): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
