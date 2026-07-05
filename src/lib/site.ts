// Single source of truth for page content.
// All names, copy, and links below are placeholders - swap for your own.

export type Writing = {
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  href: string;
};

export type Build = {
  name: string;
  kind: string;
  desc: string;
  year: string;
  tag: "OSS" | "TOOL" | "APP";
  href: string;
};

export const site = {
  wordmark: "Fei Liu",
  nameCJK: "Fei Liu",
  role: "AI builder & writer",
  kicker: "AI builder × build in public",
  sloganLines: [
    "探索 AI 的边界与商业可能",
    "在公开构建里找到自己的节奏",
  ],
  bio: [
    "我是 Fei Liu,专注 AI 内容实践与小型工具构建。",
    "写文章、做产品、记录在公开构建中学到的东西。",
    "相信小而持续的力量。",
  ],
  email: "alifeiliu@gmail.com",
  github: "https://github.com/HduSy",
  twitter: "https://x.com/alifeiliu",
  coord: "31°14′ N, 121°28′ E",
  est: "EST. 2024",
  writings: [
    {
      date: "2025.06",
      title: "Claude Code 实战:把脚本变成 agent",
      excerpt: "从一段 50 行的脚本出发,一步步给它记忆、工具和回退路径。",
      tag: "AGENT",
      href: "#",
    },
    {
      date: "2025.05",
      title: "用 200 行搭一个本地 RAG",
      excerpt: "不调框架,手写 embedding、检索与重排,看清每一步在做什么。",
      tag: "RAG",
      href: "#",
    },
    {
      date: "2025.03",
      title: "小模型的边际:什么值得跑在本地",
      excerpt: "测了七个开源模型在三类任务上的真实表现,结论有点反直觉。",
      tag: "LOCAL",
      href: "#",
    },
    {
      date: "2024.12",
      title: "写给自己的 AI 工作流复盘",
      excerpt: "一年来真正每天在用的工具不到五个,这是它们的边界与搭配。",
      tag: "WORKFLOW",
      href: "#",
    },
  ] satisfies Writing[],
  builds: [
    {
      name: "Inkwell",
      kind: "Markdown 博客引擎",
      desc: "极简、文件即数据库的写作站,支持双色调图片与蓝图主题。",
      year: "2025",
      tag: "OSS",
      href: "#",
    },
    {
      name: "Atlas",
      kind: "个人知识图谱",
      desc: "把笔记互相链接成图,本地优先,可导出为静态站点。",
      year: "2025",
      tag: "TOOL",
      href: "#",
    },
    {
      name: "Whisperboard",
      kind: "语音速记",
      desc: "走路时录一段,回家就是一篇结构化草稿。",
      year: "2024",
      tag: "APP",
      href: "#",
    },
  ] satisfies Build[],
} as const;
