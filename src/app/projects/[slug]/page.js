// 项目详情服务端入口：导出静态参数与元数据，渲染客户端子组件
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// 让 Next 在构建时为每个项目预渲染 HTML
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// 动态生成每个项目页的 title 与 description
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "项目 — Oneadto" };
  return {
    title: `${project.name} — Oneadto`,
    description: project.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  // 末项的下一项绕回到第一项，形成循环导航
  const next = projects[(idx + 1) % projects.length];
  return <ProjectDetailClient project={project} next={next} />;
}
