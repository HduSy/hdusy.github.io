import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SketchStar } from "./sketch";

export function Writing() {
  return (
    <section id="writing" className="relative">
      <SketchStar className="pointer-events-none absolute right-6 top-16 h-6 w-6 text-accent/40 md:right-12" />
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
            Writing
          </h2>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            关于 AI 实践的笔记,写给自己,也写给同样在摸索的人。
          </p>
        </Reveal>

        <ul className="mt-12">
          {site.writings.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <li className="border-t border-line/50 first:border-t-0">
                <a
                  href={w.href}
                  className="group grid cursor-text grid-cols-[4rem_1fr] gap-4 py-6 transition-colors hover:bg-accent/5 md:grid-cols-[6rem_1fr_auto] md:gap-8 md:py-8"
                >
                  <span className="pt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {w.date}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-accent md:text-3xl">
                      {w.title}
                    </h3>
                    <p className="mt-2 max-w-[52ch] text-ink-soft">{w.excerpt}</p>
                  </div>
                  <div className="hidden flex-col items-end justify-between gap-4 md:flex">
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
                      {w.tag}
                    </span>
                    <ArrowUpRight
                      size={18}
                      weight="regular"
                      className="text-muted transition-colors group-hover:text-accent"
                    />
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
