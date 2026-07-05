// Mock article data for the Writing detail pages. One fully-written article
// for now; the rest of the Writing list links stay as placeholders until each
// post is written. Content is Chinese to match the site's bio / writing copy.
// No em-dashes (site convention) - sentences use commas / colons / periods.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readingTime: string;
  heroSeed: string;
  datePublished: string; // ISO date for BlogPosting schema
  blocks: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "claude-code-agent",
    title: "Claude Code 实战:把脚本变成 agent",
    date: "2025.06",
    tag: "AGENT",
    excerpt: "从一段 50 行的脚本出发,一步步给它记忆、工具和回退路径。",
    readingTime: "8 分钟",
    heroSeed: "claude-code-agent",
    datePublished: "2025-06-15",
    blocks: [
      {
        type: "p",
        text: "写脚本的时候,我常遇到同一种尴尬:脚本跑得动,但只要需求稍微变一下,就得重写。于是我开始琢磨,能不能把一段死脚本,改成一个能自己判断、自己纠错的 agent。这篇文章记录的是我用 Claude Code 把一个 50 行脚本逐步改造成 agent 的过程,不是教程,是复盘。",
      },
      { type: "h2", text: "起点:一段会跑的脚本" },
      {
        type: "p",
        text: "最初的需求很简单:读取一个目录里的 markdown 文件,统计每个文件用了多少 token,然后排个序输出。脚本写起来很快,大概 50 行,跑一次几秒钟。",
      },
      {
        type: "code",
        lang: "ts",
        code: `import { readdir, readFile } from "node:fs/promises";

async function countTokens(dir) {
  const files = await readdir(dir);
  const counts = await Promise.all(
    files.filter((f) => f.endsWith(".md")).map(async (f) => {
      const text = await readFile(dir + "/" + f, "utf8");
      return { file: f, tokens: Math.ceil(text.length / 3.5) };
    })
  );
  return counts.sort((a, b) => b.tokens - a.tokens);
}`,
      },
      {
        type: "p",
        text: "字符数除以 3.5 是个粗略的估算,够用但不准。脚本跑通那天我很满意,直到第二天需求变了:只统计 H2 标题以下的正文,而且要按章节聚合。我又改了 30 行。第三天,需求是忽略代码块里的内容。",
      },
      { type: "h2", text: "第一步:给它记忆" },
      {
        type: "p",
        text: "改到第三次我意识到,脚本记不住上一次跑的结果,每次都从零开始。我给它加了一个简单的状态文件,记录每次运行的输入、输出和改动原因。",
      },
      {
        type: "ul",
        items: [
          "input:这次扫描的目录和过滤规则",
          "output:产出的统计结果",
          "change:和上一次相比改了什么,为什么",
        ],
      },
      {
        type: "p",
        text: "记忆不需要复杂,一个 JSON 文件就够。关键是让 agent 在下次运行时能读到上一次的上下文,而不是每次都问我。",
      },
      { type: "h2", text: "第二步:给它工具" },
      {
        type: "p",
        text: "脚本只有读文件这一个能力。要让它自己判断该忽略什么、该聚合到哪一层,得给它几个可调用的工具。",
      },
      {
        type: "code",
        lang: "ts",
        code: `const tools = [
  { name: "read_file", desc: "读取文件内容" },
  { name: "list_dir", desc: "列出目录结构" },
  { name: "write_state", desc: "写入运行状态" },
  { name: "ask_human", desc: "遇到歧义时问我" },
];`,
      },
      {
        type: "p",
        text: "ask_human 这个工具后来成了关键。当 agent 不确定一段文字算不算正文时,它会把那一段贴出来问我,而不是自己瞎猜。猜错的代价,比打断我高。",
      },
      {
        type: "quote",
        text: "给 agent 工具,不是为了让它更自动化,是为了让它在不确定的时候知道该停下来问谁。",
      },
      { type: "h2", text: "第三步:给它回退路径" },
      {
        type: "p",
        text: "agent 偶尔会跑偏,比如把一整段代码块当成正文统计了。我加了一个回退机制:每次写状态前,先存一份上一轮的快照。如果这一轮的结果和上一轮差异太大,agent 会自动回滚并把差异报告给我。",
      },
      {
        type: "p",
        text: "回退不是万能的,但它把“跑飞了”从灾难降级成了一次需要看一眼的通知。",
      },
      { type: "h2", text: "小结" },
      {
        type: "p",
        text: "把脚本变成 agent,对我来说不是加一个大模型进去,而是三件小事:让它记住上一次,让它在不确定时能问,让它在跑飞时能退。脚本还是那段脚本,只是它不再每次都从零开始。",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
