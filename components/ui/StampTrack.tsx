"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckIcon } from "@/components/ui/icons";

interface StampTrackProps {
  passedCount: number;
  targetCount?: number;
  rewardLabel?: string;
  compact?: boolean;
  animateLatest?: boolean;
  tone?: "light" | "dark";
}

/**
 * Mnemo's 3-Stamp Loyalty Pass toward a bonus voucher.
 */
export function StampTrack({
  passedCount,
  targetCount = 3,
  rewardLabel,
  compact = false,
  animateLatest = false,
  tone = "light",
}: StampTrackProps) {
  const prefersReduced = useReducedMotion();
  const safeCount = Math.max(0, Math.min(passedCount, targetCount));
  const slots = Array.from({ length: targetCount }, (_, i) => i);

  const labelColor =
    tone === "dark" ? "text-[var(--pearl-aqua)]" : "text-[var(--text)]";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="flex items-center gap-2"
        role="img"
        aria-label={`${safeCount} of ${targetCount} quiz passes stamped${rewardLabel ? ` toward ${rewardLabel}` : ""}`}
      >
        {slots.map((idx) => {
          const isStamped = idx < safeCount;
          const isLatest = animateLatest && idx === safeCount - 1;
          const isFinalSlot = idx === targetCount - 1;

          return (
            <React.Fragment key={idx}>
              <motion.span
                initial={
                  isLatest && !prefersReduced
                    ? { scale: 2.1, rotate: -16, opacity: 0 }
                    : false
                }
                animate={
                  isLatest && !prefersReduced
                    ? { scale: 1, rotate: 0, opacity: 1 }
                    : undefined
                }
                transition={{ type: "spring", stiffness: 320, damping: 16 }}
                className={`inline-flex items-center justify-center rounded-full border-2 font-bold ${
                  compact ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm"
                } ${
                  isStamped
                    ? "border-[var(--ink-surface)] bg-[var(--pearl-aqua)] text-[var(--ink-surface)] shadow-[2px_2px_0_var(--ink-surface)]"
                    : isFinalSlot
                      ? "border-dashed border-[var(--ink-surface)] bg-[var(--periwinkle-soft)] text-[var(--periwinkle-ink)]"
                      : "border-dashed border-[var(--ink-surface)] bg-[var(--floral-white)] text-[var(--muted)]"
                }`}
              >
                {isStamped ? (
                  <CheckIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />
                ) : (
                  <span className="num">{idx + 1}</span>
                )}
              </motion.span>

              {idx < targetCount - 1 && (
                <span
                  aria-hidden="true"
                  className={`block h-[3px] w-3.5 rounded-full ${
                    idx < safeCount - 1
                      ? "bg-[var(--pearl-aqua)]"
                      : tone === "dark"
                        ? "bg-[var(--floral-white)]/30"
                        : "bg-[var(--border)]"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {rewardLabel && (
        <span className={`num text-sm font-extrabold ${labelColor}`}>
          {rewardLabel}
        </span>
      )}
    </div>
  );
}
