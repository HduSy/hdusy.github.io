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

/* motion.dev-style section eyebrow: a mono index, a hairline rule that
   stretches across the column, and a short descriptor on the right. Sits
   above a section's display heading — a structural line that numbers the
   page (00 hero → 01 about → 02 build → 03 writing → 04 contact). */
export function SectionLabel({ index, tag }: { index: string; tag: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="text-accent">{index}</span>
      <span aria-hidden className="h-px flex-1 bg-line" />
      <span className="hidden whitespace-nowrap sm:inline">{tag}</span>
    </div>
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

/* Seeded RNG (mulberry32) + string hash, shared by any generated graphic so
   server render and client hydration paint the identical pattern. HeatmapBg
   and Barcode both derive their output purely from a fixed seed / the hashed
   value — never Math.random, which would mismatch on hydration. */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// FNV-1a: fold any string into a uint32 seed (used by Barcode).
function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
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
  const rnd = mulberry32(0x2a7c4d11); // fixed seed → deterministic (SSR == hydration)
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

/* Deterministic barcode strip. Bars are generated by hashing `value` → seed →
   mulberry32 (the same technique as HeatmapBg), so server render and client
   hydration paint identical bars. `value` is always real data (email /
   wordmark / build name) — the strip encodes something, it is not decoration.
   Stretches to its container; set size + color via className. */
const BC_BARS = 40;
const BC_WIDTHS = [1, 1, 1, 2, 1, 3, 1, 2, 4]; // thin-dominant → reads as EAN/Code39
const BC_GAP = 1;
const BC_HEIGHT = 32;

export function Barcode({
  value,
  className = "",
  caption = false,
}: {
  value: string;
  className?: string;
  caption?: boolean;
}) {
  const rnd = mulberry32(hashStr(value));
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < BC_BARS; i++) {
    const w = BC_WIDTHS[Math.floor(rnd() * BC_WIDTHS.length)];
    bars.push({ x, w });
    x += w + BC_GAP;
  }
  return (
    <span className={`inline-flex flex-col gap-1 ${className}`}>
      <svg
        aria-hidden
        viewBox={`0 0 ${x} ${BC_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-8 w-full"
      >
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={0} width={b.w} height={BC_HEIGHT} fill="currentColor" />
        ))}
      </svg>
      {caption ? (
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
          {value}
        </span>
      ) : null}
    </span>
  );
}

/* Counter-rotating dashed rings around the Blueprint portrait — short
   segments travelling along the two guide circles, one clockwise, one
   counter-clockwise (durations differ so they drift in and out of sync).
   Sized to the outer ring (w-[78%]); circles sit on the inner (r37) and
   outer (r50) guide radii. Pure CSS rotation — no JS, SSR-safe. Paused for
   reduced-motion by the global * animation override. */
export function OrbitRings({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={`overflow-visible ${className}`} fill="none">
      <circle
        className="orbit-cw"
        cx="50"
        cy="50"
        r="37"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="85 147.48"
        strokeLinecap="round"
      />
      <circle
        className="orbit-ccw"
        cx="50"
        cy="50"
        r="50"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="85 229.16"
        strokeLinecap="round"
      />
    </svg>
  );
}
