"use client";

import { motion } from "framer-motion";
import AboutPixelSnowBackground from "@/components/about/AboutPixelSnowBackground";

export const dynamic = "force-static";

const NAV_HEIGHT = "64px";

const ABOUT_PARAGRAPHS = [
  "本站基于 Next.js App Router 构建，采用 JavaScript 作为主要开发语言，并使用 Tailwind CSS 管理整体视觉系统。页面结构围绕路由进行组织，首页、作品页、项目详情页、关于页与实验室页面分别拥有独立的布局逻辑和背景策略。",
  "界面动效由 Framer Motion 负责，包括页面入场、元素过渡和局部交互反馈。视觉背景与交互组件主要来自 React Bits：About 页面使用 PixelSnow 营造像素雪背景，Projects 页面与项目详情页使用 Ballpit 作为动态画布背景，作品入口使用 Folder 组件完成收纳式项目导航。",
  "整体实现上，项目采用组件化拆分方式，将导航、背景、光标、作品入口和项目详情内容分别封装。动态背景按路由隔离，避免不同页面的视觉系统互相污染；自定义光标根据深色页面进行白色适配，保证在黑色画布背景下仍然清晰可见。",
  "部署方向面向 Vercel 静态输出，域名与 CDN 由 Alibaba Cloud 和 Cloudflare 承接",
];

export default function AboutPage() {
  return (
    <>
      <AboutPixelSnowBackground />
      <main
        className="about-main"
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: NAV_HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 1.25rem",
          boxSizing: "border-box",
          background: "transparent",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="about-header"
          style={{ textAlign: "center" }}
        >
          <h1
            className="font-display italic about-title"
            style={{
              fontWeight: 400,
              lineHeight: 0.95,
              color: "#ffffff",
              margin: 0,
            }}
          >
            About
          </h1>
          <div
            aria-hidden="true"
            className="about-underline"
            style={{
              width: 88,
              height: 1,
              background: "rgba(255,255,255,0.32)",
              margin: "20px auto 0",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="about-body"
        >
          {ABOUT_PARAGRAPHS.map((para, i) => (
            <p key={i} className="about-paragraph" style={i === 0 ? { margin: 0 } : { margin: "16px 0 0" }}>
              {para}
            </p>
          ))}
        </motion.div>
      </main>
      <style jsx global>{`
        html,
        body {
          overflow: hidden;
        }
        .about-main {
          height: calc(100dvh - ${NAV_HEIGHT});
          overflow: hidden;
        }
        .about-header {
          margin-top: clamp(56px, 10vh, 88px);
        }
        .about-title {
          font-size: clamp(4rem, 8vw, 7rem);
        }
        .about-body {
          margin: auto 0;
          max-width: 780px;
          width: 100%;
          text-align: center;
          color: rgba(255, 255, 255, 0.72);
          font-size: 15.75px;
          line-height: 1.9;
          font-weight: 400;
          background: rgba(0, 0, 0, 0.24);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 24px 30px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        @media (max-width: 768px) {
          html,
          body {
            overflow: hidden;
          }
          .about-main {
            height: calc(100dvh - ${NAV_HEIGHT});
            overflow: hidden;
            padding: 0 1rem;
          }
          .about-header {
            margin-top: clamp(28px, 6vh, 56px);
          }
          .about-title {
            font-size: clamp(3rem, 12vw, 4.75rem);
          }
          .about-underline {
            margin: 14px auto 0 !important;
            width: 64px !important;
          }
          .about-body {
            font-size: 15px;
            line-height: 1.85;
            padding: 18px 20px;
            max-width: 100%;
            overflow-y: auto;
            max-height: calc(100dvh - ${NAV_HEIGHT} - 176px);
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
          }
          .about-paragraph {
            margin-top: 14px !important;
          }
        }
        @media (max-width: 768px) and (max-height: 720px) {
          html,
          body {
            overflow: auto;
          }
          .about-main {
            height: auto;
            min-height: calc(100dvh - ${NAV_HEIGHT});
            overflow: visible;
            padding-bottom: 2rem;
          }
          .about-body {
            overflow: visible;
            max-height: none;
          }
        }
      `}</style>
    </>
  );
}
