import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function ViewReportPage({ params }: PageProps) {
  const report = await prisma.report.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      user: true,
    },
  });

  if (!report) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">View Report</h1>
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>User:</strong> {report.user.firstName}{" "}
            {report.user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {report.user.email}
          </p>
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
