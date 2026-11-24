"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useMnemoStore } from "@/context/MnemoStoreProvider";
import { getQuizRewardTemplate, rewardLabel } from "@/data/reward-map";
import { getSubjectById } from "@/data/subjects";
import { LEVEL_LABELS } from "@/lib/config";
import { LEVEL_TONE } from "@/lib/level-style";
import {
  AssessmentAnalysis,
  evaluateAssessment,
  getAssessmentQuestionsForSubject,
} from "@/lib/mock-ai";
import { AppShell } from "@/components/mnemo/AppShell";
import { BrandLogo } from "@/components/mnemo/BrandLogo";
import { HippomeAvatar } from "@/components/avatar/HippomeAvatar";
import { QuestionCard } from "@/components/mnemo/QuestionCard";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  Card,
  ChevronRightIcon,
} from "@/components/ui";
import { SubjectId } from "@/types/mnemo";

type AssessmentStage = "intro" | "taking" | "analyzing" | "result";

export function AssessmentView({ subjectId }: { subjectId: SubjectId }) {
  const { activeUser, saveAssessmentResult } = useMnemoStore();

  const subject = getSubjectById(subjectId);
  const questions = getAssessmentQuestionsForSubject(subjectId);

  const [stage, setStage] = useState<AssessmentStage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    questions.map(() => null)
  );
  const [analysis, setAnalysis] = useState<AssessmentAnalysis | null>(null);

  useEffect(() => {
    if (stage !== "analyzing") return;

    const timer = window.setTimeout(() => {
      const evaluated = evaluateAssessment(subjectId, questions, answers);
      saveAssessmentResult({
        subjectId,
        level: evaluated.assignedLevel,
        score: evaluated.score,
        total: evaluated.total,
      });
      setAnalysis(evaluated);
      setStage("result");
    }, 850);

    return () => window.clearTimeout(timer);
  }, [stage, subjectId, questions, answers, saveAssessmentResult]);

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

  const answeredCount = answers.filter((a) => a !== null).length;

  useEffect(() => {
    if (stage !== "taking") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
        handleSelectOption((Number(e.key) - 1) as 0 | 1 | 2 | 3);
      } else if (e.key === "Enter" && answers[currentIndex] !== null) {
        if (currentIndex < questions.length - 1) {
          setDirection("next");
          setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
        } else if (answeredCount === questions.length) {
          setStage("analyzing");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    stage,
    currentIndex,
    answers,
    answeredCount,
    questions.length,
    handleSelectOption,
  ]);

  if (!activeUser || !subject) return null;

  const existingProgress = activeUser.subjectProgress[subjectId];
  const currentQuestion = questions[currentIndex];

  const handleStartAssessment = () => {
    setAnswers(questions.map(() => null));
    setCurrentIndex(0);
    setDirection("next");
    setAnalysis(null);
    setStage("taking");
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  };

  return (
    <AppShell pageTitle={`${subject.name} Check-up`} focusMode>
      <div className="mx-auto max-w-3xl space-y-6 px-5 py-8 sm:px-8">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1.5">
            <Badge tone="info">Quick Check-up</Badge>
            <h1 className="text-display text-[var(--text)]">
              {subject.name} Check-up
            </h1>
          </div>

          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Home</span>
            </Button>
          </Link>
        </header>

        {stage === "intro" && (
          <Card className="space-y-5">
            {existingProgress?.level && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] bg-[var(--pill-warning-bg)] px-4 py-3 text-xs text-[var(--pill-warning-ink)]">
                <span>
                  You are already placed at{" "}
                  <strong>{LEVEL_LABELS[existingProgress.level]}</strong> in{" "}
                  {subject.name}.
                </span>
                <Link href={`/subjects/${subjectId}`}>
                  <Button size="sm" variant="outline">
                    Go to {subject.name}
                  </Button>
                </Link>
              </div>
            )}

            <HippomeAvatar
              message={`Answer ${questions.length} quick questions so I can match you with the right ${subject.name} level.`}
              expression="happy"
              floating
            />

            <Button
              variant="aqua"
              size="lg"
              fullWidth
              onClick={handleStartAssessment}
            >
              <span>Start {subject.name} Check-up</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Card>
        )}

        {stage === "taking" && currentQuestion && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--muted)]">
                <span>Check-up progress</span>
                <span className="num text-[var(--text)]">
                  {answeredCount} of {questions.length} answered
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {questions.map((q, idx) => {
                  const done = answers[idx] !== null;
                  const active = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      aria-label={`Question ${idx + 1}`}
                      onClick={() => {
                        setDirection(idx >= currentIndex ? "next" : "prev");
                        setCurrentIndex(idx);
                      }}
                      className={`h-2.5 cursor-pointer rounded-full transition-colors duration-150 ${
                        active
                          ? "bg-[var(--ink-surface)]"
                          : done
                            ? "bg-[var(--accent)]"
                            : "bg-[var(--border)]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <div
              key={currentQuestion.id}
              className={
                direction === "next" ? "anim-slide-next" : "anim-slide-prev"
              }
            >
              <QuestionCard
                questionNumber={currentIndex + 1}
                totalQuestions={questions.length}
                prompt={currentQuestion.prompt}
                options={currentQuestion.options}
                selectedIndex={answers[currentIndex]}
                onSelect={handleSelectOption}
              />
            </div>

            <div className="hidden items-center justify-between gap-3 sm:flex">
              <Button
                variant="outline"
                size="lg"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                Previous
              </Button>

              {currentIndex < questions.length - 1 ? (
                <Button size="lg" onClick={handleNext}>
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="aqua"
                  size="lg"
                  disabled={answeredCount < questions.length}
                  onClick={() => setStage("analyzing")}
                >
                  Finish Check-up
                </Button>
              )}
            </div>

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

                {currentIndex < questions.length - 1 ? (
                  <Button size="lg" onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="aqua"
                    size="lg"
                    disabled={answeredCount < questions.length}
                    onClick={() => setStage("analyzing")}
                  >
                    Finish ({answeredCount}/{questions.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "analyzing" && (
          <Card className="space-y-5 py-10 text-center">
            <HippomeAvatar
              message={`Checking your ${subject.name} answers...`}
              expression="thinking"
              floating
            />

            <div className="mx-auto w-full max-w-xs space-y-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--raised)]">
                <div className="anim-calibrate h-full w-full rounded-full bg-[var(--accent)]" />
              </div>
              <p className="text-xs font-bold text-[var(--muted)]">
                Checking your level...
              </p>
            </div>
          </Card>
        )}

        {stage === "result" &&
          analysis &&
          (() => {
            const rewardTpl = getQuizRewardTemplate(
              subjectId,
              analysis.assignedLevel
            );
            return (
              <div className="space-y-5">
                <HippomeAvatar
                  message={analysis.aiSummary}
                  expression="celebrating"
                  floating
                />

                <Card className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-2">
                      <Badge tone={LEVEL_TONE[analysis.assignedLevel]}>
                        {LEVEL_LABELS[analysis.assignedLevel]}
                      </Badge>
                      <p className="font-display num text-heading text-[var(--text)]">
                        {analysis.score} / {analysis.total}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 rounded-[16px] border-2 border-[var(--ink-surface)] bg-[var(--accent-soft)] px-4 py-3">
                      <BrandLogo
                        brand={rewardTpl.brand}
                        size={32}
                        wobble={false}
                      />
                      <div>
                        <p className="text-micro text-[var(--muted)]">
                          Reward per pass
                        </p>
                        <p className="font-display text-sm font-extrabold text-[var(--text)]">
                          {rewardLabel(rewardTpl)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link href={`/subjects/${subjectId}`} className="block">
                    <Button variant="aqua" size="lg" fullWidth magnetic>
                      <span>Open {subject.name} Quizzes</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              </div>
            );
          })()}
      </div>
    </AppShell>
  );
}
