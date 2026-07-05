"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

const links = [
  { label: "ABOUT", href: "/#about" },
  { label: "BUILD", href: "/#build" },
  { label: "WRITING", href: "/#writing" },
  { label: "CONTACT", href: "/#contact" },
];

export function Nav() {
  const { scrollY } = useScroll();
  // Scrim fades in over the first 120px of scroll: transparent at the very
  // top, settles into paper + blur + hairline once the user scrolls.
  const scrimOpacity = useTransform(scrollY, [0, 120], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px]">
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-line/40 bg-paper/70 backdrop-blur-[3px]"
        style={{ opacity: scrimOpacity }}
      />
      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-center justify-between px-6 md:px-10">
        <a
          href="/#hero"
          className="inline-flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-ink"
        >
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/logos/fei-liu-mark-frame-dark.svg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/fei-liu-mark-frame.svg" alt="" className="h-6 w-6" />
          </picture>
          {site.wordmark}
        </a>
        <nav className="flex items-center gap-5 md:gap-7">
          <div className="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft sm:flex md:gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-soft transition-colors hover:text-accent"
          >
            <GithubLogo size={18} weight="regular" />
          </a>
        </nav>
      </div>
    </header>
  );
}
