"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { scrollToSection, getSectionIdFromHash } from "@/lib/scroll";
import { isHomePath, sectionHref } from "@/lib/navigation";
import { href } from "@/lib/routes";

type SmoothScrollLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SmoothScrollLink({
  href: linkHref,
  children,
  className,
  onClick,
}: SmoothScrollLinkProps) {
  const pathname = usePathname();
  const isHash = linkHref.startsWith("#");
  const destination = isHash ? sectionHref(linkHref) : href(linkHref);

  if (!isHash) {
    return (
      <a href={destination} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();

    const sectionId = getSectionIdFromHash(linkHref);
    if (!sectionId) return;

    if (isHomePath(pathname)) {
      scrollToSection(sectionId);
      window.history.pushState(null, "", linkHref);
      return;
    }

    window.location.assign(destination);
    return;
  };

  return (
    <a href={destination} className={cn(className)} onClick={handleClick}>
      {children}
    </a>
  );
}
