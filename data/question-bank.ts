import { DifficultyLevel, Question, SubjectId } from "@/types/mnemo";
import { getMathematicsQuestions } from "./questions/mathematics";
import { getSejarahQuestions } from "./questions/sejarah";

const SEJARAH_TOPIC_IDS = [
  "kedaulatan-negara",
  "perlembagaan-persekutuan",
  "raja-berperlembagaan",
] as const;

const MATHS_TOPIC_IDS = ["variation", "matrices", "consumer-math"] as const;

export function getSubjectPool(
  subjectId: SubjectId,
  level: DifficultyLevel,
  variantSeed = 0
): Question[] {
  if (subjectId === "sejarah") {
    return SEJARAH_TOPIC_IDS.flatMap((topicId) =>
      getSejarahQuestions(topicId, level)
    );
  }

  return MATHS_TOPIC_IDS.flatMap((topicId) =>
    getMathematicsQuestions(topicId, level, variantSeed)
  );
}
