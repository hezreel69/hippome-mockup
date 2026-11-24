"use client";

import React from "react";
import Link from "next/link";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { SPM_SUBJECTS, SUBJECT_MAP, getTopicById } from "@/data/subjects";
import {
  LEVEL_LABELS,
  MILESTONE_REWARD_CONFIG,
  QUIZZES_TO_LEVEL_UP,
} from "@/lib/config";
import { AppShell } from "@/components/hippome/AppShell";
import { BRAND_LIST, BrandLogo } from "@/components/hippome/BrandLogo";
import { HippomeAvatarSlot } from "@/components/hippome/HippomeAvatarSlot";
import { SubjectCard } from "@/components/hippome/SubjectCard";
import { VoucherCard } from "@/components/hippome/VoucherCard";
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
  const { activeUser, redeemVoucher } = useHippomeStore();

  if (!activeUser) return null;

  const firstName = activeUser.name.trim().split(/\s+/)[0] || activeUser.name;

  const totalTaken = activeUser.quizHistory.length;
  const totalPassed = activeUser.quizHistory.filter((q) => q.passed).length;
  const passRate =
    totalTaken > 0 ? Math.round((totalPassed / totalTaken) * 100) : 0;

  const availableVouchers = activeUser.vouchers.filter((v) => !v.redeemedAt);
  const availableValueRm = availableVouchers.reduce(
    (sum, v) => sum + v.valueRm,
    0
  );
  const totalRewardRm = activeUser.vouchers.reduce(
    (sum, v) => sum + v.valueRm,
    0
  );

  const assessedSubjects = SPM_SUBJECTS.filter(
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

  const firstUnassessed = SPM_SUBJECTS.find(
    (s) => activeUser.subjectProgress[s.id]?.level === null
  );

  let coachFinding =
    "Pick your first Form 5 SPM subject below and knock out a 6-question check-up to start winning RM5 to RM20 vouchers.";
  let coachActionHref = firstUnassessed
    ? `/subjects/${firstUnassessed.id}/assessment`
    : `/subjects/${SPM_SUBJECTS[0].id}`;
  let coachActionLabel = firstUnassessed
    ? `Start ${firstUnassessed.name} Check-up`
    : "Open Subjects";

  if (priorityItem && priorityItem.progress.level) {
    const remaining =
      QUIZZES_TO_LEVEL_UP - priorityItem.progress.quizzesPassedAtCurrentLevel;
    const milestoneRm =
      MILESTONE_REWARD_CONFIG[priorityItem.progress.level].valueRm;
    const weakest = priorityItem.progress.weakestTopicId
      ? getTopicById(
          priorityItem.subject.id,
          priorityItem.progress.weakestTopicId
        )
      : null;

    coachActionHref = weakest
      ? `/subjects/${priorityItem.subject.id}/quiz/${weakest.id}`
      : `/subjects/${priorityItem.subject.id}`;
    coachActionLabel = weakest
      ? `Play ${priorityItem.subject.name}`
      : `Open ${priorityItem.subject.name}`;

    coachFinding =
      remaining === 1
        ? `1 more pass in ${priorityItem.subject.name} wins your RM${milestoneRm} level-up voucher.${weakest ? ` Try "${weakest.name}" next.` : ""}`
        : `You are ${LEVEL_LABELS[priorityItem.progress.level]} in ${priorityItem.subject.name} (${priorityItem.progress.quizzesPassedAtCurrentLevel}/${QUIZZES_TO_LEVEL_UP} stamps).${weakest ? ` Focus on "${weakest.name}" next.` : ""}`;
  }

  return (
    <AppShell pageTitle="Study Home">
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

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <Sticker tone="aqua" tilt={-2}>
              <span className="text-micro">
                {assessedSubjects.length}/{SPM_SUBJECTS.length} subjects placed ·{" "}
                {availableVouchers.length} vouchers ready
              </span>
            </Sticker>

            <SplitText
              text={`Yo ${firstName}, jom study!`}
              by="word"
              stagger={0.06}
              className="text-mega text-[var(--ink-surface)]"
            />

            <div className="sticker max-w-xl bg-[var(--surface)] p-5">
              <p className="text-micro mb-1.5 text-[var(--muted)]">
                Hippome says
              </p>
              <p className="text-base font-semibold leading-relaxed text-[var(--text)]">
                {coachFinding}
              </p>
            </div>

            <div className="pt-1">
              <Link href={coachActionHref}>
                <Button variant="aqua" size="xl" magnetic>
                  <span>{coachActionLabel}</span>
                  <ChevronRightIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <HippomeAvatarSlot expression="happy" size="mega" floating />
          </div>
        </div>
      </section>

      {/* 2. WALLET STRIP (Midnight Ink Block) */}
      <section className="relative border-y-2 border-[var(--ink-surface)] bg-[var(--ink-surface)] py-14 text-[var(--floral-white)] sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-micro text-[var(--pearl-aqua)]">
                  Total vouchers earned
                </p>
                <div className="font-display text-mega mt-2 text-[var(--pearl-aqua)]">
                  <RollingNumber value={`RM${totalRewardRm}`} />
                </div>
                <p className="num mt-3 text-sm font-medium text-[var(--lavender)]">
                  RM{availableValueRm} ready to redeem ·{" "}
                  {activeUser.vouchers.length} total vouchers
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Sticker tone="periwinkle" tilt={-3}>
                  <span className="num font-display text-lg font-extrabold">
                    {totalPassed}/{totalTaken} passed
                  </span>
                </Sticker>
                <Sticker tone="floral" tilt={2.5}>
                  <span className="num font-display text-lg font-extrabold">
                    {passRate}% pass rate
                  </span>
                </Sticker>
                <Link href="/rewards">
                  <Button variant="aqua" size="lg" magnetic>
                    <span>Open Wallet</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Brand Marquee */}
        <div className="mt-12 border-t-2 border-[#2c3858] pt-8">
          <Marquee
            speed={28}
            items={BRAND_LIST.map((brand) => (
              <div
                key={brand}
                className="inline-flex items-center gap-2.5 rounded-full border-2 border-[var(--pearl-aqua)]/40 bg-[var(--ink-surface-raised)] px-4 py-2"
              >
                <BrandLogo brand={brand} size={28} wobble={false} />
                <span className="font-display text-sm font-bold text-[var(--floral-white)]">
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
                <p className="text-micro text-[var(--ink-surface)]/75">
                  Form 5 SPM
                </p>
                <h2 className="text-display mt-1 text-[var(--ink-surface)]">
                  Pick your battle
                </h2>
              </div>
              <Sticker tone="ink" tilt={2}>
                <span className="text-micro text-[var(--pearl-aqua)]">
                  3 passes = milestone bonus
                </span>
              </Sticker>
            </div>
          </Reveal>

          {/* Mobile scroll-snap carousel / Desktop grid */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
            {SPM_SUBJECTS.map((subject, idx) => (
              <div
                key={subject.id}
                className="w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-auto"
              >
                <SubjectCard
                  subject={subject}
                  progress={activeUser.subjectProgress[subject.id]}
                  index={idx}
                />
              </div>
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
          <div className="space-y-5 lg:col-span-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-micro text-[var(--muted)]">Your stash</p>
                <h2 className="text-heading mt-1 text-[var(--text)]">
                  Latest Vouchers
                </h2>
              </div>
              <Link
                href="/rewards"
                className="text-micro text-[var(--ink-surface)] underline decoration-2 underline-offset-4 hover:text-[var(--accent-strong)]"
              >
                View all ({activeUser.vouchers.length})
              </Link>
            </div>

            {activeUser.vouchers.length === 0 ? (
              <div className="sticker bg-[var(--raised)] p-7 text-center">
                <p className="font-display text-lg font-bold text-[var(--text)]">
                  No vouchers in your wallet yet
                </p>
                <p className="mt-1.5 text-sm text-[var(--muted)]">
                  Pass your first 5-question quiz (3/5) to claim a TNG, Mixue,
                  or 7-Eleven reward.
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
          <div className="space-y-5 lg:col-span-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-micro text-[var(--muted)]">Activity</p>
                <h2 className="text-heading mt-1 text-[var(--text)]">
                  Recent Quiz Runs
                </h2>
              </div>
              <span className="num text-micro text-[var(--muted)]">
                {totalTaken} total
              </span>
            </div>

            {activeUser.quizHistory.length === 0 ? (
              <div className="rounded-[28px] border-2 border-dashed border-[var(--ink-surface)] bg-[var(--surface)] p-7 text-center">
                <p className="font-display text-lg font-bold text-[var(--text)]">
                  Belum ada lagi. Jom start!
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Complete a quick check-up to record your first run.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeUser.quizHistory.slice(0, 4).map((attempt, idx) => {
                  const subj = SUBJECT_MAP[attempt.subjectId];
                  const topic = getTopicById(
                    attempt.subjectId,
                    attempt.topicId
                  );
                  return (
                    <Reveal key={attempt.id} delay={idx * 0.05}>
                      <div
                        className="sticker flex items-center justify-between gap-4 bg-[var(--surface)] px-5 py-4"
                        style={{
                          transform: `rotate(${idx % 2 === 0 ? -0.6 : 0.6}deg)`,
                        }}
                      >
                        <div className="min-w-0">
                          <p className="font-display truncate text-base font-bold text-[var(--text)]">
                            {subj?.name ?? attempt.subjectId}
                          </p>
                          <p className="truncate text-xs font-medium text-[var(--muted)]">
                            {topic?.name ?? attempt.topicId} ·{" "}
                            {LEVEL_LABELS[attempt.level]}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          <span className="font-display num text-2xl font-extrabold text-[var(--text)]">
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
            <span key="1" className="font-display text-lg font-extrabold tracking-[-0.02em]">
              KEEP GRINDING ✦
            </span>,
            <span key="2" className="font-display text-lg font-extrabold tracking-[-0.02em]">
              SPM 2026 ✦
            </span>,
            <span key="3" className="font-display text-lg font-extrabold tracking-[-0.02em]">
              EARN REAL VOUCHERS ✦
            </span>,
            <span key="4" className="font-display text-lg font-extrabold tracking-[-0.02em]">
              NO CAP ✦
            </span>,
          ]}
        />
      </footer>
    </AppShell>
  );
}
