import { ASSESSMENT_BANK } from "@/data/assessments";
import { DEMO_SETS } from "@/data/demo-sets";
import { getSubjectPool } from "@/data/question-bank";
import { getQuizRewardTemplate, rewardLabel } from "@/data/reward-map";
import { getSubjectById } from "@/data/subjects";
import { QUIZ_QUESTION_COUNT } from "@/lib/config";
import {
  AssessmentQuestion,
  DifficultyLevel,
  Question,
  QuizMode,
  SubjectId,
} from "@/types/mnemo";

export interface AssessmentAnalysis {
  subjectId: SubjectId;
  score: number;
  total: number;
  assignedLevel: DifficultyLevel;
  aiSummary: string;
}

export function getAssessmentQuestionsForSubject(
  subjectId: SubjectId
): AssessmentQuestion[] {
  return ASSESSMENT_BANK[subjectId] ?? [];
}

/**
 * Evaluates a student's 6-question subject check-up and assigns a starting level.
 */
export function evaluateAssessment(
  subjectId: SubjectId,
  questions: AssessmentQuestion[],
  selectedAnswers: (number | null)[]
): AssessmentAnalysis {
  let totalScore = 0;

  questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      totalScore += 1;
    }
  });

  let assignedLevel: DifficultyLevel = "beginner";
  if (totalScore >= 5) {
    assignedLevel = "advanced";
  } else if (totalScore >= 3) {
    assignedLevel = "intermediate";
  }

  const subjectName = getSubjectById(subjectId)?.name ?? subjectId;
  const reward = rewardLabel(getQuizRewardTemplate(subjectId, assignedLevel));

  const aiSummary =
    assignedLevel === "advanced"
      ? `Awesome work! You scored ${totalScore}/${questions.length} in ${subjectName}. You're starting at Advanced level — pass a quiz to win a ${reward}!`
      : assignedLevel === "intermediate"
        ? `Nice job! You scored ${totalScore}/${questions.length} in ${subjectName}. You're starting at Intermediate level — pass a quiz to win a ${reward}!`
        : `Good start! You scored ${totalScore}/${questions.length} in ${subjectName}. You're starting at Beginner level — pass a quiz to win a ${reward}!`;

  return {
    subjectId,
    score: totalScore,
    total: questions.length,
    assignedLevel,
    aiSummary,
  };
}

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestionOptions(question: Question): Question {
  const indexed = question.options.map((text, idx) => ({
    text,
    isCorrect: idx === question.correctIndex,
  }));
  const shuffled = shuffleArray(indexed);
  const newCorrectIdx = shuffled.findIndex((item) => item.isCorrect) as
    | 0
    | 1
    | 2
    | 3;

  return {
    ...question,
    options: [
      shuffled[0].text,
      shuffled[1].text,
      shuffled[2].text,
      shuffled[3].text,
    ],
    correctIndex: newCorrectIdx,
  };
}

export interface GeneratedQuizPayload {
  subjectId: SubjectId;
  quizMode: QuizMode;
  level: DifficultyLevel;
  questions: Question[];
}

/**
 * Generates 5 level-matched random questions for a subject,
 * prioritizing unseen questions and avoiding the previous attempt's IDs.
 */
export function generateRandomQuiz(params: {
  subjectId: SubjectId;
  level: DifficultyLevel;
  seenQuestionIds?: string[];
  lastAttemptQuestionIds?: string[];
  attemptNumber?: number;
}): GeneratedQuizPayload {
  const variantSeed = Math.max(0, (params.attemptNumber ?? 1) - 1);
  const pool = getSubjectPool(params.subjectId, params.level, variantSeed);

  const lastSet = new Set(params.lastAttemptQuestionIds ?? []);
  const seenSet = new Set(params.seenQuestionIds ?? []);

  const freshUnseen = shuffleArray(
    pool.filter((q) => !seenSet.has(q.id) && !lastSet.has(q.id))
  );
  const nonRepeated = shuffleArray(
    pool.filter((q) => seenSet.has(q.id) && !lastSet.has(q.id))
  );
  const remainder = shuffleArray(pool.filter((q) => lastSet.has(q.id)));

  const picked: Question[] = [];
  const pickedIds = new Set<string>();

  for (const candidate of [...freshUnseen, ...nonRepeated, ...remainder]) {
    if (picked.length >= QUIZ_QUESTION_COUNT) break;
    if (!pickedIds.has(candidate.id)) {
      picked.push(shuffleQuestionOptions(candidate));
      pickedIds.add(candidate.id);
    }
  }

  return {
    subjectId: params.subjectId,
    quizMode: "random",
    level: params.level,
    questions: picked,
  };
}

/**
 * Returns the fixed 5-question demo set for a subject without shuffling options.
 */
export function getDemoQuiz(
  subjectId: SubjectId,
  level: DifficultyLevel
): GeneratedQuizPayload {
  return {
    subjectId,
    quizMode: "demo",
    level,
    questions: DEMO_SETS[subjectId].map((q) => ({ ...q, level })),
  };
}
