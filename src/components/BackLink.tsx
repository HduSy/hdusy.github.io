"use client";

import type { MouseEvent, ReactNode } from "react";

/* "Back" link for the article detail page. When the reader arrived from
   elsewhere on this site (the home Writing section or the /writing/ archive),
   a click steps one entry back in history — landing on whichever page sent
   them here. If there's no in-site referrer (direct or external entry), it
   falls back to `href` (the archive). Progressive enhancement: the anchor's
   href is the no-JS target, and a same-origin click is intercepted to use
   history.back(). */
export function BackLink({
  href = "/writing/",
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    let sameOrigin = false;
    try {
      const ref = document.referrer;
      sameOrigin = !!ref && new URL(ref).origin === location.origin;
    } catch {
      sameOrigin = false;
    }
    if (sameOrigin && window.history.length > 1) {
      e.preventDefault();
      window.history.back();
    }
    // otherwise: let the anchor navigate to `href`
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
