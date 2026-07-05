/* Hand-drawn sketch primitives. SVG paths with slight wobble to read as
   marker-on-paper, not geometric. All use currentColor so they pick up
   text-* utilities (e.g. text-accent). Declared at module scope. */

type SketchProps = {
  className?: string;
  strokeWidth?: number;
};

/* Wavy underline. Stretches to container width (preserveAspectRatio none). */
export function Squiggle({ className = "", strokeWidth = 2 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
      fill="none"
    >
      <path
        d="M2 6 Q 14 1, 28 6 T 56 6 T 84 6 T 112 6 T 140 6 T 168 6 T 198 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Hand-drawn arrow with a slightly curved shaft, for annotation leaders. */
export function SketchArrow({ className = "", strokeWidth = 2 }: SketchProps) {
  return (
    <svg viewBox="0 0 80 50" className={className} aria-hidden fill="none">
      <path
        d="M6 42 Q 28 6, 62 26"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M52 16 L 62 26 L 50 31"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Six-line asterisk / sparkle mark, for scattered blueprint jots. */
export function SketchStar({ className = "", strokeWidth = 1.8 }: SketchProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none">
      <path
        d="M20 4 L 20 36 M5 12 L 35 28 M5 28 L 35 12 M9 8 Q 20 20, 31 32 M9 32 Q 20 20, 31 8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Wobbly circle highlight, for circling a word or framing a small figure. */
export function SketchCircle({ className = "", strokeWidth = 2.2 }: SketchProps) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden fill="none">
      <path
        d="M 60 8 C 30 8, 12 22, 14 42 C 16 64, 40 74, 62 72 C 88 70, 108 56, 106 34 C 104 16, 80 6, 58 10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Hand-drawn bracket pair, for section markers. */
export function SketchBrackets({ className = "", strokeWidth = 2 }: SketchProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none">
      <path
        d="M14 4 Q 6 4, 6 14 L 6 26 Q 6 36, 14 36"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M26 4 Q 34 4, 34 14 L 34 26 Q 34 36, 26 36"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
