"use client";

import { motion } from "framer-motion";

const NAV_HEIGHT = "64px";

export default function LabPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#000000",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background: "#000000",
          zIndex: -1,
        }}
      />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "100%",
          paddingTop: NAV_HEIGHT,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: `${NAV_HEIGHT} 1.5rem 0`,
          boxSizing: "border-box",
        }}
      >
        <h1
          className="font-display italic lab-title"
          style={{
            fontSize: "clamp(2.75rem, 6vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1,
            color: "#ffffff",
          }}
        >
          Lab
        </h1>
        <p
          className="uppercase lab-subtitle"
          style={{
            fontSize: "15px",
            letterSpacing: "0.22em",
            fontWeight: 500,
            color: "rgba(255,255,255,0.72)",
            marginTop: "1.5rem",
          }}
        >
          即将推出...
        </p>
      </motion.main>
      <style jsx>{`
        @media (max-width: 640px) {
          .lab-title {
            font-size: clamp(2.6rem, 13vw, 4.25rem) !important;
          }
          .lab-subtitle {
            letter-spacing: 0.18em !important;
          }
        }
      `}</style>
    </div>
  );
}
