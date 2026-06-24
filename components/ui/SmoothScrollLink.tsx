"use client";

import { cn } from "@/lib/utils";
import { scrollToSection, getSectionIdFromHash } from "@/lib/scroll";

type SmoothScrollLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function SmoothScrollLink({
  href,
  children,
  className,
  onClick,
}: SmoothScrollLinkProps) {
  const isHash = href.startsWith("#");

  if (!isHash) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.();

    const sectionId = getSectionIdFromHash(href);
    if (sectionId) {
      scrollToSection(sectionId);
      window.history.pushState(null, "", href);
    }
  };

  return (
    <a href={href} className={cn(className)} onClick={handleClick}>
      {children}
    </a>
  );
}
