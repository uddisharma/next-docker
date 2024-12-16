import { getServerSession } from "next-auth/next";
import { redirect, notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function ViewReportPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const report = await prisma.report.findUnique({
    where: {
      id: parseInt(params.id),
      userId: parseInt(session.user.id),
    },
  });

  if (!report) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">View Report</h1>
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(report.createdAt).toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <h2 className="text-xl font-semibold mt-6 mb-4">Questions and Answers</h2>
      {report.questions.map((question: any, index: number) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(question.answer) ? (
              <ul>
                {question.answer.map((answer: string, i: number) => (
                  <li key={i}>{answer}</li>
                ))}
              </ul>
            ) : (
              <p>{question.answer}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
