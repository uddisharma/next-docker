import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import QuestionActions from "@/components/QuestionActions";
import SearchInput from "@/components/SearchInput";
import { Prisma } from "@prisma/client";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function QuestionsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where: Prisma.QuestionWhereInput = search
    ? {
        text: {
          contains: search,
          mode: "insensitive" as Prisma.QueryMode,
        },
      }
    : {};

  const questions = await prisma.question.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { sequence: "asc" },
    include: { options: true },
  });

  const totalQuestions = await prisma.question.count();
  const totalPages = Math.ceil(totalQuestions / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Questions</h1>
        <Link href="/admin/questions/new">
          <Button>Add New Question</Button>
        </Link>
      </div>

      <div className="mb-4">
        <SearchInput defaultValue={search} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sequence</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.sequence}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.questionType}</TableCell>
              <TableCell>
                <QuestionActions question={question} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Page {page} of {totalPages}
        </div>
        <div>
          {page > 1 && (
            <Link href={`/admin/questions?page=${page - 1}`}>
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/admin/questions?page=${page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
