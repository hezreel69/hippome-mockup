"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { playPop } from "@/lib/sound";
import { AppShell } from "@/components/hippome/AppShell";
import { BRAND_LIST, BrandLogo } from "@/components/hippome/BrandLogo";
import { VoucherCard } from "@/components/hippome/VoucherCard";
import {
  Confetti,
  Marquee,
  Reveal,
  SplitText,
  Sticker,
} from "@/components/motion";
import {
  Badge,
  Button,
  ChevronDownIcon,
  RollingNumber,
} from "@/components/ui";

type VoucherFilter = "all" | "available" | "redeemed";

const REWARD_TIERS = [
  {
    level: "Beginner",
    quizReward: "RM5 / pass",
    milestone: "RM30 bonus (3 passes)",
    brands: "TNG eWallet, Mixue, 7-Eleven, FamilyMart",
    tone: "success" as const,
  },
  {
    level: "Intermediate",
    quizReward: "RM10 / pass",
    milestone: "RM50 bonus (3 passes)",
    brands: "ZUS Coffee, CHAGEE, 7-Eleven, Tealive",
    tone: "info" as const,
  },
  {
    level: "Advanced",
    quizReward: "RM20 / pass",
    milestone: "RM100 bonus (every 3 passes)",
    brands: "TNG eWallet, ZUS Coffee, CHAGEE, GrabFood, Shopee",
    tone: "ink" as const,
  },
];

export function RewardsView() {
  const prefersReduced = useReducedMotion();
  const { activeUser, redeemVoucher } = useHippomeStore();
  const [filter, setFilter] = useState<VoucherFilter>("all");
  const [mobileLadderOpen, setMobileLadderOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  if (!activeUser) return null;

  const availableVouchers = activeUser.vouchers.filter((v) => !v.redeemedAt);
  const redeemedVouchers = activeUser.vouchers.filter((v) =>
    Boolean(v.redeemedAt)
  );

  const filteredVouchers =
    filter === "available"
      ? availableVouchers
      : filter === "redeemed"
        ? redeemedVouchers
        : activeUser.vouchers;

  const totalValueRm = activeUser.vouchers.reduce(
    (sum, v) => sum + v.valueRm,
    0
  );
  const availableValueRm = availableVouchers.reduce(
    (sum, v) => sum + v.valueRm,
    0
  );

  const tabs: { id: VoucherFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: activeUser.vouchers.length },
    { id: "available", label: "Ready", count: availableVouchers.length },
    { id: "redeemed", label: "Redeemed", count: redeemedVouchers.length },
  ];

  const handleRedeem = (voucherId: string) => {
    playPop(true);
    setBurstKey((k) => k + 1);
    redeemVoucher(voucherId);
  };

  return (
    <AppShell pageTitle="Voucher Wallet">
      {burstKey > 0 && (
        <Confetti key={burstKey} active count={40} spread="fullscreen" />
      )}

      {/* Midnight Ink Hero Balance Band */}
      <section className="border-b-2 border-[var(--ink-surface)] bg-[var(--ink-surface)] px-5 py-12 text-[var(--floral-white)] sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SplitText
              text="Voucher Wallet"
              by="word"
              stagger={0.06}
              className="text-display text-[var(--floral-white)]"
            />
            <Link href="/dashboard">
              <Button variant="aqua" size="sm">
                Back to Study Home
              </Button>
            </Link>
          </div>

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-micro text-[var(--pearl-aqua)]">
                Ready to redeem
              </p>
              <div className="font-display text-mega mt-2 text-[var(--pearl-aqua)]">
                <RollingNumber value={`RM${availableValueRm}`} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Sticker tone="periwinkle" tilt={-2}>
                  <span className="num text-xs font-extrabold">
                    Lifetime: RM{totalValueRm}
                  </span>
                </Sticker>
                <Sticker tone="floral" tilt={2}>
                  <span className="num text-xs font-extrabold">
                    {activeUser.vouchers.length} collected
                  </span>
                </Sticker>
              </div>
            </div>

            {/* Reward Payout Ladder */}
            <div className="sticker bg-[var(--surface)] p-5 text-[var(--ink-surface)] lg:col-span-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-extrabold">
                    Reward Payout Ladder
                  </h2>
                  <p className="text-xs text-[var(--muted)]">
                    Pass 3 quizzes at a level to win the milestone bonus
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileLadderOpen((v) => !v)}
                  aria-expanded={mobileLadderOpen}
                  className="inline-flex min-h-[36px] cursor-pointer items-center gap-1 rounded-full border-2 border-[var(--ink-surface)] bg-[var(--raised)] px-3 text-xs font-bold sm:hidden"
                >
                  <span>{mobileLadderOpen ? "Hide" : "Show"}</span>
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      mobileLadderOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              <div
                className={`mt-4 space-y-2.5 ${
                  mobileLadderOpen ? "block" : "hidden sm:block"
                }`}
              >
                {REWARD_TIERS.map((tier) => (
                  <div
                    key={tier.level}
                    className="flex flex-col justify-between gap-2 rounded-[16px] border-2 border-[var(--ink-surface)]/15 bg-[var(--ground)] px-4 py-3 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge tone={tier.tone}>{tier.level}</Badge>
                        <span className="num text-sm font-extrabold">
                          {tier.quizReward}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--muted)]">{tier.brands}</p>
                    </div>
                    <span className="num shrink-0 text-xs font-extrabold text-[var(--positive)]">
                      {tier.milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2c3858] pt-6">
          <Marquee
            speed={24}
            items={BRAND_LIST.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--pearl-aqua)]/40 bg-[var(--ink-surface-raised)] px-3.5 py-1.5 text-xs font-bold text-[var(--floral-white)]"
              >
                <BrandLogo brand={b} size={24} wobble={false} />
                <span>{b}</span>
              </span>
            ))}
          />
        </div>
      </section>

      {/* Vouchers Collection */}
      <section
        className="mx-auto max-w-7xl space-y-6 px-5 py-12 sm:px-8 sm:py-16"
        style={{ "--ticket-bg": "var(--ground)" } as React.CSSProperties}
      >
        <div
          role="tablist"
          aria-label="Filter vouchers"
          className="flex flex-wrap items-center gap-3"
        >
          {tabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`relative cursor-pointer rounded-full border-2 border-[var(--ink-surface)] px-5 py-2 text-sm font-bold transition-colors ${
                  active
                    ? "text-[var(--ink-surface)]"
                    : "bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="wallet-filter-pill"
                    transition={{ type: "spring", stiffness: 340, damping: 26 }}
                    className="absolute inset-0 rounded-full bg-[var(--pearl-aqua)]"
                  />
                )}
                <span className="relative z-10">
                  {tab.label}{" "}
                  <span className="num ml-1 opacity-75">{tab.count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {filteredVouchers.length === 0 ? (
          <div className="sticker bg-[var(--raised)] py-12 text-center">
            <p className="font-display text-xl font-bold text-[var(--text)]">
              No {filter === "all" ? "" : `${filter} `}vouchers yet
            </p>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Finish a 5-question SPM quiz with 3/5 or higher to earn your next
              voucher.
            </p>
            <Link href="/dashboard" className="mt-5 inline-block">
              <Button variant="aqua" size="lg" magnetic>
                Pick a Subject Quiz
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredVouchers.map((voucher, idx) => (
              <Reveal key={voucher.id} delay={prefersReduced ? 0 : idx * 0.04}>
                <VoucherCard
                  voucher={voucher}
                  onRedeem={handleRedeem}
                  tilt={idx % 2 === 0 ? -1.2 : 1.2}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
