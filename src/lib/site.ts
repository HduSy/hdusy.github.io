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
  tag: "OSS" | "TOOL" | "APP" | "SKILL" | "PAGE";
  href: string;
};

export const site = {
  wordmark: "Fei Liu",
  nameCJK: "Fei Liu",
  role: "前端（全栈）工程师",
  bio: [
    "5年前端开发经验，先后任职于哔哩哔哩、阿里巴巴。",
    "擅长复杂前端应用研发与性能优化，在前端工程化与构建优化上经验扎实，主导过 B站运营技术部低代码活动平台设计与实现、ICBU 用增技术部全场景页面 P90 性能优化、多端 Monorepo 架构整合。",
    "近两年深度实践 AI Coding，研发效能 x10，具备 AI Native 应用独立研发能力。",
  ],
  sloganLines: [
    "日照香炉生紫烟，",
    "遥看瀑布挂前川。",
    "飞流直下三千尺，",
    "疑是银河落九天。",
  ],
  // Token emphasized in-accent within sloganLines (the wordmark 飞流).
  sloganHighlight: "飞流",
  // Hero right-column image carousel (vertical). Each slide carries a
  // location shown in the frame's caption.
  heroGallery: [
    { src: "/hero-portrait.jpg", alt: "Passion", location: "Shanghai" },
    { src: "/bilibili-building.jpeg", alt: "Bilibili Building", location: "Shanghai" },
    { src: "/alibaba-building.jpeg", alt: "Alibaba Building", location: "Hangzhou" },
  ],
  timeline: [
    { period: "2021-2023", place: "哔哩哔哩" },
    { period: "2024-至今", place: "阿里" },
  ],
  interests: ["开源爱好者", "喜欢刷 Twitter", "SEO 探索中"],
  email: "alifeiliu@gmail.com",
  github: "https://github.com/HduSy",
  twitter: "https://x.com/alifeiliu",
  coord: "30°16′ N, 120°09′ E",
  writings: [
    {
      date: "2025.06",
      title: "Claude Code 实战:把脚本变成 agent",
      excerpt: "从一段 50 行的脚本出发,一步步给它记忆、工具和回退路径。",
      tag: "AGENT",
      href: "/writing/claude-code-agent/",
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
      kind: "Claude Code 用量监测",
      desc: "macOS / Windows 菜单栏应用,实时显示 Claude Code 的 token 用量、预估成本与模型 / MCP / Skill 调用明细,本地读取会话日志,零侵入。",
      year: "2026.06",
      tag: "TOOL",
      href: "https://github.com/HduSy/tokenscope",
    },
    {
      name: "Tokenscope Homepage",
      kind: "产品官网",
      desc: "Tokenscope 菜单栏应用的产品落地页,Next.js + Tailwind v4 构建。",
      year: "2026.06",
      tag: "PAGE",
      href: "https://tokenscope.app",
    },
    {
      name: "OC-Review",
      kind: "AI 面试助手",
      desc: "在同一个对话框里完成面试的模拟、复盘、练习与预测,画像与简历只存浏览器本地,接入五家大模型供应商。",
      year: "2026.05",
      tag: "PAGE",
      href: "http://findfunplus.cn/",
    },
    {
      name: "resume-md2pdf",
      kind: "Claude Code Skill",
      desc: "把 Markdown 简历按目标岗位套上视觉主题,用 Puppeteer 导出 A4 矢量 PDF,文字可选可复制,分页精确。",
      year: "2026.06",
      tag: "SKILL",
      href: "https://github.com/HduSy/resume-md2pdf",
    },
  ] satisfies Build[],
} as const;
