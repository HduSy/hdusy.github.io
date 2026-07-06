import { Fragment } from "react";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Barcode, SectionLabel } from "./visual";
import { HeroCarousel } from "./HeroCarousel";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/* Render one slogan line, wrapping every occurrence of the highlight token
   in the accent color. Used to emphasize the wordmark 飞流 inside the poem. */
function SloganLine({ line, highlight }: { line: string; highlight?: string }) {
  if (!highlight || !line.includes(highlight)) return <>{line}</>;
  const parts = line.split(highlight);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-accent">{highlight}</span>}
        </Fragment>
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-16"
    >
      <div className="mx-auto mb-10 w-full max-w-[1280px] px-6 md:mb-12 md:px-10">
        <Reveal>
          <SectionLabel index="00" tag="// INTRO" />
        </Reveal>
      </div>
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        {/* Left: wordmark + slogan + CTA */}
        <div className="md:col-span-7">
          <Reveal>
            <h1
              className="font-serif font-semibold leading-[0.85] tracking-tight text-ink"
              style={{ fontSize: "clamp(3.5rem, 15vw, 9rem)" }}
            >
              {site.wordmark}
              <span className="sr-only">{" — AI builder & writer"}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[20ch] whitespace-pre-line font-serif text-2xl leading-snug text-ink-soft md:text-3xl">
              {site.sloganLines.map((line, i) => (
                <Fragment key={i}>
                  <SloganLine line={line} highlight={site.sloganHighlight} />
                  {i < site.sloganLines.length - 1 ? "\n" : null}
                </Fragment>
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#writing"
                className="group inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
              >
                WRITING
                <ArrowRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-ink/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                CONTACT
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: vertical image carousel */}
        <div className="md:col-span-5">
          <Reveal delay={0.12}>
            <HeroCarousel slides={site.heroGallery} />
          </Reveal>
        </div>
      </div>
      {/* Technical-document edge: full-width barcode encoding the contact email. */}
      <Barcode
        value={site.email}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-line/60"
      />
    </section>
  );
}
