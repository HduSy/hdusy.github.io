"use client";

// Renders the current year. Client component so the value is computed at
// runtime (not baked at build time); suppressHydrationWarning avoids a
// server/client mismatch warning around the year boundary.
export function Year() {
  return <time suppressHydrationWarning>{new Date().getFullYear()}</time>;
}
