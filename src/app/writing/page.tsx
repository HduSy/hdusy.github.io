import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/reveal";
import { WritingList } from "@/components/WritingList";

// Static export (GitHub Pages) — prerender /writing/ at build time.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Writing - Fei Liu",
  description: "Fei Liu 关于 AI 实践的笔记合集。",
  alternates: { canonical: "/writing/" },
  openGraph: {
    title: "Writing - Fei Liu",
    description: "Fei Liu 关于 AI 实践的笔记合集。",
    url: "/writing/",
    type: "website",
  },
};

export default function WritingIndexPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <section className="mx-auto max-w-[1280px] px-6 py-16 md:px-10 md:py-24">
          <Reveal>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-ink md:text-6xl">
              Writing
            </h1>
            <p className="mt-4 max-w-[42ch] text-ink-soft">
              关于 AI 实践的笔记,写给自己,也写给同样在摸索的人。
            </p>
          </Reveal>

          <WritingList items={site.writings} />
        </section>
      </main>
      <Footer />
    </>
  );
}
