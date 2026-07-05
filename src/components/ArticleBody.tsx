import type { ArticleBlock } from "@/lib/articles";

// Renders article blocks in the site's editorial style: Smiley Sans serif
// body, mono code, accent-edged blockquote. Server component, no motion.
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="font-serif text-lg leading-relaxed text-ink-soft">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="pt-8 font-serif text-2xl text-ink md:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="pt-6 font-serif text-xl text-ink">{block.text}</h3>
      );
    case "code":
      return (
        <pre className="overflow-x-auto border border-line/60 bg-paper-2/60 p-4 font-mono text-[13px] leading-relaxed text-ink">
          <code>{block.code}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-accent py-1 pl-5 font-serif text-xl italic leading-relaxed text-ink-soft">
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((it, i) => (
            <li
              key={i}
              className="flex gap-3 font-serif text-lg leading-relaxed text-ink-soft"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {it}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}
