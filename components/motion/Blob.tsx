"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type BlobColor = "aqua" | "periwinkle" | "wisteria" | "lavender" | "floral";

const COLOR_MAP: Record<BlobColor, string> = {
  aqua: "var(--pearl-aqua)",
  periwinkle: "var(--periwinkle)",
  wisteria: "var(--wisteria)",
  lavender: "var(--lavender)",
  floral: "var(--floral-white)",
};

interface BlobProps {
  color?: BlobColor;
  size?: number;
  parallax?: number;
  drift?: boolean;
  opacity?: number;
  className?: string;
}

export function Blob({
  color = "aqua",
  size = 360,
  parallax = 60,
  drift = true,
  opacity = 0.45,
  className = "",
}: BlobProps) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, prefersReduced ? 0 : parallax]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ y, width: size, height: size, opacity }}
      className={`pointer-events-none select-none ${drift ? "anim-blob-drift" : ""} ${className}`}
    >
      <svg viewBox="0 0 200 200" fill="none" className="h-full w-full">
        <path
          fill={COLOR_MAP[color]}
          d="M44.7,-62.3C57.9,-53.4,68.6,-40.3,74.2,-25.1C79.8,-9.9,80.3,7.3,74.1,21.7C67.9,36.1,55,47.7,40.9,57.1C26.8,66.5,11.5,73.7,-4.3,79.6C-20.1,85.5,-36.4,90.1,-49.2,82.6C-62,75.1,-71.3,55.5,-76.8,36.4C-82.3,17.3,-84,-1.3,-78.4,-17.5C-72.8,-33.7,-59.9,-47.5,-45.2,-56.1C-30.5,-64.7,-14.1,-68.1,1.3,-69.9C16.7,-71.7,31.5,-71.2,44.7,-62.3Z"
          transform="translate(100 100)"
        />
      </svg>
    </motion.div>
  );
}
