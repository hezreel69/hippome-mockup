"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useHippomeStore } from "@/context/HippomeStoreProvider";
import { getSubjectById } from "@/data/subjects";
import { LEVEL_LABELS, QUIZ_REWARD_RM } from "@/lib/config";
import {
  AssessmentAnalysis,
  evaluateAssessment,
  getAssessmentQuestionsForSubject,
} from "@/lib/mock-ai";
import { AppShell } from "@/components/hippome/AppShell";
import { HippomeAvatar } from "@/components/hippome/HippomeAvatar";
import { QuestionCard } from "@/components/hippome/QuestionCard";
import {
  ArrowLeftIcon,
  Badge,
  Button,
  Card,
  ChevronRightIcon,
} from "@/components/ui";
import { SubjectId } from "@/types/hippome";

type AssessmentStage = "intro" | "taking" | "analyzing" | "result";

export function AssessmentView({ subjectId }: { subjectId: SubjectId }) {
  const router = useRouter();
  const { activeUser, saveAssessmentResult } = useHippomeStore();

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
        weakestTopicId: evaluated.weakestTopicId,
        score: evaluated.score,
        total: evaluated.total,
      });
      setAnalysis(evaluated);
      setStage("result");
    }, 950);

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
  }, [stage, currentIndex, answers, answeredCount, questions.length, handleSelectOption]);

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
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="neutral">SPM {subject.spmCode}</Badge>
              <Badge tone="info">Placement Check-up</Badge>
            </div>
            <h1 className="text-display text-[var(--text)]">
              {subject.name} Diagnostic
            </h1>
          </div>

          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Study Home</span>
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
                    Go to {subject.name} Topics
                  </Button>
                </Link>
              </div>
            )}

            <HippomeAvatar
              message={`Before opening your ${subject.name} quizzes, answer ${questions.length} quick SPM Form 5 questions. I will set your starting level (Beginner, Intermediate, or Advanced) and flag your weakest topic.`}
              expression="happy"
              floating
            />

            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="rounded-[14px] bg-[var(--ground)] p-3.5">
                <p className="text-xs text-[var(--muted)]">Length</p>
                <p className="num mt-0.5 text-sm font-bold text-[var(--text)]">
                  {questions.length} MCQs
                </p>
              </div>
              <div className="rounded-[14px] bg-[var(--ground)] p-3.5">
                <p className="text-xs text-[var(--muted)]">Coverage</p>
                <p className="num mt-0.5 text-sm font-bold text-[var(--text)]">
                  {subject.topics.length} Topics
                </p>
              </div>
              <div className="rounded-[14px] bg-[var(--ground)] p-3.5">
                <p className="text-xs text-[var(--muted)]">Output</p>
                <p className="mt-0.5 text-sm font-bold text-[var(--text)]">
                  Level + Gap
                </p>
              </div>
            </div>

            <Button size="lg" fullWidth onClick={handleStartAssessment}>
              <span>Start {subject.name} Check-up</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </Card>
        )}

        {stage === "taking" && currentQuestion && (
          <div className="space-y-4">
            {/* Segmented 6-step Progress Track */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Check-up progress</span>
                <span className="num font-semibold text-[var(--text)]">
                  {answeredCount} of {questions.length} answered
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    type="button"
                    aria-label={`Jump to question ${idx + 1}`}
                    onClick={() => {
                      setDirection(idx >= currentIndex ? "next" : "prev");
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-[background-color] duration-200 cursor-pointer ${
                      idx === currentIndex
                        ? "bg-[var(--ink-surface)]"
                        : answers[idx] !== null
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--border)]"
                    }`}
                  />
                ))}
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
                tag={
                  subject.topics.find((t) => t.id === currentQuestion.topicId)
                    ?.name
                }
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

              {currentIndex < questions.length - 1 ? (
                <Button
                  size="lg"
                  disabled={answers[currentIndex] === null}
                  onClick={handleNext}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="aqua"
                  size="lg"
                  disabled={answeredCount < questions.length}
                  onClick={() => setStage("analyzing")}
                >
                  Finish &amp; Analyse Level
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

                {currentIndex < questions.length - 1 ? (
                  <Button
                    size="lg"
                    disabled={answers[currentIndex] === null}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="aqua"
                    size="lg"
                    disabled={answeredCount < questions.length}
                    onClick={() => setStage("analyzing")}
                  >
                    Analyse
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {stage === "analyzing" && (
          <Card className="space-y-6 py-8">
            <HippomeAvatar
              message={`Scanning your ${subject.name} responses across all ${subject.topics.length} SPM topics to assign your level and weakest topic...`}
              expression="thinking"
              floating
            />

            {/* Custom 3-Topic Calibration Bars */}
            <div className="space-y-3 rounded-[16px] bg-[var(--ground)] p-4">
              <p className="text-xs font-semibold text-[var(--muted)]">
                Calibrating Form 5 SPM topic mastery
              </p>
              {subject.topics.map((topic, idx) => (
                <div key={topic.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs text-[var(--text)]">
                    <span className="font-medium">{topic.name}</span>
                    <span className="text-[var(--muted)]">Checking...</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="anim-calibrate h-full rounded-full bg-[var(--wisteria)]"
                      style={{ animationDelay: `${idx * 180}ms` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {stage === "result" && analysis && (
          <div className="space-y-5">
            <HippomeAvatar
              message={analysis.aiSummary}
              expression="celebrating"
              floating
            />

            <Card className="space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--rule)] pb-4">
                <div>
                  <p className="text-xs font-medium text-[var(--muted)]">
                    Placement complete
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-[-0.02em] text-[var(--text)] sm:text-2xl">
                    Level: {LEVEL_LABELS[analysis.assignedLevel]}
                  </h2>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge tone="ink">
                    Score {analysis.score}/{analysis.total}
                  </Badge>
                  <span className="num text-xs font-semibold text-[var(--positive)]">
                    RM{QUIZ_REWARD_RM[analysis.assignedLevel]} per passed quiz
                  </span>
                </div>
              </div>

              <div className="rounded-[14px] bg-[var(--pill-warning-bg)] p-4">
                <p className="text-xs font-semibold text-[var(--pill-warning-ink)]">
                  Weakest topic spotted
                </p>
                <p className="mt-1 text-base font-bold text-[var(--text)]">
                  {analysis.weakestTopicName}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  Start with this topic in {LEVEL_LABELS[analysis.assignedLevel]}{" "}
                  mode to strengthen your score fastest.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-[var(--text)]">
                  Topic accuracy breakdown
                </p>
                {analysis.topicBreakdown.map((item) => {
                  const isWeakest = item.topicId === analysis.weakestTopicId;
                  return (
                    <div
                      key={item.topicId}
                      className="space-y-1.5 rounded-[14px] bg-[var(--ground)] p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <div className="flex min-w-0 items-center gap-2">
                          <span className="truncate font-semibold text-[var(--text)]">
                            {item.topicName}
                          </span>
                          {isWeakest && <Badge tone="warning">Focus</Badge>}
                        </div>
                        <span className="num shrink-0 text-xs font-semibold text-[var(--text)]">
                          {item.correct}/{item.total} ({item.accuracyPercent}%)
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
                        {item.accuracyPercent > 0 && (
                          <div
                            className={`h-full rounded-full ${
                              isWeakest
                                ? "bg-[var(--wisteria)]"
                                : "bg-[var(--accent)]"
                            }`}
                            style={{ width: `${item.accuracyPercent}%` }}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => router.push(`/subjects/${subjectId}`)}
              >
                <span>
                  Open My {LEVEL_LABELS[analysis.assignedLevel]} Topics
                </span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
}
