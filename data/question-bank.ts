import { DifficultyLevel, Question, SubjectId } from "@/types/hippome";
import { getBahasaMelayuQuestions } from "./questions/bahasa-melayu";
import { getEnglishQuestions } from "./questions/english";
import { getMathematicsQuestions } from "./questions/mathematics";
import { getScienceQuestions } from "./questions/science";
import { getSejarahQuestions } from "./questions/sejarah";

export function getQuestionPool(
  subjectId: SubjectId,
  topicId: string,
  level: DifficultyLevel,
  variantSeed = 0
): Question[] {
  switch (subjectId) {
    case "sejarah":
      return getSejarahQuestions(topicId, level);
    case "bahasa-melayu":
      return getBahasaMelayuQuestions(topicId, level);
    case "english":
      return getEnglishQuestions(topicId, level);
    case "mathematics":
      return getMathematicsQuestions(topicId, level, variantSeed);
    case "science":
      return getScienceQuestions(topicId, level, variantSeed);
  }
}
