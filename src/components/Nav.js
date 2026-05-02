"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "作品", href: "/projects" },
  { label: "关于", href: "/about" },
  { label: "LAB", href: "/lab" },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
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

  return (
    <nav
      className="hidden sm:block"
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
              className={`glass-link font-sans uppercase nav-return-btn cursor-target ${textColorClass}`}
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
            className={`cursor-target ${textColorClass}`}
            style={{
              fontFamily: "'Pinyon Script', cursive",
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: 1,
              whiteSpace: "nowrap",
              color: textColorStyle ?? "rgba(255,255,255,0.92)",
              textShadow: useDarkNav ? "0 0 24px rgba(255,255,255,0.18)" : "none",
              letterSpacing: "0.03em",
              textDecoration: "none",
            }}
          >
            Oneadto
          </Link>
        </div>
        <ul
          className="flex list-none m-0 p-0"
          style={{ gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`glass-link uppercase cursor-target ${textColorClass}`}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: textColorStyle,
                  minHeight: 44,
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .nav-return-btn {
          min-height: 36px;
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.08em;
        }
      `}</style>
    </nav>
  );
}
