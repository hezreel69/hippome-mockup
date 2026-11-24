"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  prompt: string;
  options: [string, string, string, string];
  selectedIndex: number | null;
  onSelect?: (index: 0 | 1 | 2 | 3) => void;
  tag?: string;
  hint?: string;
  reviewMode?: boolean;
  correctIndex?: 0 | 1 | 2 | 3;
  explanation?: string;
}

const OPTION_LETTERS = ["A", "B", "C", "D"] as const;

export function QuestionCard({
  questionNumber,
  totalQuestions,
  prompt,
  options,
  selectedIndex,
  onSelect,
  tag,
  hint,
  reviewMode = false,
  correctIndex,
  explanation,
}: QuestionCardProps) {
  const prefersReduced = useReducedMotion();
  const isCorrect =
    reviewMode &&
    correctIndex !== undefined &&
    selectedIndex !== null &&
    selectedIndex === correctIndex;

  return (
    <div className="sticker space-y-5 bg-[var(--surface)] p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="num text-micro text-[var(--muted)]">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {tag && <Badge tone="neutral">{tag}</Badge>}
          {reviewMode && correctIndex !== undefined && (
            <Badge tone={isCorrect ? "success" : "danger"}>
              {isCorrect ? "Correct" : "Incorrect"}
            </Badge>
          )}
        </div>
      </div>

      <h2 className="font-display text-xl font-extrabold leading-snug tracking-[-0.02em] text-[var(--text)] sm:text-2xl">
        {prompt}
      </h2>

      {hint && !reviewMode && (
        <p className="rounded-[16px] border-2 border-[var(--ink-surface)]/20 bg-[var(--periwinkle-soft)] px-4 py-3 text-xs font-medium leading-relaxed text-[var(--ink-surface)]">
          <strong className="font-extrabold">Hint: </strong>
          {hint}
        </p>
      )}

      <div className="space-y-3">
        {options.map((option, idx) => {
          const optionIndex = idx as 0 | 1 | 2 | 3;
          const isSelected = selectedIndex === optionIndex;
          const isRightOption =
            reviewMode &&
            correctIndex !== undefined &&
            optionIndex === correctIndex;
          const isWrongSelection =
            reviewMode &&
            isSelected &&
            correctIndex !== undefined &&
            optionIndex !== correctIndex;

          let optionStyle =
            "border-[var(--ink-surface)] bg-[var(--ground)] text-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)] hover:bg-[var(--accent-soft)]";
          if (reviewMode) {
            if (isRightOption) {
              optionStyle =
                "border-[var(--ink-surface)] bg-[var(--pearl-aqua)] text-[var(--ink-surface)] shadow-[3px_3px_0_var(--ink-surface)]";
            } else if (isWrongSelection) {
              optionStyle =
                "border-[var(--negative)] bg-[var(--pill-negative-bg)] text-[var(--pill-negative-ink)]";
            } else {
              optionStyle =
                "border-[var(--border)] bg-[var(--ground)] text-[var(--muted)]";
            }
          } else if (isSelected) {
            optionStyle =
              "border-[var(--ink-surface)] bg-[var(--ink-surface)] text-[var(--floral-white)] shadow-[4px_4px_0_var(--pearl-aqua)]";
          }

          return (
            <motion.button
              key={`${questionNumber}-${idx}`}
              type="button"
              disabled={reviewMode}
              onClick={() => onSelect?.(optionIndex)}
              whileHover={
                reviewMode || prefersReduced ? undefined : { x: 3, y: -1 }
              }
              whileTap={
                reviewMode || prefersReduced ? undefined : { scale: 0.98 }
              }
              animate={
                isWrongSelection && !prefersReduced
                  ? { x: [0, -8, 8, -4, 0] }
                  : isRightOption && !prefersReduced
                    ? { scale: [1, 1.02, 1] }
                    : undefined
              }
              transition={{ duration: 0.35 }}
              className={`flex min-h-[56px] w-full items-start gap-3.5 rounded-[18px] border-2 px-4 py-3.5 text-left text-sm font-semibold sm:text-[15px] ${
                reviewMode ? "cursor-default" : "cursor-pointer"
              } ${optionStyle}`}
            >
              <span
                className={`font-display mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--ink-surface)] text-xs font-extrabold ${
                  reviewMode
                    ? isRightOption
                      ? "bg-[var(--floral-white)] text-[var(--ink-surface)]"
                      : isWrongSelection
                        ? "bg-[var(--negative)] text-white"
                        : "bg-[var(--raised)] text-[var(--muted)]"
                    : isSelected
                      ? "bg-[var(--pearl-aqua)] text-[var(--ink-surface)]"
                      : "bg-[var(--surface)] text-[var(--ink-surface)]"
                }`}
              >
                {OPTION_LETTERS[idx]}
              </span>
              <span className="flex-1 pt-1 leading-snug">{option}</span>
            </motion.button>
          );
        })}
      </div>

      {!reviewMode && (
        <p className="hidden text-xs font-medium text-[var(--faint)] lg:block">
          Tip: Press keys 1 to 4 to choose an answer, Enter to continue.
        </p>
      )}

      {reviewMode && explanation && (
        <div className="rounded-[16px] border-2 border-[var(--ink-surface)]/20 bg-[var(--raised)] p-4 text-xs font-medium leading-relaxed text-[var(--text)] sm:text-[13px]">
          <strong className="font-extrabold">Explanation: </strong>
          {explanation}
        </div>
      )}
    </div>
  );
}
