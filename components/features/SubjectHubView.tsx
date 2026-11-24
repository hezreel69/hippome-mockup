"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { getSubjectById, getTopicById } from "@/data/subjects";
import {
  LEVEL_DESCRIPTIONS,
  LEVEL_LABELS,
  LEVEL_ORDER,
  MILESTONE_REWARD_CONFIG,
  QUIZZES_TO_LEVEL_UP,
  QUIZ_QUESTION_COUNT,
  QUIZ_REWARD_RM,
} from "@/lib/config";
import { AppShell } from "@/components/hippome/AppShell";
import { HippomeAvatar } from "@/components/hippome/HippomeAvatar";
import { Reveal, SplitText, Sticker } from "@/components/motion";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  ChevronRightIcon,
  LockIcon,
  SparklesIcon,
  StampTrack,
} from "@/components/ui";
import { SubjectId } from "@/types/hippome";

const SUBJECT_HERO_BG: Record<SubjectId, string> = {
  "bahasa-melayu": "bg-[var(--pearl-aqua)]",
  english: "bg-[var(--periwinkle)]",
  mathematics: "bg-[var(--wisteria)]",
  science: "bg-[var(--lavender)]",
  sejarah: "bg-[var(--pearl-aqua)]",
};

export function SubjectHubView({ subjectId }: { subjectId: SubjectId }) {
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const { isHydrated, activeUser } = useHippomeStore();

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
      <AppShell pageTitle={subject?.name ?? "SPM Subject"}>
        <div className="py-12 text-center font-display text-lg font-bold text-[var(--muted)]">
          Checking your {subject?.name ?? subjectId} placement...
        </div>
      </AppShell>
    );
  }

  const currentLevel = progress.level;
  const weakestTopic = progress.weakestTopicId
    ? getTopicById(subjectId, progress.weakestTopicId)
    : null;
  const milestoneCfg = MILESTONE_REWARD_CONFIG[currentLevel];
  const currentRewardRm = QUIZ_REWARD_RM[currentLevel];
  const remainingToLevelUp =
    QUIZZES_TO_LEVEL_UP - progress.quizzesPassedAtCurrentLevel;

  const higherLevels = LEVEL_ORDER.filter(
    (lvl) => LEVEL_ORDER.indexOf(lvl) > LEVEL_ORDER.indexOf(currentLevel)
  );

  const orderedTopics = [...subject.topics].sort((a, b) => {
    if (a.id === progress.weakestTopicId) return -1;
    if (b.id === progress.weakestTopicId) return 1;
    return 0;
  });

  const heroBg = SUBJECT_HERO_BG[subjectId] ?? "bg-[var(--pearl-aqua)]";

  return (
    <AppShell pageTitle={subject.name}>
      {/* Hero Banner */}
      <section
        className={`border-b-2 border-[var(--ink-surface)] px-5 py-10 text-[var(--ink-surface)] sm:px-8 sm:py-14 ${heroBg}`}
      >
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Sticker tone="floral" tilt={-2}>
                <span className="num text-micro">SPM {subject.spmCode}</span>
              </Sticker>
              <Sticker tone="ink" tilt={1.5}>
                <span className="text-micro text-[var(--pearl-aqua)]">
                  {LEVEL_LABELS[currentLevel]} · RM{currentRewardRm} / pass
                </span>
              </Sticker>
            </div>

            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                <span>Study Home</span>
              </Button>
            </Link>
          </div>

          <SplitText
            text={subject.name}
            by="word"
            stagger={0.05}
            className="text-display text-[var(--ink-surface)]"
          />
          <p className="max-w-2xl text-base font-semibold text-[var(--ink-surface)]/80">
            {subject.tagline}
          </p>

          <div className="grid gap-6 pt-2 lg:grid-cols-12">
            <div className="sticker flex flex-col justify-between gap-4 bg-[var(--ink-surface)] p-6 text-[var(--floral-white)] lg:col-span-5">
              <div>
                <p className="text-micro text-[var(--pearl-aqua)]">
                  Subject reward pass
                </p>
                <p className="font-display mt-1 text-2xl font-extrabold">
                  {milestoneCfg.label}
                </p>
                <p className="num text-sm font-bold text-[var(--pearl-aqua)]">
                  RM{milestoneCfg.valueRm} milestone voucher
                </p>
              </div>

              <div className="rounded-[18px] bg-[var(--ink-surface-raised)] p-4">
                <StampTrack
                  passedCount={progress.quizzesPassedAtCurrentLevel}
                  targetCount={QUIZZES_TO_LEVEL_UP}
                  rewardLabel={`${remainingToLevelUp} ${remainingToLevelUp === 1 ? "pass" : "passes"} to go`}
                />
              </div>

              <p className="text-xs text-[#cfd6e8]">
                {LEVEL_DESCRIPTIONS[currentLevel]} · Pass mark: 60% (3/5)
              </p>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <HippomeAvatar
                message={`Showing ${LEVEL_LABELS[currentLevel]}-level topics only so every question fits your stage. ${weakestTopic ? `Your diagnostic marked "${weakestTopic.name}" as your top focus.` : "Pick any topic to generate 5 fresh questions."} Pass ${remainingToLevelUp} more ${remainingToLevelUp === 1 ? "quiz" : "quizzes"} to claim your RM${milestoneCfg.valueRm} milestone reward!`}
                expression="happy"
                floating
              />
            </div>
          </div>
        </div>
      </section>

      {/* Topics Bento/Masonry */}
      <section className="mx-auto max-w-7xl space-y-6 px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-micro text-[var(--muted)]">
                Fresh AI questions on every run
              </p>
              <h2 className="text-heading mt-1 text-[var(--text)]">
                {LEVEL_LABELS[currentLevel]} Topics
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderedTopics.map((topic, idx) => {
            const isWeakest = topic.id === progress.weakestTopicId;
            const topicAttempts = activeUser.quizHistory.filter(
              (a) => a.subjectId === subjectId && a.topicId === topic.id
            );
            const topicPasses = topicAttempts.filter((a) => a.passed).length;
            const tilt = idx % 2 === 0 ? -1.4 : 1.4;

            return (
              <motion.article
                key={topic.id}
                initial={prefersReduced ? false : { rotate: tilt }}
                whileHover={
                  prefersReduced
                    ? undefined
                    : {
                        rotate: 0,
                        y: -6,
                        transition: { type: "spring", stiffness: 300, damping: 18 },
                      }
                }
                className={`sticker flex h-full flex-col justify-between gap-5 p-6 ${
                  isWeakest
                    ? "bg-[var(--accent-soft)]"
                    : "bg-[var(--surface)]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge tone="neutral">{topic.syllabusTag}</Badge>
                    {isWeakest && (
                      <motion.span
                        animate={
                          prefersReduced ? undefined : { scale: [1, 1.07, 1] }
                        }
                        transition={{ duration: 1.6, repeat: Infinity }}
                      >
                        <Badge tone="warning">FOCUS</Badge>
                      </motion.span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-extrabold leading-tight text-[var(--text)]">
                      {topic.name}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium leading-relaxed text-[var(--muted)]">
                      {topic.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 rounded-[16px] border-2 border-[var(--ink-surface)]/15 bg-[var(--ground)] p-3.5 text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="text-[var(--muted)]">Pass payout</span>
                      <span className="num font-extrabold text-[var(--positive)]">
                        RM{currentRewardRm} voucher
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-[var(--muted)]">History</span>
                      <span className="num font-bold text-[var(--text)]">
                        {topicPasses} passed / {topicAttempts.length} taken
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/subjects/${subjectId}/quiz/${topic.id}`}
                  className="block"
                >
                  <Button
                    fullWidth
                    size="md"
                    variant={isWeakest ? "aqua" : "primary"}
                  >
                    <SparklesIcon className="h-4 w-4" />
                    <span>Start {QUIZ_QUESTION_COUNT}-Question Quiz</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Locked Higher Tiers */}
        {higherLevels.length > 0 && (
          <Reveal>
            <div className="sticker mt-8 space-y-4 bg-[var(--raised)] p-6">
              <div className="flex items-center gap-2 font-display text-lg font-bold text-[var(--text)]">
                <LockIcon className="h-5 w-5 text-[var(--ink-surface)]" />
                <span>Higher levels ahead (bigger rewards per pass)</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {higherLevels.map((lvl) => (
                  <div
                    key={lvl}
                    className="flex items-center justify-between gap-3 rounded-[18px] border-2 border-[var(--ink-surface)] bg-[var(--surface)] px-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold text-[var(--text)]">
                        {LEVEL_LABELS[lvl]} Quizzes
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {LEVEL_DESCRIPTIONS[lvl]}
                      </p>
                    </div>
                    <Badge tone="highlight">
                      <span className="num">RM{QUIZ_REWARD_RM[lvl]} / pass</span>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </section>
    </AppShell>
  );
}
