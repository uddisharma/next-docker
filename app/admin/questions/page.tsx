import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function QuestionsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where = search
    ? {
        text: { contains: search, mode: "insensitive" },
      }
    : {};

  const questions = await prisma.question.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { sequence: "asc" },
    include: { options: true },
  });

  const totalQuestions = await prisma.question.count({ where });
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
        <Input
          placeholder="Search questions..."
          defaultValue={search}
          onChange={(e) => {
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set("search", e.target.value);
            searchParams.set("page", "1");
            window.location.search = searchParams.toString();
          }}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sequence</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Options</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.sequence}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>{question.questionType}</TableCell>
              <TableCell>{question.options.length}</TableCell>
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
