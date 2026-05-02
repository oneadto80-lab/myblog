"use client";

// 项目详情客户端组件：紧凑版（黑底 Ballpit 上）+ 标题 + 双栏正文 + 下一项目链接
import Link from "next/link";
import { motion } from "framer-motion";

const NAV_HEIGHT = 64;

export default function ProjectDetailClient({ project, next }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-transparent project-detail-main"
      style={{
        color: "#ffffff",
        marginTop: NAV_HEIGHT,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 顶部紧凑 Hero */}
      <section className="project-detail-hero">
        <h1
          className="font-display italic text-center project-detail-title"
          style={{
            fontWeight: 400,
            lineHeight: 1,
            color: "#ffffff",
          }}
        >
          {project.name}
        </h1>
      </section>

      <section
        className="px-5 md:px-10 project-detail-section"
        style={{
          maxWidth: 880,
          width: "100%",
          marginInline: "auto",
          marginTop: "0.25rem",
          flex: "1 1 auto",
          minHeight: 0,
        }}
      >
        <div
          className="flex gap-6 md:gap-8 project-detail-card"
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: 18,
          }}
        >
          {/* 左侧旋转标签：Overview */}
          <div
            className="hidden md:block"
            style={{
              fontSize: "13px",
              letterSpacing: "0.25em",
              fontWeight: 400,
              color: "rgba(255,255,255,0.58)",
              textTransform: "uppercase",
              transform: "rotate(-90deg)",
              transformOrigin: "left top",
              whiteSpace: "nowrap",
              height: 0,
            }}
          >
            Overview
          </div>
          <div className="flex-1 project-detail-body">
            {project.overview.map((para, i) => (
              <p key={i} style={i === 0 ? undefined : { marginTop: 14 }}>
                {para}
              </p>
            ))}

            {/* 技术标签 */}
            {project.tech && project.tech.length > 0 && (
              <div
                className="flex flex-wrap project-detail-tags"
                style={{ gap: "0.5rem", marginTop: "1.25rem" }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="tech-tag"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      color: "rgba(255,255,255,0.78)",
                      padding: "6px 13px",
                      fontSize: "13.5px",
                      fontWeight: 400,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 下一项目 */}
        <div className="project-detail-next">
          <Link
            href={`/projects/${next.slug}`}
            className="glass-link cursor-target"
            style={{
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            下一个项目 — {next.name} →
          </Link>
        </div>
      </section>

      <style jsx>{`
        .project-detail-main {
          height: calc(100dvh - ${NAV_HEIGHT}px);
          overflow: hidden;
        }
        .project-detail-hero {
          height: clamp(170px, 24vh, 230px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 0.75rem;
          padding-bottom: 0.5rem;
        }
        .project-detail-title {
          font-size: clamp(3rem, 8vw, 6.5rem);
        }
        .project-detail-card {
          padding: 1.25rem 1.5rem;
        }
        .project-detail-body {
          font-size: 15.75px;
          line-height: 1.84;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.78);
        }
        .project-detail-next {
          margin-top: 1.25rem;
          text-align: right;
        }
        @media (max-width: 768px) {
          .project-detail-main {
            overflow: hidden;
          }
          .project-detail-hero {
            height: clamp(112px, 17vh, 160px);
          }
          .project-detail-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          .project-detail-card {
            padding: 1rem 1.1rem;
            background: rgba(0, 0, 0, 0.08) !important;
            border-color: rgba(255, 255, 255, 0.06) !important;
            backdrop-filter: blur(2px) !important;
            -webkit-backdrop-filter: blur(2px) !important;
          }
          .project-detail-body {
            font-size: 15.25px;
            line-height: 1.8;
            color: #ffffff;
            text-shadow: 0 0 24px rgba(255, 255, 255, 0.22), 0 1px 3px rgba(0, 0, 0, 0.8);
          }
          .project-detail-section {
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 1.25rem;
          }
          .project-detail-next {
            margin-top: 1rem;
            text-align: center;
          }
          .project-detail-next .glass-link {
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
            color: #ffffff !important;
            text-shadow: 0 0 16px rgba(255, 255, 255, 0.2);
          }
        }
        @media (max-width: 768px) and (max-height: 700px) {
          .project-detail-hero {
            height: clamp(92px, 14vh, 124px);
          }
          .project-detail-title {
            font-size: clamp(2.25rem, 10vw, 3.5rem);
          }
          .project-detail-card {
            padding: 0.9rem 1rem;
          }
        }
      `}</style>
    </motion.main>
  );
}
