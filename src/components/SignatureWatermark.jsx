"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignatureWatermark() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const isHome = pathname === "/";
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setShow(!isHome && isTouch);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 49,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "56px",
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Pinyon Script', cursive",
          fontWeight: 400,
          fontSize: "36px",
          color: "rgba(255,255,255,0.88)",
          letterSpacing: "0.03em",
          lineHeight: 1,
          textShadow: "0 0 24px rgba(255,255,255,0.18)",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        Oneadto
      </span>
    </div>
  );
}
