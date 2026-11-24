import React from "react";

type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "highlight"
  | "ink";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral:
    "bg-[var(--raised)] text-[var(--ink-surface)] border-[var(--ink-surface)]",
  info:
    "bg-[var(--wisteria-soft)] text-[var(--wisteria-ink)] border-[var(--ink-surface)]",
  success:
    "bg-[var(--pearl-aqua)] text-[var(--ink-surface)] border-[var(--ink-surface)]",
  warning:
    "bg-[var(--pill-warning-bg)] text-[var(--pill-warning-ink)] border-[var(--ink-surface)]",
  danger:
    "bg-[var(--pill-negative-bg)] text-[var(--pill-negative-ink)] border-[var(--ink-surface)]",
  highlight:
    "bg-[var(--periwinkle)] text-[var(--ink-surface)] border-[var(--ink-surface)]",
  ink:
    "bg-[var(--ink-surface)] text-[var(--accent-pop)] border-[var(--ink-surface)]",
};

interface BadgeProps {
  tone?: BadgeTone;
  tilt?: number;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  tone = "neutral",
  tilt,
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      style={
        typeof tilt === "number"
          ? { transform: `rotate(${tilt}deg)` }
          : undefined
      }
      className={`inline-flex flex-none whitespace-nowrap items-center gap-1.5 rounded-[var(--radius-pill)] border-2 px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] leading-5 ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
