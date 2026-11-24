import React from "react";

type CardTone = "default" | "raised" | "ink" | "sticker" | "aqua" | "periwinkle" | "wisteria";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padded?: boolean;
  tone?: CardTone;
  tilt?: number;
}

const TONE_CLASSES: Record<CardTone, string> = {
  default:
    "bg-[var(--surface)] border-2 border-[var(--ink-surface)] text-[var(--text)] shadow-[4px_4px_0_var(--ink-surface)]",
  raised:
    "bg-[var(--raised)] border-2 border-[var(--ink-surface)] text-[var(--text)] shadow-[4px_4px_0_var(--ink-surface)]",
  ink:
    "bg-[var(--ink-surface)] border-2 border-[var(--ink-surface)] text-[var(--floral-white)] shadow-[6px_6px_0_var(--pearl-aqua)]",
  sticker:
    "bg-[var(--surface)] border-2 border-[var(--ink-surface)] text-[var(--text)] shadow-[6px_6px_0_var(--ink-surface)]",
  aqua:
    "bg-[var(--pearl-aqua)] border-2 border-[var(--ink-surface)] text-[var(--ink-surface)] shadow-[6px_6px_0_var(--ink-surface)]",
  periwinkle:
    "bg-[var(--periwinkle)] border-2 border-[var(--ink-surface)] text-[var(--ink-surface)] shadow-[6px_6px_0_var(--ink-surface)]",
  wisteria:
    "bg-[var(--wisteria)] border-2 border-[var(--ink-surface)] text-[var(--ink-surface)] shadow-[6px_6px_0_var(--ink-surface)]",
};

export function Card({
  padded = true,
  tone = "default",
  tilt,
  style,
  className = "",
  children,
  ...props
}: CardProps) {
  const mergedStyle =
    typeof tilt === "number"
      ? { transform: `rotate(${tilt}deg)`, ...style }
      : style;

  return (
    <div
      style={mergedStyle}
      className={`rounded-[var(--radius-sticker)] ${TONE_CLASSES[tone]} ${padded ? "p-5 sm:p-6" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={`font-display text-xl font-bold tracking-[-0.02em] text-[var(--text)] ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={`text-sm leading-relaxed text-[var(--muted)] ${className}`}>
      {children}
    </p>
  );
}
