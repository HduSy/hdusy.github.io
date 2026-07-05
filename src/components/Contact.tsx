import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import {
  ArrowUpRight,
  GithubLogo,
  EnvelopeSimple,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <h2
            className="font-serif italic tracking-tight text-ink"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.1 }}
          >
            <span className="pb-2">Let&apos;s make something small.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">
            小事持续,自有回响。写信给我,聊一个想法或一次合作。
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 font-serif text-2xl text-ink transition-colors hover:text-accent md:text-3xl"
          >
            {site.email}
            <ArrowUpRight
              size={22}
              weight="regular"
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <GithubLogo size={16} /> GitHub
            </a>
            <a
              href={site.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <XLogo size={16} /> Twitter
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <EnvelopeSimple size={16} /> Email
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
