"use client";

// 首页：纵向滚动吸附，三屏（Hero / 作品预览 / 联系）
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Galaxy from "@/components/Galaxy";

export default function Home() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  // 当前可见的小节索引，用于驱动右侧的圆点指示器
  const [active, setActive] = useState(0);

  useEffect(() => {
    // 通过 IntersectionObserver 跟踪当前进入视图的小节
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.index);
            setActive(i);
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="scroll-container relative isolate gap-0 space-y-0 bg-black" style={{ background: "#000000" }}>
      {/* 黑色画布 + 星空：仅在首页渲染 */}
      <Galaxy
        aria-hidden="true"
        className="transform-gpu"
        starSpeed={0.5}
        density={1}
        hueShift={140}
        speed={1}
        glowIntensity={0.3}
        saturation={0}
        mouseRepulsion={true}
        repulsionStrength={2}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        transparent={true}
      />

      {/* 右侧分页指示器 */}
      <div
        className="home-pagination"
        style={{
          position: "fixed",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: active === i ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.25)",
              transform: active === i ? "scale(1.3)" : "scale(1)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* 第一屏 — Hero */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        data-index="0"
        className="scroll-section relative z-10 m-0 flex h-[100dvh] flex-col items-center justify-center p-0"
        style={{ background: "transparent" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display italic text-white leading-none"
          style={{ fontSize: "clamp(5rem, 12vw, 11rem)", fontWeight: 400 }}
        >
          Oneadto
        </motion.h1>
        {/* 签名下方的细横线 */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            width: 120,
            height: 1,
            background: "rgba(255,255,255,0.22)",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="uppercase"
          style={{
            fontSize: "1rem",
            letterSpacing: "0.2em",
            fontWeight: 500,
            color: "rgba(255,255,255,0.68)",
          }}
        >
          ·绝世的容颜·
        </motion.p>

        {/* 滚动提示线 */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="scroll-indicator-line" />
        </div>
      </section>

      {/* 第二屏 — 精选作品 */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        data-index="1"
        className="scroll-section relative z-10 m-0 flex h-[100dvh] items-center justify-center p-0"
        style={{ background: "transparent" }}
      >
        <div className="flex w-full max-w-5xl items-center px-6 md:px-20">
          {/* 左侧旋转 90 度的标签 */}
          <div
            className="hidden md:block uppercase"
            style={{
              fontSize: "13px",
              letterSpacing: "0.25em",
              fontWeight: 400,
              color: "rgba(255,255,255,0.42)",
              transform: "rotate(-90deg)",
              transformOrigin: "left center",
              whiteSpace: "nowrap",
              width: 0,
              marginRight: "4rem",
            }}
          >
            作品列表
          </div>
          <div className="flex flex-col gap-5 w-full md:ml-20 home-projects-list" style={{ paddingLeft: "1rem" }}>
            {projects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                // 每张卡片向右递增偏移，形成阶梯感
                style={{ marginLeft: `${i * 12}px` }}
              >
                <Link href={`/projects/${p.slug}`}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card home-project-card cursor-target"
                    style={{
                      padding: "2rem 2.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <div
                        className="font-display italic"
                        style={{
                          fontSize: "2rem",
                          fontWeight: 400,
                          lineHeight: 1.1,
                          color: "#ffffff",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        className="mt-1"
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.62)",
                        }}
                      >
                        {p.description}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {p.year}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 第三屏 — 联系 / 页脚 */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        data-index="2"
        className="scroll-section relative z-10 m-0 flex h-[100dvh] flex-col items-center justify-center p-0 text-center"
        style={{ background: "transparent" }}
      >
        <div className="px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="font-display italic text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 400, lineHeight: 1 }}
          >
            联系我
          </motion.h2>

          <a
            href="mailto:oneadto666@gmail.com"
            className="hover:underline mt-8 inline-block"
            style={{
              fontSize: "15px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            oneadto666@gmail.com · oneatoo
          </a>

          {/* 底部小导航 */}
          <div className="flex flex-wrap justify-center mt-12" style={{ gap: "0.75rem" }}>
            {[
              { href: "/about", label: "关于" },
              { href: "/projects", label: "作品" },
              { href: "/lab", label: "Lab" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="glass-link cursor-target uppercase text-white"
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  minHeight: 40,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="home-footer-mark"
          style={{
            position: "absolute",
            bottom: "1.75rem",
            fontSize: "13.5px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          © 2026 by Oneadto
        </div>
      </section>
      <style jsx>{`
        @media (max-width: 768px) {
          .home-pagination {
            right: 1rem !important;
          }
          .home-footer-mark {
            font-size: 13.5px !important;
            bottom: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
