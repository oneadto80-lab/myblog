// 项目数据：在首页、作品列表、详情页之间共享
export const projects = [
  {
    slug: "morph",
    name: "Morph",
    description: "一个让团队实时协作编辑文档的轻量级工具",
    year: "2025",
    tech: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    overview: [
      "Morph 是一款专为小型团队设计的实时文档协作工具。用户可以同时编辑同一份文档，所有改动即时同步，无需刷新页面。项目使用 WebSocket 实现实时通信，前端基于 React 构建，后端采用 Node.js + Express。",
      "数据存储使用 PostgreSQL，部署在 Railway 平台上。整个项目从零开始独立完成，历时约三个月，是我第一个真正意义上的全栈项目。界面设计追求克制，只保留核心功能。",
    ],
  },
  {
    slug: "folio",
    name: "Folio",
    description: "一个帮助独立设计师管理客户与项目的小型 CRM 工具",
    year: "2025",
    tech: ["Next.js", "Prisma", "SQLite", "Tailwind CSS"],
    overview: [
      "Folio 是一个面向自由职业设计师的轻量级客户管理系统。用户可以在其中记录客户信息、跟踪项目进度、发送简单报价单。整个应用使用 Next.js 全栈开发，数据库采用 SQLite，通过 Prisma 进行管理。",
      "这个项目源于我自己管理客户时的真实痛点。设计上刻意保持极简，避免功能过载。目前已有几位朋友在实际使用中，持续根据反馈迭代。",
    ],
  },
  {
    slug: "trace",
    name: "Trace",
    description: "一个记录日常习惯并生成可视化报告的个人追踪应用",
    year: "2026",
    tech: ["React", "FastAPI", "Recharts", "Python"],
    overview: [
      "Trace 是一款帮助用户建立和坚持日常习惯的追踪工具。每天打卡后，应用会自动生成趋势图和月度报告，让用户直观看到自己的坚持轨迹。前端使用 React + Recharts 实现数据可视化，后端使用 FastAPI。",
      "用户数据完全本地加密存储，不上传任何服务器。这个项目让我第一次接触到 Python 后端开发，也是我目前个人使用频率最高的自建工具。",
    ],
  },
];
