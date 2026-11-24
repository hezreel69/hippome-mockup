"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandLogo } from "@/components/mnemo/BrandLogo";

const SHOWCASE_SLIDES = [
  {
    brand: "Mixue",
    value: "RM5",
    label: "RM5 Mixue voucher",
    code: "MIX5-XXXX-4812",
    bg: "bg-[var(--periwinkle-soft)]",
  },
  {
    brand: "ZUS Coffee",
    value: "RM10",
    label: "RM10 ZUS Coffee voucher",
    code: "ZUS10-XXXX-9034",
    bg: "bg-[var(--raised)]",
  },
  {
    brand: "TNG eWallet",
    value: "RM20",
    label: "RM20 TNG eWallet voucher",
    code: "TNG20-XXXX-2271",
    bg: "bg-[var(--wisteria-soft)]",
  },
  {
    brand: "CHAGEE",
    value: "RM50",
    label: "RM50 CHAGEE voucher",
    code: "CHG50-XXXX-6619",
    bg: "bg-[var(--accent-soft)]",
  },
  {
    brand: "Shopee",
    value: "RM100",
    label: "RM100 Shopee voucher",
    code: "SHP100-XXXX-1108",
    bg: "bg-[var(--floral-white)]",
  },
] as const;

export function VoucherShowcase() {
  const prefersReduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SHOWCASE_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const slide = SHOWCASE_SLIDES[index];

  return (
    <div
      className="pointer-events-none select-none space-y-4"
      aria-label="Sample vouchers you can win"
      style={{ "--ticket-bg": "var(--ink-surface)" } as React.CSSProperties}
    >
      <div className="relative min-h-[250px] w-full max-w-xl overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={slide.brand}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { x: 80, opacity: 0, rotate: 2 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { x: 0, opacity: 1, rotate: -1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { x: -80, opacity: 0, rotate: -3 }
            }
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className={`voucher-ticket w-full rounded-[28px] border-2 border-[var(--ink-surface)] p-7 text-[var(--ink-surface)] shadow-[6px_6px_0_var(--pearl-aqua)] sm:p-8 ${slide.bg}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <BrandLogo brand={slide.brand} size={84} wobble={false} />
                <div>
                  <p className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                    {slide.brand}
                  </p>
                  <p className="text-sm font-bold text-[var(--muted)]">
                    {slide.label}
                  </p>
                </div>
              </div>

              <span className="font-display num text-heading font-extrabold text-[var(--ink-surface)]">
                {slide.value}
              </span>
            </div>

            <div className="voucher-ticket-divider mt-6 pt-4 flex items-center justify-between">
              <code className="rounded-full border-2 border-[var(--ink-surface)] bg-[var(--surface)] px-3.5 py-1 text-xs font-extrabold">
                {slide.code}
              </code>
              <span className="rounded-full border-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)] px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider">
                Voucher
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative slideshow dots */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {SHOWCASE_SLIDES.map((s, i) => (
          <span
            key={s.brand}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-[var(--pearl-aqua)]"
                : "w-2.5 bg-[var(--floral-white)]/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
