"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RecordQuizOutcome,
  makeQuestionPoolKey,
  useHippomeStore,
} from "@/context/HippomeStoreProvider";
import { getSubjectById, getTopicById } from "@/data/subjects";
import {
  LEVEL_LABELS,
  PASS_MINIMUM_CORRECT,
  PASS_SCORE_PERCENT,
  QUIZZES_TO_LEVEL_UP,
  QUIZ_REWARD_RM,
} from "@/lib/config";
import {
  GeneratedQuizPayload,
  generateQuizQuestions,
} from "@/lib/mock-ai";
import { AppShell } from "@/components/hippome/AppShell";
import { HippomeAvatar } from "@/components/hippome/HippomeAvatar";
import { HippomeMark } from "@/components/hippome/HippomeMark";
import { QuestionCard } from "@/components/hippome/QuestionCard";
import { VoucherCard } from "@/components/hippome/VoucherCard";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  Card,
  ChevronDownIcon,
  Modal,
  RewardBurst,
  RollingNumber,
  SparklesIcon,
  StampTrack,
  TrophyIcon,
} from "@/components/ui";
import { SubjectId } from "@/types/hippome";

type QuizStage = "generating" | "taking" | "result";

export function QuizRunnerView({
  subjectId,
  topicId,
}: {
  subjectId: SubjectId;
  topicId: string;
}) {
  const router = useRouter();
  const { isHydrated, activeUser, recordQuizAttempt, redeemVoucher } =
    useHippomeStore();

  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);
  const subjectProgress = activeUser?.subjectProgress[subjectId];
  const currentLevel = subjectProgress?.level ?? null;

  const [stage, setStage] = useState<QuizStage>("generating");
  const [generationCycle, setGenerationCycle] = useState(1);
  const [quizPayload, setQuizPayload] = useState<GeneratedQuizPayload | null>(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [outcome, setOutcome] = useState<RecordQuizOutcome | null>(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [openReviewIds, setOpenReviewIds] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!isHydrated || !activeUser) return;
    if (!currentLevel) {
      router.replace(`/subjects/${subjectId}/assessment`);
    }
  }, [isHydrated, activeUser, currentLevel, subjectId, router]);

  useEffect(() => {
    if (stage !== "generating" || !activeUser || !currentLevel) return;

    const poolKey = makeQuestionPoolKey(subjectId, topicId, currentLevel);
    const seenIds = activeUser.seenQuestionIdsByKey[poolKey] ?? [];
    const lastIds = activeUser.lastAttemptQuestionIdsByKey[poolKey] ?? [];

    const timer = window.setTimeout(() => {
      const generated = generateQuizQuestions({
        subjectId,
        topicId,
        level: currentLevel,
        seenQuestionIds: seenIds,
        lastAttemptQuestionIds: lastIds,
        attemptNumber: generationCycle,
      });

      setQuizPayload(generated);
      setAnswers(generated.questions.map(() => null));
      setCurrentIndex(0);
      setDirection("next");
      setOutcome(null);
      setOpenReviewIds({});
      setStage("taking");
    }, 900);

    return () => window.clearTimeout(timer);
    // Generate strictly when entering the "generating" stage or retrying.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, generationCycle, subjectId, topicId, Boolean(activeUser), currentLevel]);

  const handleSelectOption = useCallback(
    (optionIdx: 0 | 1 | 2 | 3) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentIndex] = optionIdx;
        return next;
      });
    },
    [currentIndex]
  );

  const handleSubmitQuiz = useCallback(() => {
    if (!quizPayload) return;

    let correctCount = 0;
    const initialOpen: Record<string, boolean> = {};

    quizPayload.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount += 1;
      } else {
        // Automatically expand missed questions so students review mistakes first.
        initialOpen[q.id] = true;
      }
    });

    const total = quizPayload.questions.length;
    const passed = correctCount >= PASS_MINIMUM_CORRECT;

    const recorded = recordQuizAttempt({
      subjectId,
      topicId,
      level: quizPayload.level,
      score: correctCount,
      totalQuestions: total,
      passed,
      questionIds: quizPayload.questions.map((q) => q.id),
    });

    setOpenReviewIds(initialOpen);

    if (recorded) {
      setOutcome(recorded);
      if (recorded.milestoneGranted) {
        setShowLevelUpModal(true);
      }
    }
    setStage("result");
  }, [quizPayload, answers, recordQuizAttempt, subjectId, topicId]);

  const answeredCount = answers.filter((a) => a !== null).length;

  useEffect(() => {
    if (stage !== "taking" || !quizPayload) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        handleSelectOption((Number(e.key) - 1) as 0 | 1 | 2 | 3);
      } else if (e.key === "Enter") {
        if (currentIndex < quizPayload.questions.length - 1) {
          setDirection("next");
          setCurrentIndex((i) =>
            Math.min(quizPayload.questions.length - 1, i + 1)
          );
        } else if (answeredCount === quizPayload.questions.length) {
          handleSubmitQuiz();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    stage,
    quizPayload,
    currentIndex,
    answeredCount,
    handleSelectOption,
    handleSubmitQuiz,
  ]);

  if (!activeUser || !subject || !topic || !currentLevel) {
    return (
      <AppShell pageTitle={topic?.name ?? "Quiz"} focusMode>
        <div className="py-12 text-center text-sm text-[var(--muted)]">
          Preparing your Form 5 SPM quiz...
        </div>
      </AppShell>
    );
  }

  const handleTryAgain = () => {
    setShowLevelUpModal(false);
    setGenerationCycle((c) => c + 1);
    setStage("generating");
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    if (!quizPayload) return;
    setDirection("next");
    setCurrentIndex((i) => Math.min(quizPayload.questions.length - 1, i + 1));
  };

  const toggleReviewItem = (id: string) => {
    setOpenReviewIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentQuestion = quizPayload?.questions[currentIndex];
  const activeLevel = quizPayload?.level ?? currentLevel;

  const questionBgCycle = [
    "bg-[var(--ground)]",
    "bg-[var(--periwinkle-soft)]",
    "bg-[var(--accent-soft)]",
    "bg-[var(--wisteria-soft)]",
    "bg-[var(--raised)]",
  ];
  const stageBgClass =
    stage === "taking"
      ? questionBgCycle[currentIndex % questionBgCycle.length]
      : "bg-[var(--ground)]";

  return (
    <AppShell pageTitle={topic.name} focusMode>
      <div className={`min-h-[100dvh] transition-colors duration-500 ${stageBgClass}`}>
      <div className="relative mx-auto max-w-3xl space-y-5 px-5 py-8 sm:px-8">
        {/* Top Header */}
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">{subject.name}</Badge>
              <Badge
                tone={
                  activeLevel === "advanced"
                    ? "ink"
                    : activeLevel === "intermediate"
                      ? "info"
                      : "success"
                }
              >
                {LEVEL_LABELS[activeLevel]}
              </Badge>
              <Badge tone="success">
                <span className="num">Win RM{QUIZ_REWARD_RM[activeLevel]}</span>
              </Badge>
            </div>
            <h1 className="text-heading text-[var(--text)]">
              {topic.name}
            </h1>
          </div>

          <Link href={`/subjects/${subjectId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Topics</span>
            </Button>
          </Link>
        </header>

        {/* Stage 1: Card-Deck Shuffle AI Generating Loader */}
        {stage === "generating" && (
          <Card className="space-y-6 py-10">
            <div
              aria-hidden="true"
              className="relative mx-auto flex h-24 w-40 items-center justify-center"
            >
              <div className="anim-deck-left absolute h-20 w-14 rounded-[12px] border border-[var(--border)] bg-[var(--periwinkle-soft)]" />
              <div className="anim-deck-right absolute h-20 w-14 rounded-[12px] border border-[var(--border)] bg-[var(--wisteria-soft)]" />
              <div className="relative z-10 flex h-22 w-16 items-center justify-center rounded-[14px] border border-[var(--control)] bg-[var(--surface)]">
                <HippomeMark size={32} />
              </div>
            </div>

            <div className="mx-auto max-w-lg">
              <HippomeAvatar
                message={`Generating 5 fresh ${LEVEL_LABELS[currentLevel]} Form 5 SPM questions for "${topic.name}" (AI Set #${generationCycle})...`}
                expression="thinking"
                floating
              />
            </div>
          </Card>
        )}

        {/* Stage 2: Active Quiz */}
        {stage === "taking" && quizPayload && currentQuestion && (
          <div className="space-y-4">
            {/* Compact HUD */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs">
              <span className="text-[var(--muted)]">{quizPayload.aiNote}</span>
              <span className="num font-semibold text-[var(--text)]">
                Pass: {PASS_MINIMUM_CORRECT}/{quizPayload.questions.length} (
                {PASS_SCORE_PERCENT}%)
              </span>
            </div>

            {/* Interactive 1-5 Stepper Pills */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {quizPayload.questions.map((q, idx) => {
                  const isAnswered = answers[idx] !== null;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setDirection(idx >= currentIndex ? "next" : "prev");
                        setCurrentIndex(idx);
                      }}
                      className={`num pressable h-10 w-10 rounded-[10px] border text-xs font-bold cursor-pointer ${
                        isCurrent
                          ? "border-[var(--ink-surface)] bg-[var(--ink-surface)] text-[var(--floral-white)]"
                          : isAnswered
                            ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-ink)]"
                            : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--raised)]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <span className="num text-xs font-semibold text-[var(--muted)]">
                {answeredCount}/{quizPayload.questions.length} done
              </span>
            </div>

            <div
              key={currentQuestion.id}
              className={
                direction === "next" ? "anim-slide-next" : "anim-slide-prev"
              }
            >
              <QuestionCard
                questionNumber={currentIndex + 1}
                totalQuestions={quizPayload.questions.length}
                prompt={currentQuestion.prompt}
                options={currentQuestion.options}
                selectedIndex={answers[currentIndex]}
                onSelect={handleSelectOption}
                hint={currentQuestion.hint}
                tag={`${LEVEL_LABELS[quizPayload.level]} · Set #${quizPayload.generationNumber}`}
              />
            </div>

            {/* Desktop Controls */}
            <div className="hidden items-center justify-between gap-3 sm:flex">
              <Button
                variant="outline"
                size="lg"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                Previous
              </Button>

              {currentIndex < quizPayload.questions.length - 1 ? (
                <Button size="lg" onClick={handleNext}>
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="aqua"
                  size="lg"
                  disabled={answeredCount < quizPayload.questions.length}
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </Button>
              )}
            </div>

            {/* Mobile Sticky Thumb-Zone Dock */}
            <div className="pb-safe-dock fixed inset-x-0 bottom-0 z-30 border-t border-[var(--border)] bg-[var(--surface)] px-4 pt-3 sm:hidden">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                >
                  Previous
                </Button>

                {currentIndex < quizPayload.questions.length - 1 ? (
                  <Button size="lg" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="aqua"
                    size="lg"
                    disabled={answeredCount < quizPayload.questions.length}
                    onClick={handleSubmitQuiz}
                  >
                    Submit ({answeredCount}/{quizPayload.questions.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Outcome, Shutter Voucher Unveil & Accordion Review */}
        {stage === "result" && quizPayload && outcome && (
          <div className="relative space-y-6">
            <RewardBurst active={outcome.attempt.passed} />

            <HippomeAvatar
              expression={outcome.attempt.passed ? "celebrating" : "encouraging"}
              floating={outcome.attempt.passed}
              message={
                outcome.attempt.passed
                  ? outcome.milestoneGranted
                    ? `Amazing run! You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions} and filled all 3 stamps. You earned your quiz voucher plus a huge milestone bonus!`
                    : `Nice win! You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions} and claimed a real voucher. Pass ${QUIZZES_TO_LEVEL_UP - (subjectProgress?.quizzesPassedAtCurrentLevel ?? 0)} more in ${subject.name} for your level-up bonus!`
                  : `You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions}. No voucher on this round since pass mark is ${PASS_MINIMUM_CORRECT}/${outcome.attempt.totalQuestions}. Review the missed questions below and try again with a fresh set!`
              }
            />

            <Card className="space-y-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <Badge tone={outcome.attempt.passed ? "success" : "danger"}>
                    {outcome.attempt.passed ? "Quiz Passed" : "Not Passed Yet"}
                  </Badge>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <span className="text-[32px] font-bold leading-none tracking-[-0.03em] text-[var(--text)]">
                      <RollingNumber
                        value={`${outcome.attempt.score}/${outcome.attempt.totalQuestions}`}
                      />
                    </span>
                    <span className="num text-sm font-semibold text-[var(--muted)]">
                      (
                      {Math.round(
                        (outcome.attempt.score /
                          outcome.attempt.totalQuestions) *
                          100
                      )}
                      %)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" onClick={handleTryAgain}>
                    <SparklesIcon className="h-4 w-4" />
                    <span>Try Again (New Questions)</span>
                  </Button>
                  <Link href={`/subjects/${subjectId}`}>
                    <Button fullWidth>Back to {subject.name}</Button>
                  </Link>
                </div>
              </div>

              {!outcome.attempt.passed && (
                <div className="rounded-[14px] bg-[var(--pill-negative-bg)] px-4 py-3.5 text-sm text-[var(--pill-negative-ink)]">
                  <strong>No voucher earned this round.</strong> Tap{" "}
                  <strong>Try Again (New Questions)</strong> whenever you are
                  ready for a freshly generated set.
                </div>
              )}

              {outcome.grantedVouchers.length > 0 && (
                <div className="space-y-3 border-t border-[var(--rule)] pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="flex items-center gap-2 text-base font-bold text-[var(--text)]">
                      <TrophyIcon className="h-4 w-4 text-[var(--positive)]" />
                      <span>Vouchers Claimed</span>
                    </h2>
                    <Link
                      href="/rewards"
                      className="text-xs font-semibold text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--text)]"
                    >
                      Open Wallet
                    </Link>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {outcome.grantedVouchers.map((voucher) => (
                      <VoucherCard
                        key={voucher.id}
                        voucher={voucher}
                        onRedeem={redeemVoucher}
                        unveil
                      />
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Accordion Answer Review */}
            <section className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-bold text-[var(--text)]">
                  Answer Review (Set #{quizPayload.generationNumber})
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    const allOpen = quizPayload.questions.every(
                      (q) => openReviewIds[q.id]
                    );
                    const next: Record<string, boolean> = {};
                    quizPayload.questions.forEach((q) => {
                      next[q.id] = !allOpen;
                    });
                    setOpenReviewIds(next);
                  }}
                  className="text-xs font-semibold text-[var(--muted)] underline underline-offset-4 hover:text-[var(--text)] cursor-pointer"
                >
                  {quizPayload.questions.every((q) => openReviewIds[q.id])
                    ? "Collapse all"
                    : "Expand all"}
                </button>
              </div>

              <div className="space-y-2.5">
                {quizPayload.questions.map((q, idx) => {
                  const isCorrect = answers[idx] === q.correctIndex;
                  const isOpen = Boolean(openReviewIds[q.id]);

                  return (
                    <div
                      key={q.id}
                      className="overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleReviewItem(q.id)}
                        aria-expanded={isOpen}
                        className="flex min-h-[54px] w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[var(--ground)] cursor-pointer"
                      >
                        <div className="flex min-w-0 items-center gap-2.5">
                          <Badge tone={isCorrect ? "success" : "danger"}>
                            Q{idx + 1}
                          </Badge>
                          <span className="truncate text-sm font-medium text-[var(--text)]">
                            {q.prompt}
                          </span>
                        </div>
                        <ChevronDownIcon
                          className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-[transform] duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div className="accordion-panel" data-open={isOpen}>
                        <div className="border-t border-[var(--rule)] p-3 sm:p-4">
                          <QuestionCard
                            questionNumber={idx + 1}
                            totalQuestions={quizPayload.questions.length}
                            prompt={q.prompt}
                            options={q.options}
                            selectedIndex={answers[idx]}
                            reviewMode
                            correctIndex={q.correctIndex}
                            explanation={q.explanation}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* Responsive Level-Up Celebration Sheet / Dialog */}
        <Modal
          open={showLevelUpModal && Boolean(outcome?.milestoneGranted)}
          onClose={() => setShowLevelUpModal(false)}
          title="Level Up & Milestone Bonus"
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setShowLevelUpModal(false)}
              >
                Keep Reviewing
              </Button>
              <Link href="/rewards">
                <Button variant="aqua" fullWidth>
                  Open Voucher Wallet
                </Button>
              </Link>
            </>
          }
        >
          {outcome?.milestoneGranted && (
            <div className="space-y-4">
              <div className="rounded-[14px] bg-[var(--ground)] p-3.5">
                <StampTrack
                  passedCount={QUIZZES_TO_LEVEL_UP}
                  targetCount={QUIZZES_TO_LEVEL_UP}
                  rewardLabel="3 of 3 passes completed"
                  animateLatest
                />
              </div>

              <p className="text-sm leading-relaxed text-[var(--text)]">
                You completed 3 passed quizzes in{" "}
                <strong>{subject.name}</strong>.{" "}
                {outcome.leveledUpTo &&
                outcome.leveledUpTo !== quizPayload?.level
                  ? `You moved up to ${LEVEL_LABELS[outcome.leveledUpTo]} level, opening tougher questions with bigger voucher payouts.`
                  : "You reached Grand Mastery and claimed our highest Form 5 SPM reward."}
              </p>

              {outcome.grantedVouchers
                .filter((v) => v.isMilestone)
                .map((voucher) => (
                  <VoucherCard
                    key={voucher.id}
                    voucher={voucher}
                    onRedeem={redeemVoucher}
                    unveil
                  />
                ))}
            </div>
          )}
        </Modal>
      </div>
      </div>
    </AppShell>
  );
}
