"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RecordQuizOutcome,
  makeQuestionPoolKey,
  useMnemoStore,
} from "@/context/MnemoStoreProvider";
import { getQuizRewardTemplate, rewardLabel } from "@/data/reward-map";
import { getSubjectById } from "@/data/subjects";
import {
  LEVEL_LABELS,
  PASS_MINIMUM_CORRECT,
  QUIZZES_TO_LEVEL_UP,
} from "@/lib/config";
import { LEVEL_TONE } from "@/lib/level-style";
import {
  GeneratedQuizPayload,
  generateRandomQuiz,
  getDemoQuiz,
} from "@/lib/mock-ai";
import { playPop } from "@/lib/sound";
import { HIPPOME_AVATAR_CONFIG } from "@/lib/avatar-config";
import { AppShell } from "@/components/mnemo/AppShell";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import { HippomeAvatar } from "@/components/avatar/HippomeAvatar";
import { MnemoMark } from "@/components/mnemo/MnemoMark";
import { QuestionCard } from "@/components/mnemo/QuestionCard";
import { VoucherCard } from "@/components/mnemo/VoucherCard";
import { Confetti, Sticker } from "@/components/motion";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  Card,
  ChevronDownIcon,
  Modal,
  ProgressBar,
  RewardBurst,
  RollingNumber,
  SparklesIcon,
  StampTrack,
  TrophyIcon,
} from "@/components/ui";
import { QuizMode, SubjectId } from "@/types/mnemo";

type QuizStage = "generating" | "taking" | "result";

export function QuizRunnerView({
  subjectId,
  quizMode,
}: {
  subjectId: SubjectId;
  quizMode: QuizMode;
}) {
  const router = useRouter();
  const { isHydrated, activeUser, recordQuizAttempt, redeemVoucher } =
    useMnemoStore();

  const subject = getSubjectById(subjectId);
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

    const poolKey = makeQuestionPoolKey(subjectId, currentLevel);
    const seenIds = activeUser.seenQuestionIdsByKey[poolKey] ?? [];
    const lastIds = activeUser.lastAttemptQuestionIdsByKey[poolKey] ?? [];

    const timer = window.setTimeout(() => {
      const generated =
        quizMode === "demo"
          ? getDemoQuiz(subjectId, currentLevel)
          : generateRandomQuiz({
              subjectId,
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
    }, 550);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, generationCycle, subjectId, quizMode, Boolean(activeUser), currentLevel]);

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

    const score = quizPayload.questions.reduce((sum, q, idx) => {
      return sum + (answers[idx] === q.correctIndex ? 1 : 0);
    }, 0);

    const passed = score >= PASS_MINIMUM_CORRECT;
    if (passed) {
      playPop(true);
    }

    const recorded = recordQuizAttempt({
      subjectId,
      quizMode,
      level: quizPayload.level,
      score,
      totalQuestions: quizPayload.questions.length,
      passed,
      questionIds: quizPayload.questions.map((q) => q.id),
    });

    const initialOpen: Record<string, boolean> = {};
    quizPayload.questions.forEach((q, idx) => {
      if (answers[idx] !== q.correctIndex) {
        initialOpen[q.id] = true;
      }
    });

    setOpenReviewIds(initialOpen);

    if (recorded) {
      setOutcome(recorded);
      if (recorded.milestoneGranted) {
        setShowLevelUpModal(true);
      }
    }
    setStage("result");
  }, [quizPayload, answers, recordQuizAttempt, subjectId, quizMode]);

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

  if (!activeUser || !subject || !currentLevel) {
    return (
      <AppShell pageTitle={subject?.name ?? "Quiz"} focusMode>
        <div className="py-12 text-center font-display text-lg font-bold text-[var(--muted)]">
          Getting your quiz ready...
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
  const quizTitle = quizMode === "demo" ? "Demo Quiz" : "Random Quiz";
  const quizRewardTpl = getQuizRewardTemplate(subjectId, activeLevel);

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
    <AppShell pageTitle={`${subject.name} · ${quizTitle}`} focusMode>
      <div
        className={`min-h-[100dvh] transition-colors duration-500 ${stageBgClass}`}
      >
        <div
          className={`relative mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-8 sm:py-8 ${
            stage === "taking" ? "pb-24 sm:pb-8" : ""
          }`}
        >
          {/* Top Header */}
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-eyebrow text-[var(--muted)]">
                  {subject.name}
                </span>
                <Badge tone={LEVEL_TONE[activeLevel]}>
                  {LEVEL_LABELS[activeLevel]}
                </Badge>
                <Badge tone="success" className="gap-1.5">
                  <BrandLogo
                    brand={quizRewardTpl.brand}
                    size={16}
                    wobble={false}
                  />
                  <span>Win: {rewardLabel(quizRewardTpl)}</span>
                </Badge>
              </div>
              <h1 className="text-display text-[var(--text)]">{quizTitle}</h1>
            </div>

            <Link href={`/subjects/${subjectId}`}>
              <Button variant="outline" size="sm">
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                <span>Back</span>
              </Button>
            </Link>
          </header>

          {/* Stage 1: Loader */}
          {stage === "generating" && (
            <Card className="space-y-6 py-10">
              <div
                aria-hidden="true"
                className="relative mx-auto flex h-24 w-40 items-center justify-center"
              >
                <div className="anim-deck-left absolute h-20 w-14 rounded-[12px] border border-[var(--border)] bg-[var(--periwinkle-soft)]" />
                <div className="anim-deck-right absolute h-20 w-14 rounded-[12px] border border-[var(--border)] bg-[var(--wisteria-soft)]" />
                <div className="relative z-10 flex h-22 w-16 items-center justify-center rounded-[14px] border border-[var(--control)] bg-[var(--surface)]">
                  <MnemoMark size={32} />
                </div>
              </div>

              <div className="mx-auto max-w-lg">
                <HippomeAvatar
                  message={
                    quizMode === "demo"
                      ? `Loading the ${subject.name} demo quiz with answers marked...`
                      : `Picking 5 ${LEVEL_LABELS[currentLevel]} ${subject.name} questions for you...`
                  }
                  expression="thinking"
                  floating
                />
              </div>
            </Card>
          )}

          {/* Stage 2: Active Quiz */}
          {stage === "taking" && quizPayload && currentQuestion && (
            <div className="space-y-5">
              {quizMode === "demo" && (
                <Sticker tone="aqua" tilt={-1}>
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    DEMO: correct answers are marked
                  </span>
                </Sticker>
              )}

              <ProgressBar
                value={answeredCount}
                max={quizPayload.questions.length}
                label="Quiz progress"
                tone="success"
              />

              {/* Stepper Pills */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                        className={`num pressable h-9 w-9 cursor-pointer rounded-full border-2 text-xs font-extrabold sm:h-10 sm:w-10 ${
                          isCurrent
                            ? "border-[var(--ink-surface)] bg-[var(--ink-surface)] text-[var(--floral-white)]"
                            : isAnswered
                              ? "border-[var(--ink-surface)] bg-[var(--pearl-aqua)] text-[var(--ink-surface)]"
                              : "border-[var(--ink-surface)]/30 bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--raised)]"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <span className="num text-xs font-bold text-[var(--muted)]">
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
                  revealCorrect={quizMode === "demo"}
                  correctIndex={currentQuestion.correctIndex}
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
              <div className="pb-safe-dock fixed inset-x-0 bottom-0 z-30 border-t-2 border-[var(--ink-surface)] bg-[var(--surface)] px-4 pt-3 sm:hidden">
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

          {/* Stage 3: Outcome */}
          {stage === "result" && quizPayload && outcome && (
            <div className="relative space-y-6">
              {outcome.attempt.passed && (
                <>
                  <Confetti active count={42} spread="fullscreen" />
                  <RewardBurst active />
                </>
              )}

              <HippomeAvatar
                expression={
                  outcome.attempt.passed ? "celebrating" : "encouraging"
                }
                avatarSize="lg"
                avatarSrc={
                  outcome.attempt.passed
                    ? HIPPOME_AVATAR_CONFIG.defaultSrc
                    : HIPPOME_AVATAR_CONFIG.failSrc
                }
                floating={outcome.attempt.passed}
                message={
                  outcome.attempt.passed
                    ? outcome.milestoneGranted
                      ? `Amazing! You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions} and won your quiz voucher plus a bonus voucher!`
                      : `Nice win! You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions} and won a voucher. Pass ${QUIZZES_TO_LEVEL_UP - (subjectProgress?.quizzesPassedAtCurrentLevel ?? 0)} more to level up!`
                    : `You scored ${outcome.attempt.score}/${outcome.attempt.totalQuestions}. Get ${PASS_MINIMUM_CORRECT} right to win a voucher. Try again!`
                }
              />

              <Card className="space-y-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <Badge tone={outcome.attempt.passed ? "success" : "danger"}>
                      {outcome.attempt.passed ? "Passed" : "Try Again"}
                    </Badge>
                    <div className="mt-2 flex items-baseline gap-2.5">
                      <span className="font-display text-display text-[var(--text)]">
                        <RollingNumber
                          value={`${outcome.attempt.score}/${outcome.attempt.totalQuestions}`}
                        />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={handleTryAgain}>
                      <SparklesIcon className="h-4 w-4" />
                      <span>
                        {quizMode === "demo" ? "Retry Demo" : "Try Again"}
                      </span>
                    </Button>
                    <Link href={`/subjects/${subjectId}`}>
                      <Button fullWidth variant="aqua">
                        Back to {subject.name}
                      </Button>
                    </Link>
                  </div>
                </div>

                {!outcome.attempt.passed && (
                  <div className="rounded-[14px] bg-[var(--pill-negative-bg)] px-4 py-3.5 text-sm text-[var(--pill-negative-ink)]">
                    <strong>No voucher this time.</strong> Score at least{" "}
                    {PASS_MINIMUM_CORRECT}/{outcome.attempt.totalQuestions} to
                    win a {rewardLabel(quizRewardTpl)}.
                  </div>
                )}

                {outcome.grantedVouchers.length > 0 && (
                  <div className="space-y-3 border-t-2 border-[var(--rule)] pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-[var(--text)]">
                        <TrophyIcon className="h-5 w-5 text-[var(--positive)]" />
                        <span>Vouchers Won</span>
                      </h2>
                      <Link
                        href="/rewards"
                        className="font-display text-sm font-extrabold text-[var(--accent-strong)] underline underline-offset-4 hover:text-[var(--text)]"
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

              {/* Answer Review */}
              <section className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-extrabold text-[var(--text)]">
                    Answer Review
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
                    className="cursor-pointer text-xs font-bold text-[var(--muted)] underline underline-offset-4 hover:text-[var(--text)]"
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
                        className="overflow-hidden rounded-[20px] border-2 border-[var(--ink-surface)] bg-[var(--surface)]"
                      >
                        <button
                          type="button"
                          onClick={() => toggleReviewItem(q.id)}
                          aria-expanded={isOpen}
                          className="flex min-h-[54px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[var(--ground)]"
                        >
                          <div className="flex min-w-0 items-center gap-2.5">
                            <Badge tone={isCorrect ? "success" : "danger"}>
                              Q{idx + 1}
                            </Badge>
                            <span className="truncate text-sm font-bold text-[var(--text)]">
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
                          <div className="border-t-2 border-[var(--rule)] p-3 sm:p-4">
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

          {/* Level-Up Celebration Modal */}
          <Modal
            open={showLevelUpModal && Boolean(outcome?.milestoneGranted)}
            onClose={() => setShowLevelUpModal(false)}
            title="Level Up & Bonus Voucher"
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
                    Open Wallet
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
                  You passed 3 quizzes in <strong>{subject.name}</strong>!{" "}
                  {outcome.leveledUpTo &&
                  outcome.leveledUpTo !== quizPayload?.level
                    ? `You moved up to ${LEVEL_LABELS[outcome.leveledUpTo]} level.`
                    : "You completed Advanced mastery!"}
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
