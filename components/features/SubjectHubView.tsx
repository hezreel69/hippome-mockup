"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import {
  getMilestoneRewardTemplate,
  getQuizRewardTemplate,
  rewardLabel,
} from "@/data/reward-map";
import { getSubjectById } from "@/data/subjects";
import { LEVEL_LABELS, QUIZZES_TO_LEVEL_UP } from "@/lib/config";
import { LEVEL_TONE } from "@/lib/level-style";
import { AppShell } from "@/components/mnemo/AppShell";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import { HippomeAvatar } from "@/components/avatar/HippomeAvatar";
import { SplitText, Sticker } from "@/components/motion";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  ChevronRightIcon,
  SparklesIcon,
  StampTrack,
} from "@/components/ui";
import { SubjectId } from "@/types/mnemo";

const SUBJECT_HERO_BG: Record<SubjectId, string> = {
  sejarah: "bg-[var(--pearl-aqua)]",
  mathematics: "bg-[var(--periwinkle)]",
};

export function SubjectHubView({ subjectId }: { subjectId: SubjectId }) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser } = useMnemoStore();

  const subject = getSubjectById(subjectId);
  const progress = activeUser?.subjectProgress[subjectId];

  useEffect(() => {
    if (!isHydrated || !activeUser) return;
    if (!progress?.level) {
      router.replace(`/subjects/${subjectId}/assessment`);
    }
  }, [isHydrated, activeUser, progress?.level, subjectId, router]);

  if (!activeUser || !subject || !progress?.level) {
    return (
      <AppShell pageTitle={subject?.name ?? "Subject"}>
        <div className="py-12 text-center font-display text-lg font-bold text-[var(--muted)]">
          Checking your {subject?.name ?? subjectId} level...
        </div>
      </AppShell>
    );
  }

  const currentLevel = progress.level;
  const quizTemplate = getQuizRewardTemplate(subjectId, currentLevel);
  const bonusTemplate = getMilestoneRewardTemplate(subjectId, currentLevel);
  const remainingToLevelUp =
    QUIZZES_TO_LEVEL_UP - progress.quizzesPassedAtCurrentLevel;

  const heroBg = SUBJECT_HERO_BG[subjectId] ?? "bg-[var(--pearl-aqua)]";

  return (
    <AppShell pageTitle={subject.name}>
      {/* Hero Banner */}
      <section
        className={`border-b-2 border-[var(--ink-surface)] px-5 py-10 text-[var(--ink-surface)] sm:px-8 sm:py-14 ${heroBg}`}
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={LEVEL_TONE[currentLevel]}>
                {LEVEL_LABELS[currentLevel]}
              </Badge>
              <Sticker tone="floral" tilt={1.5}>
                <BrandLogo
                  brand={quizTemplate.brand}
                  size={22}
                  wobble={false}
                />
                <span className="font-display text-xs font-extrabold">
                  Win: {rewardLabel(quizTemplate)}
                </span>
              </Sticker>
            </div>

            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                <span>Home</span>
              </Button>
            </Link>
          </div>

          <SplitText
            text={subject.name}
            by="word"
            stagger={0.05}
            className="text-display text-[var(--ink-surface)]"
          />
          <p className="font-display max-w-2xl text-lg font-extrabold text-[var(--ink-surface)]/85 sm:text-2xl">
            {subject.tagline}
          </p>

          <div className="grid gap-6 pt-2 lg:grid-cols-12">
            <div className="sticker flex flex-col justify-between gap-4 bg-[var(--ink-surface)] p-6 text-[var(--floral-white)] lg:col-span-5">
              <div>
                <p className="text-micro text-[var(--pearl-aqua)]">
                  Stamp card
                </p>
                <p className="font-display mt-1 text-2xl font-extrabold text-[var(--pearl-aqua)]">
                  Bonus: {rewardLabel(bonusTemplate)}
                </p>
              </div>

              <div className="rounded-[18px] bg-[var(--ink-surface-raised)] p-4">
                <StampTrack
                  tone="dark"
                  passedCount={progress.quizzesPassedAtCurrentLevel}
                  targetCount={QUIZZES_TO_LEVEL_UP}
                  rewardLabel={`${remainingToLevelUp} ${remainingToLevelUp === 1 ? "pass" : "passes"} to go`}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <HippomeAvatar
                message={`Pass ${remainingToLevelUp} more ${remainingToLevelUp === 1 ? "quiz" : "quizzes"} to level up and win a ${rewardLabel(bonusTemplate)}!`}
                expression="happy"
                floating
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two Quizzes: Random & Demo */}
      <section className="mx-auto max-w-7xl space-y-6 px-5 py-12 sm:px-8 sm:py-16">
        <div>
          <p className="text-eyebrow text-[var(--muted)]">Choose a quiz</p>
          <h2 className="text-display mt-1 text-[var(--text)]">
            {LEVEL_LABELS[currentLevel]} Quizzes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1: Random Quiz */}
          <motion.article
            initial={prefersReduced ? false : { rotate: -1 }}
            whileHover={
              prefersReduced
                ? undefined
                : {
                    rotate: 0,
                    y: -6,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  }
            }
            className="sticker flex h-full flex-col justify-between gap-6 bg-[var(--surface)] p-5 sm:p-7"
          >
            <div className="space-y-4">
              <Badge tone={LEVEL_TONE[currentLevel]}>
                {LEVEL_LABELS[currentLevel]}
              </Badge>
              <h3 className="font-display text-2xl font-extrabold leading-tight text-[var(--text)] sm:text-4xl">
                Random Quiz
              </h3>
              <p className="text-base font-semibold text-[var(--muted)]">
                5 new questions every time.
              </p>

              <div className="flex items-center gap-2.5 rounded-[16px] border-2 border-[var(--ink-surface)]/15 bg-[var(--ground)] px-4 py-3">
                <BrandLogo
                  brand={quizTemplate.brand}
                  size={28}
                  wobble={false}
                />
                <span className="font-display text-sm font-extrabold text-[var(--text)]">
                  Win: {rewardLabel(quizTemplate)}
                </span>
              </div>
            </div>

            <Link href={`/subjects/${subjectId}/quiz/random`} className="block">
              <Button fullWidth size="lg" variant="primary" magnetic>
                <SparklesIcon className="h-4 w-4" />
                <span>Start</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </motion.article>

          {/* Card 2: Demo Quiz */}
          <motion.article
            initial={prefersReduced ? false : { rotate: 1 }}
            whileHover={
              prefersReduced
                ? undefined
                : {
                    rotate: 0,
                    y: -6,
                    transition: { type: "spring", stiffness: 300, damping: 18 },
                  }
            }
            className="sticker flex h-full flex-col justify-between gap-6 bg-[var(--accent-soft)] p-5 sm:p-7"
          >
            <div className="space-y-4">
              <Badge tone="ink">DEMO</Badge>
              <h3 className="font-display text-2xl font-extrabold leading-tight text-[var(--text)] sm:text-4xl">
                Demo Quiz
              </h3>
              <p className="text-base font-semibold text-[var(--ink-surface)]/80">
                Correct answers are marked. Try passing or failing.
              </p>

              <div className="flex items-center gap-2.5 rounded-[16px] border-2 border-[var(--ink-surface)]/15 bg-[var(--surface)] px-4 py-3">
                <BrandLogo
                  brand={quizTemplate.brand}
                  size={28}
                  wobble={false}
                />
                <span className="font-display text-sm font-extrabold text-[var(--text)]">
                  Win: {rewardLabel(quizTemplate)}
                </span>
              </div>
            </div>

            <Link href={`/subjects/${subjectId}/quiz/demo`} className="block">
              <Button fullWidth size="lg" variant="aqua" magnetic>
                <span>Try the demo</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </motion.article>
        </div>
      </section>
    </AppShell>
  );
}
