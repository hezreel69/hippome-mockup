import { Suspense } from "react";
import { notFound } from "next/navigation";
import { SPM_SUBJECTS, getSubjectById, getTopicById } from "@/data/subjects";
import { QuizRunnerView } from "@/components/features/QuizRunnerView";

export function generateStaticParams() {
  return SPM_SUBJECTS.flatMap((subject) =>
    subject.topics.map((topic) => ({
      subjectId: subject.id,
      topicId: topic.id,
    }))
  );
}

export default async function TopicQuizPage({
  params,
}: {
  params: Promise<{ subjectId: string; topicId: string }>;
}) {
  const { subjectId, topicId } = await params;
  const subject = getSubjectById(subjectId);
  const topic = getTopicById(subjectId, topicId);

  if (!subject || !topic) {
    notFound();
  }

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-sm text-[var(--muted)]">
          Loading quiz runner...
        </div>
      }
    >
      <QuizRunnerView subjectId={subject.id} topicId={topic.id} />
    </Suspense>
  );
}
