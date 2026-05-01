"use client";

// 自定义鼠标跟随效果：小圆点 + 大圆环，使用 Framer Motion 弹簧实现拖尾
// 颜色随路由切换：首页白色，其它页面黑色
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

const desktopCursorQuery = "(hover: hover) and (pointer: fine) and (min-width: 769px)";

function subscribeToCursorQuery(callback) {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(desktopCursorQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getCursorQuerySnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(desktopCursorQuery).matches;
}

export default function Cursor() {
  const enabled = useSyncExternalStore(
    subscribeToCursorQuery,
    getCursorQuerySnapshot,
    () => false
  );
  const [hovering, setHovering] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects =
    pathname === "/projects" || pathname.startsWith("/projects/");
  const isAbout = pathname === "/about";
  const isLab = pathname === "/lab";
  // 深色背景路由：白色光标；其它页面浅色背景：黑色光标
  let dotColor;
  let ringBorder;
  if (isProjects || isAbout || isLab) {
    dotColor = "#ffffff";
    ringBorder = "1px solid rgba(255,255,255,0.85)";
  } else if (isHome) {
    dotColor = "rgba(255,255,255,0.9)";
    ringBorder = "2px solid rgba(255,255,255,0.8)";
  } else {
    dotColor = "rgba(0,0,0,0.85)";
    ringBorder = "2px solid rgba(0,0,0,0.7)";
  }

  // 实时鼠标坐标
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // 圆点弹簧：响应较快
  const dotX = useSpring(x, { stiffness: 300, damping: 28 });
  const dotY = useSpring(y, { stiffness: 300, damping: 28 });
  // 圆环弹簧：响应较慢，形成拖尾感
  const ringX = useSpring(x, { stiffness: 150, damping: 20 });
  const ringY = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // 鼠标悬停在可交互元素上时切换 hovering 状态
    const over = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role='button']")) {
        setHovering(true);
      }
    };
    const out = (e) => {
      const t = e.target;
      if (t.closest && t.closest("a, button, [role='button']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* 小圆点：悬停可交互元素时隐藏 */}
      <motion.div
        style={{
          translateX: dotX,
          translateY: dotY,
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: dotColor,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: hovering ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      {/* 大圆环：悬停时放大 */}
      <motion.div
        animate={{ scale: hovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{
          translateX: ringX,
          translateY: ringY,
          position: "fixed",
          top: -16,
          left: -16,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: ringBorder,
          background: "transparent",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
