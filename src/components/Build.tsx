import type { Build } from "@/lib/site";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Corners } from "./visual";
import { Squiggle, SketchStar } from "./sketch";
import {
  ArrowUpRight,
  Graph,
  MicrophoneStage,
} from "@phosphor-icons/react/dist/ssr";

// Declared outside render so we return elements, not component definitions.
function renderIcon(tag: Build["tag"]) {
  const common = {
    size: 18,
    weight: "regular" as const,
    className: "text-muted transition-colors group-hover:text-accent",
  };
  if (tag === "TOOL") return <Graph {...common} />;
  if (tag === "APP") return <MicrophoneStage {...common} />;
  return <ArrowUpRight {...common} />;
}

export function BuildSection() {
  const [inkwell, atlas, whisper] = site.builds;

  return (
    <section id="build" className="relative border-t border-line/50">
      <SketchStar className="pointer-events-none absolute left-6 top-16 h-5 w-5 text-accent/40 md:left-12" />
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
            Build
          </h2>
          <Squiggle className="mt-2 h-2 w-24 text-accent" strokeWidth={2.5} />
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            小型工具与开源项目,边做边记。
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Big feature card */}
          <Reveal delay={0.05} className="md:col-start-2 md:row-span-2">
            <a
              href={inkwell.href}
              className="group relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden border border-line/60 p-6 md:p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/inkwell-editor/900/1200"
                alt=""
                className="duotone absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/75 to-paper/10" />
              <Corners />
              <div className="relative z-10">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                  {inkwell.tag} · {inkwell.year}
                </span>
                <h3 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                  {inkwell.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {inkwell.kind}
                </p>
                <p className="mt-4 max-w-[34ch] text-ink-soft">{inkwell.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  View
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Small cards */}
          <Reveal delay={0.1}>
            <BuildCard build={atlas} />
          </Reveal>
          <Reveal delay={0.15}>
            <BuildCard build={whisper} accent />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BuildCard({
  build,
  accent = false,
}: {
  build: Build;
  accent?: boolean;
}) {
  return (
    <a
      href={build.href}
      className={`group relative flex h-full min-h-[180px] flex-col justify-between border p-6 transition-colors hover:border-accent ${
        accent
          ? "border-accent/30 bg-accent/[0.05]"
          : "border-line/60 bg-paper-2/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
          {build.tag}
        </span>
        {renderIcon(build.tag)}
      </div>
      <div>
        <h3 className="font-serif text-3xl text-ink">{build.name}</h3>
        <p className="mt-1 font-mono text-xs text-muted">
          {build.kind} · {build.year}
        </p>
        <p className="mt-3 text-sm text-ink-soft">{build.desc}</p>
      </div>
    </a>
  );
}
