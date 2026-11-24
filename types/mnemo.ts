export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type SubjectId = "sejarah" | "mathematics";

export type QuizMode = "random" | "demo";

export interface Subject {
  id: SubjectId;
  name: string;
  tagline: string;
}

export interface Question {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  level: DifficultyLevel;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  hint?: string;
}

export interface AssessmentQuestion {
  id: string;
  subjectId: SubjectId;
  topicId?: string;
  difficultyWeight: 1 | 2 | 3;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export type VoucherTier =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "milestone-intermediate"
  | "milestone-advanced"
  | "milestone-mastery";

export interface VoucherTemplate {
  templateId: string;
  tier: VoucherTier;
  brand: string;
  title: string;
  valueRm: number;
  description: string;
  codePrefix: string;
}

export interface Voucher {
  id: string;
  templateId: string;
  tier: VoucherTier;
  brand: string;
  title: string;
  valueRm: number;
  description: string;
  code: string;
  isMilestone: boolean;
  earnedAt: string;
  earnedFromSubjectId: SubjectId;
  earnedFromQuizMode?: QuizMode;
  redeemedAt: string | null;
}

export interface SubjectProgress {
  subjectId: SubjectId;
  level: DifficultyLevel | null;
  assessmentScore: number | null;
  assessmentTotal: number | null;
  assessmentCompletedAt: string | null;
  quizzesPassedAtCurrentLevel: number;
  totalQuizzesPassed: number;
  totalQuizzesTaken: number;
}

export interface QuizAttempt {
  id: string;
  subjectId: SubjectId;
  quizMode: QuizMode;
  level: DifficultyLevel;
  score: number;
  totalQuestions: number;
  passed: boolean;
  questionIds: string[];
  rewardVoucherIds: string[];
  leveledUpTo: DifficultyLevel | null;
  completedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  isDemo?: boolean;
  hasCompletedOnboarding: boolean;
  createdAt: string;
  subjectProgress: Record<SubjectId, SubjectProgress>;
  quizHistory: QuizAttempt[];
  vouchers: Voucher[];
  seenQuestionIdsByKey: Record<string, string[]>;
  lastAttemptQuestionIdsByKey: Record<string, string[]>;
}

export interface MnemoPersistedState {
  activeUserId: string | null;
  users: Record<string, UserProfile>;
}
