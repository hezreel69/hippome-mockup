import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SUBJECTS, getSubjectById } from "@/data/subjects";
import { QuizRunnerView } from "@/components/features/QuizRunnerView";
import { QuizMode } from "@/types/mnemo";

export function generateStaticParams() {
  const modes: QuizMode[] = ["random", "demo"];
  return SUBJECTS.flatMap((subject) =>
    modes.map((quizId) => ({
      subjectId: subject.id,
      quizId,
    }))
  );
}

export default async function QuizModePage({
  params,
}: {
  params: Promise<{ subjectId: string; quizId: string }>;
}) {
  const { subjectId, quizId } = await params;
  const subject = getSubjectById(subjectId);

  if (!subject || (quizId !== "random" && quizId !== "demo")) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[var(--muted)]">
          Getting your quiz ready...
        </div>
      }
    >
      <QuizRunnerView subjectId={subject.id} quizMode={quizId} />
    </Suspense>
  );
}
