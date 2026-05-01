"use client";

// 路由感知主题包装：首页保持透明（让 Galaxy 透出），非首页铺浅色底并切到亮色玻璃主题
import { usePathname } from "next/navigation";

export default function ThemeWrapper({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProjects =
    pathname === "/projects" || pathname.startsWith("/projects/");
  const isAbout = pathname === "/about";
  const isLab = pathname === "/lab";
  const useDarkTheme = isHome || isProjects || isAbout || isLab;

  return (
    <>
      {!useDarkTheme && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "#f8f8f6",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        className={useDarkTheme ? "theme-dark" : "theme-light"}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    </>
  );
}
