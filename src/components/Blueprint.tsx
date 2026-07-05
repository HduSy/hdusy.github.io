import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Corners, Plus, Spec } from "./visual";
import { Squiggle, SketchArrow, SketchStar } from "./sketch";

export function Blueprint() {
  return (
    <section id="about" className="relative border-t border-line/50">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
            About
          </h2>
          <Squiggle className="mt-2 h-2 w-24 text-accent" strokeWidth={2.5} />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: bio */}
          <div className="md:col-span-5">
            <Reveal delay={0.05}>
              <div className="space-y-4 font-serif text-lg leading-relaxed text-ink-soft md:text-xl">
                {site.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {site.est}
              </p>
            </Reveal>
          </div>

          {/* Right: blueprint archive figure */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <figure className="relative min-h-[440px] border border-line/60 bg-paper-2/40 p-6 md:p-10">
                <Corners />
                <Plus top="16%" left="20%" />
                <Plus top="70%" left="28%" />
                <Plus top="28%" left="70%" />
                <Plus top="66%" left="76%" />

                {/* concentric ring */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/50"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line/30"
                />

                {/* portrait */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://picsum.photos/seed/feiliu-blueprint/480/480"
                  alt="Fei Liu 档案照"
                  className="duotone relative z-10 mx-auto aspect-square w-[46%] rounded-full object-cover"
                />
                <SketchArrow className="pointer-events-none absolute left-[12%] top-[44%] h-12 w-20 text-accent/70" />
                <SketchStar className="pointer-events-none absolute right-[10%] top-[16%] h-5 w-5 text-accent/60" />
                <SketchStar className="pointer-events-none absolute left-[8%] bottom-[26%] h-4 w-4 text-line" />

                {/* top-left identity */}
                <div className="absolute left-6 top-6 md:left-10 md:top-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                    AI MEDIA / BUILDER
                  </p>
                  <span className="mt-2 block h-px w-10 bg-line" />
                </div>

                {/* bottom-left spec sheet */}
                <div className="absolute bottom-6 left-6 space-y-1 md:bottom-10 md:left-10">
                  <Spec k="FOCUS" v="CONTENT & AI" />
                  <Spec k="TOPIC" v="AI EDGES & BIZ" />
                  <Spec k="FORMAT" v="ARTICLE / VIDEO" />
                  <Spec k="VALUE" v="LONG-TERM" />
                </div>

                {/* bottom-right id + coord */}
                <div className="absolute bottom-6 right-6 space-y-1 text-right md:bottom-10 md:right-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                    ID // FEI LIU
                  </p>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                    {site.coord}
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
