import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReportForm from "@/components/ReportForm";
import prisma from "@/lib/prisma";

export default async function SubmitReportPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const activeQuestions = await prisma.question.findMany({
    where: { isActive: true },
    include: { options: true },
    orderBy: { sequence: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Submit Report</h1>
      <ReportForm
        questions={activeQuestions}
        userId={BigInt(session.user.id)}
      />
    </div>
  );
}
