const HEADER_OFFSET = 80;

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return;

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({ top: Math.max(0, top), behavior });
}

export function getSectionIdFromHash(hash: string): string | null {
  if (!hash || hash === "#") return null;
  return hash.replace("#", "");
}
