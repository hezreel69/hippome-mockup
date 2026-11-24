import { ASSESSMENT_BANK } from "@/data/assessments";
import { getQuestionPool } from "@/data/question-bank";
import { getSubjectById, getTopicById } from "@/data/subjects";
import {
  LEVEL_LABELS,
  QUIZ_QUESTION_COUNT,
} from "@/lib/config";
import {
  AssessmentQuestion,
  DifficultyLevel,
  Question,
  SubjectId,
} from "@/types/hippome";

export interface TopicBreakdownItem {
  topicId: string;
  topicName: string;
  correct: number;
  total: number;
  accuracyPercent: number;
}

export interface AssessmentAnalysis {
  subjectId: SubjectId;
  score: number;
  total: number;
  assignedLevel: DifficultyLevel;
  weakestTopicId: string;
  weakestTopicName: string;
  topicBreakdown: TopicBreakdownItem[];
  aiSummary: string;
}

export function getAssessmentQuestionsForSubject(
  subjectId: SubjectId
): AssessmentQuestion[] {
  return ASSESSMENT_BANK[subjectId] ?? [];
}

/**
 * Evaluates a student's 6-question subject diagnostic and determines:
 * 1) Assigned mastery level (beginner / intermediate / advanced)
 * 2) Weakest topic in that subject (lowest accuracy, breaking ties by lower weighted score)
 */
export function evaluateAssessment(
  subjectId: SubjectId,
  questions: AssessmentQuestion[],
  selectedAnswers: (number | null)[]
): AssessmentAnalysis {
  const subject = getSubjectById(subjectId);
  const topicStats = new Map<
    string,
    { correct: number; total: number; weightedLost: number }
  >();

  if (subject) {
    for (const t of subject.topics) {
      topicStats.set(t.id, { correct: 0, total: 0, weightedLost: 0 });
    }
  }

  let totalScore = 0;

  questions.forEach((q, idx) => {
    const isCorrect = selectedAnswers[idx] === q.correctIndex;
    if (isCorrect) totalScore += 1;

    const current = topicStats.get(q.topicId) ?? {
      correct: 0,
      total: 0,
      weightedLost: 0,
    };
    current.total += 1;
    if (isCorrect) {
      current.correct += 1;
    } else {
      current.weightedLost += q.difficultyWeight;
    }
    topicStats.set(q.topicId, current);
  });

  let assignedLevel: DifficultyLevel = "beginner";
  if (totalScore >= 5) {
    assignedLevel = "advanced";
  } else if (totalScore >= 3) {
    assignedLevel = "intermediate";
  }

  const topicBreakdown: TopicBreakdownItem[] = [];
  let weakestTopicId = questions[0]?.topicId ?? "";
  let lowestScoreRatio = Infinity;
  let highestWeightedLost = -1;

  for (const [topicId, stat] of topicStats.entries()) {
    const topicObj = getTopicById(subjectId, topicId);
    const ratio = stat.total > 0 ? stat.correct / stat.total : 1;

    topicBreakdown.push({
      topicId,
      topicName: topicObj?.name ?? topicId,
      correct: stat.correct,
      total: stat.total,
      accuracyPercent: Math.round(ratio * 100),
    });

    if (
      ratio < lowestScoreRatio ||
      (ratio === lowestScoreRatio && stat.weightedLost > highestWeightedLost)
    ) {
      lowestScoreRatio = ratio;
      highestWeightedLost = stat.weightedLost;
      weakestTopicId = topicId;
    }
  }

  const weakestTopicName =
    getTopicById(subjectId, weakestTopicId)?.name ?? weakestTopicId;

  const subjectName = subject?.name ?? subjectId;

  const aiSummary =
    assignedLevel === "advanced"
      ? `Impressive work! You scored ${totalScore}/${questions.length} in ${subjectName}, placing you at Advanced level (RM20/quiz!). Even strong students have room to sharpen — your top focus topic is "${weakestTopicName}".`
      : assignedLevel === "intermediate"
        ? `Solid foundation! With ${totalScore}/${questions.length} in ${subjectName}, you're placed at Intermediate level (RM10/quiz). Start with "${weakestTopicName}" to close your biggest gap and push toward Advanced!`
        : `Great start! You scored ${totalScore}/${questions.length} in ${subjectName}, so I've matched you with Beginner quizzes (RM5/quiz) to build confidence fast. Focus on "${weakestTopicName}" first — pass 3 quizzes to level up for a RM30 bonus!`;

  return {
    subjectId,
    score: totalScore,
    total: questions.length,
    assignedLevel,
    weakestTopicId,
    weakestTopicName,
    topicBreakdown,
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
  generationNumber: number;
  generatedAt: string;
  subjectId: SubjectId;
  topicId: string;
  level: DifficultyLevel;
  questions: Question[];
  aiNote: string;
}

/**
 * Generates 5 level-matched Form 5 SPM questions for a given subject/topic/level,
 * prioritizing unseen questions and strictly excluding the previous attempt's IDs
 * whenever the pool allows (all 45 buckets have >= 10 candidates).
 */
export function generateQuizQuestions(params: {
  subjectId: SubjectId;
  topicId: string;
  level: DifficultyLevel;
  seenQuestionIds?: string[];
  lastAttemptQuestionIds?: string[];
  attemptNumber?: number;
}): GeneratedQuizPayload {
  const attemptNumber = params.attemptNumber ?? 1;
  const variantSeed = Math.max(0, attemptNumber - 1);
  const pool = getQuestionPool(
    params.subjectId,
    params.topicId,
    params.level,
    variantSeed
  );

  const lastSet = new Set(params.lastAttemptQuestionIds ?? []);
  const seenSet = new Set(params.seenQuestionIds ?? []);

  // Tier 1: Unseen and not in last attempt
  const freshUnseen = shuffleArray(
    pool.filter((q) => !seenSet.has(q.id) && !lastSet.has(q.id))
  );

  // Tier 2: Seen earlier, but NOT in last attempt (guarantees 0 overlap with previous try)
  const nonRepeated = shuffleArray(
    pool.filter((q) => seenSet.has(q.id) && !lastSet.has(q.id))
  );

  // Tier 3: Fallback from last attempt only if pool size < QUIZ_QUESTION_COUNT * 2
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

  const topicName =
    getTopicById(params.subjectId, params.topicId)?.name ?? params.topicId;

  return {
    generationNumber: attemptNumber,
    generatedAt: new Date().toISOString(),
    subjectId: params.subjectId,
    topicId: params.topicId,
    level: params.level,
    questions: picked,
    aiNote: `Generated ${picked.length} fresh ${LEVEL_LABELS[params.level]} SPM Form 5 questions on "${topicName}" (Set #${attemptNumber}).`,
  };
}
