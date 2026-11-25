"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import { playPop } from "@/lib/sound";
import { AppShell } from "@/components/mnemo/AppShell";
import { VoucherCard } from "@/components/mnemo/VoucherCard";
import { Confetti, Reveal, SplitText } from "@/components/motion";
import { Button } from "@/components/ui";

type VoucherFilter = "all" | "available" | "redeemed";

export function RewardsView() {
  const prefersReduced = useReducedMotion();
  const { activeUser, redeemVoucher } = useMnemoStore();
  const [filter, setFilter] = useState<VoucherFilter>("all");
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

      <section
        className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:space-y-8 sm:px-8 sm:py-14"
        style={{ "--ticket-bg": "var(--ground)" } as React.CSSProperties}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SplitText
            text="Voucher Wallet"
            by="word"
            stagger={0.06}
            className="text-display text-[var(--text)]"
          />
          <Link href="/dashboard">
            <Button variant="outline" size="md">
              Back Home
            </Button>
          </Link>
        </div>

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
                className={`relative cursor-pointer rounded-full border-2 border-[var(--ink-surface)] px-4 py-2 font-display text-sm font-extrabold transition-colors sm:px-6 sm:py-3 sm:text-lg ${
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
              Pass a 5-question quiz with 3/5 or higher to win your next voucher.
            </p>
            <Link href="/dashboard" className="mt-5 inline-block">
              <Button variant="aqua" size="lg" magnetic>
                Pick a Subject
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
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
