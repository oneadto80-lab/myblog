"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Ballpit = dynamic(() => import("@/components/Ballpit"), {
  ssr: false,
});

export default function ProjectsBallpitBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-black"
    >
      <div className="absolute inset-0 h-screen w-screen">
        <Ballpit
          count={100}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
          colors={["#5227FF", "#7cff67", "#ff6b6b"]}
          rendererOptions={{
            antialias: true,
            alpha: true,
            powerPreference: "default",
          }}
        />
      </div>
    </div>
  );
}
