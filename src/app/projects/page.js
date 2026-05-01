"use client";

import { motion } from "framer-motion";
import ProjectFolder from "@/components/projects/ProjectFolder";

const projectItems = [
  {
    title: "Morph",
    description: "实时协作文档工具",
    href: "/projects/morph",
  },
  {
    title: "Folio",
    description: "设计师客户管理CRM",
    href: "/projects/folio",
  },
  {
    title: "Trace",
    description: "习惯追踪+可视化",
    href: "/projects/trace",
  },
];

export default function ProjectsPage() {
  return (
    <main
      className="overflow-hidden bg-transparent px-4 sm:px-6 md:px-20"
      style={{
        "--projects-nav-height": "64px",
        height: "calc(100dvh - var(--projects-nav-height))",
        minHeight: "calc(100dvh - var(--projects-nav-height))",
        marginTop: "var(--projects-nav-height)",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-full max-w-[760px] items-center justify-center"
      >
        <ProjectFolder items={projectItems} />
      </motion.section>
    </main>
  );
}
