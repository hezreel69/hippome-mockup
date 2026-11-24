"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  getMilestoneRewardTemplate,
  getQuizRewardTemplate,
  rewardLabel,
} from "@/data/reward-map";
import { LEVEL_LABELS, QUIZZES_TO_LEVEL_UP } from "@/lib/config";
import { LEVEL_TONE } from "@/lib/level-style";
import { Subject, SubjectProgress } from "@/types/mnemo";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import {
  Badge,
  Button,
  ChevronRightIcon,
  StampTrack,
} from "@/components/ui";

interface SubjectCardProps {
  subject: Subject;
  progress: SubjectProgress;
  index?: number;
}

const CARD_PALETTES = [
  { bg: "bg-[var(--pearl-aqua)]", tilt: -1.8 },
  { bg: "bg-[var(--floral-white)]", tilt: 1.6 },
] as const;

const SUBJECT_INITIALS: Record<string, string> = {
  sejarah: "SJ",
  mathematics: "MM",
};

export function SubjectCard({
  subject,
  progress,
  index = 0,
}: SubjectCardProps) {
  const prefersReduced = useReducedMotion();
  const isAssessed = progress.level !== null;

  const targetHref = isAssessed
    ? `/subjects/${subject.id}`
    : `/subjects/${subject.id}/assessment`;

  const quizTemplate = progress.level
    ? getQuizRewardTemplate(subject.id, progress.level)
    : getQuizRewardTemplate(subject.id, "beginner");
  const bonusTemplate = progress.level
    ? getMilestoneRewardTemplate(subject.id, progress.level)
    : null;

  const palette = CARD_PALETTES[index % CARD_PALETTES.length];
  const watermark =
    SUBJECT_INITIALS[subject.id] ?? subject.name.slice(0, 2).toUpperCase();

  return (
    <motion.article
      initial={prefersReduced ? false : { rotate: palette.tilt }}
      whileHover={
        prefersReduced
          ? undefined
          : {
              rotate: 0,
              y: -8,
              scale: 1.02,
              transition: { type: "spring", stiffness: 280, damping: 18 },
            }
      }
      className={`sticker relative flex min-h-[290px] w-full flex-col justify-between overflow-hidden p-6 text-[var(--ink-surface)] sm:p-7 ${palette.bg}`}
    >
      {/* Huge Subject Initials Watermark */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-3 -bottom-5 text-[130px] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink-surface)] opacity-[0.08] select-none"
      >
        {watermark}
      </span>

      {/* Top Metadata */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between gap-2">
          {progress.level ? (
            <Badge tone={LEVEL_TONE[progress.level]}>
              {LEVEL_LABELS[progress.level]}
            </Badge>
          ) : (
            <Badge tone="neutral">Check-up</Badge>
          )}
        </div>

        <div>
          <h3 className="font-display text-3xl font-extrabold leading-[1] tracking-[-0.03em] sm:text-4xl">
            {subject.name}
          </h3>
          <p className="mt-1.5 text-sm font-bold text-[var(--ink-surface)]/80">
            {subject.tagline}
          </p>
        </div>

        {isAssessed && progress.level && bonusTemplate ? (
          <StampTrack
            passedCount={progress.quizzesPassedAtCurrentLevel}
            targetCount={QUIZZES_TO_LEVEL_UP}
            compact
            rewardLabel={`Bonus: ${rewardLabel(bonusTemplate)}`}
          />
        ) : (
          <p className="text-sm font-semibold leading-relaxed text-[var(--ink-surface)]/80">
            Take a quick 6-question check-up to find your level.
          </p>
        )}
      </div>

      {/* Bottom Payout & CTA */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[var(--ink-surface)]/20 pt-4">
        <div className="flex items-center gap-2">
          <BrandLogo brand={quizTemplate.brand} size={28} wobble={false} />
          <span className="font-display text-sm font-extrabold">
            Win: {rewardLabel(quizTemplate)}
          </span>
        </div>

        <Link href={targetHref}>
          <Button
            size="md"
            variant={isAssessed ? "primary" : "outline"}
          >
            <span>{isAssessed ? "Open" : "Start"}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
