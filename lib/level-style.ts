import { DifficultyLevel } from "@/types/mnemo";

export const LEVEL_TONE: Record<
  DifficultyLevel,
  "beginner" | "intermediate" | "advanced"
> = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
};

export const LEVEL_BG: Record<DifficultyLevel, string> = {
  beginner: "bg-[var(--level-beginner)] text-[var(--level-beginner-ink)]",
  intermediate:
    "bg-[var(--level-intermediate)] text-[var(--level-intermediate-ink)]",
  advanced: "bg-[var(--level-advanced)] text-[var(--level-advanced-ink)]",
};
