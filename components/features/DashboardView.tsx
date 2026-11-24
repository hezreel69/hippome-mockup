"use client";

import React from "react";
import Link from "next/link";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import { getMilestoneRewardTemplate, rewardLabel } from "@/data/reward-map";
import { SUBJECTS, SUBJECT_MAP } from "@/data/subjects";
import { LEVEL_LABELS, QUIZZES_TO_LEVEL_UP } from "@/lib/config";
import { LEVEL_TONE } from "@/lib/level-style";
import { AppShell } from "@/components/mnemo/AppShell";
import { BRAND_LIST, BrandLogo } from "@/components/mnemo/BrandLogo";
import { HippomeAvatarSlot } from "@/components/avatar/HippomeAvatarSlot";
import { SubjectCard } from "@/components/mnemo/SubjectCard";
import { VoucherCard } from "@/components/mnemo/VoucherCard";
import {
  Blob,
  Marquee,
  Reveal,
  SplitText,
  Sticker,
} from "@/components/motion";
import {
  Badge,
  Button,
  ChevronRightIcon,
  RollingNumber,
} from "@/components/ui";

export function DashboardView() {
  const { activeUser, redeemVoucher } = useMnemoStore();

  if (!activeUser) return null;

  const firstName = activeUser.name.trim().split(/\s+/)[0] || activeUser.name;

  const availableVouchers = activeUser.vouchers.filter((v) => !v.redeemedAt);

  const assessedSubjects = SUBJECTS.filter(
    (s) => activeUser.subjectProgress[s.id]?.level !== null
  );

  const priorityItem = assessedSubjects
    .map((s) => ({
      subject: s,
      progress: activeUser.subjectProgress[s.id],
    }))
    .sort(
      (a, b) =>
        b.progress.quizzesPassedAtCurrentLevel -
        a.progress.quizzesPassedAtCurrentLevel
    )[0];

  const firstUnassessed = SUBJECTS.find(
    (s) => activeUser.subjectProgress[s.id]?.level === null
  );

  let coachFinding = `Start your ${SUBJECTS[0].name} check-up to find your level.`;
  let coachActionHref = firstUnassessed
    ? `/subjects/${firstUnassessed.id}/assessment`
    : `/subjects/${SUBJECTS[0].id}`;
  let coachActionLabel = firstUnassessed
    ? `Start ${firstUnassessed.name} Check-up`
    : `Open ${SUBJECTS[0].name}`;

  if (priorityItem && priorityItem.progress.level) {
    const remaining =
      QUIZZES_TO_LEVEL_UP - priorityItem.progress.quizzesPassedAtCurrentLevel;
    const bonusTemplate = getMilestoneRewardTemplate(
      priorityItem.subject.id,
      priorityItem.progress.level
    );

    coachActionHref = `/subjects/${priorityItem.subject.id}`;
    coachActionLabel = `Play ${priorityItem.subject.name}`;

    coachFinding =
      remaining === 1
        ? `1 more pass in ${priorityItem.subject.name} wins a ${rewardLabel(bonusTemplate)}.`
        : `You're ${LEVEL_LABELS[priorityItem.progress.level]} in ${priorityItem.subject.name}. Pass ${remaining} more quizzes for a ${rewardLabel(bonusTemplate)}.`;
  }

  return (
    <AppShell pageTitle="Mnemo">
      {/* 1. HERO STAGE (Floral White, Full-Bleed) */}
      <section className="relative overflow-hidden bg-[var(--ground)] px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24">
        <Blob
          color="aqua"
          size={440}
          parallax={90}
          className="absolute -top-24 -right-24 opacity-50"
        />
        <Blob
          color="periwinkle"
          size={360}
          parallax={-60}
          className="absolute -bottom-24 -left-24 opacity-45"
        />

        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          <SplitText
            text={`Hi ${firstName}, ready to learn?`}
            by="word"
            stagger={0.055}
            className="text-giga text-[var(--ink-surface)]"
          />

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="sticker max-w-2xl bg-[var(--surface)] p-5 sm:p-6">
                <p className="text-micro mb-1.5 text-[var(--muted)]">
                  Hippome says
                </p>
                <p className="text-lg font-bold leading-snug text-[var(--text)]">
                  {coachFinding}
                </p>
              </div>

              <div>
                <Link href={coachActionHref}>
                  <Button variant="aqua" size="xl" magnetic>
                    <span>{coachActionLabel}</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-4 lg:justify-end">
              <HippomeAvatarSlot expression="happy" size="xl" floating />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WALLET STRIP (Midnight Ink Block) */}
      <section className="relative border-y-2 border-[var(--ink-surface)] bg-[var(--ink-surface)] py-16 text-[var(--floral-white)] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-eyebrow text-[var(--pearl-aqua)]">
                  Vouchers earned
                </p>
                <div className="font-display text-giga mt-2 text-[var(--pearl-aqua)]">
                  <RollingNumber value={`${activeUser.vouchers.length}`} />
                </div>
                <p className="mt-3 text-xl font-extrabold text-[var(--lavender)]">
                  {activeUser.vouchers.length === 1 ? "voucher" : "vouchers"} in
                  your wallet
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <Sticker
                  tone="periwinkle"
                  tilt={-2.5}
                  className="px-6 py-3"
                >
                  <span className="num font-display text-2xl font-extrabold">
                    {availableVouchers.length} ready to use
                  </span>
                </Sticker>
                <Link href="/rewards">
                  <Button variant="aqua" size="xl" magnetic>
                    <span>Open Wallet</span>
                    <ChevronRightIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Brand Marquee */}
        <div className="mt-14 border-t-2 border-[#2c3858] pt-10">
          <Marquee
            speed={28}
            items={BRAND_LIST.map((brand) => (
              <div
                key={brand}
                className="inline-flex items-center gap-3.5 rounded-full border-2 border-[var(--pearl-aqua)]/50 bg-[var(--ink-surface-raised)] px-6 py-3"
              >
                <BrandLogo brand={brand} size={44} wobble={false} />
                <span className="font-display text-xl font-extrabold text-[var(--floral-white)]">
                  {brand}
                </span>
              </div>
            ))}
          />
        </div>
      </section>

      {/* 3. SUBJECTS STAGE (Periwinkle Block) */}
      <section className="relative overflow-hidden border-b-2 border-[var(--ink-surface)] bg-[var(--periwinkle)] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow text-[var(--ink-surface)]/80">
                  Subjects
                </p>
                <h2 className="text-display mt-2 text-[var(--ink-surface)]">
                  Pick your battle!
                </h2>
              </div>
              <Sticker tone="ink" tilt={2} className="px-5 py-2.5">
                <span className="font-display text-sm font-extrabold text-[var(--pearl-aqua)]">
                  Pass 3 quizzes for a bonus voucher
                </span>
              </Sticker>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {SUBJECTS.map((subject, idx) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                progress={activeUser.subjectProgress[subject.id]}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LATEST VOUCHERS & TIMELINE RIBBON (Floral White) */}
      <section
        className="bg-[var(--ground)] py-16 sm:py-24"
        style={{ "--ticket-bg": "var(--ground)" } as React.CSSProperties}
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
          {/* Latest Vouchers */}
          <div className="space-y-6 lg:col-span-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-eyebrow text-[var(--muted)]">Your stash</p>
                <h2 className="text-display mt-1 text-[var(--text)]">
                  Latest Vouchers
                </h2>
              </div>
              <Link
                href="/rewards"
                className="font-display text-lg font-extrabold text-[var(--ink-surface)] underline decoration-2 underline-offset-4 hover:text-[var(--accent-strong)]"
              >
                View all ({activeUser.vouchers.length})
              </Link>
            </div>

            {activeUser.vouchers.length === 0 ? (
              <div className="sticker bg-[var(--raised)] p-7 text-center">
                <p className="font-display text-xl font-bold text-[var(--text)]">
                  No vouchers in your wallet yet
                </p>
                <p className="mt-1.5 text-sm font-medium text-[var(--muted)]">
                  Pass your first 5-question quiz (3/5) to win a voucher.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeUser.vouchers.slice(0, 2).map((voucher, i) => (
                  <VoucherCard
                    key={voucher.id}
                    voucher={voucher}
                    onRedeem={redeemVoucher}
                    compact
                    tilt={i % 2 === 0 ? -1 : 1}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Quiz Runs Timeline Ribbon */}
          <div className="space-y-6 lg:col-span-6">
            <div>
              <p className="text-eyebrow text-[var(--muted)]">Activity</p>
              <h2 className="text-display mt-1 text-[var(--text)]">
                Recent Quiz Runs
              </h2>
            </div>

            {activeUser.quizHistory.length === 0 ? (
              <div className="rounded-[28px] border-2 border-dashed border-[var(--ink-surface)] bg-[var(--surface)] p-7 text-center">
                <p className="font-display text-xl font-bold text-[var(--text)]">
                  No quizzes yet. Take your first one!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeUser.quizHistory.slice(0, 3).map((attempt, idx) => {
                  const subj = SUBJECT_MAP[attempt.subjectId];
                  return (
                    <Reveal key={attempt.id} delay={idx * 0.05}>
                      <div
                        className="sticker flex items-center justify-between gap-4 bg-[var(--surface)] px-6 py-5"
                        style={{
                          transform: `rotate(${idx % 2 === 0 ? -0.6 : 0.6}deg)`,
                        }}
                      >
                        <div className="min-w-0 space-y-1">
                          <p className="font-display truncate text-2xl font-extrabold text-[var(--text)]">
                            {subj?.name ?? attempt.subjectId}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-[var(--muted)]">
                              {attempt.quizMode === "demo"
                                ? "Demo Quiz"
                                : "Random Quiz"}
                            </span>
                            <Badge tone={LEVEL_TONE[attempt.level]}>
                              {LEVEL_LABELS[attempt.level]}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-display num text-4xl font-extrabold text-[var(--text)]">
                            {attempt.score}/{attempt.totalQuestions}
                          </span>
                          <Badge tone={attempt.passed ? "success" : "highlight"}>
                            {attempt.passed ? "PASS" : "RETRY"}
                          </Badge>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. FOOTER MARQUEE */}
      <footer className="border-t-2 border-[var(--ink-surface)] bg-[var(--pearl-aqua)] py-4 text-[var(--ink-surface)]">
        <Marquee
          speed={22}
          items={[
            <span
              key="1"
              className="font-display text-lg font-extrabold tracking-[-0.02em]"
            >
              KEEP LEARNING ✦
            </span>,
            <span
              key="2"
              className="font-display text-lg font-extrabold tracking-[-0.02em]"
            >
              ONE QUIZ AT A TIME ✦
            </span>,
            <span
              key="3"
              className="font-display text-lg font-extrabold tracking-[-0.02em]"
            >
              EARN VOUCHERS ✦
            </span>,
            <span
              key="4"
              className="font-display text-lg font-extrabold tracking-[-0.02em]"
            >
              YOU CAN DO IT ✦
            </span>,
          ]}
        />
      </footer>
    </AppShell>
  );
}
