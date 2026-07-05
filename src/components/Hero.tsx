import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Crosshair } from "./visual";
import { Squiggle } from "./sketch";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        {/* Left: wordmark + kicker + slogan + CTA */}
        <div className="md:col-span-7">
          <Reveal>
            <h1
              className="font-serif font-semibold leading-[0.85] tracking-tight text-ink"
              style={{ fontSize: "clamp(3.5rem, 15vw, 9rem)" }}
            >
              {site.wordmark}
            </h1>
            <Squiggle className="mt-1 h-2 w-44 text-accent" strokeWidth={2.5} />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 font-serif text-sm tracking-[0.04em] text-accent">
              {site.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[20ch] font-serif text-2xl leading-snug text-ink-soft md:text-3xl">
              {site.sloganLines[0]}
              <br />
              {site.sloganLines[1]}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-4">
              <a
                href="#writing"
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-accent"
              >
                WRITING
                <ArrowRight size={14} weight="bold" />
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

        {/* Right: portrait with crosshair frame */}
        <div className="md:col-span-5">
          <Reveal delay={0.12}>
            <figure className="relative aspect-[4/5] w-full max-w-[420px] md:ml-auto">
              <Image
                src="https://picsum.photos/seed/feiliu-portrait/640/800"
                alt="Fei Liu 肖像"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover"
              />
              <Crosshair className="left-2 top-2" />
              <Crosshair className="right-2 top-2" />
              {/* bottom caption strip, functional - identifies the figure */}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-paper/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft backdrop-blur-[2px]">
                <span>FIG // FEI LIU</span>
                <span className="text-muted">PORTRAIT</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
