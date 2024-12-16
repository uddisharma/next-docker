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
import UserActions from "@/components/UserActions";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UsersPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where = search
    ? {
        OR: [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const users = await prisma.user.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalUsers = await prisma.user.count({ where });
  const totalPages = Math.ceil(totalUsers / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <Link href="/admin/users/new">
          <Button>Add New User</Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search users..."
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id.toString()}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <UserActions user={user} />
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
            <Link href={`/admin/users?page=${page - 1}`}>
              <Button variant="outline" className="mr-2">
                Previous
              </Button>
            </Link>
          )}
          {page < totalPages && (
            <Link href={`/admin/users?page=${page + 1}`}>
              <Button variant="outline">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
