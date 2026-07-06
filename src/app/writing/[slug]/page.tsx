import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/reveal";
import { ArticleBody } from "@/components/ArticleBody";
import { BackLink } from "@/components/BackLink";
import { articles, getArticle } from "@/lib/articles";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-static";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/writing/${article.slug}/` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/writing/${article.slug}/`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.datePublished,
            author: {
              "@type": "Person",
              name: "Fei Liu",
              url: "https://hdsy.github.io",
            },
            image: `https://picsum.photos/seed/${article.heroSeed}/1600/800`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://hdsy.github.io/writing/${article.slug}/`,
            },
          }),
        }}
      />
      <Nav />
      <main className="pt-24">
        <article className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <Reveal>
            <BackLink className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent">
              <ArrowLeft size={14} weight="bold" /> Writing
            </BackLink>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <a href="/#about" className="text-ink transition-colors hover:text-accent">Fei Liu</a>
              <span className="text-accent">{article.tag}</span>
              <span>{article.date}</span>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">
              {article.excerpt}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${article.heroSeed}/1600/800`}
              alt=""
              className="mt-10 aspect-[2/1] w-full border border-line/60 object-cover"
            />
          </Reveal>
          <div className="mt-12">
            <ArticleBody blocks={article.blocks} />
          </div>
          <Reveal>
            <div className="mt-16 border-t border-line/60 pt-8">
              <BackLink className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-accent">
                <ArrowLeft size={14} weight="bold" /> Back to writing
              </BackLink>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
