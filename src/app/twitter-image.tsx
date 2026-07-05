// Twitter card image — same as OG. Re-exported so a single source defines the
// visual; Next reads these exports as a normal ES module.
export { default, alt, size, contentType } from "./opengraph-image";
export const dynamic = "force-static";
