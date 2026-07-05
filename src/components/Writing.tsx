import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { WritingList } from "./WritingList";
import { SketchStar } from "./sketch";
import { SectionLabel } from "./visual";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const PREVIEW_COUNT = 4;

export function Writing() {
  return (
    <section id="writing" className="relative">
      <SketchStar className="pointer-events-none absolute right-6 top-16 h-6 w-6 text-accent/40 md:right-12" />
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel index="03" tag="// NOTES" />
          <h2 className="mt-6 font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
            Writing
          </h2>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            关于 AI 实践的笔记,写给自己,也写给同样在摸索的人。
          </p>
        </Reveal>

        <WritingList items={site.writings.slice(0, PREVIEW_COUNT)} />

        {site.writings.length > PREVIEW_COUNT && (
          <Reveal>
            <a
              href="/writing/"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              All Writing
              <ArrowRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
