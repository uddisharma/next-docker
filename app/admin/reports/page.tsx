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
import ReportActions from "@/components/ReportActions";
import { Prisma } from "@prisma/client";
import SearchInput from "@/components/SearchInput";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ReportsPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where: Prisma.ReportWhereInput = search
    ? {
      OR: [
        { user: { firstName: { contains: search, mode: "insensitive" as Prisma.QueryMode } } },
        { user: { lastName: { contains: search, mode: "insensitive" as Prisma.QueryMode } } },
        { user: { email: { contains: search, mode: "insensitive" as Prisma.QueryMode } } },
      ],
    }
    : {};


  const reports = await prisma.report.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  const totalReports = await prisma.report.count({ where });
  const totalPages = Math.ceil(totalReports / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
      </div>

      <div className="mb-4">
        <SearchInput />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id.toString()}>
              <TableCell>
                {report.user.firstName} {report.user.lastName}
              </TableCell>
              <TableCell>
                {new Date(report.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <ReportActions report={{ id: BigInt(report.id) }} />
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
            <Link href={`/admin/reports?page=${page - 1}`}>
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/admin/reports?page=${page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
