import { DifficultyLevel, VoucherTier } from "@/types/mnemo";

export const STORAGE_KEY = "mnemo_mockup_v1";

export const QUIZ_QUESTION_COUNT = 5;
export const PASS_SCORE_PERCENT = 60;
export const PASS_MINIMUM_CORRECT = 3;
export const QUIZZES_TO_LEVEL_UP = 3;
export const ASSESSMENT_QUESTION_COUNT = 6;

export const LEVEL_ORDER: DifficultyLevel[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export const LEVEL_LABELS: Record<DifficultyLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const MILESTONE_REWARD_CONFIG: Record<
  DifficultyLevel,
  {
    nextLevel: DifficultyLevel;
    tier: VoucherTier;
    valueRm: number;
    label: string;
  }
> = {
  beginner: {
    nextLevel: "intermediate",
    tier: "milestone-intermediate",
    valueRm: 30,
    label: "Intermediate Bonus",
  },
  intermediate: {
    nextLevel: "advanced",
    tier: "milestone-advanced",
    valueRm: 50,
    label: "Advanced Bonus",
  },
  advanced: {
    nextLevel: "advanced",
    tier: "milestone-mastery",
    valueRm: 100,
    label: "Grand Mastery Bonus",
  },
};

export function getNextLevel(level: DifficultyLevel): DifficultyLevel | null {
  if (level === "beginner") return "intermediate";
  if (level === "intermediate") return "advanced";
  return null;
}
