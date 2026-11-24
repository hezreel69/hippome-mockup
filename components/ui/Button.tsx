"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "aqua";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  magnetic?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--floral-white)] border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--primary-hover)] disabled:opacity-45",
  aqua:
    "bg-[var(--accent)] text-[var(--ink-surface)] border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[#64bebd] disabled:opacity-45",
  secondary:
    "bg-[var(--periwinkle-soft)] text-[var(--ink-surface)] border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--periwinkle)]",
  outline:
    "bg-[var(--surface)] text-[var(--ink-surface)] border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--raised)]",
  ghost:
    "bg-transparent text-[var(--muted)] border-2 border-transparent hover:bg-[var(--raised)] hover:text-[var(--text)]",
  danger:
    "bg-[var(--negative)] text-white border-2 border-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[#991d2a]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-[36px] px-3.5 py-1.5 text-[13px] rounded-full",
  md: "min-h-[44px] sm:min-h-[42px] px-4.5 py-2 text-sm rounded-full",
  lg: "min-h-[50px] px-6 py-2.5 text-[15px] rounded-full",
  xl: "font-display min-h-[64px] px-8 py-3.5 text-xl tracking-[-0.02em] rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  magnetic = false,
  className = "",
  type = "button",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const prefersReduced = useReducedMotion();

  const btn = (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={
        disabled || prefersReduced ? undefined : { y: -2, scale: 1.01 }
      }
      whileTap={
        disabled || prefersReduced
          ? undefined
          : { y: 1, scale: 0.94, boxShadow: "0px 0px 0 var(--ink-surface)" }
      }
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 font-bold cursor-pointer disabled:cursor-not-allowed transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  );

  if (magnetic && !disabled) {
    return (
      <Magnetic className={fullWidth ? "w-full" : undefined}>{btn}</Magnetic>
    );
  }

  return btn;
}
