"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";

const PALETTE = [
  "#75c9c8",
  "#80a1d4",
  "#c0b9dd",
  "#1b2338",
  "#f7f4ea",
] as const;

interface ConfettiProps {
  active?: boolean;
  count?: number;
  spread?: "burst" | "fullscreen";
}

export function Confetti({
  active = true,
  count = 40,
  spread = "burst",
}: ConfettiProps) {
  const prefersReduced = useReducedMotion();

  const shards = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.18;
      const dist =
        spread === "fullscreen"
          ? 140 + ((i * 53) % 260)
          : 70 + ((i * 37) % 130);
      return {
        id: i,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - (spread === "fullscreen" ? 40 : 60),
        rot: ((i * 73) % 360) - 180,
        w: 8 + (i % 4) * 3,
        h: 6 + (i % 3) * 3,
        color: PALETTE[i % PALETTE.length],
        delay: (i % 8) * 0.025,
        circle: i % 5 === 0,
      };
    });
  }, [count, spread]);

  if (!active || prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-[70] flex items-center justify-center overflow-visible ${
        spread === "fullscreen"
          ? "fixed inset-0"
          : "absolute inset-x-0 top-10"
      }`}
    >
      <div className="relative h-0 w-0">
        {shards.map((s) => (
          <motion.span
            key={s.id}
            initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
            animate={{
              x: s.tx,
              y: s.ty,
              rotate: s.rot,
              scale: 0.7,
              opacity: 0,
            }}
            transition={{
              duration: 0.95,
              delay: s.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute block border border-[var(--ink-surface)]"
            style={{
              width: s.w,
              height: s.h,
              backgroundColor: s.color,
              borderRadius: s.circle ? "999px" : "3px",
            }}
          />
        ))}
      </div>
    </div>
  );
}
