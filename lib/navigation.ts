import { href } from "@/lib/routes";

/** Homepage section link, e.g. #collections → /#collections or /arshi-essentials/#collections */
export function sectionHref(hash: string): string {
  const fragment = hash.startsWith("#") ? hash : `#${hash}`;
  return href(`/${fragment}`);
}

export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}
