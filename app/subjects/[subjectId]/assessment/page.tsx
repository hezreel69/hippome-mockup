import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SUBJECTS, getSubjectById } from "@/data/subjects";
import { AssessmentView } from "@/components/features/AssessmentView";

export function generateStaticParams() {
  return SUBJECTS.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default async function SubjectAssessmentPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = getSubjectById(subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[var(--muted)]">
          Loading check-up...
        </div>
      }
    >
      <AssessmentView subjectId={subject.id} />
    </Suspense>
  );
}
