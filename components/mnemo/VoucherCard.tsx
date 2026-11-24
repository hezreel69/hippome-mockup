"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SUBJECT_MAP } from "@/data/subjects";
import { Voucher } from "@/types/mnemo";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import { Badge, Button, CheckIcon, CopyIcon } from "@/components/ui";

interface VoucherCardProps {
  voucher: Voucher;
  onRedeem?: (voucherId: string) => void;
  unveil?: boolean;
  compact?: boolean;
  tilt?: number;
}

const BRAND_CARD_TINTS: Record<string, string> = {
  "TNG eWallet": "bg-[var(--wisteria-soft)]",
  "ZUS Coffee": "bg-[var(--raised)]",
  CHAGEE: "bg-[var(--accent-soft)]",
  Mixue: "bg-[var(--periwinkle-soft)]",
  "7-Eleven": "bg-[var(--floral-white)]",
  FamilyMart: "bg-[var(--accent-soft)]",
  Tealive: "bg-[var(--periwinkle-soft)]",
  GrabFood: "bg-[var(--accent-soft)]",
  Popular: "bg-[var(--wisteria-soft)]",
  Shopee: "bg-[var(--periwinkle-soft)]",
};

export function VoucherCard({
  voucher,
  onRedeem,
  unveil = false,
  compact = false,
  tilt = 0,
}: VoucherCardProps) {
  const [copied, setCopied] = useState(false);
  const prefersReduced = useReducedMotion();

  const subjectName =
    SUBJECT_MAP[voucher.earnedFromSubjectId]?.name ??
    voucher.earnedFromSubjectId;
  const isRedeemed = Boolean(voucher.redeemedAt);

  const cardBg = isRedeemed
    ? "bg-[var(--lavender)]/60"
    : BRAND_CARD_TINTS[voucher.brand] ?? "bg-[var(--surface)]";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(voucher.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures in restricted browser contexts.
    }
  };

  return (
    <motion.article
      initial={prefersReduced ? false : { rotate: tilt }}
      whileHover={
        prefersReduced
          ? undefined
          : {
              rotate: 0,
              y: -4,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }
      }
      className={`voucher-ticket group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border-2 border-[var(--ink-surface)] shadow-[6px_6px_0_var(--ink-surface)] ${cardBg} ${
        compact ? "p-4" : "p-5"
      } ${unveil ? "anim-ticket-unveil" : ""}`}
    >
      {/* Large Low-Opacity Corner Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-4 opacity-10 -rotate-12 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0"
      >
        <BrandLogo brand={voucher.brand} size={120} wobble={false} />
      </div>

      {/* Top Stub: Brand Logo + Value */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <BrandLogo brand={voucher.brand} size={48} />
            <div className="min-w-0">
              <p className="font-display truncate text-base font-extrabold text-[var(--text)]">
                {voucher.brand}
              </p>
              <p className="text-xs font-semibold text-[var(--muted)]">
                {voucher.isMilestone ? "Bonus voucher" : "Quiz voucher"} ·{" "}
                {subjectName}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-display num text-2xl font-extrabold leading-none tracking-[-0.03em] text-[var(--text)]">
              RM{voucher.valueRm}
            </p>
            <span className="mt-1.5 inline-block">
              <Badge tone={isRedeemed ? "neutral" : "success"}>
                {isRedeemed ? "Redeemed" : "Ready"}
              </Badge>
            </span>
          </div>
        </div>

        {!compact && (
          <p className="text-xs font-medium leading-relaxed text-[var(--muted)]">
            {voucher.description}
          </p>
        )}
      </div>

      {/* Perforated Ticket Cutout & Code Stub */}
      <div className="voucher-ticket-divider relative z-10 mt-4 pt-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <code className="truncate rounded-full border-2 border-[var(--ink-surface)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-[var(--text)]">
              {voucher.code}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              aria-label={`Copy ${voucher.brand} voucher code`}
              className="min-h-[34px] px-2.5"
            >
              {copied ? (
                <>
                  <CheckIcon className="h-3.5 w-3.5 text-[var(--positive)]" />
                  <span className="text-xs text-[var(--positive)]">Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon className="h-3.5 w-3.5" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          </div>

          {!isRedeemed && onRedeem && (
            <Button
              size="sm"
              variant="aqua"
              onClick={() => onRedeem(voucher.id)}
              className="min-h-[36px]"
            >
              Redeem
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
