import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Corners, Plus, Spec } from "./visual";
import { SketchArrow, SketchStar } from "./sketch";

export function Blueprint() {
  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: title + profile — bio (role leads in), interests */}
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
                About
              </h2>
            </Reveal>
            <Reveal delay={0.05} className="mt-12">
              <div className="space-y-4 font-serif text-base leading-relaxed text-ink-soft md:text-lg">
                {site.bio.map((p, i) => (
                  <p key={i}>
                    {i === 0 ? (
                      <>
                        <span className="font-medium text-ink">{site.role}</span>，{p}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                ))}
              </div>
              <p className="mt-6 font-serif text-base text-ink-soft md:text-lg">
                {site.interests.join(" · ")}
              </p>
            </Reveal>
          </div>

          {/* Right: blueprint archive figure */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <figure className="relative mx-auto w-full max-w-[420px] min-h-[420px] border border-line/60 bg-paper-2/40 p-6 md:min-h-[560px] md:max-w-none md:p-10">
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
                  src="/avatar.jpg"
                  alt="Fei Liu 档案照"
                  className="absolute left-1/2 top-1/2 z-10 aspect-square w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
                />
                <SketchArrow className="pointer-events-none absolute left-[12%] top-[44%] h-12 w-20 text-accent/70" />
                <SketchStar className="pointer-events-none absolute left-[8%] bottom-[26%] h-4 w-4 text-line" />

                {/* top-left identity */}
                <div className="absolute left-6 top-6 md:left-10 md:top-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                    AI EXPLORER / BUILDER
                  </p>
                  <span className="mt-2 block h-px w-10 bg-line" />
                </div>

                {/* top-right: experience timeline */}
                <div className="absolute right-6 top-6 text-right md:right-10 md:top-10">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                    EXPERIENCE
                  </p>
                  <span className="mt-2 block h-px w-10 bg-line ml-auto" />
                  <div className="mt-2 space-y-1">
                    {site.timeline.map((t) => (
                      <p key={t.period} className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
                        <span className="text-ink-soft">{t.period}</span> · {t.place}
                      </p>
                    ))}
                  </div>
                </div>

                {/* bottom-left spec sheet */}
                <div className="absolute bottom-6 left-6 space-y-1 md:bottom-10 md:left-10">
                  <Spec k="FOCUS" v="AI & OPEN-SOURCE & SEO" />
                  <Spec k="TOPIC" v="AI TREND & APPLICATION" />
                  <Spec k="FORMAT" v="CODE/ARTICLE" />
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
