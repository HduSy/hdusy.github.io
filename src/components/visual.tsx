import type { ReactNode } from "react";

/* Fixed paper-grain overlay. pointer-events-none, sits above content.
   Section 6.E: grain only on fixed, non-interactive pseudo-layers. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="grain-layer pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-screen"
    />
  );
}

/* Single crosshair framing mark. */
export function Crosshair({
  variant = "line",
  className = "",
}: {
  variant?: "line" | "accent";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`crosshair ${variant === "accent" ? "crosshair--accent" : ""} ${className}`}
    />
  );
}

/* Four L-corner brackets wrapping a figure. */
export function Corners() {
  return (
    <>
      <span className="corner corner--tl" aria-hidden />
      <span className="corner corner--tr" aria-hidden />
      <span className="corner corner--bl" aria-hidden />
      <span className="corner corner--br" aria-hidden />
    </>
  );
}

/* Scattered plus mark at an arbitrary position. */
export function Plus({
  top,
  left,
  children = "+",
}: {
  top: string;
  left: string;
  children?: ReactNode;
}) {
  return (
    <span className="plus-mark" style={{ top, left }} aria-hidden>
      {children}
    </span>
  );
}

/* Mono spec line, used inside blueprint annotations. */
export function Spec({
  k,
  v,
}: {
  k: string;
  v: string;
}) {
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
      <span className="text-ink-soft">{k}</span>
      <span className="mx-2 text-line">:</span>
      <span>{v}</span>
    </p>
  );
}

/* GitHub-contribution-style heatmap, used as the Tokenscope feature-card
   background (tokenscope itself surfaces a token-usage heatmap, so the card
   echoes its own product). Filled with the site accent. A seeded RNG
   (mulberry32) builds the
   intensity grid + each cell's twinkle rhythm once at module load →
   deterministic, so server render and client hydration paint the identical
   pattern (Math.random would mismatch). One SVG covers the card via
   preserveAspectRatio="slice"; the card's paper→transparent gradient overlay
   fades it out where the title sits. Each rect twinkles (ts-twinkle) with a
   per-cell delay/duration so the cells drift in and out of sync like stars. */
const HM_COLS = 52;
const HM_ROWS = 12;
const HM_CELL = 22;
const HM_PITCH = 26; // cell + 4px gap
const HM_OPACITY = [0, 0.1, 0.22, 0.38, 0.58];
const HM_WEIGHTS = [0.4, 0.22, 0.16, 0.12, 0.1]; // sparse → reads as a heatmap

type HmCell = { lv: number; delay: number; dur: number };

function hmCells(): HmCell[] {
  let s = 0x2a7c4d11; // fixed seed → deterministic (SSR == hydration)
  const rnd = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out: HmCell[] = [];
  for (let i = 0; i < HM_COLS * HM_ROWS; i++) {
    const r = rnd();
    let acc = 0;
    let lv = HM_WEIGHTS.length - 1;
    for (let j = 0; j < HM_WEIGHTS.length; j++) {
      acc += HM_WEIGHTS[j];
      if (r < acc) { lv = j; break; }
    }
    // per-cell twinkle rhythm — staggered so cells drift in and out of sync
    // (a starfield), not a synchronized pulse.
    out.push({ lv, delay: rnd() * 6, dur: 3 + rnd() * 4 });
  }
  return out;
}

const HM_CELLS = hmCells();

export function HeatmapBg({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full translate-x-[3px] translate-y-[4px] ${className}`}
      viewBox={`0 0 ${HM_COLS * HM_PITCH} ${HM_ROWS * HM_PITCH}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ fill: "var(--accent)" }}
    >
      {HM_CELLS.map((c, i) => {
        if (c.lv === 0) return null;
        const x = (i % HM_COLS) * HM_PITCH;
        const y = Math.floor(i / HM_COLS) * HM_PITCH;
        return (
          <rect
            key={i}
            className="ts-twinkle"
            x={x}
            y={y}
            width={HM_CELL}
            height={HM_CELL}
            rx={3}
            fillOpacity={HM_OPACITY[c.lv]}
            style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
          />
        );
      })}
    </svg>
  );
}
