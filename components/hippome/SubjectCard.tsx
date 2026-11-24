"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  LEVEL_LABELS,
  MILESTONE_REWARD_CONFIG,
  QUIZZES_TO_LEVEL_UP,
  QUIZ_REWARD_RM,
} from "@/lib/config";
import { DifficultyLevel, Subject, SubjectProgress } from "@/types/hippome";
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
  { bg: "bg-[var(--pearl-aqua)]", tilt: -2.2 },
  { bg: "bg-[var(--floral-white)]", tilt: 1.8 },
  { bg: "bg-[var(--wisteria)]", tilt: -1.6 },
  { bg: "bg-[var(--lavender)]", tilt: 2.2 },
  { bg: "bg-[var(--periwinkle-soft)]", tilt: -1.2 },
] as const;

const SUBJECT_INITIALS: Record<string, string> = {
  "bahasa-melayu": "BM",
  english: "BI",
  mathematics: "MM",
  science: "SN",
  sejarah: "SJ",
};

const LEVEL_BADGE_TONE: Record<
  DifficultyLevel,
  "success" | "info" | "ink"
> = {
  beginner: "success",
  intermediate: "info",
  advanced: "ink",
};

export function SubjectCard({
  subject,
  progress,
  index = 0,
}: SubjectCardProps) {
  const prefersReduced = useReducedMotion();
  const isAssessed = progress.level !== null;
  const weakestTopic = progress.weakestTopicId
    ? subject.topics.find((t) => t.id === progress.weakestTopicId)
    : null;

  const targetHref = isAssessed
    ? `/subjects/${subject.id}`
    : `/subjects/${subject.id}/assessment`;

  const milestoneCfg = progress.level
    ? MILESTONE_REWARD_CONFIG[progress.level]
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
      className={`sticker relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden p-5 text-[var(--ink-surface)] ${palette.bg}`}
    >
      {/* Huge Subject Initials Watermark */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-3 -bottom-5 text-[120px] font-extrabold leading-none tracking-[-0.06em] text-[var(--ink-surface)] opacity-[0.08] select-none"
      >
        {watermark}
      </span>

      {/* Top Metadata */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="num text-micro text-[var(--ink-surface)]/80">
            SPM {subject.spmCode}
          </span>
          {progress.level ? (
            <Badge tone={LEVEL_BADGE_TONE[progress.level]}>
              {LEVEL_LABELS[progress.level]}
            </Badge>
          ) : (
            <Badge tone="neutral">Check-up</Badge>
          )}
        </div>

        <h3 className="font-display text-2xl font-extrabold leading-[1.02] tracking-[-0.03em]">
          {subject.name}
        </h3>

        {isAssessed && progress.level ? (
          <div className="space-y-3 pt-1">
            {weakestTopic && (
              <p className="text-xs font-semibold text-[var(--ink-surface)]/80">
                Focus: {weakestTopic.name}
              </p>
            )}
            <StampTrack
              passedCount={progress.quizzesPassedAtCurrentLevel}
              targetCount={QUIZZES_TO_LEVEL_UP}
              compact
              rewardLabel={
                milestoneCfg ? `Next: RM${milestoneCfg.valueRm}` : undefined
              }
            />
          </div>
        ) : (
          <p className="text-xs font-semibold leading-relaxed text-[var(--ink-surface)]/80">
            6 quick questions to set your level & unlock RM5–RM20 vouchers.
          </p>
        )}
      </div>

      {/* Bottom Payout & CTA */}
      <div className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t-2 border-[var(--ink-surface)]/20 pt-3.5">
        {isAssessed && progress.level ? (
          <span className="font-display num text-lg font-extrabold">
            RM{QUIZ_REWARD_RM[progress.level]}
            <span className="text-xs font-bold opacity-75"> / pass</span>
          </span>
        ) : (
          <span className="text-xs font-bold opacity-80">6 questions</span>
        )}

        <Link href={targetHref}>
          <Button
            size="sm"
            variant={isAssessed ? "primary" : "outline"}
            className="min-h-[38px]"
          >
            <span>{isAssessed ? "Play" : "Start"}</span>
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </motion.article>
  );
}
