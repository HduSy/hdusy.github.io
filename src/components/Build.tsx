import type { Build } from "@/lib/site";
import { site } from "@/lib/site";
import { Reveal } from "./reveal";
import { Corners, HeatmapBg, SectionLabel } from "./visual";
import {
  ArrowUpRight,
  Graph,
  MicrophoneStage,
  Globe,
  FileText,
} from "@phosphor-icons/react/dist/ssr";

// Declared outside render so we return elements, not component definitions.
function renderIcon(tag: Build["tag"]) {
  const common = {
    size: 18,
    weight: "regular" as const,
    className: "text-muted transition-colors group-hover:text-accent",
  };
  if (tag === "TOOL") return <Graph {...common} />;
  if (tag === "PAGE") return <Globe {...common} />;
  if (tag === "APP") return <MicrophoneStage {...common} />;
  if (tag === "SKILL") return <FileText {...common} />;
  return <ArrowUpRight {...common} />;
}

export function BuildSection() {
  const [feature, ...rest] = site.builds;

  return (
    <section id="build" className="relative">
      <div className="mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <SectionLabel index="02" tag="// PROJECTS" />
          <h2 className="mt-6 font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
            Build
          </h2>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            小型工具与开源项目,边做边记。
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Feature card */}
          <Reveal delay={0.05} className="md:col-span-3">
            <a
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[280px] flex-col justify-center overflow-hidden border border-line/60 p-6 md:p-10 transition-colors hover:border-accent"
            >
              <HeatmapBg />
              <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/80 to-paper/20" />
              <Corners />
              <div className="relative z-10">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
                  {feature.tag} · {feature.year}
                </span>
                <h3 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
                  {feature.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {feature.kind}
                </p>
                <p className="mt-4 text-ink-soft">{feature.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  View
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Small cards */}
          {rest.map((b, i) => (
            <Reveal key={b.name} delay={0.1 + i * 0.05}>
              <BuildCard build={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildCard({ build }: { build: Build }) {
  return (
    <a
      href={build.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full min-h-[180px] flex-col justify-start border border-line/60 bg-paper-2/30 p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-accent">
          {build.tag} · {build.year}
        </span>
        {renderIcon(build.tag)}
      </div>
      <div className="mt-4">
        <h3 className="font-serif text-2xl text-ink md:text-3xl">{build.name}</h3>
        <p className="mt-1 font-mono text-xs text-muted">{build.kind}</p>
        <p className="mt-3 text-sm text-ink-soft">{build.desc}</p>
      </div>
    </a>
  );
}
