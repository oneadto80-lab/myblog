"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GooeyNav from "@/components/GooeyNav";

const NAV_ITEMS = [
  { label: "作品", href: "/projects" },
  { label: "关于", href: "/about" },
  { label: "LAB", href: "/lab" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const isSubpage = pathname !== "/";
  const isHome = !isSubpage;
  const isProjects =
    pathname === "/projects" || pathname.startsWith("/projects/");
  const isAbout = pathname === "/about";
  const isLab = pathname === "/lab";
  const useDarkNav = isHome || isProjects || isAbout || isLab;

  const navBg = useDarkNav ? "rgba(0,0,0,0.42)" : "rgba(255,255,255,0.5)";
  const navBorder = useDarkNav
    ? "1px solid rgba(255,255,255,0.10)"
    : "1px solid rgba(0,0,0,0.08)";
  const textColorClass = useDarkNav ? "text-white" : "";
  const textColorStyle = useDarkNav ? undefined : "#111111";

  let activeIndex = -1;
  if (isProjects) activeIndex = 0;
  else if (isAbout) activeIndex = 1;
  else if (isLab) activeIndex = 2;

  const handleNavClick = (e) => {
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || /^https?:/i.test(href)) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    router.push(href);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: navBg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: navBorder,
      }}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 md:px-10 md:py-3.5">
        <div className="nav-left-group flex min-w-0 items-center gap-2 sm:gap-3 md:gap-5">
          {isSubpage && (
            <button
              onClick={() => router.back()}
              className={`glass-link font-sans uppercase nav-return-btn ${textColorClass}`}
              style={{
                fontWeight: 500,
                color: textColorStyle,
              }}
            >
              ← 返回
            </button>
          )}
          <Link
            href="/"
            className={`font-display italic nav-brand ${textColorClass}`}
            style={{ fontWeight: 500, color: textColorStyle }}
          >
            Oneadto
          </Link>
        </div>
        <div
          onClickCapture={handleNavClick}
          className="gooey-nav-wrapper"
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "14px",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            fontWeight: 500,
            width: "clamp(136px, 36vw, 240px)",
            flexShrink: 0,
            overflow: "visible",
          }}
        >
          <GooeyNav
            key={pathname}
            items={NAV_ITEMS}
            initialActiveIndex={activeIndex}
            particleCount={isMobile ? 9 : 15}
            particleDistances={isMobile ? [70, 10] : [90, 10]}
            particleR={isMobile ? 70 : 100}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </div>
      <style jsx>{`
        .nav-brand {
          font-size: 20px;
          line-height: 1;
          white-space: nowrap;
        }
        .nav-return-btn {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.08em;
        }
        @media (max-width: 640px) {
          .nav-left-group {
            gap: 0.4rem;
          }
          .nav-brand {
            font-size: 17.5px;
          }
          .nav-return-btn {
            min-height: 44px;
            padding: 0.35rem 0.58rem !important;
            letter-spacing: 0.06em;
          }
        }
        @media (max-width: 380px) {
          .nav-left-group {
            gap: 0.3rem;
          }
          .nav-brand {
            font-size: 17px;
          }
          .nav-return-btn {
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
          }
        }
      `}</style>
      <style jsx global>{`
        .gooey-nav-wrapper ul {
          gap: 1.25rem;
        }
        .gooey-nav-wrapper {
          flex-shrink: 0;
        }
        .gooey-nav-wrapper a {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 640px) {
          .gooey-nav-wrapper {
            font-size: 14px !important;
            letter-spacing: 0.03em !important;
            width: 142px;
            overflow: visible;
          }
          .gooey-nav-wrapper ul {
            width: 100%;
            justify-content: space-between;
            gap: 0.25rem !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .gooey-nav-wrapper a {
            min-width: 44px;
            padding: 0.55em 0.45em !important;
            min-height: 44px;
          }
        }
        @media (max-width: 380px) {
          .gooey-nav-wrapper {
            width: 136px;
          }
          .gooey-nav-wrapper ul {
            gap: 0.1rem !important;
          }
          .gooey-nav-wrapper a {
            padding-left: 0.35em !important;
            padding-right: 0.35em !important;
          }
        }
      `}</style>
    </nav>
  );
}
