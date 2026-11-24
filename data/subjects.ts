import { Subject, SubjectId } from "@/types/mnemo";

export const SUBJECTS: Subject[] = [
  {
    id: "sejarah",
    name: "Sejarah",
    tagline: "Malaysian history, made simple",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    tagline: "Numbers, patterns and problem solving",
  },
];

export const SUBJECT_MAP: Record<SubjectId, Subject> = SUBJECTS.reduce(
  (acc, subj) => {
    acc[subj.id] = subj;
    return acc;
  },
  {} as Record<SubjectId, Subject>
);

export function getSubjectById(subjectId: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === subjectId);
}
