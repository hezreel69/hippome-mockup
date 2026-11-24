import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SPM_SUBJECTS, getSubjectById } from "@/data/subjects";
import { SubjectHubView } from "@/components/features/SubjectHubView";

export function generateStaticParams() {
  return SPM_SUBJECTS.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default async function SubjectHubPage({
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
          Loading subject hub...
        </div>
      }
    >
      <SubjectHubView subjectId={subject.id} />
    </Suspense>
  );
}
