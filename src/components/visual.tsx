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
