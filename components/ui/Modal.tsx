"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#1b2338]/60 backdrop-blur-xs sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={
              prefersReduced
                ? false
                : { opacity: 0, y: 40, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.97 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="pb-safe-dock max-h-[88dvh] w-full overflow-y-auto rounded-t-[28px] border-2 border-[var(--ink-surface)] bg-[var(--surface)] p-5 shadow-[6px_6px_0_var(--ink-surface)] sm:max-w-lg sm:rounded-[28px] sm:p-6"
          >
            <div
              aria-hidden="true"
              className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-[var(--ink-surface)]/25 sm:hidden"
            />
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-[var(--text)]">
                {title}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close dialog"
                className="min-h-[36px] min-w-[36px] px-2"
              >
                <CloseIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm leading-relaxed text-[var(--text)]">
              {children}
            </div>
            {footer && (
              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
