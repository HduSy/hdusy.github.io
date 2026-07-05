import { site } from "@/lib/site";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line/50">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg font-semibold text-ink">
            {site.wordmark}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
            {site.est}
          </span>
        </div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          © {year} {site.wordmark}. Built in public.
        </p>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted transition-colors hover:text-accent"
        >
          <GithubLogo size={18} weight="regular" />
        </a>
      </div>
    </footer>
  );
}
