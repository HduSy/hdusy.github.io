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
  tag: "OSS" | "TOOL" | "APP" | "SKILL";
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
      name: "Tokenscope",
      kind: "Claude CLI 用量监测",
      desc: "macOS / Windows 菜单栏应用,实时显示 Claude CLI 的 token 用量、预估成本与模型 / MCP / Skill 调用明细,本地读取会话日志,零侵入。",
      year: "2025",
      tag: "TOOL",
      href: "https://github.com/HduSy/tokenscope",
    },
    {
      name: "Tokenscope Homepage",
      kind: "产品官网",
      desc: "Tokenscope 菜单栏应用的产品落地页,Next.js + Tailwind v4 构建。",
      year: "2025",
      tag: "OSS",
      href: "https://github.com/HduSy/tokenscope-homepage",
    },
    {
      name: "OC-Review",
      kind: "AI 面试助手",
      desc: "在同一个对话框里完成面试的模拟、复盘、练习与预测,画像与简历只存浏览器本地,接入五家大模型供应商。",
      year: "2025",
      tag: "APP",
      href: "#",
    },
    {
      name: "resume-md2pdf",
      kind: "Claude Code Skill",
      desc: "把 Markdown 简历按目标岗位套上视觉主题,用 Puppeteer 导出 A4 矢量 PDF,文字可选可复制,分页精确。",
      year: "2024",
      tag: "SKILL",
      href: "#",
    },
  ] satisfies Build[],
} as const;
