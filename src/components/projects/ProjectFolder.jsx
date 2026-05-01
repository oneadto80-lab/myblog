"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Folder from "@/components/Folder";

const MotionLink = motion.create(Link);

const defaultItems = [
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

function subscribeToQuery(query, callback) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getQuerySnapshot(query) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => subscribeToQuery(query, callback),
    () => getQuerySnapshot(query),
    () => false
  );
}

export default function ProjectFolder({ items = defaultItems }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTiny = useMediaQuery("(max-width: 389px)");
  const isNarrow = useMediaQuery("(max-width: 359px)");
  const folderSize = isNarrow ? 1.38 : isTiny ? 1.45 : isMobile ? 1.55 : 2;
  const inverseScale = 1 / folderSize;
  const itemWidth = isNarrow ? 142 : isTiny ? 148 : isMobile ? 158 : 184;
  const itemHeight = isNarrow ? 76 : isMobile ? 78 : 86;

  // 三张项目卡片的确定性位置（在 Folder 内部坐标系内，最终会被 folderSize 缩放）
  // 桌面端：Morph(-132,-64,-3°), Folio(0,-92,0°), Trace(132,-64,3°)
  // 移动端：Morph(-84,-52,-2°), Folio(0,-76,0°), Trace(84,-52,2°)
  const openTransforms = useMemo(() => {
    const px = (n) => n / folderSize;
    if (isMobile) {
      const sideOffset = isNarrow ? 72 : isTiny ? 76 : 84;
      const sideLift = isNarrow ? -50 : -52;
      const centerLift = isNarrow ? -70 : isTiny ? -72 : -76;
      return [
        `translate(calc(-50% - ${px(sideOffset)}px), ${px(sideLift)}px) rotate(-2deg)`,
        `translate(-50%, ${px(centerLift)}px) rotate(0deg)`,
        `translate(calc(-50% + ${px(sideOffset)}px), ${px(sideLift)}px) rotate(2deg)`,
      ];
    }
    return [
      `translate(calc(-50% - ${px(132)}px), ${px(-64)}px) rotate(-3deg)`,
      `translate(-50%, ${px(-92)}px) rotate(0deg)`,
      `translate(calc(-50% + ${px(132)}px), ${px(-64)}px) rotate(3deg)`,
    ];
  }, [folderSize, isMobile, isNarrow, isTiny]);

  // 让纸张容器透明，统一由 MotionLink 显示卡片本体
  const openPaperStyle = useMemo(
    () => ({
      backgroundColor: "transparent",
      borderRadius: "14px",
      boxShadow: "none",
    }),
    []
  );

  const folderItems = useMemo(
    () =>
      items.map((item, i) => (
        <MotionLink
          key={item.href}
          href={item.href}
          aria-label={`Open ${item.title} project`}
          className="block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/80"
          style={{
            width: itemWidth,
            height: itemHeight,
            padding: isNarrow ? "11px 12px" : isMobile ? "12px 14px" : "14px 16px",
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.72)",
            background: "rgba(255,255,255,0.96)",
            color: "#111111",
            textDecoration: "none",
            boxShadow: "0 18px 45px rgba(0,0,0,0.22)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transformOrigin: "center center",
            zIndex: i === 1 ? 3 : 2,
            position: "relative",
          }}
          initial={{ scale: inverseScale }}
          animate={{ scale: inverseScale, y: 0 }}
          whileHover={{
            scale: inverseScale * 1.015,
            y: -4 / folderSize,
          }}
          whileTap={{ scale: inverseScale * 0.98 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="block"
            style={{
              fontSize: isMobile ? 16.5 : 17,
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#111111",
              letterSpacing: "0.01em",
            }}
          >
            {item.title}
          </span>
          <span
            className="block"
            style={{
              marginTop: 6,
              fontSize: isNarrow ? 13 : 13.5,
              fontWeight: 400,
              lineHeight: 1.4,
              color: "rgba(0,0,0,0.6)",
            }}
          >
            {item.description}
          </span>
        </MotionLink>
      )),
    [folderSize, inverseScale, isMobile, isNarrow, itemHeight, itemWidth, items]
  );

  return (
    <div className="mx-auto flex min-h-[360px] w-full max-w-[760px] translate-y-[-16px] items-center justify-center md:min-h-[440px] md:translate-y-[-18px]">
      <Folder
        size={folderSize}
        color="#5227FF"
        className="custom-folder origin-center"
        items={folderItems}
        openTransforms={openTransforms}
        openPaperClassName="w-[80%] h-[45%]"
        openPaperStyle={openPaperStyle}
        disablePaperHover
      />
    </div>
  );
}
