import { DifficultyLevel, VoucherTier } from "@/types/hippome";

export const STORAGE_KEY = "hippome_mockup_v1";

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

export const LEVEL_DESCRIPTIONS: Record<DifficultyLevel, string> = {
  beginner: "Core SPM Form 5 foundations & direct recall",
  intermediate: "Standard SPM application & multi-step questions",
  advanced: "KBAT / HOTS SPM exam-grade challenges",
};

export const QUIZ_REWARD_RM: Record<DifficultyLevel, number> = {
  beginner: 5,
  intermediate: 10,
  advanced: 20,
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
    label: "Intermediate Promotion Reward",
  },
  intermediate: {
    nextLevel: "advanced",
    tier: "milestone-advanced",
    valueRm: 50,
    label: "Advanced Promotion Reward",
  },
  advanced: {
    nextLevel: "advanced",
    tier: "milestone-mastery",
    valueRm: 100,
    label: "SPM Grand Mastery Reward",
  },
};

export function getNextLevel(level: DifficultyLevel): DifficultyLevel | null {
  if (level === "beginner") return "intermediate";
  if (level === "intermediate") return "advanced";
  return null;
}
