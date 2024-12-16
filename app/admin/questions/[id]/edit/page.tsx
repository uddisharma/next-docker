import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import QuestionForm from "@/components/QuestionForm";

interface PageProps {
  params: { id: string };
}

export default async function EditQuestionPage({ params }: PageProps) {
  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
    include: { options: true },
  });

  if (!question) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Question</h1>
      <QuestionForm question={question} />
    </div>
  );
}
