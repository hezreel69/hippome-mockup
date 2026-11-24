"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showCount?: boolean;
  tone?: "default" | "success" | "highlight";
}

const BAR_CLASSES = {
  default: "bg-[var(--wisteria)]",
  success: "bg-[var(--pearl-aqua)]",
  highlight: "bg-[var(--periwinkle)]",
};

export function ProgressBar({
  value,
  max,
  label,
  showCount = true,
  tone = "default",
}: ProgressBarProps) {
  const prefersReduced = useReducedMotion();
  const safeMax = Math.max(1, max);
  const clamped = Math.max(0, Math.min(value, safeMax));
  const pct = (clamped / safeMax) * 100;

  return (
    <div className="w-full">
      {(label || showCount) && (
        <div className="mb-2 flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
          <span>{label ?? ""}</span>
          {showCount && (
            <span className="num text-[var(--text)]">
              {clamped} / {safeMax}
            </span>
          )}
        </div>
      )}
      <div
        className="h-4 w-full overflow-hidden rounded-full border-2 border-[var(--ink-surface)] bg-[var(--floral-white)] p-0.5"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={safeMax}
      >
        {clamped > 0 && (
          <motion.div
            initial={prefersReduced ? { width: `${pct}%` } : { width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className={`anim-stripe-slide h-full rounded-full ${BAR_CLASSES[tone]}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(27,35,56,0.1) 0, rgba(27,35,56,0.1) 7px, transparent 7px, transparent 14px)",
              backgroundSize: "28px 28px",
            }}
          />
        )}
      </div>
    </div>
  );
}
