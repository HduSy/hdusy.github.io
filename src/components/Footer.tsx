import { site } from "@/lib/site";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-[1280px] items-center justify-center px-6 py-10 md:px-10">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          © <Year /> {site.wordmark}. Built in public.
        </p>
      </div>
    </footer>
  );
}
