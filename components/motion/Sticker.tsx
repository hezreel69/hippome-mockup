"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

type StickerTone = "aqua" | "periwinkle" | "wisteria" | "ink" | "floral";

const TONE_MAP: Record<StickerTone, string> = {
  aqua: "bg-[var(--pearl-aqua)] text-[var(--ink-surface)]",
  periwinkle: "bg-[var(--periwinkle)] text-[var(--ink-surface)]",
  wisteria: "bg-[var(--wisteria)] text-[var(--ink-surface)]",
  ink: "bg-[var(--ink-surface)] text-[var(--floral-white)]",
  floral: "bg-[var(--floral-white)] text-[var(--ink-surface)]",
};

interface StickerProps {
  tone?: StickerTone;
  tilt?: number;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Sticker({
  tone = "aqua",
  tilt = -2,
  interactive = true,
  className = "",
  children,
}: StickerProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { rotate: tilt }}
      whileHover={
        interactive && !prefersReduced
          ? { rotate: 0, scale: 1.05 }
          : undefined
      }
      whileTap={
        interactive && !prefersReduced ? { scale: 0.95 } : undefined
      }
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={prefersReduced ? { transform: `rotate(${tilt}deg)` } : undefined}
      className={`sticker-sm inline-flex items-center gap-2 px-3.5 py-1.5 font-semibold ${TONE_MAP[tone]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
