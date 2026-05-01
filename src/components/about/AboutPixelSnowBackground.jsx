"use client";

import dynamic from "next/dynamic";

const PixelSnow = dynamic(() => import("@/components/PixelSnow"), {
  ssr: false,
});

export default function AboutPixelSnowBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      <PixelSnow
        color="#ffffff"
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={200}
        speed={1.25}
        depthFade={8}
        farPlane={20}
        brightness={1}
        gamma={0.4545}
        density={0.3}
        variant="square"
        direction={125}
      />
    </div>
  );
}
