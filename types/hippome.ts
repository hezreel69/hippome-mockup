export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type SubjectId =
  | "sejarah"
  | "bahasa-melayu"
  | "english"
  | "mathematics"
  | "science";

export interface Topic {
  id: string;
  subjectId: SubjectId;
  name: string;
  syllabusTag: string;
  description: string;
}

export interface Subject {
  id: SubjectId;
  name: string;
  spmCode: string;
  medium: "Bahasa Melayu" | "English";
  tagline: string;
  topics: Topic[];
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
  topicId: string;
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
  earnedFromTopicId?: string;
  redeemedAt: string | null;
}

export interface SubjectProgress {
  subjectId: SubjectId;
  level: DifficultyLevel | null;
  weakestTopicId: string | null;
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
  topicId: string;
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
  form: "Form 5";
  isDemo?: boolean;
  hasCompletedOnboarding: boolean;
  createdAt: string;
  subjectProgress: Record<SubjectId, SubjectProgress>;
  quizHistory: QuizAttempt[];
  vouchers: Voucher[];
  seenQuestionIdsByKey: Record<string, string[]>;
  lastAttemptQuestionIdsByKey: Record<string, string[]>;
}

export interface HippomePersistedState {
  activeUserId: string | null;
  users: Record<string, UserProfile>;
}
