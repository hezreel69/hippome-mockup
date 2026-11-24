import { DifficultyLevel, Question, SubjectId } from "@/types/hippome";

export type CompactQuestionTuple = [
  idSuffix: string,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: 0 | 1 | 2 | 3,
  explanation: string,
  hint?: string,
];

export function expandQuestions(
  subjectId: SubjectId,
  topicId: string,
  level: DifficultyLevel,
  rows: CompactQuestionTuple[]
): Question[] {
  return rows.map(([idSuffix, prompt, options, correctIndex, explanation, hint]) => ({
    id: `${subjectId}-${topicId}-${level}-${idSuffix}`,
    subjectId,
    topicId,
    level,
    prompt,
    options,
    correctIndex,
    explanation,
    hint,
  }));
}

export function buildNumericQuestion(params: {
  id: string;
  subjectId: SubjectId;
  topicId: string;
  level: DifficultyLevel;
  prompt: string;
  correctLabel: string;
  distractorLabels: string[];
  explanation: string;
  hint?: string;
}): Question {
  const uniqueDistractors: string[] = [];
  for (const d of params.distractorLabels) {
    if (d !== params.correctLabel && !uniqueDistractors.includes(d)) {
      uniqueDistractors.push(d);
    }
    if (uniqueDistractors.length === 3) break;
  }

  // Fallback padding if distractors collided
  let fallbackIdx = 1;
  while (uniqueDistractors.length < 3) {
    const candidate = `${params.correctLabel} (${fallbackIdx})`;
    if (!uniqueDistractors.includes(candidate)) {
      uniqueDistractors.push(candidate);
    }
    fallbackIdx += 1;
  }

  const combined: [string, string, string, string] = [
    params.correctLabel,
    uniqueDistractors[0],
    uniqueDistractors[1],
    uniqueDistractors[2],
  ];

  return {
    id: params.id,
    subjectId: params.subjectId,
    topicId: params.topicId,
    level: params.level,
    prompt: params.prompt,
    options: combined,
    correctIndex: 0,
    explanation: params.explanation,
    hint: params.hint,
  };
}
